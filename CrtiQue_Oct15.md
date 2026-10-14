# Visit Cox: independent critique, 2026-10-15

Reviewer: independent, read-only. Repo at `2ffe217` (one commit ahead of `origin/main`; the live site serves `2bb73c9`, last modified 2026-10-14 17:11 GMT). No previous critique.

What I did: read every doc, role folder, skill and the shipped code. I ran `scripts/check.sh` and `node --test`. I loaded the real `js/` files in Node to exercise the planner and search. I served the repo locally and drove it with headless Chrome at 375x812 and 1280x800, using viewport tiles only. I fetched the live site with GETs only. A helper agent checked 14 prices, fares and phone numbers against the web. "Confirmed" means I traced the code or reproduced the result. "Suspected" means the evidence is strong but I did not prove it.

## 1. Verdict up front

- **What it is:** a nine-page static guide to Cox's Bazar, in English with a Bangla toggle. It has hotel, spot, food and fare listings, plus a trip planner that estimates a budget and exports a "pass" image.
- **Who it is for:** first-time domestic visitors and a few foreigners who want a budget and fair local fares before they go.
- **State:** it looks polished, but it is not trustworthy. Every page shows Tourist Police and lifeguard numbers, and none of the four police numbers matches a published source. The lifeguard number is a placeholder (`01819-012345`), and it is also printed on the exported phone lock-screen. The WhatsApp "concierge" button sends the user's trip to that same placeholder number. About 9 of the 26 hotels have "official" websites that do not resolve and made-up-looking phone numbers. Five separate price tables disagree with each other.
- **Continue?** Yes, but as a small, honest fare-and-budget guide in Bangla first, not as an "authoritative archive". The useful core is cheap to fix: one data file, one planner, sourced numbers. Stop adding features until the numbers are true.
- **GTM readiness: 15%.** The weighted score is 24, capped at 15 by the safety-number problem (section 15).

**Compared with the scorecard:** Visit Cox lands at 15%. That ties ReserveMyTokens, sits just above Ambulance-AID-BD and PoreDekho VTO (12) and well below Suggest.Bike (51) and TakaTalks (25). The nearest comparison is Suggest.Bike. Both are static content sites with a quick-match widget, and Visit Cox's own comments say "suggest.bike inspired". Suggest.Bike is ahead because its content is real and its claims are mostly honest. Visit Cox has the opposite problem: decent plumbing, untrustworthy content and inflated claims. Unlike the hardware projects (Flow Trace, PoreDekho), nothing here needs new technology. Visit Cox could reach about 35-40% in a few days of data cleanup and deletions, which makes it one of the cheapest projects in the portfolio to lift.

## 2. Code and architecture

**Shape.** There are nine root HTML pages (17-69 KB each) and seven global scripts with no modules: `data.js` 3,089 lines, `app.js` 3,670, `features.js` 4,469, `planner.js` 1,120, `blog.js` 1,174, `admin.js` 908, `quickpick.js` 194. Tailwind comes from the CDN at runtime. Every page also carries 54-161 lines of inline script. In total that is about 14,600 lines of JS for what is mostly a read-only content site.

**Fit of choices.** A static site on GitHub Pages is the right call. Plain scripts are fine at this size. Using the Tailwind CDN in production is not: it is 397 KB of JS that compiles CSS on the phone, and Tailwind itself prints "should not be used in production" on every page (seen in the console on all 18 page loads).

**Several planners and price tables.** This is the main architectural problem. A traveller can get a budget from four different engines, each with its own prices:

| Engine | Where | Used by | Own price table |
|---|---|---|---|
| `PlannerApp` | `js/planner.js:11-305, 347-1112` | `itinerary.html` (the visible planner) | `PLANNER_CATALOG.hotels/dining/activities/transitFares` |
| Itinerary studio | `js/features.js:478-760, 2605-3860` | renders into **hidden** divs on `index.html:957-961`; not on itinerary.html | `ITIN_RESTAURANTS_CATALOG`, `ITIN_ACTIVITIES_CATALOG`, `ITIN_TRANSPORT_ADDONS` |
| Stepped itinerary | `js/features.js:3867-4406` | renders into a hidden div `#itinerary-stepped-output` (`index.html:957`) | `STEPPED_ITINERARY_PLANS` |
| Quick Trip Pick | `js/quickpick.js:7-90` | `index.html` hero | hard-coded totals |
| Transport fare calculator | `transport.html:437-501` inline | transport page | hard-coded strings |

On top of these, `js/data.js` holds the "source of truth" that only the listing pages read. The `.agents/skills/fair-transit-fare-engine/SKILL.md:14-26` and `trip-budget-calculator` skills hold a sixth set of fares. `CODING_STANDARDS.md` says "one source of truth". The code has six.

**Dead code (Confirmed).**
- About 1,300 lines of Leaflet map code (`features.js:25-477`, `967-2313`) never run. No page has `#coxs-bazar-map` and no page loads Leaflet. The guard at `features.js:4454` keeps it silent. Commit `49ceb8b` says "remove map", but the code stayed.
- Two export paths in `features.js` (`downloadVisualItineraryPNG/PDF` at `3764/3807`, `downloadItineraryPNG/PDF` at `4331/4364`) target hidden elements on a page that does not load html2canvas or jsPDF.
- These functions are never referenced anywhere: `toggleHotelAutoSlide`, `pauseHotelAutoSlide`, `setHotelFilter`, the eight destination, gem and activity slide toggles, and `triggerQuickHeroSearch` (`app.js`), `resetDefaultBlogs` (`blog.js`), and `handleAdminLoginSubmit` and `handleSaveItemSubmit` (`admin.js`).
- `index.html:925-961` is a block of 27 hidden "shim" containers. They exist so the old renderers have somewhere to write. On `index.html`, 2,636 of 3,068 DOM elements and 128 of 138 images sit inside `.hidden` containers (measured in Chrome).
- The role folders `01`-`06` hold prototypes that nothing loads: `planner-component.html` (468 lines), `planner-engine.js` (614), `planner-data-schemas.js` (254, a third copy of the planner hotel table), `planner-ui-spec.json`, `planner-schema.json`, `whatsapp-leadgen.js`, and `qa-test-suite.js`, which re-implements the functions it claims to test.
- `Visit Cox.jpg` (2.0 MB) at the repo root is published to the live site and used nowhere.

**Coupling.** Everything is global. `features.js` and `planner.js` each define a `setWizardStep`; they only avoid a clash because the planner's copy is inside a closure. The renderers reach into `AppState`, `HOTELS_DATA`, `UI_TEXT` and the DOM directly. Script order varies by page, and so do the cache-busting `?v=` values (`index.html:1112-1117` uses `?v=20261014-editorial`, while most pages use none). The planner hard-codes `exchangeRate: 120` (`planner.js:362`) and ignores `CONFIG.exchangeRateUSD`, which is the only thing the admin "settings" tab can change.

**Standards adherence** (against the repo's own `CODING_STANDARDS.md`):

| Standard | Status |
|---|---|
| Cite `source` + `asOf` | Fails. `asOf` appears 0 times in `data.js`. 50 `sourceUrl`s exist, 25 of them Wikimedia photo pages, not price sources. |
| No hype | Fails. 93 hits for "verified/official/guarantee/100%/scam-proof/authoritative" in pages and JS. |
| One source of truth | Fails (table above). |
| Escape untrusted text | Mostly fails (section 6). One `escapeHtml` exists in `admin.js:899`; it is not used elsewhere. |
| Static, survives corrupt storage | Partial. A bad JSON string is caught, but a bad shape or a bad `lang` value breaks pages (section 4). |
| No secrets | Fails. The gate's own secret scan fails on `js/admin.js:25`. |
| Bilingual | Partial. `UI_TEXT` keys match (the test passes), but the whole planner, the transport calculator, the export passes and the WhatsApp message are English only. |
| Test the real code | The new harness does. Two tests exist. |
| Mobile first, 44px taps | No overflow at 375px (good). 32-70 controls per page are under 44px. |
| Image weight < 200 KB | 9 of 17 images are over 200 KB, and the hero is 428 KB. |
| Safety info sourced | Fails (section 5). |

## 3. Bugs

Ranked by harm to a real user.

| # | Sev | Where | What happens | Fix sketch | Status |
|---|---|---|---|---|---|
| 1 | Critical | `itinerary.html:994-998, 1110-1113`, `activities.html:362-363`, `hotels.html:397-400`, `food.html:646`, `culture.html:465`, `spots.html:347`, `transport.html:419`, `index.html:880, 1001`, `js/data.js:162-164, 338-340`, `js/features.js:3754`, `js/blog.js:201` | Four different "Tourist Police" numbers (`01320-169999`, `01320-160000`, `01320-158995`, `01320-160160`), none found in any published source. The national Tourist Police 24/7 helpline is reported as 01320-222222 (launched Sep 2023, Bangladesh Monitor). The "lifeguard" number `01819-012345` is a placeholder pattern and belongs to whoever owns that SIM. Someone in trouble at sea calls a stranger. | Keep one emergency block in `data.js`: 999, plus the Tourist Police helpline with source and date, confirmed by phone. Delete the lifeguard line until SeaSafe gives a number. Render the block from data everywhere, including the export templates. | Confirmed (code). Numbers checked on the web. |
| 2 | Critical | The phone pass template in `itinerary.html:994-1002`, exported by `planner.js:995-1021` | The exported 9:16 "lock-screen wallpaper" bakes `Tourist Police 01320-169999` and `Lifeguard 01819-012345` into a PNG the user is told to keep on their phone. The wrong numbers then live on after the site is fixed. | Same as #1, then re-export. Consider putting only 999 on the image. | Confirmed (exported `phone.png`). |
| 3 | High | `js/planner.js:341` | The "💬 WhatsApp" CTA (`itinerary.html:799`) opens `wa.me/8801819012345`, a placeholder. The message carries the trip name, group, hotel and budget, says "on *visitcox.com*" and asks to "lock in verified hotel rates". That leaks user data to a stranger and makes a false promise. | Hide the button until the owner gives a real number. Read the number from one constant in `data.js`. Drop "verified". | Confirmed. |
| 4 | High | `js/app.js:2275, 2342, 2351` | The hero live search reads `tr.vehicleName.en`, but transport items have `vehicle`, not `vehicleName` (`data.js:2824+`). Any query that doesn't match the first route's text throws `Cannot read properties of undefined (reading 'en')`, and the dropdown never shows. The headline "Where to?" box on the home page is dead on keystroke. | Use `tr.vehicle`. Add a test that runs `handleLiveHeroSearchInput` with "himchari". | Reproduced in Node and in Chrome (2 page errors, dropdown stays hidden). |
| 5 | High | `js/data.js` hotels `deric-eco-village`, `royal-beach-resort`, `coral-reef-hotel`, `inani-royal-resort`, `hotel-sigiriya`, `grace-cox-smart-hotel`, `hotel-upasham`, `neeshorgo-hotel-resort` (`:1081-1811`), `hotel-sea-palace` | Each lists an "official" `sourceUrl` with no DNS record (8 domains), or one pointing to 127.0.0.1 (`hotelseapalacebd.com`). Several phone numbers follow obvious patterns (`1888-223344`, `1822-778899`, `1715-443322`, `1819-667788`, `1847-333555`, `1700-707788`, `1819-000111`). The pages show them as "Verified hotlines" (`hotels.html:239`) with tap-to-call. | Remove every hotel whose phone and site can't be confirmed. Keep about 10 real ones with `source` and `asOf`. | Domains Confirmed (dig). Fabrication Suspected (strong). |
| 6 | High | `js/quickpick.js:7-90` vs `js/planner.js:389-436` | Each home-page quick-pick card shows a fixed total and links to the planner, which then shows a different total and hotel. Measured with the real code: Romance 34,000 becomes 46,650 (+37%). Family 28,500 for 4 with Sea Pearl becomes 17,600 for 2 at Sea Crown. Weekend 15,200 with Prime Park becomes 11,000 at Sea Crown. Backpacker 8,500 becomes 10,900. | Compute the cards from `PlannerApp`'s formula. Pass `pax` in `linkParams`. | Reproduced (Node, real files). |
| 7 | Medium | `js/planner.js:1029-1032` | URL params are not validated. `?days=abc` shows "৳NaN BDT" and "NaN Days / NaN Nights". `?days=400&pax=-3` shows "৳48,25,450", "400 Days / 399 Nights", "-3 Guests" and a 280,000 px-tall page. The setters clamp (`:1055-1071`); the parser does not. | Route the params through the same clamps and whitelist `tier`/`vibe`. | Reproduced in Chrome. |
| 8 | Medium | `js/planner.js:366-368` | Rooms are `ceil(adults/2)`, so kids are ignored. 1 adult plus 10 kids get 1 room. 2 adults plus 4 kids also get 1 room. | Use `ceil((adults + kids*0.5)/2)` or ask for rooms directly. | Reproduced. |
| 9 | Medium | `js/planner.js:370-387` | Transport ignores capacity: 20 people get one chander gari (it seats 10-14) at 2,200 a day. The first branch ("Tomtom / CNG", 800) is unreachable. One person pays the same as three. | Compute vehicles as `ceil(pax / capacity)`. Read fares from `data.js`. | Confirmed (code and run). |
| 10 | Medium | `js/planner.js:837`, the `DAY 0${dayNum}` pattern (also `:756`) | Days 10-14 render as "DAY 010", "DAY 011". | `String(n).padStart(2,'0')`. | Confirmed (code). |
| 11 | Medium | `js/planner.js:477-600` | The schedule is fixed text: "Sunset Golden Hour (5:15 PM)" every day of the year (real sunset varies by about 1.5 hours across the year). Day 2 always has "Himchari ... Waterfall", which is seasonal. Days beyond the blueprints repeat "Custom Coastal Exploration". "Tide sync" claims (collaboration log) are not computed anywhere. | Remove the time-specific claims or compute them. Drop "tide" wording. | Confirmed (code). |
| 12 | Medium | Export passes, `planner.js:971-1021` | html2canvas cuts the bottom of text lines: "Hotel Sea Crown", the trip title and the day titles are visibly clipped in both exported PNGs. | Add line-height and padding on the export card, or set `letterRendering`; then test the export at 375px. | Confirmed (exported images). |
| 13 | Medium | `index.html:957-961` plus `features.js:4450-4469` | On every home-page visit the full hidden studio and stepped itinerary render, along with 128 hidden images (see section 9). | Delete the shims and the code behind them. | Confirmed. |
| 14 | Low | `js/data.js:3037-3069` | A stored CMS object with the wrong shape (for example `{"hotels":[{"id":"x"}]}`) passes the checks and crashes rendering ("reading 'toLocaleString'"). Since the CMS is local-only, only the admin's own browser is affected. | Validate each item, or drop the CMS. | Reproduced (2 page errors on hotels.html). |
| 15 | Low | `js/app.js:16-17` | `localStorage.visit_cox_lang = "fr"` (or any stale value) makes `UI_TEXT[lang]` undefined. hotels.html then renders 0 cards with page errors. The `localStorage` read is also not in try/catch, so a browser that blocks storage throws at load. | Whitelist `en`/`bn` and wrap the read. | Reproduced. |
| 16 | Low | `js/planner.js:963-966` | If html2canvas fails to load (CDN blocked), the export shows "Loading image export library... Please wait a second." and does nothing, for ever. | Say it failed and offer `window.print()`. | Reproduced. |
| 17 | Low | `js/features.js:3764-3770, 3807-3812` | The home-page export buttons fall back to `window.print()` because `index.html` never loads html2canvas or jsPDF. They are hidden today, so there is no user impact yet. | Delete them with #13. | Confirmed. |
| 18 | Low | `js/planner.js:390` | A 1-day trip is charged one hotel night. That is defensible for arrivals, wrong for day-trippers from Chattogram. | Add a "day trip" option. | Confirmed (code). |

## 4. Corner cases and failure modes

| Case | Result | How tested |
|---|---|---|
| Group size 0 | Steppers clamp adults to 1-20 and kids to 0-10 (`planner.js:1062-1068`). Via URL `?pax=0` you get "0 Guests" and a budget for zero adults. | Chrome |
| Group size 1 | 1 room, "CNG / Auto" at 900/day. Fine. | Node |
| Group huge (20 adults) | 10 rooms, one jeep (wrong, see #9). Via URL there is no limit. | Node |
| Days 1 | 1 night charged, 8,250 for 2 people. Plausible. | Node |
| Days max (14) | Works, but shows "DAY 010"-"DAY 014" and repeated filler days. Via URL there is no limit (400 days rendered). | Node, Chrome |
| Empty selections | All activities off: the budget still adds transit plus 600. With a bogus tier, the hotel falls back to Sayeman (luxury) without telling the user. | Node |
| BDT/USD rounding | `convertValueToUSD` gives "$0.08" for 10 BDT. Fine. The planner rounds total and per-person USD separately, so they can disagree by $1. The rate is 120, hard-coded and unsourced (the market rate in 2025-26 is about 122). | Node |
| Language toggle on planner | Nothing changes: after the toggle the planner holds 119 Bangla characters against 4,887 Latin ones. The pass, the WhatsApp text and the transport calculator stay English. | Chrome |
| Language toggle mid-export | Low risk, because the planner ignores language. There is no export in Bangla to test. | Reasoned |
| Corrupt localStorage | Invalid JSON is caught (test passes). A wrong shape crashes the hotels page (#14). A bad `lang` crashes pages (#15). `null` is fine. | Chrome |
| Bad URL params | NaN and negative totals (#7). A `vibe=<img onerror>` payload is rendered with `textContent`, so it is safe. | Chrome |
| Tailwind CDN blocked | The page renders as an unstyled link list, and the inline config throws "tailwind is not defined". The planner still computes. | Chrome, routes aborted |
| html2canvas/jsPDF blocked | The export hangs on an alert (#16). | Chrome |
| Bangla font in exports | The planner pass has no Bangla to render. A Bangla trip name typed into the pass would depend on Hind Siliguri having loaded from Google Fonts. Not tested on a device. | Suspected risk |
| Offline | No service worker or manifest. Offline means nothing loads, so the fare card can't be shown to a driver on the beach with no signal, which is exactly where it is needed. | Code read |
| Slow network | See section 9. | |

## 5. Data accuracy and trust

**Sourcing.** No price or fare has a source or date. `asOf` appears zero times. The header comment in `data.js:5-8` claims everything was "verified against official hotel portals, Bangladesh Tourist Police / Ministry of Health directories". Nothing in the repo supports that.

**Spot check** (helper agent, web, 2026-10-15):

| Claim on site | Evidence | Verdict |
|---|---|---|
| Sayeman 9,500-24,000/night, phone 01755-691917 | Official site lists 01401-777888 (main) and 01755-691917. 2025 packages ran from 7,000 to 29,000. | Phone OK. Range outdated. |
| Sea Pearl 11,000-32,000 | Daily Star 2023: Tk 6,500-50,000; packages from 14,499. | Plausible for standard rooms. |
| Sea Crown 2,500-4,500 | OTA snapshots about BDT 5,000+ | Likely low. |
| "Best Western Plus Heritage (Bay Watch)" | Best Western Heritage exists. No "Bay Watch". | Name wrong. |
| Tomtom town to Sugandha 15-20 (`data.js`) | No current source. Reports put it at 20-30, and the site's own `transport.html` says 20-30. | Unverified, and contradicted internally. |
| CNG to Himchari 300-400 | No source. | Unverified. |
| Chander gari to Inani 1,500-2,000 | District portal (undated): 1,500-2,500. | Plausible. |
| Speedboat to Moheshkhali 80-100, **35 min** | Daily Star Bangla, Feb 2024: ৳70-80, about 20 minutes. | Fare OK. Time wrong. |
| Bike rental on Marine Drive (studio: 1,500/day; skill: 1,000-1,500/day) | Financial Express: 200-500/hour; blogs say 1,300-1,500 for 8 hours. | Plausible, but needs a safety and licensing note. |
| Tourist Police (4 numbers) | Published helpline: 01320-222222 / 01887-878787 | All four wrong or unverifiable. |
| Sadar Hospital 01730-324770 / 01730-324778 | Govt tender notices list 01769-957177 | Unverified, likely wrong. |
| Lifeguard 01819-012345 | SeaSafe operates (2026 reports) with no public number found | Placeholder. |
| "Longest unbroken natural sea beach in the world" | Disputed. Praia do Cassino (Brazil) is longer. | Say "one of the longest". |
| Radiant Fish World "first international marine aquarium tunnel" | No support | Unverified. |

**Internal contradictions** (same trip, different numbers):

| Item | `data.js` | `planner.js` | `transport.html` | `features.js` | skill file |
|---|---|---|---|---|---|
| CNG to Himchari | 300-400 | 300-350 (`:287`) | 400-600 round trip | 350 | 350-450 |
| Inani by jeep | 1,500-2,000 | (CNG 500-600) | 2,800-3,800 round trip | 1,800 | 3,500-4,200 |
| Moheshkhali speedboat | 80-100 | 100-120 "Govt fixed rate" (`:301-302`) | 90 | 180 (return) | — |
| Sayeman/night | 9,500-24,000 | 12,500 | — | midpoint 16,750 | — |

A tourist who checks two pages before arguing with a CNG driver will find the site contradicting itself. The planner card labels its speedboat fare "Govt fixed rate", which is unsourced.

**Ratings and claims.** Hotels carry `rating: "4.8"` and similar with no source. Copy claims "Verified Co-ops & Police Data" (`hotels.html:210`), "Verified by local tourist co-ops, cultural custodians..." (`hotels.html:369`, `food.html:618`, `culture.html:437`), "Official Guide" (6 pages), "live rates" (`hotels.html:239`, `data.js:55`), "Smart AI Guide" (`data.js:174`; it is a keyword matcher with no network call), "REVEAL MY SCAM-PROOF PLAN" and "Under 60 Seconds Match Guarantee" (`itinerary.html:473, 484`), and "The Authoritative Travel Guide" (`index.html:16`). None is backed. The marketing brief `06-marketing-manager/planner-copy.md` also promises "Save 15% to 30% ... with verified beachfront hotels". No partner exists.

**Images.** 26 hotels share 8 photos: `prime-park-hotel.jpg` stands in for 6 hotels and `hotel-sea-crown.jpg` for 5. Sayeman is shown with the generic hero beach. Users see the wrong building for most hotels.

## 6. Security and privacy

- **Credential in a public repo (Confirmed).** `js/admin.js:14-26` holds a plaintext admin password and a second username matching the owner's handle. It is served live at `/js/admin.js` and stays in git history. It protects nothing, but if the owner reuses it anywhere, that account is exposed. Action: rotate that password wherever it is used, and delete `admin.js`. The gate already fails on it.
- **Fake auth (Confirmed).** `admin.js:29-30` trusts `localStorage.visit_cox_admin_session_v1 === 'true'`. Setting that flag in devtools gives "admin" (reproduced: `AdminState.isAuthenticated` was true after reload). Since all edits are saved to the editor's own `localStorage` (`data.js:3071-3086`, `blog.js:247`), no visitor ever sees them. The "CMS" and "blog publisher" are a demo that cannot publish anything, so the real security impact is low. The bigger problem is that the README sells it as a CMS.
- **XSS.** No URL-reflected XSS found: URL params reach the DOM through `textContent` (`planner.js:809-849`). There is self-XSS in the hero search's "No direct matches for "${input.value}"" (`app.js:2361`; once #4 is fixed, typed `<img onerror>` is injected, reproduced). Blog posts and CMS items from `localStorage` are rendered with raw `innerHTML` (`blog.js:427-470, 582`; `app.js` renderers), so a shared-computer attack would be needed. The `onclick` strings built with `'${fare.routeBN}'` (`planner.js:794`) would break on an apostrophe in data. Low today, but the standard says escape.
- **Analytics consent (Confirmed).** Google Analytics `G-KNP95TZB0K` loads on every page before any notice. The `_ga` and `_ga_KNP95TZB0K` cookies were set on first load. There is no privacy page, no consent banner and no mention anywhere. No custom events are defined, so GA collects page views only.
- **WhatsApp data leak:** see bug #3.
- **Headers.** GitHub Pages gives HTTPS and HSTS. There is no CSP, so third-party script from three CDNs runs with full access. That is acceptable for a content site with no secrets, but it is worth knowing.

## 7. UI

Good: the editorial look is coherent (Newsreader serif, stone and terracotta), the home hero is calm, and no page overflows horizontally at 375px.

Problems:
- 234 uses of 9-11px text (`text-[10px]` and similar), heavy on monospace labels. This is hard to read on a cheap phone in sunlight, and Bangla at 10px is close to unreadable.
- Planner steppers (`-`/`+`) are about 30px. 15-70 controls per page measure under 44px.
- Branding is inconsistent: "Visit Cox's Bazar" and "Visit Cox." in headers, "VISIT COX'S BAZAR OFFICIAL GUIDE" on the pass, and "visitcox.com" on exports. That domain was registered in 2017 and looks parked; I could not confirm the owner controls it (Suspected).
- Hotel cards show the wrong photo for most hotels (section 5).
- Emoji used as icons across the planner (🛺, 🚑, ⚡) render differently by phone.
- The home page links "Explore 7 topics" and the "Concierge" bubble float over the first CTA at 375px (tile `shot-375-index.html.png`).
- The export cards are dark, and the text is clipped (#12).

## 8. UX

**Workflow A, "how much will 3 days cost for 2 of us?":** home, then a quick-pick card (34,000), then the planner, which says 46,650 for the same trip (#6). The user can't tell which is right. Neither shows its sources or date.

**Workflow B, "what should I pay the CNG to Himchari?":** the transport table says 300-400, the transport calculator says 400-600 round trip, and the planner's Bangla driver card says 300-350. Three answers. The driver card is a good idea (Bangla text to show the driver), but it uses the least-sourced numbers.

**Workflow C, "find a hotel and call it":** 26 hotels, about 9 with suspect numbers, photos mostly of other hotels, and no availability or booking link. Booking.com or GoZayaan answer this better.

**Workflow D, "emergency":** the user sees one of four Tourist Police numbers depending on the page, plus a placeholder lifeguard number.

**Workflow E, Bangla-speaking visitor** (the largest real audience): the toggle works on listing pages. The planner, its passes, the transport calculator and the WhatsApp message stay English.

**When things go wrong:** search silently does nothing (#4). With the CDN blocked, the export waits for ever (#16). Offline, nothing loads. Bad URLs show NaN. There is no 404 page, so the GitHub default appears.

The wizard ("60-second matchmaker") asks who you travel with, then a persona, then budget. It is pleasant, but it repeats inputs the planner card below asks again. Two UIs for one task.

## 9. Accessibility and performance

**Weight** (decoded bytes, headless Chrome, 375px):

| Page | Bytes | Notes |
|---|---|---|
| index.html | **9.5 MB** | 138 images, 128 of them inside hidden containers. `hero-coxs-bazar.jpg` (418 KB), `najirartek-shutki.jpg` (366 KB) and `moheshkhali.jpg` (335 KB) were each fetched 3 times (probably carousel clones; cause Suspected). gtag 521 KB, Tailwind 397 KB. |
| hotels / spots / activities | 2.1-3.1 MB | |
| itinerary | 2.5 MB | plus html2canvas and jsPDF |
| transport / food / culture | 1.6-1.9 MB | mostly Tailwind, fonts, GA |

At a typical 1-2 Mbps beach connection, the home page alone is roughly 40-80 seconds of transfer (estimate; my throttled run did not apply to the local server, so it is not measured). The Tailwind CDN then compiles CSS in JS on the phone. There is no image `width`/`height` on 138 of 138 home-page images, so the page jumps as images load. Nine of 17 images exceed the repo's own 200 KB limit.

**Accessibility:**
- No `prefers-reduced-motion` handling, while four carousels auto-advance (`app.js`, about 4.8 s).
- 27 `outline-none` uses. There are some focus rings, but they are not consistent.
- `<html lang>` does switch to `bn` on toggle (`app.js:80`). That is good.
- All images have `alt`. That is good.
- Tiny text and small tap targets (section 7).
- The Bangla hotel names embed English in parentheses ("সায়মন বিচ রিসোর্ট (Sayeman Beach Resort)"). That is noisy, but it helps users search.
- No screen-reader test was done.

## 10. SEO

| Check | State |
|---|---|
| `sitemap.xml`, `robots.txt` | 404 on live |
| Canonical | none on any page |
| Open Graph / Twitter cards | none on any page, so WhatsApp and Facebook shares (the main distribution channel) get no preview image |
| Titles | 57-78 characters. 6 of 9 exceed 60. |
| Descriptions | 115-202 characters. 8 of 9 exceed 155. |
| JSON-LD | Only `itinerary.html:23-44`. It says "World's longest unbroken natural sea beach" and "verified" and describes a `Trip` that is really a tool. No FAQPage even though FAQs exist. |
| hreflang / Bangla URLs | None. Bangla content is JS-toggled on the same URL, so Google indexes English only. That gives up the Bangla search market, where competition is weaker. |
| Content in HTML | Hotel, spot and fare listings are rendered by JS from `data.js`. Google can render JS, but slowly. Most crawlers and link previews see shells. |
| 404 | GitHub default page |
| Domain | `iamanikbarua.github.io/Visit-Cox/`, a personal subpath with weak authority |

The SEO brief in `05-seo-specialist/WORKSPACE.md` is sound. None of it is done.

## 11. Testing and verification

**What exists:** `tests/data.test.js` has 2 tests. They check that `UI_TEXT.en` and `UI_TEXT.bn` have matching keys, and that invalid JSON in the CMS key doesn't crash `data.js`. Both pass. The harness (`tests/helpers.js`) loads the real files. That is a good base.

**What they don't prove:** anything about the planner math, quick-pick consistency, search, rendering, exports, URL params, phone-number validity, or price invariants (min ≤ max, no negatives). The live-search crash (#4) has been in production since at least 2026-10-13 and no test would catch it.

**Gate:** `scripts/check.sh` exits 1 (the `no secrets` step fails on `js/admin.js:25`). Other steps pass. There is no CI on GitHub, so the gate only runs if someone remembers.

**Old QA claims** (`04-qa-engineer/QA_REPORT.md`):
- "✅ ALL TESTS PASSED". The suite (`qa-test-suite.js:20-22`) copies `calcRooms` instead of loading the real function, so it proves nothing about shipped code.
- TC-04 to TC-07 claim "Clean download, no font clipping" and "Hind Siliguri glyphs render crisply on the canvas pass export". The export clips text (#12), and the pass contains no Bangla.
- TC-06 "Clamped [1, 14]" is true for the buttons and false for URL params (#7).
- TC-08 "URL encoded correctly" is true, but the number is a placeholder.
- The collaboration log says "QA Passed & Merged to Production ✅" and "100% scam-proof guarantee". Treat the whole log as marketing, not evidence.

## 12. Deploy and operations

- Hosted on GitHub Pages from `main` with HTTPS and HSTS, and `cache-control: max-age=600`. Fine.
- Local `main` (`2ffe217`) is 1 commit ahead of `origin/main`. Live is `2bb73c9`.
- No CI, no uptime check, no error tracking (GA doesn't record JS errors), no custom 404, no sitemap.
- All 33 commits fall between 2026-10-12 and 2026-10-15. That is a three-day agent build with no human review visible.
- Rollback is `git revert` plus push, which is fine for a static site.
- Runtime dependencies on four third-party hosts (Tailwind CDN, cdnjs, Google Fonts, Google Tag Manager). Tailwind's CDN is not meant for production and could change behaviour under you. The version is unpinned: `cdn.tailwindcss.com` currently serves 3.4.17.
- No `LICENSE` file. The repo is public with no stated terms for code or content.

## 13. Legal and compliance

- **Wrong emergency numbers** are the top legal and ethical risk. Publishing a stranger's number as "lifeguard" and wrong police lines as "Official 24/7 Emergency Contacts... Verified Bangladesh Government" (`data.js:158-159`) invites harm and complaint.
- **Personal data:** the WhatsApp payload goes to an unknown number (#3).
- **Privacy:** GA cookies are set with no notice. Bangladesh's Personal Data Protection Ordinance 2025 and EU/UK visitors (foreign tourists are part of the target audience) both expect notice, and the EU expects consent for analytics cookies. Add a privacy page, or switch to cookie-free analytics (GoatCounter, which `decision.md` already suggests for Suggest.Bike).
- **Hotel names, photos and claims:** listing hotels with invented phone numbers, "official" websites that don't exist, unsourced star ratings and the wrong hotel's photo can mislead consumers and may draw complaints from those hotels. Using real names factually is fine; inventing their contact details is not.
- **Image licensing:** 25 Wikimedia Commons sources are cited in data, but no attribution is shown to users and licences are not named. CC BY and CC BY-SA require visible author, licence and link. Hotel photos (`hotel-sea-crown.jpg`, `hotel-kollol.jpg`, `prime-park-hotel.jpg`, `white-orchid.jpg`) have no source at all, so assume they are copyrighted.
- **"Official"** wording on a private site, together with the "Govt fixed rate" text, can read as impersonating a government service. Remove it.
- **visitcox.com** appears on exports and in the WhatsApp text. If the owner doesn't own it, that is free promotion for, and possible confusion with, someone else's domain.
- No terms of use or disclaimer that prices are estimates. There is one disclaimer string (`data.js:121`), but it is not on the planner.

## 14. Market, demand and marketability

**Who it serves.** Mostly domestic Bangladeshi first-timers and families (the big volume, peak Nov-Feb plus Eid holidays), plus a small stream of foreigners. Domestic users search and read in Bangla and plan in Facebook groups. The site is English-first.

**Real demand.** Cox's Bazar is Bangladesh's biggest leisure destination, and "Cox's Bazar trip cost" content gets large engagement in Bangla on Facebook and YouTube. The pain is real: overcharging by CNG and jeep drivers and hotel price swings at peak. Fare honesty is a genuine wedge. There is no evidence yet that anyone uses this site: GA exists, but no numbers were shared, there are no events, the repo has 0 stars, and there is no feedback channel.

**Competitors:**

| Competitor | What they do well | Gap Visit Cox could fill |
|---|---|---|
| Facebook groups (Travelers of Bangladesh and others) | Trust, recency, real trip cost breakdowns, huge reach | Unstructured, hard to search, no calculator |
| YouTube and Facebook vloggers | Trust through faces, Bangla, recent prices | Not searchable as a table |
| Booking.com / Agoda | Live hotel prices, reviews, booking | No local fares, no budget for the whole trip |
| GoZayaan / ShareTrip | Bangladeshi OTAs, packages, bKash payment | No fare guide or budget planner found |
| Tripadvisor | Reviews, foreign audience | Weak on local fares, little Bangla |
| coxsbazar.gov.bd district portal | Official, has a jeep fare range | Thin, undated |
| Generic calculators (travelcostcalculator.org, Champion Traveler) | Show up in search | USD-only, generic, no local detail |
| Daily Star Bangla / Prothom Alo travel features | Dated, sourced BDT fares | Articles, not a tool |

No one offers a structured, sourced, Bangla, BDT budget plus fare card. That niche is real but narrow, and it is only defensible if the numbers are trustworthy and recent, which is exactly where Visit Cox fails today.

**Who pays.**
1. Hotel affiliate commission via Booking.com or Agoda links. Easiest, low per-booking yield.
2. Paid WhatsApp leads or featured listings from local hotels and tour operators. Needs traffic first, and once money flows a "fair" guide has a conflict of interest that must be disclosed.
3. Display ads. Negligible at this scale.

Realistically this is a side-project or lead-gen asset, not a business, until it has several thousand monthly visitors.

**Pricing:** free to users. Any partner fee is an owner decision. There is nothing to price yet.

**Distribution:** Facebook group posts and shareable Bangla fare cards (images) are the channel. The export feature could suit that, but it is English-only, clipped, and carries wrong numbers. There is also SEO for Bangla queries ("কক্সবাজার সিএনজি ভাড়া", "কক্সবাজার ভ্রমণ খরচ"), which the site can't rank for today because Bangla is JS-only.

**Why switch:** "one page, current fares with dates and sources, in Bangla, works offline on the beach". Today the site offers none of those four.

**Site claims against reality:**

| Claim | Reality |
|---|---|
| "Authoritative", "Official Guide" | A personal GitHub Pages site |
| "Verified hotlines", "Verified Co-ops & Police Data" | Several invented contacts. Police numbers wrong. |
| "live rates" | Static numbers, no dates |
| "Smart AI Guide" | Keyword matching |
| "Scam-proof plan", "Govt fixed rate" | Unsourced, and internally contradictory |
| "Interactive Tourist Map (Leaflet)" (README) | Removed. Dead code. |
| "CMS" | Edits stay in one browser |
| "QA Passed" | Tests re-implemented the code |

## 15. GTM % breakdown

| Dimension (weight) | Score /10 | Why |
|---|---|---|
| Product works (25) | 3 | Pages load without errors and the planner computes. But search is dead, the CTA goes to a placeholder, quick-pick and planner disagree, and the planner is English-only. |
| Quality and verification (15) | 2 | 2 real tests, gate red, no CI, no device test. The old QA report is false. |
| Security and privacy (15) | 4 | Static and serverless, so there is little to steal. But a plaintext credential is public, auth is fake, GA cookies are set without notice, and trip data goes to an unknown WhatsApp number. |
| Legal and compliance (10) | 1 | Wrong emergency numbers presented as "Verified Government". No privacy page, no image attribution, possibly invented hotel contacts, no licence. |
| Market validation (15) | 1 | No users, partners or feedback shown. |
| Deploy and operations (10) | 4 | Live on HTTPS. No CI, sitemap, 404 or monitoring. HEAD not deployed. |
| Claims honesty (10) | 1 | "Official", "verified", "scam-proof", "AI", "live" and "guarantee" throughout, none backed. |

Weighted: (3×25 + 2×15 + 4×15 + 1×10 + 1×15 + 4×10 + 1×10) / 10 = (75 + 30 + 60 + 10 + 15 + 40 + 10) / 10 = **24.0**.

**Cap: 15.** A guide that tells tourists to call wrong emergency numbers, and bakes a placeholder "lifeguard" number into a lock-screen image, is unsafe to promote whatever else it scores. The cap lifts to about 35 once these are done: emergency numbers sourced and confirmed, the WhatsApp CTA hidden, unverifiable hotels removed and hype removed. **Final: 15%.**

## 16. What to cut or stop doing

1. **Stop adding features.** The last four commits added a matchmaker, quick pick, dual exporter and "tide sync" on top of unsourced data. Every new widget multiplied the price tables.
2. **Delete the dead code:** the Leaflet map, the hidden studio, the stepped itinerary, the `index.html` shims, the unused exports and the unused functions. That is roughly 3,000-4,000 lines of `features.js` and `app.js`. The home page then drops from 9.5 MB to about 1-2 MB.
3. **Delete `js/admin.js` and the blog "publisher".** They can't publish to anyone. If the owner wants to edit content, edit `data.js` in git or use a free headless option later.
4. **Delete the role-folder prototypes and the old QA report.** Keep only each `WORKSPACE.md`. Delete `Visit Cox.jpg` from the site root.
5. **Pick one planner** (`PlannerApp` on itinerary.html) and one fare table (`data.js`). Make quick pick, the transport calculator and the driver card read from them. Delete the fare tables inside the skill files.
6. **Cut the hotel list to the ones you can verify,** 8-12 of them. Twenty-six hotels with invented contacts is worse than ten real ones.
7. **Stop using** "official", "verified", "authoritative", "scam-proof", "guarantee", "AI", "live rates" and "visitcox.com" (unless owned).
8. **Drop the 6-agent ceremony** for now (collaboration log, sprint board). It produced confident reports about broken things. One agent with the gate and a reviewer is enough at this size.

## 17. Top 10 next actions

Ordered by value. "Agent alone" means an agent can do it without the owner.

| # | Action | Effort | Who | Agent alone? |
|---|---|---|---|---|
| 1 | Replace every emergency number with one data-driven block: 999 plus the Tourist Police helpline, with source and date. Remove the lifeguard placeholder. Fix both export templates. Owner confirms the helpline by phone. | 2 h agent + 10 min owner call | data + frontend, owner confirms | Mostly. The final number needs owner confirmation. |
| 2 | Hide the WhatsApp CTA (`planner.js:341`, `itinerary.html:799`) until a real number exists. Remove "visitcox.com" unless owned. | 30 min | frontend | Yes |
| 3 | Fix live search (`app.js:2275, 2342, 2351`: `vehicle` not `vehicleName`) and escape the echoed query (`:2361`). Add a test. | 1 h | frontend + qa | Yes |
| 4 | Delete `js/admin.js` and the blog publisher UI so the gate goes green. Owner rotates that password anywhere it's reused. | 1 h + owner 5 min | data + frontend, owner | Yes (rotation is owner) |
| 5 | Remove the hype words site-wide and add a visible "prices are estimates, last checked <date>" line on every price block. | 2-3 h | marketing + uiux | Yes |
| 6 | Cut hotels to those with a resolving official site or OTA page and a confirmed phone. Add `source` and `asOf` to every price and fare. Reconcile the five fare tables into `data.js`. | 1-2 days | data | Agent drafts; owner or a local contact confirms fares by phone or visit |
| 7 | Make quick pick and the transport calculator read from `PlannerApp` and `data.js`. Validate URL params. Fix rooms for kids, vehicles by capacity, and the "DAY 010" label. Add tests for each, plus a min ≤ max price invariant. | 1 day | frontend + qa | Yes |
| 8 | Delete the dead code and hidden shims (section 16.2), compress images under 200 KB with width and height set, and replace the Tailwind CDN with a prebuilt CSS file (needs owner approval for a build step, or hand-write the small subset). Target: home page under 1.5 MB. | 1 day | frontend + uiux | Yes, except the build-step approval |
| 9 | SEO basics: sitemap, robots, canonical, OG image per page, custom 404, FAQPage JSON-LD, honest titles and descriptions. Plan Bangla URLs (`/bn/`) as the main Bangla play. | 0.5 day, plus 2-3 days for `/bn/` pages | seo | Yes |
| 10 | Owner decisions for `todo.md`: (a) switch GA to GoatCounter or add a privacy page and consent notice; (b) WhatsApp number and any partner; (c) image permissions and Wikimedia attributions; (d) a LICENSE; (e) whether `visitcox.com` is owned. Then 5 real users from a Facebook group try the planner and report the fares they actually paid. | Owner 2-3 h, then 1 week of listening | owner (marketing drafts the post) | No |

After 1-5 and 7, re-score: expect about 30-35%. After 6, 8, 9 and real fare feedback (10), about 40%.
