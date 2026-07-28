<!-- Badges: Include status pills, project size indicators, or license badges if declared in metadata. -->
![Project Status](https://img.shields.io/badge/status-planning-orange)
![Project Version](https://img.shields.io/badge/version-0.0.0-blue)

# Amelify: The modular, AI-driven shell for personal productivity.

## High-Level Overview

Amelify is envisioned as an all-in-one productivity hub designed to provide a flexible and deeply personalized workspace. Rather than a rigid, pre-built layout, the application functions as a dynamic shell where users select, customize, and arrange individual productivity modules to match their specific workflows.

Initially conceived as a Progressive Web App (PWA), the project pivoted to a standard web application to overcome limitations in mobile web drag-and-drop mechanics and unreliable native push notifications. Similarly, the AI strategy evolved into a hybrid model, utilizing server-side local LLMs for core operations and intelligent client-side fallback to free-tier cloud LLM APIs for active mobile users, mitigating token costs and hardware constraints. This modular architecture has been validated, enabling a community-driven approach to feature expansion and reducing core platform feature creep.

## Table of Contents

- [High-Level Overview](#high-level-overview)
- [System Architecture](#system-architecture)
- [Tech Stack and Dependencies](#tech-stack-and-dependencies)
- [Features](#features)
- [Prerequisites / System Requirements](#prerequisites--system-requirements)
- [Step-by-Step Installation / Setup](#step-by-step-installation--setup)
- [Configuration & Environment Variables](#configuration--environment-variables)
- [Quick Start / Usage Examples](#quick-start--usage-examples)

## System Architecture

Amelify employs a distinct micro-service architecture, separating frontend, backend, and data persistence layers.

*   **Frontend Layer (Client-Side Application):** Built with Next.js, it manages dynamic dashboard changes, fluid mobile layouts, touch-based adjustments, and leverages a dedicated state management system for immediate UI updates.
*   **Backend Layer (Business Logic & AI Engine):** A standalone, continuous execution layer developed with Node.js and NestJS. It isolates features into independent building blocks, integrating an AI gateway for contextual intelligence, real-time communication via WebSockets, and a task queue for asynchronous background processing.
*   **Database & Security Layer:** Built around PostgreSQL with `JSONB` columns for flexible layout storage. Prisma ORM connects the backend to the database, ensuring type safety. Authentication is handled via JWT, securing both REST and WebSocket endpoints.
*   **Infrastructure & Deployment (DevOps):** The frontend is hosted on Vercel for optimized Next.js builds. The backend and associated services (like Redis for the task queue) are containerized with Docker and designed for scalable cloud hosting environments such as Railway, Render, or AWS ECS.

A critical design validation confirmed that modularity is key, enabling a clean separation of concerns and future extensibility for community-driven module creation.

## Tech Stack and Dependencies

### Frontend Layer (Client-Side Application)

*   **Core Framework:** `Next.js` (App Router)
*   **UI Architecture:** `Tailwind CSS` + `Shadcn UI`
*   **Layout Engine:** `@dnd-kit/core` & `@dnd-kit/sortable`
*   **State Management:** `Zustand`

### Backend Layer (Business Logic & AI Engine)

*   **Runtime Environment:** `Node.js` (v20-alpine)
*   **Application Framework:** `NestJS`
*   **AI Gateway:** `OpenAI Node SDK` + `Vercel AI SDK Core` (utilizes Structured Outputs/Function Calling)
*   **Real-Time Gateway:** `@nestjs/websockets` (via `Socket.io`)
*   **Task Queue:** `BullMQ` (requires `Redis`)

### Database & Security Layer (Data Persistence)

*   **Database Engine:** `PostgreSQL` (utilizes native `JSONB` columns)
*   **Database Host:** `Supabase` (for cloud-hosted PostgreSQL)
*   **Object-Relational Mapper:** `Prisma ORM`
*   **Authentication & Guarding:** `@nestjs/passport` + `JSON Web Tokens (JWT)`
*   **Password Hashing:** `bcrypt`

### Infrastructure & Deployment (DevOps)

*   **Frontend Hosting:** `Vercel`
*   **Backend Hosting:** `Railway` / `Render` / `AWS ECS`
*   **Containerization:** `Docker`

## Features

Amelify is designed as a flexible and intelligent productivity platform, offering a core set of capabilities complemented by a rich, customizable module ecosystem.

### Core Platform Capabilities

*   **Modular Architecture:** A central framework allowing users to choose and integrate specific productivity widgets and tools into their workspace.
*   **Deep Personalization:** Complete layout customization, enabling users to build a tailored interface that maximizes their efficiency through drag-and-drop mechanics.
*   **Contextual AI Companion:** An embedded AI layer capable of analyzing daily agendas to send automated summaries, manage smart reminders, and answer complex questions about internal app data.
*   **AI Action Execution (Agents):** The capability for the AI to execute specific in-app functions (e.g., adding entries, changing configurations) when prompted by user text, leveraging structured outputs.

### Mandatory System Modules (Built-In on Install)

These foundational modules form the permanent framework of the application shell and cannot be removed by the user.

*   **Executive Insight Dashboard (Home Canvas):** The default landing page and central command center, aggregating high-level, cross-module insights such as top habits, upcoming schedule conflicts, and budget alerts into a single scannable view.
*   **Centralized AI Knowledge Copilot (AI Tab):** A dedicated conversational workspace connected directly to the application's global data layer, allowing users to query the AI assistant for complex, cross-functional answers based on their internal app data.

### Plug-and-Play Module Library (User-Customizable)

Optional, individual productivity blocks that users can choose, configure, and arrange on their dashboard.

*   **Habit Optimization Tracker:** A daily habit accountability widget with single-tap checkbox completions, displaying visual streak analytics and consistency trends.
*   **Unified Schedule & Task Engine:** A hybrid time-blocking interface merging calendar events with actionable task lists, enabling users to drag and drop tasks into specific time slots.
*   **Automated Inbox Purge Bot (Gmail Integration):** A background assistant connected via secure Gmail API to scan, categorize, and archive digital clutter, freeing up cloud storage space.
*   **Strategic Idea Grader & Market Evaluator:** A structured intake canvas that prompts users for new business or project concepts, leveraging the AI layer to generate viability scorecards and potential success ratings against market vectors.
*   **Modular Workout Architect & Tracker:** A fitness dashboard with customizable routine templates for rapid workout assembly, logging reps, sets, and weights, and summarizing historical training volume.
*   **Intelligent Meal Planner & Grocery Sync:** A dual-purpose kitchen management widget for mapping out weekly nutritional profiles and tracking household ingredients, dynamically compiling recipe ingredients into a consolidated grocery checklist.
*   **Personal Financial Analysis & Budget Ledger:** A secure expense tracker designed to monitor capital outflows and enforce categorical spending limits, generating interactive spending breakdown charts.

## Prerequisites / System Requirements

To set up and run Amelify locally, ensure you have the following installed:

*   **Node.js**: Version 20 or higher.
*   **npm**: Node Package Manager, typically installed with Node.js.
*   **Git**: For cloning the project repository.
*   **Docker** and **Docker Compose**: Required to run local instances of PostgreSQL and Redis for the backend services.

## Step-by-Step Installation / Setup

Follow these steps to get Amelify running on your local machine.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd amelify-project-root
```

### 2. Backend Setup

Navigate into the `backend` directory:

```bash
cd backend
```

#### a. Environment Variables

Create a `.env` file in the `backend` directory with the following variables. Adjust values for your local setup or Supabase/OpenAI credentials:

```ini
DATABASE_URL="postgresql://dev_operator:secret_db_pass123@localhost:5432/amelify_core?schema=public"
DIRECT_DATABASE_URL="postgresql://dev_operator:secret_db_pass123@localhost:5432/amelify_core?schema=public"
JWT_SECRET="YOUR_SUPER_SECRET_JWT_KEY"
OPENAI_API_KEY="YOUR_OPENAI_API_KEY" # Needed for AI functionalities
REDIS_URL="redis://localhost:6379" # For BullMQ
```

#### b. Start Local Database and Queue Services

Use Docker Compose to spin up PostgreSQL and Redis instances:

```bash
docker compose up -d
```

#### c. Install Dependencies

```bash
npm install
```

#### d. Apply Database Migrations

Run Prisma migrations to set up your database schema:

```bash
npx prisma migrate deploy
```

#### e. Build and Start the Backend

```bash
npm run build
npm start
# For development with hot-reloads:
# npm run start:dev
```

The backend server will typically run on `http://localhost:3000`.

### 3. Frontend Setup

Open a new terminal, navigate back to the project root, and then into the `frontend` directory:

```bash
cd ..
cd frontend
```

#### a. Install Dependencies

```bash
npm install
```

#### b. Start the Frontend Development Server

```bash
npm run dev
```

The frontend application will typically be accessible at `http://localhost:3001` (or another port if 3000 is occupied).

## Configuration & Environment Variables

The following environment variables are crucial for the application's operation. They should be set in your `.env` files (for local development) and securely configured in your deployment environment for production.

*   `DATABASE_URL`: The connection string for the PostgreSQL database. This points to the transactional session pool for the application runtime.
*   `DIRECT_DATABASE_URL`: A direct connection URL for the PostgreSQL database, primarily used by Prisma for schema migrations and introspection.
*   `JWT_SECRET`: A strong, secret key used for signing and verifying JSON Web Tokens (JWTs) for authentication.
*   `OPENAI_API_KEY`: Your API key for accessing OpenAI services, required for AI functionalities.
*   `REDIS_URL`: The connection URL for the Redis instance, used by BullMQ for background task processing.

## Quick Start / Usage Examples

Once Amelify is running, you can begin interacting with your personalized productivity hub.

1.  **Access the Application:** Open your web browser and navigate to the frontend URL (e.g., `http://localhost:3001`).
2.  **Authentication:** You will be prompted to either **Login** or **Sign Up** to access your dashboard.
3.  **Dashboard Overview:** Upon successful login, you'll land on your **Executive Dashboard**, a responsive grid canvas displaying your active modules.
    *   **Add Modules:** Click the `+ Add Workspace Module` card to open the **Module Marketplace** and select new productivity tools to integrate into your dashboard.
    *   **Rearrange Modules:** Long-press and drag any module card to reposition it on your dashboard. Neighboring cards will dynamically adjust.
    *   **Remove Modules:** Each module card features an options menu (usually in the top-right corner) allowing you to remove it from your workspace.
    *   **Expand Modules:** Click on any module card to expand it into a **Full App Sandbox Mode**, providing a dedicated, full-screen view for deeper interaction. Click the `← Back to Dashboard` button in the header to return to the grid view.
4.  **Navigation:** Use the **Left Command Sidebar** for quick access to core sections:
    *   **Dashboard:** Your main, customizable workspace.
    *   **AI Assistant:** A dedicated conversational interface where you can interact with the contextual AI companion.
    *   **Modules:** Browse and discover new plug-and-play modules available for your workspace.
    *   **Settings:** Manage your account profile, data, and security settings.
