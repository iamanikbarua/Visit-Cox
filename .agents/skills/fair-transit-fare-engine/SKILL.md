---
name: fair-transit-fare-engine
description: >-
  Local transit fare lookups, distance metrics, vehicle capacity guidelines,
  and tourist scam-prevention rules for Cox's Bazar local transportation.
---

# Fair Transit Fare Engine & Anti-Scam Guide 🛺🛵

Use this skill whenever looking up, calculating, or checking transportation costs across Cox's Bazar to protect travelers from overcharging.

---

## 1. Where fares live
Fares live only in `js/data.js` (`TRANSPORT_DATA`, `PRICE_BOOK`), each with `asOf` and a `source` or `approx: true`. Never copy a fare table into a skill, page or role folder: the 2026-10-15 critique found five tables that disagreed. To change a fare, edit `js/data.js`, update its `asOf`, and run `scripts/check.sh`.

## 2. Tourist scam prevention rules Prevention Rules
1. **Never board without agreeing on fare first:** Always ask *"ভাড়া কত?"* before entering a CNG or reserved Tomtom.
2. **Clarify "Reserve" vs "Local Share":** A driver saying *"চলুন উঠে পড়েন"* may assume you are reserving the entire vehicle.
3. **Evening Return Surcharge:** When returning from Inani or Himchari after sunset (after 6:30 PM), CNGs usually demand ৳১০০–৳২০০ extra due to empty return trips.
