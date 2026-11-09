# A1 Good Thread polish notes

## Direction and first milestone

Read the brief, approved copy, A1 shortlist changes, checker and parent panel, and the original pitch. Opened both supplied before strips before editing. Only this concept folder is edited.

- Put separate GCSE and A-Level rates before portraits on phones; retained equal subjects, names, faces and contact actions.
- Kept lilac, plum, raspberry and apricot. Switched headings to the existing local DM Sans, removed yellow borders and blobs, and retained a single fine stitched portrait contour.
- Replaced the disconnected chapter drawings with one measured SVG thread: paired portraits, outside seam, all four actual lesson markers, the first full Barney review edge, then one small loop at contact.
- Kept touch/keyboard plucking in page flow. Pause has its own 44px sticky header row; no floating control over the page. Reduced motion shows the entire settled seam.
- Raised body copy to 16px and supporting labels to at least 13px. Trimmed section spacing and repeated portrait scale without removing approved claims or either review.

## Measured strips (4x CPU throttle)

| Capture | Page height | Screens | p95 frame | Overflow | JS errors |
| --- | ---: | ---: | ---: | ---: | ---: |
| Before 390 x 844 | 6722px | 8.0 | 6.2ms | 0px | 0 |
| Before 1440 x 900 | 4890px | 5.4 | 6.2ms | 0px | 0 |
| First scratch 390 x 844 | 6277px | 7.4 | 6.2ms | 0px | 0 |
| First scratch 1440 x 900 | 3919px | 4.4 | 12.1ms | 0px | 0 |
| Final 390 x 844 | 6277px | 7.4 | 12.1ms | 0px | 0 |
| Final 1440 x 900 | 3919px | 4.4 | 12.1ms | 0px | 0 |
| Final 320 x 568 | 6821px | 12.0 | 6.2ms | 0px | 0 |

All captures are outside the repo in C:/Users/evans/geo/polish-run/film/A1/. Viewed the worktree-scoped Orca desktop preview and both scratch strips. The first strip exposed a thread/title intersection at the lesson map; the route now uses the spare space below its title and the desktop column gutter.

## Second milestone: signature and verification

The coordinator asked us to keep the signature visible on a phone, after seeing other polishes reduce their motion too far. Strengthened the continuous raspberry line to 3px with a 14px travelling bead, drew it around both portrait contours, and enlarged the simple closing loop to a visible 39px by 32px. The opening loops have a dedicated continuous drawing interval, so they do not jump when the path turns upwards. Kept the line tied to the four full-sized lesson markers and the entire first review edge.

The repeatable verify.cjs audit now passes at 320, 390, 768 and 1440px:

- No horizontal overflow, missing images or JavaScript errors.
- Both full named portraits and the quick rates appear within two screens (portraits end at 839px on the 320 x 568 phone and 835px on the 390 x 844 phone).
- No readable text below 13px; body copy is at least 16px. Minimum measured text contrast: 4.81:1.
- No sampled thread/text collisions, including with the first experience disclosure open. The line passes within 0.50px of every lesson-marker centre in a 5,001-point path sample.
- Touch and Enter change the thread; the spring returns to its exact resting geometry. Pause and reduced motion show the complete still seam; scrolling does not change reduced-motion geometry.
- Original subjects, tutor claims, lesson copy, both full reviews, source figures, contact and footer content are all preserved.

The original rough audit counted unloaded lazy images and hidden disclosure text; these were audit artefacts, not rendering failures. The final audit explicitly loads images and excludes closed disclosure content. Its full results are in verification.json.

Final after-390.png, after-1440.png and after-320.png strips were regenerated and opened after the stronger portrait and contact drawing. All meet the p95 under 20ms target at 4x CPU throttle; frames over 50ms were 0.1% at 390/1440 and 0% at 320. The phone page is 445px shorter and the desktop page is 971px shorter than the supplied originals, while using larger body and supporting text. These are throttled browser measurements, not a physical-device certification. Eugene's prices, boards, format, bio and email, the site name and enquiry form remain visibly marked supplied placeholders. No design or implementation blocker remains; supplied placeholders are the remaining content decisions.
