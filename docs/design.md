# Product Design System and Screen Specifications

**Product:** Unified Scheduler  
**Design owner:** CTO + UI owner  
**Status:** High-fidelity design specification baseline  
**Version:** 1.0  
**Last updated:** 2026-10-31

## 1. Design intent

Create a calm, minimal, premium scheduling SaaS interface. The product should feel purpose-built for scheduling, not like a dense ERP or generic admin template. The calendar, booking-link builder, and public booking page are the three highest-value experiences and receive the most design attention.

### Design principles

1. **Clarity before density:** show the next useful action and the information needed to make a decision.
2. **One strong accent:** green identifies primary actions and meaningful positive states; it is not a decorative background everywhere.
3. **Consistent structure:** predictable sidebar, top bar, page title, content area, and contextual drawers.
4. **Progressive disclosure:** advanced booking rules live in clearly named sections and can be collapsed.
5. **Trustworthy status:** calendar sync, booking, and provider-write states are explicit and never imply success prematurely.
6. **Accessible by default:** keyboard, contrast, focus, labels, and non-color status indicators are designed in.

## 2. Brand and visual language

### Color tokens

| Token | Value | Use |
|---|---|---|
| `--color-primary` | `#147D52` | Primary buttons, active navigation, links, selected controls |
| `--color-primary-hover` | `#106744` | Hover/pressed primary controls |
| `--color-primary-soft` | `#DDF3E7` | Selected surfaces, subtle success background |
| `--color-highlight` | `#17231D` | Strong text and high-contrast emphasis |
| `--color-background` | `#F7F9F7` | App canvas |
| `--color-surface` | `#FFFFFF` | Cards, panels, menus |
| `--color-surface-muted` | `#F1F5F2` | Secondary surfaces |
| `--color-border` | `#E5EAE6` | Borders and dividers |
| `--color-text` | `#17231D` | Main text |
| `--color-text-muted` | `#68756D` | Secondary text |
| `--color-danger` | `#C64747` | Errors and destructive actions |
| `--color-warning` | `#A96A16` | Warnings and attention states |
| `--color-info` | `#386D9A` | Informational states |

Use semantic status labels and icons alongside colors. Provider/calendar event colors may use a separate controlled palette and must not replace status semantics.

### Typography

- Font family: Inter, with system sans-serif fallback.
- Page title: 24–28px, weight 600.
- Section title: 16–18px, weight 600.
- Body: 14px, line height 1.5.
- Secondary/help text: 12–13px.
- KPI value: 26–32px, weight 600.
- Avoid excessive font-size variation.

### Spacing and shape tokens

| Token | Value |
|---|---:|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--radius-sm` | 6px |
| `--radius-md` | 10px |
| `--radius-lg` | 14px |
| `--radius-xl` | 18px |
| `--shadow-card` | `0 1px 2px rgba(23,35,29,0.04)` |
| `--shadow-popover` | `0 8px 28px rgba(23,35,29,0.12)` |

Use a 4px base spacing scale. Prefer borders over shadows. Avoid gradients, glass effects, heavy shadows, and excessive pill-shaped cards.

## 3. Application shell

### Organization workspace

- Fixed/collapsible left sidebar on desktop, approximately 248px expanded and 72px collapsed.
- Top bar contains breadcrumb/page context, organization switcher, global quick actions, notifications, and user menu.
- Main content max width is context-sensitive; calendar and tables can use the full available width.
- Sidebar groups:
  - Workspace: Overview, Calendar, Bookings, Booking links, Team.
  - Configuration: Integrations, Developer API, Analytics, Settings.
- Organization switcher shows organization name and workspace role. Switching organizations must refresh all tenant-scoped data.
- User menu includes profile, timezone, preferences, and sign out.

### Platform Owner Console

- Separate route namespace `/platform-admin` and separate navigation.
- Navigation: Overview, Organizations, Access requests, Users, Plans & usage, Platform integrations, Audit logs, System health, Settings.
- Persistent visual label identifying Platform Admin mode.
- Do not make customer event contents visible from this console by default.

### Public booking shell

- No workspace sidebar.
- Centered, focused booking card/page with organization branding, host identity, meeting details, date/time selection, and invitee form.
- Keep the page lightweight and usable without login.

## 4. Navigation and route map

| Route | Screen |
|---|---|
| `/login` | Sign in |
| `/register` | Registration |
| `/access/pending` | Pending approval |
| `/onboarding` | Organization and calendar setup |
| `/app` | Workspace overview |
| `/app/calendar` | Unified calendar |
| `/app/bookings` | Booking management |
| `/app/booking-links` | Booking links list |
| `/app/booking-links/new` | Booking link builder |
| `/app/booking-links/:id/edit` | Edit booking link |
| `/app/team` | Team management |
| `/app/integrations` | Calendar integrations |
| `/app/developer` | API and webhooks |
| `/app/analytics` | Analytics |
| `/app/settings` | Organization settings |
| `/platform-admin` | Owner overview |
| `/platform-admin/organizations` | Organizations |
| `/platform-admin/access-requests` | Approval queue |
| `/platform-admin/users` | Users |
| `/platform-admin/plans` | Plans and usage |
| `/platform-admin/audit-logs` | Audit logs |
| `/platform-admin/system-health` | System health |
| `/book/:slug` | Public booking page |
| `/book/:slug/confirmed` | Booking confirmation |
| `/manage/:token` | Reschedule/cancel booking |

## 5. Screen specifications

### 5.1 Authentication and registration

**Layout:** split panel on wide desktop; single centered card on mobile.

**Sign-in content:** product mark, concise headline, email, password, show/hide password, forgot password, sign-in button, Google sign-in only if enabled and approved.

**Registration content:** name, work email, password, organization choice (create/request to join), organization name when creating, terms/privacy acknowledgement, email verification step.

**States:** default, invalid fields, submitting, verification sent, pending approval, rejected, suspended, provider auth error.

**Rules:** pending users see a clear status page and cannot enter the workspace. Do not expose organization data before approval.

### 5.2 Onboarding wizard

A short stepper with a visible progress indicator:

1. Organization profile: name, slug, timezone, logo (optional).
2. Connect calendar provider: Google or Zoho; allow skip and return later.
3. Choose calendars to check for conflicts.
4. Set working hours and host timezone.
5. Choose default destination calendar.
6. Create first booking link.
7. Completion summary and next action.

Each step autosaves only after server acknowledgement. Provider connection errors must offer retry and a manual continue path where safe.

### 5.3 Organization dashboard

**Header:** greeting, organization switcher context, date range, primary `Create booking link` action.

**KPI row:** Total bookings, Upcoming, Completed, Cancellation rate. Use compact cards with clear labels and comparison period only when real data exists.

**Main layout:**
- Left/main: Today's schedule and upcoming bookings.
- Right/secondary: Calendar connection health and active booking links.
- Lower section: Recent activity.

**Empty state:** explain the first useful setup action: connect a calendar or create a booking link. Do not show fabricated metrics.

### 5.4 Unified calendar

**Primary purpose:** see busy/free context from selected connected calendars in one place.

**Desktop layout:**
- Header: date navigation, Today, Day/Week/Month, search, filter, Create event (only if event creation is supported and authorized).
- Left rail: provider accounts and calendar toggles, grouped by account.
- Main: time grid with sticky date/time headers; day/week view and month grid.
- Optional detail drawer: event title/details only when viewer has permission; otherwise show Busy.

**Calendar controls:** filter by account/provider, show/hide calendars, timezone display, team overlay where authorized.

**Visual rules:** use restrained provider/calendar identity colors; meeting cards show title, time, and provider marker. Busy blocks without permission show a generic label.

**States:** loading skeleton, no calendars connected, calendars not selected, sync delayed, provider disconnected, empty day, event details unavailable, permission denied.

**Responsive:** mobile defaults to agenda/day view; do not squeeze a full week grid into a narrow viewport.

### 5.5 Calendar integrations

**Header:** title, short explanation, `Connect calendar` action.

**Provider cards:** Google Calendar and Zoho Calendar. Each connected account row shows account email, provider, connection status, last sync/check, number of calendars, and Manage/Disconnect actions.

**Account detail:** list calendars with checkboxes for conflict checking; show read/write capability and timezone. Destination selection is configured per booking link, not globally assumed.

**Warnings:** stale sync, revoked consent, token refresh failure, permission change, calendar no longer writable. Provide reconnect/retry actions.

### 5.6 Booking links list

**Header:** `Booking links`, description, `Create link` button.

**Controls:** search by title/slug, filter by owner, status, meeting type; sort by recently updated or bookings.

**Table/card fields:** meeting title, owner, duration, status, booking URL, booking count, updated date, actions.

**Actions:** preview, copy link, edit, duplicate, pause/resume, archive. Destructive actions require confirmation and explain the impact on existing bookings.

**States:** empty, no search results, loading, error, paused links, archived links.

### 5.7 Booking link builder

**Desktop composition:** three zones where width permits: left step navigation (220px), central form (flexible), right live preview (320–380px). On tablet/mobile use a step-by-step form with preview as a separate tab.

**Step A — Basics:** title, description, host, URL slug, duration.

**Step B — Availability:** working hours, specific date range, date overrides, minimum notice, maximum booking horizon, before/after buffers.

**Step C — Calendars:**
- `Check for conflicts` multi-select: one or more connected calendars.
- `Add confirmed bookings to` single-select: exactly one writable destination calendar.
- Show warning if a selected conflict calendar is disconnected or sync is stale.

**Step D — Location:** Google Meet/Zoom/Teams only when integration is enabled; physical address; custom URL. Never claim a meeting link was generated until provider creation succeeds.

**Step E — Invitee questions:** name/email defaults, optional phone/company, custom short text/long text/select questions, required toggle, drag ordering.

**Step F — Notifications:** confirmation email, reminder timing, cancellation/reschedule notifications. Show delivery limitations clearly.

**Step G — Appearance:** organization logo, host avatar, description, primary brand color constrained to accessible contrast, custom footer.

**Step H — Publish:** review summary, preview, save draft, publish. Publish requires a valid host, at least one usable conflict-check calendar (or explicitly approved manual availability mode), one writable destination calendar, and valid availability settings.

**Validation:** inline field errors, top summary for blocking errors, unsaved-change warning, save progress, publish success with copyable URL.

### 5.8 Public booking page

**Desktop:** left meeting/host summary and right date/time selection; invitee form appears after slot selection or in a clear next step. **Mobile:** one-column progressive flow.

**Flow:** load public link → select date → fetch available slots → choose time → enter invitee details → review timezone and meeting details → confirm.

**Requirements:** show timezone explicitly; allow visitor timezone correction; accessible date picker; slots are server-returned only; show loading/empty/error states; recheck at confirmation; if slot is taken, preserve form data and show refreshed alternatives.

**Confirmation:** meeting name, date/time with timezone, host, location, confirmation reference, calendar invitation action, secure reschedule/cancel links.

### 5.9 Booking management

**Header:** Bookings, date range, search, filters.

**Tabs:** Upcoming, Past, Cancelled.

**Table:** invitee, meeting, host, date/time, status, destination calendar, created date.

**Detail drawer:** invitee details subject to role, booking answers, calendar event status, activity timeline, reschedule/cancel controls where permitted.

**Statuses:** pending, confirmed, rescheduled, cancelled, calendar_write_failed, pending_retry, completed, no_show (only if no-show tracking is implemented).

### 5.10 Team management

**Member list:** name/avatar, email, role, status, connected-calendar health, booking links count, last active.

**Actions:** invite, change role, suspend/remove, resend invitation. Role changes require confirmation and are audit logged.

**Member detail:** host profile, timezone, working hours, own booking links, calendar connection status. Do not expose private event details to managers unless explicit calendar sharing grants it.

### 5.11 Team scheduling

This is a later feature. Provide a dedicated builder for fixed host, round-robin pool, or collective availability. Do not expose the UI until trusted Supabase Edge Function/database logic supports its conflict and assignment rules.

### 5.12 Developer API and webhooks

**Tabs:** API keys, Webhooks, Usage, Documentation.

API key list shows name, prefix, scopes, created date, last used, expiry, status. Secret is displayed once at creation. Webhook list shows endpoint, subscribed events, status, last delivery, and actions. Delivery details show redacted request/response metadata and retry state.

### 5.13 Analytics

Show only metrics supported by recorded data: booking volume over time, booking link performance, host utilization, cancellations, booking conversion (requires page-view/funnel events), and provider health. Filters by date, team, host, and link. CSV export is permissioned and audited.

### 5.14 Organization settings

Sections: organization profile, members and roles, working hours defaults, timezone, booking policies, notification defaults, branding, security, data retention, organization deletion.

### 5.15 Platform Owner Console

**Overview:** organization count, active users, bookings, pending requests, service/provider health. Avoid vanity charts.

**Organizations:** searchable/paginated list, status, plan, created date, member count, usage. Detail view for organization profile, members, plan, and audit events.

**Access requests:** pending queue with user, requested organization, verified email, requested role, date, approve/reject with reason.

**Users:** search, status, organization memberships, suspend/reactivate. No unrestricted event-content browsing.

**Plans & usage:** plan assignment, limits, usage indicators. Billing automation is later unless a provider is selected.

**Audit logs and system health:** filterable records and health indicators; never expose raw secrets.

### 5.16 Notifications and activity center

Bell menu with unread count and grouped notifications. Types include booking created/cancelled/rescheduled, calendar disconnected/sync failure, access request, member invitation, webhook failure, and usage threshold. Users can configure email/in-app preferences. Notification text must avoid exposing sensitive event content in previews.

## 6. Shared component inventory

### Foundation (`components/ui`)

- Button: primary, secondary, ghost, destructive, loading, disabled.
- Input, Textarea, Select, Checkbox, Radio, Switch.
- Card, Badge, Avatar, Tooltip, Divider.
- Dialog, Drawer, Popover, DropdownMenu, Tabs.
- Table, Pagination, EmptyState, Skeleton, Alert, Toast.
- DatePicker, TimePicker, TimezoneSelect.
- FormField with label, hint, error, required state.

### Feature components

- `AppSidebar`, `WorkspaceSwitcher`, `Topbar`, `PageHeader`.
- `CalendarAccountCard`, `CalendarListItem`, `CalendarHealthBadge`.
- `UnifiedCalendarGrid`, `CalendarEvent`, `BusyBlock`, `CalendarFilterPanel`.
- `BookingLinkCard`, `BookingLinkTable`, `BookingLinkBuilderStepper`, `BookingLinkPreview`.
- `AvailabilityDatePicker`, `TimeSlotList`, `InviteeForm`, `BookingConfirmation`.
- `BookingStatusBadge`, `BookingDetailDrawer`, `BookingTimeline`.
- `MemberTable`, `RoleSelector`, `InvitationDialog`.
- `ApprovalRequestCard`, `PlatformMetricCard`, `AuditLogTable`.

All components must use tokens and shared variants. Do not create one-off styles in feature screens.

## 7. CSS token file contract

Create `frontend/src/styles/tokens.css` with CSS custom properties for:
- Colors in section 2.
- Typography families, sizes, weights, and line heights.
- Spacing scale.
- Radius and shadows.
- Z-index layers for sidebar, dropdown, modal, toast.
- Responsive breakpoints as documented constants in the styling system.

`global.css` should define reset/base typography, focus ring, page shell, container widths, accessible utility classes, and semantic status classes. Components must not duplicate token values.

## 8. Responsive breakpoints

| Name | Width | Rules |
|---|---:|---|
| `sm` | 360px | Mobile baseline; one-column forms and agenda calendar |
| `md` | 768px | Tablet; compact navigation and stacked builder |
| `lg` | 1024px | Desktop sidebar and two-column content where appropriate |
| `xl` | 1280px | Full builder preview and expanded calendar controls |
| `2xl` | 1536px | Wider calendar grid; cap reading/form widths |

Do not use breakpoints to hide essential actions. On mobile, convert tables to readable cards or controlled horizontal scrolling only where appropriate.

## 9. Interaction and state standards

Every data-driven screen must design:
- Loading skeleton.
- Empty state with next action.
- Error state with retry or recovery guidance.
- Permission-denied state.
- Stale/syncing state where provider data is involved.
- Success feedback for saved/published/connected actions.
- Destructive confirmation for disconnect, delete, archive, revoke, and cancel.

Use optimistic UI only for reversible low-risk preferences. Do not optimistically confirm bookings, calendar writes, access approvals, or permission changes.

## 10. Motion

- Use short 120–180ms transitions for hover, focus, drawers, and dropdowns.
- Respect `prefers-reduced-motion`.
- Avoid animated gradients, parallax, and decorative motion.
- Calendar drag/drop (if added) must provide a keyboard-accessible alternative.

## 11. Iconography and imagery

- Use Lucide outline icons consistently.
- Use provider brand marks only where permitted by provider brand guidelines.
- Avoid decorative stock photography in the authenticated product.
- Organization logos and avatars must have fixed aspect ratios, fallbacks, and alt text.
- Public share/OG image template: 1200×630, logo + meeting title + brand background, no invitee-specific data.

## 12. Accessibility checklist

- [ ] All form fields have programmatic labels and helpful error associations.
- [ ] Focus is trapped/restored correctly in dialogs and drawers.
- [ ] Calendar/date/time controls support keyboard use.
- [ ] Status is communicated with text/icon, not color alone.
- [ ] Contrast meets WCAG 2.2 AA.
- [ ] Screen-reader announcements exist for async slot loading and booking results.
- [ ] Touch targets are comfortably usable on mobile.
- [ ] Reduced-motion preference is respected.

## 13. Design QA checklist

- [ ] Compare implementation against approved screen reference at 1440px and 390px.
- [ ] Verify all states, not only the happy path.
- [ ] Verify no arbitrary colors, radii, spacing, or typography outside tokens.
- [ ] Check long organization names, long emails, empty data, and large tables.
- [ ] Check timezone labels and daylight-saving display.
- [ ] Confirm public booking page works without account login.
- [ ] Confirm pending users cannot see workspace content.
- [ ] Confirm no private calendar event detail leaks into public UI or unauthorized team views.
