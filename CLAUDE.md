# Unified Scheduler — Claude Code Instructions

This repository implements a multi-tenant SaaS scheduling platform. Proposed stack: Next.js, React, TypeScript, Node.js API, PostgreSQL, background jobs, and Google/Zoho calendar provider adapters. Confirm the actual stack from the repository before changing it.

Before any change:
1. Read `docs/rules.md`, `docs/architecture.md`, and `docs/design.md`.
2. Read the relevant sections of `docs/prd.md` and `docs/memory.md`.
3. Work only from an approved plan in `docs/task.md` with a real Notify card ID.
4. Keep changes minimal and update docs in the same task branch when decisions, routes, models, design tokens, or lessons change.

Non-negotiable rules:
- Business logic, availability, booking decisions, permissions, tenant isolation, and provider writes live in backend services.
- Frontend displays data and collects input; it is never authoritative for availability or access control.
- A booking link checks all selected conflict calendars and writes to exactly one selected destination calendar.
- Any selected busy calendar blocks an overlapping slot. Recheck availability at confirmation and prevent concurrent double-booking.
- Never expose OAuth tokens, secrets, private event details, or cross-tenant data.
- Use design tokens; no arbitrary colors or spacing.
- Add tests for happy paths, edge cases, provider failures, and tenant isolation.
- Do not invent Notify IDs, credentials, provider capabilities, or environment values.

If a task plan is incomplete or conflicts with these docs, stop and request clarification/update the plan before coding.
