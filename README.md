# Visit Cox

An independent, bilingual (English / বাংলা) travel guide to Cox's Bazar, Bangladesh, for first-time visitors who want a rough trip budget and typical local fares before they go.

- Live site: https://iamanikbarua.github.io/Visit-Cox/
- Repo: https://github.com/iamanikbarua/Visit-Cox

It is a static site on GitHub Pages: plain HTML, plain JavaScript and Tailwind from a CDN. There is no server, database, login, admin panel or CMS, and no map.

## What works

- Pages: home, hotels, spots, activities, food, culture, transport, blog and the trip planner (`itinerary.html`).
- English / Bangla toggle and BDT / USD toggle. Some page body copy is still English-only.
- Trip planner: estimates a budget from group size, days, hotel, food, transport and activities, and exports a PNG/PDF pass.
- Hotel, spot, activity and fare listings, FAQ, and a keyword-matching help widget (no AI, no network calls).

## Honesty notes

- Prices, fares, hotel phone numbers and ratings are estimates. Most have no published source yet; entries carry `approx` and `asOf` in `js/data.js`, and the UI labels them as estimates. They need confirmation by the owner or a local contact before anyone should rely on them.
- Emergency numbers come from published sources with dates (see `EMERGENCY_CONTACTS` in `js/data.js`). The owner should confirm them by phone.
- There are no hotel or transport partners. The WhatsApp hand-off stays hidden until `SITE_CONTACT.whatsapp` holds a real number.
- Google Analytics is loaded on every page; there is no privacy notice yet.

## Where things live

| Path | What |
|---|---|
| `*.html` | One file per page |
| `js/data.js` | All content and prices: hotels, spots, activities, fares, FAQ, UI strings (`UI_TEXT.en` / `UI_TEXT.bn`), emergency contacts |
| `js/planner.js`, `js/quickpick.js` | Planner engine, quick pick, PNG/PDF export |
| `js/app.js` | Language/currency state, search, page renderers |
| `js/blog.js` | Blog posts and blog rendering |
| `css/styles.css` | Theme and components |
| `tests/` | `node --test` suites that load the real `js/` files |
| `0N-*/` | Notes for each agent role; nothing there ships |

To change content, edit `js/data.js` (or `js/blog.js` for posts) and commit. Keep every `UI_TEXT.en` key matched in `UI_TEXT.bn`.

## Run and check

```sh
python3 -m http.server 8000   # then open http://localhost:8000
scripts/check.sh              # JS syntax, node tests, local links, JSON-LD, stray files, secrets
node --test 'tests/*.test.js' # tests only
```

`scripts/check.sh` must exit 0 before a commit. Needs Node 18+.

## Not yet decided (owner)

WhatsApp number and any partners, analytics consent or a cookie-free analytics tool, a licence, image permissions and attribution, and a custom domain. See `todo.md`.
