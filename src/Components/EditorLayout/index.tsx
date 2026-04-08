'use client';
import React from 'react';
import { useEditor } from '@/contexts/EditorContext';
import { EditorPane } from '@/Components/EditorPane';
import styles from './styles.module.scss';

export interface EditorLayoutProps {
  sidebarContent: React.ReactNode;
  mobileSidebarContent?: React.ReactNode;
  staticContent?: React.ReactNode;
}

export function EditorLayout({ sidebarContent, mobileSidebarContent, staticContent }: EditorLayoutProps) {
  const { panes } = useEditor();

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>{sidebarContent}</aside>
      <div className={styles.main}>
        <div className={styles.mobileNav}>{mobileSidebarContent ?? sidebarContent}</div>
        <div className={styles.paneWrapper}>
          {panes.map((pane, i) => (
            <React.Fragment key={pane.id}>
              {i > 0 && <div className={styles.paneDivider} />}
              <EditorPane paneId={pane.id} staticContent={staticContent} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
