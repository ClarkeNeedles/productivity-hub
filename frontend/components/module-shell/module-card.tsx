"use client";

import { ADD_MODULE_METRICS } from "@/config/add-module";
import { ModuleCardFrame } from "@/components/module-shell/module-card-frame";
import { useModulesStore } from "@/store/modules";
import { useAddModuleStore } from "@/store/add-module";
import { AddModuleModule } from "@/modules/add-module/add-module";

// Fallback utility item instantiated exactly once to handle the static add module view blueprint
const addModuleUtility = new AddModuleModule();

type ModuleCardProps = {
  moduleId: string;
  onOpen: (moduleId: string) => void;
};

export default function ModuleCard({ moduleId, onOpen }: ModuleCardProps) {
  // Fetch freshest module instance from store, or fall back to utility singleton
  const moduleInstance = useModulesStore((state) =>
    moduleId === "add-module" ? addModuleUtility : state.getActiveModule(moduleId)
  );
  const removeModule = useModulesStore((state) => state.removeModule);
  const activeMetricIds = useAddModuleStore((state) =>
    moduleId === "add-module" ? state.activeMetricIds : []
  );
  const activeMetrics = ADD_MODULE_METRICS.filter((metric) => activeMetricIds.includes(metric.id));

  // Guard safety fallback check if the module was asynchronously unmounted
  if (!moduleInstance) return null;

  return (
    <ModuleCardFrame
      moduleInstance={moduleInstance}
      metrics={activeMetrics}
      onOpen={() => onOpen(moduleId)}
      onRemove={() => removeModule(moduleId)}
    />
  );
}
