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

/** Illustrative incident rate index as integration maturity improves — not measured data. */
const DATA = [
  { stage: "Ad-hoc strings", incidentIndex: 100 },
  { stage: "+ schemas", incidentIndex: 62 },
  { stage: "+ normalized errors", incidentIndex: 38 },
  { stage: "+ idempotency", incidentIndex: 22 },
];

export function ToolReliabilityChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Side-effect mishap pressure vs integration hygiene (schematic)
        </p>
        <p className="text-xs text-muted-foreground">
          Each layer removes failure modes agents cannot prompt away — especially under retries.
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
          <XAxis dataKey="stage" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 110]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line
            type="monotone"
            dataKey="incidentIndex"
            name="Relative mishap index"
            stroke={dashboardChart.amber}
            strokeWidth={2}
            dot={{ r: 4, fill: dashboardChart.amber }}
          />
        </LineChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Pair with agent-boundaries tiers — reliability gates determine how far autonomy can expand.
      </figcaption>
    </figure>
  );
}
