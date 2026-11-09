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
