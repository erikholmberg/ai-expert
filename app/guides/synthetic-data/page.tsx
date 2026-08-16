import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { SyntheticDataFitGrid } from "@/components/guides/synthetic-data-fit-grid";
import { SyntheticDataPatternTable } from "@/components/guides/synthetic-data-pattern-table";

export const metadata: Metadata = {
  title: "Synthetic data and augmentation — AI Expert",
  description:
    "When synthetic data helps vs. hurts, plus the core patterns — augmentation, LLM-generated, simulation, and privacy-preserving replicas.",
};

export default function SyntheticDataPage() {
  return (
    <GuideShell className="space-y-12">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/guides" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Guides
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>Synthetic data</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Synthetic data and augmentation</h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Real data is expensive, imbalanced, or too sensitive to use directly — synthetic data fills
          gaps, but it&apos;s a tool with real failure modes, not a free lunch.{" "}
          <strong className="font-semibold text-foreground">Match the pattern to the gap</strong>, and
          always{" "}
          <strong className="font-semibold text-foreground">
            audit for privacy leakage and distribution drift
          </strong>{" "}
          before training on synthetic output.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">When synthetic data helps — and when it doesn&apos;t</h2>
        <SyntheticDataFitGrid />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Patterns and tradeoffs</h2>
        <SyntheticDataPatternTable />
      </section>

      <section className="space-y-3 rounded-xl border border-amber-600/20 bg-amber-50 p-4 dark:border-amber-400/20 dark:bg-amber-950/40">
        <h2 className="text-sm font-semibold text-amber-700 dark:text-amber-400">Watch for model collapse</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-foreground">
          Training successive model generations on their own (or each other&apos;s) synthetic output is a
          documented failure mode — quality and diversity degrade over generations as errors compound and
          rare patterns get filtered out. Keep a real-data anchor in every training and eval set, and treat
          &ldquo;100% synthetic&rdquo; pipelines as a research bet, not a default.
        </p>
      </section>
    </GuideShell>
  );
}
