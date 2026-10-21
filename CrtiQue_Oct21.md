# Visit Cox: independent critique, 2026-10-21

Reviewer: independent, read-only. Code reviewed: local `main` at `584b7a9`, which is 3 commits ahead of `origin/main` (`9d9856c`). The live site at https://iamanikbarua.github.io/Visit-Cox/ serves `9d9856c`: I compared the live `index.html`, `itinerary.html`, `hotels.html` and `js/app.js` byte for byte with `origin/main`, and they match. Baseline: `CrtiQue_Oct15.md`.

What I did:
- Read `AGENTS.md`, `CODING_STANDARDS.md`, `README.md`, `judge.md` (Update 8 first), `todo.md`, `collaboration_log.md`, the six skills, the role folders, the scorecard entry and `../decision.md`.
- Read the shipped code in `js/` and the pages.
- Cloned the repo into the scratchpad and ran `npm ci` and `scripts/check.sh` there. All 7 steps passed with 51 tests, and the clone's tree stayed clean.
- Ran the real planner and chatbot in Node through `tests/helpers.js`.
- Served the clone and drove it with headless Chrome at 375x812 and 1280x800 (viewport tiles only), in English and বাংলা, including both pass exports and a run with the CDN blocked.
- Measured live transfer sizes, sent GETs to the live site and to `coxbazar.xyz`, and spot-checked 12 facts on the web.

"Confirmed" means I traced the code or reproduced the result. "Suspected" means the evidence is strong but not proven.

## 0. Since 2026-10-15

| # | Baseline finding | Status | Evidence |
|---|---|---|---|
| B1 | Four wrong Tourist Police numbers, placeholder lifeguard | **Fixed** | `js/data.js:11-15` (999 plus 01320-222222 and 01887-878787, with source and asOf). The 2023 helpline launch report matches. Tests `#1/#2` cover it. |
| B2 | Wrong numbers baked into the phone-pass PNG | **Fixed** | Exported the bn and en phone passes: only 999 and the two helplines, and `01887-878787` no longer wraps. |
| B3 | WhatsApp CTA sends trip data to a placeholder number | **Fixed** | `js/data.js:16` (`whatsapp: null`); `js/planner.js:539-542` returns null, so the button stays hidden. |
| B4 | Hero live search crashes (`vehicleName`) | **Fixed** | No `vehicleName` left in `js/app.js`. Test `#4`. |
| B5 | Invented hotels, dead "official" sites, patterned phones | **Partly fixed** | 10 removed, 16 left. Every hotel is still `approx: true, asOf: 2026-10-15` (`js/data.js:407-408` and the rest). Long Beach's phone (`:814`) still differs from public listings (section 5). |
| B6 | Quick-pick totals disagree with the planner | **Fixed** | Quick pick calls `PlannerApp.estimate`; test `#6`. |
| B7 | URL params give NaN and negative totals | **Fixed** | `js/planner.js:607-634`. `?days=400&pax=-3` clamps to 14/1. |
| B8 | Kids ignored for rooms | **Fixed** | `js/planner.js:637-639`. |
| B9 | Vehicles ignore capacity | **Fixed** | `js/planner.js:642-651`. Thirty travellers get 3 jeeps. |
| B10 | "DAY 010" | **Fixed** | Test `#10`. |
| B11 | Fixed sunset times, "tide sync" claims | **Mostly fixed** | No computed-time claims left. "Best at low tide" stays as advice (`js/planner.js:806-807`), which is fine. |
| B12 | Export clips text | **Fixed** | `js/planner.js:1353-1362`. Both passes export whole in en and bn (1600x1416 and 720x1280), and the Bangla renders cleanly. |
| B13 | Hidden studio and 128 hidden images on the home page | **Fixed** | `features.js` is deleted. The home page now has 10 images. |
| B14 | Corrupt CMS shape crashes hotels | **No longer applies** | The CMS is deleted. |
| B15 | A bad stored `lang` breaks pages; storage read not guarded | **Fixed** | `js/app.js:16-24` (`readPref` whitelist); two tests. |
| B16 | Export hangs when html2canvas is blocked | **Fixed** | `js/planner.js:1337-1340`. With cdnjs blocked I got a "Print this page instead?" dialog. |
| B17 | Home-page export buttons fall back to print | **No longer applies** | Deleted. |
| B18 | A 1-day trip is charged a hotel night | **Still open** | `js/planner.js:654` (`nights = max(1, days-1)`). |
| S2a | Dead Leaflet map, studio, shims, role-folder prototypes, `Visit Cox.jpg` | **Fixed** | `js/` has 7 files; the role folders hold only briefs. |
| S2b | Unused functions | **Partly** | The hero carousel (`js/app.js:150-171`, `:188`, `:1983-2019`) writes to `#hero-badge`, which no page has. Ten autoplay ids (`hotel-autoplay-label`...) exist on no page. The chatbot keeps 10 aliases for deleted hotels (`js/app.js:2270-2287`). |
| S2c | Tailwind Play CDN in production | **Fixed locally, open live** | Local: `css/tailwind.css`, 48 KB (9 KB gzipped). Live still loads `cdn.tailwindcss.com` (124 KB gzipped, measured). |
| S2d | Planner hard-codes `exchangeRate: 120` | **Still open** | `js/planner.js:597` duplicates `CONFIG.exchangeRateUSD` (`js/data.js:19`). Same value today, so nothing visible. |
| S2e | Six price tables | **Partly fixed** | The planner, quick pick, transport calculator and driver card read `PRICE_BOOK`/`TRANSPORT_DATA`. Still copied: 45 price literals in the chatbot (`js/app.js`), plus prices in `js/blog.js`, `food.html` and `culture.html:273`. They contradict the data (section 5). |
| S2f | `asOf` appears 0 times | **Mostly fixed** | Emergency, hotels, `PRICE_BOOK`, FAQ 2/7/8 and parasailing are covered. 9 of 10 `ACTIVITIES_DATA` entries have no `asOf` or `approx`. |
| S2g | 93 hype words | **Fixed** | No "verified/official/guarantee/scam-proof" left in shipped files. Unsourced superlatives about hotels remain (`js/data.js:505` "Bangladesh's largest 5-star"). |
| S2h | 32-70 controls under 44 px | **Fixed** | 0 under 44 px on 22 page loads with a coarse pointer. |
| S2i | 9 of 17 images over 200 KB; no width/height | **Half fixed** | The largest image is now 207 KB (the hero). Still, 0 of 69 rendered images have width and height (layout shift). |
| S5a | 26 hotels share 8 photos | **Still open, and worse than it looked** | 12 of 16 use another building or a beach. `hotel-kollol.jpg` shows a building signed "Hotel Sea Palace Limited", one of the hotels removed as unverifiable. It is the photo for Best Western, Kollol and Praasad Paradise (`js/data.js:757`, `:933`, `:1229`). |
| S6a | Plaintext admin credential | **Fixed in tree, open in history** | `js/admin.js` is deleted, but `raw.githubusercontent.com/.../2bb73c9/js/admin.js` still returns 200. Rotation is unchecked in `todo.md`. |
| S6b | Fake client-side auth | **No longer applies** | Deleted. |
| S6c | Self-XSS in the search echo | **Fixed** | `escapeHTML`; test "hero search echoes typed text escaped". |
| S6d | GA cookies without consent | **Fixed** | `js/consent.js`; 6 tests; `privacy.html`. |
| S6e | No CSP | **Fixed (weak)** | Meta CSP on every page, but `script-src` allows `'unsafe-inline'` and all of cdnjs. |
| S7a | 234 uses of 9-11 px text | **Partly** | 35 (home) to 96 (planner) rendered text elements under 12 px at 375 px. |
| S7b | Brand drift, `visitcox.com` | **Partly** | `visitcox.com` is gone. The pages say "Visit Cox's Bazar", "Visit Cox." and "VISIT COX". |
| S8a | Planner English-only | **Fixed** | The bn planner, passes and schedule render in Bangla (export viewed). |
| S9a | Home page 9.5 MB | **Fixed** | Live 806 KB transferred. Local main is about 690 KB once the Tailwind CDN is gone (estimate). |
| S9b | No `prefers-reduced-motion` | **Fixed** | `css/styles.css:468-476`. |
| S10a | No sitemap, robots, canonical, OG, 404, FAQPage | **Fixed** | Every page has a canonical and an OG image; 3 valid JSON-LD blocks; custom 404. |
| S10b | No hreflang or Bangla URLs | **Still open** | Bangla is still a JS toggle on one URL. |
| S11a | 2 tests, gate red, no CI, false QA report | **Fixed** | 51 tests, gate green, `.github/workflows/check.yml` written. CI has never run on GitHub (not pushed). |
| S12a | No LICENSE | **Still open** | No file; the footer says "© 2026 VISIT COX. ALL RIGHTS RESERVED." with no named owner. |
| S13a | Image licensing, no attribution | **Still open** | Credits name no author or licence, and several point at the wrong file (section 5). |
| S13b | No disclaimer that prices are estimates | **Fixed** | FAQ 6, the "estimate, as of Oct 2026" labels, and the modal's "Estimated Nightly Rate". |
| S14a | Offline: nothing loads on the beach | **Still open** | No service worker or manifest. |
| S14b | No users, feedback or measurement | **Still open** | No "report a price" link anywhere. The Facebook test has not run. GA mixes two hosts. |

Totals: 46 baseline items. 30 are fixed, mostly fixed or no longer apply; 8 are partly fixed; 8 are still open.

## 1. Verdict up front

- **What it is:** an 11-page static guide to Cox's Bazar in English and Bangla. It has hotel, spot, food, activity and fare listings, a trip planner that prices a trip and exports a lock-screen pass, and a keyword "Concierge" chat on every page.
- **Who it is for:** first-time domestic visitors planning 2-4 days on a phone, plus a few foreigners.
- **State:** the plumbing is now good: one price book, sourced emergency numbers, a real test suite, Bangla planner and passes, consent-gated GA. The weak points are the chat and the content. The "Concierge" answers "emergency", "999", "hospital", "tourist police", "hello" and most other questions with a surfing-lesson price card (bug H1, live since 2026-10-13). Hotel cards still show other buildings, one of them signed "Hotel Sea Palace". Nobody has used it yet.
- **Continue?** Yes, cheaply. Fix the chat (or delete it), fix the photos, record the owner's phone and fare checks in the data, push, then run the Facebook test. Stop polishing until real visitors have said whether the numbers are right.
- **GTM readiness: 35%** (weighted 45, capped at 35).

**Compared with the scorecard:** the scorecard has Visit-Cox at 30 (weighted 42.5, capped at 30 "until a re-critique confirms it"). This critique confirms most of what the 2026-10-18 re-score assumed, and the Oct 15 cap reason (wrong emergency numbers) is fixed. I land 5 points higher: 45 weighted, capped at 35, not 30. Part of the gain is the prebuilt CSS and CI. The rest is that the exports, Bangla and planner math hold up when tested. I do not go higher, for three reasons. The chat bug sends emergency questions to a surfing card. A quarter of the hotel cards show the wrong building. And the cap must stay below projects with real deployments and users. That puts Visit-Cox below Suggest.Bike (55), level with or just under TakaTalks and ThrottleIQ (40), and above PotholeAlertBD, Caffeinate and TRACON (30). The live site differs only in Tailwind delivery and 3 small Bangla fixes, so it scores the same: the cap binds either way.

## 2. Code and architecture

**Shape.** 11 root pages and 7 plain scripts with no build except CSS. Line counts: `app.js` 3,289, `data.js` 2,608, `planner.js` 1,499, `blog.js` 637, `page-text.js` 418, `quickpick.js` 148, `consent.js` 99. That is about 8,700 lines, down from about 14,600. The structure fits a content site on GitHub Pages. The Tailwind CLI build (`package.json`, pinned 3.4.17) is the right minimal step, and `scripts/check.sh` verifies the CSS is fresh.

**What is good now.**
- One budget formula: `PlannerApp.estimate` (`js/planner.js:653-700`), used by quick pick.
- `PRICE_BOOK` (`js/data.js:2544-2603`) holds every planner price with `asOf` and `approx`. `fareById` (`:2606`) joins the two fare tables.
- Untrusted text goes through `escapeHTML` (`js/app.js:33`) or `plannerEsc` (`js/planner.js:8`). URL params are clamped and whitelisted (`js/planner.js:626-634`).
- The tests load the real files (`tests/helpers.js`).

**Problems.**
1. **The chatbot is a second content system.** `fetchTravelAssistantReply` (`js/app.js:2249-3052`) is about 800 lines of hand-written HTML answers with 45 hard-coded prices (`formatPriceRange(1500, 2000)`, `fmtSingle(120)` and so on). This breaks "one source of truth": the chat quotes ~120 for Himchari entry while `PRICE_BOOK` says 50 (`js/data.js:2575`). It routes by `q.includes(...)` substring checks in a fixed order, which is how H1 and H2 happen. No test covers its routing beyond two queries.
2. **Price copies outside `data.js`:**
   - `js/blog.js:31-42` (bike 1,500/day; a jeep covering Himchari and Inani for 1,500-2,000; parasailing 1,500)
   - `food.html:242-419` (seven "Avg" ranges)
   - `culture.html:273` ("Reserved CNG: ৳400–৳600 roundtrip" to Ramu, while `TRANSPORT_DATA` says 400-500)
   - `itinerary.html:532-564` (a static ৳18,500 total and line items that the code replaces with ৳17,950)
3. **Dead code:** the hero carousel and its scene badges (`js/app.js:150-171`; `#hero-badge` exists on no page), autoplay UI ids that exist on no page, chatbot aliases for 10 deleted hotels (`js/app.js:2270-2287`), and the unused jsPDF tag (`itinerary.html:64`).
4. **Planner duplicates config:** `exchangeRate: 120` at `js/planner.js:597` instead of `CONFIG.exchangeRateUSD`.
5. **Agent instructions are stale.** They guide the six role agents and can reintroduce old faults:
   - `.agents/skills/visual-itinerary-pass-exporter/SKILL.md` still points at `js/features.js` and a jsPDF flow.
   - `.agents/skills/whatsapp-concierge-leadgen/SKILL.md:47-49` still tells agents to add "১০০% নিরাপদ ও ভেরিফাইড পার্টনার্স" next to the button and "Visit-Cox.com" to the message.
   - `.agents/skills/travel-seo-and-schema/SKILL.md:24` says "longest unbroken natural sandy sea beach in the world".
   - `collaboration_log.md` still says "QA Passed & Merged to Production ✅" and "100% scam-proof guarantee".
6. **`scripts/check.sh` writes to the tree.** Its `tailwind_css` step rebuilds `css/tailwind.css` in place when the file is stale. That is deliberate (`judge.md` Update 8), but a "check" that edits a tracked file surprises reviewers and read-only agents.

**Standards adherence** (`CODING_STANDARDS.md`):

| Standard | Status |
|---|---|
| Cite source + asOf | Mostly. Activities (9 of 10) and every chatbot, blog and food-page price have none. |
| No hype | Pass in UI copy. Hotel superlatives (`js/data.js:505`, "world-renowned") are unsourced. |
| One source of truth | Fails for the chatbot, blog, `food.html` and `culture.html` (above). |
| Escape | Pass. |
| Static, survives bad storage | Pass (tests). |
| No secrets | Pass in tree; history still has the old admin file. |
| Bilingual | Pass for the planner and pages (1-16 English blocks per page in bn mode, mostly names). The chat in bn mode has the same routing bug. |
| Test the real code | Pass. |
| Mobile first | Pass for overflow and tap size. Small text remains. |
| Weight | Images pass on size, fail on width/height. |
| Safety info sourced | Pass for the numbers. Fails in the chat, which hides them (H1). |

## 3. Bugs

Ranked by harm to a real user.

| # | Sev | Where | What happens | Fix sketch | Status |
|---|---|---|---|---|---|
| H1 | **High** | `js/app.js:2688` | The activity matcher tests `bn.includes(k)`, where `bn` is the activity's own Bangla name. Surfing's Bangla name is "সার্ফিং ও ওয়েভ রাইডিং (Surfing Lesson)", which contains its key "surfing", so the check is always true. Every question that misses the earlier spot, hotel and food matchers gets the surfing-lesson card. Sections 5-10 of the chat never run: bike rental, how to reach Cox's Bazar, trip budget, **emergency/police/hospital**, the hotel list and the greeting. Reproduced: "emergency", "999", "tourist police", "police number", "hospital", "ambulance", "lifeguard", "জরুরি নম্বর", "hello", "Best time to visit?", "Top 10 activities list", "bus from dhaka", and the chat's own chip "Marine Drive bike cost?" all return "🏄 Surfing & Ocean Wave Riding, 1,500 - 2,500 BDT". Present since `6337369` (2026-10-13) and live. | Replace with `actKeys.some(k => q.includes(k)) \|\| q.includes(bn)`. Move the emergency block (`:2911-2930`) to the top of the function. Add a test that every chip and "emergency", "999", "জরুরি", "পুলিশ" return the right section. | Confirmed (Node, real files) |
| H2 | Medium | `js/app.js:2360` | Bangla "পুলিশ" (police) contains "পুল" (pool), so the chat lists hotels with swimming pools. | Same fix: check emergency words first, and match whole words. | Confirmed |
| H3 | Medium | `js/data.js:757`, `:933`, `:1229` (`hotel-kollol.jpg`); `:635`, `:817`, `:991`, `:1345` (`prime-park-hotel.jpg`) | 12 of 16 hotel cards show another building, a dining room or a beach. Three hotels show a photo with a "Hotel Sea Palace Limited" sign. Ocean Paradise shows Prime Park's dining room. That misleads buyers and invites complaints from both brands. | Use a labelled placeholder (name and zone, "photo not available") until each hotel's own licensed photo exists. | Confirmed (image viewed) |
| H4 | Medium | `js/app.js:1146`; `js/data.js:1593`, `:1637` and others | Place credits print "✓ Wikimedia Commons (Kutubdia)" over the Moheshkhali Adinath Temple photo. Dulhazra's credit links to a Himchari file but the image is `kolatoli-eco.jpg`. The Rakhine village uses the Ramu Buddha image with an Adinath credit. No credit names an author or licence. | Point each credit at the real file with author and licence, or drop the ✓ and use a placeholder. | Confirmed |
| H5 | Medium | `js/app.js:126`, `:131`, `:138`, `:143` | Inactive "বাংলা" and "$ USD" pills are `text-sky-100` on the cream header. Measured: rgb(224,242,254) on rgb(245,243,239), about 1.06:1. The Bangla audience can barely see the button that serves them (desktop header; on mobile it sits in the drawer). | Use the charcoal/stone tokens for inactive pills (≥ 4.5:1). | Confirmed (screenshot, computed styles) |
| H6 | Medium | `js/app.js:2410` vs `js/data.js:2590-2592`; `js/blog.js:39` | The chat and the blog say a chander gari covering **Himchari and Inani** costs 1,500-2,000. `PRICE_BOOK` says Himchari alone, round trip by jeep, is 1,800-2,500. The planner charges 2,200 a day. On a fair-fare site, the fare a tourist quotes to a driver depends on which page they read. | Render chat and blog fares from `fareById()`; delete the literals. | Confirmed |
| H7 | Medium | `js/planner.js:678-679` vs `:1021-1030`, `itinerary.html:548-565` | The total silently adds a 10% buffer, so the four line items never add up. Default trip: 7,000 + 4,800 + 3,600 + 900 = 16,300, total ৳17,950. A user checking the sum sees ৳1,650 unexplained. | Show a fifth line "Buffer (10%)" or drop it. | Confirmed (screenshot, Node) |
| H8 | Low | `js/app.js:2273` | The chat alias uses id `praasad-paradise-hotel`, but the data id is `praasad-paradise` (`js/data.js:1172`), so "praasad" never shows that hotel (it falls to H1). | Fix the id; derive aliases from `HOTELS_DATA`. | Confirmed |
| H9 | Low | `js/app.js:2488-2492` | The chat recommends "Nisanah Resort (1,500 - 3,000/night)", a hotel removed from the list. Its chip "Nisanah Resort details" returns the surfing card. | Delete the line and the chip. | Confirmed |
| H10 | Low | `itinerary.html:64` | jsPDF (94 KB gzipped, measured live) loads on the planner page; no code uses it. | Delete the tag and its CSP need. | Confirmed |
| H11 | Low | `js/planner.js:1379-1381` | A Bangla trip name becomes `___________-3-Days-Pass.png`. | Keep Unicode letters (`\p{L}`), or fall back to the default name. | Reproduced |
| H12 | Low | `js/app.js:2829-2838` | The chat calls the ৳1,325 train class "AC Snigdha". On Dhaka to Cox's Bazar, 1,325 is the AC chair (Dhaka Tribune, Dec 2023). | Fix the label, move it to `data.js` with source and date. | Confirmed against source |
| H13 | Low | `js/planner.js:654` | A 1-day trip is charged one hotel night (B18). | "Day trip" option. | Confirmed |
| H14 | Low | `itinerary.html:532-564` | The static fallback shows ৳18,500 and other line items until JS runs. With JS off, those wrong numbers stay. | Render "—" in the HTML. | Confirmed |
| H15 | Low | `js/planner.js:628` | `?days=1e3` parses as 1 day (`parseInt`). Harmless after the clamp. | `Number()` then clamp. | Reproduced |

## 4. Corner cases and failure modes

| Case | Result | How tested |
|---|---|---|
| Group size 0 via URL | Clamped to 1 adult: ৳14,800 for one person, 3 days. | Node, real files |
| Group size 1 | 1 room, one CNG at 1,000/day: ৳9,250 backpacker, ৳17,950 comfort. Plausible. | Node |
| Huge group (20 adults + 10 kids, 14 days) | 13 rooms, 3 jeeps, ৳10,87,150. Consistent. | Node |
| Days 1 / max | 1 day charges 1 night (H13). 14 is the max; 400 clamps to 14. | Node |
| Empty selections | With no activities, transit still charges a daily CNG for every day (3 × 1,000 + 600). That is defensible for getting around, but it is not explained. | Node |
| BDT/USD rounding | `convertValueToUSD(10)` gives $0.08. The planner rounds total and per-person USD separately (`js/planner.js:680-683`), so they can differ by $1 (3 adults + 1 kid luxury: $753 total vs $188 × 4 = $752). The rate of 120 is unsourced (the market rate is about 122). | Node |
| Language toggle mid-export | The export reads the current state, so the pass comes out in whichever language is active at the click. No mixed output seen. | Chrome |
| Corrupt localStorage | Stale or hostile `lang`/`currency` fall back to defaults; throwing storage is caught. 4 tests. | Tests |
| Bad URL params | Clamped and whitelisted. `vibe=<img>` is ignored. | Node, tests |
| CDN blocked | Tailwind is local now, so the pages stay styled (local main only; live still depends on the CDN). With html2canvas blocked, the export offers print. With Google Fonts blocked, system fonts render. | Chrome with cdnjs aborted |
| Bangla font in exports | Hind Siliguri renders in both passes; no clipping. Mono labels fall back to a system Bangla font, which looks slightly uneven. | Exported PNGs viewed |
| Offline | Nothing loads; no service worker. The fare card can't be shown to a driver without signal. | Code read |
| Chat edge cases | Safety words, greetings and its own chips return the surfing card (H1). | Node |
| Second host | `coxbazar.xyz` serves the same build plus `todo.md`, `judge.md`, `CrtiQue_Oct15.md` and `tests/` (all HTTP 200 today). This file will be public there too once pushed. | curl |

## 5. Data accuracy and trust

**Recorded state.** Every hotel and every `PRICE_BOOK` entry is `approx: true` with `asOf: 2026-10-15`. The `data.js` header (`:1-6`) and README still say prices and phones are "mostly unsourced". `../decision.md` records that the owner confirmed all 16 phones and the fares on 2026-10-21, but nothing in the repo records it: no `source: 'owner phone check'`, no new `asOf`, and `todo.md` still has both items unchecked. A visitor sees the same "estimate" labels as before, so the confirmation adds no trust until it is written down.

**Spot check** (web, 2026-10-21):

| Claim on site | Where | Evidence | Verdict |
|---|---|---|---|
| Tourist Police 01320-222222 / 01887-878787 | `js/data.js:13-14` | Bangladesh Monitor, Sep 2023 launch report lists both | Matches |
| 999 national emergency | `js/data.js:12` | 999.gov.bd | Matches |
| Sea Pearl phone +880 1844-016001 | `js/data.js:508` | Listings show 01844-016020 (reservations email) and 09612-600200. The judge found 01887-660066 on the resort site. | Not found publicly; owner says confirmed |
| Long Beach phone +880 1755-660051 | `js/data.js:814` | HotelsCombined, Kayak and a Booking.com confirmation give 01730-338907 | **Conflicts.** Re-check before relying on the owner's confirmation |
| Sayeman phone 01755-691917 | `js/data.js:444` | Matched the official site in the Oct 15 check | OK |
| Radiant Fish World ৳350 | `js/data.js:2574` | Reviews cite ৳300 (৳250 via hotels); undated | Likely ৳50 high |
| Himchari entry ৳50 (`PRICE_BOOK`) vs ~৳120 (chat) | `js/data.js:2575`, `js/app.js:2410` | One guide says ৳20. Forest Department parks were raised to ৳100 (Dhaka Tribune; Himchari not named). | Unresolved; **the site contradicts itself** |
| Moheshkhali speedboat ৳80-100, about 30 min | `js/data.js:2378-2391` | Tourist Police (owner). Older reports say ~৳80. A newer per-km speedboat tariff exists (bdnews24) but does not name this route. | Plausible |
| Train Dhaka to Cox's Bazar: Shovon chair ৳695, "AC Snigdha" ৳1,325 | `js/app.js:2831` | Dhaka Tribune Dec 2023: Shovon chair 695, **AC chair** 1,325. A later report gives other figures. | Fare OK in 2023; class label wrong; needs a date |
| Saint Martin's: Cox's Bazar ships only, Nov day trips, Dec-Jan overnight, 2,000/day, under review for 2026-27 | `js/data.js:2519-2534` | Matches the Oct 2025 notice. I found no published 2026-27 decision yet. | Correct today. **The season starts in days, so re-check weekly** |
| CNG town to Himchari ৳300-400 | `js/data.js:2338-2350` | No current source found | Unverified (owner confirmed) |
| Himchari "18 km south" | `js/app.js:2408` | Guides put it about 10-12 km from Kolatoli | Suspected high |

**Contradictions inside the site** (same trip, different numbers):

| Item | `data.js` / `PRICE_BOOK` | Chat (`app.js`) | Other |
|---|---|---|---|
| Jeep for Himchari (+ Inani) | Himchari round trip 1,800-2,500; Inani 1,500-2,000 | Himchari + Inani 1,500-2,000 | `blog.js:39` same as chat; planner 2,200/day |
| Himchari entry | 50 | ~120 | — |
| CNG to Ramu | 400-500 | 400-500 | `culture.html:273` 400-600 round trip |
| Inani by jeep, duration | 1 hour (`TRANSPORT_DATA`) | ~1 hour | `PRICE_BOOK` 50 min each way |

**Unsourced third-party claims.** Hotel facility lists state specifics such as "Free VIP Airport Pickup & Drop Shuttle" and "Private beach cabanas with lifeguard surveillance" (Sayeman, `js/data.js:415-437`), and "Bangladesh's largest 5-star luxury resort" (Sea Pearl, `:505`). These are hotel marketing repeated as fact. The modal shows them with ✓ ticks (`js/app.js:913-920`).

**No correction channel.** No "report a wrong price" link, form or mailto exists anywhere. The privacy page's only contact is public GitHub issues.

## 6. Security and privacy

- **No secrets in the tree.** The gate's secret scan passes. The old `js/admin.js` is still served from git history (`raw.githubusercontent.com/iamanikbarua/Visit-Cox/2bb73c9/js/admin.js`, HTTP 200). The owner has not confirmed rotating that password (`todo.md`).
- **Consent works.** GA (`js/consent.js:4`) loads only after Accept. The tests cover granted, denied, throwing storage and reset.
- **CSP** (meta, every page): `script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://www.googletagmanager.com`. With `'unsafe-inline'` and every cdnjs library allowed, it barely limits injected script. The site has no user-generated content, and the untrusted inputs I checked are escaped, so the risk is low. A later step is to move the 80+ inline `onclick` handlers to listeners and drop `'unsafe-inline'`.
- **SRI** is on the two cdnjs scripts (`itinerary.html:63-64`). Good.
- **The second host leaks internal files.** `coxbazar.xyz` (Vercel, the repo homepage via `visitcox.vercel.app`) ignores `_config.yml` and serves `todo.md`, `judge.md`, `CrtiQue_Oct15.md` and `tests/` (HTTP 200 today). Nothing secret is there, but it publishes every known bug and the owner's to-do list. Who owns the domain, the Vercel project and GA is still not written down (`../decision.md`).
- **Privacy page** (`privacy.html`):
  - It says the site is "hosted on GitHub Pages" and leaves out the Vercel copy, which also sets GA cookies under the same property.
  - It still mentions exporting "as an image or PDF"; there is no PDF export.
  - Its only contact is public GitHub issues, so there is no private way to ask for data access or deletion.

## 7. UI

Good: the editorial look (Newsreader serif, stone and terracotta) is calm and consistent on 10 pages. There is no horizontal scroll at 375 px on any of the 22 page loads. The bn hero and planner look native, not bolted on. The exported passes are handsome in both languages.

Problems:
- **Wrong photos** on 12 of 16 hotels, including a competitor's signage (H3).
- **Invisible inactive toggles** (H5).
- **Small text:** 35 (home), 55 (hotels), 93 (activities) and 96 (planner) rendered text elements under 12 px at 375 px. Mono 10 px labels in Bangla are hard to read in sunlight.
- **"Reserve ➔"** on every hotel card (`js/app.js:686`) opens a modal with Call and Website. Nothing is reserved. Rename it "Details".
- **"From 9,500 - 24,000 BDT"** on cards: "From" plus a range reads oddly.
- **Mixed digits in bn:** the hero stats show "~১২০ কিমি" next to a Latin "16".
- **Brand drift:** "Visit Cox's Bazar" in the header, "Visit Cox." in footers, "VISIT COX" on passes.
- **The consent banner** covers the bottom third of the first screen at 375 px until answered. That is acceptable, but it hides the first CTA.

## 8. UX

**Workflow A, "3 days for 2 people, how much?":** home, then quick pick, then the planner. The numbers now agree (৳17,950), and the pass exports in Bangla. Two gaps:
- The total includes a hidden 10% (H7).
- The budget leaves out getting to Cox's Bazar, the biggest cost for most visitors, and does not say so.

The chat knows bus and train fares but can't reach them (H1).

**Workflow B, "what should I pay a CNG/jeep?":** the transport table, transport calculator and planner driver card agree, because they read the data. The chat and blog give a lower jeep price for a longer route (H6). A tourist arguing with a driver can be wrong by ৳500+ depending on the page.

**Workflow C, "find a hotel and call it":** 16 hotels, honest "estimate" labels and tap-to-call. But the photo is usually not the hotel, and one listed number (Long Beach) is not the one the hotel publishes elsewhere. There is no availability or booking, so Booking.com or GoZayaan answer this better.

**Workflow D, "emergency":** footers, the FAQ and both passes show 999 and the two helplines correctly. **The floating "Concierge"**, the one interactive helper on every page, answers "emergency" with a surfing price (H1). A panicked user who types instead of scrolling gets nothing useful.

**Workflow E, Bangla visitor:**
- Pages, planner and passes work in Bangla.
- The toggle is nearly invisible on desktop (H5).
- Search engines only see English (section 11).
- In the chat, "পুলিশ" lists swimming pools (H2).

**When things go wrong:**
- A blocked export library offers print. Good.
- Offline, nothing loads.
- There is no way to report a wrong number.

## 9. Accessibility and performance

**Weight** (transferred, headless Chrome, 375 px):

| Page | Live (`9d9856c`, CDN) | Local main (prebuilt CSS) |
|---|---|---|
| index | 806 KB, 17 requests (Tailwind CDN 124 KB) | about 690 KB (estimate: live minus the CDN script plus 9 KB CSS) |
| food | 454 KB | lower by about 115 KB |
| itinerary | 622 KB (jsPDF 94 KB unused, html2canvas 37 KB) | lower by about 115 KB; jsPDF still there |

The local `python -m http.server` sends no gzip, so its raw numbers (676-1,302 KB uncompressed) are not comparable. Biggest remaining costs:
- Three font families (Newsreader variable, Hind Siliguri 4 weights, Plus Jakarta Sans 5 weights).
- `app.js` (40 KB gzipped live), about a third of it the chat's canned answers.
- Images: the home page sends 2 hotel photos of about 170 KB each above the fold.

On a 1 Mbps beach connection the home page is about 6 s of transfer, down from about a minute. Good enough.

**Accessibility:**
- 0 of 69 rendered images have `width`/`height`, so layouts shift.
- `prefers-reduced-motion` is handled in CSS (`css/styles.css:468`).
- Modals (hotel facilities, blog reader, driver card) have no `role="dialog"`/`aria-modal` on any page and no focus trap.
- `<html lang>` follows the toggle (`js/app.js:105`). Good.
- Inactive toggles fail contrast badly (H5).
- No screen-reader test was done, by me or anyone.

## 10. Testing and verification

**What exists:** 51 `node --test` cases in 7 files, all loading the shipped `js/`. They prove:
- planner math (clamps, rooms, vehicles, the snapshot of totals)
- quick pick equals planner
- Bangla parity of `UI_TEXT`, `PLANNER_TEXT` and `PAGE_TEXT_BN`
- no English in bn passes
- consent behaviour
- emergency numbers only from `EMERGENCY_CONTACTS`
- escaping
- the Saint Martin's text
- the FAQ JSON-LD matching the data

`scripts/check.sh` adds syntax, local links, JSON-LD validity, stray files, a secret scan and CSS freshness. It passed all 7 steps from a clean clone in 0.3 s of test time.

**What they don't prove:**
- **Chat routing.** Only two chat queries are tested, both reaching early matchers, so H1 went unnoticed through two critiques and four agent rounds.
- **Prices outside `PRICE_BOOK`.** No test checks the chat, blog, `food.html` or `culture.html`, so H6 can't be caught.
- **Rendered pages.** No browser test runs in CI: no console-error check, no contrast check, no screenshot diff. The judge's headless-Chrome runs are manual and unrecorded.
- **Photos.** Nothing checks a photo against its listing.
- **CI on GitHub.** CI has never run there. The workflow sits in an unpushed commit, and pushing a workflow needs a token with `workflow` scope (`todo.md`).

**The judge log:** Updates 5-8 give evidence (commands, counts, screenshots) and match what I found. That is a big improvement on the old QA report. But the Update 7 and Update 8 checks of "0 page errors" did not exercise the chat beyond Himchari, which is where the biggest bug was.

## 11. SEO

| Check | State |
|---|---|
| Titles | 49-57 chars on content pages; unique. Good. |
| Descriptions | 109-155 chars; unique. Good. |
| Canonical | All 10 content pages → github.io. Correct while that host is chosen. |
| OG image | Every page. `hotels.html` uses `hotel-sea-crown.jpg`, which is a beach. |
| JSON-LD | 3 valid blocks; `FAQPage` matches `FAQ_DATA` (tested). |
| `robots.txt` | Served at `/Visit-Cox/robots.txt`, which crawlers ignore. They only read `https://iamanikbarua.github.io/robots.txt` (404). The `Sitemap:` line is never read, so the sitemap needs Search Console (owner, not done). |
| `sitemap.xml` | 10 URLs, all `lastmod 2026-10-15`. |
| hreflang / Bangla URLs | None. Bangla content is a JS toggle on the English URL, so Google indexes English only. The Bangla query market ("কক্সবাজার ভ্রমণ খরচ", "সিএনজি ভাড়া"), where competition is weaker, is unreachable. |
| Content in HTML | Hotel, spot and fare listings are JS-rendered from `data.js`. The static `transport.html` fallback says fares need JavaScript. |
| Duplicate host | `coxbazar.xyz` serves identical pages whose canonicals point at github.io. Fine for ranking, confusing for brand. |
| Blog | 6 posts behind one URL with `#hash` deep links: no per-post title, description or OG. |
| Domain | Personal github.io subpath. |

## 12. Deploy and operations

- **Hosting:** GitHub Pages from `main` (HTTPS, HSTS, `max-age=600`). A second copy is on Vercel at `coxbazar.xyz`; it tracks the same branch (identical `index.html`) and is outside the documented setup.
- **Local vs live:**

  | Area | Local `main` | Live (`9d9856c`, last-modified 2026-10-18 22:42 GMT) |
  |---|---|---|
  | Tailwind | Prebuilt `css/tailwind.css` | Play CDN (`cdn.tailwindcss.com`, 124 KB gzipped, CSS compiled on the phone); `css/tailwind.css` returns 404 |
  | CI | `.github/workflows/check.yml` | Not on GitHub |
  | Bangla | Footer, planner hotel name, itinerary header and cookie-settings fixes | Without them |

  Pushing deploys both hosts.
- **CI** (`.github/workflows/check.yml`): Node 24, `npm ci`, `scripts/check.sh`, read-only token, current `actions/checkout@v7` and `setup-node@v7` (both exist). It is unproven until pushed.
- **No monitoring:** no uptime check, no JS error reporting, and GA can't tell the two hosts apart without a hostname filter.
- **Rollback** is `git revert` and push. Fine.
- **No LICENSE.**
- **Docs drift:**
  - `todo.md` still lists "Approve a GitHub Actions workflow" (done) and the phone/fare checks (owner says done) as open.
  - README "Honesty notes" still says phones are unconfirmed.
  - The agent skills reference deleted code (section 2).

## 13. Legal and compliance

- **Hotel photos.** Showing a Sea Palace-branded building as three other hotels, and Prime Park's dining room as Ocean Paradise, misrepresents named businesses. Under Bangladesh's Consumer Rights Protection Act 2009, misleading representation about a service is a listed offence. The site is non-commercial, but a hotel complaint is plausible. The hotel photos also have no source at all (`todo.md` lists it). Treat them as copyrighted.
- **Image licences.** Wikimedia photos are shown with a "✓ Wikimedia Commons (Place)" link and no author or licence. CC BY-SA requires both. Several credits point at the wrong file (H4).
- **Privacy.** Consent before GA is right for EU/UK visitors and fits Bangladesh's Personal Data Protection Ordinance 2025. Gaps:
  - No private contact for data requests.
  - The privacy text omits the second host.
  - The GA retention setting is still the owner's to-do.
- **No terms or LICENSE.** "All rights reserved" with no named owner, in a public repo owned by iamanikbarua, and with domain, Vercel and GA ownership unrecorded. That is who-owns-what risk, not just paperwork.
- **Emergency and safety facts** are now sourced and dated. Good. The chat's failure to show them (H1) is the remaining safety-communication risk.
- **Saint Martin's rules** change by notice. Showing last season's rules as current after a new notice would mislead. The text says "check the latest notice", which is the right hedge.

## 14. Market, demand and marketability

**Who uses it:** domestic first-timers and families from Dhaka and Chattogram (peak November-February and Eid), Bangla-first, on Android. A smaller stream of foreigners. Nothing has changed here. There is still **no evidence of any user**: 0 stars, 0 forks, no shared GA numbers, no feedback channel, and the Facebook-group test in `06-marketing-manager/GTM.md` has not run.

**Competitors** (checked 2026-10-21):

| Competitor | Strength | Where Visit Cox can win |
|---|---|---|
| Facebook groups (Travelers of Bangladesh and others) | Trust, fresh first-hand costs, reach | Structure: one dated budget and fare card, in Bangla |
| YouTube and Facebook vloggers | Faces, Bangla, recency | Searchable, printable fares |
| Booking.com / Agoda | Live hotel prices, reviews, booking | Whole-trip budget, local fares |
| ShareTrip / GoZayaan | BD hotel, bus and air booking, bKash | No fare guide or budget planner |
| Tripadvisor | Reviews for foreigners | Local fares, Bangla |
| travelcostcalculator.org, Champion Traveler | Rank for "Cox's Bazar trip cost"; 2026 per-day USD budgets | Generic USD estimates, no local fares, no Bangla |
| coxsbazar.gov.bd district portal, Tourist Police | Official | Thin, undated, not a tool |
| Daily Star, Prothom Alo, Dhaka Tribune travel pieces | Dated, sourced fares | Articles, not a planner |

**The niche** is real and still unclaimed: a Bangla, BDT, dated whole-trip budget plus a fare card you can show a driver, as a lock-screen image. The pass export is now good enough to be the hook. It is defensible only if the numbers are recent and visibly checked, and that is exactly what the repo still doesn't record (section 5).

**Who pays:**
1. Hotel affiliate links (Booking.com, Agoda): low yield, easy.
2. Paid listings or WhatsApp leads from local operators: needs traffic, and needs disclosed conflicts on a "fair fare" site.
3. Ads: negligible.

Realistically this is a portfolio and lead-gen side project until it has a few thousand monthly visitors.

**Pricing:** free. Nothing to price.

**Distribution:** Bangla Facebook posts with the exported pass image, plus Bangla search once `/bn/` URLs exist. The chat is not a distribution asset; today it is a liability.

**Claims vs reality:**

| Claim | Reality |
|---|---|
| "Independent guide... Prices are estimates" | True, and now consistently labelled |
| "Concierge" chat on every page | Answers most questions, including emergencies, with a surfing card |
| "Reserve ➔" | Opens Call/Website; nothing is reserved |
| Hotel photos | 12 of 16 are not the hotel |
| "✓ Wikimedia Commons (Kutubdia)" | A Moheshkhali photo |
| Budget total | Includes an unexplained 10% |
| README "fares confirmed?" | The owner says yes (2026-10-21); the data still says `approx` |

## 15. GTM % breakdown

| Dimension (weight) | Score /10 | Why |
|---|---|---|
| Product works (25) | 5 | The planner, passes, toggles and listings work with 0 page errors in en and bn, and the numbers agree across planner, quick pick and calculator. The chat on every page is broken for most questions (H1), and 12 of 16 hotels show the wrong building. |
| Quality and verification (15) | 6 | 51 real tests, a green gate and CI written. CI has never run on GitHub, there is no browser test, and chat routing and page-embedded prices are untested. |
| Security and privacy (15) | 6 | No secrets, consent-gated GA, CSP and SRI. The old credential is still public in history with rotation unconfirmed, the second host publishes internal files, and there is no private privacy contact. |
| Legal and compliance (10) | 3 | Privacy page and consent are in place. Wrong-brand hotel photos, image licences without attribution, no LICENSE or named owner, and unrecorded domain ownership. |
| Market validation (15) | 1 | No users, feedback or measurement. |
| Deploy and operations (10) | 4 | Live on HTTPS with a clean rollback. Local is 3 commits ahead, there are two hosts, no monitoring, and docs drift. |
| Claims honesty (10) | 6 | Hype is gone and estimates are labelled. "Reserve", the wrong photos with ✓ credits, unsourced hotel superlatives, chat prices that contradict the data and the hidden buffer remain. |

Weighted: (5×25 + 6×15 + 6×15 + 3×10 + 1×15 + 4×10 + 6×10) / 10 = (125 + 90 + 90 + 30 + 15 + 40 + 60) / 10 = **45.0**.

**Cap: 35.** Four reasons:
- The only interactive helper answers "emergency", "999" and "hospital" with a surfing price.
- A quarter of hotel cards show another brand's building.
- The owner's phone and fare checks are not recorded in the data the visitor sees.
- Nobody outside the team has used it.

The cap lifts to about 45 when:
- H1 and H2 are fixed and tested,
- hotels have their own photos or labelled placeholders,
- the confirmations are in `data.js` with `source` and `asOf`,
- one host is chosen,
- and the Facebook test returns at least 5 fare reports.

**Final: 35%** (local `main` and live alike).

## 16. What to cut or stop doing

1. **Cut the chat, or cut it down.** About 800 lines of canned HTML with its own price table, keyword routing that has been broken since day one, and an "AI-ish" promise the site can't keep. Replace it with a 6-link "Quick answers" panel (emergency, fares, planner, Saint Martin's, best time, getting here) that reads `FAQ_DATA` and `fareById()`. If it stays, it needs H1, H2 and routing tests now.
2. **Stop copying prices into HTML and prose.** `food.html`, `culture.html:273`, `blog.js` and the chat should render from `data.js` or say "see fares".
3. **Delete the dead code:** the hero carousel and scene badges, the autoplay UI, the deleted-hotel aliases, Nisanah, and the jsPDF tag.
4. **Delete or fix the stale agent instructions:** the exporter skill (`features.js`, jsPDF), the WhatsApp skill's "১০০% ... ভেরিফাইড" and "Visit-Cox.com", the SEO skill's "longest unbroken" line, and `collaboration_log.md`. Agents follow these.
5. **Stop showing photos that aren't the place.** A plain placeholder is more honest than someone else's building.
6. **Stop adding features or agent rounds** until the Facebook test has run. Four rounds since Oct 15 improved engineering; none produced a user.
7. **Drop the second host** unless the owner wants `coxbazar.xyz`. Two hosts double the GA noise and leak the internal files.

## 17. Top 10 next actions

Ordered by value. "Agent" means an agent can do it without the owner.

| # | Action | Effort | Who |
|---|---|---|---|
| 1 | Fix H1/H2: check emergency words first (`js/app.js:2911` moved to the top), fix the activity matcher at `:2688`, match whole words. Add tests that "emergency", "999", "জরুরি", "পুলিশ", "hello" and every chip reach the right section. Or replace the chat (section 16.1). | 2 h (fix) or 1 day (replace) | Agent (frontend + qa) |
| 2 | Record the owner's 2026-10-21 checks in `js/data.js`: `source: 'owner phone check'`, `asOf: '2026-10-21'` per hotel and fare; drop `approx` where confirmed; update the header comment, README and `todo.md`. Re-check Long Beach (public listings say 01730-338907) and Sea Pearl first. | 1 h agent + 15 min owner | Owner confirms, agent edits |
| 3 | Replace the 12 wrong hotel photos with a labelled placeholder; fix or remove the wrong place credits; add author and licence to the real ones. | 3 h | Agent (data + uiux); owner for any real photos |
| 4 | Push `main` after #1-#3 (deploys the prebuilt CSS and the Bangla fixes, and runs CI on GitHub for the first time; needs a `workflow`-scope token). Then confirm the live page loads `css/tailwind.css` and CI is green. | 30 min | Owner |
| 5 | One source for fares: render chat, blog, `food.html` and `culture.html` prices from `data.js` (`fareById`, `PRICE_BOOK`); give activities `asOf`/`approx`; add a test that no page or prose holds a `৳` literal outside `data.js`. Resolve Himchari entry (50 vs 120) and the jeep route price. | 1 day | Agent (data + frontend + qa) |
| 6 | Add a "Report a wrong price or number" link on fares, hotels and the planner total (a prefilled `mailto:` or a GitHub issue template), and a line on the planner: "Excludes travel to and from Cox's Bazar; includes a 10% buffer", plus the buffer line item (H7). | 2 h | Agent; owner picks the inbox |
| 7 | Owner: settle `coxbazar.xyz` and Vercel with iamanikbarua. Keep one host (delete the Vercel project, or make it canonical and add `.vercelignore`), name the owner in the footer and privacy page, add a LICENSE, set GA retention, and confirm the old admin password is rotated. | 1-2 h owner | Owner |
| 8 | Run the Facebook-group test from `GTM.md` with the exported Bangla pass as the post image; collect 5 fare reports into `data.js` with dates. Add cookie-free counts for "planner completed" and "pass exported" (or GA events after consent). | 1 week of listening, 2 h agent | Owner posts; agent instruments |
| 9 | Fix toggle contrast (H5), rename "Reserve" to "Details", set `width`/`height` on images, add `role="dialog"`, `aria-modal` and focus return to the three modals, and drop the unused jsPDF. | 3 h | Agent (uiux + frontend) |
| 10 | Bangla SEO: static `/bn/` copies of the 5 key pages (home, planner, transport, hotels, FAQ) with `hreflang` pairs, built from the same data; per-post blog URLs; Search Console with the sitemap (robots.txt on a subpath is ignored). Before 1 November, re-check the Saint Martin's notice and update `faq-8`. | 2-3 days agent + 30 min owner | Agent (seo); owner for Search Console |

After 1-4 and 6, re-score: expect about 40. After 5, 7 and real fare reports (8), about 45-50.
