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

/** Illustrative 0–100 scores — relative emphasis, not measured benchmarks. */
const DATA = [
  {
    metric: "Time to first value",
    promptOnly: 93,
    rag: 67,
    fineTune: 32,
  },
  {
    metric: "Engineering depth",
    promptOnly: 22,
    rag: 58,
    fineTune: 82,
  },
  {
    metric: "Quality data appetite",
    promptOnly: 12,
    rag: 48,
    fineTune: 90,
  },
  {
    metric: "Control of behavior",
    promptOnly: 45,
    rag: 62,
    fineTune: 88,
  },
];

export function ApproachComparisonChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Relative tradeoffs (illustrative)
        </p>
        <p className="text-xs text-muted-foreground">
          Higher means more of that attribute for the approach — not “better”
          overall.
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart
          width={720}
          height={280}
          data={DATA}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
        >
            <CartesianGrid className={chartGridClass} horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="metric"
              width={118}
              tick={{ fontSize: 11 }}
              tickMargin={8}
            />
            <Tooltip
              contentStyle={chartTooltipStyle}
              formatter={(value) =>
                value === undefined ? ["", ""] : [`${value}`, ""]
              }
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar
              dataKey="promptOnly"
              name="Prompt-only"
              fill={dashboardChart.blue}
              radius={[0, 4, 4, 0]}
              maxBarSize={18}
            />
            <Bar
              dataKey="rag"
              name="RAG"
              fill={dashboardChart.amber}
              radius={[0, 4, 4, 0]}
              maxBarSize={18}
            />
            <Bar
              dataKey="fineTune"
              name="Fine-tuning"
              fill={dashboardChart.purple}
              radius={[0, 4, 4, 0]}
              maxBarSize={18}
            />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Directionally useful for roadmap sequencing — validate on your stack.
      </figcaption>
    </figure>
  );
}
