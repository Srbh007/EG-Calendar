# Performance, Caching and Scalability Guide

**Applies to:** Next.js frontend + Supabase managed services.
**Goal:** Keep the application fast, responsive and cost-efficient without introducing a separately operated backend, self-managed cache cluster or load balancer.

## 1. Performance principles

- Measure before optimizing. Record baseline Lighthouse scores, Core Web Vitals, bundle sizes, Supabase query timings and Edge Function latency.
- Keep private calendar data, OAuth credentials and tenant-specific responses out of shared/public caches.
- Cache only data with a defined freshness policy and invalidation strategy. Availability must be revalidated before booking confirmation.
- Prefer managed capabilities already provided by the frontend host and Supabase. Do not add infrastructure merely to tick a checklist item.

## 2. Implementation checklist

| Checklist item | Required implementation | Where / notes |
|---|---|---|
| Add lazy loading | Lazy-load below-the-fold images and non-critical components; keep above-the-fold hero/brand assets eager when needed. | Next.js image defaults/components and dynamic imports. |
| Split code into chunks | Route-level and component-level splitting; dynamically import heavy calendar views, charts and admin-only modules. | Next.js route bundles and dynamic imports. |
| Cache API responses | Add explicit TTL, cache key, privacy scope and invalidation rules. | Cache only public/static or safely scoped data. Never shared-cache authenticated calendar events, OAuth data or tenant-private responses. |
| Add a CDN | Serve static assets and public cacheable content through the frontend host's CDN; use Supabase Storage/CDN delivery for public assets where appropriate. | Use the hosting provider's managed CDN; no separate CDN infrastructure unless measurements justify it. |
| Minify JS and CSS | Ensure production build minification/tree-shaking is enabled; inspect output. | Standard production build pipeline; do not manually minify source files. |
| Index the database | Add indexes for foreign keys, tenant filters, date ranges, status and frequent sort keys based on real query patterns. | Supabase PostgreSQL migrations; verify with EXPLAIN/EXPLAIN ANALYZE and avoid redundant indexes. |
| Reduce unnecessary re-renders | Keep component state local, memoize only measured hot paths, stabilize props and avoid broad context updates. | React profiling; do not add memoization everywhere. |
| Debounce input handlers | Debounce search/autocomplete/filter requests; cancel stale requests where possible. | Frontend; do not debounce critical booking confirmation or validation. |
| Paginate large lists | Use server/database pagination or cursor/keyset pagination for events, bookings, members and audit logs. | Bound page size; avoid loading entire tables into the browser. |
| Remove unused dependencies | Audit package usage, remove dead packages and prefer platform/native APIs where sensible. | Package manager audit and bundle analyzer; review license/security impact before removal. |
| Defer non-critical scripts | Load analytics, chat widgets and other non-essential scripts after interaction/idle or with an appropriate strategy. | Never defer scripts required for auth, accessibility or core booking. |
| Add a loading skeleton | Provide skeletons for calendar grids, booking lists, dashboard summaries and public availability while data loads. | Follow `docs/design.md`; include empty, error and retry states too. |
| Add a load balancer | **Not a separate project task by default.** Use the managed frontend host and Supabase platform routing/scaling. | Do not deploy or operate a self-managed load balancer. Revisit only if measured architecture and hosting requirements demand it. |
| Compress API payloads | Request only required columns/fields; avoid oversized nested payloads; use pagination and compact response shapes. | Supabase/PostgREST and Edge Function responses. Confirm gzip/Brotli behavior at the hosting/platform edge rather than adding custom compression middleware. |
| Add database connection pooling | Use Supabase's managed connection pooler and documented connection modes for supported clients/functions. | Do not create a self-managed pooler. Keep serverless database connection behavior within Supabase guidance. |
| Cache expensive computed results | Cache expensive dashboard aggregates or public metadata with bounded TTL and invalidation. | Use database materialized views/RPC or managed cache options only when justified. Never let cached availability be the final booking authority. |
| Fix N+1 database queries | Batch related reads, use joins/select projections/RPC where appropriate; inspect query count and timings. | Supabase queries and PostgreSQL; add regression tests for query count on hot paths. |
| Enable server-side caching | Use Next.js server-side caching/revalidation for public, non-personalized content and safe static metadata. | Do not cache authenticated pages or private calendar data across users. Keep provider availability fresh and recheck at confirmation. |
| Run a Lighthouse audit | Run Lighthouse on key public and authenticated routes at baseline and before release; record results and regressions. | Include mobile and desktop; pair with real-user Core Web Vitals when available. |

## 3. Cache policy matrix

| Data | Cache policy |
|---|---|
| Hashed static JS/CSS/fonts | Long-lived CDN cache with content-hashed filenames. |
| Public marketing/help content | CDN/server cache with revalidation. |
| Public booking page shell | Cache shell/assets; keep availability response short-lived or uncached according to freshness needs. |
| Authenticated profile/team/booking data | Private, user/tenant scoped; no shared CDN cache. Use short-lived client cache only with identity-aware keys and clear on sign-out/tenant switch. |
| Calendar event details and OAuth tokens | Never public/shared cached. Tokens are never cached in browser storage. |
| Availability/free-busy results | Short-lived at most, scoped to the exact calendars/time range/identity; always recheck authoritatively during booking confirmation. |
| Booking confirmation and writes | Do not serve from cache; enforce idempotency and database transaction/locking. |
| Dashboard aggregates | Cache only if tenant-scoped, bounded TTL, and invalidated/updated after relevant mutations. |

## 4. Suggested rollout order

1. Establish baseline: Lighthouse, Core Web Vitals, bundle analyzer, slow query log/query plans and Edge Function latency.
2. Implement lazy loading, optimize font loading, route bundles and production minification.
3. Add skeletons, debounce search, paginate large lists and reduce measured React re-renders.
4. Inspect database query plans; add appropriate indexes and eliminate N+1 reads.
5. Reduce payload sizes and use Supabase managed connection pooling.
6. Configure CDN/static caching and safe server-side caching with explicit privacy and invalidation rules.
7. Add caching for expensive computed results only after measuring and defining invalidation.
8. Re-run Lighthouse and performance tests; compare against baseline and document regressions.

## 5. Release acceptance criteria

- [ ] Below-the-fold media is lazy-loaded.
- [ ] Routes and heavy components are code-split; production JS/CSS are minified/tree-shaken.
- [ ] Non-critical scripts are deferred without harming core flows.
- [ ] Large lists are paginated and search inputs are debounced where appropriate.
- [ ] Loading skeleton, empty, error and retry states exist on data-heavy screens.
- [ ] React Profiler shows no known avoidable high-impact re-render loops.
- [ ] Hot database queries have reviewed query plans and appropriate indexes; N+1 patterns are removed.
- [ ] Payloads request only necessary fields; Supabase managed pooling is configured appropriately.
- [ ] CDN/server caching has documented TTL, privacy scope and invalidation; private data is never shared-cached.
- [ ] Expensive computed-result caches have bounded TTL and invalidation.
- [ ] No separate load balancer is added unless supported by measured need and an approved hosting design.
- [ ] Lighthouse audits are recorded for key routes on mobile and desktop; agreed performance budgets pass or exceptions are documented.

## 6. Performance budgets (initial targets; confirm after baseline)

Use Core Web Vitals targets as a starting point: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at the 75th percentile where field data is available. Set route-specific JS bundle, image weight, query latency and Edge Function latency budgets after measuring the first working build. Do not claim these targets are met until measured.
