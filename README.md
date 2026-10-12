# Visit Cox's Bazar — Travel & Tourism Guide 🌊🏖️

A modern, mobile-first, bilingual (**English & বাংলা**) travel and tourism web portal for **Cox's Bazar, Bangladesh**—the longest unbroken natural sea beach in the world.

## ✨ Key Features

1. **Dual Language Support (`EN` / `বাংলা`)**: Instant switch between English and Bengali across all sections, cards, tables, FAQs, and assistant prompts.
2. **Real-Time Currency Converter (`BDT ৳` / `USD $`)**: Dynamically converts hotel nightly rates and local transport fares between Bangladeshi Taka (BDT) and US Dollars (USD).
3. **Sticky Glassmorphic Navbar**: Quick jump links to Home, Hotels, Destinations, Transport, Essential Info, and FAQ.
4. **6 Comprehensive Sections**:
   - **Hero & Quick Search**: Video/coastal hero background with live search and category filtering.
   - **Accommodations Grid**: Curated hotel cards (*Hotel Sea Crown, Prime Park Hotel, Hotel Kollol, Nisanah Resort, White Orchid*) with location filters, ratings, amenities, and dynamic pricing.
   - **Destinations & Hidden Gems**: Sightseeing cards (*Himchari, Inani Beach, Moheshkhali Island, Radiant Fish World, 100 Feet Buddha in Ramu*) plus a dedicated **Hidden Gems** showcase (*Sonadia Island, Shamlapur Sunset Point, Kolatoli Eco Park, Najirartek Dried Fish Hub*).
   - **Transportation & Pricing Table**: Local fare matrix with foreigner-friendly glossary & interactive tooltips explaining *Tomtoms (Easybikes)*, *Chander Gari (Open Jeeps)*, *CNG Auto-Rickshaws*, and *Speedboats*.
   - **Essential Travel Info**: Seasonal weather guide, cultural etiquette & dress codes, and 24/7 click-to-call emergency numbers (Tourist Police, 999, District Sadar Hospital, Lifeguards).
   - **Interactive Chatbot & FAQ Accordion**: Floating **Cox's Bazar Travel Assistant** widget (ready for AI backend integration) and an expandable FAQ accordion.

## 📁 Project Structure

```text
Visit Cox/
├── index.html        # Main semantic HTML5 layout (Tailwind CSS + Google Fonts)
├── css/
│   └── styles.css    # Coastal theme tokens, animations, tooltips, accordion & chatbot transitions
├── js/
│   ├── data.js       # Modular bilingual dataset (CMS / REST API ready)
│   └── app.js        # State management, currency converter, search, accordion & chatbot logic
└── README.md         # Project documentation
```

## 🔌 Connecting an AI Backend or CMS Later

- **CMS / Database**: Hydrate or fetch the arrays in `js/data.js` (`HOTELS_DATA`, `DESTINATIONS_DATA`, `HIDDEN_GEMS_DATA`, `TRANSPORT_DATA`, `FAQ_DATA`) from your REST or GraphQL endpoint.
- **AI Chatbot Backend**: Update `fetchTravelAssistantReply(userText)` inside `js/app.js` to send a `POST` request to your LLM endpoint.
