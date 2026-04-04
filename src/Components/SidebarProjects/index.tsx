'use client';

import Sidebar from '@/Components/Sidebar';
import { Collapse } from '@/Components/Collapse';
import { Checkbox } from '@/Components/Checkbox';
import { getTech } from '@/lib/tech-icons';
import './sidebar-projects.scss';

type SidebarProjectsProps = {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
  open?: boolean;
};

export function SidebarProjectsContent({ tags, selected, onToggle, open = true }: SidebarProjectsProps) {
  return (
    <Collapse open={open} title="projects">
      <ul className="ul-sidebar">
        {tags.map((tag) => {
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
                      style={{ flexShrink: 0, color: tech?.color, fill: tech?.color }}
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

export function SidebarProjects({ tags, selected, onToggle }: Omit<SidebarProjectsProps, 'open'>) {
  return (
    <Sidebar>
      <SidebarProjectsContent tags={tags} selected={selected} onToggle={onToggle} open={true} />
    </Sidebar>
  );
}
