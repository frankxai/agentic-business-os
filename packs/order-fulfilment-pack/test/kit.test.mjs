import assert from "node:assert/strict";
import fs from "node:fs";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { assess, simulate } from "../kit.mjs";

const fixture = JSON.parse(fs.readFileSync(fileURLToPath(new URL("../fixtures/valid-order.json", import.meta.url)), "utf8"));
const copy = () => structuredClone(fixture);

test("uses native label and tracking, extending only the print gap", () => {
  assert.equal(assess(copy().setup).route, "native-erp-plus-print-gap");
  const result = simulate(copy());
  assert.equal(result.decision, "eligible");
  assert.equal(result.externalActionsTaken, 0);
  assert.equal(result.dryRun, true);
});

test("uses fully native route when printing is verified", () => {
  const input = copy();
  input.setup.nativePrinterRouting = true;
  assert.equal(simulate(input).route, "native-erp");
});

test("blocks unverified account capabilities", () => {
  const input = copy();
  input.setup.capabilitiesVerifiedInAccount = false;
  assert.equal(simulate(input).decision, "blocked");
});

test("blocks duplicate shipment", () => {
  const input = copy();
  input.order.existingShipmentIds = ["DEMO-SHIPMENT-1"];
  assert.match(simulate(input).errors.join(" "), /duplicate/);
});

test("blocks missing measurements and unverified address", () => {
  const input = copy();
  input.order.packages[0].weightKg = 0;
  input.order.addressVerified = false;
  const result = simulate(input);
  assert.equal(result.decision, "blocked");
  assert.equal(result.errors.length, 2);
});

test("requires approval for international shipment", () => {
  const input = copy();
  input.order.destinationCountry = "NL";
  assert.equal(simulate(input).decision, "approval-required");
  input.setup.internationalRequiresApproval = false;
  assert.equal(simulate(input).decision, "blocked");
});

test("blocks missing account-verification note", () => {
  const input = copy();
  delete input.setup.verificationNote;
  assert.equal(assess(input.setup).route, "blocked");
});

test("blocks absent carrier contract even with a declared native integration", () => {
  const input = copy();
  input.setup.carrierContractConfirmed = false;
  assert.equal(simulate(input).decision, "blocked");
});

test("rejects unrecognized top-level fields and malformed shipment identifiers", () => {
  const input = copy();
  input.hiddenAction = "print";
  assert.equal(simulate(input).decision, "blocked");
  delete input.hiddenAction;
  input.order.existingShipmentIds = [null];
  assert.equal(simulate(input).decision, "blocked");
});

test("does not assume an unverified custom API adapter works", () => {
  const input = copy();
  input.setup.nativeLabel = false;
  assert.equal(assess(input.setup).route, "adapter-research-required");
  assert.equal(simulate(input).decision, "blocked");
});
