# Harness sync — how upstream improvements reach this repo

This instance descends from [agentic-business-os](https://github.com/frankxai/agentic-business-os). When the upstream harness improves — a sharper gate, a new agent — updates flow here without overwriting anything this brand owns.

## The ownership split

| Tier | Files | Owner | Sync behavior |
|---|---|---|---|
| **Instance-owned** | `CLAUDE.md`, `AGENTS.md`, `SKILL.md`, `design.md`, `taste.md`, `lib/voice/*`, all of `app/` `content/` `docs/intelligence/` | This business | **Never overwritten.** Upstream suggestions arrive as prose in a PR description, not as diffs. |
| **Upstream-managed** | `.claude/agents/*.md`, `.claude/commands/*.md` | agentic-business-os | Updatable. Each carries a provenance footer with its harness version. Sync opens a PR; a human merges. |

The principle: **brand is yours, machinery is shared.**

## How an update arrives

1. Upstream tags a release with a changelog
2. A sync PR appears here: changed harness files + plain-language changelog
3. You read the markdown diffs in the GitHub UI, merge or decline per file
4. Nothing auto-merges. Ever. Declining is always safe — the next sync simply offers it again.

## Current state

- Harness version: `agentic-business-os@v0.1.0`
- Registered downstream: yes (see upstream `downstreams.json`)
