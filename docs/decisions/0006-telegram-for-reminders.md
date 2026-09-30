# 0006 - Telegram for reminders

Status: accepted (2026-09-30)

## Context
Overview.md includes Telegram and Cron under Integrations and lists `telegram-webhook` and `dispatcher` among the Edge Functions.

## Decision
Reminders are delivered through a Telegram bot.

## Consequences
- The bot is handled by the `telegram-webhook` and `dispatcher` Edge Functions.
- The bot is named after the app, which is still an open decision.
- Delivery rules are defined in the Integrations tab, which is not in the repository yet.
