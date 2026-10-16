import type { ModuleMetricDefinition } from "@/types/module-metric-definition";
import type { ModuleId } from "@/configs/modules-config";
import { CurrentStreakMetric } from "@/components/metrics/current-streak-metric";
import { BestStreakMetric } from "@/components/metrics/best-streak-metric";

export const AVAILABLE_METRICS = ["current-streak", "best-streak"] as const;

// Evaluates to "current-streak" | "best-streak".
export type MetricId = (typeof AVAILABLE_METRICS)[number];

export const AVAILABLE_MODULE_METRICS = {
  "streak-counter": [
    { id: "current-streak", name: "Current Streak", renderMetric: CurrentStreakMetric },
    { id: "best-streak", name: "Best Streak", renderMetric: BestStreakMetric },
  ],
  "habit-tracker": [],
} satisfies Record<ModuleId, readonly ModuleMetricDefinition<MetricId>[]>;

export const DEFAULT_MODULE_METRICS: Record<ModuleId, MetricId[]> = {
  "streak-counter": ["current-streak", "best-streak"],
  "habit-tracker": [],
};
