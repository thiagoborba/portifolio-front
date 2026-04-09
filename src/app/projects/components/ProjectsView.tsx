'use client';
import { EditorLayout } from '@/Components/EditorLayout';
import { SidebarProjectsContent, ProjectCard } from '@/Components';
import { EditorProvider, useEditor } from '@/contexts/EditorContext';
import { getTech } from '@/lib/tech-icons';
import { getProjectImage } from '@/lib/project-images';
import type { Project } from '@/api';

interface ProjectsViewProps {
  projects: Project[];
}

export default function ProjectsView({ projects }: ProjectsViewProps) {
  return (
    <EditorProvider initialPanes={[{ id: 'projects', tabs: [], active: true }]} routeKey="projects">
      <ProjectsViewInner projects={projects} />
    </EditorProvider>
  );
}

function ProjectsViewInner({ projects }: ProjectsViewProps) {
  const { panes, openTab, closeTab } = useEditor();
  const pane = panes.find((p) => p.id === 'projects')!;
  const selectedTechs = pane.tabs.map((t) => t.id);
  const allTags = Array.from(new Set(projects.flatMap((p) => p.technologies)));

  function toggleTech(tag: string) {
    if (selectedTechs.includes(tag)) {
      closeTab('projects', tag);
    } else {
      const tech = getTech(tag);
      const Icon = tech?.icon;
      openTab('projects', {
        id: tag,
        title: tech?.label ?? tag,
        icon: Icon ? <Icon size={14} color={tech?.color} aria-hidden="true" /> : undefined,
        content: null,
      });
    }
  }

  const filtered =
    selectedTechs.length === 0
      ? projects
      : projects.filter((p) => p.technologies.some((t) => selectedTechs.includes(t)));

  return (
    <EditorLayout
      singlePane
      disableTabDrag
      mobilePageName="_projects"
      sidebarContent={
        <SidebarProjectsContent
          tags={allTags}
          selected={selectedTechs}
          onToggle={toggleTech}
          open={true}
        />
      }
      staticContent={
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
      }
    />
  );
}
