"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import ModuleCard from "@/components/modules/module-card";
import { AddModuleModule } from "@/components/modules/add-module-module";
import { BaseModule } from "@/types/module";

export default function ModulesPage() {
  const [modules, setModules] = useState<BaseModule[]>([]);
  const [focusedModule, setFocusedModule] = useState<BaseModule | null>(null);
  const addModule = new AddModuleModule();

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
          {focusedModule.renderFocusView({ onAddModule: addModuleFromCatalog })}
        </div>
      </section>
    );
  }

  function addModuleFromCatalog(module: BaseModule) {
    setModules((current) => [...current, module]);
    setFocusedModule(null);
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
            key={module.instanceId}
            module={module}
            onOpen={setFocusedModule}
            onRemove={(moduleToRemove) =>
              setModules((current) =>
                current.filter((item) => item.instanceId !== moduleToRemove.instanceId)
              )
            }
          />
        ))}
        <ModuleCard module={addModule} onOpen={setFocusedModule} />
      </div>
    </section>
  );
}
