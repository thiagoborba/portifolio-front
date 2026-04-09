'use client';

import { GlobalEditorRegistryProvider } from '@/contexts/GlobalEditorRegistryContext';

export function ClientShell({ children }: { children: React.ReactNode }) {
  return <GlobalEditorRegistryProvider>{children}</GlobalEditorRegistryProvider>;
}
