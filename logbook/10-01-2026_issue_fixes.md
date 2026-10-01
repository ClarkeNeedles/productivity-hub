---
title: "issue fixes"
date: 10-1-2026
project-phase: in-progress
version: 0.4.0
---

## 🛠️ Completed Breakthroughs & Architectural Evolution

### 1. State Normalization & Data Decoupling
* **Primitive ID Flow:** Transitioned the entire React component tree from heavy object reference prop-drilling to a primitive string `id` tracking system (`moduleId`).
* **Just-In-Time Evaluation:** React presentation views now receive flat, high-performance string keys and pull their fresher OOP structural blueprints directly from memory only at the moment of execution rendering.

### 2. State Management Modernization (Zustand Integration)
* **Decoupled Business Rules:** Replaced complex procedural inversion-of-control callbacks and constructor dependency injections with isolated, domain-focused Zustand stores.
* **Eliminated Class Regarbage Collection:** Killed performance-heavy `useMemo` object reconstruction checks. Core module classes are now permanent, immutable memory singletons declared outside the React tick cycle.
* **Streamlined Multi-Store Hierarchy:** Implemented a scalable multi-store matrix:
  * `useModulesStore`: Manages dashboard layout configurations and shell active states.
  * `useAddModuleStore`: Coordinates the catalog inventory checks and selection limits.

### 3. Unified Token Grid System
* **Self-Contained Utility Blocks:** Replaced the manually appended layout elements inside `modules/page.tsx` with a declarative, token-driven loop strategy.
* **Default Store Tokens:** Injected the `"add-module"` token directly into the store's default initialization arrays, ensuring it automatically locks to the absolute end of the user grid.

### 4. Code Consistency Cleanup
* **Abstract Blueprint Renaming:** Standardized all base abstract models and configuration matrices using strict `Base*` prefixing conventions to cleanly signal inheritance boundaries:
  * `BaseModule`
  * `BaseModuleCard`
  * `BaseModulePage`
  * `BaseModuleSettingsPage`
  * `BaseModuleMetric`

### 5. Enhanced Card Interaction Semantics
* **Invisible Click Shield:** Transformed the entire `ModuleCard` container footprint into a single reactive click target using the pseudo-element cover strategy (`after:absolute after:inset-0`).
* **Semantic Web Guardrails:** Maintained an outer `<article>` semantic boundary layout to preserve clean screen reader and SEO parsing flows while completely avoiding invalid nested `<button>` violations.

---

## 📐 Architectural Validation (MVVM vs. MVP)

We evaluated the feasibility of a strict Model-View-Presenter (MVP) setup and determined it is fundamentally a mismatch for Next.js due to the declarative nature of `UI = f(state)`. 

Instead, our current pattern successfully embodies a robust **Model-View-ViewModel (MVVM)** framework:
* **The Model:** Static structural system contracts, typings, and registries (`BaseModule`).
* **The ViewModel Layer:** Custom class overrides and interactive Zustand stores that bind primitive data nodes to presentation rules.
* **The View Layer:** Functional, lightweight React layout boxes (`ModuleCard.tsx`, `ModulePage.tsx`) that consume primitive IDs and output markup layouts.

---

## 📋 Still TODO / Upcoming Tasks

### Component Code Relocation
* [ ] Move remaining raw module-specific HTML / TSX fragments directly out of parent routing files and isolate them within their respective feature folder paths.

### Settings Panel Wiring
* [ ] Connect the `BaseModuleSettingsPage` lifecycle layout hooks directly to the card execution options dropdown gear menu (`Settings2` icon).

### Metric Slot Implementation
* [ ] Build out standard data sub-blocks using the newly aligned `BaseModuleMetric` types to automatically render up to two center-aligned micro-variant stats (such as streak counters) inside active cards.

### Layout Markup Cleanliness
* [ ] Review structural tailwind strings across all component layouts to drastically mitigate density and condense repeated utility configurations into clean CSS blocks or functional presentation helpers.
