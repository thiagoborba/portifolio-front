'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditorTabs } from '@/contexts/EditorTabsContext';

export function useTabDrag(path: string) {
  const { tabs, activeTabIds, closeTab, reorderTabs, setActiveTab } = useEditorTabs();
  const dragSourceIndex = useRef<number | null>(null);
  const [draggingTabId, setDraggingTabId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null);
  const [dropIndicatorSide, setDropIndicatorSide] = useState<'before' | 'after' | null>(null);

  const pageTabs = tabs[path] ?? [];
  const activeTabId = activeTabIds[path] ?? null;

  function resetDragState() {
    dragSourceIndex.current = null;
    setDraggingTabId(null);
    setDragOverIndex(null);
    setDropIndicatorIndex(null);
    setDropIndicatorSide(null);
  }

  // Auto-reset when the dragging tab disappears from pageTabs (cross-pane drop,
  // unexpected unmount, or any path that bypasses handleDragEnd).
  useEffect(() => {
    if (draggingTabId !== null && !pageTabs.some((t) => t.id === draggingTabId)) {
      resetDragState();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTabs, draggingTabId]);

  function handleTabClick(tabId: string) {
    setActiveTab(path, tabId);
  }

  function handleCloseTab(tabId: string) {
    closeTab(path, tabId);
    if (activeTabId === tabId) {
      const remaining = pageTabs.filter((t) => t.id !== tabId);
      const next = remaining.length > 0 ? remaining[remaining.length - 1].id : null;
      setActiveTab(path, next);
    }
  }

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, index: number) {
    dragSourceIndex.current = index;
    const tab = pageTabs[index];
    setDraggingTabId(tab.id);
    e.dataTransfer.setData('tabId', tab.id);
    e.dataTransfer.setData('tabJson', JSON.stringify(tab));
    e.dataTransfer.setData('sourcePath', path);
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragEnter(index: number) {
    setDragOverIndex(index);
    setDropIndicatorIndex(index);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>, index: number) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const side: 'before' | 'after' =
      e.clientX < rect.left + rect.width / 2 ? 'before' : 'after';
    setDropIndicatorIndex(index);
    setDropIndicatorSide(side);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>, targetIndex: number) {
    e.preventDefault();
    const sourcePath = e.dataTransfer.getData('sourcePath');

    if (sourcePath !== path) {
      // Cross-pane drop
      const tabJson = e.dataTransfer.getData('tabJson');
      const tabId = e.dataTransfer.getData('tabId');
      try {
        const tab = JSON.parse(tabJson);
        const insertAt =
          dropIndicatorSide === 'after' ? targetIndex + 1 : targetIndex;
        const next = [...pageTabs];
        next.splice(insertAt, 0, tab);
        reorderTabs(path, next);
        setActiveTab(path, tab.id);
        closeTab(sourcePath, tabId);
      } catch {
        // malformed tabJson — ignore
      }
      setDraggingTabId(null);
      setDragOverIndex(null);
      setDropIndicatorIndex(null);
      setDropIndicatorSide(null);
      return;
    }

    // Same-pane drop
    const sourceIndex = dragSourceIndex.current;
    if (sourceIndex === null || sourceIndex === targetIndex) {
      setDraggingTabId(null);
      setDragOverIndex(null);
      setDropIndicatorIndex(null);
      setDropIndicatorSide(null);
      dragSourceIndex.current = null;
      return;
    }

    const insertAt = dropIndicatorSide === 'after' ? targetIndex + 1 : targetIndex;
    const next = [...pageTabs];
    const [moved] = next.splice(sourceIndex, 1);
    const adjustedInsertAt = insertAt > sourceIndex ? insertAt - 1 : insertAt;
    next.splice(adjustedInsertAt, 0, moved);
    reorderTabs(path, next);

    dragSourceIndex.current = null;
    setDraggingTabId(null);
    setDragOverIndex(null);
    setDropIndicatorIndex(null);
    setDropIndicatorSide(null);
  }

  function handleDragEnd() {
    dragSourceIndex.current = null;
    setDraggingTabId(null);
    setDragOverIndex(null);
    setDropIndicatorIndex(null);
    setDropIndicatorSide(null);
  }

  function handleSpacerDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOverIndex(pageTabs.length);
  }

  function handleSpacerDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const sourcePath = e.dataTransfer.getData('sourcePath');

    if (sourcePath !== path) {
      // Cross-pane drop to spacer — append at end
      const tabJson = e.dataTransfer.getData('tabJson');
      const tabId = e.dataTransfer.getData('tabId');
      try {
        const tab = JSON.parse(tabJson);
        const next = [...pageTabs, tab];
        reorderTabs(path, next);
        setActiveTab(path, tab.id);
        closeTab(sourcePath, tabId);
      } catch {
        // malformed tabJson — ignore
      }
      setDraggingTabId(null);
      setDragOverIndex(null);
      setDropIndicatorIndex(null);
      setDropIndicatorSide(null);
      return;
    }

    // Same-pane spacer drop
    const sourceIndex = dragSourceIndex.current;
    if (sourceIndex === null) return;
    const next = [...pageTabs];
    const [moved] = next.splice(sourceIndex, 1);
    next.push(moved);
    reorderTabs(path, next);
    dragSourceIndex.current = null;
    setDraggingTabId(null);
    setDragOverIndex(null);
    setDropIndicatorIndex(null);
    setDropIndicatorSide(null);
  }

  return {
    pageTabs,
    activeTabId,
    dragOverIndex,
    draggingTabId,
    dropIndicatorSide,
    dropIndicatorIndex,
    resetDragState,
    handleTabClick,
    handleCloseTab,
    handleDragStart,
    handleDragEnter,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handleSpacerDragOver,
    handleSpacerDrop,
  };
}
