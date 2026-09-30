# Engineering baseline

These rules apply to every project. Repository-level instructions and established project conventions take precedence when they conflict.

## General
- Keep changes scoped to the task: no unrelated refactors, renames or reformatting.
- Follow the existing structure and patterns of the codebase before introducing new ones.
- Choose the simplest solution that meets the requirements; no speculative abstractions.
- Add a dependency only when clearly justified, and state why.

## Progress log
- Every repository has a `PROGRESS.md` at its root, shared by all agents; create it if it is missing.
- Read its latest entries before starting any task.
- Each task adds one entry at the top, committed in the task's PR: date, agent, branch or PR, changes made, scope changes and decisions (with reasons), open questions and next steps.
- Keep entries concise and never edit or delete earlier ones. When resolving merge conflicts in this file, keep both sides.

## Readability
- Optimize for the reader: clarity over cleverness, explicit over implicit.
- Keep functions short and single-purpose; prefer early returns to deep nesting.
- Replace magic numbers and strings with named constants.
- Leave formatting to the project's formatter and linter.
- Before finishing, remove dead code, commented-out code and debug output.

## Naming
- Follow the language's idiomatic conventions (e.g. camelCase in TypeScript, snake_case in Python).
- Use descriptive, intention-revealing names; avoid abbreviations other than common ones (`id`, `url`).
- Functions start with a verb (`fetchUser`), booleans read as predicates (`isActive`, `hasAccess`), and collections are plural.
- Use one term per concept across the codebase; single-letter names only for trivial loop indices.

## Comments
- Comment sparingly: explain why (intent, constraints, trade-offs), never restate what the code does.
- Document public functions, classes and modules using the language's documentation convention (docstrings, JSDoc).
- Comments describe the code as it is, not its history: no "changed", "new" or "fixed" notes.
- Every TODO references an issue.
- Update or delete comments when the code they describe changes.

## Development and testing (TDD)
- Develop test-first, in small red–green–refactor cycles:
  - Red: write a failing test for the next small behavior; run it and confirm it fails for the expected reason.
  - Green: write the minimum code that makes it pass.
  - Refactor: improve the design while all tests stay green.
- Bug fixes start with a failing test that reproduces the bug.
- Commit at green; refactoring goes in separate commits.
- Where test-first is impractical (configuration, exploratory spikes, visual styling), state why in the PR and add tests afterwards where meaningful.
- Mostly fast unit tests, fewer integration tests, end-to-end tests for critical paths only.
- Test behavior through public interfaces; mock only at system boundaries (network, filesystem, time).
- Tests are deterministic and independent of one another and of execution order.
- Name each test after the behavior it verifies.

## CI and verification
- Every repository's CI runs the applicable checks (format, lint, type-check, tests, build) on every pull request, whatever its base branch.
- Before declaring a task complete, run these checks and report the results.
- Never weaken a check to make it pass (skipping or deleting tests, loosening assertions, adding ignore directives or lowering thresholds). If a check cannot pass, stop and explain why.

## Commits
- Conventional Commits: `type(scope): summary` (feat, fix, refactor, test, docs, chore, ci).
- One logical change per commit; the build and tests pass at every commit.
- Imperative mood, summary of 72 characters or fewer; the body explains why.
- Never commit secrets, credentials or `.env` files.
- Never commit directly to the default branch. Force-push only your own PR branches, and only with `--force-with-lease`.

## Pull requests
- Branch naming: `type/<issue-number>-short-description`.
- One purpose per PR, small enough to review in one sitting; split larger work into a stack.
- The PR title follows the commit convention, as it becomes the squash-merge commit.
- The description covers summary, motivation, changes, testing performed, risks and the linked issue (`Closes #<number>`).
- Review your own diff before marking the PR ready; keep it as a draft until all checks pass.
- Never merge your own PR.

### Stacked PRs
- Each PR in a stack targets the branch of the PR below it; the bottom PR targets the default branch.
- Every PR in the stack builds, passes all checks and makes sense on its own.
- The description states the PR's position and neighbors (e.g. "Stack 2/3 — depends on #41, followed by #43").
- When a lower PR changes, restack the branches above it (`git rebase --update-refs`).
- Stacks merge bottom-up. After a PR is squash-merged, rebase the next branch onto the default branch (`git rebase --onto`) and retarget its PR.