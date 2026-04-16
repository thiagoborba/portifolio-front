import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/constants';
import { JsonLd } from '@/lib/json-ld';
import ContactLayout from './components/ContactLayout';
import './contact.scss';

export const metadata: Metadata = {
  title: 'Contact Me',
  description: 'Get in touch with Thiago Borba. Send a message through the contact form.',
  alternates: { canonical: '/contact-me' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: 'Contact Me', item: `${SITE_URL}/contact-me` },
          ],
        }}
      />
      <ContactLayout>{children}</ContactLayout>
    </>
  );
}
