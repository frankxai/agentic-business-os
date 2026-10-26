# Studio edition: creative direction and review plan

Audience: founders, creators and small teams deciding how to build a useful digital product. Primary task: prepare and download a clear project brief. Secondary task: explore the related public brands and understand the production approach.

## Visual idea

An open studio desk: generous daylight, confident typography and a visible working plan. The page moves from a clear promise to the actual project selector, related work, production layers and the brief. The useful artifact supplies the hero's visual subject.

Palette: canvas `#f5f7f2`, ink `#153b32`, forest `#1d5949`, citron `#dfefad`, stone `#d7dfd5`, muted ink `#49645a`. Small portfolio specimen fields add blue `#dce8f6` and plum `#ece1f2`. White remains available for focused form controls. Avoid gradient filler and decorative orbs.

Type: Georgia for substantial editorial display; system sans for paragraphs, navigation, controls and metadata. No font requests leave the page. Use explicit breakpoint sizes, short line lengths and sentence case. Preserve name lengths and wrap without clipping.

Layout: full-width typographic hero, a useful route selector with the current delivery path, an asymmetric related-work grid, quiet explanatory rows and a two-column brief form/output on wide screens. Mobile uses a single readable flow with visible native controls.

```
Brand                       Work   Approach   Your project
Websites with a point of view.
Supporting promise          Start your brief
[Project type controls] [Current delivery path]
Related work: large specimen / two compact specimens
Six connected delivery layers
Project form                Prepared brief and download
Questions                   Footer
```

Refinement against defaults: removed automatic section reveals, ornamental numbered cards, generic statistics and implied client outcomes. Portfolio specimens are explicitly typographic representations with links to the real brands, not fabricated screenshots. Project typing stays functional and instantly responsive.

## Interaction contract

The route controls are native buttons with pressed state and URL edition state. Form fields have visible labels and native validity constraints; errors have text and focus. Submission prepares a draft and focuses its heading. Subsequent edits invalidate the prepared download. No details are persisted or sent. Download uses a user-triggered Blob; failed clipboard/network conveniences do not prevent the primary task. Native details provide expandable questions.

Focus is visible. Touch controls are at least 44px tall. Hover styles apply only for hover-capable pointers. Keyboard-triggered controls have no movement. Reduced-motion removes transitions; the normal version uses only brief button/pointer feedback. No autoplay, trapping, parallax or hidden-until-animation content.

## Verification status

Source-level functional, security and structure tests are required. Actual browser screenshots, keyboard/touch exercises and independent critique remain separate checks. Machine admission must permit browser QA before claiming those checks. The design document is intent, not a visual pass.
