# Coding standards (judgement calls)

Reviewer: check the diff against these.

- Cite: every price, fare, phone number or distance shown to users has a `source` and `asOf` in `js/data.js`, or the UI labels it approximate. Why: tourists use these numbers to argue with drivers and book rooms.
- No hype: no "100%", "guaranteed", "scam-proof", "official", "verified" unless literally true and cited. Why: one wrong fare destroys trust and invites complaints.
- One source of truth: content and prices live in `js/data.js`; engines read from it. Never copy a price table into a page script or a role folder. Why: copies drift.
- Escape: text from URL params, localStorage, form inputs or admin edits is rendered with `textContent` or an escape helper, never raw `innerHTML`. Why: a static site has no server to sanitise.
- Static: no feature may need a server at runtime. State lives in the URL or localStorage, and a missing or corrupt localStorage value must not break a page. Why: GitHub Pages.
- No secrets client-side: no passwords, tokens or API keys in any shipped file. Client-side "auth" is not auth. Why: every visitor downloads every `js/` file.
- Bilingual: every user-facing string exists in `en` and `bn` with matching keys. Why: the toggle silently falls back and leaves mixed UI.
- Test the real code: tests load the shipped `js/` files (see `tests/helpers.js`), never re-implement the function under test. Why: a copied function passes while the real one is broken.
- Mobile first: works at 320px wide, tap targets >= 44px, no horizontal scroll. Why: most visitors are on Android phones on mobile data.
- Weight: new images are compressed (<200 KB, WebP or JPEG), lazy-loaded below the fold, with width/height set. Why: 3G on the beach.
- Safety info: emergency numbers and health/sea-safety advice carry a source and as-of date. Why: wrong numbers in an emergency cause harm.
