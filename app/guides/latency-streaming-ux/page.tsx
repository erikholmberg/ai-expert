import type { Metadata } from "next";
import Link from "next/link";
import { GuideShell } from "@/components/guides/guide-shell";
import { StreamingLatencyTimeline } from "@/components/guides/streaming-latency-timeline";
import { StreamingUxImpactChart } from "@/components/guides/streaming-ux-impact-chart";

export const metadata: Metadata = {
  title: "Latency budget & streaming UX — AI Expert",
  description:
    "TTFT, streaming tokens, and UX patterns that improve perceived responsiveness for AI assistants.",
};

export default function LatencyStreamingUxPage() {
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
          <span>Latency & streaming UX</span>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Latency budget & streaming UX
        </h1>
        <p className="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-muted-foreground">
          Users judge stalls by{" "}
          <strong className="font-semibold text-foreground">
            time-to-first-token (TTFT)
          </strong>{" "}
          and cadence of streamed output — not only total latency. Pair backend
          optimizations with interaction design so perceived speed tracks real
          improvements.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Lifecycle timeline (conceptual)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Annotate each segment with your telemetry ranges — the diagram convinces
          stakeholders when backed by p50/p95 numbers.
        </p>
        <StreamingLatencyTimeline />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          UX tactics vs perceived lift (illustrative)
        </h2>
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
          Validate with qualitative sessions + lightweight surveys — indices here are
          directional for roadmap prioritization conversations.
        </p>
        <StreamingUxImpactChart />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Playbook snippets</h2>
        <div className="max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          <p>
            <strong className="font-semibold text-foreground">Streaming</strong>{" "}
            beats blocking endpoints for perceived responsiveness even when total time
            is similar — users tolerate waits better when partial text arrives early.
          </p>
          <p>
            <strong className="font-semibold text-foreground">
              Skeleton layouts + staged disclosure
            </strong>{" "}
            anchor attention during unavoidable TTFT waits — combine with honest
            progress hints where backend exposes routing state.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Optimistic UI</strong>{" "}
            helps only when rollback paths are trustworthy — pair with undo flows for
            destructive actions.
          </p>
        </div>
      </section>
    </GuideShell>
  );
}
