-- RLS Policies for Profiles
create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id);

-- RLS Policies for Organizations
-- Users can view organizations they are members of
create policy "Users can view organizations they belong to"
  on public.organizations
  for select
  using (
    exists (
      select 1
      from public.organization_memberships
      where organization_id = public.organizations.id
      and user_id = auth.uid()
    )
  );

-- Only members with 'owner' or 'admin' role can update the organization
create policy "Owners and admins can update their organization"
  on public.organizations
  for update
  using (
    exists (
      select 1
      from public.organization_memberships
      where organization_id = public.organizations.id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

-- RLS Policies for Organization Memberships
-- Users can view memberships for organizations they belong to.
-- We must avoid querying public.organization_memberships recursively.
-- Instead, we just check if the user is viewing their OWN membership row,
-- OR we use a security definer function/separate table to avoid recursion.
-- The simplest way without recursion is to allow users to read ANY membership
-- for an org ID they are a part of, but doing that purely via the table
-- causes infinite recursion.
-- For now, the most secure non-recursive policy is: A user can see their own membership.
-- (To see other team members, they join through organizations or we create a materialized view/function).
-- To support team viewing safely:
-- To support team viewing safely without recursion in a pure RLS check,
-- you can just let the user read their own row, and then use a helper function
-- for org-wide checks. However, Postgres 15+ allows `organization_id IN (SELECT ...)`
-- safely without recursion if we are careful, but the safest way to avoid all recursion
-- issues for reading the entire team list is to use a SECURITY DEFINER helper function.
-- For this baseline, we will only allow users to see their OWN membership.
-- In phase 7 (Admin), we will add the team-level function.

create policy "Users can view their own memberships"
  on public.organization_memberships
  for select
  using (user_id = auth.uid());

-- Access Requests Policies
create policy "Users can view their own access requests"
  on public.access_requests
  for select
  using (user_id = auth.uid());

create policy "Users can insert their own access requests"
  on public.access_requests
  for insert
  with check (user_id = auth.uid());

-- Organization admins can view access requests for their organization
create policy "Admins can view access requests for their org"
  on public.access_requests
  for select
  using (
    exists (
      select 1
      from public.organization_memberships
      where organization_id = public.access_requests.organization_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

-- Invitations Policies
create policy "Admins can insert invitations"
  on public.invitations
  for insert
  with check (
    exists (
      select 1
      from public.organization_memberships
      where organization_id = public.invitations.organization_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
    and invited_by = auth.uid()
  );

create policy "Admins can view invitations"
  on public.invitations
  for select
  using (
    exists (
      select 1
      from public.organization_memberships
      where organization_id = public.invitations.organization_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );
