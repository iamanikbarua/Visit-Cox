# Owner to-do

Items agents cannot finish without the owner. Each line says what to do and why it needs you. From the 2026-10-15 critique (`CrtiQue_Oct15.md`) and fix round.

## Safety and trust (blocks the 15% cap)
- [x] Tourist Police helplines 01320-222222 and 01887-878787 confirmed by the owner from a government notice (2026-10-15). Both are on the site and on exported passes.
- [ ] Give a sourced number for SeaSafe lifeguards and for a hospital (e.g. Cox's Bazar Sadar Hospital), or decide to list none. Why you: the old numbers were placeholders, and only a call or an official page settles it.
- [ ] Confirm phone numbers for the 16 hotels kept. Kollol (1886-777711), Shaibal (1730-080808) and Windy Terrace (1755-668822) look patterned. Why you: needs calls; 10 hotels with dead websites were already removed.
- [ ] Confirm local fares (tomtom, CNG, chander gari, speedboat, bike rental) by phone or a visit, or from 5 people who went recently. Then replace `approx: true` with a `source` in `PRICE_BOOK`/`TRANSPORT_DATA`. Why you: no published source exists.

## Security and privacy
- [ ] Change the old admin credential wherever you might have reused it. The draft admin module was deleted from the codebase. Ensure any shared password is rotated on external accounts (email, GitHub, hosting, social) and GitHub 2FA is active. Why you: only you know where it was reused.
- [x] Consent notice and `privacy.html` added (2026-10-15). GA loads only after the visitor clicks Accept. Still yours: in GA Admin, set data retention to the shortest you need, and read the privacy page once to check it matches how you use GA.

## Money, partners, contact
- [ ] WhatsApp number for trip requests. Put it in `SITE_CONTACT.whatsapp` (`js/data.js`, format `8801XXXXXXXXX`); the button stays hidden until then. Why you: it is your phone and your promise to answer.
- [ ] Partners (hotels, tour operators) and how any commission is shown to users. Why you: contracts and disclosure.
- [ ] Domain and second host: `coxbazar.xyz` (registered 2026-10-12, owner hidden) already serves this repo from Vercel (`visitcox.vercel.app` redirects there; it is the repo's homepage link), and it also serves `todo.md`, `judge.md`, `CrtiQue_Oct15.md`, `tests/` and the role folders, because Vercel ignores `_config.yml`. Confirm who owns the domain and the Vercel project, then keep one host: either delete the Vercel project, or make coxbazar.xyz canonical (canonicals, `og:url`, `sitemap.xml`, `robots.txt`, the 404 `<base>`, `privacy.html` hosting text) and add a `.vercelignore`. Why you: purchase, DNS and the Vercel account (checked 2026-10-19).

## Legal
- [ ] Image permissions: hotel and business photos (kollol, sea-crown, prime-park, white-orchid, radiant-fish-world, kolatoli-eco) need the owners' OK. Place photos: 9 are now credited with author and licence from Wikimedia Commons (`PHOTO_CREDITS` in `js/data.js`, 2026-10-22; radiant-fish-world.jpg and kolatoli-eco.jpg are Commons files too). `hero-coxs-bazar.jpg` (home hero, and the photo for Laboni, Sugandha, Kolatoli and four restaurants) matches none of its old credits, 4 of which linked to Commons files that do not exist: say where it came from, or replace it. Why you: licensing.
- [ ] Add a LICENSE (code) and a content notice. Why you: the repo is yours.
- [ ] Confirm the "about 120 km" beach and Marine Drive length figures, or drop them. Why you: needs a source you accept.

## Distribution and validation
- [ ] Post the planner in 3-5 Bangladesh travel Facebook groups, and ask 5 recent visitors to compare what they paid. The plan is in `06-marketing-manager/GTM.md`. Why you: your accounts and your voice.
- [ ] Verify the site in Google Search Console and submit `sitemap.xml`. Why you: needs your Google account.

## Approvals agents need (then agents can do the work)
- [x] Build step to replace the Tailwind CDN: approved and done 2026-10-21. Pages load the prebuilt `css/tailwind.css` (48 KB, 9 KB gzipped) instead of the 407 KB CDN script; see `judge.md` Update 8.
- [ ] Approve a GitHub Actions workflow that runs `scripts/check.sh` on every push. Why you: pushing workflow files needs a token with `workflow` scope.

## Agent follow-ups (no owner input needed)
- [x] Bangla for hotel descriptions, activity names and the day-by-day schedule in the planner and passes (2026-10-15, `a399655`).
- [x] Calculator tip moved to `UI_TEXT.transportSection.calcTip`. The `transport.html` no-JS fallback now says fares need JavaScript instead of showing old numbers (`a399655`).
- [x] The 680 px export card no longer scrolls inside its own box on phones: the owner's `168f198` moved it offscreen. Checked at 375 px: no inner scroll box, and both passes export whole (1600x1260 and 720x1280).
- [x] Card text links, the range slider and icon buttons are 44 px on touch screens (`a399655`). Only links inside sentences on `privacy.html` stay smaller; WCAG exempts those.
- [x] Re-run the critique pipeline to re-score GTM (2026-10-24, `CrtiQue_Oct24.md`): **40%** (weighted 51, cap 40; was 35, weighted 45). The cap stays at 40 because of owner items: no users (Facebook test), phone and fare checks not recorded in `js/data.js`, two hosts (coxbazar.xyz). Section 15 of the critique says which item lifts which score. Re-run after those items to re-score again.
- [ ] CrtiQue_Oct24 agent fixes, one small commit each (see the critique's sections 3 and 17).
  - [x] N1: the chat sends "help", "drowning", "fire", "stolen", ডাক্তার, অ্যাম্বুলেন্স/এম্বুলেন্স, লাইফগার্ড, আগুন, চুরি and similar to the emergency numbers; the greeting has an "Emergency numbers" chip.
  - [x] N6: the unsourced "18 km" for Himchari is gone (blog route, transport calculator option, bicycle activity, en and bn). The sourced spot text ("about 10 km south of the bus stand", Tourist Police) is the only figure left. The blog's other route distances (Darianagar 10, Inani 32, Shamlapur 45 km) are still unsourced.
  - [x] N9/N11: the planner reads `CONFIG.exchangeRateUSD` instead of its own 120; the chat's four Moheshkhali speedboat prices and FAQ-2's USD figure read `fareById('town-to-moheshkhali')`. The rate itself is still 120 with no source (owner: pick a rate and source, e.g. Bangladesh Bank).
- [x] Bangla for the static page text (2026-10-16): `js/page-text.js` holds Bangla for every fixed English string on the 10 pages (privacy keeps its own Bangla section, the planner its `data-pt` keys); `renderPageText()` swaps them in বাংলা mode. The home quick-pick cards are Bangla too (titles, days, guests, digits); hotel and brand names stay English. English blocks in বাংলা mode, headless Chrome: home 123 → 11, food 128 → 6, culture 71 → 6. `tests/page-text.test.js` fails when new English copy has no Bangla. The blog page now remembers the language, and the 404 page is checked live in বাংলা mode (2026-10-16, `8528903`).
- [ ] Owner: have a native speaker proofread `js/page-text.js` (383 strings, agent-translated). Why you: tone and place-name spellings need a local reader.
