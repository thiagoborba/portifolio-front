export type TreeLeaf = {
  id: string;
  label: string;
  content: string[];
};

export type TreeNode = {
  id: string;
  label: string;
  children: (TreeNode | TreeLeaf)[];
};

export type HobbyItem = { id: string; label: string };

export function isLeaf(node: TreeNode | TreeLeaf): node is TreeLeaf {
  return !('children' in node);
}

export function getFirstLeaf(nodes: (TreeNode | TreeLeaf)[]): TreeLeaf | null {
  for (const node of nodes) {
    if (isLeaf(node)) return node;
    const found = getFirstLeaf(node.children);
    if (found) return found;
  }
  return null;
}
