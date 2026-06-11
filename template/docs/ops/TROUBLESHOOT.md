# Troubleshooting

The short list of things that actually go wrong, and the fix for each.

## Build fails after instantiation

- **`pnpm install` errors** — check Node ≥ 20 (`node --version`) and pnpm ≥ 9. The template pins nothing exotic.
- **Type errors in files you didn't touch** — run `pnpm install` again (a partial install leaves `next-env.d.ts` missing), then `pnpm typecheck`.
- **`{{...}}` markers in build output** — markers in JSX text build fine; markers you pasted into *code positions* (imports, props) don't. Run `/os-spawn` to derive them away, or grep `{{` to find strays.

## The agent doesn't follow the rules

- The agent reads `CLAUDE.md` (Claude Code) or `AGENTS.md` (others) at session start. If it behaves generically, ask it: *"What are the rules of this repo?"* — if it can't answer, the file isn't being loaded; check you opened the terminal at the repo root.
- After editing contract files, start a fresh session. Agents don't re-read doctrine mid-conversation reliably.

## @claims-guard false positives

The gate greps the voice file's `BLOCKED_CLAIM_PATTERNS`. A legitimate sentence matching a pattern means the pattern is too broad — tighten the regex in `lib/voice/*-voice.ts` and record the change in a decision record. **Don't bypass the gate**; fix the pattern. The patterns are yours (instance-owned).

## Harness-sync PR looks scary

It isn't. Read `docs/ops/HARNESS.md`: only `.claude/agents/*` and `.claude/commands/*` change, your brand files are untouched, and declining is always safe — the next sync offers everything again.

## The notify form does nothing

`app/api/notify/route.ts` is a stub by design — it validates and redirects but stores nothing until you wire an email provider. That's a decision record + ~30 minutes; the route's comments say where.

## Deploy issues

See `docs/ops/DEPLOY.md`. The two classics: forgetting that env vars go in Vercel project settings (never the repo), and pushing without running `/ship` first.
