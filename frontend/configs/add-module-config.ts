import { habitTrackerModule } from "@/components/modules/habit-tracker-module";
import { streakCounterModule } from "@/components/modules/streak-counter-module";
import type { ModuleDefinition } from "@/types/module-definition";
import type { ModuleId } from "@/configs/modules-config";

export const MODULE_LIST = {
  "habit-tracker": habitTrackerModule,
  "streak-counter": streakCounterModule,
} satisfies Record<ModuleId, ModuleDefinition>;
