'use client';

import { useRef, useState } from 'react';
import styles from './styles.module.scss';

export interface EditorLayoutProps {
  sidebarContent: React.ReactNode;
  mobileSidebarContent?: React.ReactNode;
  tabBar?: React.ReactNode;
  children: React.ReactNode;
  splitTabBar?: React.ReactNode;
  splitContent?: React.ReactNode;
  splitSide?: 'left' | 'right';
  onSplitDrop?: (tabId: string, tabData: string, side: 'left' | 'right') => void;
}

export function EditorLayout({
  sidebarContent,
  mobileSidebarContent,
  tabBar,
  children,
  splitTabBar,
  splitContent,
  splitSide = 'right',
  onSplitDrop,
}: EditorLayoutProps) {
  const [dropZone, setDropZone] = useState<'left' | 'right' | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isSplit = Boolean(splitTabBar);

  function handleContentDragOver(e: React.DragEvent<HTMLDivElement>) {
    if (isSplit || !onSplitDrop) return;
    e.preventDefault();
    const rect = contentRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    if (x < 40) setDropZone('left');
    else if (x > rect.width - 40) setDropZone('right');
    else setDropZone(null);
  }

  function handleContentDragLeave(e: React.DragEvent<HTMLDivElement>) {
    if (!contentRef.current?.contains(e.relatedTarget as Node)) {
      setDropZone(null);
    }
  }

  function handleContentDrop(e: React.DragEvent<HTMLDivElement>) {
    if (!dropZone || !onSplitDrop) return;
    e.preventDefault();
    const tabId = e.dataTransfer.getData('tabId');
    const tabData = e.dataTransfer.getData('tabJson');
    if (tabId) {
      onSplitDrop(tabId, tabData, dropZone);
    }
    setDropZone(null);
  }

  const mainContent = (
    <div
      ref={contentRef}
      className={styles.content}
      onDragOver={handleContentDragOver}
      onDragLeave={handleContentDragLeave}
      onDrop={handleContentDrop}
    >
      {dropZone && (
        <div className={`${styles.splitOverlay} ${styles[dropZone]}`} />
      )}
      {children}
    </div>
  );

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>{sidebarContent}</aside>
      <div className={styles.main}>
        <div className={styles.mobileNav}>
          {mobileSidebarContent ?? sidebarContent}
        </div>
        {isSplit ? (
          <div className={styles.paneWrapper}>
            {splitSide === 'left' ? (
              <>
                <div className={styles.pane}>
                  {splitTabBar}
                  <div className={styles.content}>{splitContent}</div>
                </div>
                <div className={styles.paneDivider} />
                <div className={styles.pane}>
                  {tabBar}
                  {mainContent}
                </div>
              </>
            ) : (
              <>
                <div className={styles.pane}>
                  {tabBar}
                  {mainContent}
                </div>
                <div className={styles.paneDivider} />
                <div className={styles.pane}>
                  {splitTabBar}
                  <div className={styles.content}>{splitContent}</div>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {tabBar}
            {mainContent}
          </>
        )}
      </div>
    </div>
  );
}
