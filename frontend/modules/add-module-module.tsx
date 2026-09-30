import { ReactNode } from "react";
import { Blocks, Plus } from "lucide-react";
import { BaseModule } from "./base-module"; // Assuming you have a base-module file mapping these together
import { ModuleCard } from "./module-card";
import { ModulePage, type ModuleBreadcrumb, type ModuleAction } from "./module-page";
import { ModuleSettingsPage } from "./module-settings-page";
import type { DashboardWidget } from "./dashboard-widget";

export interface CustomModuleActions {
  onAddModule: (module: BaseModule<any, any, any>) => void;
}

const moduleCatalog = [
  {
    id: "habit-tracker",
    title: "Habit Tracker",
    description: "Keep a steady view of daily habits.",
  },
  { 
    id: "task-engine", 
    title: "Task Engine", 
    description: "Turn plans into a focused task list." 
  },
];

// ==========================================
// ADD MODULE SUB-COMPONENTS
// ==========================================

class AddModuleCard extends ModuleCard {
  constructor() {
    // Context menu visible = false, Title visible = false
    super(false, false);
  }

  public initializeDefaultTelemetry(): DashboardWidget[] {
    return [];
  }

  public render(): ReactNode {
    return (
      <div className="flex h-full min-h-64 w-full flex-col items-center justify-center p-6 text-center text-slate-500 dark:text-slate-400">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <Plus size={24} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className="mt-4 text-sm font-semibold">Add module</span>
      </div>
    );
  }
}

class AddModulePage extends ModulePage {
  constructor(private actionsContext: CustomModuleActions) {
    super();
  }

  public renderHeader(breadcrumbs: ModuleBreadcrumb[], actions: ModuleAction[]): ReactNode {
    return (
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <Blocks size={24} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Module library</p>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Choose a module
          </h2>
        </div>
      </div>
    );
  }

  public renderContentArea(): ReactNode {
    return (
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {moduleCatalog.map((module) => (
          <button
            key={module.id}
            type="button"
            className="rounded-xl border border-slate-200 bg-white p-5 text-start transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-blue-500/10"
            onClick={() =>
              this.actionsContext.onAddModule(
                new PlaceholderModule(module.id, module.title, module.description)
              )
            }
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">{module.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {module.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <Plus size={16} aria-hidden="true" />
              Add module
            </span>
          </button>
        ))}
      </div>
    );
  }

  public renderSecondaryUtilities(): ReactNode {
    return null;
  }
}

class AddModuleSettings extends ModuleSettingsPage {
  constructor() {
    // Handled validation requirement rule (must be between 0 and 1)
    super(0.0); 
  }

  public renderHeader(): ReactNode { return null; }
  public renderSecondaryUtilities(): ReactNode { return null; }
  public renderModuleCardConfigSection(): ReactNode { 
    return <p className="text-sm text-slate-500">System modules cannot scale dashboard layouts.</p>; 
  }
  public renderModulePageConfigSection(): ReactNode { 
    return <p className="text-sm text-slate-500">No layout settings available.</p>; 
  }
}

// ==========================================
// MAIN CONTAINER ORCHESTRATION
// ==========================================

export class AddModuleModule extends BaseModule<AddModuleCard, AddModulePage, AddModuleSettings> {
  constructor(actionsContext: CustomModuleActions) {
    super(
      "add-module",
      "Add Module",
      new AddModuleCard(),
      new AddModulePage(actionsContext),
      new AddModuleSettings()
    );
  }
}
