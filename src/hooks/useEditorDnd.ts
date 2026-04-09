'use client';
import { useRef } from 'react';
import { useEditor, useEditorDndState } from '@/contexts/EditorContext';

export function useEditorDnd() {
  const { dragging, setDragging, dropIndicator, setDropIndicator } = useEditorDndState();
  const { reorderTabs, moveTab, panes } = useEditor();
  const lastIndicatorRef = useRef<string | null>(null);

  function tabDragHandlers(paneId: string, tabId: string) {
    return {
      draggable: true as const,
      onDragStart: (e: React.DragEvent) => {
        setDragging({ tabId, fromPaneId: paneId });
        e.dataTransfer.setData('tabId', tabId);
        e.dataTransfer.setData('fromPaneId', paneId);
        e.dataTransfer.effectAllowed = 'move';
      },
      onDragEnd: () => {
        setDragging(null);
        setDropIndicator(null);
        lastIndicatorRef.current = null;
      },
    };
  }

  function tabDropHandlers(paneId: string, tabId: string, index: number) {
    return {
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const side: 'before' | 'after' = e.clientX < rect.left + rect.width / 2 ? 'before' : 'after';
        const key = `${paneId}|${tabId}|${side}`;
        if (lastIndicatorRef.current === key) return;
        lastIndicatorRef.current = key;
        setDropIndicator({ paneId, tabId, side });
      },
      onDragLeave: (e: React.DragEvent) => {
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        lastIndicatorRef.current = null;
        setDropIndicator(null);
      },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        lastIndicatorRef.current = null;
        const fromPaneId = e.dataTransfer.getData('fromPaneId');
        const dragTabId = e.dataTransfer.getData('tabId');
        if (!fromPaneId || !dragTabId) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const side: 'before' | 'after' = e.clientX < rect.left + rect.width / 2 ? 'before' : 'after';
        const insertAt = side === 'after' ? index + 1 : index;

        if (fromPaneId === paneId) {
          const pane = panes.find((p) => p.id === paneId);
          if (!pane) return;
          const sourceIndex = pane.tabs.findIndex((t) => t.id === dragTabId);
          if (sourceIndex === -1 || sourceIndex === index) return;
          const newTabs = [...pane.tabs];
          const [moved] = newTabs.splice(sourceIndex, 1);
          const adjustedInsertAt = insertAt > sourceIndex ? insertAt - 1 : insertAt;
          newTabs.splice(adjustedInsertAt, 0, moved);
          reorderTabs(paneId, newTabs);
        } else {
          moveTab(fromPaneId, dragTabId, paneId, insertAt);
        }
        setDragging(null);
        setDropIndicator(null);
      },
    };
  }

  function spacerDropHandlers(paneId: string) {
    return {
      onDragOver: (e: React.DragEvent) => { e.preventDefault(); },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        const fromPaneId = e.dataTransfer.getData('fromPaneId');
        const dragTabId = e.dataTransfer.getData('tabId');
        if (!fromPaneId || !dragTabId) return;
        const pane = panes.find((p) => p.id === paneId);
        if (!pane) return;
        if (fromPaneId === paneId) {
          const sourceIndex = pane.tabs.findIndex((t) => t.id === dragTabId);
          if (sourceIndex === -1) return;
          const newTabs = [...pane.tabs];
          const [moved] = newTabs.splice(sourceIndex, 1);
          newTabs.push(moved);
          reorderTabs(paneId, newTabs);
        } else {
          moveTab(fromPaneId, dragTabId, paneId, pane.tabs.length);
        }
        setDragging(null);
        setDropIndicator(null);
      },
    };
  }

  return { dragging, dropIndicator, tabDragHandlers, tabDropHandlers, spacerDropHandlers };
}
