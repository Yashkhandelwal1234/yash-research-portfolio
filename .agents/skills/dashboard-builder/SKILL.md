---
name: dashboard-builder
description: Build and update manual or cached dashboard specs for the Spotify-inspired research portfolio through Codex only.
---

# Dashboard Builder

Use this skill when creating or updating dashboard specs, dashboard cards, or dashboard detail UI in this portfolio repo.

## Read First

Before editing, inspect:

- `docs/dashboard-builder-agent.md`
- `src/app/types/content.ts`
- `src/app/content/dashboardSpecs.ts`
- `src/app/content/dashboards.ts`
- `src/app/content/agents.ts`
- `src/app/App.tsx`

If a dashboard is related to an article, inspect that article content before copying any numbers.

## Guardrails

- Preserve the Vite + React + TypeScript + Tailwind app.
- Preserve the existing internal state page system in `src/app/App.tsx`.
- Do not add React Router routes.
- Do not add a backend, database, scheduler, OpenAI API, Dune API, or CoinGlass.
- Do not add DefiLlama browser live fetches, Vercel build-time fetches, Pro API usage, SDKs, keys, or secrets.
- DefiLlama is allowed only as the local cached snapshot layer documented in `docs/dashboard-builder-agent.md`.
- Do not add new chart or UI libraries.
- Use Recharts only when a static chart fits cleanly and Recharts is already installed.
- Keep dashboard data in typed content objects.
- Keep `src/app/App.tsx` small enough to understand; extract bulky dashboard UI into `src/app/components/dashboard/`.

## Data Rules

- Every dashboard spec must include `dataMode`, `snapshotDate`, `lastUpdated`, and `sourceNote`.
- Valid data modes are `static-manual`, `cached-defillama`, and `mixed-manual-cached`.
- Every visible dashboard detail must say one of these labels: "Static/manual snapshot — not live data.", "Cached DefiLlama snapshot — not live data.", or "Mixed manual + cached snapshot — not live data."
- Copy only data already present in the repo or explicitly provided by Yash.
- DefiLlama values may come from the committed cache under `src/app/data/defillama/cache/`.
- Do not invent live data.
- Do not claim live refresh, automation, API ingestion, connector ingestion, or database storage exists unless the connector exists and has been tested in this repo.
- Use source links as manual review links unless a future task explicitly adds a real integration.
- Preserve source links, source labels, dates, snapshot metadata, and uncertainty.
- Separate facts, interpretation, and open risks.

## Block Pattern

Dashboard specs use `blocks` in `src/app/content/dashboardSpecs.ts`.

Choose blocks based on the dashboard question. Do not force every dashboard into the sUSDD/Pendle sample structure.

Available block types:

- `metric-grid`
- `rate-table`
- `allocation-table`
- `trend-chart`
- `note`
- `risk-checklist`
- `source-list`
- `external-research-links`
- `future-data-sources`

Use `trend-chart` only for static chart data and only with the existing Recharts dependency. Use `future-data-sources` only for planned sources that are clearly labeled as not connected.

## Manual Dune Proof of Work

Phase 3 uses Dune only for a manually built public research dashboard. It does not add a Dune API, MCP connection, SDK, key, CSV export, cache, scheduler, browser fetch, or build-time fetch.

- Read `docs/dune-workflow.md` before building or linking Dune work.
- Verify the market and token contracts in the official product and Dune Data Explorer before writing analytical queries.
- Use `external-research-links` with `status: "planned"` until a real public dashboard URL exists.
- Add a `url` and verified numeric `queryIds` only after the public Dune dashboard and queries exist.
- Keep the portfolio label clear: a manual Dune source is external research proof, not live portfolio data.

## DefiLlama Cached Blocks

Use cached DefiLlama blocks only when the task explicitly includes the Phase 2 DefiLlama layer.

- Refresh the cache manually with `npm run data:defillama`.
- Run `npm run data:check` after every refresh. It is offline and read-only; it validates the cached snapshot before it is committed.
- Do not fetch DefiLlama from React components, browser effects, Vercel build hooks, or GitHub Actions.
- Use the adapter in `src/app/data/defillama/` to convert cached values into dashboard blocks.
- Label cached blocks with `dataBadge: "cached-defillama"`.
- Keep manual Pendle PT/YT/LP rates unless the exact sUSDD Pendle pool id is verified in a future task.
- If a refresh or check fails, do not hand-edit substitute values or commit the cache; keep the previous committed cache and report the full Terminal error.
- A cache older than 14 days produces a warning, not a failure. Refresh it when practical and keep the dashboard labeled as cached or mixed, never live.

## Implementation Checklist

1. Update shared dashboard types first.
2. Add or edit a dashboard spec in `src/app/content/dashboardSpecs.ts`.
3. Build the spec from reusable dashboard blocks.
4. Link the card in `src/app/content/dashboards.ts` with `specSlug`.
5. Update `src/app/content/agents.ts` only when the Dashboard Builder Agent metadata changes.
6. Keep dashboard UI consistent with the Spotify-style theme: dark cards, green accent, dense layout, rounded buttons.
7. Do not touch unrelated pages or article content unless strictly required.
8. Run `npm run data:defillama` when DefiLlama cache code or cached values changed.
9. Run `npm run data:check` before committing a cache update.
10. Run `npm run build`.
11. Run `git status --short --branch`.
