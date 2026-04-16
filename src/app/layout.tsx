import type { Metadata } from 'next';
import { Header, Footer } from '@/Components';
import { ClientShell } from '@/Components/ClientShell';
import { JsonLd } from '@/lib/json-ld';
import { SITE_URL } from '@/lib/constants';
import '@/Components/Layout/styles.scss';
import '@/styles/_reset.scss';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Thiago Borba | Front-end Developer',
    template: '%s | Thiago Borba',
  },
  description:
    'Portfolio of Thiago Borba, a front-end developer specializing in React, Next.js, and TypeScript. Explore projects, experience, and get in touch.',
  keywords: ['front-end developer', 'React', 'Next.js', 'TypeScript', 'portfolio', 'Thiago Borba'],
  authors: [{ name: 'Thiago Borba' }],
  creator: 'Thiago Borba',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Thiago Borba | Portfolio',
    title: 'Thiago Borba | Front-end Developer',
    description:
      'Portfolio of Thiago Borba, a front-end developer specializing in React, Next.js, and TypeScript.',
    images: [
      {
        url: '/images/projects/portifolio-front.png',
        width: 1200,
        height: 630,
        alt: 'Thiago Borba - Front-end Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thiago Borba | Front-end Developer',
    description:
      'Portfolio of Thiago Borba, a front-end developer specializing in React, Next.js, and TypeScript.',
    images: ['/images/projects/portifolio-front.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Person',
                '@id': `${SITE_URL}/#person`,
                name: 'Thiago Borba',
                jobTitle: 'Front-end Developer',
                url: SITE_URL,
                sameAs: ['https://github.com/thiagoborba'],
                knowsAbout: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js'],
              },
              {
                '@type': 'WebSite',
                '@id': `${SITE_URL}/#website`,
                url: SITE_URL,
                name: 'Thiago Borba | Portfolio',
                author: { '@id': `${SITE_URL}/#person` },
              },
            ],
          }}
        />
        <ClientShell>
          <div className="outside-container">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ClientShell>
      </body>
    </html>
  );
}
