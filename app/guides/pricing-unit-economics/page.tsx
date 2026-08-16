import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { UnitEconomicsBreakdownChart } from "@/components/guides/unit-economics-breakdown-chart";
import { MarginSensitivityChart } from "@/components/guides/margin-sensitivity-chart";

export const metadata: Metadata = {
  title: "AI pricing & unit economics — AI Expert",
  description:
    "Token COGS, tool surcharges, cache effects, and margin sensitivity — visual primer for AI product finance conversations.",
};

export default function PricingUnitEconomicsPage() {
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
          <span>Pricing & unit economics</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          AI pricing & unit economics
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          AI features fail commercially when teams surprise finance after launch.
          Ground conversations in{" "}
          <strong className="font-semibold text-foreground">
            token skew (output ≫ input)
          </strong>
          , tool-line items, and how caching changes marginal cost — then pair with
          packaging experiments instead of hoping gross margin holds.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Cost drivers</h2>
        <div className="max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            Most bills enumerate{" "}
            <strong className="font-semibold text-foreground">
              input vs output tokens
            </strong>{" "}
            separately — agents and verbose completions concentrate spend on output.
            Hosted retrieval, web search, or bespoke tools often bill per call —
            treat them as first-class COGS lines, not “misc infra.”
          </p>
          <p>
            <strong className="font-semibold text-foreground">
              Prompt caching
            </strong>{" "}
            lowers marginal input cost when stable prefixes repeat (system prompts,
            large RAG dumps). Model its adoption honestly — not every workload repeats
            enough to benefit.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Illustrative COGS stack
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Percentages shift by product shape — use your vendor invoices to replace
          fiction with quarterly refresh charts for exec reviews.
        </p>
        <UnitEconomicsBreakdownChart />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Margin sensitivity (schematic)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Small UX choices that lengthen outputs or invoke tools move margin faster
          than headline subscription price debates — scenario-plan before committing
          roadmap.
        </p>
        <MarginSensitivityChart />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">PM checklist</h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            Publish an internal{" "}
            <strong className="font-semibold text-foreground">
              “cost per successful task”
            </strong>{" "}
            definition aligned with analytics — not raw tokens alone.
          </li>
          <li>
            Tie roadmap bets (longer answers, bigger context, more tools) to{" "}
            <strong className="font-semibold text-foreground">
              margin bands
            </strong>{" "}
            before engineering commits.
          </li>
          <li>
            Instrument downgrade paths — cheaper models or shorter defaults when
            sessions exceed COGS targets.
          </li>
        </ul>
      </section>
    </GuideShell>
  );
}
