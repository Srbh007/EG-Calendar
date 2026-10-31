# Task Register — Supabase Managed Services

**Source of truth for task scope:** [`../implementation.md`](../implementation.md)  
**Status:** Task breakdown prepared; real Notify IDs must be added after card creation.  
**Architecture:** Next.js frontend + Supabase managed services; no separately maintained custom backend.

## How to use this file

1. Create a Notify card for each card in `implementation.md`.
2. Copy its title, objective, scope, dependencies, documentation list and acceptance criteria.
3. Replace `NTF-TBD` below with the actual Notify ID.
4. Do not start work until the card has a real ID, owner and approved scope.
5. Update status and evidence when the card is completed.

## Task index

| Phase | Card | Task | Notify ID | Status |
|---|---|---|---|---|
| 0 | 0.1 | Confirm Supabase project and environment strategy | NTF-001 | Done |
| 0 | 0.2 | Verify Google and Zoho API capabilities | NTF-002 | Done |
| 0 | 0.3 | Inspect repository and confirm frontend stack | NTF-003 | Done |
| 0 | 0.4 | Create Notify cards and confirm release gates | NTF-004 | Done |
| 1 | 1.1 | Set up Next.js frontend application | NTF-005 | Done |
| 1 | 1.2 | Implement design tokens and global styles | NTF-006 | Done |
| 1 | 1.3 | Build shared UI primitives | NTF-007 | Done |
| 1 | 1.4 | Build organization workspace shell | NTF-008 | Done |
| 1 | 1.5 | Build platform owner console shell | NTF-009 | Done |
| 2 | 2.1 | Configure Supabase clients and local development | NTF-010 | Done |
| 2 | 2.2 | Create initial database migrations and profile model | NTF-011 | Done |
| 2 | 2.3 | Configure Supabase Auth flows | NTF-012 | Mocked |
| 2 | 2.4 | Implement RLS policies for profiles and organizations | NTF-013 | Done |
| 2 | 2.5 | Implement organization requests, approvals and invitations | NTF-014 | Mocked |
| 2 | 2.6 | Build team and role management UI | NTF-015 | Mocked |
| 3 | 3.1 | Create calendar connection schema and RLS | NTF-016 | Done |
| 3 | 3.2 | Build integrations and account management screens | NTF-017 | Mocked |
| 3 | 3.3 | Implement secure Google OAuth Edge Functions | NTF-019 | Mocked |
| 3 | 3.4 | Implement secure Zoho OAuth Edge Functions | NTF-020 | Mocked |
| 3 | 3.5 | Discover provider calendars and permissions | NTF-021 | Mocked |
| 3 | 3.6 | Implement connection health and reconnect experience | NTF-018 | Mocked |
| 4 | 4.1 | Implement working hours and availability settings | NTF-022 | Done |
| 4 | 4.2 | Implement provider busy-time retrieval | NTF-023 | Mocked |
| 4 | 4.3 | Implement availability calculation and slot generation | NTF-024 | Mocked |
| 4 | 4.4 | Build calendar availability UI | NTF-025 | Mocked |
| 5 | 5.1 | Create booking-link schema and RLS | NTF-026 | Done |
| 5 | 5.2 | Build booking-link builder UI | NTF-027 | Mocked |
| 5 | 5.3 | Build public booking page and slot selection | NTF-028 | Mocked |
| 5 | 5.4 | Implement race-safe booking confirmation | NTF-029 | Mocked |
| 5 | 5.5 | Build booking success and detail screens | NTF-030 | Mocked |
| 6 | 6.1 | Implement secure rescheduling | NTF-031 | Mocked |
| 6 | 6.2 | Implement secure cancellation | NTF-032 | Mocked |
| 6 | 6.3 | Configure transactional email notifications | NTF-033 | Mocked |
| 6 | 6.4 | Add reminders and provider reconciliation schedule | NTF-034 | Done |
| 7 | 7.1 | Complete organization settings and audit UI | NTF-035 | Mocked |
| 7 | 7.2 | Complete platform owner console data views | NTF-036 | Mocked |
| 7 | 7.3 | Implement API keys and webhooks (later release) | NTF-037 | Done |
| 8 | 8.1 | Complete RLS and security review | NTF-TBD | Not started |
| 8 | 8.2 | Complete availability and booking concurrency tests | NTF-TBD | Not started |
| 8 | 8.3 | Complete end-to-end and responsive QA | NTF-TBD | Not started |
| 8 | 8.4 | Configure production deployment and operations | NTF-TBD | Not started |

## Card detail location

The complete Notify-ready card descriptions, dependencies, documentation-to-read lists, scope boundaries and acceptance criteria are maintained in [`../implementation.md`](../implementation.md). Keep this register synchronized with actual Notify statuses and IDs.

## Global constraints

- No separate Node.js/Express/NestJS API server or custom backend application.
- Supabase Auth, PostgreSQL and RLS are the source of identity, data and tenant authorization.
- Supabase Edge Functions are used only for trusted serverless operations, including OAuth and provider calls.
- Never expose service-role keys or OAuth tokens to the browser.
- A booking link checks every selected conflict calendar and writes to exactly one destination calendar.
- Never confirm a booking before final conflict recheck and successful destination event write.


## Phase 9 — Performance, caching and production optimization

See [`performance.md`](performance.md) for implementation details, cache safety rules and acceptance checklist.

| Phase | Card | Task | Notify ID | Status |
|---|---|---|---|---|
| 9 | 9.1 | Establish performance baselines and budgets | NTF-TBD | Not started |
| 9 | 9.2 | Optimize images, loading and frontend bundles | NTF-TBD | Not started |
| 9 | 9.3 | Optimize React interactions and large lists | NTF-TBD | Not started |
| 9 | 9.4 | Optimize Supabase database queries and indexes | NTF-TBD | Not started |
| 9 | 9.5 | Configure managed CDN, caching and connection pooling | NTF-TBD | Not started |
| 9 | 9.6 | Run final Lighthouse and performance regression audit | NTF-TBD | Not started |

**Managed infrastructure decision:** Do not create a separate load balancer, cache cluster or custom backend for this checklist. Use the frontend host CDN and Supabase-managed connection pooling/capabilities. A dedicated load balancer is out of scope unless measured demand and an approved architecture change justify it.
