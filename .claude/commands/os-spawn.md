# /os-spawn — derive a brand instance from the template

Turns `template/` into a specific business's operating system through a guided interview. Pattern lineage: SIS `/vertical-spawn`, adapted for businesses.

**Usage:** `/os-spawn <brand-name>` — run from a fresh instantiation of this template.

## Phase 1 — the interview (one question at a time, wait for answers)

1. **The business in one sentence.** What do you sell, to whom?
2. **The register.** Where does your customer encounter you — gym, office, kitchen, studio? What adjacent aesthetic do you explicitly REFUSE? (This becomes the design contract's spine.)
3. **The regulated territory.** Does your category touch health, finance, food, environmental, or children's claims? (This becomes the claims profile — be thorough here; it's the load-bearing answer.)
4. **Markets + locale.** Which countries first? Metric or imperial? Which English?
5. **The honest differentiator.** What's true about your product that competitors can't say? (Not aspiration — verifiable truth. This seeds the voice.)
6. **The founder's week.** How many hours/week can you actually give this? (Calibrates the weekly rhythm.)

## Phase 2 — derivation (write, in this order)

1. `lib/voice/brand-voice.ts` — banned phrases + blocked claim patterns + approved framing + brand terms, from answers 2/3/5
2. `design.md` + `taste.md` — run the design-contract pack's authoring session using answer 2; update `tailwind.config.ts` to match
3. `CLAUDE.md` — doctrine: identity, the prime rule (their regulated territory), guardians, repo map, anti-patterns
4. `AGENTS.md` + `SKILL.md` — compressed from CLAUDE.md
5. `lib/design-system.ts` — site name, tagline, nav, markets
6. Rewrite all `app/` page copy in the derived voice (every page in the template is structure + placeholder; the copy is yours to write now). Gate everything through `@claims-guard` before finishing.
7. `docs/intelligence/MEMORY.md` + `decisions/0001-{brand}-standard.md` — record the answers as decision record 0001
8. `README.md` — the founder-facing front door (explain the contract files in plain language)

## Phase 3 — verify

1. `pnpm install && pnpm typecheck && pnpm build` — all green
2. `@claims-guard` full-site audit — composite PASS
3. Walk the founder through `GUIDE.md` day-1 onboarding
4. Commit. Deploy is the founder's button (see `docs/ops/DEPLOY.md`).

## Phase 4 — post-spawn checklist (surface to the founder)

- [ ] Add a `LICENSE` to the instance repo (the template's MIT covers the template; the instance picks its own)
- [ ] GitHub repo settings: description, topics, default branch protection if a team works here
- [ ] Vercel: import repo, add domain, env vars in project settings only (`docs/ops/DEPLOY.md`)
- [ ] Email provider decision for `/api/notify` → decision record before wiring
- [ ] Register for harness sync (Foundry installs: automatic; self-serve: open an issue upstream)
- [ ] Calendar: Monday `/weekly-content` (10 min) + Friday `/weekly-review` (15 min) — the rhythm IS the system
- [ ] When stuck: `template/docs/ops/TROUBLESHOOT.md`

## Rules

- One question at a time in Phase 1. The interview IS the product experience.
- Never skip question 3. A wrong claims profile is the only dangerous failure mode this system has.
- Don't invent brand facts. If the founder hasn't decided something, write a TODO into the decision record, not a guess into the doctrine.

---
harness: agentic-business-os@v0.1.0
