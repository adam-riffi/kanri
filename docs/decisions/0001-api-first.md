# 0001 - API first

Status: accepted (2026-09-30)

## Context
Overview.md makes the Zod schemas the contract, generates the OpenAPI document from them and the typed client from that document. Route handlers live under `/api/v1`.

## Decision
The API is contract-first. A change starts with the Zod schema, then the OpenAPI document, then the generated client. The OpenAPI difference is reviewed in the same pull request.

## Consequences
- The typed client is generated, never hand-written.
- Generated artifacts are verified in CI so they cannot drift from the schemas.
- Endpoint details and conventions live in the API tab of the specification, which is not in the repository yet.
