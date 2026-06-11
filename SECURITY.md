# Security Policy

## Reporting

Email **frank@frankx.ai** with subject `SECURITY: agentic-business-os`. Please include reproduction steps and impact. You'll get an acknowledgment within 72 hours and a fix-or-assessment within 14 days for confirmed issues.

Please do **not** open public issues for vulnerabilities.

## Scope

- The template's API routes (`template/app/api/*`) — input validation, injection, data exposure
- `scripts/harness-sync.mjs` — anything that could make a sync PR carry unintended content into downstream repos
- The packs — prompt-injection vectors in SKILL.md files that could subvert an instance's gates

## Out of scope

- Vulnerabilities in instantiated repos' *own* modifications
- Dependencies' upstream issues (report to the dependency; we'll bump on release)
- The claims-gate being "bypassable by editing the voice file" — instances own their files by design

## Supported versions

The latest tagged release. Downstream instances on older harness versions receive fixes through the normal sync PR channel.
