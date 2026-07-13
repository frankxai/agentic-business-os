import { CreditLedger, SERVICE_CREDIT_POLICY } from "./credits.mjs";
import { EntitlementLedger, transitionEntitlement } from "./entitlements.mjs";

const COMMERCE_TO_ENTITLEMENT_EVENT = Object.freeze({
  "order.paid": "purchase_verified",
  "subscription.active": "purchase_verified",
  "subscription.payment_retry": "payment_retry",
  "subscription.recovered": "payment_recovered",
  "subscription.expired": "term_ended",
  "order.refunded": "refund",
  "order.chargeback": "chargeback"
});

function requireString(value, field) {
  if (typeof value !== "string" || value.trim() === "") throw new TypeError(`${field} is required`);
}

export class FoundryControlPlane {
  constructor({ products }) {
    if (!Array.isArray(products) || products.length === 0) throw new TypeError("products must be non-empty");
    this.products = new Map(products.map((product) => [product.id, product]));
    this.entitlements = new EntitlementLedger();
    this.credits = new CreditLedger();
  }

  processCommerceEvent(event) {
    for (const field of ["eventId", "type", "provider", "customerId", "workspaceId", "productId", "entitlementId", "occurredAt"]) {
      requireString(event?.[field], field);
    }
    const product = this.products.get(event.productId);
    if (!product) throw new Error(`Unknown product ${event.productId}`);
    const expectedProvider = product.commerce?.provider;
    if (!["undecided", "existing-provider", event.provider].includes(expectedProvider)) {
      throw new Error(`Provider ${event.provider} does not match product provider ${expectedProvider}`);
    }
    const entitlementType = COMMERCE_TO_ENTITLEMENT_EVENT[event.type];
    if (!entitlementType) throw new Error(`Unsupported normalized commerce event ${event.type}`);
    if (event.creditGrant !== undefined && (!Number.isFinite(event.creditGrant) || event.creditGrant < 0)) {
      throw new TypeError("creditGrant must be zero or greater");
    }
    if (event.creditGrant > 0 && (!product.credits?.enabled || !product.credits?.policyId)) {
      throw new Error(`Product ${event.productId} cannot grant credits`);
    }

    const result = this.entitlements.apply({
      eventId: event.eventId,
      entitlementId: event.entitlementId,
      customerId: event.customerId,
      workspaceId: event.workspaceId,
      productId: event.productId,
      type: entitlementType,
      occurredAt: event.occurredAt,
      expiresAt: event.expiresAt,
      reason: event.reason
    });

    let creditResult = null;
    if (!result.duplicate && result.entitlement.status === "active" && Number.isFinite(event.creditGrant) && event.creditGrant > 0) {
      const policyId = product.credits?.policyId;
      creditResult = this.credits.grant({
        operationId: `${event.eventId}:credit-grant`,
        workspaceId: event.workspaceId,
        productId: event.productId,
        amount: event.creditGrant,
        policyId,
        reason: "commerce-entitlement-grant",
        occurredAt: event.occurredAt
      });
    }

    return {
      duplicate: result.duplicate,
      entitlement: result.entitlement,
      creditResult,
      receipt: {
        eventId: event.eventId,
        provider: event.provider,
        productId: event.productId,
        workspaceId: event.workspaceId,
        entitlementStatus: result.entitlement?.status ?? null,
        creditsGranted: creditResult?.duplicate === false ? event.creditGrant : 0,
        occurredAt: event.occurredAt
      }
    };
  }
}

export { CreditLedger, EntitlementLedger, SERVICE_CREDIT_POLICY, transitionEntitlement };
