# Visit Cox: independent critique, 2026-10-24

Reviewer: independent, read-only. Code reviewed: local `main` at `3c0df62`, equal to `origin/main` (working tree clean before and after). The live site at https://iamanikbarua.github.io/Visit-Cox/ serves `3c0df62`: `index.html`, `itinerary.html`, `hotels.html`, `js/app.js`, `js/data.js`, `js/planner.js`, `js/dialog.js` and `css/tailwind.css` match `origin/main` byte for byte (SHA-1 compared, live `last-modified` 2026-10-22 04:31 GMT). Baseline: `CrtiQue_Oct21.md`.

What I did:
- Read `AGENTS.md`, `CODING_STANDARDS.md`, `README.md`, `judge.md` (Updates 10 and 11 first), `todo.md`, `collaboration_log.md`, the six `.agents/skills/*/SKILL.md`, the six `0N-*/` folders, the scorecard entry and `../decision.md`.
- Read the shipped code (`js/*.js`, the root pages, `css/styles.css`) and the diff since the baseline (`8221734..3c0df62`, 22 files, +425/-221).
- Ran `scripts/check.sh` in the repo: all 7 steps pass, 61 tests. The Tailwind step found the CSS fresh and did not touch it. `git status` stayed clean.
- Ran the real chat and planner in Node through `tests/helpers.js`: every chip and quick prompt in `js/app.js` (70 queries, en and bn), 45 extra emergency and free-text queries, and 14 planner corner cases.
- Drove the live site with headless Chrome over CDP: 11 pages × EN/বাংলা × 375x812 and 1280x800 viewport tiles (44 loads), both pass exports in Bangla, a run with cdnjs and Google Fonts blocked, corrupt `localStorage`, hostile URL params, and transfer sizes with the cache off.
- Checked GitHub Actions (`gh run list`), the repo's traffic, `coxbazar.xyz`, and 10 facts on the web.

"Confirmed" means I traced the code or reproduced the result. "Suspected" means the evidence is strong but not proven.

## 0. Since 2026-10-21

Baseline section 0 rows that were not already Fixed:

| # | Baseline finding | Status | Evidence |
|---|---|---|---|
| B5 | Hotels unverified; patterned and conflicting phones | **Still open** | All 16 hotels still `approx: true`, `asOf: "2026-10-15"` with the comment "not confirmed with the hotel" (e.g. `js/data.js:406`). Long Beach is still `+880 1755-660051` (`js/data.js:812`). The owner's 2026-10-21 confirmation (`../decision.md:55`) is still not in the data. |
| B11 | Computed tide/sunset claims | No longer applies | Only "best at low tide" advice remains. |
| B18 | 1-day trip charged a hotel night | **Fixed** | `js/planner.js:8` (`tripNights = max(0, days-1)`), used at `:657`. Node: 1 day, 1 adult, hotel ৳0. |
| S2b | Dead code (hero carousel, autoplay ids, aliases) | **Partly fixed** | Deleted-hotel aliases are gone (the alias map is exactly the 16 hotels, `js/app.js:2289-2306`). The hero carousel is still dead: `setHeroSlide`/`startHeroAutoSlider` (`js/app.js:1987-2023`) are never called from any page, and `#hero-badge` (`:198`, `:2007`) exists on no page. Four `update*AutoSlideUI` functions write to ids that no page has (`:820`, `:1337`, `:1468`, `:1806`). |
| S2c | Tailwind CDN still live | **Fixed** | Live `css/tailwind.css` equals `origin/main`; no `cdn.tailwindcss.com` request in any of 44 loads. |
| S11a | CI never ran on GitHub | **Fixed** | `check` workflow green on both pushes (runs 39640585730 and 39722797445, 19-20 s). |
| S2d | Planner hard-codes `exchangeRate: 120` | **Still open** | `js/planner.js:600`. Now also 3% off the market (section 5). |
| S2e | Prices copied outside `data.js` | **Partly fixed** | The chat's Inani, Himchari and Shamlapur fares read `fareById()` (`js/app.js:2259`). Still 41 price literals in `js/app.js` (e.g. bike `:2774`, food `:2667-2683`, bus `:2868`, FAQ-2 USD `:1952`), `js/blog.js:31-32` (bike ৳1,500), `food.html:242-419`, `culture.html:273` (CNG to Ramu ৳400-600 vs 400-500 in data). |
| S2f | `asOf` missing on activities | **Still open** | 0 of 10 `ACTIVITIES_DATA` entries carry `asOf`, `approx` or `source` (`js/data.js:1833-2239`). |
| S2i | Images without width/height | **Fixed** | 0 of 129 rendered images lack `width`/`height` across the 44 live loads. |
| S5a | Hotels share other buildings' photos | **Still open** | `hotel-kollol.jpg` (the "Hotel Sea Palace Limited" building) is still the photo for Best Western, Kollol and Praasad (`js/data.js:755`, `:931`, `:1227`); `prime-park-hotel.jpg` for four others (`:633`, `:815`, `:989`, `:1343`). Sea Pearl shows Inani Beach (`:509`), Mermaid shows a sampan (`:571`). |
| S6a | Old admin credential in git history | **Still open** | `raw.githubusercontent.com/iamanikbarua/Visit-Cox/2bb73c9/js/admin.js` returns 200 today. Rotation unchecked in `todo.md`. |
| S6e | CSP weak (`'unsafe-inline'`) | **Still open** | Unchanged (`index.html:8`). Low risk; see section 6. |
| S7a | Text under 12 px | **Still open** | Live, 375 px: home 36, hotels 55, activities 93, planner 98 text elements under 12 px. Unchanged. |
| S7b | Brand drift | **Still open** | "Visit Cox's Bazar" (home header), "Visit Cox." (other headers), "VISIT COX" (pass). |
| S10b | No hreflang or Bangla URLs | **Still open** | No `hreflang` on any page. |
| S12a | No LICENSE | **Still open** | No file; GitHub reports `license: null`. |
| S13a | Image licensing, no attribution | **Partly fixed** | Spots and hidden gems now credit author, licence and Commons link (`js/data.js:1362-1372`, `js/app.js:71`, `:1157`, `:1216`). The same CC BY-SA files are shown uncredited on hotel cards, the home page, the blog and culture page (N3). The hero photo's origin is unknown (owner). |
| S14a | Offline: nothing loads | **Still open** | No service worker or manifest. |
| S14b | No users, feedback or measurement | **Still open** | No report channel, no funnel events, no Facebook test. GitHub: 0 stars, 0 issues, 2 unique repo visitors in 14 days. |

Baseline bugs:

| # | Baseline bug | Status | Evidence |
|---|---|---|---|
| H1 | Chat answers almost everything with surfing | **Fixed** | Emergency block runs first (`js/app.js:2267-2285`); the surfing catch-all is gone. Test `tests/regression.test.js:190` asks 9 emergency phrasings and every chip. I re-ran all 70 chips/prompts: none returns surfing. |
| H2 | "পুলিশ" returns pool hotels | **Fixed** | Same block; "পুলিশ" returns the numbers (Node). |
| H3 | 12 of 16 hotels show another building | **Still open** | See S5a. `judge.md` Update 10: "owner deciding to replace or hide". |
| H4 | Wrong place credits with ✓ | **Fixed** on spots/gems | `PHOTO_CREDITS` (`js/data.js:1362`); "Photo shows Himchari." for reused files. But see N3. |
| H5 | Invisible inactive toggles | **Fixed** | `js/app.js:132-147` uses `text-stone-600`; visible in the 1280 px tile. |
| H6 | Chat/blog jeep fare contradicts data | **Fixed** (jeep) | `js/app.js:2259`, `:2416`; blog jeep sentence has no price. Bike ৳1,500 stays a literal (`js/app.js:2774`, `js/blog.js:31`). |
| H7 | Hidden 10% buffer | **Fixed** | `itinerary.html:561`, `js/planner.js:1035-1038`. |
| H8 | Praasad alias wrong id | **Fixed** | `js/app.js:2300`; "praasad" returns Praasad Paradise. |
| H9 | Chat recommends deleted Nisanah | **Fixed** | No "Nisanah" in any shipped file. |
| H10 | Unused jsPDF on the planner | **Fixed** | `itinerary.html:63` loads only html2canvas. |
| H11 | Bangla trip name → underscores | **Fixed** | `js/planner.js:1386-1389`. Reproduced live: `রহিম_পরিবার-Phone-LockScreen-9-16.png`. |
| H12 | "AC Snigdha" label | **No longer applies as written** | `judge.md` Update 10 is right: Snigdha is the AC chair class. But the fare itself is now stale (N4). |
| H13 | Day trip charged a night | **Fixed** | `js/planner.js:8`. The pass still lists a hotel (N8). |
| H14 | Static ৳18,500 fallback | **Fixed** | `itinerary.html:530` shows "—". |
| H15 | `?days=1e3` → 1 | **Fixed** | `js/planner.js:610-613`. |

Baseline section 2 "Problems":

| # | Problem | Status | Evidence |
|---|---|---|---|
| P1 | Chatbot is a second content system | **Partly fixed** | Routing fixed and tested. Still ~820 lines (`js/app.js:2253-3071`) of hand-written answers with 41 price literals. |
| P2 | Price copies outside `data.js` | **Partly fixed** | See S2e. |
| P3 | Dead code | **Partly fixed** | jsPDF and aliases gone; hero carousel and autoplay UI remain (S2b). |
| P4 | Planner duplicates `CONFIG` | **Still open** | `js/planner.js:600`. |
| P5 | Stale agent instructions | **Still open** | `.agents/skills/visual-itinerary-pass-exporter/SKILL.md:5,40-44` (jsPDF), `.agents/skills/whatsapp-concierge-leadgen/SKILL.md:39` ("Visit-Cox.com") and `:49` ("১০০% নিরাপদ ও ভেরিফাইড পার্টনার্স"), `.agents/skills/travel-seo-and-schema/SKILL.md:23` ("longest unbroken"), `collaboration_log.md:4,18`. |
| P6 | `scripts/check.sh` writes to the tree | **Still open** | `scripts/check.sh` `tailwind_css()` rebuilds in place. |

Baseline section 16 cut list:

| # | Cut | Status |
|---|---|---|
| C1 | Cut the chat or cut it down | **Partly**: fixed and tested, not cut down. |
| C2 | Stop copying prices into HTML and prose | **Partly** (S2e). |
| C3 | Delete dead code | **Partly** (S2b). |
| C4 | Fix the stale agent instructions | **Still open** (P5). |
| C5 | Stop showing photos that aren't the place | **Partly**: spots say what the photo shows; hotels unchanged (H3). |
| C6 | Stop adding features until the Facebook test runs | **Still open**: two more agent rounds (`judge.md` Updates 10-11), still no user. |
| C7 | Drop the second host | **Still open**: `coxbazar.xyz` serves `todo.md`, `judge.md`, `CrtiQue_Oct15.md`, `CrtiQue_Oct21.md` and `tests/` (all HTTP 200 today). This file will be public there once pushed. |

Totals: 44 items. 17 fixed or no longer apply, 11 partly fixed, 16 still open. Every High and Medium bug from Oct 21 is fixed except H3, which waits on the owner.

## 1. Verdict up front

- **What it is:** an 11-page static guide to Cox's Bazar in English and Bangla: hotels, spots, food, activities, fares, a trip planner that exports a lock-screen pass, and a keyword "Concierge" chat.
- **Who it is for:** first-time domestic visitors planning 2-4 days on an Android phone, Bangla first.
- **State:** the engineering is now solid and live. The emergency chat bug is fixed and tested, CI runs on GitHub, live equals `main`, 0 page errors in 44 live loads. What holds it back is no longer code. It is data the owner says is checked but the site still calls estimates, hotel photos of other buildings, two hosts, and zero users.
- **Continue?** Yes, and now is the moment: the peak season starts 1 November. Do the agent-only fixes in section 17 this week (2 days of work), then the owner posts it. Stop agent rounds after that until real visitors report fares.
- **GTM readiness: 40%** (weighted 51, capped at 40).

**Compared with the scorecard (35):** I land 5 points higher. The Oct 21 cap reason that mattered most (the only interactive helper answering "emergency" with a surfing price) is fixed and has a test. CI is proven on GitHub and the prebuilt CSS is live. That moves Quality, Deploy and Claims up one point each and Product works up one. I do not go above 40 because three of the four Oct 21 cap reasons still stand: other brands' buildings on hotel cards, owner checks that are invisible in the data, and no user. At 40 it sits level with TakaTalks and ThrottleIQ (40), below Suggest.Bike (55), and above TRACON and PotholeAlertBD (30) and Caffeinate (25). One note on the scorecard itself: its header row says 35, but the rubric table (weighted 42.5, cap 30, final 30) and the Visit-Cox cap paragraph were never updated after the Oct 21 critique. Fix that table when you take this number.

## 2. Code and architecture

**Shape.** 11 root pages and 8 plain scripts: `app.js` 3,301 lines, `data.js` 2,591, `planner.js` 1,508, `blog.js` 645, `page-text.js` 418, `quickpick.js` 148, `consent.js` 99, `dialog.js` 35. About 8,750 lines, flat since Oct 21. One build step (Tailwind CLI 3.4.17, pinned). This is the right shape for a content site on GitHub Pages. Nothing here needs a framework.

**What improved.**
- `js/dialog.js` is small and correct: focus in, Tab trap, Escape, focus return. One shared helper, used by three dialogs.
- `PHOTO_CREDITS` (`js/data.js:1362-1372`) is one table keyed by file, with author, licence and a `shows` note when a photo is reused. Good design; it just isn't used everywhere the files appear (N3).
- `tripNights()` (`js/planner.js:8`) is one function used by the budget, tags, pass and WhatsApp text.
- The chat's emergency-first block and the routing test close the class of bug, not just the instance.

**Problems.**
1. **The chat is still a second content system.** `fetchTravelAssistantReply` (`js/app.js:2253-3071`) is ~820 lines of HTML strings with 41 price literals and its own facts (Inani "18 km shoreline", "Bangladesh's first marine aquarium", train fares). Routing is still ordered `includes()` checks; the test proves "not surfing", not "the right answer" (N5).
2. **The planner has its own hotel catalog.** `PLANNER_CATALOG.hotels` (`js/planner.js:330-430`) holds 9 hotels with their own names, stars, locations and "why" blurbs, separate from the 16 vetted `HOTELS_DATA` entries. Two of them are not on the vetted list (N2). Prices come from `PRICE_BOOK`, but names and claims do not come from `HOTELS_DATA`. Same "copies drift" problem as the prices had.
3. **Price copies** outside `data.js` remain (S2e).
4. **Dead code:** hero carousel (`js/app.js:150-200`, `:1987-2023`), autoplay label updaters, and a hotel modal on the home page that nothing opens (`judge.md` Update 11 says so too).
5. **Config duplication:** `exchangeRate: 120` (`js/planner.js:600`) next to `CONFIG.exchangeRateUSD` (`js/data.js:19`).
6. **Stale agent instructions** still tell agents to add "১০০% ... ভেরিফাইড" and jsPDF (P5). The role briefs themselves (`0N-*/WORKSPACE.md`) are current and short; the skills are not.
7. **`scripts/check.sh` mutates the tree** (P6). Building to a temp file and comparing would keep the same guarantee without writing.

**Standards adherence** (`CODING_STANDARDS.md`):

| Standard | Status |
|---|---|
| Cite source + asOf | Fails for activities (0/10), chat, blog and food-page prices, and the planner's own hotel blurbs. |
| No hype | Pass in UI chrome. Hotel marketing copy repeated as fact (`js/data.js:503` "Bangladesh's largest 5-star", `:565` "world-renowned", `:420-424` cabanas "with lifeguard surveillance", "Free VIP Airport Pickup"). |
| One source of truth | Fails for chat, blog, `food.html`, `culture.html`, and planner hotel names. |
| Escape | Pass (`escapeHTML`, `plannerEsc`, tests). |
| Static, survives bad storage | Pass (tests; live run with garbage `visit_cox_lang` fell back to `en`, 0 errors). |
| No secrets | Pass in tree; history still has the old admin file. |
| Bilingual | Pass for keys. Latin "16" in the bn hero (`index.html:289`). Bangla not proofread. |
| Test the real code | Pass. |
| Mobile first | Pass for overflow (0 of 22 loads at 375 px) and tap size. Small text fails. |
| Weight | Pass for images. Fonts are now the heaviest item (section 9). |
| Safety info sourced | Pass for numbers. The chat misses many emergency words (N1). |

## 3. Bugs

Ranked by harm to a real user. New bugs are N1-N14.

| # | Sev | Where | What happens | Fix sketch | Status |
|---|---|---|---|---|---|
| N1 | Medium | `js/app.js:2268-2280`, fallback `:3036-3071` | The emergency matcher knows 11 words. Everything else falls to the greeting, which has no numbers and no emergency chip. Reproduced, all returning the greeting: "help", "I need help", "drowning", "fire", "rip current", "I lost my child", "stolen", "ডাক্তার" (doctor), "অ্যাম্বুলেন্স", "এম্বুলেন্স" (both common spellings of ambulance), "লাইফগার্ড", "ডুবে যাচ্ছে" (drowning), "আগুন" (fire), "চুরি" (theft). English "ambulance", "lifeguard" and "doctor" work; their Bangla forms don't. Mitigation: the "Emergency numbers" quick prompt shows when the chat opens. | Add the missing words (en and bn, both spellings), and put the three numbers (or the "Emergency numbers" chip) in the greeting fallback. Extend the existing test list. | Confirmed (Node, real files) |
| N2 | Medium | `js/planner.js:407-425` | The planner's budget tier recommends "Hotel Coastal Peace / Blue Ocean" and "Hotel Laboni Vista", with "Clean, reliable budget AC guest house" and star ratings, and prints the name on the exported pass. Neither is among the 16 hotels kept after the Oct 15 clean-up, and neither has a phone, source or `asOf`. "Coastal Peace" exists (Expedia lists it as 3-star, not 2); "Blue Ocean" is glued to it; I found no hotel called "Laboni Vista". The ten hotels removed on Oct 15 were removed for exactly this. | Point the two budget slots at listed hotels (Prime Park is the cheapest listed), or show a generic "budget guest house, Kolatoli" with no brand. Build the planner catalog from `HOTELS_DATA` ids. | Confirmed (not in list, unsourced); Suspected (Laboni Vista does not exist) |
| N3 | Medium | Hotel cards `js/data.js:509`, `:571`, `:1167`; `index.html:593`, `:747`; `culture.html:310`; `blog.html:109`; `js/blog.js:28`, `:369` | CC BY-SA photos (`inani-beach.jpg`, `shamlapur-sampan.jpg`) are credited on the spots page but shown with no author or licence on hotel cards, the home page, the blog and the culture page. `photoCreditHTML` is called only for spots and gems (`js/app.js:1157`, `:1216`). CC BY-SA requires attribution wherever the image is used. On hotel cards the photo also stands in for the hotel (H3). | Call `photoCreditHTML` from the hotel card, blog and static `<img>` spots (a `<figcaption>` from `PHOTO_CREDITS`), or a single "Photo credits" block per page. | Confirmed |
| N4 | Low-Med | `js/app.js:2866`, `:2875` | The chat quotes "AC Snigdha ~1,325" for Dhaka to Cox's Bazar. Bangladesh Railway added a pontage charge from 20 Dec 2025: Snigdha is now ৳1,449 (Prothom Alo). The ৳1,200-2,500 bus range (`:2868`) has no source either. These are the biggest single costs of the trip. | Move train and bus fares into `data.js` with `source`/`asOf`; Snigdha 1,449 (Prothom Alo, Dec 2025). | Confirmed against source |
| N5 | Low | `js/app.js:2330-2331` → `:2530`; `:2537`, `:2631`; `:2983` | The chat's own chips misroute: "Hotels near Laboni Beach" and "লাবণী বিচের হোটেল" return the beach card, not hotels. "Sugandha live fish fry?" returns the beach card, not food. "Inani & Himchari route" returns only Inani. The routing test passes because it only checks "not surfing". | Route hotel + area before spots, or change the chips. Make the test assert the expected section per chip (a table of chip → emoji/heading). | Confirmed |
| N6 | Low | `js/data.js:2209-2210`, `transport.html:243`, `js/page-text.js:369`, `js/blog.js:43`, `:58` | Himchari is "about 10 km" (spot data, Tourist Police) in the chat and spots page but "18 km" in the jeep activity, the transport calculator and the blog. `judge.md` Update 11 left this for the owner. I disagree: the sourced figure is already in the data; the 18 km strings have no source. | Use the Tourist Police figure everywhere, or drop the number. | Confirmed |
| N7 | Low | `js/planner.js:1008-1012`, `:1169` | With "$ USD" active, the planner total and the pass still show ৳ first (USD in brackets). The header toggle says USD; the main number says BDT. Seen live in Bangla + USD. | Lead with USD when `AppState.currency === 'USD'`, or label the toggle as not affecting the planner. | Confirmed (live) |
| N8 | Low | `js/planner.js:1174`, `:1235` | A 1-day trip has no hotel night, but the pass still shows "Stay: Hotel Sea Crown" and day 1 says checking into a sea-facing hotel. Reproduced: exported a 1-day Bangla phone pass. | Hide the stay block and use a day-trip schedule when `tripNights(days) === 0`. | Reproduced |
| N9 | Low | `js/planner.js:600`, `js/data.js:19` | 1 USD = 120 BDT in two places. Bangladesh Bank's weighted average was 123.55 on 18 Oct 2026, so USD totals read about 3% high. | Read `CONFIG.exchangeRateUSD`; set it to the BB rate with `source`/`asOf`. | Confirmed |
| N10 | Low | `js/planner.js:683-686` | Total and per-person USD are rounded separately: 14 days, 2 adults gives $765 total but $382 × 2 = $764; 11 adults gives $788 vs $792. | Derive per-person USD from the rounded total, or show one. | Reproduced (Node) |
| N11 | Low | `js/app.js:1952` | FAQ-2 in USD mode appends a hard-coded `formatPriceRange(80, 100)`: a copy of the Moheshkhali fare. | Read `fareById('town-to-moheshkhali')`. | Confirmed |
| N12 | Low | `js/data.js:1833-2239` | No activity has `asOf`, `approx` or `source`, yet they show prices ("Estimated Price") in the chat and activities page. | Add `approx: true, asOf` (no new numbers needed). | Confirmed |
| N13 | Low | `index.html:289` | The bn hero shows a Latin "16" next to Bangla digits ("~১২০ কিমি"). | Render the count from `HOTELS_DATA.length` with `formatNumber`. | Confirmed (screenshot) |
| N14 | Low | `js/app.js:686` | Hotel cards say "From 9,500 - 24,000 BDT": "From" plus a range. | "Listed" or "Estimated". | Confirmed |

Nothing new is High. That is the main change since Oct 21.

## 4. Corner cases and failure modes

| Case | Result | How tested |
|---|---|---|
| Group size 0 (`?adults=0`) | Clamps to 1 adult: ৳14,800 for 3 days. | Node, real files |
| Group size 1 | 1 room, 1 CNG: ৳14,800 comfort, ৳9,250 backpacker. | Node |
| Huge group (20 + 10 kids, 14 days) | 13 rooms, 3 jeeps, ৳10,87,150. Consistent. `?adults=99` clamps to 20 (seen on the live pass: "২০ জন অতিথি"). | Node, live |
| 11 adults | 4 CNGs (৳4,000/day) chosen over 2 jeeps (৳4,400/day). Cheapest, but four CNGs for one group is not what anyone hires. | Node |
| Days 1 / max | 1 day: no hotel night (fixed), but the pass shows a hotel (N8). 14 max; `-5` → 1, `abc` → default 3, `1e3` → 14. | Node |
| Empty activities | Transport still charges a daily vehicle every day (3 × ৳1,000 + ৳600). Defensible, not explained. | Node |
| BDT/USD rounding | Separate rounding gives $1-4 gaps (N10). Rate 3% off (N9). Planner ignores the USD toggle (N7). | Node, live |
| Language toggle mid-export | Export reads current state; the pass is in whichever language is active at the click. No mixed output in the bn exports. | Live export |
| Corrupt localStorage | `visit_cox_lang='{"x":'`, `visit_cox_currency='EUR'`: page loads in `en`, 0 errors. | Live |
| Bad URL params | `?days=0&adults=99&kids=-1&tier=<img>&vibe=x&arc=zzz`: clamps, ignores the rest, 0 errors, total ৳৩৩,০০০. | Live |
| CDN blocked (cdnjs + Google Fonts) | Pages stay styled (local CSS). Export shows the Bangla "library did not load... print instead?" dialog. System fonts render. | Live, blocked URLs |
| Bangla font in exports | Both passes render Bangla cleanly; Bangla filename kept (H11 fixed). Mono labels fall back to a system Bangla font, slightly uneven. | Exported PNGs viewed |
| Offline | Nothing loads. No service worker, so the fare card can't be shown to a driver without signal. The exported PNG is the only offline artefact, and it holds the right numbers. | Code read |
| Chat: every chip | 70 chips/prompts: 0 surfing; 4 misroutes (N5). | Node |
| Chat: emergency words | en "emergency", "police", "999", "hospital", "doctor", "ambulance", "lifeguard" and bn "পুলিশ", "জরুরি", "হাসপাতাল", "সাহায্য" work. 14 other common phrasings get the greeting (N1). | Node |
| Chat: other | "budget" alone → cheapest hotels; "cheap food" → food; "visa", "bkash", "snigdha" → greeting. Acceptable for a keyword bot that says it is one. | Node |
| 404 | Custom page renders in both languages; the only console error is the 404 itself. | Live |

## 5. Data accuracy and trust

**Recorded state.** Unchanged since Oct 21. The `data.js` header (`js/data.js:1-6`) still says prices and phones are "mostly unsourced". Every hotel is `approx: true` and reviewed `2026-10-15`; every `PRICE_BOOK` entry is `approx: true`. The owner's confirmation of all 16 phones and the fares (`../decision.md:55`, 2026-10-21) is still nowhere in the repo, and `todo.md` still lists both as open. Visitors see "estimate" labels, which is honest, but the confirmation buys no trust until it is written down with a date.

**Spot check** (web, 2026-10-24):

| Claim on site | Where | Evidence | Verdict |
|---|---|---|---|
| 999 national emergency | `js/data.js:12` | 999.gov.bd | Matches |
| Tourist Police 01320-222222 / 01887-878787 | `js/data.js:13-14` | Bangladesh Monitor launch report (2023) | Matches |
| Train: Shovon chair ৳695, Snigdha ৳1,325 | `js/app.js:2866` | Prothom Alo / Jago News, Dec 2025: pontage charge from 20 Dec 2025, Snigdha ৳1,322 → ৳1,449 | **Stale by ~10 months** (N4) |
| Bus Dhaka to Cox's Bazar ৳1,200-2,500 | `js/app.js:2868` | Older reports: non-AC ~৳1,100, AC ৳1,300-2,000; no 2026 figure found | Plausible, unsourced |
| 1 USD = 120 BDT | `js/data.js:19`, `js/planner.js:600` | Bangladesh Bank, 18 Oct 2026: 123.55 | **3% off** (N9) |
| Radiant Fish World ৳350 | `PRICE_BOOK.activities.fish_world` (`js/data.js:2557`) | Undated reviews: ৳300 at the gate, ৳250 via hotels | Likely ৳50 high (unchanged since Oct 21) |
| Himchari entry ৳50 | `js/data.js:2558` | No official fee found; a 2015 study proposed ৳25 | Unverified; at least the site now says one number |
| Moheshkhali speedboat ৳80-100, ~30 min | `js/data.js:2440` (FAQ-2) | Tourist Police (owner); 2008 Daily Star ৳80; a May 2026 government speedboat tariff exists but I could not see this route in it | Plausible; check the 2026 tariff |
| Saint Martin's: 2025-26 rules, 2026-27 under review | `js/data.js:2500-2522` | Daily Star 13 Oct 2026: season, cap and departure point under review; no 2026-27 notice found as of today | **Correct and well hedged.** The season opens 1 Nov: re-check weekly |
| Long Beach phone 01755-660051 | `js/data.js:812` | Oct 21: HotelsCombined, Kayak, Booking confirmation give 01730-338907. Today's search found no number | Still conflicts; owner says confirmed |
| "Hotel Laboni Vista", "Coastal Peace / Blue Ocean" | `js/planner.js:408`, `:419` | Coastal Peace exists (3-star on Expedia); no trace of Laboni Vista | See N2 |
| Himchari 10 km vs 18 km | `js/data.js:2209` vs spot data | Tourist Police: about 10 km | Site contradicts itself (N6) |

**Contradictions inside the site:**

| Item | `data.js` | Elsewhere |
|---|---|---|
| Himchari distance | ~10 km (spot, Tourist Police) | 18 km (activity, transport calculator, blog) |
| CNG to Ramu | 400-500 | `culture.html:273` 400-600 round trip |
| Inani by jeep, duration | 1 hour (`TRANSPORT_DATA`) | 50 min each way (`PRICE_BOOK` car fare) |
| Budget hotels | 16 vetted hotels | Planner recommends 2 others (N2) |

**Unsourced hotel claims** are unchanged (`js/data.js:420-424`, `:503`, `:565`), shown with ✓ ticks in the modal.

**No correction channel.** No "report a wrong price" link anywhere. On a fair-fare site this is the cheapest trust feature missing.

## 6. Security and privacy

- **No secrets in the tree.** The gate's secret scan passes. `js/consent.js:4` holds the GA measurement ID, which is public by design.
- **Old credential in history:** still served (`raw.githubusercontent.com/iamanikbarua/Visit-Cox/2bb73c9/js/admin.js`, HTTP 200). Purging history is not worth it for a public repo; rotation is. `todo.md` still has it unchecked.
- **Second host leaks internal files.** `coxbazar.xyz` (Vercel; `visitcox.vercel.app` 307-redirects there; it is still the repo's homepage link) serves the same build plus `todo.md`, `judge.md`, `CrtiQue_Oct15.md`, `CrtiQue_Oct21.md` and `tests/helpers.js`, all HTTP 200 today. Nothing secret, but it publishes every known bug, the owner's to-do list and the GA ID context. Owner item.
- **Consent works.** GA loads only after Accept; 6 tests. Declining in the live run loaded no GA request.
- **CSP:** meta CSP on every page; `script-src` keeps `'unsafe-inline'` and all of cdnjs. SRI is on html2canvas. Low risk: no user-generated content and the untrusted inputs I tried (URL params, storage, search, chat text) are escaped.
- **Privacy page** (`privacy.html:165`) says "hosted on GitHub Pages" and omits the Vercel copy that also sets GA cookies under the same property. The only contact is public GitHub (`privacy.html:169`): no private route for a data request. The PDF claim is gone (fixed).

## 7. UI

Good: the editorial look (Newsreader, stone, terracotta) is calm and consistent. 0 horizontal overflow on 22 phone loads. Toggles are now readable. "Details ➔" replaces "Reserve". The Bangla hero and planner look native. The passes are handsome in both languages.

Problems:
- **Hotel photos** (H3): the first two hotel cards at 375 px show a beach sunset (Sayeman) and Inani Beach (Sea Pearl). Further down, a "Hotel Sea Palace" building stands for three other hotels.
- **Small text:** 36-98 elements under 12 px per page at 375 px, mostly mono 10-11 px labels. Bangla mono labels at that size are hard to read in sunlight.
- **USD toggle vs planner** (N7): the toggle says USD, the big number says ৳.
- **Mixed digits** in bn (N13). **"From" + range** (N14).
- **Brand drift:** three spellings of the name (S7b).
- **Header at 1280 px** wraps "FOOD & DINING" onto two lines; ten nav items plus two toggles is too many for one row.
- **The consent banner** covers the bottom third of the first screen at 375 px until answered (seen on home and planner). Acceptable, but on the planner it hides the first wizard step.

## 8. UX

**Workflow A, "3 days for 2 people, how much?"** Home → quick pick → planner: ৳17,950, the four pills plus the buffer line now add up. The pass exports in Bangla with the right numbers. Gap: the budget excludes getting to Cox's Bazar (the biggest cost: ৳1,449 × 2 × 2 by Snigdha is ৳5,800) and doesn't say so.

**Workflow B, "what should I pay a CNG/jeep?"** Transport table, calculator, driver card and chat now agree on the jeep fares. The transport calculator still offers "Himchari (18 km)" while the spot says 10 km (N6). Bike rental ৳1,500 is a literal in three places with no date.

**Workflow C, "find a hotel and call it":** honest labels, tap-to-call, "Details" modal with focus handling. The photo is usually not the hotel, and the budget hotels the planner suggests are not in this list at all (N2). Booking.com and GoZayaan answer this job better; the site should not pretend otherwise.

**Workflow D, "emergency":** footers, FAQ, both passes and the chat chip show 999 and the two helplines. Typing "help", "drowning" or "অ্যাম্বুলেন্স" into the chat still gets the greeting (N1). A tourist in trouble is more likely to scroll to the footer or dial 999 directly, so this is Medium, not High.

**Workflow E, Bangla visitor:** pages, planner, passes and chat work in Bangla. Search engines see only English (section 11). Bangla text is agent-written and unproofread (`todo.md`).

**When things go wrong:** blocked export library → print offer (good). Bad params and bad storage → silent fallback (good). Offline → nothing. Wrong number spotted → nowhere to report it.

## 9. Accessibility and performance

**Weight** (live, headless Chrome, 375 px, cache off):

| Page | Transferred | Requests | Largest items |
|---|---|---|---|
| index | 526 KB (was 806 KB live on Oct 21) | 17 | two font files 144 KB + 129 KB, `data.js` 43 KB, `app.js` 40 KB |
| itinerary | 400 KB (was 622 KB) | 15 | font 129 KB, `data.js`, `app.js`, html2canvas |
| hotels | 657 KB | 14 | `hero-coxs-bazar.jpg` 202 KB, `inani-beach.jpg` 137 KB, font 129 KB |
| food | 324 KB | 11 | font 129 KB |

- On a 1 Mbps beach connection the home page is about 4 s of transfer. Good.
- **Fonts are now half the home page** (273 KB of 526 KB). Suspected: one of the two files is the Bangla family, loaded in English mode too. Loading Hind Siliguri only in বাংলা mode, or dropping a family (three are loaded: Newsreader, Hind Siliguri, Plus Jakarta Sans), would save 100-150 KB on every page.
- `data.js` + `app.js` (83 KB gzipped) load on every page; the chat strings are about a third of `app.js`.
- **CLS:** 0.000 and **LCP** 408-568 ms on initial load in my runs (no scrolling, fast network). `judge.md` Update 11 reports 0.344 with a different method (full scroll); both can be true. The JS-rendered grids shift the footer, not the viewport.

**Accessibility:**
- Modals now have `role="dialog"`, `aria-modal`, labels, focus trap and return (`js/dialog.js`). Verified by the judge with real key events; the code reads correctly.
- All images have `width`/`height` and alt text.
- `<html lang>` follows the toggle (`lang="bn"` confirmed live).
- Toggle contrast fixed.
- Small text remains the main failure (S7a).
- Still no screen-reader pass by anyone.

## 10. Testing and verification

**What exists:** 61 `node --test` cases in 7 files, all loading the shipped `js/`, green locally and in CI on GitHub. They prove: planner math, clamps, day trip, buffer sum; quick pick = planner; Bangla key parity; no English in bn passes; consent; emergency numbers only from `EMERGENCY_CONTACTS`; escaping; Saint Martin's text; FAQ JSON-LD = data; chat emergency routing for 9 phrasings; no chip returns surfing; chat jeep fares = `fareById`; photo credit table; every `<img>` sized; dialog markup; no "Reserve"; no PDF promise.

**What they don't prove:**
- **Chat answers are right.** The routing test asserts "not surfing", so N5's four misroutes pass. And it tests the 9 emergency words that work, not the ones visitors also use (N1).
- **Prices outside `data.js`.** No test fails when a page or the chat holds a `৳` literal, so N4, N11 and the food/culture/blog copies can't be caught.
- **Planner catalog vs hotel list.** Nothing checks that every planner hotel is a `HOTELS_DATA` hotel (N2).
- **Rendered pages in CI.** No headless browser runs in CI: no console-error check, no screenshot, no export. The judge's browser runs are manual; they are well documented in Updates 10-11, and my live sweep agrees with them.
- **Data freshness.** Nothing warns when an `asOf` is older than N days. The train fare went stale 10 months before anyone noticed.

**The judge log:** Updates 10 and 11 match the code. I verified every "Fixed" claim in them in code or live. My disagreements: H12 (judge right on the label, but missed that the fare is stale), the Himchari distance (the sourced figure exists; no owner needed), and H4 (fixed on spots, but the same files are uncredited elsewhere).

## 11. SEO

| Check | State |
|---|---|
| Titles / descriptions | Unique, 49-57 and 109-155 chars. Good. PDF promise removed from the itinerary meta. |
| Canonical / OG | Every page → github.io. `hotels.html` OG image is a beach. |
| JSON-LD | 3 valid blocks; FAQPage matches `FAQ_DATA` (tested). |
| `robots.txt` | Served at `/Visit-Cox/robots.txt`, which crawlers ignore; `iamanikbarua.github.io/robots.txt` returns 404. The sitemap needs Search Console (owner). |
| `sitemap.xml` | 10 URLs, all `lastmod 2026-10-15`, though 9 pages changed on 2026-10-22. |
| hreflang / Bangla URLs | None. Bangla is a JS toggle on English URLs, so the Bangla query market ("কক্সবাজার ভ্রমণ খরচ", "সিএনজি ভাড়া"), where competition is thin, is unreachable. My search found no Bangla trip-cost tool at all. |
| Content in HTML | Hotels, spots and fares are JS-rendered; Google renders JS, but slowly and partially. |
| Duplicate host | `coxbazar.xyz` serves identical pages with github.io canonicals. |
| Blog | 6 posts behind one URL with `#hash` links: no per-post title, description or OG. |

## 12. Deploy and operations

- **Hosting:** GitHub Pages from `main`, HTTPS, `max-age=600`. `?v=20261022b` cache-busting on changed files. Live equals `origin/main` equals local `main` (verified by hash).
- **CI:** `.github/workflows/check.yml` (Node 24, `npm ci`, `scripts/check.sh`, read-only token) ran green on both pushes since it was added. The `pages-build-deployment` runs are green too.
- **Second host:** `coxbazar.xyz` on Vercel tracks the same branch (same `js/app.js` hash) and publishes the internal files (section 6). The repo homepage still points at `visitcox.vercel.app`. Who owns the domain, the Vercel project and GA is still unwritten (`../decision.md:39`).
- **No monitoring:** no uptime check, no JS error reporting, no funnel events. GA (after consent) mixes two hosts.
- **Rollback:** `git revert` and push; Pages redeploys in about a minute. Fine.
- **Release pipeline:** agents edit, main agent runs the gate, commits and pushes. It works. The weak spot is the manual `?v=` bump on every page; a missed bump serves new HTML with old JS for 10 minutes.
- **Docs drift:** `todo.md` still lists "Approve a GitHub Actions workflow" (done) and the phone/fare checks (owner says done) as open. README "Honesty notes" still say phones are unconfirmed. Skills reference deleted code.

## 13. Legal and compliance

- **Hotel photos.** A building signed "Hotel Sea Palace Limited" shown as three other hotels, and Prime Park's dining room as Ocean Paradise, misrepresents named businesses. The Consumer Rights Protection Act 2009 lists misleading representation about a service as an offence. The site is non-commercial, but a complaint from either brand is plausible. The hotel photos also have no known source: treat them as copyrighted (Copyright Act 2023).
- **CC BY-SA attribution** is now correct on spots and gems, which is real progress, but the same files appear uncredited on hotel cards, the home page, blog and culture page (N3). The hero photo's origin is unknown (`todo.md`).
- **Planner hotel names** (N2): recommending a business by name with an endorsement ("clean, reliable") and a star rating nobody checked carries the same risk the Oct 15 clean-up removed.
- **Privacy:** consent before GA fits the Personal Data Protection Ordinance 2025 and EU/UK expectations. Gaps: no private contact, the second host is not disclosed, GA retention not set (owner).
- **No LICENSE or terms.** "© 2026 VISIT COX. ALL RIGHTS RESERVED." (`index.html:972`) names no owner. The repo belongs to iamanikbarua; domain, Vercel and GA ownership are unwritten. That is who-owns-what risk.
- **Safety facts** are sourced and dated. The Saint Martin's answer correctly hedges on the 2026-27 notice.

## 14. Market, demand and marketability

**Who uses it:** domestic first-timers and families from Dhaka and Chattogram, Bangla-first, on Android, peaking November-February and around Eid. The peak starts in 8 days. There is **still no evidence of any user**: 0 stars, 0 issues, 2 unique repo visitors in 14 days (the team), no shared GA numbers, no feedback channel, and the Facebook test in `06-marketing-manager/GTM.md` has not run.

**Competitors** (checked 2026-10-24):

| Competitor | Strength | Where Visit Cox can win |
|---|---|---|
| Facebook groups (Travelers of Bangladesh, Cox's Bazar groups) | Trust, fresh first-hand costs, huge reach | One dated budget and a fare card you can show a driver, in Bangla |
| YouTube / Facebook vloggers | Faces, Bangla, recency | Searchable and exportable numbers |
| Booking.com / Agoda | Live rooms, reviews, booking | Whole-trip budget and local fares |
| ShareTrip / GoZayaan | BD hotels, bus, air, bKash | No fare guide or trip budget |
| Tripadvisor | Reviews for foreigners | Bangla, local fares |
| travelcostcalculator.org, championtraveler.com | Rank for "Cox's Bazar trip cost"; USD per-day tiers | Generic USD, no local fares, no Bangla. My search found no Bangla trip-cost tool |
| coxsbazar.gov.bd, Tourist Police | Official | Thin, undated, not a tool |
| Daily Star, Prothom Alo, Dhaka Tribune | Dated, sourced fares | Articles, not a planner |

**The niche** is real and still open: a Bangla, BDT, dated whole-trip budget plus a driver fare card as a lock-screen image. The pass is good enough to be the hook in a Facebook post. It is defensible only if the numbers are visibly recent and checked, which is exactly what the data still doesn't record.

**Who pays:** (1) hotel affiliate links: low yield, easy, but needs disclosure on a "fair fare" site; (2) paid listings or WhatsApp leads from operators: needs traffic first and a conflict policy; (3) ads: negligible. Realistically a portfolio and lead-gen side project until it has a few thousand monthly visitors in season.

**Pricing:** free. Nothing to price.

**Distribution:** Bangla Facebook posts with the exported pass image, in the next two weeks, asking "where are these numbers wrong?". Then Bangla search once `/bn/` URLs exist (next season's traffic).

**Claims vs reality:**

| Claim | Reality |
|---|---|
| "Independent guide... prices are estimates" | True and consistently labelled |
| "Coastal Concierge... answers from this guide" | True now for chips and core words; misses many emergency phrasings (N1) |
| Hotel cards | 12 of 16 photos are not the hotel |
| Planner budget hotels | 2 are not on the vetted list; one may not exist (N2) |
| Train fares in chat | 10 months stale (N4) |
| Owner "confirmed all phones and fares" | Not visible anywhere on the site |

## 15. GTM % breakdown

| Dimension (weight) | Oct 21 | Now /10 | Why |
|---|---|---|---|
| Product works (25) | 5 | **6** | Planner, passes, toggles, listings and the chat's main paths work live with 0 errors in en and bn; emergency chat fixed. Wrong hotel photos, unvetted planner hotels and emergency-word gaps remain. |
| Quality and verification (15) | 6 | **7** | 61 real tests, green gate, CI proven on GitHub, routing test. No browser test in CI; chat correctness, price literals and data freshness untested. |
| Security and privacy (15) | 6 | **6** | No secrets, consent-gated GA, CSP, SRI. Old credential public with rotation unconfirmed; second host publishes internal files; no private privacy contact. |
| Legal and compliance (10) | 3 | **3** | Spot credits now correct. Wrong-brand hotel photos, CC BY-SA files uncredited elsewhere, no LICENSE or named owner, ownership of domain/Vercel/GA unwritten. |
| Market validation (15) | 1 | **1** | No users, feedback, funnel events or test. |
| Deploy and operations (10) | 4 | **5** | Live = `main`, CI green, prebuilt CSS live, clean rollback. Two hosts, no monitoring, docs drift. |
| Claims honesty (10) | 6 | **7** | "Reserve", hidden buffer, ✓ credits and PDF promise gone. Wrong photos, planner hotel endorsements, unsourced hotel superlatives, stale train fare remain. |

Weighted: (6×25 + 7×15 + 6×15 + 3×10 + 1×15 + 5×10 + 7×10) / 10 = (150 + 105 + 90 + 30 + 15 + 50 + 70) / 10 = **51.0** (Oct 21: 45.0).

**Cap: 40** (Oct 21: 35). Reasons:
1. Nobody outside the team has used it.
2. A quarter of hotel cards show another brand's building.
3. The owner's phone and fare checks are not in the data the visitor sees.
4. Two hosts, one publishing internal files, with ownership unwritten.

The cap rose because the Oct 21 safety reason (emergency → surfing) is fixed and tested.

**Final: 40%.**

**What each owner item holds down:**

| Owner item (`todo.md`) | Holds down | Cap reason it clears | What it unlocks |
|---|---|---|---|
| Facebook-group test + 5 fare reports | Market validation (1 → 3-4), Claims honesty | #1 | The single biggest step: cap to ~50 with #2-#4 done |
| Hotel phone confirmations recorded (and Long Beach/Sea Pearl rechecked) | Claims honesty (+1), Product works | #3 (with fares) | Agent writes `source`/`asOf` the same day |
| Local fares sourced | Claims honesty, Market validation | #3 (with phones) | Drop `approx` on confirmed fares |
| Hotel image permissions / hero photo origin | Legal (+1-2), Claims, Product works | #2 | Real photos. An agent can clear #2 meanwhile with labelled placeholders, no owner input |
| Domain / second host (coxbazar.xyz, Vercel) | Security (+1), Deploy (+1-2), Legal | #4 | One host, accurate privacy page, no leaked files |
| Admin password rotation | Security (+1) | none | Closes S6a for practical purposes |
| LICENSE | Legal (+1) | part of #4 (ownership) | Clear reuse terms |
| SeaSafe / hospital numbers | Product works (emergency completeness) | none | A fuller emergency list; the chat's "hospital" answer currently shows only police and 999 |
| WhatsApp number | Product works (mission 4) | none | The hand-off feature; only worth it with partners |
| Partners | Market validation (revenue) | none | Any revenue at all |
| 120 km / Marine Drive figures | Claims honesty (minor) | none | Removes two unsourced headline numbers |
| Search Console | Market validation (measurement), SEO | none | Indexing and query data before the season |
| Bangla proofread (`js/page-text.js`) | Quality, Claims honesty | none | Confidence the Bangla reads native |

If agents do every item in section 17 marked "Agent" and nothing else changes: about 56 weighted, still capped at 40 (photos via placeholders would remove reason #2; #1, #3 and #4 are owner-held). With the owner's host decision and recorded confirmations as well: cap 45. With the Facebook test returning at least 5 usable fare reports: 50-55.

## 16. What to cut or stop doing

1. **Stop agent rounds after this week's fixes.** Six rounds since Oct 15 made the engineering good; none produced a user. The season starts 1 November. The next useful input is a visitor saying "the CNG was ৳500, not ৳400".
2. **Cut the chat down.** It works now, but ~820 lines of hand-written answers with 41 prices is the part that keeps going stale (N4) and misrouting (N5). Keep the emergency block and the chips; have each answer render from `data.js` (`FAQ_DATA`, `fareById`, `DESTINATIONS_DATA`) or link to the page that does.
3. **Cut the planner's own hotel catalog.** Read hotel names, stars and blurbs from `HOTELS_DATA`; keep only the per-night rate in `PRICE_BOOK`.
4. **Stop copying prices into HTML and prose** (`food.html`, `culture.html:273`, `js/blog.js:31-32`). Render from data or say "see fares".
5. **Delete the dead code:** hero carousel, autoplay label updaters, the unopened home-page hotel modal.
6. **Delete or rewrite the stale skills** (`.agents/skills/visual-itinerary-pass-exporter`, `whatsapp-concierge-leadgen`, the SEO skill's "longest unbroken" line) and `collaboration_log.md`. Agents read them.
7. **Stop showing photos that aren't the hotel.** A labelled placeholder is more honest than another brand's building.
8. **Drop the second host** unless the owner wants `coxbazar.xyz` as canonical.

## 17. Top 10 next actions

Ordered by value. "Agent" means an agent can do it with no owner input (no new phone numbers, prices from the owner, licences or contact details).

| # | Action | Effort | Who |
|---|---|---|---|
| 1 | Replace the 12 wrong hotel photos with a labelled placeholder (name, zone, "photo not available"); add `PHOTO_CREDITS` captions wherever a Commons file appears (hotel cards, home, blog, culture) (H3, N3). | 3 h | Agent (no owner input) |
| 2 | Chat safety and routing: add the missing emergency words in en and bn (both ambulance spellings, drowning, fire, help, lost, theft, doctor, lifeguard) and the numbers to the greeting fallback; fix the four misrouted chips; turn the routing test into a chip → expected-section table (N1, N5). | 3 h | Agent (no owner input) |
| 3 | Planner hotels: replace "Coastal Peace / Blue Ocean" and "Laboni Vista" with listed hotels or a brandless "budget guest house" line; derive planner names, stars and blurbs from `HOTELS_DATA`; hide the stay block on day trips (N2, N8). | 3 h | Agent (no owner input) |
| 4 | Owner: write down who owns `coxbazar.xyz`, the Vercel project and GA; keep one host (delete the Vercel project, or make it canonical and add `.vercelignore`); change the repo homepage link; add a LICENSE and name the owner in the footer and privacy page; confirm the admin password rotation. | 1-2 h | Owner |
| 5 | Record the owner's 2026-10-21 checks in `js/data.js` (`source: 'owner phone check'`, `asOf: '2026-10-21'`, drop `approx` where confirmed), recheck Long Beach and Sea Pearl first; update the `data.js` header, README and `todo.md`. | 15 min owner + 1 h agent | Owner confirms, agent edits |
| 6 | Fix sourced public facts: Snigdha ৳1,449 (Prothom Alo, Dec 2025) and bus fares into `data.js` with `source`/`asOf`; exchange rate to Bangladesh Bank's 123.55 (18 Oct 2026) read from `CONFIG` only; Himchari 10 km everywhere (Tourist Police figure already in data); `approx: true, asOf` on all 10 activities; FAQ-2 USD from `fareById` (N4, N6, N9, N11, N12). | 2 h | Agent (no owner input) |
| 7 | Add a "Report a wrong price or number" link (prefilled GitHub issue form, public) on fares, hotels and the planner total, and the line "Excludes travel to and from Cox's Bazar" under the planner total. Add GA events `planner_completed` and `pass_exported` (consent-gated, already decided). | 2 h | Agent (no owner input); owner may later swap in a private inbox |
| 8 | Owner: run the Facebook-group test from `GTM.md` before 1 November with the Bangla phone pass as the post image; collect 5 fare reports; agent writes them into `data.js` with dates. Verify Search Console and submit the sitemap. | 1 week listening + 30 min | Owner posts; agent records |
| 9 | Cleanup: delete the hero carousel and autoplay dead code; rewrite the three stale skills and `collaboration_log.md`; make `check.sh` compare the CSS without writing; add a `৳`-literal test (no price outside `data.js`) and a stale-`asOf` warning (older than 90 days); planner leads with USD in USD mode; per-person USD from the rounded total; bn hero "16" via `formatNumber`; "Listed" instead of "From" (N7, N10, N13, N14, P5, P6). | 4 h | Agent (no owner input) |
| 10 | Bangla SEO for next season: static `/bn/` copies of home, planner, transport, hotels and FAQ with `hreflang` pairs built from the same data; per-post blog URLs; real `lastmod`; load the Bangla font only in বাংলা mode to cut ~100-150 KB. Re-check the Saint Martin's notice weekly from now to 1 November. | 2-3 days | Agent (no owner input); owner for Search Console |

After 1-3, 6, 7 and 9 (about two agent days): re-score to about 56 weighted, still capped at 40. After 4 and 5: cap 45. After 8 with real fare reports: 50-55.
