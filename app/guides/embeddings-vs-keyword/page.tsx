import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { EmbeddingSearchDecisionFlow } from "@/components/guides/embedding-search-decision-flow";
import { SearchModeComparisonTable } from "@/components/guides/search-mode-comparison-table";
import { SearchModeSignalChart } from "@/components/guides/search-mode-signal-chart";

export const metadata: Metadata = {
  title: "Embeddings vs keyword vs hybrid search — AI Expert",
  description:
    "When lexical beats semantic, when dense vectors win, and how hybrid retrieval fits messy enterprise corpora.",
};

export default function EmbeddingsVsKeywordPage() {
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
          <span>Embeddings vs keyword vs hybrid</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Embeddings vs keyword vs hybrid
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Retrieval debates aren&apos;t religious wars — they&apos;re{" "}
          <strong className="font-semibold text-foreground">
            mismatch diagnostics
          </strong>
          . Keywords excel when literals matter; embeddings excel when users
          paraphrase; hybrids recover recall when enterprise corpora mix both failure
          modes.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Decision flow</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Walk this when recall tickets spike — isolate lexical misses before tuning
          embedding dimensions or chunk sizes.
        </p>
        <EmbeddingSearchDecisionFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Mode comparison</h2>
        <SearchModeComparisonTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Fit by query shape (illustrative chart)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Replace illustrative scores with offline evals on your labeled query sets —
          the ranking order matters more than absolute numbers.
        </p>
        <SearchModeSignalChart />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Shipping notes</h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            Start from{" "}
            <strong className="font-semibold text-foreground">
              failure buckets
            </strong>{" "}
            (keyword miss vs semantic drift) before buying GPU-heavy rerankers.
          </li>
          <li>
            Hybrid fusion weights belong in experimentation — log retrieval provenance
            so PMs can audit misses with engineers.
          </li>
        </ul>
      </section>
    </GuideShell>
  );
}
