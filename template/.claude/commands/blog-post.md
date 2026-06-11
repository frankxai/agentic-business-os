# /blog-post — write and gate a journal entry

Write a new journal entry end-to-end.

**Usage:** `/blog-post <topic>`

## Pipeline

1. Load `SKILL.md`, the voice file in `lib/voice/`, and `docs/intelligence/MEMORY.md`
2. Check existing posts in `content/blog/` — don't repeat an angle
3. Draft to `content/blog/<slug>.md` with frontmatter (title, description, date). TL;DR in first 100 words, ≥1 internal link, locale conventions per the voice file, approved framing + citation on anything factual
4. Dispatch `@content-polisher` on the draft
5. Dispatch `@claims-guard` — if FAIL, surface the report and STOP (human rewrites; never auto-fix a Gate 1 hit)
6. Run `pnpm build` to confirm the post renders
7. Report: file path, gate verdict, suggested `/weekly-content` slot

Commit the post; do NOT deploy — deploys are human-triggered per CLAUDE.md.

---
harness: agentic-business-os@v0.1.1
