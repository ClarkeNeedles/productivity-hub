"use client";

import { ArrowLeft } from "lucide-react";
import ModuleCard from "@/components/module-shell/module-card";
import ModulePage from "@/components/module-shell/module-page";
import { useModulesStore } from "@/store/modules-store";

export default function ModulesPage() {
  const activeModules = useModulesStore((state) => state.activeModules);
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
        {activeModules.map((module) => (
          <ModuleCard key={module.id} moduleId={module.id} onOpen={setFocusedModuleId} />
        ))}
      </div>
    </section>
  );
}
