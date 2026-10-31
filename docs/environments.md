# Supabase Project and Environment Strategy

## Environments

1. **Local Development**
   - Each developer uses the Supabase CLI (`supabase start`) to run an isolated local instance of Supabase via Docker.
   - Migrations and functions are applied locally.

2. **Staging Environment**
   - A dedicated cloud Supabase project used for end-to-end integration, QA, and automated test execution.
   - Replicates production environment settings but uses mock/sandbox provider credentials (e.g., Google/Zoho test apps).

3. **Production Environment**
   - The live, customer-facing Supabase cloud project.
   - Contains real customer data, live OAuth secrets, and strict operational controls.

## Project Details
- **Region:** AWS eu-central-1 (Frankfurt) or equivalent low-latency region based on the target market. (To be finalized).
- **Plan:** Pro Plan for Staging and Production to enable Point-in-Time Recovery (PITR), managed connection pooling, and sufficient Edge Function limits.

## Project Ownership & Access
- The Platform Owner organization retains ownership of the Staging and Production Supabase projects.
- Developers use their own local environments and are granted access to Staging only for debugging purposes.
- Only operations engineers or platform administrators have direct dashboard/CLI access to Production.

## Secret Management
- **Local:** `supabase/functions/.env` for Edge Function secrets (must be added to `.gitignore`).
- **Staging/Production:** Managed using Supabase Vault and/or Supabase dashboard secrets management.
- **Never committed:** OAuth credentials (Google/Zoho client IDs and secrets), service-role keys, and webhook signing secrets.

## Redirect URLs (OAuth)
- Local: `http://localhost:3000/api/auth/callback`, `http://127.0.0.1:54321/...`
- Staging/Production: Appropriate host domains configured under Supabase Auth URL configuration.

## Backups
- Handled by Supabase managed automated backups (Point-in-Time Recovery enabled for Production).
