# Polish checker — batch 1

Checked 9 November 2026 against `company/roles/checker.md`, `company/brief.md`, `company/copy-v3.md`, the polisher targets and the five v3 originals. **Two must-fix findings: A1's sticky Pause row and B1's 15px opening prices.** No wording errors or missing `.ph` wrappers required direct edits; only this report changed.

## Method and shared results

Used Node with the requested `playwright-core` installation and Chromium `channel: 'msedge'`. Checked 390×844, 320×568 and 1440×900; inspected the before strips, fresh 12-frame phone strips, desktop captures and expanded experience content. Screenshots, scripts and JSON evidence are outside Git at `C:/Users/evans/geo/polish-run/film/_checker/`.

- **Overlap:** 25 evenly spaced phone scroll positions per page checked fixed/sticky and native interactive element boxes against names, prices, email text and buttons, excluding containing elements. A second 31-position pass checked fixed/sticky boxes, with extra deliberately aligned A1 portrait-name positions. A1 fails; no intersections were found on the other four. This is sampled evidence, not proof over every possible scrolling/input state. Coordinates below are viewport CSS pixels, `(x, y, width, height)`.
- **Opening:** all five have both real faces and full names, subjects, separate GCSE/A-Level rate lines and a solid Enquire within the first two 844px screens. Eugene's rates are visibly marked placeholders, not confirmed prices. The table gives the bottom of the last name box; the faces and summaries are above it.
- **Wording/content/placeholders:** approved factual claims, Eugene's exact qualifications, correct Barney prices/boards, all six homepage parts, equal tutor introductions, both complete reviews explicitly about Barney, MyTutor source figures/date/links and the footer are present. Barney's first-person teaching claims and approximate coding timetable are attributed to him; timings are not proportional bars. Required placeholder rates, boards, Eugene format/bio/email and enquiry form have visible dotted `.ph` treatment. No invented claims or “Never say” wording found. Before/after source comparison confirmed the claims remain; markup/quote-attribution changes were inspected manually.
- **Type:** narrative body, credentials, experience and lesson/review copy are at least 16px at 390px. Readable supporting labels are at least 13px, including open disclosures. Prices are treated as offer content, not small labels: B1's summary figures are the exception listed below. Button/navigation/metadata labels of 13–15px meet the label threshold; A1/A2 email link labels are 14px.
- **Contrast:** computed text/solid-background checks, including expanded content, pass 4.5:1; minima are in the table. CSS `color(srgb ...)` backgrounds were converted to 0–255 before calculating ratios. Decorative shapes/quotation glyphs were excluded; readable section indices use the supporting text colour. Inspected rendered views for text over art/backgrounds.
- **Phone/basics:** every page has 0px document overflow at 320 and 390; sampled scroll positions stay within the viewport. No visible clipped copy found. Real anchors, contact targets and image loading pass. Touch opens native experience disclosures and operates the available play/Pause controls; Enquire reaches `#contact`. Keyboard traversal reaches links, buttons and disclosures with visible focus. All five have `noindex`.
- **Motion:** each has at least three content-related scroll moments and pointer/touch response, described below. With reduced motion, screenshots at top/middle/end remain byte-identical across a further one-second idle interval, with zero running Web Animations. Source inspection confirms settled geometry and disabled motion response under reduced motion (explicit colour/mosaic changes remain available). No ambient motion runs beyond five seconds; the pages schedule work from input and stop in hidden tabs. C1 caps canvas DPR at 2.

Fresh required-tool runs at 390×844, 4× CPU throttle (local browser measurements):

| Concept | Before → polish height | Screens | p95 frame interval | >50ms | Overflow / JS errors | Last opening name bottom | Min text contrast |
| --- | ---: | ---: | ---: | ---: | --- | ---: | ---: |
| A1 Good Thread | 6722 → 6277px | 7.4 | 6.2ms | 0% | 0px / 0 | 811px | 4.81:1 |
| A2 Little by Little | 6611 → 6451px | 7.6 | 6.2ms | 0% | 0px / 0 | 732px | 4.67:1 |
| B1 Aperture | 6860 → 7355px | 8.7 | 12.2ms | 0.3% | 0px / 0 | 750px | 4.73:1 |
| B2 Wave Study | 7236 → 6494px | 7.7 | 6.2ms | 0% | 0px / 0 | 743px | 5.15:1 |
| C1 Soft Assembly | 7626 → 6928px | 8.2 | 6.2ms | 0% | 0px / 0 | 893px | 5.53:1 |

All meet the p95 <20ms target in this environment; B1 has a few longer frames but scroll remains responsive. These are emulated checks, not physical-phone certification. Evidence: `<concept>-strip.png/.json`, `<concept>.json`, `targeted.json` and `A1-overlaps.json` under the external directory above. Full-page desktop captures were supplementary; offscreen motion was judged by actual scrolling, not by expecting offscreen renderers to animate during a full-page capture.

## A1 — Good Thread

**Must-fix — `style.css`, `.motion-bar`: sticky row covers the reading area.** Its opaque box stays `(0, 0, 390, 44)` after the page scrolls beneath it. Examples from the 31-position pass:

| ScrollY | Covered element | Element box |
| ---: | --- | --- |
| 543 | Opening Eugene `£XX/hour` | `(293, -16, 69, 25.6)` |
| 1268 | Computer Science A-Level `£45/hour` | `(284, -1.8, 78, 32.5)` |
| 1449 | Physics `£XX/hour` | `(293, 18.7, 69, 21)` |
| 1811 | Maths `£XX/hour` | `(293, 7.2, 69, 21)` |
| 3441 | Lesson attribution “— Barney Evans” | `(28, 26.6, 334, 20.1)` |

At deliberate `scrollY=770`, both portrait names are completely behind the row: Barney `(32, 19.6, 152, 21.3)` and Eugene `(206, 19.6, 152, 21.3)`. The Pause button itself is `(280.4, 0, 89.6, 44)`, intersecting Eugene's name; the full row hides Barney's too. The 25-position pass also caught the Pause button intersecting an Experience summary at `scrollY=2490`: summary `(28, -32.3, 334, 48)`. **Smallest fix:** make `.motion-bar` ordinary in-flow content (`position: static`) and retain its 44px Pause target. Adding top padding to the document alone will not stop arbitrary scrolled content entering the sticky row. There is no ambient loop requiring a persistent overlay.

**Nice-to-fix:** none beyond that functional fix.

**Pass:** wording/placeholders, equal portraits, early separate rates, type thresholds, contrast, 320px, keyboard/noindex, settled reduced motion and performance. The enlarged rate summary and removal of yellow portrait borders satisfy the director's first two changes. The same stitched thread meets portraits, four lesson markers, the first review edge and a simplified contact loop; Pluck responds to touch/keyboard. Page is 445px shorter than v3.

## A2 — Little by Little

**Must-fix:** none found.

**Nice-to-fix:** none required by the measured checks.

**Pass:** no interactive/fixed collisions in either sweep; first-screen names/faces, subjects, rates and Enquire; 16px body and ≥13px labels; 4.67:1 minimum text contrast; 0px overflow at 320/390; touch, native disclosures, visible keyboard focus/noindex; stable reduced motion and p95 6.2ms. Copy, placeholders, both full reviews and equal billing pass. The mobile summary precedes portraits, subject pricing uses full-width level rows, and the three remaining ink states connect paired portraits, actual lesson numbers and both contact actions. Send a little mark and Pause work; repeated unrelated curves are removed. Page is 160px shorter than v3.

## B1 — Aperture

**Must-fix — `style.css`, mobile `.quick-facts strong` / `.price-item`: opening rate amounts render at 15px at 390px.** This includes Barney's `£34/hour`, `£45/hour` and both Eugene `£XX/hour` entries, around document y409–462. The GCSE/A-Level `<small>` labels are 13px and pass; the monetary offer content misses the 16px body/price target. **Smallest fix:** set the mobile summary's `strong`/price amount font size to 16px, keeping the existing separate rows. Check the narrower override too: it currently drops amounts to 14px at ≤350px.

**Nice-to-fix — phone pacing, `.beam-meeting` and chapter gaps:** the final 390px page is 495px longer than v3 (8.7 rather than 8.1 screens), despite the shared shortening target. The additional paired portrait/name introduction repeats people already introduced above. **Smallest fix:** trim its nonessential vertical margins and nearby chapter spacing, preserving the paired beam encounter, visible credentials and approved copy. This is a pacing improvement, not a content-access blocker.

**Pass:** no overlap in either sweep, all opening facts/faces/names within one screen, narrative body ≥16px and labels ≥13px, 4.73:1 minimum contrast, 320px overflow 0, keyboard/touch/noindex, complete content and marked placeholders. The warm attributed student-paced quote, stacked phone subject headings/rates and single branching beam implement the three director changes. The beam changes at subjects, paired tutor windows, lesson markers and contact; touch bends the opening optics. Reduced motion settles; no autoplay needs a Pause button. p95 12.2ms passes.

## B2 — Wave Study

**Must-fix:** none found.

**Nice-to-fix:** none required by the measured checks.

**Pass:** no collisions in either sweep; both named faces and all opening offer facts within one screen; 16px body/rate figures and ≥13px labels; minimum contrast 5.15:1; 320/390 overflow 0; touch/Pause/disclosure and keyboard focus/noindex; stable reduced motion and p95 6.2ms. Copy, placeholders, full Barney reviews and equal billing pass. Early rates, compact biographies with native experience disclosure, darker section labels and a recognisable broad wave → travelling packet → lesson samples → settled contact lines meet the director's three changes. Page is 742px shorter than v3.

## C1 — Soft Assembly

**Must-fix:** none found.

**Nice-to-fix:** none required by the measured checks.

**Pass:** no collisions in either sweep; both faces, full names (ending y893), subjects, separate rates and Enquire fit within two phone screens. Body/rates ≥16px, labels ≥13px; minimum contrast 5.53:1; no 320/390 overflow; touch rearrangement/Pause/disclosures, visible keyboard focus/noindex; stable reduced motion and p95 6.2ms. All required copy, visible placeholders, full Barney reviews and equal billing pass. The summary is directly below Enquire, exhibition bands have become the profile bridge, four stair constructions beside actual steps and quotation pieces beside full reviews; the larger doorway resolves at contact without covering content. Containers/chapter spacing are tighter and the page is 698px shorter than v3. The same mosaic pieces visibly develop through more than three scroll states.
