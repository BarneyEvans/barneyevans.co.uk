# A2 polish

## Direction
- Preserve Nunito, blue ink, apricot and the attributed student-paced teaching approach.
- Put readable GCSE / A-Level summaries before the faces; use full-width phone price rows.
- Keep exactly three ink scenes: paired response at the portraits, a measured path through the actual lesson markers, and a resolved connector meeting both email actions. Remove the unrelated subject, biography and review curves.
- Keep all claims and full parent reviews, all Eugene placeholders and equal tutor billing.

## Before, required 4× strip runs
| Viewport | Page | Screens | p95 | Overflow | JS errors |
|---|---:|---:|---:|---:|---:|
| 390 × 844 | 6611px | 7.8 | 6.2ms | 0px | 0 |
| 1440 × 900 | 5122px | 5.7 | 6.2ms | 0px | 0 |

Before strips inspected at both widths. Repeated fine curves did not visibly develop; the top summary and price details were physically too small.

## Changes
- Moved the summary directly after Enquire, ahead of the portraits. Each tutor has separate 16px GCSE and A-Level rows, including visibly marked Eugene rate placeholders.
- Replaced the two-column phone subject prices with full-width level rows. Body copy is at least 16px, supporting labels at least 13px. Tested palette text contrasts are 4.67:1 or higher.
- Removed the subject, biography and review drawings. The three remaining scenes share blue ink over an apricot stroke: a loose portrait connector and answering rings; a route through the lesson-number centres with a travelling current marker; a complete contact connector touching both email buttons.
- The portrait mark follows the actual SVG curve. The contact ring sits directly on the finished connector. Expanded experience disclosures trigger fresh layout measurements, keeping later ink aligned.
- The play button occupies its own row. Pause ink has a reserved header slot. Reduced motion presents the completed still geometry; the play button changes ink colour instead of animating.
- Tightened chapter padding, tutor spacing, review gaps and the contact heading without removing either full review, credentials, experience or Barney's teaching copy.

## After, required 4× strip runs
| Viewport | Page | Screens | p95 | Overflow | JS errors |
|---|---:|---:|---:|---:|---:|
| 390 × 844 | 6451px | 7.6 | 6.2ms | 0px | 0 |
| 1440 × 900 | 4478px | 5.0 | 6.2ms | 0px | 0 |
| 320 × 568 | 7014px | 12.3 | 6.2ms | 0px | 0 |

Both main before/after strips and the 320px strip were opened and visually inspected. The 390px page is 160px shorter despite larger body copy and pricing; desktop is 644px shorter. Main strip files are `after-390.png`, `after-1440.png` and `after-320.png` in `C:/Users/evans/geo/polish-run/film/A2/`, with timing JSON alongside. The worktree-scoped Orca browser was also opened and its screenshot inspected; images remain outside Git.

## Final checks
Keyboard pulse (Enter), pause/resume, reduced-motion geometry invariance during scroll and native experience disclosure checks passed. A content audit compared 49 paragraph/list/experience/review blocks against the original: wording is unchanged (ignoring markup whitespace). All three widths have both faces and names within the first two screens, no broken images, no invalid anchors, no labels below 13px, no tested body copy below 16px, three ink scenes and the required noindex directive. The supporting machine-readable audit is `C:/Users/evans/geo/polish-run/film/A2/qa.json`.

The coordinator's “Keep the signature strong” follow-up was reviewed against the final 390px strip. The visible portrait loop, full-height four-stop lesson path with filled current marker, and large contact connector remain present in spare space; this is not reduced to a set of small icons or faint background lines. Blue ink is 3px with an 11px apricot wash, preserving the drawing's character without crossing reading text.

No known visual blocker remains. Eugene's supplied placeholders and the placeholder enquiry form remain intentionally unresolved.
