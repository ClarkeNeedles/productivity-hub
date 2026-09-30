# Contributing to the Project

Thank you for your interest in contributing! This document outlines our repository practices, code formatting guidelines, and core architectural contracts. Please review these conventions before opening a Pull Request.

## 📁 Repository Context

- **Project Blueprint:** Review [README.md](README.md) for the core product goals, application architecture, planned features, and local development setup instructions.
- **Frontend Workspace:** The Next.js frontend is located inside the `frontend/` directory. It is built using the App Router, TypeScript, and Tailwind CSS v4.
- **Scope Guardrails:** Keep frontend-specific changes strictly inside the `frontend/` path unless a modification directly belongs to shared repository documentation or root-level tooling.

## 🎨 Code Formatting & Style

- **Page-Print Readability:** Format TypeScript and TSX code so it remains clear and comfortable to read when printed sequentially on a page.
- **Line Boundaries:** Maintain a maximum line width of **100 characters**. Wrap long JSX attributes, function calls, arrays, and object literals rather than allowing dense horizontal overflow.
- **Syntax Standards:** Use two spaces for indentation, semicolons, double quotes, and trailing commas according to the configuration defined in `frontend/.prettierrc`.
- **Vertical Spacing:** Maintain a clear vertical structure. Use empty lines between distinct logical sections, related groups of variable declarations, and major JSX nodes.
- **Markup Clarity:** Prefer readable, multi-line JSX syntax over deeply nested or highly compressed single-line markup elements.
- **Constant Extraction:** Keep layout components focused. Place repeated data structures or operational configuration arrays in named constants to optimize scanning.
- **Intentional Commenting:** Use short comments only to label meaningful layout blocks or explain non-obvious engineering behavior. Do not comment straightforward or self-explanatory code blocks.
- **Naming Typography:** Use strict lowercase file naming conventions separated by hyphens (e.g., `sidebar-nav.tsx`) when introducing new files to the project workspace.
- **Pre-Commit Prettier Checks:** Always run Prettier on modified frontend files before finalizing a change. Note that Markdown documentation is explicitly bypassed via the repository `.prettierignore` file to ensure intentional indentation styles remain intact.

## 🚀 Frontend Conventions

- **Directory Mapping:** Follow the existing Next.js App Router workspace under `frontend/app/` and shared layout element placements under `frontend/components/`.
- **Absolute Path Resolution:** Always use the absolute `@/` path aliases configured in `tsconfig.json` (e.g., `import { BaseModule } from "@/types/base-module"`) when importing elements. Brittle relative paths like `../` or `../../` are strictly prohibited to maintain cleanliness and refactoring safety.
- **Component Prop Typing:** Explicitly define React component properties using dedicated `Props` or `[Component]Props` type blocks placed directly above the component definition. Avoid inline parameter type object literals to ensure long property maps, optional event callbacks, and structural configurations remain readable and easily extensible:
  ```tsx
  type ModuleCardProps = {
    module: BaseModule<any, any, any>;
    onOpen: (module: BaseModule<any, any, any>) => void;
    onOpenSettings?: (module: BaseModule<any, any, any>) => void;
    onRemove?: (module: BaseModule<any, any, any>) => void;
  };

  export default function ModuleCard({
    module,
    onOpen,
    onOpenSettings,
    onRemove,
  }: ModuleCardProps) {
    return <article>...</article>;
  }
  ```
- **Abstraction Reuse:** Actively reuse existing layout styles, navigation nodes, and design tokens before attempting to introduce brand new structural abstractions.
- **Token Localization:** Keep shared global Tailwind design tokens managed directly inside `frontend/app/globals.css`.
- **Semantic Accessibility:** Prioritize semantic HTML nodes and explicit, accessible labels for all interactive layout controls and click targets.
- **Logical Flow Properties:** Utilize CSS logical properties—such as `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, and `end-*`—wherever they fit the layout orientation.
- **Internationalization Readiness:** Keep all user-facing text strings organized and easy to extract to simplify future internationalization (i6n) translation pipelines.

## 🧬 TypeScript & Architecture Conventions

- **Parameter Properties Shorthand:** Prefer modern TypeScript parameter properties in class constructors to simultaneously declare, assign, and enforce access visibility modifiers on fields. Eliminate verbose property reassignments (`this.x = x`) inside constructor function bodies:
  ```typescript
  protected constructor(
    public readonly id: string,
    public readonly title: string
  ) {}
  ```
- **Protected Backing Fields:** For abstract core classes, use the `protected` modifier for internal backing fields prefixed with a leading underscore (e.g., `_title`) *only* if custom `get`/`set` methods are explicitly required. This safely hides raw variables from consuming React layers while maintaining inheritance visibility for child subclasses. If no getter/setter wrappers are required, use standard `public readonly` signature parameters.
- **Clean Contextual Naming:** Avoid redundant type prefixing on class instance property names. Prefer succinct, context-aware paths (e.g., `module.title`, `module.card`, `module.page`) over repetitive constructs (e.g., `module.moduleTitle`, `module.moduleCard`).
- **Context-Passing via Parameter Injection:** To maintain a single source of truth and avoid circular constructor dependencies or stale local data copies, layout subclasses (`ModuleCard`, `ModulePage`) must not accept foundational context like `title` or `settings` in their constructors. Instead, inject the parent module reference dynamically into the execution method signatures (e.g., `render(module: BaseModule<any, any, any>)`). In JavaScript/TypeScript, objects are passed by reference (shallow memory pointers), ensuring this pattern incurs zero memory duplication or performance overhead during UI rendering ticks.
- **Decoupled Configuration & Factory Maps:** Never hardcode module catalog selections, static parameters, or class lists directly within interactive presentation pages. Instead, store static system registries in dedicated configuration environments (e.g., `@/config/add-module.ts`). To allow discrete module classes to scale independently, the catalog configuration must map item data payloads using an instantiation factory closure pattern (e.g., `instantiate: (id, title) => new CustomModule(id, title)`), keeping the rendering views fully decoupled from the exact operational module variants.

## 🛠️ Verification & Validation

Before finalizing a contribution or opening a Pull Request, ensure the following localized quality validations compile cleanly:
1. **Linter Conformance:** Run `npm run lint` from the `frontend/` directory to catch formatting or syntax warnings.
2. **Build Compilation:** Run `npm run build` from the `frontend/` directory when modifying routes, shared layout boundaries, workspace components, or underlying core dependencies to confirm compilation completeness.
