# B2 Wave Study — polish notes

## Final result

Polished the existing B2 concept, retaining Outfit, the rose/sky/plum palette and both tutors' human presence. No garden cells, ribbon interaction, interference rings or additional scientific metaphor.

- Borrowed B1's opening hierarchy: action, separate GCSE/A-Level rate lines and equal named portraits. At 320px and 390px, both portrait/name groups finish before y=780px, with subjects, rates and Enquire above them.
- Replaced five repeated divider scenes with one connected wave. Its broad opening meets the portraits; a visible travelling wave and point follow the reader through the tutor gutter; the same waveform becomes discrete samples through the four actual lesson markers; and full-width contact waves settle into clear lines above the names and actions.
- Applied the coordinator's second-round note by increasing the wave's width and colour, enlarging the lesson samples, adding the visible travelling packet, and giving the final contact lines more presence. Reserved space keeps all motion clear of copy and controls.
- Tightened biographies using compact equal portraits, visible qualifications and DBS labels, and a native disclosure containing Barney's full experience. Retained every original longer claim and both complete reviews, with explicit Barney attribution.
- Increased body copy and rate figures to at least 16px and labels to at least 13px. Darkened supporting copy and section numbers.
- Added an in-flow Pause/Resume control. Reduced motion is a complete settled state with pointer motion disabled; nothing important depends on animation. Hidden tabs cancel pending frames, offscreen scenes skip drawing, and geometry is cached until layout changes.

## Filmstrip evidence

Opened both provided before strips and all final after strips. Artifacts are outside the repository in `C:/Users/evans/geo/polish-run/film/B2/`.

| Viewport | Before height / screens | Final height / screens | Before p95 | Final p95 | Final overflow / JS errors |
| --- | --- | --- | --- | --- | --- |
| 390 x 844 | 7236px / 8.6 | 6494px / 7.7 | 12.1ms | 6.2ms | 0px / 0 |
| 1440 x 900 | 5997px / 6.7 | 4669px / 5.2 | 18.1ms | 6.2ms | 0px / 0 |
| 320 x 568 | Not provided | 6885px / 12.1 | Not provided | 6.2ms | 0px / 0 |

All three final strips used the supplied real-wheel-scroll tool at 4x CPU throttle, sequentially. Median frame interval was 6.1ms and no sampled frame exceeded 50ms. These are local emulation results, not a physical-phone guarantee. Final files: `after-390.png`, `after-1440.png`, `after-320.png` and their JSON measurements.

The 390px page is 742px shorter despite substantially larger text; desktop is 1328px shorter. The 320px screen count uses a much shorter 568px viewport.

## Verification

- 320/390/1440: no horizontal overflow, no visible text below 13px; a computed text contrast scan found a minimum of 5.15:1 on sampled solid backgrounds.
- Pointer movement changes the opening wave; Pause stops those changes; reduced motion stays stable across pointer and scroll input.
- Enter opens the native experience disclosure and its keyboard focus outline is visible.
- Both DBS labels are visible outside cropped portraits; all images decode; all native anchor targets resolve; `noindex` is present.
- Exact opening currency strings and both full reviews verified. Comparison with original B2 found no original text string longer than 40 characters missing.
- No JavaScript errors; `git diff --check` passes. Verification artifacts/scripts are in the film folder's `scratch/` directory.

## Remaining

No implementation blocker in this concept. The original owner-supplied placeholders remain deliberately visible: working name; Eugene's exam boards, rates, assumed format, biography and real email; and the enquiry form. No push or edits outside the assigned concept folder were made to the repository.

## Round 2

The director asked for more expressive motion at the opening, the lesson sampling transition and contact. Before editing, preserved the round-one `after-390.png` and `after-1440.png` as `r1-390.png` and `r1-1440.png` in the external B2 film folder, alongside copies of their measurement JSON.

- Extended the desktop welcome into a broad sweep beneath the opening facts, curving through the outer spare space and back around the paired portraits. The headline, rate summary, portraits and controls retain their round-one positions. The desktop wave now spans approximately 1257px at 1440px.
- Added a reserved transition above the lesson markers. The recognisable crest and trough visibly widen, then gather from the full section width into the first sample as the reader scrolls. The existing four-step sampled wave continues the same journey.
- Reused that tapered opening waveform at both contact routes. Each briefly holds its crest and trough, then settles as its card comes into view; both finish completely straight at the page end. Added clearance keeps the crest below the heading and above the names; emails and buttons remain still.
- Preserved all approved copy, both reviews, early separate rate lines, equal portraits, the in-flow Pause control and the gutter packet. No HTML or original type styling changed. Reduced motion keeps settled paths and removes the spare gathering space.

Verification: pointer, Pause, reduced motion, keyboard disclosure/focus, images, local anchors, prices and full review text pass. Computed solid-background text contrast remains at least 5.15:1 at 320/390/1440. A scroll-transition probe confirms the gathering narrows from 330px on phone / 1136px on desktop to 34px; every SVG path stays identical across scrolling in reduced motion. Both contact wave paths have exactly zero vertical extent at the end of the page at 390 and 1440px. At 390px, the opening rates end at y469 and both named portrait groups end at y768, unchanged from round one.

### Round 2 final filmstrip measurements

| Viewport | Round 1 height / screens | Round 2 height / screens | Round 1 p95 | Round 2 p95 | Overflow / JS errors |
| --- | --- | --- | --- | --- | --- |
| 390 x 844 | 6494px / 7.7 | 6645px / 7.9 | 6.2ms | 6.2ms | 0px / 0 |
| 1440 x 900 | 4669px / 5.2 | 4783px / 5.3 | 6.2ms | 6.2ms | 0px / 0 |
| 320 x 568 | 6885px / 12.1 | 7036px / 12.4 | 6.2ms | 6.2ms | 0px / 0 |

All final films used the supplied real-wheel tool at 4x CPU, sequentially; median frame interval was 6.1ms and no sampled frame exceeded 50ms. Opened and visually reviewed all three films, plus full-size captures of the opening, gathering and contact states. The 320px strip was run once. These are local emulation measurements, not a physical-device guarantee.

The extra 151px on phone / 114px on desktop reserves space for the gathering and the taller contact crests. This is a deliberate small increase to restore the director's three motion moments while keeping text clear; the page remains 591px shorter on phone and 1214px shorter on desktop than v3. The headline, early prices and portrait placement did not move.

Artifacts outside Git: `r1-390.png`, `r1-1440.png` and measurement JSON preserve round one; `after-390.png`, `after-1440.png`, `after-320.png` and JSON contain the final round-two runs. Additional captures and executable checks are in `scratch/r2-*`, including `r2-verification.json` and `r2-motion.json`. `node --check` and `git diff --check` pass. No unresolved implementation issue; the owner-supplied placeholders listed above remain unchanged.

## Round 3

Replaced only the desktop opening's enclosing U-turn with a wave that passes the portraits and continues beyond the right edge. Its outgoing curve follows the crest's tangent, retaining the rose/sky body, pointer response and settled motion-off state. Removed the thick return beneath the prices; the existing gutter journey, gathering and contact remain intact. No HTML, CSS or copy changed.

Preserved the previous strips and measurements as external `r2-390.*` and `r2-1440.*` before editing. Overwrote all three `after-*` strips and opened them for visual review; also inspected the opening in Orca and full-size desktop/phone captures. The 320px strip ran once.

| Viewport | Round 2 → Round 3 height / screens | p95 before → after | Overflow / JS errors |
| --- | --- | --- | --- |
| 390 × 844 | 6645 → 6645px / 7.9 | 6.2 → 6.2ms | 0px / 0 |
| 1440 × 900 | 4783 → 4783px / 5.3 | 6.2 → 6.2ms | 0px / 0 |
| 320 × 568 | 7036 → 7036px / 12.4 | 6.2 → 6.2ms | 0px / 0 |

All films used real wheel scrolling at 4× CPU, sequentially. Median was 6.1ms throughout; frames over 50ms were 0% on phones and 0.1% on desktop. These remain local emulation measurements.

Baseline comparison confirms every text position and page height unchanged at 390/768/1024/1440px, with the 390px wave path identical. Desktop path samples travel only forward and exit the viewport, staying above the portrait labels. Pointer, Pause, reduced-motion path stability, keyboard disclosure/focus, images, anchors, exact rates and full reviews pass; sampled text contrast remains at least 5.15:1. Evidence is in external `scratch/r3-*`; `node --check` and `git diff --check` pass. Nothing remains for this refinement; existing owner-supplied placeholders remain visible.
