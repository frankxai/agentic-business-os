import { describeProject, editionLabels, validateBrief, formatBriefMarkdown } from './model.mjs';

const form = document.querySelector('#brief-form');
const edition = document.querySelector('#project-edition');
const notice = document.querySelector('#load-status');
const status = document.querySelector('#brief-status');
const download = document.querySelector('#download-brief');
const downloadRecord = document.querySelector('#download-record');
const errorBox = document.querySelector('#form-error');
const routeDescriptions = {
  marketing:'A clear identity, useful content and a complete path from first impression to action.',
  application:'A useful task, clear permissions and dependable data. Designed around the people who will use it.',
  commerce:'A considered shopping experience, from discovery to payment, delivery and returns.',
  platform:'A shared environment with clear boundaries, durable workflows and evaluated agent features.',
};
let catalog, prepared, dirty = false;

function setEdition(value, updateUrl = true) {
  if (!Object.hasOwn(editionLabels, value)) value = 'marketing';
  edition.value = value;
  document.querySelectorAll('[data-edition]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.edition === value)));
  document.querySelector('#route-title').textContent = editionLabels[value];
  document.querySelector('#route-description').textContent = routeDescriptions[value];
  if (updateUrl) {
    const url = new URL(location.href); url.searchParams.set('edition', value);
    history.replaceState(null, '', url);
  }
}

function invalidate() {
  dirty = Boolean(document.querySelector('#project-name').value.trim() || document.querySelector('#project-outcome').value.trim());
  if (prepared) {
    prepared = null; download.disabled = true;
    downloadRecord.disabled = true;
    status.textContent = 'Your choices changed. Prepare the brief again to update your download.';
  }
}

setEdition(new URL(location.href).searchParams.get('edition'), false);
window.addEventListener('keydown', () => { document.body.dataset.keyboard = 'true'; });
window.addEventListener('pointerdown', () => { document.body.dataset.keyboard = 'false'; });
window.addEventListener('popstate', () => { setEdition(new URL(location.href).searchParams.get('edition'), false); invalidate(); });
document.querySelectorAll('[data-edition]').forEach(button => button.addEventListener('click', () => { setEdition(button.dataset.edition); invalidate(); }));
edition.addEventListener('change', () => setEdition(edition.value));
form.addEventListener('input', invalidate);
form.addEventListener('change', invalidate);
window.addEventListener('beforeunload', event => { if(dirty) { event.preventDefault(); event.returnValue = ''; } });

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!catalog) return;
  const data = new FormData(form);
  const input = {name:data.get('name'),outcome:data.get('outcome'),edition:data.get('edition'),platform:data.get('platform'),features:data.getAll('feature')};
  const errors = validateBrief(input);
  if(Object.keys(errors).length){
    errorBox.textContent = Object.values(errors).join(' '); errorBox.hidden = false;
    const names={name:'project-name',outcome:'project-outcome',edition:'project-edition',platform:'project-platform'};
    document.getElementById(names[Object.keys(errors)[0]] || 'project-name').focus(); return;
  }
  errorBox.hidden = true;
  try {
    prepared = describeProject(input, catalog.definitions, catalog.graph);
    document.querySelector('#output-title').textContent = prepared.project.name;
    document.querySelector('#output-description').textContent = prepared.project.job;
    document.querySelector('#platform-note').textContent = prepared.note;
    const list = document.querySelector('#requirement-list');
    list.replaceChildren(...prepared.requirements.map(item => {const li=document.createElement('li');li.textContent=item.label;return li;}));
    document.querySelector('#output-body').hidden = false;
    download.disabled = false;
    downloadRecord.disabled = false;
    status.textContent = 'Your brief is ready to download. It includes a delivery outline with evidence still to collect.';
    document.querySelector('#output-title').focus();
  } catch {
    prepared = null; download.disabled = true;
    downloadRecord.disabled = true;
    errorBox.textContent = 'The delivery outline could not be prepared. Reload this page and try again.'; errorBox.hidden = false;
  }
});

function downloadPrepared(record = false) {
  if(!prepared) return;
  const contents = record ? JSON.stringify(prepared.project,null,2)+'\n' : formatBriefMarkdown(prepared);
  const url = URL.createObjectURL(new Blob([contents],{type:record ? 'application/json' : 'text/markdown;charset=utf-8'}));
  const link = document.createElement('a'); link.href=url;link.download=`${prepared.project.id}.${record ? 'project.json' : 'brief.md'}`;
  document.body.append(link); link.click(); link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  dirty=false;
  status.textContent='Download requested. Your editable project brief contains no completed verification claims.';
}
download.addEventListener('click',()=>downloadPrepared());
downloadRecord.addEventListener('click',()=>downloadPrepared(true));

try {
  const embedded = document.querySelector('#studio-catalog');
  if (embedded) catalog = JSON.parse(embedded.textContent);
  else {
    const response = await fetch(new URL('../catalog.json',import.meta.url),{cache:'no-cache',signal:AbortSignal.timeout(8000)});
    if(!response.ok) throw new Error('Catalog unavailable');
    catalog=await response.json();
  }
  // Exercise the actual graph before enabling the form; a malformed catalog fails closed.
  describeProject({name:'Check',outcome:'Verify the local delivery catalog.',edition:'marketing',platform:'custom',features:[]},catalog.definitions,catalog.graph);
  document.querySelector('#brief-fields').disabled=false;
  notice.hidden=true;
} catch {
  notice.replaceChildren(document.createTextNode('The project builder could not load. '));
  const retry=document.createElement('button');retry.type='button';retry.className='text-button';retry.textContent='Reload and try again';retry.addEventListener('click',()=>location.reload());notice.append(retry);
  const fallback=document.createElement('a');fallback.href=new URL('project-base.json',location.href).href;fallback.download='project-base.json';fallback.textContent='Download the base project record';notice.append(document.createTextNode(' or '),fallback);
}
