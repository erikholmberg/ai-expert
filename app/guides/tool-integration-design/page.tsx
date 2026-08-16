import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { ToolIntegrationFlow } from "@/components/guides/tool-integration-flow";
import { ToolSchemaChecklistTable } from "@/components/guides/tool-schema-checklist-table";
import { ToolReliabilityChart } from "@/components/guides/tool-reliability-chart";

export const metadata: Metadata = {
  title: "Tool & integration design — AI Expert",
  description:
    "Schemas, error normalization, idempotency, and timeouts — making LLM tools boringly reliable.",
};

export default function ToolIntegrationDesignPage() {
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
          <span>Tool & integration design</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Tool & integration design for LLMs
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Agents fail loudly when integrations behave like one-off scripts. Treat tool calls as{" "}
          <strong className="font-semibold text-foreground">API contracts</strong>: validate
          arguments, execute with budgets, and translate failures into responses models can reason
          about — instead of raw stack traces destined for confused users.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Call lifecycle</h2>
        <ToolIntegrationFlow />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Schema & ops checklist</h2>
        <ToolSchemaChecklistTable />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Reliability compounding</h2>
        <ToolReliabilityChart />
      </section>
    </GuideShell>
  );
}
