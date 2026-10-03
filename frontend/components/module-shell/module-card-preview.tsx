"use client";

import { ModuleCardFrame } from "@/components/module-shell/module-card-frame";
import type { BaseModule } from "@/types/base-module";
import type { BaseModuleMetric } from "@/types/base-module-metric";

type ModuleCardPreviewProps = {
  moduleInstance: BaseModule;
  metrics?: readonly BaseModuleMetric[];
  onSelect: () => void;
};

export default function ModuleCardPreview({
  moduleInstance,
  metrics = [],
  onSelect,
}: ModuleCardPreviewProps) {
  return (
    <div className="space-y-3">
      <ModuleCardFrame
        moduleInstance={moduleInstance}
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
