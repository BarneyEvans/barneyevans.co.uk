# Wildcard concepts · v3

Two standalone homepage choices with equal tutor billing, approved copy, explicit placeholders, native scrolling and five related motion scenes each.

| Concept | Visual voice | Signature |
|---|---|---|
| [Soft Assembly](C1-soft-assembly/index.html) · [pitch](C1-soft-assembly/pitch.md) | Outfit; periwinkle, apricot and lilac-white | A digital mosaic becomes a bridge, four staircases, quotation marks and an open doorway |
| [Counterpart](C2-counterpart/index.html) · [pitch](C2-counterpart/pitch.md) | Manrope; plum, rose and blush | Two solid ribbons cross, coordinate, weave over and under, then settle into parallel strokes |

Open either `index.html` directly. Each concept folder is portable and contains its own photos, variable font, font licence, CSS and JavaScript. It needs neither a build nor a server. Fonts were obtained from the Google Fonts repository; the respective OFL licences are included. Photographs are the supplied originals.

Both pages include subjects and prices, equal tutor profiles and experience disclosures, Barney's lesson description and approximate timings, both full parent reviews with the dated MyTutor source information, contact links and the required footer. All Enquire buttons lead to `#contact`. Eugene's email and the enquiry form remain visibly marked placeholders. Nothing is deployed.

## Verification

`verification.json` records the automated Chrome run at 1440, 390 and 320 CSS pixels. Phone runs use 4× CPU throttling and a 3× simulated device scale; both canvases cap their resolution at 2×. The check covers overflow, JavaScript errors, scroll-linked geometry, touch interaction, idle stillness, native disclosures, enquiry navigation, reduced motion and no-JavaScript content access. Both concepts were also opened and captured in Orca's built-in worktree browser. Desktop and phone screenshots at multiple scroll positions were visually reviewed; screenshots remain outside the repository in OS temporary storage.

Palette checks found the tested body, muted, subject-accent and button text pairs above 4.5:1. The smallest tested pairing is Counterpart's secondary headline at approximately 4.9:1. All content uses ordinary HTML; canvases are decorative and hidden from assistive technology. Focus is visible, and the decorative swap button is keyboard and touch accessible.

Run the optional check with an existing Playwright installation and installed Chrome:

```powershell
$env:PLAYWRIGHT_PATH = 'C:/path/to/node_modules/playwright'
node design/concepts/v3/wildcard/verify.cjs
```

Physical phone testing remains a next-stage production check. The local throttled measurements are useful evidence, not a claim about every device.

## Editing

The delivered HTML, CSS and JavaScript are ready to open. To regenerate after editing the shared content or scheduling code:

```powershell
python design/concepts/v3/wildcard/build_concepts.py
```

`build_concepts.py` contains the approved content and emits both HTML pages. `base.css` supplies their shared accessible layout foundation; each folder's `theme.css` supplies its own typography, palette and composition. `motion.js` contains both rendering modes and their event-driven scheduler. The generator copies the resulting runtime files into each concept; no parent-folder dependency exists in either homepage.

The full placeholder inventory, motion story, design rationale, performance notes and limitations are in each `pitch.md`.
