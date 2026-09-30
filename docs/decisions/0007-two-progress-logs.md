# 0007 - Two progress logs

Status: accepted (2026-09-30)

## Context
Guidelines.md requires a `PROGRESS.md` at the repository root that all agents share. Overview.md requires `docs/progress.md`. The project owner confirmed that the two serve different purposes.

## Decision
Keep both logs.
- `PROGRESS.md` is the agent hand-off log: what changed, decisions with reasons, open questions and next steps.
- `docs/progress.md` is the project change log: what changed and scope changes, linked to the pull request.

Each pull request adds one entry to each, newest first, and earlier entries are never edited.

## Consequences
- Two short entries per pull request.
- The project change log stays brief; hand-off detail lives in the root log.
