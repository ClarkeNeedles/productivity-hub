---
title: "module architecture implementation"
date: 9-30-2026
project-phase: in-progress
version: 0.3.0
---

# Module Architecture & Feature Updates

## 🏗️ Architecture & Type System
* **Implemented new module types:** Created a robust structure to enforce consistency across all modules.
    * `ModuleMetric`: Powers both small (cards) and large (pages) layouts.
    * `ModuleCard`: Renders the card UI using dashboard widgets.
    * `ModulePage`: Renders the full page UI using dashboard widgets.
    * `ModuleSettingsPage`: Extends `ModulePage` for custom configurations.
    * `BaseModule`: A strict generic class requiring extending classes to use `ModuleCard`, `ModulePage`, and `ModuleSettingsPage`.
* **Standardised data structures:** Formatted data structures into types that sync cleanly with components, providing a clean abstraction layer so modules only need to supply data.

## 🧪 Features & Modules
* **Started habit tracker module:** Initiated a new habit tracking module.
* **Leveraged dependency injection:** Injected dependencies from the parent module into rendering functions to make assets like titles reusable.

## ⚙️ Configuration & Documentation
* **Created `config/` directory:** Dedicated space for user settings.
* **Added `add-modules.ts`:** Handles available module listings via a factory function.
* **Refactored documentation:** 
    * Created `CONTRIBUTING.md` (adapted from `AGENTS.md`) for coding guidelines.
    * Updated `AGENTS.md` to reference both the `README.md` (functionality) and `CONTRIBUTING.md`.

## 🔄 In Progress
* **UI wrapper abstraction:** Experimenting with moving main layout `<div>` wrappers into base classes to prevent duplicating sizing and formatting code across modules.
* **Module card splitting:** Looking into dividing `ModuleCard` into a title section and a center-aligned `ModuleMetric` section (supporting up to 2 metrics).

## 📝 TODO
- [ ] Move more module-specific HTML code directly into their respective `.tsx` component files.
- [ ] Link the `ModuleSettingsPage` to the module settings icon.
- [ ] Hide or remove active modules from the "Add Modules" list so only one copy can exist at a time (and restore them to the list if deleted).
- [ ] Add stat widgets sections to the module cards. (`ModuleMetric` type)
