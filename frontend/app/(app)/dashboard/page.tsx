const quickStarts = [
  {
    title: "Build your workspace",
    detail: "Add modules that match the way you work.",
    action: "Browse modules",
  },
  {
    title: "Capture an idea",
    detail: "Create a simple space for notes, tasks, and plans.",
    action: "Create a module",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome / Header Section */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-medium text-blue-600 dark:text-blue-400">
            Wednesday, September 23
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Good morning, Chris.
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Here is a calm place to start your day.
          </p>
        </div>
        <button className="w-fit rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700">
          + Add module
        </button>
      </section>

      {/* Workspace Status & Focus Section */}
      <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Workspace Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Your workspace
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                A clear view of what comes next.
              </h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              Ready
            </span>
          </div>

          {/* Workspace Chart Bar Graph */}
          <div className="mt-10 flex h-32 items-end gap-2 rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
            {[34, 52, 42, 68, 58, 82, 72, 96, 76, 88, 100, 92].map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t bg-blue-500/80"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        {/* Focus Card */}
        <div className="rounded-2xl bg-blue-600 p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm font-medium text-blue-100">Focus for today</p>
          <h2 className="mt-3 text-2xl font-semibold">Start with one useful thing.</h2>
          <p className="mt-3 text-sm leading-6 text-blue-100">
            Your dashboard is intentionally quiet for now. Add the tools you need as your workflow
            takes shape.
          </p>
          <button className="mt-8 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-50">
            Explore modules
          </button>
        </div>
      </section>

      {/* Quick Start List Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quick start</h2>
          <span className="text-sm text-slate-400">2 suggestions</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {quickStarts.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {item.detail}
              </p>
              <button className="mt-5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">
                {item.action} →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
