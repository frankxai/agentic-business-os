import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import crypto from 'node:crypto';
import { compileDeliveryGraph } from '../graph.mjs';
import { editionLabels } from './model.mjs';

const here = import.meta.dirname;
const pack = path.resolve(here, '..');
export const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const arrow = '<span aria-hidden="true">↗</span>';
const safeUrl = value => { const url = new URL(value); if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Public project links require uncredentialed HTTPS.'); return escapeHtml(url.href); };

export function standaloneDocument(html, definitions, graph) {
  // This deliberately bundles only our three known modules; it is not a general JS bundler.
  const modules = ['graph.mjs', 'site/model.mjs', 'site/client.mjs'].map(name => {
    const source=fs.readFileSync(path.join(pack,name),'utf8');
    const imports=source.match(/^import .+;$/gm)||[];
    if(imports.some(line=>!/^import \{ [a-zA-Z, ]+ \} from '(?:\.\.\/graph|\.\/model)\.mjs';$/.test(line))) throw new Error('Standalone preview needs review of a new module import.');
    return source.replace(/^import .+;\r?\n/gm,'').replace(/^export /gm,'');
  });
  const script=modules.join('\n').replaceAll('</script','<\\/script');
  const style=fs.readFileSync(path.join(here,'styles.css'),'utf8');
  const data=JSON.stringify({definitions,graph}).replaceAll('<','\\u003c').replaceAll('>','\\u003e').replaceAll('&','\\u0026');
  const hash=text=>`'sha256-${crypto.createHash('sha256').update(text).digest('base64')}'`;
  return html
    .replace("script-src 'self'; style-src 'self'",`script-src 'self' ${hash(script)} ${hash(data)}; style-src 'self' ${hash(style)}`)
    .replace('<link rel="stylesheet" href="assets/styles.css">',`<style>${style}</style>`)
    .replace('<script type="module" src="assets/client.mjs"></script>','')
    .replace('</body>',`<script id="studio-catalog" type="application/json">${data}</script><script type="module">${script}</script></body>`);
}

export function renderSite(content, graph) {
  const e = escapeHtml;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f5f7f2">
  <meta name="robots" content="noindex,nofollow">
  <meta name="description" content="${e(content.description)}">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'">
  <title>${e(content.brand)} Production Studio — Websites, applications and platforms</title>
  <link rel="stylesheet" href="assets/styles.css">
  <script type="module" src="assets/client.mjs"></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header wrap">
    <a href="#main" class="brand" aria-label="Starlight Production Studio home"><span class="brand-name">${e(content.brand)}<span class="brand-dot" aria-hidden="true">✳</span></span><span class="brand-description">${e(content.descriptor)}</span></a>
    <nav aria-label="Main navigation"><a href="#work">Our world</a><a href="#approach">The approach</a><a class="nav-project" href="#brief">Your project ${arrow}</a></nav>
  </header>
  <main id="main">
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-heading"><p class="intro-note">Independent thinking. Connected craft.</p><h1 id="hero-title">${e(content.title)}</h1></div>
      <div class="hero-bottom"><p>${e(content.intro)}</p><a class="button primary" href="#brief">Shape your project ${arrow}</a></div>
      <div class="project-instrument" aria-label="Explore your project type">
        <div class="instrument-top"><p>What are you here to build?</p><span class="instrument-note">Start with the outcome.</span></div>
        <div class="edition-buttons" role="group" aria-label="Project type">
        ${Object.entries(editionLabels).map(([id, label]) => `<button type="button" data-edition="${id}" aria-pressed="${id === 'marketing'}">${e(label)}</button>`).join('')}
        </div>
        <div class="instrument-result"><div><span class="small-label">Your starting point</span><h2 id="route-title">A distinctive website</h2><p id="route-description">A clear identity, useful content and a complete path from first impression to action.</p></div><div class="route-path"><span>Understand</span><span>Design</span><span>Build</span><span>Prove</span><span>Care</span></div></div>
      </div>
    </section>
    <section id="work" class="work-section wrap" aria-labelledby="work-title">
      <div class="section-heading"><div><p class="small-label">The wider world of FrankX</p><h2 id="work-title">Different ambitions.<br>One attention to detail.</h2></div><p>Explore the public brands behind the work. Each has its own purpose, voice and point of view.</p></div>
      <div class="work-grid">${content.projects.map((project, i) => `<article class="work-item work-${i}"><a class="work-link" href="${safeUrl(project.url)}" target="_blank" rel="noopener noreferrer"><div class="specimen ${['frankx','starlight','arcanea'].includes(project.theme) ? project.theme : 'frankx'}"><span class="specimen-brand">${e(project.name)}</span><span class="specimen-word">${e(project.word)}</span><span class="specimen-caption">A typographic study of the brand</span></div><div class="work-meta"><div><h3>${e(project.name)}</h3><p>${e(project.category)}</p></div><span class="visit-icon" aria-hidden="true">↗</span></div><span class="sr-only">Visit ${e(project.name)} in a new tab.</span></a><p class="work-description">${e(project.description)}</p></article>`).join('')}</div>
    </section>
    <section id="approach" class="approach-section" aria-labelledby="approach-title"><div class="wrap">
      <div class="section-heading"><div><p class="small-label">The production approach</p><h2 id="approach-title">Every layer deserves<br>the same care.</h2></div><p>A beautiful first impression should lead to something clear, reliable and worth returning to.</p></div>
      <div class="layer-grid">${content.layers.map(item => `<article class="layer"><h3>${e(item.title)}</h3><p>${e(item.body)}</p><span>${e(item.detail)}</span></article>`).join('')}</div>
      <details class="process-details"><summary>See how the work connects <span aria-hidden="true">+</span></summary><ol class="process-list">${graph.nodes.map(node => `<li><h3>${e(node.label)}</h3><p>${e(node.artifact)}.</p></li>`).join('')}</ol></details>
    </div></section>
    <section id="brief" class="brief-section wrap" aria-labelledby="brief-title">
      <div class="section-heading"><div><p class="small-label">A useful place to begin</p><h2 id="brief-title">Make the idea<br>more concrete.</h2></div><p>A few considered choices become a portable project brief. Yours to take into the build.</p></div>
      <noscript><p class="notice">The interactive brief needs JavaScript. You can still <a href="project-base.json" download>download the project record</a> and read every section on this page.</p></noscript>
      <p id="load-status" class="notice" role="status">Loading the project builder…</p>
      <div class="brief-layout">
        <form id="brief-form" aria-describedby="privacy-note">
          <fieldset id="brief-fields" disabled>
          <legend class="sr-only">Your project brief</legend>
          <div class="field"><label for="project-name">What is your project called?</label><input id="project-name" name="name" type="text" minlength="2" maxlength="80" required autocomplete="off" placeholder="A name to begin with…"></div>
          <div class="field"><label for="project-outcome">What should it help someone do?</label><textarea id="project-outcome" name="outcome" rows="4" minlength="10" maxlength="600" required autocomplete="off" placeholder="Tell us about the person and the useful outcome…"></textarea><span class="field-hint">A real task is a stronger starting point than a feature list.</span></div>
          <div class="field-pair"><div class="field"><label for="project-edition">Project type</label><select id="project-edition" name="edition">${Object.entries(editionLabels).map(([id,label])=>`<option value="${id}">${e(label)}</option>`).join('')}</select></div><div class="field"><label for="project-platform">Delivery preference</label><select id="project-platform" name="platform"><option value="custom">Owned code</option><option value="framer">Framer</option><option value="webflow">Webflow</option><option value="shopify">Shopify</option></select></div></div>
          <fieldset class="extras"><legend>Anything else it needs?</legend><div class="extra-options"><label><input type="checkbox" name="feature" value="ai">Agent features</label><label><input type="checkbox" name="feature" value="payments">Payments</label><label><input type="checkbox" name="feature" value="locales">More languages</label><label><input type="checkbox" name="feature" value="email">Email delivery</label></div></fieldset>
          <p id="form-error" class="form-error" role="alert" hidden></p>
          <button class="button primary" type="submit">Prepare my brief ${arrow}</button>
          <p id="privacy-note" class="privacy-note">Prepared in your browser. No signup, no upload. Download when you are ready.</p>
          </fieldset>
        </form>
        <aside class="brief-output" aria-labelledby="output-title"><span class="small-label">Your next chapter</span><h3 id="output-title" tabindex="-1">An idea, ready to take shape.</h3><p id="output-description">Describe the outcome and choose a direction. Your brief and delivery outline will appear here.</p><div id="output-body" hidden><p id="platform-note"></p><h4>Included in your delivery outline</h4><ul id="requirement-list"></ul><button id="download-brief" type="button" class="button light">Download project brief <span aria-hidden="true">↓</span></button><button id="download-record" type="button" class="text-button output-secondary">Download kit record (JSON)</button><p class="output-footnote">An editable starting point. Scope, costs and delivery still need agreement.</p></div><div class="output-rule" aria-hidden="true"></div><p id="brief-status" role="status" class="brief-status">Your details stay on this page until you download them.</p></aside>
      </div>
    </section>
    <section class="questions wrap" aria-labelledby="questions-title"><h2 id="questions-title">A little more clarity.</h2><div>${content.faqs.map(item=>`<details><summary>${e(item.question)}<span aria-hidden="true">+</span></summary><p>${e(item.answer)}</p></details>`).join('')}</div></section>
  </main>
  <footer class="site-footer wrap"><div><a class="brand-name" href="#main">${e(content.brand)}</a><p>Thoughtful work, from first idea to what comes next.</p></div><div><span>Studio edition in development</span><a href="https://www.frankx.ai/">Explore FrankX ${arrow}</a></div></footer>
</body>
</html>`;
}

function assertNoLinks(target) {
  for (let current = path.resolve(target);;) {
    try { if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Output paths cannot contain links or junctions.'); } catch(error) { if(error.code !== 'ENOENT') throw error; }
    const parent=path.dirname(current); if(parent===current) return; current=parent;
  }
}

export function buildSite(output) {
  const root = path.resolve(output);
  assertNoLinks(root);
  const content = JSON.parse(fs.readFileSync(path.join(here, 'content.json'), 'utf8'));
  const definitions = JSON.parse(fs.readFileSync(path.join(pack, 'requirements.json'), 'utf8'));
  const graph = JSON.parse(fs.readFileSync(path.join(pack, 'delivery-graph.json'), 'utf8'));
  compileDeliveryGraph(graph, definitions.requirements.map(item=>item.id));
  const html = renderSite(content, graph);
  fs.mkdirSync(root);
  fs.mkdirSync(path.join(root, 'assets'));
  fs.writeFileSync(path.join(root, 'index.html'), html, {flag:'wx'});
  fs.writeFileSync(path.join(root, 'preview.html'), standaloneDocument(html,definitions,graph), {flag:'wx'});
  for (const name of ['styles.css', 'client.mjs', 'model.mjs']) fs.copyFileSync(path.join(here,name),path.join(root,'assets',name),fs.constants.COPYFILE_EXCL);
  fs.copyFileSync(path.join(pack,'graph.mjs'),path.join(root,'graph.mjs'),fs.constants.COPYFILE_EXCL);
  fs.copyFileSync(path.join(pack,'templates/project.json'),path.join(root,'project-base.json'),fs.constants.COPYFILE_EXCL);
  fs.writeFileSync(path.join(root,'catalog.json'),JSON.stringify({definitions,graph}),{flag:'wx'});
  fs.writeFileSync(path.join(root,'robots.txt'),'User-agent: *\nDisallow: /\n',{flag:'wx'});
  fs.writeFileSync(path.join(root,'vercel.json'),JSON.stringify({cleanUrls:true,headers:[{source:'/(.*)',headers:[{key:'X-Robots-Tag',value:'noindex, nofollow'},{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'Content-Security-Policy',value:"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"}]}]},null,2)+'\n',{flag:'wx'});
  fs.copyFileSync(path.join(here,'README.md'),path.join(root,'README.md'),fs.constants.COPYFILE_EXCL);
  fs.copyFileSync(path.join(pack,'LICENSE'),path.join(root,'LICENSE'),fs.constants.COPYFILE_EXCL);
  return {status:'preview-artifact-created',directory:root,indexing:'disabled',releaseAuthorized:false};
}

if(process.argv[1] && import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  try { if(process.argv.length!==3) throw new Error('Usage: node site/build.mjs <new-output-directory>'); console.log(JSON.stringify(buildSite(process.argv[2]),null,2)); }
  catch(error){console.error(error.code ? `Build failed (${error.code}); existing output is never overwritten.` : error.message);process.exitCode=1;}
}
