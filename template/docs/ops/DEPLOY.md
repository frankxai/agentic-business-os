# Deploy runbook

Single-repo, single-environment. No staging theatre at this stage.

## One-time setup

1. Create a Vercel account (hobby tier is fine pre-launch)
2. `Import Project` → select the GitHub repo → framework auto-detects Next.js → deploy
3. Add the domain under Project → Settings → Domains
4. Done. Every push to `main` deploys automatically; every PR gets a preview URL.

## Per-deploy discipline

1. Run `/ship` (typecheck + build + claims-guard + seo-guardian)
2. Merge/push to `main` — a human does this, never an agent
3. Check the live URL + the routes you changed
4. If something's wrong: Vercel → Deployments → previous deployment → "Promote to Production" (instant rollback)

## Environment variables (none yet)

When the email provider is wired, its API key goes in Vercel → Settings → Environment Variables — never in the repo.
