import type { ModuleId } from "@/configs/modules-config";
import type { ModuleCardConfig } from "@/types/module-card-config";
import type { ModulePageComponent } from "@/types/module-page-component";

export type ModuleDefinition<TId extends string = ModuleId> = {
  readonly id: TId;
  readonly title: string;
  readonly card: ModuleCardConfig;
  readonly page: ModulePageComponent;
  readonly settingsPage: ModulePageComponent | null;
};
