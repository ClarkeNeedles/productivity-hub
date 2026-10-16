export const MODULE_IDS = ["habit-tracker", "streak-counter"] as const;

// Evaluates to "habit-tracker" | "streak-counter" | etc.
export type ModuleId = (typeof MODULE_IDS)[number];

export const ADD_MODULE_ID = "add-module" as const;
export type AddModuleId = typeof ADD_MODULE_ID;

export type FocusedModuleId = ModuleId | AddModuleId;
