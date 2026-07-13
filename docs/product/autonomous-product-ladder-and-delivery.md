# Autonomous product ladder and delivery system

**Status:** product contract
**Date:** 2026-07-14
**Companion registry:** `data/autonomous-foundry-control-plane.json`

## Product choice starts with the work shape

Do not turn every SOP into an app or every prompt into a plugin. Choose the smallest product form that can own the outcome.

| Product form | Use it when | Customer receives | Do not use it when |
|---|---|---|---|
| Skill | The value is a repeatable procedure, judgment pattern, or output contract | `SKILL.md`, references, examples, and eval cases | Persistent state, auth, scheduled work, or multiple tools are required |
| Plugin | The capability needs bundled skills, scripts, assets, hooks, MCP/app integration, or installable discovery | Versioned bundle, manifest, install route, changelog, and tests | It is only a document or one prompt |
| Starlight Pack | Several related skills/plugins/templates/evals produce one bounded business outcome | Signed/versioned pack, activation guide, examples, update channel | The happy path still depends on Frank manually configuring it |
| Agent App | The user needs identity, state, files, a UI, entitlements, credits, or connected services | Hosted experience with receipts and customer portal | A local skill can complete the task safely |
| Operator Loop | A recurring outcome must run on a schedule with budgets, approvals, recovery, and support | Subscription, included credits, heartbeat, run history, and escalation | The outcome is not repeatable or valuable enough to renew |
| Swarm Pack | The job needs genuinely independent specialisms and a separate verifier | Coordinator contract, bounded workers, evidence ledger, integrated result | One agent or deterministic code can do it more safely |
| Venture System | Two parties contribute durable IP, distribution, capital, or data rights | Product-specific ownership, attribution, economics, and governance | It is merely a referral, friendship, or one-off favor |

## Install and delivery routes

### Public GitHub

Best for open skills, templates, starter packs, examples, and trust-building source. The customer can inspect, fork, install, and improve it. Use tagged releases and checksums; do not point customers at an unversioned development branch.

### Private GitHub

Best for technical buyers entitled to source, updates, and issue history. Grant repository access from the commerce benefit or the entitlement service, and revoke it when the entitlement ends. Keep private customer instances in their own organization whenever possible.

### Gated archive

Best for nontechnical customers, one-time packs, or tools that install from a ZIP. Deliver a signed or checksummed release archive from a customer portal. Email sends a receipt and expiring access link; it should not carry the canonical attachment.

### Plugin registry

Best when the target agent runtime can install a versioned plugin from GitHub or a package source. Publish a sanitized bundle with manifest, provenance, permissions, update channel, and uninstall instructions. A ZIP remains a fallback, not the source of truth.

### Hosted Vercel app

Best for identity, persistent state, entitlements, service credits, connected accounts, agent runs, and support. Use preview deployments for verification. Production and credentials remain human-gated.

### Customer-owned deployment

Best when customer data, compliance, or long-term control makes a shared SaaS inappropriate. The Foundry generates a deployment packet and agent-led activation; the customer owns the account and secrets.

## Product ladder

| Layer | Product | First value | Revenue model | Required maturity |
|---|---|---|---|---|
| Open | Pathfinder + open packs | One process, one architecture, one proof plan | Free | L1 |
| Entry | Starlight Pack | One reusable capability installed and verified | One-time | L3 |
| Continuity | Update Pass | New versions, evals, connectors, and release notes | Annual or version-cycle entitlement | L3 |
| App | Outcome Agent | A stateful result through a guided interface | Subscription and/or included credits | L3 |
| Recurring | Autonomous Operator | Scheduled outcome with approval and recovery | Subscription plus credit allowance | L4 |
| Learning | Academy Operator Lab | Learn by running and explaining a real artifact | Membership or bundled entitlement | L3 |
| Community | Proof Cells | Review, feedback, and collaborator discovery around artifacts | Membership or bundle | L3 |
| Partner | Distribution Partner | Trusted referral with transparent attribution | Affiliate commission | L3 |
| Platform | Pack Marketplace | Discovery, delivery, updates, reputation, and support boundaries | Take rate | L5 |
| Venture | Selective Venture Studio | Shared product and distribution upside | Contracted royalty, revenue share, or equity option | L5 |

The Academy and community do not become content warehouses. Access follows an artifact, an operator path, or an unresolved product decision.

## Value-first activation

1. Show one real before/after workflow or inspectable receipt.
2. Run the free Pathfinder and return one route, not a catalog.
3. Give the user an open pack or activation credits when that can create the first proof.
4. Recommend a paid product only when it removes a specific constraint.
5. Show the entitlement, renewal, credit estimate, support boundary, and cancellation behavior before checkout.
6. Let the activation agent install, verify, and produce the first result.
7. Ask for proof, feedback, or community participation after value exists.
8. Offer the operator subscription only when the outcome recurs.

The recommendation agent may return `stay-free`, `not-ready`, or `refer-out`. That is a feature, not a failed sale.

## Commerce routing: Polar, Lemon Squeezy, or existing provider

Use both Polar and Lemon Squeezy at portfolio level only when each has a clear job. Never use both for one SKU.

| Need | Default candidate | Reason | Gate |
|---|---|---|---|
| Developer pack with GitHub access, file delivery, license, or built-in usage credits | Polar | Benefits can automate these entitlements and expose them in a customer portal | Sandbox webhook, revoke/refund test, acceptable-use review |
| Download, subscription, license, and a native merchant affiliate program | Lemon Squeezy | Products support downloads/subscriptions/licenses; affiliate programs support product-level commissions | Sandbox webhook, affiliate/refund test, terms review |
| Product already working on Whop, Stripe, or another provider | Existing provider | Migration creates risk without customer value | Migrate only with measured operational benefit |
| Co-created venture, marketplace, or multi-party revenue allocation | Neither as the allocation ledger | Checkout and partner economics are different concerns | Human-approved contract, internal attribution ledger, compliant payout route |

Polar’s current acceptable-use policy excludes marketplaces and selling others’ products or services through a revenue-share model. Do not use it to disguise a venture marketplace. Lemon Squeezy’s native affiliate system is appropriate for referral commission, but a negotiated co-creator or venture allocation still belongs in the internal partner ledger and an approved legal/payment process.

## Provider-neutral entitlement contract

Every checkout adapter must normalize to the same internal facts:

```text
customer_id
workspace_id
product_id
provider
provider_customer_id
provider_order_or_subscription_id
entitlement_type
entitlement_status
granted_at
expires_at
credit_policy_id
license_scope
affiliate_source_id
partner_source_id
last_event_id
```

Rules:

- one provider event is processed exactly once;
- refund, cancellation, expiry, chargeback, and manual revocation are explicit states;
- a provider is evidence of purchase, not the application’s authorization database;
- credits are granted only after the entitlement transition succeeds;
- agent tools query the internal entitlement service, never provider dashboards;
- secrets and raw provider payloads stay out of repos and customer-facing receipts.

## Credit packages

The initial packages are economic hypotheses for testing, not public prices:

| Policy | Allocation | Intended use | Constraint |
|---|---:|---|---|
| Explore | 10 one-time activation credits | Pathfinder, one small eval, or pack preview | No top-up until identity and abuse controls exist |
| Maker | 100 monthly credits | Pack personalization and occasional agent runs | Rollover capped at one monthly allocation |
| Operator | 500 monthly credits | Recurring governed workflows | Workspace cap, pre-run estimate, alerts, and automatic stop |
| Venture | Contract-specific pool | Co-created product operations | Separate product ledger and human-approved economics |

Credit numbers express relative work. They are not a promise that every model, media generation, deployment, or integration has equal cost.

## Affiliate architecture

There are three different affiliate relationships:

1. **Our products promoted by partners.** Use a merchant affiliate program for eligible SKUs, clear disclosures, product-level attribution, refund-aware commissions, and no self-referral abuse.
2. **Other tools recommended by Starlight properties.** Route through the Agentic Income network, reverify the program and product before publication, disclose the relationship, and recommend the product only when it wins the use-case evaluation.
3. **Co-created product economics.** Do not call this affiliate revenue when the collaborator contributed reusable IP or ongoing product responsibility. Use the venture ledger and a human-approved agreement.

Affiliate revenue should be a by-product of trusted product selection. It must never determine the architecture recommendation.

## Product definition of done

A product release includes:

- stable identifier and version;
- audience, outcome, non-goals, and supported inputs;
- install/delivery route and uninstall/revoke path;
- permissions and data classification;
- entitlement and credit policy;
- evaluation cases and independent verdict;
- cost and runtime limits;
- changelog, provenance, checksum, and update route;
- support knowledge, escalation, and known limitations;
- receipt format and telemetry contract;
- current autonomy level and next gate;
- approved public claims and explicit prohibited claims.

An attractive download page without this contract is packaging, not a product.

## Sources verified 2026-07-14

- [Polar automated benefits](https://docs.polar.sh/features/benefits)
- [Polar customer portal](https://docs.polar.sh/documentation/features/customer-portal)
- [Polar acceptable use](https://docs.polar.sh/merchant-of-record/acceptable-use)
- [Lemon Squeezy products](https://docs.lemonsqueezy.com/help/products)
- [Lemon Squeezy licensing](https://docs.lemonsqueezy.com/help/licensing)
- [Lemon Squeezy affiliates for merchants](https://docs.lemonsqueezy.com/help/affiliates-for-merchants)
