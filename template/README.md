# {{BRAND}}

**{{TAGLINE}}**

This repo is two things at once:

1. **The website** — a Next.js site ({{DOMAIN}})
2. **The operating system** — an AI-agent harness that lets you run content, design, and business operations with a coding agent as a trained team member instead of a blank chatbot

Instantiated from [agentic-business-os](https://github.com/frankxai/agentic-business-os), part of the Agentic OS family by [frankx.ai](https://frankx.ai).

> **Template state:** run `/os-spawn {{BRAND}}` in Claude Code to derive your brand — it rewrites every `{{...}}` marker through a guided interview. Until then, the placeholder copy IS the to-do list.

## Quick start

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # must be green before any deploy
```

## The contract files — the part that matters

Five files define how any AI agent behaves here. Edit these, and every future session changes behavior. They are the company handbook, enforced by software:

| File | What it is |
|---|---|
| `CLAUDE.md` | The doctrine — identity, the prime rule, the gates |
| `AGENTS.md` | The one-page card for any AI tool |
| `SKILL.md` | What to load per kind of work; when the AI refuses |
| `design.md` | Every visual value the site is allowed to use |
| `taste.md` | The judgment tokens can't capture |

## The agents and commands

`@claims-guard` (the publish gate — the load-bearing one) · `@content-polisher` · `@social-distributor` · `@seo-guardian` · `@product-architect`

`/blog-post` · `/claims-check` · `/product-page` · `/weekly-content` · `/weekly-review` · `/ship`

## The weekly rhythm

Monday `/weekly-content` (10 min) → midweek production → Friday `/weekly-review` (15 min). The memory in `docs/intelligence/` is what makes week 30 smarter than week 1.

## House rules

1. No {{REGULATED_TERRITORY}} claims — `@claims-guard` enforces automatically
2. Humans press the external buttons (deploy, post, send)
3. Decisions get written down (`docs/intelligence/decisions/`) — superseded, never deleted

---

*Harness updates arrive as readable PRs from upstream — see `docs/ops/HARNESS.md`. Built to be owned: the contract files are yours; the architecture stays connected.*
