# B2 — Wave Study

Rose, sky and plum: a soft wave score that gradually finds its order.

Open `index.html` directly. All photographs, fonts, styles and scripts are local.

## The look

A centred Outfit headline, rounded portrait medallions and two broad translucent ribbons make this the more fluid choice. Open horizontal price bands give way to substantial alternating photo-and-biography chapters. The palette shifts from rose to sky and back to mauve before ending in a clear blue contact section.

It differs from Aperture in composition, type and physical metaphor: broad waves and sampled data replace a rectilinear optical bench and ray tracing. It also avoids the garden studios’ serif/oat/green treatment. The scout’s Studio Feixen reference encouraged spatial play; MoMA’s varied editorial rhythm informed the changes of scale between sections; the harvest supplied the idea of a page surface that changes as you travel.

## Scroll story

1. **Two waves.** Rose and sky ribbons pass behind equal portraits. Their phase changes with scroll; touch or pointer pressure displaces the wave locally and release restores the composed curve. Photos, names and actions stay stable.
2. **Sampling.** At subjects, the continuous wave resolves into discrete ordered marks. This introduces a Computer Science reading of the same physical shape rather than adding a code panel.
3. **Sequence.** The lesson chapter carries the sampled rhythm into the four steps. Small signal bars answer each step’s viewport position; all approximate timings are independent text.
4. **Resolution.** At the closing contact chapter, the marks return to coherent interference rings and a quiet line. The palette has travelled from rose to blue as the wave settles.

**Signature moment:** a broad, touch-responsive wave becomes ordered data as the visitor reaches the practical subject and lesson information.

## Motion off and performance

Reduced motion displays the ribbons, scores, samples and rings as complete still compositions. Native anchors become instant, pointer changes stop, and every section remains visible and readable. There is no autonomous motion: scroll and touch drive the artwork, so no pause control is required.

SVG only, approximately 7 KB of motion JavaScript, no third-party animation library, no canvas and no external requests. One animation frame coalesces events; offscreen scenes are skipped and scheduled work stops in hidden tabs. The standalone folder is about 0.45 MB including both real photographs, two Outfit weights and the font licence.

Reviewed in Orca’s worktree browser and headless Chrome at desktop, 390px and 320px, at the opening and subjects, tutors, lessons, reviews and contact. Phone checks used 4× CPU throttling, with no document overflow, broken images, failed requests or JavaScript errors after the mobile layout corrections. A 180-frame programmatic scroll at 390px/4× recorded no interval over 50ms and a 95th percentile of 12.2ms on this machine; this is local emulation rather than a guarantee for every phone. Touch changed the ribbon path, reduced motion remained stable under pointer movement, visible keyboard focus worked and the native biography disclosure opened with Enter.

The partner’s final 390px / DPR 2 / 4× run measured motion render callbacks at mean 1.57ms, p95 4.50ms and maximum 5.40ms over 180 callbacks. These are JavaScript durations rather than complete paint times. Final computed text-contrast checks found no failures below 4.5:1, and every native anchor target resolves.

## Content status

Factual wording follows `company/copy-v3.md`. Full reviews, MyTutor figures and first-person lesson descriptions belong explicitly to Barney. Eugene’s credentials and Ritz Education experience appear on their own terms.

Visible dotted-underline placeholders:

- Working name: Barney & Eugene.
- Eugene’s Physics and Maths exam boards and all four `£XX/hour` prices, including the hero summary.
- Eugene’s assumed `1-to-1, online via Zoom` format.
- Eugene’s placeholder biography.
- Eugene’s example email address and email action.
- Enquiry form, currently an anchor to contact.

No invented availability, response time, consultation, results or Eugene reviews. No unresolved implementation blocker remains.
