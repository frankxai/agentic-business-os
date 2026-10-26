# Domains, deployment and operations

Use the organization's existing domain registry as the source of ownership truth. The project packet contains references and evidence. In the Starlight estate, reconcile against `frankx-domain-command/registry/domains.json` and the owning application's deployment project before changing anything.

## Domain record and responsibilities

Record hostname, business/brand owner, registrar, DNS provider, deployment project, canonical/redirect role, renewal owner/date, auto-renew decision, billing owner, transfer/recovery procedure, DNSSEC status and mail dependencies. Keep credentials, recovery codes and full private account data in the approved secret/account system.

Customer domains and production accounts should have a documented customer owner. Agency access should be scoped, revocable and transferred cleanly at exit. Define who pays infrastructure, renewals and third-party subscriptions; who handles an incident; and what remains accessible after the engagement ends.

## DNS change workflow

1. Inspect authoritative DNS, current deployment attachment and all mail-related records. Export the current zone or retain an equivalent exact record snapshot.
2. Draft the intended record changes, TTL implications, certificate behavior, verification plan and rollback. Check existing MX, SPF, DKIM, DMARC, verification TXT, CAA and any provider-specific requirements. Obtain exact values from the current provider; never manufacture them.
3. Reconcile domain ownership and approved change authority. Show the concrete change packet with its effects before execution when approval is required.
4. Execute through the appropriate provider using scoped permissions. Log a change receipt without secrets.
5. Verify authoritative responses, an independent resolver, TLS, redirects, canonical host and application health. Test mail delivery if affected. Propagation is time-dependent; record observations and pending checks accurately.
6. Retain before/after records and a tested recovery procedure. Avoid changing registrar, nameservers, DNSSEC and application host together unless the approved migration requires it.

DNSSEC changes must coordinate DNS signatures with registrar DS records. Email policy tightening should follow observed delivery and sender alignment. A copied restrictive policy can interrupt legitimate mail. Plan the change from actual provider documentation and current sending systems.

## Environments and releases

Separate preview, staging and production accounts/data where appropriate. Protect private previews with access control; a robots directive is not authentication. Prevent accidental indexing of previews while ensuring intended public production pages remain discoverable. Verify TLS, apex/www behavior, redirect chains, cache/CDN settings, headers, image/storage origins, forms, APIs and webhook destinations.

Use one known deployment path for each source branch. Record the immutable source revision and deployment ID, migration sequence, health checks and rollback target. A homepage HTTP 200 is insufficient: test the actual primary journey and critical integrations.

## Operations package

| Area | Required deliverable | Proof |
|---|---|---|
| Monitoring | Availability plus user-journey signals; named alert owner | Trigger a controlled actionable failure |
| Data protection | Backup schedule, encryption/access, retention and restore steps | Restore representative data into an isolated environment |
| Dependency care | Update policy, support window and security triage | Rehearse a version upgrade and rollback |
| Domains/certificates | Renewal/expiration ownership and provider status | Current registry/account evidence |
| Incidents | Severity, communication, recovery and post-incident notes | Tabletop or controlled exercise |
| Exit | Data export, asset/code transfer, access revocation | Second operator can take over |

The 0.1.0 CLI inspects local receipts only. It has no DNS client, registrar adapter, health monitor or scheduler. These are candidates for later adapters after read-only reconciliation and change proposal handling have been proven. Introduce live mutations only with explicit resource scopes, authorization and rollback evidence.
