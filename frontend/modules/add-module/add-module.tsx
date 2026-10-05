import { ReactNode } from "react";
import { BaseModule } from "@/types/base-module";
import { BaseModuleCard } from "@/types/base-module-card";
import type { BaseModulePage } from "@/types/base-module-page";
import ModuleCardPreview from "@/components/module-shell/module-card-preview";
import { MODULE_LIST } from "@/config/add-module";
import { useModulesStore } from "@/store/modules";
import { useAddModuleStore } from "@/store/add-module";

class AddModulePage implements BaseModulePage {
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
      <div className="space-y-6">
        <div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select a module to add to your dashboard.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {availableModules.map((catalogItem) => {
            const previewModule = catalogItem.instantiate(catalogItem.id, catalogItem.title);

            return (
              <ModuleCardPreview
                key={catalogItem.id}
                moduleInstance={previewModule}
                onSelect={() => useModulesStore.getState().addModule(previewModule)}
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
