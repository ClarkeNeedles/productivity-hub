"use client";

import { createContext, useRef, useContext, useEffect, type ReactNode } from 'react'
import { useStore } from 'zustand'

// Import all module store creators
import { createStreakStore, type StreakStore } from '@/stores/streak-counter-store'
import { createModulesStore, type ModulesStore } from '@/stores/modules-store'
import { createMetricsStore, type MetricsStore } from '@/stores/metrics-store'

interface ModulesStores {
  streakStore: ReturnType<typeof createStreakStore>
  modulesStore: ReturnType<typeof createModulesStore>
  metricsStore: ReturnType<typeof createMetricsStore>
}

const ModulesStoreContext = createContext<ModulesStores | undefined>(undefined)

export const ModulesStoreProvider = ({ children, userId }: { children: ReactNode; userId: string }) => {
  const storesRef = useRef<ModulesStores>(null)

  if (!storesRef.current) {
    // Instantiate all module stores simultaneously on mount
    storesRef.current = {
      streakStore: createStreakStore(),
      modulesStore: createModulesStore(),
      metricsStore: createMetricsStore(),
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
export const useStreakCounterStore = <T,>(selector: (store: StreakStore) => T): T => {
  const context = useContext(ModulesStoreContext)
  if (!context) 
    throw new Error('useModulesStreak must be used within ModulesStoreProvider')

  return useStore(context.streakStore, selector)
}

export const useModulesStore = <T,>(selector: (store: ModulesStore) => T): T => {
  const context = useContext(ModulesStoreContext)
  if (!context) 
    throw new Error('useModulesStreak must be used within ModulesStoreProvider')

  return useStore(context.modulesStore, selector)
}

export const useMetricsStore = <T,>(selector: (store: MetricsStore) => T): T => {
  const context = useContext(ModulesStoreContext)
  if (!context) 
    throw new Error('useModulesStreak must be used within ModulesStoreProvider')

  return useStore(context.metricsStore, selector)
}
