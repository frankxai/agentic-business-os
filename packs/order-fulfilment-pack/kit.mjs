import fs from "node:fs";
import { pathToFileURL } from "node:url";

const requiredString = (value) => typeof value === "string" && value.trim().length > 0;
const flag = (value) => typeof value === "boolean";
const setupKeys = new Set([
  "erp", "carrier", "capabilitiesVerifiedInAccount", "nativeLabel",
  "nativeTrackingWriteback", "nativePrinterRouting", "apiAccess",
  "carrierContractConfirmed", "sourceOfTruth", "humanOwner", "verificationNote"
]);
const orderKeys = new Set([
  "id", "status", "destinationCountry", "addressVerified", "packages", "existingShipmentIds"
]);
const packageKeys = new Set(["weightKg", "lengthCm", "widthCm", "heightCm"]);
const rejectUnknown = (value, allowed, label, errors) => {
  for (const key of Object.keys(value)) if (!allowed.has(key)) errors.push(`${label}.${key} is not supported`);
};

export function assess(setup) {
  const errors = [];
  if (!setup || typeof setup !== "object" || Array.isArray(setup)) {
    return { ready: false, route: "blocked", errors: ["setup must be an object"] };
  }
  rejectUnknown(setup, setupKeys, "setup", errors);
  for (const key of ["erp", "carrier", "sourceOfTruth", "humanOwner", "verificationNote"]) {
    if (!requiredString(setup[key])) errors.push(`${key} is required`);
  }
  for (const key of [
    "capabilitiesVerifiedInAccount", "nativeLabel", "nativeTrackingWriteback",
    "nativePrinterRouting", "apiAccess", "carrierContractConfirmed"
  ]) {
    if (!flag(setup[key])) errors.push(`${key} must be a boolean`);
  }
  if (setup.sourceOfTruth !== "erp") errors.push("ERP must remain the source of truth");
  if (errors.length) return { ready: false, route: "blocked", errors };
  if (!setup.capabilitiesVerifiedInAccount) {
    return { ready: false, route: "blocked", errors: ["native capabilities are not verified in this account"] };
  }
  if (!setup.carrierContractConfirmed) {
    return { ready: false, route: "blocked", errors: ["carrier contract/product is not confirmed"] };
  }
  if (setup.nativeLabel && setup.nativeTrackingWriteback) {
    return {
      ready: true,
      route: setup.nativePrinterRouting ? "native-erp" : "native-erp-plus-print-gap",
      errors: [],
      reason: setup.nativePrinterRouting
        ? "Input declares ERP label, tracking, and printing verified in the buyer account"
        : "Input declares ERP label and tracking verified; assess printer routing only"
    };
  }
  if (!setup.apiAccess) {
    return { ready: false, route: "blocked", errors: ["no complete native path and ERP API access is unconfirmed"] };
  }
  return {
    ready: false,
    route: "adapter-research-required",
    errors: ["verify current ERP and carrier APIs in a sandbox before implementing an adapter"]
  };
}

export function simulate(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { dryRun: true, decision: "blocked", errors: ["input must be an object"] };
  }
  const inputErrors = [];
  rejectUnknown(input, new Set(["setup", "order"]), "input", inputErrors);
  if (inputErrors.length) return { dryRun: true, decision: "blocked", errors: inputErrors };
  const assessment = assess(input?.setup);
  if (!assessment.ready) return { dryRun: true, decision: "blocked", assessment };
  const order = input?.order;
  const errors = [];
  if (!order || typeof order !== "object" || Array.isArray(order)) {
    errors.push("order must be an object");
  } else {
    rejectUnknown(order, orderKeys, "order", errors);
    if (!requiredString(order.id)) errors.push("order.id is required");
    if (order.status !== "READY_TO_SHIP") errors.push("order is not READY_TO_SHIP");
    if (!/^[A-Z]{2}$/.test(order.destinationCountry ?? "")) errors.push("destinationCountry must be a two-letter country code");
    if (order.addressVerified !== true) errors.push("shipping address requires human verification");
    if (!Array.isArray(order.existingShipmentIds)) errors.push("existingShipmentIds must be an array");
    else if (order.existingShipmentIds.some((id) => !requiredString(id))) errors.push("existingShipmentIds must contain non-empty strings");
    else if (order.existingShipmentIds.length) errors.push("order already has a shipment; do not create a duplicate");
    if (!Array.isArray(order.packages) || order.packages.length === 0) errors.push("at least one package is required");
    else for (const [index, item] of order.packages.entries()) {
      if (!item || typeof item !== "object" || Array.isArray(item)) {
        errors.push(`packages[${index}] must be an object`);
        continue;
      }
      rejectUnknown(item, packageKeys, `packages[${index}]`, errors);
      for (const key of ["weightKg", "lengthCm", "widthCm", "heightCm"]) {
        if (!Number.isFinite(item?.[key]) || item[key] <= 0) errors.push(`packages[${index}].${key} must be positive`);
      }
    }
  }
  if (errors.length) return { dryRun: true, decision: "blocked", errors, assessment };
  const international = order.destinationCountry !== "DE";
  return {
    dryRun: true,
    decision: international ? "approval-required" : "eligible",
    route: assessment.route,
    idempotencyKey: `${input.setup.erp}:${order.id}:${input.setup.carrier}`,
    nextAction: assessment.route === "native-erp-plus-print-gap"
      ? "Use ERP's native label/tracking; separately verify approved printer routing"
      : "Use ERP's native label/tracking/print path",
    externalActionsTaken: 0
  };
}

function main() {
  const [command, file] = process.argv.slice(2);
  if (!["assess", "simulate"].includes(command) || !file) {
    process.stderr.write("Usage: node kit.mjs <assess|simulate> <local-json-file>\n");
    process.exitCode = 2;
    return;
  }
  try {
    const input = JSON.parse(fs.readFileSync(file, "utf8"));
    const result = command === "assess" ? assess(input.setup) : simulate(input);
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    if ((!result.ready && command === "assess") || result.decision === "blocked") process.exitCode = 1;
  } catch (error) {
    process.stderr.write(`Cannot read input: ${error.message}\n`);
    process.exitCode = 2;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
