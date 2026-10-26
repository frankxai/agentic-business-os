import { projectDeliveryPlan } from '../graph.mjs';

export const editionLabels = { marketing: 'A distinctive website', application: 'A useful application', commerce: 'A considered storefront', platform: 'An intelligent platform' };
export const platformLabels = { custom: 'Owned code', framer: 'Framer', webflow: 'Webflow', shopify: 'Shopify' };

export function selectedRequirements(definitions, edition, extras = []) {
  if (!Object.hasOwn(definitions.editions, edition) || !Array.isArray(extras) || extras.some(id => !definitions.features.includes(id))) throw new Error('Choose a supported project type and capabilities.');
  const features = new Set([...definitions.editions[edition], ...extras]);
  if (features.has('tenancy')) { features.add('auth'); features.add('data'); }
  if (features.has('payments')) features.add('data');
  return definitions.requirements.filter(item => item.when === 'all' || features.has(item.when));
}

export function validateBrief(input) {
  const errors = {};
  if (typeof input?.name !== 'string' || input.name.trim().length < 2 || input.name.trim().length > 80) errors.name = 'Use a project name between 2 and 80 characters.';
  if (typeof input?.outcome !== 'string' || input.outcome.trim().length < 10 || input.outcome.trim().length > 600) errors.outcome = 'Describe the useful outcome in 10–600 characters.';
  if (!Object.hasOwn(editionLabels, input?.edition)) errors.edition = 'Choose one of the four project types.';
  if (!Object.hasOwn(platformLabels, input?.platform)) errors.platform = 'Choose a delivery preference.';
  if (!Array.isArray(input?.features) || input.features.some(id => !['ai', 'payments', 'locales', 'email'].includes(id)) || new Set(input.features).size !== input.features.length) errors.features = 'Choose each supported capability once.';
  return errors;
}

export function createProject(input) {
  const errors = validateBrief(input);
  if (Object.keys(errors).length) throw new Error(Object.values(errors).join(' '));
  return {
    schemaVersion: 1,
    id: input.name.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'new-project',
    name: input.name.trim(), owner: '', buyer: '', job: input.outcome.trim(), successMeasure: '',
    edition: input.edition, platform: input.platform, features: [...input.features],
    targetRevision: null, productPacketRef: null, maxEvidenceAgeDays: 30, domains: [], evidence: [],
  };
}

export function describeProject(input, definitions, graph) {
  const project = createProject(input);
  const requirements = selectedRequirements(definitions, project.edition, project.features);
  const report = { project: project.id, requiredChecks: requirements.length, setupGaps: ['Confirm owner, audience, success measure and implementation scope.'], checks: requirements.map(item => ({ id: item.id, result: 'missing' })) };
  const plan = projectDeliveryPlan(graph, report, definitions.requirements.map(item => item.id));
  const applicationFeatures = requirements.some(item => ['authentication', 'ai-evaluation', 'data-lifecycle'].includes(item.id));
  const note = ['framer', 'webflow'].includes(project.platform) && applicationFeatures
    ? 'Your chosen builder can provide the website layer. The application capabilities need a separately designed backend and integration review.'
    : project.platform === 'shopify' && project.edition !== 'commerce'
      ? 'Shopify is a commerce preference. Confirm the store requirement before choosing it for this project.'
      : 'Confirm the platform against your editing needs, integrations, ownership and ongoing costs.';
  return { project, requirements, plan, note };
}

export function formatBriefMarkdown(prepared) {
  const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replace(/([\\`*_{}\[\]#|])/g,'\\$1');
  const { project, requirements, plan, note } = prepared;
  return [
    `# ${escape(project.name)}`, '', '## The useful outcome', '', escape(project.job), '',
    `Project type: ${editionLabels[project.edition]}`, `Delivery preference: ${platformLabels[project.platform]}`, '',
    '## Architecture to confirm', '', note, '', '## Delivery outline', '',
    ...requirements.map(item=>`- **${escape(item.label)}:** ${escape(item.acceptance)}`), '',
    '## Work sequence', '', ...plan.nodes.filter(node=>node.state!=='not-applicable').map((node,index)=>`${index+1}. **${escape(node.label)}:** ${escape(node.artifact)}.`), '',
    '## Decisions still to make', '', '- Name the owner and intended audience.', '- Agree the scope, success measure, costs and delivery responsibilities.', '- Confirm native platform capabilities and account ownership.', '- Record the implementation revision and verification evidence.', '',
    'This is a planning brief. No production checks, release approval, budget or delivery date are implied.', '',
  ].join('\n');
}
