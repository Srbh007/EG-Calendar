# Performance Baselines & Budgets

**Date:** 2026-10-31
**Phase:** 9.1

## Core Web Vitals (Mobile/Desktop Target)
- **LCP (Largest Contentful Paint):** < 2.5s (Target: < 1.2s for Booking Page)
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

## Database & Latency
- **Slow Query Definition:** Any query > 500ms
- **Edge Function Latency Budget:**
  - OAuth exchanges: < 2000ms
  - Slot calculation (`booking-slots`): < 1000ms
  - Booking confirm (`booking-confirm`): < 1500ms (includes provider sync)

## Bundle Budgets
- App route chunks: < 150KB (parsed)
- Initial load JS: < 300KB (parsed)

**Status:** Baselines recorded and approved.
