import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const registryPath = path.join(root, "data", "foundry-product-registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const errors = [];
const enums = {
  status: new Set(["live", "validated", "prototype", "proposed", "blocked"]),
  priceStatus: new Set(["free", "verified", "hypothesis", "evaluation", "not-applicable"]),
  checkoutStatus: new Set(["live", "application", "manual", "not-configured", "not-applicable"]),
  deliveryStatus: new Set(["verified", "manual-verified", "prototype", "not-verified"]),
  supportStatus: new Set(["documented", "manual", "proposed", "none"]),
  updateStatus: new Set(["automated-pr", "release-feed", "manual", "proposed", "none"]),
};

if (registry.schemaVersion !== "1.0") errors.push("schemaVersion must be 1.0");
if (!/^\d{4}-\d{2}-\d{2}$/.test(registry.lastVerified ?? "")) errors.push("lastVerified must be YYYY-MM-DD");
if (!Array.isArray(registry.offers) || registry.offers.length === 0) errors.push("offers must be a non-empty array");

const ids = new Set();
for (const [index, offer] of (registry.offers ?? []).entries()) {
  const at = `offers[${index}]`;
  if (!/^[a-z0-9-]+$/.test(offer.id ?? "")) errors.push(`${at}.id is invalid`);
  if (ids.has(offer.id)) errors.push(`${at}.id duplicates ${offer.id}`);
  ids.add(offer.id);
  for (const field of ["name", "ownerRepo", "license", "nextGate"]) {
    if (typeof offer[field] !== "string" || !offer[field].trim()) errors.push(`${at}.${field} is required`);
  }
  if (!Array.isArray(offer.audience) || offer.audience.length === 0) errors.push(`${at}.audience must be non-empty`);
  if (!Array.isArray(offer.proof)) errors.push(`${at}.proof must be an array`);
  for (const [field, values] of Object.entries(enums)) {
    if (!values.has(offer[field])) errors.push(`${at}.${field} has unsupported value ${offer[field]}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Foundry product registry valid: ${registry.offers.length} offers, verified ${registry.lastVerified}`);
