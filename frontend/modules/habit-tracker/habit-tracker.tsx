import { ReactNode } from "react";
import { BaseModule } from "@/types/base-module";
import { BaseModuleCard } from "@/types/base-module-card";
import type { BaseModulePage } from "@/types/base-module-page";
import { BaseModuleSettingsPage } from "@/types/base-module-settings-page";

class HabitTrackerPage implements BaseModulePage {
  public renderContentArea(module: BaseModule): ReactNode {
    return <p className="mt-3 text-slate-500 dark:text-slate-400">{module.title}</p>;
  }
}

class HabitTrackerSettings extends BaseModuleSettingsPage {
  constructor() {
    super(0.5);
  }

  public renderModuleCardConfigSection(): ReactNode {
    return <p className="text-sm text-slate-500">Card configurations coming soon.</p>;
  }
  public renderModulePageConfigSection(): ReactNode {
    return <p className="text-sm text-slate-500">Workspace customizers coming soon.</p>;
  }
}

export class HabitTrackerModule extends BaseModule {
  constructor(id: string, title: string) {
    super(
      id,
      title,
      new BaseModuleCard(),
      new HabitTrackerPage(),
      new HabitTrackerSettings(),
    );
  }
}
