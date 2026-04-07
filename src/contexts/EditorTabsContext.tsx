'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';

export type TabEntry = {
  id: string;
  label: string;
  iconKey?: string;
};

type TabsState = Record<string, TabEntry[]>;
type ActiveTabsState = Record<string, string | null>;

interface EditorTabsContextValue {
  tabs: TabsState;
  activeTabIds: ActiveTabsState;
  openTab: (path: string, tab: TabEntry) => void;
  closeTab: (path: string, tabId: string) => void;
  reorderTabs: (path: string, newTabs: TabEntry[]) => void;
  setActiveTab: (path: string, tabId: string | null) => void;
}

const EditorTabsContext = createContext<EditorTabsContextValue | null>(null);

export function EditorTabsProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useState<TabsState>({});
  const [activeTabIds, setActiveTabIds] = useState<ActiveTabsState>({});

  const openTab = useCallback((path: string, tab: TabEntry) => {
    setTabs((prev) => {
      const existing = prev[path] ?? [];
      if (existing.some((t) => t.id === tab.id)) return prev;
      return { ...prev, [path]: [...existing, tab] };
    });
  }, []);

  const closeTab = useCallback((path: string, tabId: string) => {
    setTabs((prev) => {
      const existing = prev[path] ?? [];
      return { ...prev, [path]: existing.filter((t) => t.id !== tabId) };
    });
  }, []);

  const reorderTabs = useCallback((path: string, newTabs: TabEntry[]) => {
    setTabs((prev) => ({ ...prev, [path]: newTabs }));
  }, []);

  const setActiveTab = useCallback((path: string, tabId: string | null) => {
    setActiveTabIds((prev) => ({ ...prev, [path]: tabId }));
  }, []);

  return (
    <EditorTabsContext.Provider value={{ tabs, activeTabIds, openTab, closeTab, reorderTabs, setActiveTab }}>
      {children}
    </EditorTabsContext.Provider>
  );
}

export function useEditorTabs(): EditorTabsContextValue {
  const ctx = useContext(EditorTabsContext);
  if (!ctx) throw new Error('useEditorTabs must be used within EditorTabsProvider');
  return ctx;
}
