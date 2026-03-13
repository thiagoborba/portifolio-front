import { Header, Footer } from '@/Components';
import '@/Components/Layout/styles.scss';
import '@/styles/_reset.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
      <title>thiago-borba</title>
      <body>
        <div className="outside-container">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
