# G2 Light Garden polish

## Round 1 implementation

Read the role, brief, approved copy, G2 shortlist/checker/panel and original pitch; inspected both before strips. Preserved cream-to-lilac colour, real two-species cellular garden, open subject rows and both full Barney reviews.

- Replaced the abstract opening lens with two equal named arched portraits beside the desktop headline; phone rates remain before portraits, with separate GCSE and A-Level lines for both offers.
- Moved planting/species controls into an optional page-flow garden area. Pause occupies a reserved sticky header row. Body copy is 16px or larger; supporting labels are at least 13px.
- Main qualifications and DBS are visible. More buttons expand extra details beneath each person, keeping the faces and names stable and all animation clear of text.
- Added the approved student-paced quote attributed to Barney and retained his original understanding/core-concepts wording as body copy.
- Replaced competing contours and the wide caustic with one small travelling light: paired tutor cells, quiet margin passage, four stationary lesson markers, and a contact resting ring. Touch or keyboard activation of either cell answers in its partner.
- Garden simulation now sleeps offscreen rows; reduced motion is still, Pause freezes the traveller and simulation, and hidden tabs stop the loop.

## Measurements

Before 390 x 844: 5271px / 6.2 screens, median 6.1ms, p95 18.2ms, overflow 0px, JS errors 0.
Before 1440 x 900: 4802px / 5.3 screens, median 6.1ms, p95 18.3ms, overflow 0px, JS errors 0.
First scratch phone strip: 5573px / 6.6 screens, p95 6.2ms, overflow 0px, JS errors 0. Larger readable type costs height; spacing has since been tightened. Its light crossed a review during interpolation, now corrected with a second margin waypoint.

Opened the live page in this worktree's Orca browser and inspected its desktop screenshot. All film and QA images stay outside the repository under C:/Users/evans/geo/polish-run/film/G2/.

## Next

Run final strips at 390, 1440 and 320, inspect the final route, update interaction QA and record final measurements. Eugene's rates, boards, format, bio and email, the enquiry form and working site name remain visibly marked placeholders awaiting supplied content.

## Final validation - 9 November 2026

Final strips generated with the required real-wheel strip.cjs at 4x CPU and opened for visual review:

| Viewport | Before page / screens | After page / screens | Before p95 | After p95 | Overflow | JS errors |
| --- | --- | --- | --- | --- | --- | --- |
| 390 x 844 | 5271px / 6.2 | 5417px / 6.4 | 18.2ms | 6.2ms | 0px | 0 |
| 1440 x 900 | 4802px / 5.3 | 3767px / 4.2 | 18.3ms | 6.2ms | 0px | 0 |
| 320 x 568 | Not supplied | 5722px / 10.1 | Not supplied | 6.2ms | 0px | 0 |

All three final strips recorded median 6.1ms and 0% of frames over 50ms. Phone length is 146px (2.8%) longer than before because qualifications are exposed and formerly tiny copy is readable; desktop is 1035px (21.6%) shorter. Both names/faces, subjects, rates and Enquire appear inside the first two phone screens. No floating planting controls cover names, prices or contact. The single light's return from the last lesson marker and its final contact approach stay along reserved paths.

Files: after-390.png, after-1440.png and after-320.png plus matching JSON in C:/Users/evans/geo/polish-run/film/G2/.

Updated qa.cjs passed at 390 and 1440, with additional 320, reduced-motion and JavaScript-disabled runs. Checks cover pause stability, garden-area planting, selected species, paired touch response, both tutor disclosures, portraits and DBS remaining visible, reduced-motion stillness, noindex, email/anchor links and zero uncaught errors. The phone diagnostic sample at 4x CPU measured generation p95 3.3ms and drawing p95 2.9ms; film p95 above measures frame spacing rather than those function durations. Inspected the expanded Eugene screenshot: full-size readable copy remains available beneath his front credentials.

Git diff whitespace check passed. No source/v3 files or images were changed or committed; all changes are within this concept folder.

## Remaining

Round 1 implementation and verification are complete. No unresolved code blocker. Eugene's four rates, boards, format, biography and real email, the final site name and enquiry form remain supplied-copy placeholders; real-device and human screen-reader checks remain launch follow-ups. All reviews still describe Barney only.

## Round 2 - visible garden character

The coordinator's after-strip review found that round 1 had quietened the signature too far. The second pass retains equal early portraits, exposed qualifications/DBS, in-flow planting and the reserved Pause header, while restoring visible colonies, optical light and lilac dusk.

- Removed the nearly opaque section backgrounds that were hiding most of the canvas. Strengthened mint and violet cell sprites; cells now occupy actual whitespace between text fragments, rather than being excluded by the full width of every paragraph.
- Precompute a lattice mask from measured text fragments, photos and controls, including the full sprite radius. Colonies never draw under those protected areas. This also avoids repeated text-rectangle searches on each frame.
- Added living colonies around the paired tutor cells, the optional planting area and contact. A cached luminous optical field follows the same traveller, with one local caustic ellipse; the light meets stronger paired cell halos, follows a clearly visible four-marker stem, then enters a larger warm contact bloom.
- Deepened the cream-to-lilac background. Darkened supporting text and coloured headings so their foregrounds exceed 4.5:1 even against the darkest optical tint (#b5a2cf); these are conservative solid-colour calculations, since the actual fields are translucent.
- Replaced the two-column phone summary with three full-width subject rows: Computer Science, Physics and Maths. Each row has separate GCSE / A-Level lines, 18px prices and 16px level labels; placeholders remain marked.
- Enlarged desktop portraits from 220px to 320px tall and gave the paired tutors a larger share of the opening width. The clearer phone layout still puts both names and faces inside two screens.

Scratch strips: 390 x 844 = 5749px / 6.8 screens, p95 6.2ms; 1440 x 900 = 3957px / 4.4 screens, p95 6.2ms; both zero overflow and JavaScript errors. Final films, interaction/contrast QA and 320px inspection follow below.

## Round 2 completion - 9 November 2026

The replacement worker reviewed the coordinator's g2-r2.txt, the role and source brief, the before strips, commit f40a744 and the remaining uncommitted pitch changes. The implementation already satisfies all three round-2 requests; no additional product-code changes were needed. Preserved and completed the pitch update rather than discarding the predecessor's work.

Verified each requested result:

1. Mint and violet colonies are clearly visible in the phone and desktop films, with protected reading space, a luminous optical field and a deeper lilac ending. The paired portrait cells, four lesson markers and warm contact bloom are visible at their respective scroll stages. A direct 390px scroll-position check reached both paired cells, all four markers and the contact stop within 0.003px of the intended centers; contact reached its full bloom value of 1.00. The quiet-mask calculation includes the entire cell sprite radius around text fragments and protected controls/photos.
2. Computer Science, Physics and Maths each occupy their own opening summary row, with separate GCSE and A-Level lines. Automated layout checks confirm full-width rows and 18px prices; level labels are 16px. Both names and faces remain early, and no floating planting toolbar covers the offer.
3. Equal desktop portraits are 320px tall and occupy the larger right-hand opening column. The desktop film shows the people beside the headline and rates, with the qualifications and DBS still visible.

Overwrote and opened all three final strips and their matching JSON files in C:/Users/evans/geo/polish-run/film/G2/ using the required real-wheel tool at 4x CPU:

| Viewport | Final page height | Screens | Median | p95 | Frames over 50ms | Overflow | JS errors |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 390 x 844 | 5749px | 6.8 | 6.1ms | 6.2ms | 0% | 0px | 0 |
| 1440 x 900 | 3957px | 4.4 | 6.1ms | 6.2ms | 0% | 0px | 0 |
| 320 x 568 | 6065px | 10.7 | 6.1ms | 6.2ms | 0% | 0px | 0 |

The larger phone rate summary and restored garden space add 332px to round 1 at 390px; desktop remains 845px shorter than the original before strip. This is the deliberate readability/character tradeoff requested in round 2.

qa.cjs passed at 390px and 1440px, plus its 320px, reduced-motion and JavaScript-disabled checks. It verified pause, planting, species choice, paired response, disclosures, preserved portraits/DBS, noindex, contact links and zero uncaught errors. The three foreground colors against the conservative darkest optical tint measured 4.75:1 to 4.89:1. Reduced motion remains planted and still, with no visible travelling light. Phone diagnostics at 4x CPU measured generation p95 2.9ms and drawing p95 2.2ms; these are function durations, separate from film frame spacing.

Final artifacts: after-390.png, after-1440.png and after-320.png with matching JSON; interaction screenshots and results.json are under the OS temporary g2-light-garden-qa directory. No images were committed. All round-2 notes are complete, with no unresolved implementation blocker; the supplied-content placeholders and real-device/screen-reader launch follow-ups listed above remain unchanged.
