-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text unique not null,
  first_name text,
  last_name text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ORGANIZATIONS
create table public.organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  timezone text default 'UTC' not null,
  status text default 'active' not null check (status in ('active', 'suspended', 'pending')),
  plan text default 'free' not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ORGANIZATION MEMBERSHIPS
create table public.organization_memberships (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text default 'member' not null check (role in ('owner', 'admin', 'member')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique(organization_id, user_id)
);

-- ACCESS REQUESTS
create table public.access_requests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  organization_id uuid references public.organizations(id) on delete cascade, -- null means request to create new org
  status text default 'pending' not null check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- INVITATIONS
create table public.invitations (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  email text not null,
  role text default 'member' not null check (role in ('owner', 'admin', 'member')),
  token_hash text unique not null,
  invited_by uuid references auth.users(id) on delete cascade not null,
  expires_at timestamptz not null,
  accepted_at timestamptz,
  created_at timestamptz default now() not null
);

-- RLS setup (Policies will be added in task 2.4, just enabling for now)
alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_memberships enable row level security;
alter table public.access_requests enable row level security;
alter table public.invitations enable row level security;
