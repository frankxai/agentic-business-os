# Agentic Business OS

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Template](https://img.shields.io/badge/GitHub-use%20this%20template-blue)](https://github.com/frankxai/agentic-business-os/generate)
[![template-ci](https://github.com/frankxai/agentic-business-os/actions/workflows/template-ci.yml/badge.svg)](https://github.com/frankxai/agentic-business-os/actions/workflows/template-ci.yml)
[![Installs by application](https://img.shields.io/badge/installs-frankx.ai%2Ffoundry-10b981)](https://frankx.ai/foundry)

**A reusable starting point for operating a business with AI agents — website, agent harness, review gates, and compounding business memory. Fork it, derive it for your business, and keep ownership of the result.**

Part of the **Agentic OS family**, built on the FrankX stack:

```
LAYER 0 — SUBSTRATE     Starlight Intelligence System + SIP
                        github.com/frankxai/Starlight-Intelligence-System

LAYER 1 — THE OS FAMILY
                        ├── agentic-creator-os      → for creators       (live)
                        ├── agentic-business-os     → THIS REPO          (live)
                        ├── agentic-family-os       → in development
                        ├── agentic-health-os       → in development
                        └── agentic-investor-os     → in development

LAYER 2 — THE FOUNDRY  FrankX Foundry — frankx.ai/foundry
                        Agent-delivered packs, apps, proof loops, and selective ventures.
```

Every OS in the family inherits the same contract: a doctrine file (`CLAUDE.md`), a cross-tool card (`AGENTS.md`), an operating skill (`SKILL.md`), a two-file design contract (`design.md` + `taste.md`), pre-publish quality gates, and a file-based business memory (`docs/intelligence/`). The domains differ; the architecture doesn't.

---

## What's in this repo

| Path | What |
|---|---|
| **`template/`** | The instantiable starter — a complete Next.js site + agent harness, generalized from a real production install. Use GitHub's "Use this template" or run `/os-spawn`. |
| **`packs/`** | Standalone skill packs — import individual capabilities into Claude.ai (Cowork/Projects) or any repo via `npx skills add`. Start with `claims-guard-pack`. |
| **`docs/strategy/`** | The AI-Native Business Foundry direction: audience routes, product ladder, property ownership, trust gates, and compounding asset model. |
| **`docs/architecture/`** | Runtime and capability routing: when to use chat agents, coding agents, Vercel, automation, OpenClaw, Hermes, MCP, or a governed swarm. |
| **`data/foundry-product-registry.json`** | Machine-readable product truth: status, owner, licensing, price/checkout/delivery/support/update state, proof, and next gate. |
| **`data/autonomous-foundry-control-plane.json`** | The next-phase contract: product autonomy, agent fleet, entitlements, service credits, commerce adapters, and venture economics. |
| **`packages/foundry-control-plane/`** | Dependency-free executable reference for entitlement transitions, idempotent commerce events, append-only credits, overspend stops, settlement, release, and recovery. |
| **`jobs/swarm/held/`** | Queue-compatible four-role build contracts, deliberately held outside the live Queen inbox until machine admission permits execution. |
| **`GUIDE.md`** | The guided workflow: day-1 onboarding → the weekly rhythm → the gates. Read this first. |
| **`HARNESS.md`** | The ownership contract: which files are yours forever, which receive upstream updates. |
| **`.claude/commands/os-spawn.md`** | The guided derivation session that turns the template into *your* brand's OS. |
| **`scripts/harness-sync.mjs`** | The update channel — opens readable PRs on downstream instances when the harness improves. Never auto-merges. |

## Quick start

```bash
# 1. Instantiate (GitHub: "Use this template" → your-org/your-brand)
git clone https://github.com/<your-org>/<your-brand>
cd <your-brand>/  # the template lives at template/ — move it to root or work in place

# 2. Install + run
pnpm install && pnpm dev

# 3. Derive your brand (requires Claude Code or any coding agent)
#    Open a terminal in the repo and run:
/os-spawn
# A guided session derives your voice file, design tokens, and doctrine.
```

No coding agent? The packs work standalone — upload any `packs/*/SKILL.md` folder to a Claude.ai project and the capability comes with it.

Starting from an idea, a job skill, or a business process? Use the standalone [`ai-native-business-pathfinder-pack`](./packs/ai-native-business-pathfinder-pack/) to select one buyer, one process, one architecture, and one seven-day proof plan before building.

## The Autonomous Product Foundry

The next Foundry phase replaces implementation-fee dependence with proof-gated, agent-delivered products. The customer pays for an outcome, entitlement, usage allowance, update path, or explicitly agreed commercial right—not Frank's hours.

- [Master plan](./docs/strategy/autonomous-product-foundry-master-plan-2026-07-14.md)
- [Product ladder and delivery](./docs/product/autonomous-product-ladder-and-delivery.md)
- [Control-plane architecture](./docs/architecture/autonomous-foundry-control-plane.md)
- [Partner and venture economics](./docs/product/partner-and-venture-economics.md)
- [Experience specification](./docs/design/autonomous-foundry-experience-spec.md)
- [Proof-gated roadmap](./docs/roadmap/autonomous-foundry-blitzscale-roadmap.md)

The current hosted-agent status is **design-only**. The repository does not claim that Eve agents, credit billing, autonomous support, or public licensing are live. Run the registry validator to see the policy gates:

```bash
node scripts/validate-autonomous-foundry.mjs --self-test
node --test packages/foundry-control-plane/tests/*.test.mjs
```

## The model: brand is yours, machinery is shared

Your doctrine, voice, design tokens, content, and business memory are **instance-owned — never overwritten**. The generic machinery (agents, command pipelines, gate logic) is **upstream-managed**: when it improves here, registered instances receive a pull request with a human-readable changelog. You read the diff, you merge or decline. Full contract: `HARNESS.md`.

## The first instance

This template was extracted from a real production install (a European consumer-goods launch, 2026) — not designed only in the abstract. The load-bearing piece is **`@claims-guard`**: a blocking pre-publish review for configured claim patterns, citations, and brand voice, descended from frankx.ai's `@integrity-guard`. It supports human review; it is not a legal or regulatory compliance determination.

## Getting activated

The template is free and MIT-licensed—take it and keep ownership. The Foundry direction is an agent-led route from workflow mapping to a verified pack or app, with a free path when that is sufficient. A small number of people Frank trusts may enter a design-partner or venture path, but that is a product-investment decision rather than a custom implementation service.

Until the no-human-implementation gate passes, proposed paid packs, hosted agents, recurring operators, licenses, credits, and venture economics remain clearly labeled beta, design-only, or human-gated.

---

## Lineage

| Layer | Source | Inherited |
|---|---|---|
| Starlight Intelligence System | [frankxai/Starlight-Intelligence-System](https://github.com/frankxai/Starlight-Intelligence-System) | Memory architecture, SKILL.md pattern, decision records |
| Agentic Creator OS | [frankxai/agentic-creator-os](https://github.com/frankxai/agentic-creator-os) | Agent + command harness shape, pre-publish gate pattern |
| frankx.ai design contract | [frankx.ai](https://frankx.ai) | The design.md + taste.md two-file architecture |

MIT License. Built by [Frank](https://frankx.ai) — AI Architect.
