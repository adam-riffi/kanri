# Project Management App – Build Specification

Sep 30, 2026 · @Georges

This specification turns Doc into buildable detail, from the first commit to the last milestone.

## How to use this spec

Build milestone by milestone from the Milestones tab; the other tabs are the reference each milestone draws on.

- Data model: tables and columns per schema, database roles and views.
- API: API conventions, endpoint catalogue and outbound webhooks.
- Screens: every screen with its contents, interactions and states.
- Integrations: GitHub App, pipeline jobs, checks, summaries, Telegram, Cron.
- Operations: environments, secrets, CI/CD, monitoring and backups.
- Milestones: issues and acceptance tests for M1 to M7.

Milestones 4 to 7 depend on what the first three teach you: review their sections before starting each one and record changes here. Values marked as defaults (days, sizes, limits) are starting points, adjustable later.

## Stack and repository layout

TypeScript for the product, Python and SQL for the data work, all in one repository.

| Layer | Choice | Notes |
| --- | --- | --- |
| Web app and API | Next.js (App Router), TypeScript | API route handlers under /api/v1 |
| Validation and contract | Zod schemas | OpenAPI generated from the schemas (e.g., zod-to-openapi) |
| API client | Generated from the OpenAPI document | e.g., openapi-typescript with openapi-fetch |
| Database access | Typed query builder on a dedicated Postgres role | e.g., Drizzle or Kysely |
| UI | Tailwind CSS and an accessible component kit | e.g., shadcn/ui |
| Database | Supabase Postgres | migrations with the Supabase CLI |
| Auth and files | Supabase Auth, Supabase Storage | OAuth with an allowlist hook |
| Event handlers | Supabase Edge Functions (TypeScript) | webhooks, Telegram, dispatcher |
| Pipeline | Python with uv, httpx, pydantic, LiteLLM | runs in GitHub Actions |
| Transformations | dbt Core with the Postgres adapter | staging, marts, snapshots, tests |
| Tests | Vitest, pytest, dbt tests, Playwright | see the conventions below |
| Lint and format | Biome (TypeScript), Ruff (Python) | enforced in CI |
| Packages | pnpm workspaces, uv | versions pinned at setup |

**Repository layout**

- apps/web: the Next.js app and the API route handlers
- packages/domain: Zod schemas, types and domain rules shared by the API and the UI
- packages/api-client: the generated typed client
- supabase: migrations, seed data and Edge Functions (github-webhook, telegram-webhook, dispatcher, refresh-trigger)
- pipeline: Python jobs (backfill, refresh, reconcile, snapshots, summaries, trim) and their tests
- dbt: models, snapshots and tests
- docs: decision records and the progress log
- .github: workflows, pull request template, issue templates

## Engineering conventions

Every change starts from a failing test and lands as a small pull request.

- **Test-first:** each issue's acceptance criteria become tests before any implementation.
- **Test layers:** unit tests for domain rules; API integration tests against the local Supabase stack; dbt tests on every model; Playwright for sign-in, board moves and page edits.
- **Commits:** Conventional Commits (feat, fix, refactor, test, docs, chore, ci), scoped by area: api, web, db, edge, pipeline, dbt.
- **Pull requests:** one issue per pull request, ideally under 400 changed lines; the template asks for a summary, the linked issue, tests, screenshots for UI changes and the agent used.
- **Stacked pull requests on plain GitHub:** each pull request targets the branch below it. Merge from the bottom; the next one is then retargeted to main and rebased.
- **Agent change log:** docs/progress.md, newest entry first: date, pull request, what changed, scope changes. Every pull request adds one entry.
- **Code style:** strict TypeScript without `any`; typed Python checked in CI; SQL with explicit column lists.
- **Migrations:** forward-only, one per change, never edited once applied.
- **API changes:** the Zod schema changes first; the OpenAPI difference is reviewed in the same pull request.

## Definition of done and decisions

A change is done when all of the following hold.

- Acceptance tests pass in CI; lint and type checks are clean.
- Migrations are applied on staging and the preview deployment works.
- OpenAPI and this spec reflect any change in behaviour.
- docs/progress.md has an entry.
- No secret and no private repository content appears in code or logs.

**Decision log:** one short record per decision in docs/decisions (context, decision, consequences). Start with API-first, one owner per item, fixed task states, free tiers, LiteLLM for summaries and Telegram for reminders.

**Open decisions**

- [ ] Login provider: GitHub only, or GitHub and Google
- [ ] Component kit and visual direction for the UI
- [ ] Initial list of free LLM providers and their data-terms flags
- [ ] The app's name, also used for the GitHub App and the Telegram bot
