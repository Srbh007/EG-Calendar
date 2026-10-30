# Product Requirements Document (PRD)

**Product:** Unified Scheduler  
**Document owner:** Product  
**Approval:** CEO / Product Owner  
**Status:** Draft for approval  
**Version:** 1.0  
**Last updated:** 2026-10-31

## 1. Product summary

Unified Scheduler is a multi-tenant SaaS scheduling platform that brings multiple calendar providers into one availability and booking experience. Organizations and individuals can connect multiple Google Calendar and Zoho Calendar accounts, select which calendars should be checked for conflicts, create configurable public booking links, and receive bookings in one explicitly selected destination calendar.

The platform has two distinct product surfaces:

1. **Organization Workspace:** used by organization owners, administrators, managers, and employees to manage calendars, availability, bookings, booking links, team scheduling, integrations, and developer access.
2. **Platform Owner Console:** used by the platform Super Admin to approve access, manage organizations and users, oversee plans, and monitor platform health. It does not grant automatic access to private calendar event contents.

The initial experience is desktop-first, responsive, and deliberately minimal: white/near-white surfaces, dark green primary actions, light green supporting surfaces, and restrained dark text.

## 2. Problem and users

### Problem

People and teams use more than one calendar provider or account. A meeting booked against one calendar may not be reflected in another, leading to double-bookings. Existing workflows require users to check several calendars manually and maintain separate booking links for different meeting types or employees.

### Primary users

- **Platform Super Admin:** owns the SaaS platform and controls organization onboarding, user approval, platform configuration, and operational oversight.
- **Organization Owner:** creates and administers an organization workspace, manages members and organization-level policies.
- **Organization Admin / Manager:** manages permitted team members, booking links, and team scheduling.
- **Employee / Host:** connects their own calendar accounts, sets availability, creates personal booking links, and manages their bookings.
- **External Invitee:** opens a public booking link and books, reschedules, or cancels a meeting without creating a platform account.
- **Developer / Integrator:** uses organization-scoped API credentials and webhooks to integrate booking workflows with external systems.

## 3. Goals and success metrics

### Product goals

1. Provide one reliable availability view across multiple connected calendar accounts and calendars.
2. Prevent double-booking by treating any selected busy calendar as a conflict.
3. Let authorized users create multiple configurable booking links.
4. Let invitees book through a simple public page without registering.
5. Create a confirmed event only in the booking link's selected destination calendar.
6. Support multi-tenant organization workspaces with explicit roles and approval workflows.
7. Expose secure APIs and webhooks so other applications can use the same booking infrastructure.

### Initial success metrics

- Calendar connection completion rate.
- Percentage of connected calendars with healthy synchronization status.
- Availability query latency (p50 and p95).
- Booking confirmation success rate.
- Double-booking incident rate (target: zero known incidents).
- Public booking-page completion rate.
- Calendar write failure rate and recovery time.
- Active booking links per organization.
- Weekly active hosts and organizations.

Targets and measurement windows must be set before public launch; do not invent baseline values.

## 4. Product principles

- **One availability engine:** every booking link uses the same server-side conflict logic.
- **Check many, write one:** check all calendars selected by the host; create the event only in the explicitly selected destination calendar.
- **Backend is authoritative:** the browser never decides whether a slot is truly available or whether a user has permission.
- **Tenant isolation by default:** every organization-owned record is scoped to an organization; cross-tenant access is denied.
- **Privacy by default:** availability checks should need only busy intervals where provider permissions allow; event details are shown only to authorized viewers.
- **Honest booking states:** do not display a booking as confirmed until the destination calendar write succeeds or a clearly defined confirmed workflow is completed.
- **Progressive complexity:** keep common booking creation simple; put advanced rules behind clearly named sections.

## 5. Scope and feature requirements

### P0 — MVP launch scope

#### Identity, organization and access
- Email-based registration and sign-in, email verification, password reset, and secure session management.
- Organization creation request and request to join an existing organization.
- Approval workflow for new organization/user access.
- Organization switching for users who belong to multiple organizations.
- Roles: Platform Super Admin, Organization Owner, Organization Admin, Manager, Employee, and read-only/support roles where needed.
- Invitation flow for employees.
- Server-side authorization on every organization-scoped operation.

#### Calendar integrations
- Connect multiple Google accounts and multiple Zoho accounts per user, subject to provider OAuth/API capabilities and approval.
- List calendars available under each connected account.
- Let the user select calendars to include in conflict checks.
- Let the user select one destination calendar for each booking link.
- Show provider connection state, last successful sync/check, and actionable errors.
- Support provider webhook/push notifications where available, plus scheduled reconciliation.
- Disconnect and revoke provider access safely.

#### Unified calendar and availability
- Day, week, and month calendar views; mobile agenda/day view.
- Overlay and filter connected calendars.
- Normalize busy periods to UTC internally and display in the viewer's timezone.
- Merge overlapping busy periods across all selected calendars.
- Apply host working hours, date overrides, booking duration, buffers, minimum notice, and booking horizon.
- Recheck availability at booking confirmation.
- Prevent concurrent requests from confirming the same host/slot.

#### Booking links and public booking
- Authorized owners, admins, and employees can create booking links according to role permissions.
- Multiple links per user and organization.
- Configurable title, description, slug, duration, host, availability, calendar-check set, destination calendar, location, questions, notifications, branding, and status.
- Draft, published, paused, and archived states.
- Public page with date selection, available time slots, invitee form, confirmation, reschedule, and cancellation flows.
- Invitee does not need a platform account.
- Secure, unguessable management tokens for reschedule/cancel actions.

#### Bookings
- Booking list with upcoming, past, cancelled, and rescheduled filters.
- Booking detail view and audit trail.
- Create destination calendar event after successful confirmation.
- Reschedule and cancellation synchronize with the destination event and release the previous slot.
- Email confirmation and configurable reminders.
- Idempotency and retry handling for booking creation and provider writes.

#### Organization workspace UI
- Overview dashboard.
- Unified calendar.
- Bookings.
- Booking links and builder.
- Team and member management.
- Calendar integrations.
- Organization settings.

#### Platform Owner Console
- Organization list and detail.
- Registration/access request queue.
- User management and account status.
- Plan assignment and basic usage visibility (billing provider can be integrated later).
- Platform-level audit log and service health summary.

### P1 — post-MVP
- Round-robin assignment.
- Collective/team meetings requiring multiple hosts to be free.
- Group event types and pooled availability.
- Advanced analytics and CSV exports.
- Developer API key management, API usage dashboards, webhook management UI, and public documentation.
- Embeddable booking widget.
- Custom domains and expanded white-label controls.
- Microsoft Outlook / Microsoft 365 calendar integration.
- Additional notification channels.

### P2 — later opportunities
- Payments and paid appointments.
- CRM and HRMS-specific integrations.
- Automated meeting preparation and AI summaries, subject to explicit privacy controls.
- Advanced resource/room booking.
- Organization-level SSO and SCIM provisioning.

## 6. User stories and acceptance criteria

### Calendar connection
**As a host, I can connect more than one calendar account so that all relevant busy periods are considered.**
- [ ] I can connect multiple supported Google and Zoho accounts.
- [ ] I can see the account identity and connection status for each connection.
- [ ] I can select individual calendars for conflict checking.
- [ ] I can disconnect an account and see the effect on booking links that depend on it.
- [ ] Tokens are encrypted at rest and never returned to the browser after connection.

### Conflict-aware availability
**As a host, I can prevent bookings when any selected calendar is busy.**
- [ ] A busy interval in any selected calendar blocks overlapping candidate slots.
- [ ] Busy intervals are merged before slot generation.
- [ ] Buffers, working hours, date overrides, minimum notice, and booking horizon are applied server-side.
- [ ] Availability is rechecked at confirmation.
- [ ] Concurrent booking attempts cannot both reserve the same host and time.

### Booking link creation
**As an authorized user, I can create different links for different meeting types.**
- [ ] I can save a draft without publishing it.
- [ ] I can set duration, availability, host, calendars to check, and one destination calendar.
- [ ] The destination calendar must be one of the host's authorized writable calendars.
- [ ] I can preview and publish the public page.
- [ ] I can pause, duplicate, edit, or archive a link subject to existing booking rules.

### Public booking
**As an invitee, I can book a meeting without creating an account.**
- [ ] I can see only slots returned as bookable by the server.
- [ ] I can select a date and time in my timezone.
- [ ] I can submit required invitee information and custom answers.
- [ ] The booking is confirmed only after the server rechecks the slot and successfully writes the destination event.
- [ ] I receive confirmation and a secure management link.

### SaaS onboarding
**As a platform owner, I can approve access before a user enters a workspace.**
- [ ] New registrations are email-verified and assigned a pending state.
- [ ] An authorized approver can approve or reject with a recorded reason.
- [ ] Approval assigns or confirms the organization and role.
- [ ] Suspended or rejected accounts cannot access protected workspace routes or APIs.

### API integration
**As an organization developer, I can use scoped credentials to create and manage bookings.**
- [ ] API credentials belong to one organization and have explicit scopes.
- [ ] Secrets are displayed only once and stored as hashes.
- [ ] Requests are rate-limited and audited.
- [ ] Webhook deliveries are signed, retried, and recorded.

## 7. Non-functional requirements

- Security: least privilege, tenant isolation, secure OAuth, encrypted tokens, CSRF protection where applicable, XSS protection, rate limiting, secret scanning, and audit logging.
- Reliability: provider failures must be visible; retries must be bounded and idempotent.
- Performance: availability queries should be indexed, bounded, and measured; list endpoints must paginate.
- Accessibility: target WCAG 2.2 AA for key workflows; keyboard navigation and visible focus states are required.
- Responsive: support 360px mobile through wide desktop layouts.
- Observability: structured logs, correlation IDs, metrics, and alerts without logging OAuth tokens or sensitive invitee answers.
- Data privacy: collect the minimum invitee data needed and define retention/deletion policies before launch.

## 8. Out of scope for MVP

- Native mobile applications.
- Payment collection.
- AI meeting transcription or recording.
- Full two-way event replication between providers.
- Automatic copying of every event between Google and Zoho.
- Unrestricted Super Admin access to private event contents.
- Public anonymous API access without credentials.

## 9. Constraints and dependencies

- Google Calendar API OAuth scopes, quota policies, and verification requirements must be confirmed before production.
- Zoho Calendar API capabilities, OAuth scopes, regional data-center endpoints, and webhook support must be verified against the selected Zoho account region.
- Provider availability and write operations can fail independently; the product must model these states explicitly.
- Calendar event timezones and daylight-saving transitions must be handled consistently.
- A secure backend is required even though the product is a browser-first portal. OAuth secrets, availability decisions, tenant authorization, booking locks, and provider writes must never be implemented only in the frontend.

## 10. Open decisions before production

- Final product name, domain, and brand assets.
- Initial hosting region and data residency requirements.
- Final stack and deployment topology approval.
- Google and Zoho OAuth app ownership, consent screens, and production scopes.
- Email delivery provider and reminder policy.
- Subscription/billing provider and plan limits.
- Legal terms, privacy notice, retention period, and deletion process.
- Whether users may belong to multiple organizations in the first release.
- Exact behavior when a provider is temporarily unavailable during a booking attempt.

## 11. SEO and public pages

Public booking pages should have controlled metadata, canonical URLs, and no indexing of private booking data. Booking confirmation, reschedule, cancellation, and invitee-specific pages must be noindex. Organization marketing pages may be indexable later; authenticated workspace and admin pages must always be noindex.
