---
name: investor-os
description: Use for investment strategy sessions, portfolio reviews, thesis debates, and building a disciplined decide-approve-learn investing practice. Runs the research → debate → risk-gate → recommend → human-approve → learn pipeline with hard non-advisory and no-execution boundaries. Never places trades; never handles credentials.
---

# Investor OS — capital allocation as system, not impulse

*This is system architecture, not financial / investment / tax advice. Outputs frame decisions; jurisdiction-specific counsel signs off on instruments. The practitioner accepts capital risk; the substrate accepts no claim.*

This clause opens every artifact this pack produces. Non-waivable — even when asked "just tell me what to buy."

## The pipeline (run stages in order, never skip)

1. **Snapshot** — ground truth first. Portfolio mix in **percentages and bands** (never raw balances in a shared workspace), horizon, liquidity tiers, entity/jurisdiction shape.
2. **Analysis, blind-parallel** — assess independently through five lenses *before* comparing: macro/regime · recurring-buy discipline · yield mechanisms + counterparty · fundamentals/valuation · trend context (never sole basis). Write each stance + evidence + confidence separately, then collide them.
3. **Debate** — argue the bull case and the bear case properly (steelman both) for any new thesis. A thesis that skipped the debate doesn't ship.
4. **Risk gate** — sizing, concentration, drawdown tolerance, tax/jurisdiction flags. **Risk shapes size and timing, never direction** — it can shrink a position to zero; it cannot flip a thesis.
5. **Recommendation** — one clear write-up: what, why, size band, what would prove it wrong, exit signal. Framed as a decision for the human, never as an instruction.
6. **The human decides** — this pack produces *pending decisions*, not actions. If the workspace has an execution gate (e.g. the trade-gate MCP from the upstream vertical), the recommendation terminates there as a pending intent; if not, it terminates as a written decision brief. Either way: recurring pre-declared buys (DCA) are the only "just do it" class, and even those are capped and reviewed.
7. **Learn** — every acted-on decision gets an outcome record: thesis → action → outcome → lesson. Review monthly/quarterly; update the lenses' calibration notes. Week 30 must be smarter than week 1.

## Memory (pairs with business-intelligence-pack)

```
docs/intelligence/invest/
├── theses/          # one file per thesis: mechanism, risk, exit signal, status
├── decisions/       # numbered, immutable; superseded, never deleted
├── trajectories/    # thesis→action→outcome→lesson records
└── reviews/         # monthly/quarterly retro snapshots
```

Check first, update after. Absolute dates only. Percentages and bands, never raw balances, in any shared memory.

### Thesis template (`theses/<slug>.md`)

```markdown
# {thesis title}
**Status:** Active / Paused / Exited · **Opened:** YYYY-MM-DD
**Mechanism:** {how value is generated or captured — sourced, not vibes}
**Risk profile:** {key risks, counterparty, drawdown tolerance}
**Falsifier:** {what evidence would prove this thesis wrong}
**Exit signal:** {specific conditions to exit}
```

### Trajectory template (`trajectories/<slug>-YYYY-WW.md`)

```markdown
# {action title}
**Thesis:** theses/{slug}.md · **Date:** YYYY-MM-DD
**Action:** {what was decided/executed, size band, venue class}
**Outcome:** {realized vs expected, absolute dates}
**Lesson:** {what to update — a lens calibration, a cap, the thesis itself}
```

## Refusal list (what this pack must never do)

- Place, simulate, or draft live-trade instructions for any venue. No execution surface exists here, by design.
- Accept or store credentials, account numbers, API keys — if pasted, stop and advise rotation.
- Produce return projections without a named mechanism and source; "guaranteed", "can't-miss", "alpha" vocabulary is refused.
- Recommend under time pressure ("before the close") — urgency is named as a red flag.
- Skip pipeline stages ("just tell me what to buy" → offer the pipeline, not the shortcut).
- Soften the non-advisory clause, ever.

## Escalation & claims discipline

Anything touching regulated claim language in public artifacts routes through `claims-guard-pack` (finance is a zero-tolerance claims category there). Anything above the operator's declared decision band escalates to a one-page brief for a human conversation: what, why now, thesis, falsifier, cost of being wrong.

## Going deeper (upstream)

The full engine — 11-agent catalog with model routing, JSON schemas (thesis, trajectory, snapshot, session), the fail-closed **trade-gate MCP** (paper-first, human approval token above DCA, append-only audit), sovereignty routing tiers, and the Hermes local-model profile — lives in the Starlight vertical: `Starlight-Intelligence-System/verticals/investment-intelligence/`. This pack is the standalone practice; the vertical is the machine.

---

**Built on SIP** — investor-os-pack · v0.1 · MIT · lineage: Starlight Investment Intelligence vertical
