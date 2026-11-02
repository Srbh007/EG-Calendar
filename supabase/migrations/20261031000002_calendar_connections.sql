-- CALENDAR CONNECTIONS
create table public.calendar_connections (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  provider text not null check (provider in ('google', 'zoho')),
  provider_account_id text not null,
  provider_email text not null,
  status text default 'connected' not null check (status in ('connected', 'error', 'revoked', 'disconnected')),
  last_sync_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, provider, provider_account_id)
);

-- CALENDARS
create table public.calendars (
  id uuid primary key default uuid_generate_v4(),
  connection_id uuid references public.calendar_connections(id) on delete cascade not null,
  provider_calendar_id text not null,
  name text not null,
  is_primary boolean default false not null,
  is_read_only boolean default false not null,
  timezone text default 'UTC' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(connection_id, provider_calendar_id)
);

-- BOOKING LINKS (Stubbed for FK reference, full schema in Phase 5)
create table public.booking_links (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  slug text unique not null,
  created_at timestamptz default now() not null
);

-- BOOKING LINK CALENDARS
create table public.booking_link_calendars (
  id uuid primary key default uuid_generate_v4(),
  booking_link_id uuid references public.booking_links(id) on delete cascade not null,
  calendar_id uuid references public.calendars(id) on delete cascade not null,
  selection_type text not null check (selection_type in ('conflict_check', 'destination')),
  created_at timestamptz default now() not null,
  unique(booking_link_id, calendar_id, selection_type)
);

-- Enable RLS
alter table public.calendar_connections enable row level security;
alter table public.calendars enable row level security;
alter table public.booking_links enable row level security;
alter table public.booking_link_calendars enable row level security;

-- Calendar Connections Policies
create policy "Users can view their own connections"
  on public.calendar_connections
  for select
  using (user_id = auth.uid());

create policy "Users can update their own connections"
  on public.calendar_connections
  for update
  using (user_id = auth.uid());

create policy "Users can delete their own connections"
  on public.calendar_connections
  for delete
  using (user_id = auth.uid());

-- Calendars Policies
create policy "Users can view calendars for their connections"
  on public.calendars
  for select
  using (
    exists (
      select 1
      from public.calendar_connections
      where id = public.calendars.connection_id
      and user_id = auth.uid()
    )
  );

create policy "Users can update calendars for their connections"
  on public.calendars
  for update
  using (
    exists (
      select 1
      from public.calendar_connections
      where id = public.calendars.connection_id
      and user_id = auth.uid()
    )
  );

-- Booking Link Calendars Policies
create policy "Users can view their own booking link calendars"
  on public.booking_link_calendars
  for select
  using (
    exists (
      select 1
      from public.booking_links
      where id = public.booking_link_calendars.booking_link_id
      and user_id = auth.uid()
    )
  );
