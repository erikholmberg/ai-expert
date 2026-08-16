import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { GovernanceLifecycleFlow } from "@/components/guides/governance-lifecycle-flow";
import { GovernanceChecklistTable } from "@/components/guides/governance-checklist-table";
import { GovernanceReadinessChart } from "@/components/guides/governance-readiness-chart";

export const metadata: Metadata = {
  title: "AI governance & data lifecycle — AI Expert",
  description:
    "Collection through retention, subprocessors, and what enterprise procurement asks — PM-facing framing.",
};

export default function AiGovernanceLifecyclePage() {
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
          <span>AI governance &amp; data lifecycle</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          AI governance &amp; data lifecycle
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Security basics cover threats; governance covers{" "}
          <strong className="font-semibold text-foreground">how data moves</strong>,{" "}
          <strong className="font-semibold text-foreground">how long it lives</strong>, and{" "}
          <strong className="font-semibold text-foreground">who answers for vendors</strong>. Product
          owns crisp flows — legal stamps controls — before deals stall on questionnaire number
          fourteen.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Lifecycle map</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Use with privacy counsel — not a substitute for jurisdictional analysis.
        </p>
        <GovernanceLifecycleFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Artifacts that unblock reviews</h2>
        <GovernanceChecklistTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Enterprise vs SMB emphasis</h2>
        <GovernanceReadinessChart />
      </section>
    </GuideShell>
  );
}
