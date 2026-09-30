import { HabitTrackerModule } from "@/modules/habit-tracker";
import type { BaseModule } from "@/types/base-module";

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
