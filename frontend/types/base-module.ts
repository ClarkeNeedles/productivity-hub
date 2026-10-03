import type { BaseModuleCard } from "@/types/base-module-card";
import type { BaseModulePage } from "@/types/base-module-page";
import type { BaseModuleSettingsPage } from "@/types/base-module-settings-page";

export abstract class BaseModule {
  protected constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly card: BaseModuleCard,
    public readonly page: BaseModulePage,
    public readonly settings: BaseModuleSettingsPage | null = null
  ) {}
}
