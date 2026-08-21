# Foundry adapter boundary

This directory owns product-layer adapter contracts. It must not fork or duplicate protocol/runtime implementations from Starlight Intelligence System or capability repositories.

## Contract

Every adapter declares:

- upstream repository, immutable version and licence;
- capability and maturity state;
- required tools, credentials, network, filesystem and data classes;
- inputs, outputs, side effects and prohibited actions;
- install, health check, upgrade, rollback and uninstall operations;
- fixtures, eval thresholds and an evidence receipt;
- supported deployment profiles;
- explicit human approval points.

## Deployment profiles

| Profile | 30-day status | Contract |
|---|---|---|
| Local / Sovereign | Build and verify | Filesystem + Git + local database, BYOK, complete export, no mandatory telemetry |
| Own Cloud / Edge | Specify only | Customer-controlled identity, state, artifacts, secrets and cost limits |
| Managed Web | Deferred | Opens only after recurring demand and support economics are proven |

## Initial upstream adapters

| Adapter | Upstream authority | Current truth |
|---|---|---|
| SIS Foundry | frankxai/Starlight-Intelligence-System | Operational local compiler/CLI/schema/plugin; remote Foundry MCP is not shipped |
| GenCreator | frankxai/gencreator.ai | v0.2 MCP gateway; read/draft/approval-required modes; external activation proof incomplete |
| Agentic Income | Capability repository | Economic-method and offer-workflow pack; no financial transfer authority |
| Agentic Passive Income | Capability repository | Remote MCP may be available; install only through explicit permission and provenance review |

## Release 0.1

Support only:

1. one local installation path;
2. one Six Primitives workflow;
3. one evaluated three-agent launch team;
4. four outputs: venture thesis, offer package, landing-page brief and 30-day launch system;
5. proof and complete export receipts.

Do not add a marketplace, cloud matrix, autonomous external actions, wallet or generic swarm builder before issue #4 release gates pass.

## References

- [Product authority](../../docs/architecture/product-authority.md)
- [Foundry strategy](../../docs/strategy/starlight-foundry-v1.md)
- [Epic #4](https://github.com/frankxai/agentic-business-os/issues/4)