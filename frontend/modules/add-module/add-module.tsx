import { ReactNode } from "react";
import { BaseModule } from "@/types/base-module";
import { BaseModuleCard } from "@/types/base-module-card";
import type { BaseModulePage } from "@/types/base-module-page";
import ModuleCardPreview from "@/components/module-shell/module-card-preview";
import { MODULE_LIST } from "@/config/add-module";
import { useModulesStore } from "@/store/modules";
import { useShallow } from 'zustand/react/shallow';

class AddModulePage implements BaseModulePage {
  public renderContentArea(): ReactNode {
    const activeModuleIds = useModulesStore(
      useShallow((state) => state.activeModules.map((module) => module.id))
    );
    const availableModules = MODULE_LIST.filter(
      (availableModule) => !activeModuleIds.includes(availableModule.id)
    );

    if (availableModules.length === 0) {
      return (
        <div className="mt-12 text-center text-sm text-slate-500 dark:text-slate-400">
          All available modules have been added to your dashboard.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select a module to add to your dashboard.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {availableModules.map((availableModule) => {
            return (
              <ModuleCardPreview
                key={availableModule.id}
                moduleId={availableModule.id}
                onSelect={() => useModulesStore.getState().addModule(availableModule.instantiate())}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export class AddModuleModule extends BaseModule {
  constructor() {
    super(
      "add-module",
      "Add Module",
      new BaseModuleCard(false, false),
      new AddModulePage(),
    );
  }
}
