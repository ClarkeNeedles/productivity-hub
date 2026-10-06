import { Plus } from "lucide-react";

export function AddModuleMetric() {
  return (
    <div className="pointer-events-none flex flex-col items-center justify-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        <Plus size={24} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
        Add module
      </span>
    </div>
  );
}
