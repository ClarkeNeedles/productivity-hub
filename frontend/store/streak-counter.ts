import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';

interface StreakState {
  currentStreak: number;
  bestStreak: number;
  isLoading: boolean;
  error: string | null;
  
  fetchStreak: (userId: string) => Promise<void>;
  incrementStreak: (userId: string) => Promise<void>;
}

const supabase = createClient();

export const useStreakStore = create<StreakState>((set, get) => ({
  currentStreak: 0,
  bestStreak: 0,
  isLoading: false,
  error: null,

  // Fetch from Database into Zustand
  fetchStreak: async (userId) => {
    set({ isLoading: true });
    const { data, error } = await supabase
      .from('user_module_data')
      .select('state')
      .eq('user_id', userId)
      .eq('module_id', 'streak-counter')
      .single();

    if (error) {
      set({ error: error.message, isLoading: false });
    } else if (data?.state) {
      // Cast the JSONB state safely into your store model
      const state = data.state as { current_streak: number; best_streak: number };
      set({ 
        currentStreak: state.current_streak, 
        bestStreak: state.best_streak, 
        isLoading: false 
      });
    }
  },

  // 2. Optimistic / Immediate Sync Update
  incrementStreak: async (userId) => {
    // Calculate new values locally
    const previousCurrent = get().currentStreak;
    const newCurrent = previousCurrent + 1;
    const previousBest = get().bestStreak;
    const newBest = newCurrent > previousBest ? newCurrent : previousBest;

    // Update the local Model instantly (UI stays lightning fast)
    set({ currentStreak: newCurrent, bestStreak: newBest });

    // Push changes to Supabase in the background (Upsert JSONB)
    const { error } = await supabase
      .from('user_module_data')
      .upsert({
        user_id: userId,
        module_id: 'streak-counter',
        state: { current_streak: newCurrent, best_streak: newBest },
        updated_at: new Date().toISOString()
      });

    // Rollback if the database write fails (Network drop, RLS violation, etc.)
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
