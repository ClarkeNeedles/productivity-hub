"use client";

import { Save, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { ModuleDefinition } from "@/types/module-definition";
import { HABIT_TRACKER_MODULE_ID } from "@/configs/modules-config";
import { HabitListMetric } from "@/components/metrics/habit-list-metric";
import { useHabitTrackerStore } from "@/providers/modules-store-provider";
import { getLocalDateKey, isHabitDueOnDate, type Habit } from "@/stores/habit-tracker-store";

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

type HabitFormValues = {
  title: string;
  repeatEveryDays: string;
  startsOn: string;
};

const createEmptyHabitForm = (): HabitFormValues => ({
  title: "",
  repeatEveryDays: "1",
  startsOn: getLocalDateKey(),
});

function getHabitFormValues(habit: Habit): HabitFormValues {
  return {
    title: habit.title,
    repeatEveryDays: String(habit.repeatEveryDays),
    startsOn: habit.startsOn,
  };
}

export function HabitTrackerSettingsPage() {
  const habits = useHabitTrackerStore((state) => state.habits);
  const error = useHabitTrackerStore((state) => state.error);
  const createHabit = useHabitTrackerStore((state) => state.createHabit);
  const updateHabit = useHabitTrackerStore((state) => state.updateHabit);
  const archiveHabit = useHabitTrackerStore((state) => state.archiveHabit);
  const [newHabit, setNewHabit] = useState<HabitFormValues>(createEmptyHabitForm);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editingHabit, setEditingHabit] = useState<HabitFormValues>(createEmptyHabitForm);
  const activeHabits = habits.filter((habit) => !habit.archivedAt);

  const submitNewHabit = async (formData: FormData) => {
    await createHabit({
      title: String(formData.get("title") ?? ""),
      repeatEveryDays: Number(formData.get("repeatEveryDays")),
      startsOn: String(formData.get("startsOn") ?? ""),
    });
    setNewHabit(createEmptyHabitForm());
  };

  const saveHabit = async (habitId: string, formData: FormData) => {
    await updateHabit(habitId, {
      title: String(formData.get("title") ?? ""),
      repeatEveryDays: Number(formData.get("repeatEveryDays")),
      startsOn: String(formData.get("startsOn") ?? ""),
    });
    setEditingHabitId(null);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Set when each habit starts and how often it repeats.
      </p>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </p>
      )}

      <form
        className="grid gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:grid-cols-[minmax(0,1fr)_9rem_10rem_auto] dark:border-slate-800/60 dark:bg-slate-900/40"
        action={submitNewHabit}
      >
        <input
          value={newHabit.title}
          name="title"
          onChange={(event) => setNewHabit({ ...newHabit, title: event.target.value })}
          placeholder="Habit title"
          aria-label="Habit title"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 ring-blue-500 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950/40 dark:text-white"
          required
        />
        <input
          type="number"
          min="1"
          value={newHabit.repeatEveryDays}
          name="repeatEveryDays"
          onChange={(event) => setNewHabit({ ...newHabit, repeatEveryDays: event.target.value })}
          aria-label="Repeat every number of days"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 ring-blue-500 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950/40 dark:text-white"
          required
        />
        <input
          type="date"
          value={newHabit.startsOn}
          name="startsOn"
          onChange={(event) => setNewHabit({ ...newHabit, startsOn: event.target.value })}
          aria-label="Starts on"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 ring-blue-500 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950/40 dark:text-white"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Add habit
        </button>
      </form>

      <div className="space-y-3">
        {activeHabits.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            No habits have been created yet.
          </p>
        ) : (
          activeHabits.map((habit) => {
            if (editingHabitId === habit.id) {
              return (
                <form
                  key={habit.id}
                  className="grid gap-3 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 sm:grid-cols-[minmax(0,1fr)_9rem_10rem_auto_auto] dark:border-blue-500/40 dark:bg-blue-500/10"
                  action={(formData) => saveHabit(habit.id, formData)}
                >
                  <input
                    value={editingHabit.title}
                    name="title"
                    onChange={(event) =>
                      setEditingHabit({ ...editingHabit, title: event.target.value })
                    }
                    aria-label={`Edit ${habit.title}`}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    value={editingHabit.repeatEveryDays}
                    name="repeatEveryDays"
                    onChange={(event) =>
                      setEditingHabit({
                        ...editingHabit,
                        repeatEveryDays: event.target.value,
                      })
                    }
                    aria-label="Repeat every number of days"
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    required
                  />
                  <input
                    type="date"
                    value={editingHabit.startsOn}
                    name="startsOn"
                    onChange={(event) =>
                      setEditingHabit({ ...editingHabit, startsOn: event.target.value })
                    }
                    aria-label="Starts on"
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    required
                  />
                  <button type="submit" aria-label={`Save ${habit.title}`}>
                    <Save size={17} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingHabitId(null)}
                    aria-label={`Cancel editing ${habit.title}`}
                  >
                    <X size={17} aria-hidden="true" />
                  </button>
                </form>
              );
            }

            return (
              <div
                key={habit.id}
                className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40"
              >
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold text-slate-900 dark:text-white">
                    {habit.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Every {habit.repeatEveryDays} day{habit.repeatEveryDays === 1 ? "" : "s"} ·
                    starts {habit.startsOn}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingHabitId(habit.id);
                    setEditingHabit(getHabitFormValues(habit));
                  }}
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => archiveHabit(habit.id)}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                >
                  <Trash2 size={16} aria-hidden="true" />
                  Delete
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
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
  settingsPage: HabitTrackerSettingsPage,
} satisfies ModuleDefinition<typeof HABIT_TRACKER_MODULE_ID>;
