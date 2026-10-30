# Project Memory — Unified Scheduler

**Last updated:** 2026-10-31  
**Purpose:** Durable decisions and implementation discoveries. Update when a decision or verified constraint changes.

## Product decisions

- Product is a multi-tenant scheduling SaaS, not only a personal calendar.
- Users may connect multiple Google Calendar and multiple Zoho Calendar accounts; future providers should fit an adapter pattern.
- Unified availability checks every calendar selected for conflict detection. If any selected calendar is busy, the overlapping slot is blocked.
- Each booking link has two distinct selections: one or more calendars to check and exactly one destination calendar to receive the booking event.
- Do not copy or synchronize all provider events between calendars.
- Multiple booking links are supported per user/organization.
- Organization access is approval-based; invitations can add employees to an existing organization.
- Public invitees can book without creating an account.
- Platform Owner Console and Organization Workspace are separate experiences.
- Platform owner access does not automatically grant access to private calendar event details.
- Round-robin and collective scheduling are later-phase capabilities.

## Architecture decision — 2026-10-31

- **Selected direction:** Frontend + managed services.
- **Frontend:** Next.js, React and TypeScript.
- **Managed platform:** Supabase Auth, PostgreSQL, Row Level Security and Edge Functions; Supabase Cron or an approved managed scheduler for scheduled work.
- **No separately maintained custom backend application or standalone API server.** Do not add a separate Express/Nest/Fastify service, self-managed database, Redis cluster or self-hosted worker without an explicit architecture change.
- Edge Functions are serverless trusted operations, not a traditional backend service. Use them only where secrets, provider API calls, webhooks, or atomic booking workflows require trusted execution.
- Normal tenant CRUD should use the Supabase client under RLS, not a generic custom CRUD API.
- Supabase service-role credentials and OAuth secrets must remain in managed secrets and trusted execution contexts; never expose them to the browser.

## Scheduling invariants

- Availability is calculated in trusted Edge Function/database logic and rechecked before confirmation.
- Use database transactions/locking/constraints and idempotency to prevent simultaneous conflicting bookings.
- Write a new booking event only to the selected destination calendar.
- Do not show confirmed until provider event creation succeeds and the booking state is committed.
- Unknown provider write outcomes require reconciliation before retry to avoid duplicate events.
- Store UTC instants and IANA timezone identifiers; test daylight-saving transitions.
- Store only minimum busy information needed; do not persist private event details by default.

## Design decisions

- Minimalist green visual direction.
- Palette baseline: primary `#147D52`, light green `#DDF3E7`, dark highlight `#17231D`, background `#F7F9F7`.
- Use mostly white/near-white surfaces; avoid clutter, gradients, heavy shadows and excessive cards.

## Open verification items

- Verify Google OAuth scopes, account restrictions, free/busy support, event write behavior, quotas and push notifications.
- Verify Zoho OAuth scopes, data-center/region endpoints, calendar operations, quotas and notification behavior.
- Confirm Supabase plan/region, Edge Function limits, Cron availability, backups and production environment strategy.
- Select a managed transactional email provider.
- Verify whether any provider operations require special review/verification before public launch.

## Change log

- 2026-10-31: Replaced proposed custom Node.js API/PostgreSQL/queue architecture with Next.js + Supabase managed services. Updated implementation sequencing and Notify card breakdown accordingly.


## Performance architecture decision (2026-10-31)

- Performance work is tracked in root `implementation.md` Phase 9 and `task.md` Phase 9, with detailed guidance in `performance.md`.
- Prefer managed frontend CDN and Supabase connection pooling; no self-managed load balancer/cache cluster by default.
- Never shared-cache private calendar, OAuth or tenant data. Availability is rechecked authoritatively during booking confirmation.
