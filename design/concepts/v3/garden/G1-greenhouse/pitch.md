# G1 — Greenhouse

A bright glasshouse on a spring morning: real faces, oat and cream, sage seedlings and lavender flowers, with a little computational magic growing quietly around the edges.

## The experience

The opening is deliberately human. Both approved photographs appear side by side, with equal space, names and subjects. The serif has the familiarity of a well-loved book; everything else is quiet, clear sans-serif. A glass arch shelters the portraits. The main Enquire link is a normal solid button, and the subject/price summary is immediately below. On a phone both faces and names fit within the first two screens, with an immediate price anchor in the header and hero.

There is no library, remote font, CDN, build step, network request, generated person or simulated enquiry form. Open `index.html` directly. The real photographs are copied into `assets/`.

## Scroll story, moment by moment

1. **Morning seedlings.** A few sage gliders and a lavender pulsar live beside the first screen. Thin glass panes carry the diagonal morning light. The actual cellular world is in document coordinates, so scrolling travels through it rather than restarting a background.
2. **The beds fill.** Entering subjects plants fuller beds at their document positions. The two offers sit on solid sage and lavender surfaces. Text never shares a transparent surface with changing cells. Gliders and pulsars develop along the open margins.
3. **Shared ground.** Before the tutor cards, both colonies are planted together in the open garden crossing, with a deliberate interacting border. This is the point where the separate populations meet in one world, rather than two unrelated canvases. Selecting a subject or tutor brightens that species and lets the other recede.
4. **Small steps.** Alongside Barney's lesson description, the numbered leaf-shaped markers fill and their connecting stem grows according to scroll position. Timings are plain labels, never a proportional bar. This combines a legible explanation with a quieter echo of the garden's growth.
5. **Golden afternoon.** Across the whole journey the light moves sideways and rotates, the glass panes shift, and the ambient light warms. The sun settles into the contact area's golden arch. Both email actions receive equal space.

These moments use native scrolling, with no pinned reading, delayed content or scroll interception. The scroll seeding is one-time and cumulative: reversing scroll revisits the same changed garden. The solver can evolve the entire bounded world, while the renderer only draws the visible rows; no offscreen cell animation is rendered.

## Signature moment

Open either tutor card. A mosaic of that tutor's cells blooms across the face, then reforms as their details. The revealed heading receives focus and the card returns to its beginning when needed, so a parent sees the start of the new content. Opening the other tutor gives the same treatment and importance. With motion off, the swap and navigation are immediate. Both sides remain in the accessibility tree; visually concealed back-side links leave the keyboard order until opened. Without JavaScript both complete profiles are displayed.

Then try a little planting: switch **Plant: Barney / Eugene**, tap an open part of the garden, or use **Plant +** from the keyboard. Sage rounded squares plant Barney's actual five-cell glider; lavender circles plant Eugene's actual 48-cell pulsar. The shapes, as well as the colours, distinguish the species. These are interface and decorative patterns, not teaching claims.

## The garden underneath

One finite typed-array grid implements Conway's B3/S23 rules. A living cell survives with two or three neighbours; an empty cell is born with exactly three. Births inherit the majority species of their three parents under Immigration Life. Surviving cells retain their species. No random particles or prerecorded growth substitute for the simulation. Soft 560ms births and deaths, at one generation per 1,050ms, keep the changes gentle.

The always-reachable Pause control stops automatic growth. Hidden tabs cancel the simulation timer and drawing frames. The grid adapts to the document with at most 141 columns and approximately 900 rows; canvas pixel ratio is capped at 2. Scroll and resize work is coalesced. Cell transitions request frames only while an actual transition is underway; between transitions the canvas is still.

## Motion off

Reduced motion starts with all beds planted as a complete still garden. There is no automatic evolution, light travel, CSS transition or card animation. Selection and planting work immediately; Pause reads **Motion off** and cannot override the visitor's preference. The lesson path is complete. Enquire, prices, credentials, reviews and mail links never depend on animation. Changing the preference during a visit stops the world.

## Verification and measured performance

Checked in the worktree's Orca browser and headless Chrome. Captured and visually inspected six section positions at **390 × 900** and **1440 × 900**, plus the phone portrait area, open cards and a **320px** reduced-motion view. All screenshots stay outside the repository in the operating-system temporary directory (`g1-greenhouse-qa/`); none are committed. The optional `verify.cjs` reproduces these captures and checks using an externally installed Playwright package.

The final functional run passed: no horizontal overflow at 320, 390 or 1440px; both card swaps; both planting species; keyboard-accessible planting; stable paused generations; resumed automatic evolution; all five cumulative scroll beds; reduced-motion stillness and instant swaps; complete profiles and contact links without JavaScript; and no page errors.

Measured in local headless Chrome on this host, with **4× Chromium CPU throttling at 390px**: a **29 × 530** grid, solver **1.40ms p95**, visible-slice draw **9.10ms p95**. At 1440px without throttling: **67 × 250**, solver **1.30ms p95**, draw **1.40ms p95**. The sampled requestAnimationFrame interval was **6.20ms p95** on this host's refresh clock; that is not a claim about a physical phone's frame rate. This is CPU-throttled desktop evidence, not real-device battery or assistive-technology certification.

The text palette uses deep green, muted dark grey-green and plum on opaque pale surfaces; cells carry no information. Visible keyboard focus, a skip link, labelled controls, useful photo alt text and semantic reading order are present.

## Placeholders and assumptions

Every on-page placeholder uses `.ph` with a quiet dotted underline:

- **Barney & Eugene** is the supplied working name, visibly marked in the header and footer brand.
- Eugene's four exam-board labels are **[exam boards to confirm]**.
- Eugene's four subject prices are **£XX/hour**, repeated in the quick summary and back of his card.
- Eugene's **1-to-1, online via Zoom** format is an explicitly marked assumption.
- Eugene's exact supplied placeholder bio appears on the back of his card.
- **eugene@example.com** and its **Email Eugene** action are marked placeholders, including their `mailto:` destination.
- **Enquiry form** is visibly a placeholder link to `#contact`; no form or submission is invented.

All teaching and credential claims come from `company/copy-v3.md`. The reviews, MyTutor source figures and lesson sequence belong explicitly to Barney. His overall **300+ hours taught with a 5.0/5 rating.** sits on his profile, separate from the dated MyTutor numbers. His internship description remains attached to the internship, inside the expandable experience. Eugene's credentials and Ritz Education role stand on their own, without reviews. New text is confined to friendly headings, navigation and garden controls.
