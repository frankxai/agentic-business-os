# Skill Packs

Standalone capabilities from the Agentic Business OS — each pack works **two ways**:

1. **In Claude.ai (Cowork / Projects):** upload the pack folder (or just its `SKILL.md`) to a project. The capability comes with it — no repo required.
2. **In any repo:** copy the pack folder, or install via the skills CLI:
   ```bash
   npx skills add frankxai/agentic-business-os
   ```

## The packs

| Pack | Kind | One line |
|---|---|---|
| [`claims-guard-pack`](./claims-guard-pack/) | gate | Zero-tolerance pre-publish audit for regulated claims, citations, and AI-tone. The load-bearing pack. |
| [`business-intelligence-pack`](./business-intelligence-pack/) | memory | File-based business memory: decisions, market notes, weekly reviews. Check first, update after. |
| [`design-contract-pack`](./design-contract-pack/) | authoring | Author a design.md + taste.md two-file contract for any brand. |
| [`weekly-rhythm-pack`](./weekly-rhythm-pack/) | workflow | The founder-sized loop: Monday plan (10 min), Friday review (15 min). |

## Pack anatomy

```
<pack-id>/
├── SKILL.md         # the capability — frontmatter (name, description) + instructions
└── manifest.json    # id, name, version, kind, license, upstream, lineage, entrypoint
```

`SKILL.md` at the pack root is the contract: it's what Cowork reads on upload and what coding agents load. Keep it self-contained — a pack that references files outside itself isn't a pack.

`registry.json` (this directory) is the index. Each entry carries `harnessVersion` — the upstream release the pack last shipped with.

## Contributing a pack

Open a [pack submission issue](../../issues/new?template=pack_submission.md) first. The bar:

1. **Standalone** — works in a bare Claude.ai project with zero repo context
2. **Has a refusal list** — every pack states what it must never do
3. **Brand-neutral** — specifics come from the user's context, not baked in
4. **One job** — a pack that does two things is two packs
