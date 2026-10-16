"use client";

import { addModuleModule } from "@/components/modules/add-module-module";
import { MODULE_LIST } from "@/configs/add-module-config";
import { ADD_MODULE_ID, type FocusedModuleId } from "@/configs/modules-config";

type ModulePageProps = {
  moduleId: FocusedModuleId;
};

export default function ModulePage({ moduleId }: ModulePageProps) {
  const module = moduleId === ADD_MODULE_ID ? addModuleModule : MODULE_LIST[moduleId];

  // Guard safety fallback check if the module was unmounted while open
  if (!module) return null;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <header className="border-b border-slate-100 pb-5 dark:border-slate-800/60">
        <div>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {module.title}
          </h2>
        </div>
      </header>

      <main className="min-h-[400px] w-full">
        <module.page module={module} />
      </main>
    </div>
  );
}
