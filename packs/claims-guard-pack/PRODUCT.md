# Claims Guard Pack — product manifest

**Product id (agenticincome catalog):** `claims-guard-pack` · **Version:** 0.1.0 · **Sold via:** Polar (agenticincome.ai) · **Status:** gated, not yet on sale

## What it is

The pre-publish gate from the Agentic Business OS, packaged as a standalone product. One skill, one job: audit business copy for regulated claim language, uncited assertions, banned phrases, and AI-tone before anything ships. Five gates, worst-of verdict, and Gate 1 (regulated claims) is zero-tolerance — any hit is FAIL, cleared only by a human rewrite.

Works two ways, no repo required for the first:

1. Upload the folder (or just `SKILL.md`) to a Claude.ai project — Cowork or Projects.
2. Drop the folder into any repo's skills directory for coding agents.

## Contents (exactly these files, generated from disk)

| File | Lines | Purpose |
|---|---|---|
| `SKILL.md` | 59 | The capability: five-gate audit procedure, claims-profile setup interview, report format |
| `manifest.json` | 10 | Machine-readable id, version, kind, license, lineage |
| `PRODUCT.md` | this file | What the product is and is not |

## Who it's for

Founders and small teams publishing copy in regulated or reputation-sensitive territory — health-adjacent, financial, environmental/green claims — who want a hard gate between "drafted" and "published" instead of a vibe check.

## What it is NOT

- **Not legal or compliance advice.** It catches patterns a human then judges; it does not replace counsel for regulated industries.
- **Not a writer.** It refuses content; it does not generate it.
- **Not exclusive content.** The pack source is MIT-licensed and public in this repository ([frankxai/agentic-business-os](https://github.com/frankxai/agentic-business-os)). The paid product is the packaged, versioned edition delivered through checkout; buying it supports development. MIT terms apply either way.
- **No outcome claims.** It cannot guarantee copy is compliant — only that it passed these five gates.

## Packaging note (for the operator, not the buyer)

At sale time, zip `packs/claims-guard-pack/` (all three files above) as `claims-guard-pack-v0.1.0.zip` and upload to the Polar product's File Downloads benefit. The agenticincome catalog entry stays status-gated until that upload exists.
