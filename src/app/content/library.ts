import type { ResearchPlaylist } from "../types/content";

export const playlists: ResearchPlaylist[] = [
  {
    slug: "stablecoin",
    title: "Stablecoin Yield",
    count: 12,
    description: "USDC, USDT, sDAI mechanics and yield sources",
    color: "#32d583",
    icon: "trending",
  },
  {
    slug: "defi-fi",
    title: "DeFi Fixed Income",
    count: 8,
    description: "On-chain bonds, tranching, and rate markets",
    color: "#60a5fa",
    icon: "bar-chart",
  },
  {
    slug: "consumer",
    title: "Consumer Crypto Finance",
    count: 6,
    description: "Fintechs, wallets, and retail DeFi rails",
    color: "#34d399",
    icon: "globe",
  },
  {
    slug: "agent-pay",
    title: "Agent-Payment Infrastructure",
    count: 9,
    description: "Autonomous agents, x402, and machine money",
    color: "#a78bfa",
    icon: "zap",
  },
  {
    slug: "market-struct",
    title: "On-chain Market Structure",
    count: 11,
    description: "AMMs, orderbooks, MEV, and liquidity flows",
    color: "#fb7185",
    icon: "database",
  },
  {
    slug: "protocol-rev",
    title: "Protocol Revenue & Incentives",
    count: 7,
    description: "Fee accrual, token emissions, and value capture",
    color: "#f59e0b",
    icon: "bookmark",
  },
];

export const openQuestions = [
  "Will the DSR cut below 5% trigger stablecoin capital flight to T-bills?",
  "At what TVL threshold does Pendle's fixed rate market become liquid enough for institutions?",
  "How does x402 handle micropayment denomination volatility for non-USD agents?",
  "Is Uniswap v4's hook architecture structurally MEV-resistant or MEV-accommodating?",
  "What's the ceiling on protocol revenue extraction before LPs route around the fee?",
];

export const savedSources = [
  "Defillama Stablecoin Dashboard",
  "Dune: MEV by Block Type",
  "Token Terminal: Protocol Revenue",
  "Ethena USDe Mechanics Doc",
];
