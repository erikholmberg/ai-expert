import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { EvaluationLayersFunnel } from "@/components/guides/evaluation-layers-funnel";
import { EvaluationMethodsRadar } from "@/components/guides/evaluation-methods-radar";
import { EvaluationSignalLatencyChart } from "@/components/guides/evaluation-signal-latency-chart";

export const metadata: Metadata = {
  title: "Evaluation strategy for AI features — AI Expert",
  description:
    "Layered evaluation maturity, method tradeoffs, and signal versus latency — visual guide for AI product metrics.",
};

export default function EvaluationStrategyGuidePage() {
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
          <span>Evaluation strategy</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Evaluation strategy for AI features
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Shipping AI without an eval strategy means each prompt change becomes a
          judgment call. Strong teams run{" "}
          <strong className="font-semibold text-foreground">
            stacked loops
          </strong>
          : fast automated signals at the bottom, human judgment where stakes are
          high, and live experimentation once guardrails prove out.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Layered evaluation maturity
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Think of layers as insurance policies — cheaper checks run continuously;
          expensive slices fire on cadence or sample rates. Add upper layers only
          when lower layers stop catching regressions you care about.
        </p>
        <EvaluationLayersFunnel />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Human vs LLM judges vs automation
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Human review anchors trust for novel failures; LLM judges scale rubric
          scoring but inherit model biases; automated metrics (exact match,
          embedding similarity, tool-success rates) catch drift cheaply.
          Production teams blend all three with clear escalation rules.
        </p>
        <EvaluationMethodsRadar />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Signal strength vs cycle latency
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          The chart below is schematic: live experiments carry the strongest causal
          signal about user outcomes but take the longest to instrument safely.
          Parallel tracks prevent “flying blind” while experiments ramp.
        </p>
        <EvaluationSignalLatencyChart />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Starter playbook
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            Freeze a{" "}
            <strong className="font-semibold text-foreground">
              golden prompt set
            </strong>{" "}
            representing top failure modes from design research.
          </li>
          <li>
            Pair model upgrades with{" "}
            <strong className="font-semibold text-foreground">
              diff dashboards
            </strong>{" "}
            — judge scores, toxicity hooks, tool-call success.
          </li>
          <li>
            Roll out behind{" "}
            <strong className="font-semibold text-foreground">
              shadow traffic
            </strong>{" "}
            before toggling user-visible defaults; promote only when offline +
            shadow agree.
          </li>
        </ul>
      </section>
    </GuideShell>
  );
}
