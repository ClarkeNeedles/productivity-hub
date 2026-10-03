import { create } from "zustand";
import { ADD_MODULE_METRICS } from "@/config/add-module";
import { useModulesStore } from "@/store/modules-store";

interface AddModuleState {
  activeMetricIds: string[];
  // Queries the active shell store to see what keys are already placed
  getEnabledModuleIds: () => string[];
  setActiveMetricIds: (metricIds: string[]) => void;
}

export const useAddModuleStore = create<AddModuleState>((set) => ({
  activeMetricIds: ADD_MODULE_METRICS.map((metric) => metric.id),

  // Leverages cross-store evaluation to read the structural shell state directly
  getEnabledModuleIds: () => {
    return useModulesStore.getState().activeModules.map((m) => m.id);
  },

  setActiveMetricIds: (metricIds) => set({ activeMetricIds: metricIds }),
}));
