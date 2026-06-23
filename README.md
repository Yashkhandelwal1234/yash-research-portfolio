# Yash Research Portfolio

Spotify-inspired research portfolio for Web3 and DeFi research. The site presents Yash Khandelwal's public research library, memos, dashboards, and research-agent concepts with a dark, music-library-inspired interface.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS

## Local Setup

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Content Editing

- Articles live in `src/app/content/articles.ts`.
- AI agent entries live in `src/app/content/agents.ts`.
- Dashboard entries live in `src/app/content/dashboards.ts`.
- Shared library shelves and source lists live in `src/app/content/library.ts`.
- Public article images should live under `public/research/<article-slug>/`.
- Source PDFs and import-only research files should stay under the ignored `source/` folder and should not be committed.

Agents and dashboards should only use `Live` status when there is a real usable output or link. Planned or unfinished work should remain marked as `Planned` or `Building`.

## Vercel Deployment

Use these settings for a Vite static deployment:

- Build command: `npm run build`
- Output directory: `dist`

The deployed site is generated from the static files produced by Vite in `dist/`.
