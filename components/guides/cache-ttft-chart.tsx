"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartGridClass, chartTooltipStyle } from "./charts/guide-chart-styles";
import { dashboardChart } from "./dashboard-palette";

/** Illustrative time-to-first-token index — lower is faster; baseline 100. */
const DATA = [
  { path: "Cold model", ttftIndex: 100, costIndex: 100 },
  { path: "Prompt cache hit", ttftIndex: 52, costIndex: 38 },
  { path: "Semantic cache hit", ttftIndex: 28, costIndex: 12 },
  { path: "Session replay", ttftIndex: 4, costIndex: 2 },
];

export function CacheTtftChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Relative TTFT & token spend index by path (illustrative)
        </p>
        <p className="text-xs text-muted-foreground">
          Indices are directional — measure your own P95 with vendor dashboards and tracing.
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart
          width={640}
          height={260}
          data={DATA}
          margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
        >
          <CartesianGrid className={chartGridClass} strokeDasharray="3 3" />
          <XAxis dataKey="path" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 110]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="ttftIndex" name="TTFT index (↓ faster)" fill={dashboardChart.purple} radius={[4, 4, 0, 0]} />
          <Bar dataKey="costIndex" name="Token spend index (↓ cheaper)" fill={dashboardChart.blue} radius={[4, 4, 0, 0]} />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Session replay skips generation entirely — ensure UX communicates freshness when it matters.
      </figcaption>
    </figure>
  );
}
