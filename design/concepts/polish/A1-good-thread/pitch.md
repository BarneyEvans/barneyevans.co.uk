# A1 — A good thread

A lilac, raspberry and apricot homepage that feels gently stitched together, with rounded human typography and real portrait medallions.

## The idea
The obvious warm-tutor direction is an elegant serif, oat background and green button. This takes a different route: locally bundled Nunito and DM Sans, plum ink, lilac cloth, raspberry actions and irregular stitched portrait surrounds. The wide split composition puts both people beside the headline, with subject/price shortcuts immediately below. The remaining page alternates open lists, portrait introductions, a stitched lesson map and full parent quotations, without a stack of outlined cards.

## Scroll story
1. In the opening, a raspberry thread joins both portrait medallions. A moving bead follows the thread as the native scroll advances; the faces and names are present immediately.
2. At subjects, the thread becomes a shared branch across the three subjects on desktop, and travels the outside margin beside them on a phone.
3. At the introductions it links the real people, staying in the outer gutter on narrow screens. The text never moves or waits to be revealed.
4. In Barney's lesson section it becomes a loose seam through Recap, Live Teaching, Practice and Wrap Up. Each numbered point receives emphasis in turn; the timings remain ordinary approximate text, not a proportional chart.
5. A small drawn underline introduces Barney's reviews, then the thread resolves into a centred knot above the two contact routes.

The signature moment is the ordinary list becoming a stitched lesson path, connected visually to the two faces at the start. The optional “Pluck the thread” button gives the line a brief spring response through pointer, touch or keyboard.

## Motion off and weight
Reduced motion draws every complete path in its resting composition and removes travelling beads and step emphasis. The optional button switches ink colour without movement. There is no ambient loop, no scroll-jacking and no content hidden behind animation; active play lasts 1.25 seconds. Frames are requested only for scrolling, resizing or that short response, with off-screen and hidden-tab work suspended.

The standalone folder is approximately 0.52 MB including two real photos, two local fonts and their licences. It uses SVG and CSS with no libraries, CDN, canvas, build step or runtime network dependency. The motion engine is shared in implementation with A2 but uses progressive stitching rather than A2's curve morph.

## Verification
Viewed in the worktree-scoped Orca browser and headless Chrome at desktop and phone widths, at the hero, subjects, tutors, lessons, reviews and contact. Layout checks pass at 320, 390 and 1440 px with no horizontal overflow, missing images or JavaScript errors. The 390px run used 4x CPU throttling. Exact headline, review count, placeholder markers, internal links, disclosure controls, contact anchors and keyboard skip link were checked. Tested text/background combinations have a minimum contrast of 4.81:1; white button text is 7.69:1. See ../verification.json, ../content-audit.json and ../DUO-NOTES.md for recorded checks and motion measurements. Emulated throttling is a proxy, not a physical-device measurement.

## Placeholders and assumptions
- The working site name, Barney & Eugene, is marked with .ph.
- Eugene's GCSE and A-Level Physics and Maths prices remain £XX/hour, and their exam boards remain [exam boards to confirm].
- Eugene's 1-to-1, online via Zoom format remains an explicitly marked assumption.
- Eugene's supplied placeholder bio is visible and marked.
- Eugene's email address and Email Eugene action are marked placeholders using the supplied example mailto address.
- Enquiry form is a marked placeholder linking to #contact; no form is implied to exist.
- All reviews, MyTutor figures and lesson descriptions are explicitly Barney's. The 300+ hours figure remains separate from the MyTutor figures.

## References used
The Swash London textile case study suggested a material journey rather than a generic decorative background; Storyboat suggested readable illustrated spreads. Gucha Gucha and Form Play supported the restraint of a small recurring hand-drawn vocabulary. Links and verification limits are in ../scout-report.md.

### Final throttled motion measurement
The motion partner's final Chromium 156 run used 390px width, CDP 4x CPU throttling and a 120-frame native-scroll sweep. A1's scheduled JavaScript callback cost was 0.7ms at p95 and 1.2ms maximum; its single setup callback after fonts were ready took 22.3ms. Tap and Enter responses settled after 1.25 seconds, with no continuing idle callbacks; reduced-motion geometry remained unchanged during scroll. These measurements support the light implementation but do not claim physical-handset frame rates.
