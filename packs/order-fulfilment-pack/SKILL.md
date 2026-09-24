---
name: order-fulfilment-pack
description: Assess an ERP-to-carrier shipping process, prefer verified native capabilities, and produce a buyer-owned, dry-run-first automation plan with explicit human gates. Use for weclapp, Odoo, or another ERP when considering n8n, labels, tracking, or printer routing.
---

# Order Fulfilment Activation

One job: determine the smallest safe route from a ready order to a shipping label and tracking record. Do not assume a custom carrier integration is needed.

## Procedure

1. Identify the actual ERP edition, carrier product, existing integration, shipping volume, printer environment, and owner. Mark unverified claims `unknown`.
2. Check the ERP's native label, tracking, and print capabilities in the customer's own account. If they meet the need, recommend the native route. Add n8n only for a measured gap.
3. Use `node kit.mjs assess fixtures/valid-order.json` to inspect the example contract, then replace the fixture with a customer-owned local JSON file. Use `node kit.mjs simulate <file>` before any live action.
4. Read [install.md](references/install.md) for the guided setup and [n8n-blueprint.md](references/n8n-blueprint.md) before creating any workflow. The buyer owns the instance and credentials.
5. Record expected, duplicate, incomplete, and blocked test cases. Compare dry-run decisions to a human operator's judgment. Do not activate until they agree.
6. If the use case needs a new n8n workflow, use the installed official n8n skills and live node schemas; validate, inspect connections, test, then publish. This pack is not an importable n8n workflow.

## Return contract

Report: current process, verified native capability, gap, selected route, required approvals, dry-run evidence, owner, rollback, and unanswered questions. `unknown` is an acceptable result; guessing is not.

## Refuse or redesign

- Never create a second DHL label or shipment for an order already fulfilled.
- Never put API keys, customer addresses, or shipment documents in prompts, workflow text fields, public fixtures, or logs.
- Never call a production carrier/ERP endpoint or print a live label from the dry-run tool.
- Never let a model invent package weight, dimensions, tariff, customs details, or delivery address.
- Never bypass approval for international/customs shipments, destructive changes, money movement, or customer messaging.
- Never claim a native integration works for a particular account until tested there.
- Never sell this as a hosted multi-tenant n8n service without separately resolving licensing, security, and support obligations.
