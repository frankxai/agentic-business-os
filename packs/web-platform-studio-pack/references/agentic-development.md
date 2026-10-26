# Agentic development and application architecture

The missing capability in many agent-assisted projects is continuity: a correct decision must survive a context change, retry, deployment, handoff and model upgrade. Build that continuity into ordinary software contracts.

## Separate three uses of AI

| Use | Runtime and responsibility | Required evidence |
|---|---|---|
| Development assistant | Codex or another buyer-selected coding environment | Repository instructions, bounded write scope, tests and review |
| Production agent feature | Application server with scoped provider/tool access | Evaluations, authorization, spend limits, traces and safe recovery |
| Agency operations assistant | Intake, research, proposals and delivery coordination | Source attribution, approval boundaries, durable customer/project state |

An instruction file can guide a coding assistant. Application code and infrastructure must enforce production authorization and isolation. Keep secrets in an appropriate secret store and expose only the required tool capabilities.

## Architecture choices

Begin with static/server-rendered content for a marketing site. Add a database only for a concrete stateful job. Add authentication when user identity is necessary, payments when there is a verified sellable outcome, and an agent when uncertain reasoning or tool selection creates measurable value.

For an application, specify UI, API, data schema, identity, authorization, object storage, transactional email, background jobs and observability. For a platform, add tenant isolation, account lifecycle, usage accounting, billing entitlements, migrations, support access and abuse handling. Keep tenant constraints in database queries, object paths, retrieval, jobs and exports; front-end hiding cannot enforce them.

For agent features, use validated structured inputs/outputs and a small tool surface. Document the model capability required (reasoning, vision, tool use, structured output, latency, context), then verify current provider support. Record tested provider/model versions and changes. Avoid promising model interchangeability without regression evidence.

## Contracts that must exist

| Contract | Design decision | Failure exercise |
|---|---|---|
| Authority | Who may request each action, on which resources? | Untrusted page asks the agent to export customer data |
| Durable state | Which system stores progress, outcomes and recovery cursors? | Worker terminates halfway through a job |
| Idempotency | Stable action keys and reconciliation of uncertain results | Payment/tool succeeds but the response times out |
| Tool validation | Allowlisted methods, typed arguments, resource checks | Malformed result or unexpected redirect changes destination |
| Human confirmation | Exact action summary and bounded approval lifetime | User approves a preview; later data changes |
| Cost | Per-request/account budgets, timeouts and concurrency caps | Long-running loop or repeated provider throttling |
| Cancellation | Stop requested work and settle in-flight operations | User cancels while a tool is processing |
| Data isolation | Tenant/user permissions across retrieval and tools | Another tenant's identifier is supplied |
| Evaluation | Versioned cases, expected behavior, observed regressions | Model update changes tool choice or format |
| Observability | Correlation IDs, redacted traces, result and cost | Failure is visible but sensitive prompts stay private |
| Fallback | Explicit degraded behavior and escalation | Provider outage, schema failure or unavailable tool |
| Ownership | Named operator, dependency updates and exit path | Original builder is unavailable |

Start with at least ten project-specific evaluation cases spanning success, ambiguity, insufficient facts, denied access, prompt injection, malformed tool results, duplicates, cancellation, cost exhaustion and provider failure. Ten is an initial coverage floor, not a score that establishes safety. Add cases for every significant discovered defect. A static-site project does not need a production agent evaluation suite simply because Codex wrote its code.

## Repository package

- `AGENTS.md`: scope, commands, source hierarchy, authority and evidence rules.
- `SKILL.md`: one repeatable task with inputs, outputs, prerequisites and stop conditions.
- Architecture decision records: why the selected stack fits the buyer and the exit costs.
- Tests/evaluations: executable cases with fixtures free of secrets/customer data.
- Environment example: names and purpose of configuration values, never real keys.
- Deployment/migration/rollback recipes: one known owner and verified environment.
- Handoff: versioned support promise, operations ownership and data export/deletion.

Workflow code should emit durable receipts for irreversible or external actions. A successful model response is not proof that a deployment, email, payment or data mutation occurred. Reconcile against the provider/system of record.

## Upgrade and distribution

Keep buyer-specific overrides separate from upstream core. Pin dependencies and preserve a change log, migrations and rollback. Test upgrades against a real prior version and representative customizations. A template update must not silently overwrite customer copy, identity or accounts. Portable skills can be delivered across coding environments, but test their actual tool assumptions in each advertised environment.
