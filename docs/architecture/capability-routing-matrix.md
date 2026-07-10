# Capability and runtime routing matrix

Choose the smallest stack that can produce one useful, reviewable result. Do not begin with a swarm or an always-on agent.

## Decision order

1. What business process changes?
2. What observable result proves value?
3. Which decisions remain human?
4. What data may the system read and retain?
5. Does the work need conversation, repository changes, deterministic integrations, a public product, or persistence?
6. What is the cheapest reversible architecture that meets those needs?

## Runtime chooser

| Need | Default | Escalate when | Do not start here when |
|---|---|---|---|
| Think, research, draft, analyze with a human present | ChatGPT or Claude | Repeatability requires files, tests, or tools | The process needs unattended execution |
| Build/configure a repo, skill, website, MCP server, or evaluation | Codex or Claude Code | A customer-facing runtime is required | The task is only one conversational decision |
| Customer-facing web agent or embedded AI feature | Current Next.js + Vercel AI SDK 7/Eve pattern | Durable background execution or complex data plane is proven necessary | There is no validated user workflow |
| Deterministic SaaS/API workflow | n8n or Make | Custom code is required for reliability, scale, or security | The workflow is mostly judgment and exceptions |
| Persistent channel-attached operator | OpenClaw | A bounded process already works and isolation/permissions are designed | A founder has not yet operated the workflow manually |
| Self-hosted recurring agent routine | Hermes | Learning from repeated runs has measurable value | The workflow, evals, heartbeat, and stop conditions are missing |
| Portable tool/capability boundary | MCP | Multiple agents or clients genuinely need the same tool | A direct API call is simpler and owned by one app |
| Multi-agent specialist coordination | Starlight/ACOS or framework-native orchestration | Parallel specialists improve quality or latency and can be evaluated | One agent plus tools can complete the job |
| Managed application runtime | Vercel | Long-running workers or stateful services are required | A static/template deliverable is enough |
| Worker, queue, durable gateway, or MCP service | Railway | The bounded service needs persistence or background compute | It creates an always-on cost before demand exists |

For consulting and operator kits, keep n8n or Make workflows in the customer's own account or instance. Managed credential hosting, embedded editors, or white-label workflow products require an explicit license review and a different support and security model.

## Reference architecture

```text
Human owner
  └─ outcome + approval policy
      └─ agent or deterministic workflow
          ├─ approved knowledge / business memory
          ├─ tools behind narrow permissions
          ├─ evaluations and claims/security gates
          └─ run receipt + cost + evidence
              └─ human approves publish / send / spend / production
```

For multiple agents:

```text
Coordinator
  ├─ researcher (read-only)
  ├─ builder (bounded write scope)
  ├─ domain/risk reviewer (read-only)
  └─ independent verifier (evidence only)
```

No worker verifies its own release-affecting work. Write scopes must not overlap without a serialized handoff.

## Business-process patterns

| Process | Smallest proof | Likely architecture | Commercial shape |
|---|---|---|---|
| Lead qualification | Form/quiz → scored lead → human-reviewed recommendation | Next.js or form + rules; LLM only for explanation | Setup + optimization |
| Proposal generation | Approved facts → draft proposal → review | Coding/chat agent + templates; optional CRM workflow | Productized service |
| Seller copilot | Context packet → objection/next-step draft | Chat agent with approved knowledge | Per-seat pack or managed enablement |
| Content/SEO | Brief → draft → claims/voice gate → publish approval | Repo agent + content pipeline | Pack + monthly operations |
| Customer onboarding | Intake → checklist → missing-fact detection | Deterministic workflow + agent summaries | Install + retainer |
| Support triage | Inquiry → classification → suggested response/escalation | Workflow + knowledge base + human gate | Managed operations |
| Research/intelligence | Sources → synthesis → citations → decision brief | Research agent + evaluation/citation gate | Subscription or scoped brief |
| Vertical portal | Approved facts → customer self-service UI | Next.js/Vercel + secure data; optional MCP worker | Template + install + retainer |
| Affiliate/content asset | Honest comparison → disclosure → recurring route | Agentic Income template and catalog | Affiliate + owned product |
| Skill/MCP product | Repeated judgment or integration → portable contract | SKILL.md or MCP server + tests | One-time pack + updates/license |

## Always-on gate

OpenClaw, Hermes, cron, queues, or workers are allowed only when all are true:

- the manual workflow has produced useful results repeatedly;
- a heartbeat and dead-man signal exist;
- inbound content is treated as untrusted data;
- secrets are isolated and least-privilege;
- tools and destinations are allowlisted;
- spend and model usage are capped;
- actions are idempotent or recoverable;
- every run emits an auditable receipt;
- publish, send, spend, production, and destructive actions remain human-approved;
- there is an owner, rollback plan, and first review date.

Hermes and OpenClaw deployments must be single-tenant by default. Separate customer repository, runtime, secrets, data, budget, logs, and deletion/export path. Do not pool client credentials in a shared personal-agent process.

Use pinned official OpenClaw releases with sandboxing explicitly configured. Use Hermes only after its distribution format and whole-process isolation match the installed version. Treat MCP as a typed tool boundary, not a scheduler or durable workflow engine.

## Swarm gate

Use a swarm only when the task has separable specialist work, evidence can be merged, and independent verification changes the expected quality. A default Foundry team has four roles:

1. coordinator/product operator;
2. domain or market specialist;
3. systems builder;
4. independent security/QA verifier.

Add more agents only for a named capability gap.
