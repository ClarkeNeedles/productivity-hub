"use client";

import Link from "next/link";
import { ArrowLeft, Save, Trash2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useHabitTrackerStore } from "@/providers/modules-store-provider";
import { getLocalDateKey, type Habit } from "@/stores/habit-tracker-store";

type HabitFormValues = {
  title: string;
  repeatEveryDays: string;
  startsOn: string;
};

function createEmptyForm(): HabitFormValues {
  return {
    title: "",
    repeatEveryDays: "1",
    startsOn: getLocalDateKey(),
  };
}

function habitToForm(habit: Habit): HabitFormValues {
  return {
    title: habit.title,
    repeatEveryDays: String(habit.repeatEveryDays),
    startsOn: habit.startsOn,
  };
}

export function HabitManagementPage() {
  const habits = useHabitTrackerStore((state) => state.habits);
  const error = useHabitTrackerStore((state) => state.error);
  const createHabit = useHabitTrackerStore((state) => state.createHabit);
  const updateHabit = useHabitTrackerStore((state) => state.updateHabit);
  const archiveHabit = useHabitTrackerStore((state) => state.archiveHabit);

  const [newHabit, setNewHabit] = useState<HabitFormValues>(createEmptyForm);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [editingHabit, setEditingHabit] = useState<HabitFormValues>(createEmptyForm);

  const activeHabits = habits.filter((habit) => !habit.archivedAt);

  const submitNewHabit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await createHabit({
      title: newHabit.title,
      repeatEveryDays: Number(newHabit.repeatEveryDays),
      startsOn: newHabit.startsOn,
    });
    setNewHabit(createEmptyForm());
  };

  const beginEditing = (habit: Habit) => {
    setEditingHabitId(habit.id);
    setEditingHabit(habitToForm(habit));
  };

  const saveHabit = async (event: FormEvent<HTMLFormElement>, habitId: string) => {
    event.preventDefault();

    await updateHabit(habitId, {
      title: editingHabit.title,
      repeatEveryDays: Number(editingHabit.repeatEveryDays),
      startsOn: editingHabit.startsOn,
    });
    setEditingHabitId(null);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <header className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800/60">
        <div>
          <Link
            href="/modules/habit-tracker"
            className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Back to habits
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Manage Habits
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Set when each habit starts and how often it repeats.
          </p>
        </div>
      </header>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </p>
      )}

      <form
        className="grid gap-3 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:grid-cols-[minmax(0,1fr)_9rem_10rem_auto] dark:border-slate-800/60 dark:bg-slate-900/40"
        onSubmit={submitNewHabit}
      >
        <label className="sr-only" htmlFor="new-habit-title">
          Habit title
        </label>
        <input
          id="new-habit-title"
          value={newHabit.title}
          onChange={(event) => setNewHabit({ ...newHabit, title: event.target.value })}
          placeholder="Habit title"
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 ring-blue-500 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950/40 dark:text-white"
          required
        />
        <label className="sr-only" htmlFor="new-habit-repeat">
          Repeat every number of days
        </label>
        <input
          id="new-habit-repeat"
          type="number"
          min="1"
          value={newHabit.repeatEveryDays}
          onChange={(event) => setNewHabit({ ...newHabit, repeatEveryDays: event.target.value })}
          className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 ring-blue-500 outline-none focus:ring-2 dark:border-slate-700 dark:bg-slate-950/40 dark:text-white"
          aria-label="Repeat every number of days"
          required
        />
        <label className="sr-only" htmlFor="new-habit-starts-on">
          Starts on
        </label>
        <input
          id="new-habit-starts-on"
          type="date"
          value={newHabit.startsOn}
          onChange={(event) => setNewHabit({ ...newHabit, startsOn: event.target.value })}
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
          activeHabits.map((habit) =>
            editingHabitId === habit.id ? (
              <form
                key={habit.id}
                className="grid gap-3 rounded-2xl border border-blue-200 bg-blue-50/60 p-5 sm:grid-cols-[minmax(0,1fr)_9rem_10rem_auto_auto] dark:border-blue-500/40 dark:bg-blue-500/10"
                onSubmit={(event) => saveHabit(event, habit.id)}
              >
                <label className="sr-only" htmlFor={`edit-title-${habit.id}`}>
                  Habit title
                </label>
                <input
                  id={`edit-title-${habit.id}`}
                  value={editingHabit.title}
                  onChange={(event) =>
                    setEditingHabit({ ...editingHabit, title: event.target.value })
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  required
                />
                <input
                  type="number"
                  min="1"
                  value={editingHabit.repeatEveryDays}
                  onChange={(event) =>
                    setEditingHabit({ ...editingHabit, repeatEveryDays: event.target.value })
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  aria-label="Repeat every number of days"
                  required
                />
                <input
                  type="date"
                  value={editingHabit.startsOn}
                  onChange={(event) =>
                    setEditingHabit({ ...editingHabit, startsOn: event.target.value })
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                  aria-label="Starts on"
                  required
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-300 dark:hover:bg-blue-500/20"
                  aria-label={`Save ${habit.title}`}
                >
                  <Save size={17} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
                  onClick={() => setEditingHabitId(null)}
                  aria-label={`Cancel editing ${habit.title}`}
                >
                  <X size={17} aria-hidden="true" />
                </button>
              </form>
            ) : (
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
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  onClick={() => beginEditing(habit)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                  onClick={() => archiveHabit(habit.id)}
                >
                  <Trash2 size={16} aria-hidden="true" />
                  Delete
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
