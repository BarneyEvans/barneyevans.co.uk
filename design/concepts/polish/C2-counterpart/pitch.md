# Counterpart

**Two generous ribbons, two real people: a spacious Manrope composition in plum, rose and blush that gradually weaves itself together.**

Open `index.html` directly. All photographs, the font, its licence, CSS and JavaScript are local to this folder. No build or network connection is needed.

## The visit

On desktop the headline sits centrally, with the tutors on opposite sides of a broad paired ribbon. The lighter, continuous sans-serif headline and pill-shaped portraits give this concept a different rhythm from Soft Assembly. On a phone the headline leads into equally sized portraits, a price summary and the full subject list. Enquire is a normal solid plum button in the header and hero.

Pricing uses two simple, ruled columns. The first open ribbon crossing introduces the tutor profiles. There are equal portraits, names, credential lists and experience disclosures; Eugene's unconfirmed details remain visible. The lesson section becomes a rose-tinted field with four coordinated bends above Barney's explanation. Before the reviews, the strands weave alternately over and under one another. At the final contact section, the complex paths settle into two quiet parallel lines above the two email choices.

## Scroll choreography and interaction

1. **The introduction:** the two broad bands between the portraits change phase as the hero moves through the viewport.
2. **The exchange:** a shallow pair of paths expands into a crossing as the reader moves from prices toward the people.
3. **Back and forth:** four bends pass through the lesson interlude; four small fixed points provide a visual rhythm without encoding lesson duration.
4. **The weave:** open curves become a closer braid above the parent reviews. Drawing order alternates at crossings, so the bands genuinely pass over and under each other.
5. **The resolution:** at contact the oscillations flatten into two aligned strokes, retaining both colours and equal weight.

The signature moment is the braid forming and then relaxing into the parallel contact lines. The changing topology and recurring material make the motion the page's organising idea. These are separate canvases at each chapter, linked by repeated form and choreography; they do not pretend to be a single continuous path behind every section. Text is always stable and readable.

The **Swap the ribbons** button gives a touch and keyboard-accessible exchange of colours and phase. Pointer movement bends the nearby decorative paths slightly. The interaction runs for 700 ms, changes no content and never prevents reading. The button has a visible focus style and an `aria-pressed` state.

## Design decisions

| Obvious route | Chosen route |
|---|---|
| Serif editorial warmth | Locally bundled Manrope with a light, open, continuous rhythm |
| Green buttons and oat | Plum buttons, rose ribbons, pink-white space and deep mulberry text |
| A science diagram with labels | Two solid, tactile colour bands whose relationship is understood through movement |
| A symmetry that repeats everywhere | Centred introduction, offset section headings, open columns and a quieter contact ending |
| An animated waveform decoration | A five-part story: separate, cross, coordinate, weave, settle |

The harvest's paired-response idea informed the interaction. There is no optical simulation, glowing ellipse, particle field, garden, hand-drawn texture or fake scientific claim.

## Motion off and implementation

Reduced motion renders composed still curves at every scene. Scroll and pointer changes are suppressed; the swap becomes instantaneous. All content, native experience disclosures and links work without JavaScript, with blank decorative bands in that fallback.

The renderer uses short sampled polylines and Canvas 2D. There are no animation libraries, CDNs, WebGL shaders or continuous background loops. Off-screen canvases are skipped, hidden tabs stop drawing, pixel ratio is capped at 2, and rAF work is event-driven except for the finite 700 ms button response. No autonomous animation requires a pause control.

The standalone folder is approximately **508 KB before its pitch**, including both real JPEGs, Manrope and its OFL licence. Runtime JavaScript is approximately 9 KB. Both concepts share the tested scheduling code, but every runtime file is copied into each concept so the folder can be moved on its own.

## Verification

Viewed in the Orca worktree browser and headless Chrome at 1440, 390 and 320 CSS pixels, including multiple later scroll positions. At phone widths the run used 4× CPU throttling and a simulated 3× device scale factor; canvas backing stores stayed at 2×. There was no sideways scrolling or JavaScript error. Touch swap, keyboard-compatible native disclosures, the enquiry anchor, all four later scroll transformations, reduced motion, idle stillness and content access without JavaScript passed.

The final 390px 4× run measured approximately **0.7 ms p95 drawing time** and **6.3 ms p95 frame intervals**; the 320px run had a 6.2 ms p95 interval. These are local headless measurements, not physical-device certification. `../verification.json` contains the final measurements after the weave refinement, and `../verify.cjs` reproduces the checks. Screenshots are kept outside the repository in OS temporary storage.

## Placeholders and boundaries

All unconfirmed content has the required dotted `.ph` span:

- `Barney & Eugene`, the working name used in header/footer branding.
- Eugene's assumed `1-to-1, online via Zoom` format.
- `[exam boards to confirm]` on his four subject rows.
- `£XX/hour` on those rows and in his quick-price summary.
- The supplied Eugene placeholder bio, in full.
- His `Email Eugene` button and `eugene@example.com` address; the mailto is the supplied placeholder.
- `Enquiry form`, linking to the current contact anchor without pretending to be a working form.

The exact supplied copyright line is retained. Barney owns the first-person lesson wording, all four approximate lesson steps and both full parent reviews. His overall tutoring-hours claim is separated from the dated MyTutor statistics. Eugene's Imperial, Durham, Kyoto and Ritz Education credentials appear only with him. No invented prices, reviews, results, promises or availability claims are present. Every page is noindex.
