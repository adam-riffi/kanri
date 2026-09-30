# 0011 - Supabase CLI in the repository and a migration check in CI

Status: accepted (2026-10-01)

## Context
`Overview.md` makes Supabase Postgres the database, with migrations managed by the Supabase CLI, and asks for API integration tests against the local Supabase stack. The owner creates the hosted project later, so until then only the local stack can be used.

## Decision
- Install the CLI as an exact-pinned dev dependency (`pnpm exec supabase`) rather than globally, so every machine and every CI run uses the same version. Pick a release that is older than pnpm's minimum release age, so no exclusion is needed.
- Commit `supabase/config.toml` for the local project `kanri`; the `.gitignore` that the CLI generates keeps local state out of git.
- A separate workflow, `Supabase`, runs when Supabase files change: it starts the local database, rebuilds it with `supabase db reset` (all migrations and the seed on a clean database) and lints the schema. Telemetry is off in CI.
- The job is not a required check: it is path-filtered, and a skipped required check would block merges (decision 0010).

## Consequences
- Every migration is applied to a clean database before it merges.
- Upgrading the CLI is an ordinary dependency change that the same job verifies.
- Linking to the hosted project and deploying migrations are not set up yet: they need the owner's tokens and the Operations tab.
