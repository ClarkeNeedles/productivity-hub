---
title: "scoring module design"
date: 9-24-2026
project-phase: in-progress
version: 0.2.0
---

## 1. System-Wide Scoring API & Telemetry Contract

The Scoring Engine serves as the core aggregator for the entire ecosystem. To calculate the global **Life Score**, any enabled system module that generates performance metrics must implement a unified scoring contract.

### 1.1 Module Scoring Contract Data Shape
Each compatible module must expose real-time and historical performance data across two primary temporal boundaries:

* **Daily Telemetry:**
  * `current_score_day`: The raw score earned by the user today.
  * `potential_score_day`: The maximum achievable score for the day based on active tasks, habits, or budget goals.
* **Weekly Telemetry:**
  * `current_score_week`: Cumulative score earned throughout the rolling week (calculated by tallying daily totals).
  * `potential_score_week`: Cumulative maximum possible score achievable for the week.

### 1.2 Module Perfection Rule
To simplify evaluation, individual module performance is translated into a percentage score (**out of 100%**).
* **Perfection Criteria:** Achieving a 100% module score requires complete accuracy—meaning zero missed habits, zero overdue to-dos, or zero budget infractions within that tracking window.

---

## 2. Core Dashboard Layout (`/dashboard`)

Unlike traditional modules, this is the central application interface. It acts as a continuous, high-level command center.

### 2.1 Navigation & Structural Constraints
* **Persistent Open View:** This view does not utilize a standard `PreviewCard`. It acts as a permanently expanded `ModulePage` layout directly on the root `/dashboard` path.
* **No Back Navigation:** Because it serves as the home view, the standard back button navigation header is hidden.
* **Isolated Configuration Access:** Since there is no preview card to anchor a context menu, configuration options are accessed via a dedicated **Settings Cog Utility Icon** placed natively in the dashboard header. This cog opens up a standard `ModuleSettingsPage` layout.

---

## 3. Global "Life Score" Engine Mechanics

The Life Score is calculated using a dynamic weighting matrix that standardizes data from all active modules.

### 3.1 Dynamic Weighting Scheme
* **Normalized Maximum:** The ultimate Life Score is formatted as an absolute score **out of 100%**.
* **Default Distribution:** By default, the system splits the 100% limit evenly across all currently enabled tracking modules (e.g., if 4 modules are active, each module accounts for a maximum weight of 25%).
* **Custom Weight Overrides:** Through the scoring settings panel, users can fine-tune the tuning slider controls to manually adjust how much weight a specific module carries over the global score.

---

## 4. UI Layout & Analytics Specification

The UI components on the central dashboard page are sorted hierarchically to highlight personal growth vectors:

### 4.1 Primary Visual Hook (Hero Component)
* **The Global Life Score Matrix:** Displayed at the absolute top of the page as the central focus point for user interaction.

### 4.2 Analytical Visualization Widgets
* **Life Score Heatmap:** A GitHub-style historical grid displaying daily Life Score density and fluctuations over a multi-month period.
* **Threshold Performance Streaks:** Consecutive day tracking counters indicating how long a user has kept their global Life Score above specific user-defined targets (e.g., a "Streak of days over 85%").
* **Trend Analysis Graphs:** Directional line metrics outlining long-term performance shifts across weeks and months.

### 4.3 Diagnostic & Optimization Panels
* **Module Impact Breakdown:** Visual charts isolating exactly which active modules are pulling the global score down or driving it upward.
* **Automated Improvement Log:** An AI-augmented action list pinpointing specific high-yield adjustments the user can make to instantly recover dropped points (e.g., *"Complete your reading habit today to gain back 3.5%"*).
