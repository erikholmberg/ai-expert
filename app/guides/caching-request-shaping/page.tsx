import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { CacheStackDiagram } from "@/components/guides/cache-stack-diagram";
import { CacheStrategyTable } from "@/components/guides/cache-strategy-table";
import { CacheTtftChart } from "@/components/guides/cache-ttft-chart";

export const metadata: Metadata = {
  title: "Caching & request shaping — AI Expert",
  description:
    "Semantic cache, prompt cache, dedup, and batching — cutting TTFT and token COGS without fooling users.",
};

export default function CachingRequestShapingPage() {
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
          <span>Caching & request shaping</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Caching & request shaping for COGS
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Pricing fights start after launch. The fastest margin wins usually combine{" "}
          <strong className="font-semibold text-foreground">hit-rate instrumentation</strong>,{" "}
          <strong className="font-semibold text-foreground">cache keys that respect privacy</strong>
          , and <strong className="font-semibold text-foreground">smaller prompts</strong> before
          swapping model tiers — see also pricing & unit economics and model selection.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Stack mental model</h2>
        <CacheStackDiagram />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Tactics & failure modes</h2>
        <CacheStrategyTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Latency vs spend trajectory</h2>
        <CacheTtftChart />
      </section>
    </GuideShell>
  );
}
