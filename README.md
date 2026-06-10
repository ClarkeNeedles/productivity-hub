# Amelify

---

## Project Overview

Amelify is a modular, AI-driven web application designed as a highly personalized productivity hub. It functions as a flexible shell where users can select, customize, and arrange individual productivity modules to match their specific workflows. The platform is built on a validated modular architecture and leverages a hybrid AI model to provide contextual intelligence and agent-like capabilities, empowering users to tailor their digital workspace for maximum efficiency.

---

## Current Status

**Status:** In Progress
**Version:** 0.0.0

---

## Key Features

The following capabilities have been successfully established or architected into the core system:

### Core Application Framework
*   **Web Application Shell:** A modern and responsive frontend built using Next.js, Tailwind CSS, and Shadcn UI, providing a dynamic user interface. The project has pivoted from PWA-specific constraints to a standard web application layout.
*   **Modular Architecture:** The foundational framework is established and validated, allowing users to seamlessly integrate and arrange individual productivity modules dynamically.
*   **Drag-and-Drop Grid Layout:** An interactive canvas enabling users to freely position and organize modules within their personalized workspace.
*   **Persistent User Layouts:** User-defined module arrangements and configurations are saved to the database, ensuring their personalized workspace state is maintained across sessions.
*   **Robust Backend Core & API Routing:** The core engine framework and backend API routing are successfully established, providing a scalable foundation for application logic and data flow.

### Artificial Intelligence Foundation
*   **Hybrid AI Model Strategy:** A multi-tier LLM approach designed to optimize performance and cost. This strategy includes a server-side local LLM leveraging a RAG pipeline for contextual data and client-side fallback to free-tier cloud LLMs for active mobile users.
*   **AI Gateway Integration:** Backend services are integrated with the OpenAI Node SDK and Vercel AI SDK Core, providing a robust connection to advanced language models.
*   **Structured Outputs Capability:** The AI framework is architected to utilize function calling, allowing the AI to parse natural language and execute specific backend application functions (e.g., adding calendar events, managing tasks).

### Data Persistence Layer
*   **PostgreSQL Database:** Utilized as the primary database engine, leveraging native `JSONB` columns for highly flexible storage of user-defined widget layouts and configurations.
*   **Prisma ORM Integration:** Connects the NestJS backend to PostgreSQL, ensuring type-safe, efficient, and reliable database operations.

---

## Tech Stack

### Frontend Layer (Client-Side Web Application)
*   **Core Framework:** `Next.js` (App Router)
*   **UI Architecture:** `Tailwind CSS` + `Shadcn UI`
*   **Layout Engine:** `@dnd-kit/core` & `@dnd-kit/sortable`
*   **State Management:** `Zustand`

### Backend Layer (Business Logic & AI Engine)
*   **Runtime Environment:** `Node.js`
*   **Application Framework:** `NestJS`
*   **AI Gateway:** `OpenAI Node SDK` + `Vercel AI SDK Core`
*   **Real-Time Gateway (Planned):** `@nestjs/websockets` (via `Socket.io`)
*   **Task Queue (Planned):** `BullMQ` (Requires Redis)

### Database & Security Layer (Data Persistence)
*   **Database Engine:** `PostgreSQL`
*   **Database Host:** `Supabase`
*   **Object-Relational Mapper:** `Prisma ORM`
*   **Authentication & Guarding (Planned):** `@nestjs/passport` + `JSON Web Tokens (JWT)`

### Infrastructure & Deployment (DevOps)
*   **Frontend Hosting:** `Vercel`
*   **Backend Hosting (Options):** `Railway` / `Render` / `AWS ECS`
*   **Containerization:** `Docker`