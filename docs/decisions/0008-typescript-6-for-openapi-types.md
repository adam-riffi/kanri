# 0008 - TypeScript 6 for the OpenAPI type generator

Status: accepted (2026-09-30)

## Context
`openapi-typescript` generates `packages/api-client/src/schema.d.ts` from the committed OpenAPI document. It imports the TypeScript JavaScript API, which TypeScript 7, the version the repository pins, does not expose.

## Decision
Keep TypeScript 7 for type-checking and every other tool. In `@pm/api-client` only, alias the `typescript` dev dependency to Microsoft's `@typescript/typescript6` package, so that `openapi-typescript` resolves a compiler that has the API. A `peerDependencyRules` entry in `pnpm-workspace.yaml` allows the version mismatch with the generator's peer range.

## Consequences
- Two TypeScript versions are installed; only the generator uses version 6, and its `tsc6` binary does not clash with `tsc`.
- Generated types are committed, and CI runs `pnpm generate` and fails on any difference, so a change in generator output always shows up in review.
- Exit: once `openapi-typescript` supports TypeScript 7, remove the alias and the `peerDependencyRules` entry, run `pnpm generate` and review the difference.
