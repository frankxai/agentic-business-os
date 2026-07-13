# Foundry control-plane reference

This package is a dependency-free, in-memory reference implementation of the contracts in `data/autonomous-foundry-control-plane.json`.

It proves:

- explicit entitlement state transitions;
- idempotent provider-event processing;
- append-only service-credit grants, reserves, settlements, releases, expiry, and approved adjustments;
- overspend stops;
- duplicate-event safety;
- refund/revoke behavior;
- failed-run settlement and release;
- redacted outcome receipts.

It deliberately does **not** provide a database, authentication, webhook endpoint, commerce SDK, live provider connection, customer portal, Eve agent, schedule, payout, or production authorization.

Run without installing dependencies:

```bash
node --test packages/foundry-control-plane/tests/*.test.mjs
```

## Storage port

The classes accept no external storage yet. A production adapter must preserve these invariants with transactional writes and unique constraints on source event IDs, entitlement IDs, and run reservations.

## Security boundary

Inputs are normalized domain events, not raw provider payloads. Do not store secrets or full private source content in event metadata or receipts.
