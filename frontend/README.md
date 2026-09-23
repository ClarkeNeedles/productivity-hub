# Amelify Frontend

The frontend is a Next.js application using the App Router, TypeScript, and Tailwind CSS v4.
The broader product goals and architecture are documented in the repository
[README.md](../README.md).

## Requirements

- Node.js 20 or newer
- npm

## Setup

From the repository root, install the frontend dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available Scripts

Run these commands from `frontend/`:

| Command         | Purpose                                               |
| --------------- | ----------------------------------------------------- |
| `npm run dev`   | Start the development server.                         |
| `npm run lint`  | Run ESLint.                                           |
| `npm run build` | Create a production build and run type checking.      |
| `npm run start` | Start the production server after a successful build. |

## Installed Packages

Runtime dependencies are listed in `dependencies` in
[package.json](package.json). Development-only tools are listed in `devDependencies`.

### Runtime Dependencies

- `next` - Next.js framework and App Router runtime.
- `react` - React UI library.
- `react-dom` - React DOM rendering support.

## Adding Packages

Install frontend packages from the `frontend/` directory so they are recorded in
the correct manifest:

```bash
# Runtime dependency
npm install package-name

# Development-only dependency
npm install --save-dev package-name
```

After installing a package:

1. Confirm it appears in `package.json`.
2. Keep the updated `frontend/package-lock.json` with the change.
3. Add it to the appropriate dependency list in this README when it becomes part
   of the project’s regular toolchain.
4. Run `npm run lint` and `npm run build` when appropriate.

For example, to add Lucide icons:

```bash
npm install lucide-react
```

## Formatting

The frontend uses `.prettierrc` with these conventions:

- Two spaces for indentation
- Semicolons
- Double quotes
- A 100-character print width
- Tailwind class sorting

Format changed files with Prettier before committing. Keep TypeScript and TSX
readable when printed by using clear vertical structure and wrapping long JSX
attributes, function calls, arrays, and object literals.
