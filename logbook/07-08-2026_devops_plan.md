---
title: "DevOps plan"
date: 7-8-2026
project-phase: planning
version: 0.0.0
---

# 📁 Infrastructure & Deployment Directory Structure
To manage production build orchestration smoothly from your local VS Code workspace, organize your deployment scripts and configurations directly within the project roots:
```
(root)/
├── .github/
│   └── workflows/
│       └── backend-deploy.yml    # CI/CD automation targeting your backend host
├── frontend/
│   ├── vercel.json               # Frontend deployment configuration for Vercel
│   └── next.config.ts            # Production build optimizations (standalone mode)
└── backend/
    ├── Dockerfile                # Production multi-stage build recipe
    ├── .dockerignore             # Excludes node_modules and local environments from build
    └── railway.json              # Optional deployment configuration file for Railway
```

## 📋 High-Level DevOps & Deployment Plan
This stage transitions your micro-services from local host machines to cloud-scale infrastructure. It splits the static, serverless Next.js frontend away from the stateful, persistent NestJS runtime engine.

* Step 1: Production Container Crafting: Write a multi-stage production Dockerfile for the NestJS backend. Use slim baseline images to compile the TypeScript distribution artifacts while keeping production image layers lightweight.
* Step 2: Environment Provisioning: Configure production projects inside Vercel (for the frontend) and your choice of Railway / Render (for the backend). Bind production environment secrets (DATABASE_URL, JWT_SECRET) securely to each dashboard.
* Step 3: Frontend Deployment on Vercel: Connect your git repository to Vercel. Set the frontend root directory framework to look at the Next.js app, mapping build settings automatically using incremental static generation cache pipelines.
* Step 4: Continuous Backend Delivery Pipeline: Configure a GitHub Action pipeline or native Git-integrated webhooks (like Railway’s automatic branch monitoring). Ensure that every merge to your main branch fires a clean source pull, builds the backend container, runs database schema upgrades via prisma migrate deploy, and updates the live container instance.

## 🛠️ Core Functional Deployment Files
## 1. Production Multistage Containerization (backend/Dockerfile)
This file uses an isolated build stage to strip out development dependencies (devDependencies), ensuring your production container only ships lean, compiled JavaScript modules.

```
# --- Stage 1: Build Dependencies ---
FROM node:20-alpine AS builder
WORKDIR /usr/src/app

# Copy dependency configuration frames
COPY package*.json ./
COPY prisma ./prisma/

# Install full development dependencies to compile TypeScript source code
RUN npm ci

# Copy application source matrices
COPY . .

# Run data client generation and TypeScript project build compilation
RUN npx prisma generate
RUN npm run build

# --- Stage 2: Production Execution Runtime ---
FROM node:20-alpine AS runner
WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copy built artifacts and critical runtime settings from the builder stage
COPY package*.json ./
COPY prisma ./prisma/
COPY --from=builder /usr/src/app/dist ./dist

# Install strictly production dependencies to maximize execution speed and trim asset size
RUN npm ci --only=production
RUN npx prisma generate

# Expose NestJS standard operational network port mapping
EXPOSE 3000

# Fire the lightweight production server node process
CMD ["node", "dist/main.js"]
```

## 2. Container Build Exclusion Profile (backend/.dockerignore)
Prevents bloating the Docker build context by blocking the upload of massive local directory builds into the container matrix.

- node_modules
- dist
- .env
- .env.local
- .git
- Dockerfile
- .dockerignore

## 3. Automatic Schema Upgrade Pipeline (.github/workflows/backend-deploy.yml)
An automated GitHub Actions continuous integration layout example. It runs production database upgrades directly against Supabase before building and shipping your fresh backend application code to your server provider.
```
name: Production Engine Deployment Pipeline
on:
  push:
    branches: [ main ]
jobs:
  database-sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code Repository Source
        uses: actions/checkout@v4

      - name: Setup Node.js Execution Context
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      - name: Install DB Pipeline Dependencies
        run: |
          cd backend
          npm ci
      - name: Apply Safe Supabase Production Database Migrations
        env:
          DATABASE_URL: ${{ secrets.PRODUCTION_SUPABASE_DIRECT_URL }}
        run: |
          cd backend
          npx prisma migrate deploy
```
Continuous container updates to host platforms happen here after migrations pass

## 4. Frontend Route Handling Configuration (frontend/vercel.json)
Instructs Vercel's global edge network on how to handle incoming requests, cross-origin parameters (CORS), headers, and routing paths safely.
```
{
  "version": 2,
  "framework": "nextjs",
  "regions": ["iad1"],
  "cleanUrls": true,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```


