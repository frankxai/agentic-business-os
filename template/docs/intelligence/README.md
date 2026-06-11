# {{BRAND}} Business Intelligence

A lightweight, file-based business memory system. Pattern derived from the [Starlight Intelligence System](https://github.com/frankxai/Starlight-Intelligence-System) — markdown-first, no database, every AI session reads and writes it.

## Why this exists

AI sessions are stateless. This directory is the state. A session that checks memory first works like an employee with context; a session that doesn't works like a temp on day one. The discipline:

> **Check memory first. Update memory after.** Future sessions depend on what you record now.

## Structure

| Path | What | Cadence |
|---|---|---|
| `MEMORY.md` | The index — one line per durable fact | Updated every significant session |
| `decisions/` | Numbered decision records | When a real decision is made |
| `market/` | Market research per region/topic | As research happens |
| `weekly/` | Weekly plans + reviews | `/weekly-content` Mondays, `/weekly-review` Fridays |
| `specs/` | One-page feature specs from `@product-architect` | Before any net-new surface |
| `audits/` | `@claims-guard` audit logs | Automatic |

## Rules

1. **One line per entry in MEMORY.md** — detail goes in topic files, the index stays scannable
2. **Decision records are never deleted** — superseded decisions get a `Superseded by: NNNN` line
3. **Convert relative dates to absolute** — "next month" is useless in three months
4. **No secrets here** — supplier pricing, margins, and personal data live outside the repo
