# Visit Cox — judge log

Gaps and next steps. Newest section last; read it first.

## Update 1 (2026-10-15): agents overpowered

- Rewrote `AGENTS.md` as an operating contract: file ownership map, ship-in-place (no staging copies), evidence-or-it-did-not-happen, no invented facts, owner-only decisions go to `todo.md`.
- Added `CODING_STANDARDS.md`, `scripts/check.sh` (JS syntax, `node --test`, local links/assets, stray files, secret scan) and `tests/` with a harness that loads the real `js/` files.
- Rewrote all six role briefs (`0N-*/WORKSPACE.md`) with owned paths, standards and required proof. Role 03 is now "data and integrations": there is no backend.
- Gate state at this point: fails on `no secrets` (admin password in `js/admin.js`). Next: independent critique, then role fixes.

## Update 2 (2026-10-15): critique and two fix rounds

- Independent critique `CrtiQue_Oct15.md`: **GTM 15%** (weighted 24, capped at 15 for wrong and placeholder emergency numbers). Recorded in `../GO_TO_MARKET_SCORECARD.md`.
- Round 1, 5 role agents (data, planner, site, qa, uiux), commit `031b33a`:
  - Emergency numbers come from one sourced `EMERGENCY_CONTACTS` list. The lifeguard and police placeholders are gone.
  - WhatsApp CTA is hidden until `SITE_CONTACT.whatsapp` is set.
  - Home search fixed. 10 unverifiable hotels removed.
  - `admin.js` (plaintext credential) and the local-only CMS deleted. `features.js` and the hidden home sections removed: about 9.8k lines.
  - Planner math fixed: kids count for rooms, vehicles by capacity, URL params clamped, quick pick uses `PlannerApp.estimate`.
  - Images 33% smaller, AA contrast. Real tests replace the fake QA suite.
- Round 2, 3 role agents (seo, marketing, planner):
  - SEO: honest titles and descriptions, canonical/OG tags, WebSite/FAQPage JSON-LD, sitemap, robots, 404.
  - Marketing: hype removed in en and bn, "estimates, last reviewed Oct 2026" lines, README rewritten, `06-marketing-manager/GTM.md`.
  - Planner: one `PRICE_BOOK`; five conflicting fare tables reconciled to `TRANSPORT_DATA`; planner and passes in Bangla. Totals are unchanged and covered by a snapshot test.
- Proof: `scripts/check.sh` all 6 steps pass, 34 node tests. Headless Chrome shows 0 page errors on all 10 pages. Exported bn phone pass shows only 999 plus an "estimates" note.
- Not done, or needs the owner: see `todo.md`. The GTM score is not re-scored yet; the critique predicts about 30-35% after these fixes plus the owner's emergency-number call. Re-run the critique pipeline to confirm.
- Merge: the owner pushed `168f198` (planner UX overhaul) during the rounds. It was merged in `1b3f3ac`, keeping the owner's wizard, offscreen pass and activity customizer, and re-applying Bangla, clamps, `PRICE_BOOK`, emergency/WhatsApp rules and hype removal on top. 35 tests pass. Pushed as `a29aa2b`.

## Update 3 (2026-10-15): Tourist Police confirmed, analytics consent

- Owner confirmed the Tourist Police helplines from a government notice: 01320-222222 and 01887-878787. Both are in `EMERGENCY_CONTACTS` and on exported passes. Officers' personal mobiles were left off.
- Content added from the Tourist Police Cox's Bazar Region page: bus-stand distances, Radiant Fish World hours, parasailing ৳1,000-3,000, Moheshkhali speedboat about 30 min (was 20/35 in places), Saint Martin's times, and per-beach safety tips. Two FAQs added (beach safety, Saint Martin's).
- Analytics: GA now loads only after the visitor taps Accept (`js/consent.js`). The banner is bilingual, with a "Cookie settings" link in every footer to change the choice. `privacy.html` is added and in the sitemap. Checked in Chrome: no Google request and no `_ga` cookie before consent.
- Proof: `scripts/check.sh` all 6 steps pass, 44 node tests. 0 page errors on all 11 pages.
- Open: the owner should review the legal wording on `privacy.html`. Google Fonts and the CDNs still load for everyone, and the privacy page says so.

## Update 4 (2026-10-15, agent round)

Closed the "Agent follow-ups" in `todo.md`. Code commit: `a399655`.
- Bangla planner: hotel and dining descriptions, the day-by-day schedule (titles, themes, items, badges, times such as "বিকেল ৪:৩০") and both passes now render in Bangla in বাংলা mode. The translations follow the English copy and add no new claims. Brand names stay in English. The WhatsApp message uses the Bangla activity names.
- The calculator tip is now `UI_TEXT.transportSection.calcTip`. The `transport.html` no-JS fallback no longer shows old placeholder fares (৳400-600, "৳100-200 waiting"). It says fares need JavaScript, so no price table is copied out of `PRICE_BOOK`.
- 680 px export card: already fixed by the owner's `168f198`, which moved the card offscreen. At 375 px no element scrolls inside its own box, and both exports come out whole.
- Tap targets: the `pointer: coarse` block in `css/styles.css` now covers button width, standalone and card links, tel links, checkbox labels and the range slider. Small targets at 375 px went from 105 to 3. The 3 left are links inside sentences on `privacy.html`, which WCAG exempts.
- Proof: `scripts/check.sh` passes all 6 steps with 45 node tests. The new test loads the real planner in বাংলা mode and asserts there is no English in the schedule, the passes or the hotel and dining copy. Headless Chrome shows 0 page errors on all 11 pages. English text blocks on the planner page in বাংলা mode went from 89 to 29 (brand names and site chrome). Screenshots were checked at 375x812.
- Not done: the GTM re-score, which waits on the owner items. Bangla for the static HTML text (nav, heroes, footers, home quick-pick cards) is a new follow-up in `todo.md`.

## Update 5 (2026-10-16, agent round)

- **Chatbot bug fixed:** spot answers (Himchari, Inani, Moheshkhali...) showed raw `<strong>` and `<br/>` tags as text, because `031b33a` escaped the authored answer HTML. Bodies are constants in `js/app.js`, not user input, so they are inserted as-is again; titles stay escaped. Regression test in `tests/regression.test.js` (fails on the old code).
- **Bangla for the static pages:** see `todo.md`. New `js/page-text.js` and `tests/page-text.test.js`; quick-pick cards follow the language and re-render on a toggle.
- Proof: `scripts/check.sh` passes all 6 steps, 49 node tests. Headless Chrome on 10 pages in বাংলা mode: 0 page errors. Not checked: a native speaker's read of the Bangla; the 404 page in বাংলা mode (its `<base>` points at the live site, so it works only after deploy).


## Update 6 (2026-10-16): Update 5 reviewed, committed and checked live

Commits: `d6c8874` (chatbot fix), `8528903` (Bangla page text), `2ce426f` (update 5 docs).
- Review: `renderPageText()` only sets `nodeValue`, so it writes text and never HTML. The chatbot inserts only the spot bodies from `js/app.js` as HTML, and their only interpolations are price formatters. Titles and anything the user types stay escaped. The numbers in all 384 Bangla strings match the English ones; the 6 that differ are spelled-out years or 24h times turned into 12h.
- Fixed on top: `blog.html` always opened in English and never saved the toggle. It now saves the language and opens in বাংলা when it was chosen on another page. `<html lang>` stayed `en` on a first load in বাংলা mode; `renderAll()` now sets it. The `?v=` tags on `app.js` and `quickpick.js` were bumped so cached copies refresh.
- Proof: `scripts/check.sh` passes all 6 steps with 49 node tests. Headless Chrome locally on 10 pages × 2 languages: 0 page errors. After the Pages deploy (run 38929473112, success), live: the 404 page in বাংলা mode is fully Bangla (10 Bangla blocks, 0 English) with 0 page errors, and the home, blog, food and planner pages have 0 page errors in both languages. On the live home page, toggling বাংলা then English swaps the quick-pick cards and the hero both ways, and the Himchari chatbot answer renders `<strong>`, not literal tags.
- Not done: the Bangla is agent-translated and not proofread. In বাংলা mode, English remains in the blog post meta (author, date, read time, tags: 20 blocks) and on the planner (brand and hotel names, plus the footer sentence "An independent, non-commercial guide...").

## Update 7 (2026-10-19, review round)

No new commits since `572e8af` (that commit and `7cad42d` were not logged here: Bangla blog meta and planner names; meta CSP, SRI on the export libraries, Jekyll excludes, unsourced hotel ratings and blog likes no longer shown). This round checked the live site and the code; nothing was changed apart from this section and one `todo.md` line.

Status of what was still open:
- Hotels show other buildings' photos: **open.** 12 of 16 hotels use a photo that is not theirs (`js/data.js:447`, `:511`, `:573`, `:635`...). 8 of them show another hotel from the same list: on the live hotels page Ocean Paradise shows Prime Park's dining room.
- No way to report a wrong price, and prices are unconfirmed: **open.** Still no form, mailto or feedback link anywhere. Spot check of 6 facts: Sayeman's phone matches its website; Sea Pearl's (`js/data.js:508`) is not on seapearlcoxsbazar.com, which lists 01887-660066; Long Beach's (`:814`) differs from the number on Booking.com and HotelsCombined (01730-338907); Radiant Fish World ৳350 vs about ৳300 in recent reviews; Moheshkhali speedboat ৳80-100 matches older reports; the Himchari entry fee is ৳50 in `PRICE_BOOK` (`js/data.js:2570`) but "~৳120" in the chatbot (`js/app.js:2410`).
- Ownership and the old admin password: **open, and wider.** The repo's homepage field points to `visitcox.vercel.app`, which redirects to **coxbazar.xyz** (registered 2026-10-12, owner hidden). The old `js/admin.js` is still downloadable from commit `2bb73c9` on raw.githubusercontent.com.
- Internal files off the public site: **partly.** They return 404 on github.io, but coxbazar.xyz is a Vercel copy that ignores `_config.yml`, so `todo.md`, `judge.md`, `AGENTS.md`, `CrtiQue_Oct15.md`, `tests/`, `scripts/` and the role briefs are all public there (HTTP 200).
- Still working: no Google request before consent and GA after Accept; the WhatsApp button stays hidden; both pass exports download (1600x1260 and 720x1280 PNG) with 0 page errors; no horizontal scroll at 375 px; Bangla mode leaves 2 English blocks on the home page; the 404 page works; `scripts/check.sh` passes all 6 steps (58 tests).

Bugs found:
1. **Saint Martin's advice is out of date (high).** The FAQ (`js/data.js:2526`) gives a 2-hour speedboat from Teknaf, and the chatbot (`js/app.js:2556`) says ships run "from Cox's Bazar or Teknaf". Under the 2025-26 rules (UNB, Dhaka Tribune, bdnews24) ships leave only from Cox's Bazar (Nuniya Chhara BIWTA ghat), Teknaf routes and speedboats are banned, a travel pass is needed, November is day trips only, and the island is closed February to October.
2. **The second host leaks internal files (medium).** See above. Fix: one host, or a `.vercelignore` with the same list as `_config.yml`.
3. **Place photos carry a "✓" credit for a different place (medium).** At least 11 of 24 places reuse another place's photo, and `js/app.js:1146` prints "✓ Wikimedia Commons (Kutubdia)" over the Adinath Temple photo from Moheshkhali (`js/data.js:1575`). Same for Teknaf (`:1597`, Himchari photo), Dulhazra (`:1619`), Aggamedha (`:1641`) and the Rakhine handloom village (`:1810`). The credits give no author or licence, which CC BY-SA requires.
4. **The language switch is almost invisible (medium).** The inactive "বাংলা" and "$ USD" pills use `text-sky-100` (`js/app.js:126`, `:131`, `:138`) on the cream header, about 1.1:1 contrast. The Bangla audience cannot see the button that serves them.
5. **Two hotel phone numbers do not match public listings (medium).** Sea Pearl and Long Beach, above.
6. Low: the phone pass breaks "01887-878787" across two lines; `jspdf` 2.5.1 loads on `itinerary.html:114` but nothing uses it; `privacy.html:214` says the site is hosted only on GitHub Pages; the Himchari price contradiction above.

Remaining gaps, most important first:
1. Who owns the brand, domain, Vercel project, GA property and repo is still unsettled, and there are now two live hosts with the canonical on github.io.
2. Wrong or unconfirmed facts with no way for visitors to correct them (Saint Martin's, phones, fares).
3. Photos: wrong hotels, wrong places under a ✓, no licence credits.
4. Bangla pages cannot be found from search: no hreflang, no `/bn/` URLs, no per-post blog URLs, no Search Console.
5. The planner budget leaves out getting to Cox's Bazar, the biggest cost for most visitors.
6. No revenue path. "Reserve ➔" on hotel cards only opens Call and Website. ShareTrip and GoZayaan book hotels and buses, Tripadvisor has reviews, Facebook groups have fresh prices; the only edge here is fair fares and the lock-screen pass, and nobody has seen it.
7. No users and no measurement: the Facebook-group test has not run, there are no planner or export events, and GA mixes two hosts.
8. Page weight: the home page is 824 KB on a first visit, and Tailwind compiles CSS on the phone.
9. UI: two visual styles, 36 text elements under 12 px on the home page at 375 px, brand name drift.
10. Legal: no LICENSE and no named owner behind "All Rights Reserved".

Next steps, in order:
1. Owner: agree with iamanikbarua who owns coxbazar.xyz, the Vercel project, GA and the repo, and pick one host. Rotate the old admin password wherever it was used.
2. Agent: fix Saint Martin's in the FAQ and chatbot (en and bn, with source and date), the Himchari price, the toggle contrast, the pass number wrap; drop the unused jsPDF tag.
3. Agent: give the 12 hotels a labelled placeholder instead of another hotel's photo, and point each place credit at its real file with author and licence, or drop the ✓.
4. Agent, after step 1: `.vercelignore` or delete the Vercel project; canonical, sitemap and privacy hosting text to match the chosen host.
5. Owner: confirm the 16 hotel phones (start with Sea Pearl and Long Beach) and the local fares. Agent: add a "Report a price" link on fares, hotels and planner totals.
6. Owner: run the Facebook-group test and verify Search Console. Agent: add cookie-free counts for planner completed and pass exported.

Fixed after this review (not committed yet): bug 1, Saint Martin's. `faq-8` in `js/data.js` (en and bn), its copy in the `index.html` FAQ JSON-LD, and the chatbot (`js/app.js`, which now shows the FAQ text in both languages and also matches "St. Martin" and "সেন্ট মার্টিন") now say: ships only from the Cox's Bazar BIWTA jetty at Nuniachhara, no Teknaf speedboats, trawlers or ships for tourists, November day trips only, overnight stays December-January, closed February-October, 2,000 a day, tickets with a QR travel pass from a Bangladesh Tourism Board approved portal, and that the 2026-27 rules are under review. `source`, `sourceUrl` and `asOf: 2026-10-19` on the entry; sources: UNB via Dhaka Tribune (5 Nov 2025), The Daily Star (27 Oct 2025 and 13 Oct 2026), TBS (30 Nov 2025). New regression test; `scripts/check.sh` passes (51 tests).

## Update 8 (2026-10-21): Tailwind CDN replaced by a prebuilt CSS file

Owner approved the build step on 2026-10-21. Pages no longer run the Tailwind Play CDN (407 KB of JS, 123 KB gzipped, compiling CSS on the phone). They load `css/tailwind.css`: 48 KB, 9 KB gzipped, built by the Tailwind CLI 3.4.17 (the version the CDN served) from `tailwind.config.js`, which scans `*.html` and `js/*.js`. No class names are assembled from pieces at runtime, so there is no safelist.
- Rebuild: `npm ci` once, `npm run build:css` after changing classes, commit the CSS. `scripts/check.sh` has a new step, "tailwind css fresh": it rebuilds the file and fails if it changed.
- The link sits last in `<head>`, where the CDN injected its `<style>`, so the cascade against `css/styles.css` and the page `<style>` blocks is unchanged. `cdn.tailwindcss.com` is gone from every CSP. `privacy.html` (en and bn) no longer lists Tailwind among the CDNs. `_config.yml` keeps `package*.json` and `tailwind.config.js` off the site.
- The inline configs were not all the same. Eight pages shared one; `index.html` had other `ocean-900/950` shades (#0E2338/#071624, used only in chatbot answers) and `blog.html` had no `ocean` colors at all. The build uses the shared config. `404.html` had no config, so a small `<style>` there keeps the default Tailwind fonts and stone colors it rendered with.
- **One intended visual change: the blog page.** Without `ocean` colors its header, hero, active filter pill and footer had no background, so the nav and footer text were white on cream and close to invisible. They now render dark as the markup intends.
- Proof: headless Chrome, 11 pages at 375 and 1280 px, EN and বাংলা, light and dark, plus the consent banner (77 shots), compared pixel by pixel with two runs of the old CDN pages. Apart from the blog and the edited privacy sentence, no pixel changed by more than 3/255 outside photo areas that also differ between the two baseline runs; the 1-3 unit shifts come from the minifier writing alpha colors as 8-bit hex (an unminified build matched exactly). Computed styles of every element match except the `transition-property` prefix list. Every rule the CDN generated is in the built file. Console: no new messages (the only one, before and after, is the 404 page's `<base>` blocked by CSP on localhost). `scripts/check.sh` passes all 7 steps (51 tests).
- Not done: the CI workflow that runs `scripts/check.sh` on push (next agent).
