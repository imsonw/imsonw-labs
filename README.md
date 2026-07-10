# imsonw-labs

Portfolio & blog cá nhân — single-page site xây bằng React + Vite, hỗ trợ song ngữ (vi/en) và dark/light theme.

## Tech stack

- React 19 + Vite
- No router — điều hướng qua `useState` tab switch trong `src/App.jsx`
- No CSS framework — theming bằng CSS custom properties (`src/index.css`)
- Lint bằng [oxlint](https://oxc.rs)

## Commands

```bash
npm run dev       # dev server với HMR
npm run build     # production build ra dist/
npm run lint      # lint với oxlint
npm run preview   # serve thử bản build production
```

## Cấu trúc nội dung

Toàn bộ nội dung site (bài viết, project, UI strings) nằm trong `src/data/` dưới dạng object JS — component chỉ render, không chứa nội dung cứng. Xem `CLAUDE.md` để biết chi tiết kiến trúc.


## Deploy

Site được deploy tự động trên [Vercel](https://vercel.com) — mỗi push lên `main` tạo một production deployment mới, mỗi PR có preview deployment riêng.
