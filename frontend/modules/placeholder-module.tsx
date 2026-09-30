import { ReactNode } from "react";
import { BaseModule } from "@/types/base-module";
import { ModuleCard } from "@/types/module-card";
import { ModulePage } from "@/types/module-page";
import { ModuleSettingsPage } from "@/types/module-settings-page";
import type { DashboardWidget } from "@/types/dashboard-widget";

class PlaceholderCard extends ModuleCard {
  constructor(private title: string, private desc: string) {
    super(true, true);
  }

  public initializeDefaultStats(): DashboardWidget[] {
    return [];
  }

  public render(): ReactNode {
    return (
      <div className="flex h-full min-h-64 w-full flex-col justify-between p-6">
        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Module preview</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            {this.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {this.desc}
          </p>
        </div>
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Open module</span>
      </div>
    );
  }
}

class PlaceholderPage extends ModulePage {
  constructor(private title: string, private desc: string) {
    super("test");
  }

  public renderContentArea(): ReactNode {
    return <p className="mt-3 text-slate-500 dark:text-slate-400">{this.desc}</p>;
  }

  public renderSecondaryUtilities(): ReactNode {
    return null;
  }
}

class PlaceholderSettings extends ModuleSettingsPage {
  constructor() {
    super(0.5); // Default setup placeholder value
  }

  public renderSecondaryUtilities(): ReactNode { return null; }
  public renderModuleCardConfigSection(): ReactNode { 
    return <p className="text-sm text-slate-500">Card configurations coming soon.</p>; 
  }
  public renderModulePageConfigSection(): ReactNode { 
    return <p className="text-sm text-slate-500">Workspace customizers coming soon.</p>; 
  }
}

export class PlaceholderModule extends BaseModule<PlaceholderCard, PlaceholderPage, PlaceholderSettings> {
  constructor(moduleId: string, moduleTitle: string, description: string) {
    super(
      moduleId,
      moduleTitle,
      new PlaceholderCard(moduleTitle, description),
      new PlaceholderPage(moduleTitle, description),
      new PlaceholderSettings()
    );
  }
}
