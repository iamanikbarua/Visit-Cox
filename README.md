# Visit Cox

An independent, bilingual (English / বাংলা) travel guide to Cox's Bazar, Bangladesh, for first-time visitors who want a rough trip budget and typical local fares before they go.

- Live site: https://iamanikbarua.github.io/Visit-Cox/
- Repo: https://github.com/iamanikbarua/Visit-Cox

It is a static site on GitHub Pages: plain HTML, plain JavaScript and a prebuilt Tailwind CSS file (`css/tailwind.css`, committed; GitHub Pages runs no build). There is no server, database, login, admin panel or CMS, and no map.

## What works

- Pages: home, hotels, spots, activities, food, culture, transport, blog, privacy and the trip planner (`itinerary.html`).
- English / Bangla toggle and BDT / USD toggle. Some page body copy is still English-only.
- Trip planner: estimates a budget from group size, days, hotel, food, transport and activities, and exports a PNG/PDF pass.
- Hotel, spot, activity and fare listings, FAQ, and a keyword-matching help widget (no AI, no network calls).

## Honesty notes

- Prices, fares, hotel phone numbers and ratings are estimates. Most have no published source yet; entries carry `approx` and `asOf` in `js/data.js`, and the UI labels them as estimates. They need confirmation by the owner or a local contact before anyone should rely on them.
- Emergency numbers come from published sources with dates (see `EMERGENCY_CONTACTS` in `js/data.js`). The Tourist Police helplines and spot safety facts were confirmed by the owner from a Tourist Police notice (2026-10-15); confirm the others by phone.
- There are no hotel or transport partners. The WhatsApp hand-off stays hidden until `SITE_CONTACT.whatsapp` holds a real number.
- Google Analytics loads only after the visitor taps "Accept analytics" in the consent banner (`js/consent.js`); `privacy.html` explains what is collected.

## Where things live

| Path | What |
|---|---|
| `*.html` | One file per page |
| `js/data.js` | All content and prices: hotels, spots, activities, fares, FAQ, UI strings (`UI_TEXT.en` / `UI_TEXT.bn`), emergency contacts |
| `js/planner.js`, `js/quickpick.js` | Planner engine, quick pick, PNG/PDF export |
| `js/app.js` | Language/currency state, search, page renderers |
| `js/blog.js` | Blog posts and blog rendering |
| `js/consent.js` | Analytics consent banner; GA loads only after Accept |
| `css/styles.css` | Theme and components |
| `css/tailwind.css` | Generated Tailwind utilities. Do not edit; rebuild it |
| `tailwind.config.js` | Tailwind theme (colors, fonts) and the files scanned for class names |
| `tests/` | `node --test` suites that load the real `js/` files |
| `0N-*/` | Notes for each agent role; nothing there ships |

To change content, edit `js/data.js` (or `js/blog.js` for posts) and commit. Keep every `UI_TEXT.en` key matched in `UI_TEXT.bn`.

## Run and check

```sh
python3 -m http.server 8000   # then open http://localhost:8000
npm ci                        # once: installs the Tailwind CLI (3.4.17, pinned)
npm run build:css             # after adding or changing Tailwind classes in *.html or js/*.js
scripts/check.sh              # JS syntax, node tests, local links, JSON-LD, stray files, secrets, CSS freshness
node --test 'tests/*.test.js' # tests only
```

`scripts/check.sh` must exit 0 before a commit; GitHub Actions (`.github/workflows/check.yml`) also runs it on every push and pull request. Needs Node 22+ (`node --test` with a glob; CI uses Node 24). Tailwind only sees class names written out in full in `*.html` and `js/*.js`; never build one from pieces (`'bg-' + color`). Commit `css/tailwind.css` with the change that needs it.

## Not yet decided (owner)

WhatsApp number and any partners, GA data retention, a licence, image permissions and attribution, and a custom domain. See `todo.md`.
