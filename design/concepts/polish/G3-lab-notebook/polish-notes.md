# G3 polish notes

## Direction and changes (Round 1)

Read the polisher role, brief, approved copy, shortlist, checker and simulated parent panel; inspected both before strips. Continued the useful uncommitted layout cleanup left by the previous worker.

- Removed graph paper, handwriting, specimen codes, tilted/overlapping photo cards and the floating planting toolbar. Preserved cream, sage, lilac, serif headings and the two real photographs.
- Equal upright portraits now accompany the opening offer. Separate GCSE and A-Level rates use 16px text; Eugene's unknown rates remain visibly marked. Full subject tables retain each supplied board/price entry.
- Planting controls sit in page flow, and a reserved simulation area supports touch, Enter and Space. Pause occupies its own place in the sticky masthead. There is no control floating over the reading surface.
- Strengthened the microscope journey after the coordinator's review: one persistent two-species Immigration simulation is viewed as a whole specimen, magnified by the tutor profiles, enlarged to visible nuclei beside the lesson rules, then seen whole around contact. Cells are clipped to reserved spaces rather than scattered across paragraphs.
- The simulation now uses a bounded 48×48 grid. Every lens observes the same live state; scrolling does not start another simulation. Hidden tabs and periods with no visible lens stop evolution/rendering. Reduced motion shows a settled specimen and instant tutor-detail swaps.
- Removed per-scroll inherited CSS-variable updates and layout reads. Canvas draws only visible lenses. This eliminated the measured ~36ms p95 in the initial resumed version.
- Kept required claims and both full Barney reviews, with separate MyTutor source figures. Restored Eugene's MSc qualification, which the earlier uncommitted edit had accidentally removed. Repeated full portraits and repeated prices on the reverse no longer lengthen the page.

## Final measurements (Round 1)

Required strip tool, real wheel scrolling, 4× CPU throttle:

| Strip | Height | Screens | p95 | Overflow | JS errors |
|---|---:|---:|---:|---:|---:|
| Before 390×844 | 6980px | 8.3 | 36.3ms | 0px | 0 |
| Before 1440×900 | 5441px | 6.0 | 30.3ms | 0px | 0 |
| After 390×844 | 6047px | 7.2 | 6.2ms | 0px | 0 |
| After 1440×900 | 4304px | 4.8 | 6.2ms | 0px | 0 |
| After 320×568 | 6442px | 11.3 | 6.2ms | 0px | 0 |

The refreshed final QA run passed 40 checks: overflow sweeps at 320/390/1440, both detail flips and focus transfer, touch and keyboard planting, pause stability, reduced motion, no-JavaScript content, early people/rates and no browser errors. Visible-window canvas draw p95 was 1.4ms / 2.4ms / 1.1ms at the opening dish, lesson lens and contact; generation-step p95 was 4.8ms / 0.4ms / 0.3ms. Each window sampled 71–72 renders and 3–4 generation steps at DPR 2 with 4× CPU throttle. These are synthetic headless results, not real-device guarantees.

Inspected final 390/1440 strips and the 320×568 strip, including the smaller phone's wrapped email buttons and rates. Reviewed the final worktree-scoped Orca preview as well. All required after PNGs and matching JSON measurement files are outside Git under `C:/Users/evans/geo/polish-run/film/G3/`. Updated pitch.md to describe the polished implementation rather than the old notebook layout.

## Remaining production content

The polish and required validation are complete. Production content remains intentionally unresolved: site name; Eugene's rates, exam boards, format, biography and real email; enquiry form. All supplied placeholders remain visibly marked; no missing facts were invented.

## Round 2

Read the polish shortlist and G3 checker report, then preserved the Round 1 after PNGs as `r1-390.png` and `r1-1440.png` outside Git before editing.

- The masthead now scrolls away on phone and desktop. Four synchronised Pause/Grow controls occupy document flow beside the opening, tutor, lesson and contact lenses.
- Pattern choices and the cell-rule explanation now live in a closed native “Try an experiment” disclosure. The microscope scenes remain visible without opening it. Touching the default scene briefly looks closer; opening the disclosure enables touch/keyboard planting.
- One mixed-species six-cell beehive is the recognisable reference in every view. Its distinctive sage cell has a paired lilac nucleus: the tutor lens enlarges the cluster, the lesson lens centres that cell and opens its nucleus, and contact returns to the whole cluster above the email actions. No magnification labels are needed.
- The stable reference has an empty moat isolating it from the optional evolving experiment. Other cells share the persistent bounded grid; no scrolling reseed is used. Reduced motion shows the same settled scale views, without growth or touch zoom.
- Scene geometry is refreshed when document size changes, including an opened experiment or biography, without reseeding the grid.

First Round 2 scratch phone film: 6381px / 7.6 screens, p95 6.2ms, 0px overflow, 0 browser errors. Visual review found the new lens control rows added unnecessary height. Placing Pause beside each lens and tightening chapter, price-row and lesson gaps recovered that space without changing the approved offer, credentials, reviews or body sizes. The final phone is 5px shorter than Round 1; the desktop adds 215px for the more visible lens story and contact return.

### Round 2 final measurements

Required real-wheel strip tool at 4× CPU throttle:

| Strip | Round 1 height / screens | Round 2 height / screens | p95 | Overflow | JS errors |
|---|---:|---:|---:|---:|---:|
| 390×844 | 6047px / 7.2 | 6042px / 7.2 | 6.2ms | 0px | 0 |
| 1440×900 | 4304px / 4.8 | 4519px / 5.0 | 6.2ms | 0px | 0 |
| 320×568 | 6442px / 11.3 | 6336px / 11.2 | 6.2ms | 0px | 0 |

All final films have a 6.1ms median and 0% frames over 50ms. Visually inspected the final 390, 1440 and 320 strips, the tutor/lesson/contact scale transitions, and the worktree-scoped Orca preview. The required after PNGs and their JSON measurements are overwritten in `C:/Users/evans/geo/polish-run/film/G3/`; preserved Round 1 PNGs remain beside them.

`verify.mjs` passes **47 checks**, including six-position overflow sweeps at 320/390/1440, both profile turns and focus transfer, disclosure closed by default, visible lens scenes outside the disclosure, default touch without accidental planting, optional touch/Enter/Space planting, four synchronised Pause controls, a scrolling phone header, early 16px rates and named faces, approved credentials/review figures, noindex, no-JavaScript biographies and zero browser errors. A 1.1-second canvas comparison confirms the enlarged nucleus is completely still in reduced motion. At 390px/DPR 2/4× CPU, visible-window draw p95 is 1.0 / 1.0 / 0.8ms (opening / lessons / contact), with generation-step p95 6.3 / 0.6 / 1.0ms. These remain synthetic local measurements.

Round 2 is complete. Production content remains as listed above, visibly marked; no supplied facts or reviews were replaced or invented.
