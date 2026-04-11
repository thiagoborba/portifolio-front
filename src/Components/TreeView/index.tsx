'use client';

import { createContext, useContext, useState } from 'react';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';
import { isLeaf, type TreeNode, type TreeLeaf } from '@/app/about-me/data';
import { getFileIcon, getFolderIcon } from '@/lib/material-icons';
import styles from './styles.module.scss';

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
  depth,
}: {
  leaf: TreeLeaf;
  depth: number;
}) {
  const { selectedId, onFileSelect } = useContext(TreeCtx);
  const selected = selectedId === leaf.id;

  return (
    <button
      className={`${styles.leaf} ${selected ? styles.selected : ''}`}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
      onClick={() => onFileSelect(leaf)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getFileIcon(leaf.label)}
        alt=""
        width={16}
        height={16}
        aria-hidden="true"
        className={styles.icon}
      />
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
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        className={styles.nodeButton}
        style={{ paddingLeft: `${depth * 16 + 4}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <VscChevronDown className={styles.chevron} />
        ) : (
          <VscChevronRight className={styles.chevron} />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getFolderIcon(node.label, isOpen)}
          alt=""
          width={16}
          height={16}
          aria-hidden="true"
          className={styles.icon}
        />
        <span className={styles.nodeLabel}>{node.label}</span>
      </button>
      {isOpen && (
        <div>
          {node.children.map((child) =>
            isLeaf(child) ? (
              <TreeLeafItem
                key={child.id}
                leaf={child}
                depth={depth + 1}
              />
            ) : (
              <TreeNodeItem
                key={child.id}
                node={child}
                depth={depth + 1}
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
        {data.map((item) =>
          isLeaf(item) ? (
            <TreeLeafItem key={item.id} leaf={item} depth={0} />
          ) : (
            <TreeNodeItem key={item.id} node={item} depth={0} />
          ),
        )}
      </div>
    </TreeCtx.Provider>
  );
}
