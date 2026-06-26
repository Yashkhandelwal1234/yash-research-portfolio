import { AlertCircle, CheckSquare, ExternalLink } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChecklistLevel, DashboardContentBlock } from "../../types/content";

const riskStyles: Record<ChecklistLevel, string> = {
  green: "text-[#1ED760]",
  amber: "text-[#facc15]",
  red: "text-[#fb7185]",
};

function formatUsd(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2).replace(/\.00$/, "")}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(2).replace(/\.00$/, "")}K`;
  return `$${value.toLocaleString("en-US")}`;
}

function StaticBadge() {
  return (
    <span className="rounded-sm bg-[#1ED760]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1ED760]">
      Static data
    </span>
  );
}

function SectionHeader({ title, showStaticBadge = false }: { title: string; showStaticBadge?: boolean }) {
  return (
    <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {showStaticBadge && <StaticBadge />}
    </div>
  );
}

function MetricGridBlock({ block }: { block: Extract<DashboardContentBlock, { type: "metric-grid" }> }) {
  const singleMetric = block.metrics.length === 1 ? block.metrics[0] : undefined;

  return (
    <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
      <SectionHeader title={block.title} showStaticBadge={block.showStaticBadge} />
      {singleMetric ? (
        <div className="rounded-md border border-[#1ED760]/20 bg-[#1ED760]/[0.06] p-4">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{singleMetric.label}</p>
          <p className="mt-1 text-3xl font-semibold text-[#1ED760]">{singleMetric.value}</p>
          <p className="mt-2 text-[12px] leading-5 text-foreground/74">{singleMetric.context}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
          {block.metrics.map(metric => (
            <div key={metric.label} className="rounded-md border border-white/[0.07] bg-[#181818] p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{metric.label}</p>
              <p className="mt-1 text-lg font-semibold text-foreground">{metric.value}</p>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{metric.context}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function RateTableBlock({ block }: { block: Extract<DashboardContentBlock, { type: "rate-table" }> }) {
  return (
    <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
      <SectionHeader title={block.title} showStaticBadge={block.showStaticBadge} />
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {block.rows.map(rate => (
          <div key={rate.label} className="rounded-md border border-white/[0.07] bg-[#181818] p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{rate.label}</p>
                <p className="mt-1 text-xl font-semibold text-foreground">{rate.value}</p>
              </div>
              {rate.includesIncentives && (
                <span className="rounded-sm bg-[#facc15]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#facc15]">
                  Incentives
                </span>
              )}
            </div>
            <p className="mt-2 text-[11px] font-medium text-[#1ED760]">{rate.yieldType}</p>
            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{rate.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AllocationTableBlock({ block }: { block: Extract<DashboardContentBlock, { type: "allocation-table" }> }) {
  return (
    <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
      <SectionHeader title={block.title} showStaticBadge={block.showStaticBadge} />
      <div className="space-y-2">
        {block.rows.map(row => (
          <div key={row.venue} className="rounded-md border border-white/[0.07] bg-[#181818] p-3">
            <div className="mb-2 flex items-center justify-between gap-3 text-[12px]">
              <span className="font-medium text-foreground">{row.venue}</span>
              <span className="text-muted-foreground">{row.approximateCapital}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#535353]">
              <div className="h-full rounded-full bg-[#1ED760]" style={{ width: row.share }} />
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
              <span>{row.share}</span>
              {row.note && <span>{row.note}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrendChartBlock({ block }: { block: Extract<DashboardContentBlock, { type: "trend-chart" }> }) {
  return (
    <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
      <SectionHeader title={block.title} showStaticBadge={block.showStaticBadge} />
      <div className="h-52 rounded-md border border-white/[0.07] bg-[#181818] p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={block.points} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1ED760" stopOpacity={0.32} />
                <stop offset="95%" stopColor="#1ED760" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis dataKey="period" tick={{ fill: "#B3B3B3", fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={formatUsd} tick={{ fill: "#B3B3B3", fontSize: 10 }} axisLine={false} tickLine={false} width={48} />
            <Tooltip
              contentStyle={{ backgroundColor: "#181818", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 6, color: "#FFFFFF" }}
              labelStyle={{ color: "#FFFFFF", fontSize: 12 }}
              formatter={(value) => [formatUsd(Number(value)), "Earnings"]}
            />
            <Area type="monotone" dataKey="earningsUsd" stroke="#1ED760" fill="url(#earningsGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1 sm:grid-cols-5">
        {block.points.map(point => (
          <div key={point.period} className="rounded bg-[#181818] px-2 py-1.5 text-[11px]">
            <p className="text-muted-foreground">{point.period}</p>
            <p className="font-medium text-[#1ED760]">{point.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function NoteBlock({ block }: { block: Extract<DashboardContentBlock, { type: "note" }> }) {
  const toneClass = block.tone === "warning" ? "border-[#facc15]/20 bg-[#facc15]/[0.05]" : "border-white/[0.07] bg-[#181818]";

  return (
    <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
      <SectionHeader title={block.title} />
      <p className={`rounded-md border p-3 text-[12px] leading-6 text-foreground/74 ${toneClass}`}>
        {block.text}
      </p>
    </section>
  );
}

function RiskChecklistBlock({ block }: { block: Extract<DashboardContentBlock, { type: "risk-checklist" }> }) {
  return (
    <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
      <SectionHeader title={block.title} showStaticBadge={block.showStaticBadge} />
      <div className="space-y-2">
        {block.items.map(item => (
          <div key={item.label} className="flex gap-3 rounded-md border border-white/[0.07] bg-[#181818] p-3">
            <span className={`mt-0.5 flex-shrink-0 ${riskStyles[item.level]}`}>
              {item.level === "green" ? <CheckSquare size={14} /> : <AlertCircle size={14} />}
            </span>
            <div>
              <p className="text-[12px] font-medium text-foreground">{item.label}</p>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SourceListBlock({ block }: { block: Extract<DashboardContentBlock, { type: "source-list" }> }) {
  return (
    <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
      <SectionHeader title={block.title} />
      <div className="space-y-2">
        {block.sources.map(source => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-md border border-white/[0.07] bg-[#181818] p-3 transition-colors hover:border-white/[0.15] hover:bg-[#282828]"
          >
            <span className="flex items-center gap-2 text-[12px] font-medium text-foreground">
              <ExternalLink size={12} className="text-[#1ED760]" /> {source.label}
            </span>
            <span className="mt-1 block text-[11px] leading-5 text-muted-foreground">{source.note}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function FutureDataSourcesBlock({ block }: { block: Extract<DashboardContentBlock, { type: "future-data-sources" }> }) {
  return (
    <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
      <SectionHeader title={block.title} />
      <div className="space-y-1.5">
        {block.items.map(source => (
          <p key={source} className="rounded-md border border-white/[0.07] bg-[#181818] px-3 py-2 text-[11px] text-muted-foreground">
            {source}
          </p>
        ))}
      </div>
    </section>
  );
}

export function DashboardBlock({ block }: { block: DashboardContentBlock }) {
  switch (block.type) {
    case "metric-grid":
      return <MetricGridBlock block={block} />;
    case "rate-table":
      return <RateTableBlock block={block} />;
    case "allocation-table":
      return <AllocationTableBlock block={block} />;
    case "trend-chart":
      return <TrendChartBlock block={block} />;
    case "note":
      return <NoteBlock block={block} />;
    case "risk-checklist":
      return <RiskChecklistBlock block={block} />;
    case "source-list":
      return <SourceListBlock block={block} />;
    case "future-data-sources":
      return <FutureDataSourcesBlock block={block} />;
  }
}
