'use client';
import { EditorLayout } from '@/Components/EditorLayout';
import { EditorProvider } from '@/contexts/EditorContext';
import { SidebarContent } from '../Sidebar';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <EditorProvider initialPanes={[{ id: 'contact', tabs: [], active: true }]} routeKey="contact-me">
      <EditorLayout
        singlePane
        mobilePageName="_contact-me"
        sidebarContent={<SidebarContent open={true} />}
        mobileSidebarContent={<SidebarContent open={false} />}
        staticContent={children}
      />
    </EditorProvider>
  );
}
