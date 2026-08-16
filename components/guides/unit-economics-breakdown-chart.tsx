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

/** Illustrative share of a single high-volume assistant turn — not financial advice. */
const DATA = [
  {
    label: "Illustrative COGS split",
    outputTokens: 48,
    inputTokens: 28,
    toolCalls: 14,
    other: 10,
  },
];

export function UnitEconomicsBreakdownChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Where spend often concentrates (one generic copilot-style turn)
        </p>
        <p className="text-xs text-muted-foreground">
          Output-heavy agents skew output further; cached prefixes shrink input.
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart
          width={640}
          height={220}
          data={DATA}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
        >
          <CartesianGrid className={chartGridClass} horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="label" width={140} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar
            dataKey="outputTokens"
            name="Output tokens ($)"
            stackId="a"
            fill={dashboardChart.amber}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="inputTokens"
            name="Input tokens ($)"
            stackId="a"
            fill={dashboardChart.blue}
          />
          <Bar
            dataKey="toolCalls"
            name="Tools / search ($)"
            stackId="a"
            fill={dashboardChart.purple}
          />
          <Bar
            dataKey="other"
            name="Other (embeddings, overhead)"
            stackId="a"
            fill={dashboardChart.emerald}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Validate with finance — use this to argue for caching, shorter answers, or
        cheaper routing models on simple turns.
      </figcaption>
    </figure>
  );
}
