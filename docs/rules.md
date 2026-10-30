# Engineering Rules

**Product:** Unified Scheduler  
**Owner:** CTO  
**Approval:** CTO; material policy changes approved by CEO  
**Status:** Project rules draft  
**Version:** 1.0  
**Last updated:** 2026-10-31

These rules apply to every contributor and every AI coding agent. A violation is a reason to return the change for correction.

## 1. Planning first

1. No code starts without an approved, testable plan in `docs/task.md` tied to a real Notify/task tracker ID.
2. Each task should be one to two days of work maximum. Split larger tasks.
3. Read `prd.md`, `architecture.md`, `design.md`, and relevant `memory.md` entries before changing a feature.
4. If implementation reveals a plan error, stop, update the plan, and obtain re-approval before proceeding.

## 2. Logic only in the backend

- Frontend displays data, collects input, manages transient UI state, and calls APIs.
- Backend services own availability calculations, conflict detection, buffers, booking horizons, permissions, tenant scoping, validation, and all booking state transitions.
- Provider adapters own provider-specific API translation only.
- Repositories own database reads/writes only.
- Controllers do not calculate or contain business rules.
- Never duplicate a business rule in the frontend and backend. Frontend validation is for immediate user feedback; backend validation remains authoritative.

## 3. Tenant isolation

- Every tenant-owned read and write must be scoped to the authenticated organization context.
- Never trust `organization_id`, role, owner ID, or permission claims sent by the browser.
- Cross-tenant access must fail closed and be covered by automated tests.
- Background jobs must carry an explicit tenant/resource context and re-check ownership before mutation.
- Platform-level operations must use separate Super Admin authorization and audit logging.

## 4. Calendar and booking invariants

1. One availability engine serves public pages, workspace previews, and API clients.
2. Any busy period in any selected conflict-check calendar blocks an overlapping slot.
3. A booking link has one destination calendar; event writes do not fan out to every connected calendar.
4. Destination calendar must be authorized and writable before publishing a link.
5. Availability shown in the browser is advisory; confirmation always rechecks server-side.
6. Use an atomic lock/transaction strategy so concurrent requests cannot both confirm the same host and interval.
7. All booking creation, rescheduling, cancellation, provider writes, and webhook processing must be idempotent.
8. Do not mark a booking confirmed before the destination calendar write succeeds, except under a separately approved and explicitly presented pending workflow.
9. Normalize timestamps to UTC for storage and compare intervals in UTC. Retain the IANA timezone used for display and working-hour rules.
10. Test daylight-saving gaps, repeated local times, cross-midnight working hours if supported, overlapping intervals, and provider timezone differences.
11. If a selected conflict-check calendar becomes disconnected or stale beyond the defined safety window, do not silently treat it as free. Show a warning and apply the approved fail-safe policy.
12. Never copy all events between providers as a substitute for unified availability.

## 5. No hardcoding

- Secrets, OAuth credentials, API URLs, provider scopes, feature flags, and environment-specific settings belong in typed config or a secret manager.
- Colors, typography, spacing, radii, shadows, and breakpoints belong in design tokens.
- User-facing text belongs in constants/localization resources where appropriate.
- Do not hardcode organization-specific branding or user data in reusable components.

## 6. Small, reusable code

- Reuse existing components, hooks, validators, API clients, and service helpers before creating new ones.
- Keep files under 400 lines where practical and functions under 50 lines. Split modules when they become difficult to review; do not split trivial one-line changes into needless abstractions.
- Avoid dead code, duplicate helpers, commented-out code, `console.log`, and unused dependencies.
- Keep each PR focused on one task and aim for about 400 changed lines or fewer.

## 7. Naming

| Item | Convention | Example |
|---|---|---|
| React components/types | PascalCase | `BookingLinkCard` |
| Functions/variables | camelCase | `getAvailableSlots` |
| Constants | UPPER_SNAKE_CASE | `MAX_BOOKING_HORIZON_DAYS` |
| Folders/routes | kebab-case | `calendar-connections/` |
| Database tables | snake_case, plural | `calendar_connections` |
| Booleans | `is` / `has` / `can` prefix | `isPublished` |
| API paths | lowercase plural nouns | `/api/v1/booking-links` |

## 8. Error handling

- Services throw typed domain errors.
- One central backend handler maps errors to the standard API envelope.
- Never swallow exceptions or use empty `catch` blocks.
- Log enough context to diagnose failures, but redact tokens, secrets, invitee personal data, and private calendar event details.
- Every page/route has a clear loading, empty, error, and success state.
- Every major frontend route is protected by an error boundary.
- Provider errors must map to stable internal error codes and actionable messages.

## 9. Security and authentication

- Validate every request on the backend with a schema.
- Use secure, HTTP-only, SameSite cookies for browser sessions.
- Apply CSRF protection where cookie-authenticated mutations require it.
- Use OAuth state and PKCE where supported.
- Encrypt provider credentials at rest with managed keys; never expose refresh tokens to the browser.
- Hash API keys and public management tokens; show API secrets once.
- Enforce role checks, organization membership, and resource ownership on every protected operation.
- Rate-limit authentication, public availability, public booking, API-key, and webhook endpoints.
- Use high-entropy, non-sequential identifiers for public resources.
- No secrets or personal customer data in source control, logs, screenshots, or test fixtures.
- Run dependency and secret scanning in CI.

## 10. API conventions

- Prefix routes with `/api/v1`.
- Use a consistent `{ data, meta }` success envelope and `{ error, meta }` error envelope.
- Validate query, path, and body inputs.
- Paginate collection endpoints; cap page size.
- Use idempotency keys for booking creation and other retry-sensitive mutations.
- Return stable error codes; do not expose raw provider/database messages.
- Document every route, auth requirement, request, response, and error in the OpenAPI contract.
- Do not break public API contracts without a versioning/deprecation plan.

## 11. Database and migrations

- Every schema change has a migration committed with the task.
- Migrations must be safe to run in staging and production; avoid destructive changes without an approved backfill and rollback plan.
- Add indexes for tenant filters and high-volume time-range queries.
- Use transactions for state transitions that must remain consistent.
- Use unique constraints for provider event identity, booking idempotency, and public slugs as appropriate.
- Test tenant-scoped repository methods.

## 12. Frontend rules

- Use the shared API client; components must not call `fetch` ad hoc.
- Server data belongs in the approved query/cache layer; do not mirror server state into a second global store.
- UI state remains local unless genuinely shared.
- No authoritative availability or permission calculation in the browser.
- Use design tokens only; no arbitrary hex colors or one-off spacing values in feature components.
- Accessible labels, keyboard interactions, focus states, and semantic controls are mandatory.
- Avoid layout shift; define image dimensions/aspect ratios and lazy-load below-the-fold media.
- Public booking pages must be fast, responsive, and safe to share.

## 13. Calendar provider rules

- Implement provider-specific behavior behind the shared provider interface.
- Respect provider quotas, pagination, retry guidance, and token expiry.
- Do not assume Google and Zoho have identical API semantics.
- Store provider IDs and sync cursors; handle deleted/updated events and revoked credentials.
- Webhooks are not guaranteed to be delivered exactly once or in order; handlers must be idempotent and reconciliation must exist.
- Do not log OAuth authorization codes, access tokens, refresh tokens, or full private event payloads.

## 14. Testing requirements

- Unit tests for availability interval merging, slot generation, buffers, working hours, timezones, and booking state transitions.
- Integration tests for tenant authorization, calendar adapter contracts, database transactions, and provider failure paths.
- Concurrency tests proving two requests cannot book the same host/slot.
- End-to-end tests for registration approval, connecting a calendar, creating a booking link, booking publicly, rescheduling, and cancellation.
- Test empty, large, invalid, stale, disconnected, rate-limited, and provider-unavailable states.
- Every bug fix adds a regression test where practical.

## 15. Accessibility and responsive requirements

- Target WCAG 2.2 AA for primary workflows.
- Full keyboard operation for dialogs, menus, date pickers, calendar navigation, and booking forms.
- Visible focus indicators and meaningful accessible names.
- Do not communicate status through color alone.
- Test at 360px, 768px, 1024px, and 1440px widths.

## 16. Git and review rules

- All code lives in the company-owned GitHub organization.
- Two-factor authentication is mandatory.
- Protect `main` and `staging`; no direct pushes.
- Feature branches start from `staging`; hotfix branches start from `main` and merge to both.
- Branch format: `type/NTF-123-short-description`.
- Conventional Commits, present tense, one logical change per commit.
- At least one required review; auth, calendar credentials, booking engine, data models, and infrastructure changes require CTO review.
- CI must pass lint, type-check, tests, build, security checks, and relevant accessibility/performance checks.
- Squash merge; delete merged branches.
- Never commit `.env`, tokens, passwords, customer data, build output, logs, or large generated files.

## 17. Definition of Ready

A task cannot start until:
- [ ] It has a real task tracker ID, one owner, and a clear scope.
- [ ] Acceptance criteria are exact and testable.
- [ ] API contract and data impact are described.
- [ ] Logic placement is decided.
- [ ] Edge cases and failure cases are listed.
- [ ] Existing code/components have been checked for reuse.
- [ ] Relevant `memory.md` entries have been read.
- [ ] Task is no more than one to two days of work, or is split.
- [ ] Tech lead has approved the plan.

## 18. Definition of Done

- [ ] Every acceptance criterion is met.
- [ ] No business logic is in the frontend or duplicated.
- [ ] All styles use design tokens.
- [ ] Input is validated and authorization is checked server-side.
- [ ] Errors are typed, handled centrally, and shown clearly.
- [ ] Tests cover happy path and relevant edge/failure cases.
- [ ] Tenant isolation and privacy are verified.
- [ ] No secrets or sensitive data are logged or committed.
- [ ] API documentation and migrations are updated where needed.
- [ ] `task.md`, `architecture.md`, `memory.md`, and `.env.example` are updated when applicable.
- [ ] CI is green and reviewer approves.
- [ ] Developer can explain every changed line, including AI-generated code.
