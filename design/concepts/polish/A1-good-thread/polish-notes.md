# A1 Good Thread polish notes

## Direction and first milestone

Read the brief, approved copy, A1 shortlist changes, checker and parent panel, and the original pitch. Opened both supplied before strips before editing. Only this concept folder is edited.

- Put separate GCSE and A-Level rates before portraits on phones; retained equal subjects, names, faces and contact actions.
- Kept lilac, plum, raspberry and apricot. Switched headings to the existing local DM Sans, removed yellow borders and blobs, and retained a single fine stitched portrait contour.
- Replaced the disconnected chapter drawings with one measured SVG thread: paired portraits, outside seam, all four actual lesson markers, the first full Barney review edge, then one small loop at contact.
- Kept touch/keyboard plucking in page flow. Pause has its own 44px sticky header row; no floating control over the page. Reduced motion shows the entire settled seam.
- Raised body copy to 16px and supporting labels to at least 13px. Trimmed section spacing and repeated portrait scale without removing approved claims or either review.

## Measured strips (4x CPU throttle)

| Capture | Page height | Screens | p95 frame | Overflow | JS errors |
| --- | ---: | ---: | ---: | ---: | ---: |
| Before 390 x 844 | 6722px | 8.0 | 6.2ms | 0px | 0 |
| Before 1440 x 900 | 4890px | 5.4 | 6.2ms | 0px | 0 |
| First scratch 390 x 844 | 6277px | 7.4 | 6.2ms | 0px | 0 |
| First scratch 1440 x 900 | 3919px | 4.4 | 12.1ms | 0px | 0 |
| Final 390 x 844 | 6277px | 7.4 | 12.1ms | 0px | 0 |
| Final 1440 x 900 | 3919px | 4.4 | 12.1ms | 0px | 0 |
| Final 320 x 568 | 6821px | 12.0 | 6.2ms | 0px | 0 |

All captures are outside the repo in C:/Users/evans/geo/polish-run/film/A1/. Viewed the worktree-scoped Orca desktop preview and both scratch strips. The first strip exposed a thread/title intersection at the lesson map; the route now uses the spare space below its title and the desktop column gutter.

## Second milestone: signature and verification

The coordinator asked us to keep the signature visible on a phone, after seeing other polishes reduce their motion too far. Strengthened the continuous raspberry line to 3px with a 14px travelling bead, drew it around both portrait contours, and enlarged the simple closing loop to a visible 39px by 32px. The opening loops have a dedicated continuous drawing interval, so they do not jump when the path turns upwards. Kept the line tied to the four full-sized lesson markers and the entire first review edge.

The repeatable verify.cjs audit now passes at 320, 390, 768 and 1440px:

- No horizontal overflow, missing images or JavaScript errors.
- Both full named portraits and the quick rates appear within two screens (portraits end at 839px on the 320 x 568 phone and 835px on the 390 x 844 phone).
- No readable text below 13px; body copy is at least 16px. Minimum measured text contrast: 4.81:1.
- No sampled thread/text collisions, including with the first experience disclosure open. The line passes within 0.50px of every lesson-marker centre in a 5,001-point path sample.
- Touch and Enter change the thread; the spring returns to its exact resting geometry. Pause and reduced motion show the complete still seam; scrolling does not change reduced-motion geometry.
- Original subjects, tutor claims, lesson copy, both full reviews, source figures, contact and footer content are all preserved.

The original rough audit counted unloaded lazy images and hidden disclosure text; these were audit artefacts, not rendering failures. The final audit explicitly loads images and excludes closed disclosure content. Its full results are in verification.json.

Final after-390.png, after-1440.png and after-320.png strips were regenerated and opened after the stronger portrait and contact drawing. All meet the p95 under 20ms target at 4x CPU throttle; frames over 50ms were 0.1% at 390/1440 and 0% at 320. The phone page is 445px shorter and the desktop page is 971px shorter than the supplied originals, while using larger body and supporting text. These are throttled browser measurements, not a physical-device certification. Eugene's prices, boards, format, bio and email, the site name and enquiry form remain visibly marked supplied placeholders. No design or implementation blocker remains; supplied placeholders are the remaining content decisions.

## Round 2

Read the director's round-two A1 brief and checker finding, then preserved the supplied final phone and desktop strips as `r1-390.png` and `r1-1440.png` outside Git before changing the concept. The inherited Pause row already scrolls away; retained that fix and the early rate rows, equal portraits, readable type and all approved copy.

### Milestone 1: a relaxed seam

Replaced the rectangular hero underlining with a broad, slightly asymmetric sweep. Softened the desktop lesson approach and exit, gave the first review a gently bowed seam instead of a box edge, and curved the approach into the existing closing loop. The same continuous path still meets all four lesson markers. The four-width audit passes at 320, 390, 768 and 1440px: no sampled text intersections (also with Experience open), overflow, missing images or errors; minimum text contrast remains 4.81:1. Page layout and content are unchanged. Travelling pluck and final strips follow in the next milestone.

### Milestone 2: the pluck travels

Replaced the little isolated bridge vibration with a 3.2-second travelling ripple and bead on the actual seam. It follows Barney's contour into Eugene's, then carries on through the lesson markers and review before slowing into the existing simple closing loop. Faces, captions and copy stay stationary. Also removed a tiny accidental crossover in the portrait bridge, leaving one loose bend. Cached path samples and normals keep animation work local; hidden tabs, Pause, reduced motion, and layout changes all settle the exact resting geometry.

Expanded the repeatable audit to observe the bead reaching the other portrait and closing loop, measure still portrait/copy boxes, and check touch, Enter, exact settling and cancelling a pluck with Pause. The 4x run exposed a queued-frame timestamp preceding a new input event; clamping elapsed time at zero fixes that race. The repeat run passes at all four widths with no errors. Pluck p95: 12.1ms at 320, 12.2ms at 390, 12.1ms at 768 and 18.3ms at 1440. Viewed the worktree-scoped Orca preview; final scroll strips follow below.

### Final Round 2 evidence

| Capture | Page height | Screens | p95 frame | Overflow | JS errors |
| --- | ---: | ---: | ---: | ---: | ---: |
| Saved Round 1 strip 390 x 844 | 6277px | 7.4 | 6.2ms | 0px | 0 |
| Saved Round 1 strip 1440 x 900 | 3919px | 4.4 | 12.1ms | 0px | 0 |
| Round 2 after 390 x 844 | 6277px | 7.4 | 6.2ms | 0px | 0 |
| Round 2 after 1440 x 900 | 3919px | 4.4 | 6.2ms | 0px | 0 |
| Round 2 after 320 x 568 | 6821px | 12.0 | 6.2ms | 0px | 0 |

Final strips used real wheel scrolling at 4x CPU; all three report 0% frames over 50ms. Saved Round 1 numbers above are from the preserved supplied strip headers (the supplied 390 strip reports 6.2ms, while the earlier notes recorded a separate 12.1ms run). These local timings vary between runs and are not physical-phone measurements.

Overwrote and opened `after-390.png` and `after-1440.png`, ran 320 once as `after-320.png`, and opened that strip too. All evidence is outside Git at `C:/Users/evans/geo/polish-run/film/A1/`; `scratch/r2-pluck.png` shows the same ripple moving around Barney and into Eugene, with the unchanged contact routes at its finish. The four-width audit remains in `verification.json`, with all interaction checks true, no text collisions even with Experience open, 4.81:1 minimum measured contrast and every numbered marker within 0.70px of the sampled path.

No copy or page structure changed in Round 2. Early rates, equal billing, in-flow controls, complete reviews attributed to Barney and visible placeholders are preserved. Nothing remains from this design brief; the supplied name, Eugene offer/bio/email and enquiry-form placeholders remain the owner's content decisions.

## Round 3

Preserved the supplied after strips as `r2-390.png` and `r2-1440.png` before editing. Shortened just the opening perimeter detour: on phones the thread takes a loose diagonal below Pluck toward the subjects; on desktop it returns below the portrait captions through the spare column gap instead of tracing the whole panel bottom. Both portrait loops, the travelling pluck and every later chapter remain intact. The complete path is 52px shorter at 320/390, 26px shorter at 768 and 35px shorter at 1440. A before/after DOM comparison confirms identical copy, element positions and dimensions at all four widths; evidence is outside Git in `scratch/r3-comparison.json`.

| Final strip | Page height (unchanged) | Screens | p95 at 4x CPU | Overflow | JS errors |
| --- | ---: | ---: | ---: | ---: | ---: |
| 390 x 844 | 6277px | 7.4 | 6.2ms | 0px | 0 |
| 1440 x 900 | 3919px | 4.4 | 12.1ms | 0px | 0 |
| 320 x 568 | 6821px | 12.0 | 6.2ms | 0px | 0 |

Overwrote and opened both required after strips, ran the 320 strip once, and viewed the worktree-scoped Orca preview. All three strips report 0% frames over 50ms. The four-width audit passes: no text collisions, including with Experience open, 4.81:1 minimum text contrast, intact early rates, stationary content during plucks, working touch/Enter/Pause, and complete still reduced motion. Final pluck p95 is 6.2–12.2ms. Fixed an audit startup race by waiting for the measured SVG path before inspecting it. No text, prices, CSS or HTML changed; Pause stays in flow and the approved copy/placeholders remain intact. No Round 3 design work remains; owner-supplied content decisions are unchanged.
