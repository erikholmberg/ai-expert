import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Priority = "high" | "med" | "low";

const ROWS: {
  scenario: string;
  latency: Priority;
  cost: Priority;
  reasoning: Priority;
  context: Priority;
}[] = [
  {
    scenario: "Streaming chat assistant",
    latency: "high",
    cost: "med",
    reasoning: "med",
    context: "low",
  },
  {
    scenario: "Batch summarization / ETL",
    latency: "low",
    cost: "high",
    reasoning: "med",
    context: "high",
  },
  {
    scenario: "Agent with tools (many steps)",
    latency: "med",
    cost: "med",
    reasoning: "high",
    context: "high",
  },
  {
    scenario: "Regulated workload (procurement)",
    latency: "med",
    cost: "med",
    reasoning: "med",
    context: "med",
  },
];

function PriorityBadge({ level }: { level: Priority }) {
  const label =
    level === "high" ? "High" : level === "med" ? "Med" : "Low";
  if (level === "high") {
    return (
      <Badge
        variant="outline"
        className="border-amber-600/40 bg-amber-100 font-normal text-amber-900 dark:border-amber-500/40 dark:bg-amber-950/50 dark:text-amber-200"
      >
        {label}
      </Badge>
    );
  }
  if (level === "med") {
    return (
      <Badge
        variant="outline"
        className="border-purple-600/30 bg-purple-100/80 font-normal text-purple-900 dark:border-purple-500/35 dark:bg-purple-950/40 dark:text-purple-200"
      >
        {label}
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="font-normal text-muted-foreground">
      {label}
    </Badge>
  );
}

const ROW_LEFT_ACCENT = [
  "border-l-4 border-l-blue-600 dark:border-l-blue-400",
  "border-l-4 border-l-amber-600 dark:border-l-amber-400",
  "border-l-4 border-l-purple-600 dark:border-l-purple-400",
  "border-l-4 border-l-emerald-600 dark:border-l-emerald-400",
] as const;

export function ScenarioPriorityGrid() {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b bg-muted/50 [&_tr]:border-b">
          <tr className="border-b transition-colors">
            <th className="h-12 min-w-[11rem] px-3 text-left align-middle font-medium text-foreground">
              Scenario
            </th>
            <th className="h-12 px-3 text-left align-middle font-medium text-foreground">
              Prioritize latency
            </th>
            <th className="h-12 px-3 text-left align-middle font-medium text-foreground">
              Prioritize cost
            </th>
            <th className="h-12 px-3 text-left align-middle font-medium text-foreground">
              Prioritize reasoning
            </th>
            <th className="h-12 px-3 text-left align-middle font-medium text-foreground">
              Prioritize context
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {ROWS.map((row, i) => (
            <tr
              key={row.scenario}
              className={cn(
                ROW_LEFT_ACCENT[i]!,
                i % 2 === 1
                  ? "border-b bg-muted/20 transition-colors hover:bg-muted/50"
                  : "border-b transition-colors hover:bg-muted/50"
              )}
            >
              <td className="p-3 align-middle font-medium whitespace-normal">
                {row.scenario}
              </td>
              <td className="p-3 align-middle">
                <PriorityBadge level={row.latency} />
              </td>
              <td className="p-3 align-middle">
                <PriorityBadge level={row.cost} />
              </td>
              <td className="p-3 align-middle">
                <PriorityBadge level={row.reasoning} />
              </td>
              <td className="p-3 align-middle">
                <PriorityBadge level={row.context} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
