![Project Status](https://img.shields.io/badge/status-in--progress-yellowgreen)
![Version](https://img.shields.io/badge/version-0.1.0-blue)

# Amelify

Amelify is a modular, AI-driven productivity hub designed as a flexible web application. It empowers users to select, customize, and arrange individual productivity modules to build a tailored interface that maximizes their efficiency. The platform features a metrics-first approach, with a central analytical scoring engine that processes real-time telemetry data from active modules to provide actionable insights. An integrated AI layer offers contextual assistance and enables intelligent automation of in-app functions.

## Table of Contents

*   [System Architecture](#system-architecture)
    *   [High-Level Overview](#high-level-overview)
    *   [Layered Structure](#layered-structure)
    *   [Core Backend Directory Structure](#core-backend-directory-structure)
    *   [Core Frontend Directory Structure](#core-frontend-directory-structure)
    *   [Vector RAG Integration](#vector-rag-integration)
*   [Tech Stack and Dependencies](#tech-stack-and-dependencies)
*   [Features](#features)
    *   [Core Platform Capabilities](#core-platform-capabilities)
    *   [Built-in System Modules](#built-in-system-modules)
    *   [Plug-and-Play Module Library](#plug-and-play-module-library)
    *   [Augmented Intelligence Layer](#augmented-intelligence-layer)
*   [Prerequisites / System Requirements](#prerequisites--system-requirements)
*   [Step-by-Step Installation / Setup](#step-by-step-installation--setup)
*   [Configuration & Environment Variables](#configuration--environment-variables)
*   [Quick Start / Usage Examples](#quick-start--usage-examples)

## System Architecture

Amelify is structured as a robust, scalable web application designed to separate concerns across distinct layers, facilitating modularity and maintainability. Initially conceived as a Progressive Web App (PWA), the architecture pivoted to a standard web application to overcome mobile web limitations and ensure reliable performance.

### High-Level Overview

The system comprises a Next.js frontend, a NestJS backend, a PostgreSQL database for persistence, and integrated AI capabilities leveraging both local and cloud-based LLMs.

```mermaid
graph TD
    User(User) --- Frontend[Frontend: Next.js App]
    Frontend --> Backend[Backend: NestJS API]
    Backend --> Database(Database: PostgreSQL/Supabase)
    Backend --> AI(AI Layer: OpenAI/Vercel AI SDK)
    Backend --> Queue(Task Queue: BullMQ/Redis)
    Frontend -- Real-time via Socket.io --> Backend
    AI -- Hybrid Model --> LocalLLM(Local LLM + RAG Pipeline)
    AI -- Fallback --> CloudLLM(Cloud LLM APIs)
```

### Layered Structure

*   **Frontend Layer (Client-Side Web Application):** Built with Next.js, focusing on dynamic dashboard changes, responsive layouts, and rich user interactions. It consumes data and services from the NestJS backend.
*   **Backend Layer (Business Logic & AI Engine):** A standalone NestJS application running on Node.js. It enforces a highly structured, scalable architecture with features isolated into dedicated modules. This layer handles business logic, AI interactions, real-time communication, and asynchronous tasks.
*   **Database & Security Layer:** Utilizes PostgreSQL hosted on Supabase for relational data integrity and flexible JSONB storage for user-defined widget layouts. Authentication is managed via JWTs and NestJS Passport.
*   **Infrastructure & Deployment (DevOps):** Frontend hosted on Vercel, with the backend deployed on scalable cloud environments like Railway, Render, or AWS ECS, containerized using Docker. Automated CI/CD pipelines are managed via GitHub Actions.
*   **Hybrid AI Model:** Mitigates hardware limitations and high token costs by employing a multi-tier LLM strategy:
    *   **Tier 1 (Server-side):** Local LLM leveraging a RAG pipeline pulled directly from the database for cost-effective, contextual data queries.
    *   **Tier 2 (Client-side):** Intelligent device detection falls back to free-tier cloud LLM APIs for active mobile users when local resources are constrained.

### Core Backend Directory Structure

```
backend/
├── src/
│   ├── app.module.ts           # Central module bootstrapping the application
│   ├── main.ts                 # Application entry point (CORS, validation pipes)
│   ├── auth/                   # Authentication & User verification
│   │   ├── strategy/           # JWT extraction strategies
│   ├── prisma/                 # Database client abstractions
│   ├── workspace/              # Grid layouts & Module assignments
│   ├── real-time/              # Real-Time Event Gateway (Socket.io)
│   ├── queue/                  # Async Task Management (BullMQ + Redis)
│   └── modules-data/           # Individual core engines data persistence
│       ├── habits/
│       ├── tasks/
│       └── finance/
├── prisma/
│   └── schema.prisma           # Prisma Object Relational Mapping configuration
├── docker-compose.yml          # Container configuration for Postgres and Redis
└── package.json
```

### Core Frontend Directory Structure

```
frontend/
├── app/
│   ├── layout.tsx              # Root HTML/Body wrapper, theme, global CSS
│   ├── page.tsx                # Automatic redirect logic to /login or /dashboard
│   ├── (auth)/                 # Isolated authentication screens (No Sidebar)
│   └── (app)/                  # Authenticated Application Shell Context
│       ├── layout.tsx          # Injects Global Sidebar Nav around side-by-side pages
│       ├── dashboard/page.tsx  # Multi-Column Bento-Box Canvas Layout (Home Page)
│       ├── ai/page.tsx         # Chat Interface with RAG UI Context
│       ├── modules/page.tsx    # Module Search & Preview Marketplace
│       └── settings/page.tsx   # User Settings Configuration Profile
├── components/
│   ├── navigation/
│   ├── dashboard/
│   └── widgets/                # Sandboxed components for individual modules
├── store/
│   └── useWorkspaceStore.ts    # Consolidated Zustand state for layouts & full-screen views
└── types/
    └── dashboard.ts            # Type structures for widgets and application state
```

### Vector RAG Integration

The intelligent framework feeds text abstractions from various modules directly into a retrieval-augmented generation (RAG) pipeline, preventing isolated data silos and enriching the AI's contextual understanding.

```mermaid
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

## Tech Stack and Dependencies

The Amelify platform is built using a modern, scalable, and highly modular technology stack.

### Frontend
*   **Framework:** `Next.js` (App Router)
*   **UI/Styling:** `Tailwind CSS`, `Shadcn UI`
*   **PWA Engine:** `@serwist/next` (for web manifest and service workers, initially considered but later pivoted from full PWA)
*   **Layout Engine:** `@dnd-kit/core`, `@dnd-kit/sortable`
*   **State Management:** `Zustand`

### Backend
*   **Runtime:** `Node.js`
*   **Application Framework:** `NestJS`
*   **AI Gateway:** `OpenAI Node SDK`, `Vercel AI SDK Core` (for Structured Outputs/Function Calling)
*   **Real-Time Gateway:** `@nestjs/websockets` (via `Socket.io`)
*   **Task Queue:** `BullMQ` (requires Redis)

### Database & Security
*   **Database Engine:** `PostgreSQL` (utilizing `JSONB` columns)
*   **Database Host:** `Supabase`
*   **Object-Relational Mapper (ORM):** `Prisma ORM`
*   **Authentication:** `@nestjs/passport`, `JSON Web Tokens (JWT)`, `bcrypt` (for password hashing)

### Infrastructure & DevOps
*   **Frontend Hosting:** `Vercel`
*   **Backend Hosting:** `Railway` / `Render` / `AWS ECS`
*   **Containerization:** `Docker`
*   **CI/CD:** `GitHub Actions`

## Features

Amelify is designed to be a deeply personalized and intelligent productivity platform, offering a rich set of capabilities:

### Core Platform Capabilities
*   **Modular Architecture:** A central framework where users select, configure, and arrange individual productivity widgets and tools on their workspace.
*   **Deep Personalization:** Complete layout customization allowing users to build a tailored interface that maximizes their efficiency.
*   **Metrics-First Dashboard:** The default landing page focuses entirely on performance diagnostics, acting as an execution terminal for the overarching Scoring Engine.
*   **Analytical Scoring Engine:** Processes real-time telemetry datasets from active sub-modules into a unified "Life Score" (0–100 scale), tracking historical trends, streaks, and identifying areas for improvement.
*   **Dynamic Layout Throttling:** The dashboard layout dynamically adjusts column density (3/2/1 columns) based on screen size, preserving row expansion.
*   **Open-Source Module Ecosystem:** Designed with an interface (`ISystemLifecycleModule`) to facilitate community-driven module creation and expansion.

### Built-in System Modules
These foundational modules form the permanent framework of the application shell and are integral to the core experience:
*   **Executive Insight Dashboard (Home Canvas):** The default landing page and central command center, aggregating high-level, cross-module insights (e.g., today's top habits, upcoming schedule conflicts, budget alerts).
*   **Centralized AI Knowledge Copilot (AI Tab):** A dedicated conversational workspace connected directly to the application's global data layer, allowing users to query the AI assistant for complex, cross-functional answers regarding their internal app data.

### Plug-and-Play Module Library
Optional, individual productivity blocks that users can choose, configure, and arrange on their dashboard:
*   **Habit Optimization Tracker:** Daily habit accountability widget with single-tap checkbox completions, visual streak analytics, and consistency trends.
*   **Unified Schedule & Task Engine:** A hybrid time-blocking interface merging calendar events with actionable task lists, allowing drag-and-drop task scheduling.
*   **Automated Inbox Purge Bot (Gmail Integration):** A background assistant to scan, categorize, and archive digital clutter like newsletters and promotions.
*   **Strategic Idea Grader & Market Evaluator:** Structured intake canvas that prompts users for new concepts, leveraging AI to evaluate inputs against market vectors, generating viability scorecards.
*   **Modular Workout Architect & Tracker:** A fitness dashboard with customizable routine templates, logging reps, sets, and weights, and summarizing training volume.
*   **Intelligent Meal Planner & Grocery Sync:** A dual-purpose kitchen management widget for mapping weekly nutritional profiles and tracking household ingredients, dynamically compiling grocery lists.
*   **Personal Financial Analysis & Budget Ledger:** A secure expense tracker to monitor capital outflows and enforce categorical spending limits, generating interactive spending breakdown charts.
*   **Comprehensive Goal Engine (Proposed):** Features deep compartmentalization between near-term and long-term milestones, returning completion ratios and deadline alerts.
*   **Intelligent Journal Terminal (Proposed):** A distraction-free markdown canvas captured by a background analytical agent to summarize emotional tone, recurring blocks, and text abstractions.
*   **Unified Technical Notebook (Proposed):** Optimized for structured information indexing, code blocks, and knowledge mapping, updating conceptual tags and tracking contribution volumes.
*   **High-Velocity Project Tracker (Proposed):** Tracks development progress, timeline roadmaps, and sprint milestones, calculating task completion velocity and progress percentages.

### Augmented Intelligence Layer
*   **Contextual AI Companion:** Embedded AI layer analyzing daily agendas, sending automated summaries, managing smart reminders, and answering questions about internal app data.
*   **AI Action Execution (Agents):** Capability for the AI to execute specific in-app functions (e.g., adding entries, changing configurations) when prompted by user text, leveraging Structured Outputs (Function Calling).
*   **Continuous System Observation:** The conversational AI reviews contextual data gaps across distinct modules over time (e.g., matching Project Tracker drop-offs with Journal Terminal changes).
*   **Automated Weekly Reviews:** The system can automatically create comprehensive status overviews blending qualitative journal notes with quantitative project stats for actionable insights.
*   **Proactive Warning Flags:** Highlights related entries across goals and projects when searching technical notes, ensuring cross-functional knowledge is always available.

## Prerequisites / System Requirements

To set up Amelify for local development, you will need:

*   **Node.js:** Version 20 or higher.
*   **npm** or **Yarn:** A package manager for JavaScript.
*   **Docker:** Required to run local instances of PostgreSQL and Redis for the backend services.

## Step-by-Step Installation / Setup

Follow these steps to get Amelify up and running on your local machine:

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd amelify
    ```

2.  **Set up Local Database and Queue (Docker):**
    Navigate to the `backend` directory and start the PostgreSQL and Redis containers using Docker Compose.
    ```bash
    cd backend
    docker compose up -d
    ```

3.  **Install Backend Dependencies & Initialize Prisma:**
    ```bash
    cd backend
    npm install
    npx prisma migrate dev --name init # Or npx prisma db push if no migrations exist yet
    ```

4.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

5.  **Configure Environment Variables:**
    Create `.env` files in both `backend/` and `frontend/` directories. Refer to the [Configuration & Environment Variables](#configuration--environment-variables) section for required variables.

6.  **Start the Development Servers:**
    In separate terminal windows, start the backend and frontend development servers:

    ```bash
    # For backend
    cd backend
    npm run start:dev
    ```
    ```bash
    # For frontend
    cd frontend
    npm run dev
    ```

    The frontend application will typically be accessible at `http://localhost:3000`.

## Configuration & Environment Variables

Amelify requires specific environment variables for both backend and frontend operations. Create `.env` files in your `backend/` and `frontend/` root directories, and populate them as follows:

### Backend (`backend/.env`)
```env
# Database Configuration (for local Docker setup)
DATABASE_URL="postgresql://dev_operator:secret_db_pass123@localhost:5432/amelify_core?schema=public"
DIRECT_DATABASE_URL="postgresql://dev_operator:secret_db_pass123@localhost:5432/amelify_core" # Used by Prisma for migrations

# JWT Authentication Secret
JWT_SECRET="YOUR_SUPER_SECRET_JWT_KEY"

# Redis Configuration (for BullMQ)
REDIS_HOST="localhost"
REDIS_PORT=6379

# OpenAI API Key (for AI integration)
OPENAI_API_KEY="sk-..."
```

### Frontend (`frontend/.env`)
```env
# Example: Backend API URL
NEXT_PUBLIC_API_URL="http://localhost:3000"
# Add other public environment variables here as needed.
```

## Quick Start / Usage Examples

Amelify provides an intuitive interface for managing your productivity modules.

1.  **Access the Application:** Once the frontend server is running, navigate to `http://localhost:3000` in your web browser.
2.  **Authentication:** Sign up for a new account or log in if you already have one.
3.  **Dashboard Overview:** Upon login, you will land on the Executive Dashboard, presenting a metrics-first view of your aggregated performance.
4.  **Managing Modules:**
    *   Navigate to the "Modules" section from the sidebar.
    *   Click on an empty `[+] Add Workspace Module` slot to open the Module Selector.
    *   Select and "Add" new modules to your dashboard.
    *   On the dashboard, modules appear as cards. You can:
        *   **Rearrange:** Long-press/hold a card to enter edit mode and drag-and-drop modules to new positions.
        *   **Expand:** Click on a module card to enter its full-screen "Application Sandbox" mode for detailed interaction.
        *   **Manage:** Use the options context menu (`[...]` on hover) to access module-specific settings or remove a module.

### Backend API Usage (Example: Workspace Layout Sync)

The backend provides API endpoints to manage user workspace layouts.

*   **Get User Workspace Layout:**
    ```http
    GET /workspace
    ```
    **Headers:**
    `Authorization: Bearer <your-jwt-token>`
    **Response (Example):**
    ```json
    {
      "id": "uuid-workspace-id",
      "userId": "uuid-user-id",
      "layout": [
        { "id": "widget-1", "type": "HABIT_TRACKER", "title": "My Habits", "meta": {} },
        { "id": "widget-2", "type": "TASK_ENGINE", "title": "Daily Tasks", "meta": {} }
      ],
      "createdAt": "2026-07-08T...",
      "updatedAt": "2026-07-08T..."
    }
    ```

*   **Sync/Save Workspace Layout:**
    ```http
    POST /workspace/sync
    ```
    **Headers:**
    `Authorization: Bearer <your-jwt-token>`
    **Request Body:**
    ```json
    {
      "layout": [
        { "id": "widget-1", "type": "HABIT_TRACKER", "title": "My Habits", "meta": { "positionX": 0, "positionY": 0 } },
        { "id": "widget-2", "type": "TASK_ENGINE", "title": "Daily Tasks", "meta": { "positionX": 1, "positionY": 0 } }
      ]
    }
    ```
