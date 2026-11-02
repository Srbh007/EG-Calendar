-- Insert mock users (Assuming they already exist in auth.users for local dev if using proper commands, otherwise we insert raw data just to profiles for display purposes if FK constraints allow or if we bypass auth.users for simple local UI testing. In a real scenario, tests use auth.signUp).

-- Note: In local dev, creating a user through Supabase Studio handles auth.users.
-- We'll leave this seed light so it doesn't fail on FK to auth.users if not populated.

insert into public.organizations (id, name, slug) values
('00000000-0000-0000-0000-000000000001', 'Acme Corp', 'acme-corp');
