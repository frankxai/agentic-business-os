# /ship — pre-deploy gate + deploy checklist

**Usage:** `/ship` — run before any production deploy.

## Pipeline

1. `pnpm typecheck` — must be clean
2. `pnpm build` — must be clean
3. `@claims-guard` on every file changed since last deploy (`git diff --name-only` against the last deploy tag/commit)
4. `@seo-guardian` on any new or changed route
5. If all green: commit, push, and tell the human the branch is deploy-ready. **The human presses the Vercel button (or merges the PR) — the agent never deploys to production.**
6. After deploy: verify the live URL renders, check the changed routes, report.

A red gate stops the pipeline. Report what's red and why; don't ship around it.

---
harness: agentic-business-os@v0.1.0
