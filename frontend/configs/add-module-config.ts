import { HabitTrackerModule } from "@/components/modules/habit-tracker-module";
import { StreakCounterModule } from "@/components/modules/streak-counter-module";
import type { BaseModule } from "@/types/base-module";
import type { ModuleId } from "@/configs/modules-config";
import { AddModuleModule } from "@/components/modules/add-module-module";

export interface ModuleListProps {
  instantiate: () => BaseModule; // Factory function, instantiates the concrete class for the module
}

export const MODULE_LIST: Record<ModuleId, ModuleListProps> = {
  "habit-tracker": {
    instantiate: () => new HabitTrackerModule(),
  },
  "streak-counter": {
    instantiate: () => new StreakCounterModule(),
  },
  "add-module": {
    instantiate: () => new AddModuleModule(),
  }
};