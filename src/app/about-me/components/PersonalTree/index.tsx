import { Collapse } from '@/Components/Collapse';
import { TreeView } from '@/Components/TreeView';
import { personalTree, type TreeLeaf } from '../../data';

interface PersonalTreeProps {
  selectedId: string | null;
  onFileSelect: (file: TreeLeaf) => void;
  initialOpen?: boolean;
}

export function PersonalTree({ selectedId, onFileSelect, initialOpen = true }: PersonalTreeProps) {
  return (
    <Collapse title="personal-info" open={initialOpen}>
      <TreeView
        data={personalTree[0].children}
        selectedId={selectedId}
        onFileSelect={onFileSelect}
      />
    </Collapse>
  );
}
