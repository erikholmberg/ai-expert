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

/** Conceptual: causal signal strength vs operational risk by rollout stage. */
const DATA = [
  { stage: "Shadow", learning: 42, risk: 12 },
  { stage: "Canary", learning: 68, risk: 38 },
  { stage: "A/B", learning: 88, risk: 55 },
];

export function RolloutLearningChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Learning power vs exposure risk (schematic)
        </p>
        <p className="text-xs text-muted-foreground">
          Shadow learns slowly but safely; A/B learns fastest once infra & eval mature.
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart width={640} height={240} data={DATA} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid className={chartGridClass} vertical={false} />
          <XAxis dataKey="stage" tick={{ fontSize: 11 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="learning" name="Learning index" fill={dashboardChart.emerald} radius={[4, 4, 0, 0]} maxBarSize={36} />
          <Bar dataKey="risk" name="Blast-radius index" fill={dashboardChart.amber} radius={[4, 4, 0, 0]} maxBarSize={36} />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Use indices to justify stage duration — not to skip monitoring at “green” dashboards.
      </figcaption>
    </figure>
  );
}
