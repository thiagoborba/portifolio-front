# thiago-borba — Portfolio

Personal portfolio website built with a VS Code-inspired aesthetic: sidebar with icon tabs, file-tree explorer, editor tabs, and a dark editor-style layout throughout.

**Live:** https://portifolio-front-five.vercel.app

## Pages

| Route         | Description                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| `/`           | Landing — name, title, and a carousel of code snippets fetched from GitHub    |
| `/about-me`   | Interactive file-tree explorer with personal info, hobbies, and code snippets |
| `/projects`   | GitHub repositories fetched from the backend, displayed as project cards      |
| `/contact-me` | Contact form with a live code-snippet preview that updates as you type        |

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
