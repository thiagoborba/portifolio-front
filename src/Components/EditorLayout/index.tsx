'use client';
import React, { useState } from 'react';
import { useEditor, useEditorDndState } from '@/contexts/EditorContext';
import { EditorPane } from '@/Components/EditorPane';
import { useIsMobile } from '@/hooks/useIsMobile';
import styles from './styles.module.scss';

export interface EditorLayoutProps {
  sidebarContent: React.ReactNode;
  mobileSidebarContent?: React.ReactNode;
  staticContent?: React.ReactNode;
  singlePane?: boolean;
  disableTabDrag?: boolean;
  mobilePageName?: string;
}

export function EditorLayout({
  sidebarContent,
  mobileSidebarContent,
  staticContent,
  singlePane = false,
  disableTabDrag = false,
  mobilePageName,
}: EditorLayoutProps) {
  const { panes, openTabInNewPane } = useEditor();
  const { dragging, setDragging, setDropIndicator } = useEditorDndState();
  const [hoveringEdge, setHoveringEdge] = useState<'left' | 'right' | null>(null);
  const isMobile = useIsMobile();
  const forceSingle = singlePane || isMobile;
  const visiblePanes = forceSingle ? panes.slice(0, 1) : panes;
  const showEdges = !forceSingle && dragging;

  function handleEdgeDrop(e: React.DragEvent, side: 'left' | 'right') {
    e.preventDefault();
    const fromPaneId = e.dataTransfer.getData('fromPaneId');
    const tabId = e.dataTransfer.getData('tabId');
    if (fromPaneId && tabId) {
      openTabInNewPane(fromPaneId, tabId, side);
    }
    setDragging(null);
    setDropIndicator(null);
    setHoveringEdge(null);
  }

  function edgeClassNames(side: 'left' | 'right') {
    const base = side === 'left' ? `${styles.globalEdge} ${styles.globalEdgeLeft}` : `${styles.globalEdge} ${styles.globalEdgeRight}`;
    return hoveringEdge === side ? `${base} ${styles.globalEdgeActive}` : base;
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>{sidebarContent}</aside>
      <div className={styles.main}>
        {mobilePageName && <p className={styles.mobilePageTitle}>{mobilePageName}</p>}
        <div className={styles.mobileNav}>{mobileSidebarContent ?? sidebarContent}</div>
        <div className={styles.paneWrapper}>
          {showEdges && (
            <div
              className={edgeClassNames('left')}
              onDragEnter={() => setHoveringEdge('left')}
              onDragLeave={() => setHoveringEdge(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleEdgeDrop(e, 'left')}
            />
          )}

          {visiblePanes.map((pane, i) => (
            <React.Fragment key={pane.id}>
              {i > 0 && <div className={styles.paneDivider} />}
              <EditorPane paneId={pane.id} staticContent={staticContent} disableTabDrag={disableTabDrag} />
            </React.Fragment>
          ))}

          {showEdges && (
            <div
              className={edgeClassNames('right')}
              onDragEnter={() => setHoveringEdge('right')}
              onDragLeave={() => setHoveringEdge(null)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleEdgeDrop(e, 'right')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
