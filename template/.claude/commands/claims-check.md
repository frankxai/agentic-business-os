# /claims-check — audit one file against the claims standard

**Usage:** `/claims-check <file-or-glob>` · no argument = audit everything in `app/` + `content/`

Dispatch `@claims-guard` on the target. Print the 5-gate report inline. If FAIL: list each violation with the `APPROVED_FRAMING` rewrite suggestion, and remind that Gate 1 hits require a human rewrite — the agent must not auto-fix health-claim language, because choosing the replacement framing is an editorial judgment.

Log to `docs/intelligence/audits/`.

---
harness: agentic-business-os@v0.1.0
