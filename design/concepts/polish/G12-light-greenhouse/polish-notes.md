# G12 Light Greenhouse — polish notes

## Baseline and direction

Read the polisher role, brief, approved copy, G1/G2 shortlist and reviews. Started with an exact copy of polished G2, committed as 189050a. Opened both polished parent phone strips and copied them to film/G12/before-G2-390.png and before-G1-390.png.

Polished G2 baseline: 5749px / 6.8 phone screens, p95 6.2ms; desktop 3957px / 4.4 screens, p95 6.2ms. Polished G1 baseline: 7306px / 8.7 phone screens, p95 12.1ms; desktop 5018px / 5.6 screens, p95 12.2ms. Both parents reported zero overflow and JavaScript errors.

## Synthesis milestone

- Kept G2's compact structure, three early subject summaries, open rows, equal profiles and cream-to-lilac ground.
- Added a shared glasshouse arch around the equal portraits, G1's humane lesson heading and attributed student-paced quotation, and a golden contact arch in the lilac ending.
- Kept one cellular lattice and travelling light. Removed planting/species and subject-selection controls; paired touch response and reserved Pause remain.
- Added progressive stem growth beside the stationary four steps. Timings are explicitly approximate and not proportional.
- Put the light core and optical lens on the garden canvas so measured text masks protect copy from all animated paint. Profiles and prices never move.
- Enlarged subject format, tutor subject, DBS and email copy to 16px. Added G1's supplied Barney experience to an optional native disclosure; kept all full reviews and original claims.

## In progress

First phone film and interaction QA underway. Final required 390, 1440 and 320 strips, reduced motion, keyboard/no-JavaScript checks and Orca preview follow. Missing supplied content remains visibly marked; no implementation blocker at this milestone.

## Visual refinement and interaction QA

The first phone scratch strip measured 5479px / 6.5 screens, p95 6.2ms, zero overflow/errors. It exposed malformed subject-heading closure after removing selection buttons and sharp edges from cutting the optical glow around text. Fixed the headings, then replaced rectangular glow clearing with a measured safe radius: the lens, halo and light core fit inside available whitespace, while cells retain their text mask. The second phone strip is 5624px / 6.7 screens with p95 6.2ms and no overflow/errors; it retains proper open subject rows and a smooth glow.

Opened the Orca desktop preview, both scratch phone strips and the QA phone contact/desktop opening images. The one shared portrait arch, golden contact arch, open rates and stationary text read clearly. QA passed at 390/1440 plus 320 x 568, reduced-motion and JavaScript-disabled checks; both names are within two 320px phone screens. Verified keyboard cell response, pause freezing generation and travel, profile disclosures with faces/DBS staying visible, no extra garden controls, overflow, noindex and real Barney email links. Text contrast against the conservative darkest parent tint measured 4.75:1 to 4.89:1. Phone draw p95 was 2.5ms at 4x CPU; simulation p95 was 2.3ms (function timings, distinct from film frame intervals).

A final small change also freezes the growing stem when Pause is active. Final films and final QA follow.

## Final film evidence

Generated and opened the required real-wheel films at 4x CPU throttle, with screenshots outside the repository:

| Viewport | Final page height | Screens | Median | p95 | Frames over 50ms | Overflow | JS errors |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 390 x 844 | 5624px | 6.7 | 6.1ms | 6.2ms | 0% | 0px | 0 |
| 1440 x 900 | 3765px | 4.2 | 6.1ms | 6.1ms | 0% | 0px | 0 |
| 320 x 568 | 5849px | 10.3 | 6.1ms | 6.2ms | 0% | 0px | 0 |

The 390px page is 125px shorter than polished G2 and 1682px shorter than polished G1. Desktop is 192px shorter than polished G2 and 1253px shorter than polished G1. These measurements are browser/host-specific evidence, not physical-device certification.

Artifacts: C:/Users/evans/geo/polish-run/film/G12/before-G2-390.png and before-G1-390.png; after-390.png, after-1440.png, after-320.png and matching JSON. Scratch films and the Orca preview remain in the scratch subfolder. All final strips were visually inspected for portrait equality, prices, lesson progression, contact warmth and clipping.

## Remaining

No unresolved implementation blocker. Eugene's rates, boards, format, biography and real email, the working site name and enquiry form still need supplied content and remain visibly marked placeholders. Physical-device and human accessibility validation remain launch follow-ups. No push or changes outside this concept folder; no screenshots committed.

Final qa.cjs rerun passed after the Pause/stem fix. Every reachable measured scroll stop lands the light within 3px of its intended point, and the paired-cell keyboard test confirms both cells visibly answer. Final phone diagnostic p95: 2.4ms simulation and 1.9ms draw. No errors in the final 390/1440 interaction runs, 320px opening check, reduced-motion or no-JavaScript checks. Syntax and git whitespace checks passed.

## Round 2 ? reading space milestone

Preserved round-one films as r1-390.png and r1-1440.png before edits. The director's G12 section is the round-two brief; neither polish checker batch includes G12. Read the inherited G1/G2 direction and reviews, approved copy and round-one record.

The header now scrolls away. Synchronized Pause buttons sit in the tutor heading, beside lesson timings and at contact. Extra biographies now open as full-width rows beneath both introductions, retain both faces and credentials above them, and take keyboard focus into the opened text; closing returns focus to the correct opener. No approved claims or placeholder content changed. Motion arrivals and final verification follow.

### Round 2 ? motion milestone and interaction checks

Reserved larger pools around both paired cells, enlarged the lesson markers with a wider phone gutter, and enlarged the golden contact arrival. The same travelling light now dwells at each cell and each lesson stop; the local optical rings brighten with its measured proximity. The text mask still protects copy, prices and actions during transit. Reduced motion keeps settled rings and a complete stem; Pause freezes the traveller and stem as well as cellular growth.

The first round-two films measured 5827px / 6.9 screens at 390px and 3942px / 4.4 screens at 1440px, both p95 6.2ms, zero overflow and zero JavaScript errors. The added 203px on phones and 177px on desktop reserve the arrival and Pause spaces requested by the director. Opened both preview strips and the expanded phone biography capture: the controls occupy their own space, the golden arrival is visible, and extra biography prose uses the full width.

Extended the existing interaction QA for all three synchronized controls, the scrolling header, full-width biography geometry and focus entering the disclosure. QA passes at 390/1440, plus the inherited 320 opening, reduced-motion and no-JavaScript checks. All reachable journey stops are within 3px of their target; paired cells answer keyboard activation; credentials and portraits remain visible; contrast remains 4.75:1 or better against the conservative darkest tint. Phone diagnostic p95 is 2.9ms simulation / 5.3ms drawing at 4x CPU (distinct from frame intervals). Final films follow.

### Round 2 ? final evidence

Overwrote and visually inspected after-390.png, after-1440.png and after-320.png using the required real-wheel film tool at 4x CPU, with matching JSON outside Git. Opened the Orca worktree preview and inspected its screenshot as well.

| Viewport | Round 1 height / screens | Round 2 height / screens | Median | p95 | Frames over 50ms | Overflow | JS errors |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 390 x 844 | 5624px / 6.7 | 5827px / 6.9 | 6.1ms | 6.2ms | 0.1% | 0px | 0 |
| 1440 x 900 | 3765px / 4.2 | 3942px / 4.4 | 6.1ms | 6.2ms | 0.1% | 0px | 0 |
| 320 x 568 | 5849px / 10.3 | 6091px / 10.7 | 6.1ms | 6.2ms | 0.2% | 0px | 0 |

Final outcome: all three requested director changes are implemented, the opening retains early readable rates and equal portraits, all approved copy and full reviews remain, and no control floats over content. Round-one captures remain available as r1-390.png and r1-1440.png. Final source syntax and git whitespace checks pass; implementation milestones are 888989b and c315972.

No implementation blocker remains. The supplied-content placeholders and real-phone/human validation listed in round one remain launch follow-ups. Only this concept folder changed, with no push and no screenshots committed.

## Round 3 — gentler light passage

Preserved the previous after strips as r2-390.png and r2-1440.png before editing. The same golden light now eases from its round arrivals into a longer, soft shaft through the existing margin, then rounds out again near the paired cells, lesson stops and contact. Moved its margin route slightly outward and fitted the whole elliptical glow inside the existing 7px text protection; no layout, copy, prices or controls changed.

Overwrote and visually inspected after-390.png, after-1440.png and the single required 320px film, plus the Orca preview. All three remain exactly the Round 2 height:

| Viewport | Height / screens | Median / p95 | Over 50ms | Overflow / JS errors |
| --- | --- | --- | --- | --- |
| 390 x 844 | 5827px / 6.9 | 6.1 / 6.2ms | 0.1% | 0px / 0 |
| 1440 x 900 | 3942px / 4.4 | 6.1 / 6.2ms | 0.1% | 0px / 0 |
| 320 x 568 | 6091px / 10.7 | 6.1 / 6.2ms | 0.1% | 0px / 0 |

Existing qa.cjs passes: synchronized in-flow Pause, frozen travel, all reachable arrivals, keyboard paired response, full-width biographies, early rates/names, contrast, reduced motion and no-JavaScript content. A separate comparison against Round 2 confirms identical rendered copy and text/price/portrait/control geometry at all three widths; evidence is outside Git in film/G12/scratch/r3-geometry.json. Syntax and whitespace checks pass. No remaining Round 3 blocker; supplied-content and real-device launch follow-ups remain as previously recorded.

## Round 4 — motion foundation

Preserved the Round 3 after strips as r3-390.png and r3-1440.png before editing; all diagnostic scripts, frame data and captures are outside Git in film/G12/round4/.

The actual background fault was a fixed viewport canvas subtracting scrollY only on its 32ms paint cadence, while native scrolling continued between paints. Instrumented baseline frames at 4x CPU measured up to 18px offset error; the scroll-mapped traveller moved a median 21.55px and maximum 101.65px per moving sample. There were 117 jumps above 10px in that baseline run.

Replaced the background with a document-anchored canvas: there is no scroll subtraction, rounding or canvas-origin repositioning. Desaturated sprites, 16% texture opacity and a 0.8px softening filter make the cells quiet. A separate, clipped document-space light layer travels by arc length at a maximum 90px/s, with acceleration/braking at 240px/s² and a 32ms maximum animation time step. Its 16px round transit glow never stretches. Every semantic arrival opens over 850ms, holds for at least 600ms, and closes over 700ms before travelling; fast scrolling queues the route rather than speeding it up. The original oval and contact join remain, and reduced motion settles at a stop.

First checks retain exact page heights (5827 / 3942 / 6091px at 390 / 1440 / 320px), zero sideways overflow and zero script errors. Full frame-level measurements, arrival footage and interaction checks are in progress.

### Round 4 — performance refinement and regression checks

The opening/closing pool now uses a cached bitmap with compositor scale and opacity; the small core has its own cached sprite. Texture sprites are blurred once at creation. The background consists of 512px document-space tiles painted at half resolution, with only visible tiles updating; the low-resolution softness is deliberate, while the traveller stays full resolution. This avoids repeatedly uploading a whole-page canvas and preserves exact native scrolling. Redundant style-variable writes are cached, and document height is measured from flow content so closing a biography cannot leave a tall decoration behind.

The initial full traces exposed 24.1ms phone and 30.4ms desktop p95 costs, so those builds were not accepted. After the paint changes, the desktop diagnostic strip reached 18.3ms p95. Final source traces are being rerun below.

The external regression suite passes synchronized in-flow Pause, frozen light and generation, both keyboard cell responses, full-width disclosure geometry and focus, both credentials remaining visible, no-JavaScript content, reduced motion and 320px opening/overflow. Contrast remains 4.748:1 or better against the conservative original dark tint. Exact rendered-copy and text/price/image/control geometry comparisons with the preserved Round 3 source pass at 390, 1440 and 320px. An independent footprint check across the sampled route finds no paint overlap: the smallest text clearance is 2px on the 390px margin and 7px on desktop, with the complete glow radius included.

### Round 4 — final animation budget

Bound light updates to at most 60Hz and quiet cellular repainting to roughly 15Hz, independently of the browser's native scroll compositor. The light still integrates elapsed time, with its 90px/s cruise cap, gentle acceleration/braking and maximum 2.88px animation step. This avoids spending the frame budget updating a small light at the host monitor's roughly 165Hz refresh. The complete desktop motion trace now passes at 18.2ms p95; the source phone trace and final required strips follow.

Frame diagnostics have a lightweight motion-only mode, so instrumentation does not count every simulated cell or copy timing histories on every frame. The raw trace records actual DOM layer positions, tile offsets and transformed light diameter, as well as the animation state; world-coordinate light travel is separate from native viewport scrolling.

### Round 4 — reduced-motion toggle correction

The completion stress run caught an Edge timing edge case: the media-query value could change inside requestAnimationFrame before its change event ran, leaving the light frozen in its travel phase. The loop now reconciles that preference immediately, settles at the nearest arrival and paints the complete still pool in the same update. The explicit event handler remains for resuming motion. Runtime reduce/resume and large alternating wheel input are checked separately from the initial reduced-motion page test.

The first final strips passed at 12.1ms / 18.2ms / 6.2ms p95 for 390 / 1440 / 320px, with unchanged heights, zero overflow and zero errors. Final-source evidence follows below. The trace summary now calculates speed using the elapsed time between moving updates: maximum 90px/s; dividing by intervening monitor-only frames had overstated that derived statistic. The underlying positions and raw frame data were unaffected.

### Round 4 — final measured evidence

Final-source Edge traces use real `mouse.wheel` input in steps of at most 12px, 4x CPU throttling and one sample per browser animation frame. They record actual DOM layer rectangles as well as simulation coordinates, and visit all seven arrivals in order. All measurements below are CSS pixels; light travel is in document coordinates so native page scrolling is not mistaken for light acceleration.

| Viewport | Samples / duration | Background / tile max alignment error | Backward background jumps | Moving-frame median / max | Maximum travel speed | Trace p95 |
| --- | --- | --- | --- | --- | --- | --- |
| 390 x 844 | 10,438 / 72.82s | 0 / 0px | 0 | 1.638 / 2.880px | 90px/s | 12.1ms |
| 1440 x 900 | 11,298 / 89.39s | 0 / 0px | 0 | 1.638 / 2.880px | 90px/s | 18.2ms |

There are no travel spikes beyond 2.88px, including the curved tutor crossing and rounded margin turns. Median across *all* monitor samples is 0px because the light updates at no more than 60Hz on this approximately 165Hz host; the table explicitly reports moving samples. Rendered position differs from the measured route by less than 0.00036px. The separate reversing-wheel stress test records a 1.647px maximum across 969 samples, then verifies that reduced motion is settled and static with no cellular generations. Runtime reduce/resume also passes.

The travel diameter is exactly 16px throughout both traces; measured DOM diameter differs by less than 0.00004px. Opening grows it to 122px at both tutor cells, 110px on phone lesson stops / about 112px on desktop lesson stops, and 171.844px at contact. Opening and closing remain at the stop: 850ms opening, at least 600ms hold, 700ms closing, with elapsed-time caps slowing an overloaded frame rather than skipping animation. Fast scrolling intentionally leaves the light following the route at its calm pace; it never skips the intermediate arrivals to catch up.

The required final strips were regenerated after the reduced-motion correction and visually inspected:

| Viewport | Page height / screens | Median / p95 | Frames over 50ms | Overflow / JS errors |
| --- | --- | --- | --- | --- |
| 390 x 844 | 5827px / 6.9 | 6.1 / 12.1ms | 0.1% | 0px / 0 |
| 1440 x 900 | 3942px / 4.4 | 6.1 / 18.2ms | 0.1% | 0px / 0 |
| 320 x 568 | 6091px / 10.7 | 6.1 / 6.3ms | 0.1% | 0px / 0 |

Final regression, exact Round 3 copy/geometry comparison and full-glow reading-clearance checks all pass. Every text, price, portrait and control rectangle remains identical at 390, 1440 and 320px; minimum measured light clearance is 2px on the phone margin and 7px on desktop. Pause remains synchronized in page flow; keyboard pairing, biography focus, initial and runtime reduced motion, no-JavaScript content, contrast and no 320px overflow pass.

Evidence is outside Git in `C:/Users/evans/geo/polish-run/film/G12/round4/`: `frames-390.json`, `frames-1440.json`, `summary-*.json`, `motion-chart-*.svg`, regression/geometry/safety/stress JSON, and the reproducible scripts. `lesson-01.png` through `lesson-20.png` are consecutive captures spanning 13.82 seconds through all four lesson steps; `lesson-sequence.json` preserves timestamps and state, `lesson-contact-sheet.png` shows them together, and `lesson-playback.mp4` plays those captured frames at their measured pace. The MP4 is sampled playback of the 20 captures, not a 60fps recording. `README.md` indexes the evidence and `source-sha256.json` identifies the measured source. Final `after-*.png` and matching JSON remain in the parent G12 folder, alongside the preserved `r3-390.png` and `r3-1440.png`.

No remaining Round 4 implementation blocker. Changes are confined to motion code/styles and this record; no page copy, prices or layout changed, no screenshots or diagnostic scripts are committed, and nothing was pushed.
