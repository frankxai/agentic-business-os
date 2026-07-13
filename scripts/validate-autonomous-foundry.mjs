import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const registryPath = path.join(root, "data", "autonomous-foundry-control-plane.json");
const schemaPath = path.join(root, "schemas", "autonomous-foundry-control-plane.schema.json");
const heldJobsPath = path.join(root, "jobs", "swarm", "held");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function add(errors, condition, message) {
  if (!condition) errors.push(message);
}

function uniqueIds(items, label, errors) {
  const ids = new Set();
  for (const [index, item] of items.entries()) {
    add(errors, /^[a-z0-9-]+$/.test(item?.id ?? ""), `${label}[${index}].id is invalid`);
    add(errors, !ids.has(item?.id), `${label}[${index}].id duplicates ${item?.id}`);
    ids.add(item?.id);
  }
  return ids;
}

function validate(registry) {
  const errors = [];
  const levelOrder = new Map(["L0", "L1", "L2", "L3", "L4", "L5"].map((id, index) => [id, index]));

  add(errors, registry?.schemaVersion === "1.0", "schemaVersion must be 1.0");
  add(errors, /^\d{4}-\d{2}-\d{2}$/.test(registry?.lastVerified ?? ""), "lastVerified must be YYYY-MM-DD");
  add(errors, nonEmpty(registry?.program?.id), "program.id is required");
  add(errors, nonEmpty(registry?.program?.thesis), "program.thesis is required");
  add(errors, Array.isArray(registry?.observedState?.evidence) && registry.observedState.evidence.length > 0, "observedState.evidence must be non-empty");

  const autonomyLevels = registry?.autonomyLevels ?? [];
  add(errors, Array.isArray(autonomyLevels) && autonomyLevels.length === 6, "autonomyLevels must contain L0 through L5");
  const autonomyIds = new Set(autonomyLevels.map((level) => level.id));
  for (const id of levelOrder.keys()) add(errors, autonomyIds.has(id), `autonomyLevels is missing ${id}`);
  add(errors, new Set(autonomyLevels.map((level) => level.id)).size === autonomyLevels.length, "autonomyLevels contains duplicate ids");

  const levelById = new Map(autonomyLevels.map((level) => [level.id, level]));
  for (const id of ["L0", "L1"]) {
    add(errors, levelById.get(id)?.publicPaidEligible === false, `${id} cannot be public-paid eligible`);
  }
  add(errors, levelById.get("L3")?.ownUseLicenseEligible === true, "L3 must be own-use-license eligible");
  add(errors, levelById.get("L4")?.recurringEligible === true, "L4 must be recurring eligible");
  add(errors, levelById.get("L5")?.resaleLicenseEligible === true, "L5 must be resale-license eligible");
  add(errors, registry?.licenseGate?.minimumOwnUseLevel === "L3", "minimumOwnUseLevel must remain L3");
  add(errors, registry?.licenseGate?.minimumRecurringLevel === "L4", "minimumRecurringLevel must remain L4");
  add(errors, registry?.licenseGate?.minimumResaleLevel === "L5", "minimumResaleLevel must remain L5");
  add(errors, (registry?.licenseGate?.requirements?.length ?? 0) >= 8, "licenseGate requires at least eight proof conditions");

  const globalHumanGates = new Set(registry?.humanGates ?? []);
  add(errors, globalHumanGates.size === (registry?.humanGates?.length ?? 0), "humanGates contains duplicates");
  for (const required of [
    "production",
    "secrets",
    "billing",
    "pricing",
    "spend",
    "external_send",
    "legal_ip",
    "partner_economics",
    "payout",
    "equity",
    "destructive_action"
  ]) {
    add(errors, globalHumanGates.has(required), `humanGates is missing ${required}`);
  }

  const products = registry?.products ?? [];
  add(errors, Array.isArray(products) && products.length > 0, "products must be non-empty");
  uniqueIds(products, "products", errors);
  const creditPolicyIds = new Set((registry?.creditEconomy?.policies ?? []).map((policy) => policy.id));

  for (const [index, product] of products.entries()) {
    const at = `products[${index}](${product?.id ?? "unknown"})`;
    add(errors, nonEmpty(product?.name), `${at}.name is required`);
    add(errors, nonEmpty(product?.outcome), `${at}.outcome is required`);
    add(errors, levelOrder.has(product?.autonomyLevel), `${at}.autonomyLevel is invalid`);
    add(errors, Array.isArray(product?.audience) && product.audience.length > 0, `${at}.audience must be non-empty`);
    add(errors, Array.isArray(product?.proof), `${at}.proof must be an array`);
    add(errors, nonEmpty(product?.nextGate), `${at}.nextGate is required`);
    add(errors, Array.isArray(product?.humanGates), `${at}.humanGates must be an array`);
    for (const gate of product?.humanGates ?? []) {
      add(errors, globalHumanGates.has(gate), `${at}.humanGates references unknown gate ${gate}`);
    }

    if (product?.credits?.enabled) {
      add(errors, nonEmpty(product.credits.policyId), `${at} enables credits without a policyId`);
      add(errors, creditPolicyIds.has(product.credits.policyId), `${at} references unknown credit policy ${product.credits.policyId}`);
    } else {
      add(errors, product?.credits?.policyId === null, `${at} disables credits but retains a policyId`);
    }

    const level = levelOrder.get(product?.autonomyLevel) ?? -1;
    if (product?.commerce?.status === "live") {
      add(errors, level >= levelOrder.get("L3"), `${at} has live commerce below L3`);
      add(errors, product?.claimStatus !== "unverified", `${at} has live commerce with unverified claims`);
      add(errors, product?.delivery?.status === "verified", `${at} has live commerce without verified delivery`);
      add(errors, !["manual", "manual-verified"].includes(product?.delivery?.status), `${at} uses manual delivery for live commerce`);
    }
    if ((product?.revenueStreams ?? []).includes("subscription") && product?.maturity === "live") {
      add(errors, level >= levelOrder.get("L4"), `${at} is a live subscription below L4`);
    }
    if ((product?.revenueStreams ?? []).includes("net-receipts-share")) {
      add(errors, product?.kind === "venture-program", `${at} uses net-receipts-share outside a venture program`);
      add(errors, (product?.humanGates ?? []).includes("partner_economics"), `${at} lacks the partner_economics gate`);
    }
    if (product?.runtime?.status === "production-verified") {
      add(errors, registry?.observedState?.runtimeClaim === "production-verified", `${at} claims production runtime while observedState does not`);
    }
    if (product?.runtime?.status === "preview-verified") {
      add(errors, ["preview-verified", "production-verified"].includes(registry?.observedState?.runtimeClaim), `${at} claims preview runtime while observedState is design-only`);
    }
  }

  const agents = registry?.agentFleet ?? [];
  add(errors, Array.isArray(agents) && agents.length > 0, "agentFleet must be non-empty");
  uniqueIds(agents, "agentFleet", errors);
  for (const [index, agent] of agents.entries()) {
    const at = `agentFleet[${index}](${agent?.id ?? "unknown"})`;
    add(errors, levelOrder.has(agent?.currentAutonomyLevel), `${at}.currentAutonomyLevel is invalid`);
    add(errors, Array.isArray(agent?.allowedTools) && agent.allowedTools.length > 0, `${at}.allowedTools must be non-empty`);
    add(errors, Array.isArray(agent?.writeScopes) && agent.writeScopes.length > 0, `${at}.writeScopes must be non-empty`);
    add(errors, Array.isArray(agent?.receiptFields) && agent.receiptFields.length > 0, `${at}.receiptFields must be non-empty`);
    if (agent?.runtimeStatus === "production-verified") {
      add(errors, registry?.observedState?.runtimeClaim === "production-verified", `${at} claims production runtime while observedState does not`);
    }
    if (agent?.runtimeStatus === "preview-verified") {
      add(errors, ["preview-verified", "production-verified"].includes(registry?.observedState?.runtimeClaim), `${at} claims preview runtime while observedState is design-only`);
    }
  }
  const verifier = agents.find((agent) => agent.role === "independent-verifier");
  add(errors, Boolean(verifier), "agentFleet requires an independent-verifier role");
  add(errors, verifier?.writeScopes?.every((scope) => /report|receipt|verification/.test(scope)) === true, "independent verifier must have report-only write scope");

  const credits = registry?.creditEconomy;
  add(errors, credits?.transferable === false, "service credits must be non-transferable");
  add(errors, credits?.cashValue === false, "service credits must have no cash value");
  add(errors, credits?.redeemableForCash === false, "service credits must not be redeemable for cash");
  add(errors, credits?.investmentInstrument === false, "service credits must not be an investment instrument");
  const policyIds = uniqueIds(credits?.policies ?? [], "creditEconomy.policies", errors);
  add(errors, policyIds.size > 0, "creditEconomy.policies must be non-empty");
  uniqueIds((credits?.actionRates ?? []).map((rate) => ({ id: rate.action })), "creditEconomy.actionRates", errors);
  for (const [index, rate] of (credits?.actionRates ?? []).entries()) {
    add(errors, Number.isFinite(rate?.credits) && rate.credits >= 0, `creditEconomy.actionRates[${index}].credits must be non-negative`);
  }
  for (const phrase of ["estimate", "reserve", "settle", "release", "receipt"]) {
    add(errors, (credits?.accountingRules ?? []).some((rule) => rule.toLowerCase().includes(phrase)), `creditEconomy.accountingRules must include ${phrase}`);
  }

  add(errors, registry?.commercePolicy?.sourceOfTruth === "internal-entitlement-ledger", "commerce source of truth must remain the internal entitlement ledger");
  add(errors, registry?.commercePolicy?.oneProviderPerSku === true, "oneProviderPerSku must be true");
  const providerIds = uniqueIds(registry?.commercePolicy?.providerAdapters ?? [], "commercePolicy.providerAdapters", errors);
  for (const provider of ["polar", "lemon-squeezy", "existing-provider"]) {
    add(errors, providerIds.has(provider), `commercePolicy is missing ${provider}`);
  }
  const polar = (registry?.commercePolicy?.providerAdapters ?? []).find((provider) => provider.id === "polar");
  add(errors, polar?.notFor?.some((item) => item.includes("marketplace")) === true, "Polar policy must block marketplace use");
  add(errors, polar?.notFor?.some((item) => item.includes("revenue-share")) === true, "Polar policy must block revenue-share resale use");

  const weights = registry?.ventureModel?.scoreWeights ?? [];
  add(errors, weights.reduce((sum, item) => sum + (item?.weight ?? 0), 0) === 100, "venture score weights must total 100");
  add(errors, registry?.ventureModel?.considerationThreshold === 75, "venture consideration threshold must remain 75 unless explicitly revised");
  for (const phrase of ["refund", "provider", "affiliate", "runtime", "reserve"]) {
    add(errors, registry?.ventureModel?.distributableNetReceipts?.deductions?.some((item) => item.includes(phrase)) === true, `net receipts deductions must include ${phrase}`);
  }

  if (registry?.observedState?.ppAdmission === "held") {
    add(errors, registry?.observedState?.queueDispatched === false, "queueDispatched must be false while PP admission is held");
  }
  if (registry?.observedState?.vercelAgentRunProjectsLast30Days === 0) {
    add(errors, registry?.observedState?.runtimeClaim === "design-only", "zero observed Vercel Agent Run projects requires a design-only runtime claim");
  }

  return errors;
}

function validateHeldJobs(jobs, teamContract, registry) {
  const errors = [];
  const allowedAgents = new Set(["codex", "claude", "grok", "antigravity", "agy", "noop"]);
  const jobIds = uniqueIds(jobs, "heldJobs", errors);

  add(errors, jobs.length >= 4, "held swarm packet must contain at least four jobs");
  add(errors, teamContract?.status === "held-by-pp", "team contract must remain held-by-pp");
  add(errors, teamContract?.selectedRoles?.length === 4, "team contract must contain the selected four-role team");
  add(errors, teamContract?.selectedRoles?.some((role) => role.id === "coordinator"), "team contract requires a coordinator");
  add(errors, teamContract?.selectedRoles?.some((role) => role.id === "qa-release-sre-verifier"), "team contract requires an independent verifier");

  const exactScopes = new Map();
  for (const [index, job] of jobs.entries()) {
    const at = `heldJobs[${index}](${job?.id ?? "unknown"})`;
    add(errors, Number.isInteger(job?.priority) && job.priority >= 1 && job.priority <= 9, `${at}.priority must be an integer from 1 to 9`);
    add(errors, allowedAgents.has(job?.agent), `${at}.agent is unsupported`);
    add(errors, /^[A-Za-z]:\\/.test(job?.repo ?? ""), `${at}.repo must be an absolute Windows path`);
    add(errors, Number.isInteger(job?.maxMinutes) && job.maxMinutes > 0 && job.maxMinutes <= 120, `${at}.maxMinutes must be between 1 and 120`);
    add(errors, job?.risk === "normal", `${at}.risk must remain normal while held`);
    add(errors, job?.allowDangerous === false, `${at}.allowDangerous must remain false`);
    add(errors, job?.status === "held-by-pp", `${at}.status must remain held-by-pp`);
    add(errors, Array.isArray(job?.dependsOn), `${at}.dependsOn must be an array`);
    add(errors, Array.isArray(job?.writeScope) && job.writeScope.length > 0, `${at}.writeScope must be non-empty`);
    add(errors, /^[A-Za-z]:\\/.test(job?.resultRef ?? ""), `${at}.resultRef must be an absolute Windows path`);
    add(errors, nonEmpty(job?.prompt) && /done (when|only when)/i.test(job.prompt), `${at}.prompt must contain an explicit done condition`);
    for (const dependency of job?.dependsOn ?? []) {
      add(errors, jobIds.has(dependency), `${at} depends on unknown job ${dependency}`);
      add(errors, dependency !== job.id, `${at} cannot depend on itself`);
    }
    for (const scope of job?.writeScope ?? []) {
      if (!exactScopes.has(scope)) exactScopes.set(scope, job.id);
      else errors.push(`${at}.writeScope duplicates ${scope} from ${exactScopes.get(scope)}`);
    }
  }

  const visiting = new Set();
  const visited = new Set();
  const byId = new Map(jobs.map((job) => [job.id, job]));
  function visit(id) {
    if (visiting.has(id)) {
      errors.push(`heldJobs dependency cycle includes ${id}`);
      return;
    }
    if (visited.has(id) || !byId.has(id)) return;
    visiting.add(id);
    for (const dependency of byId.get(id).dependsOn ?? []) visit(dependency);
    visiting.delete(id);
    visited.add(id);
  }
  for (const id of jobIds) visit(id);

  const verifierJob = jobs.find((job) => job.id.includes("verifier"));
  const builderAgents = new Set(jobs.filter((job) => !job.id.includes("verifier") && !job.id.includes("coordinator")).map((job) => job.agent));
  add(errors, Boolean(verifierJob), "held swarm packet requires a verifier job");
  add(errors, verifierJob && !builderAgents.has(verifierJob.agent), "verifier must use a provider different from every builder");
  add(errors, verifierJob?.writeScope?.every((scope) => /queen\\reports|verification/i.test(scope)) === true, "verifier job must be report-only");

  if (registry?.observedState?.ppAdmission === "held") {
    add(errors, jobs.every((job) => job.status === "held-by-pp"), "all jobs must remain held while PP admission is held");
    add(errors, registry.observedState.queueDispatched === false, "registry must record queueDispatched false while held jobs exist");
  }
  return errors;
}

function validateDocumentation() {
  const errors = [];
  const files = [
    "README.md",
    "docs/strategy/autonomous-product-foundry-master-plan-2026-07-14.md",
    "docs/architecture/autonomous-foundry-control-plane.md",
    "docs/product/autonomous-product-ladder-and-delivery.md",
    "docs/product/partner-and-venture-economics.md",
    "docs/roadmap/autonomous-foundry-blitzscale-roadmap.md",
    "docs/design/autonomous-foundry-experience-spec.md",
    "docs/design/autonomous-foundry-design-loop-evidence.json",
    "packages/foundry-control-plane/README.md",
    "packages/foundry-control-plane/src/index.mjs",
    "packages/foundry-control-plane/tests/control-plane.test.mjs"
  ];
  let mermaidBlocks = 0;
  for (const relative of files) {
    const absolute = path.join(root, relative);
    add(errors, fs.existsSync(absolute), `Required artifact is missing: ${relative}`);
    if (!fs.existsSync(absolute) || !relative.endsWith(".md")) continue;
    const source = fs.readFileSync(absolute, "utf8");
    const fences = source.match(/^```/gm)?.length ?? 0;
    add(errors, fences % 2 === 0, `${relative} contains an unclosed code fence`);
    mermaidBlocks += source.match(/^```mermaid$/gm)?.length ?? 0;
    for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1].trim();
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      const clean = target.replace(/^<|>$/g, "").split("#")[0];
      if (!clean) continue;
      const resolved = path.resolve(path.dirname(absolute), clean);
      add(errors, fs.existsSync(resolved), `${relative} links to missing local target ${target}`);
    }
  }
  add(errors, mermaidBlocks >= 5, "Autonomous Foundry documentation must retain at least five exact Mermaid diagrams");
  return { errors, fileCount: files.length, mermaidBlocks };
}

function runSelfTests(validRegistry) {
  const tests = [
    ["duplicate product", (data) => data.products.push(clone(data.products[0]))],
    ["transferable credits", (data) => { data.creditEconomy.transferable = true; }],
    ["live checkout below L3", (data) => { data.products[1].commerce.status = "live"; data.products[1].delivery.status = "verified"; }],
    ["held queue dispatched", (data) => { data.observedState.queueDispatched = true; }],
    ["venture weights do not total 100", (data) => { data.ventureModel.scoreWeights[0].weight = 19; }],
    ["unobserved production runtime", (data) => { data.agentFleet[0].runtimeStatus = "production-verified"; }],
    ["unknown human gate", (data) => { data.products[0].humanGates.push("imaginary_gate"); }]
  ];

  const failures = [];
  for (const [name, mutate] of tests) {
    const fixture = clone(validRegistry);
    mutate(fixture);
    if (validate(fixture).length === 0) failures.push(name);
  }
  if (failures.length) throw new Error(`Self-tests failed to reject: ${failures.join(", ")}`);
  return tests.length;
}

function runHeldJobSelfTests(validJobs, teamContract, registry) {
  const tests = [
    ["queued job while PP is held", (jobs) => { jobs[0].status = "queued"; }],
    ["dangerous authority enabled", (jobs) => { jobs[1].allowDangerous = true; }],
    ["missing done condition", (jobs) => { jobs[2].prompt = "Draft an experiment."; }]
  ];
  const failures = [];
  for (const [name, mutate] of tests) {
    const jobs = clone(validJobs);
    mutate(jobs);
    if (validateHeldJobs(jobs, teamContract, registry).length === 0) failures.push(name);
  }
  if (failures.length) throw new Error(`Held-job self-tests failed to reject: ${failures.join(", ")}`);
  return tests.length;
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const heldJobs = fs.readdirSync(heldJobsPath)
  .filter((name) => /^\d{2}-.+\.json$/.test(name))
  .sort()
  .map((name) => JSON.parse(fs.readFileSync(path.join(heldJobsPath, name), "utf8")));
const teamContract = JSON.parse(fs.readFileSync(path.join(heldJobsPath, "team-contract.json"), "utf8"));
if (schema?.$schema !== "https://json-schema.org/draft/2020-12/schema") {
  console.error("Schema must declare JSON Schema draft 2020-12");
  process.exit(1);
}

const docs = validateDocumentation();
const errors = [...validate(registry), ...validateHeldJobs(heldJobs, teamContract, registry), ...docs.errors];
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

let suffix = "";
if (process.argv.includes("--self-test")) {
  const count = runSelfTests(registry) + runHeldJobSelfTests(heldJobs, teamContract, registry);
  suffix = `; ${count} negative policy fixtures rejected`;
}

console.log(`Autonomous Foundry control plane valid: ${registry.products.length} products, ${registry.agentFleet.length} agents, ${registry.creditEconomy.policies.length} credit policies, ${heldJobs.length} held jobs, ${docs.fileCount} required artifacts, ${docs.mermaidBlocks} diagrams${suffix}`);
