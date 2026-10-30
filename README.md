# Unified Scheduler — Project Documentation

This folder contains the initial planning and design documentation for Unified Scheduler, a multi-tenant SaaS platform for unified Google/Zoho calendar availability and public meeting booking.

## Documentation

The six required project documents are in `docs/`:

1. `prd.md` — product scope, users, requirements, user stories, and acceptance criteria.
2. `architecture.md` — system boundaries, proposed stack, data model, API contract, availability flow, and operations.
3. `rules.md` — engineering, security, tenancy, calendar, testing, and review rules.
4. `design.md` — design tokens, navigation, screen-by-screen UI specifications, components, responsive behavior, and QA.
5. `task.md` — technical task-plan templates and initial proposed implementation plans.
6. `memory.md` — decisions, risks, patterns, and change log.

`CLAUDE.md` at the repository root instructs Claude Code to read the project docs and follow the approved task plan.

## Important status

These files are a complete initial planning/design baseline, not evidence that the application or provider integrations have been implemented. The proposed technology choices and provider capabilities must be confirmed by the CTO. Replace `NTF-TBD` task headings with real Notify card IDs and obtain plan approval before coding.

## Core booking rule

A booking link checks all calendars selected for conflict detection, but creates a confirmed event in only one explicitly selected destination calendar. Availability and booking confirmation are backend-authoritative.
