import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEFILLAMA_SOURCES } from "./sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../..");
const cachePath = path.join(repoRoot, "src/app/data/defillama/cache/usdd.json");
const STALE_CACHE_AGE_DAYS = 14;

function assert(condition, label) {
  if (!condition) throw new Error(`Expected ${label}`);
}

function assertRecord(value, label) {
  assert(value && typeof value === "object" && !Array.isArray(value), `object ${label}`);
}

function assertString(value, label) {
  assert(typeof value === "string" && value.trim().length > 0, `non-empty string ${label}`);
}

function assertNumber(value, label) {
  assert(typeof value === "number" && Number.isFinite(value), `finite number ${label}`);
}

function parseTimestamp(value, label) {
  assertString(value, label);
  const timestamp = Date.parse(value);
  assert(Number.isFinite(timestamp), `valid timestamp ${label}`);
  return timestamp;
}

function assertHistory(items, label, valueKey) {
  assert(Array.isArray(items) && items.length > 0, `non-empty ${label} array`);

  for (const [index, item] of items.entries()) {
    assertRecord(item, `${label}[${index}]`);
    parseTimestamp(item.date, `${label}[${index}].date`);
    assertNumber(item.timestamp, `${label}[${index}].timestamp`);
    assertNumber(item[valueKey], `${label}[${index}].${valueKey}`);
  }
}

function expectedSources(cache) {
  const { endpoints } = DEFILLAMA_SOURCES;

  return [
    { id: endpoints.protocol.id, url: endpoints.protocol.url },
    { id: endpoints.tvl.id, url: endpoints.tvl.url },
    { id: endpoints.feesRevenue.id, url: endpoints.feesRevenue.url },
    { id: endpoints.stablecoinList.id, url: endpoints.stablecoinList.url },
    {
      id: endpoints.stablecoinChart.id,
      url: endpoints.stablecoinChart.urlForAssetId(cache.stablecoin.assetId),
    },
  ];
}

function validateSources(cache) {
  assert(Array.isArray(cache.sources), "sources array");

  const expected = expectedSources(cache);
  assert(cache.sources.length === expected.length, `${expected.length} source records`);

  for (const sourceDefinition of expected) {
    const source = cache.sources.find(candidate => candidate?.id === sourceDefinition.id);
    assertRecord(source, `source ${sourceDefinition.id}`);
    assert(source.url === sourceDefinition.url, `source URL for ${sourceDefinition.id}`);
    assert(source.ok === true, `successful source ${sourceDefinition.id}`);
    assert(Number.isInteger(source.status) && source.status >= 200 && source.status < 300, `2xx source status for ${sourceDefinition.id}`);
    parseTimestamp(source.fetchedAt, `source timestamp for ${sourceDefinition.id}`);
  }
}

function validateCache(cache) {
  assertRecord(cache, "cache");
  assert(cache.schemaVersion === 1, "cache schema version 1");
  assert(cache.provider === DEFILLAMA_SOURCES.provider, `provider ${DEFILLAMA_SOURCES.provider}`);
  const fetchedAt = parseTimestamp(cache.fetchedAt, "cache fetchedAt");
  assert(fetchedAt <= Date.now() + 5 * 60 * 1000, "cache fetchedAt no more than five minutes in the future");

  assert(Array.isArray(cache.validationNotes) && cache.validationNotes.length > 0, "non-empty validationNotes array");
  cache.validationNotes.forEach((note, index) => assertString(note, `validationNotes[${index}]`));
  validateSources(cache);

  assertRecord(cache.protocol, "protocol");
  assert(cache.protocol.name === "USDD", "protocol name USDD");
  assert(cache.protocol.slug === DEFILLAMA_SOURCES.protocolSlug, `protocol slug ${DEFILLAMA_SOURCES.protocolSlug}`);
  assertString(cache.protocol.id, "protocol id");
  assertNumber(cache.protocol.currentTvlUsd, "protocol currentTvlUsd");
  assert(Array.isArray(cache.protocol.chains) && cache.protocol.chains.length > 0, "protocol chains array");
  assert(Array.isArray(cache.protocol.currentChainTvlsUsd) && cache.protocol.currentChainTvlsUsd.length > 0, "protocol chain TVL array");
  cache.protocol.currentChainTvlsUsd.forEach((row, index) => {
    assertRecord(row, `protocol chain TVL ${index}`);
    assertString(row.chain, `protocol chain TVL ${index}.chain`);
    assertNumber(row.tvlUsd, `protocol chain TVL ${index}.tvlUsd`);
  });
  assertHistory(cache.protocol.tvlHistory, "protocol TVL history", "tvlUsd");

  assertRecord(cache.stablecoin, "stablecoin");
  assert(cache.stablecoin.symbol === DEFILLAMA_SOURCES.stablecoinSymbol, `stablecoin symbol ${DEFILLAMA_SOURCES.stablecoinSymbol}`);
  assertString(cache.stablecoin.assetId, "stablecoin assetId");
  assertString(cache.stablecoin.name, "stablecoin name");
  assertNumber(cache.stablecoin.price, "stablecoin price");
  assertNumber(cache.stablecoin.circulatingUsd, "stablecoin circulatingUsd");
  assert(Array.isArray(cache.stablecoin.chains) && cache.stablecoin.chains.length > 0, "stablecoin chains array");
  assertHistory(cache.stablecoin.supplyHistory, "stablecoin supply history", "circulatingUsd");

  assertRecord(cache.feesRevenue, "feesRevenue");
  assert(cache.feesRevenue.slug === DEFILLAMA_SOURCES.protocolSlug, `feesRevenue slug ${DEFILLAMA_SOURCES.protocolSlug}`);
  assertString(cache.feesRevenue.name, "feesRevenue name");
  for (const field of ["total24hUsd", "total7dUsd", "total30dUsd", "totalAllTimeUsd"]) {
    assertNumber(cache.feesRevenue[field], `feesRevenue.${field}`);
  }
  assertHistory(cache.feesRevenue.revenueHistory, "revenue history", "revenueUsd");

  return fetchedAt;
}

function formatAgeDays(fetchedAt) {
  return Math.max(0, (Date.now() - fetchedAt) / (24 * 60 * 60 * 1000));
}

async function main() {
  const serialized = await readFile(cachePath, "utf8");
  const cache = JSON.parse(serialized);
  const fetchedAt = validateCache(cache);
  const cacheAgeDays = formatAgeDays(fetchedAt);
  const status = cacheAgeDays > STALE_CACHE_AGE_DAYS ? "WARN" : "PASS";

  console.log(`DefiLlama cache check: ${status}`);
  console.log(`Provider: ${cache.provider}`);
  console.log(`Fetched at: ${cache.fetchedAt}`);
  console.log(`Cache age: ${cacheAgeDays.toFixed(1)} days`);
  console.log(`Validated endpoints: ${cache.sources.length}`);

  if (status === "WARN") {
    console.warn(`Warning: cache is older than ${STALE_CACHE_AGE_DAYS} days. Refresh it when practical; age alone does not block a commit.`);
  }
}

main().catch(error => {
  console.error(`DefiLlama cache check failed: ${error.message}`);
  process.exitCode = 1;
});
