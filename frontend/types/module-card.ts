import type { ReactNode } from "react"
import type { DashboardWidget } from "@/types/dashboard-widget";

export abstract class ModuleCard {
  public showOptionsMenu: boolean;
  public showModuleTitle: boolean;
  
  private _activeStats: DashboardWidget[] = [];

  constructor(showOptionsMenu = true, showModuleTitle = true) {
    this.showOptionsMenu = showOptionsMenu;
    this.showModuleTitle = showModuleTitle;
  }

  public get activeStats(): DashboardWidget[] {
    return this._activeStats;
  }

  // Max of 2 stats displayed simultaneously
  public set activeStats(stats: DashboardWidget[]) {
    if (stats.length > 2) {
      throw new Error("UI Constraint Violation: A ModuleCard can display a maximum of 2 stats simultaneously to avoid visual clutter.");
    }
    this._activeStats = stats;
  }

  // Extensible hook for default operational telemetry hook
  public abstract initializeDefaultTelemetry(): DashboardWidget[];

  // Method invoked by your automatic flex-grid renderer container
  public abstract render(): ReactNode;
}
