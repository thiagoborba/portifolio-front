export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'project-1',
    description: 'Duis aute irure dolor in velit esse cillum dolore.',
    tags: ['react', 'typescript'],
    href: 'https://github.com/thiagoborba',
  },
  {
    id: 'project-2',
    title: 'project-2',
    description: 'Duis aute irure dolor in velit esse cillum dolore.',
    tags: ['next.js', 'scss'],
    href: 'https://github.com/thiagoborba',
  },
  {
    id: 'project-3',
    title: 'project-3',
    description: 'Duis aute irure dolor in velit esse cillum dolore.',
    tags: ['javascript', 'canvas'],
    href: 'https://github.com/thiagoborba',
  },
];
