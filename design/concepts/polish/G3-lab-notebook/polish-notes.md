# G3 polish notes

## Direction and changes

Read the polisher role, brief, approved copy, shortlist, checker and simulated parent panel; inspected both before strips. Continued the useful uncommitted layout cleanup left by the previous worker.

- Removed graph paper, handwriting, specimen codes, tilted/overlapping photo cards and the floating planting toolbar. Preserved cream, sage, lilac, serif headings and the two real photographs.
- Equal upright portraits now accompany the opening offer. Separate GCSE and A-Level rates use 16px text; Eugene's unknown rates remain visibly marked. Full subject tables retain each supplied board/price entry.
- Planting controls sit in page flow, and a reserved simulation area supports touch, Enter and Space. Pause occupies its own place in the sticky masthead. There is no control floating over the reading surface.
- Strengthened the microscope journey after the coordinator's review: one persistent two-species Immigration simulation is viewed as a whole specimen, magnified by the tutor profiles, enlarged to visible nuclei beside the lesson rules, then seen whole around contact. Cells are clipped to reserved spaces rather than scattered across paragraphs.
- The simulation now uses a bounded 48×48 grid. Every lens observes the same live state; scrolling does not start another simulation. Hidden tabs and periods with no visible lens stop evolution/rendering. Reduced motion shows a settled specimen and instant tutor-detail swaps.
- Removed per-scroll inherited CSS-variable updates and layout reads. Canvas draws only visible lenses. This eliminated the measured ~36ms p95 in the initial resumed version.
- Kept required claims and both full Barney reviews, with separate MyTutor source figures. Restored Eugene's MSc qualification, which the earlier uncommitted edit had accidentally removed. Repeated full portraits and repeated prices on the reverse no longer lengthen the page.

## Final measurements

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
