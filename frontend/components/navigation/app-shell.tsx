"use client";

import { useState } from "react";
import SidebarNav from "./sidebar-nav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SidebarNav
        expanded={expanded}
        mobileOpen={mobileOpen}
        onToggleExpanded={() => setExpanded((current) => !current)}
        onToggleMobile={() => setMobileOpen((current) => !current)}
      />
      <div
        className={`min-h-screen transition-all duration-300 ${expanded ? "lg:ml-72" : "lg:ml-[90px]"}`}
      >
        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
