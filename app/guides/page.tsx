import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Beaker,
  BookMarked,
  Bot,
  Building2,
  CircleDollarSign,
  Database,
  Gauge,
  GitBranch,
  LineChart,
  Lock,
  MessageSquareText,
  Network,
  Percent,
  Plug,
  Scale,
  Search,
  Shuffle,
  SlidersHorizontal,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GuideShell } from "@/components/guides/guide-shell";
import {
  dashboardIconWell,
  type DashboardAccent,
} from "@/components/guides/dashboard-palette";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Guides — AI Expert",
  description:
    "Visual-first guides on AI product concepts — starting with how to choose LLMs by context, latency, cost, and more.",
};

const GUIDES: {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: DashboardAccent;
}[] = [
  {
    href: "/guides/model-selection",
    title: "Model selection attributes",
    description:
      "Context, latency, throughput, pricing signals, capabilities, and compliance — with scenarios and archetypes.",
    icon: SlidersHorizontal,
    accent: "blue",
  },
  {
    href: "/guides/prompt-policy-design",
    title: "Prompt & policy design",
    description:
      "Instruction precedence, output contracts, and when strict schemas beat prose for shipped AI.",
    icon: MessageSquareText,
    accent: "purple",
  },
  {
    href: "/guides/rag-vs-finetune-vs-prompt",
    title: "RAG vs fine-tuning vs prompt-only",
    description:
      "Decision flow for factual grounding vs behavior tuning, plus comparative tradeoff charts.",
    icon: GitBranch,
    accent: "amber",
  },
  {
    href: "/guides/retrieval-architecture",
    title: "Retrieval architecture cheat sheet",
    description:
      "Chunk-to-answer pipeline, retrieval patterns, and complexity vs quality visuals.",
    icon: Network,
    accent: "purple",
  },
  {
    href: "/guides/evaluation-strategy",
    title: "Evaluation strategy for AI features",
    description:
      "Layered eval maturity, judge vs automation radar, and signal vs latency curves.",
    icon: LineChart,
    accent: "emerald",
  },
  {
    href: "/guides/pricing-unit-economics",
    title: "AI pricing & unit economics",
    description:
      "Token COGS stacks, margin sensitivity, and finance checkpoints for AI features.",
    icon: CircleDollarSign,
    accent: "blue",
  },
  {
    href: "/guides/caching-request-shaping",
    title: "Caching & request shaping",
    description:
      "Semantic and prompt cache tiers, dedup, batching — TTFT and COGS levers with trust caveats.",
    icon: Database,
    accent: "amber",
  },
  {
    href: "/guides/embeddings-vs-keyword",
    title: "Embeddings vs keyword vs hybrid",
    description:
      "Lexical vs semantic retrieval, decision flow, and fit-by-query-shape charts.",
    icon: Search,
    accent: "amber",
  },
  {
    href: "/guides/latency-streaming-ux",
    title: "Latency budget & streaming UX",
    description:
      "TTFT timeline, streaming cadence, and UX tactics for perceived responsiveness.",
    icon: Zap,
    accent: "purple",
  },
  {
    href: "/guides/agent-boundaries",
    title: "Agent boundaries & human-in-the-loop",
    description:
      "Risk tiers, approval lanes, and HITL patterns for tool-using agents.",
    icon: Bot,
    accent: "emerald",
  },
  {
    href: "/guides/tool-integration-design",
    title: "Tool & integration design",
    description:
      "Schema discipline, normalized errors, idempotency, and timeouts for LLM-side effects.",
    icon: Plug,
    accent: "blue",
  },
  {
    href: "/guides/hallucination-grounding",
    title: "Hallucination & grounding playbook",
    description:
      "Citations, hedging, abstention, and escalation — UX plus backend patterns.",
    icon: BookMarked,
    accent: "blue",
  },
  {
    href: "/guides/ai-security-basics",
    title: "Security basics for AI PMs",
    description:
      "Threat sketch across prompts, tools, and data — plus controls and owners.",
    icon: Lock,
    accent: "amber",
  },
  {
    href: "/guides/ai-governance-lifecycle",
    title: "AI governance & data lifecycle",
    description:
      "Collection through retention, subprocessors, and artifacts enterprise procurement expects.",
    icon: Scale,
    accent: "purple",
  },
  {
    href: "/guides/ai-observability",
    title: "Observability for shipped AI",
    description:
      "Debug loops, triage signals, and trace sketches for production AI.",
    icon: Activity,
    accent: "purple",
  },
  {
    href: "/guides/experimentation-rollout",
    title: "Experimentation & rollout",
    description:
      "Shadow, canary, and A/B ladders — signals, exit criteria, and rollback discipline.",
    icon: Percent,
    accent: "emerald",
  },
  {
    href: "/guides/multi-tenant-ai",
    title: "Multi-tenant AI SaaS",
    description:
      "Isolation for prompts, retrieval, billing, and telemetry across tenants.",
    icon: Building2,
    accent: "blue",
  },
  {
    href: "/guides/vendor-routing",
    title: "Vendor & routing strategy",
    description:
      "Multi-provider failover, tiered models, and integration vs ops burden.",
    icon: Shuffle,
    accent: "amber",
  },
  {
    href: "/guides/ai-team-collaboration",
    title: "Working with ML teams",
    description:
      "Ownership handoffs across the build lifecycle, and where PM/ML collaboration breaks down.",
    icon: Users,
    accent: "emerald",
  },
  {
    href: "/guides/synthetic-data",
    title: "Synthetic data & augmentation",
    description:
      "When synthetic data helps vs hurts, core patterns, and the model-collapse risk.",
    icon: Beaker,
    accent: "amber",
  },
  {
    href: "/guides/model-monitoring-drift",
    title: "Model monitoring & drift",
    description:
      "The detect-diagnose-respond loop for shipped models, and four kinds of drift to recognize.",
    icon: Gauge,
    accent: "purple",
  },
];

export default function GuidesIndexPage() {
  return (
    <GuideShell>
      <h1 className="text-3xl font-bold tracking-tight">Guides</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Short, visual explainers for topics that don&apos;t fit a single quiz
        question — written for how PMs actually decide (tradeoffs, not hype).
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-1">
        {GUIDES.map((g) => {
          const Icon = g.icon;
          const swatch = dashboardIconWell[g.accent];
          return (
            <li key={g.href}>
              <Link
                href={g.href}
                className="group block rounded-xl outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Card className="transition-shadow group-hover:shadow-md">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <div
                      className={cn(
                        "flex shrink-0 items-center justify-center",
                        swatch.well
                      )}
                    >
                      <Icon className={cn("h-5 w-5", swatch.icon)} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg">{g.title}</CardTitle>
                      <CardDescription className="mt-2 text-sm leading-relaxed">
                        {g.description}
                      </CardDescription>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </CardHeader>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </GuideShell>
  );
}
