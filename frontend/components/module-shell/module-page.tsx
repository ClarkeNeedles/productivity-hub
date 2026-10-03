"use client";

import { useModulesStore } from "@/store/modules-store";
import { AddModuleModule } from "@/modules/add-module/add-module";

// Permanent static memory singleton to handle the full catalog blueprint interface
const addModuleUtility = new AddModuleModule();

type ModulePageProps = {
  moduleId: string;
};

export default function ModulePage({ moduleId }: ModulePageProps) {
  // Fetch freshest module instance from store, or fall back to utility singleton
  const module = useModulesStore((state) =>
    moduleId === "add-module" ? addModuleUtility : state.getActiveModule(moduleId)
  );

  // Guard safety fallback check if the module was unmounted while open
  if (!module) return null;

  // Resolve optional secondary layout content elements cleanly
  const secondaryContent = module.page.renderSecondaryUtilities(module);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <header className="border-b border-slate-100 pb-5 dark:border-slate-800/60">
        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {module.page.pageSubtitle}
          </p>
          <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {module.title}
          </h2>
        </div>
      </header>

      <main className="min-h-[400px] w-full">{module.page.renderContentArea(module)}</main>

      {secondaryContent && (
        <footer className="mt-12 border-t border-slate-100 pt-6 dark:border-slate-800/60">
          {secondaryContent}
        </footer>
      )}
    </div>
  );
}
