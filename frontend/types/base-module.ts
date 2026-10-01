import type { BaseModuleCard } from "@/types/base-module-card";
import type { BaseModulePage } from "@/types/base-module-page";
import type { BaseModuleSettingsPage } from "@/types/base-module-settings-page";

export abstract class BaseModule<
  TCard extends BaseModuleCard = BaseModuleCard,
  TPage extends BaseModulePage = BaseModulePage,
  TSettings extends BaseModuleSettingsPage | null = BaseModuleSettingsPage | null
> {
  protected constructor(
    private readonly _id: string,
    private readonly _title: string,
    private readonly _card: TCard,
    private readonly _page: TPage,
    private readonly _settings: TSettings = null as unknown as TSettings
  ) {}

  public get id(): string { return this._id; }
  public get title(): string { return this._title; }
  public get card(): TCard { return this._card; }
  public get page(): TPage { return this._page; }
  public get settings(): TSettings { return this._settings; }
}
