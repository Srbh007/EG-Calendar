# Technical Task Plans

**Product:** Unified Scheduler  
**Owner:** Assigned developer per task  
**Approver:** Tech lead / CTO  
**Status:** Initial backlog plan — tasks must be copied into Notify and assigned real card IDs before work starts  
**Last updated:** 2026-10-31

## Working rules

- This file contains technical plans, not the delivery tracker. Notify remains the source of truth for owner, deadline, and status.
- Each task must be no more than one to two days of work. Split larger work into smaller cards.
- Replace each `NTF-TBD` heading with the real Notify card ID before implementation. Do not invent IDs.
- Newest approved task plan goes first. Completed plans move to the Archive at the bottom and are never deleted.
- No coding before the plan is reviewed and approved.

---

## NTF-TBD · Establish design system and application shell

**Status:** Proposed; not approved for coding  
**Area:** Frontend foundation  
**Owner:** To be assigned  
**Notify card:** Create and replace this placeholder

### 1. Problem and objective
The product needs a consistent, accessible green design system and navigation shell before feature screens are implemented.

### 2. Acceptance criteria
- [ ] Tokens exist for colors, typography, spacing, radii, shadows, and breakpoints.
- [ ] Global styles use tokens and provide accessible focus states.
- [ ] Workspace sidebar, top bar, organization switcher, page header, and user menu are implemented.
- [ ] Sidebar collapses on desktop and becomes mobile navigation on small screens.
- [ ] Organization workspace and platform-admin shells have distinct navigation.
- [ ] Screenshot evidence is attached for 1440px and 390px widths.

### 3. Where the logic lives
- Frontend: presentation, navigation state, responsive behavior.
- Backend: no new business logic in this task.

### 4. Routes and objects
- UI routes: `/app`, `/platform-admin`.
- Reuse authenticated user and organization context from the API; do not hardcode organization data.
- No schema change expected.

### 5. Files to create / change
- `frontend/src/styles/tokens.css`
- `frontend/src/styles/global.css`
- `frontend/src/components/ui/*`
- `frontend/src/components/features/app-shell/*`
- `frontend/src/app/(workspace)/*`
- `frontend/src/app/platform-admin/*`
- Existing helpers/components to reuse: confirm during repository inspection.

### 6. Edge cases and failure cases
- Long organization and user names.
- User belongs to multiple organizations.
- Missing avatar/logo.
- Narrow mobile viewport.
- No active organization or membership.
- Permission denied for platform-admin routes.

### 7. Impact check
Check global CSS, existing auth layout, route guards, and shared components. Read `memory.md` before starting.

### 8. Security, load and SEO
- Authenticated routes require server-verified session and role.
- No private content in page metadata; authenticated routes noindex.
- Keep shell data requests bounded; avoid duplicate `/me` and organization calls.

### 9. Test plan
- Unit tests for navigation visibility by role.
- Responsive visual checks at 390px and 1440px.
- Keyboard navigation and focus checks.
- Verify non-admin cannot load platform-admin routes or APIs.

### 10. Better way?
Build shell and tokens as a reusable package so public and authenticated surfaces share the same foundations without sharing inappropriate navigation.

---

## NTF-TBD · Calendar integration account and calendar selection UI

**Status:** Proposed; depends on provider OAuth/API contract  
**Area:** Integrations UI + backend calendar connections  
**Owner:** To be assigned  
**Notify card:** Create and replace this placeholder

### 1. Problem and objective
Hosts need to connect multiple Google and Zoho accounts and select which calendars participate in conflict checks.

### 2. Acceptance criteria
- [ ] User can start and complete supported Google and Zoho OAuth flows.
- [ ] Multiple accounts per provider can be represented.
- [ ] Connected account and calendar lists display connection/sync/read/write status.
- [ ] User can enable/disable calendars for conflict checking.
- [ ] Disconnect/reconnect states are clear and safe.
- [ ] Credentials never reach browser responses or logs.

### 3. Where the logic lives
- Backend services: OAuth state, token storage/encryption, account discovery, permission checks, connection lifecycle.
- Provider adapters: Google/Zoho API translation.
- Frontend: connect buttons, account/calendar list, status and error UI only.

### 4. Routes and objects
- `POST /api/v1/calendar-connections/:provider/oauth`
- `GET /api/v1/calendar-connections/:provider/callback`
- `GET /api/v1/calendar-connections`
- `GET /api/v1/calendars`
- `PATCH /api/v1/calendars/:id/selection`
- `DELETE /api/v1/calendar-connections/:id`
- Models: `calendar_connections`, `calendars`, `calendar_selections`, `calendar_sync_cursors`.

### 5. Files to create / change
- `backend/src/routes/calendar-connections/*`
- `backend/src/routes/calendars/*`
- `backend/src/providers/calendars/google/*`
- `backend/src/providers/calendars/zoho/*`
- `frontend/src/components/features/integrations/*`
- `frontend/src/app/(workspace)/app/integrations/*`
- `.env.example` for provider app config names only.

### 6. Edge cases and failure cases
- User denies consent.
- OAuth state mismatch or expired callback.
- Refresh token absent/expired/revoked.
- Provider API quota or outage.
- Account has no calendars.
- Calendar is read-only or deleted.
- Zoho region/data-center mismatch.
- Duplicate account connection.

### 7. Impact check
Check auth, encryption, provider quota handling, background jobs, and availability engine. Read `memory.md`.

### 8. Security, load and SEO
- OAuth state/PKCE where supported; encrypt credentials at rest.
- Authenticated endpoints only; rate-limit OAuth start/callback.
- Noindex; no tokens in client data or logs.

### 9. Test plan
- Adapter contract tests with mocked provider responses.
- OAuth success/denial/expired-state tests.
- Tenant isolation tests.
- Token refresh and revoke tests.
- UI tests for loading, empty, error, connected, and disconnected states.

### 10. Better way?
Build the provider adapter contract and mock implementation before integrating each provider, so the UI and availability service remain provider-independent.

---

## NTF-TBD · Unified availability engine

**Status:** Proposed; requires CTO review  
**Area:** Backend domain service  
**Owner:** To be assigned  
**Notify card:** Create and replace this placeholder

### 1. Problem and objective
The platform must calculate slots only when every selected conflict-check calendar and platform booking is free, while applying host scheduling rules.

### 2. Acceptance criteria
- [ ] Busy intervals from multiple selected calendars are normalized to UTC and merged.
- [ ] Any overlapping busy interval blocks a candidate slot.
- [ ] Working hours, overrides, duration, buffers, minimum notice, and booking horizon are applied.
- [ ] Timezone and daylight-saving edge cases are tested.
- [ ] Disconnected or stale calendars follow an explicit fail-safe policy.
- [ ] Availability response includes stable slot IDs or timestamps and timezone labels.

### 3. Where the logic lives
- Backend `availability.service.ts`: all interval merging, slot generation, policy enforcement.
- Repositories: load host settings, bookings, busy intervals, locks.
- Provider adapters: fetch normalized provider busy intervals.
- Frontend: display returned slots only.

### 4. Routes and objects
- `GET /api/v1/availability?bookingLinkId=...&from=...&to=...`
- `GET /api/v1/public/booking-links/:slug/availability`
- Models: `working_hours`, `availability_overrides`, `busy_intervals`, `bookings`, `calendar_selections`.

### 5. Files to create / change
- `backend/src/routes/availability/*`
- `backend/src/services/availability/*` (or route service folder per repo convention)
- `backend/src/lib/time/*`
- Unit and property-based tests for interval calculations.

### 6. Edge cases and failure cases
- Overlapping and adjacent busy intervals.
- Event ends exactly when a slot begins.
- Buffers overlap neighboring events.
- DST spring-forward missing local time.
- DST fall-back repeated local time.
- Provider sync stale or unavailable.
- No working hours or no selected calendars.
- Large date ranges and provider pagination.

### 7. Impact check
This service is shared by public booking, preview, internal booking, and API consumers. Any behavior change affects every booking link. Read `memory.md`.

### 8. Security, load and SEO
- Public endpoint rate-limited and returns no private event details.
- Validate date range and cap query window.
- API calls per request bounded; use sync cache and freshness policy.

### 9. Test plan
- Unit tests for interval merge and candidate generation.
- Property tests for non-overlap invariant.
- DST tests for supported timezones.
- Integration tests for provider failure and tenant isolation.
- Load test common availability query patterns.

### 10. Better way?
Use a well-tested timezone library and property-based tests rather than custom date arithmetic.

---

## NTF-TBD · Booking link builder and public booking page

**Status:** Proposed; depends on availability API  
**Area:** Frontend + booking-link backend  
**Owner:** To be assigned  
**Notify card:** Create and replace this placeholder

### 1. Problem and objective
Authorized hosts need to configure meeting types and publish simple public pages that let invitees book without registering.

### 2. Acceptance criteria
- [ ] Authorized user can create and edit a draft booking link.
- [ ] Builder separates calendars to check from the one destination calendar.
- [ ] Link cannot publish without valid host, availability, and writable destination.
- [ ] Public page shows only server-returned slots.
- [ ] Invitee can submit details and receive a clear confirmation or conflict response.
- [ ] Public page works at mobile and desktop widths.

### 3. Where the logic lives
- Backend: validation, permissions, slug uniqueness, publishing, slot retrieval, booking confirmation.
- Frontend: builder form state, preview, public date/time selection, invitee form.

### 4. Routes and objects
- `POST/GET/PATCH /api/v1/booking-links`
- `POST /api/v1/booking-links/:id/publish`
- `GET /api/v1/public/booking-links/:slug`
- `GET /api/v1/public/booking-links/:slug/availability`
- `POST /api/v1/public/booking-links/:slug/bookings`
- Models: `booking_links`, `booking_questions`, `calendar_selections`, `bookings`.

### 5. Files to create / change
- `frontend/src/components/features/booking-link-builder/*`
- `frontend/src/components/features/public-booking/*`
- `frontend/src/app/(workspace)/app/booking-links/*`
- `frontend/src/app/book/[slug]/*`
- `backend/src/routes/booking-links/*`
- `backend/src/routes/public-booking/*`

### 6. Edge cases and failure cases
- Duplicate or invalid slug.
- Paused/archived link.
- Host loses calendar access.
- No slots available.
- Slot becomes unavailable between selection and confirmation.
- Invalid invitee input or spam.
- Timezone mismatch.

### 7. Impact check
Check public routing, availability service, calendar permissions, email delivery, and link changes with existing bookings. Read `memory.md`.

### 8. Security, load and SEO
- Public endpoints rate-limited and bot/spam protected.
- Management tokens are high entropy and stored hashed.
- Booking pages indexability configured; confirmation and token pages noindex.
- Do not leak event details or calendar IDs publicly.

### 9. Test plan
- Role-based builder tests.
- Public happy path and no-slot path.
- Slot conflict during confirmation.
- Mobile accessibility and timezone tests.
- Slug and token security tests.

### 10. Better way?
Keep the builder progressive: basic details first, advanced calendar/notification/branding controls in expandable steps.

---

## NTF-TBD · Booking confirmation, reschedule, cancellation and notifications

**Status:** Proposed; requires booking-engine and provider-write review  
**Area:** Backend booking engine + notifications  
**Owner:** To be assigned  
**Notify card:** Create and replace this placeholder

### 1. Problem and objective
Bookings must be safely created in one selected destination calendar and remain consistent when rescheduled or cancelled.

### 2. Acceptance criteria
- [ ] Confirmation rechecks availability and obtains an atomic lock.
- [ ] Duplicate submissions with the same idempotency key do not create duplicate events.
- [ ] Event is written to the configured destination calendar only.
- [ ] Booking is not shown as confirmed before successful calendar write.
- [ ] Reschedule updates provider event and releases old slot safely.
- [ ] Cancellation deletes/cancels provider event according to provider semantics and releases availability.
- [ ] Confirmation and reminder email outcomes are recorded.

### 3. Where the logic lives
- Backend booking service: locks, transaction, state transitions, idempotency, provider orchestration.
- Provider adapters: create/update/delete event.
- Notification service: templates, schedules, delivery attempts.
- Frontend: confirmation, pending/failure states, reschedule/cancel UI.

### 4. Routes and objects
- `POST /api/v1/public/booking-links/:slug/bookings`
- `POST /api/v1/bookings/:id/reschedule`
- `POST /api/v1/bookings/:id/cancel`
- Models: `availability_locks`, `bookings`, `booking_answers`, `webhook_deliveries` (if event notifications are included).

### 5. Files to create / change
- `backend/src/routes/bookings/*`
- `backend/src/services/booking/*`
- `backend/src/jobs/notifications/*`
- `backend/src/providers/calendars/*`
- `frontend/src/components/features/bookings/*`
- `frontend/src/app/manage/[token]/*`

### 6. Edge cases and failure cases
- Two invitees request same slot simultaneously.
- Provider write timeout with unknown outcome.
- Provider accepts write but response is lost.
- Token expires or is revoked.
- Destination calendar is deleted or loses write permission.
- Email provider is unavailable.
- Reschedule target is taken during confirmation.

### 7. Impact check
Check availability, calendar adapter, idempotency storage, reminders, audit log, and webhook events. Read `memory.md`.

### 8. Security, load and SEO
- Public mutation endpoints rate-limited and idempotent.
- Management token stored as hash and scoped to one booking.
- Invitee personal data redacted from logs.
- Tokenized management pages noindex.

### 9. Test plan
- Concurrency test with two requests for same slot.
- Provider success, timeout, retry, duplicate-event, and permanent-failure tests.
- Reschedule/cancel integration tests.
- Email retry and duplicate reminder tests.

### 10. Better way?
Use a durable job/outbox pattern for provider writes and outbound notifications so retries survive process restarts.

---

## Archive

No completed plans yet. Move approved and completed plans here with their original Notify card IDs; do not delete them.
