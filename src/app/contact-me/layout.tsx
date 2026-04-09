'use client';
import { EditorLayout } from '@/Components/EditorLayout';
import { EditorProvider } from '@/contexts/EditorContext';
import { SideBarContent } from './components/Sidebar';
import './contact.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <EditorProvider initialPanes={[{ id: 'contact', tabs: [], active: true }]} routeKey="contact-me">
      <EditorLayout
        sidebarContent={<SideBarContent open={true} />}
        mobileSidebarContent={<SideBarContent open={false} />}
        staticContent={children}
      />
    </EditorProvider>
  );
}
