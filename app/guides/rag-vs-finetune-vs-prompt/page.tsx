import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { RagFinetunePromptFlow } from "@/components/guides/rag-finetune-prompt-flow";
import { ApproachComparisonChart } from "@/components/guides/approach-comparison-chart";

export const metadata: Metadata = {
  title: "RAG vs fine-tuning vs prompt-only — AI Expert",
  description:
    "When to reach for retrieval, supervised updates, or prompt iteration — with a decision flow and comparative tradeoff chart.",
};

export default function RagVsFinetuneVsPromptPage() {
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
          <span>RAG vs fine-tuning vs prompts</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          RAG vs fine-tuning vs prompt-only
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          These three moves solve different failures.{" "}
          <strong className="font-semibold text-foreground">
            Prompting
          </strong>{" "}
          fixes unclear instructions;{" "}
          <strong className="font-semibold text-foreground">RAG</strong> grounds
          answers in documents you control;{" "}
          <strong className="font-semibold text-foreground">
            fine-tuning
          </strong>{" "}
          bakes in style or behavior when you have trustworthy pairs or labels.
          Most shipping systems blend them — the question is sequencing.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Decision flow (conversation starter)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Walk this with your tech lead when users report the model is “wrong.”
          Separate factual drift from tone issues before committing roadmap.
        </p>
        <RagFinetunePromptFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          What each lever is best at
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            <strong className="font-semibold text-foreground">
              Prompt-only
            </strong>{" "}
            — fastest iteration when the base model already can do the task but
            needs clearer specs, examples in context, or guardrail wording.
          </li>
          <li>
            <strong className="font-semibold text-foreground">RAG</strong> —
            answers must cite evolving knowledge (policies, tickets, docs) you
            cannot freeze inside weights; reduces confident hallucination on
            facts if retrieval quality holds.
          </li>
          <li>
            <strong className="font-semibold text-foreground">
              Fine-tuning
            </strong>{" "}
            — stable preferences (format, voice, workflow habits) or specialized
            jargon where demonstrations beat long prompts — requires governance on
            data and regression testing whenever the base model shifts.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Comparative emphasis (illustrative chart)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Bars are directional scores for roadmap conversations — not benchmarks.
          Your stack, latency budget, and eval maturity change the picture.
        </p>
        <ApproachComparisonChart />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">
          Practical combos PMs ship
        </h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            Copilot with docs:{" "}
            <strong className="font-semibold text-foreground">
              RAG + tight prompts
            </strong>{" "}
            first; fine-tune voice once retrieval metrics plateau.
          </li>
          <li>
            Support macros: prompt templates + retrieval from macros KB; fine-tune
            only after ticket taxonomy stabilizes.
          </li>
          <li>
            Internal analyst bot: long-context prompts for scratchpad reasoning,
            RAG for warehouse schemas, periodic FT if analysts approve exemplar
            pairs.
          </li>
        </ul>
      </section>
    </GuideShell>
  );
}
