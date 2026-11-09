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
