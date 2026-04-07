import { EditorLayout } from '@/Components/EditorLayout';
import { EditorTabBar } from '@/Components/EditorTabBar';
import { SideBarContent } from './components/Sidebar';
import './contact.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <EditorLayout
      sidebarContent={<SideBarContent open={true} />}
      mobileSidebarContent={<SideBarContent open={false} />}
      tabBar={<EditorTabBar />}
    >
      {children}
    </EditorLayout>
  );
}
