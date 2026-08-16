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

/** Conceptual: engineering / ops complexity vs expected retrieval quality uplift. */
const DATA = [
  { pattern: "Naive vector", complexity: 22, qualityLift: 35 },
  { pattern: "Hybrid", complexity: 48, qualityLift: 62 },
  { pattern: "+ Rerank", complexity: 65, qualityLift: 78 },
  { pattern: "Agentic", complexity: 90, qualityLift: 72 },
];

export function RetrievalComplexityChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Complexity vs illustrative quality uplift
        </p>
        <p className="text-xs text-muted-foreground">
          Quality uplift assumes tuned baselines — agentic can regress if loops go
          wrong.
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart
          width={640}
          height={220}
          data={DATA}
          margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
        >
            <CartesianGrid className={chartGridClass} vertical={false} />
            <XAxis dataKey="pattern" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar
              dataKey="complexity"
              name="Complexity"
              fill={dashboardChart.purple}
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
            <Bar
              dataKey="qualityLift"
              name="Quality uplift (illustrative)"
              fill={dashboardChart.emerald}
              radius={[4, 4, 0, 0]}
              maxBarSize={36}
            />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Use to sequence investments — ship readable baseline, then hybrid, then
        rerank where precision hurts.
      </figcaption>
    </figure>
  );
}
