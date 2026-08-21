# Product authority — Starlight Foundry

**Status:** Proposed ADR for issue #4  
**Date:** 2026-08-21  

## Decision

Use one customer-facing product hierarchy:

| Layer | Authority | Contract |
|---|---|---|
| Institution | Starlight Intelligence Systems | Architecture doctrine, governance and IP |
| Customer product | Starlight Foundry | Founder-facing product and experience |
| Portable foundation | Starlight Venture OS | Manifest and adapter contracts |
| Customer instance | Starlight Business OS | Customer-owned installed venture |
| Protocol/substrate | Starlight Intelligence System | Memory, compiler, local MCP, governance and proof receipts |
| Vertical capabilities | GenCreator, Agentic Income and other packs | Adapters and workflows, not competing roots |
| Implementation service | FrankX Foundry | High-touch configuration under a separate scope |

“Starline” is retired as naming drift/transcription. “Verso” means Vercel. “OregoWave” is treated as OpenRouter unless evidence establishes otherwise; OpenRouter remains an optional model adapter.

## Repository authority

- This repository owns customer product experience, install journey, pricing/entitlement metadata, guided workflows and product evidence.
- frankxai/Starlight-Intelligence-System owns the Foundry compiler, manifest primitives, local MCP, memory, WorkPacket/governance contracts and proof substrate.
- frankxai/gencreator.ai owns creator/media capability logic and its limited approval-gated MCP gateway.
- Capability repositories are referenced through versioned adapters. Their implementations are not copied here.
- Do not create a new umbrella repository.

## Current maturity truth

- SIS has an operational v0.1 Foundry kernel, CLI, schema, plugin and local stdio MCP.
- There is no deployed authenticated remote Foundry MCP, live cloud swarm dispatch or cryptographic receipt chain.
- GenCreator MCP exists, but autonomous external writes and the full activation proof are not complete.
- This repository remains an installable template, not a verified universal company builder.
- Draft PR #2 contains useful Foundry strategy but also stale code/review debt; extract and revalidate it against current main instead of merging it wholesale.

## Product boundary

The first supported outcome is narrow:

> A solo expert with existing distribution installs Foundry locally, completes the Six Primitives, and produces a venture thesis, offer package, landing-page brief and 30-day launch system with inspectable proof and export receipts.

Creator OS — Six Primitives Toolkit remains the single P0 paid launch and becomes the first Foundry pack. Foundry does not add a competing checkout.

## Source-of-truth contract

- GitHub: normative code, schemas, policy, workflows, releases and execution canon.
- Notion: human cockpit, decisions, exceptions and release gates.
- Drive: evidence, approved briefs, contracts and stakeholder assets.
- Supabase/Postgres: shared transactional truth at scale.
- Stripe-signed events: payment truth.
- Starlight Memory: semantic projection, not sole truth.

## Human authority

Agents may research, draft, test, reconcile and open pull requests inside explicit scopes. Publishing, outbound communications, price/legal changes, destructive deployment, private-data disclosure, hiring decisions and money movement require deterministic policy and human authority.

## Supersession

This ADR supersedes any product language that:

- makes SIS the customer product;
- treats Agentic Business OS, Creator OS, GenCreator and Starlight as competing universal substrates;
- introduces Starline as another brand;
- claims remote Foundry MCP or autonomous payment control is shipped;
- embeds perpetual downstream revenue rights in the sovereign product.

## Evidence

- Issue #4
- [Notion constitution](https://app.notion.com/p/3c326ac2b7f68158bfcdde627afbc609)
- [Drive dossier](https://drive.google.com/file/d/1xbat5UkMQt8wJyBhMaC2ZDILdJ2Zg8ZV/view)
- [SIS Foundry architecture](https://github.com/frankxai/Starlight-Intelligence-System/blob/main/docs/architecture/STARLIGHT-INTELLIGENCE-FOUNDRY.md)
- [Portfolio convergence audit](https://github.com/frankxai/Starlight-Intelligence-System/blob/main/context/empire/audits/2026-08-12-starlight-repo-convergence.md)
- [Draft PR #2](https://github.com/frankxai/agentic-business-os/pull/2)