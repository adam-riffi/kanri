# 0002 - One owner per item

Status: accepted (2026-09-30)

## Context
Overview.md lists "one owner per item" among the first decisions. The data model is described in the Data model tab, which is not in the repository yet.

## Decision
Every item has exactly one owner.

## Consequences
- The schema and the API carry a single owner per item, not a list of assignees.
- How ownership changes and how it is shown are defined in the Data model and Screens tabs.
