import Sidebar from '@/Components/Sidebar';
import './contact.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-stack">
      <Sidebar />
      {children}
    </div>
  );
}
