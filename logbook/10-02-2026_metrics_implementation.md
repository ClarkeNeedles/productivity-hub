---
title: "metrics implementation"
date: 10-2-2026
project-phase: in-progress
version: 0.5.0
---

# Feature Implementation: Module Metrics
## Architecture & Data Flow
The system utilizes a decoupling of configuration blueprints, static class metadata, and dynamic application state:


[Module Config] -> Metric definitions & default active metric IDs
[Module Class] -> Immutable module, card, page, and settings blueprint
[Zustand Store] -> Active metric IDs, live metric values, user preferences, and runtime state
[MetricSlots] -> Reads store state, resolves definitions, and renders up to maxMetricSlots


---

## Completed Tasks

### Component Refactoring & File Organization
*   **Created `ModuleCardFrame` Component:** Formed a structural wrapper component to share base card layouts across different views.
*   **Implemented `ModuleCardPreview`:** Leverages `ModuleCardFrame` with interactive options disabled and a clear visual label at the bottom to safely preview cards.
*   **Updated `ModuleCard`:** Inherits from `ModuleCardFrame` to preserve standard operational behavior.
*   **Cleaned Core Types:** Removed `BaseModuleCard` and `BaseModulePage` types entirely; embedded their minimal configurations directly into the main `BaseModule` blueprint for a simpler constructor.
*   **Reorganized Project Directory:**
    *   `components/app/` (for application shell and sidebar navigation)
    *   `components/metrics/` (for modular metric widgets)
    *   `components/modules/` (for custom module pages and templates)

### Module Execution
*   **Add Module Flow:** Successfully initialized the `AddModuleModule` and its corresponding `AddModuleMetric`.
*   **Add Module Page UI:** Reused standard `ModuleCard` logic to provide live, realistic card previews while informing users they are choosing a module to add.

---

## Remaining Implementation Tasks

### Metric Slot Implementation
* [ ] **Build out standard data sub-blocks** using the newly aligned `BaseModuleMetric` types to automatically render up to two center-aligned micro-variant stats (such as streak counters) inside active cards.
* [ ] **Update `MetricSlots` Component:** Replace the current static array slice (`metrics.slice(0, maxMetrics)`) with dynamic Zustand hook calls to `getActiveMetrics` and `setActiveMetrics`.


