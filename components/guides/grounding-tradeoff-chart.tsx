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

/** Illustrative tension: trust vs latency/additional UX surface — not measured data. */
const DATA = [
  { pattern: "Always cite (strict)", trust: 92, friction: 48 },
  { pattern: "Hybrid hedge", trust: 74, friction: 62 },
  { pattern: "Fast fluent default", trust: 52, friction: 88 },
];

export function GroundingTradeoffChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Trust vs product friction (schematic)
        </p>
        <p className="text-xs text-muted-foreground">
          Higher friction includes loading sources, longer responses, extra taps — tune per persona.
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart width={640} height={240} data={DATA} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid className={chartGridClass} vertical={false} />
          <XAxis dataKey="pattern" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="trust" name="Stakeholder trust index" fill={dashboardChart.emerald} radius={[4, 4, 0, 0]} maxBarSize={32} />
          <Bar dataKey="friction" name="Speed / simplicity index" fill={dashboardChart.amber} radius={[4, 4, 0, 0]} maxBarSize={32} />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Interview talking point: shipping fluent-default raises short-term delight and long-term incident risk.
      </figcaption>
    </figure>
  );
}
