'use client';
import { useState } from 'react';
import { VscFile } from 'react-icons/vsc';
import { SidebarAbout } from '../SidebarAbout';
import { AboutContent } from '../AboutContent';
import { PersonalTree } from '../PersonalTree';
import { EditorLayout } from '@/Components/EditorLayout';
import { Collapse } from '@/Components/Collapse';
import { TreeView } from '@/Components/TreeView';
import { EditorProvider, useEditor } from '@/contexts/EditorContext';
import { personalTree, hobbiesTree, codeTree, type TreeLeaf, type TreeNode } from '../../data';

type SidebarTab = 'personal' | 'hobbies' | 'code';

export default function AboutView() {
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('personal');
  return (
    <EditorProvider initialPanes={[{ id: 'main', tabs: [], active: true }]}>
      <AboutViewInner
        activeSidebarTab={activeSidebarTab}
        onSidebarTabChange={setActiveSidebarTab}
      />
    </EditorProvider>
  );
}

function AboutViewInner({
  activeSidebarTab,
  onSidebarTabChange,
}: {
  activeSidebarTab: SidebarTab;
  onSidebarTabChange: (tab: SidebarTab) => void;
}) {
  const { panes, openTab, activateTab } = useEditor();
  const activePane = panes.find((p) => p.active) ?? panes[0];
  const activePaneId = activePane?.id ?? 'main';
  const activeTabId = activePane?.tabs.find((t) => t.active)?.id ?? null;

  const allLeaves = getAllLeaves([...personalTree, ...hobbiesTree, ...codeTree]);

  function handleFileSelect(file: TreeLeaf) {
    openTab(activePaneId, {
      id: file.id,
      title: file.label,
      icon: <VscFile size={14} />,
      content: <AboutContent lines={file.content ?? []} />,
    });
    activateTab(activePaneId, file.id);
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
          onTabChange={onSidebarTabChange}
          selectedId={activeTabId}
          onFileSelect={handleFileSelect}
        />
      }
      mobileSidebarContent={mobileSidebarContent}
    />
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
