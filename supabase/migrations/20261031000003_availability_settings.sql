-- WORKING HOURS
create table public.working_hours (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  day_of_week smallint not null check (day_of_week between 0 and 6), -- 0 = Sunday
  start_time time not null,
  end_time time not null,
  timezone text default 'UTC' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(user_id, day_of_week)
);

-- AVAILABILITY OVERRIDES
create table public.availability_overrides (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  override_date date not null,
  is_available boolean not null,
  start_time time, -- null if is_available is false (full day blocked)
  end_time time,
  timezone text default 'UTC' not null,
  created_at timestamptz default now() not null,
  unique(user_id, override_date)
);

alter table public.working_hours enable row level security;
alter table public.availability_overrides enable row level security;

-- Working Hours Policies
create policy "Users can view their own working hours"
  on public.working_hours
  for select
  using (user_id = auth.uid());

create policy "Users can manage their own working hours"
  on public.working_hours
  for all
  using (user_id = auth.uid());

-- Availability Overrides Policies
create policy "Users can view their own overrides"
  on public.availability_overrides
  for select
  using (user_id = auth.uid());

create policy "Users can manage their own overrides"
  on public.availability_overrides
  for all
  using (user_id = auth.uid());
