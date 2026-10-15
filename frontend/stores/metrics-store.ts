import { createStore } from "zustand";
import { DEFAULT_MODULE_METRICS, MetricId } from "@/configs/metrics-config";
import { ModuleId } from "@/configs/modules-config";

export interface MetricsStateProps {
  activeModuleMetricIds: Record<ModuleId, MetricId[]>; // Keyed by ModuleId  
}

export interface MetricsActions {
  setActiveModuleMetricIds: (moduleId: ModuleId, metricIds: MetricId[]) => void;
}

export type MetricsStore = MetricsStateProps & MetricsActions;

// Create a function that constructs the store instance on-demand
export const createMetricsStore = (initProps: Partial<MetricsStateProps> = {}) => {
  return createStore<MetricsStore>((set) => ({
    // Default metrics are assigned here
    activeModuleMetricIds: DEFAULT_MODULE_METRICS,
    ...initProps, // Allows passing initial hydration data from Server Components

    setActiveModuleMetricIds: (moduleId, metricIds) =>
      set((state) => ({
        activeModuleMetricIds: {
          ...state.activeModuleMetricIds,
          [moduleId]: metricIds, // Safely sets or overrides selections for that ID
        },
      })),
  }));  
};
