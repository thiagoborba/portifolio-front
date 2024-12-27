import { Header, Footer } from '@/Components';
import './styles.scss';

export default function Layout() {
  return (
    <div className="outside-container">
      <Header />
      <main>{}</main>
      <Footer />
    </div>
  );
}
