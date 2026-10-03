"use client";

import { Ellipsis, GripVertical, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { ADD_MODULE_METRICS } from "@/config/add-module";
import { MetricSlots } from "@/components/metric-slots";
import { useModulesStore } from "@/store/modules-store";
import { useAddModuleStore } from "@/store/add-module-store";
import { AddModuleModule } from "@/modules/add-module";

// Fallback utility item instantiated exactly once to handle the static add module view blueprint
const addModuleUtility = new AddModuleModule();

type ModuleCardProps = {
  moduleId: string;
  onOpen: (moduleId: string) => void;
};

export default function ModuleCard({ moduleId, onOpen }: ModuleCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Fetch freshest module instance from store, or fall back to utility singleton
  const moduleInstance = useModulesStore((state) =>
    moduleId === "add-module" ? addModuleUtility : state.getActiveModule(moduleId)
  );
  const removeModule = useModulesStore((state) => state.removeModule);
  const activeMetricIds = useAddModuleStore((state) =>
    moduleId === "add-module" ? state.activeMetricIds : []
  );
  const activeMetrics = ADD_MODULE_METRICS.filter((metric) => activeMetricIds.includes(metric.id));

  // Guard safety fallback check if the module was asynchronously unmounted
  if (!moduleInstance) return null;

  return (
    <article
      className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow,ring-color] hover:border-blue-400 hover:shadow-md hover:ring-2 hover:ring-blue-400/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:ring-blue-500/20"
      onMouseLeave={() => setMenuOpen(false)}
    >
      {moduleInstance.card.showTitle && (
        <div className="absolute start-4 end-12 top-4 z-10 text-start">
          <h3 className="line-clamp-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
            {moduleInstance.title}
          </h3>
        </div>
      )}

      <button
        type="button"
        className="static flex min-h-0 w-full flex-1 cursor-pointer flex-col items-center justify-center text-center text-slate-500 after:absolute after:inset-0 after:z-0 after:rounded-2xl focus:outline-none dark:text-slate-400"
        onClick={() => onOpen(moduleId)}
      >
        <MetricSlots metrics={activeMetrics} maxMetrics={moduleInstance.card.maxMetrics} />
      </button>

      {moduleInstance.card.showOptions && (
        <div className="absolute end-3 top-3">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-500 shadow-sm hover:text-slate-900 dark:bg-slate-950/90 dark:text-slate-400 dark:hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen((current) => !current);
            }}
            aria-label={`Open ${moduleInstance.title} options`}
            aria-expanded={menuOpen}
          >
            <Ellipsis size={18} aria-hidden="true" />
          </button>

          {menuOpen && (
            <div className="absolute end-0 top-10 z-10 w-36 rounded-lg border border-slate-200 bg-white p-1 text-sm shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                onClick={(event) => {
                  event.stopPropagation();
                  setMenuOpen(false);
                  // Trigger settings modal hook callbacks here safely down the line
                }}
              >
                <Settings2 size={15} aria-hidden="true" />
                Settings
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                onClick={() => setMenuOpen(false)}
              >
                <GripVertical size={15} aria-hidden="true" />
                Move
              </button>

              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-start text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
                onClick={(event) => {
                  event.stopPropagation();
                  removeModule(moduleId);
                  setMenuOpen(false);
                }}
              >
                <Trash2 size={15} aria-hidden="true" />
                Remove
              </button>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
