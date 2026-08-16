"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartGridClass, chartTooltipStyle } from "./charts/guide-chart-styles";
import { dashboardChart } from "./dashboard-palette";

/** How often teams lean on each signal in production triage — illustrative survey-style weights. */
const DATA = [
  { signal: "Latency / TTFT regression", weight: 88 },
  { signal: "Error rate & retries", weight: 82 },
  { signal: "Token volume spikes", weight: 68 },
  { signal: "Eval / golden-set drift", weight: 61 },
  { signal: "Explicit user thumbs-down", weight: 74 },
];

export function ObservabilitySignalsChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Signal usefulness for triage (self-reported index)
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart width={640} height={280} data={DATA} layout="vertical" margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid className={chartGridClass} horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="signal" width={200} tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Bar dataKey="weight" name="Usefulness index" fill={dashboardChart.blue} radius={[0, 4, 4, 0]} maxBarSize={20} />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Combine cheap automated signals with slower eval drift detectors — don&apos;t wait for user outrage only.
      </figcaption>
    </figure>
  );
}
