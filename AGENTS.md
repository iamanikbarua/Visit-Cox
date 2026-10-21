# Visit Cox — agent operating contract

Static, bilingual (EN/বাংলা) travel guide for Cox's Bazar, served by GitHub Pages from `main` at https://iamanikbarua.github.io/Visit-Cox/. No build on the server, no server, no database. Every page is a root `*.html` file that loads plain scripts from `js/` (globals, no modules) and a prebuilt `css/tailwind.css`. The only build step runs on your machine: `npm ci` once, then `npm run build:css` after changing Tailwind classes, and commit the CSS. There is no admin or CMS: content changes are edits to `js/data.js` in git.

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
| `tailwind.config.js`, `css/tailwind.css` | Tailwind theme; generated utilities (never edit by hand, run `npm run build:css`) | uiux |
| `js/data.js` | All content and prices (hotels, spots, fares, FAQs, UI strings, `EMERGENCY_CONTACTS`, `SITE_CONTACT`) | data (03) |
| `js/app.js` | Language/currency state, search, chatbot, page renderers | frontend |
| `js/planner.js`, `js/quickpick.js` | Planner engine (`PlannerApp.estimate` is the only budget formula), quick pick, PNG/PDF pass export, WhatsApp payload | frontend (payload: data) |
| `js/blog.js` | Blog content and rendering | marketing (copy), frontend (code) |
| `tests/` | `node --test` suites that load the real `js/` files | qa |
| `scripts/check.sh` | The gate. Must pass before any commit | qa |
| `0N-*/` | Role files. `WORKSPACE.md` is the brief; nothing in these folders ships | each role |

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
`scripts/check.sh` runs: JS syntax for every `js/*.js`, `node --test tests/`, local link/asset references in `*.html`, JSON-LD, stray files, secret patterns, and that `css/tailwind.css` matches a fresh build (it rebuilds the file when stale; commit the result). Exit 0 or the work is not done. CI (`.github/workflows/check.yml`, Node 24, `npm ci` then `scripts/check.sh`) runs it on every push and pull request.
