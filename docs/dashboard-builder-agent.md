# Dashboard Builder Agent

This document defines Phase 1, Phase 1.5, Phase 2, and Phase 2.5 of the Codex-triggered Dashboard Builder Agent for the Spotify-inspired research portfolio.

## Phase 1 / 1.5 / 2 / 2.5 Scope

- The agent runs through Codex only.
- The website remains a Vite + React + TypeScript + Tailwind app.
- Dashboard content stays in the existing TypeScript content-object system.
- Data is static/manual or locally cached for now.
- Dashboard specs must include `dataMode`, `snapshotDate`, `lastUpdated`, and `sourceNote`.
- Dashboard specs are built from reusable content blocks instead of one dashboard-specific shape.
- Every dashboard detail UI must clearly show whether data is manual, cached, or mixed.

## Explicit Non-Goals

Do not add these in Phase 1, Phase 1.5, Phase 2, or Phase 2.5:

- OpenAI API
- DefiLlama Pro API
- DefiLlama browser live fetches
- DefiLlama Vercel build-time fetches
- Dune API
- CoinGlass
- backend
- database
- scheduler
- live refresh
- React Router routes
- new chart libraries
- new UI libraries

Future data sources can be named as candidates only when the UI and copy make clear that they are not connected yet.

## Phase 2 DefiLlama Cache

Phase 2 adds DefiLlama as the first free data source through a local cache only.

- Run `npm run data:defillama` manually from Terminal when the cache should be refreshed.
- The script uses built-in Node `fetch`; no package, SDK, API key, or secret is required.
- The script writes `src/app/data/defillama/cache/usdd.json` only after all required requests validate.
- The script writes a same-folder temporary file and atomically replaces `usdd.json` only after that write succeeds.
- The React app imports the committed cache at build time; it does not fetch from DefiLlama in the browser.
- Vercel builds do not fetch from DefiLlama in Phase 2.

Supported data labels:

- `static-manual`: "Static/manual snapshot — not live data."
- `cached-defillama`: "Cached DefiLlama snapshot — not live data."
- `mixed-manual-cached`: "Mixed manual + cached snapshot — not live data."

Cached DefiLlama blocks can show protocol TVL, chain TVL, stablecoin supply, price/peg check, and revenue fields when those values are present in the cache. Do not use DefiLlama yields for Pendle PT/YT/LP rates until the exact sUSDD Pendle pool id has been verified.

## Phase 2.5 Cache Refresh and QA

Refresh the DefiLlama snapshot manually from Terminal. This is not live data, browser fetching, build-time fetching, or scheduled automation.

```bash
cd "/Users/yash/Desktop/Spotify-Inspired Research Portfolio"
npm run data:defillama
npm run data:check
npm run build
git diff -- src/app/data/defillama/cache/usdd.json
git status --short --branch
```

On a successful refresh, the updater prints these three lines with the current timestamp and resolved asset id:

```text
Wrote DefiLlama cache: src/app/data/defillama/cache/usdd.json
Fetched at: 2026-06-26T00:00:00.000Z
USDD stablecoin asset id: 14
```

`npm run data:check` makes no network requests and does not edit the cache. It validates the cache schema, provenance, endpoint statuses, timestamps, USDD identity, required metrics, and history arrays. It warns after 14 days but does not fail just because a manual snapshot is older.

If the refresh or check fails:

1. Do not hand-edit the cache or commit it.
2. Keep the existing committed cache in place.
3. Check the Terminal error, confirm the internet connection, and rerun the same command later.
4. Share the full Terminal error if the failure persists.

When a refresh and validation both pass, review the cache diff and commit only the refreshed cache:

```bash
git add src/app/data/defillama/cache/usdd.json
git commit -m "chore: refresh DefiLlama cache"
```

## Dashboard Spec Workflow

1. Read `src/app/types/content.ts`, `src/app/content/dashboards.ts`, `src/app/content/dashboardSpecs.ts`, and the related article content before changing dashboard data.
2. Add or update a `DashboardSpec` object.
3. Choose dashboard blocks based on the dashboard's research question.
4. Copy only numbers that already exist in the repo, that Yash explicitly provides, or that come from a committed cache file.
5. Add source links as manual review links, not as API integrations.
6. Link the dashboard card to the spec with `specSlug`.
7. Run `npm run data:defillama` only when a DefiLlama cache refresh is part of the task.
8. Run `npm run data:check` after every refresh and before committing a cache update.
9. Run `npm run build`.

## Dashboard Blocks

Phase 1.5 uses a block-based model in `DashboardContentBlock`.

Supported blocks:

- `metric-grid`: compact KPI cards.
- `rate-table`: rate rows such as PT, YT, LP, lending, funding, or revenue rates.
- `allocation-table`: venue, asset, strategy, or capital-allocation rows.
- `trend-chart`: static time-series chart data rendered with the existing Recharts dependency.
- `note`: short interpretation, caveat, or method note.
- `risk-checklist`: risk items with green, amber, or red severity.
- `source-list`: manual source links with notes.
- `future-data-sources`: planned data sources that are not connected yet.

Future dashboards should not be forced into the sUSDD/Pendle structure. Pick only the blocks the dashboard needs, keep titles specific, and preserve the dashboard's question in `researchQuestion`.

## Static Data Rules

- Do not invent numbers.
- Do not present copied memo values as current live values.
- Do not present cached DefiLlama values as current live values.
- Preserve source labels, URLs, dates, and uncertainty.
- If live values have drifted from the static memo snapshot, keep the dashboard labeled as static/manual.
- If DefiLlama values are cached, keep the dashboard labeled as cached or mixed.
- Separate base/organic yield from incentive-heavy campaign APYs.

## Phase 1 Sample Dashboard

The first sample spec is `stablecoin-yield-susdd-pendle-monitor`.

It tracks:

- headline USDD metrics
- base sUSDD yield
- Pendle PT/YT/LP rates
- Smart Allocator allocation
- quarterly earnings trend
- incentive versus organic yield note
- risk checklist
- source links
- static/manual metadata

The sample now uses generic dashboard blocks plus a cached DefiLlama section. Manual Pendle, sUSDD yield, Smart Allocator, and risk content should stay stable unless a later task explicitly replaces a value with a verified cache source.

## Verification

Before calling dashboard work complete:

- Run `npm run data:defillama` if DefiLlama cache code or cached values changed.
- Run `npm run data:check` after the cache refresh.
- Run `npm run build`.
- Run `git diff --check`.
- Run `git status --short --branch`.
- Confirm the dashboard page still uses the existing state-based page system.
- Confirm the right research queue and bottom Now Reading bar are unchanged.
- Confirm no secrets, generated files, or ignored source files are included.
