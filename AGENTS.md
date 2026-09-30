# Project Guidelines

## Project Context

- Read [README.md](README.md) for the product goals, architecture, planned features, and development setup.
- The Next.js frontend lives in `frontend/` and uses the App Router, TypeScript, and Tailwind CSS v4.
- Keep frontend-specific changes inside `frontend/` unless the change belongs to shared repository documentation or tooling.

## Code Formatting

- Format TypeScript and TSX to remain comfortable to read when printed on a page.
- Prefer a maximum line width of 100 characters. Wrap long JSX attributes, function calls, arrays, and object literals rather than allowing dense horizontal code.
- Use two spaces for indentation, semicolons, double quotes, and trailing commas according to `frontend/.prettierrc`.
- Preserve clear vertical structure: use blank lines between logical sections, related groups of declarations, and major JSX sections.
- Prefer readable multi-line JSX over deeply nested or compressed one-line markup.
- Keep components focused and place repeated data or configuration in named constants when that improves scanning.
- Use short comments only to label meaningful sections or explain non-obvious behavior. Do not comment straightforward code.
- Use lowercase file naming like "sidebar-nav.tsx" when naming new files
- Run Prettier on changed frontend code files before completing a change. Markdown documentation is excluded by the repository `.prettierignore` file so intentional indentation is preserved.

## Frontend Conventions

- Follow the existing App Router structure under `frontend/app/` and shared component structure under `frontend/components/`.
- **Module Import Resolution:** Always use the absolute `@/` path aliases defined in `tsconfig.json` (e.g., `import { BaseModule } from "@/types/base-module"`) when importing files. Avoid brittle relative paths like `../` or `../../` to ensure the codebase remains clean and easy to refactor.
- **React Component Prop Typing:** Avoid separate external `type Props = { ... }` wrappers for component definitions. Instead, type the `props` object directly in the function parameter signature and destructure the properties on the very first line of the function body. This keeps types closely coupled to their variable names and prevents syntax collisions with JavaScript object destructuring renaming aliases.
- Reuse existing layout, navigation, and styling patterns before introducing new abstractions.
- Keep shared Tailwind design tokens in `frontend/app/globals.css`.
- Prefer semantic HTML and accessible labels for interactive controls.
- Use CSS logical properties such as `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, and `end-*` when they fit the layout.
- Keep user-facing text easy to extract for future internationalization.

## TypeScript & Architecture Conventions

- **Parameter Properties Shorthand:** Prefer modern TypeScript parameter properties in constructors to automatically declare, assign, and enforce modifiers on class fields simultaneously. Avoid verbose property mapping boilerplate in constructor function bodies.
- **Protected Backing Fields:** For abstract core classes, use the `protected` modifier for internal backing fields prefixed with a leading underscore (e.g., `_title`) only if custom `get`/`set` methods are required. This hides raw variables from consuming React views while permitting inheritance access for concrete child subclasses. If no getters/setters are needed, use standard `public readonly` signature fields.
- **Clean Contextual Naming:** Avoid redundant type prefixing on class instance property names. Prefer succinct, context-aware naming paths (e.g., `module.title`, `module.card`, `module.page`) over repetitive constructs (e.g., `module.moduleTitle`, `module.moduleCard`).

## Validation

- Run `npm run lint` from `frontend/` after meaningful frontend changes.
- Run `npm run build` from `frontend/` when changing routes, layouts, dependencies, or shared components.
