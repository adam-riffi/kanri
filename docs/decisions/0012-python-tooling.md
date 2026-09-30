# 0012 - Python tooling for the pipeline

Status: accepted (2026-10-01)

## Context
`Overview.md` puts the data work in Python with uv, Ruff and pytest and asks for typed Python checked in CI, but it names no type checker. The jobs wait for the Integrations tab, so only the toolchain can be set up now.

## Decision
- `pipeline/` is a uv project with a `src` layout, a committed `uv.lock`, an exact Python version in `.python-version` and exact-pinned dev dependencies.
- Ruff lints and formats, pyright in strict mode checks types and pytest runs the tests. Pyright is also what Pylance uses in the editor, so the editor and CI agree.
- A `python` job in `ci.yml` runs all four on every pull request, with uv pinned in the workflow. It is added to the required checks of decision 0010.
- The runtime dependencies named in `Overview.md` (httpx, pydantic, LiteLLM) are added by the first job that uses them.

## Consequences
- A second toolchain to keep current: `uv.lock`, the pins and the workflow change together.
- The only test proves the toolchain wiring (the package is installed); the first job replaces it with real tests.
