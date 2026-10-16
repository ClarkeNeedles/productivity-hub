import type { ReactNode } from "react";
import type { ModuleDefinition } from "@/types/module-definition";
import type { ModulePageProps } from "@/types/module-page-component";
import { BaseModuleSettingsPage } from "@/types/base-module-settings-page";
import { useStreakCounterStore } from "@/providers/modules-store-provider";
import { CurrentStreakMetric } from "@/components/metrics/current-streak-metric";
import { BestStreakMetric } from "@/components/metrics/best-streak-metric";
import { StreakHeatmapMetric } from "@/components/metrics/streak-heatmap-metric";

function StreakCounterPage(_props: ModulePageProps) {
  const resetHistory = useStreakCounterStore((state) => state.resetHistory);
  const resetStreak = useStreakCounterStore((state) => state.resetStreak);

  return (
    <div className="space-y-6 p-1">
      <div>
        <h2 className="text-xl text-slate-500 dark:text-slate-400">
          Monitor your personal streaks and see patterns.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-8 shadow-sm md:col-span-2 dark:border-slate-800/60 dark:bg-slate-900/40">
          <div className="my-8 origin-center scale-150 transform transition-transform duration-300 hover:scale-[1.55]">
            <CurrentStreakMetric />
          </div>

          <div className="mt-4 w-full max-w-sm border-t border-slate-100 pt-8 dark:border-slate-800/80">
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "Are you absolutely sure you want to reset your baseline anchor right now?"
                  )
                ) {
                  resetStreak();
                }
              }}
              className="w-full rounded-xl bg-red-600 py-3 text-sm font-semibold tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-red-500 hover:shadow-red-500/10 active:scale-[0.99]"
            >
              RESET STREAK
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40">
            <BestStreakMetric />
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40">
            <span className="text-[0.68rem] font-bold tracking-[0.15em] text-slate-400 uppercase dark:text-slate-500">
              Number of resets
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-800 dark:text-white">
                {resetHistory.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/40">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Reset Activity Map</h3>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 dark:border-slate-800 dark:bg-slate-950/10">
          <StreakHeatmapMetric resetHistory={resetHistory} />
        </div>
      </div>
    </div>
  );
}

class StreakCounterSettings extends BaseModuleSettingsPage {
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

export const streakCounterModule = {
  id: "streak-counter",
  title: "Streak Counter",
  card: {
    showOptions: true,
    showTitle: true,
    maxMetrics: 2,
  },
  page: StreakCounterPage,
  settings: new StreakCounterSettings(),
} satisfies ModuleDefinition<"streak-counter">;
