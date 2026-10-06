import { HabitTrackerModule } from "@/modules/habit-tracker/habit-tracker";
import { StreakCounterModule } from "@/modules/streak-counter/streak-counter";
import { AddModuleMetric } from "@/modules/add-module/metrics/add-module";
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
  instantiate: () => BaseModule; // Factory function, instantiates the concrete class for the module
}

export const MODULE_LIST: ListItem[] = [
  {
    id: "habit-tracker",
    title: "Habit Tracker",
    instantiate: () => new HabitTrackerModule("habit-tracker", "Habit Tracker"),
  },
  {
    id: "streak-counter",
    title: "Streak Counter",
    instantiate: () => new StreakCounterModule("streak-counter", "Streak Counter"),
  },
];
