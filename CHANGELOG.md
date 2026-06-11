# Changelog

All notable changes. Versions follow semver; every release here can trigger sync PRs to registered downstream instances (see `HARNESS.md`).

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
