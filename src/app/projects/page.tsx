import { getProjects } from '@/api';
import ProjectsView from './components/ProjectsView';

export const revalidate = 3600;

export default async function Projects() {
  const projects = await getProjects();
  return <ProjectsView projects={projects} />;
}
