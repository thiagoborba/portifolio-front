# thiago-borba — Portfolio

Personal portfolio website built with a VS Code-inspired aesthetic: sidebar with icon tabs, file-tree explorer, editor tabs, and a dark editor-style layout throughout.

**Live:** https://portifolio-front-five.vercel.app

## Pages

| Route | Description | Rendering |
| --- | --- | --- |
| `/` | Landing — name, title, and a carousel of code snippets fetched from GitHub | ISR — revalidates every 24h |
| `/about-me` | Interactive file-tree explorer with personal info, hobbies, and code snippets | SSG — data is a local TS module |
| `/projects` | GitHub repositories fetched from the backend, displayed as project cards | ISR — revalidates every 1h |
| `/contact-me` | Contact form with a live code-snippet preview that updates as you type | CSR — no server data |

### Data fetching

`/` and `/projects` use **Incremental Static Regeneration (ISR)**. At build time (and after each revalidation window), Next.js runs the page as an async Server Component, fetches data from the backend, and saves the result as static HTML. Every user request within the window receives the cached HTML instantly — the backend is never called at request time.

When the cache expires and a new request arrives, Next.js serves the stale page immediately and regenerates it in background (stale-while-revalidate). The revalidation windows reflect how often the content changes:

- **86400s (24h)** for snippets — the code carousel is decorative and can be stale for a full day
- **3600s (1h)** for projects — repo metadata updates more frequently

Data flow during build/revalidation:

```
Next.js Server Component
  └─ axios → NEXT_PUBLIC_API_URL (Express backend)
       └─ backend → GitHub API (cached 1h in memory)
            └─ Snippet[] | Project[] (typed)
  └─ HTML saved to Next.js static cache

User request
  └─ cached HTML served — no backend call
       └─ React hydration in browser — no additional fetch
```

## Tech stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Sass** — CSS Modules per component, global design tokens in `src/styles/`
- **react-hook-form** — contact form validation
- **react-shiki** — syntax highlighting in the contact form preview
- **Axios** — API client pointing at the companion Express backend

## Getting started

```bash
# Install dependencies
npm install

# Set backend URL (defaults to http://localhost:8000)
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start dev server
npm run dev
```

The app runs on [http://localhost:3000](http://localhost:3000). The `/projects` page and contact form require the [portifolio-back](../portifolio-back/) API to be running.

## Scripts

```bash
npm run dev      # Next.js dev server with Turbopack
npm run build    # Production build
npm run lint     # ESLint
```

## Design

Design reference: [Figma](https://www.figma.com/design/Ct2b4iTdOoo5mJcVCvdSd7/Portfolio-for-Developers-Concept-V.2.1--Community-?node-id=26532-1280)

## Related

- **Backend** — [portifolio-back](https://github.com/thiagoborba/portifolio-back) — Express 5 API (GitHub repos, contact form via Resend)
