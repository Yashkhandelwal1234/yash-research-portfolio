import { buildUsddDefiLlamaBlocks, getUsddDefiLlamaMetadata } from "../data/defillama/usddAdapter";
import type { DashboardDataMode, DashboardSpec } from "../types/content";

export const STATIC_MANUAL_DASHBOARD_LABEL = "Static/manual snapshot — not live data.";
export const CACHED_DEFILLAMA_DASHBOARD_LABEL = "Cached DefiLlama snapshot — not live data.";
export const MIXED_MANUAL_CACHED_DASHBOARD_LABEL = "Mixed manual + cached snapshot — not live data.";

export const DASHBOARD_DATA_MODE_LABELS: Record<DashboardDataMode, string> = {
  "static-manual": STATIC_MANUAL_DASHBOARD_LABEL,
  "cached-defillama": CACHED_DEFILLAMA_DASHBOARD_LABEL,
  "mixed-manual-cached": MIXED_MANUAL_CACHED_DASHBOARD_LABEL,
};

export const DASHBOARD_DATA_MODE_BADGE_LABELS: Record<DashboardDataMode, string> = {
  "static-manual": "manual snapshot",
  "cached-defillama": "cached snapshot",
  "mixed-manual-cached": "mixed snapshot",
};

export function getDashboardDataModeLabel(dataMode: DashboardDataMode) {
  return DASHBOARD_DATA_MODE_LABELS[dataMode];
}

const usddDefiLlamaMetadata = getUsddDefiLlamaMetadata();

export const dashboardSpecs: DashboardSpec[] = [
  {
    slug: "stablecoin-yield-susdd-pendle-monitor",
    title: "Stablecoin Yield / sUSDD Pendle Monitor",
    subtitle: "Manual view of the sUSDD base-yield engine, Pendle position rates, allocator concentration, and risk checks.",
    status: "Building",
    dataMode: "mixed-manual-cached",
    snapshotDate: usddDefiLlamaMetadata.snapshotDate,
    lastUpdated: usddDefiLlamaMetadata.lastUpdated,
    sourceNote: usddDefiLlamaMetadata.sourceNote,
    researchQuestion: "Which parts of the sUSDD/Pendle setup need monitoring before the dashboard becomes automated?",
    relatedArticleSlug: "usdd-pendle-investment-memo",
    blocks: [
      {
        type: "metric-grid",
        title: "Headline Metrics",
        showStaticBadge: true,
        metrics: [
          {
            label: "Supply",
            value: "~$1.4B",
            context: "Manual memo snapshot for USDD supply.",
          },
          {
            label: "On-chain collateral",
            value: "~$2.12B",
            context: "Manual memo snapshot for reported collateral backing.",
          },
          {
            label: "Over-collateralization",
            value: "~150%",
            context: "Manual memo snapshot, not a live collateral ratio.",
          },
          {
            label: "Cumulative earnings",
            value: "~$18.5M",
            context: "Manual memo snapshot for Smart Allocator earnings.",
          },
          {
            label: "TVL",
            value: "$1.30B",
            context: "Manual DeFiLlama screenshot value from the memo workflow.",
          },
          {
            label: "Annualized fees/revenue",
            value: "$5.91M",
            context: "Manual DeFiLlama screenshot value from the memo workflow.",
          },
        ],
      },
      ...buildUsddDefiLlamaBlocks(),
      {
        type: "metric-grid",
        title: "Base sUSDD Yield",
        showStaticBadge: true,
        metrics: [
          {
            label: "Base sUSDD yield",
            value: "3.56%",
            context: "Blended APY from the manual memo snapshot. The base yield is dynamic, so this is not a fixed or live rate.",
          },
        ],
      },
      {
        type: "rate-table",
        title: "Pendle PT / YT / LP Rates",
        showStaticBadge: true,
        rows: [
          {
            label: "YT-sUSDD",
            value: "13.53%",
            yieldType: "Variable yield + incentives",
            note: "Higher-upside side of the Pendle market; payoff depends on future yield, pricing, rewards, and time to maturity.",
            includesIncentives: true,
          },
          {
            label: "PT-sUSDD",
            value: "7.88%",
            yieldType: "Fixed yield if held to maturity",
            note: "PT converts the dynamic base yield into a fixed-rate position after entry, assuming hold to maturity.",
          },
          {
            label: "LP-sUSDD",
            value: "9.31%",
            yieldType: "Liquidity provider yield",
            note: "LP APY includes trading fees, pool yield, PENDLE rewards, and campaign incentives.",
            includesIncentives: true,
          },
        ],
      },
      {
        type: "allocation-table",
        title: "Smart Allocator Allocation",
        showStaticBadge: true,
        rows: [
          {
            venue: "Spark",
            share: "86.55%",
            approximateCapital: "~$714M",
            note: "Largest allocator venue in the manual snapshot.",
          },
          {
            venue: "Aave",
            share: "13.5%",
            approximateCapital: "~$112.6M",
          },
          {
            venue: "Morpho",
            share: "0.37%",
            approximateCapital: "~$3M",
          },
        ],
      },
      {
        type: "trend-chart",
        title: "Quarterly Earnings Trend",
        showStaticBadge: true,
        points: [
          { period: "Q2 2025", earningsUsd: 279460, label: "$279.46K" },
          { period: "Q3 2025", earningsUsd: 636680, label: "$636.68K" },
          { period: "Q4 2025", earningsUsd: 608040, label: "$608.04K" },
          { period: "Q1 2026", earningsUsd: 884940, label: "$884.94K" },
          { period: "Q2 2026", earningsUsd: 1010000, label: "$1.01M" },
        ],
      },
      {
        type: "note",
        title: "Incentive vs Organic Yield",
        tone: "info",
        text: "Base yield is the sustainable engine. Campaign rewards are the accelerator. The dashboard should separate organic allocator yield from incentive-heavy Pendle APYs.",
      },
      {
        type: "risk-checklist",
        title: "Risk Checklist",
        showStaticBadge: true,
        items: [
          {
            label: "Allocator concentration",
            detail: "Smart Allocator is diversified across Spark, Aave, and Morpho, but the manual snapshot is still heavily weighted toward Spark at 86.55%.",
            level: "amber",
          },
          {
            label: "Post-campaign yield",
            detail: "The Pendle campaign can make APYs look attractive. The key question is whether capital stays after rewards fade.",
            level: "amber",
          },
          {
            label: "Yield compression",
            detail: "Because USDD's base yield is dynamic, it can move lower if lending rates or market-wide stablecoin yields compress.",
            level: "amber",
          },
          {
            label: "Peg and redemption depth",
            detail: "sUSDD is redeemable for USDD, but the broader system still depends on collateral quality, liquidity, liquidation execution, and market confidence.",
            level: "red",
          },
          {
            label: "Integration risk",
            detail: "Pendle, sUSDD, Smart Allocator, and the underlying venues all add technical and smart-contract exposure.",
            level: "red",
          },
        ],
      },
      {
        type: "source-list",
        title: "Source Links",
        sources: [
          {
            label: "USDD Smart Allocator",
            url: "https://usdd.io/sa",
            note: "Manual review page for allocator context; no API integration is active.",
          },
          {
            label: "sUSDD Mechanism",
            url: "https://docs.usdd.io/system-architecture/susdd-mechanism",
            note: "USDD documentation for the yield-bearing sUSDD mechanism.",
          },
          {
            label: "DeFiLlama USDD",
            url: "https://defillama.com/protocol/usdd",
            note: "Manual review page; cached values are generated locally with npm run data:defillama, not fetched live in the browser.",
          },
          {
            label: "DefiLlama API Docs",
            url: "https://api-docs.defillama.com/",
            note: "Reference for the free endpoints used by the local cache script; no Pro API or key is used.",
          },
          {
            label: "Pendle sUSDD Market",
            url: "https://app.pendle.finance/trade/markets/0x45252f9a932910abc436644f0b29f5531f0eb4cc/limit-order?chain=ethereum&view=yt",
            note: "Manual review page for Pendle market rates and position data.",
          },
          {
            label: "Pendle PT/YT/LP Cheatsheet",
            url: "https://pendle.gitbook.io/pendle-academy/cheatsheet-for-the-impatient/pt-yt-lp-cheatsheet",
            note: "Reference for how PT, YT, and LP positions behave.",
          },
        ],
      },
      {
        type: "future-data-sources",
        title: "Future Data Sources",
        items: [
          "DefiLlama live/browser refresh - not active in Phase 2",
          "Dune API candidate - not connected in Phase 2",
          "CoinGlass candidate - not connected in Phase 2",
        ],
      },
    ],
  },
];

export function getDashboardSpec(specSlug?: string) {
  if (!specSlug) return undefined;
  return dashboardSpecs.find(spec => spec.slug === specSlug);
}
