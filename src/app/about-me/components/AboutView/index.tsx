'use client';

import { useRef, useState } from 'react';
import { VscFile } from 'react-icons/vsc';
import { SidebarAbout } from '../SidebarAbout';
import { AboutContent } from '../AboutContent';
import { PersonalTree } from '../PersonalTree';
import { EditorLayout } from '@/Components/EditorLayout';
import { EditorTabBar } from '@/Components/EditorTabBar';
import { EditorTab } from '@/Components/EditorTab';
import { Collapse } from '@/Components/Collapse';
import { TreeView } from '@/Components/TreeView';
import { useEditorTabs } from '@/contexts/EditorTabsContext';
import {
  personalTree,
  hobbiesTree,
  codeTree,
  type TreeLeaf,
  type TreeNode,
} from '../../data';

const PATH = '/about-me';

type SidebarTab = 'personal' | 'hobbies' | 'code';

export default function AboutView() {
  const { tabs, activeTabIds, openTab, closeTab, reorderTabs, setActiveTab } = useEditorTabs();
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('personal');

  const dragSourceIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const pageTabs = tabs[PATH] ?? [];
  const activeTabId = activeTabIds[PATH] ?? null;

  const allLeaves = getAllLeaves([...personalTree, ...hobbiesTree, ...codeTree]);
  const selectedFile = activeTabId ? (allLeaves.find((l) => l.id === activeTabId) ?? null) : null;

  function handleFileSelect(file: TreeLeaf) {
    openTab(PATH, { id: file.id, label: file.label });
    setActiveTab(PATH, file.id);
  }

  function handleTabClick(tabId: string) {
    setActiveTab(PATH, tabId);
  }

  function handleCloseTab(tabId: string) {
    closeTab(PATH, tabId);
    if (activeTabId === tabId) {
      const remaining = pageTabs.filter((t) => t.id !== tabId);
      const next = remaining.length > 0 ? remaining[remaining.length - 1].id : null;
      setActiveTab(PATH, next);
    }
  }

  function handleDragStart(index: number) {
    dragSourceIndex.current = index;
  }

  function handleDragEnter(index: number) {
    setDragOverIndex(index);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDrop(targetIndex: number) {
    const sourceIndex = dragSourceIndex.current;
    if (sourceIndex === null || sourceIndex === targetIndex) {
      setDragOverIndex(null);
      dragSourceIndex.current = null;
      return;
    }
    const next = [...pageTabs];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    reorderTabs(PATH, next);
    dragSourceIndex.current = null;
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    dragSourceIndex.current = null;
    setDragOverIndex(null);
  }

  const mobileSidebarContent = (
    <>
      <PersonalTree selectedId={activeTabId} onFileSelect={handleFileSelect} />
      <Collapse title="hobbies" open={false}>
        <TreeView
          data={hobbiesTree[0].children}
          selectedId={activeTabId}
          onFileSelect={handleFileSelect}
        />
      </Collapse>
      <Collapse title="code-snippets" open={false}>
        <TreeView
          data={codeTree[0].children}
          selectedId={activeTabId}
          onFileSelect={handleFileSelect}
        />
      </Collapse>
    </>
  );

  return (
    <EditorLayout
      sidebarContent={
        <SidebarAbout
          activeTab={activeSidebarTab}
          onTabChange={setActiveSidebarTab}
          selectedId={activeTabId}
          onFileSelect={handleFileSelect}
        />
      }
      mobileSidebarContent={mobileSidebarContent}
      tabBar={
        <EditorTabBar>
          {pageTabs.map((tab, index) => (
            <EditorTab
              key={tab.id}
              label={tab.label}
              icon={<VscFile size={14} />}
              isActive={activeTabId === tab.id}
              onClose={() => handleCloseTab(tab.id)}
              onClick={() => handleTabClick(tab.id)}
              isDragging={dragSourceIndex.current === index}
              isDragOver={dragOverIndex === index}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
            />
          ))}
        </EditorTabBar>
      }
    >
      <AboutContent lines={selectedFile?.content ?? []} />
    </EditorLayout>
  );
}

function getAllLeaves(nodes: (TreeNode | TreeLeaf)[]): TreeLeaf[] {
  const results: TreeLeaf[] = [];
  for (const node of nodes) {
    if (!('children' in node)) {
      results.push(node);
    } else {
      results.push(...getAllLeaves(node.children));
    }
  }
  return results;
}
