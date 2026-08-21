# Starlight Foundry Venture OS — Product Constitution, Architecture & Commercial Model

**Status:** Canonical product decision v1.0  
**Decision date:** 2026-08-21  
**Owner:** Frank Riemer / Starlight Intelligence Systems  
**Category:** Sovereign venture infrastructure  

## Executive decision

Build **Starlight Foundry** as the flagship customer product and portfolio kernel.

The product promise is:

> Turn validated expertise into a governed, portable, revenue-capable venture using agent teams that run on infrastructure the founder controls.

This is not a second public launch. The current **Creator OS — Six Primitives Toolkit** remains the P0 commercial wedge and becomes the first paid Foundry pack. Starlight Foundry is compiled and proven beneath that launch, then externalized after five paid design partners and one reference implementation demonstrate that at least 70% of the workflow is reusable.

The system already exists as distributed assets across SIS, Agentic Business OS, GenCreator, Agentic Income, FrankX Foundry, the portfolio registry, and the existing agent/skill estate. The work is therefore **compilation, contracts, evidence, and productization**—not another greenfield vision.

## Canonical naming and ownership

| Name | Role | Customer visibility | Decision |
|---|---|---:|---|
| **Starlight Intelligence Systems** | Institution, architecture doctrine, governance and IP owner | High | Umbrella brand and substrate |
| **Starlight Foundry** | Customer-facing flagship product and product family | High | The product people buy and operate |
| **Starlight Venture OS** | Portable kernel, manifest standard, local runner and adapter contracts | Medium | Technical foundation beneath Foundry |
| **Starlight Business OS** | Customer-owned venture instance produced by Foundry | Medium | The installed result, not another platform brand |
| **Starlight MCP** | Portable tool and resource gateway | Medium | Planned capability; do not claim shipped until the implementation receipt exists |
| **Foundry Registry** | Curated, evaluated, provenance-aware registry of agents, teams, skills, workflows and packs | Medium | Distribution and trust moat |
| **GenCreator** | Creator activation and generative-media pack | High within its lane | First-party vertical, not the platform root |
| **Agentic Income** | Education, demand and evidence-led income-system pack | High within its lane | First-party vertical and acquisition surface |
| **FrankX** | Authority, narrative, audience and distribution | High | Primary demand surface |
| **Arcanea** | Complex IP/media reference venture | High within its world | Dogfood instance and creative pack source |

“Starline Business Operating System,” “Verso,” and “OregoWave” are not canonical terms in the connected estate. **Starline** is treated as a transcription variant of Starlight, not a new runtime or brand. “Verso” is a transcription of **Vercel**. “OregoWave” most likely refers to **OpenRouter**; OpenRouter is an optional model broker, not the operating system. No current evidence authorizes Orgo or OpenWebUI as a platform foundation.

## Portfolio reconciliation

The Aug–Sep launch authority remains intact:

1. **P0 paid launch:** Creator OS — Six Primitives Toolkit, owned by GenCreator, distributed by FrankX, standardized by Starlight.
2. **P1 probe:** AI Team Blueprint through Agentic Income.
3. **P2 probe:** World Seed Kit through Arcanea.
4. **P3 platform option:** Starlight Foundry / Agentic Architecture Pack after five paid design partners, one reference implementation, and 70% reusable workflow proof.

The new Foundry decision changes the architecture beneath the portfolio, not the number of simultaneous launches. Every pack becomes a versioned Foundry package using one product/catalog/identity/entitlement/evidence kernel.

## Product contract

### The job

The first buyer is a solo expert, creator, consultant or technical founder who already has defensible expertise and an audience, customer channel or credible distribution path. Foundry converts that leverage into an inspectable venture system:

1. a source and evidence map;
2. an explicit venture thesis and buyer decision;
3. a machine-readable operating manifest;
4. a constrained agent team with clear permissions;
5. a product, offer and distribution workflow;
6. an owned deployment and commerce path;
7. proof receipts, metrics and a learning loop;
8. a complete export that survives vendor or subscription exit.

### The six primitives

The existing Six Primitives become the universal Foundry contract:

| Primitive | Governing question | Required artifact |
|---|---|---|
| **Source** | What knowledge and evidence may the venture use? | Source map, provenance and allowed-use boundaries |
| **Decision** | Which buyer, transformation, exclusion and stop condition govern it? | Venture decision record |
| **Workflow** | Which repeatable sequence and responsibility boundary produce the result? | Workflow and team manifest |
| **Asset** | What reusable product, content, code or IP is created? | Editable owned artifact |
| **Proof** | How do we know the result worked and remained within policy? | Acceptance report and evidence receipt |
| **Learning** | What changes after real use? | Friction log, proposed change and versioned release decision |

### First useful win

Within 15 minutes the founder must be able to:

- initialize a venture locally;
- import or identify approved sources;
- receive a six-primitives diagnostic;
- choose one revenue-capable workflow;
- generate the initial venture manifest and source/decision map;
- inspect exactly what the agent team may do next.

No claim of autonomous business creation is permitted before this loop works end to end with a real customer and evidence receipt.

## System architecture

### 1. Venture canon

Every venture is represented by a portable `foundry.yaml` plus open artifacts. The minimal object model is:

- identity and ownership;
- thesis, buyer and evidence;
- offer, product and business model;
- brand tokens and voice;
- channels and content strategy;
- agent teams, skills and workflows;
- tools/MCP servers and required credentials;
- permissions, budgets, approvals and prohibited actions;
- deployment profile and data locations;
- metrics, decisions, proof receipts and changelog.

Git is the normative strategy and execution canon. Notion is the human cockpit. Drive holds approved briefs, contracts, stakeholder material and evidence. Supabase/Postgres holds shared transactional state at scale. Stripe-signed events are payment truth. Starlight Memory is a semantic projection, never the sole system of record.

### 2. Foundry Registry

Do not copy “the best skills in the world” into an ungoverned bundle. Foundry is a curated downstream registry compatible with the open Agent Skills format and official MCP metadata conventions.

Every imported skill, server, agent, team or pack must declare:

- origin, author and immutable source reference;
- version, checksum and integrity signature;
- SPDX-compatible licence and redistribution rights;
- required tools, credentials, network and filesystem access;
- inputs, outputs and prohibited uses;
- compatible runtimes and model providers;
- fixtures, evals, failure modes and rollback;
- maturity state: research, experimental, verified or production;
- installation, upgrade and uninstall contract.

The official MCP Registry is intentionally unopinionated and expects downstream aggregators to add curation and security metadata. That creates a legitimate Foundry wedge: **venture-specific evaluation and trust**, not raw catalog size. The open Agent Skills specification already supports licence and compatibility metadata; Foundry extends this with provenance, permissions, evals and venture outcome receipts.

### 3. Starlight execution runtime

The existing SIS Foundry compiler and runtime compile the venture manifest into bounded WorkPackets. Each WorkPacket carries:

- objective and acceptance criteria;
- source references and data classification;
- authorised tools and side effects;
- cost, time and retry budgets;
- approval checkpoints;
- lease/idempotency metadata;
- evidence and completion receipt requirements.

Agents may research, classify, draft, reconcile, test and open pull requests within granted authority. They may not silently publish, send external communications, change price or legal terms, hire/reject, disclose private memory, deploy destructive changes, or move money.

### 4. Deployment profiles

Foundry must compile to three profiles rather than binding sovereignty to one vendor:

| Profile | Runtime | State/artifacts | Model access | Use |
|---|---|---|---|---|
| **Local / Sovereign** | Node/container runner on the founder’s machine | Filesystem + SQLite/Postgres + Git | BYOK direct or optional gateway | Default ownership and offline-capable work |
| **Own Cloud / Edge** | Cloudflare Agents + Durable Objects; isolated sandbox where required | Customer R2/S3 + Postgres/Supabase adapter | BYOK, Vercel AI Gateway or provider adapter | Durable addressable agents in customer-controlled accounts |
| **Managed Web** | Vercel/Next.js control surface + Cloudflare durable runtime | Starlight-managed Supabase/Postgres and R2 namespaces | Vercel AI Gateway by default | Lowest-friction hosted experience |

Vercel is the experience plane. Cloudflare is the durable agent/edge plane. Railway remains a conventional container adapter where edge runtimes are the wrong fit. OpenRouter may be a provider adapter, not the platform architecture. BYOK is the default; model/video/image credits are not resold at launch.

### 5. MCP topology

Build one installation and policy experience, not one monolithic server:

- **Starlight MCP Gateway:** identity, venture resources, policy enforcement, registry discovery and routing;
- **GenCreator MCP:** existing limited v0.2 media/content capability adapter with approval-gated external actions;
- specialised private or third-party MCP servers installed behind the gateway;
- local stdio and authenticated remote transport profiles;
- OAuth 2.1-compatible remote authorisation, least-privilege scopes and audit receipts.

Current status must remain explicit:

- SIS source is at v8.3.0 and already contains a v0.1 operational Foundry kernel, CLI, manifest schema, portable Foundry plugin, local stdio MCP and passing Foundry/eval tests.
- There is no deployed authenticated remote Foundry MCP, remote privacy contract, live Cloudflare agent swarm dispatch or cryptographic evidence receipt yet.
- GenCreator has a real v0.2 MCP gateway with deterministic read/draft/approval-required modes, but external writes and the full capture → transform → review → export activation proof remain incomplete.
- The customer-facing product remains fragmented across `agentic-business-os` main and an old draft Foundry PR; it is not yet a verified end-to-end product.

## Sovereignty constitution

1. The founder owns venture code, data, brand, customer records and generated artifacts.
2. Local execution and BYOK remain first-class, not crippled demos.
3. `foundry export` produces a complete open-format venture archive.
4. Cancelling updates never confiscates the last licensed working snapshot.
5. Customer data is not silently pooled across ventures or used for model training.
6. Irreversible, public, legal, employment, customer-data and financial actions require deterministic policy and explicit authority.
7. Agent reasoning does not control financial custody. Deterministic payment infrastructure enforces signed commercial terms.
8. Costs, permissions, sources, versions and outcome evidence remain inspectable.

## Commercial architecture

### Default model: licence and rights, not a permanent tax

Preserve one product path and differentiate price by rights, seats and commercial scope:

| Offer | Price | Rights and purpose | Release gate |
|---|---:|---|---|
| **Foundry Blueprint / Six Primitives** | **€197 once** | Method, templates, starter workflow and commercial ownership of outputs; no bespoke support | Current P0 after checkout/entitlement/fulfilment receipt |
| **Foundry Solo** | **€997 once** | One founder, one active venture, local install, Brand Stack, one evaluated launch team and 12 months of updates | Core design-partner product |
| **Foundry Studio** | **€2,997 once** | Up to five internal users and three active ventures; same software path, broader rights and seats | Only after activation/support gates pass |
| **Foundry Applied AI Lab** | **€4,500 ex VAT** | Fixed-scope design-partner service for one venture; includes Foundry Solo and must extract reusable IP | First five partners only |
| **Sovereign Foundry Deployment** | **From €10,000** | Bespoke private registry, own-cloud deployment and policy configuration under a statement of work | Quote only after five successful Labs; never a self-serve launch tier |

The buyer retains the pinned licensed version perpetually. After 12 months, signed releases, compatibility updates and support renew at approximately 25% of the then-current licence price. Compute and third-party vendor spend remain BYOK or transparent pass-through, never an “unlimited agents” promise.

Recurring Foundry Cloud and certification pricing should be activated only after usage proves a recurring job. Do not add a subscription merely because recurring revenue is desirable.

### Selective revenue participation: Foundry Ventures

Revenue share is a separate opt-in financing/co-building contract, never embedded into every installation.

Test this with no more than three application-only pilots and only when Starlight:

- waives or defers at least half of the normal implementation fee;
- materially co-builds, co-sells or operates the defined product;
- has an explicit attribution window and auditable payment scope;
- accepts the delivery and commercial risk.

Recommended pilot structure:

- **€1,500 upfront + 5% of Net Collected Revenue** from one specifically named offer;
- ends after **12 months** and total consideration is capped at **€6,000 including the upfront fee**;
- Net Collected Revenue excludes VAT/sales tax, refunds, chargebacks and payment-processing fees;
- monthly statement, audit rights, IP ownership, termination and reserved matters are signed before activation.

Deeper venture-studio arrangements use separately negotiated equity or economics. There is no perpetual royalty and no autonomous wallet skim.

For these initial pilots, settle from monthly statements by invoice. Do not build Stripe Connect, wallets or payment interception. Agents may reconcile and draft the statement; they do not custody funds or decide transfer rules. Stripe’s platform charge models can make the platform responsible for fees, refunds, disputes and negative balances, so Connect is not a casual monetisation switch.

### Later revenue surfaces

- signed pack/update renewals;
- Foundry Cloud hosting and observability after retention proof;
- certification and commercial deployment rights;
- private registry/enterprise governance;
- marketplace fee on externally authored verified packs;
- capped architecture labs that always return reusable product IP.

## Go-to-market sequence

### Internal proof portfolio

Prove one kernel across structurally different ventures:

1. **FrankX / GenCreator:** creator product, content and commerce loop;
2. **Arcanea:** IP, narrative, worldbuilding and generative-media loop;
3. **Agentic Income:** evidence-led offer and income-workflow loop;
4. **AI Architect Academy:** curriculum, assessment and credential loop;
5. **Starlight Domains:** venture asset, landing page and sale loop.

The public story is not “we assembled thousands of agents.” It is:

> Five very different ventures run on one portable operating contract—and the founder can inspect, own and move every part.

### Launch boundary

Creator OS remains the August money path. Foundry is visible as the standard behind the pack, not a second checkout competing for attention. Five successful €4,500 Applied AI Labs create the proof needed to quote the €10,000+ sovereign deployment.

## Thirty-day build charter

### Phase 0 — Canon and contracts (21–24 Aug)

- publish this constitution in GitHub, Notion and Drive;
- choose one normative repository and archive/supersede duplicate plans;
- define `foundry.yaml`, WorkPacket, Team, SkillPack, Policy and EvidenceReceipt schemas;
- record maturity truth for SIS, Starlight MCP, GenCreator MCP and each first-party pack.

### Phase 1 — Local golden path (25–31 Aug)

- compile the Six Primitives into a local installer and doctor;
- wrap the existing SIS Foundry CLI (`validate`, `graph`, `route`, `forge`, `prove`, `evolve`) with founder-facing `init`, `doctor` and `export` entry points rather than rebuilding the kernel;
- ship one evaluated three-agent venture-launch team, not a universal swarm;
- produce source, decision, workflow, asset, proof and learning artifacts;
- verify one real checkout → entitlement → fulfilment → refund receipt.

### Phase 2 — Portfolio dogfood (1–7 Sep)

- import FrankX/GenCreator, Arcanea and Agentic Income as internal test manifests;
- measure common versus brand-specific primitives;
- prove local exit/export and define—without implementing—the own-cloud adapter contract;
- open fixes as versioned pull requests with evidence receipts.

### Phase 3 — Five paid design partners (8–21 Sep)

- onboard five narrowly matched design partners; close at least three at €997 or higher, with Applied AI Labs at €4,500 ex VAT for partners requiring implementation;
- record time-to-first-value, activation, support, recurring commonality and founder overrides;
- get at least two partners to publish or sell the resulting offer within 30 days;
- extract reusable pack assets; do not hide custom service inside the product.

### Phase 4 — Release decision (22–30 Sep)

- open Sovereign Foundry only when all evidence gates pass;
- otherwise keep Foundry internal, ship the proven packs, and repair the kernel.

## Evidence gates

Foundry becomes a public platform only when all are true:

- one local install succeeds on a clean machine;
- first useful artifact is produced within 15 minutes;
- three internal ventures run from the same manifest contract;
- five external partners have paid and completed activation;
- at least 70% of the delivery workflow is shared;
- median support is at most 20 minutes per self-service buyer;
- refund rate is at most 8%;
- complete checkout, entitlement, fulfilment, refund and evidence receipts reconcile;
- every pack has provenance, licence, permissions, evals, update and rollback metadata;
- no customer is required to surrender data, infrastructure ownership or perpetual revenue rights.

## Explicit non-goals

Do not build or claim these in the first 30 days:

- a general autonomous “company in a box”;
- an “any idea to a business” promise;
- a visual no-code workflow canvas;
- an open marketplace;
- a proprietary model or token wallet;
- Stripe Connect, wallets, autonomous transfers or royalty enforcement;
- a production cloud deployment matrix before the design-partner gate;
- automatic publishing, outbound sales, hiring or money movement;
- unlimited model/media credits;
- a monolithic Starlight MCP containing every tool;
- a claim that GenCreator MCP is production-complete or already permits autonomous external writes;
- “the world’s best agents or skills” without reproducible comparative evals;
- passive-income guarantees;
- another standalone brand, community or code path;
- migration of every portfolio venture before three reference manifests work.

## Decision metrics

Track:

- time to first inspectable artifact;
- venture activation and completed first run;
- percentage of steps supported by evidence;
- percentage of workflow shared across ventures;
- cost per accepted artifact and per run;
- human approvals, overrides and blocked unsafe actions;
- export/reinstall success;
- paid conversion, refunds and median support time;
- reusable IP extracted per design partnership;
- defects converted into versioned product changes.

## Evidence and sources

### Internal Notion authority

- [Starlight Intelligence — Business Hub](https://app.notion.com/p/845ebc357e1f45059a302f7b619fca27)
- [Product & Platform Roadmap — Starlight Intelligence](https://app.notion.com/p/61b571ce100345b99beb3f7a863da13b)
- [Offers & Productization — Starlight Intelligence](https://app.notion.com/p/f41ab4b9b6b8415d946b44e4757dff48)
- [Portfolio Product Model & Launch OS](https://app.notion.com/p/3b826ac2b7f681afbd5dec402609807f)
- [Aug–Sep 2026 Portfolio Launch Command](https://app.notion.com/p/3be26ac2b7f681b2807fdc6ddf38e477)
- [Starlight Intelligence Systems — Ecosystem & Vision](https://app.notion.com/p/33626ac2b7f68128a774fe8756713a27)
- [Starlight Venture OS](https://app.notion.com/p/38226ac2b7f681839494f611ab587488)

### Normative GitHub authority

- [Agentic Business OS](https://github.com/frankxai/agentic-business-os) is the canonical customer-product repository.
- [Starlight Intelligence System](https://github.com/frankxai/Starlight-Intelligence-System) remains the protocol, memory, compiler and governance substrate.
- [Foundry architecture](https://github.com/frankxai/Starlight-Intelligence-System/blob/main/docs/architecture/STARLIGHT-INTELLIGENCE-FOUNDRY.md) documents the operational v0.1 kernel.
- [Portfolio convergence audit](https://github.com/frankxai/Starlight-Intelligence-System/blob/main/context/empire/audits/2026-08-12-starlight-repo-convergence.md) forbids SIS from absorbing every product and directs authority convergence.
- [Agentic Business OS draft Foundry PR #2](https://github.com/frankxai/agentic-business-os/pull/2) contains useful strategy that must be extracted and revalidated against current main rather than merged blindly.
- [GenCreator MCP route](https://github.com/frankxai/gencreator.ai/blob/main/app/api/mcp/route.ts) proves the gateway exists while [issue #5](https://github.com/frankxai/gencreator.ai/issues/5) records the missing activation proof.

### Internal Drive evidence

- [Starlight Intelligence Ecosystem Registry — Private Master](https://docs.google.com/spreadsheets/d/13iet1HW3IZYFwLSx_1rQPIZmaA8gGlzSFmqB3iFvGwg/edit)
- [The Human Freedom Architecture](https://docs.google.com/document/d/1jYkxdfNWzmVudqXV9SqEbZckYelRT6kpk0gft0YkRNw/edit)
- [Constellation Integrity Audit — 2026-08](https://drive.google.com/file/d/1658lELP_Mr63lTnESHj1Q1H_mbdEF0cU/view)
- [Starlight Intelligence Systems Brand Strategy Brief](https://docs.google.com/document/d/1f27jKmuB50gVUVkqJLocRbksOUoRPPmNgZacewTkBcY/edit)
- [Agentic Creator OS Brand Strategy Brief](https://docs.google.com/document/d/1C3AcGk34Z63XuSoDARlVOxdxYkt5hKsyZNJooNnC1mg/edit)
- [GenCreator Brand Strategy Brief](https://docs.google.com/document/d/1Uq4OMMOATBx6UF-0Upe0vcVgUV4r8fwWzNsquCBKUew/edit)
- [Monetizing AI Agents and Digital Products](https://docs.google.com/document/d/1t1nVLXe2KTTHQD6hXV2PryqH9kSA45XqdXX6qEPi06k/edit)
- [Non-JV Collaboration and Licensing Blueprint](https://docs.google.com/document/d/1U2beVrA0d3bJWc59uL7bL2PBNQZoFDQsTaAegq6alJU/edit)
- [Design Partnership & Revenue-Share Agreement](https://docs.google.com/document/d/1ipgQ5F3SEPtCJ7YiNvDM3t980TS8eUBUS4PkFzsAwGQ/edit)

### Current external architecture and market evidence

- [Cloudflare Agents](https://developers.cloudflare.com/agents/) provides durable agent identity, state, sessions, routing, scheduling and observability.
- [Cloudflare Sandbox](https://developers.cloudflare.com/sandbox/) provides isolated container execution for agent-driven code and build workloads.
- [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) provides a unified model API; managed Foundry should preserve direct/BYOK adapters as well.
- [Agent Skills specification](https://agentskills.io/specification) defines the portable `SKILL.md` structure and licence/compatibility metadata.
- [Official MCP Registry architecture](https://modelcontextprotocol.io/registry/about) explicitly supports downstream aggregators that add curation, ratings and security checks.
- [MCP authorisation](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) defines OAuth-based remote authorisation requirements.
- [Stripe Connect integration guidance](https://docs.stripe.com/connect/integration-recommendations) shows that platform charge models can transfer fee, refund, dispute and negative-balance responsibility to the platform.
- [Replit pricing](https://replit.com/pricing) brackets self-serve agent products at roughly $20–$100/month before enterprise controls.
- [n8n pricing](https://n8n.io/pricing/) demonstrates the open-core/self-hosted pattern and the premium commanded by governance, environments and version control.

## Final posture

Starlight Foundry wins when it is the most trusted way to **own and operate a venture with agents**, not when it claims the largest swarm.

The moat is the combination of:

- a portable venture contract;
- curated and evaluated agent teams;
- a portable deployment contract with local sovereignty first;
- evidence-driven business loops;
- cross-venture learning without data leakage;
- commercial rights and signed releases;
- a constitution that preserves founder control.

**Your venture. Your agents. Your infrastructure. Your upside.**
