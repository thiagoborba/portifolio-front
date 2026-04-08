'use client';

import { EditorLayout } from '@/Components/EditorLayout';
import { EditorTabBar } from '@/Components/EditorTabBar';
import { EditorTab } from '@/Components/EditorTab';
import { SidebarProjectsContent, ProjectCard } from '@/Components';
import { useEditorTabs } from '@/contexts/EditorTabsContext';
import { useTabDrag } from '@/hooks/useTabDrag';
import { getTech } from '@/lib/tech-icons';
import { getProjectImage } from '@/lib/project-images';
import type { Project } from '@/api';

const PATH = '/projects';

interface ProjectsViewProps {
  projects: Project[];
}

export default function ProjectsView({ projects }: ProjectsViewProps) {
  const { openTab, closeTab } = useEditorTabs();
  const allTags = Array.from(new Set(projects.flatMap((p) => p.technologies)));

  const drag = useTabDrag(PATH);
  const selectedTechs = drag.pageTabs.map((t) => t.id);

  function toggleTech(tag: string) {
    if (selectedTechs.includes(tag)) {
      closeTab(PATH, tag);
    } else {
      const tech = getTech(tag);
      openTab(PATH, { id: tag, label: tech?.label ?? tag, iconKey: tag });
    }
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
        <EditorTabBar
          onSpacerDragOver={drag.handleSpacerDragOver}
          onSpacerDrop={drag.handleSpacerDrop}
        >
          {drag.pageTabs.map((tab, index) => {
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
                isDragging={drag.draggingTabId === tab.id}
                dropIndicator={
                  drag.dropIndicatorIndex === index
                    ? drag.dropIndicatorSide ?? undefined
                    : undefined
                }
                onClose={() => closeTab(PATH, tab.id)}
                onDragStart={(e) => drag.handleDragStart(e, index)}
                onDragEnter={() => drag.handleDragEnter(index)}
                onDragOver={(e) => drag.handleDragOver(e, index)}
                onDrop={(e) => drag.handleDrop(e, index)}
                onDragEnd={drag.handleDragEnd}
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
