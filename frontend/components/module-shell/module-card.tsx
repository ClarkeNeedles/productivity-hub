"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { ModuleCardFrame } from "@/components/module-shell/module-card-frame";
import { useModulesStore } from "@/providers/modules-store-provider";
import { useMetricsStore } from "@/providers/modules-store-provider";
import type { ModuleId } from "@/configs/modules-config";
import { MODULE_LIST } from "@/configs/add-module-config";
import { AVAILABLE_MODULE_METRICS } from "@/configs/metrics-config";

type ModuleCardProps = {
  moduleId: ModuleId;
  onOpen: (moduleId: ModuleId) => void;
};

export default function ModuleCard({ moduleId, onOpen }: ModuleCardProps) {
  const moduleInstance = MODULE_LIST[moduleId];
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
