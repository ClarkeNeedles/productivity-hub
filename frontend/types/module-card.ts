import type { ReactNode } from "react"
import type { DashboardWidget } from "@/types/dashboard-widget";

export abstract class ModuleCard {
  constructor(
    private readonly _showOptionsMenu: boolean = true, 
    private readonly _showModuleTitle: boolean = true,
    private _activeStats: DashboardWidget[] = [],
  ) {}

  public get showOptionsMenu(): boolean { return this._showOptionsMenu; }
  public get showModuleTitle(): boolean { return this._showModuleTitle; }
  public get activeStats(): DashboardWidget[] { return this._activeStats; }

  // Max of 2 stats displayed simultaneously
  public set activeStats(stats: DashboardWidget[]) {
    if (stats.length > 2) {
      throw new Error(
        "UI Constraint Violation: A ModuleCard can display a maximum of 2 stats simultaneously to avoid visual clutter."
      );
    }
    this._activeStats = stats;
  }

  // Hooks into the module setup sequence to define initial core operational tracking stats.
  abstract initializeDefaultStats(): DashboardWidget[];
  // Provides the custom inner layout template/micro-variant specific to this card's operational scope.
  abstract render(): ReactNode;
}
