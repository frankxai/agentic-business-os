# Agentic Business OS

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Template](https://img.shields.io/badge/GitHub-use%20this%20template-blue)](https://github.com/frankxai/agentic-business-os/generate)
[![template-ci](https://github.com/frankxai/agentic-business-os/actions/workflows/template-ci.yml/badge.svg)](https://github.com/frankxai/agentic-business-os/actions/workflows/template-ci.yml)
[![Installs by application](https://img.shields.io/badge/installs-frankx.ai%2Ffoundry-10b981)](https://frankx.ai/foundry)

**A complete operating system for running a business with AI agents — website, agent harness, quality gates, and compounding business memory. Installable in a day. Yours forever.**

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

LAYER 2 — THE SERVICE   FrankX Foundry — frankx.ai/foundry
                        Evaluated installs for businesses we believe in.
```

Every OS in the family inherits the same contract: a doctrine file (`CLAUDE.md`), a cross-tool card (`AGENTS.md`), an operating skill (`SKILL.md`), a two-file design contract (`design.md` + `taste.md`), pre-publish quality gates, and a file-based business memory (`docs/intelligence/`). The domains differ; the architecture doesn't.

---

## What's in this repo

| Path | What |
|---|---|
| **`template/`** | The instantiable starter — a complete Next.js site + agent harness, generalized from a real production install. Use GitHub's "Use this template" or run `/os-spawn`. |
| **`packs/`** | Standalone skill packs — import individual capabilities into Claude.ai (Cowork/Projects) or any repo via `npx skills add`. Start with `claims-guard-pack`. |
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

## The model: brand is yours, machinery is shared

Your doctrine, voice, design tokens, content, and business memory are **instance-owned — never overwritten**. The generic machinery (agents, command pipelines, gate logic) is **upstream-managed**: when it improves here, registered instances receive a pull request with a human-readable changelog. You read the diff, you merge or decline. Full contract: `HARNESS.md`.

## The first instance

This template was extracted from a real production install (a European consumer-goods launch, 2026) — not designed in the abstract. The load-bearing piece is **`@claims-guard`**: a zero-tolerance pre-publish gate for regulated claim language, descended from frankx.ai's `@integrity-guard`. If your business touches health, finance, or sustainability claims, that one agent pays for the whole system.

## Getting an install

The template is free and MIT-licensed — take it, it's yours. If you want it installed, adapted, and connected by the team that built it: **[frankx.ai/foundry](https://frankx.ai/foundry)**. The Foundry takes a small number of evaluated installs per quarter, with priority for sustainable, healthcare, and meaningful businesses.

---

## Lineage

| Layer | Source | Inherited |
|---|---|---|
| Starlight Intelligence System | [frankxai/Starlight-Intelligence-System](https://github.com/frankxai/Starlight-Intelligence-System) | Memory architecture, SKILL.md pattern, decision records |
| Agentic Creator OS | [frankxai/agentic-creator-os](https://github.com/frankxai/agentic-creator-os) | Agent + command harness shape, pre-publish gate pattern |
| frankx.ai design contract | [frankx.ai](https://frankx.ai) | The design.md + taste.md two-file architecture |

MIT License. Built by [Frank](https://frankx.ai) — AI Architect.
