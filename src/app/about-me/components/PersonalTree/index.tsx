import { Collapse } from '@/Components/Collapse';
import { TreeView } from '@/Components/TreeView';
import { personalTree, type TreeLeaf } from '../../data';

interface PersonalTreeProps {
  selectedId: string | null;
  onFileSelect: (file: TreeLeaf) => void;
}

export function PersonalTree({ selectedId, onFileSelect }: PersonalTreeProps) {
  return (
    <Collapse title="personal-info" open={true}>
      <TreeView
        data={personalTree[0].children}
        selectedId={selectedId}
        onFileSelect={onFileSelect}
      />
    </Collapse>
  );
}
