---
title: "App Planning & Architecture Design"
date: 05-25-2026
status: planning
version: 0.0.0
---

# Log Notes

## 📔 Phase: Concept Validation & Tech Stack Selection

### 💡 The Core Idea & Value Proposition
Developing an all-in-one productivity hub deployed as a mobile Progressive Web App (PWA). Instead of a rigid, pre-built layout, the application functions as a flexible shell where users select, customize, and arrange individual productivity modules to match their specific workflows. 

#### Core Capabilities Under Consideration:
* **Modular Architecture:** A central framework where users choose exactly which productivity widgets or tools are added to their workspace.
* **Deep Personalization:** Complete layout customization to allow users to build a tailored interface that maximizes their efficiency.
* **Contextual AI Companion:** An embedded AI layer capable of analyzing daily agendas to send automated summaries, manage smart reminders, and answer questions about internal app data.
* **AI Action Execution (Agents):** Exploring the capability for the AI to execute specific in-app functions (e.g., adding entries, changing configurations) when prompted by user text.
* **Native-Like Web Delivery (PWA):** Deployed over the web but fully installable on a home screen. It will launch via a standalone icon without browser navigation bars, preserving the experience of a standard mobile application.

---

### 🏷️ Branding Exploration (Available Domains)
*The final name is not yet locked in. Evaluating the following options based on alignment with a modular productivity concept:*
* `moduflow.net` *(Current strongest candidate: highlights the connection between modular design and workflow friction reduction)*
* `trakhub.ai`
* `apexpulse.ca`
* `ascendos.dev` (AscendOS)
* `ameliora.app`
* `amendo.dev`
* `amenda.dev`

---

### 🛠️ Proposed Tech Stack Specification

#### 📱 Frontend Layer (Client-Side PWA)
*Focuses on managing dynamic dashboard changes, fluid mobile layout updates, touch-based adjustments, and offline-ready operations.*
* **Core Framework:** `Next.js` (App Router) - Handles fast page routing, optimal asset loading, and client-side performance optimizations.
* **UI Architecture:** `Tailwind CSS` + `Shadcn UI` - Provides a clean, modern, and lightweight design system that is fully responsive and optimized for mobile screens.
* **PWA Engine:** `@serwist/next` (Modern successor to `next-pwa`) - Manages the web manifest file (`manifest.json`) and registers service workers to enable home-screen installation, splash screens, and offline page access.
* **Layout Engine:** `@dnd-kit/core` & `@dnd-kit/sortable` - Powers mobile-friendly drag-and-drop mechanics, letting users physically rearrange their active productivity modules.
* **State Management:** `Zustand` - Acts as a lightweight client-side state store to manage immediate UI states like sidebar toggles and active drag-and-drop elements.

#### ⚙️ Backend Layer (Business Logic & AI Engine)
*A standalone, continuous execution layer built using an isolated architecture to match the modular structure of the frontend layout.*
* **Runtime Environment:** `Node.js` - Provides the underlying execution environment for JavaScript and TypeScript on the server.
* **Application Framework:** `NestJS` - Enforces a highly structured, scalable architecture. Features are isolated into dedicated, independent building blocks (e.g., `TodoModule`, `CalendarModule`, `AiModule`).
* **AI Gateway:** `OpenAI Node SDK` + `Vercel AI SDK Core` - Connects the backend engine to models like GPT-4o. Leverages **Structured Outputs (Function Calling)** to transform conversational user text into operational database actions.
* **Real-Time Gateway:** `@nestjs/websockets` (via `Socket.io`) - Handles text streaming from OpenAI so assistant responses appear on the user's screen token-by-token.
* **Task Queue:** `BullMQ` (Requires a small Redis instance) - Manages asynchronous background processing (such as scheduling morning daily email/push notifications) without freezing active API traffic.

#### 🗄️ Database & Security Layer (Data Persistence)
*Maintains operational stability, user record histories, and deep layout configuration state data.*
* **Database Engine:** `PostgreSQL` - Provides reliable relational data integrity. Utilizes native `JSONB` columns to store highly flexible, user-defined widget layouts in a single queryable field.
* **Database Host:** `Supabase` - Cloud hosting platform for the PostgreSQL database instance. Provides built-in file storage extensions for assets and user uploads.
* **Object-Relational Mapper:** `Prisma ORM` - Connects NestJS to the Supabase database instance. Automatically generates end-to-end TypeScript types directly from the database schema to eliminate runtime syntax errors.
* **Authentication & Guarding:** `@nestjs/passport` + `JSON Web Tokens (JWT)` - Secures REST and WebSocket endpoints. The frontend attaches a temporary bearer token to every request header to securely verify user identities.

#### 🌐 Infrastructure & Deployment (DevOps)
*Pipeline structures handling continuous validation and deployments.*
* **Frontend Hosting:** `Vercel` - High-performance deployment platform natively optimized for Next.js app builds.
* **Backend Hosting:** `Railway` / `Render` / `AWS ECS` - Scalable cloud hosting environments designed to manage continuous, long-running Node.js processes.
* **Containerization:** `Docker` - Packages the NestJS code, system dependencies, and exact Node version into an identical container footprint across local development and production.

---

### 🧩 Module Ecosystem & Core Architecture

#### 🛑 Mandatory System Modules (Built-In on Install)
These foundational modules form the permanent framework of the application shell and cannot be removed by the user.
* **📊 Executive Insight Dashboard (Home Canvas)**
  * *Core Utility:* The default landing page and central command center of the PWA.
  * *Data & Analytics:* Aggregates and surfaces high-level, cross-module insights (e.g., today's top habits, upcoming schedule conflicts, budget alerts) into a single scannable view.
* **🤖 Centralized AI Knowledge Copilot (AI Tab)**
  * *Core Utility:* A dedicated conversational workspace connected directly to the application's global data layer.
  * *Data & Analytics:* Allows users to query the AI assistant for complex, cross-functional answers regarding their internal app data (e.g., "Based on my budget and calendar, can I afford to eat out tonight?" or "Summarize my workout trends over the last month").

#### 🔌 Plug-and-Play Module Library (User-Customizable)
Optional, individual productivity blocks that users can choose, configure, and arrange on their dashboard.
* **🔄 Habit Optimization Tracker**
  * *Core Utility:* Daily habit accountability widget featuring single-tap checkbox completions.
  * *Data & Analytics:* Aggregates completion data over time to display visual streak analytics, consistency trends, and personalized recommendations for behavioral improvement.
* **📅 Unified Schedule & Task Engine**
  * *Core Utility:* A hybrid time-blocking interface that merges calendar events with actionable task lists.
  * *Data & Analytics:* Allows users to drag and drop daily tasks directly into specific time slots on their calendar schedule to ensure realistic daily planning.
* **🧹 Automated Inbox Purge Bot (Gmail Integration)**
  * *Core Utility:* A background assistant connected via secure Gmail API to scan, categorize, and archive digital clutter.
  * *Data & Analytics:* Automatically identifies low-priority newsletters, expired promotions, and massive attachments to continuously free up cloud storage space.
* **🧠 Strategic Idea Grader & Market Evaluator**
  * *Core Utility:* A structured intake canvas that prompts users to fill out standardized templates for new business, project, or feature concepts.
  * *Data & Analytics:* Leverages the embedded AI layer to evaluate the input against real-world market vectors, generating a standardized viability scorecard and potential success rating.
* **🏋️ Modular Workout Architect & Tracker**
  * *Core Utility:* A fitness dashboard equipped with customizable routine templates for rapid workout assembly.
  * *Data & Analytics:* Logs completed reps, sets, and weights, providing a high-level summary of historical training volume and total workouts completed.
* **🍳 Intelligent Meal Planner & Grocery Sync**
  * *Core Utility:* A dual-purpose kitchen management widget for mapping out weekly nutritional profiles and tracking household ingredients.
  * *Data & Analytics:* Dynamically compiles recipe ingredients into a consolidated, categorized digital grocery checklist as meals are scheduled.
* **💰 Personal Financial Analysis & Budget Ledger**
  * *Core Utility:* A secure expense tracker designed to monitor capital outflows and enforce strict categorical spending limits.
  * *Data & Analytics:* Generates interactive spending breakdown charts to visually isolate cash leaks and measure real-time adherence to monthly budget goals.

- **Make sure that you run (pip install -r requirements.txt) for the AI script to work.**
- The AI script (/scripts/generate_readme.py) will read through this unstructured section and automatically figure out your project's features and updates for the README.md.
