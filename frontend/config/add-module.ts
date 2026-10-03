import { HabitTrackerModule } from "@/modules/habit-tracker/habit-tracker";
import { AddModuleMetric } from "@/modules/add-module/metrics/add-module-metric";
import type { BaseModule } from "@/types/base-module";
import type { BaseModuleMetric } from "@/types/base-module-metric";

export const ADD_MODULE_METRICS: readonly BaseModuleMetric[] = [
  {
    id: "add-module",
    name: "Add module",
    renderMicroVariant: AddModuleMetric,
  },
];

export interface ListItem {
  id: string;
  title: string;

  // Factory function that instantiates the exact concrete class for this module.
  instantiate: (id: string, title: string) => BaseModule<any, any, any>;
}

export const MODULE_LIST: ListItem[] = [
  {
    id: "habit-tracker",
    title: "Habit Tracker",
    instantiate: (id, title) => new HabitTrackerModule(id, title),
  },
];
