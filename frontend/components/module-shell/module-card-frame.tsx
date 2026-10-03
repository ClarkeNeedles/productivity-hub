"use client";

import { Ellipsis, GripVertical, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { MetricSlots } from "@/components/module-shell/metric-slots";
import type { BaseModule } from "@/types/base-module";
import type { BaseModuleMetric } from "@/types/base-module-metric";

type ModuleCardFrameProps = {
  moduleInstance: BaseModule;
  metrics: readonly BaseModuleMetric[];
  onOpen: () => void;
  onRemove?: () => void;
  showOptions?: boolean;
};

export function ModuleCardFrame({
  moduleInstance,
  metrics,
  onOpen,
  onRemove,
  showOptions = true,
}: ModuleCardFrameProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const optionsVisible = showOptions && moduleInstance.card.showOptions && onRemove;

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
        onClick={onOpen}
      >
        <MetricSlots metrics={metrics} maxMetrics={moduleInstance.card.maxMetrics} />
      </button>

      {optionsVisible && (
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
                onClick={() => {
                  onRemove();
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
