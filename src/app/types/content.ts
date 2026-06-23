export type ArticleStatus = "Memo" | "Article" | "Market Map" | "Notes";
export type BuildStatus = "Planned" | "Building" | "Live";
export type CoverArtVariant = "grid" | "orbits" | "flows" | "nodes" | "blocks";
export type ArticleFigureVisual = "reserve-flow" | "rate-spread" | "agent-network" | "market-map";
export type ChecklistLevel = "green" | "amber" | "red";
export type CalloutTone = "accent" | "info" | "warning";
export type DashboardTool = "Dune" | "Observable" | "Streamlit" | "Python" | "Custom";
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
  preview?: CoverArtMetadata;
}

export interface ResearchPlaylist {
  slug: string;
  title: string;
  count: number;
  description: string;
  color: string;
  icon: ResearchPlaylistIcon;
}
