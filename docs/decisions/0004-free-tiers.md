# 0004 - Free tiers

Status: accepted (2026-09-30)

## Context
Overview.md builds on Supabase (Postgres, Auth, Storage, Edge Functions), GitHub Actions for the pipeline and free LLM providers for summaries.

## Decision
Start on the free tiers of these services.

## Consequences
- Service limits (database size, function invocations, Actions minutes, LLM rate limits) are design constraints.
- Values marked as defaults in the specification (days, sizes, limits) are starting points that can be adjusted later.
- The initial list of free LLM providers and their data-terms flags is still an open decision.
