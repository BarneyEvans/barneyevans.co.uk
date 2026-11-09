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
