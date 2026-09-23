import { Blocks, Plus } from "lucide-react";
import { BaseModule, type ModuleActions, type ModuleOptions } from "@/types/module";

const moduleCatalog = [
  {
    id: "habit-tracker",
    title: "Habit Tracker",
    description: "Keep a steady view of daily habits.",
  },
  { id: "task-engine", title: "Task Engine", description: "Turn plans into a focused task list." },
];

export class AddModuleModule extends BaseModule {
  constructor() {
    super("add-module", "Add Module", false);
  }

  renderCompactPreview() {
    return (
      <div className="flex h-full min-h-64 w-full flex-col items-center justify-center p-6 text-center text-slate-500 dark:text-slate-400">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
          <Plus size={24} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span className="mt-4 text-sm font-semibold">Add module</span>
      </div>
    );
  }

  renderFocusView({ onAddModule }: ModuleActions) {
    return (
      <div className="mx-auto w-full max-w-3xl">
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

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {moduleCatalog.map((module) => (
            <button
              key={module.id}
              type="button"
              className="rounded-xl border border-slate-200 bg-white p-5 text-start transition-colors hover:border-blue-400 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-blue-500/10"
              onClick={() =>
                onAddModule(new PlaceholderModule(module.id, module.title, module.description))
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
      </div>
    );
  }

  exposeOptions(): ModuleOptions {
    return {
      sourceModuleToken: this.moduleId,
      timestampUTC: new Date().toISOString(),
      scoringContributionFactor: 0,
      localizedMetrics: [],
      textSummaryExport: "The module library is available for adding productivity modules.",
    };
  }
}

class PlaceholderModule extends BaseModule {
  constructor(
    moduleId: string,
    moduleTitle: string,
    private readonly description: string
  ) {
    super(moduleId, moduleTitle);
  }

  renderCompactPreview() {
    return (
      <div className="flex h-full min-h-64 w-full flex-col justify-between p-6">
        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Module preview</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            {this.moduleTitle}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {this.description}
          </p>
        </div>
        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Open module</span>
      </div>
    );
  }

  renderFocusView() {
    return (
      <div>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Module</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">
          {this.moduleTitle}
        </h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400">{this.description}</p>
      </div>
    );
  }

  exposeOptions(): ModuleOptions {
    return {
      sourceModuleToken: this.moduleId,
      timestampUTC: new Date().toISOString(),
      scoringContributionFactor: 0,
      localizedMetrics: [],
      textSummaryExport: this.description,
    };
  }
}
