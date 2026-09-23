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
- Run Prettier on changed frontend files before completing a change.

## Frontend Conventions

- Follow the existing App Router structure under `frontend/app/` and shared component structure under `frontend/components/`.
- Reuse existing layout, navigation, and styling patterns before introducing new abstractions.
- Keep shared Tailwind design tokens in `frontend/app/globals.css`.
- Prefer semantic HTML and accessible labels for interactive controls.
- Use CSS logical properties such as `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, and `end-*` when they fit the layout.
- Keep user-facing text easy to extract for future internationalization.

## Validation

- Run `npm run lint` from `frontend/` after meaningful frontend changes.
- Run `npm run build` from `frontend/` when changing routes, layouts, dependencies, or shared components.
