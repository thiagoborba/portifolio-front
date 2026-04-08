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
}

export function EditorPane({ paneId, staticContent }: EditorPaneProps) {
  const { panes, activateTab, closeTab, activatePane } = useEditor();
  const dnd = useEditorDnd();
  const pane = panes.find((p) => p.id === paneId);
  if (!pane) return null;
  const activeTab = pane.tabs.find((t) => t.active) ?? null;

  return (
    <div className={styles.pane} onMouseDown={() => activatePane(paneId)}>
      <EditorTabBar
        onSpacerDragOver={dnd.spacerDropHandlers(paneId).onDragOver}
        onSpacerDrop={dnd.spacerDropHandlers(paneId).onDrop}
      >
        {pane.tabs.map((tab, index) => {
          const indicator =
            dnd.dropIndicator?.paneId === paneId && dnd.dropIndicator?.tabId === tab.id
              ? dnd.dropIndicator.side
              : undefined;
          return (
            <EditorTab
              key={tab.id}
              label={tab.title}
              icon={tab.icon}
              isActive={tab.active}
              isPaneActive={pane.active}
              isDragging={dnd.dragging?.tabId === tab.id}
              dropIndicator={indicator}
              onClick={() => activateTab(paneId, tab.id)}
              onClose={() => closeTab(paneId, tab.id)}
              {...dnd.tabDragHandlers(paneId, tab.id)}
              {...dnd.tabDropHandlers(paneId, tab.id, index)}
            />
          );
        })}
      </EditorTabBar>
      <div className={styles.content}>
        {dnd.dragging && dnd.dragging.fromPaneId !== paneId && (
          <>
            <div className={`${styles.edgeZone} ${styles.edgeLeft}`} {...dnd.edgeDropHandlers(paneId, 'left')} />
            <div className={`${styles.edgeZone} ${styles.edgeRight}`} {...dnd.edgeDropHandlers(paneId, 'right')} />
          </>
        )}
        {activeTab?.content ?? staticContent ?? null}
      </div>
    </div>
  );
}
