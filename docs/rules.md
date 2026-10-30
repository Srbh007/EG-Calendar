# Engineering Rules — Supabase Managed Services

**Version:** 2.0  
**Applies to:** All contributors and coding agents  
**Architecture:** Next.js frontend + Supabase managed services + Supabase Edge Functions

## 1. Non-negotiable architecture rules

- Do not create a separate custom backend application or standalone API server.
- Do not add Express, NestJS, Fastify, a separate Node API, self-managed PostgreSQL, Redis, or a self-hosted worker unless the product owner explicitly changes the architecture.
- Use Supabase Auth, PostgreSQL, RLS, and Edge Functions for the responsibilities defined in `architecture.md`.
- Use direct Supabase client operations for ordinary CRUD protected by RLS. Use Edge Functions for privileged workflows, external provider calls, OAuth, booking confirmation, webhooks, and secret-bearing operations.
- Never treat the frontend as a trusted environment.

## 2. Source-of-truth rules

- `prd.md` defines product behavior and scope.
- `architecture.md` defines the Supabase architecture and trust boundaries.
- `design.md` defines visual and interaction standards.
- `rules.md` defines engineering/security constraints.
- `task.md` defines approved task scope and acceptance criteria.
- `implementation.md` defines task order and documentation reading sequence.
- `memory.md` records durable decisions and discovered constraints.
- If documents conflict, stop and ask for a decision; do not silently choose.

## 3. Frontend rules

- Frontend owns presentation, navigation, form state, local filters, optimistic UI only where safe, and user feedback.
- Frontend may perform friendly input validation, but database constraints, RLS, and Edge Functions must validate trusted operations again.
- Never calculate final availability only in the browser or treat a browser-computed slot as reserved.
- Never put secrets in `NEXT_PUBLIC_*`, browser bundles, local storage, session storage, URLs, or client-readable database rows.
- Use generated Supabase database types where practical; keep shared domain types consistent with migrations.
- All screens must implement loading, empty, error, success, and permission-denied states.
- Follow the minimalist green design tokens in `design.md`; do not add decorative cards, gradients, or colors without approval.

## 4. Supabase database and RLS rules

- Every tenant-owned table must have RLS enabled before it is exposed through the Supabase Data API.
- Every read, insert, update, and delete policy must be explicit and tested.
- Derive the current user from `auth.uid()` and organization membership from database records. Never trust an organization ID sent by the browser as proof of access.
- Apply least privilege: members see only what their role and product permissions allow.
- Keep migrations in source control. Do not make undocumented manual production schema changes.
- Add foreign keys, unique constraints, check constraints, and indexes for important invariants.
- Avoid `SECURITY DEFINER`. If required, document why, set a safe `search_path`, restrict execute grants, and add tests for privilege escalation.
- Service-role key bypasses RLS; it may be used only inside trusted Edge Functions and only for the specific required operation.
- Do not expose provider tokens, invitation tokens, cancellation tokens, or API-key secrets through normal table selects.

## 5. Edge Function rules

- Keep each Edge Function focused on a named trusted operation; do not recreate a monolithic API server.
- Validate HTTP method, request schema, identity, organization membership, role, and resource ownership.
- Use Supabase-managed secrets for provider credentials and service-role credentials.
- Verify OAuth state, expiry, single-use behavior, and redirect allowlists.
- Use idempotency keys for booking confirmation, provider event writes, notifications, and webhook processing where applicable.
- Apply bounded timeouts and retries. Do not retry non-idempotent provider writes blindly.
- Return safe, typed errors; never expose stack traces, tokens, provider secrets, or raw private event data.
- Log correlation IDs and safe operational metadata only.

## 6. Calendar and booking invariants

- A booking link has separate conflict-check calendar selections and exactly one destination calendar.
- Any busy conflict in any selected conflict-check calendar blocks the slot.
- A booking event is created only in the selected destination calendar.
- Do not copy or mirror every event between Google and Zoho.
- Recheck availability in a trusted function immediately before confirmation.
- Use database transaction/locking/constraints to prevent concurrent double booking.
- Do not show confirmed until the destination provider event write has succeeded and the booking state is committed.
- Handle provider timeouts with reconciliation before retrying an uncertain create operation.
- Store UTC instants and IANA timezone identifiers; test daylight-saving boundaries.
- Keep private event titles/descriptions out of stored busy data unless a specifically approved feature requires them.

## 7. Identity and tenant rules

- Supabase Auth is the identity provider; application profiles reference `auth.users.id`.
- Organization membership and role are checked from trusted database records.
- New organization and join requests remain pending until approved.
- Invitations must be high entropy, stored hashed, single-use, and expiring.
- Platform owner permissions do not automatically grant access to private calendar event content.
- Public invitees can book without a workspace account but can access only public slots and their own booking-management actions.

## 8. Provider integration rules

- Verify current Google and Zoho API documentation, OAuth scopes, account limitations, quotas, regional endpoints, and webhook behavior before implementation.
- Provider-specific payloads must be normalized inside the integration layer; UI components must not depend on raw provider payloads.
- Never return OAuth access/refresh tokens to the browser.
- Support revoked/expired credentials and a reconnect-required state.
- Webhook handlers must verify authenticity where supported, tolerate duplicate/out-of-order delivery, and acknowledge safely.
- Use scheduled reconciliation when provider notifications are unavailable or insufficient.

## 9. Quality and delivery rules

- Every task must have an approved Notify card with a real ID before implementation begins; never invent task IDs.
- Read the documents specified in `implementation.md` and the selected task before coding.
- Keep changes limited to the task; do not refactor unrelated modules.
- Add tests for every business rule, RLS policy, and Edge Function behavior introduced.
- Run lint, type-check, unit tests, integration tests, and relevant E2E tests before marking work complete.
- Update `memory.md` when a durable decision, provider limitation, or important implementation pattern is discovered.
- Update `task.md` and Notify status when scope or acceptance criteria change.

## 10. Definition of Done

- [ ] Acceptance criteria are met and demonstrated.
- [ ] RLS policies and role boundaries are tested for data access changes.
- [ ] No secrets or private calendar data leak to the browser or logs.
- [ ] Availability and booking invariants are preserved.
- [ ] Relevant unit, integration, concurrency, and E2E tests pass.
- [ ] Loading, empty, error, success, and permission states are handled.
- [ ] Docs and migration files are updated.
- [ ] No separate custom backend service or unapproved infrastructure was introduced.


## Performance and caching rules

- Follow [`performance.md`](performance.md) for the full optimization checklist and acceptance criteria.
- Never shared-cache authenticated calendar events, OAuth credentials, tenant-private records or user-specific responses.
- Any short-lived availability cache must be identity/calendar/time-range scoped and must never replace the authoritative availability recheck during booking confirmation.
- Every cache must have an explicit TTL, scope, invalidation strategy and failure behavior.
- Use the hosting provider's managed CDN and Supabase's managed connection pooler where appropriate; do not introduce self-managed infrastructure without approval.
- Paginate unbounded lists, select only required database columns, avoid N+1 reads and justify indexes with query plans.
- Measure before broad React memoization or adding caching layers.
- Run Lighthouse on key routes and retain evidence; do not claim performance targets without measurements.
