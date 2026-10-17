"use client";

import Link from "next/link";
import { Check, Settings2 } from "lucide-react";
import { getLocalDateKey, isHabitDueOnDate, type Habit } from "@/stores/habit-tracker-store";
import { useHabitTrackerStore } from "@/providers/modules-store-provider";

function isCompletedToday(habit: Habit, completedHabitIds: ReadonlySet<string>, today: string) {
  return isHabitDueOnDate(habit, today) && completedHabitIds.has(habit.id);
}

export function HabitListMetric() {
  const habits = useHabitTrackerStore((state) => state.habits);
  const completions = useHabitTrackerStore((state) => state.completions);
  const error = useHabitTrackerStore((state) => state.error);
  const completeHabitForDate = useHabitTrackerStore((state) => state.completeHabitForDate);
  const uncompleteHabitForDate = useHabitTrackerStore((state) => state.uncompleteHabitForDate);

  const today = getLocalDateKey();
  const dueHabits = habits.filter((habit) => !habit.archivedAt && isHabitDueOnDate(habit, today));
  const completedHabitIds = new Set(
    completions
      .filter((completion) => completion.completedOn === today)
      .map((completion) => completion.habitId)
  );
  const completedToday = dueHabits.filter((habit) =>
    isCompletedToday(habit, completedHabitIds, today)
  ).length;

  const toggleCompletion = async (habit: Habit) => {
    if (isCompletedToday(habit, completedHabitIds, today)) {
      await uncompleteHabitForDate(habit.id, today);
    } else {
      await completeHabitForDate(habit.id, today);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-slate-400 uppercase dark:text-slate-500">
            Today&apos;s Habits
          </p>
          <h2 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">
            {completedToday}/{dueHabits.length} complete
          </h2>
        </div>
        <Link
          href="/modules/habit-tracker/edit"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
        >
          <Settings2 size={16} aria-hidden="true" />
          Manage Habits
        </Link>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </p>
      )}

      {dueHabits.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          No habits are scheduled for today.
        </p>
      ) : (
        <div className="space-y-2">
          {dueHabits.map((habit) => {
            const completed = isCompletedToday(habit, completedHabitIds, today);

            return (
              <div
                key={habit.id}
                className="flex items-center gap-3 rounded-lg border border-slate-100 px-3 py-3 dark:border-slate-800"
              >
                <button
                  type="button"
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${completed ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 text-transparent dark:border-slate-600"}`}
                  onClick={() => toggleCompletion(habit)}
                  aria-label={
                    completed ? `Mark ${habit.title} incomplete` : `Complete ${habit.title}`
                  }
                  aria-pressed={completed}
                >
                  <Check size={15} aria-hidden="true" />
                </button>

                <p
                  className={`truncate text-sm font-medium ${completed ? "text-slate-400 line-through" : "text-slate-800 dark:text-slate-100"}`}
                >
                  {habit.title}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
