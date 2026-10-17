import { createStore } from "zustand";
import { createClient } from "@/utils/supabase/client";
import { HABIT_TRACKER_MODULE_ID } from "@/configs/modules-config";

export type Habit = {
  id: string;
  title: string;
  repeatEveryDays: number;
  startsOn: string;
  createdAt: string;
  archivedAt: string | null;
};

export type HabitCompletion = {
  id: string;
  habitId: string;
  completedOn: string;
  completedAt: string;
};

export type CreateHabitInput = {
  title: string;
  repeatEveryDays: number;
  startsOn: string;
};

export type UpdateHabitInput = Partial<CreateHabitInput>;

export interface HabitTrackerStateProps {
  userId: string | null;
  habits: Habit[];
  completions: HabitCompletion[];
  error: string | null;
}

export interface HabitTrackerActions {
  fetchHabits: () => Promise<void>;
  createHabit: (input: CreateHabitInput) => Promise<void>;
  updateHabit: (habitId: string, input: UpdateHabitInput) => Promise<void>;
  archiveHabit: (habitId: string) => Promise<void>;
  completeHabitForDate: (habitId: string, completedOn: string) => Promise<void>;
  uncompleteHabitForDate: (habitId: string, completedOn: string) => Promise<void>;
}

export type HabitTrackerStore = HabitTrackerStateProps & HabitTrackerActions;

type PersistedHabitState = {
  habits: Habit[];
  completions: HabitCompletion[];
};

type StoredHabit = Partial<Habit> & {
  id: string;
  intervalDays?: number;
  startDate?: string;
};

const supabase = createClient();

function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDateFromKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function isHabitDueOnDate(habit: Habit, dateKey: string): boolean {
  const startDate = getDateFromKey(habit.startsOn);
  const targetDate = getDateFromKey(dateKey);
  const elapsedDays = Math.floor(
    (targetDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );

  return elapsedDays >= 0 && elapsedDays % habit.repeatEveryDays === 0;
}

function validateHabitInput(input: CreateHabitInput): CreateHabitInput {
  const title = input.title.trim();

  if (!title) throw new Error("Habit title is required.");
  if (!Number.isInteger(input.repeatEveryDays) || input.repeatEveryDays < 1) {
    throw new Error("Habit interval must be a whole number greater than zero.");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.startsOn)) {
    throw new Error("Habit start date must use the YYYY-MM-DD format.");
  }

  return { ...input, title };
}

async function persistHabitState(
  userId: string | null,
  habits: Habit[],
  completions: HabitCompletion[]
) {
  if (!userId) return;

  const { error } = await supabase.from("user_module_data").upsert({
    user_id: userId,
    module_id: HABIT_TRACKER_MODULE_ID,
    state: {
      habits,
      completions,
    } satisfies PersistedHabitState,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
}

export const createHabitTrackerStore = (initProps: Partial<HabitTrackerStateProps> = {}) => {
  return createStore<HabitTrackerStore>((set, get) => ({
    userId: null,
    habits: [],
    completions: [],
    error: null,
    ...initProps,

    fetchHabits: async () => {
      const { userId } = get();
      if (!userId) return;

      const { data, error } = await supabase
        .from("user_module_data")
        .select("state")
        .eq("user_id", userId)
        .eq("module_id", HABIT_TRACKER_MODULE_ID)
        .maybeSingle();

      if (error) {
        set({ error: error.message });
        return;
      }

      if (!data?.state) return;

      try {
        const state = (
          typeof data.state === "string" ? JSON.parse(data.state) : data.state
        ) as Partial<PersistedHabitState> & {
          habits?: StoredHabit[];
        };

        const habits: Habit[] = (state.habits ?? []).map((habit) => ({
          id: habit.id,
          title: habit.title ?? "Untitled habit",
          repeatEveryDays: habit.repeatEveryDays ?? 1,
          startsOn: habit.startsOn ?? getLocalDateKey(),
          createdAt: habit.createdAt ?? new Date().toISOString(),
          archivedAt: habit.archivedAt ?? null,
        }));

        set({
          habits,
          completions: state.completions ?? [],
          error: null,
        });
      } catch {
        set({ error: "Stored habit data is not valid JSON." });
      }
    },

    createHabit: async (input) => {
      try {
        const validatedInput = validateHabitInput(input);
        const habit: Habit = {
          id: crypto.randomUUID(),
          ...validatedInput,
          createdAt: new Date().toISOString(),
          archivedAt: null,
        };
        const habits = [...get().habits, habit];

        set({ habits, error: null });
        await persistHabitState(get().userId, habits, get().completions);
      } catch (error) {
        set({ error: error instanceof Error ? error.message : "Unable to create habit." });
      }
    },

    updateHabit: async (habitId, input) => {
      try {
        const currentHabit = get().habits.find((habit) => habit.id === habitId);
        if (!currentHabit) throw new Error("Habit could not be found.");

        const validatedInput = validateHabitInput({
          title: input.title ?? currentHabit.title,
          repeatEveryDays: input.repeatEveryDays ?? currentHabit.repeatEveryDays,
          startsOn: input.startsOn ?? currentHabit.startsOn,
        });
        const habits = get().habits.map((habit) =>
          habit.id === habitId ? { ...habit, ...validatedInput } : habit
        );

        set({ habits, error: null });
        await persistHabitState(get().userId, habits, get().completions);
      } catch (error) {
        set({ error: error instanceof Error ? error.message : "Unable to update habit." });
      }
    },

    archiveHabit: async (habitId) => {
      try {
        const habits = get().habits.map((habit) =>
          habit.id === habitId ? { ...habit, archivedAt: new Date().toISOString() } : habit
        );

        set({ habits, error: null });
        await persistHabitState(get().userId, habits, get().completions);
      } catch (error) {
        set({ error: error instanceof Error ? error.message : "Unable to delete habit." });
      }
    },

    completeHabitForDate: async (habitId, completedOn) => {
      try {
        const habit = get().habits.find((item) => item.id === habitId);
        if (!habit || habit.archivedAt) throw new Error("Habit could not be found.");
        if (!isHabitDueOnDate(habit, completedOn)) {
          throw new Error("This habit is not scheduled for that date.");
        }

        const alreadyCompleted = get().completions.some(
          (completion) => completion.habitId === habitId && completion.completedOn === completedOn
        );
        if (alreadyCompleted) return;

        const completions = [
          ...get().completions,
          {
            id: crypto.randomUUID(),
            habitId,
            completedOn,
            completedAt: new Date().toISOString(),
          },
        ];

        set({ completions, error: null });
        await persistHabitState(get().userId, get().habits, completions);
      } catch (error) {
        set({ error: error instanceof Error ? error.message : "Unable to complete habit." });
      }
    },

    uncompleteHabitForDate: async (habitId, completedOn) => {
      try {
        const completions = get().completions.filter(
          (completion) =>
            !(completion.habitId === habitId && completion.completedOn === completedOn)
        );

        set({ completions, error: null });
        await persistHabitState(get().userId, get().habits, completions);
      } catch (error) {
        set({ error: error instanceof Error ? error.message : "Unable to undo completion." });
      }
    },
  }));
};

export { getLocalDateKey, isHabitDueOnDate };
