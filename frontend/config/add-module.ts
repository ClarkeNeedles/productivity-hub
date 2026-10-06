import { HabitTrackerModule } from "@/modules/habit-tracker/habit-tracker";
import { StreakCounterModule } from "@/modules/streak-counter/streak-counter";
import type { BaseModule } from "@/types/base-module";
import type { ModuleId } from "@/config/modules";

export interface ListItem {
  id: ModuleId;
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
