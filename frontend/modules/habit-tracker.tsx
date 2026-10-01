import { ReactNode } from "react";
import { BaseModule } from "@/types/base-module";
import { BaseModuleCard } from "@/types/base-module-card";
import { BaseModulePage } from "@/types/base-module-page";
import { BaseModuleSettingsPage } from "@/types/base-module-settings-page";
import type { BaseModuleMetric } from "@/types/base-module-metric";

class HabitTrackerCard extends BaseModuleCard {
  constructor() {
    super(true, true);
  }

  public initializeDefaultMetrics(): BaseModuleMetric[] {
    return [];
  }

  public render(module: BaseModule<any, any, any>): ReactNode {
    return;
  }
}

class HabitTrackerPage extends BaseModulePage {
  constructor() {
    super();
  }

  public renderContentArea(module: BaseModule<any, any, any>): ReactNode {
    return <p className="mt-3 text-slate-500 dark:text-slate-400">{ module.title }</p>;
  }

  public renderSecondaryUtilities(module: BaseModule<any, any, any>): ReactNode {
    return null;
  }
}

class HabitTrackerSettings extends BaseModuleSettingsPage {
  constructor() {
    super(0.5);
  }

  public renderSecondaryUtilities(): ReactNode { return null; }
  public renderModuleCardConfigSection(): ReactNode { 
    return <p className="text-sm text-slate-500">Card configurations coming soon.</p>; 
  }
  public renderModulePageConfigSection(): ReactNode { 
    return <p className="text-sm text-slate-500">Workspace customizers coming soon.</p>; 
  }
}

export class HabitTrackerModule extends BaseModule<HabitTrackerCard, HabitTrackerPage, HabitTrackerSettings> {
  constructor(id: string, title: string) {
    super(
      id,
      title,
      new HabitTrackerCard(),
      new HabitTrackerPage(),
      new HabitTrackerSettings()
    );
  }
}
