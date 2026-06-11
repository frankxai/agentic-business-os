---
name: design-contract
description: Use when creating or auditing a brand's visual identity. Authors the two-file design contract — design.md (machine-readable tokens) + taste.md (judgment) — that makes every future AI session produce on-brand visuals instead of generic AI design.
---

# Design Contract — tokens + judgment, two files

A design system that lives in one person's head dies with their attention. This skill externalizes it into two files every coding agent reads before any visual work.

## The architecture

- **`design.md`** — YAML frontmatter of tokens (colors, typography, spacing, radii, shadows, component bindings) + prose do's/don'ts. Shape follows the Google Labs DESIGN.md spec. If a value isn't in this file, it doesn't exist.
- **`taste.md`** — what tokens can't capture: 5–8 reference brands *with the reason each is on the list*, the refusal list (the brand's specific AI-slop), the restraint test, a polish pass checklist.

Tokens make a system consistent. Taste makes it excellent. The answer is usually less.

## Authoring session (run as an interview)

1. **Register before palette.** Ask: where does the customer encounter this brand — at night? at work? in a gym? The register (e.g. "urban gym, not wellness spa") decides everything downstream.
2. **Foundation ladder.** 4 background steps, ~3% luminance apart. Dark-first or light-first is a frozen decision — make it consciously.
3. **One leading accent.** Exactly one loud color, used once per viewport. A supporting accent for a second content register. More than two accents is decoration.
4. **Ink at reduced alpha.** Body text at ~65% of full ink — full-strength text everywhere reads as a screenshot, not a design.
5. **Type: 2–3 faces, each with one job** (display / body / data). Name the job in the file.
6. **One signature shape decision.** Pill CTAs or square plates; pick one and freeze it. Recognizability lives in shape, not color.
7. **The refusal list.** Ask: "what does lazy AI design look like in YOUR category?" (spa-pastel for fitness, rocket emoji for SaaS, stock handshakes for B2B). Ban it by name.
8. **Write the polish pass.** Squint test, mobile test, contrast test, keyboard test, reading-aloud test, compress test — adapted to the brand.

## Frozen-decision discipline

`taste.md` carries a "What we've already decided" section. Items there are not relitigated without explicit cause — that's what stops drift across hundreds of future sessions.

## Audit mode

Given an existing page/design: check every value against `design.md` tokens, every choice against the `taste.md` refusal list, run the polish pass, return a violations table with file:line.

---
harness: agentic-business-os@v0.1.0 · MIT · lineage: frankx.ai design contract
