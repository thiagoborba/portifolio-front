import type { Project } from '@/api';

const PROJECT_IMAGES: Record<string, string> = {
  'portifolio-front': '/images/projects/portifolio-front.png',
  'briefing2task-front': '/images/projects/briefing2task-front.png',
  'briefing2tasks-front': '/images/projects/briefing2task-front.png',
};

const GENERIC_TECH_IMAGES = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&q=80',
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function getProjectImage(project: Project): string {
  const specific = PROJECT_IMAGES[project.name];
  if (specific) return specific;

  const index = hashString(project.name) % GENERIC_TECH_IMAGES.length;
  return GENERIC_TECH_IMAGES[index];
}
