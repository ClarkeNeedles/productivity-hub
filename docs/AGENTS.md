# AI Agent Execution Context & Guardrails

This file provides automated codebase agents, Copilot tools, and LLMs with immediate architectural guardrails and path references.

## 📖 Primary Documentation Pointers
Before writing, refactoring, or generating code, read and comply with the detailed engineering contracts found in these core files:
- **Core Architecture & Local Setup:** Review [README.md](README.md)
- **Coding Style & Engineering Design Patterns:** Review [CONTRIBUTING.md](CONTRIBUTING.md)

## 🤖 Absolute AI Guardrails

### 1. Component vs. Type Boundaries
- Never import React or render JSX/TSX elements inside files living in or extending `@/types/`. Core abstractions must remain pure, testable TypeScript.

### 2. Parameter Signature Safety
- Verify that sub-classes (`ModuleCard`, `ModulePage`) **never** accept base configurations like `title` or `settings` in their constructors. 
- Enforce the **Render Context Pattern** by injecting the parent module reference dynamically into execution method signatures (`render(module: BaseModule<any, any, any>)`).

### 3. Component Prop Typing Style
- Do not generate standalone `type Props` or `interface Props` wrappers for isolated `.tsx` components.
- Inline types directly next to the `props` parameter name and unpack them on line 1 of the function body to prevent object destructuring name aliasing bugs.

### 4. Open-Closed Module Scaling
- When asked to add a new module type, do not hardcode it inside layout rendering loops. 
- Create an isolated class folder under `@/modules/` and register an instantiation closure entry inside the decoupled factory map located at `@/config/add-module.ts`.
