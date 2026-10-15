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
