'use client';

import { useState } from 'react';
import { SidebarAbout } from '../SidebarAbout';
import { AboutContent } from '../AboutContent';
import { PageDecorator } from '@/Components/PageDecorator';
import {
  personalTree,
  hobbiesTree,
  codeTree,
  getFirstLeaf,
  type TreeLeaf,
} from '../../data';
import styles from './styles.module.scss';

type Tab = 'personal' | 'hobbies' | 'code';

const treeByTab: Record<Tab, typeof personalTree> = {
  personal: personalTree,
  hobbies: hobbiesTree,
  code: codeTree,
};

export default function AboutView() {
  const [activeTab, setActiveTab] = useState<Tab>('personal');
  const [selectedFile, setSelectedFile] = useState<TreeLeaf | null>(
    () => getFirstLeaf(personalTree),
  );

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    setSelectedFile(getFirstLeaf(treeByTab[tab]));
  }

  return (
    <div className={styles.container}>
      <SidebarAbout
        activeTab={activeTab}
        onTabChange={handleTabChange}
        selectedId={selectedFile?.id ?? null}
        onFileSelect={setSelectedFile}
      />

      <div className={styles.main}>
        <PageDecorator filename={selectedFile?.label ?? null} />
        <AboutContent lines={selectedFile?.content ?? []} />
      </div>
    </div>
  );
}
