---
title: "frontend start"
date: 9-23-2026
project-phase: in-progress
version: 0.2.0
---

# 1. Frontend Initialization

The Next.js project was created under `frontend/` using the structure outlined in
`frontend_plan.md`.

* Ported the selected dashboard template into the repository's frontend structure.
* Confirmed that the frontend runs locally.
* Created `AGENTS.md` with formatting and contribution rules for agents and developers.
* Use lowercase file names for new files moving forward.
* Use Lucide icons instead of text characters for interface icons.

# 2. Frontend Structure & Formatting

The frontend uses the Next.js App Router with feature-specific components under
`frontend/components/`.

* Keep module-specific components under `components/modules/`.
* Keep shared navigation components under `components/navigation/`.
* Preserve readable, print-friendly TypeScript and TSX formatting.
* Keep Markdown logbook entries free to use intentional indentation and spacing.

# 3. Module Architecture

The Modules page is being designed around a shared module contract. Every module
should provide the same core behaviors and fit within the same preview-card layout.

## 3.1 Add Module Module

The "Add Module" card is treated as a module itself rather than as a special grid
element.

* Its preview is a simple Add Module card.
* Its full view behaves like a module store or shopping interface.
* Its full view allows users to browse and add other modules.
* It does not display the three-dots options menu.

## 3.2 Shared Module Behaviors

Each module should support:

* A compact preview window in the module grid.
* The same standard preview-card dimensions as other modules.
* A full-screen view with an explicit Back button.
* Options associated with the global scoring and gamification system.
* A three-dots options menu when the module allows it.
* Settings, Move, and Remove actions in the options menu.
* Future click-and-hold or drag behavior for the Move action.

# 4. Development Environment Direction

Docker remains a future consideration for consistent development environments.

* Use Docker Compose for shared infrastructure such as PostgreSQL and Redis.
* Continue running the Next.js frontend directly with Node.js and npm for faster hot reloads.
* Do not add Docker configuration yet because the backend and database infrastructure do not exist.
* Add Docker Compose when backend development begins so contributors can start dependencies consistently.
* Consider adding a `.nvmrc` or `.node-version` file to keep the frontend Node.js version consistent.

# 5. Next Steps

* Start creating the Habit Tracker module and make it work end to end.
* Begin using the module day to day to validate whether it fits the intended workflow.
* Evaluate deploying the frontend to Vercel for personal use and testing.
* Determine when the backend and database should be introduced to persist module data.
