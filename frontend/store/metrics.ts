import { create } from "zustand";
import { DEFAULT_MODULE_METRICS, MetricId } from "@/config/metrics";
import { ModuleId } from "@/config/modules";

interface MetricsState {
  activeModuleMetricIds: Record<ModuleId, MetricId[]>; // Keyed by ModuleId
  
  setActiveModuleMetricIds: (moduleId: ModuleId, metricIds: MetricId[]) => void;
}

export const useMetricsStore = create<MetricsState>((set, get) => ({
  // Default metrics are assigned here
  activeModuleMetricIds: DEFAULT_MODULE_METRICS,

  setActiveModuleMetricIds: (moduleId, metricIds) =>
    set((state) => ({
      activeModuleMetricIds: {
        ...state.activeModuleMetricIds,
        [moduleId]: metricIds, // Safely sets or overrides selections for that ID
      },
    })),
}));
