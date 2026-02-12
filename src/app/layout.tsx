import { Header, Footer } from '@/Components';
import '@/Components/Layout/styles.scss';
import '@/styles/_reset.scss';
import { Provider } from '@/components/ui/provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body>
        <div className="outside-container">
          <Header />
          <main>
            <Provider>{children}</Provider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
