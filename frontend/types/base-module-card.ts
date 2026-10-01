import type { ReactNode } from "react"
import type { BaseModuleMetric } from "@/types/base-module-metric";
import type { BaseModule } from "@/types/base-module";

export abstract class BaseModuleCard {
  constructor(
    private readonly _showOptions: boolean = true, 
    private readonly _showTitle: boolean = true,
    private _activeStats: BaseModuleMetric[] = [],
  ) {}

  public get showOptions(): boolean { return this._showOptions; }
  public get showTitle(): boolean { return this._showTitle; }
  public get activeStats(): BaseModuleMetric[] { return this._activeStats; }

  // Max of 2 stats displayed simultaneously
  public set activeStats(stats: BaseModuleMetric[]) {
    if (stats.length > 2) {
      throw new Error(
        "UI Constraint Violation: A ModuleCard can display a maximum of 2 stats simultaneously to avoid visual clutter."
      );
    }
    this._activeStats = stats;
  }

  // Hooks into the module setup sequence to define initial core operational tracking stats.
  abstract initializeDefaultMetrics(): BaseModuleMetric[];
  // Provides the custom inner layout template/micro-variant specific to this card's operational scope.
  // Inject the parent module context directly into the render signature
  abstract render(module: BaseModule<any, any, any>): ReactNode;
}
