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
