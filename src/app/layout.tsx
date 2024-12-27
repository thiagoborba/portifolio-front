import { Header, Footer } from '@/Components';
import '@/Components/layout/styles.scss';
import '@/styles/_reset.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
