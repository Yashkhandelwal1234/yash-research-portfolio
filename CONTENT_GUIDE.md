# Content Editing Guide

This project keeps the UI in `src/app/App.tsx` and the editable portfolio content in `src/app/content/`.

## Add A New Article

Add a new object to `articles` in `src/app/content/articles.ts`.

Required fields:

```ts
{
  slug: "my-research-slug",
  title: "Research Title",
  thesis: "Short subtitle or thesis used in cards and article headers.",
  tags: ["DeFi", "Stablecoins"],
  date: "2025-01-20",
  readTime: 12,
  status: "Memo",
  category: "Stablecoin Yield",
  content: []
}
```

Use a unique `slug`; dashboards link to articles through `relatedArticleSlug`.

## Place An Image Between Paragraphs

Article bodies are rendered in the exact order of the `content` array. To place an image between paragraphs, insert a `figure` block between two `paragraph` blocks:

```ts
[
  { type: "paragraph", text: "Paragraph before the image." },
  {
    type: "figure",
    src: "/research/usdd-pendle/tvl-revenue.png",
    alt: "TVL and revenue chart for USDD",
    caption: "Short caption for the chart."
  },
  { type: "paragraph", text: "Paragraph after the image." }
]
```

If `src` is missing or the image cannot load, the article page shows the clean abstract placeholder.

## Add An Agent

Add a new object to `agents` in `src/app/content/agents.ts`.

Use status honestly:

- `Planned`: idea or backlog item, no working system yet.
- `Building`: in progress or partially working.
- `Live`: usable now, with a real `githubUrl` or `demoUrl` when relevant.

## Add A Dashboard

Add a new object to `dashboards` in `src/app/content/dashboards.ts`.

Use one of these tools: `Dune`, `Observable`, `Streamlit`, `Python`, or `Custom`.

Use status honestly:

- `Planned`: dashboard concept only.
- `Building`: query, notebook, app, or data flow is in progress.
- `Live`: dashboard is usable now, ideally with an `externalUrl` or `embedUrl`.

## Add Public Image Files

Vite serves files in `public/` from the site root. For the USDD/Pendle placeholders, put real files here:

```text
public/research/usdd-pendle/tvl-revenue.png
public/research/usdd-pendle/income-statement.png
public/research/usdd-pendle/allocator-distribution.png
public/research/usdd-pendle/pendle-market-structure.png
```

Then reference them in article blocks as:

```text
/research/usdd-pendle/tvl-revenue.png
```
