import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { initialize, inspectProject, validateProject, requirementsFor, sha256 } from '../studio.mjs';

const cli = path.resolve(import.meta.dirname, '../studio.mjs');
const now = Date.parse('2026-09-24T12:00:00Z');
const revision = 'a'.repeat(40);

function fixture(t, edition = 'marketing') {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'starlight-studio-test-'));
  const root = path.join(parent, 'project');
  t.after(() => {
    // Delete only this test's absolute, freshly allocated directory.
    const resolved = path.resolve(parent);
    assert.equal(path.dirname(resolved), path.resolve(os.tmpdir()));
    assert.match(path.basename(resolved), /^starlight-studio-test-/);
    fs.rmSync(resolved, { recursive: true, force: true });
  });
  initialize(root, edition);
  const file = path.join(root, '.studio/project.json');
  const project = JSON.parse(fs.readFileSync(file, 'utf8'));
  const save = () => fs.writeFileSync(file, JSON.stringify(project));
  return { root, parent, file, project, save };
}

function complete(t, edition = 'marketing') {
  const f = fixture(t, edition);
  Object.assign(f.project, { owner: 'Maker', buyer: 'Fixture buyer', job: 'Exercise inspection', successMeasure: 'Synthetic test only', platform: 'custom', targetRevision: revision,
    domains: [{ hostname: 'example.com', role: 'canonical', owner: 'Fixture operator', registryRef: 'test-only' }] });
  for (const item of requirementsFor(f.project)) {
    const contents = `Synthetic fixture for ${item.id}; not actual buyer or release evidence.\n`;
    const relative = `evidence/${item.id}.md`;
    fs.writeFileSync(path.join(f.root, '.studio', relative), contents);
    f.project.evidence.push({ requirement: item.id, status: 'pass', path: relative, sha256: sha256(contents), reviewer: item.independent ? 'Separate reviewer' : 'Maker', independent: Boolean(item.independent), recordedAt: '2026-09-24T12:00:00Z', targetRevision: revision });
  }
  f.save();
  return f;
}

test('fresh presets select minimum requirements and never imply readiness', t => {
  for (const [edition, count] of [['marketing', 11], ['application', 13], ['commerce', 15], ['platform', 15]]) {
    const f = fixture(t, edition);
    assert.deepEqual(validateProject(f.project), []);
    const result = inspectProject(f.root, { now });
    assert.equal(result.requiredChecks, count);
    assert.equal(result.recordedPasses, 0);
    assert.equal(result.status, 'evidence-incomplete');
    assert.equal(result.releaseAuthorized, false);
    assert.equal(fs.readdirSync(path.join(f.root, '.studio/guides')).length, 9);
  }
});

test('all features select 18 checks, including implied tenancy requirements', t => {
  const f = fixture(t);
  f.project.features = ['tenancy', 'payments', 'email', 'ai', 'locales'];
  f.save();
  assert.equal(inspectProject(f.root, { now }).requiredChecks, 18);
});

test('all consistent receipts still require external review and never authorize release', t => {
  const f = complete(t);
  const result = inspectProject(f.root, { now });
  assert.equal(result.status, 'evidence-recorded-review-required');
  assert.equal(result.recordedPasses, 11);
  assert.equal(result.releaseAuthorized, false);
});

test('modified report content and missing evidence files invalidate receipts', t => {
  const f = complete(t);
  fs.appendFileSync(path.join(f.root, '.studio/evidence/buyer-journey.md'), 'modified');
  fs.unlinkSync(path.join(f.root, '.studio/evidence/design-system.md'));
  const result = inspectProject(f.root, { now });
  assert.equal(result.checks[0].result, 'hash-mismatch');
  assert.equal(result.checks[1].result, 'unreadable-or-linked-evidence');
  assert.equal(result.status, 'evidence-incomplete');
});

test('stale, future and different revision receipts are distinguished', t => {
  const f = complete(t);
  f.project.evidence[0].recordedAt = '2026-08-01T12:00:00Z';
  f.project.evidence[1].recordedAt = '2026-09-25T12:00:00Z';
  f.project.evidence[2].targetRevision = 'b'.repeat(40);
  f.save();
  const result = inspectProject(f.root, { now });
  assert.deepEqual(result.checks.slice(0, 3).map(item => item.result), ['stale', 'future-dated', 'wrong-revision']);
});

test('failure, pending and maker-authored independent review remain gaps', t => {
  const f = complete(t);
  f.project.evidence[0].status = 'fail';
  f.project.evidence[1] = { requirement: 'design-system', status: 'pending' };
  f.project.evidence.find(item => item.requirement === 'independent-review').reviewer = ' maker ';
  f.save();
  const result = inspectProject(f.root, { now });
  assert.equal(result.checks[0].result, 'failure-recorded');
  assert.equal(result.checks[1].result, 'missing');
  assert.equal(result.checks.at(-1).result, 'independent-review-missing');
});

test('evidence paths reject traversal, absolute names, backslashes and alternate streams', t => {
  const f = complete(t);
  for (const unsafe of ['../outside.md', 'evidence/../../outside.md', 'evidence//x.md', 'evidence/./x.md', '/tmp/x.md', 'C:\\x.md', 'evidence\\x.md', 'evidence/x.md:stream', 'evidence/x./y.md']) {
    f.project.evidence[0].path = unsafe;
    assert.ok(validateProject(f.project).some(error => error.includes('Evidence path')), unsafe);
  }
});

test('directory symlink or junction cannot supply evidence outside the packet', t => {
  const f = complete(t);
  const outside = path.join(f.parent, 'outside');
  fs.mkdirSync(outside);
  fs.writeFileSync(path.join(outside, 'report.md'), 'outside report');
  fs.symlinkSync(outside, path.join(f.root, '.studio/evidence/linked'), process.platform === 'win32' ? 'junction' : 'dir');
  f.project.evidence[0].path = 'evidence/linked/report.md';
  f.project.evidence[0].sha256 = sha256('outside report');
  f.save();
  assert.equal(inspectProject(f.root, { now }).checks[0].result, 'unreadable-or-linked-evidence');
});

test('initializer refuses existing data and linked destination parents', t => {
  const f = fixture(t);
  const original = fs.readFileSync(f.file, 'utf8');
  assert.throws(() => initialize(f.root), { code: 'EEXIST' });
  assert.equal(fs.readFileSync(f.file, 'utf8'), original);
  const alias = path.join(f.parent, 'alias');
  fs.symlinkSync(f.root, alias, process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => initialize(path.join(alias, 'nested')), /links and junctions/);
  assert.equal(fs.existsSync(path.join(f.root, 'nested')), false);
});

test('malformed project data gives structural errors instead of treating it as ready', t => {
  const f = fixture(t);
  for (const value of [null, [], {}, { ...f.project, edition: '__proto__' }, { ...f.project, features: {} }, { ...f.project, features: ['ai', 'ai'] }, { ...f.project, evidence: [null] }, { ...f.project, domains: [false] }]) {
    assert.ok(validateProject(value).length);
  }
  f.project.unrecognized = 'should not be ignored';
  assert.ok(validateProject(f.project).some(error => error.includes('unknown field')));
});

test('unknown requirements, duplicates and invalid dates cannot pass', t => {
  const f = complete(t);
  f.project.evidence[0].recordedAt = '2026-02-30T12:00:00Z';
  f.project.evidence.push({ ...f.project.evidence[1] });
  f.project.evidence.push({ requirement: 'self-certified-l99', status: 'pending' });
  const errors = validateProject(f.project);
  assert.ok(errors.some(error => error.includes('timestamp')));
  assert.ok(errors.some(error => error.includes('Duplicate evidence')));
  assert.ok(errors.some(error => error.includes('unknown or inactive')));
});

test('empty/oversized reports fail and oversized records are refused', t => {
  const f = complete(t);
  fs.writeFileSync(path.join(f.root, '.studio/evidence/buyer-journey.md'), '');
  const big = path.join(f.root, '.studio/evidence/design-system.md');
  fs.writeFileSync(big, 'x');
  fs.truncateSync(big, 8 * 1024 * 1024 + 1);
  assert.deepEqual(inspectProject(f.root, { now }).checks.slice(0, 2).map(item => item.result), ['invalid-evidence-file', 'invalid-evidence-file']);
  fs.truncateSync(f.file, 1024 * 1024 + 1);
  assert.throws(() => inspectProject(f.root, { now }), /smaller than 1 MiB/);
});

test('CLI exit codes distinguish incomplete evidence from invalid data', t => {
  const f = fixture(t);
  const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
  assert.equal(run('check', f.root).status, 0);
  const fresh = run('report', f.root);
  assert.equal(fresh.status, 2);
  assert.equal(JSON.parse(fresh.stdout).releaseAuthorized, false);
  assert.equal(run('init', f.root).status, 1);
  assert.equal(run('report', f.root, '--force').status, 1);
  fs.writeFileSync(f.file, '{invalid sensitive-fragment');
  const invalid = run('check', f.root);
  assert.equal(invalid.status, 1);
  assert.equal(invalid.stderr.includes('sensitive-fragment'), false);
});

test('editing copied requirement definitions cannot remove executable checks', t => {
  const f = fixture(t);
  fs.writeFileSync(path.join(f.root, '.studio/requirements.json'), '{"requirements":[]}');
  assert.equal(inspectProject(f.root, { now }).requiredChecks, 11);
});
