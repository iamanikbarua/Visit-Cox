# Visit Cox — Multi-Agent System Guidelines & Project Rules 🌊

Welcome to the **Visit Cox** project repository. All autonomous agents operating in this workspace must adhere to the rules and skills documented below.

---

## 🎯 Project Mission
Transforming Cox's Bazar tourism by providing:
1. **Accurate Budget Calculation:** Giving first-time travelers a complete, realistic estimate for stay, dining, transport, and activities based on group size and duration.
2. **Fair-Fare Anti-Scam Protection:** Documenting verified hub-to-hub fares for Tomtom, CNG, Chander Gari, and Marine Drive bike rentals.
3. **Hidden Gems Discovery:** Guiding travelers to explore the "Real Cox" (Inani, Himchari, Marine Drive, Moheshkhali, Sonadia, Ramu) beyond crowded main beaches.
4. **1-Click WhatsApp Booking:** Enabling seamless booking conversions and monetization through verified hotel and tour partnerships.

---

## 🛠️ Installed Workspace Skills (`.agents/skills/`)

| Skill Identifier | Scope | Purpose |
| :--- | :--- | :--- |
| `trip-budget-calculator` | Travel Costs | Dynamic budget algorithm, hotel tiers, dining estimates, seasonal multipliers |
| `fair-transit-fare-engine` | Transport | Official fare matrices, distance tables, anti-scam rules |
| `whatsapp-concierge-leadgen` | Sales & CRO | WhatsApp click-to-chat links, pre-formatted itinerary messages |
| `travel-seo-and-schema` | Search Visibility | Schema.org JSON-LD (TouristAttraction, Hotel, FAQ), bilingual metadata |
| `visual-itinerary-pass-exporter` | Client Tech | High-res html2canvas and jsPDF export, Bengali font preservation |
| `multi-agent-team-workflow` | Operations | 6-agent collaboration, peer review, error-correction loop |

---

## 👥 The 6 Agent Workspaces
* `01-uiux-designer/` — UI mockups, design tokens, UX flows
* `02-frontend-developer/` — Interactive components, JS calculation engines
* `03-backend-developer/` — Booking data schemas, payment gateway specs
* `04-qa-engineer/` — Test checklists, currency validation, QA reports
* `05-seo-specialist/` — Schema templates, bilingual keyword dictionaries
* `06-marketing-manager/` — Conversion copywriting, launch campaign funnels

---

## 🔒 Verification & Git Rule
* Agents must stage new features inside their respective folders.
* All code must pass QA testing before requesting merge.
* Only the Main Agent signs off on final code merges and Git commits.
