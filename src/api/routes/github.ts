import client from '../client';

export type Snippet = {
  repo: string;
  filename: string;
  html: string;
};

export type Project = {
  id: string;
  name: string;
  description: string | null;
  githubUrl: string;
  technologies: string[];
  language: string | null;
  stars: number;
  updatedAt: string;
  homepage: string | null;
};

export async function getSnippets(): Promise<Snippet[]> {
  const { data } = await client.get<Snippet[]>('/github/snippets');
  return data;
}

export async function getProjects(): Promise<Project[]> {
  const { data } = await client.get<Project[]>('/github/projects');
  return data;
}
