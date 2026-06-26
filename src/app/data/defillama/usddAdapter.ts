import type { DashboardContentBlock } from "../../types/content";
import usddCacheJson from "./cache/usdd.json";

interface DefiLlamaEndpointStatus {
  id: string;
  label: string;
  url: string;
  ok: boolean;
  status: number;
  fetchedAt: string;
  note?: string;
}

interface DefiLlamaUsddCache {
  schemaVersion: number;
  provider: "DefiLlama";
  fetchedAt: string;
  sources: DefiLlamaEndpointStatus[];
  validationNotes: string[];
  protocol: {
    id: string;
    slug: string;
    name: string;
    category: string;
    chains: string[];
    currentTvlUsd: number;
    currentChainTvlsUsd: { chain: string; tvlUsd: number }[];
    tvlHistory: { date: string; timestamp: number; tvlUsd: number }[];
  };
  stablecoin: {
    assetId: string;
    name: string;
    symbol: string;
    price: number;
    circulatingUsd: number;
    chains: string[];
    supplyHistory: { date: string; timestamp: number; circulatingUsd: number }[];
  };
  feesRevenue: {
    slug: string;
    name: string;
    total24hUsd: number;
    total7dUsd: number;
    total30dUsd: number;
    totalAllTimeUsd: number;
    revenueHistory: { date: string; timestamp: number; revenueUsd: number }[];
  };
}

const usddCache = usddCacheJson as DefiLlamaUsddCache;

function formatUsd(value: number) {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}

function formatPrice(value: number) {
  return `$${value.toFixed(4)}`;
}

function formatShare(value: number, total: number) {
  if (!total) return "0%";
  return `${((value / total) * 100).toFixed(2)}%`;
}

function formatDate(value: string) {
  return value.slice(0, 10);
}

function latestDate<T extends { date: string }>(items: T[]) {
  return items[items.length - 1]?.date ?? formatDate(usddCache.fetchedAt);
}

export function getUsddDefiLlamaMetadata() {
  const snapshotDate = formatDate(usddCache.fetchedAt);

  return {
    snapshotDate,
    lastUpdated: snapshotDate,
    sourceNote: `Mixed manual + cached snapshot. DefiLlama values were fetched locally on ${snapshotDate} with npm run data:defillama and are not live browser data or build-time data.`,
  };
}

export function buildUsddDefiLlamaBlocks(): DashboardContentBlock[] {
  const snapshotDate = formatDate(usddCache.fetchedAt);
  const latestTvlDate = latestDate(usddCache.protocol.tvlHistory);
  const latestSupplyDate = latestDate(usddCache.stablecoin.supplyHistory);
  const latestRevenueDate = latestDate(usddCache.feesRevenue.revenueHistory);
  const chainTvlTotal = usddCache.protocol.currentChainTvlsUsd.reduce((sum, row) => sum + row.tvlUsd, 0);

  return [
    {
      type: "metric-grid",
      title: "DefiLlama Cached Metrics",
      dataBadge: "cached-defillama",
      metrics: [
        {
          label: "Protocol TVL",
          value: formatUsd(usddCache.protocol.currentTvlUsd),
          context: `Cached DefiLlama protocol TVL for USDD. Last TVL point: ${latestTvlDate}.`,
        },
        {
          label: "USDD supply",
          value: formatUsd(usddCache.stablecoin.circulatingUsd),
          context: `Cached stablecoin circulating supply. USDD asset id ${usddCache.stablecoin.assetId} was verified from the stablecoin list.`,
        },
        {
          label: "Price / peg check",
          value: formatPrice(usddCache.stablecoin.price),
          context: `Cached USDD price from DefiLlama stablecoin data. Latest supply point: ${latestSupplyDate}.`,
        },
        {
          label: "24h revenue",
          value: formatUsd(usddCache.feesRevenue.total24hUsd),
          context: `Cached daily revenue summary for USDD. Latest revenue point: ${latestRevenueDate}.`,
        },
        {
          label: "7d revenue",
          value: formatUsd(usddCache.feesRevenue.total7dUsd),
          context: "Cached 7-day DefiLlama revenue total. Not annualized.",
        },
        {
          label: "30d revenue",
          value: formatUsd(usddCache.feesRevenue.total30dUsd),
          context: "Cached 30-day DefiLlama revenue total. Not annualized.",
        },
        {
          label: "All-time revenue",
          value: formatUsd(usddCache.feesRevenue.totalAllTimeUsd),
          context: "Cached all-time DefiLlama revenue total for the USDD protocol slug.",
        },
      ],
    },
    {
      type: "allocation-table",
      title: "DefiLlama Protocol TVL By Chain",
      dataBadge: "cached-defillama",
      rows: usddCache.protocol.currentChainTvlsUsd.map(row => ({
        venue: row.chain,
        share: formatShare(row.tvlUsd, chainTvlTotal),
        approximateCapital: formatUsd(row.tvlUsd),
        note: "Cached protocol TVL by chain.",
      })),
    },
    {
      type: "note",
      title: "DefiLlama Cache Provenance",
      tone: "info",
      text: `Fetched locally on ${snapshotDate} from ${usddCache.sources.length} DefiLlama free endpoints. Stablecoin data uses stablecoins.llama.fi because the documented api.llama.fi stablecoin path returned 404 during validation. This is cached data, not live refresh.`,
    },
  ];
}
