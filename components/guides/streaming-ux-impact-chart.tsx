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

/** Illustrative impact on perceived latency / satisfaction — qual→quant with research. */
const DATA = [
  { tactic: "Streaming tokens vs wait-for-full", lift: 78 },
  { tactic: "Skeleton + staged layout", lift: 62 },
  { tactic: "Optimistic UI (careful)", lift: 48 },
  { tactic: "Prefetch likely follow-ups", lift: 38 },
];

export function StreamingUxImpactChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Relative lift on perceived responsiveness (survey proxy, illustrative)
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart
          width={640}
          height={260}
          data={DATA}
          layout="vertical"
          margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
        >
          <CartesianGrid className={chartGridClass} horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="tactic" width={200} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Bar dataKey="lift" name="Perceived improvement index" fill={dashboardChart.blue} radius={[0, 4, 4, 0]} maxBarSize={22} />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Pair UX tactics with backend moves (smaller prompts, faster routing SKU) for end-to-end wins.
      </figcaption>
    </figure>
  );
}
