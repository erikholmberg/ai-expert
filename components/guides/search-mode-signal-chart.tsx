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

/** Illustrative fitness scores by query shape — not benchmark results. */
const DATA = [
  { shape: "Exact entity lookup", keyword: 92, dense: 44, hybrid: 78 },
  { shape: "Conceptual question", keyword: 38, dense: 88, hybrid: 86 },
  { shape: "Messy enterprise mix", keyword: 52, dense: 62, hybrid: 90 },
];

export function SearchModeSignalChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Fit by query shape (illustrative)
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart
          width={720}
          height={260}
          data={DATA}
          margin={{ top: 8, right: 16, left: 8, bottom: 32 }}
        >
          <CartesianGrid className={chartGridClass} vertical={false} />
          <XAxis dataKey="shape" tick={{ fontSize: 10 }} interval={0} angle={-12} textAnchor="end" height={56} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="keyword" name="Keyword" fill={dashboardChart.amber} radius={[4, 4, 0, 0]} maxBarSize={28} />
          <Bar dataKey="dense" name="Dense" fill={dashboardChart.purple} radius={[4, 4, 0, 0]} maxBarSize={28} />
          <Bar dataKey="hybrid" name="Hybrid" fill={dashboardChart.emerald} radius={[4, 4, 0, 0]} maxBarSize={28} />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Score curves shift with corpus quality — measure offline recall@k before
        trusting intuition.
      </figcaption>
    </figure>
  );
}
