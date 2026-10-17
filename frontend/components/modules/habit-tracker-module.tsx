import type { ReactNode } from "react";
import type { ModuleDefinition } from "@/types/module-definition";
import { BaseModuleSettingsPage } from "@/types/base-module-settings-page";
import { HABIT_TRACKER_MODULE_ID } from "@/configs/modules-config";
import { HabitListMetric } from "@/components/metrics/habit-list-metric";
import { useHabitTrackerStore } from "@/providers/modules-store-provider";
import { getLocalDateKey, isHabitDueOnDate } from "@/stores/habit-tracker-store";

function HabitTrackerPage() {
  const habits = useHabitTrackerStore((state) => state.habits);
  const completions = useHabitTrackerStore((state) => state.completions);
  const today = getLocalDateKey();
  const activeHabits = habits.filter((habit) => !habit.archivedAt);
  const dueHabits = activeHabits.filter((habit) => isHabitDueOnDate(habit, today));
  const completedToday = dueHabits.filter((habit) =>
    completions.some(
      (completion) => completion.habitId === habit.id && completion.completedOn === today
    )
  ).length;

  return (
    <div className="space-y-6 p-1">
      <div>
        <h2 className="text-xl text-slate-500 dark:text-slate-400">
          Build consistent routines one day at a time.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <HabitListMetric />
        </div>

        <aside className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40">
            <span className="text-[0.68rem] font-bold tracking-[0.15em] text-slate-400 uppercase dark:text-slate-500">
              Active habits
            </span>
            <p className="mt-1 text-3xl font-black text-slate-800 dark:text-white">
              {activeHabits.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40">
            <span className="text-[0.68rem] font-bold tracking-[0.15em] text-slate-400 uppercase dark:text-slate-500">
              Today
            </span>
            <p className="mt-1 text-3xl font-black text-slate-800 dark:text-white">
              {completedToday}/{dueHabits.length}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">habits complete</p>
          </div>
        </aside>
      </div>
    </div>
  );
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
  id: HABIT_TRACKER_MODULE_ID,
  title: "Habit Tracker",
  card: {
    showOptions: true,
    showTitle: true,
    maxMetrics: 2,
  },
  page: HabitTrackerPage,
  settings: new HabitTrackerSettings(),
} satisfies ModuleDefinition<typeof HABIT_TRACKER_MODULE_ID>;
