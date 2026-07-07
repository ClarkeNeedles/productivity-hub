![Project Status](https://img.shields.io/badge/status-in%2Dprogress-blue)
![Project Version](https://img.shields.io/badge/version-0.0.0-lightgrey)

# Amelify: The Modular, AI-Driven Shell for Personal Productivity

Amelify is an all-in-one productivity hub designed as a flexible web application. It empowers users to select, customize, and arrange individual productivity modules to construct a personalized workspace that perfectly matches their unique workflows. Beyond rigid, pre-built layouts, Amelify integrates a contextual AI companion capable of delivering automated summaries, smart reminders, and executing in-app actions based on user prompts.

## Table of Contents
- [System Architecture](#system-architecture)
- [Tech Stack and Dependencies](#tech-stack-and-dependencies)
- [Features](#features)
- [Prerequisites / System Requirements](#prerequisites--system-requirements)
- [Step-by-Step Installation / Setup](#step-by-step-installation--setup)
- [Configuration & Environment Variables](#configuration--environment-variables)

## System Architecture

Amelify employs a robust, modular architecture designed for scalability and deep personalization. It consists of a decoupled frontend and backend, supported by a persistent data layer and containerized infrastructure.

### Core Framework
The application functions as a flexible shell where users interact with a customizable grid-based layout. Modules are plug-and-play components that users can add, remove, and reposition.

### AI Integration
A hybrid AI model is implemented to balance performance and cost. It utilizes:
*   **Tier 1 (Server-side):** A local LLM with a RAG (Retrieval-Augmented Generation) pipeline, directly accessing the application's database for context-rich responses without additional training costs.
*   **Tier 2 (Client-side Fallback):** Intelligent device detection directs mobile users to free-tier cloud LLM APIs for active interactions, mitigating mobile hardware limitations.

### Module Ecosystem
Amelify is structured around two types of modules:

#### Mandatory System Modules (Built-In)
These foundational modules form the permanent framework of the application shell and cannot be removed by the user.
*   **Executive Insight Dashboard (Home Canvas):** The default landing page and central command center, aggregating high-level, cross-module insights.
*   **Centralized AI Knowledge Copilot (AI Tab):** A dedicated conversational workspace connected to the application's global data layer, allowing complex, cross-functional queries about internal app data.

#### Plug-and-Play Module Library (User-Customizable)
Optional, individual productivity blocks that users can choose, configure, and arrange on their dashboard.

## Tech Stack and Dependencies

### Frontend Layer (Client-Side Web Application)
*   **Core Framework:** `Next.js` (App Router) - For fast routing, asset loading, and client-side performance.
*   **UI Architecture:** `Tailwind CSS` + `Shadcn UI` - For a responsive, modern, and lightweight design system.
*   **Layout Engine:** `@dnd-kit/core` & `@dnd-kit/sortable` - Powers drag-and-drop mechanics for module rearrangement.
*   **State Management:** `Zustand` - Lightweight client-side store for immediate UI states.

### Backend Layer (Business Logic & AI Engine)
*   **Runtime Environment:** `Node.js` - Execution environment for JavaScript/TypeScript.
*   **Application Framework:** `NestJS` - Structured, scalable architecture with isolated modules.
*   **AI Gateway:** `OpenAI Node SDK` + `Vercel AI SDK Core` - Connects to LLMs (e.g., GPT-4o), leveraging Structured Outputs (Function Calling).
*   **Real-Time Gateway:** `@nestjs/websockets` (via `Socket.io`) - Handles real-time communication for streaming AI responses.
*   **Task Queue:** `BullMQ` (requires Redis) - Manages asynchronous background processing (e.g., daily notifications).

### Database & Security Layer (Data Persistence)
*   **Database Engine:** `PostgreSQL` - Provides relational data integrity, utilizing `JSONB` for flexible widget layouts.
*   **Database Host:** `Supabase` - Cloud hosting for PostgreSQL and file storage.
*   **Object-Relational Mapper:** `Prisma ORM` - Connects NestJS to PostgreSQL, generating end-to-end TypeScript types.
*   **Authentication & Guarding:** `@nestjs/passport` + `JSON Web Tokens (JWT)` - Secures REST and WebSocket endpoints.

### Infrastructure & Deployment (DevOps)
*   **Containerization:** `Docker` - For consistent environments across development and production.
*   **Frontend Hosting:** `Vercel` - Optimized for Next.js deployments.
*   **Backend Hosting:** `Railway` / `Render` / `AWS ECS` - For scalable Node.js processes.

## Features

Amelify offers a comprehensive set of features, categorized into its foundational system and customizable modules:

### Core System Capabilities
*   **Modular Architecture:** A central framework allowing users to choose and integrate specific productivity widgets.
*   **Deep Personalization:** Complete layout customization enabling users to build a tailored interface.
*   **Contextual AI Companion:** An embedded AI layer providing automated summaries, smart reminders, and answers based on internal app data.
*   **AI Action Execution (Agents):** The AI can execute specific in-app functions (e.g., adding entries, changing configurations) when prompted by user text.
*   **Email Summaries & Webhooks:** Replaces native push notifications for alerts and daily agenda summaries.

### Mandatory System Modules
These modules are integral to the Amelify experience:
*   **Executive Insight Dashboard:** The central command center, aggregating high-level, cross-module insights such as top habits, schedule conflicts, and budget alerts.
*   **Centralized AI Knowledge Copilot:** A dedicated conversational interface for querying the AI assistant on complex, cross-functional data (e.g., financial planning based on budget and calendar, workout trend summaries).

### Plug-and-Play Module Library
Users can select and arrange these optional modules on their dashboard:
*   **Habit Optimization Tracker:** Daily habit accountability with single-tap completions and visual streak analytics.
*   **Unified Schedule & Task Engine:** A hybrid time-blocking interface merging calendar events with actionable task lists, allowing drag-and-drop task scheduling.
*   **Automated Inbox Purge Bot:** (Via secure Gmail API) Scans, categorizes, and archives digital clutter like newsletters and expired promotions.
*   **Strategic Idea Grader & Market Evaluator:** A structured canvas for new business/project concepts, leveraging AI to generate viability scorecards and success ratings.
*   **Modular Workout Architect & Tracker:** A fitness dashboard with customizable routine templates, logging reps, sets, weights, and summarizing training volume.
*   **Intelligent Meal Planner & Grocery Sync:** Manages weekly nutritional profiles, tracks ingredients, and compiles grocery checklists dynamically from scheduled meals.
*   **Personal Financial Analysis & Budget Ledger:** A secure expense tracker monitoring capital outflows, enforcing categorical spending limits, and generating interactive spending charts.

## Prerequisites / System Requirements

To set up Amelify locally or prepare for deployment, ensure the following are available:

*   **Node.js:** The underlying runtime environment.
*   **Package Manager:** `npm` or `yarn` (implicitly required with Node.js).
*   **Docker & Docker Compose:** For running local instances of PostgreSQL and Redis.
*   **Supabase Account:** For cloud-hosted PostgreSQL and asset storage.
*   **OpenAI API Key:** For integrating with AI models.

## Step-by-Step Installation / Setup

Follow these steps to initialize your Amelify development environment:

1.  **Initialize Monorepo:** Set up a monorepo (or two tightly linked repositories) for the Next.js frontend and NestJS backend.
2.  **Dockerize Local Dependencies:** Create a `docker-compose.yml` file to spin up local instances of PostgreSQL and Redis for development.
3.  **Database Initialization:**
    *   Set up a new project on `Supabase`.
    *   Initialize `Prisma` in your NestJS backend.
    *   Connect Prisma to your Supabase PostgreSQL database instance.
4.  **Define Base Schema:** Design your initial Prisma schema to include core infrastructure tables:
    *   `User` table (ID, email, password hash).
    *   `Workspace` table (ID, userId, layout profile).
    *   `WidgetInstance` table (ID, workspaceId, type, positionX, positionY, customizationData JSONB).

## Configuration & Environment Variables

Key configurations and environment variables required for Amelify:

*   **Database Connection:**
    *   `DATABASE_URL`: Your Supabase PostgreSQL connection string (for Prisma).
*   **Authentication:**
    *   `JWT_SECRET`: A secure secret key for signing and verifying JSON Web Tokens.
*   **AI Integration:**
    *   `OPENAI_API_KEY`: Your API key for OpenAI services.
    *   `VERCEL_AI_SDK_CORE_API_KEY`: API key for Vercel AI SDK Core.
*   **Queueing:**
    *   `REDIS_URL`: Connection string for your Redis instance (for BullMQ).
*   **External Integrations (Optional):**
    *   `GMAIL_API_CLIENT_ID`, `GMAIL_API_CLIENT_SECRET`, `GMAIL_API_REDIRECT_URL`: Credentials for the Automated Inbox Purge Bot.