import { createStore } from 'zustand';
import { createClient } from '@/utils/supabase/client';

export interface StreakStateProps {
  currentStreak: number;
  bestStreak: number;
  isLoading: boolean;
  error: string | null;
}

export interface StreakActions {
  fetchData: (userId: string) => Promise<void>;
  incrementStreak: (userId: string) => Promise<void>;
}

export type StreakStore = StreakStateProps & StreakActions;

const supabase = createClient();

// Create a function that constructs the store instance on-demand
export const createStreakStore = (initProps: Partial<StreakStateProps> = {}) => {
  return createStore<StreakStore>((set, get) => ({
    currentStreak: 0,
    bestStreak: 0,
    isLoading: false,
    error: null,
    ...initProps, // Allows passing initial hydration data from Server Components

    fetchData: async (userId) => {
      set({ isLoading: true });
      const { data, error } = await supabase
        .from('user_module_data')
        .select('state')
        .eq('user_id', userId)
        .eq('module_id', 'streak-counter')
        .single();

      if (error) {
        // If no row exists yet, initialize it gracefully with 0 values
        if (error.code === 'PGRST116') { 
          set({ currentStreak: 0, bestStreak: 0, isLoading: false });
        } else {
          set({ error: error.message, isLoading: false });
        }
      } else if (data?.state) {
        // Cast the database return shape cleanly
        const dbState = data.state as { current_streak?: number; best_streak?: number };
        
        set({ 
          currentStreak: dbState.current_streak ?? 0, 
          bestStreak: dbState.best_streak ?? 0, 
          isLoading: false 
        });
      }
    },

    incrementStreak: async (userId) => {
      const previousCurrent = get().currentStreak;
      const newCurrent = previousCurrent + 1;
      const previousBest = get().bestStreak;
      const newBest = newCurrent > previousBest ? newCurrent : previousBest;

      set({ currentStreak: newCurrent, bestStreak: newBest });

      const { error } = await supabase
        .from('user_module_data')
        .upsert({
          user_id: userId,
          module_id: 'streak-counter',
          state: { current_streak: newCurrent, best_streak: newBest },
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Failed to sync with DB:', error.message);
        set({ 
          currentStreak: previousCurrent, 
          bestStreak: previousBest, 
          error: 'Failed to sync with cloud. Progress reverted.' 
        });
      }
    }
  }));
};
