---
name: business-intelligence
description: Use for any business strategy, decision, or review work. Maintains a file-based business memory — decision records, market notes, weekly snapshots — so every session starts with context instead of amnesia. Check memory first, update memory after.
---

# Business Intelligence — the compounding memory

AI sessions are stateless. This skill makes the *workspace* the state.

## The structure (create on first use)

```
docs/intelligence/
├── MEMORY.md          # the index — ONE line per durable fact
├── decisions/         # numbered records: 0001-, 0002-, …
├── market/            # research notes per region/segment/competitor
├── weekly/            # weekly plan + review snapshots
└── specs/             # one-page feature/initiative specs
```

(In Claude.ai Cowork without a repo: replicate this as project documents with the same names.)

## The discipline

1. **Check first.** Before any strategy/decision/review work, read `MEMORY.md` and any linked file the task touches.
2. **Update after.** Every session that learns or decides something durable writes back: an index line, a decision record, or a weekly entry.
3. **Decision records are immutable.** Never delete; supersede with a `Superseded by: NNNN` line. The trail of changed minds is itself intelligence.
4. **One line per index entry.** Detail goes in topic files; the index stays scannable in 30 seconds.
5. **Absolute dates only.** "Next quarter" is useless in six months.
6. **No secrets.** Margins, supplier pricing, personal data stay out of shared memory.

## Decision record template

```markdown
# NNNN — {title}
**Date:** YYYY-MM-DD · **Status:** Ratified · **Superseded by:** —

## Decision
{what was decided, numbered if multiple}

## Why
{the reasoning that future-you will have forgotten}

## Consequences
{what this commits us to, including the uncomfortable parts}
```

## Weekly snapshot

Monday: 3 planned items max (a plan that doesn't fit a founder's real week is theatre). Friday: shipped / stalled+why / learned / memory lines updated. 15 minutes. The Friday step is what makes week 30 smarter than week 1.

---
harness: agentic-business-os@v0.1.0 · MIT · lineage: Starlight Intelligence System
