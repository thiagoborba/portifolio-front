import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiSass,
  SiJavascript,
  SiHtml5,
  SiNodedotjs,
  SiVuedotjs,
  SiAngular,
  SiPython,
  SiCss,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGo,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

export type TechEntry = {
  label: string;
  icon: IconType;
  color: string;
};

export const techDictionary: Record<string, TechEntry> = {
  react:      { label: 'React',       icon: SiReact,       color: '#61DAFB' },
  typescript: { label: 'TypeScript',  icon: SiTypescript,  color: '#3178C6' },
  'next.js':  { label: 'Next.js',     icon: SiNextdotjs,   color: '#ffffff' },
  nextjs:     { label: 'Next.js',     icon: SiNextdotjs,   color: '#ffffff' },
  scss:       { label: 'SCSS',        icon: SiSass,        color: '#CC6699' },
  sass:       { label: 'Sass',        icon: SiSass,        color: '#CC6699' },
  javascript: { label: 'JavaScript',  icon: SiJavascript,  color: '#F7DF1E' },
  canvas:     { label: 'Canvas',      icon: SiHtml5,       color: '#E34F26' },
  html:       { label: 'HTML',        icon: SiHtml5,       color: '#E34F26' },
  'node.js':  { label: 'Node.js',     icon: SiNodedotjs,   color: '#339933' },
  nodejs:     { label: 'Node.js',     icon: SiNodedotjs,   color: '#339933' },
  vue:        { label: 'Vue',         icon: SiVuedotjs,    color: '#4FC08D' },
  angular:    { label: 'Angular',     icon: SiAngular,     color: '#DD0031' },
  python:     { label: 'Python',      icon: SiPython,      color: '#3776AB' },
  css:        { label: 'CSS',         icon: SiCss,         color: '#1572B6' },
  tailwind:   { label: 'Tailwind',    icon: SiTailwindcss, color: '#06B6D4' },
  prisma:     { label: 'Prisma',      icon: SiPrisma,      color: '#2D3748' },
  postgresql: { label: 'PostgreSQL',  icon: SiPostgresql,  color: '#4169E1' },
  mongodb:    { label: 'MongoDB',     icon: SiMongodb,     color: '#47A248' },
  docker:     { label: 'Docker',      icon: SiDocker,      color: '#2496ED' },
  go:         { label: 'Go',          icon: SiGo,          color: '#00ADD8' },
};

export function getTech(tag: string): TechEntry | undefined {
  return techDictionary[tag.toLowerCase()];
}
