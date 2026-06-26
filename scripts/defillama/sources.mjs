export const DEFILLAMA_SOURCES = {
  provider: "DefiLlama",
  docsUrl: "https://api-docs.defillama.com/",
  freeEndpointReferenceUrl: "https://raw.githubusercontent.com/DefiLlama/api-docs/main/llms-free.txt",
  protocolSlug: "usdd",
  stablecoinSymbol: "USDD",
  endpoints: {
    protocol: {
      id: "protocol-usdd",
      label: "USDD protocol TVL and chain breakdown",
      url: "https://api.llama.fi/protocol/usdd",
    },
    tvl: {
      id: "tvl-usdd",
      label: "USDD current protocol TVL",
      url: "https://api.llama.fi/tvl/usdd",
    },
    feesRevenue: {
      id: "fees-revenue-usdd",
      label: "USDD fees and revenue summary",
      url: "https://api.llama.fi/summary/fees/usdd?dataType=dailyRevenue",
    },
    stablecoinList: {
      id: "stablecoin-list",
      label: "Stablecoin list used to verify USDD asset id",
      url: "https://stablecoins.llama.fi/stablecoins?includePrices=true",
      note: "Current docs list api.llama.fi for stablecoin paths, but the working free stablecoin host is stablecoins.llama.fi.",
    },
    stablecoinChart: {
      id: "stablecoin-chart-usdd",
      label: "USDD stablecoin circulating supply chart",
      urlForAssetId: assetId => `https://stablecoins.llama.fi/stablecoincharts/all?stablecoin=${assetId}`,
      note: "Asset id is resolved from the stablecoin list by USDD symbol/name before this endpoint is called.",
    },
  },
};
