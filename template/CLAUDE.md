# {{BRAND}} — Claude Code Configuration v1.0

> **TEMPLATE — derived by `/os-spawn`.** Every `{{...}}` marker below is replaced during the derivation interview. This file is the deepest system prompt for any AI agent in this repo; `AGENTS.md` is the short cross-tool contract; `SKILL.md` is the operating skill. When in doubt, this file wins.

---

## What {{BRAND}} is

{{ONE_PARAGRAPH — what the business sells, to whom, and the honest differentiator. No superlatives; verifiable statements only.}}

**Market:** {{MARKETS}}. {{LOCALE_CONVENTIONS — e.g. "Metric only, Celsius only, international English."}}

**Brand:** {{REGISTER — e.g. "urban gym, not wellness spa"}}. The full voice contract lives in `lib/voice/brand-voice.ts` — the single source of truth for banned phrases and claim rules. Never duplicate those lists; import them.

---

## THE PRIME RULE — {{REGULATED_TERRITORY}}

{{Derived from /os-spawn question 3. State plainly: which claim category is regulated for this business (health / environmental / financial / food), what framing is approved, what is blocked outright. Example shape:}}

- Approved framing: "designed around the research on…", "studies have observed…"
- Blocked outright: see `BLOCKED_CLAIM_PATTERNS` in `lib/voice/brand-voice.ts`
- Every factual claim carries a citation in the same section
- `@claims-guard` gates every publish. A FAIL is final until a human rewrites. No exceptions for social copy, ads, or "the competitor says it".

This rule is the brand's moat, not its handicap. Honest framing is what builds trust in a category full of overstatement.

---

## Design contract (read before any UI work)

Two files at repo root govern every visual decision:

- **`design.md`** — tokens (colors, typography, spacing, radii) + do's/don'ts. Mirrors `tailwind.config.ts`.
- **`taste.md`** — references, the refusal list, the restraint test, the polish pass.

Frozen identity decisions: {{LIST — e.g. "dark-first, one leading accent per viewport, square corners, data in mono".}}

---

## Guardians — gates before anything ships

| Gate | When | What |
|---|---|---|
| `@claims-guard` | Before ANY copy publishes | Claims + voice + slop + citation audit. Blocking. |
| `pnpm typecheck && pnpm build` | Before any deploy push | Must be clean. |
| The polish pass (`taste.md`) | Before any visual ships | Manual walk. |
| `/claims-check <file>` | On demand | Single-file claims audit. |

Agents lead on routine work (commit, branch, refactor) but **always stop and ask a human** before: production deploys, sending email, posting to social, pricing changes, or any externally visible side effect.

---

## Business intelligence (docs/intelligence/)

`MEMORY.md` (index, one line per fact) · `decisions/` (numbered, never deleted — superseded) · `market/` · `weekly/` (the rhythm) · `specs/`.

**Check memory first, update memory after.** Future sessions depend on what you record now.

---

## Anti-patterns (never)

- ❌ {{REGULATED_TERRITORY}} claim language anywhere, in any language
- ❌ Auto-posting to social or sending email without a human go
- ❌ New design values outside `design.md`
- ❌ Fake urgency (timers, strike-through prices, fabricated scarcity)
- ❌ Deleting decision records — supersede them

---

_Harness: [agentic-business-os](https://github.com/frankxai/agentic-business-os) · Lineage: frankx.ai / ACOS / Starlight Intelligence System._
