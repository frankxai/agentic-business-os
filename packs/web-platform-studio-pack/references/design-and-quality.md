# Human design excellence and quality evidence

"L99" describes an internal ambition for exceptional work. It is not a percentile, certification or performance claim. Translate the ambition into observable decisions and reviewed results.

## Craft standard

| Dimension | What to build | How to inspect it |
|---|---|---|
| Buyer clarity | Specific audience, credible promise and obvious useful action | A new visitor explains the offer and completes the main task |
| Distinct identity | Purposeful typography, proportions, color, imagery and voice | Explain the design decisions and inspect real pages with full content |
| Content quality | Accurate, original copy and evidence; credible hierarchy | Claim/source review and a reader comprehension test |
| Complete states | Loading, empty, error, success, validation and recovery | Exercise each state in the actual UI |
| Interaction | Predictable focus, touch targets, immediate feedback and purposeful motion | Keyboard/touch paths, rapid repeated input, interruption and reduced motion |
| Accessibility | Semantic structure, labels, contrast, reflow and usable alternatives | Automated checks plus keyboard, screen-reader sampling and zoom |
| Performance | Sensible payloads, stable layout and responsive interaction | Repeatable lab evidence plus field measurement when available |
| Reliability | Correct permissions, durable changes and recoverable failures | Failure injection, negative tests and restore/rollback drill |
| Ownership | Editable source, documented rights and clear maintenance | A second operator modifies and takes over the project |

Use the existing design contract and Emil design-engineering guidance where installed. Start with static hierarchy and representative content. Motion should explain a state change, establish spatial continuity or guide attention. Routine actions should remain quick; keyboard operation must not wait for a decorative transition. Do not use hover as the only way to reveal necessary controls on touch devices.

For performance, the current Web Vitals guidance defines good LCP at 2.5 seconds or less, INP at 200 milliseconds or less, and CLS at 0.1 or less, assessed at the 75th percentile of page visits. Report lab and field evidence separately. A Lighthouse run cannot establish field INP or a traffic-backed percentile. [Web Vitals](https://web.dev/articles/vitals)

## Review procedure

1. Choose an actual reference product and identify the specific job/quality this project must improve. This is a project decision; no competitor is automatically inferior.
2. Inspect the core journey on narrow and wide screens with real content.
3. Record findings by user consequence, then refine the implementation. Every new state must remain consistent with the chosen visual language.
4. Run accessibility, performance and failure checks against the exact revision.
5. Obtain independent critique from a reviewer other than the maker; attach the findings and fixes. For Starlight's public/priced artifacts, use the required independent-provider gate.
6. Run a clean buyer install/customize/deploy exercise. Record where the person needed assistance.

Do not average away a broken payment flow, unreadable text, inaccessible control or data-isolation failure with a high visual score. Severe unresolved failures block the relevant release. Keep aesthetic judgment and deterministic checks both visible.

## Evidence report format

Write: revision and environment; reviewer identity/role; actual scenario and method; observed result; screenshots or artifacts with hashes; defects; repairs; residual limitations; conclusion. Distinguish observed results from the reviewer's judgment and untested assumptions. Attach a separate approved release decision under the host contract.

The CLI can detect missing receipts, changed evidence bytes, stale dates, a revision mismatch and a declared maker reviewing their own work. It cannot see the website, authenticate a human or grade design. Actual inspection remains necessary.
