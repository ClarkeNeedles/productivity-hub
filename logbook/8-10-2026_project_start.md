---
title: "project start"
date: 8-10-2026
status: in-progress
version: 0.0.0
---

# 1. Updated Navigation & Workspace Layout
The application's structural orientation is pivoting to a metrics-first discovery model. This section details how the new features will hook into the existing UI framework.

```
┌────────────────────────────────────────────────────────────────────────┐
│ NAVIGATION SIDEBAR (Left) │ PRIMARY WORKSPACE DISPLAY (Center/Right)   │
├───────────────────────────┼────────────────────────────────────────────┤
│                           │                                            │
│  [Dashboard (Metrics)]    │  LANDING VIEW: METRICS & SYSTEM ANALYTICS  │
│                           │  ┌──────────────────────────────────────┐  │
│  [Modules (Workspace)]    │  │  Aggregated Life Score Engine        │  │
│                           │  └──────────────────────────────────────┘  │
│  [Ask AI (RAG Hub)]       │  ┌──────────────────┬───────────────────┐  │
│                           │  │  Habit Streaks   │  Personal Bests   │  │
│  [Settings]               │  └──────────────────┴───────────────────┘  │
│                           │                                            │
└───────────────────────────┴────────────────────────────────────────────┘
```

## 2.1 Navigation Target Implementations
* **Dashboard Layer (Initial App Landing):** Focuses the default view entirely on performance diagnostics. It acts as the execution terminal for the overarching **Scoring Engine**, converting cross-module tracking statistics into visible trends.
* **Modules Management Workspace:** Isolates the customizable layout grid away from the main diagnostic landing. It maintains uniform bounding boxes for active cards. Empty grid coordinates display a `[+]` button, initializing a modal-driven **Module Discovery Store** where users search and attach new elements to their running runtime.
* **Ask AI (RAG Core Interface):** A dedicated interface optimized for complex queries matching user data assets. It features text/voice input boxes accompanied by a contextual collection of quick-action diagnostic shortcuts (e.g., "*Generate Weekly Velocity Report*").
* **Settings Interface:** Houses environmental parameters, global notification preferences, and system profile settings.

# 3. Core Software Engineering Contracts

## 3.1 The Base Module Interface
To guarantee interface cohesion and accurate metrics compilation, every module deployed to the environment must inherit from a unified abstract class or interface layout.

### UI and Operational Constraints
1.  **Bounding Box Harmony:** Modules must match standard layout sizing and visual constraints enforced by the parent grid wrapper.
2.  **State Management Navigation:** Clicking a dashboard preview card expands the module into its full view. Full views *must* present an explicit **Back Arrow** to return seamlessly to the home grid state.
3.  **The Hover Overlay Menu:** Every preview card wrapper must capture mouse hover states to display an operational context button `[...]`. This overlay provides three distinct commands:
    *   `Settings`: Spawns module-specific configuration variables.
    *   `Move`: Engages grid repositioning handles.
    *   `Remove`: Disables the module instance and strips its weights from the scoring calculations.

## 3.2 Interface Specification (TypeScript Boilerplate Example)
```typescript
interface ISystemLifecycleModule {
  // Identification & Structuring Tokens
  readonly moduleId: string;
  moduleTitle: string;
  layoutGridCoordinates: { x: number; y: number; width: number; height: number };
  currentDisplayState: 'PREVIEW' | 'FOCUS_FULLSCREEN';

  // Rendering Gateways
  renderCompactPreview(): JSX.Element;  // Fires within the grid; executes the [ ⋯ ] menu overlay on hover
  renderFocusView(): JSX.Element;    // Fires on block expansion; strictly enforces the presence of the navigation back arrow

  // Core Data Exchange Mechanism
  exposeTelemetryData(): IModuleTelemetryPayload;
}

interface IModuleTelemetryPayload {
  sourceModuleToken: string;
  timestampUTC: string;
  scoringContributionFactor: number; // Integer bound evaluation from 0-100
  localizedMetrics: {
    label: string;
    numericalValue: number;
    unitString: string;
  }[];
  textSummaryExport: string; // The primary raw text payload ingested by the RAG data pipeline
}
```

---

# 4. Analytical Scoring Engine Integration
The central dashboard runs an analytical scoring engine that processes real-time telemetry datasets provided by active sub-modules via the `exposeTelemetryData()` channel.

* **Algorithmic Compilation:** The system normalizes incoming telemetry vectors into a standardized, unified health metric ("Life Score"). 
* **Historical Benchmarking:** The dashboard cache retains long-term data trends to plot moving averages, historical peaks, and milestone streaks.
* **Friction and Decay Identifiers:** If tracking frequency diminishes or specific goal data lags, the engine registers a negative trend curve, visually reflecting areas that require immediate attention.

---

# 5. Functional Scope Extensions (Proposed Sub-Modules)

## 5.1 Comprehensive Goal Engine
* **Execution Parameters:** Features deep compartmentalization between near-term (daily/weekly targets) and long-term milestones. 
* **Telemetry Output:** Returns completion ratios and alert notifications for approaching deadlines.

## 5.2 Intelligent Journal Terminal
* **Execution Parameters:** A distraction-free markdown canvas captured by a background background analytical agent.
* **Telemetry Output:** Summarizes emotional tone markers, recurring operational blocks, and text abstractions directly to the vector database.

## 5.3 Unified Technical Notebook
* **Execution Parameters:** Optimized for structured information indexing, general code blocks, and knowledge mapping.
* **Telemetry Output:** Updates conceptual tags and tracks total contribution volumes to enrich the RAG knowledge pool.

## 5.4 High-Velocity Project Tracker
* **Execution Parameters:** Tracks development progress, timeline roadmaps, and key sprint milestones.
* **Telemetry Output:** Calculates task completion velocity, progress percentages, and time remaining until final product delivery.

---

# 6. Augmented Intelligence Layer: Vector RAG Integration
The intelligent framework feeds text abstractions directly into an external retrieval-augmented generation pipeline, preventing isolated data silos.

```
┌─────────────────────┐      ┌─────────────────────┐
│  Journal Terminal   │      │ Technical Notebook  │
└──────────┬──────────┘      └──────────┬──────────┘
           │ Text Payload               │ Text Payload
           ▼                            ▼
┌──────────────────────────────────────────────────┐
│ Central Data Ingestion Pipeline                  │
├──────────────────────────────────────────────────┤
│ 1. Text Parsing & Chunking Blocks                │
│ 2. Embeddings Model Conversion (Vector Mapping)  │
└──────────────────┬───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│ Vector Database Indexing Layer                   │
└──────────────────┬───────────────────────────────┘
                   │ Contextual Matching
                   ▼
┌──────────────────────────────────────────────────┐
│ Ask AI Engine (RAG Generation)                   │
└──────────────────────────────────────────────────┘
```

## 6.1 Advanced Features and Continuous Context Analysis
* **Continuous System Observation:** The conversational layer goes beyond simple question-and-answer steps. It reviews contextual data gaps across distinct modules over time (e.g., checking if drop-offs in the *Project Tracker* match changes logged in the *Journal Terminal*).
* **Automated Weekly Reviews:** The system can automatically create a comprehensive status overview every Sunday morning. This summary blends qualitative journal notes with quantitative project stats to deliver actionable improvements for the upcoming week.
* **Proactive Warning Flags:** If a user searches for technical notes, the engine highlights related entries across goals and active projects, ensuring cross-functional knowledge is always surfaceable.