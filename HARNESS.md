# HARNESS.md — the ownership contract

Every instance of the Agentic Business OS splits its files into two tiers. This split is the product's central promise: **brand is yours, machinery is shared.**

## The split

| Tier | Files | Owner | Sync behavior |
|---|---|---|---|
| **Instance-owned** | `CLAUDE.md`, `AGENTS.md`, `SKILL.md`, `design.md`, `taste.md`, `lib/voice/*`, all of `app/`, `content/`, `docs/intelligence/` | The business | **Never overwritten.** Upstream suggestions for these arrive as prose in a PR description, never as diffs. |
| **Upstream-managed** | `.claude/agents/*.md`, `.claude/commands/*.md` | This repo | Updatable. Each file carries a provenance footer (`harness: agentic-business-os@vX.Y.Z`). Sync opens a PR; a human merges. |

## How an update arrives

1. Upstream tags a release here (`vX.Y.Z`) with a changelog
2. `scripts/harness-sync.mjs` opens a PR on each registered downstream (`downstreams.json`): changed harness files + the changelog, in readable markdown
3. The instance owner reads the diff in the GitHub UI, merges or declines per file
4. **Nothing auto-merges. Ever.** Declining an update is always safe — the next sync PR simply includes it again.

## Registering a downstream

Foundry-installed instances are registered automatically. Self-serve instances can request registration by opening an issue here with their repo URL, or run the sync manually:

```bash
GH_TOKEN=<token> node scripts/harness-sync.mjs --repo <owner>/<repo>
```

## Instance obligations (what keeps sync working)

- Don't move `.claude/agents/` or `.claude/commands/` — the sync diffs those paths
- Don't strip provenance footers — they're how the sync knows what version you're on
- Local edits to upstream-managed files are allowed (it's your repo) — the next sync PR will show your edit as a conflict diff and you choose which side wins

## The principle, stated once

The voice file, the doctrine, the design tokens — those ARE the business. The gate logic and command pipelines — those improve for every instance at once. The line between them is this contract, and the contract only moves by a new major version with explicit consent.
