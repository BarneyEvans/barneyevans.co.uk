# Counterpart, polished

Two rose and plum ribbons belong to two equally prominent tutors. They open onto the portrait frames, weave alongside the lesson sequence and settle beside each tutor's contact route.

Open `index.html` directly. Photos, Manrope, its licence, styles and the renderer are local; there is no build step or network dependency.

## What changed

GCSE and A-Level rates now precede the portraits. The two tutors have equal price summaries, with bold amounts on separate level rows and Eugene's unconfirmed rates visibly marked. Both names, faces, subjects, rates and Enquire fit within the first two phone screens, including at 320 x 568.

Body copy is at least 16px and small readable labels at least 13px. Stronger weight, darker supporting text and clearer price figures retain the soft palette while making the phone view easier to read. Section spacing is tighter, and the two full-width loop interludes are gone. All supplied claims, qualifications, experience, lesson wording and both full Barney reviews remain.

## Three ribbon moments

1. **Separate, at the portraits.** Broad independent ribbons open outward onto the two photo frames. Scrolling and pointer movement gently change their bend without crossing them.
2. **Braided, along the journey.** The same pair returns as a substantial vertical over/under weave beside the four Computer Science lesson steps. Round 2 widens its desktop lane from 64px to 160px and strengthens the bends and alternating crossings, with the steps' reading width preserved. Its four crossings follow the sequence without encoding the approximate durations. The steps and first-person explanation remain attributed to Barney.
3. **Parallel, at contact.** The two strokes share a recognisable bend before settling beside their respective Email actions. On a phone they bend together in the first route's gutter, then plum continues to Eugene; on desktop they share a shallow S in the existing space above the routes before turning into their gutters. No text or prices move, and the page height is unchanged. Reserved space keeps both strands clear of names, subjects, email addresses and actions.

There is one canvas, moved between three reserved anchors as each chapter enters view. The pair is recognisable across those spaces; it never travels across reading text. The former price/profile and pre-review loops are removed. This is a three-moment story rather than five repeated full-width bands.

Swap the ribbons exchanges the over/under relationship and colours in a finite 650ms interaction. Its button and Pause ribbons sit below the lesson steps, in normal page flow. Native buttons work with keyboard and touch. No fixed interactive element covers names, prices, emails or actions.

## Motion and fallback

The renderer only schedules work for scroll, resize, pointer input or the finite swap response. It is idle at rest, skips off-screen drawing, stops in a hidden tab and caps canvas backing resolution at 2x. Reduced motion shows a settled composition at each anchor, with no scroll or pointer deformation; swapping is instantaneous. CSS supplies still strands without JavaScript, while all content and native experience disclosures remain available.

## Verification

Before and final filmstrips were inspected at phone and desktop widths. The final page was also checked in the Orca worktree browser. The strip tool scrolls with actual wheel events under 4x CPU throttling; these are local headless timings rather than physical-phone certification.

| Viewport | Round 1 height / screens | Round 2 height / screens | Round 2 p95 | Overflow / errors |
|---|---|---|---|---|
| 390 x 844 | 6,786px / 8.0 | 6,645px / 7.9 | 6.2ms | 0px / 0 |
| 1440 x 900 | 4,715px / 5.2 | 4,715px / 5.2 | 6.2ms | 0px / 0 |
| 320 x 568 | 7,217px / 12.7 | 7,102px / 12.5 | 6.2ms | 0px / 0 |

Round 2 shortens the 390px page by another 141px and the 320px page by 115px. The shorter portrait ribbon lead-in brings both names 40px earlier: the complete opening ends at 942px at 390 and 943px at 320. Original v3 to final savings are 899px on the 390px phone and 1,074px on desktop. The supplied copy and placeholder comparison passes, as do touch swap, pause/resume, native disclosure, visible skip-link focus, idle rendering, all three ribbon states, the 2x resolution cap, reduced-motion stillness and content without JavaScript. Checks also confirm both painted contact arrivals and their clearance from text, and the wider desktop braid's separation from the steps. The computed-colour scan found no text below 4.5:1, no readable text below 13px and no body text below 16px; it does not replace visual checking of composited backgrounds.

`verification.json` records these functional checks. Reproduce them with:

    node verify.cjs <path-to-playwright-core>

External filmstrips are in `C:/Users/evans/geo/polish-run/film/C2/`; images are not committed. See `polish-notes.md` for the review decisions and final metrics.

## Placeholders and boundaries

All unconfirmed content retains its dotted `span.ph` marker:

- The working site name, Barney & Eugene.
- Eugene's assumed 1-to-1, online via Zoom format.
- Exam boards to confirm and the four full subject-table rates.
- GCSE and A-Level rates in Eugene's opening summary.
- Eugene's supplied placeholder biography.
- Email Eugene and eugene@example.com, including the supplied placeholder mailto.
- Enquiry form, linking to the current contact anchor.

Eugene's missing details still require his input. All reviews and MyTutor figures are clearly Barney's; Eugene's credentials and Ritz Education experience remain his own. No claim, price, result, availability statement or contact route has been invented. The page remains noindex, and the v3 original is untouched.
