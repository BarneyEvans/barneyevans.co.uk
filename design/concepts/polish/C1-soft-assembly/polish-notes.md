# C1 Soft Assembly: polish notes

## Changes
- Moved separate GCSE and A-Level summaries directly under Enquire; both equally sized named portraits follow immediately on phones.
- Removed exhibition interludes. The paired-colour bridge now introduces the profiles, four tile constructions accompany the actual lesson rows, and tile quotation marks belong to the full Barney reviews. The same mosaic vocabulary resolves into the contact doorway.
- Reduced chapter gaps, profile gaps and rounded lesson/contact surfaces. Increased body copy to 16px and supporting labels to at least 13px, preserving the Outfit/periwinkle/apricot identity.
- Added an in-flow Pause motion control alongside the touch/keyboard rearrangement control. Reduced motion settles every composition; there is no idle loop or overlaid UI.
- Kept all credentials, experience disclosures, approved teaching copy, full reviews and visible placeholders. Removed unused ribbon renderer from the locally bundled script.

## Round 1 film evidence (4x CPU)
Before strips reviewed at 390 and 1440. They arrived after an equivalent scratch baseline was captured from the unmodified v3 folder; both sets agree.

| Viewport | Before | Final polish | p95 | Overflow / JS errors |
| --- | --- | --- | --- | --- |
| 390 x 844 | 7626px / 9.0 screens | 6633px / 7.9 screens | 6.2ms | 0 / 0 |
| 1440 x 900 | 5628px / 6.3 screens | 4348px / 4.8 screens | 6.2ms | 0 / 0 |
| 320 x 568 | not supplied | 6897px / 12.1 screens | 6.2ms | 0 / 0 |

Round 1 `after-390.png`, `after-1440.png` and `after-320.png` were opened and visually reviewed (subsequently overwritten by the round 2 finals below). All runs used the required strip tool at 4x CPU; all had 6.1ms median, 6.2ms p95 and 0% frames over 50ms. The 390px page is 993px (13%) shorter; desktop is 1280px (23%) shorter. Film and JSON metrics remain outside the repository at `C:/Users/evans/geo/polish-run/film/C1/`.

## Interaction and content verification
Headless Chromium checked all three viewports and a 3x device scale factor. `verification.json` beside the strips records 29 passing assertions and no page errors:
- Every original paragraph, credential, experience item, lesson row and full review remains in the revised DOM.
- Both portraits and names end at 946px on 390x844, and 888px on 320x568: within the first two screens. Rates end at 600px and 575px respectively, immediately after Enquire.
- No visible text labels under 13px at any checked width; no horizontal overflow.
- Four constructions sit in the four actual lesson rows; both full reviews have their own mosaic quotation.
- Touch and keyboard rearrangement work and settle; Pause state works; reduced motion is settled; there is no idle animation loop and canvas DPR is capped at 2.
- Both experience disclosures open; Enquire reaches contact; reviews and both email actions remain present without JavaScript.

## Remaining material
No implementation blocker remains. Eugene's supplied prices, boards, format, biography and email remain visibly marked placeholders; no replacement facts were invented. Measurements are headless checks on this machine, not physical-phone certification.


## Round 2: restore the assembly signature

The director found round 1 too icon-like. Kept the opening rate hierarchy, equal portraits, compact chapter rhythm, open content and all approved wording, while making the structures large enough to carry the identity on a phone:

- **Bridge:** spans the full profile entrance (350 x 116px at 390px, 1180 x 160px on desktop). Pieces fly from both banks along short arcs, land in staggered rows and meet at the central keystone. It sits directly between the tutor heading and profiles, with no separate exhibition section.
- **Stairs:** each actual lesson row has a 104 x 102px canvas on a 390px phone, up from 66 x 60px. Ten pieces build the foundation first and then successively higher courses as that row enters view. Numbers and text stay still and clear.
- **Quotations:** larger rounded pieces assemble into 114 x 122px quotation compositions beside the full reviews. Text flows around their reserved area, regaining full width below; no quotation text is removed.
- **Doorway:** a 164 x 224px area beside the closing heading. The jambs and lintel fly into place, then two tiled leaves open in perspective to leave a substantial central opening. It remains the ending.
- Motion follows native scroll with staggered landing and a visible flight arc. Reduced motion and Pause show the complete, open, still composition. No ongoing idle loop was added.

### Final round 2 measurements

| Viewport | Before polish | Round 1 | Round 2 final | p95 / overflow / JS errors |
| --- | --- | --- | --- | --- |
| 390 x 844 | 7626px / 9.0 screens | 6633px / 7.9 screens | 6928px / 8.2 screens | 6.2ms / 0px / 0 |
| 1440 x 900 | 5628px / 6.3 screens | 4348px / 4.8 screens | 4800px / 5.3 screens | 6.2ms / 0px / 0 |
| 320 x 568 | not supplied | 6897px / 12.1 screens | 7156px / 12.6 screens | 6.2ms / 0px / 0 |

Overwrote `after-390.png`, `after-1440.png` and `after-320.png` using the required tool at 4x CPU and opened all three final strips. All runs recorded 6.1ms median, 6.2ms p95, and 0% frames over 50ms. The larger structures add 295px on the main phone layout versus round 1, while remaining 698px shorter than the original.

`round2-verification.json` beside the films records 15 passing checks: four distinct actual scroll states for each structure; no glyph-line intersection with animation areas at 320, 390 or 1440px; no overflow at those widths; settled reduced motion through pointer/scroll input; no idle drawing; Pause and keyboard rearrangement; no JavaScript errors. The QA script used immediate programmatic scrolling to sample exact scroll positions, while the required strips retained real wheel scrolling. Inspected `scratch/assembly-stages.png` to confirm flight, foundation-to-stair order, quotation assembly, and the closed-to-open doorway; `scratch/contact-settled.png` confirms the open ending beside readable contact content.

Only `interaction.js`, `style.css`, `pitch.md` and these notes changed in round 2. The HTML, early rates and portraits, approved copy and visible placeholders remain as verified in round 1. No implementation issue remains; the previously listed content placeholders still require the tutors' real details.

## Round 2: shortlist director review (9 November 2026)

This is the dispatched Round 2 against `polish/SHORTLIST.md`. The earlier section called Round 2 records the signature enlargement within the previous polish pass; its 6928px phone / 4800px desktop result is this pass's Round 1 baseline. Before editing, copied the existing `after-390.png` and `after-1440.png` to `r1-390.png` and `r1-1440.png` in the external C1 film folder and reviewed both.

- Moved the animated quotation pieces above both reviews at every width. Each keeps a substantial 114 x 122px canvas, with a 12px gap before the first line. The entire review now has the full column width: 350px on the 390px phone, 288px at 320px and 562px on desktop.
- Placed the phone doorway above the contact heading, retaining the 164 x 224px construction and its assembling, opening leaves. The unchanged closing wording now occupies two lines at both 390px and 320px, using 40px and 39px type respectively.
- Reduced desktop spacing between the last price row and the tutor introduction from 116px to 48px. The bridge retains its full 1180 x 160px desktop canvas and its original construction motion.
- Corrected inherited 15px quick-rate overrides to 16px, including at 320px. Early separate rates, equal portraits, in-flow Pause, approved wording, placeholders and all animation code are otherwise unchanged.

### Round 2 final films and checks

| Viewport | Round 1 baseline | Round 2 final | p95 | Overflow / JS errors |
| --- | --- | --- | --- | --- |
| 390 x 844 | 6928px / 8.2 screens | 7161px / 8.5 screens | 6.2ms | 0px / 0 |
| 1440 x 900 | 4800px / 5.3 screens | 4832px / 5.4 screens | 6.2ms | 0px / 0 |
| 320 x 568 | 7156px / 12.6 screens | 7444px / 13.1 screens | 6.2ms | 0px / 0 |

Overwrote and visually inspected all three `after` films using the required real-wheel strip tool at 4x CPU. Each recorded median 6.1ms and 0% frames over 50ms. Moving substantial artwork above text adds 233px at 390px and 32px overall on desktop; this is the deliberate cost of comfortable review and contact reading while preserving the signature constructions. The 390px page remains 465px shorter than v3.

Opened the worktree in Orca's browser and inspected its capture, plus phone/desktop strips and focused contact/review screenshots. `director-r2-verification.json` in the external film folder records passing layout and interaction checks at all three widths: quotation areas above text, full review widths, two-line phone contact headings, both named portraits and rates within two phone screens, full-size desktop bridge, 48px price-to-tutor gap, zero overflow/errors, Pause, keyboard rearrangement and settled reduced motion with Pause disabled. HTML and JavaScript are unchanged, preserving all approved copy and existing scroll choreography.

No implementation blocker remains. Eugene's final details and the real enquiry route remain the existing visibly marked content placeholders. All screenshots, metrics and the reproducible check script remain outside Git.
