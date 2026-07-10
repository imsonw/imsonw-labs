# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run lint` — lint with oxlint (config in `.oxlintrc.json`)
- `npm run preview` — serve the production build locally

There is no test suite or TypeScript; the codebase is plain JSX (React 19 + Vite).

## Architecture

This is a single-page portfolio/blog site with no router. Navigation is a `useState('home')` tab switch in `src/App.jsx` (`MainLayout.renderContent()`), which swaps between the four page components in `src/components/` (Hero, Projects, Blog, Contact). To add a page: create the component, add a case to `renderContent()`, and add a nav entry in `Navbar.jsx`.

### Global state: AppContext

`src/context/AppContext.jsx` provides the single context (`useApp()` hook) with:
- **Language** (`vi`/`en`, default `vi`) — persisted to `localStorage` as `blog_lang`; `t(key)` looks up UI strings in `src/data/translations.js`.
- **Theme** (`dark`/`light`, default `dark`) — persisted as `blog_theme`; applied as a `dark`/`light` class on `<html>`, which selects the CSS-variable blocks in `src/index.css`.

### Content is data, not markup

All site content lives in `src/data/` as JS objects; components only render it:
- `posts.js` — blog posts. Each post's `content` is a per-language array of typed blocks; `Blog.jsx` renders block types `paragraph`, `heading`, `list`, `code`, and `quote`. Adding a post means appending an object here — no component changes.
- `projects.js` — project case studies with `category: 'product' | 'tech'` (used by the Projects filter) and per-language `details` (context/problem/solution/result).
- `translations.js` — UI strings keyed by language.

**Bilingual rule:** every user-facing string must have both `vi` and `en` variants. Content fields are `{ vi, en }` objects selected by `language`; UI chrome goes through `t()`.

### Styling

No CSS framework. Theming relies on CSS custom properties defined per-theme in `src/index.css` (colors, gradients, glass effects); shared layout/animation styles in `src/App.css`. Components use these variables via inline `style` objects and a small set of global classes — when styling, reference the existing `--bg-*`, `--text-*`, `--accent-*` variables so both themes work. Icons come from `lucide-react`.
