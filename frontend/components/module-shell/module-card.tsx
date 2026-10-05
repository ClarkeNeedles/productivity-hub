"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { ADD_MODULE_METRICS } from "@/config/add-module";
import { ModuleCardFrame } from "@/components/module-shell/module-card-frame";
import { useModulesStore } from "@/store/modules";
import { useAddModuleStore } from "@/store/add-module";

type ModuleCardProps = {
  moduleId: string;
  onOpen: (moduleId: string) => void;
};

export default function ModuleCard({ moduleId, onOpen }: ModuleCardProps) {
  const activeModuleIds = useModulesStore(
    useShallow((state) => state.getActiveModuleIds())
  );
  
  const removeModule = useModulesStore((state) => state.removeModule);
  const getActiveModule = useModulesStore((state) => state.getActiveModule);

  const activeMetricIds = useAddModuleStore(
    useShallow((state) => (moduleId === "add-module" ? state.activeMetricIds : []))
  );

  // Simply look up the module directly from the store (including 'add-module')
  const moduleInstance = useMemo(() => {
    if (!activeModuleIds.includes(moduleId)) return undefined;
    return getActiveModule(moduleId);
  }, [activeModuleIds, moduleId, getActiveModule]);

  const activeMetrics = useMemo(() => {
    return ADD_MODULE_METRICS.filter((metric) => activeMetricIds.includes(metric.id));
  }, [activeMetricIds]);

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
