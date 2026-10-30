# Implementation Plan — Frontend + Supabase Managed Services

**Product:** Unified Scheduler  
**Architecture:** Next.js frontend + Supabase Auth/PostgreSQL/RLS/Edge Functions  
**Status:** Ready for task creation and implementation after Phase 0 decisions  
**Version:** 2.0  
**Last updated:** 2026-10-31

## 1. Important architecture instruction

This plan is for a **frontend-first product using managed services**. Do not build a separate custom backend application or standalone API server. Supabase provides the managed database and authentication. Supabase Edge Functions provide only the trusted serverless operations that need secrets or must be protected from browser tampering.

The product is not a static frontend-only mock. Secure OAuth, cross-calendar availability, and race-safe booking cannot safely be implemented only in browser JavaScript. Those operations will use Supabase-managed capabilities without requiring the team to maintain a traditional backend service.

## 2. Documentation map — what to read and when

| File | Read it when | It answers |
|---|---|---|
| [`README.md`](README.md) | First setup / onboarding | What the project is and how to run it |
| [`CLAUDE.md`](CLAUDE.md) | Before every coding-agent session | Mandatory agent behavior and architecture guardrails |
| [`docs/prd.md`](docs/prd.md) | Before product features or scope decisions | What users need and what the product must do |
| [`docs/architecture.md`](docs/architecture.md) | Before Supabase schema, RLS, Edge Functions, OAuth, or provider work | Where each responsibility lives and how services connect |
| [`docs/rules.md`](docs/rules.md) | Before any implementation | Security, tenant isolation, booking invariants, coding standards |
| [`docs/design.md`](docs/design.md) | Before any UI screen or component | Layout, colors, typography, components, interaction states |
| [`docs/task.md`](docs/task.md) | Before starting a Notify card | Approved scope, dependencies, acceptance criteria |
| [`docs/memory.md`](docs/memory.md) | Before design/architecture changes and when work resumes | Durable decisions, constraints, discoveries |
| `supabase/migrations/` | Before changing database schema | Existing schema history; never bypass migrations |

### Required reading by task type

- **UI-only task:** `CLAUDE.md` + `docs/design.md` + selected section of `docs/prd.md` + matching card in `docs/task.md`.
- **Supabase table/RLS task:** `CLAUDE.md` + `docs/architecture.md` + `docs/rules.md` + selected task card.
- **OAuth/provider task:** `CLAUDE.md` + `docs/architecture.md` + `docs/rules.md` + provider capability findings + selected task card.
- **Availability/booking task:** `CLAUDE.md` + `docs/prd.md` + `docs/architecture.md` + `docs/rules.md` + selected task card.
- **Design change:** `docs/design.md` first; update it before implementing a changed design system.
- **Performance/caching task:** `docs/performance.md` + `docs/architecture.md` + `docs/rules.md` + matching task card. Treat private calendar and tenant data as non-shareable cache content.

## 3. Rules for Notify task cards

Create one Notify card for each numbered task below. Each card must contain:
1. **Title** — short action-oriented title.
2. **Objective** — one clear outcome.
3. **Scope** — what is included and what is excluded.
4. **Dependencies** — prerequisite card IDs.
5. **Documentation to read** — exact file list from the plan.
6. **Acceptance criteria** — testable completion conditions.
7. **Test evidence** — commands, screenshots, test cases, or provider sandbox proof.

The `NTF-TBD` marker means the real Notify ID has not yet been assigned. Replace it with the actual ID after creating the card. Never fabricate IDs. Keep each task small enough to review independently; split any card that becomes larger than one focused engineering outcome.

## 4. Global implementation sequence

| Phase | Goal | Exit gate |
|---|---|---|
| 0 | Confirm managed-service setup and provider feasibility | Stack, Supabase project strategy, provider capability matrix, repo baseline approved |
| 1 | Frontend foundation and visual system | App shell and design system reviewed |
| 2 | Supabase setup, identity, tenant model and RLS | Auth and cross-tenant isolation tests pass |
| 3 | Organization workflow and calendar connection UI | Approved users can connect and manage accounts safely |
| 4 | Google/Zoho secure integrations | Provider reads/writes work in sandbox without exposing secrets |
| 5 | Availability engine | Conflict logic, timezone, buffers and stale-data behavior tested |
| 6 | Booking flow | Race-safe booking and destination calendar writes verified |
| 7 | Booking lifecycle and notifications | Reschedule, cancellation, email and reminders work idempotently |
| 8 | Admin, developer features and release | Security, monitoring and production readiness gates pass |

Do not skip a phase's exit gate. UI can be prototyped with mock data, but do not mark integration or booking features complete until the managed-service security and provider behavior are real and tested.

## 5. Detailed Notify-ready task cards

### Phase 0 — Decisions and project readiness

#### Card 0.1 — Confirm Supabase project and environment strategy
- **Notify ID:** `NTF-001`
- **Objective:** Decide Supabase project setup for local development, staging and production.
- **Scope:** Project ownership, regions, environments, access roles, backups, plan/limits, redirect URLs and secret-management approach. No feature coding.
- **Depends on:** None.
- **Read:** `README.md`, `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.
- **Acceptance:** Environment strategy is documented; project region and plan are selected; no credentials are committed; required owners/access are known.

#### Card 0.2 — Verify Google and Zoho API capabilities
- **Notify ID:** `NTF-002`
- **Objective:** Verify OAuth scopes, calendar listing, free/busy/event reads, event create/update/delete, refresh/revocation, quotas, webhook support and Zoho regions.
- **Scope:** Produce a capability matrix and sandbox test plan; do not implement provider integration yet.
- **Depends on:** Card 0.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/prd.md`.
- **Acceptance:** Every required provider capability is marked verified, unsupported or requiring fallback; callback URLs/scopes and regional endpoints are recorded.

#### Card 0.3 — Inspect repository and confirm frontend stack
- **Notify ID:** `NTF-003`
- **Objective:** Inspect the actual repository, package manager, existing UI, scripts, CI and conventions.
- **Scope:** Reconcile the proposed Next.js structure with the existing repository; do not replace working code unnecessarily.
- **Depends on:** Card 0.1.
- **Read:** `CLAUDE.md`, `README.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** A short baseline report records current stack, commands, existing assets, gaps and agreed folder structure.

#### Card 0.4 — Create Notify cards and confirm release gates
- **Notify ID:** `NTF-004`
- **Objective:** Create real Notify cards from this plan and assign owners/priorities.
- **Scope:** Add actual Notify IDs to `docs/task.md`; identify task owners and review owners.
- **Depends on:** Cards 0.1–0.3.
- **Read:** `implementation.md`, `docs/task.md`, `docs/rules.md`.
- **Acceptance:** Every implementation card has a real Notify ID, owner, priority and dependency; no `NTF-TBD` remains for tasks entering active work.

### Phase 1 — Frontend foundation and design system

#### Card 1.1 — Set up Next.js frontend application
- **Notify ID:** `NTF-005`
- **Objective:** Create or align the single Next.js + React + TypeScript application.
- **Scope:** App bootstrapping, package scripts, lint, type-check, test setup and environment validation. No separate API server.
- **Depends on:** 0.3.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/design.md`.
- **Acceptance:** App runs locally; lint/type-check commands work; no standalone backend service or unnecessary framework is added.

#### Card 1.2 — Implement design tokens and global styles
- **Notify ID:** `NTF-006`
- **Objective:** Implement the minimalist green visual system.
- **Scope:** Colors, typography, spacing, borders, radii, focus rings, responsive tokens and global styles.
- **Depends on:** 1.1.
- **Read:** `docs/design.md`, `docs/rules.md`.
- **Acceptance:** Tokens match design specification; components use tokens; keyboard focus and contrast are verified.

#### Card 1.3 — Build shared UI primitives
- **Notify ID:** `NTF-007`
- **Objective:** Create reusable accessible controls and common states.
- **Scope:** Buttons, inputs, selects, dialogs, tabs, tables, badges, dropdowns, skeletons, empty/error/success states.
- **Depends on:** 1.2.
- **Read:** `docs/design.md`, `docs/rules.md`.
- **Acceptance:** Shared variants are documented; keyboard behavior works; no duplicate one-off controls for common patterns.

#### Card 1.4 — Build organization workspace shell
- **Notify ID:** `NTF-008`
- **Objective:** Build the main workspace navigation and responsive layout.
- **Scope:** Sidebar, top bar, organization switcher, page header, responsive navigation and route placeholders.
- **Depends on:** 1.2, 1.3.
- **Read:** `docs/design.md`, `docs/prd.md`.
- **Acceptance:** Navigation matches route map; mobile layout works; active, collapsed and empty states are handled.

#### Card 1.5 — Build platform owner console shell
- **Notify ID:** `NTF-009`
- **Objective:** Build a separate Platform Owner Console experience.
- **Scope:** Navigation and page shells for organizations, access requests, users, plans, usage, audit and system health.
- **Depends on:** 1.2, 1.3.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.
- **Acceptance:** Console is visually distinct from organization workspace; UI does not imply unrestricted access to private event content.

### Phase 2 — Supabase setup, identity and tenant isolation

#### Card 2.1 — Configure Supabase clients and local development
- **Notify ID:** `NTF-010`
- **Objective:** Configure browser-safe and server-safe Supabase clients and local Supabase workflow.
- **Scope:** Supabase CLI/config, generated types, `.env.example`, local start/reset commands and safe key handling.
- **Depends on:** 0.1, 1.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `README.md`.
- **Acceptance:** Local environment starts; only publishable/anon key is exposed to browser; service-role key is absent from frontend build and committed files.

#### Card 2.2 — Create initial database migrations and profile model
- **Notify ID:** `NTF-011`
- **Objective:** Add profiles, organizations, memberships and foundational constraints.
- **Scope:** SQL migrations, foreign keys, indexes, generated TypeScript database types and seed data for local development.
- **Depends on:** 2.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/prd.md`.
- **Acceptance:** Migrations apply cleanly from an empty local database; constraints and generated types are checked in.

#### Card 2.3 — Configure Supabase Auth flows
- **Notify ID:** `NTF-012`
- **Objective:** Implement registration, login, logout, email verification and password reset using Supabase Auth.
- **Scope:** Frontend auth screens, redirect allowlists, session handling and protected route behavior.
- **Depends on:** 2.1, 2.2.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/design.md`, `docs/rules.md`.
- **Acceptance:** Auth lifecycle works in local/staging; unverified or signed-out users cannot access protected workspace routes; secrets are not stored manually in browser storage.

#### Card 2.4 — Implement RLS policies for profiles and organizations
- **Notify ID:** `NTF-013`
- **Objective:** Enforce organization membership and role access at the database layer.
- **Scope:** RLS policies and helper functions, with tests for owner/admin/member and cross-tenant access.
- **Depends on:** 2.2, 2.3.
- **Read:** `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** RLS enabled on exposed tables; user A cannot read or mutate organization B data; policies are tested with multiple identities.

#### Card 2.5 — Implement organization requests, approvals and invitations
- **Notify ID:** `NTF-014`
- **Objective:** Build the approval-based onboarding workflow.
- **Scope:** Access request tables, RLS, approval UI, invitation creation/acceptance and audit metadata.
- **Depends on:** 2.4.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/design.md`, `docs/rules.md`.
- **Acceptance:** New organization/join requests remain pending until approved; invite tokens are hashed, single-use and expiring; roles are assigned only through trusted flows.

#### Card 2.6 — Build team and role management UI
- **Notify ID:** `NTF-015`
- **Objective:** Allow authorized admins to manage team members and roles.
- **Scope:** Team list, invite flow, role change, deactivate/remove member and permission states.
- **Depends on:** 2.5.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.
- **Acceptance:** UI reflects RLS-protected permissions; unauthorized actions are hidden and rejected by data policies/functions.

### Phase 3 — Calendar connections and integrations UI

#### Card 3.1 — Create calendar connection schema and RLS
- **Notify ID:** `NTF-016`
- **Objective:** Add calendar connections, calendars and booking-link calendar-selection tables.
- **Scope:** Migrations, indexes, constraints and tenant policies; do not store tokens in client-readable rows.
- **Depends on:** 2.4, 0.2.
- **Read:** `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Multiple provider accounts/calendars per user are represented; connection metadata is tenant-scoped; sensitive credential access is restricted.

#### Card 3.2 — Build integrations and account management screens
- **Notify ID:** `NTF-017`
- **Objective:** Build UI for connecting accounts and managing calendar permissions.
- **Scope:** Provider cards, connect buttons, account list, calendar list, status, reconnect and disconnect states.
- **Depends on:** 1.3, 3.1.
- **Read:** `docs/design.md`, `docs/prd.md`.
- **Acceptance:** Loading, empty, connected, read-only, error and reconnect states are designed and responsive; no credentials appear in UI.

#### Card 3.3 — Implement secure Google OAuth Edge Functions
- **Notify ID:** `NTF-018`
- **Objective:** Implement Google OAuth start/callback and secure token lifecycle in Supabase Edge Functions.
- **Scope:** OAuth state, callback validation, code exchange, secure credential storage, refresh and disconnect/revoke handling.
- **Depends on:** 0.2, 2.1, 3.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`, Google capability matrix.
- **Acceptance:** OAuth success/denial/replay/expiry cases pass; tokens never reach browser; multiple accounts supported where provider rules allow.

#### Card 3.4 — Implement secure Zoho OAuth Edge Functions
- **Notify ID:** `NTF-019`
- **Objective:** Implement Zoho OAuth start/callback and secure token lifecycle.
- **Scope:** Region-aware endpoints, callback validation, code exchange, secure storage, refresh and disconnect/revoke.
- **Depends on:** 0.2, 2.1, 3.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`, Zoho capability matrix.
- **Acceptance:** Correct Zoho data center is used; success/denial/replay/expiry cases pass; tokens never reach browser.

#### Card 3.5 — Discover provider calendars and permissions
- **Notify ID:** `NTF-020`
- **Objective:** List calendars for each connected account and persist supported metadata.
- **Scope:** Edge Function provider calls, normalized calendar metadata, read/write capability and sync health.
- **Depends on:** 3.3, 3.4.
- **Read:** `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Multiple accounts/calendars work; read-only calendars are identified; pagination and provider errors are handled.

#### Card 3.6 — Implement connection health and reconnect experience
- **Notify ID:** `NTF-021`
- **Objective:** Show connection state and allow safe recovery from expired/revoked access.
- **Scope:** Health state, last successful sync, safe error copy and reconnect CTA.
- **Depends on:** 3.2, 3.5.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.
- **Acceptance:** UI accurately shows connected, stale, revoked and reconnect-required states without revealing sensitive provider errors.

### Phase 4 — Availability engine

#### Card 4.1 — Implement working hours and availability settings
- **Notify ID:** `NTF-022`
- **Objective:** Build host working hours, timezone, buffers, minimum notice and booking horizon.
- **Scope:** Tables, RLS, settings UI and validation.
- **Depends on:** 2.4, 3.1.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/design.md`, `docs/rules.md`.
- **Acceptance:** Settings persist correctly; timezone and date overrides are explicit; invalid or overlapping rules are rejected.

#### Card 4.2 — Implement provider busy-time retrieval
- **Notify ID:** `NTF-023`
- **Objective:** Retrieve the minimum required busy intervals from selected calendars.
- **Scope:** Edge Function provider reads, pagination, normalization and bounded caching/freshness rules.
- **Depends on:** 3.5.
- **Read:** `docs/architecture.md`, `docs/rules.md`, provider capability matrix.
- **Acceptance:** Google/Zoho busy intervals normalize to UTC; private titles/descriptions are not exposed; stale/error behavior is explicit.

#### Card 4.3 — Implement availability calculation and slot generation
- **Notify ID:** `NTF-024`
- **Objective:** Generate candidate slots from working hours and selected conflict-check calendars.
- **Scope:** Trusted Edge Function and tested shared logic for timezone, duration, buffers, notice, horizon, overrides and any-calendar conflict rule.
- **Depends on:** 4.1, 4.2.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Any overlap in any selected check calendar blocks the slot; DST/timezone/buffer cases pass unit tests; no event details leak.

#### Card 4.4 — Build calendar availability UI
- **Notify ID:** `NTF-025`
- **Objective:** Show unified calendars and computed availability to workspace users.
- **Scope:** Calendar views, account/calendar filters, timezone display and connection warning states.
- **Depends on:** 3.6, 4.3.
- **Read:** `docs/design.md`, `docs/prd.md`.
- **Acceptance:** UI reflects trusted data; filters do not change booking policy; empty/loading/error/stale states work.

### Phase 5 — Booking links and booking confirmation

#### Card 5.1 — Create booking-link schema and RLS
- **Notify ID:** `NTF-026`
- **Objective:** Add booking links and separate conflict-check/destination calendar selections.
- **Scope:** Migrations, slug uniqueness, status constraints and policies.
- **Depends on:** 3.1, 4.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/prd.md`.
- **Acceptance:** Published link has one destination calendar and one or more conflict-check calendars; invalid configuration cannot publish.

#### Card 5.2 — Build booking-link builder UI
- **Notify ID:** `NTF-027`
- **Objective:** Allow authorized users to create and manage multiple booking links.
- **Scope:** Link details, duration, buffers, host, working hours, conflict-check calendars, one destination calendar, preview and publish.
- **Depends on:** 5.1, 4.4.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.
- **Acceptance:** Users can create multiple distinct links; calendar selection clearly separates check calendars from destination; invalid settings are explained.

#### Card 5.3 — Build public booking page and slot selection
- **Notify ID:** `NTF-028`
- **Objective:** Let invitees view a public booking page and choose an available slot without an account.
- **Scope:** Public link page, booking details, date/time selection, invitee form and accessible responsive layout.
- **Depends on:** 5.2, 4.3.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.
- **Acceptance:** Only published link data and computed slots are exposed; no calendar identifiers, event details or tenant-private records leak.

#### Card 5.4 — Implement race-safe booking confirmation
- **Notify ID:** `NTF-029`
- **Objective:** Confirm a booking safely and create one event in the selected destination calendar.
- **Scope:** Edge Function orchestration, final availability recheck, transaction/locking, idempotency, provider write, booking state and safe recovery.
- **Depends on:** 4.3, 5.1, 5.3.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Concurrent requests for the same conflicting slot cannot both confirm; event is written only to destination calendar; confirmed state appears only after successful provider write and committed booking state; uncertain writes are reconciled before retry.

#### Card 5.5 — Build booking success and detail screens
- **Notify ID:** `NTF-030`
- **Objective:** Show confirmation and booking details safely to invitees and hosts.
- **Scope:** Confirmation page, details, timezone labels and secure management-link handoff.
- **Depends on:** 5.4.
- **Read:** `docs/design.md`, `docs/prd.md`.
- **Acceptance:** UI reflects persisted booking state; pending/failure states are clear; no sensitive internal identifiers are exposed.

### Phase 6 — Booking lifecycle and notifications

#### Card 6.1 — Implement secure rescheduling
- **Notify ID:** `NTF-031`
- **Objective:** Allow authorized invitees/hosts to move a booking to a new valid slot.
- **Scope:** Hashed expiring management token, new availability check, idempotent update of the existing destination event and audit history.
- **Depends on:** 5.4.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Expired/invalid tokens fail safely; conflicts are rechecked; provider event is updated rather than duplicated; audit history is recorded.

#### Card 6.2 — Implement secure cancellation
- **Notify ID:** `NTF-032`
- **Objective:** Cancel bookings and update the destination provider event consistently.
- **Scope:** Cancellation token/authorization, state transition, provider event cancellation/deletion policy and audit history.
- **Depends on:** 5.4.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Repeated cancellation is idempotent; unauthorized cancellation is rejected; provider and booking states reconcile.

#### Card 6.3 — Configure transactional email notifications
- **Notify ID:** `NTF-033`
- **Objective:** Send booking confirmations, changes, cancellations and invitations.
- **Scope:** Select managed email provider, templates, Edge Function integration and delivery status.
- **Depends on:** 2.5, 5.4.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/design.md`.
- **Acceptance:** Emails use correct timezone and booking details; retries do not send uncontrolled duplicates; secrets remain server-side.

#### Card 6.4 — Add reminders and provider reconciliation schedule
- **Notify ID:** `NTF-034`
- **Objective:** Schedule reminders and reconcile provider changes where required.
- **Scope:** Supabase Cron or approved managed scheduler invoking Edge Functions; no self-hosted worker.
- **Depends on:** 3.5, 6.3.
- **Read:** `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Scheduled jobs are observable, bounded and idempotent; failed runs can be retried safely; reminder timing respects booking timezone.

### Phase 7 — Administration and developer capabilities

#### Card 7.1 — Complete organization settings and audit UI
- **Notify ID:** `NTF-035`
- **Objective:** Complete organization settings, plan display and audit history.
- **Scope:** Organization profile, timezone, allowed settings, audit table and role-aware controls.
- **Depends on:** 2.5, 2.6.
- **Read:** `docs/prd.md`, `docs/design.md`, `docs/rules.md`.
- **Acceptance:** Only authorized admins can change settings; audit records are visible according to role; private calendar event details remain restricted.

#### Card 7.2 — Complete platform owner console data views
- **Notify ID:** `NTF-036`
- **Objective:** Add platform-level organization, request, user, plan and system-health views.
- **Scope:** RLS-protected views and narrowly scoped Edge Functions only where privileged cross-tenant aggregation is necessary.
- **Depends on:** 2.5, 7.1.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`, `docs/design.md`.
- **Acceptance:** Platform owner sees operational metadata needed for administration but not private calendar event contents by default; all privileged operations are audited.

#### Card 7.3 — Implement API keys and webhooks (later release)
- **Notify ID:** `NTF-037`
- **Objective:** Provide scoped organization API keys and signed outbound webhooks.
- **Scope:** Key generation/hash storage, one-time secret display, scopes, webhook signing, delivery retries and logs.
- **Depends on:** 7.1, 5.4.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** API secrets are stored hashed and shown once; webhook signatures can be verified; delivery retries are bounded and audited.

### Phase 8 — Quality, security and production release

#### Card 8.1 — Complete RLS and security review
- **Notify ID:** `NTF-038`
- **Objective:** Audit all tables, policies, Edge Functions, secrets, public routes and privileged operations.
- **Scope:** Threat review, cross-tenant tests, secret scan, public token/rate-limit review and dependency review.
- **Depends on:** Phases 2–7.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/prd.md`.
- **Acceptance:** No exposed table lacks appropriate RLS; privilege escalation and cross-tenant tests pass; no secrets are bundled or logged; findings are resolved or explicitly accepted.

#### Card 8.2 — Complete availability and booking concurrency tests
- **Notify ID:** `NTF-039`
- **Objective:** Prove core scheduling invariants under realistic conditions.
- **Scope:** Multi-calendar conflicts, buffers, timezone/DST, stale provider data, simultaneous booking, retries and ambiguous provider writes.
- **Depends on:** 4.3, 5.4, 6.1, 6.2.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Automated tests demonstrate no conflicting double confirmation and no duplicate provider event after safe retry/reconciliation.

#### Card 8.3 — Complete end-to-end and responsive QA
- **Notify ID:** `NTF-040`
- **Objective:** Verify the full experience across roles, devices and failure states.
- **Scope:** Onboarding, approval, integrations, calendar views, booking links, public booking, reschedule, cancellation, admin and accessibility.
- **Depends on:** Phases 1–7.
- **Read:** `docs/prd.md`, `docs/design.md`, `docs/rules.md`.
- **Acceptance:** Critical user journeys pass on supported browsers and mobile widths; loading/empty/error/success states and keyboard accessibility are checked.

#### Card 8.4 — Configure production deployment and operations
- **Notify ID:** `NTF-041`
- **Objective:** Prepare frontend and Supabase production environments for controlled release.
- **Scope:** Environment secrets, migrations, Edge Function deployment, OAuth production settings, backups, monitoring, rollback and incident notes.
- **Depends on:** 8.1–8.3, 0.1, 0.2.
- **Read:** `README.md`, `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.
- **Acceptance:** Staging release is verified; production secrets are configured outside source control; migrations and functions deploy repeatably; rollback and support owner are documented.

### Phase 9 — Performance, caching and production optimization

These tasks use managed platform capabilities. Do not introduce a separate backend, self-managed cache cluster, or load balancer just to satisfy a generic checklist. See [`docs/performance.md`](docs/performance.md) for the complete implementation guide and cache policy.

#### Card 9.1 — Establish performance baselines and budgets
- **Notify ID:** `NTF-042`
- **Objective:** Measure the first complete frontend and define route-specific performance budgets.
- **Scope:** Lighthouse mobile/desktop, Core Web Vitals where available, bundle analysis, slow query timings and Edge Function latency.
- **Depends on:** 1.1, 8.3.
- **Read:** `docs/performance.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Baseline report is committed; budgets and key routes are documented; no unmeasured performance claims.

#### Card 9.2 — Optimize images, loading and frontend bundles
- **Notify ID:** `NTF-043`
- **Objective:** Reduce image, JavaScript and CSS delivery cost.
- **Scope:** Compress/resize images, lazy-load below-the-fold media, split route/heavy component chunks, minify production JS/CSS, defer non-critical scripts and add skeleton states.
- **Depends on:** 1.2, 1.3, 8.3.
- **Read:** `docs/performance.md`, `docs/design.md`, `docs/rules.md`.
- **Acceptance:** Production build confirms code splitting/minification; image and loading behavior verified; skeletons and layout stability checked.

#### Card 9.3 — Optimize React interactions and large lists
- **Notify ID:** `NTF-044`
- **Objective:** Keep interactive screens responsive as data volume grows.
- **Scope:** Profile and reduce unnecessary re-renders, debounce search/filter inputs, paginate large lists, remove unused dependencies.
- **Depends on:** 1.3, 8.3.
- **Read:** `docs/performance.md`, `docs/design.md`, `docs/rules.md`.
- **Acceptance:** Profiling evidence identifies improvements; lists are bounded/paginated; search avoids excessive requests; dependency cleanup passes tests.

#### Card 9.4 — Optimize Supabase database queries and indexes
- **Notify ID:** `NTF-045`
- **Objective:** Improve hot database paths and eliminate avoidable query overhead.
- **Scope:** Review query plans, add migration-managed indexes, fix N+1 reads, select only required fields, paginate and batch related reads.
- **Depends on:** 2.2, 4.1, 5.1, 8.2.
- **Read:** `docs/performance.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Hot query plans and before/after timings are recorded; indexes are justified; N+1 patterns are fixed; RLS remains effective.

#### Card 9.5 — Configure managed CDN, caching and connection pooling
- **Notify ID:** `NTF-046`
- **Objective:** Use safe managed caching and connection pooling without operating additional infrastructure.
- **Scope:** Frontend host CDN for static assets, Supabase Storage delivery where suitable, safe public/server-side cache rules, bounded tenant-scoped computed-result cache, Supabase managed connection pooler, payload reduction and cache invalidation.
- **Depends on:** 0.1, 2.1, 8.4.
- **Read:** `docs/performance.md`, `docs/architecture.md`, `docs/rules.md`.
- **Acceptance:** Cache keys/TTL/privacy/invalidation are documented; private calendar/OAuth/tenant data is not shared-cached; provider availability is rechecked at confirmation; pooler mode is configured per Supabase guidance.

#### Card 9.6 — Run final Lighthouse and performance regression audit
- **Notify ID:** `NTF-047`
- **Objective:** Verify the performance improvements and catch regressions before release.
- **Scope:** Lighthouse mobile/desktop for public booking, login, dashboard, calendar and booking management; review Core Web Vitals, bundles, image delivery, queries and function latency.
- **Depends on:** 9.1–9.5, 8.4.
- **Read:** `docs/performance.md`, `docs/prd.md`, `docs/rules.md`.
- **Acceptance:** Audit report and remediation list are attached; agreed budgets pass or exceptions have owners and approvals.

**Infrastructure note:** A separate load balancer is intentionally not a default task. The managed frontend host and Supabase provide platform routing/scaling. Add a dedicated load balancer only if measured scale or a specific deployment topology requires it and the architecture is approved.

## 7. Recommended delivery milestones

- **Milestone A — Clickable product shell:** Phase 1 complete using mock data only.
- **Milestone B — Secure workspace foundation:** Phase 2 complete; Supabase Auth and RLS validated.
- **Milestone C — Connected calendars:** Phase 3 complete; Google and Zoho sandbox connections verified.
- **Milestone D — Reliable scheduling:** Phases 4 and 5 complete; availability and booking concurrency gates pass.
- **Milestone E — Operational product:** Phases 6 and 7 complete; notifications, administration and developer capabilities verified.
- **Milestone F — Production readiness:** Phases 8–9 complete; security, performance and production readiness gates pass.

## 8. Definition of task completion

A Notify card can be marked complete only when its acceptance criteria pass, evidence is attached, tests are green, relevant docs are updated, and no unapproved custom backend service or infrastructure has been introduced. Performance-sensitive work must also satisfy the relevant checklist in `docs/performance.md`.
