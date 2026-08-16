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

/** Schematic “integration pain avoided” vs constraint strength — illustrative index 0–100. */
const DATA = [
  { posture: "Loose prose", downstreamReliability: 32, pmIterationSpeed: 88 },
  { posture: "Light JSON", downstreamReliability: 58, pmIterationSpeed: 72 },
  { posture: "Strict schema", downstreamReliability: 86, pmIterationSpeed: 48 },
];

export function PromptRigidityChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Constraint vs downstream reliability (schematic)
        </p>
        <p className="text-xs text-muted-foreground">
          Tighter contracts reduce silent breakage in code paths — at the cost of prompt churn and
          user-visible repair.
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
          <XAxis dataKey="posture" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar
            dataKey="downstreamReliability"
            name="Downstream reliability index"
            fill={dashboardChart.emerald}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="pmIterationSpeed"
            name="Prompt iteration speed index"
            fill={dashboardChart.blue}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Pick the weakest contract that still satisfies your parsers — over-constraining early burns
        teams before product-market fit.
      </figcaption>
    </figure>
  );
}
