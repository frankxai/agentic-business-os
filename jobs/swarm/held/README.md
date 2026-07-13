# Held Autonomous Foundry swarm packets

These are queue-compatible execution contracts, not dispatched tasks.

They remain here because `pp preflight --workload swarm` returned `HOLD` on 2026-07-14. Do not copy them to `C:\Users\frank\starlight\queen\inbox` until:

1. machine admission is `allow` or explicitly permits the bounded team;
2. `queen/COORDINATION.md`, repo branches, and the business queue are reread;
3. each writer receives a separate worktree and non-overlapping scope;
4. the exact dependency/runtime docs are available;
5. human gates remain unchanged;
6. the verifier is routed through a different provider from the builder.

The selected team comes from `frankx-product-revenue-team.team-profile.json` via the deterministic `resolve_team.py` helper:

- coordinator;
- backend/data engineer;
- GTM/analytics operator;
- independent QA/release/SRE verifier.

Run order is serial unless the current machine gate admits more concurrency: `01` → (`02`, then `03`) → `04`.

Every completion needs a durable `resultRef`. A queue status without evidence is not completion.
