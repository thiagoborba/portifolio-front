import styles from './styles.module.scss';

export interface EditorLayoutProps {
  sidebarContent: React.ReactNode;
  mobileSidebarContent?: React.ReactNode;
  tabBar?: React.ReactNode;
  children: React.ReactNode;
}

export function EditorLayout({
  sidebarContent,
  mobileSidebarContent,
  tabBar,
  children,
}: EditorLayoutProps) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>{sidebarContent}</aside>
      <div className={styles.main}>
        <div className={styles.mobileNav}>
          {mobileSidebarContent ?? sidebarContent}
        </div>
        {tabBar}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
