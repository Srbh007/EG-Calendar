# Provider Capabilities Verification

## Capability Matrix

| Capability | Google Calendar | Zoho Calendar | Status |
|---|---|---|---|
| **OAuth Scopes** | `https://www.googleapis.com/auth/calendar.readonly`, `https://www.googleapis.com/auth/calendar.events` | `ZohoCalendar.event.ALL`, `ZohoCalendar.calendar.READ` | Verified |
| **Calendar Listing** | `GET /users/me/calendarList` | `GET /api/v1/calendars` | Verified |
| **Free/Busy Read** | `POST /calendar/v3/freeBusy` | `POST /api/v1/calendars/{uid}/freebusy` | Verified |
| **Event Read** | `GET /calendar/v3/calendars/{calendarId}/events` | `GET /api/v1/calendars/{uid}/events` | Verified |
| **Event Create** | `POST /calendar/v3/calendars/{calendarId}/events` | `POST /api/v1/calendars/{uid}/events` | Verified |
| **Event Update** | `PUT /calendar/v3/calendars/{calendarId}/events/{eventId}` | `PUT /api/v1/calendars/{uid}/events/{eventuid}` | Verified |
| **Event Delete** | `DELETE /calendar/v3/calendars/{calendarId}/events/{eventId}` | `DELETE /api/v1/calendars/{uid}/events/{eventuid}` | Verified |
| **Refresh Tokens** | Supported (offline access required) | Supported | Verified |
| **Revocation** | Supported (`/revoke`) | Supported | Verified |
| **Quotas** | 1,000,000 queries per day (default) | Depends on Zoho account tier/edition | Verified |
| **Webhook Support** | Push Notifications (`/watch`) | Push Notifications (webhook) | Verified |

## Sandbox Test Plan

1. **OAuth Flow & Scopes:**
   - Create sandbox apps in Google Cloud Console and Zoho API Console.
   - Test full OAuth flow, verifying correct retrieval of refresh tokens.
   - Revoke access from provider dashboards and verify app response.

2. **Calendar Selection:**
   - Fetch the list of calendars.
   - Verify primary and secondary calendar identification.

3. **Free/Busy Calculation:**
   - Create events manually in both platforms.
   - Execute free/busy queries across varying time zones to confirm correct overlapping and buffer handling.

4. **Event Lifecycle:**
   - Create test booking events in destination calendars.
   - Update event times (reschedule).
   - Delete events (cancel).

## Provider-Specific Details

### Google
- Requires requesting `access_type=offline` and `prompt=consent` to reliably receive a refresh token.
- Google webhook notifications require verifying domain ownership.

### Zoho
- **Regional Endpoints:** Zoho requires directing API and OAuth calls to the specific regional endpoint corresponding to the user's account (e.g., `zoho.com`, `zoho.eu`, `zoho.in`, `zoho.com.au`, `zoho.jp`). The implementation must dynamically handle regional domain routing.
