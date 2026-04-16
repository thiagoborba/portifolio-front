import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { JsonLd } from '@/lib/json-ld';
import AboutView from './components/AboutView';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn about Thiago Borba — bio, technical expertise, education, work experience, and hobbies.',
  alternates: { canonical: '/about-me' },
};

export default function AboutPage() {
  return (
    <>
      <h1 className="sr-only">About Thiago Borba</h1>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'About Me', item: `${SITE_URL}/about-me` },
          ],
        }}
      />
      <AboutView />
    </>
  );
}
