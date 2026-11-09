# Polish checker — batch 3b, after round 2

Checked 9 November 2026 against `company/brief.md`, `company/copy-v3.md`, checker/polisher roles and batches 1–2. Checked C1 Soft Assembly, B2 Wave Study, C2 Counterpart, A2 Little by Little and B1 Aperture. **One must-fix found and fixed: B1 timing-label contrast; no must-fix remains in the measured checks.**

## Method and common results

Headless Edge, requested `playwright-core` installation and `channel: msedge`, standalone local HTML, DPR 1. Used the batch-2 audit/contrast/keyboard tools, adapted for these five pages, with additional SVG/canvas idle checks, expanded experience text and touch controls. Screenshots, scripts and raw evidence are outside Git at `C:/Users/evans/geo/polish-run/film/_checker3/`.

- **Overlap:** 25 evenly spaced positions per page at **390×844**, both endpoints included. Zero confirmed unrelated interactive/protected box intersections across all 125 samples. Headers scroll away and Pause controls are in flow. No fixed/sticky content control covers a name, price, email or button. Offscreen skip links are keyboard entry aids, not persistent overlays; portrait links contain their own names intentionally. Decorative pointer-responsive art sits behind the portrait links rather than blocking them.
- **Opening:** both real faces and names, subject allocation, separate GCSE/A-Level rates and solid Enquire links all appear within the first **1688px**. Exact opening measurements appear below. Both tutors retain equal billing and all six homepage parts.
- **Type:** rendered body prose and price amounts are at least **16px**, readable labels at least **13px**, at 390px. Included expanded experience details. As in batch 2, subject/board labels, DBS badges, timing captions, attribution and navigation count as labels; a 13px `/hour` suffix does not make its larger price amount a body-size failure.
- **Contrast:** sampled **12 scroll positions × 3 moments**, 300ms apart, including light, glow, ribbons and contact. Hid glyph fill without altering layout/backgrounds and compared foreground/ancestor opacity against rendered PNG pixels in visible text-fragment rectangles. Applied the requested **4.5:1 to all readable text**, including large headings. Ratios below are sampled worst backgrounds, not exhaustive temporal or physical-device certification. `contrast-before.json` preserves the original run; `contrast-b1-after.json` is the repeat after the fix; merged final measurements are `contrast-audit.json` and `contrast-vector.json`.
- **320px:** another 16 scroll positions per page at **320×568**; zero sideways overflow at every position, and no visible clipped copy in captures.
- **Motion:** all five SVG/canvas scenes are unchanged across 1.1s idle observations after settling with reduced motion, at opening/tutors/lessons/contact; zero running document animations. Normal motion also settles after interaction by the 5.1s observation and stays still for the next 1.1s. C1/C2/A2/B2 have working in-flow Pause controls; B1 responds to input and has no continuous autoplay requiring Pause. Scroll journeys retain at least three distinct content-related states and touch/pointer response. Experience disclosures and contact remain usable.
- **Keyboard:** 31/22/31/24/22 Tab stops respectively for C1/B2/C2/A2/B1; no invisible focus targets or missing visible outlines. Enquire targets `#contact`, mail links and native disclosures work, images load, and all pages have `noindex`.
- **Copy:** checked approved claim strings and HTML against copy-v3; Eugene's five credential lines and Ritz Education experience are exact. Both full reviews, their source figures/date/links and headings concern Barney only. Barney's internship claim remains with the internship, and lesson copy/timings are attributed to Barney. Eugene's rates, boards, format, bio, email/action and form placeholders have visible `.ph` wrappers. No wording or wrapper fix was needed.

Fresh supplied `strip.cjs` real-wheel runs at 390×844 and 4× CPU throttle (before heights from the earlier checker reports):

| Concept | v3 → current height | Screens | Median / p95 | Frames >50ms | Overflow 390 / 320 | JS errors | Final min contrast |
|---|---:|---:|---:|---:|---:|---:|---:|
| C1 Soft Assembly | 7626 → 7161px | 8.5 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 5.53:1 |
| B2 Wave Study | 7236 → 6645px | 7.9 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 5.15:1 |
| C2 Counterpart | 7544 → 6645px | 7.9 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 5.72:1 |
| A2 Little by Little | 6611 → 6451px | 7.6 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 4.67:1 |
| B1 Aperture | 6860 → 6861px | 8.1 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 4.73:1 |

All p95 values meet the <20ms target in this local environment. Frame spacing is host-specific, not renderer execution time. Reviewed phone strips, opening/scroll captures and 1440×900 captures. Evidence also includes `audit.json` (boxes and scroll samples), `keyboard.json`, `targeted.json` (opening, details, touch/Pause and motion), and `<concept>-strip.png/.json`.

## C1 — Soft Assembly

**Must-fix:** none remaining.

**Nice-to-fix:** none required by these checks.

**Pass:** 0 intersections in 25 phone samples; header and both motion controls in flow. Enquire ends at y425, rate summary y600, both faces y835 and both names y893, within two screens. Body/labels 16/13px; contrast ≥5.53:1; 320px overflow 0; visible keyboard focus; settled reduced motion; correct copy, placeholders and Barney reviews. Mosaic develops from paired portraits through the profile bridge and lesson stairs to contact; rearrangement and Pause work.

## B2 — Wave Study

**Must-fix:** none remaining.

**Nice-to-fix:** none required by these checks.

**Pass:** 0 intersections in 25 phone samples; header scrolls away and Pause wave is in flow. Enquire ends at y322, rates y469, faces y659 and both names y743, within one screen. Body/prices ≥16px, labels ≥13px; contrast ≥5.15:1; 320px overflow 0; visible keyboard focus; settled reduced motion; exact claims and marked placeholders. Wave/packet/lesson/contact states remain recognisable and touch/Pause work.

## C2 — Counterpart

**Must-fix:** none remaining; the earlier `.taught` body-size failure is already corrected to 16px.

**Nice-to-fix:** none required by these checks.

**Pass:** 0 intersections in 25 phone samples; no sticky header and ribbon controls are in flow beneath lessons. Enquire ends at y376, rates y592, faces y831 and both names y886, within two screens. Body/prices ≥16px, labels ≥13px; contrast ≥5.72:1; 320px overflow 0; visible keyboard focus; settled reduced motion; approved claims, Barney reviews and visible placeholders. Separate/braided/parallel ribbons remain in reserved spaces; swap and Pause work.

## A2 — Little by Little

**Must-fix:** none remaining.

**Nice-to-fix:** none required by these checks.

**Pass:** 0 intersections in 25 phone samples; header, Pause ink and Send a little mark all scroll with the document. Enquire ends at y308, rates y517, faces y670 and the last name y732, within one screen. Body/prices ≥16px, labels ≥13px; contrast ≥4.67:1; 320px overflow 0; visible keyboard focus; settled reduced motion; exact credentials, Barney attribution/reviews and marked placeholders. The ink joins the paired portraits, lesson numbers and contact actions; mark and Pause work.

## B1 — Aperture

**Must-fix — fixed:** **Where:** `style.css`, `.lesson-heading>span`, “Approximate timings” above the lesson steps. **What:** muted `#5e6381` fell to **3.71:1** over the warm beam background `#e2c9b5` (contrast stage 8, scrollY 4376; label box approximately `(24,81.4,123.6,18)`). It also measured 4.28:1 at stage 7. **Smallest fix applied:** one CSS colour declaration, `.lesson-heading>span{color:#484b66}`. Repeated all 12 positions × 3 moments for B1: zero contrast failures; the page minimum is now **4.73:1** on the attributed quote's Barney Evans caption. No wording or geometry changed.

**Nice-to-fix:** none required by these checks; the earlier excess height is reduced from 7355px to 6861px, essentially the v3 height.

**Pass:** 0 intersections in 25 phone samples; header scrolls away. Enquire ends at y327, rates y465, faces y675 and both names y754, within one screen. Opening rate amounts now render at 16px, including the narrow override; body/labels meet 16/13px. Final contrast ≥4.73:1; 320px overflow 0; visible keyboard focus; settled reduced motion and event-driven beam; approved claims, Barney-only reviews and marked placeholders. One branching beam still connects subjects, tutor windows, lesson markers and contact.

## Direct edits

Only `B1-aperture/style.css` changed: darkened the timing label as documented above. No factual errors, wording changes or missing `.ph` wrappers required edits. No screenshots or audit scripts added to Git.
