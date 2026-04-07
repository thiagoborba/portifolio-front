'use client';

import { SidebarIconTabs } from '@/Components/SidebarIconTabs';
import { Collapse } from '@/Components/Collapse';
import { TreeView } from '@/Components/TreeView';
import { PersonalTree } from '../PersonalTree';
import { hobbiesTree, codeTree, type TreeLeaf } from '../../data';
import { VscAccount, VscHeart, VscCode } from 'react-icons/vsc';
import type { SidebarIconTab } from '@/Components/SidebarIconTabs';
import styles from './styles.module.scss';

type Tab = 'personal' | 'hobbies' | 'code';

export interface SidebarAboutProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  selectedId: string | null;
  onFileSelect: (file: TreeLeaf) => void;
}

const iconTabs: SidebarIconTab[] = [
  { id: 'personal', icon: VscAccount, title: 'personal' },
  { id: 'hobbies', icon: VscHeart, title: 'hobbies' },
  { id: 'code', icon: VscCode, title: 'code' },
];

export function SidebarAbout({
  activeTab,
  onTabChange,
  selectedId,
  onFileSelect,
}: SidebarAboutProps) {
  return (
    <div className={styles.wrapper}>
      <SidebarIconTabs
        tabs={iconTabs}
        activeTab={activeTab}
        onTabChange={(id) => onTabChange(id as Tab)}
      />
      <div className={styles.content}>
        {activeTab === 'personal' && (
          <PersonalTree selectedId={selectedId} onFileSelect={onFileSelect} />
        )}

        {activeTab === 'hobbies' && (
          <Collapse title="hobbies" open={true}>
            <TreeView
              data={hobbiesTree[0].children}
              selectedId={selectedId}
              onFileSelect={onFileSelect}
            />
          </Collapse>
        )}

        {activeTab === 'code' && (
          <Collapse title="code-snippets" open={true}>
            <TreeView
              data={codeTree[0].children}
              selectedId={selectedId}
              onFileSelect={onFileSelect}
            />
          </Collapse>
        )}
      </div>
    </div>
  );
}
