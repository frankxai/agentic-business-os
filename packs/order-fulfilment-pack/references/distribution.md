# Distribution and release path

The product doctrine is self-service: buyer-owned runtime, buyer-owned keys and data, no mandatory 1:1 installation or hosted multi-tenant n8n. The current pack is a **free local preview**, not a paid or deployed product.

## Buyer and reference bar

Initial buyer hypothesis: a small distributor or installer with an ERP, DHL shipping, and a repeatable dispatch problem. Research overturned the first assumed pain: weclapp already offers native DHL labels and tracking, and it also offers shipping-provider integrations. The kit must therefore beat a generic workflow template on **not building a redundant integration**, safe adoption, and duplicate/failure handling. It must not claim to beat the ERP's native label generation.

Next evidence needed: observe ten real dispatches with the pilot buyer; record where the native path succeeds, where staff still switch tools, print failures, correction/reprint time, and the buyer's willingness-to-pay band. Do not infer a price or ROI before this. Compare with the buyer's existing weclapp DHL workflow, Sendcloud/shipcloud option, and one current n8n shipping template before offering a paid version.

## Channels by job

| Channel | Role | Release condition |
|---|---|---|
| GitHub/skills CLI | Free discovery and self-install | Portable files, examples, tests, compatibility matrix and safe defaults |
| n8n template library | Free working gap-specific template, not the whole product | Importable, validated workflow with no secrets and clear credential setup |
| weclapp partner ecosystem | Discoverability for a verified integration, if worth its partner obligations | Pilot evidence and a distinct gap beyond native DHL |
| Odoo Apps Store | Only when an actual maintained Odoo module exists | Odoo-version testing, vendor support obligations and app-store policy check |
| Owned site plus Polar/Whop/Gumroad | Demand capture, then eligible digital-product sale after release gate | Standard waitlist, buyer price evidence, current product gate PASS |
| ChatGPT/Codex plugin | Optional agent-facing interface to a buyer-owned installation | Valuable in-product function, reviewed plugin, no digital-product checkout inside it |

The initial funnel is: useful free diagnostic → buyer runs local dry run → records a gap → requests a future pack. A public page remains a waitlist until the estate's release gate passes. Marketplace listings are distribution, not proof of demand.

## Productization gates

1. **Preview:** deterministic assessment and simulation work on synthetic data (this repository).
2. **Pilot:** one buyer verifies native capability and records actual missing steps. No external write until an operator approves.
3. **Installable:** signed/versioned artifact, compatibility matrix, guided credential setup, rollback, fixtures, and support boundaries.
4. **Marketplace:** channel-specific package and policy review. Publish only the format that exists; do not advertise a nonexistent Odoo module or n8n template.
5. **Paid:** fresh product-release receipt and price evidence, then the approved checkout on external rails.

Sources checked 2026-09-24: [weclapp DHL](https://www.weclapp.com/de/blog/dhl-schnittstelle-in-weclapp/), [weclapp Sendcloud](https://www.weclapp.com/de/integrationen/weclapp-und-sendcloud/), [n8n template library](https://n8n.io/workflows/), [Odoo vendor guidelines](https://apps.odoo.com/apps/vendor-guidelines), [OpenAI plugin rules](https://developers.openai.com/plugins/app-guidelines), [n8n licensing](https://support.n8n.io/article/can-i-use-your-license-for-my-use-case).
