'use client';

import { useState } from 'react';
import {
  SidebarProjects,
  SidebarProjectsContent,
  ProjectCard,
} from '@/Components';
import { projects } from './data';
import { getTech } from '@/lib/tech-icons';

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function Projects() {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  function toggleTech(tag: string) {
    setSelectedTechs((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  const filtered =
    selectedTechs.length === 0
      ? projects
      : projects.filter((p) => p.tags.some((t) => selectedTechs.includes(t)));

  return (
    <div className="h-stack">
      <SidebarProjects
        tags={allTags}
        selected={selectedTechs}
        onToggle={toggleTech}
      />
      <div className="projects-container">
        <div className="decorator-projects">
          <div className="decorator-tabs">
            {selectedTechs.map((tag) => (
              <span key={tag} className="decorator-tab">
                {getTech(tag)?.label ?? tag}
              </span>
            ))}
          </div>
          <div className="decorator-content">
            <SidebarProjectsContent
              tags={allTags}
              open={false}
              selected={selectedTechs}
              onToggle={toggleTech}
            />
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
