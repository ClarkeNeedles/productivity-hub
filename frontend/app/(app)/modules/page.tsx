"use client";

import ModuleCard from "@/components/module-shell/module-card";
import { ModuleCardFrame } from "@/components/module-shell/module-card-frame";
import { AddModuleMetric } from "@/components/metrics/add-module-metric";
import { addModuleModule } from "@/components/modules/add-module-module";
import { ADD_MODULE_ID } from "@/configs/modules-config";
import { useRouter } from "next/navigation";
import { useModulesStore } from "@/providers/modules-store-provider";

export default function ModulesPage() {
  const router = useRouter();
  const activeModuleIds = useModulesStore((state) => state.activeModuleIds);

  return (
    <section className="space-y-8">
      <div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Modules
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {activeModuleIds.map((moduleId) => (
          <ModuleCard
            key={moduleId}
            moduleId={moduleId}
            onOpen={(id) => router.push(`/modules/${id}`)}
          />
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
          onOpen={() => router.push(`/modules/${ADD_MODULE_ID}`)}
          showOptions={false}
        />
      </div>
    </section>
  );
}
