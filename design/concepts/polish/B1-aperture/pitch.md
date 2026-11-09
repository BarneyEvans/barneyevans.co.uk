# B1 — Aperture

Porcelain, lilac and ink blue: a calm optical instrument with two real people at its centre.

Open `index.html` directly. There is no build step, CDN, API or external font request.

## The look

Manrope gives this a precise contemporary voice. The asymmetrical opening sets a readable headline against two equally sized portrait windows. Fine lens planes and apricot rays refer to Eugene’s optics work without turning the page into a science demonstration. Prices are visible in the opening, followed by three open subject columns, a paired tutor chapter, lesson steps, full parent reviews and direct email contact.

This deliberately takes a different direction from the garden studios: sans serif, porcelain and lilac, blue actions, and architectural planes rather than green, oat, serif or a glass sphere. ZEISS informed the practical clarity; the harvest’s travelling-light and shared-path ideas became a connected optical journey.

## Scroll story

1. **Focus.** The hero lens planes narrow and shift as the page moves. Parallel rays meet at a focal point above the portraits and split again. Moving a pointer or touching the visual bends the ray bundle within a bounded range.
2. **Branches.** The subjects chapter opens the beam into separate paths. Fine scroll-drawn branches physically meet the three subject symbols; on a phone they form a quiet vertical optical spine beside the rows.
3. **Understanding.** The same line construction joins the four Computer Science lesson steps. Light reaches each numbered step with its position in the viewport. The approximate timings remain plain text, never a duration chart.
4. **Gather.** The lower optical scores tighten as the visitor approaches contact, where the ray bundle converges. A fine margin rail keeps the chapters connected throughout the native scroll.

**Signature moment:** the beam becomes three actual paths into the subject choices, then a four-step lesson path. The artwork touches the content instead of living in a separate widget.

## Motion off and performance

Reduced motion fixes every scene at a composed still position, draws the branch paths fully, removes the travelling margin indicator and disables animated scrolling/transitions. All copy, prices, portraits and controls are present immediately. Scroll and touch are the only clocks: there is no autoplay or perpetual animation, so no pause control is needed.

SVG only, approximately 10 KB of motion JavaScript, no animation library, no canvas or pixel-ratio cost. Geometry reads are grouped before writes; visible scenes update through one coalesced animation frame; hidden tabs cancel scheduled work and offscreen scenes stop drawing. The whole standalone folder is about 0.53 MB, including the two real photographs, two local font weights and their licence.

Reviewed running in Orca’s worktree browser and headless Chrome at desktop and multiple scroll positions. Phone QA covered 390px and 320px at 4× CPU throttling: no horizontal overflow, missing images, failed requests or JavaScript errors. A 180-frame programmatic scroll at 390px/4× had no frame interval above 50ms, with a measured 95th percentile of 18.3ms on this machine; this is a local emulation result, not a device guarantee. Touch altered the hero path, reduced motion stayed still under pointer movement, and keyboard focus and the native biography disclosure worked.

After the partner’s final optimisation, a separate 390px / DPR 2 / 4× run measured motion render callbacks at mean 1.33ms, p95 2.50ms and maximum 3.00ms over 180 callbacks. These are JavaScript durations, not whole-frame paint measurements. Final computed text-contrast checks found no failures below 4.5:1; native anchor targets all resolve.

## Content status

All factual wording comes from `company/copy-v3.md`. Reviews and first-person lesson descriptions are explicitly Barney’s. The 300+ hours / 5.0 score remains separate from the MyTutor figures.

Visible dotted-underline placeholders:

- Working name: Barney & Eugene.
- Eugene’s Physics and Maths exam boards and all four rates (`£XX/hour`), also summarised in the hero.
- Eugene’s assumed `1-to-1, online via Zoom` format.
- Eugene’s placeholder teaching biography.
- Eugene’s example email address and associated email action.
- Enquiry form, which links to `#contact` until a real form exists.

No availability, response time, consultation, grade outcome or review for Eugene is assumed. No unresolved implementation blocker remains.
