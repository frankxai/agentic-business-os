# The Guide — operating your Business OS

> For founders who just got this installed (or just instantiated the template). No AI background assumed. Total reading time: ~10 minutes. Total weekly operating time once running: ~30 minutes plus whatever you create.

## What you actually have

Most companies use AI as a chatbot: blank window, blank context, generic output. You have something different — a **repository that teaches the AI who you are**. Five contract files do the teaching:

| File | Job | In one sentence |
|---|---|---|
| `CLAUDE.md` | The doctrine | The company handbook, read automatically by every AI session |
| `AGENTS.md` | The card | Same rules, one page, readable by any AI tool (not just Claude) |
| `SKILL.md` | The operating skill | What to load before each kind of work, and when the AI should refuse |
| `design.md` | The design tokens | Every color, font, and spacing value your site is allowed to use |
| `taste.md` | The judgment | What the tokens can't capture: references, refusals, the polish pass |

Edit these files and every future AI session changes behavior. That's the whole trick — **the configuration is the company knowledge, and it compounds**.

## Day 1 — onboarding (one evening)

1. **Install [Claude Code](https://claude.com/claude-code)** (or use Cursor/Codex — `AGENTS.md` covers them)
2. **Open a terminal in your repo and just talk.** Try: *"What are the rules of this repo?"* — the agent will recite your doctrine back. That's how you know the harness is live.
3. **Run `/os-spawn`** if you started from the raw template — a guided session derives your brand voice, design tokens, and doctrine from questions about your business.
4. **Read your own `CLAUDE.md`.** It's the best summary of how everything fits.

## The weekly rhythm (the whole operation)

| When | Command | What happens | Time |
|---|---|---|---|
| Monday | `/weekly-content` | Plans the week: 1 post + 1 distribution + 1 ops task. Three items max, sized for founders with day jobs. | 10 min |
| Midweek | `/blog-post <topic>` | Drafts → polishes → **gates** → build-verifies a post | 1–2 h |
| Friday | `/weekly-review` | Closes the week, asks you 3 questions, updates the business memory | 15 min |

The Friday step is the one people skip and shouldn't: it's what makes week 30 smarter than week 1. The memory lives in `docs/intelligence/` — decisions, market notes, weekly snapshots. **Check memory first, update memory after** is the operating discipline.

## The gates (why your output won't look AI-generated)

Nothing publishes without passing:

- **`@claims-guard`** — blocks regulated claim language, uncited assertions, banned phrases, and AI-tone. A FAIL is final until a human rewrites. This is the agent that keeps you out of regulatory trouble and out of the "obviously ChatGPT" zone.
- **`/ship`** — typecheck + build + claims + SEO before any deploy. A human always presses the deploy button.
- **The polish pass** (`taste.md`) — seven manual checks before any visual ships.

The standing rule: **agents draft, gate, and commit; humans deploy, post, and send.**

## When the harness improves upstream

This OS descends from [agentic-business-os](https://github.com/frankxai/agentic-business-os). When the upstream harness improves — a sharper gate, a new agent — your repo receives a pull request with a plain-language changelog. You read the diff (it's markdown), merge or decline per file. Nothing ever auto-merges. Your brand files are never touched. Contract: `HARNESS.md`.

## Where to get help

- The template + packs are MIT — community help via GitHub issues
- Installed by the Foundry? You have a direct channel — use it
- Everything else: [frankx.ai/foundry/guide](https://frankx.ai/foundry/guide)
