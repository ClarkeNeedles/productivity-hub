import { create } from "zustand";
import { ADD_MODULE_METRICS } from "@/config/add-module";

interface AddModuleState {
  activeMetricIds: string[];
  setActiveMetricIds: (metricIds: string[]) => void;
}

export const useAddModuleStore = create<AddModuleState>((set) => ({
  activeMetricIds: ADD_MODULE_METRICS.map((metric) => metric.id),

  setActiveMetricIds: (metricIds) => set({ activeMetricIds: metricIds }),
}));
