import styles from './styles.module.scss';

export interface EditorTabBarProps {
  children?: React.ReactNode;
}

export function EditorTabBar({ children }: EditorTabBarProps) {
  return (
    <div className={styles.bar}>
      {children}
      <div className={styles.spacer} aria-hidden="true" />
    </div>
  );
}
