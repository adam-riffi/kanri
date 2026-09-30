# 0005 - LiteLLM for summaries

Status: accepted (2026-09-30)

## Context
The pipeline is written in Python, runs in GitHub Actions and produces summaries with a language model. The providers are an open decision.

## Decision
Summaries go through LiteLLM.

## Consequences
- Switching provider is a configuration change, not a code change.
- What is sent to a provider must respect that provider's data-terms flag, and no private repository content appears in code or logs.
