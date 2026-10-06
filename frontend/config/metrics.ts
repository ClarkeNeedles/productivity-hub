import type { BaseModuleMetric } from "@/types/base-module-metric";
import { AddModuleMetric } from "@/modules/add-module/metrics/add-module";
import type { ModuleId } from "@/config/modules";

export const AVAILABLE_METRICS = [
  "add-module",
] as const;

// Evaluates to "add-module" | "streak-counter" | etc.
export type MetricId = typeof AVAILABLE_METRICS[number];

export const AVAILABLE_MODULE_METRICS = {
  "add-module": [
    { id: "add-module", name: "Add Module", renderMicroVariant: AddModuleMetric },
  ],
  "habit-tracker": [],
  "streak-counter": [],
} satisfies Record<ModuleId, readonly BaseModuleMetric[]>;

export const DEFAULT_MODULE_METRICS: Record<ModuleId, MetricId[]> = {
  "add-module": ["add-module"],
  "habit-tracker": [],
  "streak-counter": [],
};