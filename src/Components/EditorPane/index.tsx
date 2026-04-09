'use client';
import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { useEditorDnd } from '@/hooks/useEditorDnd';
import { EditorTabBar } from '@/Components/EditorTabBar';
import { EditorTab } from '@/Components/EditorTab';
import styles from './styles.module.scss';

interface EditorPaneProps {
  paneId: string;
  staticContent?: React.ReactNode;
  disableTabDrag?: boolean;
}

export function EditorPane({ paneId, staticContent, disableTabDrag = false }: EditorPaneProps) {
  const { panes, activateTab, closeTab, activatePane } = useEditor();
  const dnd = useEditorDnd();
  const pane = panes.find((p) => p.id === paneId);
  if (!pane) return null;
  const activeTab = pane.tabs.find((t) => t.active) ?? null;

  return (
    <div className={styles.pane} onMouseDown={() => activatePane(paneId)}>
      <EditorTabBar
        activeTabId={activeTab?.id}
        onSpacerDragOver={disableTabDrag ? undefined : dnd.spacerDropHandlers(paneId).onDragOver}
        onSpacerDrop={disableTabDrag ? undefined : dnd.spacerDropHandlers(paneId).onDrop}
      >
        {pane.tabs.map((tab, index) => {
          const indicator =
            dnd.dropIndicator?.paneId === paneId && dnd.dropIndicator?.tabId === tab.id
              ? dnd.dropIndicator.side
              : undefined;
          return (
            <EditorTab
              key={tab.id}
              tabId={tab.id}
              label={tab.title}
              icon={tab.icon}
              isActive={tab.active}
              isPaneActive={pane.active}
              isDragging={dnd.dragging?.tabId === tab.id}
              dropIndicator={indicator}
              onClick={() => activateTab(paneId, tab.id)}
              onClose={() => closeTab(paneId, tab.id)}
              {...(disableTabDrag ? {} : dnd.tabDragHandlers(paneId, tab.id))}
              {...(disableTabDrag ? {} : dnd.tabDropHandlers(paneId, tab.id, index))}
            />
          );
        })}
      </EditorTabBar>
      <div className={styles.content}>
        {activeTab?.content ?? staticContent ?? null}
      </div>
    </div>
  );
}
