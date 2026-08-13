---
title: "Database plan"
date: 7-8-2026
status: planning
version: 0.0.0
---

# 📁 Database & Security Layer Directory Structure
To keep your schema definitions, migration histories, and security interceptors completely decoupled from your core business logic, organize the data persistence and security layers according to this architecture:
```
backend/
├── prisma/
│   ├── schema.prisma           # Core Prisma Schema (Entities, Relations, Enums)
│   └── migrations/             # Automatically generated SQL migration snapshots
├── src/
│   ├── prisma/                 # Database abstraction client module
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── auth/                   # Security authentication core
│       ├── auth.module.ts
│       ├── auth.service.ts
│       ├── auth.controller.ts
│       ├── decorators/         # Custom decorators (e.g., @CurrentUser)
│       │   └── current-user.decorator.ts
│       ├── dto/                # Validation classes for inbound network requests
│       │   ├── login.dto.ts
│       │   └── register.dto.ts
│       ├── guards/             # Guard rails intercepting requests
│       │   ├── jwt-auth.guard.tsx
│       │   └── ws-jwt.guard.ts # Custom guard for real-time WebSocket connections
│       └── strategies/         # Passport-specific protocol extractors
│           └── jwt.strategy.ts
```

# 📋 High-Level Database & Security Development Plan
This stage shifts from transient UI mocking to persistent data governance. It securely connects your NestJS engine to Supabase's hosted cloud architecture while creating an authentication perimeter.

* Step 1: Production Schema Provisioning: Define the database models in your schema. Map out explicit relations between users, workspace matrices, and individual module datasets. Connect your application to your Supabase PostgreSQL instance via transaction/session pool parameters.
* Step 2: Cryptographic Infrastructure & DTOs: Create the onboarding and login validators using class-validator. Set up the background utilities required to securely verify and store password credentials using cryptographic hashing libraries (such as bcrypt or modern subroutines like argon2).
* Step 3: Passport JWT Core Integration: Implement the passport validation pipeline. Configure NestJS to sign outgoing access states with unique tokens, and establish incoming request validation decoders.
* Step 4: Endpoint Route Gatekeepers: Protect application endpoints with route decorators. Isolate workspace layouts, blocking unauthenticated network traffic while exposing parsed user metadata directly to controller contexts.
* Step 5: Stateful Channel Handlers (WebSockets): Build a handshake validation filter. Intercept incoming Socket.io connections, look up token structures hidden within connection headers, and map socket clients to specific user streams.

------------------------------
# 🛠️ Core Functional Implementation Code
## 1. Relational Schema Blueprint (prisma/schema.prisma)
This schema defines your relational database structure, linking users to their modular workspaces and data modules. It uses PostgreSQL's native Json type for the dynamic widget layouts.
```
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")        // Supabase Session Pool URL (Port 5432 or Transaction)
  directUrl = env("DIRECT_DATABASE_URL") // Supabase Direct Connection URL (Port 5432 for Migrations)
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id         String     @id @default(uuid())
  email      String     @unique
  password   String
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
  workspaces Workspace[]
  habits     Habit[]
}

model Workspace {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  layout    Json     // [{ id: string, type: string, title: string, meta: {} }]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Habit {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  name        String
  streak      Int      @default(0)
  history     Json     // List of execution dates: ["2026-03-31", "2026-04-01"]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```
## 2. Structural Security Guard (src/auth/guards/jwt-auth.guard.ts)
```
import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';import { AuthGuard } from '@nestjs/passport';

@Injectable()export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Check incoming HTTP request credentials against standard Passport logic
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Authentication token signature invalid or missing.');
    }
    return user;
  }
}
```
## 3. Request Extraction Strategy (src/auth/strategies/jwt.strategy.ts)
```
import { Injectable } from '@nestjs/common';import { PassportStrategy } from '@nestjs/passport';import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { sub: string; email: string }) {
    // Decodes the token token payload and attaches it to req.user
    return { id: payload.sub, email: payload.email };
  }
}
```
## 4. Context Execution Extractor (src/auth/decorators/current-user.decorator.ts)
```
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// Simplifies route code by providing direct access to req.user via @CurrentUser()export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```
## 5. Real-Time Socket Guard (src/auth/guards/ws-jwt.guard.ts)
HTTP guards cannot process real-time WebSocket framing natively. This custom interceptor validates JWT signatures during the WebSocket connection handshake.
```
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';import { JwtService } from '@nestjs/jwt';import { WsException } from '@nestjs/websockets';import { Socket } from 'socket.io';

@Injectable()export class WsJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient();
      // Extract the bearer token from the socket connection headers
      const authHeader = client.handshake.headers.authorization;
      const bearerToken = authHeader?.split(' ')[1];

      if (!bearerToken) {
        throw new WsException('Real-time connection rejected: Token missing.');
      }

      const payload = await this.jwtService.verifyAsync(bearerToken, {
        secret: process.env.JWT_SECRET,
      });
      
      // Store the verified session profile within the dynamic socket context instance
      client.data.user = { id: payload.sub, email: payload.email };
      return true;
    } catch (err) {
      throw new WsException('Unauthorized persistent network session.');
    }
  }
}
```
## 6. Core Authentication Engine Architecture (src/auth/auth.service.ts)
```
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';import { PrismaService } from '../prisma/prisma.service';import { JwtService } from '@nestjs/jwt';import * as bcrypt from 'bcrypt';import { RegisterDto } from './dto/register.dto';import { LoginDto } from './dto/login.dto';

@Injectable()export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Identity profile credentials occupied.');

    const hashedPassword = await bcrypt.hash(dto.password, 12);
    const user = await this.prisma.user.create({
      data: { email: dto.email, password: hashedPassword },
    });

    return this.generateSessionToken(user.id, user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException('Access denied: Invalid credentials.');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Access denied: Invalid credentials.');

    return this.generateSessionToken(user.id, user.user.email);
  }

  private async generateSessionToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```


