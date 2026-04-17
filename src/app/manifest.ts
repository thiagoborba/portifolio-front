import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Thiago Borba | Front-end Developer',
    short_name: 'Thiago Borba',
    description:
      'Portfolio of Thiago Borba, a front-end developer specializing in React, Next.js, and TypeScript.',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#020618',
    background_color: '#020618',
    display: 'standalone',
    start_url: '/',
  };
}
