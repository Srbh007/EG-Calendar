# Production Deployment Runbook

**Date:** 2026-10-31
**Phase:** 8.4

## Next.js Frontend Deployment
- **Target:** Managed hosting provider (e.g., Vercel or AWS Amplify).
- **Env Vars Required:**
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Build Command:** `npm run build`
- **Install Command:** `npm ci`
- **Rollback:** Perform a one-click deployment revert in the hosting dashboard.

## Supabase Managed Services Deployment
- **Target:** Supabase Project (Production Environment, `us-east-1`).
- **Migrations:** Push using `npx supabase db push`.
- **Edge Functions:** Deploy using `npx supabase functions deploy`.
- **Secrets:** Configure securely in the dashboard or CLI: `npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...` (plus OAuth client secrets).
- **Backups:** Supabase automated PITR (Point-in-Time Recovery) is enabled on the Pro plan.
- **Monitoring:** Monitor Edge Function logs and Postgres metrics via the Supabase Dashboard.

## Staging Verification
- The exact setup procedure has been validated on a staging environment successfully. Staging uses identical code branches with separate API keys and a distinct Supabase project.

## Incident Management
- **Support Owner:** CTO
- **Rollback DB:** If a migration fails, use `npx supabase db reset` locally or restore from the latest automated snapshot in production.
