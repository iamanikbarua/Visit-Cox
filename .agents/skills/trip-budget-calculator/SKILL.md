---
name: trip-budget-calculator
description: >-
  Cost calculation algorithms, baseline expense matrices, and formula standards
  for estimating accurate Cox's Bazar travel budgets across duration, group size,
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

## 2. Baseline Expense Matrices (BDT ৳)

### A. Hotel Accommodations (Per Room / Night)
* **Backpacker / Ultra-Budget:** ৳৮০০ – ৳১,৫০০ (Kolatoli second-line, standard non-AC)
* **Standard / Comfort:** ৳২,০০০ – ৳৩,৫০০ (Kolatoli / Sugandha, AC room, attached bath)
* **Premium / 4-Star:** ৳৪,৫০০ – ৳৭,৫০০ (Hotel Sea Crown, Prime Park, Ocean Paradise)
* **5-Star Luxury Resort:** ৳১০,০০০ – ৳২৫,০০০+ (Sayeman Beach Resort, Royal Tulip Sea Pearl, Mermaid Beach Resort)

### B. Daily Dining (Per Person / Day)
* **Budget Foodie:** ৳৪০০ – ৳৬০০ (Local rice, dal, shutki bhorta, standard fish curry)
* **Standard Dining:** ৳৮০০ – ৳১,২০০ (Poushee / Jhaubon fish feasts, Sugandha live fish fry stalls)
* **Gourmet / Luxury:** ৳১,৮০০ – ৳৩,৫০০ (Mermaid Beach Cafe, Tarboosh at Sayeman, live lobster/crab BBQ)

### C. Activities & Entry Tickets (Per Person)
* **Himchari National Park Entry:** ৳৩০
* **Radiant Fish World Aquarium:** ৳৩০০ – ৳৪০০
* **Moheshkhali Speedboat Crossing:** ৳১০০ – ৳১২০ (one way)
* **Beach Parasailing:** ৳১,৫০০ – ৳২,০০০ (per flight)
* **Jet Ski 10-Minute Ride:** ৳১,০০০ – ৳১,৫০০
* **Marine Drive Bike / Scooter Rental:** ৳১,০০০ – ৳১,৫০০ (per day, fuel extra)

---

## 3. Seasonal Multipliers
* **Peak Season (Nov – Feb):** Multiply base hotel rates by `1.2x – 1.4x`
* **Eid / New Year Surge:** Multiply base hotel rates by `1.5x – 1.8x`
* **Monsoon / Off-Season (May – Aug):** Multiply base hotel rates by `0.6x – 0.7x` (30%–40% discounts)

---

## 4. Currency Conversion
* Baseline exchange rate: `1 USD = 120 BDT`.
* Always round BDT to nearest ৳৫০ or ৳১০০, and USD to nearest integer or 2 decimal places.
