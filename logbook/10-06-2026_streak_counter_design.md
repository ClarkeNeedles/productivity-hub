---
title: "streak counter design"
date: 10-6-2026
project-phase: in-progress
version: 0.5.5
---

# Development Log & Architectural Notes

## Completed Tasks & Code Enhancements

### Performance & React Optimization
* **`useShallow()` Hook Integration:** Reviewed and confirmed usage. It successfully prevents unnecessary component re-renders when new array/object references are obtained. Utilizing it to fetch `activeIds` successfully resolved the infinite rendering loop issue.
* **`useMemo()` Review:** Verified implementation across both the `AddModulePage` view wrapper and individual `ModuleCard` components. Current caching logic is stable; will re-evaluate down the line if performance metrics shift.
* **Zustand Store Cleanup:** Completely stripped out custom evaluation `.get()` tracking functions from our Zustand configurations. These were masking store state updates and suppressing required view refreshes. Replaced them entirely with clean, standard inline evaluations such as `.map()` and `.find()`.

### Layout & Navigation Simplification
* **Unified Sidebar States:** Refactored the responsive navigation component so both mobile overlays and desktop layouts are driven by a singular `expanded` state boolean variable.
* **Smart Device Behavior:** Programmed mobile drawers to close automatically whenever a user routes to a new dashboard page.
* **Polished Icon Transitions:** Upgraded global triggers to handle synchronous flipping behavior between `PanelLeftOpen` and `PanelLeftClose` across all breakpoints.

### Core Architectural Pivot (Metrics Layer Setup)
* **Preserving Immutable Blueprints:** Formally confirmed that our `BaseModule` types and classes must remain completely read-only blueprint definitions. They hold zero mutable runtime states.
* **Decoupled Dictionary Pattern:** Created a dedicated `metrics` Zustand store tracking user visual configurations inside a flat, normalized dictionary mapping keyed entirely by `ModuleId`.
* **Centralized Configuration Map:** Compiled a global configuration index containing standalone data files:
  * `AVAILABLE_MODULE_METRICS`: The total master registry mapping of metrics users can select from.
  * `DEFAULT_MODULE_METRICS`: Out-of-the-box visibility configurations applied instantly during runtime instantiation.
* **Strict Type Reinforcements:** Introduced rigorous `ModuleId` and `MetricId` primitive constraints across all modules to eliminate string typos. Replaced hardcoded string assignments throughout the source code.
* **Component Restructuring:** Cleaned up project file paths by relocating all visual blocks under a single repository roof:
  * Moved all core module cards to `@/components/modules/`
  * Moved all individual data visualizations to `@/components/metrics/`
* **`ModuleCard` Integration:** Repaired and verified the card component framework against our new configuration schemas. Verified that our multi-slot component frames gracefully support rendering 2 to 3 distinct sub-metrics at a time.

### Feature Enhancements
* **Streak Counter Integration:** Created a new modular `StreakCounterMetric` visual payload that renders dynamic active day counters using an absolute layering pattern directly inside an orange-accented fire silhouette.
* **Live Sandbox Loading:** Calibrated the creation preview container to immediately load matching default configs every time a module is inspected.

---

## Architectural Decisions & Current Milestone Goals

### 1. Architectural Definition: Blueprints vs. Runtime State
* **Types / Classes:** Acting strictly as static blueprint descriptions.
* **Zustand Stores:** Holding 100% of global state variables and mutable runtime data objects.

### 2. Next Horizon Questions (TODO)
- [ ] **Module Data Architecture:** Decide exactly where module-specific operational values (e.g., historical counter dates, habit checkbox states) should live.
  * *Current Consensus:* Store data locally inside discrete, feature-specific stores (e.g., `store/streak-counter.ts`, `store/habit-tracker.ts`) rather than bundling everything into one master state bucket.
- [ ] **Type Upgrades:** Finish sweeping the source directories to enforce the strict application of `ModuleId` and `MetricId` across remaining file paths.


