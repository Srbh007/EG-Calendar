-- API KEYS
create table public.api_keys (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  created_by uuid references auth.users(id) on delete cascade not null,
  name text not null,
  key_hint text not null, -- First/last few characters to identify it
  key_hash text unique not null, -- Hashed secret
  scopes text[] default array['read', 'write'] not null,
  last_used_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- WEBHOOK ENDPOINTS
create table public.webhook_endpoints (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  created_by uuid references auth.users(id) on delete cascade not null,
  url text not null,
  description text,
  signing_secret_hash text not null,
  events text[] default array['booking.created', 'booking.updated', 'booking.cancelled'] not null,
  status text default 'active' not null check (status in ('active', 'inactive', 'failing')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- WEBHOOK DELIVERIES
create table public.webhook_deliveries (
  id uuid primary key default uuid_generate_v4(),
  endpoint_id uuid references public.webhook_endpoints(id) on delete cascade not null,
  event_type text not null,
  payload jsonb not null,
  request_headers jsonb,
  response_status integer,
  response_body text,
  duration_ms integer,
  created_at timestamptz default now() not null
);

-- RLS
alter table public.api_keys enable row level security;
alter table public.webhook_endpoints enable row level security;
alter table public.webhook_deliveries enable row level security;

-- Policies for API Keys
create policy "Admins can manage API keys for their orgs"
  on public.api_keys for all using (
    organization_id in (
      select organization_id from public.organization_memberships
      where user_id = auth.uid() and role in ('owner', 'admin')
    )
  );

create policy "Admins can manage Webhooks for their orgs"
  on public.webhook_endpoints for all using (
    organization_id in (
      select organization_id from public.organization_memberships
      where user_id = auth.uid() and role in ('owner', 'admin')
    )
  );

create policy "Admins can view Webhook deliveries for their orgs"
  on public.webhook_deliveries for select using (
    exists (
      select 1 from public.webhook_endpoints
      where id = endpoint_id and organization_id in (
        select organization_id from public.organization_memberships
        where user_id = auth.uid() and role in ('owner', 'admin')
      )
    )
  );
