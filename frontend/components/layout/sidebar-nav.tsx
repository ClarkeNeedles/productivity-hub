"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blocks, Gauge, Settings } from "lucide-react";

type SidebarNavProps = {
  expanded: boolean;
  mobileOpen: boolean;
  onToggleExpanded: () => void;
  onToggleMobile: () => void;
};

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Modules", href: "/modules", icon: Blocks },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function SidebarNav({
  expanded,
  mobileOpen: isMobileOpen,
  onToggleExpanded,
  onToggleMobile,
}: SidebarNavProps) {
  const pathname = usePathname();
  const showLabels = expanded || isMobileOpen;

  return (
    <>
      <button
        type="button"
        className="fixed start-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg text-slate-500 shadow-sm hover:bg-slate-50 lg:hidden dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-white/5"
        onClick={onToggleMobile}
        aria-label="Open navigation"
        aria-expanded={isMobileOpen}
      >
        <span aria-hidden="true">☰</span>
      </button>

      {isMobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onToggleMobile}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white px-5 text-slate-900 transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950 dark:text-white ${
          showLabels ? "w-72" : "w-[90px]"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div
          className={`flex py-8 ${showLabels ? "items-center justify-between" : "flex-col items-center gap-3"}`}
        >
          <Link href="/dashboard" className="flex items-center gap-3" aria-label="Amelify home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
              A
            </span>
            {showLabels && <span className="text-lg font-semibold tracking-tight">Amelify</span>}
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:flex dark:hover:bg-white/5 dark:hover:text-white"
            onClick={isMobileOpen ? onToggleMobile : onToggleExpanded}
            aria-label={isMobileOpen ? "Close navigation" : "Toggle sidebar"}
            aria-expanded={isMobileOpen || expanded}
          >
            <span aria-hidden="true">{isMobileOpen ? "×" : "☰"}</span>
          </button>
        </div>

        <nav className="flex-1" aria-label="Main navigation">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"} ${showLabels ? "" : "justify-center"}`}
                  >
                    <span
                      className={`w-5 text-center text-lg leading-none ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    {showLabels && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
