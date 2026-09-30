# Progress log

Agent hand-off log shared by all agents. Newest entry first; earlier entries are never edited.
Each entry: date, agent, branch or PR, changes made, scope changes and decisions (with reasons), open questions and next steps.

## 2026-09-30 - GitHub Copilot - feat/4-openapi-client (#8)

**Changes**
- Added the API-first chain: `buildOpenApiDocument()` in `packages/domain` (zod-to-openapi, OpenAPI 3.1), a committed `packages/domain/openapi.json`, and `packages/api-client` with generated types and `createApiClient` (openapi-fetch). Each behaviour was written test-first.
- CI now runs `pnpm generate` and fails if any tracked file changes.

**Scope changes and decisions**
- Only `GET /api/v1/health` is described; errors, pagination and authentication wait for the API tab of the specification.
- The contract (Zod schemas and OpenAPI registry) lives in `packages/domain`, so dependencies run domain, then api-client, then web, with no cycles.
- Relative imports in `packages/domain` use the `.ts` extension so Node can run the generator natively, which avoids a TypeScript runner dependency (`allowImportingTsExtensions` is set in the base config).
- `openapi-typescript` needs the TypeScript JS API, which TypeScript 7 does not expose. `@pm/api-client` aliases `typescript` to `@typescript/typescript6` (Microsoft's TypeScript 6 package; its `tsc6` binary does not clash with `tsc`). The repo keeps TypeScript 7 for type-checking, and a `peerDependencyRules` entry records the intentional mismatch. Remove the alias once openapi-typescript supports TypeScript 7.
- Biome skips the two generated files (`openapi.json`, `schema.d.ts`); the drift test and the CI diff step guard them instead.
- Zod metadata (`.meta({ id })`) names the OpenAPI component, so `extendZodWithOpenApi` is not needed.

**Open questions and next steps**
- The bootstrap stack is complete (#5 to #8). Merge bottom-up; after each squash-merge, rebase the next branch onto `main` and retarget its PR.
- Enable branch protection on `main` with the `typescript` check once #6 is merged (needs approval).
- Map the M1 issues onto this foundation when the Milestones tab is available; Python, dbt and Supabase are still deferred.

## 2026-09-30 - GitHub Copilot - feat/3-web-health-endpoint (#7)

**Changes**
- Added `apps/web` (Next.js 16, App Router, TypeScript, Tailwind CSS) with a placeholder home page, and `GET /api/v1/health` (written test-first) backed by `healthResponseSchema`.

**Scope changes and decisions**
- The scaffold was reduced to the minimum: no sample assets, no Google fonts (the build would need network access), no component kit (open decision) and no linter config (Biome runs at the root).
- The layout uses an explicit `ReactNode` prop type instead of the generated `LayoutProps`, so `pnpm typecheck` passes before `next build` has generated types.
- `next-env.d.ts` is generated and ignored; the `@/*` import alias was dropped because nothing uses it.
- TypeScript 7 works with Next.js 16.3.7 (`next build` passes), so no build-time type check is bypassed.
- `create-next-app` does not create missing parent folders: create `apps/` first.

**Open questions and next steps**
- Next: #4 (OpenAPI document and typed client from Zod).
- Decide the component kit and visual direction (open decision) before building screens.

## 2026-09-30 - GitHub Copilot - chore/2-ts-tooling-ci (#6)

**Changes**
- Added the pnpm workspace, strict TypeScript base config, Biome, Vitest and `packages/domain` with its first rule, `healthResponseSchema` (written test-first).
- Added CI: one `typescript` job (frozen install, check, typecheck, test, build) on every pull request and on pushes to `main`.

**Scope changes and decisions**
- Every tool version is pinned exactly (pnpm 12.8.1, Node 24.13.0, TypeScript 7.0.2, Vitest 5.0.2, Biome 2.5.14, Zod 4.6.5), so updates are explicit and reviewable.
- The `pull_request` trigger has no branch filter, so stacked pull requests are checked even though they do not target `main`.
- Tools are root dev dependencies shared by all packages; packages declare only their own runtime dependencies.
- The editor on this machine writes CRLF: run `pnpm format` (Biome, LF) before committing; `.gitattributes` keeps LF in git.
- Biome 2.5 deprecates `recommended`, so the config uses `preset: "recommended"`.

**Open questions and next steps**
- Next: #3 (Next.js app with health endpoint), then #4 (OpenAPI document and typed client).
- After this PR merges, enable branch protection on `main` with `typescript` as a required check (not enabled yet; needs approval).

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
