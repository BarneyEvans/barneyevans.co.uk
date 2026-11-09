# Soft Assembly

**A quietly playful digital mosaic: rounded Outfit type, periwinkle, apricot and pieces that find their place as you scroll.**

Open `index.html` directly. This folder contains all its photographs, font, styles and JavaScript. It makes no network requests.

## The visit

The first view pairs a clear, rounded headline with two equally sized real portraits, framed by a changing arrangement of coloured tiles. The solid periwinkle Enquire button is immediate; a compact price summary and anchor navigation keep the practical information close. Prices sit in open columns, with each tutor clearly named. A bridge made from the same tiles carries the eye into the two full profiles, with native disclosures for the longer experience lists.

The lesson section changes the page to pale periwinkle. The pieces become four little staircases above Barney's teaching description and approximate lesson timings. They reorganise again into two large, pixel-like quotation marks before the full parent reviews, explicitly about Barney. At contact, both colours make an open doorway beside the email choices. Pale apricot gives this ending its own atmosphere.

## Scroll choreography and interaction

1. **Portrait mosaic:** tiles change their offsets and rotation with the hero's position. Both faces and all labels are ordinary, stable HTML.
2. **Bridge:** scattered rows assemble into a broad two-colour arch in the transition from subjects to tutors.
3. **Staircases:** four groups settle into ascending arrangements at staggered scroll positions. The four shapes have equal size; they are not a duration chart.
4. **Quotation marks:** a horizontal arrangement gathers into two large quotation-mark forms before the reviews.
5. **Doorway:** two columns straighten and separate into an opening at contact.

The signature sequence is bridge → staircases → quotation marks: one visual vocabulary repeatedly acquires a new purpose. All five scenes respond to native scroll position, including reverse scrolling; none uses a fade-and-slide reveal. Each scene is a separate, visible canvas rather than one persistent object physically travelling through the entire DOM.

Moving a pointer across the hero or interludes gently perturbs the composition. The **Rearrange the mosaic** button exchanges the two decorative colour arrangements in 700 ms. It works with touch, Enter and Space, exposes its state with `aria-pressed`, and changes no tutor attribution or content.

## Design decisions

| Obvious route | Chosen route |
|---|---|
| An elegant serif heading | Locally bundled Outfit, with rounded geometric letterforms and a moderate weight |
| Oat and dark green | Near-white lilac, periwinkle, apricot and deep blue-violet text |
| The same outlined card for every section | Open pricing columns, plain profiles, a full-width lesson surface and generous quotes |
| A loading or construction metaphor | All content available immediately; only the decorative geometry assembles |
| A toy isolated in the hero | Five related geometric scenes distributed from portraits to contact |

The harvest's assembly idea and paired response were useful. There are no garden cells, stems, glowing rays, fake technical interfaces or generated people.

## Motion off and implementation

With `prefers-reduced-motion`, each canvas renders one composed still arrangement and no longer follows scroll or pointer motion. The swap button changes the arrangement immediately. Native scrolling, anchor links, visible keyboard focus and all disclosures remain available. Without JavaScript the content and disclosures still work, although the decorative canvas bands are blank.

There is no animation library, WebGL, CDN or perpetual animation loop. Canvas backing resolution is capped at 2×. IntersectionObserver excludes off-screen scenes; requestAnimationFrame is scheduled only after scroll, resize, pointer activity or the finite 700 ms interaction. Hidden tabs cancel scheduled drawing. Nothing runs by itself for more than five seconds, so no ongoing-animation pause control is needed.

The standalone folder is approximately **446 KB before its pitch**, including both supplied JPEGs and the local variable font with its OFL licence. Runtime JavaScript is approximately 9 KB, shared source but copied locally so this folder remains portable.

## Verification

Viewed in Orca's worktree browser and in headless Chrome at 1440, 390 and 320 CSS pixels, at the hero, prices, profiles, lessons, reviews, contact and the motion interludes. Phone checks used 4× Chromium CPU throttling and a 3× device scale factor; the canvas correctly capped that at 2×. The automated check found no horizontal overflow or JavaScript errors, exercised touch swapping, both native disclosures, the enquiry anchor, all four later scroll transformations, reduced motion, idle stillness and no-JavaScript access.

The measured 390px 4× run recorded approximately **1.0 ms p95 drawing time** and **6.2 ms p95 frame intervals**. These are headless measurements on this computer, not a guarantee for every physical phone. The exact final measurements are in `../verification.json`, and `../verify.cjs` reproduces them. Screenshots are in OS temporary storage and are not committed.

## Placeholders and boundaries

Every unconfirmed item uses a visible dotted `.ph` span:

- Working name `Barney & Eugene` in the header and footer brand.
- Eugene's `1-to-1, online via Zoom` format.
- All four Eugene exam-board entries: `[exam boards to confirm]`.
- All four Eugene prices and his quick-price summary: `£XX/hour`.
- Eugene's complete supplied placeholder bio.
- `Email Eugene` and `eugene@example.com`; its mailto remains the supplied placeholder address.
- `Enquiry form`, which links to `#contact` and does not submit anything.

The required copyright line retains the supplied working name exactly. The lesson description and timing list are attributed to Barney. His 300+ hours statement remains separate from the MyTutor figures, and both reviews retain their full text and source links. No Eugene reviews, availability, grade promises, consultation claims or invented rates have been added. This is a noindex concept, not a deployed production form.
