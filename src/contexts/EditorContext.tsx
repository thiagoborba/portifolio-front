'use client';
import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useGlobalEditorRegistry } from './GlobalEditorRegistryContext';

export type Tab = {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  active: boolean;
};

export type Pane = {
  id: string;
  tabs: Tab[];
  active: boolean;
};

export interface EditorContextValue {
  panes: Pane[];
  openTab: (paneId: string, tab: Omit<Tab, 'active'>) => void;
  closeTab: (paneId: string, tabId: string) => void;
  activateTab: (paneId: string, tabId: string) => void;
  activatePane: (paneId: string) => void;
  reorderTabs: (paneId: string, newTabs: Tab[]) => void;
  moveTab: (
    fromPaneId: string,
    tabId: string,
    toPaneId: string,
    position: number,
  ) => void;
  openTabInNewPane: (
    fromPaneId: string,
    tabId: string,
    side: 'left' | 'right',
  ) => void;
}

type EditorAction =
  | { type: 'OPEN_TAB'; paneId: string; tab: Omit<Tab, 'active'> }
  | { type: 'CLOSE_TAB'; paneId: string; tabId: string }
  | { type: 'ACTIVATE_TAB'; paneId: string; tabId: string }
  | { type: 'ACTIVATE_PANE'; paneId: string }
  | { type: 'REORDER_TABS'; paneId: string; newTabs: Tab[] }
  | {
      type: 'MOVE_TAB';
      fromPaneId: string;
      tabId: string;
      toPaneId: string;
      position: number;
    }
  | {
      type: 'OPEN_IN_NEW_PANE';
      fromPaneId: string;
      tabId: string;
      side: 'left' | 'right';
    };

interface EditorState {
  panes: Pane[];
}

function closeTabFromPane(
  panes: Pane[],
  paneId: string,
  tabId: string,
): Pane[] {
  return panes.map((pane) => {
    if (pane.id !== paneId) return pane;
    const idx = pane.tabs.findIndex((t) => t.id === tabId);
    if (idx === -1) return pane;
    const wasActive = pane.tabs[idx].active;
    const newTabs = pane.tabs.filter((t) => t.id !== tabId);
    if (wasActive && newTabs.length > 0) {
      const nextIdx = idx < newTabs.length ? idx : newTabs.length - 1;
      newTabs[nextIdx] = { ...newTabs[nextIdx], active: true };
    }
    return { ...pane, tabs: newTabs };
  });
}

function ensureActivePane(panes: Pane[]): Pane[] {
  const hasActive = panes.some((p) => p.active);
  if (hasActive) return panes;
  if (panes.length === 0) return panes;
  return panes.map((p, i) =>
    i === panes.length - 1 ? { ...p, active: true } : p,
  );
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'OPEN_TAB': {
      const { paneId, tab } = action;
      const existingPane = state.panes.find((p) => p.id === paneId);

      if (existingPane) {
        const alreadyOpen = existingPane.tabs.some((t) => t.id === tab.id);
        if (alreadyOpen) {
          const newPanes = state.panes.map((pane) => {
            if (pane.id !== paneId) return { ...pane, active: false };
            return {
              ...pane,
              active: true,
              tabs: pane.tabs.map((t) =>
                t.id === tab.id
                  ? { ...tab, active: true }
                  : { ...t, active: false },
              ),
            };
          });
          return { panes: newPanes };
        }
        const newPanes = state.panes.map((pane) => {
          if (pane.id !== paneId) return { ...pane, active: false };
          return {
            ...pane,
            active: true,
            tabs: [
              ...pane.tabs.map((t) => ({ ...t, active: false })),
              { ...tab, active: true },
            ],
          };
        });
        return { panes: newPanes };
      }

      // Pane não existe — cria novo pane
      const newPane: Pane = {
        id: paneId,
        tabs: [{ ...tab, active: true }],
        active: true,
      };
      return {
        panes: [...state.panes.map((p) => ({ ...p, active: false })), newPane],
      };
    }

    case 'CLOSE_TAB': {
      const { paneId, tabId } = action;
      const panesAfterClose = closeTabFromPane(state.panes, paneId, tabId);
      const targetPane = panesAfterClose.find((p) => p.id === paneId);

      if (
        targetPane &&
        targetPane.tabs.length === 0 &&
        state.panes.length > 1
      ) {
        const filtered = panesAfterClose.filter((p) => p.id !== paneId);
        const wasActive =
          state.panes.find((p) => p.id === paneId)?.active ?? false;
        if (wasActive) {
          const targetPaneIndex = state.panes.findIndex((p) => p.id === paneId);
          const adjacentIndex =
            targetPaneIndex < filtered.length
              ? targetPaneIndex
              : filtered.length - 1;
          return {
            panes: filtered.map((p, i) => ({
              ...p,
              active: i === adjacentIndex,
            })),
          };
        }
        return { panes: filtered };
      }

      return { panes: ensureActivePane(panesAfterClose) };
    }

    case 'ACTIVATE_TAB': {
      const { paneId, tabId } = action;
      const newPanes = state.panes.map((pane) => {
        if (pane.id !== paneId) return { ...pane, active: false };
        return {
          ...pane,
          active: true,
          tabs: pane.tabs.map((t) => ({ ...t, active: t.id === tabId })),
        };
      });
      return { panes: newPanes };
    }

    case 'ACTIVATE_PANE': {
      const { paneId } = action;
      return {
        panes: state.panes.map((p) => ({ ...p, active: p.id === paneId })),
      };
    }

    case 'REORDER_TABS': {
      const { paneId, newTabs } = action;
      return {
        panes: state.panes.map((pane) =>
          pane.id === paneId ? { ...pane, tabs: newTabs } : pane,
        ),
      };
    }

    case 'MOVE_TAB': {
      const { fromPaneId, tabId, toPaneId, position } = action;
      const sourcePane = state.panes.find((p) => p.id === fromPaneId);
      if (!sourcePane) return state;
      const tab = sourcePane.tabs.find((t) => t.id === tabId);
      if (!tab) return state;

      let panesAfterRemove = closeTabFromPane(state.panes, fromPaneId, tabId);

      const sourcePaneAfterRemove = panesAfterRemove.find(
        (p) => p.id === fromPaneId,
      );
      if (
        sourcePaneAfterRemove &&
        sourcePaneAfterRemove.tabs.length === 0 &&
        panesAfterRemove.length > 1
      ) {
        const sourceIndex = panesAfterRemove.findIndex(
          (p) => p.id === fromPaneId,
        );
        panesAfterRemove = panesAfterRemove.filter((p) => p.id !== fromPaneId);
        const wasActive =
          state.panes.find((p) => p.id === fromPaneId)?.active ?? false;
        if (wasActive && fromPaneId !== toPaneId) {
          const adjIdx =
            sourceIndex < panesAfterRemove.length
              ? sourceIndex
              : panesAfterRemove.length - 1;
          panesAfterRemove = panesAfterRemove.map((p, i) => ({
            ...p,
            active: i === adjIdx,
          }));
        }
      }

      const newPanes = panesAfterRemove.map((pane) => {
        if (pane.id !== toPaneId) return { ...pane, active: false };
        const alreadyExists = pane.tabs.some((t) => t.id === tab.id);
        if (alreadyExists) {
          return {
            ...pane,
            active: true,
            tabs: pane.tabs.map((t) => ({ ...t, active: t.id === tab.id })),
          };
        }
        const newTabs = [...pane.tabs.map((t) => ({ ...t, active: false }))];
        const insertAt = Math.min(position, newTabs.length);
        newTabs.splice(insertAt, 0, { ...tab, active: true });
        return { ...pane, active: true, tabs: newTabs };
      });

      return { panes: newPanes };
    }

    case 'OPEN_IN_NEW_PANE': {
      const { fromPaneId, tabId, side } = action;
      const sourcePane = state.panes.find((p) => p.id === fromPaneId);
      if (!sourcePane) return state;
      const tab = sourcePane.tabs.find((t) => t.id === tabId);
      if (!tab) return state;

      let panesAfterRemove = closeTabFromPane(state.panes, fromPaneId, tabId);

      const sourcePaneAfterRemove = panesAfterRemove.find(
        (p) => p.id === fromPaneId,
      );
      if (
        sourcePaneAfterRemove &&
        sourcePaneAfterRemove.tabs.length === 0 &&
        panesAfterRemove.length > 1
      ) {
        const sourceIndex = panesAfterRemove.findIndex(
          (p) => p.id === fromPaneId,
        );
        panesAfterRemove = panesAfterRemove.filter((p) => p.id !== fromPaneId);
        const adjIdx =
          sourceIndex < panesAfterRemove.length
            ? sourceIndex
            : panesAfterRemove.length - 1;
        panesAfterRemove = panesAfterRemove.map((p, i) => ({
          ...p,
          active: i === adjIdx,
        }));
      }

      const newPane: Pane = {
        id: crypto.randomUUID(),
        tabs: [{ ...tab, active: true }],
        active: true,
      };

      const inactivePanes = panesAfterRemove.map((p) => ({
        ...p,
        active: false,
      }));

      const resultPanes =
        side === 'left'
          ? [newPane, ...inactivePanes]
          : [...inactivePanes, newPane];

      return { panes: resultPanes };
    }

    default:
      return state;
  }
}

// Tipos de DnD (internos ao módulo)
interface DragState {
  tabId: string;
  fromPaneId: string;
}
interface DropIndicator {
  paneId: string;
  tabId: string;
  side: 'before' | 'after';
}
interface EditorDndContextValue {
  dragging: DragState | null;
  dropIndicator: DropIndicator | null;
  setDragging: (s: DragState | null) => void;
  setDropIndicator: (s: DropIndicator | null) => void;
}
const EditorDndContext = createContext<EditorDndContextValue | null>(null);

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({
  children,
  initialPanes = [],
  routeKey,
}: {
  children: React.ReactNode;
  initialPanes?: Pane[];
  routeKey?: string;
}) {
  const registry = useGlobalEditorRegistry();

  // Read the persisted state only once at mount time (useReducer ignores
  // the initial value after the first render, so it is safe to capture it
  // eagerly in a ref and pass it as the lazy initializer argument).
  const initialPanesRef = useRef<Pane[] | null>(null);
  if (initialPanesRef.current === null) {
    const saved = routeKey ? registry.getSlice(routeKey) : undefined;
    initialPanesRef.current = saved ? saved.panes : initialPanes;
  }

  const [state, dispatch] = useReducer(editorReducer, { panes: initialPanesRef.current });
  const [dragging, setDragging] = useState<DragState | null>(null);
  const [dropIndicator, setDropIndicator] = useState<DropIndicator | null>(
    null,
  );

  useEffect(() => {
    if (!routeKey) return;
    registry.saveSlice(routeKey, state.panes);
  }, [routeKey, state.panes]); // eslint-disable-line react-hooks/exhaustive-deps

  const openTab = useCallback((paneId: string, tab: Omit<Tab, 'active'>) => {
    dispatch({ type: 'OPEN_TAB', paneId, tab });
  }, []);

  const closeTab = useCallback((paneId: string, tabId: string) => {
    dispatch({ type: 'CLOSE_TAB', paneId, tabId });
  }, []);

  const activateTab = useCallback((paneId: string, tabId: string) => {
    dispatch({ type: 'ACTIVATE_TAB', paneId, tabId });
  }, []);

  const activatePane = useCallback((paneId: string) => {
    dispatch({ type: 'ACTIVATE_PANE', paneId });
  }, []);

  const reorderTabs = useCallback((paneId: string, newTabs: Tab[]) => {
    dispatch({ type: 'REORDER_TABS', paneId, newTabs });
  }, []);

  const moveTab = useCallback(
    (fromPaneId: string, tabId: string, toPaneId: string, position: number) => {
      dispatch({ type: 'MOVE_TAB', fromPaneId, tabId, toPaneId, position });
    },
    [],
  );

  const openTabInNewPane = useCallback(
    (fromPaneId: string, tabId: string, side: 'left' | 'right') => {
      dispatch({ type: 'OPEN_IN_NEW_PANE', fromPaneId, tabId, side });
    },
    [],
  );

  return (
    <EditorContext.Provider
      value={{
        panes: state.panes,
        openTab,
        closeTab,
        activateTab,
        activatePane,
        reorderTabs,
        moveTab,
        openTabInNewPane,
      }}
    >
      <EditorDndContext.Provider
        value={{ dragging, setDragging, dropIndicator, setDropIndicator }}
      >
        {children}
      </EditorDndContext.Provider>
    </EditorContext.Provider>
  );
}

export function useEditor(): EditorContextValue {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be used within EditorProvider');
  return ctx;
}

export function useEditorDndState(): EditorDndContextValue {
  const ctx = useContext(EditorDndContext);
  if (!ctx)
    throw new Error('useEditorDndState must be used within EditorProvider');
  return ctx;
}
