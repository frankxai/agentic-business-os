# Contributing

Thanks for looking under the hood. This repo is the business member of the Agentic OS family — contributions that sharpen the machinery help every downstream instance at once.

## What we take

- **Harness improvements** — sharper gate logic, better command pipelines, new generic agents. The bar: must stay **brand-neutral** (specifics defer to each instance's voice file, `taste.md`, and business memory — see `HARNESS.md`).
- **Pack contributions** — new standalone skill packs. Open a `pack_submission` issue first; see `packs/README.md` for the structure.
- **Template fixes** — build breakage, accessibility, dependency updates in `template/`.
- **Docs** — clearer GUIDE.md, better troubleshooting entries.

## What we decline

- Brand-specific content in upstream-managed files (`.claude/agents/*`, `.claude/commands/*`) — it breaks sync for every instance
- Auto-publish or auto-merge mechanics of any kind — the human-presses-external-buttons rule is architectural, not stylistic
- Health/financial/environmental claim language anywhere, including examples
- Dependencies the template doesn't strictly need

## Workflow

1. Fork → branch (`feat/<slug>` or `fix/<slug>`)
2. For harness files: keep the provenance footer, bump nothing (versioning happens at release)
3. `cd template && pnpm install && pnpm typecheck && pnpm build` — must be green (CI enforces)
4. PR with a plain-language description of *why* — sync PR changelogs are written from these
5. One maintainer review (@frankxai); merge is squash-only

## Commit style

`type(scope): summary` — types: feat, fix, docs, chore. Scope examples: harness, template, packs, sync.

## Questions

Open a discussion or issue. For anything security-shaped, see `SECURITY.md`.
