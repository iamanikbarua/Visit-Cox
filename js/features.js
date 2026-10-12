/**
 * ============================================================================
 * Visit Cox's Bazar - Advanced Interactive Modules (features.js)
 * ============================================================================
 * Module 1: Interactive Tourist Map (Leaflet.js + OpenStreetMap, No API Key)
 *   - Centered on Cox's Bazar (lat: 21.4272, lng: 91.9702)
 *   - Categorized custom markers:
 *       • Hotels: Hotel Sea Crown, Prime Park Hotel
 *       • Tourist Spots: Himchari National Park, Inani Beach, Moheshkhali Island
 *       • Transport Hubs: Kasturi Ghat, Dolphin Mor
 *   - Interactive popup cards + live category filter buttons
 *
 * Module 2: International-Standard Custom Itinerary Studio & Visual Pass Builder
 *   - Interactive multi-day planner (1–7 Days, default 5-Day Cox's Bazar plan)
 *   - Directly connected to website content:
 *       • Hotel selector (from HOTELS_DATA)
 *       • Daily Spots selector (from DESTINATIONS_DATA + HIDDEN_GEMS_DATA)
 *       • Daily Restaurant / Where to Eat selector
 *       • Daily Activities selector (including Riding by Bike on Marine Drive Road)
 *       • Daily Transport & Travel Cost selector (from TRANSPORT_DATA + Bike rental)
 *   - Generates an international-standard Visual Itinerary Dossier branded with
 *     the creative Visit Cox logo sign (`assets/images/logo-transparent.png`)
 *   - Supports 1-Click High-Res PNG Poster Download, PDF Document Download, & Print
 */

/* --------------------------------------------------------------------------
 * 1. MAP LOCATIONS DATASET (Categorized Coordinates & Bilingual Details)
 * -------------------------------------------------------------------------- */
const COXS_BAZAR_CENTER = { lat: 21.4272, lng: 91.9702, zoom: 11 };

const MAP_LOCATIONS = [
  // HOTELS
  {
    id: 'map-hotel-sea-crown',
    category: 'hotels',
    lat: 21.4159,
    lng: 91.9818,
    name: {
      en: 'Hotel Sea Crown',
      bn: 'হোটেল সী ক্রাউন (Hotel Sea Crown)'
    },
    categoryLabel: {
      en: 'Hotel • Sugandha Beach',
      bn: 'হোটেল • সুগন্ধা বিচ'
    },
    description: {
      en: '3-star beachfront hotel on Marine Drive, Kola Toli New Beach with direct beach access and complimentary breakfast.',
      bn: 'মেরিন ড্রাইভের কলাতলী নিউ বিচে অবস্থিত ৩-তারকা সৈকত সংলগ্ন হোটেল।'
    },
    image: 'assets/images/hotel-sea-crown.jpg',
    targetSection: '#hotels'
  },
  {
    id: 'map-prime-park-hotel',
    category: 'hotels',
    lat: 21.4184,
    lng: 91.9796,
    name: {
      en: 'Prime Park Hotel',
      bn: 'প্রাইম পার্ক হোটেল (Prime Park Hotel)'
    },
    categoryLabel: {
      en: 'Hotel • Kalatali Road',
      bn: 'হোটেল • কলাতলী রোড'
    },
    description: {
      en: 'Located at Plot 58, Block C, Hotel Motel Zone near Kalatali Beach, featuring a panoramic rooftop restaurant and hill views.',
      bn: 'কলাতলী হোটেল মোটেল জোনে অবস্থিত রুফটপ রেস্টুরেন্ট ও পাহাড় ভিউ সমৃদ্ধ হোটেল।'
    },
    image: 'assets/images/prime-park-hotel.jpg',
    targetSection: '#hotels'
  },

  // TOURIST SPOTS
  {
    id: 'map-himchari',
    category: 'spots',
    lat: 21.3556,
    lng: 92.0247,
    name: {
      en: 'Himchari National Park',
      bn: 'হিমছড়ি জাতীয় উদ্যান'
    },
    categoryLabel: {
      en: 'Tourist Spot • 18 km South',
      bn: 'দর্শনীয় স্থান • ১৮ কিমি দক্ষিণে'
    },
    description: {
      en: 'Coastal hills meeting the Bay of Bengal along Marine Drive. Famous for natural waterfalls and dramatic cliff viewpoints.',
      bn: 'মেরিন ড্রাইভের পাশে সবুজ পাহাড়, প্রাকৃতিক ঝর্ণা ও সমুদ্রের অপরূপ মিলনস্থল।'
    },
    image: 'assets/images/himchari.jpg',
    targetSection: '#destinations'
  },
  {
    id: 'map-inani-beach',
    category: 'spots',
    lat: 21.2291,
    lng: 92.0475,
    name: {
      en: 'Inani Beach',
      bn: 'ইনানী সমুদ্র সৈকত'
    },
    categoryLabel: {
      en: 'Tourist Spot • 32 km South',
      bn: 'দর্শনীয় স্থান • ৩২ কিমি দক্ষিণে'
    },
    description: {
      en: 'Quiet, rocky coral-boulder beach with crystal clear water and calm tidal pools in Ukhia along Marine Drive.',
      bn: 'স্বচ্ছ নীল জলরাশি ও প্রবাল পাথরের জন্য বিখ্যাত শান্ত সমুদ্র সৈকত।'
    },
    image: 'assets/images/inani-beach.jpg',
    targetSection: '#destinations'
  },
  {
    id: 'map-moheshkhali',
    category: 'spots',
    lat: 21.5333,
    lng: 91.9500,
    name: {
      en: 'Moheshkhali Island',
      bn: 'মহেশখালী দ্বীপ'
    },
    categoryLabel: {
      en: 'Tourist Spot • Hilly Island',
      bn: 'দর্শনীয় স্থান • পাহাড়ি দ্বীপ'
    },
    description: {
      en: "Bangladesh's only mountainous island—home to the historic Adinath Shiva Temple on Mainak Hill, Buddhist pagodas, and salt pans.",
      bn: 'মৈনাক পাহাড়ের চূড়ায় ঐতিহাসিক আদিনাথ মন্দির, বৌদ্ধ প্যাগোডা ও লবণের মাঠের জন্য বিখ্যাত দ্বীপ।'
    },
    image: 'assets/images/moheshkhali.jpg',
    targetSection: '#destinations'
  },

  // TRANSPORT HUBS
  {
    id: 'map-kasturi-ghat',
    category: 'hubs',
    lat: 21.4526,
    lng: 91.9685,
    name: {
      en: 'Kasturi Ghat',
      bn: 'কস্তুরাঘাট (স্পিডবোট ঘাট)'
    },
    categoryLabel: {
      en: 'Transport Hub • River Jetty',
      bn: 'যাতায়াত কেন্দ্র • নদী ঘাট'
    },
    description: {
      en: 'Primary river jetty on the Bakkhali estuary for 35-minute speedboats and wooden trawlers crossing to Moheshkhali Island.',
      bn: 'মহেশখালী দ্বীপে ৩৫ মিনিটে স্পিডবোট ও ট্রলারে পারাপারের প্রধান নদী ঘাট।'
    },
    image: 'assets/images/moheshkhali.jpg',
    targetSection: '#transport'
  },
  {
    id: 'map-dolphin-mor',
    category: 'hubs',
    lat: 21.4172,
    lng: 91.9835,
    name: {
      en: 'Dolphin Mor (Kolatoli Circle)',
      bn: 'ডলফিন মোড় (কলাতলী সার্কেল)'
    },
    categoryLabel: {
      en: 'Transport Hub • Main Gateway',
      bn: 'যাতায়াত কেন্দ্র • প্রধান প্রবেশদ্বার'
    },
    description: {
      en: "Central transit roundabout where intercity buses arrive and local Tomtoms, CNGs, and Marine Drive Chander Gari jeeps depart.",
      bn: 'কক্সবাজারের প্রধান যাতায়াত মোড়—এখান থেকেই টমটম, সিএনজি এবং মেরিন ড্রাইভের চান্দের গাড়ি পাওয়া যায়।'
    },
    image: 'assets/images/kolatoli-eco.jpg',
    targetSection: '#transport'
  }
];

/* --------------------------------------------------------------------------
 * 2. CURATED CATALOGS FOR INTERACTIVE ITINERARY STUDIO
 *    (Restaurants, Signature Activities, Transport & Website Spots)
 * -------------------------------------------------------------------------- */
const ITIN_RESTAURANTS_CATALOG = [
  {
    id: 'rest-poushee',
    name: { en: 'Poushee Restaurant (Jhautola)', bn: 'পৌষী রেস্তোরাঁ (ঝাউতলা)' },
    specialty: {
      en: 'Iconic local Mezbani beef, Loitta fish fry & 25+ coastal bhartas',
      bn: 'ঐতিহ্যবাহী মেজবানি গোশত, লইট্টা ফ্রাই ও ২৫+ পদের ভর্তা'
    },
    avgCostBDT: 450,
    icon: '🍛'
  },
  {
    id: 'rest-jhaubon',
    name: { en: 'Jhaubon Restaurant (Sugandha Point)', bn: 'ঝাউবন রেস্তোরাঁ (সুগন্ধা পয়েন্ট)' },
    specialty: {
      en: 'Fresh grilled Rupchanda, coral fish curry & Bengali seafood thali',
      bn: 'তাজা রূপচাঁদা গ্রিল, কোরাল মাছের কারি ও বাঙালি সি-ফুড থালি'
    },
    avgCostBDT: 550,
    icon: '🐟'
  },
  {
    id: 'rest-mermaid',
    name: { en: 'Mermaid Beach Cafe (Marine Drive)', bn: 'মারমেইড বিচ ক্যাফে (মেরিন ড্রাইভ)' },
    specialty: {
      en: 'International beachfront dining, wood-fired seafood platter & mocktails',
      bn: 'আন্তর্জাতিক মানের সৈকত সংলগ্ন সি-ফুড প্ল্যাটার ও ক্যান্ডেললাইট ডিনার'
    },
    avgCostBDT: 1400,
    icon: '🦞'
  },
  {
    id: 'rest-salt-bistro',
    name: { en: 'Salt Bistro & Ocean Cafe (Kolatoli)', bn: 'সল্ট বিস্ট্রো অ্যান্ড ওশান ক্যাফে' },
    specialty: {
      en: 'Artisan coffee, continental brunch, pasta & ocean-view desserts',
      bn: 'আর্টিজান কফি, কন্টিনেন্টাল ব্রাঞ্চ ও ওশান-ভিউ ডেজার্ট'
    },
    avgCostBDT: 850,
    icon: '☕'
  },
  {
    id: 'rest-rooftop-grill',
    name: { en: 'Prime Park / Sea Crown Rooftop Dining', bn: 'প্রাইম পার্ক / সী ক্রাউন রুফটপ ডাইনিং' },
    specialty: {
      en: 'Panoramic sunset BBQ buffet, jumbo tiger prawns & hills-and-sea view',
      bn: 'প্যানোরামিক সানসেট বারবিকিউ, গলদা চিংড়ি ও পাহাড়-সমুদ্র ভিউ'
    },
    avgCostBDT: 1100,
    icon: '🌅'
  },
  {
    id: 'rest-sugandha-fry',
    name: { en: 'Sugandha Live Beach Fish Fry Stalls', bn: 'সুগন্ধা সৈকত লাইভ ফিশ ফ্রাই মার্কেট' },
    specialty: {
      en: 'Evening open-air live fried crab, squid, tuna & red snapper by the waves',
      bn: 'সৈকতের পাড়ে গরম গরম কাঁকড়া, অক্টোপাস, টুনা ও কোরাল ফ্রাই'
    },
    avgCostBDT: 600,
    icon: '🦀'
  },
  {
    id: 'rest-handi',
    name: { en: 'Handi Restaurant (Kalatali Circle)', bn: 'হান্ডি রেস্তোরাঁ (কলাতলী মোড়)' },
    specialty: {
      en: 'Authentic Hyderabadi dum biryani, tandoori platters & local curries',
      bn: 'হায়দ্রাবাদি দম বিরিয়ানি, তান্দুরি প্ল্যাটার ও দেশি কারি'
    },
    avgCostBDT: 650,
    icon: '🍲'
  }
];

const ITIN_ACTIVITIES_CATALOG = [
  {
    id: 'act-marine-drive-bike',
    name: {
      en: 'Riding by Bike on Marine Drive Road (80 km Ocean Highway)',
      bn: 'মেরিন ড্রাইভ রোডে বাইক রাইডিং (৮০ কিমি সমুদ্র-পাহাড় সড়ক)'
    },
    badge: { en: 'Signature Experience', bn: 'সেরা অ্যাডভেঞ্চার' },
    costBDT: 1500,
    icon: '🏍️'
  },
  {
    id: 'act-chander-gari-safari',
    name: {
      en: 'Open-Top Chander Gari (Jeep) Coastal Safari to Inani',
      bn: 'খোলা ছাদের চান্দের গাড়িতে ইনানী ও মেরিন ড্রাইভ সাফারি'
    },
    badge: { en: 'Group Favorite', bn: 'গ্রুপ রাইড' },
    costBDT: 1750,
    icon: '🚙'
  },
  {
    id: 'act-moheshkhali-speedboat',
    name: {
      en: 'Speedboat Crossing across Bakkhali Estuary to Moheshkhali',
      bn: 'কস্তুরাঘাট থেকে স্পিডবোটে বাঁকখালী নদী ও মহেশখালী চ্যানেল পাড়ি'
    },
    badge: { en: 'Island Hopping', bn: 'দ্বীপ ভ্রমণ' },
    costBDT: 200,
    icon: '🚤'
  },
  {
    id: 'act-himchari-trek',
    name: {
      en: 'Himchari Hilltop Climb & Coastal Waterfall Trekking',
      bn: 'হিমছড়ি পাহাড়ের চূড়ায় ট্রেকিং ও প্রাকৃতিক ঝর্ণা দর্শন'
    },
    badge: { en: 'Nature & Views', bn: 'পাহাড় ও ঝর্ণা' },
    costBDT: 120,
    icon: '🥾'
  },
  {
    id: 'act-parasailing-jetski',
    name: {
      en: 'Beach Parasailing, Jet Ski & ATV Quad Bike at Sugandha',
      bn: 'সুগন্ধা ও দরিয়ানগরে প্যারাসেইলিং, জেট স্কি ও বিচ বাইক'
    },
    badge: { en: 'Water Sports', bn: 'ওয়াটার স্পোর্টস' },
    costBDT: 1500,
    icon: '🪂'
  },
  {
    id: 'act-shamlapur-sunset',
    name: {
      en: 'Moon Boat (Sampan) & Golden Sunset Photography at Shamlapur',
      bn: 'শামলাপুর বাহারছড়া সৈকতে ঐতিহ্যবাহী সাম্পান নৌকা ও সূর্যাস্ত ফটোগ্রাফি'
    },
    badge: { en: 'Photography', bn: 'ফটোগ্রাফি' },
    costBDT: 0,
    icon: '📸'
  },
  {
    id: 'act-sonadia-camping',
    name: {
      en: 'Eco-Beach Walk, Red Crab Spotting & Bonfire at Sonadia Island',
      bn: 'সোনাদিয়া দ্বীপে লাল কাঁকড়া দর্শন, ঝাউবন হাঁটা ও বিচ ক্যাম্পিং'
    },
    badge: { en: 'Offbeat Eco', bn: 'ইকো ক্যাম্পিং' },
    costBDT: 900,
    icon: '⛺'
  },
  {
    id: 'act-aquarium-walk',
    name: {
      en: 'Underwater Glass Tunnel Walk at Radiant Fish World',
      bn: 'রেডিয়েন্ট ফিশ ওয়ার্ল্ডের আন্ডারওয়াটার গ্লাস টানেল ভ্রমণ'
    },
    badge: { en: 'Family Activity', bn: 'পরিবার বান্ধব' },
    costBDT: 300,
    icon: '🐠'
  },
  {
    id: 'act-burmese-market',
    name: {
      en: 'Evening Burmese Market Handicrafts, Pearls & Pickle Shopping',
      bn: 'সন্ধ্যায় বার্মিজ মার্কেটে মুক্তার গহনা, আচার ও হস্তশিল্প কেনাকাটা'
    },
    badge: { en: 'Local Culture', bn: 'কেনাকাটা' },
    costBDT: 500,
    icon: '🛍️'
  }
];

const ITIN_TRANSPORT_ADDONS = [
  {
    id: 'trans-bike-rental',
    name: {
      en: 'Marine Drive Bike / Scooter Rental (Full Day + Fuel)',
      bn: 'মেরিন ড্রাইভ বাইক / স্কুটার ভাড়া (সারাদিন + জ্বালানি)'
    },
    costBDT: 1500,
    duration: { en: 'Full Day Freedom', bn: 'সারাদিন' },
    icon: '🏍️'
  },
  {
    id: 'trans-tomtom-hops',
    name: {
      en: 'Tomtom (Easybike) — Town / Laboni / Sugandha / Kalatali Hops',
      bn: 'টমটম (ইজিবাইক) — শহর, লাবণী, সুগন্ধা ও কলাতলী যাতায়াত'
    },
    costBDT: 60,
    duration: { en: '5–10 mins per hop', bn: '৫–১০ মিনিট' },
    icon: '🛺'
  },
  {
    id: 'trans-cng-himchari',
    name: {
      en: 'Reserved CNG Auto-Rickshaw — Town to Himchari Marine Drive',
      bn: 'রিজার্ভ সিএনজি — শহর থেকে হিমছড়ি মেরিন ড্রাইভ'
    },
    costBDT: 350,
    duration: { en: '30 mins each way', bn: '৩০ মিনিট' },
    icon: '🚕'
  },
  {
    id: 'trans-jeep-inani',
    name: {
      en: 'Reserved Chander Gari (Open Jeep) — Marine Drive to Inani & Shamlapur',
      bn: 'রিজার্ভ চান্দের গাড়ি (খোলা জিপ) — মেরিন ড্রাইভ হয়ে ইনানী ও শামলাপুর'
    },
    costBDT: 1800,
    duration: { en: 'Half / Full Day', bn: 'অর্ধ / সারাদিন' },
    icon: '🚙'
  },
  {
    id: 'trans-speedboat-moheshkhali',
    name: {
      en: 'Speedboat Roundtrip — Kasturi Ghat to Moheshkhali Island',
      bn: 'স্পিডবোট (যাওয়া-আসা) — কস্তুরাঘাট থেকে মহেশখালী দ্বীপ'
    },
    costBDT: 180,
    duration: { en: '35 mins crossing', bn: '৩৫ মিনিট নদীপথ' },
    icon: '🚤'
  },
  {
    id: 'trans-cng-ramu',
    name: {
      en: 'Reserved CNG Auto-Rickshaw — Cox’s Bazar Town to Ramu Temple',
      bn: 'রিজার্ভ সিএনজি — কক্সবাজার শহর থেকে রামু বৌদ্ধ বিহার'
    },
    costBDT: 450,
    duration: { en: '40 mins', bn: '৪০ মিনিট' },
    icon: '🛺'
  }
];

// Additional Iconic Beach Spots so users can pick Laboni/Sugandha + all website destinations/gems
const EXTRA_BEACH_SPOTS = [
  {
    id: 'spot-laboni-sugandha',
    name: {
      en: 'Laboni & Sugandha Main Sea Beach',
      bn: 'লাবণী ও সুগন্ধা প্রধান সমুদ্র সৈকত'
    },
    area: { en: 'Main Beachfront', bn: 'প্রধান সৈকত' },
    image: 'assets/images/hero-coxs-bazar.jpg'
  }
];

function getUnifiedWebsiteSpots() {
  const spots = [...EXTRA_BEACH_SPOTS];

  if (typeof DESTINATIONS_DATA !== 'undefined') {
    DESTINATIONS_DATA.forEach(d => {
      spots.push({
        id: d.id,
        name: d.name,
        area: d.distanceTag || { en: 'Cox’s Bazar', bn: 'কক্সবাজার' },
        image: d.image || 'assets/images/inani-beach.jpg'
      });
    });
  }

  if (typeof HIDDEN_GEMS_DATA !== 'undefined') {
    HIDDEN_GEMS_DATA.forEach(g => {
      spots.push({
        id: g.id,
        name: g.name,
        area: g.highlight || { en: 'Hidden Gem', bn: 'লুকানো রত্ন' },
        image: g.image || 'assets/images/sonadia-island.jpg'
      });
    });
  }

  return spots;
}

/* --------------------------------------------------------------------------
 * 3. DEFAULT 5-DAY INTERNATIONAL ITINERARY PRESET & STATE
 * -------------------------------------------------------------------------- */
function getDefault5DayPlan() {
  return [
    {
      dayNumber: 1,
      title: {
        en: 'Beachfront Arrival, Sugandha Sunset & Radiant Fish World',
        bn: 'সৈকতে আগমন, সুগন্ধা সূর্যাস্ত ও রেডিয়েন্ট ফিশ ওয়ার্ল্ড'
      },
      spots: ['spot-laboni-sugandha', 'spot-radiant-fish-world'],
      activities: ['act-aquarium-walk', 'act-burmese-market'],
      restaurants: ['rest-poushee', 'rest-sugandha-fry'],
      transports: ['trans-tomtom-hops'],
      customNote: {
        en: 'Check in at hotel, enjoy Mezbani lunch at Poushee, watch sunset at Sugandha Point & explore evening live fish fry stalls.',
        bn: 'হোটেলে চেক-ইন, পৌষী রেস্তোরাঁয় মেজবানি লাঞ্চ, সুগন্ধা সৈকতে সূর্যাস্ত ও সন্ধ্যায় লাইভ ফিশ ফ্রাই উপভোগ।'
      }
    },
    {
      dayNumber: 2,
      title: {
        en: 'Riding by Bike on Marine Drive Road to Himchari & Inani Coral Beach',
        bn: 'মেরিন ড্রাইভ রোডে বাইক রাইডিং — হিমছড়ি ঝর্ণা ও ইনানী প্রবাল সৈকত'
      },
      spots: ['spot-himchari', 'spot-inani-beach', 'gem-shamlapur'],
      activities: ['act-marine-drive-bike', 'act-himchari-trek', 'act-shamlapur-sunset'],
      restaurants: ['rest-mermaid', 'rest-salt-bistro'],
      transports: ['trans-bike-rental'],
      customNote: {
        en: 'Start early morning bike ride along the 80 km Marine Drive coastal road! Stop at Himchari cliffs, Inani coral boulders & Shamlapur sunset point.',
        bn: 'সকালে মেরিন ড্রাইভ ধরে বাইক রাইড! হিমছড়ি পাহাড়, ইনানী প্রবাল পাথর এবং শামলাপুর গর্জনে সূর্যাস্ত দর্শন।'
      }
    },
    {
      dayNumber: 3,
      title: {
        en: 'Moheshkhali Island Speedboat Expedition & Adinath Hill Temple',
        bn: 'স্পিডবোটে মহেশখালী দ্বীপ ও মৈনাক পাহাড়ের আদিনাথ মন্দির অভিযান'
      },
      spots: ['spot-moheshkhali', 'gem-najirartek'],
      activities: ['act-moheshkhali-speedboat', 'act-parasailing-jetski'],
      restaurants: ['rest-jhaubon', 'rest-rooftop-grill'],
      transports: ['trans-speedboat-moheshkhali', 'trans-tomtom-hops'],
      customNote: {
        en: 'Board a 35-min speedboat from Kasturi Ghat to Moheshkhali Island. Visit Adinath Temple, Buddhist pagodas, and return for rooftop sunset BBQ.',
        bn: 'কস্তুরাঘাট থেকে ৩৫ মিনিটের স্পিডবোটে মহেশখালী দ্বীপ ভ্রমণ ও রাতে রুফটপ বারবিকিউ ডিনার।'
      }
    },
    {
      dayNumber: 4,
      title: {
        en: 'Sonadia Island Eco-Adventure & Kolatoli Canopy Trekking',
        bn: 'সোনাদিয়া দ্বীপ ইকো-অ্যাডভেঞ্চার ও কলাতলী ইকো পার্ক ট্রেকিং'
      },
      spots: ['gem-sonadia', 'gem-kolatoli-eco'],
      activities: ['act-sonadia-camping', 'act-chander-gari-safari'],
      restaurants: ['rest-handi', 'rest-mermaid'],
      transports: ['trans-jeep-inani'],
      customNote: {
        en: 'Explore untouched pine forests and red crabs on Sonadia Island, followed by an afternoon Chander Gari coastal ride.',
        bn: 'সোনাদিয়া দ্বীপের নির্জন ঝাউবন ও লাল কাঁকড়া দর্শন এবং বিকেলে চান্দের গাড়িতে ভ্রমণ।'
      }
    },
    {
      dayNumber: 5,
      title: {
        en: 'Ramu 100 Feet Golden Buddha Heritage & Souvenir Departure',
        bn: 'রামু ১০০ ফুট সিংহশয্যা বুদ্ধ বিহার দর্শন ও কেনাকাটা শেষে প্রস্থান'
      },
      spots: ['spot-ramu-buddha', 'spot-laboni-sugandha'],
      activities: ['act-burmese-market'],
      restaurants: ['rest-poushee', 'rest-salt-bistro'],
      transports: ['trans-cng-ramu', 'trans-tomtom-hops'],
      customNote: {
        en: 'Morning trip to the 100 Feet Reclining Buddha in Ramu, final beach walk, pack Burmese pickles & dried fish souvenirs.',
        bn: 'সকালে রামুর ১০০ ফুট বুদ্ধ মূর্তি দর্শন, শেষ বিকেলের সমুদ্র স্নান ও বার্মিজ আচার নিয়ে ফিরতি যাত্রা।'
      }
    }
  ];
}

const FeaturesState = {
  mapInstance: null,
  markerLayerGroup: null,
  activeMapFilter: 'all', // 'all' | 'hotels' | 'spots' | 'hubs'

  // Custom Itinerary Studio State
  tripTitle: 'Cox’s Bazar Grand Coastal & Marine Drive Expedition',
  travelerName: 'Explorer Pass',
  travelerCount: 2,
  totalDays: 5,
  activeDayTab: 1,
  selectedHotelId: 'hotel-sea-crown',
  daysPlan: getDefault5DayPlan(),
  isDownloading: false
};

/* --------------------------------------------------------------------------
 * 4. LEAFLET INTERACTIVE MAP INITIALIZATION & FILTERING
 * -------------------------------------------------------------------------- */
function createCategoryMarkerIcon(category) {
  const styles = {
    hotels: {
      bg: '#0284c7',
      svg: `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`
    },
    spots: {
      bg: '#0d9488',
      svg: `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
    },
    hubs: {
      bg: '#d97706',
      svg: `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>`
    }
  }[category] || { bg: '#0284c7', svg: '' };

  return L.divIcon({
    className: 'custom-leaflet-div-icon',
    html: `<div class="custom-map-pin" style="background-color: ${styles.bg};">${styles.svg}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20]
  });
}

function initTouristMap() {
  const mapEl = document.getElementById('coxs-bazar-map');
  if (!mapEl || typeof L === 'undefined') return;

  if (!FeaturesState.mapInstance) {
    FeaturesState.mapInstance = L.map('coxs-bazar-map', {
      scrollWheelZoom: false
    }).setView([COXS_BAZAR_CENTER.lat, COXS_BAZAR_CENTER.lng], COXS_BAZAR_CENTER.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(FeaturesState.mapInstance);

    FeaturesState.markerLayerGroup = L.layerGroup().addTo(FeaturesState.mapInstance);

    setTimeout(() => {
      if (FeaturesState.mapInstance) {
        FeaturesState.mapInstance.invalidateSize();
      }
    }, 250);
  }

  renderMapMarkersAndFilters();
}

function setMapFilter(category) {
  FeaturesState.activeMapFilter = category;
  renderMapMarkersAndFilters();
}

function focusMapLocation(locationId) {
  const loc = MAP_LOCATIONS.find(l => l.id === locationId);
  if (!loc || !FeaturesState.mapInstance) return;

  if (FeaturesState.activeMapFilter !== 'all' && FeaturesState.activeMapFilter !== loc.category) {
    FeaturesState.activeMapFilter = 'all';
    renderMapMarkersAndFilters();
  }

  FeaturesState.mapInstance.flyTo([loc.lat, loc.lng], 14, { duration: 0.9 });

  FeaturesState.markerLayerGroup.eachLayer(layer => {
    if (layer._customLocationId === locationId) {
      layer.openPopup();
    }
  });
}

function renderMapMarkersAndFilters() {
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const filterBar = document.getElementById('map-category-filters');
  const legendList = document.getElementById('map-locations-quicklist');

  const filterLabels = {
    en: [
      { key: 'all', label: 'All Pins (7)', dot: 'bg-sky-400' },
      { key: 'hotels', label: 'Hotels (2)', dot: 'bg-sky-600' },
      { key: 'spots', label: 'Tourist Spots (3)', dot: 'bg-teal-600' },
      { key: 'hubs', label: 'Transport Hubs (2)', dot: 'bg-amber-600' }
    ],
    bn: [
      { key: 'all', label: 'সব লোকেশন (৭)', dot: 'bg-sky-400' },
      { key: 'hotels', label: 'হোটেল (২)', dot: 'bg-sky-600' },
      { key: 'spots', label: 'দর্শনীয় স্থান (৩)', dot: 'bg-teal-600' },
      { key: 'hubs', label: 'যাতায়াত ঘাট ও মোড় (২)', dot: 'bg-amber-600' }
    ]
  }[lang];

  if (filterBar) {
    filterBar.innerHTML = filterLabels
      .map(f => {
        const active = FeaturesState.activeMapFilter === f.key;
        return `
          <button
            type="button"
            onclick="setMapFilter('${f.key}')"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              active
                ? 'bg-ocean-950 text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
            }">
            <span class="w-2.5 h-2.5 rounded-full ${f.dot}"></span>
            <span>${f.label}</span>
          </button>
        `;
      })
      .join('');
  }

  const visibleLocations = MAP_LOCATIONS.filter(
    loc => FeaturesState.activeMapFilter === 'all' || loc.category === FeaturesState.activeMapFilter
  );

  if (legendList) {
    legendList.innerHTML = visibleLocations
      .map(loc => {
        const badgeColor =
          loc.category === 'hotels'
            ? 'bg-sky-100 text-sky-800'
            : loc.category === 'spots'
            ? 'bg-teal-100 text-teal-800'
            : 'bg-amber-100 text-amber-800';

        return `
          <button
            type="button"
            onclick="focusMapLocation('${loc.id}')"
            class="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-sky-50/80 border border-slate-200/90 hover:border-sky-300 transition flex items-start gap-3 shadow-2xs group">
            <img src="${loc.image}" alt="${loc.name[lang]}" class="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-200" />
            <div class="min-w-0 flex-1">
              <span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${badgeColor}">
                ${loc.categoryLabel[lang]}
              </span>
              <h4 class="font-bold text-slate-900 text-sm mt-1 group-hover:text-sky-700 transition truncate">
                ${loc.name[lang]}
              </h4>
              <p class="text-xs text-slate-500 line-clamp-2 mt-0.5">${loc.description[lang]}</p>
            </div>
          </button>
        `;
      })
      .join('');
  }

  if (!FeaturesState.markerLayerGroup || !FeaturesState.mapInstance) return;
  FeaturesState.markerLayerGroup.clearLayers();

  const bounds = [];
  visibleLocations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], {
      icon: createCategoryMarkerIcon(loc.category)
    });
    marker._customLocationId = loc.id;

    const popupHTML = `
      <div class="font-sans">
        <div class="relative h-28 bg-slate-200">
          <img src="${loc.image}" alt="${loc.name[lang]}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          <span class="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-teal-500 text-white text-[10px] font-bold uppercase">
            ${loc.categoryLabel[lang]}
          </span>
        </div>
        <div class="p-3.5">
          <h4 class="font-extrabold text-slate-900 text-sm">${loc.name[lang]}</h4>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${loc.description[lang]}</p>
          <a href="${loc.targetSection}" class="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:underline">
            <span>${lang === 'en' ? 'View in Guide' : 'বিস্তারিত দেখুন'}</span>
            <span>→</span>
          </a>
        </div>
      </div>
    `;

    marker.bindPopup(popupHTML);
    FeaturesState.markerLayerGroup.addLayer(marker);
    bounds.push([loc.lat, loc.lng]);
  });

  if (bounds.length > 1) {
    FeaturesState.mapInstance.fitBounds(bounds, { padding: [45, 45], maxZoom: 13 });
  } else if (bounds.length === 1) {
    FeaturesState.mapInstance.setView(bounds[0], 14);
  }
}

/* --------------------------------------------------------------------------
 * 5. INTERACTIVE ITINERARY STUDIO STATE CONTROLLERS
 * -------------------------------------------------------------------------- */
function formatSinglePrice(bdtAmount) {
  if (typeof formatPriceRange === 'function') {
    if (bdtAmount === 0) {
      return typeof AppState !== 'undefined' && AppState.lang === 'bn' ? 'ফ্রি (০ ৳)' : 'Free';
    }
    return formatPriceRange(bdtAmount, bdtAmount);
  }
  return `${bdtAmount.toLocaleString()} BDT`;
}

function setItineraryTotalDays(daysCount) {
  const count = Math.max(1, Math.min(7, parseInt(daysCount, 10) || 5));
  FeaturesState.totalDays = count;

  const defaults = getDefault5DayPlan();
  while (FeaturesState.daysPlan.length < count) {
    const nextDayNum = FeaturesState.daysPlan.length + 1;
    const template = defaults[(nextDayNum - 1) % defaults.length];
    FeaturesState.daysPlan.push({
      dayNumber: nextDayNum,
      title: {
        en: `Day ${nextDayNum}: Coastal Discovery & Marine Drive Leisure`,
        bn: `দিন ${nextDayNum}: সমুদ্র সৈকত ও মেরিন ড্রাইভ ভ্রমণ`
      },
      spots: [...template.spots],
      activities: [...template.activities],
      restaurants: [...template.restaurants],
      transports: [...template.transports],
      customNote: { ...template.customNote }
    });
  }

  if (FeaturesState.activeDayTab > count) {
    FeaturesState.activeDayTab = count;
  }

  renderItineraryStudio();
}

function setItineraryActiveDayTab(dayNum) {
  FeaturesState.activeDayTab = dayNum;
  renderItineraryStudio();
}

function selectItineraryHotel(hotelId) {
  FeaturesState.selectedHotelId = hotelId;
  renderItineraryStudio();
}

function updateTripMetaField(field, value) {
  if (field === 'tripTitle') {
    FeaturesState.tripTitle = value || 'Cox’s Bazar Coastal Expedition';
  } else if (field === 'travelerName') {
    FeaturesState.travelerName = value || 'Explorer';
  } else if (field === 'travelerCount') {
    FeaturesState.travelerCount = Math.max(1, Math.min(30, parseInt(value, 10) || 2));
  }
  renderVisualItineraryPass();
}

function updateDayCustomField(dayNum, field, value) {
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj) return;
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';

  if (field === 'title') {
    dayObj.title[lang] = value;
  } else if (field === 'note') {
    dayObj.customNote[lang] = value;
  }
  renderVisualItineraryPass();
}

function toggleDaySelection(dayNum, listKey, itemId) {
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj || !Array.isArray(dayObj[listKey])) return;

  const idx = dayObj[listKey].indexOf(itemId);
  if (idx >= 0) {
    dayObj[listKey].splice(idx, 1);
  } else {
    dayObj[listKey].push(itemId);
  }

  renderItineraryStudio();
}

function applyItineraryPreset(presetKey) {
  if (presetKey === '5day_biker') {
    FeaturesState.totalDays = 5;
    FeaturesState.selectedHotelId = 'hotel-sea-crown';
    FeaturesState.tripTitle = '5-Day Marine Drive Bike & Island Explorer';
    FeaturesState.daysPlan = getDefault5DayPlan();
    FeaturesState.activeDayTab = 2; // Show Day 2 Marine Drive Bike Ride tab
  } else if (presetKey === '3day_family') {
    FeaturesState.totalDays = 3;
    FeaturesState.selectedHotelId = 'hotel-kollol';
    FeaturesState.tripTitle = '3-Day Family Beach, Coral & Island Getaway';
    FeaturesState.daysPlan = getDefault5DayPlan().slice(0, 3);
    FeaturesState.activeDayTab = 1;
  } else if (presetKey === '2day_quick') {
    FeaturesState.totalDays = 2;
    FeaturesState.selectedHotelId = 'prime-park-hotel';
    FeaturesState.tripTitle = '2-Day Marine Drive Bike & Sunset Escape';
    FeaturesState.daysPlan = getDefault5DayPlan().slice(0, 2);
    FeaturesState.activeDayTab = 1;
  } else if (presetKey === 'clear_custom') {
    FeaturesState.daysPlan = Array.from({ length: FeaturesState.totalDays }, (_, i) => ({
      dayNumber: i + 1,
      title: {
        en: `Day ${i + 1}: My Custom Cox’s Bazar Plan`,
        bn: `দিন ${i + 1}: আমার কাস্টম কক্সবাজার প্ল্যান`
      },
      spots: ['spot-laboni-sugandha'],
      activities: i === 0 ? ['act-marine-drive-bike'] : [],
      restaurants: ['rest-poushee'],
      transports: ['trans-tomtom-hops'],
      customNote: { en: '', bn: '' }
    }));
    FeaturesState.activeDayTab = 1;
  }

  renderItineraryStudio();
}

function calculateItineraryBudget() {
  const activeDays = FeaturesState.daysPlan.slice(0, FeaturesState.totalDays);
  const nights = Math.max(1, FeaturesState.totalDays - 1);

  // 1. Hotel Cost
  const hotelsList = typeof HOTELS_DATA !== 'undefined' ? HOTELS_DATA : [];
  const selectedHotel = hotelsList.find(h => h.id === FeaturesState.selectedHotelId) || hotelsList[0];
  const avgHotelNightBDT = selectedHotel ? Math.round((selectedHotel.minBDT + selectedHotel.maxBDT) / 2) : 3000;
  const totalHotelBDT = avgHotelNightBDT * nights;

  // 2. Daily Breakdown
  let totalTransportBDT = 0;
  let totalDiningBDT = 0;
  let totalActivitiesBDT = 0;

  const dayCosts = activeDays.map(d => {
    const transCost = d.transports.reduce((sum, id) => {
      const item = ITIN_TRANSPORT_ADDONS.find(t => t.id === id);
      return sum + (item ? item.costBDT : 0);
    }, 0);

    const restCost = d.restaurants.reduce((sum, id) => {
      const item = ITIN_RESTAURANTS_CATALOG.find(r => r.id === id);
      return sum + (item ? item.avgCostBDT : 0);
    }, 0);

    const actCost = d.activities.reduce((sum, id) => {
      const item = ITIN_ACTIVITIES_CATALOG.find(a => a.id === id);
      return sum + (item ? item.costBDT : 0);
    }, 0);

    totalTransportBDT += transCost;
    totalDiningBDT += restCost;
    totalActivitiesBDT += actCost;

    return {
      dayNumber: d.dayNumber,
      transCost,
      restCost,
      actCost,
      dayTotal: transCost + restCost + actCost
    };
  });

  const grandTotalBDT = totalHotelBDT + totalTransportBDT + totalDiningBDT + totalActivitiesBDT;

  return {
    selectedHotel,
    nights,
    avgHotelNightBDT,
    totalHotelBDT,
    totalTransportBDT,
    totalDiningBDT,
    totalActivitiesBDT,
    grandTotalBDT,
    dayCosts
  };
}

/* --------------------------------------------------------------------------
 * 6. RENDER INTERACTIVE STUDIO BUILDER & INTERNATIONAL VISUAL PASS
 * -------------------------------------------------------------------------- */
function renderItineraryStudio() {
  const studioRoot = document.getElementById('itinerary-studio-builder');
  if (!studioRoot) return;

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';

  // Sync Navbar & Section Titles
  document.querySelectorAll('[data-nav="map"]').forEach(el => {
    el.textContent = lang === 'en' ? 'Interactive Map' : 'ম্যাপ';
  });
  document.querySelectorAll('[data-nav="itinerary"]').forEach(el => {
    el.textContent = lang === 'en' ? 'Itinerary Studio' : 'ভ্রমণ প্ল্যানার';
  });

  const setTxt = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  setTxt(
    'map-eyebrow',
    lang === 'en' ? 'INTERACTIVE OPENSTREETMAP GUIDE' : 'ইন্টারঅ্যাক্টিভ ট্যুরিস্ট ম্যাপ (OpenStreetMap)'
  );
  setTxt(
    'map-title',
    lang === 'en' ? 'Explore Cox’s Bazar on the Map' : 'ম্যাপে কক্সবাজারের হোটেল, সৈকত ও ঘাট দেখুন'
  );
  setTxt(
    'map-subtitle',
    lang === 'en'
      ? 'Click any marker or card to view verified hotels, sightseeing spots, and transport hubs across Cox’s Bazar.'
      : 'যেকোনো পিন বা কার্ডে ক্লিক করে হোটেল, দর্শনীয় স্থান এবং যাতায়াত ঘাটের অবস্থান ও তথ্য দেখুন।'
  );

  setTxt(
    'itin-eyebrow',
    lang === 'en' ? 'INTERNATIONAL CUSTOM TRIP STUDIO' : 'আন্তর্জাতিক মানের কাস্টম ভ্রমণ প্ল্যানার'
  );
  setTxt(
    'itin-title',
    lang === 'en'
      ? 'Build & Download Your Visual Cox’s Bazar Itinerary'
      : 'নিজের মতো কক্সবাজার ভ্রমণ প্ল্যান তৈরি ও ডাউনলোড করুন'
  );
  setTxt(
    'itin-subtitle',
    lang === 'en'
      ? 'Select your hotel, daily spots, restaurants, local transport fares, and signature activities like riding a bike along Marine Drive—then download your official branded Visual Itinerary Pass.'
      : 'হোটেল, প্রতিদিনের দর্শনীয় স্থান, রেস্তোরাঁ, যাতায়াত খরচ এবং মেরিন ড্রাইভে বাইক রাইডিং নির্বাচন করে আপনার ভিজ্যুয়াল ভ্রমণ গাইড ডাউনলোড করুন।'
  );

  const hotelsList = typeof HOTELS_DATA !== 'undefined' ? HOTELS_DATA : [];
  const allSpots = getUnifiedWebsiteSpots();
  const currentDayObj =
    FeaturesState.daysPlan.find(d => d.dayNumber === FeaturesState.activeDayTab) || FeaturesState.daysPlan[0];

  // Build Hotel Selector Cards
  const hotelCardsHTML = hotelsList
    .map(hotel => {
      const isSelected = hotel.id === FeaturesState.selectedHotelId;
      const avgNight = Math.round((hotel.minBDT + hotel.maxBDT) / 2);
      return `
        <button
          type="button"
          onclick="selectItineraryHotel('${hotel.id}')"
          class="text-left p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
            isSelected
              ? 'bg-ocean-950 text-white border-amber-400 ring-2 ring-amber-400/50 shadow-lg'
              : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300 hover:bg-sky-50/40'
          }"
        >
          <img
            src="${hotel.image}"
            alt="${hotel.name[lang]}"
            class="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-200 border border-white/20"
          />
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-1">
              <span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                isSelected ? 'bg-amber-400 text-slate-950' : 'bg-sky-100 text-sky-800'
              }">
                ${hotel.location[lang]}
              </span>
              ${
                isSelected
                  ? `<span class="text-xs font-extrabold text-amber-300">✓ ${lang === 'en' ? 'Selected' : 'নির্বাচিত'}</span>`
                  : ''
              }
            </div>
            <h4 class="font-extrabold text-sm mt-1 truncate ${isSelected ? 'text-white' : 'text-slate-900'}">
              ${hotel.name[lang]}
            </h4>
            <p class="text-xs mt-0.5 font-bold ${isSelected ? 'text-teal-300' : 'text-teal-700'}">
              ~${formatSinglePrice(avgNight)} / ${lang === 'en' ? 'night' : 'রাত'}
            </p>
          </div>
        </button>
      `;
    })
    .join('');

  // Build Day Tabs (Day 1 .. Day N)
  const dayTabsHTML = Array.from({ length: FeaturesState.totalDays }, (_, i) => {
    const dNum = i + 1;
    const dPlan = FeaturesState.daysPlan[i];
    const isActive = FeaturesState.activeDayTab === dNum;
    const itemCount =
      (dPlan?.spots?.length || 0) +
      (dPlan?.activities?.length || 0) +
      (dPlan?.restaurants?.length || 0) +
      (dPlan?.transports?.length || 0);

    return `
      <button
        type="button"
        onclick="setItineraryActiveDayTab(${dNum})"
        class="px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 border ${
          isActive
            ? 'bg-gradient-to-r from-ocean-950 to-sky-800 text-white border-ocean-950 shadow-md scale-[1.02]'
            : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
        }"
      >
        <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs ${
          isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
        }">${dNum}</span>
        <span>${lang === 'en' ? `Day ${dNum}` : `দিন ${dNum}`}</span>
        <span class="px-1.5 py-0.5 rounded-full text-[10px] ${
          isActive ? 'bg-white/20 text-teal-200' : 'bg-sky-100 text-sky-800'
        }">${itemCount}</span>
      </button>
    `;
  }).join('');

  // 1. Spots Selector for Current Day
  const spotsSelectorHTML = allSpots
    .map(spot => {
      const active = currentDayObj.spots.includes(spot.id);
      return `
        <button
          type="button"
          onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'spots', '${spot.id}')"
          class="p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
            active
              ? 'bg-sky-900 text-white border-sky-700 shadow-sm ring-2 ring-sky-400/50'
              : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300'
          }"
        >
          <img src="${spot.image}" alt="${spot.name[lang]}" class="w-11 h-11 rounded-xl object-cover shrink-0 bg-slate-200" />
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-1">
              <span class="text-[10px] font-bold uppercase tracking-wider ${
                active ? 'text-teal-300' : 'text-sky-700'
              }">${spot.area[lang]}</span>
              <span class="text-xs font-extrabold ${active ? 'text-amber-300' : 'text-slate-300'}">${
                active ? '✓' : '+'
              }</span>
            </div>
            <div class="font-bold text-xs truncate mt-0.5">${spot.name[lang]}</div>
          </div>
        </button>
      `;
    })
    .join('');

  // 2. Activities Selector for Current Day (Highlighting Bike Ride on Marine Drive!)
  const activitiesSelectorHTML = ITIN_ACTIVITIES_CATALOG.map(act => {
    const active = currentDayObj.activities.includes(act.id);
    const isBike = act.id === 'act-marine-drive-bike';
    return `
      <button
        type="button"
        onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'activities', '${act.id}')"
        class="p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
          active
            ? 'bg-teal-900 text-white border-teal-600 shadow-sm ring-2 ring-teal-400/50'
            : isBike
            ? 'bg-amber-50/80 text-slate-900 border-amber-300 hover:bg-amber-100/70'
            : 'bg-white text-slate-800 border-slate-200 hover:border-teal-300'
        }"
      >
        <span class="text-xl shrink-0 mt-0.5">${act.icon}</span>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-1">
            <span class="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
              active
                ? 'bg-amber-400 text-slate-950'
                : isBike
                ? 'bg-amber-400 text-slate-950'
                : 'bg-teal-50 text-teal-800'
            }">${act.badge[lang]}</span>
            <span class="text-xs font-extrabold ${active ? 'text-amber-300' : 'text-teal-700'}">
              ${formatSinglePrice(act.costBDT)}
            </span>
          </div>
          <div class="font-bold text-xs sm:text-sm mt-1 leading-snug">${act.name[lang]}</div>
        </div>
      </button>
    `;
  }).join('');

  // 3. Restaurants Selector for Current Day
  const restaurantsSelectorHTML = ITIN_RESTAURANTS_CATALOG.map(rest => {
    const active = currentDayObj.restaurants.includes(rest.id);
    return `
      <button
        type="button"
        onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'restaurants', '${rest.id}')"
        class="p-3 rounded-2xl border text-left transition-all flex items-start gap-3 ${
          active
            ? 'bg-amber-950 text-white border-amber-600 shadow-sm ring-2 ring-amber-400/50'
            : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300'
        }"
      >
        <span class="text-xl shrink-0 mt-0.5">${rest.icon}</span>
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-1">
            <h5 class="font-extrabold text-xs sm:text-sm truncate">${rest.name[lang]}</h5>
            <span class="text-xs font-extrabold shrink-0 ${active ? 'text-amber-300' : 'text-amber-700'}">
              ~${formatSinglePrice(rest.avgCostBDT)}
            </span>
          </div>
          <p class="text-[11px] mt-1 leading-relaxed ${active ? 'text-amber-100/90' : 'text-slate-500'}">
            ${rest.specialty[lang]}
          </p>
        </div>
      </button>
    `;
  }).join('');

  // 4. Transport & Daily Travel Cost Selector for Current Day
  const transportSelectorHTML = ITIN_TRANSPORT_ADDONS.map(tr => {
    const active = currentDayObj.transports.includes(tr.id);
    return `
      <button
        type="button"
        onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'transports', '${tr.id}')"
        class="p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
          active
            ? 'bg-ocean-950 text-white border-sky-500 shadow-sm ring-2 ring-sky-400/50'
            : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300'
        }"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="text-xl shrink-0">${tr.icon}</span>
          <div class="min-w-0">
            <div class="font-bold text-xs sm:text-sm truncate">${tr.name[lang]}</div>
            <div class="text-[11px] ${active ? 'text-sky-200' : 'text-slate-500'}">${tr.duration[lang]}</div>
          </div>
        </div>
        <div class="text-right shrink-0">
          <span class="block text-xs font-extrabold ${active ? 'text-amber-300' : 'text-sky-700'}">
            ${formatSinglePrice(tr.costBDT)}
          </span>
          <span class="text-[10px] font-bold ${active ? 'text-teal-300' : 'text-slate-400'}">
            ${active ? (lang === 'en' ? '✓ Added' : '✓ যুক্ত') : lang === 'en' ? '+ Add' : '+ যুক্ত করুন'}
          </span>
        </div>
      </button>
    `;
  }).join('');

  studioRoot.innerHTML = `
    <!-- TOP BAR: QUICK TEMPLATES & TRIP DURATION -->
    <div class="bg-sand-50 rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm mb-8">
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-teal-700">
            ${lang === 'en' ? 'STEP 1 • CONFIGURE YOUR TRIP OR LOAD A PRESET' : 'ধাপ ১ • আপনার ভ্রমণের দিন সংখ্যা ও টেমপ্লেট নির্বাচন করুন'}
          </span>
          <h3 class="text-xl font-extrabold text-slate-900 mt-0.5">
            ${lang === 'en' ? 'Trip Duration, Travelers & Quick Templates' : 'ভ্রমণের মেয়াদ, ভ্রমণকারী ও রেডিমেড প্ল্যান'}
          </h3>
        </div>

        <!-- Quick Preset Pills -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onclick="applyItineraryPreset('5day_biker')"
            class="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-xs transition"
          >
            🏍️ ${lang === 'en' ? '5-Day Marine Drive Bike & Island Plan' : '৫ দিনের মেরিন ড্রাইভ বাইক ও দ্বীপ প্ল্যান'}
          </button>
          <button
            type="button"
            onclick="applyItineraryPreset('3day_family')"
            class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-sky-50 text-slate-700 border border-slate-200 transition"
          >
            👨‍👩‍👧 ${lang === 'en' ? '3-Day Family Plan' : '৩ দিনের ফ্যামিলি প্ল্যান'}
          </button>
          <button
            type="button"
            onclick="applyItineraryPreset('2day_quick')"
            class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-sky-50 text-slate-700 border border-slate-200 transition"
          >
            ⚡ ${lang === 'en' ? '2-Day Weekend' : '২ দিনের উইকএন্ড'}
          </button>
          <button
            type="button"
            onclick="applyItineraryPreset('clear_custom')"
            class="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition"
          >
            ↺ ${lang === 'en' ? 'Reset / Build Fresh' : 'নতুন করে সাজান'}
          </button>
        </div>
      </div>

      <!-- Trip Meta Inputs: Trip Title, Traveler Name, Duration (1-7 Days) -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 pt-5 items-end">
        <div class="md:col-span-5">
          <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
            ${lang === 'en' ? 'Itinerary Title' : 'ভ্রমণ প্ল্যানের নাম'}
          </label>
          <input
            type="text"
            value="${FeaturesState.tripTitle.replace(/"/g, '&quot;')}"
            oninput="updateTripMetaField('tripTitle', this.value)"
            class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div class="md:col-span-3">
          <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
            ${lang === 'en' ? 'Prepared For (Name / Group)' : 'ভ্রমণকারীর নাম / গ্রুপ'}
          </label>
          <input
            type="text"
            value="${FeaturesState.travelerName.replace(/"/g, '&quot;')}"
            oninput="updateTripMetaField('travelerName', this.value)"
            class="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div class="md:col-span-4">
          <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5">
            ${lang === 'en' ? 'Select Number of Days (1–7 Days)' : 'ভ্রমণের দিন সংখ্যা (১–৭ দিন)'}
          </label>
          <div class="grid grid-cols-7 gap-1.5">
            ${[1, 2, 3, 4, 5, 6, 7]
              .map(
                d => `
                <button
                  type="button"
                  onclick="setItineraryTotalDays(${d})"
                  class="py-2.5 rounded-xl text-xs font-extrabold border transition ${
                    FeaturesState.totalDays === d
                      ? 'bg-ocean-950 text-amber-300 border-ocean-950 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
                  }"
                >
                  ${d}D
                </button>
              `
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- STEP 2: CHOOSE YOUR HOTEL FROM WEBSITE CONTENT -->
      <div class="mt-7 pt-6 border-t border-slate-200/80">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-extrabold uppercase tracking-wider text-sky-700">
            🏨 ${lang === 'en' ? 'STEP 2 • DECIDE YOUR HOTEL (FROM VERIFIED WEBSITE ACCOMMODATIONS)' : 'ধাপ ২ • আপনার পছন্দের হোটেল নির্বাচন করুন'}
          </span>
          <span class="text-xs text-slate-500 font-semibold">
            ${lang === 'en' ? `${ Math.max(1, FeaturesState.totalDays - 1) } Nights Stay Calculated Automatically` : `${ Math.max(1, FeaturesState.totalDays - 1) } রাতের হোটেল খরচ হিসাব করা হবে`}
          </span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${hotelCardsHTML}
        </div>
      </div>

      <!-- STEP 3: DAY-BY-DAY PLANNER TABS -->
      <div class="mt-7 pt-6 border-t border-slate-200/80">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <span class="text-xs font-extrabold uppercase tracking-wider text-teal-700">
            🗓️ ${lang === 'en' ? 'STEP 3 • CUSTOMIZE EACH DAY (SPOTS, MARINE DRIVE BIKE RIDE, RESTAURANTS & TRAVEL COST)' : 'ধাপ ৩ • প্রতিদিনের স্পট, বাইক রাইড, রেস্তোরাঁ ও যাতায়াত নির্বাচন করুন'}
          </span>
          <span class="text-xs font-bold text-slate-500">
            ${lang === 'en' ? `Editing Day ${currentDayObj.dayNumber} of ${FeaturesState.totalDays}` : `দিন ${currentDayObj.dayNumber} / ${FeaturesState.totalDays} সম্পাদনা করছেন`}
          </span>
        </div>

        <!-- Day Tabs Bar -->
        <div class="flex flex-wrap items-center gap-2 mb-6">
          ${dayTabsHTML}
        </div>

        <!-- Active Day Customization Workspace -->
        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-6">
          <!-- Day Title & Note Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                ${lang === 'en' ? `Day ${currentDayObj.dayNumber} Theme / Headline` : `দিন ${currentDayObj.dayNumber}-এর শিরোনাম`}
              </label>
              <input
                type="text"
                value="${currentDayObj.title[lang].replace(/"/g, '&quot;')}"
                oninput="updateDayCustomField(${currentDayObj.dayNumber}, 'title', this.value)"
                class="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1">
                ${lang === 'en' ? `Day ${currentDayObj.dayNumber} Personal Plan / Timing Note` : `দিন ${currentDayObj.dayNumber}-এর বিশেষ নোট বা সময়সূচি`}
              </label>
              <input
                type="text"
                value="${(currentDayObj.customNote[lang] || '').replace(/"/g, '&quot;')}"
                placeholder="${lang === 'en' ? 'e.g., Ride bike on Marine Drive at 7 AM, lunch at Mermaid Cafe...' : 'যেমন: সকাল ৭টায় মেরিন ড্রাইভে বাইক রাইড...'}"
                oninput="updateDayCustomField(${currentDayObj.dayNumber}, 'note', this.value)"
                class="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <!-- A. Spots to Visit on Day X -->
          <div>
            <h4 class="text-xs font-extrabold uppercase tracking-wider text-sky-800 mb-2.5 flex items-center gap-1.5">
              <span>📍</span>
              <span>${lang === 'en' ? `Select Spots to Visit on Day ${currentDayObj.dayNumber} (Click to Toggle)` : `দিন ${currentDayObj.dayNumber}-এ কোন কোন স্পটে যাবেন নির্বাচন করুন`}</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              ${spotsSelectorHTML}
            </div>
          </div>

          <!-- B. Activities to Do on Day X (Marine Drive Bike Ride, Water Sports, etc.) -->
          <div>
            <h4 class="text-xs font-extrabold uppercase tracking-wider text-teal-800 mb-2.5 flex items-center gap-1.5">
              <span>🏍️</span>
              <span>${lang === 'en' ? `Select Activities to Do on Day ${currentDayObj.dayNumber} (Includes Marine Drive Bike Ride)` : `দিন ${currentDayObj.dayNumber}-এর অ্যাক্টিভিটি ও মেরিন ড্রাইভ বাইক রাইড নির্বাচন করুন`}</span>
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              ${activitiesSelectorHTML}
            </div>
          </div>

          <!-- C. Where to Eat (Restaurants) & D. Daily Travel / Transport Cost -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 class="text-xs font-extrabold uppercase tracking-wider text-amber-800 mb-2.5 flex items-center gap-1.5">
                <span>🍽️</span>
                <span>${lang === 'en' ? `Where to Eat on Day ${currentDayObj.dayNumber} (Restaurants & Dining)` : `দিন ${currentDayObj.dayNumber}-এ কোথায় খাবেন (রেস্তোরাঁ ও খাবার)`}</span>
              </h4>
              <div class="space-y-2">
                ${restaurantsSelectorHTML}
              </div>
            </div>

            <div>
              <h4 class="text-xs font-extrabold uppercase tracking-wider text-ocean-900 mb-2.5 flex items-center gap-1.5">
                <span>🛺</span>
                <span>${lang === 'en' ? `Daily Transport & Travel Cost on Day ${currentDayObj.dayNumber}` : `দিন ${currentDayObj.dayNumber}-এর যাতায়াত মাধ্যম ও ভাড়া`}</span>
              </h4>
              <div class="space-y-2">
                ${transportSelectorHTML}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  renderVisualItineraryPass();
}

function renderVisualItineraryPass() {
  const container = document.getElementById('itinerary-output-container');
  if (!container) return;

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const budget = calculateItineraryBudget();
  const allSpots = getUnifiedWebsiteSpots();
  const activeDays = FeaturesState.daysPlan.slice(0, FeaturesState.totalDays);

  const daysCardsHTML = activeDays
    .map((day, idx) => {
      const dayCostObj = budget.dayCosts[idx] || { transCost: 0, restCost: 0, actCost: 0, dayTotal: 0 };

      const chosenSpots = day.spots
        .map(id => allSpots.find(s => s.id === id))
        .filter(Boolean);

      const chosenActivities = day.activities
        .map(id => ITIN_ACTIVITIES_CATALOG.find(a => a.id === id))
        .filter(Boolean);

      const chosenRestaurants = day.restaurants
        .map(id => ITIN_RESTAURANTS_CATALOG.find(r => r.id === id))
        .filter(Boolean);

      const chosenTransports = day.transports
        .map(id => ITIN_TRANSPORT_ADDONS.find(t => t.id === id))
        .filter(Boolean);

      const hasMarineBike = day.activities.includes('act-marine-drive-bike') || day.transports.includes('trans-bike-rental');

      return `
        <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <!-- Day Header Bar -->
          <div class="bg-gradient-to-r from-ocean-950 via-ocean-900 to-sky-900 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 font-extrabold text-sm flex flex-col items-center justify-center leading-none shadow-md">
                <span class="text-[9px] uppercase tracking-wider">DAY</span>
                <span class="text-base">0${day.dayNumber}</span>
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-display text-lg sm:text-xl font-extrabold text-white">
                    ${day.title[lang]}
                  </h4>
                  ${
                    hasMarineBike
                      ? `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950">
                          🏍️ Marine Drive Bike Route
                        </span>`
                      : ''
                  }
                </div>
                ${
                  day.customNote[lang]
                    ? `<p class="text-xs text-sky-200/90 mt-0.5 italic">“${day.customNote[lang]}”</p>`
                    : ''
                }
              </div>
            </div>

            <div class="bg-white/10 border border-white/15 rounded-xl px-3.5 py-1.5 text-right">
              <span class="block text-[10px] uppercase tracking-wider text-sky-200 font-bold">
                ${lang === 'en' ? `Day ${day.dayNumber} Est. Spend` : `দিন ${day.dayNumber} আনুমানিক খরচ`}
              </span>
              <span class="text-sm font-extrabold text-amber-300">
                ${formatSinglePrice(dayCostObj.dayTotal)}
              </span>
            </div>
          </div>

          <!-- Day Body: 4 International Standard Columns -->
          <div class="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Column 1: Spots to Visit -->
            <div class="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-sky-800 mb-2.5 flex items-center gap-1.5">
                <span>📍</span>
                <span>${lang === 'en' ? 'Spots to Visit' : 'দর্শনীয় স্থান'}</span>
              </div>
              ${
                chosenSpots.length
                  ? `<div class="space-y-2">
                      ${chosenSpots
                        .map(
                          s => `
                          <div class="flex items-center gap-2.5 bg-white p-2 rounded-xl border border-sky-100 shadow-2xs">
                            <img src="${s.image}" alt="${s.name[lang]}" class="w-9 h-9 rounded-lg object-cover shrink-0 bg-slate-200" />
                            <div class="min-w-0">
                              <div class="font-bold text-slate-900 text-xs truncate">${s.name[lang]}</div>
                              <div class="text-[10px] text-sky-700 font-semibold">${s.area[lang]}</div>
                            </div>
                          </div>
                        `
                        )
                        .join('')}
                    </div>`
                  : `<p class="text-xs text-slate-400 italic">${lang === 'en' ? 'No spots selected' : 'কোনো স্পট নির্বাচন করা হয়নি'}</p>`
              }
            </div>

            <!-- Column 2: Activities to Do -->
            <div class="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-teal-800 mb-2.5 flex items-center gap-1.5">
                <span>🏍️</span>
                <span>${lang === 'en' ? 'Activities & Experiences' : 'অ্যাক্টিভিটি ও অভিজ্ঞতা'}</span>
              </div>
              ${
                chosenActivities.length
                  ? `<div class="space-y-2">
                      ${chosenActivities
                        .map(
                          a => `
                          <div class="bg-white p-2.5 rounded-xl border border-teal-100 shadow-2xs">
                            <div class="flex items-center justify-between gap-1">
                              <span class="text-xs font-extrabold text-slate-900">${a.icon} ${a.badge[lang]}</span>
                              <span class="text-[11px] font-extrabold text-teal-700">${formatSinglePrice(a.costBDT)}</span>
                            </div>
                            <div class="text-xs text-slate-700 font-medium mt-1 leading-snug">${a.name[lang]}</div>
                          </div>
                        `
                        )
                        .join('')}
                    </div>`
                  : `<p class="text-xs text-slate-400 italic">${lang === 'en' ? 'Leisure beach time' : 'সৈকতে অবসর সময়'}</p>`
              }
            </div>

            <!-- Column 3: Where to Eat (Restaurants) -->
            <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 mb-2.5 flex items-center gap-1.5">
                <span>🍽️</span>
                <span>${lang === 'en' ? 'Where to Eat (Restaurants)' : 'কোথায় খাবেন (রেস্তোরাঁ)'}</span>
              </div>
              ${
                chosenRestaurants.length
                  ? `<div class="space-y-2">
                      ${chosenRestaurants
                        .map(
                          r => `
                          <div class="bg-white p-2.5 rounded-xl border border-amber-100 shadow-2xs">
                            <div class="flex items-center justify-between gap-1">
                              <span class="text-xs font-extrabold text-slate-900 truncate">${r.icon} ${r.name[lang]}</span>
                              <span class="text-[11px] font-extrabold text-amber-700 shrink-0">${formatSinglePrice(r.avgCostBDT)}</span>
                            </div>
                            <div class="text-[11px] text-slate-500 mt-0.5 leading-snug">${r.specialty[lang]}</div>
                          </div>
                        `
                        )
                        .join('')}
                    </div>`
                  : `<p class="text-xs text-slate-400 italic">${lang === 'en' ? 'In-hotel or local dining' : 'হোটেল বা স্থানীয় খাবার'}</p>`
              }
            </div>

            <!-- Column 4: Local Transport & Travel Cost -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                <span>🚕</span>
                <span>${lang === 'en' ? 'Daily Travel & Cost' : 'যাতায়াত ও পরিবহন খরচ'}</span>
              </div>
              ${
                chosenTransports.length
                  ? `<div class="space-y-2">
                      ${chosenTransports
                        .map(
                          t => `
                          <div class="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs">
                            <div class="flex items-center justify-between gap-1">
                              <span class="text-xs font-bold text-slate-900">${t.icon} ${t.duration[lang]}</span>
                              <span class="text-[11px] font-extrabold text-sky-700">${formatSinglePrice(t.costBDT)}</span>
                            </div>
                            <div class="text-[11px] text-slate-600 mt-0.5 leading-snug">${t.name[lang]}</div>
                          </div>
                        `
                        )
                        .join('')}
                    </div>`
                  : `<p class="text-xs text-slate-400 italic">${lang === 'en' ? 'Walking / beach stroll' : 'পায়ে হাঁটা ভ্রমণ'}</p>`
              }
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  container.innerHTML = `
    <!-- ACTION TOOLBAR: DOWNLOAD PNG / DOWNLOAD PDF / PRINT -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-ocean-950 text-white p-5 rounded-3xl shadow-xl border border-white/10">
      <div class="flex items-center gap-3.5">
        <img
          src="assets/images/logo-transparent.png"
          alt="Visit Cox Logo"
          class="w-12 h-12 object-contain bg-white/10 p-1.5 rounded-2xl border border-white/15"
        />
        <div>
          <span class="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block">
            ${lang === 'en' ? 'READY TO EXPORT • OFFICIAL VISUAL DOSSIER' : 'ডাউনলোডের জন্য প্রস্তুত • অফিশিয়াল ভিজ্যুয়াল গাইড'}
          </span>
          <h3 class="text-lg font-extrabold text-white">
            ${lang === 'en' ? 'Download Your Custom Visual Itinerary Pass' : 'আপনার কাস্টম ভিজ্যুয়াল ভ্রমণ গাইড ডাউনলোড করুন'}
          </h3>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          id="btn-download-png"
          onclick="downloadVisualItineraryPNG()"
          class="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          <span>${lang === 'en' ? 'Download Image (.PNG)' : 'ইমেজ ডাউনলোড (.PNG)'}</span>
        </button>

        <button
          type="button"
          id="btn-download-pdf"
          onclick="downloadVisualItineraryPDF()"
          class="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-extrabold text-xs sm:text-sm shadow-lg transition flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <span>${lang === 'en' ? 'Download Official PDF' : 'পিডিএফ ডাউনলোড (.PDF)'}</span>
        </button>

        <button
          type="button"
          onclick="printVisualItinerary()"
          class="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
        >
          <span>🖨️</span>
          <span>${lang === 'en' ? 'Print Pass' : 'প্রিন্ট করুন'}</span>
        </button>
      </div>
    </div>

    <!-- ====================================================================
         INTERNATIONAL-STANDARD VISUAL ITINERARY POSTER (CAPTURED ON DOWNLOAD)
         ==================================================================== -->
    <div
      id="visual-itinerary-poster"
      class="bg-sand-50 rounded-[2rem] border-2 border-slate-200/90 shadow-2xl overflow-hidden"
    >
      <!-- 1. CREATIVE BRANDED HEADER WITH VISIT COX LOGO SIGN -->
      <div class="relative bg-gradient-to-br from-ocean-950 via-ocean-900 to-teal-900 p-7 sm:p-10 text-white overflow-hidden">
        <div class="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-teal-400/10 blur-2xl pointer-events-none"></div>

        <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/15">
          <!-- Left: Creative Visit Cox Emblem Sign & Title -->
          <div class="flex items-start sm:items-center gap-5">
            <div class="relative shrink-0">
              <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/95 p-2.5 shadow-2xl border-2 border-amber-300 flex items-center justify-center">
                <img
                  src="assets/images/logo-transparent.png"
                  alt="Visit Cox Official Emblem"
                  crossorigin="anonymous"
                  class="w-full h-full object-contain"
                />
              </div>
              <span class="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-extrabold uppercase tracking-widest whitespace-nowrap shadow">
                ✓ VERIFIED PASS
              </span>
            </div>

            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 border border-teal-300/30 text-teal-200 text-[11px] font-extrabold uppercase tracking-widest mb-2">
                <span>VISIT COX’S BAZAR • BANGLADESH COASTAL GUIDE</span>
              </div>
              <h3 class="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                ${FeaturesState.tripTitle}
              </h3>
              <p class="text-sky-200 text-xs sm:text-sm mt-1.5 font-medium">
                ${lang === 'en' ? 'Prepared For:' : 'ভ্রমণকারী:'} <strong class="text-amber-300">${FeaturesState.travelerName}</strong>
                • ${FeaturesState.totalDays} ${lang === 'en' ? 'Days' : 'দিন'} / ${budget.nights} ${lang === 'en' ? 'Nights' : 'রাত'}
                • ${lang === 'en' ? 'Currency:' : 'মুদ্রা:'} <strong>${typeof AppState !== 'undefined' ? AppState.currency : 'BDT'}</strong>
              </p>
            </div>
          </div>

          <!-- Right: Total Estimated Trip Cost Summary Box -->
          <div class="bg-white/10 backdrop-blur-md border border-amber-300/40 rounded-3xl p-5 text-left lg:text-right shrink-0">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-amber-300">
              ${lang === 'en' ? 'TOTAL ESTIMATED TRIP BUDGET' : 'সর্বমোট আনুমানিক ভ্রমণ বাজেট'}
            </span>
            <div class="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              ${formatSinglePrice(budget.grandTotalBDT)}
            </div>
            <span class="block text-[11px] text-sky-200 mt-1">
              ${lang === 'en' ? 'Includes Hotel + Transport/Bike + Dining + Activities' : 'হোটেল + যাতায়াত/বাইক + খাবার + অ্যাক্টিভিটি সহ'}
            </span>
          </div>
        </div>

        <!-- 2. EXECUTIVE SUMMARY BAR: SELECTED HOTEL & COST BREAKDOWN -->
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 pt-6 items-center">
          <!-- Selected Hotel Card -->
          <div class="lg:col-span-5 bg-white/10 border border-white/15 rounded-2xl p-3.5 flex items-center gap-3.5">
            ${
              budget.selectedHotel
                ? `
                <img
                  src="${budget.selectedHotel.image}"
                  alt="${budget.selectedHotel.name[lang]}"
                  crossorigin="anonymous"
                  class="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-800 border border-white/20"
                />
                <div class="min-w-0">
                  <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block">
                    🏨 ${lang === 'en' ? 'SELECTED ACCOMMODATION' : 'নির্বাচিত হোটেল'} (${budget.nights} ${lang === 'en' ? 'Nights' : 'রাত'})
                  </span>
                  <div class="font-extrabold text-white text-sm sm:text-base truncate">${budget.selectedHotel.name[lang]}</div>
                  <div class="text-xs text-sky-200">${budget.selectedHotel.location[lang]} • <strong>${formatSinglePrice(budget.totalHotelBDT)}</strong></div>
                </div>
              `
                : ''
            }
          </div>

          <!-- 4 Cost Breakdown Mini Cards -->
          <div class="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div class="bg-white/10 border border-white/10 rounded-2xl p-3">
              <span class="text-[10px] font-bold uppercase text-sky-200 block">🏨 ${lang === 'en' ? 'Hotel Stay' : 'হোটেল খরচ'}</span>
              <span class="text-xs sm:text-sm font-extrabold text-white mt-0.5 block">${formatSinglePrice(budget.totalHotelBDT)}</span>
            </div>
            <div class="bg-white/10 border border-white/10 rounded-2xl p-3">
              <span class="text-[10px] font-bold uppercase text-sky-200 block">🏍️ ${lang === 'en' ? 'Travel & Bike' : 'যাতায়াত ও বাইক'}</span>
              <span class="text-xs sm:text-sm font-extrabold text-teal-300 mt-0.5 block">${formatSinglePrice(budget.totalTransportBDT)}</span>
            </div>
            <div class="bg-white/10 border border-white/10 rounded-2xl p-3">
              <span class="text-[10px] font-bold uppercase text-sky-200 block">🍽️ ${lang === 'en' ? 'Restaurants' : 'রেস্তোরাঁ ও খাবার'}</span>
              <span class="text-xs sm:text-sm font-extrabold text-amber-300 mt-0.5 block">${formatSinglePrice(budget.totalDiningBDT)}</span>
            </div>
            <div class="bg-white/10 border border-white/10 rounded-2xl p-3">
              <span class="text-[10px] font-bold uppercase text-sky-200 block">🪂 ${lang === 'en' ? 'Activities' : 'অ্যাক্টিভিটি'}</span>
              <span class="text-xs sm:text-sm font-extrabold text-white mt-0.5 block">${formatSinglePrice(budget.totalActivitiesBDT)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. DAY-BY-DAY VISUAL ITINERARY CARDS -->
      <div class="p-6 sm:p-8 space-y-5">
        ${daysCardsHTML}
      </div>

      <!-- 4. CREATIVE OFFICIAL LOGO SIGN & VERIFICATION FOOTER -->
      <div class="bg-white border-t border-slate-200/90 px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3.5">
          <img
            src="assets/images/logo-transparent.png"
            alt="Visit Cox Seal"
            crossorigin="anonymous"
            class="w-12 h-12 object-contain"
          />
          <div>
            <div class="text-xs font-extrabold uppercase tracking-wider text-ocean-950">
              VISIT COX’S BAZAR • OFFICIAL TRAVEL ITINERARY PASS
            </div>
            <div class="text-[11px] text-slate-500 mt-0.5">
              Tourist Police Hotline: +880 1320-158995 • National Emergency: 999 • World’s Longest Natural Sea Beach (120 km)
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 border border-amber-300 bg-amber-50/70 px-4 py-2 rounded-2xl">
          <div class="text-right">
            <span class="block text-[10px] font-extrabold uppercase tracking-widest text-amber-900">AUTHENTICATED BY</span>
            <span class="block text-xs font-extrabold text-ocean-950">Visit Cox’s Bazar Portal</span>
          </div>
          <span class="w-8 h-8 rounded-xl bg-ocean-950 text-amber-300 font-extrabold text-xs flex items-center justify-center">
            ✓
          </span>
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
 * 7. DOWNLOAD VISUAL ITINERARY AS HIGH-RES PNG / PDF / PRINT
 * -------------------------------------------------------------------------- */
async function downloadVisualItineraryPNG() {
  const posterEl = document.getElementById('visual-itinerary-poster');
  const btn = document.getElementById('btn-download-png');
  if (!posterEl || typeof html2canvas === 'undefined') {
    window.print();
    return;
  }

  const origText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ Generating High-Res PNG...</span>`;
  }

  try {
    const canvas = await html2canvas(posterEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fdfbf7',
      logging: false
    });

    const link = document.createElement('a');
    link.download = `Visit-Cox-Itinerary-${FeaturesState.totalDays}-Days.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error('PNG Export Error:', err);
    window.print();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

async function downloadVisualItineraryPDF() {
  const posterEl = document.getElementById('visual-itinerary-poster');
  const btn = document.getElementById('btn-download-pdf');
  if (!posterEl || typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
    window.print();
    return;
  }

  const origText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ Generating Official PDF...</span>`;
  }

  try {
    const canvas = await html2canvas(posterEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fdfbf7',
      logging: false
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const { jsPDF } = window.jspdf;

    // Create custom PDF sized proportionally to the visual itinerary dossier
    const pdfWidthMm = 210; // A4 width in mm
    const pdfHeightMm = Math.round((canvas.height * pdfWidthMm) / canvas.width);

    const pdf = new jsPDF({
      orientation: pdfHeightMm > pdfWidthMm ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pdfWidthMm, Math.max(297, pdfHeightMm + 10)]
    });

    pdf.addImage(imgData, 'JPEG', 0, 5, pdfWidthMm, pdfHeightMm);
    pdf.save(`Visit-Cox-Itinerary-${FeaturesState.totalDays}-Days.pdf`);
  } catch (err) {
    console.error('PDF Export Error:', err);
    window.print();
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

function printVisualItinerary() {
  window.print();
}

/* --------------------------------------------------------------------------
 * 8. HOOK INTO GLOBAL RENDER & INITIALIZATION
 * -------------------------------------------------------------------------- */
function renderInteractiveFeatures() {
  renderItineraryStudio();
  if (!FeaturesState.mapInstance) {
    initTouristMap();
  }
  renderMapMarkersAndFilters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initTouristMap();
    renderInteractiveFeatures();
  });
} else {
  initTouristMap();
  renderInteractiveFeatures();
}
