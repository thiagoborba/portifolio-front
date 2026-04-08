'use client';
import { useState } from 'react';
import { useEditor } from '@/contexts/EditorContext';
import type { Tab } from '@/contexts/EditorContext';

interface DragState {
  tabId: string;
  fromPaneId: string;
}

interface DropIndicator {
  paneId: string;
  tabId: string;
  side: 'before' | 'after';
}

export function useEditorDnd() {
  const { reorderTabs, moveTab, openTabInNewPane, panes } = useEditor();
  const [dragging, setDragging] = useState<DragState | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(null);

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
      },
    };
  }

  function tabDropHandlers(paneId: string, tabId: string, index: number) {
    return {
      onDragOver: (e: React.DragEvent) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const side: 'before' | 'after' = e.clientX < rect.left + rect.width / 2 ? 'before' : 'after';
        setDropIndicator({ paneId, tabId, side });
      },
      onDragLeave: () => {
        setDropIndicator(null);
      },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
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

  function edgeDropHandlers(paneId: string, side: 'left' | 'right') {
    return {
      onDragOver: (e: React.DragEvent) => { e.preventDefault(); },
      onDrop: (e: React.DragEvent) => {
        e.preventDefault();
        const fromPaneId = e.dataTransfer.getData('fromPaneId');
        const dragTabId = e.dataTransfer.getData('tabId');
        if (!fromPaneId || !dragTabId) return;
        openTabInNewPane(fromPaneId, dragTabId, side);
        setDragging(null);
        setDropIndicator(null);
      },
    };
  }

  return { dragging, dropIndicator, tabDragHandlers, tabDropHandlers, spacerDropHandlers, edgeDropHandlers };
}
