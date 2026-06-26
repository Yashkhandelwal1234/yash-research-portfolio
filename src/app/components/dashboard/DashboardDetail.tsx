import { FileText } from "lucide-react";
import { DASHBOARD_DATA_MODE_BADGE_LABELS, getDashboardDataModeLabel } from "../../content/dashboardSpecs";
import type { BuildStatus, DashboardSpec } from "../../types/content";
import { DashboardBlock } from "./DashboardBlocks";

const statusStyles: Record<BuildStatus, string> = {
  Live: "text-[#1ED760]",
  Building: "text-[#B3B3B3]",
  Planned: "text-[#B3B3B3]",
};

function DataModeLabel({ spec }: { spec: DashboardSpec }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#1ED760]">
      {getDashboardDataModeLabel(spec.dataMode)}
    </p>
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
              {DASHBOARD_DATA_MODE_BADGE_LABELS[spec.dataMode]}
            </span>
          </div>
          <h2 className="text-lg font-semibold leading-tight text-foreground">{spec.title}</h2>
          <p className="mt-1 max-w-2xl text-[13px] leading-6 text-muted-foreground">{spec.subtitle}</p>
          <div className="mt-3">
            <DataModeLabel spec={spec} />
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
        <p className="text-[12px] leading-5 text-foreground/74">{spec.sourceNote}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.15fr_0.85fr]">
        {spec.blocks.map((block, index) => (
          <DashboardBlock key={`${block.type}-${block.title}-${index}`} block={block} />
        ))}
      </div>
    </section>
  );
}
