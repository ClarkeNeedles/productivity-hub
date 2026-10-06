import type { BaseModuleMetric } from "@/types/base-module-metric";
import type { ModuleId } from "@/config/modules";
import { AddModuleMetric } from "@/components/metrics/add-module";
import { StreakCounterMetric } from "@/components/metrics/streak-counter";

export const AVAILABLE_METRICS = [
  "add-module",
  "streak-counter",
] as const;

// Evaluates to "add-module" | "streak-counter" | etc.
export type MetricId = typeof AVAILABLE_METRICS[number];

export const AVAILABLE_MODULE_METRICS = {
  "add-module": [
    { id: "add-module", name: "Add Module", renderMicroVariant: AddModuleMetric },
  ],
  "streak-counter": [
    { id: "streak-counter", name: "Streak Counter", renderMicroVariant: StreakCounterMetric },
  ],
  "habit-tracker": [],
} satisfies Record<ModuleId, readonly BaseModuleMetric[]>;

export const DEFAULT_MODULE_METRICS: Record<ModuleId, MetricId[]> = {
  "add-module": ["add-module"],
  "streak-counter": ["streak-counter"],
  "habit-tracker": [],
};