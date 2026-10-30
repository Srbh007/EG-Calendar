# Phase 0 Report — Unified Scheduler

**Date:** 2026-10-31
**Status:** Completed

## 1. Supabase Environment Strategy (Task 0.1)

- **Environments:** Local (development), Staging, and Production.
- **Regions:** AWS us-east-1 for Staging and Production.
- **Access Roles:** Dedicated project owner account for production. Developers get limited access to staging. Local uses individual CLI setups.
- **Backups:** Automated daily backups enabled on Staging and Production via Supabase managed services. Point-in-time recovery for Production.
- **Plan/Limits:** Supabase Pro plan for Production (accommodating Edge Function concurrency and DB connections).
- **Redirect URLs:**
  - Local: `http://localhost:3000/auth/callback`
  - Staging: `https://staging.domain.com/auth/callback`
  - Production: `https://app.domain.com/auth/callback`
- **Secret Management:** Supabase Vault for managed secrets (OAuth tokens). No credentials committed. Only `NEXT_PUBLIC_` anon key available in frontend. Service-role key isolated to Edge Functions.

## 2. Google and Zoho API Capability Matrix (Task 0.2)

### Google Calendar API
- **OAuth Scopes:** `https://www.googleapis.com/auth/calendar.readonly`, `https://www.googleapis.com/auth/calendar.events`
- **Calendar Listing:** Supported (`calendarList.list`).
- **Free/Busy Reads:** Supported (`freebusy.query`).
- **Event Operations (Create/Update/Delete):** Supported.
- **Refresh/Revocation:** Supported (Refresh tokens obtained on first auth; revocation via `/revoke` endpoint).
- **Quotas:** Sufficient for MVP. 1M queries/day standard limit.
- **Webhook Support:** Supported (Push notifications to Edge Function endpoints).

### Zoho Calendar API
- **OAuth Scopes:** `ZohoCalendar.event.ALL`, `ZohoCalendar.calendar.ALL`
- **Calendar Listing:** Supported.
- **Free/Busy Reads:** Supported (via Free/Busy API).
- **Event Operations (Create/Update/Delete):** Supported.
- **Refresh/Revocation:** Supported.
- **Quotas:** Tiered limits. Need to monitor API calls carefully.
- **Webhook Support:** **Not natively supported for push notifications on event changes.** Will require fallback to scheduled polling/reconciliation via Supabase Cron.
- **Regions:** US, EU, IN, AU, JP endpoints (Requires dynamic handling in OAuth Edge Function based on user registration region).

## 3. Repository Baseline Report (Task 0.3)

- **Current Stack:** Empty root repository (docs and config only).
- **Frontend Stack (Approved):** Next.js 15 (App Router), React, TypeScript, Tailwind CSS v4, Lucide React, Radix UI.
- **Package Manager:** npm.
- **Folder Structure:** Validated against `architecture.md`. `src/` will house the Next.js app. `supabase/` will hold backend config and Edge Functions.
- **Existing Assets:** Only markdown documentation currently exists.
- **Gaps:** Frontend needs full scaffolding (Phase 1). Supabase CLI needs initialization (Phase 2).

## 4. Release Gates & Notify Cards (Task 0.4)
- **Status:** All tasks in `docs/task.md` and `implementation.md` have been updated with actual Notify IDs (`NTF-001` through `NTF-049`).
- **Owners:** Assigned generically to the development team for this iteration.
- **Priorities:** Sequential based on phases.
