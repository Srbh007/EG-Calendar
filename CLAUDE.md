# Claude Code Project Instructions — Unified Scheduler

This repository implements a multi-tenant scheduling SaaS using a **Next.js frontend + Supabase managed services** architecture.

## Mandatory first steps

1. Read `README.md`.
2. Read `docs/prd.md`, `docs/architecture.md`, and `docs/rules.md` for product/architecture work.
3. Read `docs/design.md` for UI work.
4. Read root `implementation.md` and the matching card in `docs/task.md` before starting a task.
5. Read `docs/performance.md` for performance, caching, query, asset or release work.
5. Check `docs/memory.md` for prior decisions and known provider limitations.

## Architecture guardrails

- Do not create a separate custom backend application or standalone API server.
- Do not add Express, NestJS, Fastify, self-managed PostgreSQL, Redis, or self-hosted workers.
- Use Next.js/React/TypeScript for the frontend.
- Use Supabase Auth, PostgreSQL, RLS and Edge Functions for managed infrastructure and trusted serverless operations.
- Use direct Supabase client access under RLS for ordinary CRUD.
- Use Edge Functions only for secret-bearing or trusted operations such as OAuth exchange/refresh, provider API calls, webhooks, notifications and booking confirmation.
- Never expose service-role keys, OAuth secrets, refresh tokens or webhook secrets to the browser.
- Never bypass RLS to make a UI feature easier.

## Product invariants

- Every booking link has separate conflict-check calendars and exactly one destination calendar.
- Any busy conflict in any selected conflict-check calendar blocks the slot.
- Create the booking event only in the selected destination calendar.
- Recheck availability at confirmation and prevent concurrent double booking with database-level atomicity.
- Do not show a booking as confirmed before the destination event write succeeds and the booking record is committed.
- Public invitees do not need accounts and must not receive private calendar or tenant data.
- Platform owner access does not automatically expose private calendar event details.

## Task discipline

- Only implement an approved task with a real Notify ID, owner and acceptance criteria.
- Never invent Notify IDs or claim a card exists if it has not been created.
- Keep changes within the selected task; do not perform unrelated refactors.
- Add/update migrations, RLS tests, Edge Function tests and UI tests relevant to the task.
- Follow `docs/performance.md`; do not add shared caching for private calendar/tenant data.
- Prefer managed CDN, Supabase connection pooling and hosting capabilities; do not add a self-managed load balancer or cache cluster without approval.
- Update `docs/memory.md` when a durable decision or verified provider limitation is discovered.
- If a document conflicts with another, stop and request clarification rather than guessing.

## Completion checklist

- Acceptance criteria and tests pass.
- RLS/tenant isolation is verified for data changes.
- No secret or private calendar data is exposed to browser or logs.
- Scheduling invariants remain intact.
- Docs and migrations are updated.
- No unapproved custom backend service or infrastructure is introduced.
