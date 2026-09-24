---
title: "habit tracking module design"
date: 9-24-2026
project-phase: in-progress
version: 0.2.0
---

## 1. Core Module System Architecture

Every module within the application must conform to a standardized three-part structural layout: the **Preview Card**, the **Open Module Page**, and the **Module Settings Page**.

### 1.1 The Preview Card Type (`PreviewCard`)
* **Consistent Sizing:** Enforces a rigid layout bounds depending on the dashboard grid column span (1, 2, or 3 slots).
* **Action Menu Visibility:** Configuration flag to dynamically `show` or `hide` the context menu (`...`) options.
* **Layout Slot Placement:** Tracks the designated position/slot in which the preview card resides on the main dashboard grid.
* **Dynamic / Customizable Stats:** 
  * Features a default layout displaying core operational telemetry.
  * Extensible structure allowing users to swap default stats out via the module settings page.
  * *Constraint Rule:* Maximum of 2 stats displayed simultaneously per card to avoid visual clutter.
  * *UI Component Reusability:* Any component rendered in the expanded module view should theoretically be selectable for the preview card. Component designs should either scale down seamlessly or provide an explicit micro-variant interface to fit within 1, 2, or 3 preview slots.

### 1.2 The Module Page Type (`ModulePage`)
Defines the uniform layout for any expanded, full-screen module workspace.
* **Header:** Title, context actions, status metrics, and navigation breadcrumbs.
* **Content Area:** The primary interaction sandbox hosting specific module tabs and sub-views.
* **Secondary Utilities:** Sidebars, informational footers, or contextual widgets.

### 1.3 The Module Settings Page Type (`ModuleSettingsPage`)
A page that directly extends the base structure of the `ModulePage` but is purpose-built to customize a given module's features.
* **Preview Card Configuration Section:** Allows the user to select which stats/charts are displayed on the dashboard card and configure their slot sizes.
* **Open Module View Configuration Section:** Allows the user to toggle layout sections, choose active charts, and physically tailor what elements are included in the expanded sandbox.

---

## 2. Habit Tracker Module Functional Specification

### 2.1 Configurable Preview Card Stats
Users can select up to 2 of the following metrics to display on their dashboard preview card:
* **Daily Completion Ratio:** A visual breakdown of today's habits rendered as a pie chart.
* **Primary Streak:** A dedicated counter tracking a single, user-chosen vital habit that they are actively striving to maintain.
* **Scoring Engine Impact:** A live indicator showcasing exactly how many points have been added to the global "Life Score" via habit completions today.
* **Perfect Day Streak:** A historical consecutive counter tracking unbroken chains of 100% daily habit completion.

### 2.2 Expanded Full-Screen Sandbox Layout
When opened, the habit tracker shifts into a full application dashboard utilizing the following hierarchy:

#### 📋 Today's Habits List (Top of Page)
* Embeds a dedicated "Habits" tab sourced directly from the **To-Do List Module** to ensure perfect cross-module synchronization.
* Dynamically filters out unneeded data. It evaluates recurrence rules and **only displays the subset of habit tasks scheduled for the current day** (e.g., if a habit repeats every 2 days and today is an off-day, it will not appear in this list).

#### 🔥 Streaks Dashboard Section
* Displays current best streak and its associated habit name.
* Displays longest lifetime streak and its historical habit name.
* Displays the current overall perfect day streak.

#### 📊 Visual Analytics & Data Charts
* Comprehensive data visualization layout tracking habit completions over custom timeframes.
* **Contribution Heatmap Grid:** A GitHub-style density grid displaying the total volume of daily completed to-dos and habits over a rolling historical timeline.

---

## 3. Parallel To-Do List Module Dependencies

To support the requirements of the Habit Tracker, the To-Do List module must be engineered in parallel with the following architecture:

### 3.1 Core Features
* **Google Tasks Paradigm:** Natively supports creating and managing multiple isolated to-do lists.
* **Preview Analytics:** The To-Do module preview card will display a simple counter showing the total number of items due today.
* **Scheduled Items:** Support for binding tasks to explicit date and time hooks.
* **Advanced Recurrence Engine:** Built-in support for intervals like daily, weekly, and custom repeat rules (e.g., "every 2 days").

### 3.2 Quantifiable Tasks & Verification Utilities
* Supports goal tracking beyond simple binary checkboxes (e.g., *"Read for 30 minutes"* or *"Drink 3000ml of water"*).
* **Built-in Verification Components:** Tasks can directly link to native application UI utilities, such as an active countdown timer for time-based habits or an incrementing counter for volume-based habits to prove completion.

### 3.3 Unified Calendar Sync Engine
* Any task in the system that has been explicitly scheduled to a calendar day or specific timestamp is automatically projected onto the central calendar view.
* *Exception Rule:* Standard daily habits do not need to clutter the main calendar layout; they remain contained within the habit tracking and to-do daily subsets.
