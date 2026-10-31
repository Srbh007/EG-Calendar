-- NOTE: Supabase uses pg_cron to schedule repeating database tasks.
-- In a real setup, pg_cron extension needs to be enabled by a superuser, which Supabase allows on their platform.
create extension if not exists pg_cron;

-- Create a generic function that makes an HTTP request to our Edge Function for provider reconciliation
-- This requires pg_net extension on Supabase
create extension if not exists pg_net;

-- Mock SQL block describing how the cron job would be defined
/*
select cron.schedule(
  'provider-reconciliation',
  '*/15 * * * *', -- Every 15 minutes
  $$
  select net.http_post(
      url:='https://<project-ref>.supabase.co/functions/v1/provider-sync',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer <anon_key>"}'::jsonb,
      body:='{"source": "pg_cron"}'::jsonb
  ) as request_id;
  $$
);

select cron.schedule(
  'send-upcoming-reminders',
  '*/5 * * * *', -- Every 5 minutes
  $$
  select net.http_post(
      url:='https://<project-ref>.supabase.co/functions/v1/process-reminders',
      headers:='{"Content-Type": "application/json", "Authorization": "Bearer <anon_key>"}'::jsonb
  ) as request_id;
  $$
);
*/
