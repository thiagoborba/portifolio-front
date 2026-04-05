'use client';

import { useState } from 'react';
import {
  SidebarProjects,
  SidebarProjectsContent,
  ProjectCard,
} from '@/Components';
import { getTech } from '@/lib/tech-icons';
import type { Project } from '@/api';

interface ProjectsViewProps {
  projects: Project[];
}

export default function ProjectsView({ projects }: ProjectsViewProps) {
  const allTags = Array.from(new Set(projects.flatMap((p) => p.technologies)));
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  function toggleTech(tag: string) {
    setSelectedTechs((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  const filtered =
    selectedTechs.length === 0
      ? projects
      : projects.filter((p) => p.technologies.some((t) => selectedTechs.includes(t)));

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
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.name}
              description={project.description ?? ''}
              tags={project.technologies}
              href={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
