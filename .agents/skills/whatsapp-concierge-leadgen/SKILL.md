---
name: whatsapp-concierge-leadgen
description: >-
  Templates and payload formatting for generating high-converting WhatsApp
  click-to-chat booking inquiries and concierge lead capture.
---

# WhatsApp Concierge & Lead Generation Skill 📲💬

Use this skill to convert customized website itineraries and hotel inquiries into structured, high-converting WhatsApp booking messages.

---

## 1. Deep Link Architecture
Direct click-to-chat URL format:
```text
https://wa.me/<HOTLINE_NUMBER>?text=<URL_ENCODED_MESSAGE>
```
* The number comes only from `SITE_CONTACT.whatsapp` in `js/data.js`. While it is `null`, every WhatsApp button stays hidden. Never ship a placeholder number: whoever owns that SIM receives the traveller's trip details.

---

## 2. Structured WhatsApp Message Template

### Template: Customized Itinerary Booking Request
```text
🌊 *VISIT COX — TRIP BOOKING INQUIRY*
━━━━━━━━━━━━━━━━━━━━
👤 *Traveler Name:* {travelerName}
👥 *Group Size:* {guestsCount} Persons
📅 *Duration:* {daysCount} Days
🏨 *Preferred Hotel:* {hotelName}
🏍️ *Transport Mode:* {transportMode}
💰 *Estimated Budget:* {totalBudgetBDT} ({totalBudgetUSD})

📍 *Planned Highlights:*
{dayByDaySpotsList}

✨ _I planned this trip on the Visit Cox guide and would like to confirm availability._
━━━━━━━━━━━━━━━━━━━━
```

---

## 3. High-Converting Call-to-Action (CTA) Button Rules
1. Position the WhatsApp CTA directly below the calculated total budget.
2. Label in Bengali: `"WhatsApp-এ বুকিং সহায়তা নিন 💬"` or `"১-ক্লিকে ট্যুর বুক করুন"`
3. No trust badges ("100%", "verified", "instant reply") next to the button: there are no partners yet, and `CODING_STANDARDS.md` bans those words unless literally true and cited.
