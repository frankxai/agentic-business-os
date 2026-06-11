## What + why

(Plain language — sync-PR changelogs to downstream instances are written from this.)

## Checklist

- [ ] `cd template && pnpm typecheck && pnpm build` green (CI enforces)
- [ ] Harness files (`.claude/agents/*`, `.claude/commands/*`) stay brand-neutral — specifics defer to instance-owned files
- [ ] Provenance footers intact
- [ ] No auto-publish / auto-merge mechanics introduced
- [ ] Docs updated where behavior changed
