import type { Metadata } from "next";
import Link from "next/link";
import {
  GuideShell,
  ModelComparisonTable,
  ScenarioPriorityGrid,
  LatencyCapabilityQuadrant,
} from "@/components/guides";

export const metadata: Metadata = {
  title: "Model selection attributes — AI Expert",
  description:
    "How to choose an LLM using context length, latency, throughput, cost, capabilities, and compliance — with scenarios and archetypes.",
};

export default function ModelSelectionGuidePage() {
  return (
    <GuideShell className="space-y-12">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/guides" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Guides
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>Model selection</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Model selection attributes
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Product-facing AI is mostly{" "}
          <strong className="font-semibold text-foreground">
            choosing under constraints
          </strong>
          : user latency expectations, budget, how much text fits in one
          request, and whether you need tools or vision. Provider catalogs throw
          dozens of knobs at you — here&apos;s what actually maps to decisions.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Why these attributes matter
        </h2>
        <div className="max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            Every attribute below shows up on invoices, SLAs, or UX research.
            None of them alone tells you &quot;the best model&quot; — but together
            they rule out bad fits fast (e.g., huge context with no budget for
            output tokens, or ultra-low latency with complex reasoning).
          </p>
          <p>
            Think in{" "}
            <strong className="font-semibold text-foreground">archetypes</strong>{" "}
            (fast edge class vs balanced flagship vs frontier reasoning)
            rather than chasing weekly leaderboard rankings — SKUs and prices
            change; the tradeoffs stay familiar.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Context window
        </h2>
        <div className="max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            The{" "}
            <strong className="font-semibold text-foreground">
              context window
            </strong>{" "}
            is how many tokens can participate in one forward pass: your prompt,
            retrieved documents, tool outputs, and the answer so far. If the
            combined stack doesn&apos;t fit, you truncate, summarize, or switch
            to workflows that chunk work across calls.
          </p>
          <p>
            <strong className="font-semibold text-foreground">
              Long-context SKUs
            </strong>{" "}
            help when you truly need everything in one shot (large specs,
            depositions, multi-file repo context). For steady chat, practical
            limits are often workflow design — memory policies and retrieval —
            not raw token count alone.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Latency vs throughput
        </h2>
        <div className="max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            <strong className="font-semibold text-foreground">Latency</strong>{" "}
            is usually experienced as{" "}
            <strong className="font-semibold text-foreground">
              time to first token (TTFT)
            </strong>{" "}
            for streaming UIs — users notice stalls before they evaluate answer
            quality.
          </p>
          <p>
            <strong className="font-semibold text-foreground">
              Throughput
            </strong>{" "}
            is sustained tokens per second once generation is underway. It
            matters for long completions, batch jobs, and cost-controlled
            pipelines where wall-clock time dominates.
          </p>
          <p>
            Interactive assistants optimize TTFT; offline summarization may care
            more about total time at high throughput and stable batch pricing.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Cost: input, output, cache, and extras
        </h2>
        <div className="max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            Most catalogs quote{" "}
            <strong className="font-semibold text-foreground">
              price per million tokens
            </strong>{" "}
            separately for{" "}
            <strong className="font-semibold text-foreground">input</strong> and{" "}
            <strong className="font-semibold text-foreground">output</strong>.
            Output is often several times input — agent loops that repeatedly
            emit long completions add up fast.
          </p>
          <p>
            <strong className="font-semibold text-foreground">
              Prompt caching
            </strong>{" "}
            can bill cheaper &quot;cache read&quot; vs full input when large
            prefixes repeat (system prompts, RAG corpora). Evaluate whether your
            workload repeats stable prefixes enough to benefit.
          </p>
          <p>
            Line items like{" "}
            <strong className="font-semibold text-foreground">
              web search or hosted tools
            </strong>{" "}
            may be priced per call or per 1k operations — treat them as separate
            capacity planning from raw tokens.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Illustrative archetypes (not live prices)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          The table below uses{" "}
          <strong className="font-semibold text-foreground">
            invented bands
          </strong>{" "}
          so you can read provider dashboards — numbers shift by vendor and date.
          Always verify current SKUs before forecasting budget.
        </p>
        <ModelComparisonTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Capabilities and modalities
        </h2>
        <div className="max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            Check whether you need{" "}
            <strong className="font-semibold text-foreground">
              vision, structured outputs (JSON), tool/function calling
            </strong>
            , or particular languages. A cheaper text-only path fails if your
            product screenshot flows require multimodal understanding.
          </p>
          <p>
            Capability tiers often correlate with price and latency — align SKU
            choice to the smallest modal surface that actually ships.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Trust, compliance, and data handling
        </h2>
        <div className="max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            Procurement asks about{" "}
            <strong className="font-semibold text-foreground">
              zero data retention (ZDR)
            </strong>
            , training opt-outs, regions, and subprocessors — attributes that
            rarely appear on latency charts but gate deployment for regulated
            teams.
          </p>
          <p>
            Treat compliance labels like any other requirement: if you need a
            specific regime, narrow the provider shortlist before optimizing
            tokens per dollar.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Scenario priorities
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Rank what matters for{" "}
          <strong className="font-semibold text-foreground">
            this product
          </strong>{" "}
          moment — then match to an archetype. &quot;High&quot; means that column
          dominates SKU discussion for that row.
        </p>
        <ScenarioPriorityGrid />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Latency vs capability (mental map)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Real APIs don&apos;t sit in neat quadrants — but teams argue less when
          they agree where they&apos;re trying to land on this map before debating
          vendor names.
        </p>
        <LatencyCapabilityQuadrant />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Putting it together
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            Start from{" "}
            <strong className="font-semibold text-foreground">
              workflow + SLA
            </strong>{" "}
            (streaming UX vs batch; fits-in-context vs must retrieve).
          </li>
          <li>
            Estimate{" "}
            <strong className="font-semibold text-foreground">
              input/output mix
            </strong>{" "}
            — agents and long answers skew cost toward output tokens.
          </li>
          <li>
            Apply{" "}
            <strong className="font-semibold text-foreground">
              compliance filters
            </strong>{" "}
            before optimizing price — otherwise you benchmark models you can&apos;t
            ship.
          </li>
          <li>
            Pick an{" "}
            <strong className="font-semibold text-foreground">archetype</strong>,
            run a short bake-off on real prompts, then revisit — catalogs churn;
            your scenarios shouldn&apos;t.
          </li>
        </ul>
      </section>
    </GuideShell>
  );
}
