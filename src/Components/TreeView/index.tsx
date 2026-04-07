'use client';

import { createContext, useContext, useState } from 'react';
import {
  VscFolder,
  VscFolderOpened,
  VscFile,
  VscChevronDown,
  VscChevronRight,
} from 'react-icons/vsc';
import { isLeaf, type TreeNode, type TreeLeaf } from '@/app/about-me/data';
import styles from './styles.module.scss';

const FOLDER_COLORS = ['#fea55f', '#c98bdf', '#43d9ad'];
const LEAF_COLORS = ['#e99287', '#43d9ad', '#c98bdf', '#fea55f', '#90a1b9'];

// ─── Context ──────────────────────────────────────────────────────────────────

interface TreeContext {
  selectedId: string | null;
  onFileSelect: (file: TreeLeaf) => void;
}

const TreeCtx = createContext<TreeContext>({
  selectedId: null,
  onFileSelect: () => {},
});

// ─── Leaf ─────────────────────────────────────────────────────────────────────

function TreeLeafItem({
  leaf,
  colorIndex,
  depth,
}: {
  leaf: TreeLeaf;
  colorIndex: number;
  depth: number;
}) {
  const { selectedId, onFileSelect } = useContext(TreeCtx);
  const color = LEAF_COLORS[colorIndex % LEAF_COLORS.length];
  const selected = selectedId === leaf.id;

  return (
    <button
      className={`${styles.leaf} ${selected ? styles.selected : ''}`}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
      onClick={() => onFileSelect(leaf)}
    >
      <VscFile style={{ color }} className={styles.icon} />
      <span className={styles.leafLabel}>{leaf.label}</span>
    </button>
  );
}

// ─── Node ─────────────────────────────────────────────────────────────────────

function TreeNodeItem({
  node,
  depth,
}: {
  node: TreeNode;
  depth: number;
  colorIndex?: number;
}) {
  const [open, setOpen] = useState(true);
  const folderColor = FOLDER_COLORS[depth % FOLDER_COLORS.length];

  return (
    <div>
      <button
        className={styles.nodeButton}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <VscChevronDown className={styles.chevron} />
        ) : (
          <VscChevronRight className={styles.chevron} />
        )}
        {open ? (
          <VscFolderOpened style={{ color: folderColor }} className={styles.icon} />
        ) : (
          <VscFolder style={{ color: folderColor }} className={styles.icon} />
        )}
        <span className={styles.nodeLabel}>{node.label}</span>
      </button>
      {open && (
        <div>
          {node.children.map((child, index) =>
            isLeaf(child) ? (
              <TreeLeafItem
                key={child.id}
                leaf={child}
                colorIndex={index}
                depth={depth + 1}
              />
            ) : (
              <TreeNodeItem
                key={child.id}
                node={child}
                depth={depth + 1}
                colorIndex={index}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

interface TreeViewProps {
  data: (TreeNode | TreeLeaf)[];
  selectedId?: string | null;
  onFileSelect?: (file: TreeLeaf) => void;
}

export function TreeView({
  data,
  selectedId = null,
  onFileSelect = () => {},
}: TreeViewProps) {
  return (
    <TreeCtx.Provider value={{ selectedId, onFileSelect }}>
      <div className={styles.root}>
        {data.map((item, index) =>
          isLeaf(item) ? (
            <TreeLeafItem key={item.id} leaf={item} colorIndex={index} depth={0} />
          ) : (
            <TreeNodeItem key={item.id} node={item} depth={0} colorIndex={index} />
          ),
        )}
      </div>
    </TreeCtx.Provider>
  );
}
