'use client';

import { useState } from 'react';
import SidebarProjects, { SideBarContent } from './components/Sidebar';
import { ProjectCard } from './components/ProjectCard';
import { projects } from './data';

export default function Projects() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggleProject(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  const filtered =
    selected.length === 0
      ? projects
      : projects.filter((p) => selected.includes(p.id));

  return (
    <div className="h-stack">
      <SidebarProjects selected={selected} onToggle={toggleProject} />
      <div className="projects-container">
        <div className="decorator-projects">
          <div className="decorator-tabs">
            {selected.map((id) => {
              const project = projects.find((p) => p.id === id);
              return (
                <span key={id} className="decorator-tab">
                  {`// ${project?.title}`}
                </span>
              );
            })}
          </div>
          <div className="decorator-content">
            <SideBarContent open={false} selected={selected} onToggle={toggleProject} />
          </div>
        </div>
        <div className="projects-grid">
          {filtered.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
