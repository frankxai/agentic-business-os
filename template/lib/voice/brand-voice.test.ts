import test from "node:test";
import assert from "node:assert";
import { BANNED_PHRASES, BLOCKED_CLAIM_PATTERNS, APPROVED_FRAMING, BRAND_TERMS, MARKETS, UNITS } from "./brand-voice.ts";

test("brand-voice - BANNED_PHRASES", () => {
  assert.ok(Array.isArray(BANNED_PHRASES));
  assert.ok(BANNED_PHRASES.includes("delve"));
  assert.ok(BANNED_PHRASES.includes("dive into"));
});

test("brand-voice - BLOCKED_CLAIM_PATTERNS", () => {
  assert.ok(Array.isArray(BLOCKED_CLAIM_PATTERNS));
  assert.ok(BLOCKED_CLAIM_PATTERNS.includes("clinically proven"));
  assert.ok(BLOCKED_CLAIM_PATTERNS.includes("doctor[- ]recommended"));
});

test("brand-voice - APPROVED_FRAMING", () => {
  assert.ok(Array.isArray(APPROVED_FRAMING));
  assert.ok(APPROVED_FRAMING.includes("designed around the research on"));
  assert.ok(APPROVED_FRAMING.includes("studies have observed"));
});

test("brand-voice - BRAND_TERMS", () => {
  assert.ok(BRAND_TERMS.product);
  assert.ok(Array.isArray(BRAND_TERMS.forbidden));
});

test("brand-voice - MARKETS and UNITS", () => {
  assert.ok(Array.isArray(MARKETS));
  assert.strictEqual(UNITS, "metric");
});
