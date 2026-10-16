import { HabitTrackerModule } from "@/components/modules/habit-tracker-module";
import { StreakCounterModule } from "@/components/modules/streak-counter-module";
import type { BaseModule } from "@/types/base-module";
import type { ModuleId } from "@/configs/modules-config";

export const MODULE_LIST = {
  "habit-tracker": new HabitTrackerModule(),
  "streak-counter": new StreakCounterModule(),
} satisfies Record<ModuleId, BaseModule>;
