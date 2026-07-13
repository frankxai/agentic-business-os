# Changelog

All notable changes. Versions follow semver; every release here can trigger sync PRs to registered downstream instances (see `HARNESS.md`).

## Unreleased — AI-Native Business Foundry foundation

- Added the Autonomous Product Foundry master plan, product ladder, provider-neutral control-plane architecture, partner/venture economics, premium experience spec, and proof-gated blitzscale roadmap
- Added a machine-readable autonomy/product/agent/credit/commerce/venture control plane with dependency-free policy validation and negative self-tests
- Added a dependency-free reference package for entitlement state, replay-safe normalized commerce events, append-only credit grants/reservations/settlements/releases, overspend stops, refund/revoke, failed-run recovery, and redacted receipts, with 17 passing tests
- Replaced the future implementation-fee direction with agent-delivered outcomes and a no-human-implementation licensing gate; retained the prior plan as explicitly marked historical context
- Added queue-compatible coordinator, entitlement/credit, activation/analytics, and independent-verifier job packets held outside the live Queen inbox while PP admission is `HOLD`
- Recorded current runtime truth: no production Vercel Agent Run projects were observed in the preceding 30 days, so Eve and hosted Foundry agents remain design-only
- Added the AI-Native Business Pathfinder portable skill, route matrix, proof-plan template, and harness command/agent
- Added a machine-readable Foundry product registry with schema and validation
- Added the GitHub estate audit, master strategy, offer/community architecture, capability router, team contract, and 90-day execution plan
- Added governance CI for pack and product-registry validation; hardened template CI concurrency, draft gating, and timeouts
- Added the first blind Pathfinder forward-test receipt; remaining audience tests stay explicitly gated
- Tightened public claims so the repository is described as a reusable starting point, not a legal, regulatory, or revenue guarantee

## v0.1.2 — 2026-06-11 · governance + CI

- `template-ci.yml`: every change to `template/` is build-verified (install → typecheck → build)
- `harness-sync.yml`: graceful no-op when `SYNC_TOKEN` secret is unset (no red runs)
- Governance shell: CONTRIBUTING, SECURITY, issue templates (bug / feature / pack submission), PR template, CODEOWNERS
- `packs/README.md` + per-pack `harnessVersion` in the registry
- `HARNESS.md`: maintainer section (release tagging, what triggers sync, how downstreams defer)
- `template/docs/ops/TROUBLESHOOT.md` + post-spawn checklist in `/os-spawn`
- Harness files unchanged — **no sync PRs expected from this release**

## v0.1.1 — 2026-06-11 · sync-stable harness

- All 11 upstream-managed harness files (`.claude/agents/*`, `.claude/commands/*`) rewritten **brand-neutral**: specifics defer to each instance's voice file, `taste.md`, and `docs/intelligence/MEMORY.md`
- This is the property that makes harness sync safe — upstream files are identical machinery for every instance
- First sync exercised: downstream instance #1 received and merged its harness-sync PR

## v0.1.0 — 2026-06-11 · the bootstrap cut

- `template/`: complete Next.js shell + agent harness (5 agents, 6 commands), generalized from the first production install
- `packs/`: 4 standalone skill packs (claims-guard, business-intelligence, design-contract, weekly-rhythm)
- `/os-spawn`: guided brand derivation
- `scripts/harness-sync.mjs` + `downstreams.json`: the update channel — readable PRs, never auto-merged
- Lineage: Starlight Intelligence System (memory architecture) · Agentic Creator OS (harness shape) · frankx.ai (design contract)
