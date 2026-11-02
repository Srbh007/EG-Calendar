-- Create indexes to optimize hot query paths, specifically foreign keys heavily used in RLS policies

-- Optimize profile looks up by email
create index if not exists idx_profiles_email on public.profiles(email);

-- Optimize organization membership checks (critical for most RLS policies)
create index if not exists idx_org_members_user on public.organization_memberships(user_id);
create index if not exists idx_org_members_org on public.organization_memberships(organization_id);

-- Optimize connection and calendar lookups
create index if not exists idx_calendar_connections_user on public.calendar_connections(user_id);
create index if not exists idx_calendars_connection on public.calendars(connection_id);

-- Optimize booking link lookups
create index if not exists idx_booking_links_org on public.booking_links(organization_id);
create index if not exists idx_booking_links_slug on public.booking_links(slug);

-- Optimize bookings lookups
create index if not exists idx_bookings_link on public.bookings(booking_link_id);
create index if not exists idx_bookings_destination on public.bookings(destination_calendar_id);
create index if not exists idx_bookings_status on public.bookings(status);

-- Optimize webhook deliveries lookup by endpoint
create index if not exists idx_webhook_deliveries_endpoint on public.webhook_deliveries(endpoint_id);
