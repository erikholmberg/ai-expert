import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { AgentBoundariesFlow } from "@/components/guides/agent-boundaries-flow";
import { AgentRiskCheckpointsTable } from "@/components/guides/agent-risk-checkpoints-table";

export const metadata: Metadata = {
  title: "Agent boundaries & human-in-the-loop — AI Expert",
  description:
    "Risk tiers, approval lanes, and HITL patterns for tool-using agents — governance before model depth.",
};

export default function AgentBoundariesPage() {
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
          <span>Agent boundaries & HITL</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Agent boundaries & human-in-the-loop
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Agents fail loudly when tools do side effects without governance — PMs ship
          confidence by{" "}
          <strong className="font-semibold text-foreground">
            tiering tools by blast radius
          </strong>
          , pairing automation with approvals, and logging decisions reviewers can audit.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Action lanes</h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Model capability matters less than{" "}
          <strong className="font-semibold text-foreground">
            which actions run unattended
          </strong>
          . Align lanes with security + legal — not only ML metrics.
        </p>
        <AgentBoundariesFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Risk tiers → checkpoints
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Adapt tiers to your regulatory posture — use this table to spark RACI-style
          conversations before coding tool routers.
        </p>
        <AgentRiskCheckpointsTable />
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-muted/30 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Operating principles</h2>
        <ul className="max-w-3xl list-disc space-y-2 pl-6 text-[0.95rem] leading-relaxed text-muted-foreground">
          <li>
            Default-deny tool catalogs — promote capabilities through review instead of
            blocking after incidents.
          </li>
          <li>
            Pair agent launches with{" "}
            <strong className="font-semibold text-foreground">
              rollback + replay
            </strong>{" "}
            affordances for support teams.
          </li>
          <li>
            Treat prompts as insufficient guardrails — enforce policy in orchestration
            layers humans can inspect.
          </li>
        </ul>
      </section>
    </GuideShell>
  );
}
