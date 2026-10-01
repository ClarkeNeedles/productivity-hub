import { create } from "zustand";
import { useModulesStore } from "./modules-store";

interface AddModuleState {
  // Queries the active shell store to see what keys are already placed
  getEnabledModuleIds: () => string[];
}

export const useAddModuleStore = create<AddModuleState>(() => ({
  // Leverages cross-store evaluation to read the structural shell state directly
  getEnabledModuleIds: () => {
    return useModulesStore.getState().activeModules.map((m) => m.id);
  },
}));
