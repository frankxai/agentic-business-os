# Guided buyer-owned installation

Status: local preview. No live connector or one-click installer is shipped yet.

## Before the buyer installs anything

The buyer checks their own ERP edition and permissions, DHL business-customer product/contract, existing carrier integration, label format, printer location, and whether automatic output is already possible. For weclapp, test its direct DHL workflow first: it documents label generation from a delivery and automatic tracking-ID population. The exact account and fulfilment process still require a real test.

Record each capability as `true` only after an operator tests it in the target account. A vendor webpage alone is not account verification. Do not put addresses, credentials, or live shipment IDs in the shared fixture.

## Local preview

1. Copy `fixtures/valid-order.json` to a **customer-controlled location outside a public repo**. Replace the generic setup flags with observed facts and the fictional order with a redacted sample.
2. Run `node kit.mjs assess <local-file>` and resolve every blocked finding.
3. Run `node kit.mjs simulate <local-file>` for four cases: ordinary domestic order, order with an existing shipment, missing/invalid package details, and international shipment. The tool never prints or calls an API.
4. A shipping operator checks the decisions, especially whether the existing ERP integration already fulfils the outcome.
5. Only for a verified gap, decide whether an n8n workflow is needed. Keep the n8n instance and credentials in the buyer's environment. Read `n8n-blueprint.md`.

## Live promotion gate — not automated by this preview

- The carrier's sandbox path and the ERP's test tenant have passed representative cases.
- Duplicate-event and partial-failure recovery are demonstrated, including a crash after label creation but before ERP writeback.
- The operator confirms package dimensions, weight, delivery address, carrier product, printer and customs data; AI must not invent them.
- Each external action is least-privilege, logged with correlation ID and redacted payload, and has an owner and kill switch.
- A human authorizes first production activation, outbound messaging, customs, and changes to money-bearing records.
- The buyer can export their workflow and data and can disable the integration without losing access to the ERP's native shipping path.

## Source checks

- [weclapp direct DHL integration](https://www.weclapp.com/de/blog/dhl-schnittstelle-in-weclapp/), checked 2026-09-24.
- [weclapp shipping overview](https://www.weclapp.com/en/cloud-erp/shipping/), checked 2026-09-24.
- [DHL Parcel DE Shipping API](https://developer.dhl.com/api-reference/parcel-de-shipping-post-parcel-germany-v2), checked 2026-09-24. Production access and contract details must be confirmed with DHL.
