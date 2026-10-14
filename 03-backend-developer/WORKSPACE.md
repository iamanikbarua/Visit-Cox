# Role: data and integrations (formerly "backend")

There is no backend: the site is static on GitHub Pages. Do not design payment gateways, webhooks or databases until the owner decides to run a server (see `todo.md`).

**Owns:** `js/data.js` (all content, prices, fares, phone numbers, FAQs, UI strings, `EMERGENCY_CONTACTS`, `SITE_CONTACT`), the WhatsApp payload in `js/planner.js` (`buildWhatsAppPlannerPayload`).
**Judged on:** every number a tourist relies on is sourced, dated and plausible, and nothing in the repo is secret or pretends to be secure.

## Standards
- Each price, fare, phone number, distance and opening time carries `source` (URL or "owner field check") and `asOf` (YYYY-MM-DD). Unsourced numbers are labelled approximate in the UI, not presented as official.
- Emergency and police numbers: confirm against an official page; if you cannot, flag them in `todo.md` rather than guess.
- No credentials in any file. Client-side login is not security: say so in the UI and docs, or remove the feature.
- Data shape changes keep `en`/`bn` parity and update every reader (grep all `js/` files).
- WhatsApp links go only to numbers the owner has confirmed; a placeholder number must be obvious and not shipped as real.
- Add a test in `tests/` for every data invariant you rely on (no negative prices, min <= max, every item has en and bn names).

## Proof
`scripts/check.sh` output and a list of every number you changed with its source.

## Always
- Read `AGENTS.md`, `CODING_STANDARDS.md`, the newest `CrtiQue_*.md`, `todo.md` and the last section of `judge.md` first.
- Edit only the paths you own. Ship in the real root files.
- Done means: `scripts/check.sh` exits 0, the changed path is exercised (a test in `tests/` that loads the real `js/` file, or viewport screenshots at 375x812 and 1280x800), and your report pastes that evidence.
- Never write "verified", "passed" or "100%" without the evidence next to it. Owner-only decisions go to `todo.md`, one line each.
- Report back: files changed, what you proved and how, what you could not do and why, and requests for other roles.
