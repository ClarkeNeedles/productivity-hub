// Module IDs as variables
export const ADD_MODULE_ID = "add-module" as const;
export const STREAK_COUNTER_MODULE_ID = "streak-counter" as const;
export const HABIT_TRACKER_MODULE_ID = "habit-tracker" as const;
export const TODO_LIST_MODULE_ID = "todo-list" as const;

export const MODULE_IDS = [
  STREAK_COUNTER_MODULE_ID,
  HABIT_TRACKER_MODULE_ID,
  TODO_LIST_MODULE_ID,
] as const;

// Evaluates to "habit-tracker" | "streak-counter" | etc.`
export type ModuleId = (typeof MODULE_IDS)[number];

export type AddModuleId = typeof ADD_MODULE_ID;
export type FocusedModuleId = ModuleId | AddModuleId;
