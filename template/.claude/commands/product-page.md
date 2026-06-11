# /product-page — spec and build a product surface

**Usage:** `/product-page <what>` (e.g. `/product-page size guide`, `/product-page checkout`)

## Pipeline

1. Dispatch `@product-architect` → one-page spec to `docs/intelligence/specs/`
2. Surface the spec for a human yes before writing code (product surfaces are conversion-critical — specs are cheap, rebuilds aren't)
3. On go: build to `design.md` tokens. Read `design.md` + `taste.md` first. Square corners, one heat accent, data in mono
4. `pnpm typecheck && pnpm build`
5. `@claims-guard` on all copy in the new surface
6. Walk the `taste.md` polish pass; report results honestly

---
harness: agentic-business-os@v0.1.0
