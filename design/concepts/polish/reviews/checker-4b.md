# Polish checker — batch 4b, after round 3

Checked 9 November 2026: C1 Soft Assembly, B2 Wave Study, C2 Counterpart and B1 Aperture against the brief, copy-v3, checker/polisher roles and checker-3a/3b. **No must-fix regression found. No product edits were needed.**

## Method and common results

Headless Edge (`channel: msedge`), requested `playwright-core`, local standalone HTML, DPR 1. Reused batch-3b's audit, contrast, keyboard, interaction and strip scripts with the current worktree and four-page scope. Evidence is outside Git at `C:/Users/evans/geo/polish-run/film/_checker4/batch4b/`.

- **Overlap:** 25 evenly spaced positions at **390×844**, including both endpoints, per concept: **zero unrelated control/protected-box intersections in 100 samples**. Checked names, prices, email links and buttons against interactive boxes and headers; the only fixed element is the offscreen skip link, which becomes visible on keyboard entry. Headers scroll away; Pause controls are in page flow. Decorative art does not intercept input.
- **Opening:** both real faces and names, allocated subjects, separate GCSE/A-Level rates and solid Enquire actions appear within **1688px**. Exact bottom coordinates below. All six homepage parts and equal billing remain.
- **Type:** body prose, price amounts, credentials and expanded experience are **at least 16px**; labels are **at least 13px** at 390px. Used the same classification as checker-3b: board/DBS/subject/tutor labels, attribution, timing captions, navigation and `/hour` suffixes are labels. No label under 13px; no expanded narrative under 16px.
- **Contrast:** **12 scroll positions × 3 moments**, 300ms apart, at 390×844. Hid glyph fill without changing layout/backgrounds and compared computed text colour/opacity against rendered PNG pixels within visible text fragments. All readable samples exceed **4.5:1**, including large text near light, glow and ribbons. Added focused captures/contrast at 320, 390 and 1440px at three arrival offsets for each changed chapter (C1 reviews/contact; B2 opening; C2/B1 contact); no failures. These are sampled backgrounds/moments, not exhaustive temporal certification.
- **Narrow phone:** 16 further positions at **320×568** per page: **0px sideways overflow throughout**; captures show no clipped visible copy.
- **Motion:** reduced-motion SVG/canvas scenes remain identical across a further 1.1s observation after settling at opening, tutors, lessons and contact; no running document animations. Normal scenes also remain still between the 5.1s and 6.2s observations after interaction. C1/B2/C2 provide in-flow Pause; touch rearrangement/swap/Pause state changes work. B1 is input/scroll driven and settles, with no unattended animation requiring Pause. Three or more distinct scroll states and pointer/touch response remain.
- **Keyboard/basics:** 31/22/31/22 Tab stops respectively, with visible outlines and no hidden focus targets. Native experience disclosures work; Enquire targets `#contact`, mail routes and `noindex` remain.
- **Wording/placeholders:** approved claims and complete reviews match copy-v3; Eugene's five credential lines and Ritz Education attribution are exact. Reviews and MyTutor figures/date/source links remain Barney-only; lesson wording and approximate timings retain Barney attribution. Internship work stays attached to the internship. Working brand and unconfirmed Eugene rates, boards, format, bio, email/action and form remain visibly marked `.ph`. No wording or wrapper correction was needed; omitted optional lesson lines are permitted by copy-v3.

Fresh supplied `strip.cjs` real-wheel runs at 390×844 and 4× CPU:

| Concept | v3 → R2 → R3 height | Screens | Median / p95 | >50ms | Overflow 390 / 320 | JS errors | Min sampled contrast |
|---|---:|---:|---:|---:|---:|---:|---:|
| C1 Soft Assembly | 7626 → 7161 → 7065px | 8.4 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 5.53:1 |
| B2 Wave Study | 7236 → 6645 → 6645px | 7.9 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 5.15:1 |
| C2 Counterpart | 7544 → 6645 → 6645px | 7.9 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 5.72:1 |
| B1 Aperture | 6860 → 6861 → 6861px | 8.1 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 | 4.73:1 |

All fresh p95 values meet <20ms locally; intervals are host-specific, not renderer execution times or physical-phone certification. v3/R2 heights use checker-3b's measurements; R3 heights are freshly measured. Compared the preserved `film/<ID>/r2-390.png` and `r2-1440.png` with current supplied after-strips, plus fresh phone strips and focused phone/desktop captures. Raw evidence: `audit.json`, `keyboard.json`, `targeted.json`, `contrast-audit.json`, `contrast-vector.json`, `focused-contrast.json`, `focused-contrast-results.json`, comparison sheets and each concept's fresh `*-strip.png/.json`.

## C1 — Soft Assembly

**Must-fix:** none found.

**Nice-to-fix:** none required by the measured checks.

**Round-3 comparison:** phone quotation artwork shrinks from 122px to 100px high and doorway from 224px to 184px, with 8px gaps. Both remain above their text; no moving pieces cross review lines, names, emails or actions in the sampled arrivals. Full-width reviews and the two-line contact heading remain readable. Phone height falls 96px; desktop remains 4832px. Focused changed-chapter contrast is at least 5.69:1.

**Pass:** 0 intersections/25 samples; Enquire ends y425, rates y600, faces y835, names y893. Body/labels 16/13px; whole-page contrast ≥5.53:1; 320px overflow 0; visible focus; settled reduced motion; exact copy/marked placeholders. Mosaic still joins portraits, bridge, lesson stairs, quotations and opening doorway.

## B2 — Wave Study

**Must-fix:** none found.

**Nice-to-fix:** none required by the measured checks.

**Round-3 comparison:** the desktop U-turn beneath the facts is replaced by a forward exit past the portraits. The exit stays above portrait labels and away from names/rates/actions in focused arrival captures; the phone composition and heights are unchanged. Desktop remains 4783px. Focused opening contrast is at least 5.75:1; later gathering and contact waves retain clear reading space.

**Pass:** 0 intersections/25 samples; Enquire ends y322, rates y469, faces y659, names y743. Body/labels 16/13px; whole-page contrast ≥5.15:1; 320px overflow 0; visible focus; settled reduced motion; approved claims and placeholders. Wave, gutter packet, lesson gathering/samples and contact preserve the journey.

## C2 — Counterpart

**Must-fix:** none found.

**Nice-to-fix:** none required by the measured checks.

**Round-3 comparison:** the two slimmer closing ribbons share an S-bend, then separate beside the two actions. Phone ink remains in the left gutter; the desktop shared bend occupies the blank band above the routes before entering each gutter. No sampled ribbon crosses a name, price, email or button; focused contrast is at least 5.72:1. Heights remain 6645px phone / 4715px desktop.

**Pass:** 0 intersections/25 samples; Enquire ends y376, rates y592, faces y831, names y886. Body/labels 16/13px; whole-page contrast ≥5.72:1; 320px overflow 0; visible focus; settled reduced motion; exact credentials, Barney reviews and visible placeholders. Separate, braided and shared closing ribbons remain distinct and swap/Pause work.

## B1 — Aperture

**Must-fix:** none found; checker-3b's timing-label colour fix remains effective.

**Nice-to-fix:** none required by the measured checks.

**Round-3 comparison:** seven rays, a visible aperture and apricot focus strengthen the contact convergence in the existing spare band. At phone and desktop arrivals the fan stays above the contact eyebrow/heading and clear of names/actions; glow does not reduce sampled text below 4.5:1. Focused contact contrast is at least 4.80:1. Heights remain 6861px phone / 4789px desktop.

**Pass:** 0 intersections/25 samples; Enquire ends y327, rates y465, faces y675, names y754. Body/labels 16/13px; whole-page contrast ≥4.73:1; 320px overflow 0; visible focus; settled reduced motion and finite input-driven beam; approved claims, Barney-only reviews and marked placeholders. Opening optics, subject fans, tutor windows, lesson markers and contact remain connected.

## Direct edits and remaining dependencies

No product files changed: no factual, wording, `.ph` or one-line CSS fix was necessary. Only this report is committed. Existing marked owner-supplied content and the real enquiry route still need final details before launch; these are unchanged content dependencies, not round-3 regressions.
