# Dune Manual Workflow

## Phase 3 Boundary

Phase 3 creates public, manually maintained Dune proof of work for the portfolio. It does not add a Dune API, MCP connection, SDK, API key, CSV data, cache, scheduler, browser fetch, build-time fetch, or portfolio live data.

The first manual dashboard is:

```text
sUSDD on Pendle: Ethereum Market Monitor
```

## Before the First Query

1. Open the existing Pendle market link in the portfolio and confirm the market is on Ethereum.
2. Record the market, sUSDD, SY, PT, and YT contract addresses from official Pendle information or a verified explorer.
3. In Dune Data Explorer, search those addresses and confirm available Pendle decoded tables or curated DEX coverage.
4. Treat the existing market address in the portfolio as a candidate until this manual verification is complete.

## First Three Queries

1. **sUSDD Pendle: Market Identity**: a table or dashboard text widget with the verified chain, market, sUSDD, SY, PT, and YT contracts plus source links.
2. **sUSDD Pendle: Daily Swap Volume**: daily Ethereum swap volume and trade count using `dex.trades` only after the market or token coverage is verified.
3. **sUSDD Pendle: Unique Senders**: daily count of distinct `tx_from` addresses from the same verified activity definition.

Start later, after the first three queries are correct:

- PT, YT, and SY trade direction.
- Top-10 observed transaction-volume share.
- LP-token movement and verified deposit/withdrawal events.
- Liquidity and incentive analysis from verified decoded events.

## Dune Build Checklist

1. Sign into Dune and select **Create > New Query**.
2. Build and save the Market Identity query first.
3. Use Data Explorer to inspect columns before writing the daily swap query.
4. Filter to `ethereum`, a short date range, and verified contract addresses before the first run.
5. Run a limited result, inspect the rows, then save the query.
6. Add a line visualization for daily swap volume and use **Add to Dashboard**.
7. Create the dashboard with the exact title above and add the unique-senders visualization.
8. Do not schedule refreshes while the definitions are still evolving.

## Cost and Query Safety

- Start with curated Dune tables. Prefer `dex.trades` for swaps and `tokens.transfers` only as a flow signal.
- Always filter by blockchain and a bounded time range. Add project or contract-address filters whenever available.
- Use `LIMIT` during exploration and run selected SQL sections when debugging.
- Avoid `SELECT *`, broad raw-log scans, long minute-price history, and unverified joins.
- Describe top-wallet results as observed transaction-volume concentration, not ownership or investor identity.
- Token transfers do not prove LP deposits or withdrawals without verified Pendle event logic.

## Record After Publishing

Copy these into the portfolio only after the public dashboard exists:

| Field | Record |
| --- | --- |
| Dashboard | Public title and URL |
| Queries | Query title, URL, and numeric query id |
| Scope | Ethereum chain, verified market and token contracts |
| Parameters | Shared defaults such as `start_date` |
| Provenance | Source tables, execution date, and query definition note |

The portfolio's planned Dune card remains non-clickable until a real public URL is available. A manual Dune dashboard is external research proof, not live portfolio data.

## References

- [Dune Query Editor](https://docs.dune.com/web-app/query-editor)
- [Dune Data Explorer](https://docs.dune.com/web-app/query-editor/data-explorer)
- [Dune Dashboards](https://docs.dune.com/web-app/dashboards)
- [Dune DEX Data](https://docs.dune.com/data-catalog/curated/dex-trades/overview)
- [Dune Token Transfers](https://docs.dune.com/data-catalog/curated/token-transfers/evm/token-transfers)
