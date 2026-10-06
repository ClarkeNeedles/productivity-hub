"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blocks, Gauge, Settings, PanelLeftOpen,  PanelLeftClose } from "lucide-react";

type SidebarNavProps = {
  expanded: boolean;
  onToggleExpanded: () => void;
};

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: Gauge },
  { label: "Modules", href: "/modules", icon: Blocks },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function SidebarNav({
  expanded,
  onToggleExpanded,
}: SidebarNavProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)"); // lg is 1024px in Tailwind
    setIsMobile(media.matches);
    
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return (
    <>
      <button
        type="button"
        className="fixed start-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-lg text-slate-500 shadow-sm hover:bg-slate-50 lg:hidden dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-white/5"
        onClick={onToggleExpanded}
        aria-label={expanded ? "Close navigation" : "Open navigation"}
        aria-expanded={expanded}
      >
        <span aria-hidden="true">
          {expanded ? <PanelLeftClose size={20} strokeWidth={1.8} /> : <PanelLeftOpen size={20} strokeWidth={1.8} />}
        </span>
      </button>

      {isMobile && expanded && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={onToggleExpanded}
          aria-label="Close navigation"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white px-5 text-slate-900 transition-all duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-950 dark:text-white ${
          expanded ? "w-72" : "w-[90px]"
        } ${isMobile && expanded ? "translate-x-0" : isMobile ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div
          className={`flex py-8 ${expanded ? "items-center justify-between" : "flex-col items-center gap-3"}`}
        >
          <Link href="/dashboard" className="flex items-center gap-3" aria-label="Amelify home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
              A
            </span>
            {expanded && <span className="text-lg font-semibold tracking-tight">Amelify</span>}
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:flex dark:hover:bg-white/5 dark:hover:text-white"
            onClick={onToggleExpanded}
            aria-label={expanded ? "Close sidebar" : "Open sidebar"}
            aria-expanded={expanded}
          >
            <span aria-hidden="true">
              {expanded ? <PanelLeftClose size={20} strokeWidth={1.8} /> : <PanelLeftOpen size={20} strokeWidth={1.8} />}
            </span>
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
                    onClick={() => isMobile && onToggleExpanded()}
                    className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"} ${expanded ? "" : "justify-center"}`}
                  >
                    <span
                      className={`w-5 text-center text-lg leading-none ${active ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`}
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    {expanded && <span>{item.label}</span>}
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
