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
