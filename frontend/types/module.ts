import type { ModuleCard } from "./module-card";
import type { ModulePage } from "./module-page";
import type { ModuleSettingsPage } from "./module-settings-page";

export type ModuleOptions = {
  sourceModuleToken: string;
  timestampUTC: string;
  scoringContributionFactor: number;
  localizedMetrics: {
    label: string;
    numericalValue: number;
    unitString: string;
  }[];
  textSummaryExport: string;
};

export abstract class BaseModule<
  TCard extends ModuleCard = ModuleCard,
  TPage extends ModulePage = ModulePage,
  TSettings extends ModuleSettingsPage = ModuleSettingsPage
> {
  private readonly _moduleId: string;
  private readonly _instanceId: string;
  private readonly _moduleTitle: string;
  private readonly _moduleCard: TCard;
  private readonly _modulePage: TPage;
  private readonly _moduleSettingsPage: TSettings;

  protected constructor(
    moduleId: string,
    moduleTitle: string,
    moduleCard: TCard,
    modulePage: TPage,
    moduleSettingsPage: TSettings
  ) {
    this._moduleId = moduleId;
    this._instanceId = crypto.randomUUID();
    this._moduleTitle = moduleTitle;
    this._moduleCard = moduleCard;
    this._modulePage = modulePage;
    this._moduleSettingsPage = moduleSettingsPage;
  }

  public get moduleId(): string { return this._moduleId; }
  public get instanceId(): string { return this._instanceId; }
  public get moduleTitle(): string { return this._moduleTitle; }
  public get moduleCard(): TCard { return this._moduleCard; }
  public get modulePage(): TPage { return this._modulePage; }
  public get moduleSettingsPage(): TSettings { return this._moduleSettingsPage; }
}
