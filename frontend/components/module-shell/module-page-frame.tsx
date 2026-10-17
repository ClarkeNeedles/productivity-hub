import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

type ModulePageFrameProps = {
  title: string;
  backHref: string;
  backLabel: string;
  children: ReactNode;
};

export function ModulePageFrame({
  title,
  backHref,
  backLabel,
  children,
}: ModulePageFrameProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-6">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
      >
        <ArrowLeft size={17} aria-hidden="true" />
        {backLabel}
      </Link>

      <header className="border-b border-slate-100 pb-5 dark:border-slate-800/60">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
      </header>

      <main className="min-h-[400px] w-full">{children}</main>
    </div>
  );
}
