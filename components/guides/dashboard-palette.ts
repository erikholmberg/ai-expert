/**
 * Shared with dashboard stat accents (`app/dashboard-client.tsx` icon wells).
 * CSS variables are defined in `app/globals.css` for light/dark.
 */
export const dashboardChart = {
  blue: "var(--dashboard-blue)",
  amber: "var(--dashboard-amber)",
  purple: "var(--dashboard-purple)",
  emerald: "var(--dashboard-emerald)",
} as const;

export type DashboardAccent = keyof typeof dashboardChart;

/** Icon well + icon text — same class strings as the dashboard KPI row. */
export const dashboardIconWell: Record<
  DashboardAccent,
  { well: string; icon: string }
> = {
  blue: {
    well: "rounded-lg bg-blue-100 p-2 dark:bg-blue-950",
    icon: "text-blue-600 dark:text-blue-400",
  },
  amber: {
    well: "rounded-lg bg-amber-100 p-2 dark:bg-amber-950",
    icon: "text-amber-600 dark:text-amber-400",
  },
  purple: {
    well: "rounded-lg bg-purple-100 p-2 dark:bg-purple-950",
    icon: "text-purple-600 dark:text-purple-400",
  },
  emerald: {
    well: "rounded-lg bg-emerald-100 p-2 dark:bg-emerald-950",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
};
