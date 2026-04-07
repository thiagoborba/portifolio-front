'use client';

import Sidebar from '@/Components/Sidebar';
import { Collapse } from '@/Components/Collapse';
import { TreeView } from '@/Components/TreeView';
import { PersonalTree } from '../PersonalTree';
import { hobbiesTree, codeTree, type TreeLeaf } from '../../data';
import { VscAccount, VscHeart, VscCode } from 'react-icons/vsc';
import type { IconType } from 'react-icons';
import styles from './styles.module.scss';

type Tab = 'personal' | 'hobbies' | 'code';

interface SidebarAboutProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  selectedId: string | null;
  onFileSelect: (file: TreeLeaf) => void;
}

const tabs: { id: Tab; icon: IconType }[] = [
  { id: 'personal', icon: VscAccount },
  { id: 'hobbies', icon: VscHeart },
  { id: 'code', icon: VscCode },
];

export function SidebarAbout({
  activeTab,
  onTabChange,
  selectedId,
  onFileSelect,
}: SidebarAboutProps) {
  return (
    <Sidebar>
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          {tabs.map(({ id, icon: Icon }) => (
            <button
              key={id}
              className={`${styles.tab} ${activeTab === id ? styles.active : ''}`}
              onClick={() => onTabChange(id)}
              title={id}
            >
              <Icon size={20} />
            </button>
          ))}
        </div>

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
    </Sidebar>
  );
}
