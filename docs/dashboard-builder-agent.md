# Dashboard Builder Agent

This document defines Phase 1 of the Codex-triggered Dashboard Builder Agent for the Spotify-inspired research portfolio.

## Phase 1 Scope

- The agent runs through Codex only.
- The website remains a Vite + React + TypeScript + Tailwind app.
- Dashboard content stays in the existing TypeScript content-object system.
- Data is static/manual for now.
- Dashboard specs must include `dataMode: "static-manual"`, `snapshotDate`, `lastUpdated`, and `sourceNote`.
- Every dashboard detail UI must clearly show: "Static/manual snapshot — not live data."

## Explicit Non-Goals

Do not add these in Phase 1:

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
3. Copy only numbers that already exist in the repo or that Yash explicitly provides.
4. Add source links as manual review links, not as API integrations.
5. Link the dashboard card to the spec with `specSlug`.
6. Run `npm run build`.

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

## Verification

Before calling Phase 1 complete:

- Run `npm run build`.
- Run `git status --short --branch`.
- Confirm the dashboard page still uses the existing state-based page system.
- Confirm the right research queue and bottom Now Reading bar are unchanged.
- Confirm no secrets, generated files, or ignored source files are included.
