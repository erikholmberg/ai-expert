"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartGridClass, chartTooltipStyle } from "./charts/guide-chart-styles";
import { dashboardChart } from "./dashboard-palette";

/** Conceptual: higher Y = stronger evaluation signal; higher X = slower feedback cycle. */
const DATA = [
  { cycle: "Unit", signal: 38, latency: 1 },
  { cycle: "Offline batch", signal: 62, latency: 4 },
  { cycle: "Shadow", signal: 71, latency: 6 },
  { cycle: "Live A/B", signal: 88, latency: 9 },
];

export function EvaluationSignalLatencyChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Signal strength vs feedback latency (schematic)
        </p>
        <p className="text-xs text-muted-foreground">
          X axis is ordinal cycle speed — not hours-to-deploy.
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <LineChart
          width={640}
          height={240}
          data={DATA}
          margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
        >
          <CartesianGrid className={chartGridClass} strokeDasharray="3 3" />
          <XAxis dataKey="cycle" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line
            type="monotone"
            dataKey="signal"
            name="Signal strength (concept)"
            stroke={dashboardChart.blue}
            strokeWidth={2}
            dot={{ r: 4, fill: dashboardChart.blue }}
          />
          <Line
            type="monotone"
            dataKey="latency"
            name="Cycle latency index"
            stroke={dashboardChart.amber}
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4, fill: dashboardChart.amber }}
          />
        </LineChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Stronger product learning usually waits on slower loops — run both fast and
        slow tracks in parallel.
      </figcaption>
    </figure>
  );
}
