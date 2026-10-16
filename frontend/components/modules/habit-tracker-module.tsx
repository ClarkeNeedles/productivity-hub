import type { ReactNode } from "react";
import type { ModuleDefinition } from "@/types/module-definition";
import type { ModulePageProps } from "@/types/module-page-component";
import { BaseModuleSettingsPage } from "@/types/base-module-settings-page";

function HabitTrackerPage({ module }: ModulePageProps) {
  return <p className="mt-3 text-slate-500 dark:text-slate-400">{module.title}</p>;
}

class HabitTrackerSettings extends BaseModuleSettingsPage {
  constructor() {
    super(0.5);
  }

  public renderModuleCardConfigSection(): ReactNode {
    return <p className="text-sm text-slate-500">Card configurations coming soon.</p>;
  }
  public renderModulePageConfigSection(): ReactNode {
    return <p className="text-sm text-slate-500">Workspace customizers coming soon.</p>;
  }
}

export const habitTrackerModule = {
  id: "habit-tracker",
  title: "Habit Tracker",
  card: {
    showOptions: true,
    showTitle: true,
    maxMetrics: 2,
  },
  page: HabitTrackerPage,
  settings: new HabitTrackerSettings(),
} satisfies ModuleDefinition<"habit-tracker">;
