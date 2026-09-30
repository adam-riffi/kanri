# 0003 - Fixed task states

Status: accepted (2026-09-30)

## Context
Overview.md lists "fixed task states" among the first decisions. The states themselves are listed in the Data model tab, which is not in the repository yet.

## Decision
Task states are a fixed set defined by the product. Users and projects cannot add, rename or remove states.

## Consequences
- The set of states is defined once in `packages/domain` and reused by the API, the UI and the database constraints.
- Adding a state is a code change with a migration, not a configuration change.
