function requireString(value, field) {
  if (typeof value !== "string" || value.trim() === "") throw new TypeError(`${field} is required`);
}

function requirePositive(value, field) {
  if (!Number.isFinite(value) || value <= 0) throw new TypeError(`${field} must be greater than zero`);
}

function copy(value) {
  return JSON.parse(JSON.stringify(value));
}

export const SERVICE_CREDIT_POLICY = Object.freeze({
  transferable: false,
  cashValue: false,
  redeemableForCash: false,
  investmentInstrument: false
});

export class CreditLedger {
  constructor() {
    this.log = [];
    this.processedOperations = new Map();
    this.reservations = new Map();
  }

  append(entry) {
    const frozen = Object.freeze({ ...entry, sequence: this.log.length + 1 });
    this.log.push(frozen);
    return frozen;
  }

  duplicate(operationId, identity) {
    const existing = this.processedOperations.get(operationId);
    if (!existing) return false;
    for (const [field, value] of Object.entries(identity)) {
      if (existing[field] !== value) throw new Error(`Operation identity mismatch for ${field}`);
    }
    return true;
  }

  remember(operationId, identity) {
    this.processedOperations.set(operationId, Object.freeze({ ...identity }));
  }

  grant({ operationId, workspaceId, productId, amount, policyId, reason, occurredAt }) {
    for (const [field, value] of Object.entries({ operationId, workspaceId, productId, policyId, reason, occurredAt })) requireString(value, field);
    requirePositive(amount, "amount");
    const identity = { type: "grant", workspaceId, productId, runId: null };
    if (this.duplicate(operationId, identity)) return { duplicate: true, balance: this.balance(workspaceId, productId) };
    this.append({ operationId, type: "grant", workspaceId, productId, runId: null, amount, policyId, reason, occurredAt, approvedBy: null });
    this.remember(operationId, identity);
    return { duplicate: false, balance: this.balance(workspaceId, productId) };
  }

  reserve({ operationId, runId, workspaceId, productId, amount, estimate, occurredAt }) {
    for (const [field, value] of Object.entries({ operationId, runId, workspaceId, productId, estimate, occurredAt })) requireString(value, field);
    requirePositive(amount, "amount");
    const identity = { type: "reserve", workspaceId, productId, runId };
    if (this.duplicate(operationId, identity)) return { duplicate: true, reservation: copy(this.reservations.get(runId) ?? null) };
    if (this.reservations.has(runId)) throw new Error(`Run ${runId} already has a reservation`);
    const available = this.balance(workspaceId, productId).available;
    if (amount > available) throw new Error(`Insufficient credits: requested ${amount}, available ${available}`);
    const reservation = { runId, workspaceId, productId, reserved: amount, settled: 0, released: 0, status: "reserved" };
    this.reservations.set(runId, reservation);
    this.append({ operationId, type: "reserve", workspaceId, productId, runId, amount, policyId: null, reason: estimate, occurredAt, approvedBy: null });
    this.remember(operationId, identity);
    return { duplicate: false, reservation: copy(reservation), balance: this.balance(workspaceId, productId) };
  }

  settle({ operationId, runId, actualAmount, outcome, occurredAt }) {
    for (const [field, value] of Object.entries({ operationId, runId, outcome, occurredAt })) requireString(value, field);
    if (!Number.isFinite(actualAmount) || actualAmount < 0) throw new TypeError("actualAmount must be zero or greater");
    const identity = { type: "settle", runId };
    if (this.duplicate(operationId, identity)) return { duplicate: true, reservation: copy(this.reservations.get(runId) ?? null) };
    const reservation = this.reservations.get(runId);
    if (!reservation) throw new Error(`Run ${runId} has no reservation`);
    if (reservation.status !== "reserved") throw new Error(`Run ${runId} is already ${reservation.status}`);
    if (actualAmount > reservation.reserved) throw new Error(`Settlement ${actualAmount} exceeds reservation ${reservation.reserved}`);

    const released = reservation.reserved - actualAmount;
    if (actualAmount > 0) {
      this.append({
        operationId: `${operationId}:settle`,
        type: "settle",
        workspaceId: reservation.workspaceId,
        productId: reservation.productId,
        runId,
        amount: actualAmount,
        policyId: null,
        reason: outcome,
        occurredAt,
        approvedBy: null
      });
    }
    if (released > 0) {
      this.append({
        operationId: `${operationId}:release`,
        type: "release",
        workspaceId: reservation.workspaceId,
        productId: reservation.productId,
        runId,
        amount: released,
        policyId: null,
        reason: outcome,
        occurredAt,
        approvedBy: null
      });
    }
    Object.assign(reservation, { settled: actualAmount, released, status: "settled" });
    this.remember(operationId, identity);
    return { duplicate: false, reservation: copy(reservation), balance: this.balance(reservation.workspaceId, reservation.productId) };
  }

  expire({ operationId, workspaceId, productId, amount, policyId, reason, occurredAt }) {
    for (const [field, value] of Object.entries({ operationId, workspaceId, productId, policyId, reason, occurredAt })) requireString(value, field);
    requirePositive(amount, "amount");
    const identity = { type: "expire", workspaceId, productId, runId: null };
    if (this.duplicate(operationId, identity)) return { duplicate: true, balance: this.balance(workspaceId, productId) };
    const available = this.balance(workspaceId, productId).available;
    if (amount > available) throw new Error(`Cannot expire ${amount}; only ${available} credits are available`);
    this.append({ operationId, type: "expire", workspaceId, productId, runId: null, amount, policyId, reason, occurredAt, approvedBy: null });
    this.remember(operationId, identity);
    return { duplicate: false, balance: this.balance(workspaceId, productId) };
  }

  adjust({ operationId, workspaceId, productId, amount, reason, occurredAt, approvedBy }) {
    for (const [field, value] of Object.entries({ operationId, workspaceId, productId, reason, occurredAt, approvedBy })) requireString(value, field);
    if (!Number.isFinite(amount) || amount === 0) throw new TypeError("amount must be a non-zero number");
    const identity = { type: "adjust", workspaceId, productId, runId: null };
    if (this.duplicate(operationId, identity)) return { duplicate: true, balance: this.balance(workspaceId, productId) };
    if (amount < 0 && Math.abs(amount) > this.balance(workspaceId, productId).available) throw new Error("Negative adjustment would overdraw available credits");
    this.append({ operationId, type: "adjust", workspaceId, productId, runId: null, amount, policyId: null, reason, occurredAt, approvedBy });
    this.remember(operationId, identity);
    return { duplicate: false, balance: this.balance(workspaceId, productId) };
  }

  balance(workspaceId, productId = null) {
    requireString(workspaceId, "workspaceId");
    const entries = this.log.filter((entry) => entry.workspaceId === workspaceId && (productId === null || entry.productId === productId));
    const granted = entries.filter((entry) => entry.type === "grant").reduce((sum, entry) => sum + entry.amount, 0);
    const adjusted = entries.filter((entry) => entry.type === "adjust").reduce((sum, entry) => sum + entry.amount, 0);
    const expired = entries.filter((entry) => entry.type === "expire").reduce((sum, entry) => sum + entry.amount, 0);
    const consumed = entries.filter((entry) => entry.type === "settle").reduce((sum, entry) => sum + entry.amount, 0);
    const reserved = entries.filter((entry) => entry.type === "reserve").reduce((sum, entry) => sum + entry.amount, 0);
    const released = entries.filter((entry) => entry.type === "release").reduce((sum, entry) => sum + entry.amount, 0);
    const outstandingReserved = reserved - consumed - released;
    const available = granted + adjusted - expired - consumed - outstandingReserved;
    return { workspaceId, productId, granted, adjusted, expired, consumed, outstandingReserved, available };
  }

  entries() {
    return this.log.map(copy);
  }
}
