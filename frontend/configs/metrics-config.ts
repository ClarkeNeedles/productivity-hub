import type { BaseModuleMetric } from "@/types/base-module-metric";
import type { ModuleId } from "@/configs/modules-config";
import { AddModuleMetric } from "@/components/metrics/add-module-metric";
import { CurrentStreakMetric } from "@/components/metrics/current-streak-metric";
import { BestStreakMetric } from "@/components/metrics/best-streak-metric";

export const AVAILABLE_METRICS = ["add-module", "current-streak", "best-streak"] as const;

// Evaluates to "add-module" | "current-streak" | etc.
export type MetricId = (typeof AVAILABLE_METRICS)[number];

export const AVAILABLE_MODULE_METRICS = {
  "add-module": [
    { id: "add-module", name: "Add Module", renderMicroVariant: AddModuleMetric }
  ],
  "streak-counter": [
    { id: "current-streak", name: "Current Streak", renderMicroVariant: CurrentStreakMetric },
    { id: "best-streak", name: "Best Streak", renderMicroVariant: BestStreakMetric },
  ],
  "habit-tracker": [],
} satisfies Record<ModuleId, readonly BaseModuleMetric[]>;

export const DEFAULT_MODULE_METRICS: Record<ModuleId, MetricId[]> = {
  "add-module": ["add-module"],
  "streak-counter": ["current-streak", "best-streak"],
  "habit-tracker": [],
};
