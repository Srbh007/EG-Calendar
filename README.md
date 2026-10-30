# Unified Scheduler

A multi-tenant scheduling SaaS that connects Google Calendar and Zoho Calendar accounts, presents a unified availability experience, and lets users publish booking links.

## Architecture

**Frontend + managed services:**
- Next.js + React + TypeScript for the browser-first application.
- Supabase Auth for identity and sessions.
- Supabase PostgreSQL with Row Level Security (RLS) for tenant data and authorization.
- Supabase Edge Functions for trusted serverless operations such as OAuth, provider API calls, booking confirmation, webhooks and notifications.
- Google Calendar and Zoho Calendar as external calendar providers.

There is **no separate custom backend application or standalone API server** in this architecture. Edge Functions are managed serverless functions used only where trusted execution is required. Ordinary tenant CRUD uses the Supabase client under RLS.

## Core scheduling rule

A booking link checks every calendar selected for conflict detection. If any selected calendar is busy, the overlapping slot is blocked. A new booking event is created in exactly one explicitly selected destination calendar. Events are not copied across connected calendars.

## Documentation

- [`docs/prd.md`](docs/prd.md) — product requirements and acceptance criteria.
- [`docs/architecture.md`](docs/architecture.md) — selected Supabase architecture, data model, RLS and Edge Function boundaries.
- [`docs/rules.md`](docs/rules.md) — engineering, security and scheduling invariants.
- [`docs/design.md`](docs/design.md) — UI/UX system and screen specifications.
- [`docs/task.md`](docs/task.md) — Notify task register and status placeholders.
- [`implementation.md`](implementation.md) — step-by-step implementation sequence and complete task-card content.
- [`docs/memory.md`](docs/memory.md) — durable product decisions and open verification items.
- [`docs/performance.md`](docs/performance.md) — image optimization, code splitting, caching, database/query performance, CDN and Lighthouse checklist.
- [`CLAUDE.md`](CLAUDE.md) — coding-agent instructions.

## Implementation status

The documentation and task plan are prepared. Before implementation, complete Phase 0: select/configure Supabase environments, verify Google and Zoho capabilities, inspect the actual repository, and create real Notify cards. `NTF-TBD` values are placeholders, not real task IDs.

## Local development

The exact install/start commands must be confirmed after repository inspection in implementation Card 0.3. Expected local workflow uses the chosen frontend package manager and Supabase CLI. Do not add production secrets to `.env.example` or commit them to source control.
