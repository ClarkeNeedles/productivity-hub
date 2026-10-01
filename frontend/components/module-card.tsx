"use client";

import { Ellipsis, GripVertical, Settings2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useModulesStore } from "@/store/modules-store";
import { AddModuleModule } from "@/modules/add-module";

// Fallback utility item instantiated exactly once to handle the static add module view blueprint
const addModuleUtility = new AddModuleModule();

type ModuleCardProps = {
  moduleId: string;
  onOpen: (moduleId: string) => void;
};

export default function ModuleCard({ 
  moduleId, 
  onOpen, 
}: ModuleCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Fetch freshest module instance from store, or fall back to utility singleton
  const module = useModulesStore((state) => 
    moduleId === "add-module" ? addModuleUtility : state.getActiveModule(moduleId)
  );
  const removeModule = useModulesStore((state) => state.removeModule);

  // Guard safety fallback check if the module was asynchronously unmounted
  if (!module) return null;

  return (
    <article
      className="group relative min-h-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow,ring-color] hover:border-blue-400 hover:shadow-md hover:ring-2 hover:ring-blue-400/20 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:ring-blue-500/20"
      onMouseLeave={() => setMenuOpen(false)}
    >
      {module.card.showTitle && (
        <div className="w-full text-start mt-4 mb-2 ml-4">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 line-clamp-1 pr-8">
            {module.title}
          </h3>
        </div>
      )}

      <button
        type="button"
        className="flex flex-1 w-full flex-col justify-center items-center text-center text-slate-500 dark:text-slate-400 focus:outline-none cursor-pointer my-auto static after:absolute after:inset-0 after:rounded-2xl after:z-0"
        onClick={() => onOpen(moduleId)}
      >
        {module.card.render(module)}
      </button>

      {module.card.showOptions && (
        <div className="absolute end-3 top-3">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-500 shadow-sm hover:text-slate-900 dark:bg-slate-950/90 dark:text-slate-400 dark:hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              setMenuOpen((current) => !current);
            }}
            aria-label={`Open ${module.title} options`}
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
