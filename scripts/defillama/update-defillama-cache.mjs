import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFILLAMA_SOURCES } from "./sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const cachePath = path.join(repoRoot, "src/app/data/defillama/cache/usdd.json");

function assertNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Expected numeric ${label}`);
  }
}

function assertObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Expected object ${label}`);
  }
}

function toIsoDate(timestampSeconds) {
  assertNumber(timestampSeconds, "timestamp");
  return new Date(timestampSeconds * 1000).toISOString().slice(0, 10);
}

function latestItems(items, count) {
  return items.slice(Math.max(items.length - count, 0));
}

async function fetchJson(source, url = source.url) {
  const fetchedAt = new Date().toISOString();
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "spotify-inspired-portfolio-defillama-cache/1.0",
    },
  });

  const status = {
    id: source.id,
    label: source.label,
    url,
    ok: response.ok,
    status: response.status,
    fetchedAt,
    note: source.note,
  };

  if (!response.ok) {
    throw new Error(`${source.id} returned ${response.status}`);
  }

  return { json: await response.json(), status };
}

function buildChainTvls(currentChainTvls) {
  assertObject(currentChainTvls, "protocol.currentChainTvls");

  return Object.entries(currentChainTvls)
    .map(([chain, tvlUsd]) => {
      assertNumber(tvlUsd, `currentChainTvls.${chain}`);
      return { chain, tvlUsd };
    })
    .sort((a, b) => b.tvlUsd - a.tvlUsd);
}

function buildTvlHistory(protocol) {
  if (!Array.isArray(protocol.tvl) || protocol.tvl.length === 0) {
    throw new Error("Expected protocol.tvl history");
  }

  return latestItems(protocol.tvl, 14).map(point => {
    assertNumber(point.date, "protocol.tvl.date");
    assertNumber(point.totalLiquidityUSD, "protocol.tvl.totalLiquidityUSD");
    return {
      date: toIsoDate(point.date),
      timestamp: point.date,
      tvlUsd: point.totalLiquidityUSD,
    };
  });
}

function findStablecoinAsset(stablecoinList) {
  if (!Array.isArray(stablecoinList.peggedAssets)) {
    throw new Error("Expected stablecoin list peggedAssets array");
  }

  const targetSymbol = DEFILLAMA_SOURCES.stablecoinSymbol.toUpperCase();
  const asset = stablecoinList.peggedAssets.find(item => {
    const symbol = String(item.symbol ?? "").toUpperCase();
    const name = String(item.name ?? "").toUpperCase();
    return symbol === targetSymbol || name === targetSymbol;
  });

  if (!asset) {
    throw new Error(`Could not find ${targetSymbol} in stablecoin list`);
  }

  if (!asset.id) throw new Error("Expected USDD stablecoin asset id");
  assertNumber(asset.price, "stablecoin.price");
  assertNumber(asset.circulating?.peggedUSD, "stablecoin.circulating.peggedUSD");

  return asset;
}

function buildStablecoinSupplyHistory(chart) {
  if (!Array.isArray(chart) || chart.length === 0) {
    throw new Error("Expected stablecoin chart array");
  }

  return latestItems(chart, 14).map(point => {
    const timestamp = Number(point.date);
    const circulatingUsd = point.totalCirculatingUSD?.peggedUSD ?? point.totalCirculating?.peggedUSD;

    assertNumber(timestamp, "stablecoinChart.date");
    assertNumber(circulatingUsd, "stablecoinChart.totalCirculatingUSD.peggedUSD");

    return {
      date: toIsoDate(timestamp),
      timestamp,
      circulatingUsd,
    };
  });
}

function buildRevenueHistory(feesRevenue) {
  if (!Array.isArray(feesRevenue.totalDataChart) || feesRevenue.totalDataChart.length === 0) {
    throw new Error("Expected feesRevenue.totalDataChart");
  }

  return latestItems(feesRevenue.totalDataChart, 14).map(([timestamp, revenueUsd]) => {
    assertNumber(timestamp, "feesRevenue.totalDataChart.timestamp");
    assertNumber(revenueUsd, "feesRevenue.totalDataChart.revenueUsd");
    return {
      date: toIsoDate(timestamp),
      timestamp,
      revenueUsd,
    };
  });
}

async function buildCache() {
  const fetchedAt = new Date().toISOString();
  const { endpoints } = DEFILLAMA_SOURCES;

  const protocolResponse = await fetchJson(endpoints.protocol);
  const tvlResponse = await fetchJson(endpoints.tvl);
  const feesResponse = await fetchJson(endpoints.feesRevenue);
  const stablecoinListResponse = await fetchJson(endpoints.stablecoinList);

  const protocol = protocolResponse.json;
  const tvl = tvlResponse.json;
  const feesRevenue = feesResponse.json;
  const stablecoinAsset = findStablecoinAsset(stablecoinListResponse.json);
  const stablecoinChartUrl = endpoints.stablecoinChart.urlForAssetId(stablecoinAsset.id);
  const stablecoinChartResponse = await fetchJson(endpoints.stablecoinChart, stablecoinChartUrl);

  if (protocol.name !== "USDD") throw new Error("Expected protocol.name to be USDD");
  assertNumber(tvl, "simple TVL response");
  assertNumber(feesRevenue.total24h, "feesRevenue.total24h");
  assertNumber(feesRevenue.total7d, "feesRevenue.total7d");
  assertNumber(feesRevenue.total30d, "feesRevenue.total30d");
  assertNumber(feesRevenue.totalAllTime, "feesRevenue.totalAllTime");

  const chainTvls = buildChainTvls(protocol.currentChainTvls);
  const tvlHistory = buildTvlHistory(protocol);
  const supplyHistory = buildStablecoinSupplyHistory(stablecoinChartResponse.json);
  const revenueHistory = buildRevenueHistory(feesRevenue);

  return {
    schemaVersion: 1,
    provider: DEFILLAMA_SOURCES.provider,
    fetchedAt,
    sources: [
      protocolResponse.status,
      tvlResponse.status,
      feesResponse.status,
      stablecoinListResponse.status,
      stablecoinChartResponse.status,
    ],
    validationNotes: [
      "USDD protocol slug validated from protocol endpoint.",
      `USDD stablecoin asset id ${stablecoinAsset.id} resolved from stablecoin list by symbol/name before chart fetch.`,
      "Stablecoin endpoints use stablecoins.llama.fi because api.llama.fi stablecoin paths returned 404 during Phase 2 validation.",
      "Cache is generated manually with npm run data:defillama and is not fetched in the browser or during Vercel build.",
    ],
    protocol: {
      id: String(protocol.id),
      slug: DEFILLAMA_SOURCES.protocolSlug,
      name: protocol.name,
      category: protocol.category,
      chains: protocol.chains,
      currentTvlUsd: tvl,
      currentChainTvlsUsd: chainTvls,
      tvlHistory,
    },
    stablecoin: {
      assetId: String(stablecoinAsset.id),
      name: stablecoinAsset.name,
      symbol: stablecoinAsset.symbol,
      price: stablecoinAsset.price,
      circulatingUsd: stablecoinAsset.circulating.peggedUSD,
      chains: stablecoinAsset.chains,
      supplyHistory,
    },
    feesRevenue: {
      slug: feesRevenue.slug,
      name: feesRevenue.name,
      total24hUsd: feesRevenue.total24h,
      total7dUsd: feesRevenue.total7d,
      total30dUsd: feesRevenue.total30d,
      totalAllTimeUsd: feesRevenue.totalAllTime,
      revenueHistory,
    },
  };
}

async function main() {
  const cache = await buildCache();
  const serialized = `${JSON.stringify(cache, null, 2)}\n`;

  await mkdir(path.dirname(cachePath), { recursive: true });
  await writeFile(cachePath, serialized, "utf8");

  console.log(`Wrote DefiLlama cache: ${path.relative(repoRoot, cachePath)}`);
  console.log(`Fetched at: ${cache.fetchedAt}`);
  console.log(`USDD stablecoin asset id: ${cache.stablecoin.assetId}`);
}

main().catch(error => {
  console.error(`DefiLlama cache update failed: ${error.message}`);
  process.exitCode = 1;
});
