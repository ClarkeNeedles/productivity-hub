"use client";

import { ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";
import ModuleCard from "@/components/module-card";
import ModulePage from "@/components/module-page"
import { AddModuleModule } from "@/modules/add-module-module";
import { BaseModule } from "@/types/base-module";

export default function ModulesPage() {
  const [modules, setModules] = useState<BaseModule<any, any, any>[]>([]);
  const [focusedModule, setFocusedModule] = useState<BaseModule<any, any, any> | null>(null);

  // Stabilize utility module instance to avoid instantiation memory leak loops on render
  // useMemo ensures object is created exactly once
  const addModuleUtility = useMemo(() => {
    return new AddModuleModule({ onAddModule: addModuleFromCatalog });
  }, []);

  // Adding module logic for AddModuleModule
  // Adds the module to the list and route user to module list view
  function addModuleFromCatalog(module: BaseModule<any, any, any>) {
    setModules((current) => [...current, module]);
    setFocusedModule(null);
  }

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
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onOpen={setFocusedModule}
            onRemove={(moduleToRemove) =>
              setModules((current) =>
                current.filter((item) => item.id !== moduleToRemove.id)
              )
            }
          />
        ))}
        {/* Add module module is always visible at the end of module grid list */}
        <ModuleCard module={addModuleUtility} onOpen={setFocusedModule} />
      </div>
    </section>
  );
}
