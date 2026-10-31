# Baseline Report: Repository and Frontend Stack

## Current Stack
- **Architecture:** Frontend-first using Supabase managed services.
- **Frontend Framework:** Next.js (Version to be installed in Phase 1: 15).
- **UI Library:** React.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS v4.
- **Components:** Radix UI primitives and `lucide-react` for icons.
- **Testing:** Vitest (with jsdom) and `@testing-library/react`.
- **Package Manager:** `npm` (Version: 11.11.0).

## Existing Assets and Structure
- `CLAUDE.md`, `README.md`, `implementation.md` exist at the root.
- `docs/` folder contains foundational specifications (`prd.md`, `architecture.md`, `rules.md`, `design.md`, `task.md`, `memory.md`, `performance.md`).
- A `src/` directory exists as the intended target for the Next.js frontend application.
- `supabase/` directory (to be created) will house local configuration, migrations, and Edge Functions.

## Identified Gaps
- The Next.js frontend application is not yet bootstrapped in `src/`.
- Supabase local project (`supabase/`) has not been initialized.
- Design tokens and shared UI primitives (as specified in `docs/design.md`) are not yet implemented.

## Agreed Folder Structure
- `/src`: Next.js frontend application.
  - `/src/src/app`: Application source code (using `--src-dir` configuration).
  - `/src/components`: Shared UI primitives and composed components.
  - `/src/lib`: Utility functions, Supabase clients, and generic helpers.
  - `/src/tests`: Frontend unit and integration tests.
- `/supabase`: Supabase configuration.
  - `/supabase/migrations`: Database schema migrations.
  - `/supabase/functions`: Edge Functions source code.
  - `/supabase/seed.sql`: Seed data for local development.
- `/docs`: Project documentation and guidelines.
