# 0009 - Native type stripping for scripts

Status: accepted (2026-09-30)

## Context
Repository scripts, such as the OpenAPI generator in `packages/domain/scripts`, are written in TypeScript and import the domain code. Running them needs either a TypeScript runner or a runtime that understands TypeScript.

## Decision
Run scripts directly with `node` (24 or later), which strips type annotations without a loader or a flag. Relative imports between TypeScript files in `packages/domain` carry the `.ts` extension, which `allowImportingTsExtensions` permits in `tsconfig.base.json`. `verbatimModuleSyntax` is already on, so type-only imports use `import type`, as type stripping requires.

## Consequences
- No runner dependency (tsx, ts-node) to pin and update.
- Code that a script imports may only use erasable syntax: no enums, no namespaces with runtime code and no parameter properties. Node rejects them at run time, and the `pnpm generate` step in CI catches it.
- The minimum Node version matters: `engines` and `.node-version` both require 24.13.0.
- Revisit if scripts need something type stripping lacks, such as path aliases or enums, and adopt a runner then.
