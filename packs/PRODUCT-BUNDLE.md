# Agentic Business OS Pack Bundle — product manifest

**Product id (agenticincome catalog):** `abos-pack-bundle` · **Version:** 0.1.0 (pack versions per `registry.json`) · **Sold via:** Polar (agenticincome.ai) · **Status:** gated, not yet on sale

## What it is

All four Agentic Business OS skill packs in one package — the gate, the memory, the design contract, and the operating loop. Each pack is standalone (works in a bare Claude.ai project with zero repo context) and they compose: copy passes Claims Guard, decisions land in Business Intelligence, visuals obey the Design Contract, and Weekly Rhythm keeps the loop turning.

## Contents (exactly these files, generated from disk)

| Pack | Files | Kind | One line |
|---|---|---|---|
| `claims-guard-pack/` | `SKILL.md` (59 ln), `manifest.json`, `PRODUCT.md` | gate | Zero-tolerance pre-publish audit: regulated claims, citations, brand voice, AI-slop, structure |
| `business-intelligence-pack/` | `SKILL.md` (53 ln), `manifest.json` | memory | File-based business memory — decision records, market notes, weekly snapshots |
| `design-contract-pack/` | `SKILL.md` (37 ln), `manifest.json` | authoring | Authors the design.md + taste.md two-file design contract for any brand |
| `weekly-rhythm-pack/` | `SKILL.md` (42 ln), `manifest.json` | workflow | Founder-sized loop: Monday plan (10 min), midweek production, Friday review (15 min) |
| bundle root | `registry.json` (41 ln), `README.md` (39 ln), `PRODUCT-BUNDLE.md` | index | Pack index with versions, the install/usage guide, and this manifest |

## Who it's for

A founder running a real business through AI sessions who wants the whole operating layer at once instead of assembling it pack by pack. Priced below the four packs bought as separates.

## What it is NOT

- **Not software.** These are skill files (markdown + JSON) that direct an AI harness; there is no app, no binary, no account.
- **Not exclusive content.** Every pack is MIT-licensed and public in this repository ([frankxai/agentic-business-os](https://github.com/frankxai/agentic-business-os)). The paid bundle is the packaged, versioned edition delivered through checkout; buying it supports development. MIT terms apply either way.
- **No business-outcome claims.** The packs impose discipline; they do not promise revenue.

## Packaging note (for the operator, not the buyer)

At sale time, zip the `packs/` directory — the four pack folders plus `registry.json`, `README.md`, and this file; that is everything the directory contains — as `abos-pack-bundle-v0.1.0.zip` and upload to the Polar product's File Downloads benefit. The agenticincome catalog entry stays status-gated until that upload exists.
