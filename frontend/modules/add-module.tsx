import { ReactNode } from "react";
import { Plus } from "lucide-react";
import { BaseModule } from "@/types/base-module";
import { ModuleCard } from "@/types/module-card";
import { ModulePage } from "@/types/module-page";
import type { ModuleMetric } from "@/types/module-metric";
import { MODULE_LIST } from "@/config/add-module"
import { useModulesStore } from "@/store/modules-store";
import { useAddModuleStore } from "@/store/add-module-store";

class AddModuleCard extends ModuleCard {
  constructor() {
    super(false, false);
  }

  public initializeDefaultMetrics(): ModuleMetric[] {
    return [];
  }

  public render(): ReactNode {
    return (
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <Plus size={24} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Add module
        </span>
      </div>
    );
  }
}

class AddModulePage extends ModulePage {
  public renderContentArea(): ReactNode {
    const activeIds = useAddModuleStore.getState().getEnabledModuleIds();
    const availableModules = MODULE_LIST.filter(
      (catalogItem) => !activeIds.includes(catalogItem.id)
    );

    if (availableModules.length === 0) {
      return (
        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          All available modules have been added to your dashboard.
        </div>
      );
    }

    return (
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {availableModules.map((module) => (
          <button
            key={module.id}
            type="button"
            className="rounded-xl border border-slate-200 bg-white p-5 text-start transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-blue-500/10"
            onClick={() => {
              // Call the factory handler to spawn the correct unique class
              useModulesStore.getState().addModule(module.instantiate(module.id, module.title));
            }}
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">{module.title}</h3>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <Plus size={16} aria-hidden="true" />
              Add module
            </span>
          </button>
        ))}
      </div>
    );
  }

  public renderSecondaryUtilities(): ReactNode {
    return null;
  }
}

export class AddModuleModule extends BaseModule<AddModuleCard, AddModulePage, null> {
  constructor() {
    super(
      "add-module",
      "Add Module",
      new AddModuleCard(),
      new AddModulePage(),
    );
  }
}
