"use client";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  Tooltip,
} from "recharts";
import { chartGridClass, chartTooltipStyle } from "./charts/guide-chart-styles";
import { dashboardChart } from "./dashboard-palette";

/** Illustrative profiles — tune axes to your risk posture. */
const DATA = [
  { dimension: "Stakeholder trust", human: 96, llmJudge: 54, automated: 41 },
  { dimension: "Iteration speed", human: 28, llmJudge: 71, automated: 93 },
  { dimension: "Cost at scale", human: 22, llmJudge: 76, automated: 91 },
  { dimension: "Coverage breadth", human: 33, llmJudge: 82, automated: 96 },
];

export function EvaluationMethodsRadar() {
  return (
    <figure className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-2 px-1">
        <p className="text-sm font-medium text-foreground">
          Method profiles (illustrative)
        </p>
        <p className="text-xs text-muted-foreground">
          Radar shows emphasis tradeoffs — combine methods rather than picking one.
        </p>
      </div>
      <div className="mx-auto w-full max-w-md overflow-x-auto">
        <RadarChart
          width={400}
          height={300}
          cx={200}
          cy={150}
          outerRadius={100}
          data={DATA}
        >
          <PolarGrid className={chartGridClass} />
          <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 10 }} />
          <PolarRadiusAxis
            angle={45}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
            <Radar
              name="Human spot-check"
              dataKey="human"
              stroke={dashboardChart.blue}
              fill={dashboardChart.blue}
              fillOpacity={0.28}
            />
            <Radar
              name="LLM-as-judge"
              dataKey="llmJudge"
              stroke={dashboardChart.purple}
              fill={dashboardChart.purple}
              fillOpacity={0.22}
            />
            <Radar
              name="Automated metrics"
              dataKey="automated"
              stroke={dashboardChart.emerald}
              fill={dashboardChart.emerald}
              fillOpacity={0.22}
            />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Tooltip contentStyle={chartTooltipStyle} />
        </RadarChart>
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted-foreground">
        Judges need golden sets; automation needs vigilance against metric gaming.
      </figcaption>
    </figure>
  );
}
