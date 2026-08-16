import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { HallucinationGroundingFlow } from "@/components/guides/hallucination-grounding-flow";
import { GroundingPatternTable } from "@/components/guides/grounding-pattern-table";
import { GroundingTradeoffChart } from "@/components/guides/grounding-tradeoff-chart";

export const metadata: Metadata = {
  title: "Hallucination & grounding playbook — AI Expert",
  description:
    "When to cite, hedge, abstain, or escalate — UX and backend patterns for grounded AI answers.",
};

export default function HallucinationGroundingPage() {
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
          <span>Hallucination & grounding</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Hallucination & grounding playbook
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Confident wrong answers erode trust faster than slow answers. Product teams
          ship resilience by pairing{" "}
          <strong className="font-semibold text-foreground">
            retrieval + citation UX
          </strong>{" "}
          when facts matter,{" "}
          <strong className="font-semibold text-foreground">
            calibrated hedging
          </strong>{" "}
          when evidence is thin, and{" "}
          <strong className="font-semibold text-foreground">
            explicit abstention
          </strong>{" "}
          when stakes exceed model proof.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Response posture flow</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Use with legal/clinical partners — this diagram encodes product judgment,
          not a regulatory framework by itself.
        </p>
        <HallucinationGroundingFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Patterns in practice</h2>
        <GroundingPatternTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Trust vs friction tradeoff</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Strict grounding slows happy-path fluent demos — negotiate personas (support
          vs creative) instead of one-size defaults.
        </p>
        <GroundingTradeoffChart />
      </section>
    </GuideShell>
  );
}
