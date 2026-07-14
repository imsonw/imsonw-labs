# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run lint` — lint with oxlint (config in `.oxlintrc.json`)
- `npm run preview` — serve the production build locally

There is no test suite or TypeScript; the codebase is plain JSX (React 19 + Vite).

## Architecture

This is a portfolio/blog site routed with `react-router-dom` (`src/App.jsx` defines `<BrowserRouter>`/`<Routes>`). Routes: `/` (Home), `/projects`, `/blog`, `/blog/:slug` (post detail, `:slug` matches a post's `id` in `data/posts.js`), `/contact`, and `*` redirecting to `/`. All routes render inside `src/components/layout/Layout.jsx` (Navbar + `<Outlet/>` + Footer). `vercel.json` has a catch-all rewrite to `index.html` so deep links resolve on Vercel.

To add a page: create a component in `src/pages/`, add a `<Route>` in `App.jsx`, and add a nav entry in `src/components/layout/Navbar.jsx`.

### Folder layout

- `src/pages/` — one component per route (top-level screens only; no shared logic lives here beyond wiring).
- `src/components/layout/` — `Navbar`, `NavActions` (lang/theme toggle, shared between desktop nav and mobile drawer), `Footer`, `Layout`.
- `src/components/ui/` — generic, content-agnostic primitives reused across pages: `SectionHeader` (title+subtitle block), `Input`/`TextArea` (form fields, `Input` takes an optional `icon`), `FilterPill` (`variant="solid"` for category filters, `variant="tag"` for hashtag filters), `Modal` (overlay + panel wrapper; the consumer renders its own content/close button inside).
- `src/components/project/`, `src/components/blog/` — page-specific pieces (`ProjectCard`, `ProjectModal`, `PostCard`) extracted out of their page when reused or when the page file got too large.
- `src/hooks/useLocalStorageState.js` — generic `[value, setValue]` hook that persists to `localStorage`; used by `AppContext` for both `language` and `theme`. Reuse this for any new persisted preference instead of hand-rolling the read/write pattern.
- `src/utils/formatDate.js` — locale-aware date formatting shared by the blog list and post detail pages.

### Global state: AppContext

`src/context/AppContext.jsx` provides the single context (`useApp()` hook) with:
- **Language** (`vi`/`en`, default `vi`) — persisted to `localStorage` as `blog_lang`; `t(key)` looks up UI strings in `src/data/translations.js`.
- **Theme** (`dark`/`light`, default `dark`) — persisted as `blog_theme`; applied as a `dark`/`light` class on `<html>`, which selects the CSS-variable blocks in `src/index.css`.

### Content is data, not markup

All site content lives in `src/data/` as JS objects; components only render it:
- `posts.js` — blog posts. Each post's `content` is a per-language array of typed blocks; `BlogPost.jsx` renders block types `paragraph`, `heading`, `list`, `code`, and `quote`. Adding a post means appending an object here — no component changes (it becomes reachable at `/blog/<id>` automatically).
- `projects.js` — project case studies with `category: 'product' | 'tech'` (used by the Projects filter) and per-language `details` (context/problem/solution/result).
- `resume.js` — skills/experience data rendered by the printable resume on the Contact page.
- `translations.js` — UI strings keyed by language.

**Bilingual rule:** every user-facing string must have both `vi` and `en` variants. Content fields are `{ vi, en }` objects selected by `language`; UI chrome goes through `t()`.

### Styling

No CSS framework. Theming relies on CSS custom properties defined per-theme in `src/index.css` (colors, gradients, glass effects); shared layout/animation styles in `src/App.css`. Components use these variables via inline `style` objects and a small set of global classes — when styling, reference the existing `--bg-*`, `--text-*`, `--accent-*` variables so both themes work. The `ui/` primitives centralize the inline-style objects that used to be copy-pasted across pages — extend those rather than re-inlining a near-identical style block. Icons come from `lucide-react`.
