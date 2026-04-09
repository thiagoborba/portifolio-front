import { Header, Footer } from '@/Components';
import { ClientShell } from '@/Components/ClientShell';
import '@/Components/Layout/styles.scss';
import '@/styles/_reset.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>thiago-borba</title>
      </head>
      <body>
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
