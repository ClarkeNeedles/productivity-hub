"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarNavProps = {
  expanded: boolean;
  mobileOpen: boolean;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: "▦" },
  { label: "Modules", href: "/modules", icon: "◈" },
  { label: "Settings", href: "/settings", icon: "⚙" },
];

export default function SidebarNav({
  expanded,
  hovered,
  mobileOpen: isMobileOpen,
  onMouseEnter,
  onMouseLeave,
}: SidebarNavProps) {
  const pathname = usePathname();
  const showLabels = expanded || hovered || isMobileOpen;

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white px-5 text-slate-900 transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950 dark:text-white ${
        showLabels ? "w-72" : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`flex py-8 ${showLabels ? "justify-start" : "justify-center"}`}>
        <Link href="/dashboard" className="flex items-center gap-3" aria-label="Productivity Hub home">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">P</span>
          {showLabels && <span className="text-lg font-semibold tracking-tight">Productivity Hub</span>}
        </Link>
      </div>

      <nav className="flex-1" aria-label="Main navigation">
        <p className={`mb-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 ${showLabels ? "" : "text-center"}`}>{showLabels ? "Menu" : "···"}</p>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href} className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"} ${showLabels ? "" : "justify-center"}`}>
                  <span className={`w-5 text-center text-lg leading-none ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} aria-hidden="true">{item.icon}</span>
                  {showLabels && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {showLabels && <div className="mb-5 rounded-xl bg-slate-50 p-4 dark:bg-white/5"><p className="text-sm font-semibold text-slate-800 dark:text-white">Make space for what matters.</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">Your workspace is ready to take shape.</p></div>}
    </aside>
  );
}
