"use client";

import { createContext, useRef, useContext, useEffect, type ReactNode } from 'react'
import { useStore } from 'zustand'

// Import all module store creators
import { createStreakStore, type StreakStore } from '@/stores/streak-counter-store'

interface ModulesStores {
  streakStore: ReturnType<typeof createStreakStore>
}

const ModulesStoreContext = createContext<ModulesStores | undefined>(undefined)

export const ModulesStoreProvider = ({ children, userId }: { children: ReactNode; userId: string }) => {
  const storesRef = useRef<ModulesStores>(null)

  if (!storesRef.current) {
    // Instantiate all module stores simultaneously on mount
    storesRef.current = {
      streakStore: createStreakStore(),
    }
  }

  // Automate hydration for all modules right here on startup
  useEffect(() => {
    if (userId && storesRef.current) {
      storesRef.current.streakStore.getState().fetchData(userId)
    }
  }, [userId])

  return (
    <ModulesStoreContext.Provider value={storesRef.current}>
      {children}
    </ModulesStoreContext.Provider>
  )
}

// Create scoped hooks so components can tap into exactly what they need
export const useModulesStreak = <T,>(selector: (store: StreakStore) => T): T => {
  const context = useContext(ModulesStoreContext)
  if (!context) 
    throw new Error('useModulesStreak must be used within ModulesStoreProvider')

  return useStore(context.streakStore, selector)
}
