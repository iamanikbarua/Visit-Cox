# Visit Cox's Bazar — Travel & Tourism Guide 🌊🏖️

**Official Repository:** [`https://github.com/iamanikbarua/Visit-Cox`](https://github.com/iamanikbarua/Visit-Cox)  
**Live Website:** [`https://iamanikbarua.github.io/Visit-Cox/`](https://iamanikbarua.github.io/Visit-Cox/)

A comprehensive, mobile-first, bilingual (**English & বাংলা**) travel and tourism web portal for **Cox's Bazar, Bangladesh**—the longest unbroken natural sea beach in the world (120 km).

---

## ✨ Core & Advanced Modules

1. **Dual Language Support (`EN` / `বাংলা`)**: Instant switch between English and Bengali across all sections, map markers, itinerary studio controls, hotel cards, transport tables, FAQs, and assistant prompts.
2. **Real-Time Currency Converter (`BDT ৳` / `USD $`)**: Dynamically converts hotel nightly rates, restaurant meal estimates, activity prices, local transport fares, and total itinerary budgets between Bangladeshi Taka (BDT) and US Dollars (USD).
3. **Interactive Tourist Map (`Leaflet.js` + `OpenStreetMap` — No API Key)**:
   - Centered on Cox's Bazar (`21.4272° N, 91.9702° E`).
   - Categorized custom pins & filter buttons for **Hotels** (*Hotel Sea Crown*, *Prime Park Hotel*), **Tourist Spots** (*Himchari National Park*, *Inani Beach*, *Moheshkhali Island*), and **Transport Hubs** (*Kasturi Ghat*, *Dolphin Mor*).
4. **International Custom Itinerary Studio & Visual Pass Builder**:
   - **Multi-Day Trip Configurator (`1–7 Days`, default `5-Day Marine Drive Bike & Island Plan`)**: Customize trip title, traveler/group name, and duration.
   - **Select Directly from Website Content**:
     - **Hotels**: Choose from verified accommodations (*Hotel Sea Crown*, *Prime Park Hotel*, *Hotel Kollol*, *Nisanah Resort*, *White Orchid*) with automatic nightly stay cost calculation.
     - **Day-by-Day Spots to Visit**: Multi-select spots from *Laboni/Sugandha Beach*, *Himchari National Park*, *Inani Coral Beach*, *Moheshkhali Island*, *Radiant Fish World*, *100 Feet Buddha (Ramu)*, *Sonadia Island*, *Shamlapur Sunset Point*, *Kolatoli Eco Park*, and *Najirartek Dried Fish Hub*.
     - **Activities to Do**: Includes **🏍️ Riding by Bike on Marine Drive Road (80 km Ocean Highway)**, *Open-Top Chander Gari Safari*, *Moheshkhali Speedboat Crossing*, *Himchari Hilltop Trekking*, *Beach Parasailing & Jet Ski*, *Shamlapur Sampan Photography*, and *Sonadia Eco-Camping*.
     - **Where to Eat (Restaurants)**: Choose daily dining at *Poushee Restaurant*, *Jhaubon Restaurant*, *Mermaid Beach Cafe*, *Salt Bistro*, *Prime Park / Sea Crown Rooftop BBQ*, *Sugandha Live Fish Fry Stalls*, and *Handi Restaurant*.
     - **Daily Transport & Travel Cost**: Select *Marine Drive Bike / Scooter Rental*, *Tomtoms (Easybikes)*, *Reserved CNGs*, *Chander Gari Jeeps*, and *Speedboats*.
   - **Visual Itinerary Dossier & 1-Click Export**: Generates a luxury visual pass branded with the creative **Visit Cox** emblem (`assets/images/logo-transparent.png`), downloadable as a **High-Res `.PNG` Image**, **Official `.PDF` Document**, or **Printable Pass**.
5. **Administrator Content Management System (CMS)**:
   - Built-in Admin Login & CRUD Dashboard (`js/admin.js`) to add, edit, update, or delete hotels, sightseeing spots, hidden gems, transport fares, and FAQs.
6. **Floating Travel Assistant Chatbot & Accordion FAQ**:
   - Context-aware bilingual travel assistant widget and interactive FAQ accordion.

---

## 📁 Project Structure

```text
Visit Cox/
├── index.html                   # Main semantic HTML5 layout (Tailwind CSS + Leaflet + html2canvas + jsPDF)
├── css/
│   └── styles.css               # Coastal theme tokens, animations, map pins, tooltips & chatbot transitions
├── js/
│   ├── data.js                  # Verified bilingual dataset (hotels, destinations, hidden gems, transport, FAQs)
│   ├── admin.js                 # Administrator authentication & CRUD CMS dashboard
│   ├── app.js                   # Language/currency state, search, accordion & chatbot controller
│   └── features.js              # Interactive Leaflet Tourist Map + Custom Itinerary Studio & PNG/PDF exporter
├── assets/
│   └── images/                  # Authentic Cox's Bazar photography + transparent logo & favicon
└── README.md                    # Project documentation
```
