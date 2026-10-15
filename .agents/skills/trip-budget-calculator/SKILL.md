---
name: trip-budget-calculator
description: >-
  Cost calculation algorithms, baseline expense matrices, and formula standards
  for estimating Cox's Bazar travel budgets across duration, group size,
  and travel styles (Backpacker, Standard, Luxury).
---

# Trip Budget Calculator Skill for Cox's Bazar 💰🏖️

Use this skill whenever computing, generating, or validating travel budget estimates for visitors traveling to Cox's Bazar, Bangladesh.

---

## 1. Core Calculation Formula

```text
Total Trip Budget = (
    (Nightly Hotel Rate * Number of Nights * Required Rooms) +
    (Daily Meal Cost Per Person * Group Size * Total Days) +
    (Total Local Transport Fare) +
    (Total Activity & Entry Tickets * Group Size) +
    (Contingency & Emergency Buffer: 10%)
)
```

---

## 2. Where prices live
The formula is implemented once, in `PlannerApp.estimate(query)` (`js/planner.js`); quick pick and every other total call it. Prices live only in `js/data.js` (`PRICE_BOOK`, `HOTELS_DATA`, `TRANSPORT_DATA`) with `asOf` and `source` or `approx: true`. Do not keep price matrices here; they drift.

## 3. Seasonal Multipliers
* **Peak Season (Nov – Feb):** Multiply base hotel rates by `1.2x – 1.4x`
* **Eid / New Year Surge:** Multiply base hotel rates by `1.5x – 1.8x`
* **Monsoon / Off-Season (May – Aug):** Multiply base hotel rates by `0.6x – 0.7x` (30%–40% discounts)

---

## 4. Currency Conversion
* Baseline exchange rate: `1 USD = 120 BDT`.
* Always round BDT to nearest ৳৫০ or ৳১০০, and USD to nearest integer or 2 decimal places.
