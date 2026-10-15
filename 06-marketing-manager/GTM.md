# Visit Cox: go-to-market plan (one page, 2026-10-15)

## Target user
First-time domestic tourists from Dhaka and Chattogram, planning a 2-4 day trip with family or friends, on an Android phone, reading Bangla first. Peak planning: Oct-Feb and the weeks before Eid. Secondary: a small number of foreign visitors.

Their problem: they do not know what a room, a CNG to Himchari or a chander gari to Inani should cost, and they get overcharged.

## Positioning
"A rough trip budget and typical local fares for Cox's Bazar, in Bangla, on one page. Independent, no commissions."

| Alternative | What it does better | Why someone would still use Visit Cox |
|---|---|---|
| Facebook groups (Travelers of Bangladesh etc.) | Trust, recent first-hand costs, reach | Hard to search; no calculator. We turn the scattered costs into one budget. |
| ShareTrip / GoZayaan | Booking, packages, bKash | No local fare guide or whole-trip budget |
| Booking.com / Agoda | Live hotel prices and reviews | No local transport or food costs |

We do not claim to be cheaper, official or verified. The only claim we can defend is "estimates, dated, in one place". It becomes a real advantage only when fares are confirmed by recent visitors.

## First test (2 weeks, no budget)
1. Owner posts the planner link in 3-5 Bangladeshi travel Facebook groups, in Bangla, as "I built a free budget calculator for Cox's Bazar; tell me where the numbers are wrong." No ads, no promises.
2. Ask 5 people who visited in the last 3 months to compare the site's fares and room prices with what they actually paid. Record each answer next to the entry (date, amount, route) and update `js/data.js` with `source` and `asOf`.
3. Pass: at least 3 of 5 say the numbers are close, or their corrections are specific enough to fix. Fail: nobody responds or the numbers are widely off; then fix the data before any further promotion.

## Funnel events to measure (hand to frontend)
| Event | Fires when |
|---|---|
| `planner_completed` | The planner shows a total budget |
| `pass_exported` | PNG or PDF export succeeds |
| `whatsapp_click` | WhatsApp CTA tapped (only once a real number exists) |
| `lang_switch` | User switches to Bangla (shows how Bangla-first the audience is) |

Weekly view: visits -> planner_completed -> pass_exported (-> whatsapp_click). Do not add events until the analytics consent decision below is made.

## Owner decisions needed
- WhatsApp number for the hand-off, or keep it hidden.
- Partners (hotels, drivers): whether to take any, and how to disclose money if so.
- Analytics: add a privacy notice and consent for Google Analytics, or switch to a cookie-free tool (e.g. GoatCounter).
- Domain: keep the GitHub Pages URL or buy one; never print a domain we do not own.
- Who confirms fares and emergency numbers by phone or visit, and how often.
