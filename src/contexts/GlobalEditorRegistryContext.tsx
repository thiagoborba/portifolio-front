'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { Pane } from './EditorContext';

interface RegistrySlice {
  panes: Pane[];
}

type RegistryState = Record<string, RegistrySlice>;

type RegistryAction = {
  type: 'SAVE';
  routeKey: string;
  panes: Pane[];
};

function registryReducer(state: RegistryState, action: RegistryAction): RegistryState {
  switch (action.type) {
    case 'SAVE':
      return { ...state, [action.routeKey]: { panes: action.panes } };
    default:
      return state;
  }
}

interface RegistryContextValue {
  getSlice: (routeKey: string) => RegistrySlice | undefined;
  saveSlice: (routeKey: string, panes: Pane[]) => void;
}

const GlobalEditorRegistryContext = createContext<RegistryContextValue | null>(null);

export function GlobalEditorRegistryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(registryReducer, {});

  const getSlice = useCallback(
    (routeKey: string): RegistrySlice | undefined => state[routeKey],
    [state],
  );

  const saveSlice = useCallback((routeKey: string, panes: Pane[]) => {
    dispatch({ type: 'SAVE', routeKey, panes });
  }, []);

  return (
    <GlobalEditorRegistryContext.Provider value={{ getSlice, saveSlice }}>
      {children}
    </GlobalEditorRegistryContext.Provider>
  );
}

export function useGlobalEditorRegistry(): RegistryContextValue {
  const ctx = useContext(GlobalEditorRegistryContext);
  if (!ctx) {
    throw new Error('useGlobalEditorRegistry must be used within GlobalEditorRegistryProvider');
  }
  return ctx;
}
