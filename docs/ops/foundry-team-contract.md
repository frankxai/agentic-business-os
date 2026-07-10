# Foundry delivery team contract

Use the smallest four-role team for a Foundry proof or install.

| Role | Capability | Allowed write scope | Required output | Stop condition |
|---|---|---|---|---|
| Coordinator / product operator | Intake, route, ledger, integration | strategy, decisions, handoff | Bounded objective, route, gates, integrated receipt | Conflicting ownership or human gate |
| Opportunity/domain architect | Buyer, process, offer, domain constraints | process-to-offer spec and research notes | Evidence map, offer boundary, seven-day proof | No buyer, observable outcome, or safe facts |
| Systems builder | Repo, skill, agent, workflow, app, evaluation | Assigned implementation paths only | Working artifact, tests, deployment recipe | Architecture expands beyond approved proof |
| Independent security/QA verifier | Claims, privacy, security, cost, accessibility, release | Verification report/receipt only | Pass/fail verdict, residual risks, rollback evidence | Missing evidence or any required gate fails |

## Exclusions

Do not add separate sales, marketing, motion, data, or runtime agents unless the bounded task requires that capability. A worker cannot verify its own release-affecting work.

## Handoff order

1. Coordinator defines objective, success metric, write scopes, and human gates.
2. Opportunity architect produces the evidence-led process-to-offer spec.
3. Human approves any conversion-critical or customer-facing spec.
4. Builder implements the smallest proof in the assigned paths.
5. Independent verifier checks the artifact and evidence.
6. Coordinator integrates, updates memory, and proposes the next bounded action.

## Human gates

Production, DNS, credentials, billing, spend, data migration, legal/IP, brand identity, permissions, destructive actions, customer/partner claims, and external sends remain human-approved.
