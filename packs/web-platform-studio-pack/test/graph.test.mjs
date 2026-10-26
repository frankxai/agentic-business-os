import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { compileDeliveryGraph, projectDeliveryPlan } from '../graph.mjs';

const graph = JSON.parse(fs.readFileSync(new URL('../delivery-graph.json',import.meta.url)));
const defs = JSON.parse(fs.readFileSync(new URL('../requirements.json',import.meta.url)));
const ids = defs.requirements.map(item=>item.id);
const copy = () => structuredClone(graph);
const report = () => ({project:'fixture',requiredChecks:ids.length,setupGaps:[],checks:ids.map(id=>({id,result:'missing'}))});

test('graph compiles every requirement once in dependency order',()=>{
  const nodes=compileDeliveryGraph(graph,ids);assert.equal(nodes.length,10);
  for(const node of nodes)for(const parent of node.dependsOn)assert.ok(nodes.findIndex(n=>n.id===parent)<nodes.indexOf(node));
});
test('scope gates parallel branches; no tools or release authorized',()=>{
  const r=report();r.setupGaps=['Choose owner'];
  const plan=projectDeliveryPlan(graph,r,ids);
  assert.deepEqual(plan.ready,['scope']);assert.equal(plan.dispatchAuthorized,false);assert.equal(plan.releaseAuthorized,false);
  r.setupGaps=[];assert.deepEqual(projectDeliveryPlan(graph,r,ids).ready,['identity','systems','domains']);
});
test('downstream recorded checks remain blocked by upstream failures',()=>{
  const r=report();r.checks=r.checks.map(c=>({...c,result:'pass-recorded'}));
  r.checks.find(c=>c.id==='design-system').result='hash-mismatch';
  const plan=projectDeliveryPlan(graph,r,ids);
  assert.equal(plan.nodes.find(n=>n.id==='identity').state,'ready-for-work');
  assert.equal(plan.nodes.find(n=>n.id==='delivery').state,'blocked');
  assert.deepEqual(plan.ready,['identity']);
});
test('conditional requirements skip irrelevant branches without hiding required review',()=>{
  const r=report();r.checks=r.checks.filter(c=>defs.requirements.find(d=>d.id===c.id).when==='all');r.requiredChecks=r.checks.length;
  const plan=projectDeliveryPlan(graph,r,ids);
  assert.equal(plan.nodes.find(n=>n.id==='systems').state,'not-applicable');
  assert.equal(plan.nodes.find(n=>n.id==='commerce').state,'not-applicable');
  assert.equal(plan.nodes.find(n=>n.id==='review').state,'blocked');
});
test('cycles, orphan edges, duplicate checks and missing coverage fail compilation',()=>{
  let g=copy();g.nodes[1].dependsOn=['review'];assert.throws(()=>compileDeliveryGraph(g,ids),/Cycle/);
  g=copy();g.nodes[1].dependsOn=['unknown'];assert.throws(()=>compileDeliveryGraph(g,ids),/Missing/);
  g=copy();g.nodes[2].checks.push('design-system');assert.throws(()=>compileDeliveryGraph(g,ids),/multiply/);
  g=copy();g.nodes[1].checks.pop();assert.throws(()=>compileDeliveryGraph(g,ids),/cover every/);
  g=copy();g.nodes[1].dependsOn=[];assert.throws(()=>compileDeliveryGraph(g,ids),/setup root/);
});
test('invalid or duplicate reports cannot be projected as ready',()=>{
  assert.throws(()=>projectDeliveryPlan(graph,{status:'invalid-record'},ids),/inspection/);
  const r=report();r.checks.push(r.checks[0]);r.requiredChecks=r.checks.length;assert.throws(()=>projectDeliveryPlan(graph,r,ids),/duplicate/);
  assert.throws(()=>projectDeliveryPlan(graph,{...report(),checks:[],requiredChecks:0},ids),/inspection/);
});
