# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next.js dev server with Turbopack (port 3000)
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured.

## Environment

`.env.local`:
- `NEXT_PUBLIC_API_URL` — backend base URL (defaults to `http://localhost:8000`)

## Architecture

The UI mimics a VS Code editor: sidebar with icon tabs, tree-view file explorer, editor tabs, and a main content pane.

### Path alias

`@/` maps to `src/`. All imports use this alias.

### Page layout pattern

Every page route that uses the editor aesthetic follows this composition:

1. A "View" client component (e.g. `AboutView`, `ProjectsView`) wraps its subtree with `EditorProvider`, passing a `routeKey` string and an `initialPanes` array.
2. Inside the provider, `EditorLayout` renders an `<aside>` (sidebar) and a pane wrapper. For mobile, an alternative `mobileSidebarContent` node is rendered instead of the desktop sidebar.
3. `EditorLayout` reads pane state from `useEditor()` and renders one `EditorPane` per pane, separated by dividers.
4. Each `EditorPane` renders an `EditorTabBar` (with `EditorTab` children) above the active tab's `content` node.
5. For `/contact-me`, `EditorProvider` + `EditorLayout` live in `src/app/contact-me/layout.tsx` and `page.tsx` is passed as `staticContent` (always visible, regardless of tabs).

### State management

- **`EditorContext`** (`src/contexts/EditorContext.tsx`) — core editor state as `{ panes: Pane[] }` managed by `useReducer`. Exposes `openTab`, `closeTab`, `activateTab`, `activatePane`, `reorderTabs`, `moveTab`, `openTabInNewPane`. A sibling `EditorDndContext` (in the same file) tracks drag-and-drop state (`dragging`, `dropIndicator`) and is consumed by `useEditorDnd` (`src/hooks/useEditorDnd.ts`).
- **`GlobalEditorRegistryContext`** (`src/contexts/GlobalEditorRegistryContext.tsx`) — in-memory registry of pane state keyed by `routeKey`. Mounted once at the app root via `ClientShell`. `EditorProvider` reads from it on mount (restoring layout on route re-entry) and writes to it on every state change (persisting across client-side navigations).
- **`routeKey`** — a stable string passed to `EditorProvider` that identifies which registry slot to use (e.g. `"about-me"`, `"projects"`, `"contact-me"`).
- **`FormContext`** (`src/app/contact-me/context/FormContext.tsx`) — syncs contact form field values to the live code snippet preview in the sidebar.

### Shared components

Barrel-exported from `src/Components/index.tsx`. All reusable UI lives here; page-specific components live under `src/app/<route>/components/`.

### Styling

Sass modules (`.module.scss`) per component. Global partials in `src/styles/`: `_colors.scss`, `_variables.scss`, `_reset.scss`, `_responsive.scss`, `_typography.scss`. Import global styles only from layout files, not components.

`clsx` is available for conditional class names.

### Static data

- `src/app/about-me/data.ts` — `TreeNode`/`TreeLeaf` tree structures for the about-me explorer panel; `isLeaf` / `getFirstLeaf` helpers included.
- `src/Constants/index.ts` — `ROUTES` map and `snippetTemplate` (the JS snippet shown in the contact-me sidebar).
- `src/lib/tech-icons.tsx` — maps technology names to `react-icons` icons.
- `src/lib/project-images.ts` — maps project names to image assets.

### API client

`src/api/client.ts` — axios instance pointing at `NEXT_PUBLIC_API_URL`. Route helpers in `src/api/routes/github.ts`.
