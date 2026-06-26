---
name: dashboard-builder
description: Build and update static/manual dashboard specs for the Spotify-inspired research portfolio through Codex only.
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
- Do not add a backend, database, scheduler, OpenAI API, DefiLlama API, Dune API, or CoinGlass.
- Do not add new chart or UI libraries.
- Use Recharts only when a static chart fits cleanly and Recharts is already installed.
- Keep dashboard data in typed content objects.
- Keep `src/app/App.tsx` small enough to understand; extract bulky dashboard UI into `src/app/components/dashboard/`.

## Data Rules

- Every dashboard spec must include `dataMode: "static-manual"`, `snapshotDate`, `lastUpdated`, and `sourceNote`.
- Every visible dashboard detail must say: "Static/manual snapshot — not live data."
- Copy only data already present in the repo or explicitly provided by Yash.
- Do not invent live data.
- Do not claim live refresh, automation, API ingestion, or database storage exists.
- Use source links as manual review links unless a future task explicitly adds a real integration.
- Separate facts, interpretation, and open risks.

## Implementation Checklist

1. Update shared dashboard types first.
2. Add or edit a dashboard spec in `src/app/content/dashboardSpecs.ts`.
3. Link the card in `src/app/content/dashboards.ts` with `specSlug`.
4. Update `src/app/content/agents.ts` only when the Dashboard Builder Agent metadata changes.
5. Keep dashboard UI consistent with the Spotify-style theme: dark cards, green accent, dense layout, rounded buttons.
6. Do not touch unrelated pages or article content unless strictly required.
7. Run `npm run build`.
8. Run `git status --short --branch`.
