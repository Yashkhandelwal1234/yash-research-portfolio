export type ArticleStatus = "Published" | "Draft" | "Researching" | "Map" | "Memo";
export type BuildStatus = "Planned" | "Building" | "Live";
export type CoverArtVariant = "grid" | "orbits" | "flows" | "nodes" | "blocks";
export type ArticleFigureVisual = "reserve-flow" | "rate-spread" | "agent-network" | "market-map";
export type ChecklistLevel = "green" | "amber" | "red";
export type CalloutTone = "accent" | "info" | "warning";
export type DashboardTool = "Dune" | "Observable" | "Streamlit" | "Python" | "Custom";
export type DashboardDataMode = "static-manual" | "cached-defillama" | "mixed-manual-cached";
export type DashboardDataBadge = "manual" | "cached-defillama";
export type DashboardBlockTone = "accent" | "info" | "warning";
export type ResearchPlaylistIcon = "trending" | "bar-chart" | "globe" | "zap" | "database" | "bookmark";

export interface CoverArtMetadata {
  variant: CoverArtVariant;
  colors: [string, string, string];
  label?: string;
}

export type ArticleContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "callout"; label?: string; text: string; tone?: CalloutTone }
  | { type: "table"; title?: string; columns: string[]; rows: string[][] }
  | { type: "figure"; title?: string; src?: string; alt: string; caption?: string; visual?: ArticleFigureVisual }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "checklist"; title?: string; items: { text: string; level?: ChecklistLevel }[] }
  | { type: "sources"; items: string[] }
  | { type: "chart-placeholder"; title: string; caption?: string; visual?: ArticleFigureVisual }
  | { type: "diagram-placeholder"; title: string; caption?: string; visual?: ArticleFigureVisual };

export interface Article {
  slug: string;
  title: string;
  thesis: string;
  tags: string[];
  date: string;
  readTime: number;
  status: ArticleStatus;
  category: string;
  featured?: boolean;
  conclusion?: string;
  coverArt?: CoverArtMetadata;
  content?: ArticleContentBlock[];
}

export interface Agent {
  slug: string;
  name: string;
  status: BuildStatus;
  problem: string;
  whatItDoes: string;
  inputs: string[];
  outputs: string[];
  stack: string[];
  githubUrl?: string;
  demoUrl?: string;
  notes?: string;
}

export interface Dashboard {
  slug: string;
  title: string;
  status: BuildStatus;
  researchQuestion: string;
  dataSources: string[];
  tool: DashboardTool;
  embedUrl?: string;
  externalUrl?: string;
  relatedArticleSlug?: string;
  specSlug?: string;
  preview?: CoverArtMetadata;
}

export interface DashboardMetric {
  label: string;
  value: string;
  context: string;
}

export interface DashboardRateRow {
  label: string;
  value: string;
  yieldType: string;
  note: string;
  includesIncentives?: boolean;
}

export interface DashboardAllocationRow {
  venue: string;
  share: string;
  approximateCapital: string;
  note?: string;
}

export interface DashboardTrendPoint {
  period: string;
  earningsUsd: number;
  label: string;
}

export interface DashboardRiskItem {
  label: string;
  detail: string;
  level: ChecklistLevel;
}

export interface DashboardSourceLink {
  label: string;
  url: string;
  note: string;
}

export type DashboardContentBlock =
  | { type: "metric-grid"; title: string; metrics: DashboardMetric[]; showStaticBadge?: boolean; dataBadge?: DashboardDataBadge }
  | { type: "rate-table"; title: string; rows: DashboardRateRow[]; showStaticBadge?: boolean; dataBadge?: DashboardDataBadge }
  | { type: "allocation-table"; title: string; rows: DashboardAllocationRow[]; showStaticBadge?: boolean; dataBadge?: DashboardDataBadge }
  | { type: "trend-chart"; title: string; points: DashboardTrendPoint[]; showStaticBadge?: boolean; dataBadge?: DashboardDataBadge }
  | { type: "note"; title: string; text: string; tone?: DashboardBlockTone }
  | { type: "risk-checklist"; title: string; items: DashboardRiskItem[]; showStaticBadge?: boolean; dataBadge?: DashboardDataBadge }
  | { type: "source-list"; title: string; sources: DashboardSourceLink[] }
  | { type: "future-data-sources"; title: string; items: string[] };

export interface DashboardSpec {
  slug: string;
  title: string;
  subtitle: string;
  status: BuildStatus;
  dataMode: DashboardDataMode;
  snapshotDate: string;
  lastUpdated: string;
  sourceNote: string;
  researchQuestion: string;
  relatedArticleSlug?: string;
  blocks: DashboardContentBlock[];
}

export interface ResearchPlaylist {
  slug: string;
  title: string;
  category: string;
  count: number;
  description: string;
  color: string;
  icon: ResearchPlaylistIcon;
}
