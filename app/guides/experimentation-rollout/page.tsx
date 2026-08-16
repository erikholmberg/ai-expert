import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { RolloutLadderFlow } from "@/components/guides/rollout-ladder-flow";
import { RolloutStageTable } from "@/components/guides/rollout-stage-table";
import { RolloutLearningChart } from "@/components/guides/rollout-learning-chart";

export const metadata: Metadata = {
  title: "Experimentation & rollout — AI Expert",
  description:
    "Shadow, canary, and A/B ladders for shipping AI changes with rollback discipline.",
};

export default function ExperimentationRolloutPage() {
  return (
    <GuideShell className="space-y-12">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/guides" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Guides
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>Experimentation & rollout</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Experimentation & rollout</h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Model and prompt changes behave like releases — you need{" "}
          <strong className="font-semibold text-foreground">progressive exposure</strong>,{" "}
          <strong className="font-semibold text-foreground">guardrail metrics</strong>, and a{" "}
          <strong className="font-semibold text-foreground">kill switch</strong> more than a
          single launch-day blog post. This guide frames the ladder PMs negotiate with Eng.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Rollout ladder</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Names vary by company — align vocabulary with your feature-flag tool and incident response runbooks.
        </p>
        <RolloutLadderFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Signals & exit criteria</h2>
        <RolloutStageTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Learning vs risk</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Indices are directional — replace with your governance thresholds before exec reviews.
        </p>
        <RolloutLearningChart />
      </section>
    </GuideShell>
  );
}
