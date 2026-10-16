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
- Not done: the Bangla is agent-translated and not proofread. Blog post bodies are still partly English in বাংলা mode (20 blocks), and so is the itinerary chrome (8 blocks).
