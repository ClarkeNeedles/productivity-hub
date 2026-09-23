"use client";

import Link from "next/link";
import { useState } from "react";
import SidebarNav from "./sidebar-nav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const showExpanded = expanded || hovered;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SidebarNav expanded={expanded} mobileOpen={mobileOpen} hovered={hovered} onMouseEnter={() => !expanded && setHovered(true)} onMouseLeave={() => setHovered(false)} />
      {mobileOpen && <button className="fixed inset-0 z-40 bg-slate-950/40 xl:hidden" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}

      <div className={`min-h-screen transition-all duration-300 ${showExpanded ? "xl:ml-72" : "xl:ml-[90px]"}`}>
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-950/95">
          <div className="flex items-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-white/5" onClick={() => { if (window.innerWidth < 1280) setMobileOpen(!mobileOpen); else setExpanded(!expanded); }} aria-label="Toggle sidebar"><span className="text-xl" aria-hidden="true">{mobileOpen ? "×" : "☰"}</span></button>
            <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex"><Link href="/dashboard" className="hover:text-slate-600 dark:hover:text-slate-200">Workspace</Link><span>/</span><span className="text-slate-700 dark:text-slate-200">Overview</span></div>
          </div>
          <div className="flex items-center gap-3"><button className="hidden rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-500 sm:block dark:border-slate-800 dark:text-slate-400">⌘ K</button><div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">CW</div></div>
        </header>
        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}