# Contributing to the Project

Thank you for your interest in contributing! This document outlines our repository practices, code formatting guidelines, and core architectural contracts. Please review these conventions before opening a Pull Request.

## 📁 Repository Context

- **Project Blueprint:** Review [README.md](README.md) for the core product goals, application architecture, planned features, and local development setup instructions.
- **Frontend Workspace:** The Next.js frontend is located inside the `frontend/` directory. It is built using the App Router, TypeScript, and Tailwind CSS v4.
- **Scope Guardrails:** Keep frontend-specific changes strictly inside the `frontend/` path unless a modification directly belongs to shared repository documentation or root-level tooling.

## 📝 Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for every commit:

```text
<type>[optional scope]: <description>
```

Use a short, imperative description and choose the type that best describes the change:

- `feat`: Adds user-facing functionality.
- `fix`: Corrects a behavior or defect.
- `docs`: Changes documentation only.
- `refactor`: Changes code structure without changing behavior.
- `test`: Adds or updates tests.
- `chore`: Performs maintenance that does not affect application behavior.
- `build`: Changes build tooling or dependencies.
- `ci`: Changes continuous integration or delivery configuration.

Examples:

```text
feat(modules): add habit tracker module
fix(streak-counter): preserve reset history order
docs: clarify local Supabase setup
```

Mark breaking changes with `!` after the type or scope, or include a `BREAKING CHANGE:` footer. Refer to the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) when a commit does not fit these examples. Release automation is not currently enabled, but these messages will provide the history needed for future changelog and version generation.

## 🎨 Code Formatting & Style

- **Page-Print Readability:** Format TypeScript and TSX code so it remains clear and comfortable to read when printed sequentially on a page.
- **Line Boundaries:** Maintain a maximum line width of **100 characters**. Wrap long JSX attributes, function calls, arrays, and object literals rather than allowing dense horizontal overflow.
- **Syntax Standards:** Use two spaces for indentation, semicolons, double quotes, and trailing commas according to the configuration defined in `frontend/.prettierrc`.
- **Vertical Spacing:** Maintain a clear vertical structure. Use empty lines between distinct logical sections, related groups of variable declarations, and major JSX nodes.
- **Markup Clarity:** Prefer readable, multi-line JSX syntax over deeply nested or highly compressed single-line markup elements.
- **Constant Extraction:** Keep layout components focused. Place repeated data structures or operational configuration arrays in named constants to optimize scanning.
- **Intentional Commenting:** Use short comments only to label meaningful layout blocks or explain non-obvious engineering behavior. Do not comment straightforward or self-explanatory code blocks.
- **Naming Typography:** Use strict lowercase file naming conventions separated by hyphens (e.g., `sidebar-nav.tsx`) when introducing new files to the project workspace. Files must explicitly state their archetype as a suffix to optimize aditor tab bar visibility and global search results:
  - Stores must end in `-store.ts` (e.g. `stores/streak-counter-store.ts`).
  - Context wrappers must end in `-provider.tsx` (e.g. `providers/dashboard-store-provider.tsx`).
  - UI file must use descriptive lowercase names (e.g. `sidebar-nav.tsx`).
- **Pre-Commit Prettier Checks:** Always run Prettier on modified frontend files before finalizing a change. Note that Markdown documentation is explicitly bypassed via the repository `.prettierignore` file to ensure intentional indentation styles remain intact.

## 🚀 Frontend Conventions

- **Directory Mapping:** Follow the existing Next.js App Router workspace under `frontend/app/` and shared layout element placements under `frontend/components/`.
- **Absolute Path Resolution:** Always use the absolute `@/` path aliases configured in `tsconfig.json` (e.g., `import { BaseModule } from "@/types/base-module"`) when importing elements. Brittle relative paths like `../` or `../../` are strictly prohibited to maintain cleanliness and refactoring safety.
- **Request Interception & Route Guards:** All edge routing hooks, path guards, and request interceptions are handled exclusively via the **`proxy` workspace layer**. The old `middleware` convention is explicitly deprecated. Ensure all static file bundles (`_next/static`), image optimization frameworks, and public assets (like `/images` or `/animations`) are explicitly whitelisted within your proxy pattern configurations to prevent production blank-page runtime crashes.
- **Component Prop Typing:** Explicitly define React component properties using dedicated `Props` or `[Component]Props` type blocks placed directly above the component definition. Avoid inline parameter type object literals to ensure long property maps, optional event callbacks, and structural configurations remain readable and easily extensible. Components must accept primitive configuration identifiers rather than whole class models:
  ```tsx
  type ModuleCardProps = {
    moduleId: string;
    onOpen: (moduleId: string) => void;
  };

  export default function ModuleCard({
    moduleId,
    onOpen,
  }: ModuleCardProps) {
    return <article>...</article>;
  }
  ```
- **Abstraction Reuse:** Actively reuse existing layout styles, navigation nodes, and design tokens before attempting to introduce brand new structural abstractions.
- **Token Localization:** Keep shared global Tailwind design tokens managed directly inside `frontend/app/globals.css`.
- **Semantic Accessibility & Nesting Guardrails:** Prioritize semantic HTML nodes and explicit, accessible labels for all interactive layout controls and click targets. **Nesting interactive controls inside one another is strictly prohibited.** To make a complex card component clickable without breaking legal HTML guidelines or throwing console accessibility tree violations, wrap the container inside a semantic structure (e.g., `<article>`) and use a pseudo-element cover strategy (`static after:absolute after:inset-0`) on the primary inner button action.
- **Logical Flow Properties:** Utilize CSS logical properties—such as `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, and `end-*`—wherever they fit the layout orientation.
- **Internationalization Readiness:** Keep all user-facing text strings organized and easy to extract to simplify future internationalization (i6n) translation pipelines.
- **Order of Functions Within a Class:** Functions must be ordered from top to bottom based on the newspaper step-down rule: constructor, accessors (getters/setters), public functions/overrides, abstract functions, protected lifecycle hooks, and private internal helpers.

## 🧬 TypeScript & Architecture Conventions

- **State vs. Behavior Separation (Zustand):** Separate business data states from presentation blueprints. Object classes handle static configurations and UI rendering layout strategies, whereas runtime state management is delegated to decoupled Zustand stores. Classes must remain completely immutable and declared as permanent singletons outside of the React lifecycle to eliminate costly instantiation garbage-collection loops.
- **Domain-Isolated Stores:** Maintain discrete stores separated by logical business context (e.g., `useModulesStore` for dashboard shell data layout, `useMetricsStore` for tracking layout selections, and feature-specific stores like `useHabitStore` for module-internal logs). Never store transient layout flags or runtime states inside class objects or global variables.
- **Zustand Store Interface Splitting:** To cleanly support client-side default hydration and optional initial server data injection, separate store definitions into distinct data and behavior types. Use a clean intersection type (&) to form the complete store definition:
  - `[Name]StateProps`: Contains only flat state variables and metadata.
  - `[Name]Actions`: Contains only executable asynchronous or synchronous functions.
  - `[Name]Store`: The combined structure (`[Name]StateProps` & `[Name]Actions`).
```ts
export interface StreakStateProps { currentStreak: number; bestStreak: number; }
export interface StreakActions { incrementStreak: (userId: string) => Promise<void>; }
export type StreakStore = StreakStateProps & StreakActions;
```
- **Per-Request Isolation & Context Providers:** Never export a global Zustand store singleton directly using create(). Instead, utilize createStore() to export a store factory function (create[Name]Store). A centralized domain React Context provider situated inside src/providers/ must handle actual store instantiation using a stable useRef hook wrapper. This design completely eliminates cross-request memory state pollution on the Next.js server tier.
- **Automated Startup Hydration:** Domain stores must manage their own client-side startup synchronization routines. Bind data-fetching triggers directly to the layout-level React Context provider's lifecycle via hook dependencies (such as a logged-in userId), preventing boilerplate database retrieval logic from bloating the core Next.js Server Layout trees.
- **Reactive Selectors vs. Store Getters:** To maintain absolute reactivity tracking inside React components, avoid defining or calling custom imperative getter functions (like `getActiveModuleIds()`) inside the Zustand store object. Stores should act as flat, lightweight databases hosting raw state and direct mutations (setters/actions). Data extraction, parsing, filtering, and mapping transformations must happen inline within your local component selector hooks (paired with `useShallow`) to ensure components automatically and efficiently update when dependencies change.
- **Next.js Global Store Cross-Request Protection:** When building Zustand modules within Next.js workspaces, ensure stores are safely bound exclusively to client-side components (`"use client"`). Never instantiate shared mutable state maps globally at the file root level if they run inside Server Components, to prevent accidental multi-tenant data leaks between independent incoming visitor browser streams.
- **State Normalization & Data Decoupling:** Components must be driven by flat primitives (`string`) rather than complex objects. Pass primitive identifiers (like `moduleId`) down through the React component map trees. Components are responsible for using that ID to look up their freshest, validated business models from the corresponding store right at the moment of execution rendering.
- **Parameter Properties Shorthand:** Prefer modern TypeScript parameter properties in class constructors to simultaneously declare, assign, and enforce access visibility modifiers on fields. Eliminate verbose property reassignments (`this.x = x`) inside constructor function bodies:
  ```typescript
  protected constructor(
    public readonly id: string,
    public readonly title: string
  ) {}
  ```
- **Protected Backing Fields:** For abstract core classes, use the `protected` modifier for internal backing fields prefixed with a leading underscore (e.g., `_title`) *only* if custom `get`/`set` methods are explicitly required. This safely hides raw variables from consuming React layers while maintaining inheritance visibility for child subclasses. If no getter/setter wrappers are required, use standard `public readonly` signature parameters.
- **Clean Contextual Naming:** Avoid redundant type prefixing on class instance property names. Prefer succinct, context-aware paths (e.g., `module.title`, `module.card`, `module.page`) over repetitive constructs (e.g., `module.moduleTitle`, `module.moduleCard`).
- **Context-Passing via Parameter Injection:** To maintain a single source of truth and avoid circular constructor dependencies or stale local data copies, layout subclasses (`BaseModuleCard`, `BaseModulePage`) must not accept foundational context like `title` or `settings` in their constructors. Instead, inject necessary data frames as runtime parameters directly into layout functions (e.g., `renderMicroVariant(context)`).
