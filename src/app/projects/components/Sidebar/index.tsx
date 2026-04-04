'use client';

import Sidebar from '@/Components/Sidebar';
import { Collapse } from '@/Components/Collapse';
import { Checkbox } from '@/Components';
import { projects } from '../../data';

type SideBarContentProps = {
  open?: boolean;
  selected: string[];
  onToggle: (id: string) => void;
};

export function SideBarContent({ open, selected, onToggle }: SideBarContentProps) {
  return (
    <Collapse open={!!open} title="projects">
      <ul className="ul-sidebar">
        {projects.map(({ id, title }) => (
          <li key={id} className="li">
            <Checkbox
              id={id}
              label={`// ${title}`}
              checked={selected.includes(id)}
              onChange={() => onToggle(id)}
            />
          </li>
        ))}
      </ul>
    </Collapse>
  );
}

export default function SidebarProjects({
  selected,
  onToggle,
}: Omit<SideBarContentProps, 'open'>) {
  return (
    <Sidebar>
      <SideBarContent open={true} selected={selected} onToggle={onToggle} />
    </Sidebar>
  );
}
