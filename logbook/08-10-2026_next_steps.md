---
title: "next steps"
date: 8-10-2026
status: in-progress
version: 0.1.0
---

# Personal Modular OS: Development Roadmap

## Phase 1: Local Environment & Core Layout Scaffolding
*   **Initialize Project Engine**
    *   Create a fresh Next.js application using TypeScript and Tailwind CSS.
    *   Set up a clean directory structure separating `components/`, `modules/`, and `layouts/`.
*   **Establish Docker Sandbox**
    *   Write a multi-stage `Dockerfile` optimized for development and Next.js production builds.
    *   Configure a `docker-compose.yml` file to run the app locally.
*   **Build the Shell & Navigation Frame**
    *   Implement the permanent left-hand sidebar navigation layout.
    *   Add placeholder route links for: Dashboard, Modules Workspace, Ask AI, and Settings.
    *   Ensure the layouts are fully responsive and look polished before adding data features.
*   **Create Route Stubs**
    *   Build empty landing interfaces for Dashboard (Metrics), Ask AI, and Settings.
    *   Ensure they render clean "Coming Soon" UI states so the nav links do not break.

---

## Phase 2: Base Interface & The First Module (Habit Tracker)
*   **Define the TypeScript Base Contract**
    *   Create an abstract class or interface (`BaseModule`) that all submodules must extend.
    *   Enforce UI hooks: `renderPreview()`, `renderFullView()`, and `openSettings()`.
    *   Enforce the data hook: `exposeStats()`, which must return a standardized JSON packet for tracking streaks, scores, and raw summaries.
*   **Develop the Habit Tracker Module**
    *   **Preview State:** Build a compact dashboard grid card showing a 7-day completion matrix and quick click-to-complete check circles.
    *   **Hover Controls:** Implement the meatball `[...]` overlay displaying Settings, Move, and Remove icons.
    *   **Full State:** Create the deep-dive screen with full historical streak trends, calendar views, and a prominent back-arrow to return to the Workspace.
*   **Build the Module Store Mock-up**
    *   Design a grid system inside the `/modules` workspace route with empty slots.
    *   Clicking an empty slot or a "+" button triggers a pop-up modal panel.
    *   Make the Habit Tracker searchable inside this modal, allowing a user to click "Add" to mount its preview card to the main workspace grid.

---

## Phase 3: Live Data Storage (Supabase & Prisma Integration)
*   **Initialize Supabase Cloud DB**
    *   Spin up a free-tier PostgreSQL database instance on Supabase.
*   **Configure Prisma ORM Engine**
    *   Install Prisma into the Next.js directory.
    *   Connect Prisma to your Supabase PostgreSQL connection string via environment variables (`.env`).
*   **Design the Flexible Polymorphic Schema**
    *   Create a schema that handles any module structure without needing table changes later.
    *   Utilize Native PostgreSQL `JSONB` columns to store custom user states inside a generalized `ModuleInstance` table.
*   **Hook up Local Data Streams**
    *   Refactor the Habit Tracker module to read and write live data through Prisma endpoints instead of transient memory.
    *   Confirm your data modifications persist cleanly when updating habits inside both preview cards and deep-dive views.

---

## Phase 4: The Metric Aggregator Engine
*   **Build the Central Data Hook**
    *   Write a global dashboard controller that scans through all currently installed modules.
    *   Call the `exposeStats()` interface function on every single running module.
*   **Code the Life Scoring Engine**
    *   Develop a math utility that takes these exposed statistics and processes them into a global "Life Score" (0–100 scale).
    *   Establish scoring rules: e.g., completing habits increases the daily score; breaking a streak triggers slight score decay.
*   **Bring the Dashboard to Life**
    *   Connect this engine directly to the primary landing Dashboard page.
    *   Render large personal best readouts, historical habit streaks, and interactive SVG progress rings tracking daily performance.

---

## Phase 5: Open-Source Sanitization & Community Launch
*   **Sanitize Security Environments**
    *   Audit the repository to ensure all local API endpoints, database connection flags, and secrets live completely inside `.env.local`.
    *   Double-check your `.gitignore` to ensure zero access credentials or private test vectors escape to cloud tracking.
*   **Draft the CONTRIBUTING.md Guidelines**
    *   Provide explicit step-by-step instructions on how new developers can set up Docker locally.
    *   Explain how to write a new module using the abstract `BaseModule` blueprint.
    *   Detail how to safely test new modules using the JSONB schema layers.
*   **Publish the Blueprint Publicly**
    *   Transition your internal git repository to public status on GitHub.
    *   Tag an initial release tracking version `0.1.0` so other programmers can pull down your code and start creating custom modules.
