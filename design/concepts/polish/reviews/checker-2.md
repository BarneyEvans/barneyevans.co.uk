# Polish checker — batch 2

Checked 9 November 2026 against `company/brief.md`, `copy-v3.md`, checker/polisher roles and each concept's three shortlist changes. Compared the v3 HTML and supplied before films with the polished pages. No product files changed: no factual errors or unmarked placeholders requiring a direct correction were found.

## Method and common results

Headless Edge (`playwright-core` at the requested path, `channel: msedge`), local standalone HTML, DPR 1. Swept **25 evenly spaced positions per page at 390×844**, including both endpoints; swept another **16 at 320×568**. Tested desktop at 1440×900, tutor disclosures/flips, planting/pairing/ribbon touch interactions, pause, links and keyboard focus. Re-ran the concepts' functional checks; G3's runner was copied outside the repo to avoid rewriting its checked-in results. Keyboard sweeps covered 31/26/27/31 stops respectively, with visible outlines and no hidden control receiving focus.

For contrast, sampled rendered backgrounds at **12 scroll positions × 3 moments** per concept, 300ms apart, including light/glow stages. Temporarily hid glyph fill without changing layout or backgrounds and compared computed foreground/opacity with PNG background pixels in text-fragment rectangles. Excluded text occluded by headers, clipped reverse faces and decorative/hidden text; header occlusion is reported separately below. These are sampled worst-background ratios, not an exhaustive temporal or physical-device certification. The requested **4.5:1 for all readable text** is stricter than the ordinary 3:1 large-heading exception.

All screenshots, scripts and raw evidence are outside Git in `C:/Users/evans/geo/polish-run/film/_checker2/`: `audit.json` (all sampled boxes/intersections), `contrast-audit.json`, `contrast-final.json`, `keyboard.json`, `<ID>-strip.png/json`, functional results and viewport captures. Raw box candidates also include clipped/reverse-face geometry; only confirmed visible intersections are cited below. Boxes use viewport **(x, y, width, height)** in CSS pixels, rounded to 0.1px.

| Concept | Before → polished height at 390 | Screens after | Fresh 4× CPU median / p95 | Frames >50ms | Overflow 390 / 320 | JS errors |
|---|---:|---:|---:|---:|---:|---:|
| G1 | 7382 → 7306px | 8.7 | 6.1 / 6.2ms | 0.1% | 0 / 0px | 0 |
| G2 | 5271 → 5749px | 6.8 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 |
| G3 | 6980 → 6047px | 7.2 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 |
| C2 | 7544 → 6786px | 8.0 | 6.1 / 6.2ms | 0% | 0 / 0px | 0 |

Fresh timings use the supplied real-wheel `strip.cjs`; before heights come from the supplied before films. Frame spacing is host-specific and is not renderer execution time.

**Common passes:** all six homepage parts; equal named real portraits; correct subject allocation, Barney prices/boards and Eugene qualifications; both full reviews explicitly about Barney with MyTutor source figures and links; Eugene's unconfirmed format/rates/boards/bio/email and the form visibly marked `.ph`; solid Enquire links to `#contact`; mail links; `noindex`; native scrolling. No body prose smaller than 16px was found except C2's sentence below; no readable label smaller than 13px was found in any concept. Subject names, exam boards, DBS badges, attribution and navigation are treated as labels, not body prose. Functional checks also cover expanded tutor detail text.

**Reduced motion passes:** at opening, tutors, lessons and contact, each canvas was identical across a 1.1s settled observation and there were zero running document animations. Controls and tutor details remained usable. Pause stops normal automatic growth; C2's event-driven ribbons also settle at idle. No sideways scrolling at any sampled 320/390 position.

## G1 — Greenhouse

**Must-fix**

- **Where:** `.motion-dock` / `#pause` at 390px. **What:** the planting toolbar is now correctly in flow, but the fixed 52px dock still covers protected content while it passes the top. Confirmed intersecting boxes include:

  | scrollY | Overlay box | Covered element and box |
  |---:|---|---|
  | 269 | `.motion-dock` (0,0,390,52) | Hero Enquire (24,36.6,133.6,46) |
  | 539 | `#pause` (279,5.5,91,40) | Opening Eugene GCSE rate (296.6,1.9,69.4,25.6) |
  | 1885 | `#pause` (279,5.5,91,40) | Eugene subject rate (287.5,22.7,78.5,20) |
  | 2423 | `.motion-dock` (0,0,390,52) | `#species` (92.5,-32.8,123.8,44), `#plant` (224.3,-32.8,73.3,44) |
  | 3500 | `#pause` (279,5.5,91,40) | Visible Eugene profile name (47,24.2,296,36) |
  | 3770 | `.motion-dock` (0,0,390,52) | More about Eugene (25,-19.8,340,55.6) |

  **Smallest fix:** make the phone dock static, with Pause in flow, or place it in a genuinely reserved viewport region that the scrolling content cannot enter. Top padding/scroll-margin alone does not prevent collisions at arbitrary scroll offsets. Preserve accessible pause access, for example with an in-flow control at each motion chapter.

- **Where:** `.contact h2 em`, “get started?”. **What:** foreground `#596945` against sampled warm contact background `#eadfc2` is **4.48:1** at all three sampled moments (contrast stage 10, approximately scrollY 5875). This passes the ordinary large-text exception but misses this round's explicit 4.5:1 target. **Smallest fix:** darken this heading colour slightly and remeasure over the contact light.

**Nice-to-fix**

- **Where:** opening → subject/profile chapters. **What:** the phone is only 76px shorter than v3, and full portraits recur in the profile chapter. **Smallest fix:** trim the second portrait height or chapter gaps before reducing text; keep every required claim and the two early faces.

**Passes:** rates end at 611px; both opening faces/names finish by 1003px (full portrait group ends at 1070px), comfortably within 1688px. Body/labels meet 16/13px. The light meets the portraits, lesson stem and warm contact, with responsive planting and preserved character. Open subject rows replace the earlier large tinted panels. Other sampled visible text clears 4.5:1. Common functional, overflow, focus and reduced-motion checks pass.

## G2 — Light Garden

**Must-fix**

- **Where:** sticky `header` / `#pause` at 390px. **What:** moving planting in flow fixed the lower toolbar, but the 61px header still intersects protected content. Confirmed boxes:

  | scrollY | Overlay box | Covered element and box |
  |---:|---|---|
  | 204 | `header` (0,0,390,61) | Hero Enquire (20,55.8,132.4,46) |
  | 409 | `#pause` (285,8,85,44) | Eugene GCSE (219.9,14.1,150.1,26.2), A-Level (219.9,45.3,150.1,26.2) |
  | 1022 | `header` (0,0,390,61) | Paired-cell buttons (20,-15.6,54,54), (204,-15.6,54,54) |
  | 1226 | `#pause` (285,8,85,44) | More about Eugene (204,-14.4,166,45.1) |
  | 1431 | `header` (0,0,390,61) | `#species` (20,-15.3,122.6,44), `#plant` (150.6,-15.3,104.1,44) |
  | 1635 | `header` (0,0,390,61) | Computer Science selector (20,49.6,228.1,44) |
  | 1839 | `header` (0,0,390,61) | £34/hour (20,43.3,87.1,35), £45/hour (203,43.3,86.4,35) |
  | 2248 | `header` (0,0,390,61) | Maths selector (20,-36,101.1,44) |
  | 2453 | Header brand (20,19.5,129.6,21) | Subjects Enquire (20,1.8,132.4,46) |

  **Smallest fix:** use a static phone header and keep Pause in flow near motion chapters, or reserve a separate non-overlapping scroll viewport. A reserved header *row* still overlays the ordinary document once it sticks.

**Nice-to-fix**

- **Where:** optional `.garden-play` before subjects. **What:** phone height grew 478px versus v3, partly for the clearer three-subject rate summary; the optional garden also retains a substantial gap. **Smallest fix:** trim only the optional garden's excess bottom padding if a shorter route to detailed boards is desired, keeping the restored visible colonies and light.

**Passes:** separate Computer Science, Physics and Maths summary rows, separate GCSE/A-Level lines, 18px prices and 16px level labels. Rates end at 575px, both faces at 841px and names at 937px. Equal 320px-tall desktop portraits and visible main qualifications/DBS. Three clear light jobs at paired tutor cells, four lesson markers and the contact bloom, with touch pairing/planting. Sampled moving-light contrast minimum **5.05:1**; no font-size offenders. Common functional, overflow, focus and reduced-motion checks pass.

## G3 — Lab Notebook / A closer look

**Must-fix**

- **Where:** sticky `.masthead` / `#play` at 390px. **What:** the specimen controls are in flow, but the 70px masthead still covers rates, names and controls. Confirmed boxes:

  | scrollY | Overlay box | Covered element and box |
  |---:|---|---|
  | 217 | `.masthead` (20,0,350,70) | Hero Enquire (20,62.9,134.8,48.4) |
  | 434 | `.masthead` (20,0,350,70) | £34/hour (118.3,-8.9,67.7,26.4), £45/hour (118.3,22.5,67.7,26.4) |
  | 434 | `#play` (288,12.5,82,44) | Opening Eugene GCSE rate (300.6,-8.9,69.4,27.4) |
  | 650 | `.masthead` (20,0,350,70) | Barney name (20,44.9,165,48), Eugene name (205,44.9,165,48.3) |
  | 650 | `#play` (288,12.5,82,44) | Eugene name (205,44.9,165,48.3) |
  | 867 | `.masthead` (20,0,350,70) | Glider (20,52.3,72.2,44), Pulsar (98.2,52.3,72.4,44), Add a pattern (176.6,52.3,120.2,44) |
  | 1301 | `.masthead` (20,0,350,70) | Computer Science selector (20,-1.5,350,57.3) |
  | 1518 | `#play` (288,12.5,82,44) | £45/hour (291.8,1.2,78.3,32.4) |
  | 1951 | `#play` (288,12.5,82,44) | Eugene subject rate (282.9,18.7,87.1,33.4) |

  **Smallest fix:** remove phone sticky positioning, retaining Pause in flow at useful motion points, or reserve an actual separate scroll area beneath the header. Do not restore the old floating apparatus.

**Nice-to-fix:** no additional measured issue requiring a change.

**Passes:** upright equal people, plain subject labels, graph paper/handwriting/specimen clutter removed. Opening rates end at 490px, faces at 682px and both names at 743px: everything fits within the *first* 844px screen. No font-size offenders. The old low-contrast pencil labels are gone; sampled text contrast minimum **5.35:1**. The same simulation is seen whole, magnified near tutors, at nucleus scale near lessons, then whole at contact; touch/keyboard planting works. Common functional, overflow, focus and reduced-motion checks pass.

## C2 — Counterpart

**Must-fix**

- **Where:** `.taught` in Barney's profile, “300+ hours taught with a 5.0/5 rating.” **What:** this substantive body sentence renders at **14px** at 390px (`polish.css` groups `.taught` with labels). It is the remaining body-size offender, despite the concept's own verifier excluding it from the body scan. **Smallest fix:** set `.taught{font-size:16px}`; keep the 13–14px attribution/subject labels.

**Nice-to-fix:** no additional measured issue requiring a change.

**Passes:** no fixed/sticky content control and **zero unrelated interactive/protected box intersections at all 25 phone positions**. Ribbons occupy reserved spaces beside the lesson copy; controls remain below the sequence. Prices end at 592px, faces at 871px and both names at 926px (whole opening ends at 982px), inside two screens. All labels are at least 13px; other body prose is at least 16px. Sampled contrast minimum **5.72:1**. Three decisive separate/braided/parallel ribbon states, touch swap and idle settling work; redundant full-width loop interludes are gone. All supplied claims/reviews retained. Common functional, overflow, focus and reduced-motion checks pass.
