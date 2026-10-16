import { habitTrackerModule } from "@/components/modules/habit-tracker-module";
import { streakCounterModule } from "@/components/modules/streak-counter-module";
import { todoListModule } from "@/components/modules/todo-list-module";
import type { ModuleDefinition } from "@/types/module-definition";
import {
  HABIT_TRACKER_MODULE_ID,
  STREAK_COUNTER_MODULE_ID,
  TODO_LIST_MODULE_ID,
  type ModuleId,
} from "@/configs/modules-config";

export const MODULE_LIST = {
  [HABIT_TRACKER_MODULE_ID]: habitTrackerModule,
  [STREAK_COUNTER_MODULE_ID]: streakCounterModule,
  [TODO_LIST_MODULE_ID]: todoListModule,
} satisfies Record<ModuleId, ModuleDefinition>;
