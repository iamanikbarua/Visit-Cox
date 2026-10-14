/**
 * 03-BACKEND-DEVELOPER: Planner Master Catalog & Schemas
 * Comprehensive datasets for Hotels, Dining, Activities, and Anti-Scam Transit Fares
 */

const PLANNER_CATALOG = {
  // 1. HOTELS BY TIER & HUB
  hotels: [
    {
      id: "sayeman",
      name: "Sayeman Beach Resort",
      tier: "luxury",
      hub: "kolatoli",
      stars: 5,
      rateBDT: 12500,
      location: "Marine Drive, Kolatoli Beach",
      why: "Premier beachfront 5-star with infinity pool overlooking the Bay of Bengal and private lounge.",
      amenities: ["Ocean View Balcony", "Infinity Pool", "Buffet Breakfast", "Private Beach Access"]
    },
    {
      id: "royal_tulip",
      name: "Royal Tulip Sea Pearl Beach Resort",
      tier: "luxury",
      hub: "inani",
      stars: 5,
      rateBDT: 14500,
      location: "Jaliapalong, Inani Beach",
      why: "Massive ultra-luxury beachfront escape with private water park, 5 specialty restaurants, and secluded coral sands.",
      amenities: ["Water Park", "Private Beach", "Spa & Wellness", "Kids Zone"]
    },
    {
      id: "mermaid_beach",
      name: "Mermaid Beach Resort",
      tier: "luxury",
      hub: "inani",
      stars: 5,
      rateBDT: 13000,
      location: "Pechardwip, Marine Drive",
      why: "Iconic organic boutique beach villas nestled directly where lush hills meet pristine waves.",
      amenities: ["Private Beach Villas", "Artisanal Organic Dining", "Kayaking", "Sunset Lounge"]
    },
    {
      id: "sea_crown",
      name: "Hotel Sea Crown",
      tier: "comfort",
      hub: "kolatoli",
      stars: 3,
      rateBDT: 3500,
      location: "Kolatoli Beach Front",
      why: "Best-value true seafront hotel. Step right out onto the sands without crossing roads.",
      amenities: ["Direct Beachfront", "Sea View AC Rooms", "Beachside Cafe", "24/7 Security"]
    },
    {
      id: "prime_park",
      name: "Hotel Prime Park",
      tier: "comfort",
      hub: "kolatoli",
      stars: 3,
      rateBDT: 3200,
      location: "Kolatoli Central",
      why: "Highly rated modern comfort hotel with spotless AC deluxe suites and excellent service.",
      amenities: ["AC Deluxe Suites", "Rooftop Restaurant", "Free High-Speed WiFi"]
    },
    {
      id: "ocean_paradise",
      name: "The Ocean Paradise Hotel & Resort",
      tier: "comfort",
      hub: "kolatoli",
      stars: 4,
      rateBDT: 5500,
      location: "Main Road, Kolatoli",
      why: "Renowned 4-star hospitality with swimming pool, multiple banquet halls, and panoramic views.",
      amenities: ["Swimming Pool", "Rooftop BBQ", "Gym & Spa"]
    },
    {
      id: "mermaid_eco",
      name: "Mermaid Eco Resort",
      tier: "comfort",
      hub: "inani",
      stars: 3,
      rateBDT: 4800,
      location: "Pechardwip, Marine Drive",
      why: "Tranquil bamboo bungalows surrounded by canals, lotus ponds, and organic gardens.",
      amenities: ["Eco Bamboo Cottages", "Canal Boat Rides", "Organic Farm Food"]
    },
    {
      id: "kolatoli_guesthouse",
      name: "Hotel Coastal Peace / Blue Ocean",
      tier: "backpacker",
      hub: "kolatoli",
      stars: 2,
      rateBDT: 1500,
      location: "Kolatoli Dolphin Mor 2nd Line",
      why: "Clean, reliable budget AC guest house within 4 minutes walking distance to the sea.",
      amenities: ["Clean Attached Bath", "AC Available", "24hr Power Backup"]
    },
    {
      id: "laboni_guest",
      name: "Hotel Laboni Vista",
      tier: "backpacker",
      hub: "laboni",
      stars: 2,
      rateBDT: 1400,
      location: "Old Laboni Point Road",
      why: "Affordable base right next to the historic beach and Rakhine weaving shops.",
      amenities: ["Attached Bath", "Walking Distance to Beach & Markets"]
    }
  ],

  // 2. DINING STYLES & OPTIONS
  dining: [
    {
      id: "poushee_feast",
      name: "Poushee Restaurant & Jhaubon",
      tier: "comfort",
      costPerPerson: 800,
      cuisine: "Authentic Bengali & Seafood",
      location: "Hotel Motel Zone & Kolatoli",
      why: "Legendary 12-item shutki and vegetable bhorta platter, fresh crispy Loitta fry, and Coral fish curry.",
      highlights: ["Loitta Fry", "Chitol Macher Muitha", "12 Bhorta Platter"]
    },
    {
      id: "sugandha_bbq",
      name: "Sugandha Live Fish Night BBQ",
      tier: "comfort",
      costPerPerson: 900,
      cuisine: "Live Charcoal Grilled Fish",
      location: "Sugandha Beach Point",
      why: "Pick your own live fresh catch (Rupchanda, Koral, Crab, Tiger Prawn) grilled on open charcoal embers.",
      highlights: ["Charcoal Rupchanda", "Spicy Crab Fry", "Garlic Butter Squid"]
    },
    {
      id: "mermaid_cafe",
      name: "Mermaid Beach Cafe & Tarboosh",
      tier: "luxury",
      costPerPerson: 2200,
      cuisine: "Gourmet Oceanfront & Artisanal Italian",
      location: "Marine Drive & Pechardwip",
      why: "Romantic sea-breeze dining with wood-fired sourdough pizza, grilled whole lobster, and fresh tender coconuts.",
      highlights: ["Wood-fired Seafood Pizza", "Grilled Sea Lobster", "Sunset Cocktails"]
    },
    {
      id: "local_bhorta_dhaba",
      name: "Niribili & Central Rice Stalls",
      tier: "backpacker",
      costPerPerson: 450,
      cuisine: "Everyday Traditional Bengali",
      location: "Dolphin Mor & Main Road",
      why: "Delicious steaming hot rice with dal, shutki bhorta, and local fish curry at rock-bottom local prices.",
      highlights: ["Shutki Bhorta", "Machher Jhol", "Dal & Rice"]
    }
  ],

  // 3. MASTER ACTIVITIES & THRILLS CATALOG
  activities: [
    {
      id: "marine_drive",
      name: "Scenic Marine Drive 80km Open Safari",
      costPerPerson: 400,
      fixedCostGroup: 1800, // per CNG or Chander Gari share
      duration: "Half Day",
      vibe: ["relaxing", "adventure", "romantic"],
      desc: "World's longest marine drive with endless ocean surf on one side and green jungle hills on the other."
    },
    {
      id: "inani_coral",
      name: "Inani Coral Beach & Sea Glass Exploration",
      costPerPerson: 0,
      duration: "2-3 Hours",
      vibe: ["relaxing", "romantic", "family"],
      desc: "Walk among ancient golden-black coral stones exposed at low tide, free from coastal noise."
    },
    {
      id: "parasailing",
      name: "Beachfront Ocean Parasailing",
      costPerPerson: 1500,
      duration: "1 Hour (Flight 5-7 min)",
      vibe: ["adventure"],
      desc: "Soar 300 feet above the Bay of Bengal with certified safety harnesses and tandem flights."
    },
    {
      id: "jetski",
      name: "Jet Ski Wave Bashing (10 Min Ride)",
      costPerPerson: 1000,
      duration: "15 min",
      vibe: ["adventure"],
      desc: "Power through sea swells at high speed with an experienced safety instructor."
    },
    {
      id: "moheshkhali",
      name: "Moheshkhali Island Speedboat & Adinath Temple",
      costPerPerson: 400,
      duration: "Half Day",
      vibe: ["culture", "adventure", "family"],
      desc: "Thrilling speedboat sea-crossing from 6-No. Ghat, exploring the ancient hilltop Hindu shrine and Buddhist pagodas."
    },
    {
      id: "fish_world",
      name: "Radiant Fish World Marine Aquarium",
      costPerPerson: 350,
      duration: "2 Hours",
      vibe: ["family", "culture"],
      desc: "Bangladesh's first international marine aquarium tunnel with 100+ species of aquatic creatures."
    },
    {
      id: "himchari_hill",
      name: "Himchari National Park Viewpoint & Waterfall",
      costPerPerson: 50,
      duration: "2 Hours",
      vibe: ["relaxing", "family", "adventure"],
      desc: "Climb the hilltop stairs for an aerial panorama of the infinite coastline and visit the seasonal cascades."
    },
    {
      id: "night_bbq",
      name: "Sugandha Live Fish BBQ Dinner Feast",
      costPerPerson: 800,
      duration: "Evening",
      vibe: ["foodie", "relaxing", "romantic"],
      desc: "Tasting freshly caught red snapper, pomfret, and giant prawns grilled under beach lights."
    }
  ],

  // 4. TRANSIT FARE MATRICES (ANTI-SCAM VERIFIED)
  transitFares: [
    {
      route: "Town Central ➔ Inani Beach",
      vehicle: "CNG Reserve",
      fairFareBDT: "৳৫০০ – ৳৬০০",
      scamAlert: "Scammers ask ৳১,০০০+. Stand firm on ৳৫০০-৳৬০০."
    },
    {
      route: "Town Central ➔ Himchari",
      vehicle: "CNG Reserve",
      fairFareBDT: "৳৩০০ – ৳৩৫০",
      scamAlert: "Shared Tomtom is only ৳৪০-৳৫০ per seat."
    },
    {
      route: "Kolatoli ➔ 6-No. Ghat (Moheshkhali Ferry)",
      vehicle: "Tomtom Reserve",
      fairFareBDT: "৳৮০ – ৳১০০",
      scamAlert: "Shared Tomtom is ৳২০ per person."
    },
    {
      route: "6-No. Ghat ➔ Moheshkhali",
      vehicle: "Speedboat (Per Seat)",
      fairFareBDT: "৳১০০ – ৳১২০",
      scamAlert: "Govt fixed rate with life jacket included."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PLANNER_CATALOG };
}
