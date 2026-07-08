# 📂 Finalized Frontend Directory Structure
```
frontend/
├── app/
│   ├── layout.tsx              # Root HTML/Body wrapper, theme, global CSS
│   ├── page.tsx                # Automatic redirect logic to /login or /dashboard
│   ├── (auth)/                 # Isolated authentication screens (No Sidebar)
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── (app)/                  # Authenticated Application Shell Context
│       ├── layout.tsx          # Injects Global Sidebar Nav around side-by-side pages
│       ├── dashboard/page.tsx  # Multi-Column Bento-Box Canvas Layout (Home Page)
│       ├── ai/page.tsx         # Chat Interface with RAG UI Context
│       ├── modules/page.tsx    # Module Search & Preview Marketplace
│       └── settings/page.tsx   # User Settings Configuration Profile
├── components/
│   ├── navigation/
│   │   └── SidebarNav.tsx      # Global Nav Panel containing App Logo & Core Routing
│   ├── dashboard/
│   │   ├── GridCanvas.tsx      # Core Grid managing widget layout rendering
│   │   ├── WidgetWrapper.tsx   # Card component managing drag events and menu options
│   │   └── ModuleSelector.tsx  # "My Modules" Modal popup triggered by the (+) card
│   └── widgets/                # Sandboxed components for individual modules
├── store/
│   └── useWorkspaceStore.ts    # Consolidated Zustand state for layouts & full-screen views
└── types/
    └── dashboard.ts            # Type structures for widgets and application state
```
# 📋 High-Level Frontend Development Plan

* Step 1: Type Boundaries & State Core: Define TypeScript interfaces and build the global Zustand store to handle active modules, layout arrays, and window state mutations.
* Step 2: The Global App Shell Layout: Build the outer layout wrapper within app/(app)/layout.tsx. Layout the structural sidebar panel side-by-side with a flexible main view frame.
* Step 3: The Bento Canvas Engine: Code the responsive grid structure in app/(app)/dashboard/page.tsx. Map the widget array onto responsive Tailwind grid columns that wrap gracefully (3 → 2 → 1).
* Step 4: Card Interactions & Sandbox Mode: Code the card wrapper logic to support options menus, basic drag sorting, and click-to-expand behaviors that swap out the grid for a full-screen application window.
* Step 5: Sub-Page Layout Mocks: Build out presentation views for the AI Chat input timeline (/ai) and the module search marketplace layout (/modules).

------------------------------
# 🛠️ Core Functional Implementation Code
## 1. Core State Interface (types/dashboard.ts)
```
export type WidgetType = 
  | 'HABIT_TRACKER' 
  | 'TASK_ENGINE' 
  | 'INBOX_PURGE' 
  | 'IDEA_GRADER' 
  | 'WORKOUT_ARCHITECT' 
  | 'MEAL_PLANNER' 
  | 'BUDGET_LEDGER';
export interface WidgetInstance {
  id: string;
  type: WidgetType;
  title: string;
  meta: Record<string, any>;
}
```
## 2. Workspace Layout Engine (store/useWorkspaceStore.ts)
```
import { create } from 'zustand';import { WidgetInstance, WidgetType } from '@/types/dashboard';
interface WorkspaceState {
  widgets: WidgetInstance[];
  activeFullscreenWidget: WidgetInstance | null;
  isSelectorOpen: boolean;
  setWidgets: (widgets: WidgetInstance[]) => void;
  setFullscreenWidget: (widget: WidgetInstance | null) => void;
  setSelectorOpen: (open: boolean) => void;
  addWidget: (type: WidgetType, title: string) => void;
  removeWidget: (id: string) => void;
  reorderWidgets: (startIndex: number, endIndex: number) => void;
}
export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  widgets: [],
  activeFullscreenWidget: null,
  isSelectorOpen: false,
  setWidgets: (widgets) => set({ widgets }),
  setFullscreenWidget: (widget) => set({ activeFullscreenWidget: widget }),
  setSelectorOpen: (open) => set({ isSelectorOpen: open }),
  addWidget: (type, title) => set((state) => ({
    widgets: [...state.widgets, { id: crypto.randomUUID(), type, title, meta: {} }],
    isSelectorOpen: false
  })),
  removeWidget: (id) => set((state) => ({
    widgets: state.widgets.filter((w) => w.id !== id)
  })),
  reorderWidgets: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.widgets);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { widgets: result };
  })
}));
```
## 3. Global Layout Shell (app/(app)/layout.tsx)
```
import { SidebarNav } from '@/components/navigation/SidebarNav';
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Persistent Global Sidebar Left Anchor */}
      <SidebarNav />

      {/* Main Content Workspace View Panel */}
      <div className="flex-1 h-full overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}
```
## 4. Global Sidebar Component (components/navigation/SidebarNav.tsx)
```
'use client';import Link from 'next/link';import { usePathname } from 'next/navigation';import { LayoutDashboard, MessageSquare, Grid, Settings, Terminal } from 'lucide-react';import { cn } from '@/lib/utils';
export function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/ai', icon: MessageSquare, label: 'AI Assistant' },
    { href: '/modules', icon: Grid, label: 'Modules' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="flex flex-col w-16 h-screen bg-slate-900 border-r border-slate-800 items-center py-4 justify-between select-none">
      <div className="flex flex-col w-full items-center gap-4">
        {/* App Logo resets view back to Dashboard Home */}
        <Link href="/dashboard" className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md group">
          <Terminal className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </Link>
        
        <div className="w-8 h-[1px] bg-slate-800 my-1" />

        <nav className="flex flex-col gap-2 w-full px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-center p-3 rounded-xl transition-all group relative",
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                )}
                title={item.label}
              >
                <Icon className="w-5 h-5 group-hover:scale-105 transition-transform" />
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
```
## 5. Responsive Grid Canvas Hub (components/dashboard/GridCanvas.tsx)
```
'use client';import { useWorkspaceStore } from '@/store/useWorkspaceStore';import { WidgetWrapper } from './WidgetWrapper';import { Plus } from 'lucide-react';
export function GridCanvas() {
  const { widgets, setSelectorOpen } = useWorkspaceStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 auto-rows-[280px] w-full max-w-[1600px] mx-auto overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Existing Instanced Modular Items */}
      {widgets.map((widget, index) => (
        <WidgetWrapper key={widget.id} widget={widget} index={index} />
      ))}

      {/* Primary Placeholder Plus Grid Element */}
      <button 
        onClick={() => setSelectorOpen(true)}
        className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-3xl transition-all group bg-white/50 dark:bg-slate-950/40 min-h-[280px] backdrop-blur-sm cursor-pointer shadow-sm"
      >
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl group-hover:scale-110 group-hover:border-indigo-500 transition-all shadow-sm">
          <Plus className="w-6 h-6 text-slate-400 group-hover:text-indigo-500 transition-colors" />
        </div>
        <span className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">
          Add Workspace Module
        </span>
      </button>
    </div>
  );
}
```
## 6. Dynamic Shell Manager (app/(app)/dashboard/page.tsx)
```
'use client';import { useWorkspaceStore } from '@/store/useWorkspaceStore';import { GridCanvas } from '@/components/dashboard/GridCanvas';import { ModuleSelector } from '@/components/dashboard/ModuleSelector';import { Button } from '@/components/ui/button';import { ArrowLeft } from 'lucide-react';
export default function DashboardPage() {
  const { activeFullscreenWidget, setFullscreenWidget } = useWorkspaceStore();

  // Route interception toggle if card frame is expanded
  if (activeFullscreenWidget) {
    return (
      <div className="flex flex-col w-full h-screen bg-white dark:bg-slate-950 animate-in fade-in duration-200">
        <header className="flex items-center px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setFullscreenWidget(null)}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Button>
          <div className="ml-6 border-l border-slate-300 dark:border-slate-700 pl-6">
            <h1 className="text-lg font-bold tracking-tight">{activeFullscreenWidget.title}</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          <div className="w-full h-full border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center text-muted-foreground bg-slate-50/50 dark:bg-slate-900/20">
            {activeFullscreenWidget.type} Full Functional Sandbox App Active.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen bg-slate-50/50 dark:bg-slate-900/10">
      <header className="px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Executive Dashboard
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Select, rearrange, and interact with your tracking modules.
        </p>
      </header>
      <main className="flex-1 overflow-hidden">
        <GridCanvas />
      </main>
      <ModuleSelector />
    </div>
  );
}
```


