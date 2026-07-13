import assert from "node:assert/strict";
import test from "node:test";
import {
  CreditLedger,
  EntitlementLedger,
  FoundryControlPlane,
  SERVICE_CREDIT_POLICY,
  transitionEntitlement
} from "../src/index.mjs";

const at = (minute) => `2026-07-14T12:${String(minute).padStart(2, "0")}:00Z`;

function entitlementEvent(overrides = {}) {
  return {
    eventId: "evt-1",
    entitlementId: "ent-1",
    customerId: "cus-1",
    workspaceId: "ws-1",
    productId: "pathfinder-agent-app",
    type: "purchase_verified",
    occurredAt: at(0),
    ...overrides
  };
}

function creditLedgerWithGrant(amount = 100) {
  const ledger = new CreditLedger();
  ledger.grant({
    operationId: "grant-1",
    workspaceId: "ws-1",
    productId: "pathfinder-agent-app",
    amount,
    policyId: "maker-monthly",
    reason: "test-grant",
    occurredAt: at(0)
  });
  return ledger;
}

test("entitlement activates from a verified purchase", () => {
  const ledger = new EntitlementLedger();
  const result = ledger.apply(entitlementEvent());
  assert.equal(result.entitlement.status, "active");
  assert.equal(result.entitlement.grantedAt, at(0));
  assert.equal(ledger.canAccess("ent-1"), true);
});

test("duplicate entitlement events are idempotent", () => {
  const ledger = new EntitlementLedger();
  ledger.apply(entitlementEvent());
  const duplicate = ledger.apply(entitlementEvent());
  assert.equal(duplicate.duplicate, true);
  assert.equal(duplicate.entitlement.history.length, 1);
});

test("duplicate entitlement event ids cannot be replayed against another entitlement", () => {
  const ledger = new EntitlementLedger();
  ledger.apply(entitlementEvent());
  assert.throws(
    () => ledger.apply(entitlementEvent({ entitlementId: "ent-other" })),
    /Event identity mismatch/
  );
});

test("payment retry enters grace and recovery returns active", () => {
  const ledger = new EntitlementLedger();
  ledger.apply(entitlementEvent());
  ledger.apply(entitlementEvent({ eventId: "evt-2", type: "payment_retry", occurredAt: at(1) }));
  assert.equal(ledger.get("ent-1").status, "grace");
  assert.equal(ledger.canAccess("ent-1"), true);
  ledger.apply(entitlementEvent({ eventId: "evt-3", type: "payment_recovered", occurredAt: at(2) }));
  assert.equal(ledger.get("ent-1").status, "active");
});

test("refund revokes access", () => {
  const ledger = new EntitlementLedger();
  ledger.apply(entitlementEvent());
  ledger.apply(entitlementEvent({ eventId: "evt-2", type: "refund", occurredAt: at(1), reason: "customer-refund" }));
  assert.equal(ledger.get("ent-1").status, "revoked");
  assert.equal(ledger.canAccess("ent-1"), false);
});

test("administrative restore requires approval and reason", () => {
  assert.throws(() => transitionEntitlement("revoked", { type: "admin_restore" }), /approvedBy/);
  assert.equal(transitionEntitlement("revoked", { type: "admin_restore", approvedBy: "frank", reason: "appeal-approved" }), "active");
});

test("entitlement identity cannot be changed by a later event", () => {
  const ledger = new EntitlementLedger();
  ledger.apply(entitlementEvent());
  assert.throws(
    () => ledger.apply(entitlementEvent({ eventId: "evt-2", workspaceId: "ws-other", type: "term_ended", occurredAt: at(1) })),
    /identity mismatch/
  );
});

test("credit reservation reduces available balance", () => {
  const ledger = creditLedgerWithGrant();
  const result = ledger.reserve({
    operationId: "reserve-1",
    runId: "run-1",
    workspaceId: "ws-1",
    productId: "pathfinder-agent-app",
    amount: 20,
    estimate: "pathfinder plus eval",
    occurredAt: at(1)
  });
  assert.equal(result.balance.available, 80);
  assert.equal(result.balance.outstandingReserved, 20);
});

test("settlement consumes actual credits and releases the remainder", () => {
  const ledger = creditLedgerWithGrant();
  ledger.reserve({ operationId: "reserve-1", runId: "run-1", workspaceId: "ws-1", productId: "pathfinder-agent-app", amount: 20, estimate: "bounded run", occurredAt: at(1) });
  const result = ledger.settle({ operationId: "settle-1", runId: "run-1", actualAmount: 12, outcome: "completed", occurredAt: at(2) });
  assert.deepEqual(result.balance, {
    workspaceId: "ws-1",
    productId: "pathfinder-agent-app",
    granted: 100,
    adjusted: 0,
    expired: 0,
    consumed: 12,
    outstandingReserved: 0,
    available: 88
  });
  assert.equal(result.reservation.released, 8);
});

test("failed run can settle zero and release the full reserve", () => {
  const ledger = creditLedgerWithGrant();
  ledger.reserve({ operationId: "reserve-1", runId: "run-1", workspaceId: "ws-1", productId: "pathfinder-agent-app", amount: 20, estimate: "bounded run", occurredAt: at(1) });
  const result = ledger.settle({ operationId: "settle-1", runId: "run-1", actualAmount: 0, outcome: "failed-before-billable-work", occurredAt: at(2) });
  assert.equal(result.balance.available, 100);
  assert.equal(result.reservation.released, 20);
});

test("credit operations are idempotent", () => {
  const ledger = creditLedgerWithGrant();
  const first = ledger.reserve({ operationId: "reserve-1", runId: "run-1", workspaceId: "ws-1", productId: "pathfinder-agent-app", amount: 20, estimate: "bounded run", occurredAt: at(1) });
  const duplicate = ledger.reserve({ operationId: "reserve-1", runId: "run-1", workspaceId: "ws-1", productId: "pathfinder-agent-app", amount: 20, estimate: "bounded run", occurredAt: at(1) });
  assert.equal(first.duplicate, false);
  assert.equal(duplicate.duplicate, true);
  assert.equal(ledger.entries().length, 2);
});

test("credit operation ids cannot be replayed against another workspace", () => {
  const ledger = creditLedgerWithGrant();
  assert.throws(
    () => ledger.grant({ operationId: "grant-1", workspaceId: "ws-other", productId: "pathfinder-agent-app", amount: 100, policyId: "maker-monthly", reason: "replay", occurredAt: at(1) }),
    /Operation identity mismatch/
  );
});

test("overspend and over-settlement stop before mutation", () => {
  const ledger = creditLedgerWithGrant(10);
  assert.throws(
    () => ledger.reserve({ operationId: "reserve-1", runId: "run-1", workspaceId: "ws-1", productId: "pathfinder-agent-app", amount: 11, estimate: "too large", occurredAt: at(1) }),
    /Insufficient credits/
  );
  ledger.reserve({ operationId: "reserve-2", runId: "run-2", workspaceId: "ws-1", productId: "pathfinder-agent-app", amount: 10, estimate: "full balance", occurredAt: at(1) });
  assert.throws(() => ledger.settle({ operationId: "settle-1", runId: "run-2", actualAmount: 11, outcome: "invalid", occurredAt: at(2) }), /exceeds reservation/);
  assert.equal(ledger.balance("ws-1", "pathfinder-agent-app").available, 0);
});

test("manual credit adjustment requires an approver", () => {
  const ledger = creditLedgerWithGrant();
  assert.throws(
    () => ledger.adjust({ operationId: "adjust-1", workspaceId: "ws-1", productId: "pathfinder-agent-app", amount: 5, reason: "support-correction", occurredAt: at(1) }),
    /approvedBy/
  );
  const result = ledger.adjust({ operationId: "adjust-2", workspaceId: "ws-1", productId: "pathfinder-agent-app", amount: 5, reason: "support-correction", occurredAt: at(1), approvedBy: "frank" });
  assert.equal(result.balance.available, 105);
});

test("service credits cannot be cash or transferable by policy", () => {
  assert.deepEqual(SERVICE_CREDIT_POLICY, {
    transferable: false,
    cashValue: false,
    redeemableForCash: false,
    investmentInstrument: false
  });
});

test("normalized commerce event grants entitlement and credits once", () => {
  const plane = new FoundryControlPlane({
    products: [{ id: "pathfinder-agent-app", commerce: { provider: "polar" }, credits: { enabled: true, policyId: "activation" } }]
  });
  const event = {
    eventId: "polar-event-1",
    type: "order.paid",
    provider: "polar",
    customerId: "cus-1",
    workspaceId: "ws-1",
    productId: "pathfinder-agent-app",
    entitlementId: "ent-1",
    occurredAt: at(0),
    creditGrant: 10
  };
  const first = plane.processCommerceEvent(event);
  const duplicate = plane.processCommerceEvent(event);
  assert.equal(first.entitlement.status, "active");
  assert.equal(first.receipt.creditsGranted, 10);
  assert.equal(duplicate.duplicate, true);
  assert.equal(duplicate.receipt.creditsGranted, 0);
  assert.equal(plane.credits.balance("ws-1", "pathfinder-agent-app").available, 10);
});

test("commerce provider mismatch is rejected", () => {
  const plane = new FoundryControlPlane({
    products: [{ id: "pathfinder-agent-app", commerce: { provider: "polar" }, credits: { enabled: true, policyId: "activation" } }]
  });
  assert.throws(
    () => plane.processCommerceEvent({ eventId: "event-1", type: "order.paid", provider: "lemon-squeezy", customerId: "cus-1", workspaceId: "ws-1", productId: "pathfinder-agent-app", entitlementId: "ent-1", occurredAt: at(0) }),
    /does not match/
  );
});
