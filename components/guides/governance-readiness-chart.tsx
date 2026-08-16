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

/** Relative depth of documentation buyers expect — illustrative scores 0–100. */
const DATA = [
  { theme: "Data map", enterpriseDepth: 78, smbDepth: 34 },
  { theme: "Retention & delete", enterpriseDepth: 86, smbDepth: 42 },
  { theme: "Subprocessors", enterpriseDepth: 92, smbDepth: 28 },
  { theme: "Access logs", enterpriseDepth: 72, smbDepth: 22 },
  { theme: "Incident comms", enterpriseDepth: 68, smbDepth: 38 },
];

export function GovernanceReadinessChart() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Procurement depth by theme (schematic)
        </p>
        <p className="text-xs text-muted-foreground">
          Enterprise security reviews concentrate on provenance and subprocessors — SMBs often want
          plain-language promises first.
        </p>
      </div>
      <div className="w-full overflow-x-auto">
        <BarChart
          width={640}
          height={280}
          data={DATA}
          margin={{ top: 8, right: 16, left: 8, bottom: 8 }}
        >
          <CartesianGrid className={chartGridClass} strokeDasharray="3 3" />
          <XAxis dataKey="theme" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar
            dataKey="enterpriseDepth"
            name="Enterprise review intensity"
            fill={dashboardChart.purple}
            radius={[4, 4, 0, 0]}
          />
          <Bar dataKey="smbDepth" name="SMB typical depth" fill={dashboardChart.emerald} radius={[4, 4, 0, 0]} />
        </BarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Reuse artifacts across sales — the same data map feeds security questionnaires with tweaks.
      </figcaption>
    </figure>
  );
}
