# Owner to-do

Items agents cannot finish without the owner. Each line says what to do and why it needs you. From the 2026-10-15 critique (`CrtiQue_Oct15.md`) and fix round.

## Safety and trust (blocks the 15% cap)
- [x] Tourist Police helplines 01320-222222 and 01887-878787 confirmed by the owner from a government notice (2026-10-15). Both are on the site and on exported passes.
- [ ] Give a sourced number for SeaSafe lifeguards and for a hospital (e.g. Cox's Bazar Sadar Hospital), or decide to list none. Why you: the old numbers were placeholders, and only a call or an official page settles it.
- [ ] Confirm phone numbers for the 16 hotels kept. Kollol (1886-777711), Shaibal (1730-080808) and Windy Terrace (1755-668822) look patterned. Why you: needs calls; 10 hotels with dead websites were already removed.
- [ ] Confirm local fares (tomtom, CNG, chander gari, speedboat, bike rental) by phone or a visit, or from 5 people who went recently. Then replace `approx: true` with a `source` in `PRICE_BOOK`/`TRANSPORT_DATA`. Why you: no published source exists.

## Security and privacy
- [ ] Change the old admin password wherever you reuse it. It was in the public `js/admin.js`, which is now deleted but stays in git history. To see it: `git show 2bb73c9:js/admin.js | sed -n 14,26p`. The site no longer uses it, so nothing in the repo needs changing. Change it on any account where you used the same password (email, GitHub, hosting, social). On GitHub also turn on two-factor auth. Optional: rewrite history to remove it (`git filter-repo` plus a force push); it's not needed once the password is changed everywhere. Why you: only you know where it's reused.
- [x] Consent notice and `privacy.html` added (2026-10-15). GA loads only after the visitor clicks Accept. Still yours: in GA Admin, set data retention to the shortest you need, and read the privacy page once to check it matches how you use GA.

## Money, partners, contact
- [ ] WhatsApp number for trip requests. Put it in `SITE_CONTACT.whatsapp` (`js/data.js`, format `8801XXXXXXXXX`); the button stays hidden until then. Why you: it is your phone and your promise to answer.
- [ ] Partners (hotels, tour operators) and how any commission is shown to users. Why you: contracts and disclosure.
- [ ] Domain: is `visitcox.com` (or another) yours? If yes, point it at GitHub Pages and update canonicals, `og:url`, `sitemap.xml`, `robots.txt` and the 404 `<base>`. Why you: purchase and DNS.

## Legal
- [ ] Image permissions: hotel and business photos (kollol, sea-crown, prime-park, white-orchid, radiant-fish-world, kolatoli-eco) need the owners' OK. Place photos (hero, himchari, inani, moheshkhali, najirartek, ramu, shamlapur, sonadia) look like Wikimedia or stock and need attribution or replacement. Why you: licensing.
- [ ] Add a LICENSE (code) and a content notice. Why you: the repo is yours.
- [ ] Confirm the "about 120 km" beach and Marine Drive length figures, or drop them. Why you: needs a source you accept.

## Distribution and validation
- [ ] Post the planner in 3-5 Bangladesh travel Facebook groups, and ask 5 recent visitors to compare what they paid. The plan is in `06-marketing-manager/GTM.md`. Why you: your accounts and your voice.
- [ ] Verify the site in Google Search Console and submit `sitemap.xml`. Why you: needs your Google account.

## Approvals agents need (then agents can do the work)
- [ ] Approve a build step to replace the Tailwind CDN (397 KB of JS compiling CSS on the phone) with a prebuilt CSS file of about 15-30 KB. Why you: adds Node tooling to a no-build repo.
- [ ] Approve a GitHub Actions workflow that runs `scripts/check.sh` on every push. Why you: pushing workflow files needs a token with `workflow` scope.

## Agent follow-ups (no owner input needed)
- [x] Bangla for hotel descriptions, activity names and the day-by-day schedule in the planner and passes (2026-10-15, `a399655`).
- [x] Calculator tip moved to `UI_TEXT.transportSection.calcTip`. The `transport.html` no-JS fallback now says fares need JavaScript instead of showing old numbers (`a399655`).
- [x] The 680 px export card no longer scrolls inside its own box on phones: the owner's `168f198` moved it offscreen. Checked at 375 px: no inner scroll box, and both passes export whole (1600x1260 and 720x1280).
- [x] Card text links, the range slider and icon buttons are 44 px on touch screens (`a399655`). Only links inside sentences on `privacy.html` stay smaller; WCAG exempts those.
- [ ] Re-run the critique pipeline to re-score GTM after the owner items above. Skipped on 2026-10-15: the owner items are still open.
- [x] Bangla for the static page text (2026-10-16): `js/page-text.js` holds Bangla for every fixed English string on the 10 pages (privacy keeps its own Bangla section, the planner its `data-pt` keys); `renderPageText()` swaps them in বাংলা mode. The home quick-pick cards are Bangla too (titles, days, guests, digits); hotel and brand names stay English. English blocks in বাংলা mode, headless Chrome: home 123 → 11, food 128 → 6, culture 71 → 6. `tests/page-text.test.js` fails when new English copy has no Bangla. The blog page now remembers the language, and the 404 page is checked live in বাংলা mode (2026-10-16, `8528903`).
- [ ] Owner: have a native speaker proofread `js/page-text.js` (383 strings, agent-translated). Why you: tone and place-name spellings need a local reader.
