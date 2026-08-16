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

/** Relative engineering + ops burden — illustrative planning aid. */
const DATA = [
  { setup: "Single provider SDK", integration: 22, ops: 18 },
  { setup: "Failover pair", integration: 58, ops: 52 },
  { setup: "Full router + eval matrix", integration: 85, ops: 78 },
];

export function VendorRoutingEffortChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Integration vs ongoing ops burden (schematic)
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart width={640} height={240} data={DATA} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid className={chartGridClass} vertical={false} />
          <XAxis dataKey="setup" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="integration" name="One-time integration" fill={dashboardChart.blue} radius={[4, 4, 0, 0]} maxBarSize={28} />
          <Bar dataKey="ops" name="Steady-state ops / on-call" fill={dashboardChart.purple} radius={[4, 4, 0, 0]} maxBarSize={28} />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Budget headcount for parity testing whenever two backends answer the same PRD prompts.
      </figcaption>
    </figure>
  );
}
