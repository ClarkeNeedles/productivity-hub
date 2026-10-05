"use client";

import { ModuleCardFrame } from "@/components/module-shell/module-card-frame";
import type { BaseModuleMetric } from "@/types/base-module-metric";
import { MODULE_LIST } from "@/config/add-module";

type ModuleCardPreviewProps = {
  moduleId: string;
  metrics?: readonly BaseModuleMetric[];
  onSelect: () => void;
};

export default function ModuleCardPreview({
  moduleId,
  metrics = [],
  onSelect,
}: ModuleCardPreviewProps) {
  return (
    <div className="space-y-3">
      <ModuleCardFrame
        moduleInstance={MODULE_LIST.find((module) => module.id === moduleId)!.instantiate()}
        metrics={metrics}
        onOpen={onSelect}
        showOptions={false}
      />
      <p className="text-center text-sm font-semibold text-blue-600 dark:text-blue-400">
        Select module
      </p>
    </div>
  );
}
