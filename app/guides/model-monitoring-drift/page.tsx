import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { ModelDriftLoopFlow } from "@/components/guides/model-drift-loop-flow";
import { DriftTypeTable } from "@/components/guides/drift-type-table";

export const metadata: Metadata = {
  title: "Post-launch model monitoring and drift — AI Expert",
  description:
    "The detect-diagnose-respond loop for shipped models, plus the four drift types PMs should recognize.",
};

export default function ModelMonitoringDriftPage() {
  return (
    <GuideShell className="space-y-12">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/guides" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Guides
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>Model monitoring & drift</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Post-launch model monitoring and drift</h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Shipping a model is the start of its lifecycle, not the end — the world keeps changing after
          launch, and a model that scored well on day one can degrade silently for months before anyone
          notices. <strong className="font-semibold text-foreground">Instrument drift signals</strong>,{" "}
          <strong className="font-semibold text-foreground">separate data drift from concept drift</strong>,
          and{" "}
          <strong className="font-semibold text-foreground">define who owns the retrain decision</strong>{" "}
          before you need it.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">The monitoring loop</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Treat this as a standing operational loop with a named owner, not a one-time launch task.
        </p>
        <ModelDriftLoopFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Four kinds of drift</h2>
        <DriftTypeTable />
      </section>
    </GuideShell>
  );
}
