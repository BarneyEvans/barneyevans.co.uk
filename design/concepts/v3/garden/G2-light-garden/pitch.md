# G2 — Light Garden

**A living garden seen through a lens: mint, lilac and a little room to grow.**

Open `index.html` directly. Everything needed by the page lives in this folder: no build, network requests, remote fonts, libraries or WebGL. The design combines Cellular Garden's real, plantable world with Light Field's restrained optical contours, replacing the dark palette with cream, sage and lavender dusk.

## The scroll story

1. **Morning / a lens comes into focus.** The headline, working name, prices and Enquire are immediate. A mint-and-lilac lens rotates and gently compresses with the opening scroll. Fine interference contours continue outside the lens into the document. The two real portraits appear side by side in the first two screens, including on a phone.
2. **Meeting / light finds the garden.** A broad caustic follows the reader down one document-coordinate world. Its path bends around measured headings; nearby cells become brighter and appear larger through the light. Barney's gliders approach Eugene's pulsars around the tutors. Choosing a tutor or subject strengthens that species and quietens the other, without changing the Conway rules.
3. **Understanding / a path through the lesson.** The same light passes the subjects and enters the lesson sequence. Each equally spaced lesson marker gains a soft halo as it crosses the reading position. These are four steps, not a proportional timing chart. Their underlying garden continues evolving beyond the viewport.
4. **Evening / soft dusk.** The warm document ground gradually becomes a pale violet through the parent reviews and contact. A small additional scroll-dependent lavender wash ties the viewport to that progression. The final scene stays light; both email routes have equal weight.

These moments are coupled to native scroll position, not entry-triggered fade-and-slide effects. Nothing waits for animation before it can be read or used.

## Signature moment

Tap “More about Eugene”: his portrait dissolves through a staggered field of lilac cells and re-forms as his credentials, experience, placeholder bio and prices. The shared garden simultaneously favours Eugene's species. On a phone the expanded card uses the full width, and the other tutor remains available underneath. Both front and back content remain in the accessibility tree; off-face interactive controls leave the tab order. Focus moves to the return control without moving the viewport.

The persistent, small garden controls select **Plant: Barney / Eugene**, plant a nearby pattern with the plus button, and pause growth. Empty-space taps plant at that document coordinate. Touch drags are ignored so scrolling stays native. Mint cells have round cores; lavender cells have diamond cores, giving the species a second distinction beyond colour.

## The actual garden

One pair of typed arrays holds one bounded document lattice. Every generation applies Conway **B3/S23**. Survivors keep their species; a newborn inherits the majority species among its three living neighbours, the Immigration rule. Barney plants a glider; Eugene plants a 48-cell pulsar. Seeding repeats down the margins and adds a meeting zone around the tutors. It is not a particle animation or a pre-rendered loop.

The solver runs approximately once every 950ms. Visible cells interpolate their opacity between states; births and deaths bloom instead of blinking. Canvas 2D uses two cached glow sprites, renders only the visible slice, and caps pixel ratio at 2. Heading and body-text rectangles exclude living cells, with quiet section surfaces supplying additional protection for reading. There is one viewport canvas, at most 120 columns and 700 rows. Rendering is capped around 30fps, and the loop stops entirely in hidden tabs and when paused; paused scroll/interaction draws remain event-driven. Offscreen cells are simulated as part of the shared world but never drawn.

Canvas 2D earns the effect at a small implementation cost. WebGL would add machinery without making this gentle, discrete light world more persuasive.

## Motion off and resilience

`prefers-reduced-motion` starts with a still seeded garden, no generation timer, no lens transforms, no animated lesson halos and instant tutor-card swaps. Native scrolling simply views different parts of the fixed document. Planting and species emphasis still work instantly. The pause control reads “Still garden” in this mode. A preference change is handled during the visit.

Without JavaScript, both sides of both tutor cards are visible, all copy and anchor/email links work, and the inactive garden controls disappear. There is a skip link, visible keyboard focus, real buttons, semantic sections, descriptive photo alternatives and `noindex`. No cells carry information needed to understand the service. Deep green body text sits on pale surfaces; pastels are reserved for decoration.

## Verification — 6 November 2026

Opened the page in the **Orca browser scoped to this worktree**, captured and inspected its desktop screenshot. Then ran headless Chrome through Playwright, capturing and looking at **six positions each at 390×844 and 1440×1000**: opening, tutors, subjects, lessons, reviews and contact. Also inspected the expanded Eugene card and 320px opening. Screenshots are in the OS temporary directory, not this commit.

The reproducible `qa.cjs` checks horizontal overflow at 320, 390 and 1440px; pause stability; planting via the nearby control and empty space; species choice; animated and instant card flips; reduced motion; no-JavaScript content; contact links; the robots directive; and uncaught page errors. All passed. Use an installed `playwright` package, or set `PLAYWRIGHT_PATH` to its directory, then run `node qa.cjs`. Chrome must be installed. The page itself has no such dependency.

Measured during the six-position run (390px uses Chromium **4× CPU throttling**):

| Preview | Lattice | Generation cost, p95 | Draw cost, p95 | Highest sampled draw |
| --- | --- | --- | --- | --- |
| 390px, 4× CPU | 26 × 354 = 9,204 cells | 3.0ms | 7.2ms | 21.0ms |
| 1440px, normal CPU | 72 × 243 = 17,496 cells | 1.1ms | 1.7ms | 4.3ms |

These are browser-instrumented function durations, not claims about real-device frame rate or battery life. The page HTML, CSS and interaction script total about 41KB uncompressed; the two supplied local photographs total about 291KB. Human screen-reader and physical-device checks remain production follow-ups.

## Content, placeholders and assumptions

Claims and both full parent quotations come from `company/copy-v3.md`. Reviews explicitly belong to Barney and link to his MyTutor profile. The 300+ hours / 5.0 figure is on Barney's card; the separate MyTutor figures retain their source and checked date. Lesson copy and approximate timings are explicitly Barney's Computer Science material. Eugene's real photo and supplied academic credentials receive equal prominence.

All missing content is visibly dotted and wrapped in `span.ph`:

- Working site name, “Barney & Eugene”.
- Eugene's four prices: “£XX/hour”, repeated in quick facts and on his card where appropriate.
- Eugene's exam boards: “[exam boards to confirm]” for Physics and Maths at both levels.
- Eugene's assumed format: “1-to-1, online via Zoom”.
- The supplied “Placeholder bio: Eugene will write a couple of sentences here about how he teaches Physics and Maths.”
- Eugene's email address and email action, using `mailto:eugene@example.com` exactly as supplied.
- “Enquiry form”, which links to `#contact` until a form exists.

No free call, availability, response time, outcome guarantee or additional review is invented. Enquire is always a solid enabled link to contact. The photons, artistic captions and section headings are design language, not teaching claims.
