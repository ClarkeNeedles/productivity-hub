import { ReactNode } from "react";
import { BaseModule } from "@/types/base-module";
import { ModuleCard } from "@/types/module-card";
import { ModulePage } from "@/types/module-page";
import { ModuleSettingsPage } from "@/types/module-settings-page";
import type { ModuleMetric } from "@/types/module-metric";

class HabitTrackerCard extends ModuleCard {
  constructor() {
    super(true, true);
  }

  public initializeDefaultMetrics(): ModuleMetric[] {
    return [];
  }

  public render(module: BaseModule<any, any, any>): ReactNode {
    return;
  }
}

class HabitTrackerPage extends ModulePage {
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

class HabitTrackerSettings extends ModuleSettingsPage {
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
