# Unified Scheduler — Step-by-Step Implementation Plan

**Document:** `implementation.md`  
**Status:** Execution roadmap — proposed, pending CTO approval  
**Last updated:** 2026-10-31  
**Task tracker:** Notify  
**Task ID convention:** Replace every `NTF-TBD` with the real Notify card ID. Never invent an ID.

---

## 1. Purpose and how to use this plan

This document converts the product and design baseline into a dependency-ordered implementation roadmap. It is the execution guide; the six documents in `docs/` remain the detailed source of truth for product requirements, architecture, engineering rules, UI design, task plans, and decisions.

**Do not start coding directly from this roadmap.** For each card:

1. Create a Notify card using the title, objective, acceptance criteria, dependencies, and references below.
2. Assign an owner and due date in Notify.
3. Replace the corresponding `NTF-TBD` in this file and `docs/task.md` with the real card ID.
4. The owner reads the documents listed in that card before implementation.
5. Write or update the detailed technical plan in `docs/task.md` and obtain approval.
6. Implement only the approved scope.
7. Run the listed tests, attach evidence to Notify, and get review before marking complete.
8. Update `docs/memory.md` if a decision, invariant, architecture pattern, or known risk changes.

Notify is the source of truth for owner, status, due date, and progress. Markdown files are the source of truth for project context and technical decisions.

## 2. Documentation map — which file to read and when

All links below are relative to the project root. Open them in the repository or your coding agent.

| Document | Read it when | It answers |
|---|---|---|
| [`README.md`](README.md) | First day / onboarding | What the project is and where the docs live |
| [`CLAUDE.md`](CLAUDE.md) | Before every coding session in Claude Code | Agent workflow, mandatory checks, and coding boundaries |
| [`docs/prd.md`](docs/prd.md) | Before product-facing work or when scope is unclear | What to build, for whom, priorities, user stories, acceptance criteria |
| [`docs/architecture.md`](docs/architecture.md) | Before backend, database, API, integration, or infrastructure work | System boundaries, proposed stack, data model, API, service responsibilities |
| [`docs/rules.md`](docs/rules.md) | Before every implementation and pull request | Security, tenant isolation, business invariants, coding/testing rules |
| [`docs/design.md`](docs/design.md) | Before any UI implementation or visual change | Colors, tokens, navigation, screen layouts, components, responsive states |
| [`docs/task.md`](docs/task.md) | Before starting a task and when recording its approved plan | Task scope, files, acceptance criteria, edge cases, impact, test plan |
| [`docs/memory.md`](docs/memory.md) | Before changing shared logic or making an architectural decision | Decisions already made, constraints, risks, patterns, change log |
| `implementation.md` | At the start of a phase and when selecting the next card | Correct order, dependencies, card breakdown, phase exit gates |

### Read order by work type

- **Every task:** `CLAUDE.md` → relevant sections of `docs/prd.md` → `docs/rules.md` → matching card in `docs/task.md` → `docs/memory.md`.
- **Frontend/UI:** also read `docs/design.md` before writing components or styles.
- **Backend/API/database:** also read `docs/architecture.md` before changing schemas, services, routes, or jobs.
- **Provider integrations:** read `docs/architecture.md`, `docs/rules.md`, and the provider-related decisions/risks in `docs/memory.md`.
- **Shared availability/booking logic:** read all of `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`, and `docs/memory.md` before implementation.
- **After a decision changes:** update the relevant source document and `docs/memory.md`; do not leave a decision only in a chat or Notify comment.

## 3. Non-negotiable implementation rules

1. **Backend is authoritative.** The frontend never decides whether a slot is free, whether a user has permission, or whether a booking is confirmed.
2. **Conflict checking and event destination are different settings.** A booking link can check multiple selected calendars but writes a new event to exactly one explicitly selected destination calendar.
3. **Any busy selected calendar blocks an overlapping slot.** Do not use an “any calendar is free” rule.
4. **Tenant isolation applies to every query and mutation.** Resolve organization scope from the authenticated server context, not a client-supplied organization ID.
5. **Do not leak private event details.** Availability endpoints return bookable slots, not event titles, attendees, or descriptions. Platform administrators do not automatically gain access to private calendar content.
6. **No false confirmation.** Confirm only after the slot is rechecked, the booking is committed safely, and the destination calendar write succeeds. If the provider result is ambiguous, reconcile before retrying to avoid duplicate events.
7. **No credentials in the browser or logs.** OAuth tokens are encrypted at rest and only used server-side.
8. **Public invitees do not need accounts.** Public booking and secure booking-management links must not expose internal workspace data.
9. **Do not guess provider capabilities.** Verify Google and Zoho scopes, quotas, event semantics, webhook behavior, and Zoho data-center/region before relying on them.
10. **Do not assume the proposed stack is approved.** Confirm the stack/hosting/ORM/queue decisions before the foundation cards that depend on them.
11. **Every card is small.** Target 0.5–2 working days. Split a card if it cannot be implemented, tested, and reviewed within that limit.
12. **No code without a real Notify ID and approved plan.** `NTF-TBD` is a placeholder, not authorization to start.

## 4. Phase overview and release gates

| Phase | Outcome | Exit gate |
|---|---|---|
| 0. Decisions and repo readiness | Approved stack, provider feasibility, repository and environments ready | CTO decisions recorded; CI and local setup work |
| 1. Foundation and design system | Secure app foundation and minimal green UI shell | Authenticated app shells work; design QA passes |
| 2. Identity and organizations | Approval-based onboarding, org membership, roles | Tenant isolation and access tests pass |
| 3. Calendar connections | Multiple Google/Zoho accounts and calendars connected | OAuth, token lifecycle, calendar discovery tested |
| 4. Availability | Correct server-side slots across selected calendars | Conflict, timezone, DST, stale-data tests pass |
| 5. Booking links and booking engine | Host can publish links; invitees can book safely | No double booking; destination event and confirmation flow pass |
| 6. Booking lifecycle and notifications | Reschedule, cancel, confirmations, reminders | Idempotent lifecycle and delivery behavior tested |
| 7. Platform administration and developer API | Admin console, API keys, webhooks, audit | Role boundaries, scopes, signatures, audit tests pass |
| 8. Hardening and release | Observability, security, performance, deployment | Production readiness checklist approved |

Build in this order. Do not start a dependent phase just because its UI can be mocked; its required backend contract and security behavior must exist or be explicitly approved as a temporary mock.

## 5. Notify card-ready backlog

Create one Notify card for each item below. The descriptions are intentionally small. Copy the title, objective, acceptance criteria, dependencies, and document references into Notify. Keep the full technical plan in `docs/task.md` and the status in Notify.

### Phase 0 — Decisions and repository readiness

#### Card 0.1 — Confirm technology and deployment decisions
- **Notify ID:** `NTF-TBD`
- **Objective:** Approve frontend, API deployment model, database/ORM, queue/cache, authentication, email, hosting, and environments.
- **Acceptance criteria:** Decisions are recorded in `docs/architecture.md`; rejected options are not introduced; required secrets/services are identified without putting secret values in docs.
- **Depends on:** None.
- **Read:** `README.md`, `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 0.2 — Verify Google and Zoho provider capabilities
- **Notify ID:** `NTF-TBD`
- **Objective:** Confirm OAuth scopes, multiple-account support, calendar discovery, free/busy reads, event create/update/delete, token refresh/revocation, quotas, webhook/push behavior, and Zoho regions.
- **Acceptance criteria:** Provider capability matrix and required scopes are documented; unsupported features and fallback sync strategy are explicit; no unverified API assumptions remain in the implementation plan.
- **Depends on:** Card 0.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 0.3 — Inspect repository and record implementation baseline
- **Notify ID:** `NTF-TBD`
- **Objective:** Inspect the actual repository, existing code, package manager, CI, environment setup, and conventions before creating or moving files.
- **Acceptance criteria:** Existing assets and code are inventoried; proposed folder structure is reconciled with the real repo; setup instructions work on a clean development environment.
- **Depends on:** Card 0.1.
- **Read:** `CLAUDE.md`, `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 0.4 — Set up repository checks and development environments
- **Notify ID:** `NTF-TBD`
- **Objective:** Configure lint, type-check, test commands, environment validation, CI, and safe example environment variables.
- **Acceptance criteria:** A clean checkout can install, run checks, and start locally; CI runs required checks; `.env.example` contains names/placeholders only.
- **Depends on:** Cards 0.1 and 0.3.
- **Read:** `docs/architecture.md`, `docs/rules.md`.

### Phase 1 — Foundation and design system

#### Card 1.1 — Create application and package skeleton
- **Notify ID:** `NTF-TBD`
- **Objective:** Create the approved frontend/backend/shared package structure without implementing domain features.
- **Acceptance criteria:** App starts; route and module boundaries match the approved architecture; no duplicate frameworks or unnecessary packages are added.
- **Depends on:** Card 0.4.
- **Read:** `docs/architecture.md`, `docs/rules.md`.

#### Card 1.2 — Implement design tokens and global styles
- **Notify ID:** `NTF-TBD`
- **Objective:** Implement the green minimalist color, typography, spacing, radius, border, focus, and responsive tokens.
- **Acceptance criteria:** Tokens match `docs/design.md`; components use tokens rather than scattered hex values; keyboard focus is visible; contrast is checked.
- **Depends on:** Card 1.1.
- **Read:** `docs/design.md`, `docs/rules.md`.

#### Card 1.3 — Build shared UI primitives
- **Notify ID:** `NTF-TBD`
- **Objective:** Implement the small reusable set of buttons, fields, selects, dialogs, tabs, tables, badges, empty states, and loading/error states.
- **Acceptance criteria:** Components have consistent variants and accessible labels; loading/disabled/error states are represented; no one-off styling duplicates the shared primitives.
- **Depends on:** Card 1.2.
- **Read:** `docs/design.md`, `docs/rules.md`.

#### Card 1.4 — Build organization workspace shell
- **Notify ID:** `NTF-TBD`
- **Objective:** Implement workspace sidebar, top bar, organization switcher, page header, and responsive navigation.
- **Acceptance criteria:** Navigation matches the design map; active state works; mobile navigation works; empty/multiple-organization states are handled.
- **Depends on:** Cards 1.2 and 1.3.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.

#### Card 1.5 — Build platform owner shell
- **Notify ID:** `NTF-TBD`
- **Objective:** Implement a separate Platform Owner Console shell and navigation, without granting access to private calendar event content.
- **Acceptance criteria:** Platform routes have distinct navigation; route visibility is permission-aware; no private event details are rendered.
- **Depends on:** Cards 1.2 and 1.3.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.

### Phase 2 — Identity and organizations

#### Card 2.1 — Implement user identity and secure sessions
- **Notify ID:** `NTF-TBD`
- **Objective:** Implement registration, login, logout, session renewal, and server-side identity resolution using the approved auth approach.
- **Acceptance criteria:** Sessions are secure; protected APIs reject unauthenticated requests; secrets/session tokens are not exposed in logs or client storage contrary to the approved design.
- **Depends on:** Cards 0.1 and 1.1.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 2.2 — Implement organization creation and join requests
- **Notify ID:** `NTF-TBD`
- **Objective:** Allow a verified user to request a new organization or request to join an existing organization.
- **Acceptance criteria:** Requests are persisted as pending; duplicate and invalid requests are handled; no workspace access is granted before approval.
- **Depends on:** Card 2.1.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 2.3 — Implement approval and invitation workflow
- **Notify ID:** `NTF-TBD`
- **Objective:** Allow authorized approvers to approve/reject requests and invite employees into an organization.
- **Acceptance criteria:** Approval/rejection is audited; invitation expiry and reuse rules are enforced; invitees receive only the intended organization role.
- **Depends on:** Card 2.2.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 2.4 — Implement organization roles and tenant authorization
- **Notify ID:** `NTF-TBD`
- **Objective:** Enforce platform owner, organization admin, and member permissions on backend routes and services.
- **Acceptance criteria:** Tenant-owned reads/writes are organization-scoped; cross-tenant access tests fail safely; platform admin cannot read private calendar event details by default.
- **Depends on:** Cards 2.1–2.3.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 2.5 — Add tenant isolation test suite
- **Notify ID:** `NTF-TBD`
- **Objective:** Add automated tests covering cross-organization reads, writes, IDs, invitations, and role boundaries.
- **Acceptance criteria:** Tests cover both permitted and denied paths; tests run in CI; any bypass is fixed before Phase 3.
- **Depends on:** Card 2.4.
- **Read:** `docs/rules.md`, `docs/architecture.md`.

### Phase 3 — Calendar connections

#### Card 3.1 — Define provider adapter contract and mocks
- **Notify ID:** `NTF-TBD`
- **Objective:** Define provider-independent operations for OAuth, account discovery, calendar listing, busy reads, event writes, updates, deletes, and health.
- **Acceptance criteria:** Contract is documented and tested with mock provider responses; normalized types do not expose provider-specific payloads to domain services.
- **Depends on:** Card 0.2.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 3.2 — Implement encrypted provider credential storage
- **Notify ID:** `NTF-TBD`
- **Objective:** Persist OAuth credentials securely with rotation and access boundaries.
- **Acceptance criteria:** Credentials are encrypted at rest; key management is documented; tokens are never returned to frontend or written to logs; access is tenant-scoped.
- **Depends on:** Cards 2.4 and 3.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`.

#### Card 3.3 — Implement Google OAuth connection flow
- **Notify ID:** `NTF-TBD`
- **Objective:** Connect a Google account using verified OAuth scopes and secure callback handling.
- **Acceptance criteria:** State/PKCE protections are applied where supported; success, denial, expiry, and error cases work; multiple Google accounts can be linked as allowed by provider policy.
- **Depends on:** Cards 3.1 and 3.2.
- **Read:** `docs/architecture.md`, `docs/rules.md`, provider findings from Card 0.2.

#### Card 3.4 — Implement Zoho OAuth connection flow
- **Notify ID:** `NTF-TBD`
- **Objective:** Connect a Zoho account using the correct region/data-center and verified OAuth configuration.
- **Acceptance criteria:** State/PKCE protections are applied where supported; region-specific endpoints are handled; success, denial, expiry, and error cases work.
- **Depends on:** Cards 3.1 and 3.2.
- **Read:** `docs/architecture.md`, `docs/rules.md`, provider findings from Card 0.2.

#### Card 3.5 — Discover and persist connected calendars
- **Notify ID:** `NTF-TBD`
- **Objective:** List calendars for each connected account and persist provider IDs, access levels, timezone metadata, and sync state.
- **Acceptance criteria:** Multiple accounts/calendars are supported; read-only and unavailable calendars are identified; duplicate connections are handled safely.
- **Depends on:** Cards 3.3 and 3.4.
- **Read:** `docs/architecture.md`, `docs/rules.md`.

#### Card 3.6 — Build integrations and calendar selection UI
- **Notify ID:** `NTF-TBD`
- **Objective:** Build the UI to connect/disconnect accounts and view calendar connection and permission status.
- **Acceptance criteria:** Loading, empty, error, connected, reconnect-required, and read-only states are shown; no token is exposed; UI follows design tokens.
- **Depends on:** Card 3.5.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.

#### Card 3.7 — Implement calendar sync and freshness status
- **Notify ID:** `NTF-TBD`
- **Objective:** Fetch and normalize provider busy data using the approved polling/webhook strategy.
- **Acceptance criteria:** Sync cursors and failures are persisted; pagination and retries are handled; freshness is visible to backend policy; duplicate notifications do not corrupt state.
- **Depends on:** Cards 0.2, 3.1, and 3.5.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

### Phase 4 — Availability engine

#### Card 4.1 — Implement timezone and interval utilities
- **Notify ID:** `NTF-TBD`
- **Objective:** Create tested UTC interval normalization, overlap, adjacency, buffer, and timezone conversion helpers.
- **Acceptance criteria:** Boundary cases are tested; DST gaps and repeated local times are covered; use the approved timezone library rather than custom date arithmetic.
- **Depends on:** Card 0.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 4.2 — Implement working hours and availability overrides
- **Notify ID:** `NTF-TBD`
- **Objective:** Persist and validate host working hours, date-specific overrides, and timezone settings.
- **Acceptance criteria:** Recurring weekly hours and exceptions are supported; invalid ranges are rejected; API responses are tenant-scoped.
- **Depends on:** Cards 2.4 and 4.1.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 4.3 — Implement busy interval aggregation
- **Notify ID:** `NTF-TBD`
- **Objective:** Aggregate busy intervals from every calendar selected for conflict checking, plus platform bookings.
- **Acceptance criteria:** Intervals are normalized and merged; any overlap in any selected calendar blocks the candidate slot; no private event details leave the backend.
- **Depends on:** Cards 3.7 and 4.1.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 4.4 — Implement candidate slot generation and policy rules
- **Notify ID:** `NTF-TBD`
- **Objective:** Generate candidate slots using duration, working hours, buffers, minimum notice, booking horizon, and overrides.
- **Acceptance criteria:** All policies are applied consistently; boundary and DST cases pass; no frontend calculation is authoritative.
- **Depends on:** Cards 4.2 and 4.3.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 4.5 — Expose authenticated and public availability APIs
- **Notify ID:** `NTF-TBD`
- **Objective:** Expose availability for workspace previews and public booking pages.
- **Acceptance criteria:** Responses contain only bookable slots and timezone metadata; date ranges are validated/capped; public endpoints are rate-limited; no event details are returned.
- **Depends on:** Card 4.4.
- **Read:** `docs/architecture.md`, `docs/rules.md`.

#### Card 4.6 — Add availability correctness and load tests
- **Notify ID:** `NTF-TBD`
- **Objective:** Verify conflict invariants, provider freshness failure policy, DST behavior, pagination, and common query load.
- **Acceptance criteria:** Property tests prove overlapping busy intervals never produce bookable slots; stale/unavailable provider policy is explicit and tested; performance target is recorded.
- **Depends on:** Cards 4.3–4.5.
- **Read:** `docs/rules.md`, `docs/memory.md`, `docs/architecture.md`.

### Phase 5 — Booking links and booking engine

#### Card 5.1 — Implement booking link data model and API
- **Notify ID:** `NTF-TBD`
- **Objective:** Create tenant-scoped booking links with host, slug, meeting details, duration, timezone, policy, and publication state.
- **Acceptance criteria:** Create/update/archive operations are authorized; slug uniqueness is enforced; drafts are not publicly bookable.
- **Depends on:** Cards 2.4 and 4.2.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 5.2 — Implement separate conflict calendars and one destination calendar
- **Notify ID:** `NTF-TBD`
- **Objective:** Persist the set of calendars to check separately from exactly one writable destination calendar.
- **Acceptance criteria:** Multiple conflict calendars can be selected; exactly one valid destination is required for publishing; destination must be authorized and writable; no event is copied to all selected calendars.
- **Depends on:** Cards 3.5 and 5.1.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 5.3 — Build booking link builder UI
- **Notify ID:** `NTF-TBD`
- **Objective:** Build draft creation/editing, host selection, duration, availability, calendar selection, preview, publish, pause, duplicate, and archive controls.
- **Acceptance criteria:** UI clearly separates “Calendars to check” and “Destination calendar”; invalid configurations cannot publish; all states match `docs/design.md`.
- **Depends on:** Cards 5.1 and 5.2.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.

#### Card 5.4 — Build public booking page
- **Notify ID:** `NTF-TBD`
- **Objective:** Build a mobile-friendly public page for invitees to choose a date/time and submit required details without an account.
- **Acceptance criteria:** Page displays only server-returned slots; timezone is clear; loading, no-availability, validation, and error states work; no internal workspace data is exposed.
- **Depends on:** Cards 4.5 and 5.3.
- **Read:** `docs/design.md`, `docs/prd.md`, `docs/rules.md`.

#### Card 5.5 — Implement atomic slot hold and booking confirmation
- **Notify ID:** `NTF-TBD`
- **Objective:** Recheck availability at submission, prevent concurrent double booking, and create the destination calendar event safely.
- **Acceptance criteria:** Atomic lock/transaction and idempotency are implemented; conflict returns a clear retry response; booking is not confirmed before destination write success; ambiguous provider outcomes are reconciled without duplicate events.
- **Depends on:** Cards 4.6, 5.2, and 5.4.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 5.6 — Implement booking confirmation and secure management link
- **Notify ID:** `NTF-TBD`
- **Objective:** Return a booking confirmation and secure invitee management token after a successful booking.
- **Acceptance criteria:** Token is high entropy, stored safely, scoped to one booking, revocable/expiring according to policy; response contains only necessary booking details.
- **Depends on:** Card 5.5.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

### Phase 6 — Booking lifecycle and notifications

#### Card 6.1 — Implement rescheduling flow
- **Notify ID:** `NTF-TBD`
- **Objective:** Allow authorized host or invitee token holder to reschedule a booking.
- **Acceptance criteria:** New slot is rechecked and locked; original booking is not lost if new slot fails; provider event is updated idempotently; audit record is created.
- **Depends on:** Cards 5.5 and 5.6.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 6.2 — Implement cancellation flow
- **Notify ID:** `NTF-TBD`
- **Objective:** Allow authorized host or invitee token holder to cancel a booking.
- **Acceptance criteria:** Authorization is enforced; cancellation is idempotent; destination event is updated/deleted according to approved policy; cancellation is audited.
- **Depends on:** Cards 5.5 and 5.6.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 6.3 — Implement transactional email notifications
- **Notify ID:** `NTF-TBD`
- **Objective:** Send booking confirmation, reschedule, cancellation, and host notification emails.
- **Acceptance criteria:** Templates are approved; delivery attempts and failures are recorded; retries do not send uncontrolled duplicates; email failure does not corrupt booking state.
- **Depends on:** Cards 5.6, 6.1, and 6.2.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/design.md`, `docs/rules.md`.

#### Card 6.4 — Implement reminders and background job reliability
- **Notify ID:** `NTF-TBD`
- **Objective:** Schedule reminders and make background job retries, dead-letter handling, and observability reliable.
- **Acceptance criteria:** Reminder timing follows booking timezone/policy; duplicate jobs are idempotent; failures can be inspected and replayed safely.
- **Depends on:** Card 6.3.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

### Phase 7 — Platform administration and developer API

#### Card 7.1 — Implement platform access-request console
- **Notify ID:** `NTF-TBD`
- **Objective:** Let authorized platform owners review pending organization/user access requests.
- **Acceptance criteria:** Approve/reject actions are permission-checked and audited; console does not reveal private calendar event details.
- **Depends on:** Cards 2.3 and 2.4.
- **Read:** `docs/prd.md`, `docs/design.md`, `docs/rules.md`.

#### Card 7.2 — Implement organization and user administration
- **Notify ID:** `NTF-TBD`
- **Objective:** Provide platform-level organization, membership, status, and plan administration.
- **Acceptance criteria:** Actions are audited; role boundaries are enforced; tenant-private calendar content remains inaccessible by default.
- **Depends on:** Card 7.1.
- **Read:** `docs/prd.md`, `docs/design.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 7.3 — Implement organization-scoped API keys and scopes
- **Notify ID:** `NTF-TBD`
- **Objective:** Allow authorized organization admins to create, revoke, and rotate scoped API credentials.
- **Acceptance criteria:** Secret shown once; only hash stored; scopes enforced on every request; rate limits and audit events are applied.
- **Depends on:** Card 2.4.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 7.4 — Implement webhook registration and signed delivery
- **Notify ID:** `NTF-TBD`
- **Objective:** Allow organizations to register webhook endpoints and receive signed event notifications.
- **Acceptance criteria:** Signatures and timestamps are verifiable; retries/backoff and delivery history work; secrets are protected; duplicate delivery is documented and consumers can deduplicate.
- **Depends on:** Cards 7.3 and 6.4.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`.

#### Card 7.5 — Implement audit log and usage visibility
- **Notify ID:** `NTF-TBD`
- **Objective:** Record important security/admin/booking/API actions and expose appropriate organization/platform views.
- **Acceptance criteria:** Records are tenant-scoped and tamper-resistant by design; sensitive tokens and private event content are excluded; filters and pagination are bounded.
- **Depends on:** Cards 2.4, 5.5, 7.2, and 7.3.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

### Phase 8 — Hardening and release

#### Card 8.1 — Security and privacy review
- **Notify ID:** `NTF-TBD`
- **Objective:** Review auth, tenant isolation, OAuth, public endpoints, management tokens, API keys, webhooks, logs, and admin access.
- **Acceptance criteria:** Threat review is documented; high-severity issues are fixed; secrets and private event data are not exposed; authorization tests pass.
- **Depends on:** All feature phases.
- **Read:** `docs/prd.md`, `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 8.2 — Performance and reliability testing
- **Notify ID:** `NTF-TBD`
- **Objective:** Test availability query latency, provider rate limits, queue throughput, booking concurrency, and recovery behavior.
- **Acceptance criteria:** Targets are agreed and measured; bottlenecks are recorded; retry and recovery tests pass; no silent booking loss or duplicate booking occurs.
- **Depends on:** Cards 4.6, 5.5, and 6.4.
- **Read:** `docs/architecture.md`, `docs/rules.md`, `docs/memory.md`.

#### Card 8.3 — Production deployment and operational runbook
- **Notify ID:** `NTF-TBD`
- **Objective:** Deploy production environments and document backups, migrations, secrets rotation, provider outages, queue recovery, and incident response.
- **Acceptance criteria:** Deployment is repeatable; database backups and restore are tested; health checks and alerts work; rollback procedure is documented.
- **Depends on:** Cards 8.1 and 8.2.
- **Read:** `docs/architecture.md`, `docs/rules.md`.

#### Card 8.4 — End-to-end acceptance and release sign-off
- **Notify ID:** `NTF-TBD`
- **Objective:** Validate the full user journey from registration approval through calendar connection, link publication, booking, reschedule, cancellation, and notifications.
- **Acceptance criteria:** Critical journeys pass on desktop and mobile; acceptance evidence is attached; open issues are triaged; CTO/product owner signs off.
- **Depends on:** Cards 8.1–8.3.
- **Read:** `docs/prd.md`, `docs/design.md`, `docs/rules.md`, `docs/task.md`, `docs/memory.md`.

---

## 6. Notify card template

Use this template for every card. Keep each card independently understandable and small enough to finish in one or two working days.

**Title:** `[Phase].[Card] — [short action]`  
**Objective:** One clear outcome.  
**Context:** Why this work is needed and which user flow it supports.  
**In scope:** Exact files/modules or behavior included.  
**Out of scope:** Adjacent features that must not be pulled into this card.  
**Dependencies:** Completed Notify card IDs only.  
**Required reading:** Exact document links and relevant sections.  
**Acceptance criteria:** Observable, testable checkboxes.  
**Test plan:** Unit, integration, security, UI, or manual checks as applicable.  
**Evidence:** PR/commit, test output, screenshots, API examples, or test report.  
**Risks / rollback:** Known risk and safe recovery approach.  
**Status:** Backlog → Ready → In Progress → Review → Done (use the team's actual Notify workflow labels if they differ).

## 7. Definition of Ready — before a card starts

- [ ] Real Notify card ID exists and is linked in this document and `docs/task.md`.
- [ ] Card is no larger than one to two working days; otherwise split it.
- [ ] Owner, due date, objective, scope, and acceptance criteria are clear.
- [ ] Dependencies are complete or explicitly approved.
- [ ] Required docs have been read.
- [ ] Detailed plan is recorded in `docs/task.md` and approved.
- [ ] Provider capability or stack assumptions are verified where relevant.

## 8. Definition of Done — before a card closes

- [ ] Acceptance criteria pass.
- [ ] Relevant tests pass locally and in CI.
- [ ] Tenant isolation, permissions, privacy, and error states are checked where relevant.
- [ ] UI changes follow `docs/design.md` and include desktop/mobile evidence.
- [ ] No secrets, tokens, or private calendar details are exposed.
- [ ] Code is reviewed and merged under the repository workflow.
- [ ] `docs/task.md` is updated; completed plan is moved to its archive section, not deleted.
- [ ] `docs/memory.md` is updated if a decision, pattern, risk, or invariant changed.
- [ ] Notify card contains PR/commit, test evidence, and final status.

## 9. Decisions still requiring explicit approval

The existing documentation intentionally leaves these as decisions, not assumptions:

- Final framework/deployment split, ORM, queue/cache, auth provider, email provider, and hosting.
- Google and Zoho OAuth scopes, provider API capabilities, webhook/polling approach, quotas, and Zoho data-center handling.
- Availability behavior when a selected provider calendar is disconnected, stale, or unavailable. Choose and document a fail-safe policy before enabling public booking.
- Slot hold duration, lock mechanism, idempotency-key policy, and provider timeout/reconciliation behavior.
- Booking cancellation semantics at the destination provider and invitee management-token expiry/revocation policy.
- API/webhook event schema, versioning, retry policy, and rate limits.
- Product launch scope: whether platform admin, developer API, analytics, and reminders are in the first public release or a later release.

Record each approved decision in `docs/architecture.md` or the relevant source document and add an entry to `docs/memory.md`.

## 10. Current execution instruction

Start with Phase 0 only. Do not parallelize dependent work before its contracts are agreed. The first deliverable is an approved technical baseline and a repository assessment—not a partially built calendar UI. After Phase 0 is approved, proceed card by card in dependency order.
