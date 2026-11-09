# Counterpart polish

## Brief and baseline

Preserve the rose/plum partnership and the over/under ribbon, with only three content-bound states: separate at the portraits, braided alongside the lesson steps, parallel at contact. Bring level-by-level rates above the portraits and strengthen faint phone type.

Before strips inspected at 390 and 1440. The 390 page is 7,544px / 8.9 screens; the 1440 page is 5,789px / 6.4 screens. Both baseline runs report p95 6.2ms, 0px horizontal overflow and no JavaScript errors. The opening rates follow the portraits, supporting text is often 9–13px, and the price/profile and review interludes repeat the loops without adding information.

## Layout and motion milestone

Moved GCSE and A-Level prices above both portraits, with larger bold amounts and marked Eugene placeholders. Raised body copy to 16px, small readable labels to at least 13px, and increased weight and muted-text contrast. Removed the price/profile and pre-review loop interludes; tightened section and profile spacing without removing claims or reviews.

Replaced five independent canvas scenes with one canvas that visits three reserved anchors. The separate ribbons land on the portrait frames, a broad vertical over/under braid follows Barney's four lesson steps, and the strands resolve into parallel lines at contact. The ribbon swap and pause controls sit below the lesson sequence in normal flow. The renderer is event-driven, capped at 2x DPR, and stops in a hidden tab; reduced motion settles each state without scroll/pointer animation. CSS provides still strands when JavaScript is disabled.

The coordinator's review asked that the signature retain real presence on a phone. The first scratch strip was too faint at the portraits and too narrow beside lessons; the second gives the portrait ribbons a dedicated 100px space attached directly to the photo frames and a 58px-wide braid beside the steps. This adds useful motion space while retaining a shorter page.

Scratch 390: 6,786px / 8.0 screens versus 7,544px / 8.9 before; p95 6.2ms, overflow 0px, JavaScript errors 0. Inspected both scratch strips visually.

## Final validation

Final strips are `after-390.png`, `after-1440.png` and `after-320.png` in `C:/Users/evans/geo/polish-run/film/C2/`, with corresponding JSON. Opened and inspected all three, plus the Orca worktree browser screenshot. The contact curves initially crossed while settling; corrected them to share the same curvature and retain their parallel relationship throughout.

| Viewport | Before height / screens | After height / screens | Before / after p95 | Overflow / JS errors |
|---|---|---|---|---|
| 390 x 844 | 7,544px / 8.9 | 6,786px / 8.0 | 6.2 / 6.2ms | 0px / 0 |
| 1440 x 900 | 5,789px / 6.4 | 4,715px / 5.2 | 6.2 / 6.2ms | 0px / 0 |
| 320 x 568 | Not supplied | 7,217px / 12.7 | n/a / 6.2ms | 0px / 0 |

All final strip runs: median 6.1ms; 0% frames over 50ms, at 4x CPU throttling. These are headless scheduling measurements, not a physical-phone guarantee.

`verify.cjs` and `verification.json` provide reproducible functional checks at all three widths and 3x device scale factor. The original supplied claims and full reviews match exactly, all original placeholder strings remain in `span.ph`, rates precede portraits, and both people plus the rates/action fit within two phone screens (opening ends at 982px at 390, 983px at 320). No text under 13px, body copy under 16px or computed-colour contrast under 4.5:1 was found. The contrast scan samples opaque ancestor backgrounds and the lesson gradient's darkest stop; visual strip review also completed.

Touch swap, pause/resume, disclosure opening, visible skip-link keyboard focus, one physical canvas, all three painted states, 2x DPR cap, idle stillness, settled reduced-motion geometry, no-JavaScript content and CSS strands all pass. An initial QA assertion missed the portrait state at 320 because it jumped directly from the first screen to the lesson chapter; corrected the check to visit all three anchors explicitly and reran successfully.

Completed the updated pitch and committed the implementation and evidence. No unresolved implementation issue. Eugene's rates, boards, format, biography and real email remain the supplied visibly marked placeholders, and the enquiry form remains unimplemented as required by the approved copy.

## Continuation review

The replacement worker inspected both before strips and all three final strips, reviewed the remaining contact-curve change, and reran `verify.cjs` successfully at 390, 320 and 1440. Page heights and opening positions match the recorded strips, with no overflow, JavaScript errors, undersized text or computed contrast failures. A fresh Orca worktree screenshot was also inspected and saved outside the repository at `film/C2/scratch/final-orca-review.jpg`. The remaining final-state correction, pitch and reproducible verification evidence are included in the completion commit.

## Round 2

Read the director's polished shortlist, C2 checker finding and round 1 record. Preserved `after-390.png` and `after-1440.png` as `r1-390.png` and `r1-1440.png` before editing; matching JSON copies retain the round 1 timing baseline. The checker teaching-hours correction is already present and remains 16px.

### Wider duet and earlier faces

The desktop lesson braid now has a reserved 160px lane rather than 64px, with wider bends, thicker strands and alternating over/under crossings. Rebalanced the two lesson columns to retain the steps' reading width. Intermediate widths have a 100px lane; the successful 58px phone braid is unchanged. Shortened the phone portrait ribbon space from 100px to 60px, preserving its arrival on both photo frames while bringing both names 40px earlier.

Inspected `scratch/r2-braid-1440.png`: 4,715px / 5.2 screens, median 6.1ms / p95 6.2ms, 0% frames over 50ms, 0px overflow and 0 JavaScript errors at 4x CPU. Next: separate contact arrivals, then final strips and functional checks.

### A strand for each contact route

Moved the closing canvas from the heading to the paired contact routes. Each equally weighted strand now follows the same relaxed vertical bend from its tutor's name to beside the Email button. Their shapes remain parallel whether the routes sit side by side or stack on a phone. Reserved 56px gutters keep every painted pixel clear of names, subjects, emails and actions, and removing the separate phone ribbon band shortens the ending. The renderer still uses one physical canvas, stays event-driven and idle at rest, and preserves settled reduced motion and CSS strands without JavaScript.

Inspected focused contact screenshots at 390 and 1440 plus the Orca worktree browser capture. Expanded `verify.cjs` to check both actual painted contact arrivals and their clearance, desktop braid width and lesson-text clearance; removed the incorrect teaching-hours body-scan exemption. All checks pass at 390, 320 and 1440, including exact original copy/placeholder comparisons, touch swap, pause/resume, disclosures, focus, reduced motion and idle rendering. No overflow, JavaScript errors, undersized body/labels or computed-colour contrast failures. Full final film runs follow.

### Final Round 2 validation

Overwrote and visually inspected `after-390.png`, `after-1440.png` and the single required 320px film run, `after-320.png`, in `C:/Users/evans/geo/polish-run/film/C2/`. Matching JSON files record fresh real-wheel runs at 4x CPU. Round 1 phone/desktop PNGs and timing JSON remain under the `r1-` names. Also inspected `scratch/r2-contact-390.png`, `scratch/r2-contact-1440.png` and the worktree-scoped Orca capture `scratch/r2-orca.jpg`.

| Viewport | Round 1 height / screens | Round 2 height / screens | Round 1 / Round 2 p95 | Overflow / JS errors |
|---|---|---|---|---|
| 390 x 844 | 6,786px / 8.0 | 6,645px / 7.9 | 6.2 / 6.2ms | 0px / 0 |
| 1440 x 900 | 4,715px / 5.2 | 4,715px / 5.2 | 6.2 / 6.2ms | 0px / 0 |
| 320 x 568 | 7,217px / 12.7 | 7,102px / 12.5 | 6.2 / 6.2ms | 0px / 0 |

All three final runs report median 6.1ms and 0% frames over 50ms. These are local headless frame intervals, not real-phone certification. The complete opening ends at y942 at 390 and y943 at 320, with separate readable rates still above both portraits. Round 2 saves another 141px at 390 and 115px at 320 without cutting copy, claims, reviews or readable type.

`verification.json` records all functional checks passing, including the teaching-hours sentence in the body-size scan. No unresolved Round 2 implementation issue. The supplied Eugene details and enquiry-form placeholders still need the same content/route decisions before launch; both Barney reviews remain clearly attributed to him. All changes stay inside this concept folder and no images are committed.

## Round 3

Preserved the Round 2 phone and desktop strips as `r2-390.png` and `r2-1440.png` before editing, with matching timing JSON. Changed only the closing ribbon geometry: two slimmer strokes share an S-bend in the phone gutter before rose rests beside Barney's action and plum continues to Eugene's. On desktop the shared bend occupies the existing blank space above the routes, then rounds into each action's gutter. No text, prices or page-flow controls move, and no page height is added. Updated the pitch and the existing painted-clearance check to cover these reserved spaces.

Inspected focused phone/desktop contact captures, the worktree-scoped Orca browser capture and fresh final strips outside Git. The full functional check passes at 390, 320 and 1440: exact copy and placeholders, early rates, readable sizes/contrast, contact ink clearance, touch swap, Pause, disclosures, focus, idle rendering and settled reduced motion remain intact. One initial desktop swap sample ran before its finite animation had settled while a separate browser capture was running; a sequential rerun passed without changing the renderer or relaxing the check.

Overwrote and inspected `after-390.png` and `after-1440.png`, and ran/inspected the single required 320px strip, `after-320.png`. Round 2 and Round 3 heights are identical: 390 = 6,645px / 7.9 screens; 1440 = 4,715px / 5.2 screens; 320 = 7,102px / 12.5 screens. Every final real-wheel run at 4x CPU reports median 6.1ms, p95 6.2ms, 0% over 50ms, 0px overflow and no JavaScript errors. These remain local headless measurements. No unresolved Round 3 issue; the existing supplied content/enquiry placeholders remain the same launch decisions.
