# Polish checker — batch 3a, after round 2

Checked 9 November 2026: G12, G2, G1, G3 and A1 against the brief, approved copy, checker/polisher roles and earlier checker measurements. **No remaining must-fix found. No product files changed:** no wording, placeholder or one-line CSS correction was needed.

## Method and common results

Headless Edge, `channel: msedge`, using the requested `playwright-core`, local standalone HTML, DPR 1. Swept **25 evenly spaced positions at 390×844 per page**, including both endpoints, plus **16 positions at 320×568**. Inspected fresh 4× CPU real-wheel filmstrips, opening/section captures, desktop 1440×900 captures and expanded tutor details. Screenshots, scripts and raw evidence are outside Git at `C:/Users/evans/geo/polish-run/film/_checker3/batch3a/`.

- **Overlap:** zero visible unrelated interactive/protected box intersections across all 125 phone samples. Headers and Pause controls scroll away; no fixed/sticky readable control covers a name, price, email or button. Raw `audit.json` candidates include clipped G1 biography text and G3 reverse-face controls; these are invisible, not defects. `visible-overlaps.json` excludes clipped ancestors, inert content and reverse faces and records zero hits for every concept. Decorative fixed canvases/light layers do not intercept input.
- **Type/content:** rendered narrative body, credentials, expanded experience and rate amounts meet 16px; readable labels meet 13px. Exam boards, subjects, DBS, source/attribution, approximate-timing and footer text are labels, consistently with batch 2. Both people receive equal named real portraits; all six homepage parts are present. Approved tutor claims, Eugene's exact qualifications/Ritz attribution, Barney's rates/boards, both full Barney-only reviews, MyTutor figures/date/links and Barney-only lesson attribution pass. Unconfirmed rates, boards, Eugene's format/bio/email, working brand and form are visibly marked `.ph`. Enquire links to `#contact`; email links and `noindex` pass.
- **Contrast:** same method as batch 2: **12 scroll positions × 3 moments**, 300ms apart, including travelling light, glow and contact stages. Hid glyph fill without changing layout/backgrounds, then compared computed foreground/opacity with rendered PNG pixels across text-fragment rectangles. Excluded hidden/clipped/reverse text. All sampled readable text clears the requested **4.5:1**, including large headings. This is sampled temporal evidence, not exhaustive certification.
- **Motion/focus:** at opening, tutors, lessons and contact, reduced-motion screenshots remain byte-identical after a further 1.1s idle observation; canvases are unchanged and document animations report zero running. Normal Pause stops the garden canvases; the garden concepts provide in-flow controls beside later motion chapters. A1's input-driven pluck settles and has an in-flow Pause. No unattended motion lacks Pause. Keyboard sweeps reach 23/28/34/28/24 stops respectively, with visible focus and no hidden focus target. Expanded tutor controls and native details operate.
- **Phone/performance:** no sideways overflow at any sampled 320/390 position, no clipped visible copy found, and no JavaScript errors. All fresh 4× CPU strips meet p95 <20ms. Frame intervals below are host-specific, not renderer execution times or physical-phone certification.

| Concept | v3 → current height at 390 | Screens | 4× CPU median / p95 | >50ms | Overflow 390 / 320 | Min sampled contrast |
|---|---:|---:|---:|---:|---:|---:|
| G12 Light Greenhouse | n/a → 5827px | 6.9 | 6.1 / 6.2ms | 0.1% | 0 / 0px | 6.81:1 |
| G2 Light Garden | 5271 → 5715px | 6.8 | 6.1 / 6.2ms | 0% | 0 / 0px | 5.20:1 |
| G1 Greenhouse | 7382 → 6838px | 8.1 | 6.1 / 6.2ms | 0.1% | 0 / 0px | 4.57:1 |
| G3 Lab Notebook | 6980 → 6042px | 7.2 | 6.1 / 6.2ms | 0% | 0 / 0px | 5.35:1 |
| A1 Good Thread | 6722 → 6277px | 7.4 | 6.1 / 6.2ms | 0% | 0 / 0px | 4.81:1 |

Original heights were freshly measured from v3. G12 is a synthesis of polished G2/G1, with no corresponding v3 original; its notes record round-one height 5624px, so round two adds 203px for reserved arrival/Pause space. Compared with checker-2 heights, G1 is another 468px shorter, G2 34px shorter and G3 5px shorter; A1 retains checker-1's 6277px height.

Evidence: `audit.json`, `visible-overlaps.json`, `contrast-audit.json`, `contrast-final.json`, `keyboard.json`, `targeted.json`, `original-heights.json`, `<concept>-strip.png/json`, viewport and expanded captures. No screenshots are committed.

## G12 — Light Greenhouse

**Must-fix:** none found.

**Nice-to-fix:** none required by the measured checks.

**Pass:** rates finish at y558, both portrait images at y852 and names at y948, within two phone screens (1688px); Enquire/subjects precede them. The header scrolls away and three synchronized Pause controls occupy their own flow space. Full-width expanded biographies remain readable. The light meets paired cells, grows the lesson stem and arrives in the golden contact arch; touch pairing remains available. Body/labels, contrast, overflow, focus, copy/placeholders and reduced motion pass.

## G2 — Light Garden

**Must-fix:** none found; the sticky-header/Pause collisions from checker-2 are resolved.

**Nice-to-fix — optional garden before `#subjects`. Where:** `.garden-play` and the transition into detailed subjects. **What:** the phone page remains 444px longer than v3, despite the shortening target; the early three-subject rate summary is useful, while the optional garden adds distance before detailed boards. **Smallest fix:** trim optional garden bottom padding/chapter gap, preserving visible colonies, controls, portraits and every claim. This is pacing, not a content-access blocker.

**Pass:** rates finish at y560, faces at y838 and names at y934; all opening requirements fit two screens. Header and three Pause controls are in flow; no protected-content collisions. The same light joins paired cells, four lesson markers and the contact bloom. Body/labels, 5.20:1 sampled contrast, 320px, focus, wording/placeholders, expanded details and settled reduced motion pass.

## G1 — Greenhouse

**Must-fix:** none found; the fixed dock and contact-heading contrast issues from checker-2 are resolved.

**Nice-to-fix:** none required by the measured checks; the smaller secondary portraits help deliver a further 468px reduction since checker-2.

**Pass:** rates finish at y612, faces by y942 and both names by y1003; Enquire and subjects are above the portraits. The dock, planting tools and later Pause controls remain in flow. The travelling light meets the shared portrait arch, lesson stem and warm contact; planting responds. The former contact heading passes, and the lowest sampled text is now “Evening light” at 4.57:1. Body/labels, 320px, focus, exact copy/placeholders, disclosures and reduced motion pass.

## G3 — Lab Notebook / A closer look

**Must-fix:** none found; the masthead/Pause collisions from checker-2 are resolved.

**Nice-to-fix:** none required by the measured checks.

**Pass:** rates finish at y490, both faces at y682 and names at y743, inside the first screen. The masthead scrolls away; experiment/tutor/lesson/contact Pause controls occupy reserved flow space. The simulation develops from whole cluster to tutor and lesson magnification and back to contact, with a touch-responsive inspection window. Expanded reverse faces remain readable and keyboard access excludes hidden faces. Body/labels, 5.35:1 contrast, 320px, wording/placeholders, focus and reduced motion pass.

## A1 — Good Thread

**Must-fix:** none found; the sticky motion-bar collision from checker-1 is resolved.

**Nice-to-fix:** none required by the measured checks.

**Pass:** rates finish at y553, both faces at y773 and names at y811, inside the first screen. `.motion-bar` is static and Pause scrolls with it; no control covers later names/prices/actions. The continuous thread meets portraits, lesson markers, reviews and the contact loop; Pluck responds and settles. Body/labels, 4.81:1 contrast, 320px, visible keyboard focus, full copy/marked placeholders, native experience disclosures and pixel-stable reduced motion pass.
