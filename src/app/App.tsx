import { useState, useRef, useEffect, type MouseEvent } from "react";
import {
  Home,
  BookOpen,
  Cpu,
  BarChart2,
  User,
  Mail,
  Search,
  ChevronRight,
  Clock,
  ExternalLink,
  Github,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  ListChecks,
  Bookmark,
  TrendingUp,
  Zap,
  Database,
  Globe,
  FileText,
  Map,
  StickyNote,
  ArrowRight,
  X,
  PanelRight,
  CheckSquare,
  AlertCircle,
  Circle,
  Tag,
  Calendar,
} from "lucide-react";
import { articles, articleCoverPresets } from "./content/articles";
import { agents } from "./content/agents";
import { dashboards } from "./content/dashboards";
import { openQuestions, playlists, savedSources } from "./content/library";
import type {
  Agent,
  Article,
  ArticleContentBlock,
  ArticleFigureVisual,
  ArticleStatus,
  BuildStatus,
  CoverArtMetadata,
  Dashboard,
  ResearchPlaylist,
  ResearchPlaylistIcon,
} from "./types/content";

// ─── Types ────────────────────────────────────────────────────────────────────

type Page = "home" | "library" | "article" | "agents" | "dashboards" | "about" | "contact";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const buildStatusColor: Record<BuildStatus, string> = {
  Live: "#1ED760",
  Building: "#B3B3B3",
  Planned: "#B3B3B3",
};

const buildStatusDot: Record<BuildStatus, string> = {
  Live: "bg-[#1ED760]",
  Building: "bg-[#535353]",
  Planned: "bg-[#535353]",
};

const SPOTIFY_COVER_COLORS = ["#181818", "#1ED760", "#535353"] as const;

function formatReadTime(progress: number, readTime: number) {
  const totalSeconds = Math.max(1, Math.round(readTime * 60));
  const elapsedSeconds = Math.round(totalSeconds * Math.max(0, Math.min(100, progress)) / 100);
  const format = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
  return { elapsed: format(elapsedSeconds), total: format(totalSeconds) };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getArticleCover(article: Article): CoverArtMetadata {
  return article.coverArt ?? articleCoverPresets[article.category] ?? {
    variant: "grid",
    colors: [...SPOTIFY_COVER_COLORS],
    label: "RX",
  };
}

function getArticleFigureVisual(article: Article): ArticleFigureVisual {
  if (article.category.includes("Agent")) return "agent-network";
  if (article.category.includes("Market")) return "market-map";
  if (article.category.includes("Fixed")) return "rate-spread";
  return "reserve-flow";
}

function getPlaylistIcon(icon: ResearchPlaylistIcon) {
  const icons = {
    trending: <TrendingUp size={14} />,
    "bar-chart": <BarChart2 size={14} />,
    globe: <Globe size={14} />,
    zap: <Zap size={14} />,
    database: <Database size={14} />,
    bookmark: <Bookmark size={14} />,
  };

  return icons[icon];
}

function getArticleContent(article: Article): ArticleContentBlock[] {
  if (article.content) return article.content;

  return [
    { type: "heading", text: "1. Research Thesis" },
    { type: "paragraph", text: article.thesis },
    {
      type: "figure",
      title: `${article.category} Research Map`,
      alt: `Abstract research visualization for ${article.title}`,
      caption: "Drop in a chart, protocol diagram, or research image here by adding a src to this figure block.",
      visual: getArticleFigureVisual(article),
    },
    { type: "heading", text: "2. Analysis Frame" },
    {
      type: "paragraph",
      text: "The full memo can be expanded as a sequence of typed content blocks: paragraphs, charts, tables, figures, callouts, quotes, sources, and risk checklists. The renderer preserves the current page structure while making richer article layouts possible.",
    },
    {
      type: "callout",
      label: "Working Note",
      text: "This article is ready for a richer memo body without changing the layout shell or page navigation.",
      tone: "info",
    },
    {
      type: "sources",
      items: ["Protocol documentation", "On-chain dashboards", "Market structure notes"],
    },
  ];
}

// ─── Components ───────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ArticleStatus }) {
  return (
    <span
      className="inline-flex items-center rounded-sm bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#B3B3B3]"
    >
      {status}
    </span>
  );
}

function BuildBadge({ status }: { status: BuildStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]"
      style={{ color: buildStatusColor[status] }}>
      <span className={`w-1.5 h-1.5 rounded-full ${buildStatusDot[status]}`} />
      {status}
    </span>
  );
}

function MetaTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-sm bg-white/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#B3B3B3]">
      {label}
    </span>
  );
}

function ResearchCoverArt({ article, className = "", compact = false }: { article: Article; className?: string; compact?: boolean }) {
  const cover = getArticleCover(article);
  const colors = SPOTIFY_COVER_COLORS;
  const isNodes = cover.variant === "nodes";
  const isBlocks = cover.variant === "blocks";

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ${className}`}
      style={{
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 58%, ${colors[2]} 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 20% 18%, rgba(255,255,255,0.35), transparent 22%), radial-gradient(circle at 82% 76%, ${colors[2]}99, transparent 28%), linear-gradient(120deg, transparent 0 42%, rgba(255,255,255,0.18) 43% 45%, transparent 46% 100%)`,
        }}
      />
      {cover.variant === "grid" && (
        <div className="absolute inset-3 grid grid-cols-4 grid-rows-4 gap-1 opacity-35">
          {Array.from({ length: 16 }).map((_, i) => <span key={i} className="rounded-[2px] bg-white/25" />)}
        </div>
      )}
      {cover.variant === "flows" && (
        <div className="absolute inset-0 opacity-45">
          <span className="absolute left-3 right-4 top-1/3 h-px bg-white/70 rotate-[-12deg]" />
          <span className="absolute left-5 right-6 top-1/2 h-px bg-white/60 rotate-[8deg]" />
          <span className="absolute left-8 right-3 top-2/3 h-px bg-white/50 rotate-[-5deg]" />
        </div>
      )}
      {cover.variant === "orbits" && (
        <div className="absolute inset-4 rounded-full border border-white/35 opacity-60">
          <span className="absolute -right-1 top-1/2 w-2 h-2 rounded-full bg-white/80" />
          <span className="absolute left-3 top-1 w-1.5 h-1.5 rounded-full bg-white/65" />
        </div>
      )}
      {isNodes && (
        <div className="absolute inset-3 opacity-65">
          <span className="absolute left-1 top-2 w-2 h-2 rounded-full bg-white/80" />
          <span className="absolute right-3 top-5 w-2.5 h-2.5 rounded-full bg-white/70" />
          <span className="absolute left-1/2 bottom-2 w-2 h-2 rounded-full bg-white/75" />
          <span className="absolute left-3 right-5 top-6 h-px bg-white/45 rotate-[18deg]" />
          <span className="absolute left-7 right-6 bottom-5 h-px bg-white/45 rotate-[-22deg]" />
        </div>
      )}
      {isBlocks && (
        <div className="absolute inset-3 flex items-end gap-1 opacity-55">
          {[38, 58, 44, 76, 62].map((height, i) => <span key={i} className="flex-1 rounded-t bg-white/35" style={{ height: `${height}%` }} />)}
        </div>
      )}
      {!compact && (
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white/90">
          <span className="text-[10px] font-semibold tracking-wide">{cover.label ?? "RX"}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>
      )}
    </div>
  );
}

function FigurePlaceholder({ block }: { block: { visual?: ArticleFigureVisual } }) {
  const tone = "#1ED760";

  return (
    <div className="relative h-64 overflow-hidden rounded-md bg-[#181818] sm:h-72">
      <div
        className="absolute inset-0 opacity-70"
        style={{ background: `radial-gradient(circle at 22% 20%, ${tone}44, transparent 28%), radial-gradient(circle at 74% 70%, ${tone}24, transparent 32%), linear-gradient(135deg, rgba(255,255,255,0.05), transparent)` }}
      />
      <div className="absolute inset-6 grid grid-cols-5 gap-2 opacity-35">
        {Array.from({ length: 15 }).map((_, i) => <span key={i} className="rounded-sm border border-white/20 bg-white/5" />)}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] text-white/70">
          Abstract research figure
        </div>
      </div>
    </div>
  );
}

function ArticleFigure({ block }: { block: Extract<ArticleContentBlock, { type: "figure" }> }) {
  const [didError, setDidError] = useState(false);

  if (!block.src || didError) {
    return <FigurePlaceholder block={block} />;
  }

  return (
    <div className="rounded-lg border border-white/[0.07] bg-[#181818] p-2">
      <img
        src={block.src}
        alt={block.alt}
        className="mx-auto max-h-[520px] w-full rounded-md object-contain"
        onError={() => setDidError(true)}
      />
    </div>
  );
}

function ArticleContent({ blocks }: { blocks: ArticleContentBlock[] }) {
  return (
    <div className="mb-12 space-y-7">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          return <h2 key={index} className="pt-5 text-[17px] font-semibold leading-snug text-foreground first:pt-0">{block.text}</h2>;
        }

        if (block.type === "paragraph") {
          return <p key={index} className="text-sm leading-7 text-foreground/72 md:leading-8">{block.text}</p>;
        }

        if (block.type === "callout") {
          const tone = block.tone === "warning" ? "#B3B3B3" : "#1ED760";
          return (
            <div key={index} className="rounded-lg border border-white/[0.07] border-l-2 bg-[#181818] p-4 sm:p-5" style={{ borderLeftColor: tone }}>
              {block.label && <p className="mb-2 text-[11px] uppercase tracking-wide" style={{ color: tone }}>{block.label}</p>}
              <p className="text-sm leading-7 text-foreground/88">{block.text}</p>
            </div>
          );
        }

        if (block.type === "table") {
          return (
            <div key={index} className="overflow-hidden rounded-lg border border-white/[0.07] bg-[#181818]">
              {block.title && <p className="border-b border-white/[0.06] px-4 py-3 text-[11px] uppercase tracking-wide text-muted-foreground">{block.title}</p>}
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full border-collapse text-left text-[12px] leading-6">
                  <thead className="bg-white/[0.035]">
                    <tr>
                      {block.columns.map(column => (
                        <th key={column} className="border-b border-white/[0.08] px-4 py-3 font-medium text-muted-foreground">
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr key={row.join("-")} className="border-b border-white/[0.045] last:border-b-0">
                        {row.map((cell, cellIndex) => (
                          <td key={`${rowIndex}-${cellIndex}`} className={`px-4 py-3 align-top text-foreground/74 ${cellIndex === 0 ? "font-medium text-[#1ED760]" : ""}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }

        if (block.type === "figure") {
          return (
            <figure key={index} className="space-y-3 py-1">
              {block.title && <figcaption className="text-[11px] uppercase tracking-wide text-muted-foreground">{block.title}</figcaption>}
              <ArticleFigure block={block} />
              {block.caption && <p className="text-[12px] leading-5 text-muted-foreground">{block.caption}</p>}
            </figure>
          );
        }

        if (block.type === "chart-placeholder" || block.type === "diagram-placeholder") {
          return (
            <figure key={index} className="space-y-3 py-1">
              <figcaption className="text-[11px] uppercase tracking-wide text-muted-foreground">{block.title}</figcaption>
              <div className="rounded-lg border border-white/[0.07] bg-[#181818] p-2">
                <FigurePlaceholder block={block} />
              </div>
              {block.caption && <p className="text-[12px] leading-5 text-muted-foreground">{block.caption}</p>}
            </figure>
          );
        }

        if (block.type === "checklist") {
          return (
            <section key={index} className="space-y-3 rounded-lg border border-white/[0.07] bg-[#181818] p-4 sm:p-5">
              {block.title && <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{block.title}</p>}
              {block.items.map(item => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0">
                    {item.level === "green" ? <CheckSquare size={14} className="text-[#1ED760]" /> :
                      <AlertCircle size={14} className="text-[#B3B3B3]" />}
                  </span>
                  <p className="text-[13px] leading-6 text-foreground/74">{item.text}</p>
                </div>
              ))}
            </section>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={index} className="rounded-lg border border-white/[0.07] bg-[#181818] p-4 sm:p-5">
              <p className="text-sm leading-7 text-foreground/88 italic">"{block.text}"</p>
              {block.attribution && <p className="text-[11px] text-muted-foreground mt-2">{block.attribution}</p>}
            </blockquote>
          );
        }

        if (block.type === "sources") {
          return (
            <section key={index}>
              <h2 className="text-base font-semibold text-foreground mb-2">Sources</h2>
              <div className="space-y-1.5">
                {block.items.map(source => (
                  <div key={source} className="flex items-center gap-2 text-[12px] text-muted-foreground">
                    <ExternalLink size={10} />{source}
                  </div>
                ))}
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}

// ─── Article Card ─────────────────────────────────────────────────────────────

function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="card group relative w-full cursor-pointer rounded-lg bg-[#181818] p-4 text-left transition-colors duration-200 hover:bg-[#282828]"
    >
      <div className="relative mb-4 aspect-square w-full overflow-hidden rounded">
        <ResearchCoverArt article={article} compact className="h-full w-full rounded border-0" />
        <span className="card-play-btn" aria-hidden="true">
          <Play size={20} fill="currentColor" className="ml-0.5" />
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-[#FFFFFF]">
            {article.title}
          </h3>
          <StatusBadge status={article.status} />
        </div>
        <p className="line-clamp-2 text-sm leading-6 text-[#B3B3B3]">
          {article.thesis}
        </p>
        <div className="flex flex-wrap gap-1">
          {article.tags.slice(0, 2).map(t => <MetaTag key={t} label={t} />)}
        </div>
        <div className="flex items-center gap-2 text-[12px] text-[#B3B3B3]">
          <span>{article.category}</span>
          <span className="text-[#535353]">·</span>
          <span>{formatDate(article.date)}</span>
          <span className="ml-auto flex items-center gap-1"><Clock size={11} />{article.readTime}m</span>
        </div>
      </div>
    </button>
  );
}

function TrackMarker({ index, active = false }: { index: number; active?: boolean }) {
  if (active) {
    return (
      <span className="reading-bars flex-shrink-0" aria-label="Currently reading">
        <span />
        <span />
        <span />
      </span>
    );
  }

  return (
    <span className="relative inline-flex min-w-6 justify-center text-[13px] text-[#B3B3B3]">
      <span className="track-number">{index}</span>
      <span className="track-play hidden min-w-6 justify-center text-[#FFFFFF]" aria-hidden="true">▶</span>
    </span>
  );
}

function ArticleTrackRow({ article, index, onClick, active = false }: { article: Article; index: number; onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="track-row group flex w-full items-center gap-3 border-b border-white/[0.07] px-2 py-2.5 text-left transition-colors hover:rounded hover:bg-[#282828]"
    >
      <TrackMarker index={index} active={active} />
      <ResearchCoverArt article={article} compact className="h-10 w-10 flex-shrink-0 rounded border-0" />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium leading-tight text-[#FFFFFF]">{article.title.split(":")[0]}</p>
        <p className="truncate text-[12px] leading-5 text-[#B3B3B3]">{article.category}</p>
      </div>
      <span className="ml-auto flex-shrink-0 text-[12px] text-[#B3B3B3]">{article.readTime}m</span>
    </button>
  );
}

// ─── Playlist Row ─────────────────────────────────────────────────────────────

function PlaylistRow({ playlist, onSelect, onArticleClick }: { playlist: ResearchPlaylist; onSelect: () => void; onArticleClick: (article: Article) => void }) {
  const rowArticles = articles.filter(a => a.category === playlist.category);
  const itemLabel = `${rowArticles.length} ${rowArticles.length === 1 ? "item" : "items"}`;

  return (
    <div className="group">
      <div className="shelf-header">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded flex items-center justify-center text-[10px]"
            style={{ backgroundColor: "#282828", color: "#1ED760", border: "1px solid rgba(255,255,255,0.07)" }}>
            {getPlaylistIcon(playlist.icon)}
          </span>
          <h2 className="text-[22px] font-bold text-[#FFFFFF]">{playlist.title}</h2>
          <span className="text-[12px] text-[#B3B3B3]">{itemLabel}</span>
        </div>
        <button onClick={onSelect} className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.05em] text-[#B3B3B3] transition-colors hover:text-[#FFFFFF]">
          View all <ChevronRight size={12} />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-1 lg:grid-cols-3 lg:gap-3">
        {rowArticles.slice(0, 3).map((a, index) => (
          <ArticleTrackRow key={a.slug} article={a} index={index + 1} onClick={() => onArticleClick(a)} />
        ))}
      </div>
    </div>
  );
}

// ─── Agent Card ───────────────────────────────────────────────────────────────

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="rounded-lg bg-[#181818] p-4 transition-colors hover:bg-[#282828]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#282828] border border-white/[0.07] flex items-center justify-center">
            <Zap size={14} className="text-[#1ED760]" />
          </div>
          <h3 className="text-sm font-medium text-foreground">{agent.name}</h3>
        </div>
        <BuildBadge status={agent.status} />
      </div>
      <p className="text-[12px] text-muted-foreground mb-1.5 leading-relaxed">{agent.problem}</p>
      <p className="text-[12px] text-foreground/70 mb-3 leading-relaxed">{agent.whatItDoes}</p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-[#282828] rounded p-2 border border-white/[0.07]">
          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">Inputs</p>
          {agent.inputs.map(i => <p key={i} className="text-[11px] text-foreground/70">{i}</p>)}
        </div>
        <div className="bg-[#282828] rounded p-2 border border-white/[0.07]">
          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">Outputs</p>
          {agent.outputs.map(o => <p key={o} className="text-[11px] text-foreground/70">{o}</p>)}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {agent.stack.map(s => <MetaTag key={s} label={s} />)}
      </div>
      <div className="flex gap-2">
        {agent.githubUrl && (
          <a href={agent.githubUrl} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-[#1ED760] transition-colors">
            <Github size={11} /> GitHub
          </a>
        )}
        {agent.demoUrl && (
          <a href={agent.demoUrl} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-[#1ED760] transition-colors">
            <ExternalLink size={11} /> Demo
          </a>
        )}
        {!agent.githubUrl && !agent.demoUrl && (
          <span className="text-[11px] text-muted-foreground italic">Coming soon</span>
        )}
      </div>
    </div>
  );
}

// ─── Dashboard Card ───────────────────────────────────────────────────────────

function DashboardCard({ dash, onArticleClick }: { dash: Dashboard; onArticleClick: () => void }) {
  const color = "#1ED760";

  return (
    <div className="rounded-lg bg-[#181818] overflow-hidden transition-colors hover:bg-[#282828] group">
      <div className="h-24 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: "#282828", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 30% 50%, ${color}40, transparent 70%)` }} />
        <BarChart2 size={32} style={{ color }} className="relative z-10" />
        <div className="absolute bottom-2 right-2">
          <BuildBadge status={dash.status} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-1">{dash.title}</h3>
        <p className="text-[12px] text-muted-foreground mb-3 leading-relaxed line-clamp-2">{dash.researchQuestion}</p>
        <div className="flex items-center gap-3 mb-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><Database size={10} />{dash.tool}</span>
          <span className="truncate">{dash.dataSources[0]}</span>
        </div>
        <div className="flex gap-2">
          {dash.status === "Live" && (
            <button className="flex-1 py-1.5 text-[11px] font-medium rounded text-[#000000] bg-[#1ED760] hover:bg-[#1DB954] transition-colors flex items-center justify-center gap-1">
              <ExternalLink size={10} /> Open Dashboard
            </button>
          )}
          {dash.status !== "Live" && (
            <button disabled className="flex-1 py-1.5 text-[11px] font-medium rounded text-muted-foreground bg-muted/30 border border-white/5 cursor-not-allowed flex items-center justify-center gap-1">
              In Progress
            </button>
          )}
          {dash.relatedArticleSlug && (
            <button onClick={onArticleClick} aria-label={`Open related article for ${dash.title}`} className="px-2 py-1.5 text-[11px] text-[#B3B3B3] hover:text-[#FFFFFF] transition-colors rounded border border-white/[0.07] hover:border-white/[0.15]">
              <FileText size={11} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Individual Article Page ───────────────────────────────────────────────────

function ArticlePage({ article, onBack, onArticleClick }: { article: Article; onBack: () => void; onArticleClick: (article: Article) => void }) {
  const content = getArticleContent(article);
  const contents = content.filter((block): block is Extract<ArticleContentBlock, { type: "heading" }> => block.type === "heading");

  return (
    <div className="mx-auto max-w-3xl px-4 py-7 pb-32 sm:px-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-[#B3B3B3] hover:text-[#FFFFFF] transition-colors mb-6">
        ← Back to Library
      </button>

      {/* Header */}
      <div className="mb-8 pb-6 border-b border-white/[0.07]">
        <div className="flex flex-col sm:flex-row gap-5">
          <ResearchCoverArt article={article} className="w-32 h-32 flex-shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <StatusBadge status={article.status} />
              <span className="text-[11px] text-muted-foreground">{article.category}</span>
            </div>
            <h1 className="text-2xl font-semibold text-foreground leading-tight mb-3">{article.title}</h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">{article.thesis}</p>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><User size={10} />Yash Khandelwal</span>
              <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(article.date)}</span>
              <span className="flex items-center gap-1"><Clock size={10} />{article.readTime} min read</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {article.tags.map(t => <MetaTag key={t} label={t} />)}
            </div>
          </div>
        </div>
      </div>

      {/* One-line conclusion */}
      <div className="bg-[#181818] border-l-2 border-[#1ED760] rounded-r-lg p-4 mb-6">
        <p className="text-[11px] text-[#1ED760] uppercase tracking-wide mb-1">One-line Conclusion</p>
        <p className="text-sm text-foreground leading-6">
          {article.conclusion ?? article.thesis}
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-card border border-white/[0.06] rounded-lg p-4 mb-6">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-3">Contents</p>
        <ol className="space-y-1.5">
          {contents.map((block, i) => (
            <li key={block.text} className="flex items-center gap-2 text-[12px] text-foreground/70">
              <span className="text-[10px] text-muted-foreground w-4">{i + 1}.</span>
              {block.text.replace(/^\d+\.\s*/, "")}
            </li>
          ))}
        </ol>
      </div>

      {/* Body */}
      <ArticleContent blocks={content} />

      {/* Related Research */}
      <div className="border-t border-white/[0.07] pt-6">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[#B3B3B3]">Related Research</p>
        <div className="grid grid-cols-1 gap-1">
          {articles.filter(a => a.slug !== article.slug).slice(0, 3).map((a, index) => (
            <ArticleTrackRow key={a.slug} article={a} index={index + 1} onClick={() => onArticleClick(a)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page: Home ───────────────────────────────────────────────────────────────

function HomePage({ onArticleClick, onNavigate }: { onArticleClick: (a: Article) => void; onNavigate: (p: Page) => void }) {
  return (
    <div className="space-y-10 px-4 py-6 sm:px-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl p-6 sm:p-8" style={{ background: "linear-gradient(180deg, rgba(30, 215, 96, 0.12) 0%, #121212 55%)" }}>
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end">
          <ResearchCoverArt article={articles[0]} className="h-32 w-32 flex-shrink-0 sm:h-40 sm:w-40" />
          <div className="min-w-0">
            <p className="mb-3 flex items-center text-[11px] font-bold uppercase tracking-[0.15em] text-[#1ED760]">
              <span className="live-dot" aria-hidden="true" />▶ NOW READING · RESEARCH PORTFOLIO
            </p>
            <h1 className="mb-2 text-[40px] font-black leading-none tracking-[-1px] text-[#FFFFFF] sm:text-[56px]">
              Yash Khandelwal
            </h1>
            <p className="mb-3 text-base font-medium text-[#B3B3B3]">
              Web3 / DeFi Investment Research Analyst
            </p>
            <p className="mb-5 max-w-[520px] text-sm leading-[1.6] text-[#B3B3B3]">
              I research what others haven't priced yet. Two years in DeFi protocols, validator economics, and quant strategy — building stress-testing engines and onchain theses before the crowd catches on. Five years active across spot and derivatives. Based in Jaipur. Currently open to investment research roles.
            </p>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <button onClick={() => onNavigate("library")} className="rounded-full bg-[#1ED760] px-8 py-3 text-sm font-bold text-[#000000] transition duration-150 hover:scale-[1.03] hover:bg-[#1DB954] active:scale-[0.98]">
                ▶ Browse Research
              </button>
              <a href="https://linkedin.com/in/yash-khandelwal-76384b227" target="_blank" rel="noreferrer" className="rounded-full border-[1.5px] border-[#B3B3B3] px-7 py-[11px] text-sm font-bold text-[#FFFFFF] transition duration-150 hover:border-[#FFFFFF]">
                + Follow
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#B3B3B3]">
              <span><strong className="font-bold text-[#FFFFFF]">8</strong> Research Items</span>
              <span className="text-[#535353]">·</span>
              <span><strong className="font-bold text-[#FFFFFF]">900+</strong> Community Built</span>
              <span className="text-[#535353]">·</span>
              <span><strong className="font-bold text-[#FFFFFF]">5+</strong> Yrs Trading</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Research */}
      <div>
        <div className="shelf-header">
          <h2 className="text-[22px] font-bold text-[#FFFFFF]">Recent Research</h2>
          <button onClick={() => onNavigate("library")} className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.05em] text-[#B3B3B3] transition-colors hover:text-[#FFFFFF]">
            View all <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {articles.slice(0, 4).map(a => <ArticleCard key={a.slug} article={a} onClick={() => onArticleClick(a)} />)}
        </div>
      </div>

      {/* Research Playlists */}
      <div>
        <div className="shelf-header">
          <h2 className="text-[22px] font-bold text-[#FFFFFF]">Research Themes</h2>
          <button onClick={() => onNavigate("library")} className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.05em] text-[#B3B3B3] transition-colors hover:text-[#FFFFFF]">
            View all <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-8">
          {playlists.map(pl => (
            <PlaylistRow key={pl.slug} playlist={pl} onSelect={() => onNavigate("library")} onArticleClick={onArticleClick} />
          ))}
        </div>
      </div>

      {/* Featured Memos */}
      <div>
        <div className="shelf-header">
          <h2 className="text-[22px] font-bold text-[#FFFFFF]">Featured Memos</h2>
          <button onClick={() => onNavigate("library")} className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.05em] text-[#B3B3B3] transition-colors hover:text-[#FFFFFF]">
            View all <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {articles.filter(a => a.featured).map(a => <ArticleCard key={a.slug} article={a} onClick={() => onArticleClick(a)} />)}
        </div>
      </div>

      {/* Lab Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="cursor-pointer rounded-lg bg-[#181818] p-5 transition-colors hover:bg-[#282828] group" onClick={() => onNavigate("agents")}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#1ED760]/10 border border-white/[0.07] flex items-center justify-center">
              <Cpu size={16} className="text-[#1ED760]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">AI Agents Lab</h3>
              <p className="text-[11px] text-muted-foreground">{agents.length} agents</p>
            </div>
          </div>
          <p className="text-[12px] text-muted-foreground mb-3">Planned and building workflows for collecting sources, drafting memos, and checking claims.</p>
          <div className="flex flex-wrap gap-1">
            {agents.slice(0, 3).map(a => <MetaTag key={a.slug} label={a.name.split(" ")[0]} />)}
          </div>
          <div className="flex items-center gap-1 mt-3 text-[11px] text-[#1ED760] opacity-0 group-hover:opacity-100 transition-opacity">
            Explore Lab <ArrowRight size={11} />
          </div>
        </div>
        <div className="cursor-pointer rounded-lg bg-[#181818] p-5 transition-colors hover:bg-[#282828] group" onClick={() => onNavigate("dashboards")}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#1ED760]/10 border border-white/[0.07] flex items-center justify-center">
              <BarChart2 size={16} className="text-[#1ED760]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground">Dashboard Lab</h3>
              <p className="text-[11px] text-muted-foreground">{dashboards.length} dashboards</p>
            </div>
          </div>
          <p className="text-[12px] text-muted-foreground mb-3">Research dashboards for turning portfolio questions into evidence.</p>
          <div className="flex flex-wrap gap-1">
            {dashboards.slice(0, 3).map(d => <MetaTag key={d.slug} label={d.tool} />)}
          </div>
          <div className="flex items-center gap-1 mt-3 text-[11px] text-[#1ED760] opacity-0 group-hover:opacity-100 transition-opacity">
            Explore Lab <ArrowRight size={11} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Library ────────────────────────────────────────────────────────────

function LibraryPage({ onArticleClick, search, onSearchChange }: { onArticleClick: (a: Article) => void; search: string; onSearchChange: (query: string) => void }) {
  const [filter, setFilter] = useState<ArticleStatus | "All">("All");
  const [category, setCategory] = useState("All");

  const filtered = articles.filter(a => {
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "All" || a.status === filter;
    const matchSector = category === "All" || a.category === category;
    return matchSearch && matchFilter && matchSector;
  });

  return (
    <div className="px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl  font-semibold text-foreground mb-1">Research Library</h1>
        <p className="text-[13px] text-muted-foreground">{articles.length} research items across memos, maps, and drafts</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search memos..."
            className="w-full h-8 pl-8 pr-3 rounded-md bg-[#282828] border border-white/[0.07] text-[13px] text-[#FFFFFF] placeholder:text-[#B3B3B3] focus:outline-none focus:border-white/[0.15] transition-colors"
          />
        </div>
        <div className="flex gap-1">
          {(["All", "Published", "Draft", "Researching", "Map", "Memo"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded text-[11px] transition-colors ${filter === f ? "bg-[#1ED760] text-[#000000]" : "bg-[#282828] text-[#B3B3B3] hover:text-[#FFFFFF] border border-white/[0.07]"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sector filter */}
      <div className="flex gap-1 mb-5 flex-wrap">
        {[{ label: "All", value: "All" }, ...playlists.map(p => ({ label: p.title, value: p.category }))].map(s => (
          <button key={s.value} onClick={() => setCategory(s.value)}
            className={`px-2 py-0.5 rounded text-[10px] transition-colors ${category === s.value ? "text-[#000000] bg-[#1ED760]" : "text-[#B3B3B3] bg-[#282828] border border-white/[0.07] hover:text-[#FFFFFF]"}`}>
            {s.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground text-[13px]">No results found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map(a => <ArticleCard key={a.slug} article={a} onClick={() => onArticleClick(a)} />)}
        </div>
      )}
    </div>
  );
}

// ─── Page: About ─────────────────────────────────────────────────────────────

function AboutPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <div className="flex items-start gap-5 mb-8 pb-6 border-b border-white/[0.07]">
        <div className="w-16 h-16 rounded-full bg-[#282828] border border-white/[0.07] flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-semibold text-[#1ED760]">YK</span>
        </div>
        <div>
          <h1 className="text-xl  font-semibold text-foreground">Yash Khandelwal</h1>
          <p className="text-[13px] text-muted-foreground">Web3 / DeFi Investment Research Analyst</p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="text-[11px] text-muted-foreground hover:text-[#1ED760] transition-colors flex items-center gap-1"><Github size={11} /> GitHub</a>
            <a href="#" className="text-[11px] text-muted-foreground hover:text-[#1ED760] transition-colors flex items-center gap-1"><Globe size={11} /> Twitter</a>
          </div>
        </div>
      </div>

      <div className="space-y-5 text-[13px] text-muted-foreground leading-7  mb-8">
        <p>I research DeFi protocols, stablecoin yield systems, fixed-income primitives, and on-chain market structure.</p>
        <p>This portfolio is a public research library: memos, maps, dashboard ideas, and research agents that support source-backed analysis.</p>
        <p>The work is intentionally evidence-first. Drafts and lab projects are labeled as unfinished until the underlying research or tooling is ready.</p>
      </div>

      <div className="mb-8">
        <p className="text-[11px]  text-muted-foreground uppercase tracking-wide mb-4">Focus Areas</p>
        <div className="grid grid-cols-2 gap-2">
          {["Stablecoin Yield Mechanics", "DeFi Fixed Income", "On-chain Market Structure", "Protocol Revenue Analysis", "Agent-Payment Infrastructure", "Consumer Crypto Finance"].map(f => (
            <div key={f} className="flex items-center gap-2 text-[12px] text-foreground/70 p-2 rounded bg-[#181818] border border-white/[0.07]">
              <span className="w-1 h-1 rounded-full bg-[#1ED760] flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px]  text-muted-foreground uppercase tracking-wide mb-4">Experience</p>
        <div className="space-y-4">
          {[
            { role: "DeFi Research Analyst", org: "Independent", period: "2023 — Present", desc: "Producing investment memos on DeFi protocols, stablecoin mechanics, and on-chain market structure." },
            { role: "Crypto Research Intern", org: "Web3 Fund", period: "2022 — 2023", desc: "Coverage of L1/L2 ecosystems, protocol tokenomics, and competitive positioning." },
          ].map(e => (
            <div key={e.role} className="border-l border-white/[0.07] pl-4">
              <p className="text-[13px] font-medium text-foreground">{e.role}</p>
              <p className="text-[11px] text-[#1ED760] mb-1">{e.org} · {e.period}</p>
              <p className="text-[12px] text-muted-foreground">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page: Contact ────────────────────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [notice, setNotice] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-xl  font-semibold text-foreground mb-1">Get in Touch</h1>
      <p className="text-[13px] text-muted-foreground mb-6">Research collaborations, source suggestions, or feedback on the public research library.</p>

      <div className="mb-5 rounded-lg border border-white/[0.07] bg-[#181818] p-4">
        <p className="text-[11px] text-[#1ED760] uppercase tracking-wide mb-1">Local Placeholder</p>
        <p className="text-[12px] text-muted-foreground leading-6">
          This form is a local portfolio placeholder and does not send messages yet. Use the contact links below for real outreach.
        </p>
      </div>

      {notice && (
        <div className="mb-4 rounded-lg border border-white/[0.07] bg-[#282828] p-3">
          <p className="text-[12px] text-foreground/80 leading-5">This form is not connected to a backend. Please use the contact links below.</p>
        </div>
      )}

      <form onSubmit={e => { e.preventDefault(); setNotice(true); }} className="space-y-4">
        {[
          { label: "Name", key: "name", type: "text", placeholder: "Your name" },
          { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
          { label: "Subject", key: "subject", type: "text", placeholder: "Research question, collaboration..." },
        ].map(field => (
          <div key={field.key}>
            <label className="block text-[11px]  text-muted-foreground mb-1.5 uppercase tracking-wide">{field.label}</label>
            <input
              type={field.type}
              value={form[field.key as keyof typeof form]}
              onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
              placeholder={field.placeholder}
              className="w-full h-9 px-3 rounded-md bg-[#282828] border border-white/[0.07] text-[13px] text-[#FFFFFF] placeholder:text-[#B3B3B3] focus:outline-none focus:border-white/[0.15] transition-colors"
            />
          </div>
        ))}
        <div>
          <label className="block text-[11px]  text-muted-foreground mb-1.5 uppercase tracking-wide">Message</label>
          <textarea
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            rows={4}
            placeholder="What are you working on?"
            className="w-full px-3 py-2 rounded-md bg-[#282828] border border-white/[0.07] text-[13px] text-[#FFFFFF] placeholder:text-[#B3B3B3] focus:outline-none focus:border-white/[0.15] resize-none transition-colors"
          />
        </div>
        <button type="submit" className="w-full h-9 rounded-full bg-[#1ED760] text-[#000000] text-[13px] font-bold hover:bg-[#1DB954] active:bg-[#158A3E] transition-colors">
          Show Contact Instructions
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/[0.07]">
        <p className="text-[11px]  text-muted-foreground uppercase tracking-wide mb-3">Other Ways</p>
        <div className="space-y-2">
          {[["Twitter / X", "@yashkhandelwal", Globe], ["GitHub", "github.com/yashkhandelwal", Github], ["Email", "yash@research.xyz", Mail]].map(([label, val, Icon]) => (
            <div key={label as string} className="flex items-center gap-3 text-[12px] text-muted-foreground">
              <span className="w-6 h-6 rounded bg-[#282828] border border-white/[0.07] flex items-center justify-center">
                {/* @ts-ignore */}
                <Icon size={11} />
              </span>
              <span className="flex-1">{label as string}</span>
              <span className="">{val as string}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const navItems = [
  { id: "home" as Page, label: "Home", icon: Home },
  { id: "library" as Page, label: "Research Library", icon: BookOpen },
  { id: "agents" as Page, label: "AI Agents Lab", icon: Cpu },
  { id: "dashboards" as Page, label: "Dashboard Lab", icon: BarChart2 },
  { id: "about" as Page, label: "About", icon: User },
  { id: "contact" as Page, label: "Contact", icon: Mail },
];

function Sidebar({ current, onNavigate, collapsed }: { current: Page; onNavigate: (p: Page) => void; collapsed: boolean }) {
  return (
    <aside className={`flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${collapsed ? "w-14" : "w-14 sm:w-52"}`}>
      {/* Logo */}
      <div className={`flex items-center gap-2.5 py-5 border-b border-white/[0.05] ${collapsed ? "justify-center px-0" : "justify-center px-0 sm:justify-start sm:px-4"}`}>
        <div className="w-7 h-7 rounded-md bg-[#1ED760] flex items-center justify-center flex-shrink-0">
          <BookOpen size={14} className="text-[#000000]" />
        </div>
        {!collapsed && <span className="hidden sm:inline text-[13px] font-medium text-[#FFFFFF] tracking-tight">research.xyz</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-0.5 px-2">
        {navItems.map(item => {
          const active = current === item.id || (current === "article" && item.id === "library");
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded text-[12px] transition-colors ${active ? "font-medium text-[#1ED760]" : "font-medium text-[#B3B3B3] hover:bg-[#282828] hover:text-[#FFFFFF]"} ${collapsed ? "justify-center" : "justify-center sm:justify-start"}`}>
              <item.icon size={15} className="flex-shrink-0" />
              {!collapsed && <span className="hidden sm:inline">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Library section */}
      {!collapsed && (
        <div className="hidden sm:block border-t border-white/[0.05] px-3 pb-4 pt-3">
          <p className="px-3 pb-2 pt-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[#B3B3B3]">Your Library</p>
          <div className="space-y-1">
            {playlists.map(pl => {
              const shelfArticle = articles.find(article => article.category === pl.category) ?? articles[0];
              const count = articles.filter(article => article.category === pl.category).length;
              return (
                <div key={pl.slug} className="flex w-full items-center gap-3 rounded px-2 py-2 text-left transition-colors hover:bg-[#282828]">
                  <ResearchCoverArt article={shelfArticle} compact className="h-10 w-10 flex-shrink-0 rounded border-0" />
                  <div className="min-w-0">
                    <p className="truncate text-sm leading-tight text-[#FFFFFF]">{pl.title}</p>
                    <p className="truncate text-[12px] leading-5 text-[#B3B3B3]">Playlist · {count} {count === 1 ? "item" : "items"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Right Panel ──────────────────────────────────────────────────────────────

function RightPanel({ onClose, onArticleClick, activeArticle }: { onClose: () => void; onArticleClick: (article: Article) => void; activeArticle: Article }) {
  const queueArticles = [activeArticle, ...articles.filter(a => a.slug !== activeArticle.slug)].slice(0, 4);

  return (
    <aside className="hidden w-64 flex-shrink-0 bg-[#121212] border-l border-white/[0.07] md:flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <ListChecks size={13} className="text-[#1ED760]" />
          <span className="text-[12px] font-medium text-[#FFFFFF]">Research Queue</span>
        </div>
        <button onClick={onClose} aria-label="Close research queue" className="text-[#B3B3B3] hover:text-[#FFFFFF] transition-colors"><X size={13} /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {/* Next up */}
        <div>
          <p className="text-[11px] font-bold text-[#B3B3B3] uppercase tracking-[0.1em] mb-2 px-1">Next Up</p>
          <div className="space-y-1">
            {queueArticles.map((a, i) => (
              <ArticleTrackRow key={a.slug} article={a} index={i + 1} active={a.slug === activeArticle.slug} onClick={() => onArticleClick(a)} />
            ))}
          </div>
        </div>

        {/* Open Questions */}
        <div>
          <p className="text-[11px] font-bold text-[#B3B3B3] uppercase tracking-[0.1em] mb-2 px-1">Open Questions</p>
          <div className="space-y-2">
            {openQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded bg-[#181818] border border-white/[0.07]">
                <Circle size={8} className="text-[#1ED760] mt-1 flex-shrink-0" />
                <p className="text-[11px] text-[#B3B3B3] leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recently saved */}
        <div>
          <p className="text-[11px] font-bold text-[#B3B3B3] uppercase tracking-[0.1em] mb-2 px-1">Saved Sources</p>
          <div className="space-y-1">
            {savedSources.map(s => (
              <div key={s} className="flex items-center gap-2 p-2 rounded">
                <ExternalLink size={9} className="text-[#B3B3B3] flex-shrink-0" />
                <span className="text-[11px] text-[#B3B3B3] truncate">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Bottom Bar ───────────────────────────────────────────────────────────────

function NowReadingBar({
  article,
  onOpen,
  onPrevious,
  onNext,
  isArticlePage,
  scrollContainerRef,
}: {
  article: Article;
  onOpen: () => void;
  onPrevious: () => void;
  onNext: () => void;
  isArticlePage: boolean;
  scrollContainerRef: { current: HTMLDivElement | null };
}) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const time = formatReadTime(progress, article.readTime);

  useEffect(() => {
    if (!isArticlePage) {
      setProgress(0);
      return;
    }

    const scroller = scrollContainerRef.current;
    if (!scroller) return;

    const updateProgress = () => {
      const scrollable = scroller.scrollHeight - scroller.clientHeight;
      const nextProgress = scrollable <= 0 ? 100 : (scroller.scrollTop / scrollable) * 100;
      setProgress(Math.max(0, Math.min(100, nextProgress)));
    };

    updateProgress();
    scroller.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      scroller.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [article.slug, isArticlePage, scrollContainerRef]);

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const scroller = scrollContainerRef.current;
    if (!isArticlePage || !scroller) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const scrollable = scroller.scrollHeight - scroller.clientHeight;
    scroller.scrollTo({ top: scrollable * ratio, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000] flex h-[56px] items-center gap-2 border-t border-white/[0.07] bg-[#181818] px-2 sm:h-[72px] sm:px-4 sm:gap-4">
      {/* Article info */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:w-64 sm:flex-initial sm:flex-shrink-0 sm:gap-3">
        <ResearchCoverArt article={article} compact className="h-10 w-10 flex-shrink-0 rounded border-0" />
        <div className="min-w-0">
          <button onClick={onOpen} aria-label={`Open ${article.title}`} className="block max-w-[190px] truncate text-left text-sm font-medium leading-tight text-[#FFFFFF] transition-colors hover:text-[#FFFFFF]">
            {article.title.split(":")[0]}
          </button>
          <p className="hidden max-w-[190px] truncate text-[12px] text-[#B3B3B3] sm:block">{article.category}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex min-w-0 flex-shrink-0 flex-col items-center gap-2 sm:mx-auto sm:max-w-md sm:flex-1">
        <div className="flex items-center gap-6">
          <button onClick={onPrevious} aria-label="Previous article" className="hidden text-[#B3B3B3] transition-colors hover:text-[#FFFFFF] sm:inline-flex"><SkipBack size={20} /></button>
          <button onClick={() => setPlaying(p => !p)} aria-label={playing ? "Pause reading session" : "Play reading session"} className="flex h-8 w-8 items-center justify-center rounded-full text-[#FFFFFF] transition-transform hover:scale-105">
            {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
          </button>
          <button onClick={onNext} aria-label="Next article" className="hidden text-[#B3B3B3] transition-colors hover:text-[#FFFFFF] sm:inline-flex"><SkipForward size={20} /></button>
        </div>
        <div className="hidden w-full items-center gap-2 sm:flex">
          <span className="w-10 text-right text-[12px] text-[#B3B3B3]">{time.elapsed}</span>
          <div
            className="group h-1 flex-1 cursor-pointer overflow-hidden rounded-full bg-[#535353]"
            role="slider"
            aria-label="Reading progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            onClick={handleProgressClick}
          >
            <div className="h-full rounded-full bg-[#FFFFFF] transition-all duration-200 group-hover:bg-[#1ED760]" style={{ width: `${progress}%` }} />
          </div>
          <span className="w-10 text-[12px] text-[#B3B3B3]">{time.total}</span>
        </div>
      </div>

      {/* Right */}
      <div className="hidden w-52 flex-shrink-0 items-center justify-end gap-3 md:flex">
        <button aria-label="Bookmark current research" className="text-[#B3B3B3] transition-colors hover:text-[#FFFFFF]">
          <Bookmark size={20} />
        </button>
        <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#535353]">Now Reading</p>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [activeArticle, setActiveArticle] = useState<Article>(articles[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");

  const mainRef = useRef<HTMLDivElement>(null);

  const handleArticleClick = (a: Article) => {
    setActiveArticle(a);
    setPage("article");
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRelativeArticle = (offset: number) => {
    const currentIndex = articles.findIndex(a => a.slug === activeArticle.slug);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex = (safeIndex + offset + articles.length) % articles.length;
    handleArticleClick(articles[nextIndex]);
  };

  const handleNavigate = (p: Page) => {
    setPage(p);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Main layout above bottom bar */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <Sidebar current={page} onNavigate={handleNavigate} collapsed={sidebarCollapsed} />

        {/* Center column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-12 flex-shrink-0 flex items-center gap-3 px-4 border-b border-white/[0.07] bg-[#121212]/90 sticky top-0 z-40" style={{ backdropFilter: "blur(8px)" }}>
            <button onClick={() => setSidebarCollapsed(c => !c)} aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"} className="text-[#B3B3B3] hover:text-[#FFFFFF] transition-colors p-1 rounded hover:bg-[#282828]">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="3" width="13" height="1.5" rx="0.75" fill="currentColor" /><rect x="1" y="7" width="13" height="1.5" rx="0.75" fill="currentColor" /><rect x="1" y="11" width="13" height="1.5" rx="0.75" fill="currentColor" /></svg>
            </button>

            <div className="relative flex-1 max-w-xs">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={globalSearch}
                onChange={e => { setGlobalSearch(e.target.value); if (e.target.value && page !== "library") handleNavigate("library"); }}
                placeholder="Search research..."
                className="w-full h-7 pl-7 pr-3 rounded-full bg-[#282828] border border-white/[0.07] text-[12px] text-[#FFFFFF] placeholder:text-[#B3B3B3] focus:outline-none focus:border-white/[0.15] transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 ml-auto">
              <button onClick={() => setRightPanelOpen(o => !o)} aria-label={rightPanelOpen ? "Hide research queue" : "Show research queue"} className={`hidden md:block p-1.5 rounded transition-colors ${rightPanelOpen ? "text-[#1ED760] bg-[#282828]" : "text-[#B3B3B3] hover:text-[#FFFFFF] hover:bg-[#282828]"}`}>
                <PanelRight size={14} />
              </button>
              <div className="w-6 h-6 rounded-full bg-[#282828] border border-white/[0.07] flex items-center justify-center ml-1">
                <span className="text-[9px] font-medium text-[#1ED760]">YK</span>
              </div>
            </div>
          </header>

          {/* Scrollable main content */}
          <main ref={mainRef} className="flex-1 overflow-y-auto pb-20 sm:pb-24">
            {page === "home" && <HomePage onArticleClick={handleArticleClick} onNavigate={handleNavigate} />}
            {page === "library" && <LibraryPage onArticleClick={handleArticleClick} search={globalSearch} onSearchChange={setGlobalSearch} />}
            {page === "article" && <ArticlePage article={activeArticle} onBack={() => handleNavigate("library")} onArticleClick={handleArticleClick} />}
            {page === "agents" && (
              <div className="px-4 py-6">
                <div className="mb-6">
                  <h1 className="text-xl  font-semibold text-foreground mb-1">AI Agents Lab</h1>
                  <p className="text-[13px] text-muted-foreground">Autonomous tools that turn research questions into continuous evidence.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {agents.map(a => <AgentCard key={a.slug} agent={a} />)}
                </div>
              </div>
            )}
            {page === "dashboards" && (
              <div className="px-4 py-6">
                <div className="mb-6">
                  <h1 className="text-xl  font-semibold text-foreground mb-1">Dashboard Lab</h1>
                  <p className="text-[13px] text-muted-foreground">Planned and building research views for the questions behind the memos.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {dashboards.map(d => (
                    <DashboardCard key={d.slug} dash={d} onArticleClick={() => {
                      const a = articles.find(ar => ar.slug === d.relatedArticleSlug);
                      if (a) handleArticleClick(a);
                    }} />
                  ))}
                </div>
              </div>
            )}
            {page === "about" && <AboutPage />}
            {page === "contact" && <ContactPage />}
          </main>
        </div>

        {/* Right panel */}
        {rightPanelOpen && <RightPanel onClose={() => setRightPanelOpen(false)} onArticleClick={handleArticleClick} activeArticle={activeArticle} />}
      </div>

      {/* Bottom Now Reading bar */}
      <NowReadingBar
        article={activeArticle}
        onOpen={() => { setPage("article"); mainRef.current?.scrollTo({ top: 0 }); }}
        onPrevious={() => handleRelativeArticle(-1)}
        onNext={() => handleRelativeArticle(1)}
        isArticlePage={page === "article"}
        scrollContainerRef={mainRef}
      />
    </div>
  );
}
