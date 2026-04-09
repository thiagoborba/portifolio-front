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

Every page route follows this composition:
1. `src/app/<route>/layout.tsx` — wraps with `EditorLayout`, passing a sidebar component and an `EditorTabBar`
2. `EditorLayout` (`src/Components/EditorLayout/`) — renders `<aside>` (sidebar) + optional tab bar + `<div>` (content)
3. `EditorTabBar` / `EditorTab` — tab strip mimicking VS Code; driven by `EditorTabsContext`
4. `page.tsx` — the content rendered inside the editor area

### State management

- **`EditorTabsContext`** (`src/contexts/EditorTabsContext.tsx`) — manages open tabs and active tab keyed by route path (`TabsState = Record<string, TabEntry[]>`). All pages consume it via `useEditorTabs()`.
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
