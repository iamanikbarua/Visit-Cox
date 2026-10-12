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
 * Module 2: User-Friendly 3-Step Custom Itinerary Wizard & Visual Pass Builder
 *   - Step 1: Choose Trip Days (1–7 Days, default 5 Days) & Pick Your Hotel
 *   - Step 2: Choose Daily Spots & Activities (including Riding by Bike on Marine Drive)
 *   - Step 3: Choose Restaurants (Where to Eat) & Local Transport Cost
 *   - Live Visual Itinerary Pass with creative Visit Cox logo sign & itemized breakdown
 *   - 1-Click Download as High-Res Image (.PNG), Official PDF (.PDF), or Print
 *     (Engineered with html2canvas-safe typography — zero text clipping/truncation)
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
 * 2. CURATED CATALOGS FOR INTERACTIVE ITINERARY WIZARD
 * -------------------------------------------------------------------------- */
const ITIN_RESTAURANTS_CATALOG = [
  {
    id: 'rest-poushee',
    name: { en: 'Poushee Restaurant (Jhautola)', bn: 'পৌষী রেস্তোরাঁ (ঝাউতলা)' },
    specialty: {
      en: 'Famous local Mezbani beef, Loitta fish fry & 25+ coastal bhartas',
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
    badge: { en: 'Local Shopping', bn: 'কেনাকাটা' },
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
 * 3. DEFAULT 5-DAY INTERNATIONAL ITINERARY PRESET & SMART DAY HEADLINES
 * -------------------------------------------------------------------------- */
function getDefault5DayPlan() {
  return [
    {
      dayNumber: 1,
      title: {
        en: 'Beachfront Arrival, Sugandha Sunset & Radiant Fish World',
        bn: 'সৈকতে আগমন, সুগন্ধা সূর্যাস্ত ও রেডিয়েন্ট ফিশ ওয়ার্ল্ড'
      },
      isCustomTitle: false,
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
      isCustomTitle: false,
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
      isCustomTitle: false,
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
      isCustomTitle: false,
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
      isCustomTitle: false,
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

/**
 * Generates an intelligent, human-readable Day Headline from the user's selected
 * spots and activities if they haven't typed a manual custom title.
 */
function getSmartDayHeadline(day, lang) {
  if (day.isCustomTitle && day.title[lang]) {
    return day.title[lang];
  }

  const allSpots = getUnifiedWebsiteSpots();
  const spotNames = day.spots
    .map(id => {
      const s = allSpots.find(x => x.id === id);
      if (!s) return null;
      return s.name[lang]
        .replace('Main Sea Beach', 'Beach')
        .replace('National Park', '')
        .replace(' trekking', '')
        .trim();
    })
    .filter(Boolean);

  const hasBike =
    day.activities.includes('act-marine-drive-bike') || day.transports.includes('trans-bike-rental');

  if (spotNames.length > 0) {
    const mainSpots = spotNames.slice(0, 2).join(' & ');
    if (hasBike) {
      return lang === 'en'
        ? `Day ${day.dayNumber}: ${mainSpots} & Marine Drive Bike Ride`
        : `দিন ${day.dayNumber}: ${mainSpots} ও মেরিন ড্রাইভ বাইক রাইড`;
    }
    return lang === 'en' ? `Day ${day.dayNumber}: ${ spotNames.slice(0, 3).join(', ') }` : `দিন ${day.dayNumber}: ${ spotNames.slice(0, 3).join(', ') }`;
  }

  return day.title[lang] || (lang === 'en' ? `Day ${day.dayNumber}: Coastal Exploration` : `দিন ${day.dayNumber}: সমুদ্র ভ্রমণ`);
}

const FeaturesState = {
  mapInstance: null,
  markerLayerGroup: null,
  activeMapFilter: 'all',

  // User-Friendly 3-Step Wizard State
  wizardStep: 1,
  tripTitle: '5-Day Cox’s Bazar Marine Drive & Island Tour',
  travelerName: 'My Cox’s Bazar Trip',
  totalDays: 5,
  activeDayTab: 1,
  selectedHotelId: 'hotel-sea-crown',
  daysPlan: getDefault5DayPlan()
};

/* --------------------------------------------------------------------------
 * 4. FRIENDLY TOAST NOTIFICATION HELPER
 * -------------------------------------------------------------------------- */
function showUserToast(messageText, actionText, actionTargetSelector) {
  let toast = document.getElementById('user-friendly-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'user-friendly-toast';
    toast.className =
      'fixed bottom-24 left-1/2 -translate-x-1/2 z-[90] bg-ocean-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-400/60 flex items-center gap-3 text-xs sm:text-sm font-bold transition-all duration-300';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0">✓</span>
    <span>${messageText}</span>
    ${
      actionText && actionTargetSelector
        ? `<a href="${actionTargetSelector}" onclick="document.getElementById('user-friendly-toast').style.opacity='0'" class="ml-1 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs hover:bg-amber-300 transition whitespace-nowrap">${actionText}</a>`
        : ''
    }
  `;
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';

  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    if (toast) {
      toast.style.opacity = '0';
      toast.style.pointerEvents = 'none';
    }
  }, 4200);
}

/* --------------------------------------------------------------------------
 * 5. LEAFLET INTERACTIVE MAP INITIALIZATION & FILTERING
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
      { key: 'all', label: 'All Places (7)', dot: 'bg-sky-400' },
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
              <h4 class="font-bold text-slate-900 text-sm mt-1 group-hover:text-sky-700 transition leading-snug">
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
            <span>${lang === 'en' ? 'View Details' : 'বিস্তারিত দেখুন'}</span>
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
 * 6. USER-FRIENDLY WIZARD CONTROLLERS & QUICK-ADD FROM WEBSITE CARDS
 * -------------------------------------------------------------------------- */
function formatSinglePrice(bdtAmount) {
  if (typeof formatPriceRange === 'function') {
    if (bdtAmount === 0) {
      return typeof AppState !== 'undefined' && AppState.lang === 'bn' ? 'ফ্রি' : 'Free';
    }
    return formatPriceRange(bdtAmount, bdtAmount);
  }
  return `${bdtAmount.toLocaleString()} BDT`;
}

function setWizardStep(stepNum) {
  FeaturesState.wizardStep = stepNum;
  renderItineraryStudio();
}

function editDayFromPass(dayNum) {
  FeaturesState.activeDayTab = dayNum;
  FeaturesState.wizardStep = 2;
  renderItineraryStudio();
  document.getElementById('itinerary-studio-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setItineraryTotalDays(daysCount) {
  const count = Math.max(1, Math.min(7, parseInt(daysCount, 10) || 5));
  FeaturesState.totalDays = count;

  // Keep Trip Headline day-count in sync automatically if it starts with "X-Day"
  FeaturesState.tripTitle = FeaturesState.tripTitle.replace(/^\d+-Day\b/i, `${count}-Day`);

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
      isCustomTitle: false,
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

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  showUserToast(
    lang === 'en' ? `Trip set to ${count} Days (${count - 1} Nights)!` : `ভ্রমণ ${count} দিনে সেট করা হয়েছে!`,
    lang === 'en' ? 'View Pass ↓' : 'পাস দেখুন ↓',
    '#visual-itinerary-poster'
  );
  renderItineraryStudio();
}

function setItineraryActiveDayTab(dayNum) {
  FeaturesState.activeDayTab = dayNum;
  renderItineraryStudio();
}

function selectItineraryHotel(hotelId, fromWebsiteCard) {
  FeaturesState.selectedHotelId = hotelId;
  renderItineraryStudio();
  if (typeof renderHotels === 'function') {
    renderHotels();
  }

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const hotel = (typeof HOTELS_DATA !== 'undefined' ? HOTELS_DATA : []).find(h => h.id === hotelId);
  const hotelName = hotel ? hotel.name[lang] : '';

  if (fromWebsiteCard) {
    showUserToast(
      lang === 'en'
        ? `${hotelName} selected for your trip itinerary!`
        : `${hotelName} আপনার ভ্রমণ প্ল্যানে যুক্ত হয়েছে!`,
      lang === 'en' ? 'Open My Trip Plan →' : 'ট্রিপ প্ল্যান দেখুন →',
      '#itinerary-section'
    );
  }
}

function addSpotFromWebsiteCard(spotId) {
  const dayObj =
    FeaturesState.daysPlan.find(d => d.dayNumber === FeaturesState.activeDayTab) || FeaturesState.daysPlan[0];
  if (!dayObj) return;

  if (!dayObj.spots.includes(spotId)) {
    dayObj.spots.push(spotId);
  }

  renderItineraryStudio();
  if (typeof renderDestinations === 'function') {
    renderDestinations();
  }

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const spot = getUnifiedWebsiteSpots().find(s => s.id === spotId);
  const spotName = spot ? spot.name[lang] : '';

  showUserToast(
    lang === 'en'
      ? `Added "${spotName}" to Day ${dayObj.dayNumber} of your trip!`
      : `"${spotName}" আপনার দিন ${dayObj.dayNumber}-এর প্ল্যানে যুক্ত হয়েছে!`,
    lang === 'en' ? 'View Trip Pass →' : 'ট্রিপ পাস দেখুন →',
    '#itinerary-section'
  );
}

function updateTripMetaField(field, value) {
  if (field === 'tripTitle') {
    FeaturesState.tripTitle = value || `${FeaturesState.totalDays}-Day Cox’s Bazar Coastal Expedition`;
  } else if (field === 'travelerName') {
    FeaturesState.travelerName = value || 'My Trip';
  }
  renderVisualItineraryPass();
}

function updateDayCustomField(dayNum, field, value) {
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj) return;
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';

  if (field === 'title') {
    dayObj.title[lang] = value;
    dayObj.isCustomTitle = Boolean(value && value.trim());
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
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';

  if (presetKey === '5day_biker') {
    FeaturesState.totalDays = 5;
    FeaturesState.selectedHotelId = 'hotel-sea-crown';
    FeaturesState.tripTitle = '5-Day Marine Drive Bike & Island Explorer';
    FeaturesState.daysPlan = getDefault5DayPlan();
    FeaturesState.activeDayTab = 2;
    showUserToast(
      lang === 'en'
        ? 'Loaded 5-Day Marine Drive Bike & Island Plan!'
        : '৫ দিনের মেরিন ড্রাইভ বাইক ও দ্বীপ প্ল্যান লোড হয়েছে!',
      lang === 'en' ? 'See Pass ↓' : 'পাস দেখুন ↓',
      '#visual-itinerary-poster'
    );
  } else if (presetKey === '3day_family') {
    FeaturesState.totalDays = 3;
    FeaturesState.selectedHotelId = 'hotel-kollol';
    FeaturesState.tripTitle = '3-Day Family Beach, Coral & Island Getaway';
    FeaturesState.daysPlan = getDefault5DayPlan().slice(0, 3);
    FeaturesState.activeDayTab = 1;
    showUserToast(
      lang === 'en' ? 'Loaded 3-Day Family Relax Plan!' : '৩ দিনের ফ্যামিলি প্ল্যান লোড হয়েছে!',
      lang === 'en' ? 'See Pass ↓' : 'পাস দেখুন ↓',
      '#visual-itinerary-poster'
    );
  } else if (presetKey === '2day_quick') {
    FeaturesState.totalDays = 2;
    FeaturesState.selectedHotelId = 'prime-park-hotel';
    FeaturesState.tripTitle = '2-Day Marine Drive Bike & Sunset Escape';
    FeaturesState.daysPlan = getDefault5DayPlan().slice(0, 2);
    FeaturesState.activeDayTab = 1;
    showUserToast(
      lang === 'en' ? 'Loaded 2-Day Weekend Escape Plan!' : '২ দিনের উইকএন্ড প্ল্যান লোড হয়েছে!',
      lang === 'en' ? 'See Pass ↓' : 'পাস দেখুন ↓',
      '#visual-itinerary-poster'
    );
  } else if (presetKey === 'clear_custom') {
    FeaturesState.tripTitle = `${FeaturesState.totalDays}-Day Custom Cox’s Bazar Tour`;
    FeaturesState.daysPlan = Array.from({ length: FeaturesState.totalDays }, (_, i) => ({
      dayNumber: i + 1,
      title: {
        en: `Day ${i + 1}: Coastal Exploration`,
        bn: `দিন ${i + 1}: সমুদ্র সৈকত ভ্রমণ`
      },
      isCustomTitle: false,
      spots: ['spot-laboni-sugandha'],
      activities: i === 0 ? ['act-marine-drive-bike'] : [],
      restaurants: ['rest-poushee'],
      transports: ['trans-tomtom-hops'],
      customNote: { en: '', bn: '' }
    }));
    FeaturesState.activeDayTab = 1;
    showUserToast(
      lang === 'en' ? 'Reset! Now tap items to build your custom plan.' : 'রিসেট সম্পন্ন! এখন আপনার পছন্দমতো সাজান।'
    );
  }

  renderItineraryStudio();
}

function calculateItineraryBudget() {
  const activeDays = FeaturesState.daysPlan.slice(0, FeaturesState.totalDays);
  const nights = Math.max(1, FeaturesState.totalDays - 1);

  const hotelsList = typeof HOTELS_DATA !== 'undefined' ? HOTELS_DATA : [];
  const selectedHotel = hotelsList.find(h => h.id === FeaturesState.selectedHotelId) || hotelsList[0];
  const avgHotelNightBDT = selectedHotel ? Math.round((selectedHotel.minBDT + selectedHotel.maxBDT) / 2) : 3000;
  const totalHotelBDT = avgHotelNightBDT * nights;

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
 * 7. RENDER SIMPLE 3-STEP WIZARD & VISUAL ITINERARY PASS
 * -------------------------------------------------------------------------- */
function renderItineraryStudio() {
  const studioRoot = document.getElementById('itinerary-studio-builder');
  if (!studioRoot) return;

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const step = FeaturesState.wizardStep;
  const budget = calculateItineraryBudget();

  // Sync Navbar & Section Titles
  document.querySelectorAll('[data-nav="map"]').forEach(el => {
    el.textContent = lang === 'en' ? 'Interactive Map' : 'ম্যাপ';
  });
  document.querySelectorAll('[data-nav="itinerary"]').forEach(el => {
    el.textContent = lang === 'en' ? 'Plan My Trip' : 'ভ্রমণ প্ল্যানার';
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
    lang === 'en' ? 'EASY 3-STEP TRIP PLANNER & DOWNLOADER' : 'সহজ ৩-ধাপে কক্সবাজার ভ্রমণ প্ল্যানার'
  );
  setTxt(
    'itin-title',
    lang === 'en'
      ? 'Plan Your Cox’s Bazar Trip & Download Your Visual Pass'
      : 'খুব সহজে আপনার কক্সবাজার ভ্রমণ প্ল্যান তৈরি ও ডাউনলোড করুন'
  );
  setTxt(
    'itin-subtitle',
    lang === 'en'
      ? 'Follow the 3 simple steps below to choose your hotel, daily spots, Marine Drive bike ride, restaurants, and local transport—then download your ready-to-use itinerary as an Image or PDF!'
      : 'নিচের সহজ ৩টি ধাপে আপনার হোটেল, প্রতিদিনের দর্শনীয় স্থান, মেরিন ড্রাইভ বাইক রাইড ও রেস্তোরাঁ বেছে নিন এবং সাথে সাথে ছবি (.PNG) বা পিডিএফ (.PDF) ডাউনলোড করুন!'
  );

  const hotelsList = typeof HOTELS_DATA !== 'undefined' ? HOTELS_DATA : [];
  const allSpots = getUnifiedWebsiteSpots();
  const currentDayObj =
    FeaturesState.daysPlan.find(d => d.dayNumber === FeaturesState.activeDayTab) || FeaturesState.daysPlan[0];

  const dayTabsHTML = Array.from({ length: FeaturesState.totalDays }, (_, i) => {
    const dNum = i + 1;
    const isActive = FeaturesState.activeDayTab === dNum;
    return `
      <button
        type="button"
        onclick="setItineraryActiveDayTab(${dNum})"
        class="px-5 py-3 rounded-2xl font-extrabold text-sm transition-all flex items-center gap-2 border ${
          isActive
            ? 'bg-ocean-950 text-amber-300 border-ocean-950 shadow-md scale-105'
            : 'bg-white text-slate-700 border-slate-200 hover:bg-sky-50'
        }"
      >
        <span>🗓️ ${lang === 'en' ? `Day ${dNum}` : `দিন ${dNum}`}</span>
      </button>
    `;
  }).join('');

  // STEP 1 CONTENT: DAYS & HOTEL
  const step1HTML = `
    <div class="space-y-8">
      <!-- 1A: How Many Days & Quick Ready Plans -->
      <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-sky-100 text-sky-800 uppercase">
              ${lang === 'en' ? 'Question 1' : 'প্রশ্ন ১'}
            </span>
            <h4 class="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
              ${lang === 'en' ? 'How many days are you visiting Cox’s Bazar?' : 'আপনি কক্সবাজারে কত দিন থাকবেন?'}
            </h4>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-bold text-slate-400 mr-1">${lang === 'en' ? 'Quick Auto-Fill:' : 'রেডি প্ল্যান:'}</span>
            <button
              type="button"
              onclick="applyItineraryPreset('5day_biker')"
              class="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-slate-950 transition"
            >
              🏍️ ${lang === 'en' ? '5-Day Bike & Island Plan' : '৫ দিনের বাইক ও দ্বীপ প্ল্যান'}
            </button>
            <button
              type="button"
              onclick="applyItineraryPreset('3day_family')"
              class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 transition"
            >
              👨‍👩‍👧 ${lang === 'en' ? '3-Day Family Plan' : '৩ দিনের ফ্যামিলি'}
            </button>
            <button
              type="button"
              onclick="applyItineraryPreset('2day_quick')"
              class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 transition"
            >
              ⚡ ${lang === 'en' ? '2-Day Short Trip' : '২ দিনের শর্ট ট্রিপ'}
            </button>
            <button
              type="button"
              onclick="applyItineraryPreset('clear_custom')"
              class="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition"
            >
              ↺ ${lang === 'en' ? 'Reset' : 'রিসেট'}
            </button>
          </div>
        </div>

        <!-- Big Easy Day Buttons -->
        <div class="grid grid-cols-3 sm:grid-cols-6 gap-2.5 pt-5">
          ${[2, 3, 4, 5, 6, 7]
            .map(
              d => `
              <button
                type="button"
                onclick="setItineraryTotalDays(${d})"
                class="py-3.5 px-3 rounded-2xl font-extrabold text-sm border-2 transition-all flex flex-col items-center justify-center ${
                  FeaturesState.totalDays === d
                    ? 'bg-ocean-950 text-white border-amber-400 shadow-lg scale-[1.03]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50'
                }"
              >
                <span class="text-lg sm:text-xl ${FeaturesState.totalDays === d ? 'text-amber-300' : 'text-slate-900'}">${d} ${lang === 'en' ? 'Days' : 'দিন'}</span>
                <span class="text-[11px] font-medium ${FeaturesState.totalDays === d ? 'text-sky-200' : 'text-slate-400'}">
                  ${d - 1} ${lang === 'en' ? 'Nights' : 'রাত'}
                </span>
              </button>
            `
            )
            .join('')}
        </div>

        <!-- Optional Traveler Name & Trip Title -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 pt-5 border-t border-slate-100">
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">
              ✏️ ${lang === 'en' ? 'Your Name or Group Name (Shown on Pass)' : 'আপনার নাম বা গ্রুপের নাম (পাসে দেখাবে)'}
            </label>
            <input
              type="text"
              value="${FeaturesState.travelerName.replace(/"/g, '&quot;')}"
              oninput="updateTripMetaField('travelerName', this.value)"
              placeholder="e.g., Anik Barua"
              class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-600 mb-1">
              🏷️ ${lang === 'en' ? 'Trip Headline' : 'ভ্রমণের শিরোনাম'}
            </label>
            <input
              type="text"
              value="${FeaturesState.tripTitle.replace(/"/g, '&quot;')}"
              oninput="updateTripMetaField('tripTitle', this.value)"
              class="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      <!-- 1B: Choose Your Hotel -->
      <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-2xs">
        <div class="mb-4">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-100 text-teal-800 uppercase">
            ${lang === 'en' ? 'Question 2' : 'প্রশ্ন ২'}
          </span>
          <h4 class="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
            🏨 ${lang === 'en' ? 'Which hotel would you like to stay at? (Tap one)' : 'আপনি কোন হোটেলে থাকতে চান? (যেকোনো একটিতে ক্লিক করুন)'}
          </h4>
          <p class="text-xs text-slate-500 mt-0.5">
            ${lang === 'en' ? `Your ${budget.nights}-night stay cost (${formatSinglePrice(budget.avgHotelNightBDT)} × ${budget.nights} nights = ${formatSinglePrice(budget.totalHotelBDT)}) is calculated automatically.` : `আপনার ${budget.nights} রাতের হোটেল ভাড়া স্বয়ংক্রিয়ভাবে যোগ হবে।`}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          ${hotelsList
            .map(hotel => {
              const isSelected = hotel.id === FeaturesState.selectedHotelId;
              const avgNight = Math.round((hotel.minBDT + hotel.maxBDT) / 2);
              return `
                <button
                  type="button"
                  onclick="selectItineraryHotel('${hotel.id}', false)"
                  class="text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-3.5 ${
                    isSelected
                      ? 'bg-ocean-950 text-white border-amber-400 shadow-lg scale-[1.01]'
                      : 'bg-slate-50/70 text-slate-800 border-slate-200 hover:border-sky-300 hover:bg-white'
                  }"
                >
                  <img
                    src="${hotel.image}"
                    alt="${hotel.name[lang]}"
                    class="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-200"
                  />
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-1">
                      <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-sky-100 text-sky-800'
                      }">
                        ${isSelected ? (lang === 'en' ? '✅ SELECTED' : '✅ নির্বাচিত') : hotel.location[lang]}
                      </span>
                    </div>
                    <h5 class="font-extrabold text-sm mt-1 leading-snug ${isSelected ? 'text-white' : 'text-slate-900'}">
                      ${hotel.name[lang]}
                    </h5>
                    <p class="text-xs mt-0.5 font-bold ${isSelected ? 'text-teal-300' : 'text-teal-700'}">
                      ~${formatSinglePrice(avgNight)} / ${lang === 'en' ? 'night' : 'রাত'}
                    </p>
                  </div>
                </button>
              `;
            })
            .join('')}
        </div>
      </div>

      <!-- Next Step Footer Bar -->
      <div class="flex items-center justify-end">
        <button
          type="button"
          onclick="setWizardStep(2)"
          class="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-xl transition flex items-center justify-center gap-2"
        >
          <span>${lang === 'en' ? 'Next Step: Pick Daily Spots & Bike Ride' : 'পরবর্তী ধাপ: প্রতিদিনের স্পট ও বাইক রাইড বেছে নিন'}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  `;

  // STEP 2 CONTENT: DAILY SPOTS & ACTIVITIES (MARINE DRIVE BIKE RIDE)
  const step2HTML = `
    <div class="space-y-6">
      <!-- Day Selector Banner -->
      <div class="bg-white rounded-3xl p-5 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-teal-700 block">
            ${lang === 'en' ? 'SELECT WHICH DAY YOU ARE PLANNING:' : 'কোন দিনের প্ল্যান সাজাতে চান ক্লিক করুন:'}
          </span>
          <h4 class="text-lg font-extrabold text-slate-900">
            ${lang === 'en' ? `Currently Editing: Day ${currentDayObj.dayNumber} of ${FeaturesState.totalDays}` : `এখন সাজাচ্ছেন: দিন ${currentDayObj.dayNumber} (মোট ${FeaturesState.totalDays} দিন)`}
          </h4>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          ${dayTabsHTML}
        </div>
      </div>

      <!-- Spots to Visit on This Day -->
      <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90">
        <div class="mb-4">
          <h4 class="text-base sm:text-lg font-extrabold text-slate-900">
            📍 ${lang === 'en' ? `Where do you want to visit on Day ${currentDayObj.dayNumber}? (Tap to select/unselect)` : `দিন ${currentDayObj.dayNumber}-এ কোন কোন স্পটে ঘুরতে যাবেন? (ক্লিক করে যুক্ত বা বাদ দিন)`}
          </h4>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${allSpots
            .map(spot => {
              const active = currentDayObj.spots.includes(spot.id);
              return `
                <button
                  type="button"
                  onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'spots', '${spot.id}')"
                  class="p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${
                    active
                      ? 'bg-sky-950 text-white border-sky-500 shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-white hover:border-sky-300'
                  }"
                >
                  <img src="${spot.image}" alt="${spot.name[lang]}" class="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-200" />
                  <div class="min-w-0 flex-1">
                    <span class="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      active ? 'bg-emerald-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }">
                      ${active ? (lang === 'en' ? '✅ Added' : '✅ যুক্ত') : lang === 'en' ? '➕ Tap to Add' : '➕ যুক্ত করুন'}
                    </span>
                    <div class="font-bold text-xs sm:text-sm leading-snug mt-1">${spot.name[lang]}</div>
                  </div>
                </button>
              `;
            })
            .join('')}
        </div>
      </div>

      <!-- Activities to Do on This Day (Marine Drive Bike Ride Highlighted!) -->
      <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90">
        <div class="mb-4">
          <h4 class="text-base sm:text-lg font-extrabold text-slate-900">
            🏍️ ${lang === 'en' ? `What activities will you do on Day ${currentDayObj.dayNumber}?` : `দিন ${currentDayObj.dayNumber}-এ কী কী অ্যাক্টিভিটি করবেন?`}
          </h4>
          <p class="text-xs text-slate-500 mt-0.5">
            ${lang === 'en' ? 'Tap "Riding by Bike on Marine Drive Road" or any water sport / island tour below:' : 'মেরিন ড্রাইভে বাইক রাইডিং বা যেকোনো অ্যাক্টিভিটিতে ক্লিক করুন:'}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          ${ITIN_ACTIVITIES_CATALOG.map(act => {
            const active = currentDayObj.activities.includes(act.id);
            const isBike = act.id === 'act-marine-drive-bike';
            return `
              <button
                type="button"
                onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'activities', '${act.id}')"
                class="p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                  active
                    ? 'bg-teal-950 text-white border-amber-400 shadow-md'
                    : isBike
                    ? 'bg-amber-50 text-slate-900 border-amber-300 hover:bg-amber-100/70'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-white hover:border-teal-300'
                }"
              >
                <span class="text-2xl shrink-0">${act.icon}</span>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-1">
                    <span class="px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      active ? 'bg-emerald-400 text-slate-950' : 'bg-white text-slate-700 border border-slate-200'
                    }">
                      ${active ? (lang === 'en' ? '✅ Selected' : '✅ নির্বাচিত') : lang === 'en' ? '➕ Tap to Add' : '➕ যুক্ত করুন'}
                    </span>
                    <span class="text-xs font-extrabold ${active ? 'text-amber-300' : 'text-teal-700'}">
                      ${formatSinglePrice(act.costBDT)}
                    </span>
                  </div>
                  <div class="font-bold text-xs sm:text-sm mt-1.5 leading-snug">${act.name[lang]}</div>
                </div>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Prev / Next Step Footer Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onclick="setWizardStep(1)"
          class="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-sm transition"
        >
          ← ${lang === 'en' ? 'Back to Step 1 (Days & Hotel)' : 'পূর্ববর্তী ধাপ (দিন ও হোটেল)'}
        </button>

        <button
          type="button"
          onclick="setWizardStep(3)"
          class="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-xl transition flex items-center gap-2"
        >
          <span>${lang === 'en' ? 'Next Step: Choose Food & Transport Cost' : 'পরবর্তী ধাপ: খাবার ও যাতায়াত খরচ'}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  `;

  // STEP 3 CONTENT: RESTAURANTS (WHERE TO EAT) & DAILY TRANSPORT COST
  const step3HTML = `
    <div class="space-y-6">
      <!-- Day Selector Banner -->
      <div class="bg-white rounded-3xl p-5 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-wider text-amber-700 block">
            ${lang === 'en' ? 'CHOOSE FOOD & TRANSPORT FOR EACH DAY:' : 'প্রতিদিনের রেস্তোরাঁ ও যাতায়াত নির্বাচন করুন:'}
          </span>
          <h4 class="text-lg font-extrabold text-slate-900">
            ${lang === 'en' ? `Currently Editing: Day ${currentDayObj.dayNumber} of ${FeaturesState.totalDays}` : `এখন সাজাচ্ছেন: দিন ${currentDayObj.dayNumber} (মোট ${FeaturesState.totalDays} দিন)`}
          </h4>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          ${dayTabsHTML}
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Where to Eat (Restaurants) -->
        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90">
          <h4 class="text-base sm:text-lg font-extrabold text-slate-900 mb-1">
            🍽️ ${lang === 'en' ? `Where to Eat on Day ${currentDayObj.dayNumber}?` : `দিন ${currentDayObj.dayNumber}-এ কোন রেস্তোরাঁয় খাবেন?`}
          </h4>
          <p class="text-xs text-slate-500 mb-4">
            ${lang === 'en' ? 'Tap one or more restaurants for your meals today:' : 'আজকের খাবার জন্য পছন্দের রেস্তোরাঁয় ক্লিক করুন:'}
          </p>
          <div class="space-y-2.5">
            ${ITIN_RESTAURANTS_CATALOG.map(rest => {
              const active = currentDayObj.restaurants.includes(rest.id);
              return `
                <button
                  type="button"
                  onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'restaurants', '${rest.id}')"
                  class="w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                    active
                      ? 'bg-amber-950 text-white border-amber-400 shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-white hover:border-amber-300'
                  }"
                >
                  <span class="text-2xl shrink-0">${rest.icon}</span>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-extrabold text-xs sm:text-sm leading-snug">${rest.name[lang]}</span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-extrabold shrink-0 ${
                        active ? 'bg-emerald-400 text-slate-950' : 'bg-amber-100 text-amber-900'
                      }">
                        ${active ? '✅ Selected' : `~${formatSinglePrice(rest.avgCostBDT)}`}
                      </span>
                    </div>
                    <p class="text-xs mt-1 ${active ? 'text-amber-100' : 'text-slate-500'}">${rest.specialty[lang]}</p>
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Daily Transport & Travel Cost -->
        <div class="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90">
          <h4 class="text-base sm:text-lg font-extrabold text-slate-900 mb-1">
            🛺 ${lang === 'en' ? `How will you travel on Day ${currentDayObj.dayNumber}?` : `দিন ${currentDayObj.dayNumber}-এ কীভাবে যাতায়াত করবেন?`}
          </h4>
          <p class="text-xs text-slate-500 mb-4">
            ${lang === 'en' ? 'Select local vehicles or Marine Drive bike rental to add to your travel budget:' : 'যাতায়াত খরচ হিসাব করতে বাহন বা বাইক ভাড়া নির্বাচন করুন:'}
          </p>
          <div class="space-y-2.5">
            ${ITIN_TRANSPORT_ADDONS.map(tr => {
              const active = currentDayObj.transports.includes(tr.id);
              return `
                <button
                  type="button"
                  onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'transports', '${tr.id}')"
                  class="w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 ${
                    active
                      ? 'bg-ocean-950 text-white border-sky-400 shadow-md'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-white hover:border-sky-300'
                  }"
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <span class="text-2xl shrink-0">${tr.icon}</span>
                    <div class="min-w-0">
                      <div class="font-bold text-xs sm:text-sm leading-snug">${tr.name[lang]}</div>
                      <div class="text-xs ${active ? 'text-sky-200' : 'text-slate-500'}">${tr.duration[lang]}</div>
                    </div>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="block text-xs font-extrabold ${active ? 'text-amber-300' : 'text-sky-700'}">
                      ${formatSinglePrice(tr.costBDT)}
                    </span>
                    <span class="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      active ? 'bg-emerald-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }">
                      ${active ? (lang === 'en' ? '✅ Added' : '✅ যুক্ত') : lang === 'en' ? '➕ Add' : '➕ যুক্ত'}
                    </span>
                  </div>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Optional Custom Headline & Note for Day -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-100">
            <div>
              <label class="block text-xs font-bold text-slate-600 mb-1">
                🏷️ ${lang === 'en' ? `Day ${currentDayObj.dayNumber} Custom Title (Optional)` : `দিন ${currentDayObj.dayNumber}-এর শিরোনাম (ঐচ্ছিক)`}
              </label>
              <input
                type="text"
                value="${currentDayObj.isCustomTitle ? currentDayObj.title[lang].replace(/"/g, '&quot;') : ''}"
                oninput="updateDayCustomField(${currentDayObj.dayNumber}, 'title', this.value)"
                placeholder="${getSmartDayHeadline(currentDayObj, lang).replace(/"/g, '&quot;')}"
                class="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-600 mb-1">
                📝 ${lang === 'en' ? `Day ${currentDayObj.dayNumber} Timing / Note (Optional)` : `দিন ${currentDayObj.dayNumber}-এর নোট (ঐচ্ছিক)`}
              </label>
              <input
                type="text"
                value="${(currentDayObj.customNote[lang] || '').replace(/"/g, '&quot;')}"
                oninput="updateDayCustomField(${currentDayObj.dayNumber}, 'note', this.value)"
                placeholder="${lang === 'en' ? 'e.g., Start bike ride at 7:00 AM...' : 'যেমন: সকাল ৭টায় বাইক রাইড...'}"
                class="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Prev / Finish Footer Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onclick="setWizardStep(2)"
          class="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-bold text-sm transition"
        >
          ← ${lang === 'en' ? 'Back to Step 2 (Spots & Bike Ride)' : 'পূর্ববর্তী ধাপ (স্পট ও বাইক রাইড)'}
        </button>

        <a
          href="#visual-itinerary-poster"
          class="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl transition flex items-center gap-2"
        >
          <span>🎉 ${lang === 'en' ? 'Done! View & Download My Visual Pass Below' : 'সম্পন্ন! নিচে আপনার ভিজ্যুয়াল পাস দেখুন ও ডাউনলোড করুন'}</span>
          <span>↓</span>
        </a>
      </div>
    </div>
  `;

  studioRoot.innerHTML = `
    <!-- EASY 3-STEP PROGRESS BAR -->
    <div class="bg-sand-50 rounded-3xl p-5 sm:p-8 border border-slate-200/90 shadow-sm mb-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-7">
        <!-- Step 1 Tab -->
        <button
          type="button"
          onclick="setWizardStep(1)"
          class="p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 ${
            step === 1
              ? 'bg-ocean-950 text-white border-amber-400 shadow-lg'
              : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
          }"
        >
          <span class="w-10 h-10 rounded-xl font-extrabold text-base flex items-center justify-center shrink-0 ${
            step === 1 ? 'bg-amber-400 text-slate-950' : 'bg-sky-100 text-sky-800'
          }">1</span>
          <div>
            <span class="text-[11px] font-extrabold uppercase tracking-wider block ${
              step === 1 ? 'text-amber-300' : 'text-sky-700'
            }">${lang === 'en' ? 'STEP 1' : 'ধাপ ১'}</span>
            <span class="font-extrabold text-sm sm:text-base">${
              lang === 'en' ? 'Choose Days & Hotel' : 'দিন সংখ্যা ও হোটেল'
            }</span>
          </div>
        </button>

        <!-- Step 2 Tab -->
        <button
          type="button"
          onclick="setWizardStep(2)"
          class="p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 ${
            step === 2
              ? 'bg-ocean-950 text-white border-amber-400 shadow-lg'
              : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
          }"
        >
          <span class="w-10 h-10 rounded-xl font-extrabold text-base flex items-center justify-center shrink-0 ${
            step === 2 ? 'bg-amber-400 text-slate-950' : 'bg-teal-100 text-teal-800'
          }">2</span>
          <div>
            <span class="text-[11px] font-extrabold uppercase tracking-wider block ${
              step === 2 ? 'text-amber-300' : 'text-teal-700'
            }">${lang === 'en' ? 'STEP 2' : 'ধাপ ২'}</span>
            <span class="font-extrabold text-sm sm:text-base">${
              lang === 'en' ? 'Spots & Marine Drive Bike' : 'স্পট ও মেরিন ড্রাইভ বাইক'
            }</span>
          </div>
        </button>

        <!-- Step 3 Tab -->
        <button
          type="button"
          onclick="setWizardStep(3)"
          class="p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 ${
            step === 3
              ? 'bg-ocean-950 text-white border-amber-400 shadow-lg'
              : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'
          }"
        >
          <span class="w-10 h-10 rounded-xl font-extrabold text-base flex items-center justify-center shrink-0 ${
            step === 3 ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'
          }">3</span>
          <div>
            <span class="text-[11px] font-extrabold uppercase tracking-wider block ${
              step === 3 ? 'text-amber-300' : 'text-amber-700'
            }">${lang === 'en' ? 'STEP 3' : 'ধাপ ৩'}</span>
            <span class="font-extrabold text-sm sm:text-base">${
              lang === 'en' ? 'Food (Restaurants) & Travel' : 'রেস্তোরাঁ ও যাতায়াত খরচ'
            }</span>
          </div>
        </button>
      </div>

      <!-- Active Wizard Step Content -->
      ${step === 1 ? step1HTML : step === 2 ? step2HTML : step3HTML}
    </div>
  `;

  renderVisualItineraryPass();
}

/* --------------------------------------------------------------------------
 * 8. INTERNATIONAL-STANDARD VISUAL ITINERARY PASS (ZERO CLIPPING / FULL MATH)
 * -------------------------------------------------------------------------- */
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

      const chosenSpots = day.spots.map(id => allSpots.find(s => s.id === id)).filter(Boolean);
      const chosenActivities = day.activities.map(id => ITIN_ACTIVITIES_CATALOG.find(a => a.id === id)).filter(Boolean);
      const chosenRestaurants = day.restaurants
        .map(id => ITIN_RESTAURANTS_CATALOG.find(r => r.id === id))
        .filter(Boolean);
      const chosenTransports = day.transports.map(id => ITIN_TRANSPORT_ADDONS.find(t => t.id === id)).filter(Boolean);

      const hasMarineBike =
        day.activities.includes('act-marine-drive-bike') || day.transports.includes('trans-bike-rental');

      const smartHeadline = getSmartDayHeadline(day, lang);

      return `
        <div class="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <!-- Day Header Bar -->
          <div class="bg-gradient-to-r from-ocean-950 via-ocean-900 to-sky-900 px-6 py-4 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div class="flex items-start sm:items-center gap-3.5">
              <div class="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-extrabold text-center flex flex-col items-center justify-center shrink-0 shadow-md">
                <span class="text-[9px] uppercase tracking-wider block leading-tight">DAY</span>
                <span class="text-base block leading-tight">0${day.dayNumber}</span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2.5 flex-wrap">
                  <h4 class="font-display text-lg sm:text-xl font-extrabold text-white leading-snug pb-0.5">
                    ${smartHeadline}
                  </h4>
                  ${
                    hasMarineBike
                      ? `<span class="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 leading-normal">
                          🏍️ MARINE DRIVE BIKE ROUTE
                        </span>`
                      : ''
                  }
                </div>
                ${
                  day.customNote[lang]
                    ? `<p class="text-xs text-sky-200/95 mt-1 leading-relaxed">“${day.customNote[lang]}”</p>`
                    : ''
                }
              </div>
            </div>

            <!-- Itemized Day Cost Pill + Edit Button -->
            <div class="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onclick="editDayFromPass(${day.dayNumber})"
                data-html2canvas-ignore="true"
                class="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold text-amber-300 border border-white/20 transition"
              >
                ✏️ ${lang === 'en' ? `Edit Day ${day.dayNumber}` : `দিন ${day.dayNumber} পরিবর্তন`}
              </button>

              <div class="bg-white/10 border border-white/15 rounded-2xl px-4 py-2 text-left lg:text-right">
                <span class="block text-[10px] uppercase tracking-wider text-sky-200 font-bold leading-normal">
                  ${lang === 'en' ? `DAY ${day.dayNumber} ITEMIZED SPEND` : `দিন ${day.dayNumber} মোট খরচ`}
                </span>
                <span class="text-base font-extrabold text-amber-300 block leading-snug">
                  ${formatSinglePrice(dayCostObj.dayTotal)}
                </span>
                <span class="block text-[10px] text-sky-200/90 leading-normal">
                  ${lang === 'en' ? 'Activities' : 'অ্যাক্টিভিটি'} ${formatSinglePrice(dayCostObj.actCost)} + ${lang === 'en' ? 'Food' : 'খাবার'} ${formatSinglePrice(dayCostObj.restCost)} + ${lang === 'en' ? 'Travel' : 'যাতায়াত'} ${formatSinglePrice(dayCostObj.transCost)}
                </span>
              </div>
            </div>
          </div>

          <!-- Day Body: 4 Clean Columns (No Text Truncation / Full Wrapping) -->
          <div class="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Column 1: Spots to Visit -->
            <div class="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-sky-800 mb-3 flex items-center justify-between">
                <span>📍 ${lang === 'en' ? 'SPOTS TO VISIT' : 'দর্শনীয় স্থান'}</span>
                <span class="text-[10px] font-bold text-sky-600">${chosenSpots.length} ${lang === 'en' ? 'Spots' : 'টি'}</span>
              </div>
              ${
                chosenSpots.length
                  ? `<div class="space-y-2.5">
                      ${chosenSpots
                        .map(
                          s => `
                          <div class="flex items-start gap-2.5 bg-white p-2.5 rounded-xl border border-sky-100 shadow-2xs">
                            <img src="${s.image}" alt="${s.name[lang]}" crossorigin="anonymous" class="w-11 h-11 rounded-lg object-cover shrink-0 bg-slate-200 mt-0.5" />
                            <div class="min-w-0 flex-1">
                              <div class="font-extrabold text-slate-900 text-xs leading-snug pb-0.5">${s.name[lang]}</div>
                              <div class="text-[11px] text-sky-700 font-semibold leading-normal">${s.area[lang]}</div>
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
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-teal-800 mb-3 flex items-center justify-between">
                <span>🏍️ ${lang === 'en' ? 'ACTIVITIES TO DO' : 'অ্যাক্টিভিটি'}</span>
                <span class="text-[10px] font-extrabold text-teal-700">${formatSinglePrice(dayCostObj.actCost)}</span>
              </div>
              ${
                chosenActivities.length
                  ? `<div class="space-y-2.5">
                      ${chosenActivities
                        .map(
                          a => `
                          <div class="bg-white p-3 rounded-xl border border-teal-100 shadow-2xs">
                            <div class="flex items-start justify-between gap-2">
                              <span class="font-extrabold text-slate-900 text-xs leading-snug pb-0.5">${a.icon} ${a.name[lang]}</span>
                              <span class="text-[11px] font-extrabold text-teal-700 shrink-0 leading-normal">${formatSinglePrice(a.costBDT)}</span>
                            </div>
                            <div class="mt-1">
                              <span class="inline-block px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] font-bold leading-normal">
                                ${a.badge[lang]}
                              </span>
                            </div>
                          </div>
                        `
                        )
                        .join('')}
                    </div>`
                  : `<p class="text-xs text-slate-400 italic">${lang === 'en' ? 'Relaxing on the beach (Free)' : 'সৈকতে অবসর সময়'}</p>`
              }
            </div>

            <!-- Column 3: Where to Eat (Restaurants) -->
            <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 mb-3 flex items-center justify-between">
                <span>🍽️ ${lang === 'en' ? 'WHERE TO EAT' : 'রেস্তোরাঁ ও খাবার'}</span>
                <span class="text-[10px] font-extrabold text-amber-800">${formatSinglePrice(dayCostObj.restCost)}</span>
              </div>
              ${
                chosenRestaurants.length
                  ? `<div class="space-y-2.5">
                      ${chosenRestaurants
                        .map(
                          r => `
                          <div class="bg-white p-3 rounded-xl border border-amber-100 shadow-2xs">
                            <div class="flex items-start justify-between gap-2">
                              <span class="font-extrabold text-slate-900 text-xs leading-snug pb-0.5">${r.icon} ${r.name[lang]}</span>
                              <span class="text-[11px] font-extrabold text-amber-700 shrink-0 leading-normal">${formatSinglePrice(r.avgCostBDT)}</span>
                            </div>
                            <div class="text-[11px] text-slate-600 mt-1 leading-relaxed">${r.specialty[lang]}</div>
                          </div>
                        `
                        )
                        .join('')}
                    </div>`
                  : `<p class="text-xs text-slate-400 italic">${lang === 'en' ? 'Hotel or local dining' : 'হোটেল বা স্থানীয় খাবার'}</p>`
              }
            </div>

            <!-- Column 4: Local Transport & Travel Cost -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div class="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 mb-3 flex items-center justify-between">
                <span>🚕 ${lang === 'en' ? 'DAILY TRAVEL & COST' : 'যাতায়াত খরচ'}</span>
                <span class="text-[10px] font-extrabold text-sky-700">${formatSinglePrice(dayCostObj.transCost)}</span>
              </div>
              ${
                chosenTransports.length
                  ? `<div class="space-y-2.5">
                      ${chosenTransports
                        .map(
                          t => `
                          <div class="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                            <div class="flex items-start justify-between gap-2">
                              <span class="font-extrabold text-slate-900 text-xs leading-snug pb-0.5">${t.icon} ${t.name[lang]}</span>
                              <span class="text-[11px] font-extrabold text-sky-700 shrink-0 leading-normal">${formatSinglePrice(t.costBDT)}</span>
                            </div>
                            <div class="text-[11px] text-slate-500 mt-1 font-medium leading-normal">⏱ ${t.duration[lang]}</div>
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
    <!-- TOP DOWNLOAD BAR -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-ocean-950 text-white p-5 sm:p-6 rounded-3xl shadow-xl border border-white/10">
      <div class="flex items-center gap-3.5">
        <img
          src="assets/images/logo-transparent.png"
          alt="Visit Cox Logo"
          class="w-12 h-12 object-contain bg-white/10 p-1.5 rounded-2xl border border-white/15"
        />
        <div>
          <span class="text-[11px] font-extrabold uppercase tracking-widest text-amber-300 block">
            ${lang === 'en' ? 'YOUR VISUAL ITINERARY PASS IS READY!' : 'আপনার ভিজ্যুয়াল ভ্রমণ পাস প্রস্তুত!'}
          </span>
          <h3 class="text-lg sm:text-xl font-extrabold text-white">
            ${lang === 'en' ? 'Save Your Plan to Your Phone or Computer' : 'আপনার ফোন বা কম্পিউটারে ডাউনলোড করে রাখুন'}
          </h3>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          id="btn-download-png"
          onclick="downloadVisualItineraryPNG()"
          class="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg transition flex items-center gap-2"
        >
          <span>📥</span>
          <span>${lang === 'en' ? 'Download Image (.PNG)' : 'ছবি ডাউনলোড (.PNG)'}</span>
        </button>

        <button
          type="button"
          id="btn-download-pdf"
          onclick="downloadVisualItineraryPDF()"
          class="px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white font-extrabold text-xs sm:text-sm shadow-lg transition flex items-center gap-2"
        >
          <span>📄</span>
          <span>${lang === 'en' ? 'Download PDF (.PDF)' : 'পিডিএফ ডাউনলোড (.PDF)'}</span>
        </button>

        <button
          type="button"
          onclick="printVisualItinerary()"
          class="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
        >
          <span>🖨️</span>
          <span>${lang === 'en' ? 'Print' : 'প্রিন্ট'}</span>
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
              <span class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[9px] font-extrabold uppercase tracking-widest whitespace-nowrap shadow leading-normal">
                ✓ VERIFIED PASS
              </span>
            </div>

            <div class="min-w-0">
              <div class="inline-block px-3 py-1 rounded-full bg-teal-400/20 border border-teal-300/30 text-teal-200 text-[11px] font-extrabold uppercase tracking-widest mb-2 leading-normal">
                VISIT COX’S BAZAR • BANGLADESH COASTAL GUIDE
              </div>
              <h3 class="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug pb-1">
                ${FeaturesState.tripTitle}
              </h3>
              <p class="text-sky-200 text-xs sm:text-sm mt-1 font-medium leading-relaxed">
                ${lang === 'en' ? 'Prepared For:' : 'ভ্রমণকারী:'} <strong class="text-amber-300">${FeaturesState.travelerName}</strong>
                • <strong>${FeaturesState.totalDays} ${lang === 'en' ? 'Days' : 'দিন'} / ${budget.nights} ${lang === 'en' ? 'Nights' : 'রাত'}</strong>
                • ${lang === 'en' ? 'Currency:' : 'মুদ্রা:'} <strong>${typeof AppState !== 'undefined' ? AppState.currency : 'BDT'}</strong>
              </p>
            </div>
          </div>

          <!-- Right: Total Estimated Trip Cost Summary Box -->
          <div class="bg-white/10 backdrop-blur-md border border-amber-300/40 rounded-3xl p-5 text-left lg:text-right shrink-0">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-amber-300 leading-normal">
              ${lang === 'en' ? 'TOTAL ESTIMATED TRIP BUDGET' : 'সর্বমোট আনুমানিক ভ্রমণ খরচ'}
            </span>
            <div class="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-snug pb-0.5">
              ${formatSinglePrice(budget.grandTotalBDT)}
            </div>
            <span class="block text-[11px] text-sky-200 mt-0.5 leading-normal">
              ${lang === 'en' ? `Hotel (${budget.nights}N) + ${FeaturesState.totalDays} Days Travel, Food & Activities` : `হোটেল (${budget.nights} রাত) + ${FeaturesState.totalDays} দিনের সব খরচ সহ`}
            </span>
          </div>
        </div>

        <!-- 2. EXECUTIVE SUMMARY BAR: SELECTED HOTEL & CLEAR MATH BREAKDOWN -->
        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 pt-6 items-stretch">
          <!-- Selected Hotel Card (No Truncation!) -->
          <div class="lg:col-span-5 bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center gap-3.5">
            ${
              budget.selectedHotel
                ? `
                <img
                  src="${budget.selectedHotel.image}"
                  alt="${budget.selectedHotel.name[lang]}"
                  crossorigin="anonymous"
                  class="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-800 border border-white/20"
                />
                <div class="min-w-0 flex-1">
                  <span class="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block leading-normal">
                    🏨 ${lang === 'en' ? `SELECTED ACCOMMODATION (${budget.nights} NIGHTS)` : `নির্বাচিত হোটেল (${budget.nights} রাত)`}
                  </span>
                  <div class="font-extrabold text-white text-sm sm:text-base leading-snug mt-0.5 pb-0.5">
                    ${budget.selectedHotel.name[lang]}
                  </div>
                  <div class="text-xs text-sky-200 leading-relaxed">
                    ${budget.selectedHotel.location[lang]} • <strong>${formatSinglePrice(budget.avgHotelNightBDT)} × ${budget.nights} = ${formatSinglePrice(budget.totalHotelBDT)}</strong>
                  </div>
                </div>
              `
                : ''
            }
          </div>

          <!-- 4 Cost Breakdown Mini Cards with Clear Subtitles -->
          <div class="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div class="bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between">
              <span class="text-[10px] font-bold uppercase text-sky-200 block leading-normal">🏨 ${lang === 'en' ? 'HOTEL STAY' : 'হোটেল খরচ'}</span>
              <div>
                <span class="text-sm sm:text-base font-extrabold text-white mt-1 block leading-snug">${formatSinglePrice(budget.totalHotelBDT)}</span>
                <span class="text-[10px] text-sky-200/80 block leading-normal">${budget.nights} ${lang === 'en' ? 'Nights Total' : 'রাত মোট'}</span>
              </div>
            </div>
            <div class="bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between">
              <span class="text-[10px] font-bold uppercase text-sky-200 block leading-normal">🏍️ ${lang === 'en' ? 'TRAVEL & BIKE' : 'যাতায়াত ও বাইক'}</span>
              <div>
                <span class="text-sm sm:text-base font-extrabold text-teal-300 mt-1 block leading-snug">${formatSinglePrice(budget.totalTransportBDT)}</span>
                <span class="text-[10px] text-sky-200/80 block leading-normal">${FeaturesState.totalDays} ${lang === 'en' ? 'Days Local Rides' : 'দিনের যাতায়াত'}</span>
              </div>
            </div>
            <div class="bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between">
              <span class="text-[10px] font-bold uppercase text-sky-200 block leading-normal">🍽️ ${lang === 'en' ? 'RESTAURANTS' : 'রেস্তোরাঁ ও খাবার'}</span>
              <div>
                <span class="text-sm sm:text-base font-extrabold text-amber-300 mt-1 block leading-snug">${formatSinglePrice(budget.totalDiningBDT)}</span>
                <span class="text-[10px] text-sky-200/80 block leading-normal">${FeaturesState.totalDays} ${lang === 'en' ? 'Days Dining' : 'দিনের খাবার'}</span>
              </div>
            </div>
            <div class="bg-white/10 border border-white/10 rounded-2xl p-3.5 flex flex-col justify-between">
              <span class="text-[10px] font-bold uppercase text-sky-200 block leading-normal">🪂 ${lang === 'en' ? 'ACTIVITIES' : 'অ্যাক্টিভিটি'}</span>
              <div>
                <span class="text-sm sm:text-base font-extrabold text-white mt-1 block leading-snug">${formatSinglePrice(budget.totalActivitiesBDT)}</span>
                <span class="text-[10px] text-sky-200/80 block leading-normal">${FeaturesState.totalDays} ${lang === 'en' ? 'Days Experiences' : 'দিনের অভিজ্ঞতা'}</span>
              </div>
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
            <div class="text-xs font-extrabold uppercase tracking-wider text-ocean-950 leading-snug">
              VISIT COX’S BAZAR • OFFICIAL TRAVEL ITINERARY PASS
            </div>
            <div class="text-[11px] text-slate-500 mt-0.5 leading-normal">
              Tourist Police Hotline: +880 1320-158995 • National Emergency: 999 • World’s Longest Natural Sea Beach (120 km)
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 border border-amber-300 bg-amber-50/70 px-4 py-2.5 rounded-2xl">
          <div class="text-right">
            <span class="block text-[10px] font-extrabold uppercase tracking-widest text-amber-900 leading-normal">AUTHENTICATED BY</span>
            <span class="block text-xs font-extrabold text-ocean-950 leading-snug">Visit Cox’s Bazar Portal</span>
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
 * 9. DOWNLOAD VISUAL ITINERARY AS HIGH-RES PNG / PDF / PRINT
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
    btn.innerHTML = `<span>⏳ Saving Crisp Image...</span>`;
  }

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(posterEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fdfbf7',
      logging: false,
      windowWidth: 1280
    });

    const link = document.createElement('a');
    link.download = `Visit-Cox-Itinerary-${FeaturesState.totalDays}-Days.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showUserToast('Downloaded your Visual Itinerary Image (.PNG)!');
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
    btn.innerHTML = `<span>⏳ Saving Official PDF...</span>`;
  }

  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(posterEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fdfbf7',
      logging: false,
      windowWidth: 1280
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const { jsPDF } = window.jspdf;

    const pdfWidthMm = 210;
    const pdfHeightMm = Math.round((canvas.height * pdfWidthMm) / canvas.width);

    const pdf = new jsPDF({
      orientation: pdfHeightMm > pdfWidthMm ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pdfWidthMm, Math.max(297, pdfHeightMm + 10)]
    });

    pdf.addImage(imgData, 'JPEG', 0, 5, pdfWidthMm, pdfHeightMm);
    pdf.save(`Visit-Cox-Itinerary-${FeaturesState.totalDays}-Days.pdf`);
    showUserToast('Downloaded your Official PDF Itinerary!');
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
 * 10. HOOK INTO GLOBAL RENDER & INITIALIZATION
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
