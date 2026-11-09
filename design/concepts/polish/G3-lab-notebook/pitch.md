# G3 — Lab Notebook

**Vibe:** A warm, precise science-museum notebook: cream graph paper, pencil notes, mint gliders and lavender pulsars, with two real people at its centre.

## The scroll story

1. **The whole dish.** A fine glass rim holds equal, labelled photographs of Barney and Eugene. The headline, enquiry link and Barney's two prices are immediately readable; Eugene's subjects link directly to the complete price register. The world is already alive around the specimens.
2. **A closer look.** Native scrolling enlarges the dish rim and the camera over the same document-coordinate cellular world. At subjects the magnification approaches 1.65×. Sage squares and lavender circles keep the species distinct without relying on colour alone. Choosing either subject brightens its colony and gently lowers the other.
3. **Where colonies meet.** At the paired tutor slides the camera reaches about 2.15×. Signature patterns are seeded on opposite sides and together around this section. The two species meet under the Immigration rule; newborn species come from the majority of three parents. Turning a slide dissolves its face into a brief scatter of coloured cells, then reconstructs the reverse with credentials, experience, prices and Enquire. The reverse grows to fit its contents rather than trapping phone readers inside a small scroll panel.
4. **The small things.** Around lessons the camera reaches 3.1× and the cells reveal tiny nuclei. A ruled note shows three neighbours making a new cell; scrolling assembles the small diagram. Lesson copy remains on a quiet opaque surface and is explicitly attributed to Barney. The four approximate lesson stages have equal structural weight, not misleading proportional durations.
5. **Observations.** The camera draws back as the page reaches the two complete reviews. Both are clearly about Barney, linked to MyTutor, with the supplied source figures and check date. His separate overall 300+ hours figure stays on his slide.
6. **Back to the whole picture.** The camera returns to 1× and a whole dish reforms around the two email actions. This closes the visual journey with the same object that opened it.

## Signature moment

Turn either tutor's specimen slide over: the paper face briefly gives way to its species' cells, then reforms into the reverse. Plant a glider or pulsar in empty graph paper, scroll deeper into its magnified world, and come back: it is the same simulation, not another decorative loop.

## The living notebook

One bounded typed-array grid spans the full document. Conway B3/S23 supplies birth and survival; the Immigration majority rule supplies newborn species. Barney starts as gliders, Eugene as pulsars. Mint squares and lilac discs, with deeper selected states, give a second distinction beyond hue. Births and deaths interpolate with smoothstep over 440ms; generations advance every 650ms. The canvas renders only the visible slice at a maximum of roughly 31 frames per second, with pixel ratio capped at 2. Hidden tabs stop the frame loop. No simulation or rendering runs while paused and still; scrolling or a deliberate interaction requests one redraw.

The compact, always-reachable controls choose a planting species, plant nearby with a keyboard, and pause growth. Touch planting recognises a tap rather than a drag, so native scrolling stays intact. Both photos are local approved originals. There are no remote fonts, libraries, analytics, build steps or network requests.

## Motion off and access

Reduced motion gives a complete still composition: no automatic growth, no camera magnification, no cell scatter, and instant slide swaps. Planting and species selection still work. A preference change pauses growth. Both tutor faces remain in the accessibility tree; only the visually hidden face's controls leave the tab order. Focus moves to the reverse's turn-back control, the slide aligns for reading after an explicit flip, and all controls have visible focus styles. With JavaScript disabled, both sides become ordinary visible document content and the unused garden controls disappear. All enquiry links target #contact. The preview is noindex.

## Verification

Opened in the worktree-scoped Orca browser, then tested in headless Chrome. The six section positions were captured and visually inspected at 390×844 and 1440×1000; screenshots stay in the operating-system temporary folder, not Git. A separate 320px pass checks all six positions. The reproducible optional `verify.mjs` script records final assertions and measured 4× CPU-throttled, 390px, DPR-2 performance in `verification.json`. These synthetic browser timings describe this machine; they are not a real-phone frame-rate claim.

## Placeholders and assumptions

- The working name, **Barney & Eugene**, is marked `.ph` in the masthead.
- Eugene's **1-to-1, online via Zoom** format is assumed and visibly marked `.ph`.
- All four Eugene exam-board lines use `.ph` **[exam boards to confirm]**.
- All four Eugene prices use `.ph` **£XX/hour**, including on the reverse of his slide.
- Eugene's supplied placeholder biography is displayed in full inside `.ph`.
- Eugene's email address and email action are marked `.ph`; the supplied **eugene@example.com** mailto remains visible as a placeholder.
- **Enquiry form** is marked `.ph` and links to #contact because no form has been supplied.
- The handwritten notes and section names describe the visual notebook; they make no extra tutoring claims. The garden's rule annotation describes the implemented decorative simulation.

The remaining production decisions are the real site name, Eugene's boards, prices, format, biography and email, and the future enquiry form. No new tutoring promises, reviews or results have been invented.

### Measured performance (final run)

Chrome, headless, 390×844 CSS pixels, DPR 2, 4× CPU throttling; bounded 30×505 grid. Each section sampled 69–70 rendered frames and three generations. This is a small synthetic sample, not a real-device benchmark.

| Visible section | Canvas draw, p95 | Generation step, p95 |
| --- | ---: | ---: |
| Subjects | 1.6ms | 6.6ms |
| Lessons | 0.5ms | 2.7ms |
| Contact | 2.5ms | 2.3ms |

All 33 recorded assertions pass, including the full 320/390/1440px overflow sweeps, touch and keyboard planting, both flips and focus transfer, pause stability, reduced motion, no-JavaScript content and no browser errors. An additional accessibility-tree check confirms both Barney faces are exposed while reverse controls are removed from sequential focus; the visibility handler also stops generations when the document becomes hidden.
