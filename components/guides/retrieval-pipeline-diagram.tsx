import { cn } from "@/lib/utils";
import { dashboardIconWell, type DashboardAccent } from "./dashboard-palette";

const STEPS = [
  "Ingest",
  "Chunk",
  "Embed",
  "Index",
  "Query",
  "Retrieve",
  "Rerank",
  "Assemble",
  "Generate",
] as const;

const ACCENT_CYCLE: DashboardAccent[] = [
  "blue",
  "amber",
  "purple",
  "emerald",
];

export function RetrievalPipelineDiagram() {
  return (
    <figure className="overflow-x-auto rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <div className="flex min-w-[640px] items-center gap-1 py-2 md:min-w-0 md:flex-wrap md:justify-center">
        {STEPS.map((label, i) => {
          const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length]!;
          return (
          <div key={label} className="flex items-center">
            <div
              className={cn(
                "rounded-lg border border-black/5 px-2.5 py-2 text-center shadow-sm ring-1 ring-inset ring-black/[0.04] dark:border-white/10 dark:ring-white/[0.06]",
                dashboardIconWell[accent].well
              )}
            >
              <span
                className={cn(
                  "text-[11px] font-semibold md:text-xs",
                  dashboardIconWell[accent].icon
                )}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                className="mx-0.5 text-muted-foreground md:mx-1"
                aria-hidden
              >
                →
              </span>
            )}
          </div>
          );
        })}
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        Offline path through dashed boundary (often batched); query path runs at
        request time — rerank and assembly are common upgrade points.
      </figcaption>
    </figure>
  );
}
