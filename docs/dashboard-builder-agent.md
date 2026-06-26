# Dashboard Builder Agent

This document defines Phase 1 and Phase 1.5 of the Codex-triggered Dashboard Builder Agent for the Spotify-inspired research portfolio.

## Phase 1 / 1.5 Scope

- The agent runs through Codex only.
- The website remains a Vite + React + TypeScript + Tailwind app.
- Dashboard content stays in the existing TypeScript content-object system.
- Data is static/manual for now.
- Dashboard specs must include `dataMode: "static-manual"`, `snapshotDate`, `lastUpdated`, and `sourceNote`.
- Dashboard specs are built from reusable content blocks instead of one dashboard-specific shape.
- Every dashboard detail UI must clearly show: "Static/manual snapshot — not live data."

## Explicit Non-Goals

Do not add these in Phase 1 or Phase 1.5:

- OpenAI API
- DefiLlama API
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

## Dashboard Spec Workflow

1. Read `src/app/types/content.ts`, `src/app/content/dashboards.ts`, `src/app/content/dashboardSpecs.ts`, and the related article content before changing dashboard data.
2. Add or update a `DashboardSpec` object.
3. Choose dashboard blocks based on the dashboard's research question.
4. Copy only numbers that already exist in the repo or that Yash explicitly provides.
5. Add source links as manual review links, not as API integrations.
6. Link the dashboard card to the spec with `specSlug`.
7. Run `npm run build`.

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
- Preserve source labels, URLs, dates, and uncertainty.
- If live values have drifted from the static memo snapshot, keep the dashboard labeled as static/manual.
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

The sample now uses generic dashboard blocks. Its content should stay stable while the renderer becomes reusable for future dashboard types.

## Verification

Before calling Phase 1 complete:

- Run `npm run build`.
- Run `git status --short --branch`.
- Confirm the dashboard page still uses the existing state-based page system.
- Confirm the right research queue and bottom Now Reading bar are unchanged.
- Confirm no secrets, generated files, or ignored source files are included.
