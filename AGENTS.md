# Visit Cox — agent operating contract

Static, bilingual (EN/বাংলা) travel guide for Cox's Bazar, served by GitHub Pages from `main` at https://iamanikbarua.github.io/Visit-Cox/. No build step, no server, no database. Every page is a root `*.html` file that loads plain scripts from `js/` (globals, no modules) and Tailwind from a CDN.

Read before any change: this file, `CODING_STANDARDS.md`, the last section of `judge.md`, the newest `CrtiQue_*.md`, `todo.md`, and your role file (`0N-*/WORKSPACE.md`).

## Mission
1. Honest trip budgets for first-time visitors (stay, food, transport, activities, group size, days).
2. Fair local fares (tomtom, CNG, chander gari, bike rental) with sources and as-of dates, so tourists can push back on overcharging.
3. Places beyond the main beach (Inani, Himchari, Marine Drive, Moheshkhali, Sonadia, Ramu).
4. WhatsApp hand-off to real partners, once partners exist.

## Map
| Path | What it is | Owner role |
|---|---|---|
| `*.html` | Pages: markup, meta, JSON-LD | frontend (meta/JSON-LD: seo) |
| `css/styles.css` | Theme tokens, components | uiux |
| `js/data.js` | All content and prices (hotels, spots, fares, FAQs, UI strings) | data (03) |
| `js/app.js` | Language/currency state, search, chatbot, page renderers | frontend |
| `js/features.js` | Itinerary studio, PNG/PDF export | frontend |
| `js/planner.js`, `js/quickpick.js` | Planner engine, quick pick, WhatsApp payload | frontend (payload: data) |
| `js/blog.js` | Blog content and rendering | marketing (copy), frontend (code) |
| `js/admin.js` | Browser-only "CMS" | data (03) |
| `tests/` | `node --test` suites that load the real `js/` files | qa |
| `scripts/check.sh` | The gate. Must pass before any commit | qa |
| `0N-*/` | Role files. `WORKSPACE.md` is the brief; other files there are old prototypes, not shipped code | each role |

## Rules for every agent
- **Ship in place.** Edit the real root files. Never build a "staging" copy in a role folder; copies drift and nothing loads them.
- **Prove it.** A change is done when `scripts/check.sh` passes and you have exercised the changed path (a test that loads the real file, or a browser check at 375x812 and 1280x800 viewport tiles). Paste the evidence in your report. "Verified" without evidence is a false claim.
- **No invented facts.** Every price, fare, phone number, distance, rating or legal statement shown to users needs a source and an as-of date in `js/data.js` (`source`, `asOf`) or is marked approximate in the UI. No "100%", "guaranteed", "official" or "verified" unless that is literally true and cited.
- **Stay in your lane.** Edit only the paths your role owns (table above). If you need a change elsewhere, write it in your report for the owner role.
- **Small diffs.** Fix the root cause once in the shared code; no new frameworks, bundlers or dependencies without the owner's approval.
- **Secrets.** Nothing secret goes in this repo: it is public and every `js/` file is downloaded by every visitor.
- **Owner-only decisions** go to `todo.md` (one line each, why it needs the owner): partners, money, legal text, domains, analytics accounts, real photos and permissions.
- **Git.** Agents do not commit or push. The main agent reviews diffs, runs the gate, commits and pushes.

## Checks
`scripts/check.sh` runs: JS syntax for every `js/*.js`, `node --test tests/`, local link/asset references in `*.html`, stray files, and secret patterns. Exit 0 or the work is not done.
