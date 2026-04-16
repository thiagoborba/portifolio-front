import type { Metadata } from 'next';
import { getProjects } from '@/api';
import { SITE_URL } from '@/lib/constants';
import { JsonLd } from '@/lib/json-ld';
import ProjectsView from './components/ProjectsView';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source projects and repositories by Thiago Borba. Filter by technology: React, TypeScript, Node.js, and more.',
  alternates: { canonical: '/projects' },
};

export default async function Projects() {
  const projects = await getProjects();
  return (
    <>
      <h1 className="sr-only">Projects by Thiago Borba</h1>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/projects` },
          ],
        }}
      />
      <ProjectsView projects={projects} />
    </>
  );
}
