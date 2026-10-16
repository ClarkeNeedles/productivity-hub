import { createStore } from 'zustand';
import { createClient } from '@/utils/supabase/client';

export interface StreakStateProps {
  userId: string | null;
  currentStreak: number;
  bestStreak: number;
  streakStartedAt: string | null;
  resetHistory: string[];
  error: string | null;
}

export interface StreakActions {
  fetchStreak: () => Promise<void>;
  resetStreak: () => Promise<void>;
}

export type StreakStore = StreakStateProps & StreakActions;

const supabase = createClient();
const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

// Create a function that constructs the store instance on-demand
export const createStreakStore = (initProps: Partial<StreakStateProps> = {}) => {
  return createStore<StreakStore>((set, get) => ({
    userId: null,
    currentStreak: 0,
    bestStreak: 0,
    streakStartedAt: null,
    resetHistory: [],
    error: null,
    ...initProps, // Allows passing initial hydration data from Server Components

    // Called automatically on app startup
    fetchStreak: async () => {
      const { userId } = get();
      if (!userId) return;

      const { data, error } = await supabase
        .from('user_module_data')
        .select('state')
        .eq('user_id', userId)
        .eq('module_id', 'streak-counter')
        .single();

      if (error && error.code !== 'PGRST116') {
        set({ error: error.message });
        return;
      }

      const nowIso = new Date().toISOString();

      if (data?.state) {
        type PersistedStreakState = {
          best_streak?: number;
          streak_started_at?: string;
          reset_history?: string[];
        };

        let dbState: PersistedStreakState;

        try {
          dbState = (
            typeof data.state === "string" ? JSON.parse(data.state) : data.state
          ) as PersistedStreakState;
        } catch {
          set({ error: "Stored streak data is not valid JSON." });
          return;
        }

        // Calculate streak based on previous reset
        const startedAt = dbState.streak_started_at ?? nowIso;
        const nowMs = new Date().getTime();
        const startMs = new Date(startedAt).getTime();
        const computedStreak = Math.floor((nowMs - startMs) / TWENTY_FOUR_HOURS_MS);

        const previousBest = dbState.best_streak ?? 0;
        const newBest = computedStreak > previousBest ? computedStreak : previousBest;

        set({ 
          currentStreak: computedStreak, 
          bestStreak: newBest, 
          streakStartedAt: startedAt,
          resetHistory: dbState.reset_history ?? [],
        });

        // If your best streak changed because time advanced, update the DB silently
        if (newBest > previousBest) {
          await supabase.from('user_module_data').upsert({
            user_id: userId,
            module_id: 'streak-counter',
            state: { ...dbState, best_streak: newBest },
            updated_at: nowIso
          });
        }
      } else {
        // First-time initialization setup if no row exists
        set({ currentStreak: 0, bestStreak: 0, streakStartedAt: nowIso });
        await supabase.from('user_module_data').upsert({
          user_id: userId,
          module_id: 'streak-counter',
          state: { best_streak: 0, streak_started_at: nowIso, reset_history: [] },
          updated_at: nowIso
        });
      }
    },

    resetStreak: async () => {
      const { userId, resetHistory, bestStreak } = get();
      if (!userId) return;

      const nowIso = new Date().toISOString();
      const updatedHistory = [nowIso, ...resetHistory];

      // Resetting sets the anchor point to right now
      set({ currentStreak: 0, streakStartedAt: nowIso, resetHistory: updatedHistory });

      await supabase.from('user_module_data').upsert({
        user_id: userId,
        module_id: 'streak-counter',
        state: { 
          best_streak: bestStreak,
          streak_started_at: nowIso,
          reset_history: updatedHistory
        },
        updated_at: nowIso
      });
    }
  }));
};
