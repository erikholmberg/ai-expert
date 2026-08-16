import { cn } from "@/lib/utils";
import { dashboardIconWell, type DashboardAccent } from "./dashboard-palette";

const STEPS = [
  { phase: "Observe", detail: "metrics + logs" },
  { phase: "Detect", detail: "drift alert fires" },
  { phase: "Diagnose", detail: "data vs concept vs pipeline" },
  { phase: "Respond", detail: "retrain, rules, or rollback" },
  { phase: "Redeploy", detail: "re-baseline metrics" },
] as const;

const ACCENT_CYCLE: DashboardAccent[] = ["blue", "amber", "purple", "emerald"];

export function ModelDriftLoopFlow() {
  return (
    <figure className="overflow-x-auto rounded-xl border border-border bg-muted/20 p-4 shadow-sm">
      <div className="flex min-w-[680px] items-stretch gap-1 py-2 md:min-w-0 md:flex-wrap md:justify-center">
        {STEPS.map((step, i) => {
          const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length]!;
          return (
            <div key={step.phase} className="flex items-center">
              <div
                className={cn(
                  "flex w-[7.5rem] flex-col items-center justify-center gap-1 rounded-lg border border-black/5 px-2.5 py-2.5 text-center shadow-sm ring-1 ring-inset ring-black/[0.04] dark:border-white/10 dark:ring-white/[0.06]",
                  dashboardIconWell[accent].well
                )}
              >
                <span className={cn("text-[11px] leading-snug font-semibold", dashboardIconWell[accent].icon)}>
                  {step.phase}
                </span>
                <span className="text-[10px] leading-snug text-muted-foreground">{step.detail}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="mx-0.5 text-muted-foreground md:mx-1" aria-hidden>
                  →
                </span>
              )}
            </div>
          );
        })}
        <span className="mx-1 shrink-0 text-muted-foreground" aria-hidden>
          ↻
        </span>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted-foreground">
        The loop never ends — redeploy feeds back into observe with a new baseline, not a finish line.
      </figcaption>
    </figure>
  );
}
