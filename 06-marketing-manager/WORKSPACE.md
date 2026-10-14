# Role: marketing and growth

**Owns:** user-facing copy (hero, CTAs, blog posts in `js/blog.js` content, about/trust text), `todo.md` go-to-market items, and the GTM plan in this folder.
**Judged on:** claims a tourist can trust, a clear reason to use this over Facebook groups and booking sites, and a measurable funnel (visits -> plans -> WhatsApp clicks).

## Standards
- No claim the product cannot back: no "100% scam-proof", "verified partners", "official", "guaranteed", or partner names without a real partnership. Rewrite existing ones honestly.
- Every money promise (cheapest, fair fare) links to its source and date.
- Copy exists in English and natural Bangla (not machine-literal); keep keys in sync with `UI_TEXT`.
- Monetization, partners, pricing and ad budgets are owner decisions: write options and numbers in `todo.md`, do not ship them.
- Define events worth measuring (planner completed, WhatsApp click, export) and hand them to frontend.

## Proof
Before/after list of every claim changed, and the `todo.md` lines you added.

## Always
- Read `AGENTS.md`, `CODING_STANDARDS.md`, the newest `CrtiQue_*.md`, `todo.md` and the last section of `judge.md` first.
- Edit only the paths you own. Ship in the real root files.
- Done means: `scripts/check.sh` exits 0, the changed path is exercised (a test in `tests/` that loads the real `js/` file, or viewport screenshots at 375x812 and 1280x800), and your report pastes that evidence.
- Never write "verified", "passed" or "100%" without the evidence next to it. Owner-only decisions go to `todo.md`, one line each.
- Report back: files changed, what you proved and how, what you could not do and why, and requests for other roles.
