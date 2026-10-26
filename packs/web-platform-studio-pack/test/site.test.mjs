import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { buildSite, renderSite, standaloneDocument } from '../site/build.mjs';
import { createProject, describeProject, validateBrief, formatBriefMarkdown } from '../site/model.mjs';
import { validateProject, initialize, inspectProject } from '../studio.mjs';
const pack=path.resolve(import.meta.dirname,'..');
const json=name=>JSON.parse(fs.readFileSync(path.join(pack,name),'utf8'));
const defs=json('requirements.json'),graph=json('delivery-graph.json'),content=json('site/content.json');
const input=()=>({name:'Studio test',outcome:'Help a founder prepare and download a useful brief.',edition:'marketing',platform:'custom',features:[]});
function temporary(t){const root=fs.mkdtempSync(path.join(os.tmpdir(),'starlight-site-test-'));t.after(()=>{const full=path.resolve(root);assert.equal(path.dirname(full),path.resolve(os.tmpdir()));assert.match(path.basename(full),/^starlight-site-test-/);fs.rmSync(full,{recursive:true,force:true});});return root;}

test('all brief editions produce compatible project records with empty evidence',()=>{
  for(const edition of ['marketing','application','commerce','platform']){
    const result=describeProject({...input(),edition},defs,graph);
    assert.deepEqual(validateProject(result.project),[]);assert.equal(result.project.evidence.length,0);
    assert.equal(result.plan.releaseAuthorized,false);assert.ok(result.requirements.length>=11);
  }
});
test('actual export can enter a new workspace and inspector reports real gaps',t=>{
  const root=temporary(t),workspace=path.join(root,'delivery');initialize(workspace);
  const project=createProject({...input(),edition:'platform',features:['payments','email','locales']});
  fs.writeFileSync(path.join(workspace,'.studio/project.json'),JSON.stringify(project));
  const report=inspectProject(workspace);
  assert.equal(report.requiredChecks,18);assert.equal(report.status,'evidence-incomplete');assert.equal(report.recordedPasses,0);
});
test('invalid and long input is rejected; Unicode names keep valid stable slugs',()=>{
  for(const change of [{name:''},{name:'a'.repeat(81)},{outcome:'short'},{outcome:'x'.repeat(601)},{edition:'__proto__'},{platform:'javascript:evil'},{features:['unknown']},{features:['ai','ai']}])assert.ok(Object.keys(validateBrief({...input(),...change})).length);
  const result=createProject({...input(),name:'星の庭'});assert.equal(result.id,'new-project');assert.deepEqual(validateProject(result),[]);
});
test('builder/application mismatch gets explicit architectural caveat',()=>{
  assert.match(describeProject({...input(),edition:'application',platform:'framer'},defs,graph).note,/separately designed backend/);
  assert.match(describeProject({...input(),platform:'shopify'},defs,graph).note,/Confirm the store requirement/);
});
test('readable brief contains actual requirements and safely represents user markup',()=>{
  const result=describeProject({...input(),name:'<script>name</script>',outcome:'A useful **outcome** with <img src=x> text.'},defs,graph);
  const markdown=formatBriefMarkdown(result);
  assert.ok(markdown.includes('&lt;script&gt;'));assert.ok(!markdown.includes('<img'));
  assert.ok(markdown.includes('## Work sequence'));assert.ok(markdown.includes('Domain, DNS and deployment ownership'));
  assert.ok(markdown.includes('No production checks, release approval'));
});
test('renderer escapes untrusted content and rejects active or credentialed URLs',()=>{
  const changed=structuredClone(content);changed.title='<script>alert("x")</script>';
  const html=renderSite(changed,graph);assert.ok(html.includes('&lt;script&gt;'));assert.ok(!html.includes('<script>alert'));
  changed.projects[0].url='javascript:alert(1)';assert.throws(()=>renderSite(changed,graph),/HTTPS/);
  changed.projects[0].url='https://name:secret@example.com';assert.throws(()=>renderSite(changed,graph),/HTTPS/);
});
test('static generation includes every local resource, preview policy and no overwrite',t=>{
  const parent=temporary(t),out=path.join(parent,'site');const result=buildSite(out);
  assert.equal(result.releaseAuthorized,false);
  const html=fs.readFileSync(path.join(out,'index.html'),'utf8');
  for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g))if(!match[1].startsWith('https://'))assert.ok(fs.existsSync(path.join(out,match[1])),match[1]);
  for(const match of html.matchAll(/href="#([^"]+)"/g))assert.ok(html.includes(`id="${match[1]}"`),match[1]);
  assert.match(html,/name="robots" content="noindex,nofollow"/);assert.match(html,/form-action 'none'/);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.ok(html.includes('Skip to content'));
  assert.ok(fs.readFileSync(path.join(out,'robots.txt'),'utf8').includes('Disallow: /'));
  assert.throws(()=>buildSite(out),{code:'EEXIST'});assert.equal(fs.readFileSync(path.join(out,'index.html'),'utf8'),html);
});
test('source maintains labels, reduced motion, local data handling and safe DOM writes',()=>{
  const html=renderSite(content,graph),css=fs.readFileSync(path.join(pack,'site/styles.css'),'utf8'),js=fs.readFileSync(path.join(pack,'site/client.mjs'),'utf8');
  for(const id of ['project-name','project-outcome','project-edition','project-platform'])assert.ok(html.includes(`for="${id}"`));
  assert.match(css,/prefers-reduced-motion:reduce/);assert.match(css,/:focus-visible/);assert.ok(!/transition:\s*all/.test(css));
  assert.ok(!/innerHTML|localStorage|sessionStorage|sendBeacon/.test(js));assert.ok(!/text-transform:\s*uppercase/.test(css));
  assert.match(js,/prepared = null; download.disabled = true/);
});

test('standalone preview uses the actual modules and matches its content-security hashes',t=>{
  const root=temporary(t),html=standaloneDocument(renderSite(content,graph),defs,graph);
  assert.ok(!html.includes('src="assets/client.mjs"'));
  const script=html.match(/<script type="module">([\s\S]+?)<\/script>/)[1];
  const style=html.match(/<style>([\s\S]+?)<\/style>/)[1];
  const embedded=html.match(/<script id="studio-catalog" type="application\/json">([\s\S]+?)<\/script>/)[1];
  for(const value of [script,style,embedded])assert.ok(html.includes(`sha256-${crypto.createHash('sha256').update(value).digest('base64')}`));
  assert.deepEqual(JSON.parse(embedded).graph,graph);
  assert.ok(!/^import /m.test(script));assert.ok(!/^export /m.test(script));
  const file=path.join(root,'preview.mjs');fs.writeFileSync(file,script);
  const result=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);
});

test('pack works when copied outside the repository with no parent dependencies',t=>{
  const root=temporary(t),detached=path.join(root,'detached-pack'),output=path.join(root,'detached-site');
  fs.cpSync(pack,detached,{recursive:true});
  const result=spawnSync(process.execPath,[path.join(detached,'site/build.mjs'),output],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);assert.ok(fs.existsSync(path.join(output,'preview.html')));
  assert.ok(fs.readFileSync(path.join(output,'LICENSE'),'utf8').includes('MIT License'));
});
