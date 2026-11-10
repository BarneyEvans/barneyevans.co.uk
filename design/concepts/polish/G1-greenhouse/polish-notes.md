# G1 Greenhouse polish

## Changes

- Mobile order is Enquire, plain GCSE / A-Level rate lines for both tutors, then the equal arched portraits. The desktop keeps the paired glasshouse opening.
- Pause lives in a reserved opaque sticky header. Species and planting buttons are in flow beside a dedicated garden bed; no bottom toolbar remains.
- Subject cards became open rows with sage/lavender rules. Smaller chapter gaps and fewer background colonies let the content lead.
- Readable body copy is 16px or larger; labels are at least 13px. Barney's main degree is visible without flipping, alongside the existing role and DBS status; Eugene's visible qualifications and DBS remain.
- One golden sunlight marker meets the portraits, travels to the lesson stem, follows its four markers, and settles at the contact arch. Reduced motion presents a still garden and complete stem. Scroll geometry is cached; inherited colour/motion variables are scoped to their decorative elements.
- All approved claims and both complete Barney reviews remain. Eugene's missing offer/contact/bio retain visible placeholders.

## Verification

Before strips inspected at 390 and 1440. At 390: 7382px / 8.7 screens, p95 18.2ms, 0px overflow, no JS errors. At 1440: 5455px / 6.1 screens, p95 18.2ms, 0px overflow, no JS errors.

First 390 scratch strip: 7253px / 8.6 screens, p95 24.3ms, 0px overflow, no JS errors. This exposed avoidable scroll style recalculation; geometry and scoped variable updates were subsequently optimised. Final evidence is below.

| Viewport | Before height / screens | After height / screens | Before p95 | After p95 | Overflow / JS errors |
| --- | --- | --- | --- | --- | --- |
| 390 × 844 | 7382px / 8.7 | 7306px / 8.7 | 18.2ms | 12.1ms | 0px / 0 |
| 1440 × 900 | 5455px / 6.1 | 5018px / 5.6 | 18.2ms | 12.2ms | 0px / 0 |
| 320 × 568 | not supplied | 7840px / 13.8 | not supplied | 6.2ms | 0px / 0 |

The phone page is 76px shorter despite the larger text; desktop loses 437px. All final strips live outside the repository in `C:/Users/evans/geo/polish-run/film/G1/after-{390,1440,320}.png`, with adjacent JSON metrics. Measurements use the supplied real-scroll tool at 4× CPU throttle; they are host-specific, not physical-device certification. The 390px and desktop runs each recorded 0.1% of frames over 50ms; the 320px run recorded none.

`verify.cjs` passed at 390 and 1440: both profile reveals, both species controls, planting, stable Pause, resumed growth, all five cumulative chapter seeds, and no page errors. Reduced motion passed at 320, including instant profile changes and still planting; no-JavaScript rendering retained both complete profiles and all Enquire links. A final reduced-motion image confirmed that the planting bed does not hide still cells.

At 390 × 844, all rates end at 611px and both portraits/names end at 1070px. At 320 × 568, those boundaries are 688px and 1116px, so the full opening fits in two screens. A computed text-size scan at 320, 390 and 1440 found no text smaller than 13px. Body/credential/lesson/price/email copy is at least 16px; labels are at least 13px, using the existing deep green, grey-green and plum text palette. Both full reviews and supplied claims were retained.

Inspected the Orca browser desktop opening and the 390, 1440 and 320 real-scroll strips. A 50px scroll-step text-intersection check identified a light crossing over the review on phones and the lesson quote on desktop; both routes were moved into empty space. The final check at 320 × 568, 390 × 844 and 1440 × 900 found zero intersections between the travelling sun's bounding box and rendered main-content text. This is sampled route evidence, not an exhaustive proof at every scroll offset. The final `verify.cjs` rerun passed, including reduced motion and no JavaScript, with no page errors.

## Left

No product content was invented. Eugene's real rates, exam boards, format, biography and email still require supplied content; these remain visibly marked placeholders.


## Round 2

### Director's changes

- Preserved round 1's final phone and desktop strips as `r1-390.png` and `r1-1440.png` in the external G1 film folder before editing.
- Removed the sticky dock on every width. The opening header now scrolls away; synchronised in-flow Pause controls sit at the opening, planting bed, lesson path and contact crown. Planting stays in flow. All four controls retain accessible garden-growth labels and a shared pressed state.
- Kept the large opening portrait arches and early separate rate lines. Replaced the later 200/270px photos with equal arched profile headshots: 64 ? 78px on phones, 76 ? 92px on desktop. Tightened the planting/profile boundary, tutor heading and lower profile spacing. Visible credentials, full experience reveals and the cell-mosaic transition remain; both full Barney reviews and all approved factual copy remain.
- Replaced the small petal symbol with one soft golden pool. It grows above the paired opening, gathers in the planting bed, widens along the lesson stem and spreads at the contact arch. The pool fades while passing narrow margins. The lesson/contact arrivals use scoped decorative layers behind the text; the steps, prices and email actions stay still. Reduced motion presents settled pools and a complete stem.
- Added a reduced-motion check at animation work boundaries after a live preference-switch audit found the browser could miss its change callback. Growth now stops and the controls show Motion off in that case too.

### Verification and evidence

`verify.cjs` passes at 390 and 1440, including both profile reveals, planting, cumulative chapter seeds, stable Pause, resuming from a different chapter, synchronised controls, a scrolling header, equal small secondary portraits and the retained opening hierarchy. Reduced motion at 320 and no-JavaScript profiles/contact also pass. Opening rates still end at 611px and the paired portraits/names at 1070px at 390; the 320 opening still fits in two screens.

An additional external audit swept 31 scroll positions at 320, 390 and 1440: no fixed/sticky content controls, no protected-content intersections, no document overflow, no readable type below 13px and no JavaScript errors. Both expanded profiles and Barney's complete experience disclosure were inspected at all three widths. Settled reduced-motion screenshots at the opening, lessons and contact were byte-identical across a further 1.1 seconds. The pools arrive visibly at the stem. A targeted rendered-background contrast check across two lesson and two contact positions at 390/1440 found a minimum of 4.60:1 (Evening light); the previously darkened contact heading remains. These are sampled local-browser checks, not a real-phone guarantee.

The final 4? CPU real-wheel strips overwrite `after-390.png`, `after-1440.png` and `after-320.png` in `C:/Users/evans/geo/polish-run/film/G1/`. The desktop opening was inspected in the worktree's Orca browser, and phone/desktop chapters in headless Edge; the final films and expanded 320px/390px profiles were visually checked. Additional audit scripts, captures and JSON are in the external `scratch/` subfolder. No images were added to Git.

| Viewport | Round 1 height / screens | Round 2 height / screens | Round 1 p95 | Round 2 p95 | Overflow / JS errors |
| --- | --- | --- | --- | --- | --- |
| 390 ? 844 | 7306px / 8.7 | 6838px / 8.1 | 12.1ms | 6.4ms | 0px / 0 |
| 1440 ? 900 | 5018px / 5.6 | 4754px / 5.3 | 12.2ms | 12.1ms | 0px / 0 |
| 320 ? 568 | 7840px / 13.8 | 7289px / 12.8 | 6.2ms | 6.2ms | 0px / 0 |

The phone loses 468px from round 1; desktop loses 264px; 320px loses 551px. Final median frame spacing is 6.1ms at all three widths; frames over 50ms are 0.1% at 390, 0.2% at 1440 and 0% at 320. The adjacent JSON files contain the raw metrics. Nothing remains from this round's brief; the existing visibly marked missing Eugene details and final enquiry route still require supplied content before launch.

## Round 3

Preserved the previous final strips as `r2-390.png` and `r2-1440.png` before editing. Added one split golden seed centre to the existing broad sunlight: it meets the portraits, gathers in the planting bed, follows the lesson pool and settles in the contact crown. Its scale is capped independently of the surrounding light, so the pool retains its presence. The same centre remains settled with reduced motion; no copy or layout rules changed.

| Viewport | Round 2 / Round 3 height | Screens | Round 2 / Round 3 p95 | Overflow / JS errors |
| --- | --- | --- | --- | --- |
| 390 × 844 | 6838px / 6838px | 8.1 | 6.4ms / 12.1ms | 0px / 0 |
| 1440 × 900 | 4754px / 4754px | 5.3 | 12.1ms / 12.0ms | 0px / 0 |
| 320 × 568 | 7289px / 7289px | 12.8 | 6.2ms / 6.2ms | 0px / 0 |

Overwrote all three `after-*.png` strips and inspected them, the arrival captures and the worktree's Orca desktop preview. Median frame spacing is 6.1ms throughout; frames over 50ms are 0.2%, 0.1% and 0.2% respectively at 4× CPU throttle. These are local browser measurements.

`verify.cjs` passes, including opening rates, both profile reveals, planting, synchronised Pause/resume, reduced motion and no-JavaScript content. An external audit compared every main heading, paragraph, link, button and rate rectangle against Round 2 at all three widths: identical positions and page heights. Its 31-position sweeps found no fixed/sticky controls, overflow, labels below 13px or contact-centre/text intersections; reduced-motion opening, lesson and contact screenshots were byte-identical after 1.1 seconds. Rendered-background sampling at two lesson and two contact positions at 390/1440 found a minimum 4.566:1 contrast. Scripts, captures and reports are in the external film folder's `scratch/round3-*` and `scratch/r3-*` files. Nothing remains from this refinement; the existing marked Eugene details and final enquiry route still need supplied content before launch.


## Round 4 — motion foundation

Preserved after-390.png and after-1440.png as r3-390.png and r3-1440.png before editing. The external round4/baseline folder also preserves the Round 3 source for exact copy and geometry comparison. All scripts, captures and frame data remain outside Git in C:/Users/evans/geo/polish-run/film/G1/round4/.

Adapted G12's document-space motion model to the Greenhouse: 512px native-scrolling texture tiles at half resolution, cached softened sage/lavender sprites at 16% opacity, and quiet static document-space glass panes. There is no sampled scroll subtraction or rounded positioning. One requestAnimationFrame loop handles growth, texture painting and the independent gold light.

The 16px round travelling light follows an arc-length route at a 90px/s maximum, with 240px/s² acceleration/braking and a 32ms maximum time step. Both portrait crowns, the planting bed, each of the four lesson markers and the contact crown open into the warm pool and split gold seed: 850ms opening, at least 600ms holding and 700ms closing. Fast scrolling queues the route without skipping arrivals or accelerating it. Full pool sizes are limited by reading clearance; the margin remains centred and round. Pause freezes both travel and growth, and reduced motion settles at a stop. Plant and tutor controls remain.

The first desktop 4x CPU strip is 12.0ms p95, with unchanged 4754px height, zero overflow and zero JavaScript errors. A full-route footprint check found lesson approaches crossing reading matter; these now use the clear phone stem and desktop inter-column corridor. Final traces, strips and regressions follow.

### Round 4 — frame ownership and phone trace

Removed the inherited evolution callback's extra RAF scheduling: the running tick owns the next frame, while evolution only invalidates paint. Texture repainting remains limited to roughly 15Hz and light updates to 60Hz; scrolling itself is native. The core's opening size is also capped by each stop's available pool radius.

The final-source phone trace records 14,218 samples over 89.90 seconds at 4x CPU, with zero background/tile alignment error, zero backward snaps, 1.638px median moving-frame travel, 2.880px maximum, 90px/s maximum speed and an exact 16px transit diameter. Trace p95 is 6.2ms. All eight arrivals are visited; the 20 consecutive lesson captures span 13.09 seconds through Recap, Live Teaching, Practice and Wrap Up. Final desktop and regression measurements follow.

### Round 4 — owner redirect: background retained, light deferred

The coordinator's STOP/change-of-direction message reports that the owner rejected G12/G2's time-based 90px/s traveller and timed opening/holding/closing. The measurements above document that rejected experiment, not the final accepted light. Removed that entire timed traveller and restored G1's Round 3 scroll-linked light and existing still reduced-motion presentation, ready for the separately specified follow-up. Restored the original verification assertion as well.

Retained only this round's background work: native document-space tiles, faded and softened sage/lavender cells and static quiet glass panes, with one RAF owner for visible-row growth, painting and the existing light update. The background code measured zero alignment error/reversals in both traces; the prior timed-light numbers and lesson sheet are historical experiment evidence only. Final light refinement and its fresh evidence remain for the new dispatch. Copy, prices and layout remain unchanged.

Final background-only source verification: the original verify.cjs passes (Plant/species controls, both reveals, synchronised Pause, chapter seeding, 320px reduced motion, no-JavaScript content and no errors). Refreshed all three after strips; rejected-model strips are separately preserved outside Git.

| Width | Final height / screens | Final p95 | Overflow / errors |
| --- | --- | --- | --- |
| 390 | 6838px / 8.1 | 12.2ms | 0px / 0 |
| 1440 | 4754px / 5.3 | 12.2ms | 0px / 0 |
| 320 | 7289px / 12.8 | 12.1ms | 0px / 0 |

The new scroll-linked light specification remains the only Round 4 follow-up, as directed by the coordinator.

## Round 5 — scroll-linked golden light

Preserved Round 4's final strips as `r4-390.png` and `r4-1440.png` before editing; an external `round5/baseline/` preserves the source. Reused G12 Round 5's arc-length scroll map, rounded corners, 100ms exponential response and finite easing tail that ends within 300ms of native scrolling stopping. The same route coordinate opens and closes the pool, so upward scrolling reverses both travel and opening; there is no travel speed cap, arrival queue or timed opening sequence.

Adapted the route to G1's portrait crowns, planting bed, stacked lesson markers and contact crown. Desktop uses the clear right rail around the headline/prices and the central tutor/review gutter; phone uses the 11px left rail. Every horizontal crossing is budgeted at 1.19 route pixels per scroll pixel. A short desktop vertical rail catch-up uses the subject chapter's available scroll; the exact peak is being measured. Full opening size follows actual text, image and control clearance, retaining G1's warm gold, oval and split seed. The Round 4 faded document-space background, Plant/species controls, profile reveals, Pause, copy, prices and flow layout are retained. Reduced motion shows one static settled light and a complete lesson stem.

Evidence scripts are copied/adapted from G12 in `C:/Users/evans/geo/polish-run/film/G1/round5/`; no evidence images, scripts or traces enter Git. The final measurements and evidence follow.

### Round 5 — close stops and settling

G1's lesson markers are stacked only 114.58px apart on phone and 94.98px on desktop. Capped each opening span at 42% of the nearest stop gap (48.12px / 39.89px respectively), so the pool fully gathers into the 16px round light between every pair. The light physically reaches all eight stops; the full lesson pools reach 54px phone / 62px desktop, preserving the warm gold oval and split seed within their reading clearance. The planting pool reaches 116px phone / 300px desktop and the contact pool 131.81px. There is no independent opening timeline.

Kept the 100ms exponential response and 60Hz paint budget. The finite easing tail now ends at 280ms to reserve one paint interval within the 300ms settling target. This only bounds smoothing after scroll input; travel and opening remain reversible functions of the current scroll target, without a queue or speed cap. Pause freezes position, opening and growth; reduced motion settles at one stop and remains still even when scrolling.

### Round 5 — final measured evidence

Final Edge traces use the supplied playwright-core, 4x CPU and real mouse.wheel input: reading at 24px every 120ms, an interior reading stop, upward 36px wheels, and 720/960px flicks. Each RAF records actual DOM position/diameter, document-space background alignment and lag against the current scroll target.

| Viewport | Samples | Background / tile max error | Reading lag median / max | Fast lag median / max | Settle to 1px: reading / flick | Trace p95 |
| --- | --- | --- | --- | --- | --- | --- |
| 390 × 844 | 6206 | 0 / 0px | 14.90 / 46.22px | 64.50 / 1030.98px | 248.5 / 278.9ms | 12.1ms |
| 1440 × 900 | 4120 | 0 / 0px | 17.35 / 79.96px | 68.79 / 1259.77px | 236.4 / 290.9ms | 12.2ms |

Peak flick lag is the instantaneous error after a large wheel impulse; the light follows the current target and settles without waiting for earlier arrivals. Fast error falls by 95% in 224.3ms phone / 236.3ms desktop. Reverse-scroll lag is 14.51 / 52.62px median/max phone and 18.72 / 67.24px desktop, settling to 1px in 236.4 / 230.4ms. A prior desktop trace is retained as `*-1440-host-stall.json`: a 90.8ms host frame stall delayed one reverse-stop sample to 327.3ms; the final repeat above passed. These are throttled local-browser results.

Maximum route pixels per scroll pixel are 1.5000 phone and 2.4895 desktop. The desktop exception occupies approximately scrollY 399–1018 along the clear right rail (x1352), borrowing the long subject chapter's scroll to reach the planting bed without changing layout or accelerating a horizontal crossing. Maximum viewport movement is 1.5544px per scroll pixel. Every 50px horizontal window, checked from 1px starting increments, stays at or below 59.5px; zero jumps exceed 60px. This is the deliberate geometry trade-off in favour of even crossings and physical visits.

Transit diameter is exactly 16px in the route model; actual rendered transit differs by less than 0.00004px. Rendered position error is below 0.001px. The full footprint retains at least 5px reading clearance on phone / 7px desktop in both the 1px-scroll sweep and actual trace checks; text, portraits, prices, names and buttons are protected. `stress.json` checks all eight physical arrivals, fully small transit between adjacent lesson stops, reversible partial opening, Pause, runtime reduced motion and large flick/reversal without a queue.

| Viewport | Round 4 / Round 5 height | Screens | Round 4 / Round 5 p95 | Overflow / JS errors |
| --- | --- | --- | --- | --- |
| 390 × 844 | 6838 / 6838px | 8.1 | 12.2 / 12.1ms | 0px / 0 |
| 1440 × 900 | 4754 / 4754px | 5.3 | 12.2 / 12.2ms | 0px / 0 |
| 320 × 568 | 7289 / 7289px | 12.8 | 12.1 / 12.1ms | 0px / 0 |

The final supplied-tool strips overwrite all three `after-*.png` files only after preserving Round 4; median frame spacing is 6.1ms and frames over 50ms are 0.1% throughout. All three strips, the Orca worktree desktop preview and both lesson contact sheets were opened and visually inspected. Each lesson sheet has 20 evenly spaced scroll captures: about 25.47px per step at 390 and 22.37px at 1440, captured after real wheels and a 380ms settle; the individual PNGs and sequence JSON retain actual scroll positions.

Exact rendered copy, text/price/image/control rectangles and page heights match the preserved Round 4 source at 390/1440/320. The repository `verify.cjs` passes both profile reveals, Plant/species controls, synchronised in-flow Pause/resume, cumulative chapter seeds, the phone opening hierarchy, 320px reduced motion, no-JavaScript profiles/actions and no errors. Safety checks also confirm that closing a biography restores the original page height. The Round 4 faded, document-anchored background and all wording, prices and layout remain unchanged.

The external `round5/README.md` indexes the table, raw frames, summaries, source SHA-256 hashes, reproducible G12-derived scripts, regression/geometry/stress/safety JSON and both 20-frame sheets. Source milestones are `ec7fc63` and `3905566`, followed by this final evidence record. No Round 5 implementation blocker remains; the existing marked Eugene details and final enquiry route still require supplied content before launch. Nothing was pushed and no evidence artifacts were committed.
