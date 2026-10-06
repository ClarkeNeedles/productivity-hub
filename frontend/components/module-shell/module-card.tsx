"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { ModuleCardFrame } from "@/components/module-shell/module-card-frame";
import { useModulesStore } from "@/store/modules";
import { useMetricsStore } from "@/store/metrics";
import { ModuleId } from "@/config/modules";
import { AVAILABLE_MODULE_METRICS } from "@/config/metrics";

type ModuleCardProps = {
  moduleId: ModuleId;
  onOpen: (moduleId: ModuleId) => void;
};

export default function ModuleCard({ moduleId, onOpen }: ModuleCardProps) {
  const moduleInstance = useModulesStore((state) =>
    state.activeModules.find((m) => m.id === moduleId)
  );
  const activeMetricIds = useMetricsStore(
    useShallow((state) => state.activeModuleMetricIds[moduleId] || [])
  );

  const removeModule = useModulesStore((state) => state.removeModule);

  const activeMetrics = useMemo(() => {
    return (AVAILABLE_MODULE_METRICS[moduleId] || [])
      .filter((metric) => activeMetricIds.includes(metric.id));
  }, [activeMetricIds, moduleId]);


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
