# Project Memory

**Product:** Unified Scheduler  
**Curator:** Tech lead / CTO  
**Status:** Initial baseline  
**Last updated:** 2026-10-31

This file records decisions, known issues, reusable patterns, and the change log. Update it on the same day a decision is made or an incident teaches a lesson. Remove duplicates during the monthly review; do not erase useful history.

## 1. Decisions

### Product and tenancy
- Product is a multi-tenant SaaS scheduling platform, not only a personal calendar dashboard.
- Two distinct surfaces exist: Organization Workspace and Platform Owner Console.
- New registrations/access requests require approval before workspace access.
- Platform Super Admin is separate from organization roles.
- Users can belong to organizations; organization data must remain isolated.

### Booking and calendar behavior
- Users may connect multiple Google and multiple Zoho accounts, subject to provider API/OAuth support.
- Each booking link has two separate calendar settings: one or more calendars to check for conflicts, and exactly one destination calendar to receive the new event.
- A busy interval in any selected conflict-check calendar blocks overlapping availability.
- The system does not copy every event between Google and Zoho. It calculates unified availability from connected providers.
- The destination calendar is selected per booking link. New bookings are written only to that selected calendar.
- Availability is computed by the backend and rechecked immediately before confirmation.
- Booking links can be created by the platform/organization administrators and authorized employees. Employees can create and share their own links.
- External invitees can book through public links without creating a platform account.

### Design
- Visual direction: minimal, professional, desktop-first, responsive.
- Main palette: primary green `#147D52`, light green `#DDF3E7`, dark highlight `#17231D`, near-white background `#F7F9F7`.
- Avoid clutter, excessive cards, gradients, heavy shadows, and decorative color use.
- Calendar, booking-link builder, and public booking page are the three highest-priority experiences.

### Architecture
- Browser-first product still requires a secure backend for OAuth, secrets, tenant authorization, availability, locks, and provider writes.
- Proposed baseline is Next.js/React/TypeScript, Node.js/TypeScript API, PostgreSQL, a durable job queue, and provider adapters. Stack remains subject to CTO approval.
- Frontend handles presentation and UI state only; backend services own business logic.

## 2. Known issues and gotchas

- **Provider parity is not assumed:** Google and Zoho may differ in API scopes, webhook support, sync cursors, rate limits, event semantics, and regional endpoints. Verify each capability before implementation.
- **Availability cache is not authoritative:** a slot can become busy after the public page loads. Always recheck at confirmation.
- **Concurrent booking race:** two users can select the same slot. Use a database-backed atomic lock/transaction and idempotency strategy.
- **Provider write ambiguity:** a timeout may occur after a provider accepted an event. Retry must first reconcile or use provider-supported idempotency/deduplication to avoid duplicate events.
- **Stale calendar data:** missing provider notifications can leave local busy intervals stale. Scheduled reconciliation and confirmation-time checks are required.
- **Timezone complexity:** store instants in UTC, preserve IANA timezone for display/working hours, and test DST gaps/repeated times.
- **Privacy:** availability needs busy intervals, not necessarily private event titles, descriptions, or attendees. Minimize retained provider event data.
- **Super Admin boundary:** platform-level authority does not automatically authorize reading a user's private calendar contents.
- **Booking confirmation state:** never show confirmed until the destination calendar write succeeds, unless a separately designed pending state is explicit to the invitee.

No production incidents have been recorded yet; the items above are design risks, not claims of observed failures.

## 3. Patterns to follow

- Use one shared availability service for public pages, internal previews, and API consumers.
- Use a shared calendar-provider interface with separate Google and Zoho adapters.
- Keep `conflict_check` calendar selections separate from the single `destination` selection.
- Derive tenant ID from authenticated membership or validated API key; never trust a client-provided tenant ID.
- Use server state through the shared API client/query layer; keep UI state local.
- Every list endpoint is paginated and every UI list has loading, empty, error, and permission states.
- Use typed domain errors and one central API error handler.
- Use idempotency keys for booking creation and retry-sensitive mutations.
- Audit role changes, access approvals, API key lifecycle, calendar connections, and booking state transitions.
- Use design tokens for every color, spacing value, radius, typography value, and shadow.
- Public booking pages must not expose private event details or internal calendar identifiers.

## 4. Change log

- **2026-10-31 — Initial project documentation created.** Captured multi-tenant SaaS scope, Google + Zoho multi-account calendar connections, unified conflict detection, per-link destination calendar, approval-based onboarding, employee-created booking links, green minimalist design system, and API-first roadmap.

## 5. Decision log template

For future decisions, add newest first:

```md
### YYYY-MM-DD — Decision title
- Context:
- Decision:
- Reason:
- Consequences / follow-up:
- Approved by:
```

## 6. Incident / lesson template

```md
### YYYY-MM-DD — Short incident title
- What happened:
- Root cause:
- User/system impact:
- Fix:
- Prevention / regression test:
```
