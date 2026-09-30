import type { ModuleCard } from "@/types/module-card";
import type { ModulePage } from "@/types/module-page";
import type { ModuleSettingsPage } from "@/types/module-settings-page";

export abstract class BaseModule<
  TCard extends ModuleCard = ModuleCard,
  TPage extends ModulePage = ModulePage,
  TSettings extends ModuleSettingsPage | null = ModuleSettingsPage | null
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
