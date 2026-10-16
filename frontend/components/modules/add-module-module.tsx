import { ReactNode } from "react";
import { BaseModule } from "@/types/base-module";
import { BaseModuleCard } from "@/types/base-module-card";
import type { BaseModulePage } from "@/types/base-module-page";
import ModuleCardPreview from "@/components/module-shell/module-card-preview";
import { MODULE_IDS } from "@/configs/modules-config";
import { useModulesStore } from "@/providers/modules-store-provider";
import { useShallow } from "zustand/react/shallow";
import { ADD_MODULE_ID, type AddModuleId } from "@/configs/modules-config";

class AddModulePage implements BaseModulePage {
  public renderContentArea(): ReactNode {
    const activeModuleIds = useModulesStore(useShallow((state) => state.activeModuleIds));

    const availableModuleIds = MODULE_IDS.filter((id) => !activeModuleIds.includes(id));

    const addModule = useModulesStore((state) => state.addModule);

    if (availableModuleIds.length === 0) {
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
          {availableModuleIds.map((id) => {
            return <ModuleCardPreview key={id} moduleId={id} onSelect={() => addModule(id)} />;
          })}
        </div>
      </div>
    );
  }
}

export class AddModuleModule extends BaseModule<AddModuleId> {
  constructor() {
    super(ADD_MODULE_ID, "Add Module", new BaseModuleCard(false, false), new AddModulePage());
  }
}
