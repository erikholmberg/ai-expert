import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { MlTeamHandoffFlow } from "@/components/guides/ml-team-handoff-flow";
import { MlCollaborationFrictionTable } from "@/components/guides/ml-collaboration-friction-table";

export const metadata: Metadata = {
  title: "Working with ML and data science teams — AI Expert",
  description:
    "Ownership handoffs across the AI build lifecycle, and where PM/ML collaboration typically breaks down.",
};

export default function AiTeamCollaborationPage() {
  return (
    <GuideShell className="space-y-12">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/guides" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
            Guides
          </Link>
          <span className="mx-2 text-border">/</span>
          <span>Working with ML teams</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Working with ML and data science teams</h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          AI product work runs through a different partner than typical engineering collaboration —
          model iteration is empirical, timelines are probabilistic, and “done” is a moving target.{" "}
          <strong className="font-semibold text-foreground">Shared vocabulary</strong>,{" "}
          <strong className="font-semibold text-foreground">early alignment on evaluation</strong>, and{" "}
          <strong className="font-semibold text-foreground">explicit ownership handoffs</strong> keep
          the partnership from breaking down.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Ownership across the build lifecycle</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Roles vary by org size — a startup may compress several of these into one person, but the phases
          and the question of who signs off on each one don&apos;t go away.
        </p>
        <MlTeamHandoffFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Where the partnership breaks down</h2>
        <MlCollaborationFrictionTable />
      </section>
    </GuideShell>
  );
}
