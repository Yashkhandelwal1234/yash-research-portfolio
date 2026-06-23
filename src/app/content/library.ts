import type { ResearchPlaylist } from "../types/content";

export const playlists: ResearchPlaylist[] = [
  {
    slug: "stablecoin-yield-stack",
    title: "Stablecoin Yield Stack",
    category: "Stablecoin Yield",
    count: 12,
    description: "Stablecoin yield systems, allocator notes, and source-backed memo drafts",
    color: "#32d583",
    icon: "trending",
  },
  {
    slug: "defi-fixed-income",
    title: "DeFi Fixed Income",
    category: "DeFi Fixed Income",
    count: 8,
    description: "Fixed-yield markets, duration questions, and rate research placeholders",
    color: "#60a5fa",
    icon: "bar-chart",
  },
  {
    slug: "consumer-crypto-finance",
    title: "Consumer Crypto Finance",
    category: "Consumer Crypto",
    count: 6,
    description: "Consumer crypto finance maps and product research backlogs",
    color: "#34d399",
    icon: "globe",
  },
  {
    slug: "agentic-infrastructure",
    title: "Agentic Infrastructure",
    category: "Agent Infrastructure",
    count: 9,
    description: "Agent-payment infrastructure and research workflow agents",
    color: "#a78bfa",
    icon: "zap",
  },
  {
    slug: "on-chain-market-structure",
    title: "On-chain Market Structure",
    category: "Market Structure",
    count: 11,
    description: "Market-structure notes, liquidity questions, and map drafts",
    color: "#fb7185",
    icon: "database",
  },
  {
    slug: "protocol-revenue-durability",
    title: "Protocol Revenue Durability",
    category: "Protocol Research",
    count: 7,
    description: "Protocol research, incentive durability, and evidence checklists",
    color: "#f59e0b",
    icon: "bookmark",
  },
];

export const openQuestions = [
  "Which article should be expanded from placeholder to source-backed memo first?",
  "What evidence is required before each dashboard can move from Planned to Building?",
  "Which claims in the USDD/Pendle memo still need manual verification?",
  "What public sources should be attached to each research shelf?",
  "Which agent workflow is useful enough to justify a working demo?",
];

export const savedSources = [
  "USDD/Pendle source list to add",
  "Stablecoin yield source list to add",
  "Dashboard data source list to add",
  "Agent workflow notes to add",
];
