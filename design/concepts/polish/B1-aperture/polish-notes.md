# B1 Aperture polish notes

## Changes and intent

- Preserved Manrope, blue actions, lilac surfaces, early subject/rate summary, equal portraits and normal Enquire links.
- Added restrained warm porcelain/apricot surfaces and Barney's approved, attributed student-paced quotation. Kept the longer understanding claim in his supporting lesson copy.
- Replaced five repeated optical dividers and a fixed progress rail with one page-length SVG beam: it connects the hero focus, branches into three subjects, feeds each of the four lesson markers, and gathers in a quiet contact halo. Pointer/touch bends the original aperture optics; scroll is the only clock and nothing autoplays.
- At phone widths, put subject headings above separate GCSE/A-Level rate rows. Made body copy 16px or larger and small labels at least 13px, including the opening summary.
- Replaced repeated full-size profile portraits with equal, paired optical portrait windows; kept the early larger faces and visible credentials/DBS text. Shortened section spacing without dropping required claims or reviews.
- Cached motion geometry between layout changes. Hidden tabs cancel scheduled work. Reduced motion draws the complete beam and branches and fixes the optical composition.

## Before evidence

Supplied before strips in C:/Users/evans/geo/polish-run/film/B1/:

| Viewport | Page | Screens | p95 at 4x | Overflow | JS errors |
| --- | ---: | ---: | ---: | ---: | ---: |
| 390 x 844 | 6860px | 8.1 | 6.2ms | 0px | 0 |
| 1440 x 900 | 5472px | 6.1 | 6.2ms | 0px | 0 |

## Milestone verification

Initial scratch strips: 390px page 7052px (8.4 screens), desktop 4755px (5.3 screens), p95 12.1ms for both, no overflow/errors. The phone is 2.8% longer despite substantially larger type; desktop is 13.1% shorter. All essential opening content ends at y775 in a 390 x 844 viewport. Touch changes the ray path, reduced-motion pointer and scroll preserve its still composition, and the native biography disclosure opens correctly. No visible small label under 13px was found by a computed-style scan.

## Final verification

Required after strips were generated and visually inspected at all three widths. The worktree also ran in Orca's embedded browser; its final desktop capture is in `scratch/orca-final.jpg` alongside the interaction audit (`scratch/qa.json`). No images are committed.

| Viewport | Page | Screens | p95 at 4x | Frames over 50ms | Overflow | JS errors |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 390 x 844 | 7355px | 8.7 | 12.2ms | 0.1% | 0px | 0 |
| 1440 x 900 | 5098px | 5.7 | 12.2ms | 0.2% | 0px | 0 |
| 320 x 568 | 7769px | 13.7 | 12.1ms | 0.2% | 0px | 0 |

At 320px the complete opening finishes at y773, inside the first two screens; at 390px it finishes at y775, inside the first screen. Computed text checks found no visible text below 13px or contrast below 4.5:1 at 320, 390 or 1440px. All images loaded and internal anchors resolved. Touch changed the opening ray paths, reduced-motion pointer/scroll kept the optics still, the biography disclosure opened, and Enquire reached `#contact`. `node --check motion.js` and `git diff --check` passed.

Phone subjects now have full-width headings above distinct rates; the continuous beam visibly touches those symbols and all four lesson numbers before settling beside contact. Required reviews, their Barney attribution and source figures, both tutors' approved credentials and all supplied claims remain intact. Motion remains input-driven, so no Pause control is required.

## Left for content approval

No implementation blocker remains. Eugene's rates, boards, format, biography, email and the enquiry form remain visibly dotted placeholders because the brief supplies no final values; the working site name is also marked. These are pre-existing launch-content dependencies, not inferred offers or invented copy.

## Coordinator review: signature strength

The coordinator asked that phone strips retain a clearly present, delightful travelling journey rather than reducing it to small icons and faint background. In response, the same beam now has a restrained luminous sheath and a clearer moving focus; it visibly divides into two generous arched windows around the real paired tutor portraits, continues to larger illuminated lesson markers, and gathers into a warm 66px contact focus with a 102px optical ring. These are branches of the existing page-length beam, not repeated divider scenes. Spare space is reserved around the portraits and above contact; the opening and all reading/action areas retain their hierarchy. A second responsive audit at 320/390/1440 found no overflow, low-contrast text, labels below 13px, broken anchors, unloaded images or JavaScript errors; touch, reduced motion, biography disclosure and Enquire still pass. All three refreshed strips have been visually inspected and their final numbers are recorded above. The final desktop is 6.8% shorter than before; the phone is 7.2% longer with readable type, stacked subject rates and the larger signature moment requested in review. No implementation blocker remains.

## Round 2

### Milestone 1: remove the repeated introduction

Preserved the Round 1 after strips as `r1-390.png` and `r1-1440.png` before editing. Moved the equal optical portrait windows into the profile headings, removing the extra paired scene and duplicated names/subject labels. Credentials and all approved copy remain; phone lesson rows now place time beside the heading and use less vertical padding, and the gap into reviews is shorter. The opening, including its readable 16px rates, is unchanged. Optical branch replacement and new measured verification follow in milestone 2.

### Milestone 2: soft optical fans and final verification

Replaced the long right-angled perimeter with a few curved ray fans. They spread into the subject symbols, fold around the portraits in their actual profile headings, meet all four lesson numbers and reconverge into the warm contact focus. The original responsive aperture remains their source and the same warm moving focus follows each arrival. There is no line through the reviews or around the page perimeter. Phone lesson times share the title line, the markers remain in their reserved left gutter, and chapter gaps are tighter without reducing readable type or removing approved copy. Updated `pitch.md` to describe the final arrangement.

Round 1 PNG headers record 7359px at 390 (the earlier notes recorded 7355px) and 5098px at 1440. Round 2 recovers **498px / 0.59 phone screens** against that supplied Round 1 film, returning to **8.1 screens**, effectively the original v3 length. Desktop recovers 309px. Final filmstrips were overwritten at the required paths and visually inspected, including 320px once.

| Viewport | Page | Screens | p95 at 4x | Frames over 50ms | Overflow | JS errors |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 390 x 844 | 6861px | 8.1 | 6.2ms | 0% | 0px | 0 |
| 1440 x 900 | 4789px | 5.3 | 6.2ms | 0.1% | 0px | 0 |
| 320 x 568 | 7298px | 12.8 | 6.2ms | 0% | 0px | 0 |

The opening completes at y778 at 390 and y780 at 320, preserving the early faces, full names, subjects, separate readable rate lines and Enquire. Automated checks at 320/390/1440 found no small body/rate text below 16px, no readable text below 13px, no computed solid-background contrast below 4.5:1, broken anchors, unloaded images or JavaScript errors. Touch changes the original aperture, the biography disclosure opens and Enquire reaches contact. Reduced-motion screenshots at opening, lessons and contact remain identical across a settled observation; pointer and scroll leave the aperture still. No autoplay or floating controls were introduced. `node --check motion.js` and `git diff --check` pass. The final composition also ran in Orca's embedded browser; final films, scene captures, QA script/results and browser capture stay outside Git in the strips folder and `scratch/r2-*`.

All required credentials, experience claims, Barney's attributed lesson copy and complete reviews remain. No implementation issue remains; the existing dotted launch-content placeholders still require the supplied final content described above. Performance numbers are local 4x-throttled browser evidence, not physical-phone measurements.

## Round 3

Preserved the supplied after strips as `r2-390.png` and `r2-1440.png` before editing. Strengthened just the contact convergence: seven warm/lilac rays now span the existing spare band, pass through a visible aperture and gather in an apricot focus before opening out again. This recalls the opening optics at a comparable visual scale; the scroll arrival draws early enough to be seen as contact enters. No layout or copy files changed. Before/after text-node rectangles and page heights match exactly at 320, 390 and 1440px, including all prices and actions.

| Viewport | R2 → R3 page | Screens | p95 at 4x | Frames over 50ms | Overflow | JS errors |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| 390 x 844 | 6861 → 6861px | 8.1 | 6.2ms | 0% | 0px | 0 |
| 1440 x 900 | 4789 → 4789px | 5.3 | 6.2ms | 0% | 0px | 0 |
| 320 x 568 | 7298 → 7298px | 12.8 | 6.2ms | 0% | 0px | 0 |

Overwrote and visually inspected the required after strips, with one 320px strip run. Phone/desktop scenes and Orca's embedded-browser opening were inspected; all evidence stays outside Git in the strips folder and `scratch/r3-*`. Final QA passes touch, Enquire, biography disclosure, settled reduced-motion screenshots and reduced-motion pointer/scroll checks; no small text, sampled solid-background contrast failures, broken anchors, unloaded images or JS errors were found. `node --check motion.js` and `git diff --check` pass. Motion remains driven only by scroll/input, with no autoplay or floating controls added. Nothing remains for this refinement; existing dotted launch-content placeholders still need final supplied content.
