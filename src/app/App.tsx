import { useState, useRef } from "react";
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
  Volume2,
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

const statusColor: Record<ArticleStatus, string> = {
  Published: "#60a5fa",
  Draft: "#f59e0b",
  Researching: "#8b978e",
  Map: "#a78bfa",
  Memo: "#32d583",
};

const buildStatusColor: Record<BuildStatus, string> = {
  Live: "#32d583",
  Building: "#f59e0b",
  Planned: "#8b978e",
};

const buildStatusDot: Record<BuildStatus, string> = {
  Live: "bg-[#32d583]",
  Building: "bg-[#f59e0b]",
  Planned: "bg-[#8b978e]",
};

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getArticleCover(article: Article): CoverArtMetadata {
  return article.coverArt ?? articleCoverPresets[article.category] ?? {
    variant: "grid",
    colors: ["#102016", "#32d583", "#60a5fa"],
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
      className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase"
      style={{ color: statusColor[status], backgroundColor: statusColor[status] + "18", border: `1px solid ${statusColor[status]}30` }}
    >
      {status}
    </span>
  );
}

function BuildBadge({ status }: { status: BuildStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-medium tracking-wide uppercase"
      style={{ color: buildStatusColor[status], backgroundColor: buildStatusColor[status] + "15", border: `1px solid ${buildStatusColor[status]}28` }}>
      <span className={`w-1.5 h-1.5 rounded-full ${buildStatusDot[status]}`} />
      {status}
    </span>
  );
}

function MetaTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] text-[#8b978e] bg-[#1d241d] border border-white/5">
      {label}
    </span>
  );
}

function ResearchCoverArt({ article, className = "", compact = false }: { article: Article; className?: string; compact?: boolean }) {
  const cover = getArticleCover(article);
  const isNodes = cover.variant === "nodes";
  const isBlocks = cover.variant === "blocks";

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ${className}`}
      style={{
        background: `linear-gradient(135deg, ${cover.colors[0]} 0%, ${cover.colors[1]} 58%, ${cover.colors[2]} 100%)`,
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 20% 18%, rgba(255,255,255,0.35), transparent 22%), radial-gradient(circle at 82% 76%, ${cover.colors[2]}99, transparent 28%), linear-gradient(120deg, transparent 0 42%, rgba(255,255,255,0.18) 43% 45%, transparent 46% 100%)`,
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
  const tone = block.visual === "agent-network" ? "#a78bfa" : block.visual === "market-map" ? "#fb7185" : block.visual === "rate-spread" ? "#60a5fa" : "#32d583";

  return (
    <div className="relative h-64 overflow-hidden rounded-md bg-[#0d120d] sm:h-72">
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
    <div className="rounded-lg border border-white/[0.08] bg-[#0d120d] p-2">
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
          const tone = block.tone === "warning" ? "#f59e0b" : block.tone === "info" ? "#60a5fa" : "#32d583";
          return (
            <div key={index} className="rounded-lg border border-white/[0.07] border-l-2 bg-[#101610] p-4 sm:p-5" style={{ borderLeftColor: tone }}>
              {block.label && <p className="mb-2 text-[11px] uppercase tracking-wide" style={{ color: tone }}>{block.label}</p>}
              <p className="text-sm leading-7 text-foreground/88">{block.text}</p>
            </div>
          );
        }

        if (block.type === "table") {
          return (
            <div key={index} className="overflow-hidden rounded-lg border border-white/[0.07] bg-[#0d120d]">
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
                          <td key={`${rowIndex}-${cellIndex}`} className={`px-4 py-3 align-top text-foreground/74 ${cellIndex === 0 ? "font-medium text-[#32d583]/85" : ""}`}>
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
              <div className="rounded-lg border border-white/[0.08] bg-[#0d120d] p-2">
                <FigurePlaceholder block={block} />
              </div>
              {block.caption && <p className="text-[12px] leading-5 text-muted-foreground">{block.caption}</p>}
            </figure>
          );
        }

        if (block.type === "checklist") {
          return (
            <section key={index} className="space-y-3 rounded-lg border border-white/[0.07] bg-[#111611] p-4 sm:p-5">
              {block.title && <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{block.title}</p>}
              {block.items.map(item => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0">
                    {item.level === "green" ? <CheckSquare size={14} className="text-[#32d583]/80" /> :
                      item.level === "red" ? <AlertCircle size={14} className="text-[#ef4444]/85" /> :
                        <AlertCircle size={14} className="text-[#f59e0b]/85" />}
                  </span>
                  <p className="text-[13px] leading-6 text-foreground/74">{item.text}</p>
                </div>
              ))}
            </section>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={index} className="rounded-lg border border-white/[0.07] bg-[#191f19] p-4 sm:p-5">
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
                  <div key={source} className="flex items-center gap-2 text-[12px] text-muted-foreground hover:text-[#32d583] cursor-pointer transition-colors">
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
      className="group text-left w-full bg-card border border-white/[0.06] rounded-lg p-3 hover:bg-[#1b211b] hover:border-[#32d583]/20 transition-all duration-200"
    >
      <div className="flex gap-3">
        <ResearchCoverArt article={article} compact className="w-16 h-16 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3 mb-1.5">
            <h3 className="text-sm font-medium text-foreground leading-snug group-hover:text-[#32d583] transition-colors">
              {article.title}
            </h3>
            <StatusBadge status={article.status} />
          </div>
          <p className="text-[12px] text-muted-foreground leading-relaxed mb-2 line-clamp-2">
            {article.thesis}
          </p>
          <div className="flex flex-wrap gap-1 mb-2">
            {article.tags.slice(0, 3).map(t => <MetaTag key={t} label={t} />)}
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(article.date)}</span>
            <span className="flex items-center gap-1"><Clock size={10} />{article.readTime} min</span>
            <span className="ml-auto flex items-center gap-1 text-[#32d583] opacity-0 group-hover:opacity-100 transition-opacity">
              Open <ArrowRight size={10} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Playlist Row ─────────────────────────────────────────────────────────────

function PlaylistRow({ playlist, onSelect }: { playlist: ResearchPlaylist; onSelect: () => void }) {
  const rowArticles = articles.filter(a => a.category === playlist.category);
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded flex items-center justify-center text-[10px]"
            style={{ backgroundColor: playlist.color + "20", color: playlist.color, border: `1px solid ${playlist.color}30` }}>
            {getPlaylistIcon(playlist.icon)}
          </span>
          <h2 className="text-sm font-medium text-foreground">{playlist.title}</h2>
          <span className="text-[11px] text-muted-foreground">{playlist.count} memos</span>
        </div>
        <button onClick={onSelect} className="text-[11px] text-muted-foreground hover:text-[#32d583] transition-colors flex items-center gap-1">
          View all <ChevronRight size={12} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {rowArticles.slice(0, 3).map(a => (
          <div key={a.slug} className="flex items-start gap-2 p-2.5 rounded-md hover:bg-[#1b211b] cursor-pointer group/item transition-colors border border-transparent hover:border-[#32d583]/10">
            <ResearchCoverArt article={a} compact className="w-9 h-9 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-foreground truncate group-hover/item:text-[#32d583] transition-colors leading-snug">
                {a.title.split(":")[0]}
              </p>
              <p className="text-[10px] text-muted-foreground">{a.readTime} min · {a.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Agent Card ───────────────────────────────────────────────────────────────

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="bg-card border border-white/[0.06] rounded-lg p-4 hover:border-[#32d583]/18 hover:bg-[#1b211b] transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#32d583]/10 border border-[#32d583]/20 flex items-center justify-center">
            <Zap size={14} className="text-[#32d583]" />
          </div>
          <h3 className="text-sm font-medium text-foreground">{agent.name}</h3>
        </div>
        <BuildBadge status={agent.status} />
      </div>
      <p className="text-[12px] text-muted-foreground mb-1.5 leading-relaxed">{agent.problem}</p>
      <p className="text-[12px] text-foreground/70 mb-3 leading-relaxed">{agent.whatItDoes}</p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-[#0d120d] rounded p-2 border border-white/5">
          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">Inputs</p>
          {agent.inputs.map(i => <p key={i} className="text-[11px] text-foreground/70">{i}</p>)}
        </div>
        <div className="bg-[#0d120d] rounded p-2 border border-white/5">
          <p className="text-[10px] text-muted-foreground mb-1 uppercase tracking-wide">Outputs</p>
          {agent.outputs.map(o => <p key={o} className="text-[11px] text-foreground/70">{o}</p>)}
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {agent.stack.map(s => <MetaTag key={s} label={s} />)}
      </div>
      <div className="flex gap-2">
        {agent.githubUrl && (
          <a href={agent.githubUrl} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-[#32d583] transition-colors">
            <Github size={11} /> GitHub
          </a>
        )}
        {agent.demoUrl && (
          <a href={agent.demoUrl} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-[#32d583] transition-colors">
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
  const color = dash.preview?.colors[1] ?? "#32d583";

  return (
    <div className="bg-card border border-white/[0.06] rounded-lg overflow-hidden hover:border-[#32d583]/18 transition-all group">
      <div className="h-24 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: color + "10", borderBottom: `1px solid ${color}20` }}>
        <div className="absolute inset-0 opacity-20" style={{ background: `radial-gradient(circle at 30% 50%, ${color}40, transparent 70%)` }} />
        <BarChart2 size={32} style={{ color: color + "60" }} className="relative z-10" />
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
            <button className="flex-1 py-1.5 text-[11px] font-medium rounded text-[#32d583] bg-[#32d583]/10 border border-[#32d583]/20 hover:bg-[#32d583]/15 transition-colors flex items-center justify-center gap-1">
              <ExternalLink size={10} /> Open Dashboard
            </button>
          )}
          {dash.status !== "Live" && (
            <button disabled className="flex-1 py-1.5 text-[11px] font-medium rounded text-muted-foreground bg-muted/30 border border-white/5 cursor-not-allowed flex items-center justify-center gap-1">
              In Progress
            </button>
          )}
          {dash.relatedArticleSlug && (
            <button onClick={onArticleClick} className="px-2 py-1.5 text-[11px] text-muted-foreground hover:text-[#32d583] transition-colors rounded border border-white/5 hover:border-white/10">
              <FileText size={11} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Individual Article Page ───────────────────────────────────────────────────

function ArticlePage({ article, onBack }: { article: Article; onBack: () => void }) {
  const content = getArticleContent(article);
  const contents = content.filter((block): block is Extract<ArticleContentBlock, { type: "heading" }> => block.type === "heading");

  return (
    <div className="mx-auto max-w-3xl px-4 py-7 pb-32 sm:px-6">
      <button onClick={onBack} className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-[#32d583] transition-colors mb-6">
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
      <div className="bg-[#32d583]/08 border-l-2 border-[#32d583] rounded-r-lg p-4 mb-6">
        <p className="text-[11px] text-[#32d583] uppercase tracking-wide mb-1">One-line Conclusion</p>
        <p className="text-sm text-foreground leading-6">
          {article.conclusion ?? article.thesis}
        </p>
      </div>

      {/* Table of Contents */}
      <div className="bg-card border border-white/[0.06] rounded-lg p-4 mb-6">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-3">Contents</p>
        <ol className="space-y-1.5">
          {contents.map((block, i) => (
            <li key={block.text} className="flex items-center gap-2 text-[12px] text-foreground/70 hover:text-[#32d583] cursor-pointer transition-colors">
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
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide mb-3">Related Research</p>
        <div className="grid grid-cols-1 gap-2">
          {articles.filter(a => a.slug !== article.slug).slice(0, 3).map(a => (
            <div key={a.slug} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#1b211b] cursor-pointer transition-colors border border-transparent hover:border-[#32d583]/10">
              <ResearchCoverArt article={a} compact className="w-9 h-9 flex-shrink-0" />
              <div>
                <p className="text-[12px] font-medium text-foreground hover:text-[#32d583] transition-colors">{a.title}</p>
                <p className="text-[11px] text-muted-foreground">{formatDate(a.date)} · {a.readTime} min</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page: Home ───────────────────────────────────────────────────────────────

function HomePage({ onArticleClick, onNavigate }: { onArticleClick: (a: Article) => void; onNavigate: (p: Page) => void }) {
  return (
    <div className="px-4 py-6 space-y-10">
      {/* Hero */}
      <div className="relative rounded-xl overflow-hidden p-6 sm:p-8 bg-[#101510] border border-[#32d583]/12">
        <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(ellipse at 12% 0%, rgba(50,213,131,0.22) 0%, transparent 48%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent)" }} />
        <div className="relative z-10 flex flex-col sm:flex-row gap-6 sm:items-end">
          <ResearchCoverArt article={articles[0]} className="w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[11px] text-[#32d583] uppercase tracking-widest mb-3">Research Portfolio</p>
            <h1 className="text-3xl font-bold text-foreground leading-tight mb-2">
              Yash Khandelwal
            </h1>
            <p className="text-base font-medium text-foreground/85 mb-3">
              Web3 / DeFi Investment Research Analyst
            </p>
            <p className="text-[13px] text-muted-foreground max-w-xl leading-relaxed mb-5">
              Crypto market memos, DeFi protocol analysis, dashboards, and research agents organized as a working analyst library.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => onNavigate("library")} className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold text-[#061006] bg-[#32d583] hover:bg-[#49e99a] transition-colors">
                <BookOpen size={14} /> Browse Research
              </button>
              <button onClick={() => onArticleClick(articles[0])} className="flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium text-foreground bg-white/7 border border-white/10 hover:bg-white/10 transition-colors">
                Latest Memo <ArrowRight size={13} />
              </button>
              <span className="text-[11px] text-muted-foreground">{articles.length} research items · {dashboards.length} dashboards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Research */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Recent Research</h2>
          <button onClick={() => onNavigate("library")} className="text-[11px] text-muted-foreground hover:text-[#32d583] transition-colors flex items-center gap-1">
            View all <ChevronRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {articles.slice(0, 4).map(a => <ArticleCard key={a.slug} article={a} onClick={() => onArticleClick(a)} />)}
        </div>
      </div>

      {/* Research Playlists */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Research Themes</h2>
        </div>
        <div className="space-y-8">
          {playlists.map(pl => (
            <PlaylistRow key={pl.slug} playlist={pl} onSelect={() => onNavigate("library")} />
          ))}
        </div>
      </div>

      {/* Featured Memos */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Featured Memos</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {articles.filter(a => a.featured).map(a => (
            <button key={a.slug} onClick={() => onArticleClick(a)} className="group text-left bg-card border border-white/[0.06] rounded-lg overflow-hidden hover:border-[#32d583]/30 transition-all">
              <ResearchCoverArt article={a} className="h-24 rounded-none border-x-0 border-t-0" />
              <div className="p-4">
                <div className="mb-2"><StatusBadge status={a.status} /></div>
                <h3 className="text-[13px] font-medium text-foreground mb-1 group-hover:text-[#32d583] transition-colors leading-snug line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-[11px] text-muted-foreground">{a.readTime} min · {formatDate(a.date)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lab Previews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-white/[0.06] rounded-lg p-5 hover:border-[#32d583]/20 transition-all group cursor-pointer" onClick={() => onNavigate("agents")}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#32d583]/10 border border-[#32d583]/20 flex items-center justify-center">
              <Cpu size={16} className="text-[#32d583]" />
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
          <div className="flex items-center gap-1 mt-3 text-[11px] text-[#32d583] opacity-0 group-hover:opacity-100 transition-opacity">
            Explore Lab <ArrowRight size={11} />
          </div>
        </div>
        <div className="bg-card border border-white/[0.06] rounded-lg p-5 hover:border-[#60a5fa]/20 transition-all group cursor-pointer" onClick={() => onNavigate("dashboards")}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-[#60a5fa]/10 border border-[#60a5fa]/20 flex items-center justify-center">
              <BarChart2 size={16} className="text-[#60a5fa]" />
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
          <div className="flex items-center gap-1 mt-3 text-[11px] text-[#60a5fa] opacity-0 group-hover:opacity-100 transition-opacity">
            Explore Lab <ArrowRight size={11} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Library ────────────────────────────────────────────────────────────

function LibraryPage({ onArticleClick }: { onArticleClick: (a: Article) => void }) {
  const [search, setSearch] = useState("");
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
            onChange={e => setSearch(e.target.value)}
            placeholder="Search memos..."
            className="w-full h-8 pl-8 pr-3 rounded-md bg-[#1b211b] border border-white/[0.07] text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#32d583]/40  transition-colors"
          />
        </div>
        <div className="flex gap-1">
          {(["All", "Published", "Draft", "Researching", "Map", "Memo"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded text-[11px]  transition-colors ${filter === f ? "bg-[#32d583] text-[#061006]" : "bg-[#1b211b] text-muted-foreground hover:text-foreground border border-white/[0.06]"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sector filter */}
      <div className="flex gap-1 mb-5 flex-wrap">
        {[{ label: "All", value: "All" }, ...playlists.map(p => ({ label: p.title, value: p.category }))].map(s => (
          <button key={s.value} onClick={() => setCategory(s.value)}
            className={`px-2 py-0.5 rounded text-[10px]  transition-colors ${category === s.value ? "text-[#32d583] bg-[#32d583]/10 border border-[#32d583]/20" : "text-muted-foreground bg-[#1b211b] border border-white/[0.06] hover:text-foreground"}`}>
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
        <div className="w-16 h-16 rounded-full bg-[#32d583]/15 border border-[#32d583]/25 flex items-center justify-center flex-shrink-0">
          <span className="text-xl  font-semibold text-[#32d583]">YK</span>
        </div>
        <div>
          <h1 className="text-xl  font-semibold text-foreground">Yash Khandelwal</h1>
          <p className="text-[13px] text-muted-foreground">Web3 / DeFi Investment Research Analyst</p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="text-[11px]  text-muted-foreground hover:text-[#32d583] transition-colors flex items-center gap-1"><Github size={11} /> GitHub</a>
            <a href="#" className="text-[11px]  text-muted-foreground hover:text-[#32d583] transition-colors flex items-center gap-1"><Globe size={11} /> Twitter</a>
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
            <div key={f} className="flex items-center gap-2 text-[12px] text-foreground/70 p-2 rounded bg-[#151915] border border-white/[0.05]">
              <span className="w-1 h-1 rounded-full bg-[#32d583] flex-shrink-0" />
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
              <p className="text-[11px]  text-[#32d583] mb-1">{e.org} · {e.period}</p>
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
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-xl  font-semibold text-foreground mb-1">Get in Touch</h1>
      <p className="text-[13px] text-muted-foreground mb-6">Research collaborations, source suggestions, or feedback on the public research library.</p>

      {sent ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full bg-[#32d583]/15 border border-[#32d583]/25 flex items-center justify-center mx-auto mb-3">
            <CheckSquare size={20} className="text-[#32d583]" />
          </div>
          <p className="text-sm  text-foreground">Message sent.</p>
          <p className="text-[12px] text-muted-foreground mt-1">{"I'll"} get back to you within 48 hours.</p>
        </div>
      ) : (
        <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
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
                className="w-full h-9 px-3 rounded-md bg-[#1b211b] border border-white/[0.07] text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#32d583]/40 transition-colors"
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
              className="w-full px-3 py-2 rounded-md bg-[#1b211b] border border-white/[0.07] text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#32d583]/40 resize-none transition-colors"
            />
          </div>
          <button type="submit" className="w-full h-9 rounded-md bg-[#32d583] text-[#061006] text-[13px] font-medium hover:bg-[#49e99a] transition-colors">
            Send Message
          </button>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-white/[0.07]">
        <p className="text-[11px]  text-muted-foreground uppercase tracking-wide mb-3">Other Ways</p>
        <div className="space-y-2">
          {[["Twitter / X", "@yashkhandelwal", Globe], ["GitHub", "github.com/yashkhandelwal", Github], ["Email", "yash@research.xyz", Mail]].map(([label, val, Icon]) => (
            <a key={label as string} href="#" className="flex items-center gap-3 text-[12px] text-muted-foreground hover:text-[#32d583] transition-colors group">
              <span className="w-6 h-6 rounded bg-[#1b211b] border border-white/[0.06] flex items-center justify-center group-hover:border-[#32d583]/20 transition-colors">
                {/* @ts-ignore */}
                <Icon size={11} />
              </span>
              <span className="flex-1">{label as string}</span>
              <span className="">{val as string}</span>
            </a>
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
    <aside className={`flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${collapsed ? "w-14" : "w-52"}`}>
      {/* Logo */}
      <div className={`flex items-center gap-2.5 px-4 py-5 border-b border-white/[0.05] ${collapsed ? "justify-center px-0" : ""}`}>
        <div className="w-7 h-7 rounded-md bg-[#32d583] flex items-center justify-center flex-shrink-0">
          <BookOpen size={14} className="text-[#061006]" />
        </div>
        {!collapsed && <span className="text-[13px]  font-medium text-foreground tracking-tight">research.xyz</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 space-y-0.5 px-2">
        {navItems.map(item => {
          const active = current === item.id || (current === "article" && item.id === "library");
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-[12px] font-medium transition-all ${active ? "bg-[#32d583]/12 text-[#32d583]" : "text-[#8b978e] hover:text-foreground hover:bg-white/[0.04]"} ${collapsed ? "justify-center" : ""}`}>
              <item.icon size={15} className="flex-shrink-0" />
              {!collapsed && item.label}
            </button>
          );
        })}
      </nav>

      {/* Library section */}
      {!collapsed && (
        <div className="px-3 pb-4 border-t border-white/[0.05] pt-3">
          <p className="text-[10px]  text-muted-foreground uppercase tracking-wide px-1 mb-2">Research Themes</p>
          <div className="space-y-0.5">
            {playlists.map(pl => (
              <button key={pl.slug} className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-[11px] text-muted-foreground hover:text-foreground hover:bg-white/[0.03] transition-colors">
                <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: pl.color + "80" }} />
                <span className="truncate">{pl.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

// ─── Right Panel ──────────────────────────────────────────────────────────────

function RightPanel({ onClose }: { onClose: () => void }) {
  return (
    <aside className="w-64 flex-shrink-0 bg-[#0d120d] border-l border-white/[0.05] flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <ListChecks size={13} className="text-[#32d583]" />
          <span className="text-[12px] font-medium text-foreground">Research Queue</span>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors"><X size={13} /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 [&::-webkit-scrollbar]:hidden">
        {/* Next up */}
        <div>
          <p className="text-[10px]  text-muted-foreground uppercase tracking-wide mb-2 px-1">Next Up</p>
          <div className="space-y-1">
            {articles.slice(1, 4).map((a, i) => (
              <div key={a.slug} className="flex items-start gap-2 p-2 rounded hover:bg-[#1b211b] transition-colors cursor-pointer group">
                <span className="text-[10px]  text-muted-foreground w-4 pt-0.5 flex-shrink-0">{i + 1}</span>
                <ResearchCoverArt article={a} compact className="w-8 h-8 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-foreground/80 group-hover:text-foreground line-clamp-2 leading-snug">{a.title.split(":")[0]}</p>
                  <p className="text-[10px]  text-muted-foreground mt-0.5">{a.readTime} min</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Open Questions */}
        <div>
          <p className="text-[10px]  text-muted-foreground uppercase tracking-wide mb-2 px-1">Open Questions</p>
          <div className="space-y-2">
            {openQuestions.map((q, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded bg-[#151915] border border-white/[0.04]">
                <Circle size={8} className="text-[#32d583] mt-1 flex-shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recently saved */}
        <div>
          <p className="text-[10px]  text-muted-foreground uppercase tracking-wide mb-2 px-1">Saved Sources</p>
          <div className="space-y-1">
            {savedSources.map(s => (
              <div key={s} className="flex items-center gap-2 p-2 hover:bg-[#1b211b] rounded cursor-pointer group transition-colors">
                <ExternalLink size={9} className="text-muted-foreground group-hover:text-[#32d583] flex-shrink-0 transition-colors" />
                <span className="text-[11px] text-muted-foreground group-hover:text-foreground truncate transition-colors">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Bottom Bar ───────────────────────────────────────────────────────────────

function NowReadingBar({ article, onOpen }: { article: Article; onOpen: () => void }) {
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(34);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#050705]/95 border-t border-white/[0.08] flex items-center px-4 gap-4 z-50" style={{ backdropFilter: "blur(14px)" }}>
      {/* Article info */}
      <div className="flex items-center gap-3 w-64 min-w-0 flex-shrink-0">
        <ResearchCoverArt article={article} compact className="w-10 h-10 flex-shrink-0" />
        <div className="min-w-0">
          <button onClick={onOpen} className="text-[12px] font-semibold text-foreground hover:text-[#32d583] transition-colors truncate block max-w-[190px] leading-tight">
            {article.title.split(":")[0]}
          </button>
          <p className="text-[10px] text-muted-foreground truncate max-w-[190px]">{article.category}</p>
        </div>
        <Bookmark size={13} className="text-[#32d583] flex-shrink-0 hidden sm:block" />
      </div>

      {/* Controls */}
      <div className="flex-1 flex flex-col items-center gap-1 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <button className="text-muted-foreground hover:text-foreground transition-colors"><SkipBack size={14} /></button>
          <button onClick={() => setPlaying(p => !p)} className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform">
            {playing ? <Pause size={11} className="text-[#061006]" /> : <Play size={11} className="text-[#061006] ml-0.5" />}
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors"><SkipForward size={14} /></button>
        </div>
        <div className="w-full flex items-center gap-2">
          <span className="text-[9px]  text-muted-foreground w-6 text-right">{Math.round(progress * article.readTime / 100)}m</span>
          <div className="group flex-1 h-1 bg-white/10 rounded-full cursor-pointer overflow-hidden" onClick={e => { const r = e.currentTarget.getBoundingClientRect(); const next = Math.round((e.clientX - r.left) / r.width * 100); setProgress(Math.max(0, Math.min(100, next))); }}>
            <div className="h-full bg-[#32d583] rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[9px]  text-muted-foreground w-6">{article.readTime}m</span>
        </div>
      </div>

      {/* Right */}
      <div className="hidden md:flex items-center gap-3 w-52 justify-end flex-shrink-0">
        <div className="flex items-center gap-1 text-[10px]  text-muted-foreground">
          <StatusBadge status={article.status} />
        </div>
        <div className="flex items-center gap-1 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
          <Volume2 size={13} />
          <div className="w-14 h-0.5 bg-white/10 rounded-full">
            <div className="h-full w-2/3 bg-white/30 rounded-full" />
          </div>
        </div>
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

  const handleNavigate = (p: Page) => {
    setPage(p);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden font-['Inter']" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Main layout above bottom bar */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <Sidebar current={page} onNavigate={handleNavigate} collapsed={sidebarCollapsed} />

        {/* Center column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-12 flex-shrink-0 flex items-center gap-3 px-4 border-b border-white/[0.05] bg-[#061006]/80 sticky top-0 z-40" style={{ backdropFilter: "blur(8px)" }}>
            <button onClick={() => setSidebarCollapsed(c => !c)} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-white/[0.04]">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="3" width="13" height="1.5" rx="0.75" fill="currentColor" /><rect x="1" y="7" width="13" height="1.5" rx="0.75" fill="currentColor" /><rect x="1" y="11" width="13" height="1.5" rx="0.75" fill="currentColor" /></svg>
            </button>

            <div className="relative flex-1 max-w-xs">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={globalSearch}
                onChange={e => { setGlobalSearch(e.target.value); if (e.target.value && page !== "library") handleNavigate("library"); }}
                placeholder="Search research..."
                className="w-full h-7 pl-7 pr-3 rounded-md bg-[#1b211b] border border-white/[0.06] text-[12px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[#32d583]/30  transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 ml-auto">
              <button onClick={() => setRightPanelOpen(o => !o)} className={`p-1.5 rounded transition-colors ${rightPanelOpen ? "text-[#32d583] bg-[#32d583]/10" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"}`}>
                <PanelRight size={14} />
              </button>
              <div className="w-6 h-6 rounded-full bg-[#32d583]/20 border border-[#32d583]/30 flex items-center justify-center ml-1">
                <span className="text-[9px] font-medium text-[#32d583]">YK</span>
              </div>
            </div>
          </header>

          {/* Scrollable main content */}
          <main ref={mainRef} className="flex-1 overflow-y-auto pb-20 [&::-webkit-scrollbar]:hidden">
            {page === "home" && <HomePage onArticleClick={handleArticleClick} onNavigate={handleNavigate} />}
            {page === "library" && <LibraryPage onArticleClick={handleArticleClick} />}
            {page === "article" && <ArticlePage article={activeArticle} onBack={() => handleNavigate("library")} />}
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
        {rightPanelOpen && <RightPanel onClose={() => setRightPanelOpen(false)} />}
      </div>

      {/* Bottom Now Reading bar */}
      <NowReadingBar article={activeArticle} onOpen={() => { setPage("article"); mainRef.current?.scrollTo({ top: 0 }); }} />
    </div>
  );
}
