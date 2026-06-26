import { AlertCircle, CheckSquare, ExternalLink, FileText } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { STATIC_MANUAL_DASHBOARD_LABEL } from "../../content/dashboardSpecs";
import type { BuildStatus, ChecklistLevel, DashboardSpec } from "../../types/content";

const statusStyles: Record<BuildStatus, string> = {
  Live: "text-[#1ED760]",
  Building: "text-[#B3B3B3]",
  Planned: "text-[#B3B3B3]",
};

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

function StaticDataLabel() {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1ED760]">
      {STATIC_MANUAL_DASHBOARD_LABEL}
    </p>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <StaticDataLabel />
    </div>
  );
}

function StatusPill({ status }: { status: BuildStatus }) {
  return (
    <span className={`inline-flex items-center rounded-sm bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] ${statusStyles[status]}`}>
      {status}
    </span>
  );
}

export default function DashboardDetail({ spec, onArticleClick }: { spec: DashboardSpec; onArticleClick?: () => void }) {
  return (
    <section className="mt-5 rounded-lg border border-white/[0.07] bg-[#181818] p-4 sm:p-5">
      <div className="mb-5 flex flex-col gap-4 border-b border-white/[0.07] pb-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <StatusPill status={spec.status} />
            <span className="rounded-sm bg-[#1ED760]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#1ED760]">
              {spec.dataMode}
            </span>
          </div>
          <h2 className="text-lg font-semibold leading-tight text-foreground">{spec.title}</h2>
          <p className="mt-1 max-w-2xl text-[13px] leading-6 text-muted-foreground">{spec.subtitle}</p>
          <div className="mt-3">
            <StaticDataLabel />
          </div>
        </div>
        <div className="grid min-w-[220px] gap-2 rounded-md border border-white/[0.07] bg-[#121212] p-3 text-[11px] text-muted-foreground">
          <div className="flex items-center justify-between gap-3">
            <span>Snapshot</span>
            <span className="text-foreground/80">{spec.snapshotDate}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Last updated</span>
            <span className="text-foreground/80">{spec.lastUpdated}</span>
          </div>
          {onArticleClick && (
            <button
              onClick={onArticleClick}
              className="mt-1 flex items-center justify-center gap-1 rounded border border-white/[0.07] px-2 py-1.5 text-[11px] text-[#B3B3B3] transition-colors hover:border-white/[0.15] hover:text-[#FFFFFF]"
            >
              <FileText size={11} /> Open memo
            </button>
          )}
        </div>
      </div>

      <div className="mb-5 rounded-md border border-[#1ED760]/20 bg-[#1ED760]/[0.06] p-3">
        <StaticDataLabel />
        <p className="mt-1 text-[12px] leading-5 text-foreground/74">{spec.sourceNote}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
          <SectionHeader title="Headline Metrics" />
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
            {spec.headlineMetrics.map(metric => (
              <div key={metric.label} className="rounded-md border border-white/[0.07] bg-[#181818] p-3">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{metric.value}</p>
                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{metric.context}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
          <SectionHeader title="Base sUSDD Yield" />
          <div className="rounded-md border border-[#1ED760]/20 bg-[#1ED760]/[0.06] p-4">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{spec.baseYield.label}</p>
            <p className="mt-1 text-3xl font-semibold text-[#1ED760]">{spec.baseYield.value}</p>
            <p className="mt-2 text-[12px] leading-5 text-foreground/74">{spec.baseYield.context}</p>
          </div>
        </section>

        <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
          <SectionHeader title="Pendle PT / YT / LP Rates" />
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            {spec.pendleRates.map(rate => (
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

        <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
          <SectionHeader title="Smart Allocator Allocation" />
          <div className="space-y-2">
            {spec.smartAllocatorAllocation.map(row => (
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

        <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
          <SectionHeader title="Quarterly Earnings Trend" />
          <div className="h-52 rounded-md border border-white/[0.07] bg-[#181818] p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spec.quarterlyEarningsTrend} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
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
            {spec.quarterlyEarningsTrend.map(point => (
              <div key={point.period} className="rounded bg-[#181818] px-2 py-1.5 text-[11px]">
                <p className="text-muted-foreground">{point.period}</p>
                <p className="font-medium text-[#1ED760]">{point.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
          <SectionHeader title="Incentive vs Organic Yield" />
          <p className="rounded-md border border-white/[0.07] bg-[#181818] p-3 text-[12px] leading-6 text-foreground/74">
            {spec.incentiveOrganicNote}
          </p>
        </section>

        <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
          <SectionHeader title="Risk Checklist" />
          <div className="space-y-2">
            {spec.riskChecklist.map(item => (
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

        <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
          <SectionHeader title="Source Links" />
          <div className="space-y-2">
            {spec.sourceLinks.map(source => (
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

        <section className="rounded-lg border border-white/[0.07] bg-[#121212] p-4">
          <SectionHeader title="Future Data Sources" />
          <div className="space-y-1.5">
            {spec.futureDataSources.map(source => (
              <p key={source} className="rounded-md border border-white/[0.07] bg-[#181818] px-3 py-2 text-[11px] text-muted-foreground">
                {source}
              </p>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
