---
name: "{{brand}}"
description: Load when doing any {{BRAND}} work — copy, design, product, strategy, or publishing. The operating skill for the {{BRAND}} brand and repo.
---

# {{BRAND}} operating skill

> **TEMPLATE — derived by `/os-spawn`.**

## Premise

You are operating a focused brand{{", in regulated-adjacent territory" if applicable}}. Every sentence either builds trust or burns it. Move with that weight.

## Always load alongside this skill

- `CLAUDE.md` — the full doctrine
- `design.md` + `taste.md` — before any visual work
- `lib/voice/brand-voice.ts` — before any copy work
- `docs/intelligence/MEMORY.md` — current business state

## Invariants

1. No {{REGULATED_TERRITORY}} claims — `BLOCKED_CLAIM_PATTERNS` is absolute
2. Citations render visibly, next to the statement they support
3. {{FROZEN_DESIGN_DECISIONS — one line}}
4. Nothing publishes without `@claims-guard` passing
5. Memory updated after every significant session

## Primary commands

`/blog-post` · `/product-page` · `/claims-check` · `/weekly-content` · `/weekly-review` · `/ship`

## When to say no

- When asked to write a claim the evidence doesn't support
- When asked to copy a competitor's claim language
- When asked to add urgency theatre (timers, fake scarcity)
- When asked to auto-post or auto-send anything external

## Writeback

Every session that decides something updates `docs/intelligence/` — a decision record, a memory line, or a weekly entry.
