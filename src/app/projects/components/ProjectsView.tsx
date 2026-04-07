'use client';

import { useRef, useState } from 'react';
import { EditorLayout } from '@/Components/EditorLayout';
import { EditorTabBar } from '@/Components/EditorTabBar';
import { EditorTab } from '@/Components/EditorTab';
import { SidebarProjectsContent, ProjectCard } from '@/Components';
import { useEditorTabs } from '@/contexts/EditorTabsContext';
import { getTech } from '@/lib/tech-icons';
import { getProjectImage } from '@/lib/project-images';
import type { Project } from '@/api';

const PATH = '/projects';

interface ProjectsViewProps {
  projects: Project[];
}

export default function ProjectsView({ projects }: ProjectsViewProps) {
  const { tabs, openTab, closeTab, reorderTabs } = useEditorTabs();
  const allTags = Array.from(new Set(projects.flatMap((p) => p.technologies)));

  const pageTabs = tabs[PATH] ?? [];
  const selectedTechs = pageTabs.map((t) => t.id);

  const dragSourceIndex = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function toggleTech(tag: string) {
    if (selectedTechs.includes(tag)) {
      closeTab(PATH, tag);
    } else {
      const tech = getTech(tag);
      openTab(PATH, { id: tag, label: tech?.label ?? tag, iconKey: tag });
    }
  }

  function handleDragStart(index: number) {
    dragSourceIndex.current = index;
  }

  function handleDragEnter(index: number) {
    setDragOverIndex(index);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function handleDrop(targetIndex: number) {
    const sourceIndex = dragSourceIndex.current;
    if (sourceIndex === null || sourceIndex === targetIndex) {
      setDragOverIndex(null);
      dragSourceIndex.current = null;
      return;
    }
    const next = [...pageTabs];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    reorderTabs(PATH, next);
    dragSourceIndex.current = null;
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    dragSourceIndex.current = null;
    setDragOverIndex(null);
  }

  const filtered =
    selectedTechs.length === 0
      ? projects
      : projects.filter((p) =>
          p.technologies.some((t) => selectedTechs.includes(t)),
        );

  return (
    <EditorLayout
      sidebarContent={
        <SidebarProjectsContent
          tags={allTags}
          selected={selectedTechs}
          onToggle={toggleTech}
          open={true}
        />
      }
      tabBar={
        <EditorTabBar>
          {pageTabs.map((tab, index) => {
            const tech = tab.iconKey ? getTech(tab.iconKey) : undefined;
            const Icon = tech?.icon;
            return (
              <EditorTab
                key={tab.id}
                label={tab.label}
                icon={
                  Icon ? (
                    <Icon size={14} color={tech?.color} aria-hidden="true" />
                  ) : undefined
                }
                onClose={() => closeTab(PATH, tab.id)}
                isDragging={dragSourceIndex.current === index}
                isDragOver={dragOverIndex === index}
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </EditorTabBar>
      }
    >
      <div className="projects-grid">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.name}
            description={project.description}
            tags={project.technologies}
            href={project.githubUrl}
            homepage={project.homepage}
            image={getProjectImage(project)}
            language={project.language}
          />
        ))}
      </div>
    </EditorLayout>
  );
}
