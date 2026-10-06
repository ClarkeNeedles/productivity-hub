export const AVAILABLE_MODULES = [
  "add-module",
  "habit-tracker",
  "streak-counter"
] as const;

// Evaluates to "add-module" | "habit-tracker" | "streak-counter" | etc.
export type ModuleId = typeof AVAILABLE_MODULES[number];
