import type { ModuleId } from "@/configs/modules-config";
import type { BaseModuleCard } from "@/types/base-module-card";
import type { BaseModulePage } from "@/types/base-module-page";
import type { BaseModuleSettingsPage } from "@/types/base-module-settings-page";

export abstract class BaseModule<TId extends string = ModuleId> {
  protected constructor(
    public readonly id: TId,
    public readonly title: string,
    public readonly card: BaseModuleCard,
    public readonly page: BaseModulePage,
    public readonly settings: BaseModuleSettingsPage | null = null
  ) {}
}
