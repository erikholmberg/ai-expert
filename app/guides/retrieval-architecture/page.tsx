import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { RetrievalPipelineDiagram } from "@/components/guides/retrieval-pipeline-diagram";
import { RetrievalPatternTable } from "@/components/guides/retrieval-pattern-table";
import { RetrievalComplexityChart } from "@/components/guides/retrieval-complexity-chart";

export const metadata: Metadata = {
  title: "Retrieval architecture cheat sheet — AI Expert",
  description:
    "Chunk-to-answer pipeline, common retrieval patterns, and complexity vs quality tradeoffs for RAG systems.",
};

export default function RetrievalArchitectureGuidePage() {
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
          <span>Retrieval architecture</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Retrieval architecture cheat sheet
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Retrieval quality dominates many RAG launches: if you fetch the wrong
          chunks, the generator confidently rehearses the wrong facts. Use this
          page to align with engineers on{" "}
          <strong className="font-semibold text-foreground">
            pipeline stages
          </strong>
          , pattern upgrades, and when extra complexity pays off.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          End-to-end pipeline (canonical mental model)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Offline indexing runs batch or streaming; online path executes per query.
          Bottlenecks usually appear around chunk boundaries, embedding mismatch,
          and rerank latency — call those out explicitly in PRDs.
        </p>
        <RetrievalPipelineDiagram />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Pattern menu & tradeoffs
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Start simple, measure recall@k and grounded answer rate, then layer
          hybrid search or reranking where queries fail — not before you have a
          labeled failure set.
        </p>
        <RetrievalPatternTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Complexity vs illustrative quality uplift
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Bars encode engineering + ops burden versus expected retrieval lift —
          agentic retrieval breaks this curve when tool loops mis-fire, so budget
          eval harnesses before chasing autonomy.
        </p>
        <RetrievalComplexityChart />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">
          PM checkpoints
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            Define{" "}
            <strong className="font-semibold text-foreground">
              freshness SLAs
            </strong>{" "}
            for corpora that feed customer-visible answers.
          </li>
          <li>
            Instrument{" "}
            <strong className="font-semibold text-foreground">
              citation coverage
            </strong>{" "}
            — percent of answers that reference retrieved passages when policy
            demands it.
          </li>
          <li>
            Pair retrieval upgrades with{" "}
            <strong className="font-semibold text-foreground">
              regression suites
            </strong>{" "}
            so embedding or reranker swaps do not silently regress recall.
          </li>
        </ul>
      </section>
    </GuideShell>
  );
}
