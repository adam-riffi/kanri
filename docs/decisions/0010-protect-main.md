# 0010 - Protect the default branch

Status: accepted (2026-10-01)

## Context
`Guidelines.md` forbids direct commits to the default branch and asks for CI on every pull request, but nothing enforced either rule, and the agents working in this repository can push to any branch.

## Decision
Protect `main` with GitHub branch protection, set through the API on 2026-10-01:
- A pull request is required. No approvals are required, because a single owner cannot approve their own pull requests.
- The `typescript`, `e2e` and `python` checks must pass; each is added to the list when its job lands. The branch need not be up to date with `main`, so a pull request is not blocked when `main` moves on.
- History stays linear, and force-push and deletion are blocked.
- The rules apply to administrators too.

Only checks that run on every pull request may be required: a check that a path filter can skip would block merges.

## Consequences
- Nobody, the owner included, can push to `main`; every change is a pull request with green checks.
- A broken or renamed required check blocks all merges until the rule is updated (Settings, Branches, or `PUT /repos/{owner}/{repo}/branches/main/protection`).
- A job that should gate merges is added to the required list when it lands; that is a settings change, not a file change.
