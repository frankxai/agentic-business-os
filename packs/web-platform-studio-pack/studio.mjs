#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { projectDeliveryPlan } from './graph.mjs';

const pack = import.meta.dirname;
const MAX_JSON = 1024 * 1024;
const MAX_EVIDENCE = 8 * 1024 * 1024;
const definitions = JSON.parse(fs.readFileSync(path.join(pack, 'requirements.json'), 'utf8'));
const deliveryGraph = JSON.parse(fs.readFileSync(path.join(pack, 'delivery-graph.json'), 'utf8'));
const platforms = ['undecided', 'nextjs', 'astro', 'framer', 'webflow', 'shopify', 'wordpress', 'wix-studio', 'lovable', 'bolt', 'replit', 'custom'];
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const revision = value => typeof value === 'string' && /^[a-f0-9]{40,64}$/.test(value);
const digest = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
export const sha256 = bytes => crypto.createHash('sha256').update(bytes).digest('hex');

function noLinks(target) {
  let current = path.resolve(target);
  while (true) {
    try {
      if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Symbolic links and junctions are not supported in packet paths.');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    const parent = path.dirname(current);
    if (parent === current) return;
    current = parent;
  }
}

function readJson(file) {
  noLinks(file);
  const stat = fs.statSync(file);
  if (!stat.isFile() || stat.size > MAX_JSON) throw new Error('Expected a JSON file smaller than 1 MiB.');
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { throw new Error('Invalid JSON in project record.'); }
}

function knownKeys(value, allowed, label, errors) {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) errors.push(`${label}: unknown field (check the documented record format).`);
  }
}

export function effectiveFeatures(project) {
  const features = new Set([...(definitions.editions[project.edition] || []), ...(project.features || [])]);
  if (features.has('tenancy')) { features.add('auth'); features.add('data'); }
  if (features.has('payments')) features.add('data');
  return [...features];
}

export function requirementsFor(project) {
  const features = effectiveFeatures(project);
  return definitions.requirements.filter(item => item.when === 'all' || features.includes(item.when));
}

function safeEvidenceName(value) {
  return typeof value === 'string' && /^evidence\/[a-zA-Z0-9][a-zA-Z0-9_./-]*$/.test(value)
    && value.split('/').every(part => part && part !== '.' && part !== '..' && !part.endsWith('.'));
}

export function validateProject(project) {
  const errors = [];
  if (!record(project)) return ['Project must be a JSON object.'];
  knownKeys(project, ['schemaVersion', 'id', 'name', 'owner', 'buyer', 'job', 'successMeasure', 'edition', 'platform', 'features', 'targetRevision', 'productPacketRef', 'maxEvidenceAgeDays', 'domains', 'evidence'], 'project', errors);
  if (project.schemaVersion !== 1) errors.push('schemaVersion must be 1.');
  if (typeof project.id !== 'string' || !/^[a-z0-9][a-z0-9-]{0,79}$/.test(project.id)) errors.push('id must be a short lowercase slug.');
  if (!nonempty(project.name)) errors.push('name is required.');
  for (const key of ['owner', 'buyer', 'job', 'successMeasure']) {
    if (typeof project[key] !== 'string') errors.push(`${key} must be a string; use empty for undecided.`);
  }
  const editionValid = Object.hasOwn(definitions.editions, project.edition);
  if (!editionValid) errors.push('Unknown edition.');
  if (!platforms.includes(project.platform)) errors.push('Unknown platform; use custom for an unlisted platform.');
  const featuresValid = Array.isArray(project.features) && project.features.every(value => definitions.features.includes(value));
  if (!featuresValid || new Set(project.features || []).size !== project.features?.length) errors.push('features must contain unique supported feature names.');
  if (project.targetRevision !== null && !revision(project.targetRevision)) errors.push('targetRevision must be a lowercase commit or artifact digest (40–64 hex characters), or null.');
  if (project.productPacketRef !== null && !nonempty(project.productPacketRef)) errors.push('productPacketRef must be null or a reference string.');
  if (!Number.isInteger(project.maxEvidenceAgeDays) || project.maxEvidenceAgeDays < 1 || project.maxEvidenceAgeDays > 30) errors.push('maxEvidenceAgeDays must be 1–30.');
  if (!Array.isArray(project.domains)) errors.push('domains must be an array.');
  else {
    const hosts = new Set();
    for (const domain of project.domains) {
      if (!record(domain)) { errors.push('Each domain must be an object.'); continue; }
      knownKeys(domain, ['hostname', 'role', 'owner', 'registryRef'], 'domain', errors);
      if (typeof domain.hostname !== 'string' || domain.hostname.length > 253 || !/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(domain.hostname)) errors.push('hostname must be a plain lowercase public DNS name.');
      if (hosts.has(domain.hostname)) errors.push('Duplicate domain hostname.');
      hosts.add(domain.hostname);
      if (!['canonical', 'redirect', 'preview', 'mail'].includes(domain.role)) errors.push('Domain role must be canonical, redirect, preview or mail.');
      if (!nonempty(domain.owner) || !nonempty(domain.registryRef)) errors.push('Each domain needs an owner and existing registry/account reference.');
    }
    if (project.domains.filter(domain => domain?.role === 'canonical').length > 1) errors.push('Record one canonical hostname per project.');
  }
  if (!Array.isArray(project.evidence)) errors.push('evidence must be an array.');
  else {
    const ids = new Set();
    const active = featuresValid && editionValid ? new Set(requirementsFor(project).map(item => item.id)) : new Set();
    for (const receipt of project.evidence) {
      if (!record(receipt)) { errors.push('Each evidence receipt must be an object.'); continue; }
      knownKeys(receipt, ['requirement', 'status', 'path', 'sha256', 'reviewer', 'independent', 'recordedAt', 'targetRevision', 'notes'], 'receipt', errors);
      if (!active.has(receipt.requirement)) errors.push('Receipt refers to an unknown or inactive requirement.');
      if (ids.has(receipt.requirement)) errors.push('Duplicate evidence requirement; retain history in evidence files and record the current receipt once.');
      ids.add(receipt.requirement);
      if (!['pass', 'fail', 'pending'].includes(receipt.status)) errors.push('Evidence status must be pass, fail or pending.');
      if (receipt.status === 'pending') {
        if (Object.keys(receipt).some(key => !['requirement', 'status', 'notes'].includes(key))) errors.push('Pending receipts contain only requirement, status and optional notes.');
      } else {
        if (!safeEvidenceName(receipt.path)) errors.push('Evidence path must stay under evidence/ using portable relative names.');
        if (!digest(receipt.sha256)) errors.push('Evidence sha256 must be 64 lowercase hex characters.');
        if (!nonempty(receipt.reviewer)) errors.push('Evidence reviewer is required.');
        if (typeof receipt.independent !== 'boolean') errors.push('Evidence independent must be a boolean.');
        const instant = typeof receipt.recordedAt === 'string' ? Date.parse(receipt.recordedAt) : NaN;
        if (!Number.isFinite(instant) || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(receipt.recordedAt) || new Date(instant).toISOString() !== receipt.recordedAt.replace(/(?<=:\d{2})Z$/, '.000Z')) errors.push('Evidence recordedAt must be a valid UTC ISO timestamp.');
        if (!revision(receipt.targetRevision)) errors.push('Evidence targetRevision is required.');
      }
      if (receipt.notes !== undefined && typeof receipt.notes !== 'string') errors.push('Evidence notes must be a string.');
    }
  }
  return errors;
}

function inspectReceipt(root, project, item, now) {
  const receipt = project.evidence.find(value => value.requirement === item.id);
  if (!receipt || receipt.status === 'pending') return 'missing';
  if (receipt.targetRevision !== project.targetRevision) return 'wrong-revision';
  const age = now - Date.parse(receipt.recordedAt);
  if (age < 0) return 'future-dated';
  if (age > project.maxEvidenceAgeDays * 86400000) return 'stale';
  if (item.independent && (!receipt.independent || receipt.reviewer.trim().toLowerCase() === project.owner.trim().toLowerCase())) return 'independent-review-missing';
  try {
    const studioRoot = path.join(root, '.studio');
    const evidenceRoot = path.join(studioRoot, 'evidence');
    const file = path.resolve(studioRoot, receipt.path);
    const relative = path.relative(evidenceRoot, file);
    if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) return 'unsafe-evidence-path';
    noLinks(file);
    const stat = fs.statSync(file);
    if (!stat.isFile() || stat.size === 0 || stat.size > MAX_EVIDENCE) return 'invalid-evidence-file';
    if (sha256(fs.readFileSync(file)) !== receipt.sha256) return 'hash-mismatch';
  } catch { return 'unreadable-or-linked-evidence'; }
  return receipt.status === 'pass' ? 'pass-recorded' : 'failure-recorded';
}

export function inspectProject(directory, { now = Date.now() } = {}) {
  const root = path.resolve(directory);
  const project = readJson(path.join(root, '.studio/project.json'));
  const errors = validateProject(project);
  if (errors.length) return { status: 'invalid-record', errors, releaseAuthorized: false };
  const setupGaps = ['owner', 'buyer', 'job', 'successMeasure'].filter(key => !nonempty(project[key])).map(key => `Complete ${key}.`);
  if (!project.targetRevision) setupGaps.push('Set the exact revision under review.');
  if (project.platform === 'undecided') setupGaps.push('Choose the native delivery platform.');
  if (!project.domains.some(domain => domain.role === 'canonical')) setupGaps.push('Record the canonical hostname and its owner.');
  const checks = requirementsFor(project).map(item => ({
    id: item.id, label: item.label, result: inspectReceipt(root, project, item, now), acceptance: item.acceptance,
  }));
  const gaps = checks.filter(item => item.result !== 'pass-recorded');
  return {
    status: setupGaps.length || gaps.length ? 'evidence-incomplete' : 'evidence-recorded-review-required',
    project: project.id, edition: project.edition, effectiveFeatures: effectiveFeatures(project), targetRevision: project.targetRevision,
    setupGaps, checks, recordedPasses: checks.length - gaps.length, requiredChecks: checks.length,
    next: setupGaps[0] || (gaps[0] ? `${gaps[0].label}: ${gaps[0].acceptance}` : 'Obtain the host release gate decision; inspect the underlying evidence and real buyer execution.'),
    releaseAuthorized: false,
    limitation: 'Local structure, file hashes, dates and receipt consistency only. Reviewer identity, evidence truth, deployed behavior, legal rights and release approval are not authenticated.',
  };
}

export function initialize(directory, edition = 'marketing') {
  if (!Object.hasOwn(definitions.editions, edition)) throw new Error('Choose marketing, application, commerce or platform.');
  const root = path.resolve(directory);
  noLinks(root);
  const parent = path.dirname(root);
  if (!fs.statSync(parent).isDirectory()) throw new Error('Destination parent must exist.');
  // Exclusive directory creation: never merge into or overwrite an existing workspace.
  fs.mkdirSync(root);
  fs.mkdirSync(path.join(root, '.studio'));
  fs.mkdirSync(path.join(root, '.studio/evidence'));
  fs.mkdirSync(path.join(root, '.studio/guides'));
  const project = readJson(path.join(pack, 'templates/project.json'));
  project.edition = edition;
  project.id = path.basename(root).toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'new-project';
  project.name = path.basename(root);
  fs.writeFileSync(path.join(root, '.studio/project.json'), JSON.stringify(project, null, 2) + '\n', { flag: 'wx' });
  for (const name of ['AGENTS.md', 'DESIGN.md', 'HANDOFF.md']) {
    fs.copyFileSync(path.join(pack, 'templates', name), path.join(root, name), fs.constants.COPYFILE_EXCL);
  }
  for (const name of ['asset-provenance.example.json', 'domain-change.example.json', 'search-pages.example.json']) {
    fs.copyFileSync(path.join(pack, 'templates', name), path.join(root, '.studio', name), fs.constants.COPYFILE_EXCL);
  }
  for (const entry of fs.readdirSync(path.join(pack, 'references'), { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.md')) fs.copyFileSync(path.join(pack, 'references', entry.name), path.join(root, '.studio/guides', entry.name), fs.constants.COPYFILE_EXCL);
  }
  fs.copyFileSync(path.join(pack, 'requirements.json'), path.join(root, '.studio/requirements.json'), fs.constants.COPYFILE_EXCL);
  const portableReadme = fs.readFileSync(path.join(pack, 'README.md'), 'utf8').replaceAll('(references/', '(guides/').replaceAll('(site/README.md)', '(SITE-EDITION.md)');
  fs.writeFileSync(path.join(root, '.studio/KIT-README.md'), portableReadme, { flag: 'wx' });
  fs.copyFileSync(path.join(pack, 'site/README.md'), path.join(root, '.studio/SITE-EDITION.md'), fs.constants.COPYFILE_EXCL);
  for (const name of ['sources.json', 'delivery-graph.json']) fs.copyFileSync(path.join(pack, name), path.join(root, '.studio', name), fs.constants.COPYFILE_EXCL);
  fs.writeFileSync(path.join(root, '.studio/evidence/README.md'), '# Evidence\n\nPlace sanitized verification reports here. Use relative paths, exact revision, UTC date, SHA-256, and a named reviewer in project.json. Reports must record methods, actual observations and unresolved findings. No credentials or private client data.\n', { flag: 'wx' });
  return { status: 'workspace-created', directory: root, edition, releaseAuthorized: false, next: 'Fill .studio/project.json and DESIGN.md; build the real project and attach evidence.' };
}

export function main(args) {
  const [command, directory, ...rest] = args;
  if (command === '--help' || command === 'help' || !command) {
    console.log('Usage: node studio.mjs init <new-directory> [--edition marketing|application|commerce|platform]\n       node studio.mjs check <directory>\n       node studio.mjs report <directory>\n       node studio.mjs plan <directory>\ncheck validates structure; report inspects local receipts; plan projects dependencies. None authorizes release.');
    return 0;
  }
  if (!directory || !['init', 'check', 'report', 'plan'].includes(command)) throw new Error('Invalid arguments; use --help.');
  if (command === 'init') {
    if (rest.length && !(rest.length === 2 && rest[0] === '--edition')) throw new Error('Invalid init options.');
    console.log(JSON.stringify(initialize(directory, rest[1] || 'marketing'), null, 2));
    return 0;
  }
  if (rest.length) throw new Error('Unexpected options.');
  if (command === 'check') {
    const errors = validateProject(readJson(path.join(path.resolve(directory), '.studio/project.json')));
    console.log(JSON.stringify({ status: errors.length ? 'invalid-record' : 'structure-valid-unverified', errors, releaseAuthorized: false }, null, 2));
    return errors.length ? 1 : 0;
  }
  const result = inspectProject(directory);
  if (command === 'plan' && result.status !== 'invalid-record') {
    console.log(JSON.stringify(projectDeliveryPlan(deliveryGraph, result, definitions.requirements.map(item => item.id)), null, 2));
    return result.status === 'evidence-incomplete' ? 2 : 0;
  }
  console.log(JSON.stringify(result, null, 2));
  return result.status === 'invalid-record' ? 1 : result.status === 'evidence-incomplete' ? 2 : 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try { process.exitCode = main(process.argv.slice(2)); }
  catch (error) {
    console.error(JSON.stringify({ status: 'error', message: error.code ? `Filesystem operation failed (${error.code}). No overwrite was requested.` : error.message, releaseAuthorized: false }));
    process.exitCode = 1;
  }
}
