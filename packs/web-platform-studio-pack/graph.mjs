// Pure dependency projection. No scheduling, tools, authority or network access.
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const slug = value => typeof value === 'string' && /^[a-z][a-z0-9-]{0,63}$/.test(value);
export function compileDeliveryGraph(graph, requirementIds) {
  if (!isObject(graph) || graph.schemaVersion !== 1 || !Array.isArray(graph.nodes) || !graph.nodes.length || graph.nodes.length > 64) throw new Error('Expected a version 1 graph with 1–64 nodes.');
  const nodes = new Map();
  const assigned = new Set();
  const allowed = new Set(requirementIds);
  let setupNodes = 0;
  for (const node of graph.nodes) {
    if (!isObject(node) || !slug(node.id) || nodes.has(node.id)) throw new Error('Invalid or duplicate graph node.');
    if (typeof node.label !== 'string' || !node.label.trim() || typeof node.artifact !== 'string' || !node.artifact.trim()) throw new Error('Graph node needs a label and output artifact.');
    if (!Array.isArray(node.dependsOn) || !Array.isArray(node.checks) || new Set(node.dependsOn).size !== node.dependsOn.length) throw new Error('Invalid dependencies or checks.');
    if (node.setup !== undefined && node.setup !== true) throw new Error('Unknown setup gate.');
    if (node.setup) { setupNodes++; if (node.dependsOn.length || node.checks.length) throw new Error('Setup is a root gate.'); }
    for (const check of node.checks) {
      if (!allowed.has(check) || assigned.has(check)) throw new Error('Unknown or multiply assigned requirement.');
      assigned.add(check);
    }
    nodes.set(node.id, node);
  }
  if (setupNodes !== 1 || assigned.size !== allowed.size) throw new Error('Graph must cover every requirement exactly once and have one setup gate.');
  for (const node of nodes.values()) {
    if (node.dependsOn.some(id => !nodes.has(id) || id === node.id)) throw new Error('Missing dependency or self-cycle.');
    if (!node.setup && !node.dependsOn.length) throw new Error('Every work node must depend on the setup root.');
  }
  const order = [], visiting = new Set(), visited = new Set();
  function visit(id) {
    if (visiting.has(id)) throw new Error('Cycle in delivery graph.');
    if (visited.has(id)) return;
    visiting.add(id);
    for (const parent of nodes.get(id).dependsOn) visit(parent);
    visiting.delete(id); visited.add(id); order.push(nodes.get(id));
  }
  for (const id of nodes.keys()) visit(id);
  return order;
}

export function projectDeliveryPlan(graph, report, allRequirementIds) {
  const order = compileDeliveryGraph(graph, allRequirementIds);
  if (!isObject(report) || !Array.isArray(report.checks) || !report.checks.length || report.requiredChecks !== report.checks.length || !Array.isArray(report.setupGaps)) throw new Error('A valid project inspection report is required.');
  const checks = new Map();
  for (const check of report.checks) {
    if (!isObject(check) || !allRequirementIds.includes(check.id) || checks.has(check.id) || typeof check.result !== 'string') throw new Error('Invalid or duplicate inspection check.');
    checks.set(check.id, check);
  }
  const states = new Map();
  const nodes = order.map(node => {
    const relevant = node.checks.filter(id => checks.has(id));
    const blockedBy = node.dependsOn.filter(id => !['recorded', 'not-applicable'].includes(states.get(id)));
    const missing = node.setup ? report.setupGaps : relevant.filter(id => checks.get(id).result !== 'pass-recorded');
    let state;
    if (!node.setup && !relevant.length) state = 'not-applicable';
    else if (blockedBy.length) state = 'blocked';
    else if (missing.length) state = 'ready-for-work';
    else state = 'recorded';
    states.set(node.id, state);
    return { id: node.id, label: node.label, state, dependsOn: node.dependsOn, blockedBy, missing, artifact: node.artifact };
  });
  return { schemaVersion: 1, kind: 'procedural-projection', project: report.project, nodes,
    ready: nodes.filter(node => node.state === 'ready-for-work').map(node => node.id),
    next: nodes.find(node => node.state === 'ready-for-work')?.artifact || 'Review the host release gate and evidence truth.',
    dispatchAuthorized: false, releaseAuthorized: false,
    note: 'Dependency projection only. Recorded receipts remain unverified assertions; this is not a scheduler or an approval record.' };
}
