import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { ObservabilityDebugLoop } from "@/components/guides/observability-debug-loop";
import { ObservabilitySignalsChart } from "@/components/guides/observability-signals-chart";
import { ObservabilityTraceSketch } from "@/components/guides/observability-trace-sketch";

export const metadata: Metadata = {
  title: "Observability for shipped AI — AI Expert",
  description:
    "Debug loops, signal priorities, and trace sketches — what PMs should ask engineering for in production AI.",
};

export default function AiObservabilityPage() {
  return (
    <GuideShell className="space-y-12">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link
            href="/guides"
            className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Guides
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>Observability</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Observability for shipped AI
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Models feel like black boxes until you instrument them like any other
          service:{" "}
          <strong className="font-semibold text-foreground">
            traces that reconstruct a single user turn
          </strong>
          , metrics that fire before users rage-quit, and eval hooks that connect
          regressions to releases.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Incident loop</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          AI incidents stall when teams lack replay — negotiate observability when you
          negotiate SLAs, not after launch.
        </p>
        <ObservabilityDebugLoop />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Signals teams actually use (illustrative)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Replace indices with your stack&apos;s reality — the ranking matters more
          than absolute numbers.
        </p>
        <ObservabilitySignalsChart />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Trace anatomy</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Demand consistent span names across services — otherwise dashboards compare
          apples to oranges across environments.
        </p>
        <ObservabilityTraceSketch />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Questions for kickoff</h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            What identifiers tie analytics events to traces and to model provider
            invoices?
          </li>
          <li>
            Which spans must exist on every request vs optional when tools fire?
          </li>
          <li>
            How do we detect embedding or retrieval regressions independently from LLM
            upgrades?
          </li>
        </ul>
      </section>
    </GuideShell>
  );
}
