# Starlight Studio: native static code edition

A working website example built using the Studio kit. It includes an editorial Studio presentation, related public-brand links, a project-type selector, a local brief builder and a downloadable record accepted by the kit CLI. The three portfolio specimens are original typographic representations, explicitly labeled; they are not screenshots or paid-client case studies.

## Build

From `agentic-business-os`, with Node.js 22.16+:

```sh
node packs/web-platform-studio-pack/site/build.mjs <new-output-directory>
```

The parent directory must exist. Existing destinations and symlink/junction paths are refused. This is a small static file generator; there are no dependencies to install and no remote requests during generation. The output includes HTML, CSS, browser JavaScript, graph/catalog JSON, the base project record, license and preview hosting headers.

Open the generated **`preview.html`** directly for a self-contained interactive preview. It includes the same code, styles and catalog, with content-security hashes, and makes no startup network requests. Keep the output directory together for fallback/base-record links. The only bundled modules are this kit's own three small modules.

For the modular `index.html`, serve the output over HTTP using the host's approved preview workflow. ES modules and the catalog request require an HTTP origin; opening `index.html` as a `file://` URL does not test the interactive experience. A deployment is a separate action. No project or domain is created by the generator.

## Primary journey

1. Choose a website, application, storefront or platform.
2. Enter a project name and useful outcome.
3. Choose a delivery preference and optional capabilities.
4. Prepare the brief; inspect its scope and platform caveat.
5. Download the readable Markdown brief and, optionally, the JSON kit record. Editing the form invalidates the old prepared downloads.

The page sends no entered details to a server and persists none in browser storage. Edition selection alone is reflected in the URL. No analytics, third-party fonts, accounts, checkout or connected contact form are included. This first implementation produces the buyer's own useful artifact.

To use the download, initialize a fresh delivery workspace with `studio.mjs init`. Review the downloaded JSON, then replace only that new workspace's `.studio/project.json` with it. Run `check`, `report` and `plan`. Reports intentionally show missing ownership, revision and evidence until the actual work is verified. Do not overwrite an unrelated project's record.

## Customize

Edit `site/content.json` for brand copy, related projects, layer descriptions and questions. Every external project URL must use uncredentialed HTTPS. Edit `site/styles.css` for tokens and composition; `site/DESIGN.md` explains the intended design. `requirements.json` and `delivery-graph.json` are the common source for the brief's delivery outline. `site/model.mjs` is pure logic, shared by browser behavior and tests.

All edition labels are project requirements, not claims of platform support. This example is the first implemented **static code** edition. Framer, Webflow, Shopify and application backends remain separate native implementations; selecting them expresses a preference in the exported brief.

## Preview and release

Generated HTML, robots.txt and Vercel headers disable indexing. There is deliberately no canonical production URL or public Product/Offer schema until the owner approves a real release. `vercel.json` sets preview security headers, but it does not create a deployment or configure access authentication. Keep private previews access-controlled in the host.

Before production: verify actual desktop/mobile/keyboard/touch/reduced-motion behavior, obtain independent review, connect the approved demand-capture or commercial journey, approve public assets/claims, select the canonical domain, update indexing/canonical/sitemap policies and complete the host release gate. Do not simply remove noindex and assume those obligations passed.

## Test

```sh
node --test packs/web-platform-studio-pack/test/studio.test.mjs packs/web-platform-studio-pack/test/graph.test.mjs packs/web-platform-studio-pack/test/site.test.mjs
```

Tests exercise input validation, platform caveats, project-record compatibility, graph behavior, escaped HTML, static resource contracts, overwrite protection and preview restrictions. Source-level tests do not replace browser interaction or visual inspection.
