# 0013 - dbt project skeleton and local profile

Status: accepted (2026-10-01)

## Context
`Overview.md` puts the transformations in dbt Core with the Postgres adapter, in a `dbt` folder, and asks for dbt tests on every model. The models wait for the Data model tab, and hosted databases wait for the owner's tokens and the Operations tab.

## Decision
- `dbt/` is its own uv project (not packaged) with exact-pinned dbt Core and Postgres adapter and a committed `uv.lock`. It is separate from `pipeline/` so that dbt's large dependency tree cannot conflict with the pipeline's, and each has its own lockfile.
- `dbt/profiles.yml` is committed and reads every setting from environment variables. The `local` target's defaults are the Supabase CLI's local database, which is public and not a secret. Hosted targets will be separate targets without defaults, and no hosted credential is ever written in the repository.
- Anonymous usage statistics are off in `dbt_project.yml`.
- A `dbt` workflow runs when dbt or Supabase files change: it starts the local database, then `dbt parse` and `dbt debug` must succeed. It is not a required check, because it is path-filtered (decision 0010).

## Consequences
- The models arrive with the Data model tab, each with dbt tests, and `dbt build` joins the workflow then.
- The default schema `analytics` is a placeholder until that tab names the schemas; `DBT_SCHEMA` overrides it.
