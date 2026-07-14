import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataPath = path.join(root, "data", "global-builder-fellowship-pilot.json");
const schemaPath = path.join(root, "schemas", "global-builder-fellowship-pilot.schema.json");
const program = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const errors = [];

function requireValue(condition, message) {
  if (!condition) errors.push(message);
}

function has(values, item) {
  return Array.isArray(values) && values.includes(item);
}

requireValue(schema.$schema === "https://json-schema.org/draft/2020-12/schema", "schema must declare JSON Schema 2020-12");
requireValue(program.schemaVersion === "starlight.globalBuilderFellowshipPilot.v1", "unexpected schemaVersion");
requireValue(program.program?.state === "draft-only", "program must remain draft-only until a human explicitly changes the contract");
requireValue(Number.isInteger(program.pilot?.maximumFellows) && program.pilot.maximumFellows > 0 && program.pilot.maximumFellows <= 30, "maximumFellows must be an integer from 1 to 30");
requireValue(program.pilot?.selectionMode === "blind-first-round-two-independent-reviewers", "selectionMode must preserve blind first review and two independent reviewers");
requireValue(program.selection?.blindFirstReview === true, "blindFirstReview must be true");
requireValue(Number.isInteger(program.selection?.minimumIndependentReviewers) && program.selection.minimumIndependentReviewers >= 2, "at least two independent reviewers are required");

const requiredStages = ["discover", "prove", "build", "connect", "compound"];
const stageIds = new Set((program.stages ?? []).map((stage) => stage.id));
for (const stage of requiredStages) requireValue(stageIds.has(stage), `missing required stage: ${stage}`);

const weights = (program.selection?.criteria ?? []).reduce((sum, criterion) => sum + criterion.weight, 0);
requireValue(weights === 100, `selection criteria must total 100, received ${weights}`);
for (const signal of ["social-following", "ability-to-pay", "elite-affiliation"]) {
  requireValue(has(program.selection?.excludedSignals, signal), `selection must exclude ${signal}`);
}

for (const protection of ["ipDefault", "compensation", "dataBoundary", "publicity", "appeal"]) {
  requireValue(Boolean(program.participantProtections?.[protection]), `missing participant protection: ${protection}`);
}

requireValue(program.supporterRoom?.state === "proposed-private", "supporter room must remain proposed-private");
for (const forbidden of [
  "public investment solicitation",
  "transaction-based introduction fees",
  "participant-data sharing without consent",
  "unpaid sponsor or client work",
  "automatic equity, revenue-share, employment, or IP claims"
]) {
  requireValue(has(program.supporterRoom?.forbidden, forbidden), `supporter room must forbid: ${forbidden}`);
}

requireValue(program.externalActions?.allowed === false, "external actions must remain blocked in the draft contract");
for (const action of ["outreach", "participant intake", "payments or prizes", "investor introductions"]) {
  requireValue(has(program.externalActions?.blocked, action), `draft must block: ${action}`);
}

for (const gate of [
  "country-partner-and-listening-review",
  "participant-terms-ip-privacy-safeguarding-review",
  "payment-tax-and-classification-review",
  "budget-and-steward-compensation-approval",
  "public-claims-and-brand-approval",
  "supporter-boundary-and-conflict-review",
  "separate-legal-review-for-any-investment-or-commercial-transaction"
]) {
  requireValue(has(program.approvalGates, gate), `missing approval gate: ${gate}`);
}

const requiredSurfaces = ["agentic-business-os", "gencreator.community", "starlight-communities", "agentic-investor-os"];
const surfaces = new Set((program.integrationContracts ?? []).map((contract) => contract.surface));
for (const surface of requiredSurfaces) requireValue(surfaces.has(surface), `missing integration contract: ${surface}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Global Builder Fellowship contract valid: ${program.program.workingName} (${program.pilot.maximumFellows}-fellow maximum, ${program.program.state})`);
