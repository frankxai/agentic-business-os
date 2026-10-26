# Route matrix

Use the lightest sufficient runtime.

| Need | Default | Escalate only when |
|---|---|---|
| Human-present analysis, research, drafting | ChatGPT or Claude | Repeatability requires files, tools, or tests |
| Repository, website, skill, MCP, or evaluation build | Codex or Claude Code | A customer-facing runtime is required |
| Customer-facing web agent | Next.js + Vercel AI SDK | A validated workflow needs a product surface |
| Deterministic SaaS/API integration | n8n or Make | Custom code is necessary for reliability or security |
| Persistent channel operator | OpenClaw | Manual workflow, permissions, isolation, heartbeat, and receipts are proven |
| Self-hosted recurring routine | Hermes | Repeated runs create measurable learning value |
| Shared agent-tool boundary | MCP | Multiple clients need the same governed capability |
| Multi-specialist coordination | Framework-native team or governed swarm | Work separates cleanly and independent verification adds value |
| Static/web deployment | Vercel | Long-running or stateful compute is truly required |
| Durable worker/gateway | Railway | Persistence or background compute is proven and cost-gated |

Always record:

- selected runtime and reason;
- rejected simpler alternative and reason;
- data boundary;
- human approval boundary;
- evaluation and receipt path;
- owner, cost class, rollback, and review date for recurring infrastructure.
