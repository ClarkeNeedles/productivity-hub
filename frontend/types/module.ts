import type { ReactNode } from "react";

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

export type ModuleActions = {
  onAddModule: (module: BaseModule) => void;
};

export abstract class BaseModule {
  readonly moduleId: string;
  readonly instanceId: string;
  readonly moduleTitle: string;
  readonly showOptionsMenu: boolean;

  protected constructor(moduleId: string, moduleTitle: string, showOptionsMenu = true) {
    this.moduleId = moduleId;
    this.instanceId = crypto.randomUUID();
    this.moduleTitle = moduleTitle;
    this.showOptionsMenu = showOptionsMenu;
  }

  abstract renderCompactPreview(): ReactNode;

  abstract renderFocusView(actions: ModuleActions): ReactNode;

  abstract exposeOptions(): ModuleOptions;
}
