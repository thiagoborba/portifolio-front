'use client';

import type { IconType } from 'react-icons';
import styles from './styles.module.scss';

export interface SidebarIconTab {
  id: string;
  icon: IconType;
  title: string;
}

export interface SidebarIconTabsProps {
  tabs: SidebarIconTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function SidebarIconTabs({ tabs, activeTab, onTabChange }: SidebarIconTabsProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map(({ id, icon: Icon, title }) => (
        <button
          key={id}
          className={`${styles.tab} ${activeTab === id ? styles.active : ''}`}
          onClick={() => onTabChange(id)}
          title={title}
          type="button"
          aria-pressed={activeTab === id}
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
}
