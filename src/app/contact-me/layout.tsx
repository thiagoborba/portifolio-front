import SidebarContact from './components/Sidebar';
import './contact.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-stack">
      <SidebarContact />
      {children}
    </div>
  );
}
