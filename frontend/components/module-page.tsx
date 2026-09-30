"use client";

import type { BaseModule } from "@/types/base-module";

type ModulePageProps = {
  module: BaseModule<any, any, any>;
};

export default function ModulePage({
  module,
}: ModulePageProps) {
  const secondaryContent = module.page.renderSecondaryUtilities();

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      <header className="border-b border-slate-100 pb-5 dark:border-slate-800/60">
        <div>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {module.page.pageSubtitle}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white mt-1">
            {module.title}
          </h2>
        </div>
      </header>

      <main className="min-h-[400px] w-full">
        {module.page.renderContentArea()}
      </main>

      {secondaryContent && (
        <footer className="mt-12 border-t border-slate-100 pt-6 dark:border-slate-800/60">
          {secondaryContent}
        </footer>
      )}
    </div>
  );
}
