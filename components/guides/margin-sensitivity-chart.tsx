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

/** Conceptual margin index as average output length grows — baseline 100. */
const DATA = [
  { factor: "Baseline", marginIndex: 100 },
  { factor: "+30% output len", marginIndex: 78 },
  { factor: "+60% output len", marginIndex: 58 },
  { factor: "+ heavy tool use", marginIndex: 52 },
];

export function MarginSensitivityChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Margin pressure vs length & tools (schematic index)
        </p>
        <p className="text-xs text-muted-foreground">
          Output priced per token — small UX changes that lengthen answers hit margin
          nonlinearly.
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
          <XAxis dataKey="factor" tick={{ fontSize: 10 }} />
          <YAxis domain={[40, 105]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line
            type="monotone"
            dataKey="marginIndex"
            name="Relative margin index"
            stroke={dashboardChart.emerald}
            strokeWidth={2}
            dot={{ r: 4, fill: dashboardChart.emerald }}
          />
        </LineChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Pair with pricing experiments — shorter defaults and smarter routing recover
        margin faster than arguing over base subscription alone.
      </figcaption>
    </figure>
  );
}
