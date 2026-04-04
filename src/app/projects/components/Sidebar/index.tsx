'use client';

import Sidebar from '@/Components/Sidebar';
import { Collapse } from '@/Components/Collapse';
import { Checkbox } from '@/Components';
import { projects } from '../../data';
import { getTech } from '@/lib/tech-icons';

type SideBarContentProps = {
  open?: boolean;
  selected: string[];
  onToggle: (tag: string) => void;
};

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export function SideBarContent({ open, selected, onToggle }: SideBarContentProps) {
  return (
    <Collapse open={!!open} title="projects">
      <ul className="ul-sidebar">
        {allTags.map((tag) => {
          const tech = getTech(tag);
          const Icon = tech?.icon;
          return (
            <li key={tag} className="li">
              <Checkbox
                id={`tech-${tag}`}
                label={tech?.label ?? tag}
                checked={selected.includes(tag)}
                onChange={() => onToggle(tag)}
                prefix={
                  Icon ? (
                    <Icon
                      size={14}
                      title={tag}
                      style={{ color: tech?.color, flexShrink: 0 }}
                    />
                  ) : undefined
                }
              />
            </li>
          );
        })}
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
