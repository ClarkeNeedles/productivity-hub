import { HabitTrackerModule } from "@/components/modules/habit-tracker";
import { StreakCounterModule } from "@/components/modules/streak-counter";
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
