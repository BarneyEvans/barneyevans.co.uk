# G12 Light Greenhouse — polish notes

## Baseline and direction

Read the polisher role, brief, approved copy, G1/G2 shortlist and reviews. Started with an exact copy of polished G2, committed as 189050a. Opened both polished parent phone strips and copied them to film/G12/before-G2-390.png and before-G1-390.png.

Polished G2 baseline: 5749px / 6.8 phone screens, p95 6.2ms; desktop 3957px / 4.4 screens, p95 6.2ms. Polished G1 baseline: 7306px / 8.7 phone screens, p95 12.1ms; desktop 5018px / 5.6 screens, p95 12.2ms. Both parents reported zero overflow and JavaScript errors.

## Synthesis milestone

- Kept G2's compact structure, three early subject summaries, open rows, equal profiles and cream-to-lilac ground.
- Added a shared glasshouse arch around the equal portraits, G1's humane lesson heading and attributed student-paced quotation, and a golden contact arch in the lilac ending.
- Kept one cellular lattice and travelling light. Removed planting/species and subject-selection controls; paired touch response and reserved Pause remain.
- Added progressive stem growth beside the stationary four steps. Timings are explicitly approximate and not proportional.
- Put the light core and optical lens on the garden canvas so measured text masks protect copy from all animated paint. Profiles and prices never move.
- Enlarged subject format, tutor subject, DBS and email copy to 16px. Added G1's supplied Barney experience to an optional native disclosure; kept all full reviews and original claims.

## In progress

First phone film and interaction QA underway. Final required 390, 1440 and 320 strips, reduced motion, keyboard/no-JavaScript checks and Orca preview follow. Missing supplied content remains visibly marked; no implementation blocker at this milestone.

## Visual refinement and interaction QA

The first phone scratch strip measured 5479px / 6.5 screens, p95 6.2ms, zero overflow/errors. It exposed malformed subject-heading closure after removing selection buttons and sharp edges from cutting the optical glow around text. Fixed the headings, then replaced rectangular glow clearing with a measured safe radius: the lens, halo and light core fit inside available whitespace, while cells retain their text mask. The second phone strip is 5624px / 6.7 screens with p95 6.2ms and no overflow/errors; it retains proper open subject rows and a smooth glow.

Opened the Orca desktop preview, both scratch phone strips and the QA phone contact/desktop opening images. The one shared portrait arch, golden contact arch, open rates and stationary text read clearly. QA passed at 390/1440 plus 320 x 568, reduced-motion and JavaScript-disabled checks; both names are within two 320px phone screens. Verified keyboard cell response, pause freezing generation and travel, profile disclosures with faces/DBS staying visible, no extra garden controls, overflow, noindex and real Barney email links. Text contrast against the conservative darkest parent tint measured 4.75:1 to 4.89:1. Phone draw p95 was 2.5ms at 4x CPU; simulation p95 was 2.3ms (function timings, distinct from film frame intervals).

A final small change also freezes the growing stem when Pause is active. Final films and final QA follow.

## Final film evidence

Generated and opened the required real-wheel films at 4x CPU throttle, with screenshots outside the repository:

| Viewport | Final page height | Screens | Median | p95 | Frames over 50ms | Overflow | JS errors |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 390 x 844 | 5624px | 6.7 | 6.1ms | 6.2ms | 0% | 0px | 0 |
| 1440 x 900 | 3765px | 4.2 | 6.1ms | 6.1ms | 0% | 0px | 0 |
| 320 x 568 | 5849px | 10.3 | 6.1ms | 6.2ms | 0% | 0px | 0 |

The 390px page is 125px shorter than polished G2 and 1682px shorter than polished G1. Desktop is 192px shorter than polished G2 and 1253px shorter than polished G1. These measurements are browser/host-specific evidence, not physical-device certification.

Artifacts: C:/Users/evans/geo/polish-run/film/G12/before-G2-390.png and before-G1-390.png; after-390.png, after-1440.png, after-320.png and matching JSON. Scratch films and the Orca preview remain in the scratch subfolder. All final strips were visually inspected for portrait equality, prices, lesson progression, contact warmth and clipping.

## Remaining

No unresolved implementation blocker. Eugene's rates, boards, format, biography and real email, the working site name and enquiry form still need supplied content and remain visibly marked placeholders. Physical-device and human accessibility validation remain launch follow-ups. No push or changes outside this concept folder; no screenshots committed.

Final qa.cjs rerun passed after the Pause/stem fix. Every reachable measured scroll stop lands the light within 3px of its intended point, and the paired-cell keyboard test confirms both cells visibly answer. Final phone diagnostic p95: 2.4ms simulation and 1.9ms draw. No errors in the final 390/1440 interaction runs, 320px opening check, reduced-motion or no-JavaScript checks. Syntax and git whitespace checks passed.

## Round 2 ? reading space milestone

Preserved round-one films as r1-390.png and r1-1440.png before edits. The director's G12 section is the round-two brief; neither polish checker batch includes G12. Read the inherited G1/G2 direction and reviews, approved copy and round-one record.

The header now scrolls away. Synchronized Pause buttons sit in the tutor heading, beside lesson timings and at contact. Extra biographies now open as full-width rows beneath both introductions, retain both faces and credentials above them, and take keyboard focus into the opened text; closing returns focus to the correct opener. No approved claims or placeholder content changed. Motion arrivals and final verification follow.

### Round 2 ? motion milestone and interaction checks

Reserved larger pools around both paired cells, enlarged the lesson markers with a wider phone gutter, and enlarged the golden contact arrival. The same travelling light now dwells at each cell and each lesson stop; the local optical rings brighten with its measured proximity. The text mask still protects copy, prices and actions during transit. Reduced motion keeps settled rings and a complete stem; Pause freezes the traveller and stem as well as cellular growth.

The first round-two films measured 5827px / 6.9 screens at 390px and 3942px / 4.4 screens at 1440px, both p95 6.2ms, zero overflow and zero JavaScript errors. The added 203px on phones and 177px on desktop reserve the arrival and Pause spaces requested by the director. Opened both preview strips and the expanded phone biography capture: the controls occupy their own space, the golden arrival is visible, and extra biography prose uses the full width.

Extended the existing interaction QA for all three synchronized controls, the scrolling header, full-width biography geometry and focus entering the disclosure. QA passes at 390/1440, plus the inherited 320 opening, reduced-motion and no-JavaScript checks. All reachable journey stops are within 3px of their target; paired cells answer keyboard activation; credentials and portraits remain visible; contrast remains 4.75:1 or better against the conservative darkest tint. Phone diagnostic p95 is 2.9ms simulation / 5.3ms drawing at 4x CPU (distinct from frame intervals). Final films follow.

### Round 2 ? final evidence

Overwrote and visually inspected after-390.png, after-1440.png and after-320.png using the required real-wheel film tool at 4x CPU, with matching JSON outside Git. Opened the Orca worktree preview and inspected its screenshot as well.

| Viewport | Round 1 height / screens | Round 2 height / screens | Median | p95 | Frames over 50ms | Overflow | JS errors |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 390 x 844 | 5624px / 6.7 | 5827px / 6.9 | 6.1ms | 6.2ms | 0.1% | 0px | 0 |
| 1440 x 900 | 3765px / 4.2 | 3942px / 4.4 | 6.1ms | 6.2ms | 0.1% | 0px | 0 |
| 320 x 568 | 5849px / 10.3 | 6091px / 10.7 | 6.1ms | 6.2ms | 0.2% | 0px | 0 |

Final outcome: all three requested director changes are implemented, the opening retains early readable rates and equal portraits, all approved copy and full reviews remain, and no control floats over content. Round-one captures remain available as r1-390.png and r1-1440.png. Final source syntax and git whitespace checks pass; implementation milestones are 888989b and c315972.

No implementation blocker remains. The supplied-content placeholders and real-phone/human validation listed in round one remain launch follow-ups. Only this concept folder changed, with no push and no screenshots committed.
