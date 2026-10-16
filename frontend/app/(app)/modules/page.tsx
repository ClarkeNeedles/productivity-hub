"use client";

import { ArrowLeft } from "lucide-react";
import ModuleCard from "@/components/module-shell/module-card";
import { ModuleCardFrame } from "@/components/module-shell/module-card-frame";
import ModulePage from "@/components/module-shell/module-page";
import { AddModuleMetric } from "@/components/metrics/add-module-metric";
import { addModuleModule } from "@/components/modules/add-module-module";
import { ADD_MODULE_ID } from "@/configs/modules-config";
import { useModulesStore } from "@/providers/modules-store-provider";

export default function ModulesPage() {
  const activeModuleIds = useModulesStore((state) => state.activeModuleIds);
  const focusedModuleId = useModulesStore((state) => state.focusedModuleId);
  const setFocusedModuleId = useModulesStore((state) => state.setFocusedModuleId);

  if (focusedModuleId) {
    return (
      <section className="min-h-[calc(100vh-4rem)]">
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          onClick={() => setFocusedModuleId(null)}
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to modules
        </button>

        <div className="mt-10">
          <ModulePage moduleId={focusedModuleId} />
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Modules
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {activeModuleIds.map((moduleId) => (
          <ModuleCard key={moduleId} moduleId={moduleId} onOpen={setFocusedModuleId} />
        ))}
        <ModuleCardFrame
          moduleInstance={addModuleModule}
          metrics={[
            {
              id: ADD_MODULE_ID,
              name: "Add Module",
              renderMetric: AddModuleMetric,
            },
          ]}
          onOpen={() => setFocusedModuleId(ADD_MODULE_ID)}
          showOptions={false}
        />
      </div>
    </section>
  );
}
