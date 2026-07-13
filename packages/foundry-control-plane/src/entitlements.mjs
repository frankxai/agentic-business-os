const EVENT_TRANSITIONS = Object.freeze({
  pending: Object.freeze({
    purchase_verified: "active",
    invalid_purchase: "rejected",
    refund: "revoked",
    chargeback: "revoked",
    admin_revoke: "revoked"
  }),
  active: Object.freeze({
    payment_retry: "grace",
    term_ended: "expired",
    refund: "revoked",
    chargeback: "revoked",
    admin_revoke: "revoked",
    renewal: "active"
  }),
  grace: Object.freeze({
    payment_recovered: "active",
    renewal: "active",
    retry_exhausted: "expired",
    term_ended: "expired",
    refund: "revoked",
    chargeback: "revoked",
    admin_revoke: "revoked"
  }),
  expired: Object.freeze({
    renewal: "active",
    admin_restore: "active",
    refund: "revoked",
    chargeback: "revoked"
  }),
  revoked: Object.freeze({
    admin_restore: "active"
  }),
  rejected: Object.freeze({})
});

function requireString(value, field) {
  if (typeof value !== "string" || value.trim() === "") throw new TypeError(`${field} is required`);
}

function copy(value) {
  return JSON.parse(JSON.stringify(value));
}

function requireApproval(event) {
  if (["admin_revoke", "admin_restore"].includes(event.type)) {
    requireString(event.approvedBy, "approvedBy");
    requireString(event.reason, "reason");
  }
}

export function transitionEntitlement(currentStatus, event) {
  requireString(currentStatus, "currentStatus");
  requireString(event?.type, "event.type");
  requireApproval(event);
  const next = EVENT_TRANSITIONS[currentStatus]?.[event.type];
  if (!next) throw new Error(`Unsupported entitlement transition: ${currentStatus} -> ${event.type}`);
  return next;
}

export class EntitlementLedger {
  constructor() {
    this.records = new Map();
    this.processedEvents = new Map();
  }

  apply(event) {
    for (const field of ["eventId", "entitlementId", "customerId", "workspaceId", "productId", "type", "occurredAt"]) {
      requireString(event?.[field], field);
    }

    const processedEntitlementId = this.processedEvents.get(event.eventId);
    if (processedEntitlementId) {
      if (processedEntitlementId !== event.entitlementId) throw new Error("Event identity mismatch for entitlementId");
      return { duplicate: true, entitlement: copy(this.records.get(processedEntitlementId) ?? null) };
    }
    const existing = this.records.get(event.entitlementId);

    if (existing) {
      for (const field of ["customerId", "workspaceId", "productId"]) {
        if (existing[field] !== event[field]) throw new Error(`Entitlement identity mismatch for ${field}`);
      }
    }

    const current = existing ?? {
      entitlementId: event.entitlementId,
      customerId: event.customerId,
      workspaceId: event.workspaceId,
      productId: event.productId,
      status: "pending",
      grantedAt: null,
      expiresAt: null,
      revokedAt: null,
      reason: null,
      history: []
    };

    const nextStatus = transitionEntitlement(current.status, event);
    const next = {
      ...current,
      status: nextStatus,
      grantedAt: nextStatus === "active" && !current.grantedAt ? event.occurredAt : current.grantedAt,
      expiresAt: nextStatus === "expired" ? event.occurredAt : (event.expiresAt ?? current.expiresAt),
      revokedAt: nextStatus === "revoked" ? event.occurredAt : (nextStatus === "active" ? null : current.revokedAt),
      reason: event.reason ?? null,
      history: [
        ...current.history,
        {
          eventId: event.eventId,
          type: event.type,
          from: current.status,
          to: nextStatus,
          occurredAt: event.occurredAt,
          approvedBy: event.approvedBy ?? null,
          reason: event.reason ?? null
        }
      ]
    };

    this.records.set(event.entitlementId, next);
    this.processedEvents.set(event.eventId, event.entitlementId);
    return { duplicate: false, entitlement: copy(next) };
  }

  get(entitlementId) {
    const record = this.records.get(entitlementId);
    return record ? copy(record) : null;
  }

  canAccess(entitlementId) {
    return ["active", "grace"].includes(this.records.get(entitlementId)?.status);
  }

  snapshot() {
    return [...this.records.values()].map(copy);
  }
}
