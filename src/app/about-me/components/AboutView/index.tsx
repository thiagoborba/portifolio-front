'use client';

import { useEffect, useState } from 'react';
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
import { useTabDrag } from '@/hooks/useTabDrag';
import {
  personalTree,
  hobbiesTree,
  codeTree,
  type TreeLeaf,
  type TreeNode,
} from '../../data';

const PATH = '/about-me';
const SPLIT_PATH = '/about-me__split';

type SidebarTab = 'personal' | 'hobbies' | 'code';

type SplitState = {
  side: 'left' | 'right';
};

export default function AboutView() {
  const { openTab, closeTab, setActiveTab } = useEditorTabs();
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('personal');
  const [split, setSplit] = useState<SplitState | null>(null);

  const primary = useTabDrag(PATH);
  const splitPane = useTabDrag(SPLIT_PATH);

  const allLeaves = getAllLeaves([...personalTree, ...hobbiesTree, ...codeTree]);

  // Collapse split when the split pane has no more tabs
  useEffect(() => {
    if (split && splitPane.pageTabs.length === 0) {
      setSplit(null);
    }
  }, [split, splitPane.pageTabs.length]);

  function getContent(activeTabId: string | null) {
    const file = activeTabId ? (allLeaves.find((l) => l.id === activeTabId) ?? null) : null;
    return <AboutContent lines={file?.content ?? []} />;
  }

  function handleFileSelect(file: TreeLeaf) {
    openTab(PATH, { id: file.id, label: file.label });
    setActiveTab(PATH, file.id);
  }

  function handleSplitDrop(tabId: string, tabData: string, side: 'left' | 'right') {
    if (primary.pageTabs.length <= 1) return;
    primary.resetDragState();
    try {
      const tab = JSON.parse(tabData);
      openTab(SPLIT_PATH, tab);
      setActiveTab(SPLIT_PATH, tab.id);
      closeTab(PATH, tabId);
      setSplit({ side });
    } catch {
      // malformed tabData — ignore
    }
  }

  const mobileSidebarContent = (
    <>
      <PersonalTree selectedId={primary.activeTabId} onFileSelect={handleFileSelect} />
      <Collapse title="hobbies" open={false}>
        <TreeView
          data={hobbiesTree[0].children}
          selectedId={primary.activeTabId}
          onFileSelect={handleFileSelect}
        />
      </Collapse>
      <Collapse title="code-snippets" open={false}>
        <TreeView
          data={codeTree[0].children}
          selectedId={primary.activeTabId}
          onFileSelect={handleFileSelect}
        />
      </Collapse>
    </>
  );

  const primaryTabBar = (
    <EditorTabBar
      onSpacerDragOver={primary.handleSpacerDragOver}
      onSpacerDrop={primary.handleSpacerDrop}
      isReceiving={split !== null && splitPane.draggingTabId !== null}
    >
      {primary.pageTabs.map((tab, index) => (
        <EditorTab
          key={tab.id}
          label={tab.label}
          icon={<VscFile size={14} />}
          isActive={primary.activeTabId === tab.id}
          isDragging={primary.draggingTabId === tab.id}
          dropIndicator={
            primary.dropIndicatorIndex === index
              ? primary.dropIndicatorSide ?? undefined
              : undefined
          }
          onClose={() => primary.handleCloseTab(tab.id)}
          onClick={() => primary.handleTabClick(tab.id)}
          onDragStart={(e) => primary.handleDragStart(e, index)}
          onDragEnter={() => primary.handleDragEnter(index)}
          onDragOver={(e) => primary.handleDragOver(e, index)}
          onDrop={(e) => primary.handleDrop(e, index)}
          onDragEnd={primary.handleDragEnd}
        />
      ))}
    </EditorTabBar>
  );

  const splitTabBar = split ? (
    <EditorTabBar
      onSpacerDragOver={splitPane.handleSpacerDragOver}
      onSpacerDrop={splitPane.handleSpacerDrop}
      isReceiving={primary.draggingTabId !== null}
    >
      {splitPane.pageTabs.map((tab, index) => (
        <EditorTab
          key={tab.id}
          label={tab.label}
          icon={<VscFile size={14} />}
          isActive={splitPane.activeTabId === tab.id}
          isDragging={splitPane.draggingTabId === tab.id}
          dropIndicator={
            splitPane.dropIndicatorIndex === index
              ? splitPane.dropIndicatorSide ?? undefined
              : undefined
          }
          onClose={() => splitPane.handleCloseTab(tab.id)}
          onClick={() => splitPane.handleTabClick(tab.id)}
          onDragStart={(e) => splitPane.handleDragStart(e, index)}
          onDragEnter={() => splitPane.handleDragEnter(index)}
          onDragOver={(e) => splitPane.handleDragOver(e, index)}
          onDrop={(e) => splitPane.handleDrop(e, index)}
          onDragEnd={splitPane.handleDragEnd}
        />
      ))}
    </EditorTabBar>
  ) : undefined;

  return (
    <EditorLayout
      sidebarContent={
        <SidebarAbout
          activeTab={activeSidebarTab}
          onTabChange={setActiveSidebarTab}
          selectedId={primary.activeTabId}
          onFileSelect={handleFileSelect}
        />
      }
      mobileSidebarContent={mobileSidebarContent}
      tabBar={primaryTabBar}
      splitTabBar={splitTabBar}
      splitContent={split ? getContent(splitPane.activeTabId) : undefined}
      splitSide={split?.side}
      onSplitDrop={handleSplitDrop}
    >
      {getContent(primary.activeTabId)}
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
