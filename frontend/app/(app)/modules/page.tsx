"use client";

import { ArrowLeft } from "lucide-react";
import ModuleCard from "@/components/module-card";
import ModulePage from "@/components/module-page"
import { AddModuleModule } from "@/modules/add-module";
import { useModulesStore } from "@/store/modules-store";

const addModuleUtility = new AddModuleModule();

export default function ModulesPage() {
  const activeModules = useModulesStore((state) => state.activeModules);
  const focusedModule = useModulesStore((state) => state.focusedModule);
  const removeModule = useModulesStore((state) => state.removeModule);
  const setFocusedModule = useModulesStore((state) => state.setFocusedModule)

  if (focusedModule) {
    return (
      <section className="min-h-[calc(100vh-4rem)]">
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          onClick={() => setFocusedModule(null)}
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to modules
        </button>
        
        <div className="mt-10">
          <ModulePage module={focusedModule} />
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
          <ModuleCard
            key={module.id}
            module={module}
            onOpen={setFocusedModule}
            onRemove={(moduleToRemove) => removeModule(moduleToRemove.id)}
          />
        ))}
        {/* Add module module is always visible at the end of module grid list */}
        <ModuleCard module={addModuleUtility} onOpen={setFocusedModule} />
      </div>
    </section>
  );
}
