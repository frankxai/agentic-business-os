# n8n blueprint for a verified gap

This is an implementation specification, **not** an importable workflow and not a claim of a live n8n setup. At authoring time the connected tool surface could search/read/execute approved workflows, but could not create, validate, or publish one. Recreate against the buyer's current n8n node schemas with the official n8n skills before activation.

## Native-first decision

If the ERP already creates the DHL label, writes tracking, and routes output to the correct printer, stop. No n8n workflow is justified. If only printer routing or an exception inbox is missing, keep label creation in the ERP; n8n handles only the verified gap. A direct DHL API adapter is a separate product decision, not the default.

## Event path for a print/exception gap

`ERP shipment-ready event or bounded poll` → `fetch current ERP shipment` → `validate order/package state` → `check existing label and idempotency record` → `classify native success vs exception` → `require approval where needed` → `route existing label to approved printer OR create operator task` → `write redacted audit result`.

The event is a pointer (`orderId`, `shipmentId`, correlation ID), not a full customer record. Re-read authoritative ERP state before any action. Persist a deduplication key outside the event payload; do not assume webhook delivery is exactly once. Do not send an event to a printer unless its current approved label reference matches the ERP shipment.

Reusable, typed sub-workflows should be limited to genuinely shared contracts: `Validate shipment readiness`, `Resolve approved printer`, and `Record fulfilment outcome`. The orchestration workflow stays readable and thin. No AI Agent node is required for normal label routing; deterministic rules are safer and cheaper.

## Failure and recovery

Every ERP, printer, storage, and notification call needs bounded retry and an explicit error path. For webhook callers, return structured 4xx for invalid input/duplicate conflict and 5xx for internal or upstream failure; every path responds. Configure an error workflow for unattended runs. On a crash, reconcile existing ERP/carrier labels before retrying; never create another shipment merely because the first run timed out.

Keep API tokens in n8n credentials, never workflow text, exported JSON, or model prompts. The buyer confirms each credential binding in the UI. Test using fictional/pinned input before any production execution. Publication requires validation, fetching the saved workflow to inspect connections, and a representative execution reviewed by a human.

Sources: [n8n workflow lifecycle](https://docs.n8n.io/workflows/), [n8n licence guidance](https://support.n8n.io/article/can-i-use-your-license-for-my-use-case), [weclapp DHL capability](https://www.weclapp.com/de/blog/dhl-schnittstelle-in-weclapp/). Checked 2026-09-24.
