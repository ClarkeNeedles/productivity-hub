![Status: In Progress](https://img.shields.io/badge/status-in%20progress-blue)
![Version](https://img.shields.io/badge/version-0.6.8-green)

# Amelify (Moduflow / AscendOS)

## High-Level Overview
Amelify is a modular, AI-driven personal productivity hub and life-operating system. Instead of forcing users into a rigid, pre-built layout, the application functions as a flexible shell where individuals can select, customize, and arrange individual productivity widgets (modules) to match their personal workflows. It features a central life scoring engine that normalizes telemetry data from all active tracking widgets into a unified health metric ("Life Score"), an AI-powered conversational RAG companion, and an extensible architecture designed for custom community modules.

## System Architecture
Amelify is built as a decoupled, multi-tier application separating a client-side Next.js frontend from a robust backend architecture, leveraging Supabase and PostgreSQL for persistent cloud data governance.

### High-Level Blueprint & Data Flow
- **Frontend Presentation Layer:** Built on Next.js (App Router) with Tailwind CSS, Shadcn UI, and Zustand for state management. Uses primitive string ID tracking (`moduleId`) and decoupled store dictionaries to maintain lightning-fast render cycles.
- **Backend Infrastructure (NestJS Engine):** An isolated microservice architecture structured into independent modules (`auth`, `workspace`, `real-time`, `queue`, `modules-data`) communicating through typed contracts.
- **Database Persistence & Security Layer:** Powered by PostgreSQL hosted on Supabase. Utilizes native `JSONB` columns to store flexible, user-defined widget layouts and module configurations within queryable fields. Implements row-level security (RLS) policies and Passport JWT guards for REST and WebSocket connection validation.
- **Async Background Processing:** Utilizes BullMQ coupled with a local Redis instance container to handle long-running analytical transformations, cron tasks, and scheduled summaries.

## Tech Stack and Dependencies

### Frontend (Client-Side PWA / Web App)
* **Core Framework:** `Next.js` (App Router)
* **Styling & UI Systems:** `Tailwind CSS`, `Shadcn UI`
* **State Management:** `Zustand`
* **Icons & Assets:** `Lucide React`

### Backend & AI Gateway
* **Runtime Environment:** `Node.js`
* **Application Framework:** `NestJS`
* **AI Integration:** `OpenAI Node SDK`, `Vercel AI SDK Core` (GPT-4o with Structured Outputs / Function Calling)
* **Real-Time Communications:** `@nestjs/websockets` (`Socket.io`)
* **Task Queue Engine:** `BullMQ` + `Redis`

### Database & Security
* **Database Engine:** `PostgreSQL` (Hosted via `Supabase`)
* **Object-Relational Mapper (ORM):** `Prisma ORM` (`@prisma/client`)
* **Authentication & Guards:** `@nestjs/passport`, `Passport-JWT`, `bcrypt`

### Infrastructure & DevOps
* **Frontend Hosting:** `Vercel`
* **Backend Hosting:** `Railway` / `Render` / `AWS ECS`
* **Containerization:** `Docker` & `Docker Compose` (for local PostgreSQL and Redis instances)
* **CI/CD Automation:** `GitHub Actions`

## Features
* **Modular Dashboard Canvas:** A flexible Bento-box grid layout where users can mount, arrange, and remove individual productivity modules.
* **Granular Module Ecosystem:** Includes foundational and plug-and-play modules such as the **Streak Counter Module** (with live heatmap histories and 24-hour reset mechanisms), **Habit Optimization Tracker**, **Unified Schedule & Task Engine**, **Intelligent Meal Planner**, **Personal Financial Ledger**, and **Strategic Idea Grader**.
* **Global Life Score Engine:** Aggregates real-time telemetry datasets from all active sub-modules to calculate a unified performance index (out of 100%) complete with streak counters and trend analytics.
* **Centralized AI Knowledge Copilot:** A conversational RAG workspace connected directly to the application's global data layer, capable of cross-functional queries, telemetry summaries, and in-app action execution.
* **Persistent Authentication & State Hydration:** Secure cookie-based session validation routing users seamlessly between authenticated application views and encrypted Supabase data channels.

## Prerequisites / System Requirements
* **Node.js:** Version 20.x or higher
* **Package Manager:** `npm` (v9+) or `npm ci`
* **Container Engine:** `Docker` and `Docker Compose` (for running local PostgreSQL and Redis development dependencies)
* **Database Provider:** A free-tier Supabase project account (for cloud persistence and migration management)

## Step-by-Step Installation / Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/amelify.git
cd amelify
```

### 2. Initialize Local Infrastructure (Database & Redis)
Deploy local containers for PostgreSQL and Redis using Docker Compose:
```bash
docker compose up -d
```

### 3. Configure Environment Variables
Create a `.env.local` file inside the `frontend/` directory (and a corresponding `.env` file inside your `backend/` directory) containing your operational credentials:
```env
DATABASE_URL="postgresql://dev_operator:secret_db_pass123@localhost:5432/amelify_core"
DIRECT_DATABASE_URL="postgresql://dev_operator:secret_db_pass123@localhost:5432/amelify_core"
JWT_SECRET="your_super_secret_jwt_key_here"
```

### 4. Install Dependencies & Run Database Migrations
Navigate to your backend directory to install packages and sync Prisma schema profiles:
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
```

Navigate to the frontend workspace to install client packages:
```bash
cd ../frontend
npm install
```

### 5. Launch the Development Server
Start the Next.js development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Configuration & Environment Variables
The application relies on the following key environment variables for runtime security and data linkage:
* `DATABASE_URL`: Transaction/session pool connection string pointing to your Supabase or local PostgreSQL instance.
* `DIRECT_DATABASE_URL`: Direct TCP connection string used exclusively by Prisma to execute database migrations (`prisma migrate deploy`).
* `JWT_SECRET`: Secret cryptographic key used to sign and verify JSON Web Tokens across HTTP and WebSocket connections.

## Quick Start / Usage Examples

### Instantiating a Module Programmatically (TypeScript Blueprint Example)
To build a custom module that integrates seamlessly into the Amelify dashboard grid and scoring engine, extend the `BaseModule` abstract class:

```typescript
import { BaseModule } from '@/types/dashboard';

export class CustomProductivityModule extends BaseModule {
  readonly moduleId = 'custom-module';
  moduleTitle = 'Custom Tracker';

  renderCompactPreview(): JSX.Element {
    return <CustomCardPreview />;
  }

  renderFocusView(): JSX.Element {
    return <CustomSandboxDashboard />;
  }

  exposeTelemetryData() {
    return {
      sourceModuleToken: this.moduleId,
      timestampUTC: new Date().toISOString(),
      scoringContributionFactor: 85,
      localizedMetrics: [
        { label: 'Completed Actions', numericalValue: 4, unitString: 'items' }
      ],
      textSummaryExport: 'User completed 4 custom actions successfully today.'
    };
  }
}
```

## License Declaration
This project is open-source software available under the terms of the MIT License.