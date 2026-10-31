-- Drop the stubbed booking_links table and its dependents from Task 3.1
-- FULL BOOKING LINKS SCHEMA (alter existing tables instead of drop)
alter table public.booking_links
  add column title text not null default 'Untitled',
  add column duration_minutes integer not null default 30,
  add column buffer_before_minutes integer not null default 0,
  add column buffer_after_minutes integer not null default 0,
  add column minimum_notice_hours integer not null default 24,
  add column booking_horizon_days integer not null default 60,
  add column status text default 'published' not null check (status in ('published', 'draft', 'archived')),
  add column updated_at timestamptz default now() not null;

-- BOOKINGS
create table public.bookings (
  id uuid primary key default uuid_generate_v4(),
  booking_link_id uuid references public.booking_links(id) on delete cascade not null,
  invitee_email text not null,
  invitee_name text not null,
  invitee_notes text,
  start_time timestamptz not null,
  end_time timestamptz not null,
  invitee_timezone text not null,
  destination_calendar_id uuid references public.calendars(id) on delete cascade not null,
  provider_event_id text, -- ID returned by Google/Zoho
  status text default 'pending' not null check (status in ('pending', 'confirmed', 'cancelled', 'rescheduled')),
  idempotency_key text unique,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- BOOKING AUDIT EVENTS
create table public.booking_audit_events (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid references public.bookings(id) on delete cascade not null,
  actor_type text not null check (actor_type in ('invitee', 'host', 'system')),
  action text not null,
  previous_status text,
  new_status text,
  created_at timestamptz default now() not null
);

-- RLS
alter table public.booking_links enable row level security;
alter table public.booking_link_calendars enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_audit_events enable row level security;

-- Booking Links Policies
create policy "Users can view links for their orgs"
  on public.booking_links for select using (
    organization_id in (select organization_id from public.organization_memberships where user_id = auth.uid())
  );
create policy "Users can update links for their orgs"
  on public.booking_links for update using (
    organization_id in (select organization_id from public.organization_memberships where user_id = auth.uid())
  );
create policy "Users can insert links for their orgs"
  on public.booking_links for insert with check (
    organization_id in (select organization_id from public.organization_memberships where user_id = auth.uid())
  );

-- Booking Link Calendars Policies
create policy "Users can view calendars for their links"
  on public.booking_link_calendars for select using (
    exists (select 1 from public.booking_links where id = booking_link_id and organization_id in (
      select organization_id from public.organization_memberships where user_id = auth.uid()
    ))
  );

-- Bookings Policies (Basic host access, public access would use secure Edge Functions or signed tokens, not naked RLS reads)
create policy "Hosts can view bookings for their links"
  on public.bookings for select using (
    exists (select 1 from public.booking_links where id = booking_link_id and organization_id in (
      select organization_id from public.organization_memberships where user_id = auth.uid()
    ))
  );
