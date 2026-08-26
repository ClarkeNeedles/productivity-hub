---
title: "Project Blueprint: Modular PWA Hub"
date: 06-10-2026
project-phase: planning
version: 0.0.0
---

# Log Notes

## 🗺️ Project Execution Roadmap

### 🏗️ Phase 1: Environment Setup & Core Monorepo
*Goal: Establish a local development workflow where the frontend and backend can seamlessly communicate using typed contracts.*
* **Initialize Repository:** Set up a monorepo (or two tightly linked repositories) containing your Next.js frontend and NestJS backend.
* **Dockerize Local Dependencies:** Create a `docker-compose.yml` file to spin up local instances of PostgreSQL and Redis (for BullMQ).
* **Database Initialization:** Set up a Supabase project, initialize Prisma in your NestJS backend, and connect it to your database.
* **Define Base Schema:** Design the initial Prisma schema focusing on core infrastructure:
  * User table (ID, email, password hash).
  * Workspace table (ID, userId, layout profile).
  * WidgetInstance table (ID, workspaceId, type, positionX, positionY, customizationData JSONB).

---

### 📱 Phase 2: The Core PWA Shell & Layout Engine (The "First Vertical Slice")
*Goal: Build the base framework and prove that a user can move a widget and have that position save to the database.*
* **Frontend Shell Setup:** Initialize Next.js with Tailwind CSS and Shadcn UI. Configure `@serwist/next` to enable basic standalone PWA installation.
* **Implement Drag-and-Drop:** Integrate `@dnd-kit`. Create a grid layout canvas that acts as the user desktop.
* **Build Module #1 (The Sandbox Widget):** Create a dead-simple "Hello World" or "Quick Notes" widget component.
* **State Management Sync:** Implement Zustand to track the grid coordinates of this widget locally during drag events.
* **Backend Layout API:** Build a NestJS endpoint (`PATCH /workspaces/layout`) that accepts a JSON payload representing the widget positions and writes it to the PostgreSQL JSONB column.
* **End-to-End Test:** Move the widget on your phone/browser, refresh the page, and verify the widget stays exactly where you left it.

---

### 🔒 Phase 3: Authentication & Multi-Module Expansion
*Goal: Secure the platform and flesh out the actual library of productivity tools.*
* **Authentication Layer:** Implement `@nestjs/passport` and JWT token generation on the backend. Create the login/signup screens on the frontend.
* **Module Architecture Interface:** Define a strict TypeScript interface for what constitutes a "Module" so adding new ones requires minimal code changes.
* **Develop Module Library:** Build out the actual frontend components and corresponding NestJS controllers for your core tools:
  * **Todo Module:** Task lists with checkboxes.
  * **Calendar Module:** Agenda views and event creation.
  * **Habit Tracker Module:** Daily streak check-ins.
* **Offline Resilience:** Configure Serwist service workers to cache these core module assets so the app UI loads instantly even without internet access.

---

### 🤖 Phase 4: The Real-Time & AI Agent Layer
*Goal: Infuse contextual intelligence into the application via streaming data and autonomous action execution.*
* **WebSocket Infrastructure:** Set up `@nestjs/websockets` with `Socket.io` on the backend to allow full-duplex communication with the frontend client.
* **AI Gateway Integration:** Integrate the OpenAI SDK and Vercel AI SDK Core within a dedicated `AiModule` in NestJS.
* **Streaming Responses:** Connect your AI gateway to your WebSocket gateway so OpenAI responses stream token-by-token into a chat widget UI on the frontend.
* **Structured Outputs (Function Calling):** Write system prompts and register tools/functions that give the AI agency.
  * *Example:* Teach the AI that if a user types *"Add a meeting tomorrow at 2 PM"*, it must parse that text and execute your internal `CalendarModule.createEvent()` backend service function.

---

### ⏰ Phase 5: Background Processing, Notifications & Polishing
*Goal: Tie up loose ends, optimize performance, and prepare for production deployment.*
* **Background Worker Setup:** Configure BullMQ on NestJS to handle asynchronous cron jobs utilizing your Redis instance.
* **Smart Reminders:** Create a background job that analyzes users' upcoming calendar events every morning and prepares daily agenda summaries.
* **Web Push Notifications:** Implement native PWA push notifications via the Web Push API so the background workers can alert users on their mobile devices even when the app is closed.
* **Performance Optimization:** Index your PostgreSQL database tables, optimize Tailwind bundles, and ensure the PWA hits high performance marks on mobile performance audits.

---

### 🚀 Phase 6: Production Deployment & Branding Launch
*Goal: Push the code live to the cloud and finalize your market-ready identity.*
* **Frontend Deployment:** Deploy the Next.js app to Vercel.
* **Backend & Queue Deployment:** Deploy the NestJS server and your Redis instance to Railway, Render, or AWS ECS.
* **Domain & Security Linkage:** Purchase your chosen domain (e.g., `moduflow.net`) and wire up SSL certificates across your hosting providers.
* **Asset Integration:** Replace all placeholder graphics with your finalized branding logos, app icons (configured for apple-touch and android splash screens), and landing page copy.

- **Make sure that you run (pip install -r requirements.txt) for the AI script to work.**
- The AI script (/scripts/generate_readme.py) will read through this unstructured section and automatically figure out your project's features and updates for the README.md.
