# Progress log

Agent hand-off log shared by all agents. Newest entry first; earlier entries are never edited.
Each entry: date, agent, branch or PR, changes made, scope changes and decisions (with reasons), open questions and next steps.

## 2026-09-30 - GitHub Copilot - chore/1-repo-foundation (#5)

**Changes**
- Created the public repository `adam-riffi/kanri` with one empty root commit on `main`; all other work goes through pull requests.
- Repository settings: squash-merge only, with the squash commit title taken from the PR title and the body from the commit messages.
- Added `.gitignore`, `.gitattributes`, `Overview.md` and `Guidelines.md` (unchanged), decision records in `docs/decisions/`, pull request and issue templates, and this log.

**Scope changes and decisions**
- Bootstrap only. The Milestones, Data model, API, Screens, Integrations and Operations tabs are not in the repository, so there is no schema and no feature work yet.
- Two progress logs with different purposes (decision 0007): this file is the agent hand-off log required by `Guidelines.md`; `docs/progress.md` is the project change log required by `Overview.md`. Each pull request adds one entry to each.
- The empty root commit is the only direct commit to `main`, because a pull request needs an existing base branch.
- The repository is public, so commits use the GitHub noreply address instead of a personal email.
- `/PR/` (local meme pictures) is ignored so third-party images are never committed.
- The package scope stays the placeholder `@pm`: the repository name does not settle the app name, which is still an open decision.
- Python, dbt, Supabase, Playwright and the component kit wait until they have real content.

**Open questions and next steps**
- Next: #2 (TypeScript workspace, tooling and CI), then #3 (web health endpoint) and #4 (OpenAPI and typed client).
- Branch protection for `main` is not enabled yet; add it with the required `typescript` check once CI exists.
- Map the M1 issues onto this foundation when the Milestones tab is available.
- Decide whether the `@pm` scope should follow the repository name.
