# Order Fulfilment Activation — local preview

This is a buyer-owned, BYOK pack for deciding whether a shipping process should use the ERP's native carrier integration, a narrow n8n extension, or a separately verified API adapter. It does not generate labels or connect to live systems.

The first intended proof is a PV distributor using weclapp and DHL. That is a **pilot hypothesis**, not a claim that this pack is already installed or integrated. weclapp documents direct DHL labels and automatic tracking; verify the buyer's edition, contract, settings, and actual print path before building anything new.

## Try it

```bash
node packs/order-fulfilment-pack/kit.mjs assess packs/order-fulfilment-pack/fixtures/valid-order.json
node packs/order-fulfilment-pack/kit.mjs simulate packs/order-fulfilment-pack/fixtures/valid-order.json
node --test packs/order-fulfilment-pack/test/kit.test.mjs
```

The [JSON contract](contract.schema.json) keeps customer configuration outside the pack. `READY_TO_SHIP` is the pack's normalized test status, not a claim about weclapp's raw API enum. The command only reads the named local file and writes its decision to stdout. It never makes network calls, prints, modifies an ERP, or persists personal data. Its idempotency key is only a proposed key; a live workflow must persist and reconcile it.

Next: [guided installation](references/install.md), [n8n workflow blueprint](references/n8n-blueprint.md), [distribution and release gates](references/distribution.md).
