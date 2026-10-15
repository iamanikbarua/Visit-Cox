# Owner to-do

Items agents cannot finish without the owner. Each line says what to do and why it needs you. From the 2026-10-15 critique (`CrtiQue_Oct15.md`) and fix round.

## Safety and trust (blocks the 15% cap)
- [ ] Call the Tourist Police helpline 01320-222222 and confirm it works for tourists in Cox's Bazar. Then set `needsOwnerConfirm: false` in `EMERGENCY_CONTACTS` (`js/data.js`). Until then the number shows on pages but is left off exported passes. Why you: it needs a phone call.
- [ ] Give a sourced number for SeaSafe lifeguards and for a hospital (e.g. Cox's Bazar Sadar Hospital), or decide to list none. Why you: the old numbers were placeholders, and only a call or an official page settles it.
- [ ] Confirm phone numbers for the 16 hotels kept. Kollol (1886-777711), Shaibal (1730-080808) and Windy Terrace (1755-668822) look patterned. Why you: needs calls; 10 hotels with dead websites were already removed.
- [ ] Confirm local fares (tomtom, CNG, chander gari, speedboat, bike rental) by phone or a visit, or from 5 people who went recently. Then replace `approx: true` with a `source` in `PRICE_BOOK`/`TRANSPORT_DATA`. Why you: no published source exists.

## Security and privacy
- [ ] Rotate the old admin password wherever you reuse it. It was in the public `js/admin.js` (now deleted) and stays in git history. Why you: only you know where it is reused.
- [ ] Google Analytics `G-KNP95TZB0K` sets cookies with no notice. Either add a privacy page and a consent notice, or switch to a cookie-free counter such as GoatCounter. Why you: it is your account and your policy choice.

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
- Bangla for hotel descriptions, activity names and the day-by-day schedule; they are still English in বাংলা mode (data and frontend).
- Move the calculator tip line in `app.js` into `UI_TEXT`. Replace the old placeholder fare numbers in `transport.html`, which show when JS fails.
- The 680 px export card scrolls inside its own box on phones (uiux).
- Card text links, the range slider and icon buttons are still under 44 px (uiux).
- Re-run the critique pipeline to re-score GTM after the owner items above.
