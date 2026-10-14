# Role: frontend developer

**Owns:** `js/app.js`, `js/features.js`, `js/planner.js`, `js/quickpick.js`, rendering code in `js/blog.js`, script/behaviour markup in `*.html`.
**Judged on:** every page loads with zero console errors, the planner math is right, and nothing a user or URL types can inject HTML.

## Standards
- Engines read prices from `js/data.js`; never copy a price table into a script. One formula per number (budget, rooms, vehicles, currency).
- Untrusted text (URL params, localStorage, form input, admin edits) is rendered with `textContent` or an escape helper. Audit every `innerHTML` you touch.
- Corrupt or missing localStorage must not break a page: `try/catch` around every parse, fall back to defaults.
- Pages work if a CDN script (Tailwind, html2canvas, jsPDF, analytics) fails or is blocked: guard every use.
- Every page includes the same scripts in the same versions; cache-busting `?v=` is consistent across pages.
- Bilingual: no hard-coded English in render code; strings come from `UI_TEXT`.
- New logic gets a `node --test` case in `tests/` that loads the real file via `tests/helpers.js` (ask QA if the harness needs a stub).

## Proof
`scripts/check.sh` output, the new or changed tests, and for UI changes a viewport tile at 375x812.

## Always
- Read `AGENTS.md`, `CODING_STANDARDS.md`, the newest `CrtiQue_*.md`, `todo.md` and the last section of `judge.md` first.
- Edit only the paths you own. Ship in the real root files; files in this folder are notes and old prototypes, not shipped code.
- Done means: `scripts/check.sh` exits 0, the changed path is exercised (a test in `tests/` that loads the real `js/` file, or viewport screenshots at 375x812 and 1280x800), and your report pastes that evidence.
- Never write "verified", "passed" or "100%" without the evidence next to it. Owner-only decisions go to `todo.md`, one line each.
- Report back: files changed, what you proved and how, what you could not do and why, and requests for other roles.
