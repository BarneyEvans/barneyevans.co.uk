# Checker review — v3 concepts

Scope: the nine requested standalone `index.html` pages. I extracted rendered HTML text and checked claims, prices, exam boards, review attribution, required links and `.ph` ancestors against `company/copy-v3.md`; headings and labels were treated as allowed new copy. No wording or placeholder edits were necessary. The six content areas are present, both tutors are represented, and the reviews are attributed to Barney throughout.

Method and limits: headless Chrome opened each local file at 320 and 390 CSS pixels with reduced motion, checked document width and JavaScript errors, sampled the first keyboard focus and tapped up to three visible buttons. A separate 390px run used 4× CPU throttling while programmatically scrolling for 1.5s. Its frame intervals are headless scheduling measurements, not a physical-phone smoothness guarantee; this does not replace visual inspection or exhaustive keyboard, touch, clipping and contrast testing. The automated contrast scan checks computed foreground against the nearest opaque CSS background and can miss composited backgrounds, images, gradients, hidden disclosure content and transparency. Decorative elements extending beyond the viewport were excluded where clipped by design. All pages have `noindex`, no document-level sideways overflow at either width, and no page errors in these runs. All tested first-focus skip links had a visible 3px outline; anchor targets and Enquire destinations resolve.

## G1-greenhouse
- Wording, placeholders and content: pass on the extracted content; prices, credentials and Barney review attribution match.
- Scroll and touch: garden seeding/colour changes across chapters and planting respond to scroll and pointer; tested buttons accepted taps.
- Phone and motion off: no document overflow at either width; reduced-motion run loaded without errors. Garden has a pause control. 4× scroll sample: median 6ms, p95 7ms (248 frames).
- Basics: no low-contrast text found by the limited scan; `noindex` and initial focus pass.

## G2-light-garden
- Wording, placeholders and content: pass on the extracted content; prices, credentials and Barney review attribution match.
- Scroll and touch: garden changes across scroll chapters and responds to planting; tested tutor flip buttons accepted taps.
- Phone and motion off: no document overflow at either width; reduced-motion run loaded without errors. The offscreen placeholder flagged by bounding-box scan is on the unflipped reverse face; check the opened reverse face visually for clipping. Garden has a pause control. 4× scroll sample: median 6ms, p95 10ms (249 frames).
- Basics: no low-contrast text found by the limited scan; `noindex` and initial focus pass.

## G3-lab-notebook
- Wording, placeholders and content: pass on the extracted content; prices, credentials and Barney review attribution match.
- Scroll and touch: zoom, chapter changes and garden planting respond to scroll and pointer; tested controls accepted taps.
- Phone and motion off: no document overflow at either width; reduced-motion run loaded without errors; garden has a pause control. 4× scroll sample: median 6ms, p95 7ms (249 frames).
- **Must-fix — contrast:** `style.css` `.pencil`, the small “closer, still…” label, measured 4.40:1 on its opaque background at 390px; darken its colour slightly to reach 4.5:1. `noindex` and initial focus pass.

## A1-good-thread
- Wording, placeholders and content: pass on the extracted content; prices, credentials and Barney review attribution match.
- Scroll and touch: the thread changes through page chapters; the pluck button accepted a tap.
- Phone and motion off: no document overflow at either width; reduced-motion run loaded without errors. Motion is input-driven rather than a perpetual animation. 4× scroll sample: median 6ms, p95 6ms (250 frames).
- Basics: no low-contrast text found by the limited scan; `noindex` and initial focus pass.

## A2-little-by-little
- Wording, placeholders and content: pass on the extracted content; prices, credentials and Barney review attribution match.
- Scroll and touch: marks change through page chapters; the mark button accepted a tap.
- Phone and motion off: no document overflow at either width; reduced-motion run loaded without errors. Motion is input-driven rather than a perpetual animation. 4× scroll sample: median 6ms, p95 6ms (249 frames).
- Basics: no low-contrast text found by the limited scan; `noindex` and initial focus pass.

## B1-aperture
- Wording, placeholders and content: pass on the extracted content; prices, credentials and Barney review attribution match.
- Scroll and pointer: aperture and subsequent optical scenes use scroll progress and pointer input; pointer response was inspected in code rather than physically tested.
- Phone and motion off: no document overflow at either width; reduced-motion run loaded without errors. Motion is scroll/input-driven. 4× scroll sample: median 6ms, p95 6ms (250 frames).
- Basics: no low-contrast text found by the limited scan; `noindex` and initial focus pass.

## B2-wave-study
- Wording, placeholders and content: pass on the extracted content; prices, credentials and Barney review attribution match.
- Scroll and pointer: waves and subsequent scenes use scroll progress and pointer input; pointer response was inspected in code rather than physically tested.
- Phone and motion off: no document overflow at either width; reduced-motion run loaded without errors. Motion is scroll/input-driven. 4× scroll sample: median 6ms, p95 7ms (248 frames).
- **Nice-to-fix — contrast:** `style.css` `.section-index` decorative numbers measured 3.73–4.26:1 against their backgrounds at 390px. They are marked `aria-hidden`; darken the colour if they are intended to be read. `noindex` and initial focus pass.

## C1-soft-assembly
- Wording, placeholders and content: pass on the extracted content; prices, credentials and Barney review attribution match.
- Scroll and touch: multiple canvas scenes respond to scroll; the mosaic rearrange button accepted a tap.
- Phone and motion off: no document overflow at either width; reduced-motion run loaded without errors. Motion is input-driven and finite. 4× scroll sample: median 6ms, p95 6ms (249 frames).
- Basics: no low-contrast text found by the limited scan; `noindex` and initial focus pass.

## C2-counterpart
- Wording, placeholders and content: pass on the extracted content; prices, credentials and Barney review attribution match.
- Scroll and touch: multiple canvas scenes respond to scroll; the ribbon swap button accepted a tap.
- Phone and motion off: no document overflow at either width; reduced-motion run loaded without errors. Motion is input-driven and finite. 4× scroll sample: median 6ms, p95 6ms (249 frames).
- Basics: no low-contrast text found by the limited scan; `noindex` and initial focus pass.
