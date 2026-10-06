"use client";

import { useMemo } from "react";
import { ModuleCardFrame } from "@/components/module-shell/module-card-frame";
import type { BaseModuleMetric } from "@/types/base-module-metric";
import { MODULE_LIST } from "@/config/add-module";
import { DEFAULT_MODULE_METRICS, AVAILABLE_MODULE_METRICS} from "@/config/metrics";
import { ModuleId } from "@/config/modules";

type ModuleCardPreviewProps = {
  moduleId: ModuleId;
  onSelect: () => void;
};

export default function ModuleCardPreview({
  moduleId,
  onSelect,
}: ModuleCardPreviewProps) {
  const defaultMetricIds = DEFAULT_MODULE_METRICS[moduleId];
  const defaultMetrics = useMemo(() => {
    return (AVAILABLE_MODULE_METRICS[moduleId])
      .filter((metric) => defaultMetricIds.includes(metric.id));
  }, [defaultMetricIds, moduleId]);
  
  return (
    <div className="space-y-3">
      <ModuleCardFrame
        moduleInstance={MODULE_LIST.find((module) => module.id === moduleId)!.instantiate()}
        metrics={defaultMetrics}
        onOpen={onSelect}
        showOptions={false}
      />
      <p className="text-center text-sm font-semibold text-blue-600 dark:text-blue-400">
        Select module
      </p>
    </div>
  );
}
