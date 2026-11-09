# Polish checker — batch 4a, after round 3

Checked 9 November 2026: G12 Light Greenhouse, G2 Light Garden, G1 Greenhouse, G3 Lab Notebook and A1 Good Thread against the brief, approved copy, checker/polisher roles and checker-3a/3b. **No must-fix found in the measured checks. No product files changed.**

## Method and common results

Headless Edge (`channel: msedge`), the requested `playwright-core` installation, local standalone HTML and DPR 1. Reused batch 3a's audit, visible-overlap, contrast, keyboard and expanded-detail methods, with fresh evidence outside Git at `C:/Users/evans/geo/polish-run/film/_checker4/batch4a/`. Inspected the supplied round-2 phone and desktop strips beside round-3 strips, fresh phone real-wheel strips, focused phone captures and 1440px captures.

- **Overlap:** 25 evenly spaced scroll positions at 390×844 per concept, including both endpoints: **zero confirmed visible unrelated control/protected-content intersections in 125 samples**. Headers scroll away and Pause controls occupy page flow. As in checker-3a, raw bounding-box candidates include clipped G1 biography content and G3 reverse faces; the visibility-filtered sweep excludes these. Fixed decorative light/canvas layers do not intercept input. No new moving shape was observed across a readable name, price, email or button in the inspected round-3 states.
- **Opening:** both real portraits and names, subject allocation, separate GCSE/A-Level rates and Enquire fit within the first 1688px on every page. Measurements are in each concept's pass line below. Both tutors retain equal billing and all six homepage parts.
- **Type:** rendered narrative body, credentials, expanded experience and rate amounts meet 16px; readable labels meet 13px. The same classification as checker-3a/3b treats subjects, boards, DBS, attribution, timing and footer text as labels. The automated paragraph candidates below 16px are those labels, not narrative failures; no readable text below 13px was found.
- **Contrast:** 12 scroll positions × 3 moments, 300ms apart, per concept, including moving light/glow, lessons and contact. Hid glyph fill without changing layout/backgrounds and compared computed foreground/ancestor opacity against rendered background pixels throughout visible text-fragment rectangles, excluding clipped/hidden/reverse faces. **Zero sampled failures below 4.5:1**, including large headings. Minima remain comparable to round 2; this is sampled temporal evidence, not exhaustive certification of every possible frame.
- **320px:** 16 additional positions at 320×568 per concept: zero sideways overflow at every sampled position. No visible clipped copy found in captures or expanded biographies.
- **Motion:** reduced-motion canvas checks report no change and zero running document animations at opening, tutors, lessons and contact. Whole viewport captures at those four stages remain byte-identical after a further 1.1s observation. Normal Pause freezes the garden canvases, with synchronized in-flow controls where provided; A1's touch pluck is pixel-stable at 5.2s and through the following 1.1s, and has an in-flow Pause. No unattended motion without Pause found. The portrait/lesson/contact scroll journeys and touch controls remain present.
- **Keyboard:** 23/28/34/28/24 Tab stops respectively for G12/G2/G1/G3/A1; zero invisible targets or missing focus outlines. Tutor disclosures/flip controls work. Enquire links point to `#contact`; mail links and `noindex` remain present.
- **Copy/placeholders:** checked the approved claims, full Barney-only reviews, source figures/date/links, Barney-only lesson attribution and Eugene's exact five credentials/Ritz experience. Round 3 changes no HTML in these five folders compared with the checked round-2 baseline (`0653611`); no new factual claims or copy deviations found. Eugene's assumed format, unconfirmed prices/boards, bio, email/action, working name and form remain visibly marked `.ph`; the DOM placeholder check found no unwrapped placeholder strings. No wording/wrapper correction was required.

Fresh supplied `strip.cjs` phone runs at 390×844, real-wheel scrolling and 4× CPU throttle:

| Concept | Round 2 → current height | Screens | Median / p95 | >50ms | Overflow 390 / 320 | JS errors | Min sampled contrast |
|---|---:|---:|---:|---:|---:|---:|---:|
| G12 Light Greenhouse | 5827 → 5827px | 6.9 | 6.1 / 6.2ms | 0.1% | 0 / 0px | 0 | 6.813:1 |
| G2 Light Garden | 5715 → 5695px | 6.7 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 5.196:1 |
| G1 Greenhouse | 6838 → 6838px | 8.1 | 6.1 / 6.2ms | 0.1% | 0 / 0px | 0 | 4.568:1 |
| G3 Lab Notebook | 6042 → 6042px | 7.2 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 5.353:1 |
| A1 Good Thread | 6277 → 6277px | 7.4 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 4.812:1 |

All fresh p95 values meet the <20ms local target; frame spacing is host-specific, not physical-phone certification. Prior v3 heights remain 5271/7382/6980/6722px for G2/G1/G3/A1; G12 has no direct v3 original. Evidence includes `audit.json`, `visible-overlaps.json`, `contrast-audit.json`, `contrast-vector.json`, `keyboard.json`, `targeted.json`, `extra.json`, `<concept>-strip.png/.json`, focused captures and `comparison.png`. Screenshots/scripts remain outside the repo.

## G12 — Light Greenhouse

**Must-fix:** none found.

**Nice-to-fix:** none required by these checks.

**Round-3 comparison:** the round light lengthens into a softer margin shaft and rounds again at arrivals. The code fits the entire stretched ellipse against the existing 7px protected text gap; the inspected phone/desktop passages stay beside copy and prices. No contrast reduction below threshold or layout regression found versus the round-2 strips.

**Pass:** 0 confirmed intersections in 25 samples; rates finish at y558, both faces at y852 and names at y948, with subjects/Enquire earlier; body/labels ≥16/13px, contrast ≥6.813:1, zero 320px overflow, in-flow Pause, visible focus, still reduced motion and correct copy/placeholders.

## G2 — Light Garden

**Must-fix:** none found.

**Nice-to-fix — optional pacing. Where:** `.garden-play` before `#subjects`. **What:** the 20px phone saving improves the transition, though the page remains 424px taller than v3. **Smallest fix:** if further shortening is wanted, trim only the remaining optional chapter gap, preserving the colony bed and touch controls; this is not a content-access failure.

**Round-3 comparison:** the shorter lower planting gap brings detailed subjects 20px sooner on phones and 28px sooner on desktop. The planting controls retain their space; colonies remain visible. No new moving geometry or text/control overlap was introduced, and the moving-background contrast sample passes.

**Pass:** 0 intersections in 25 samples; rates y560, both faces y838 and names y934, subjects/Enquire earlier; body/labels ≥16/13px, contrast ≥5.196:1, zero 320px overflow, in-flow Pause, visible focus, still reduced motion and correct copy/placeholders.

## G1 — Greenhouse

**Must-fix:** none found.

**Nice-to-fix — optional contrast headroom. Where:** the “Evening light” label. **What:** its sampled minimum of 4.568:1 passes but has little margin, essentially unchanged from round 2's 4.57:1. **Smallest fix:** slightly darken only that label if extra headroom is desired; no mandatory correction is warranted by this measurement.

**Round-3 comparison:** the new split seed centre is capped independently of its broad pool. Inspected portrait, lesson and contact states retain the centre in the existing arrival spaces; email/name/button areas remain clear. Sampled moving-light contrast still passes, including the earlier sensitive contact area.

**Pass:** 0 confirmed intersections in 25 samples; rates y612 (rounded up), faces by y942 and both names by y1003, subjects/Enquire earlier; body/labels ≥16/13px, contrast ≥4.568:1, zero 320px overflow, in-flow dock/controls, visible focus, still reduced motion and exact copy/placeholders.

## G3 — Lab Notebook / A closer look

**Must-fix:** none found.

**Nice-to-fix:** none required by these checks.

**Round-3 comparison:** the enlarged closing six-cell specimen fills the existing contact lens more fully than the round-2 strips. Its cells and paired nucleus remain within that reserved ellipse, above the closing heading and email actions; Pause stays beside the lens in flow. No text overlap or sampled contrast regression found.

**Pass:** 0 confirmed intersections in 25 samples; rates y490, faces y682 and both names y743, subjects/Enquire earlier; body/labels ≥16/13px, contrast ≥5.353:1, zero 320px overflow, visible focus, keyboard-safe reverse faces, still reduced motion and correct copy/placeholders.

## A1 — Good Thread

**Must-fix:** none found.

**Nice-to-fix:** none required by these checks.

**Round-3 comparison:** the shorter opening return passes diagonally below Pluck on phones and through the spare column gap below the portrait captions on desktop. The two portrait loops remain; the thread does not cross the names, rate summary, Enquire or Pluck in the inspected states. Touch pluck settles, and contrast remains ≥4.812:1.

**Pass:** 0 intersections in 25 samples; rates y553, faces y773 and names y811, subjects/Enquire earlier; body/labels ≥16/13px, zero 320px overflow, static motion bar/Pause, visible focus, still reduced motion and complete approved copy/marked placeholders.

## Direct edits

None. No wording errors, missing `.ph` wrappers or one-line CSS must-fix required a product change.
