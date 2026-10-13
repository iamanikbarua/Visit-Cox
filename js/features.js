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
  // 5-STAR & 4-STAR LUXURY HOTELS
  {
    id: 'map-sayeman-beach-resort',
    category: 'hotels',
    lat: 21.4168,
    lng: 91.9804,
    name: {
      en: 'Sayeman Beach Resort',
      bn: 'সায়মন বিচ রিসোর্ট (Sayeman Beach Resort)'
    },
    categoryLabel: {
      en: '5-Star Resort • Marine Drive / Kolatoli',
      bn: '৫-তারকা রিসোর্ট • মেরিন ড্রাইভ / কলাতলী'
    },
    description: {
      en: 'Premier 5-star oceanfront resort featuring iconic infinity pool, Tarboosh dining, and direct beach access.',
      bn: 'কলাতলী মেরিন ড্রাইভে অবস্থিত প্রিমিয়ার ৫-তারকা রিসোর্ট ও ইনফিনিটি পুল।'
    },
    image: 'assets/images/hero-coxs-bazar.jpg',
    targetSection: '#hotels'
  },
  {
    id: 'map-sea-pearl-resort',
    category: 'hotels',
    lat: 21.2268,
    lng: 92.0502,
    name: {
      en: 'Sea Pearl Beach Resort & Spa',
      bn: 'সী পার্ল বিচ রিসোর্ট অ্যান্ড স্পা (Royal Tulip Sea Pearl)'
    },
    categoryLabel: {
      en: '5-Star Resort • Inani Coral Beach',
      bn: '৫-তারকা রিসোর্ট • ইনানী প্রবাল সৈকত'
    },
    description: {
      en: '15-acre ultra-luxury 5-star beachfront resort at Inani Beach with private coral shores and giant water park.',
      bn: 'ইনানী সৈকত সংলগ্ন ১৫ একরের সুবিশাল ৫-তারকা লাক্সারি বিচ রিসোর্ট ও ওয়াটার পার্ক।'
    },
    image: 'assets/images/inani-beach.jpg',
    targetSection: '#hotels'
  },
  {
    id: 'map-mermaid-beach-resort',
    category: 'hotels',
    lat: 21.328,
    lng: 92.0315,
    name: {
      en: 'Mermaid Beach Resort',
      bn: 'মারমেইড বিচ রিসোর্ট (Mermaid Beach Resort)'
    },
    categoryLabel: {
      en: '5-Star Eco Resort • Pecharthal Beach',
      bn: '৫-তারকা ইকো রিসোর্ট • পেঁচারদ্বীপ'
    },
    description: {
      en: 'World-renowned 5-star eco-chic resort featuring private beaches, pool villas, and Mermaid Beach Cafe.',
      bn: 'মেরিন ড্রাইভের পেঁচারদ্বীপে অবস্থিত বিশ্বখ্যাত ৫-তারকা ইকো-লাক্সারি রিসোর্ট ও প্রাইভেট বিচ।'
    },
    image: 'assets/images/shamlapur-sampan.jpg',
    targetSection: '#hotels'
  },
  {
    id: 'map-ocean-paradise-hotel',
    category: 'hotels',
    lat: 21.4195,
    lng: 91.9822,
    name: {
      en: 'Ocean Paradise Hotel & Resort',
      bn: 'ওশান প্যারাডাইস হোটেল অ্যান্ড রিসোর্ট'
    },
    categoryLabel: {
      en: '5-Star Hotel • Kolatoli Road',
      bn: '৫-তারকা হোটেল • কলাতলী রোড'
    },
    description: {
      en: 'Premier 5-star hotel featuring a panoramic rooftop sky pool, Grand Buffet, and luxury wellness spa.',
      bn: 'কলাতলী প্রধান সড়কে অবস্থিত ঐতিহ্যবাহী ৫-তারকা হোটেল, স্কাই পুল ও গ্র্যান্ড বুফে।'
    },
    image: 'assets/images/prime-park-hotel.jpg',
    targetSection: '#hotels'
  },
  {
    id: 'map-hotel-the-cox-today',
    category: 'hotels',
    lat: 21.4188,
    lng: 91.9816,
    name: {
      en: 'Hotel The Cox Today',
      bn: 'হোটেল দ্য কক্স টুডে (Hotel The Cox Today)'
    },
    categoryLabel: {
      en: '5-Star Hotel • Kolatoli Zone',
      bn: '৫-তারকা হোটেল • কলাতলী জোন'
    },
    description: {
      en: '5-star ocean-view hotel with outdoor edge pool, seafood restaurants, and full wellness spa.',
      bn: 'কলাতলী হোটেল মোটেল জোনের ৫-তারকা হোটেল, সুইমিং পুল ও স্পা।'
    },
    image: 'assets/images/hotel-sea-crown.jpg',
    targetSection: '#hotels'
  },
  {
    id: 'map-best-western-bay-watch',
    category: 'hotels',
    lat: 21.4175,
    lng: 91.981,
    name: {
      en: 'Best Western Plus Heritage (Bay Watch)',
      bn: 'বেস্ট ওয়েস্টার্ন প্লাস হেরিটেজ (বে ওয়াচ)'
    },
    categoryLabel: {
      en: '4-Star Hotel • Kolatoli Beach',
      bn: '৪-তারকা হোটেল • কলাতলী বিচ'
    },
    description: {
      en: 'International 4-star hotel at Kolatoli Circle with rooftop sunset swimming pool and Barista cafe.',
      bn: 'কলাতলী সার্কেলের ৪-তারকা আন্তর্জাতিক হোটেল, রুফটপ পুল ও বারিস্তা ক্যাফে।'
    },
    image: 'assets/images/hotel-kollol.jpg',
    targetSection: '#hotels'
  },
  {
    id: 'map-long-beach-hotel',
    category: 'hotels',
    lat: 21.4215,
    lng: 91.9832,
    name: {
      en: 'Long Beach Hotel',
      bn: 'লং বিচ হোটেল (Long Beach Hotel)'
    },
    categoryLabel: {
      en: '4-Star Hotel • Kolatoli Road',
      bn: '৪-তারকা হোটেল • কলাতলী রোড'
    },
    description: {
      en: 'Premier 4-star hotel featuring an indoor heated swimming pool, Cozy Sizzle restaurant, and billiards lounge.',
      bn: 'কলাতলীতে অবস্থিত ৪-তারকা হোটেল, ইনডোর হিটেড সুইমিং পুল ও কোজি সিজল রেস্টুরেন্ট।'
    },
    image: 'assets/images/prime-park-hotel.jpg',
    targetSection: '#hotels'
  },
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
      en: '3-Star Hotel • Sugandha Beach',
      bn: '৩-তারকা হোটেল • সুগন্ধা বিচ'
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
      en: '3-Star Hotel • Kalatali Road',
      bn: '৩-তারকা হোটেল • কলাতলী রোড'
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
  {
    id: 'map-laboni-beach',
    category: 'spots',
    lat: 21.4365,
    lng: 91.972,
    name: {
      en: 'Laboni Beach & Promenade',
      bn: 'লাবণী সমুদ্র সৈকত ও প্রমোদভ্রমণ'
    },
    categoryLabel: {
      en: 'Tourist Spot • Oldest Beach Hub',
      bn: 'দর্শনীয় স্থান • প্রধান সৈকত'
    },
    description: {
      en: 'Town center shoreline with umbrellas, souvenir stalls, and lifeguard swimming areas.',
      bn: 'কক্সবাজার শহরের প্রধান সৈকত প্রাঙ্গণ ও লাইফগার্ড নজরদারি জোন।'
    },
    image: 'assets/images/hero-coxs-bazar.jpg',
    targetSection: '#destinations'
  },
  {
    id: 'map-sugandha-beach',
    category: 'spots',
    lat: 21.425,
    lng: 91.9775,
    name: {
      en: 'Sugandha Beach & Live Seafood Market',
      bn: 'সুগন্ধা বিচ ও রাতের মার্কেট'
    },
    categoryLabel: {
      en: 'Tourist Spot • Evening Vibe & Food',
      bn: 'দর্শনীয় স্থান • সান্ধ্যকালীন আড্ডা ও খাবার'
    },
    description: {
      en: 'Vibrant beach hub famous for live charcoal fish fry, quad biking, and evening crowds.',
      bn: 'লাইভ সি-ফুড চারকোল ফ্রাই, বিচ কোয়াড বাইকিং ও সন্ধ্যার আড্ডার জন্য খ্যাত।'
    },
    image: 'assets/images/hero-coxs-bazar.jpg',
    targetSection: '#destinations'
  },
  {
    id: 'map-daria-nagar-caves',
    category: 'spots',
    lat: 21.385,
    lng: 92.002,
    name: {
      en: 'Daria Nagar Caves & Parasailing Point',
      bn: 'দরিয়ানগর প্রাকৃতিক গুহা ও প্যারাসেইলিং'
    },
    categoryLabel: {
      en: 'Tourist Spot • 8 km South',
      bn: 'দর্শনীয় স্থান • ৮ কিমি দক্ষিণে'
    },
    description: {
      en: 'Ancient natural sea caves, mountain hiking streams, and coastal parasailing hub.',
      bn: 'প্রাকৃতিক সামুদ্রিক গুহা, পাহাড়ি ট্রেইল এবং সমুদ্রের ওপর প্যারাসেইলিং পয়েন্ট।'
    },
    image: 'assets/images/kolatoli-eco.jpg',
    targetSection: '#destinations'
  },
  {
    id: 'map-reju-khal-estuary',
    category: 'spots',
    lat: 21.282,
    lng: 92.038,
    name: {
      en: 'Reju Khal Estuary & Kayak Point',
      bn: 'রেজু খাল মোহনা ও কায়াকিং'
    },
    categoryLabel: {
      en: 'Tourist Spot • 24 km South',
      bn: 'দর্শনীয় স্থান • ২৪ কিমি দক্ষিণে'
    },
    description: {
      en: 'Serene mangrove estuary where freshwater meets the sea, ideal for peaceful kayaking.',
      bn: 'পাহাড়ঘেরা রেজু খালের মোহনা ও শান্ত ম্যানগ্রোভ কায়াকিং পয়েন্ট।'
    },
    image: 'assets/images/inani-beach.jpg',
    targetSection: '#destinations'
  },
  {
    id: 'map-ramu-buddha',
    category: 'spots',
    lat: 21.455,
    lng: 92.102,
    name: {
      en: '100 Feet Reclining Buddha (Ramu)',
      bn: '১০০ ফুট সিংহশয্যা বুদ্ধ মূর্তি (রামু)'
    },
    categoryLabel: {
      en: 'Heritage Spot • 16 km East',
      bn: 'ঐতিহাসিক স্থান • ১৬ কিমি পূর্বে'
    },
    description: {
      en: 'Awe-inspiring 100-foot golden reclining Buddha statue and ancient Rakhine monasteries.',
      bn: 'উত্তর মিঠাছড়িতে অবস্থিত দেশের বৃহত্তম ১০০ ফুট দীর্ঘ স্বর্ণালী শায়িত বুদ্ধ মূর্তি।'
    },
    image: 'assets/images/ramu-buddha.jpg',
    targetSection: '#destinations'
  },
  {
    id: 'map-radiant-fish-world',
    category: 'spots',
    lat: 21.442,
    lng: 91.978,
    name: {
      en: 'Radiant Fish World Aquarium',
      bn: 'রেডিয়েন্ট ফিশ ওয়ার্ল্ড (ঝাউতলা)'
    },
    categoryLabel: {
      en: 'Attraction • Town Center',
      bn: 'বিনোদন কেন্দ্র • ঝাউতলা'
    },
    description: {
      en: "Bangladesh's premier sea aquarium featuring underwater glass shark tunnel.",
      bn: '১০০+ প্রজাতির সামুদ্রিক মাছ ও আন্ডারওয়াটার গ্লাস টানেল সমৃদ্ধ আন্তর্জাতিক মানের অ্যাকোয়ারিয়াম।'
    },
    image: 'assets/images/radiant-fish-world.jpg',
    targetSection: '#destinations'
  },
  {
    id: 'map-sonadia-island',
    category: 'spots',
    lat: 21.52,
    lng: 91.89,
    name: {
      en: 'Sonadia Ecological Island',
      bn: 'সোনাদিয়া দ্বীপ (বিচ ক্যাম্পিং)'
    },
    categoryLabel: {
      en: 'Hidden Gem • Barrier Island',
      bn: 'হিডেন জেম • নির্জন দ্বীপ'
    },
    description: {
      en: 'Pristine barrier island famed for winter camping, red crabs, and sea turtles.',
      bn: 'শীতকালীন বিচ ক্যাম্পিং, লাল কাঁকড়া ও সামুদ্রিক কাছিম প্রজননের নির্জন দ্বীপ।'
    },
    image: 'assets/images/sonadia-island.jpg',
    targetSection: '#destinations'
  },
  {
    id: 'map-shamlapur',
    category: 'spots',
    lat: 21.1,
    lng: 92.085,
    name: {
      en: 'Shamlapur Marine Drive Sunset Point',
      bn: 'শামলাপুর সাম্পান ঘাট ও সানসেট পয়েন্ট'
    },
    categoryLabel: {
      en: 'Hidden Gem • 45 km South',
      bn: 'হিডেন জেম • ৪৫ কিমি দক্ষিণে'
    },
    description: {
      en: 'Traditional wooden Sampan fishing boats lined against fiery golden-hour skies.',
      bn: 'শত শত ঐতিহ্যবাহী কাঠের সাম্পান নৌকা ও সূর্যাস্তের মনোরম ফটোগ্রাফি পয়েন্ট।'
    },
    image: 'assets/images/shamlapur-sampan.jpg',
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
  },
  {
    id: 'act-surfing-lesson',
    name: {
      en: 'Surfing & Wave Riding Lessons at Laboni Surf Club',
      bn: 'লাবণী সার্ফ ক্লাবে সার্ফিং ও ওয়েভ রাইডিং প্রশিক্ষণ'
    },
    badge: { en: 'Ocean Thrill', bn: 'রোমাঞ্চকর খেলা' },
    costBDT: 1500,
    icon: '🏄'
  },
  {
    id: 'act-beach-horse-riding',
    name: {
      en: 'Shoreline Beach Horse Riding at Sunset (Sugandha)',
      bn: 'সুগন্ধা সৈকতে গোধূলির সূর্যাস্তে ঘোড়ায় চড়া'
    },
    badge: { en: 'Classic Leisure', bn: 'জনপ্রিয় অভিজ্ঞতা' },
    costBDT: 250,
    icon: '🐎'
  },
  {
    id: 'act-reju-khal-kayak',
    name: {
      en: 'Reju Khal Mangrove Estuary Kayaking Experience',
      bn: 'রেজু খাল মোহনায় ম্যানগ্রোভ কায়াকিং অভিজ্ঞতা'
    },
    badge: { en: 'Eco Waters', bn: 'ইকো কায়াকিং' },
    costBDT: 350,
    icon: '🛶'
  },
  {
    id: 'act-marine-cycling',
    name: {
      en: 'Coastal Cycling Tour on Marine Drive to Himchari',
      bn: 'মেরিন ড্রাইভ ধরে হিমছড়ি পর্যন্ত কোস্টাল সাইক্লিং'
    },
    badge: { en: 'Eco Road Trip', bn: 'সাইক্লিং ট্যুর' },
    costBDT: 300,
    icon: '🚲'
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
      spots: ['spot-laboni-sugandha', 'radiant-fish-world'],
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
      spots: ['himchari-national-park', 'inani-beach', 'shamlapur-sunset-point'],
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
      spots: ['moheshkhali-island', 'najirartek-dried-fish-hub'],
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
      spots: ['sonadia-island', 'kolatoli-eco-park'],
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
      spots: ['100-feet-buddha-ramu', 'spot-laboni-sugandha'],
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
  activeMapFilter: 'day-1',

  // Simple Unified Trip Planner State
  wizardStep: 1,
  activeCategoryTab: 'spots', // 'spots' | 'activities' | 'restaurants' | 'transports'
  tripTitle: '5-Day Cox’s Bazar Marine Drive & Island Tour',
  travelerName: 'My Cox’s Bazar Trip',
  totalDays: 5,
  activeDayTab: 1,
  selectedHotelId: 'hotel-sea-crown',
  activeSpotShelfCorridor: 'all',
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
 * 5. INTERACTIVE DAY-WISE COX'S BAZAR ROUTE PLANNER & GENERATOR
 * -------------------------------------------------------------------------- */
const HOTEL_ROUTE_COORDS = {
  'hotel-sea-crown': {
    lat: 21.4159,
    lng: 91.9818,
    zone: { en: 'Sugandha Beach (Marine Drive Start)', bn: 'সুগন্ধা বিচ (মেরিন ড্রাইভ শুরু)' }
  },
  'prime-park-hotel': {
    lat: 21.4184,
    lng: 91.9796,
    zone: { en: 'Kalatali Hotel Motel Zone', bn: 'কলাতলী হোটেল মোটেল জোন' }
  },
  'hotel-kollol': {
    lat: 21.4258,
    lng: 91.9718,
    zone: { en: 'Laboni Beach Point', bn: 'লাবণী বিচ পয়েন্ট' }
  },
  'nisanah-resort': {
    lat: 21.4025,
    lng: 91.9912,
    zone: { en: 'South Kolatoli Eco Fringe', bn: 'দক্ষিণ কলাতলী ইকো জোন' }
  },
  'white-orchid': {
    lat: 21.4176,
    lng: 91.9812,
    zone: { en: 'Kalatali Main Road', bn: 'কলাতলী মেইন রোড' }
  }
};

const KASTURI_GHAT_JETTY = {
  lat: 21.4526,
  lng: 91.9685,
  name: { en: 'Kasturi Ghat Speedboat Jetty', bn: 'কস্তুরাঘাট স্পিডবোট জেটি' }
};

const SPOT_ROUTE_METADATA = {
  'spot-laboni-sugandha': {
    lat: 21.4235,
    lng: 91.9742,
    corridor: 'beach_town',
    corridorLabel: { en: 'Main Beachfront', bn: 'প্রধান সৈকত' },
    orderWeight: 10
  },
  'laboni-beach': {
    lat: 21.4280,
    lng: 91.9710,
    corridor: 'beach_town',
    corridorLabel: { en: 'Laboni Point • Main Beach', bn: 'লাবণী পয়েন্ট • প্রধান সৈকত' },
    orderWeight: 8
  },
  'sugandha-beach': {
    lat: 21.4210,
    lng: 91.9755,
    corridor: 'beach_town',
    corridorLabel: { en: 'Sugandha Point • Market & Beach', bn: 'সুগন্ধা পয়েন্ট • বাজার ও বিচ' },
    orderWeight: 12
  },
  'kolatoli-beach': {
    lat: 21.4110,
    lng: 91.9830,
    corridor: 'beach_town',
    corridorLabel: { en: 'Kolatoli Beach • Hotel Zone', bn: 'কলাতলী বিচ • হোটেল মোটেল জোন' },
    orderWeight: 14
  },
  'radiant-fish-world': {
    lat: 21.4302,
    lng: 91.9735,
    corridor: 'beach_town',
    corridorLabel: { en: 'Jhautola Town Center', bn: 'ঝাউতলা শহর কেন্দ্র' },
    orderWeight: 15
  },
  'kolatoli-eco-park': {
    lat: 21.3965,
    lng: 91.9960,
    corridor: 'marine_drive',
    corridorLabel: { en: 'South Kolatoli • 4 km', bn: 'দক্ষিণ কলাতলী • ৪ কিমি' },
    orderWeight: 25
  },
  'himchari-national-park': {
    lat: 21.3556,
    lng: 92.0247,
    corridor: 'marine_drive',
    corridorLabel: { en: 'Marine Drive • 18 km South', bn: 'মেরিন ড্রাইভ • ১৮ কিমি দক্ষিণে' },
    orderWeight: 35
  },
  'marine-drive': {
    lat: 21.3100,
    lng: 92.0350,
    corridor: 'marine_drive',
    corridorLabel: { en: 'Marine Drive Coastal Highway', bn: 'মেরিন ড্রাইভ সমুদ্র সড়ক' },
    orderWeight: 42
  },
  'inani-beach': {
    lat: 21.2291,
    lng: 92.0475,
    corridor: 'marine_drive',
    corridorLabel: { en: 'Marine Drive • 32 km South', bn: 'মেরিন ড্রাইভ • ৩২ কিমি দক্ষিণে' },
    orderWeight: 50
  },
  'patuartek-beach': {
    lat: 21.1980,
    lng: 92.0620,
    corridor: 'marine_drive',
    corridorLabel: { en: 'Patuartek Beach • 38 km South', bn: 'পাটুয়ারটেক বিচ • ৩৮ কিমি দক্ষিণে' },
    orderWeight: 58
  },
  'shamlapur-sunset-point': {
    lat: 21.0825,
    lng: 92.1380,
    corridor: 'marine_drive',
    corridorLabel: { en: 'Marine Drive • 52 km South', bn: 'মেরিন ড্রাইভ • ৫২ কিমি দক্ষিণে' },
    orderWeight: 65
  },
  'najirartek-dried-fish-hub': {
    lat: 21.4640,
    lng: 91.9445,
    corridor: 'island_estuary',
    corridorLabel: { en: 'Bakkhali Estuary • 7 km North', bn: 'বাঁকখালী মোহনা • ৭ কিমি উত্তরে' },
    orderWeight: 72
  },
  'moheshkhali-island': {
    lat: 21.5333,
    lng: 91.9500,
    corridor: 'island_estuary',
    corridorLabel: { en: 'Island via Kasturi Ghat Boat', bn: 'স্পিডবোটে মহেশখালী দ্বীপ' },
    requiresBoat: true,
    orderWeight: 82
  },
  'sonadia-island': {
    lat: 21.4880,
    lng: 91.8950,
    corridor: 'island_estuary',
    corridorLabel: { en: 'Eco Island via Boat', bn: 'বোটে সোনাদিয়া ইকো দ্বীপ' },
    requiresBoat: true,
    orderWeight: 88
  },
  'kutubdia-island': {
    lat: 21.8150,
    lng: 91.8540,
    corridor: 'island_estuary',
    corridorLabel: { en: 'Kutubdia Island & Lighthouse', bn: 'কুতুবদিয়া দ্বীপ ও বাতিঘর' },
    requiresBoat: true,
    orderWeight: 89
  },
  '100-feet-buddha-ramu': {
    lat: 21.4325,
    lng: 92.1008,
    corridor: 'ramu_east',
    corridorLabel: { en: 'Ramu Highway • 16 km East', bn: 'রামু মহাসড়ক • ১৬ কিমি পূর্বে' },
    orderWeight: 93
  },
  'ramu-buddhist-temple': {
    lat: 21.4340,
    lng: 92.1020,
    corridor: 'ramu_east',
    corridorLabel: { en: 'Ramu Monasteries • 16 km East', bn: 'রামু সীমা বিহার • ১৬ কিমি' },
    orderWeight: 94
  },
  'dulahazra-safari-park': {
    lat: 21.6580,
    lng: 92.0720,
    corridor: 'ramu_east',
    corridorLabel: { en: 'Chakaria Highway • 48 km North', bn: 'ডুলাহাজারা সাফারি পার্ক • ৪৮ কিমি' },
    orderWeight: 98
  }
};

const SPOT_ID_ALIASES = {
  'spot-radiant-fish-world': 'radiant-fish-world',
  'spot-himchari': 'himchari-national-park',
  'spot-inani-beach': 'inani-beach',
  'gem-shamlapur': 'shamlapur-sunset-point',
  'spot-moheshkhali': 'moheshkhali-island',
  'gem-najirartek': 'najirartek-dried-fish-hub',
  'gem-sonadia': 'sonadia-island',
  'gem-kolatoli-eco': 'kolatoli-eco-park',
  'spot-ramu-buddha': '100-feet-buddha-ramu',
  'spot-ramu': 'ramu-buddhist-temple',
  'spot-patuartek': 'patuartek-beach',
  'spot-laboni': 'laboni-beach',
  'spot-sugandha': 'sugandha-beach',
  'spot-kolatoli': 'kolatoli-beach'
};

function normalizeSpotId(id) {
  return SPOT_ID_ALIASES[id] || id;
}

const DAY_ROUTE_COLORS = [
  '#0284c7', // Day 1: Ocean Blue
  '#0d9488', // Day 2: Tropical Teal
  '#d97706', // Day 3: Amber Gold
  '#e11d48', // Day 4: Coral Rose
  '#7c3aed', // Day 5: Royal Violet
  '#059669', // Day 6: Emerald
  '#2563eb'  // Day 7: Cobalt
];

function computeRoadDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const straightKm = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.max(0.8, +(straightKm * 1.28).toFixed(1));
}

function getLegRecommendation(fromMeta, toSpotId, distKm, lang) {
  const toNorm = normalizeSpotId(toSpotId);
  const toMeta = SPOT_ROUTE_METADATA[toNorm] || {};

  if (toMeta.requiresBoat || (fromMeta && fromMeta.requiresBoat)) {
    return {
      minutes: 35,
      vehicle:
        lang === 'en'
          ? '🛺 Tomtom to Kasturi Ghat + 🚤 Speedboat'
          : '🛺 কস্তুরাঘাটে টমটম + 🚤 স্পিডবোট পারাপার',
      fareBDT: '100 - 150 BDT',
      isBoat: true
    };
  }

  if (toMeta.corridor === 'marine_drive') {
    const mins = Math.max(10, Math.round((distKm / 36) * 60));
    return {
      minutes: mins,
      vehicle:
        lang === 'en'
          ? '🏍️ Marine Drive Bike / 🚙 Chander Gari / 🚕 CNG'
          : '🏍️ মেরিন ড্রাইভ বাইক / 🚙 চান্দের গাড়ি / 🚕 সিএনজি',
      fareBDT: distKm > 18 ? '350 - 1,800 BDT' : '250 - 500 BDT',
      isBoat: false
    };
  }

  if (toMeta.corridor === 'ramu_east') {
    const mins = Math.max(20, Math.round((distKm / 32) * 60));
    return {
      minutes: mins,
      vehicle:
        lang === 'en'
          ? '🚕 Reserved CNG Auto-Rickshaw (Highway)'
          : '🚕 রিজার্ভ সিএনজি অটোরিকশা (রামু মহাসড়ক)',
      fareBDT: '400 - 500 BDT',
      isBoat: false
    };
  }

  const mins = Math.max(6, Math.round((distKm / 22) * 60));
  return {
    minutes: mins,
    vehicle:
      lang === 'en'
        ? '🛺 Shared Tomtom (Easybike) / 🚕 Local CNG'
        : '🛺 শেয়ারড টমটম (ইজিবাইক) / 🚕 লোকাল সিএনজি',
    fareBDT: '15 - 60 BDT',
    isBoat: false
  };
}

function buildDayRouteData(dayObj, lang) {
  const hotelsList = typeof HOTELS_DATA !== 'undefined' ? HOTELS_DATA : [];
  const selectedHotel =
    hotelsList.find(h => h.id === FeaturesState.selectedHotelId) ||
    hotelsList[0] || {
      id: 'hotel-sea-crown',
      name: { en: 'Hotel Sea Crown', bn: 'হোটেল সী ক্রাউন' }
    };

  const hotelCoords = HOTEL_ROUTE_COORDS[selectedHotel.id] || HOTEL_ROUTE_COORDS['hotel-sea-crown'];
  const allSpots = getUnifiedWebsiteSpots();

  const normalizedSpots = (dayObj ? dayObj.spots : []).map(normalizeSpotId);
  const stops = [];
  let prevLat = hotelCoords.lat;
  let prevLng = hotelCoords.lng;
  let prevMeta = { requiresBoat: false };
  let totalKm = 0;
  let totalMinutes = 0;

  const polylinePoints = [[hotelCoords.lat, hotelCoords.lng]];

  normalizedSpots.forEach((spotId, idx) => {
    const spotInfo = allSpots.find(s => normalizeSpotId(s.id) === spotId);
    const meta = SPOT_ROUTE_METADATA[spotId];
    if (!spotInfo || !meta) return;

    const legKm = computeRoadDistanceKm(prevLat, prevLng, meta.lat, meta.lng);
    const rec = getLegRecommendation(prevMeta, spotId, legKm, lang);

    if (meta.requiresBoat && !prevMeta.requiresBoat) {
      polylinePoints.push([KASTURI_GHAT_JETTY.lat, KASTURI_GHAT_JETTY.lng]);
    } else if (!meta.requiresBoat && prevMeta.requiresBoat) {
      polylinePoints.push([KASTURI_GHAT_JETTY.lat, KASTURI_GHAT_JETTY.lng]);
    }

    polylinePoints.push([meta.lat, meta.lng]);

    totalKm += legKm;
    totalMinutes += rec.minutes;

    stops.push({
      stopNumber: idx + 1,
      spotId,
      name: spotInfo.name[lang],
      image: spotInfo.image,
      corridorLabel: meta.corridorLabel[lang],
      lat: meta.lat,
      lng: meta.lng,
      requiresBoat: Boolean(meta.requiresBoat),
      legKm: +legKm.toFixed(1),
      legMinutes: rec.minutes,
      vehicle: rec.vehicle,
      fareBDT: rec.fareBDT
    });

    prevLat = meta.lat;
    prevLng = meta.lng;
    prevMeta = meta;
  });

  // Calculate estimated total local fare range
  let minFareSum = 0;
  let maxFareSum = 0;
  stops.forEach(st => {
    if (st.requiresBoat) {
      minFareSum += 120;
      maxFareSum += 180;
    } else if (st.legKm > 25) {
      minFareSum += 600;
      maxFareSum += 1200;
    } else if (st.legKm > 10) {
      minFareSum += 250;
      maxFareSum += 450;
    } else {
      minFareSum += 25;
      maxFareSum += 60;
    }
  });

  const fareEstimateRange =
    stops.length === 0
      ? (lang === 'en' ? '0 BDT' : '০ টাকা')
      : `৳${minFareSum} - ৳${maxFareSum}`;

  return {
    hotel: {
      id: selectedHotel.id,
      name: selectedHotel.name[lang],
      image: selectedHotel.image || 'assets/images/hotel-sea-crown.jpg',
      zone: hotelCoords.zone[lang],
      lat: hotelCoords.lat,
      lng: hotelCoords.lng
    },
    stops,
    polylinePoints,
    totalKm: +totalKm.toFixed(1),
    totalMinutes,
    fareEstimateRange
  };
}

function createNumberedRoutePin(badgeText, bgColor, isHotel) {
  const size = isHotel ? 36 : 30;
  const pinClass = isHotel ? 'pin-stay' : 'pin-spot';
  return L.divIcon({
    className: 'custom-minimal-leaflet-icon',
    html: `
      <div
        class="minimal-pin ${pinClass} font-mono font-bold text-white flex items-center justify-center shadow-md"
        style="width:${size}px;height:${size}px;background:${isHotel ? '#0B2135' : '#C86446'};font-size:11px;"
      >
        ${badgeText}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
}

function initTouristMap() {
  const mapEl = document.getElementById('coxs-bazar-map');
  if (!mapEl || typeof L === 'undefined') return;

  if (!FeaturesState.mapInstance) {
    FeaturesState.mapInstance = L.map('coxs-bazar-map', {
      scrollWheelZoom: false
    }).setView([COXS_BAZAR_CENTER.lat, COXS_BAZAR_CENTER.lng], COXS_BAZAR_CENTER.zoom);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
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

function setMapFilter(filterKey) {
  FeaturesState.activeMapFilter = filterKey;
  if (filterKey.startsWith('day-')) {
    const dayNum = parseInt(filterKey.replace('day-', ''), 10);
    if (dayNum >= 1 && dayNum <= FeaturesState.totalDays) {
      FeaturesState.activeDayTab = dayNum;
    }
  }
  renderItineraryStudio();
  renderMapMarkersAndFilters();
}

function toggleMapRouteSpot(dayNum, spotId) {
  const normId = normalizeSpotId(spotId);
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj) return;

  dayObj.spots = dayObj.spots.map(normalizeSpotId);
  const existingIdx = dayObj.spots.indexOf(normId);
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const allSpots = getUnifiedWebsiteSpots();
  const spotObj = allSpots.find(s => normalizeSpotId(s.id) === normId);
  const spotLabel = spotObj ? spotObj.name[lang] : normId;

  if (existingIdx >= 0) {
    dayObj.spots.splice(existingIdx, 1);
    showUserToast(
      lang === 'en'
        ? `Removed "${spotLabel}" from Day ${dayNum} route.`
        : `দিন ${dayNum}-এর রুট থেকে "${spotLabel}" সরানো হয়েছে।`
    );
  } else {
    dayObj.spots.push(normId);
    showUserToast(
      lang === 'en'
        ? `Added "${spotLabel}" as Stop #${dayObj.spots.length} on Day ${dayNum}!`
        : `"${spotLabel}" দিন ${dayNum}-এর স্টপ #${dayObj.spots.length} হিসেবে যুক্ত হয়েছে!`
    );
  }

  FeaturesState.activeMapFilter = `day-${dayNum}`;
  FeaturesState.activeDayTab = dayNum;
  renderItineraryStudio();
  renderMapMarkersAndFilters();
}

function moveMapRouteSpot(dayNum, spotIndex, direction) {
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj) return;
  dayObj.spots = dayObj.spots.map(normalizeSpotId);

  const targetIndex = spotIndex + direction;
  if (targetIndex < 0 || targetIndex >= dayObj.spots.length) return;

  const temp = dayObj.spots[spotIndex];
  dayObj.spots[spotIndex] = dayObj.spots[targetIndex];
  dayObj.spots[targetIndex] = temp;

  renderItineraryStudio();
  renderMapMarkersAndFilters();
}

function optimizeDayRouteOrder(dayNum) {
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj || dayObj.spots.length < 2) return;

  dayObj.spots = dayObj.spots
    .map(normalizeSpotId)
    .sort((a, b) => {
      const wA = SPOT_ROUTE_METADATA[a] ? SPOT_ROUTE_METADATA[a].orderWeight : 50;
      const wB = SPOT_ROUTE_METADATA[b] ? SPOT_ROUTE_METADATA[b].orderWeight : 50;
      return wA - wB;
    });

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  showUserToast(
    lang === 'en'
      ? `Optimized Day ${dayNum} route order for minimum travel time!`
      : `কম সময়ে ভ্রমণের জন্য দিন ${dayNum}-এর রুট অটো-অপ্টিমাইজ করা হয়েছে!`
  );

  renderItineraryStudio();
  renderMapMarkersAndFilters();
}

function clearDayRouteSpots(dayNum) {
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj) return;
  dayObj.spots = [];

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  showUserToast(
    lang === 'en'
      ? `Cleared Day ${dayNum} route. Tap locations above to build your route!`
      : `দিন ${dayNum}-এর রুট খালি করা হয়েছে। নতুন লোকেশন সিলেক্ট করুন!`
  );

  renderItineraryStudio();
  renderMapMarkersAndFilters();
}

function applyRoutePreset(dayNum, presetKey) {
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj) return;

  const presets = {
    'marine-drive': ['himchari-national-park', 'inani-beach', 'shamlapur-sunset-point'],
    'beach-town': ['spot-laboni-sugandha', 'radiant-fish-world', 'kolatoli-eco-park'],
    'islands': ['moheshkhali-island', 'sonadia-island', 'najirartek-dried-fish-hub'],
    'heritage': ['100-feet-buddha-ramu', 'spot-laboni-sugandha']
  };

  const selectedSpots = presets[presetKey] || presets['marine-drive'];
  dayObj.spots = [...selectedSpots];

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const presetNames = {
    'marine-drive': lang === 'en' ? 'South Marine Drive Safari' : 'মেরিন ড্রাইভ সাফারি',
    'beach-town': lang === 'en' ? 'Main Beach & Town Life' : 'প্রধান সৈকত ও শহর দর্শন',
    'islands': lang === 'en' ? 'Island Hopping Adventure' : 'দ্বীপ ভ্রমণ অ্যাডভেঞ্চার',
    'heritage': lang === 'en' ? 'Ramu Buddhist Heritage' : 'রামু ঐতিহ্য ও বৌদ্ধ বিহার'
  };

  showUserToast(
    lang === 'en'
      ? `Applied "${presetNames[presetKey] || presetKey}" preset to Day ${dayNum}!`
      : `দিন ${dayNum}-এ "${presetNames[presetKey] || presetKey}" রুট সেট করা হয়েছে!`
  );

  renderItineraryStudio();
  renderMapMarkersAndFilters();
}

function setSpotShelfCorridor(corridorKey) {
  FeaturesState.activeSpotShelfCorridor = corridorKey;
  renderMapMarkersAndFilters();
}

function scrollSpotShelf(direction) {
  const track = document.getElementById('map-spot-shelf-track');
  if (!track) return;
  track.scrollBy({ left: direction * 280, behavior: 'smooth' });
}

function focusMapLocation(spotOrHotelId) {
  if (!FeaturesState.mapInstance || !FeaturesState.markerLayerGroup) return;
  const normId = normalizeSpotId(spotOrHotelId);

  let targetLat = null;
  let targetLng = null;

  if (HOTEL_ROUTE_COORDS[normId]) {
    targetLat = HOTEL_ROUTE_COORDS[normId].lat;
    targetLng = HOTEL_ROUTE_COORDS[normId].lng;
  } else if (SPOT_ROUTE_METADATA[normId]) {
    targetLat = SPOT_ROUTE_METADATA[normId].lat;
    targetLng = SPOT_ROUTE_METADATA[normId].lng;
  }

  if (targetLat !== null && targetLng !== null) {
    FeaturesState.mapInstance.flyTo([targetLat, targetLng], 13, { duration: 0.85 });
  }

  FeaturesState.markerLayerGroup.eachLayer(layer => {
    if (layer._customLocationId === normId) {
      layer.openPopup();
    }
  });
}

function formatDurationMinutes(totalMins, lang) {
  if (totalMins <= 0) return lang === 'en' ? '0 mins' : '০ মিনিট';
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hrs > 0 && mins > 0) {
    return lang === 'en' ? `${hrs}h ${mins}m` : `${hrs} ঘণ্টা ${mins} মিনিট`;
  }
  if (hrs > 0) {
    return lang === 'en' ? `${hrs} hr` : `${hrs} ঘণ্টা`;
  }
  return lang === 'en' ? `${mins} mins` : `${mins} মিনিট`;
}

function renderMapMarkersAndFilters() {
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const filterBar = document.getElementById('map-category-filters');
  const selectorPanel = document.getElementById('map-day-spot-selector');
  const routeTimelineEl = document.getElementById('map-locations-quicklist');

  if (
    !FeaturesState.activeMapFilter ||
    (!FeaturesState.activeMapFilter.startsWith('day-') && FeaturesState.activeMapFilter !== 'all-days')
  ) {
    FeaturesState.activeMapFilter = `day-${FeaturesState.activeDayTab || 1}`;
  }
  if (FeaturesState.activeMapFilter.startsWith('day-')) {
    const parsedDay = parseInt(FeaturesState.activeMapFilter.replace('day-', ''), 10);
    if (parsedDay > FeaturesState.totalDays) {
      FeaturesState.activeMapFilter = `day-${FeaturesState.totalDays}`;
    }
  }

  const isAllDaysMode = FeaturesState.activeMapFilter === 'all-days';
  const activeDayNum = isAllDaysMode
    ? FeaturesState.activeDayTab || 1
    : parseInt(FeaturesState.activeMapFilter.replace('day-', ''), 10) || 1;

  const activeDayObj =
    FeaturesState.daysPlan.find(d => d.dayNumber === activeDayNum) || FeaturesState.daysPlan[0];
  if (activeDayObj) {
    activeDayObj.spots = activeDayObj.spots.map(normalizeSpotId);
  }

  // 1. RENDER TOP DAY TABS & ROUTE ACTIONS
  if (filterBar) {
    const dayButtonsHTML = Array.from({ length: FeaturesState.totalDays }, (_, idx) => {
      const dNum = idx + 1;
      const dObj = FeaturesState.daysPlan.find(d => d.dayNumber === dNum);
      const stopCount = dObj ? dObj.spots.length : 0;
      const isSelected = !isAllDaysMode && activeDayNum === dNum;
      const dotColor = DAY_ROUTE_COLORS[idx % DAY_ROUTE_COLORS.length];

      return `
        <button
          type="button"
          onclick="setMapFilter('day-${dNum}')"
          class="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
            isSelected
              ? 'bg-ocean-950 text-white shadow-md scale-105 border-2 border-amber-400'
              : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
          }"
        >
          <span class="w-2.5 h-2.5 rounded-full" style="background:${dotColor};"></span>
          <span>${lang === 'en' ? `Day ${dNum}` : `দিন ${dNum}`}</span>
          <span class="px-1.5 py-0.5 rounded-full text-[10px] ${
            isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
          }">
            ${stopCount} ${lang === 'en' ? 'Stops' : 'স্পট'}
          </span>
        </button>
      `;
    }).join('');

    filterBar.innerHTML = `
      ${dayButtonsHTML}
      <button
        type="button"
        onclick="setMapFilter('all-days')"
        class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
          isAllDaysMode
            ? 'bg-teal-600 text-white shadow-md scale-105'
            : 'bg-white text-teal-800 hover:bg-teal-50 border border-teal-200'
        }"
      >
        <span>🗺️</span>
        <span>${lang === 'en' ? 'All Days Overview' : 'সব দিনের রুট'}</span>
      </button>
    `;
  }

  // 2. RENDER INTERACTIVE LOCATION PICKER FOR ACTIVE DAY (SLEEK HORIZONTAL SHELF)
  const allSpotsRaw = getUnifiedWebsiteSpots();
  const seenSpotIds = new Set();
  const allSpots = [];
  for (const sp of allSpotsRaw) {
    const norm = normalizeSpotId(sp.id);
    if (!seenSpotIds.has(norm)) {
      seenSpotIds.add(norm);
      allSpots.push(sp);
    }
  }

  const hotelsList = typeof HOTELS_DATA !== 'undefined' ? HOTELS_DATA : [];
  const activeDayColor = DAY_ROUTE_COLORS[(activeDayNum - 1) % DAY_ROUTE_COLORS.length];
  const activeCorridor = FeaturesState.activeSpotShelfCorridor || 'all';

  if (selectorPanel) {
    const hotelOptionsHTML = hotelsList
      .map(
        h => `
        <option value="${h.id}" ${FeaturesState.selectedHotelId === h.id ? 'selected' : ''}>
          🏨 ${h.name[lang]} (${h.locationKey})
        </option>
      `
      )
      .join('');

    const corridorFilters = [
      { key: 'all', label: { en: 'All Places', bn: 'সকল স্থান' }, icon: '✨' },
      { key: 'beach_town', label: { en: 'Town Beaches', bn: 'প্রধান সৈকত' }, icon: '🏖️' },
      { key: 'marine_drive', label: { en: 'Marine Drive & Hills', bn: 'মেরিন ড্রাইভ' }, icon: '🛣️' },
      { key: 'island_estuary', label: { en: 'Islands & Estuary', bn: 'দ্বীপ ও মোহনা' }, icon: '🏝️' },
      { key: 'ramu_east', label: { en: 'Heritage & Temples', bn: 'ঐতিহ্য ও বিহার' }, icon: '🛕' }
    ];

    const corridorPillsHTML = corridorFilters
      .map(cf => {
        const isActive = activeCorridor === cf.key;
        const count =
          cf.key === 'all'
            ? allSpots.length
            : allSpots.filter(s => {
                const meta = SPOT_ROUTE_METADATA[normalizeSpotId(s.id)];
                return meta && meta.corridor === cf.key;
              }).length;

        return `
          <button
            type="button"
            onclick="setSpotShelfCorridor('${cf.key}')"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? 'bg-ocean-950 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }"
          >
            <span>${cf.icon}</span>
            <span>${cf.label[lang]}</span>
            <span class="text-[10px] opacity-75">(${count})</span>
          </button>
        `;
      })
      .join('');

    // Filter spots by active corridor
    const displayedSpots = allSpots.filter(spot => {
      if (activeCorridor === 'all') return true;
      const meta = SPOT_ROUTE_METADATA[normalizeSpotId(spot.id)];
      return meta && meta.corridor === activeCorridor;
    });

    const spotCardsHTML = displayedSpots
      .map(spot => {
        const normId = normalizeSpotId(spot.id);
        const stopIndex = activeDayObj ? activeDayObj.spots.indexOf(normId) : -1;
        const isPicked = stopIndex >= 0;
        const meta = SPOT_ROUTE_METADATA[normId];
        const corridorText = meta ? meta.corridorLabel[lang] : '';

        return `
          <div
            onclick="toggleMapRouteSpot(${activeDayNum}, '${normId}')"
            class="group relative flex flex-col justify-between p-2.5 rounded-2xl border-2 transition-all cursor-pointer w-[220px] sm:w-[240px] shrink-0 snap-start bg-white select-none ${
              isPicked
                ? 'border-teal-500 bg-teal-50/50 shadow-xs ring-2 ring-teal-400/20'
                : 'border-slate-200/90 hover:border-sky-300 hover:shadow-xs'
            }"
          >
            <div class="flex items-center gap-2.5 mb-2">
              <div class="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src="${spot.image}"
                  alt="${spot.name[lang]}"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                ${
                  isPicked
                    ? `<span class="absolute inset-0 bg-teal-900/75 text-white font-black text-xs flex items-center justify-center">
                        #${stopIndex + 1}
                      </span>`
                    : ''
                }
              </div>
              <div class="min-w-0 flex-1">
                <span class="block text-[9px] font-black uppercase tracking-wider ${
                  isPicked ? 'text-teal-700' : 'text-slate-400'
                } truncate">
                  ${
                    isPicked
                      ? lang === 'en'
                        ? `✓ Stop #${stopIndex + 1}`
                        : `✓ স্টপ #${stopIndex + 1}`
                      : corridorText
                  }
                </span>
                <h4 class="font-extrabold text-xs text-slate-900 group-hover:text-ocean-900 leading-snug line-clamp-1">
                  ${spot.name[lang]}
                </h4>
              </div>
            </div>

            <div class="flex items-center justify-between gap-1.5 pt-1.5 border-t border-slate-100">
              <span class="text-[10px] font-semibold text-slate-500 truncate">
                ${corridorText || (lang === 'en' ? 'Scenic Spot' : 'দর্শনীয় স্থান')}
              </span>
              <button
                type="button"
                class="px-2 py-0.5 rounded-lg text-[10px] font-black transition pointer-events-none ${
                  isPicked
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 text-slate-700 group-hover:bg-sky-100 group-hover:text-sky-900'
                }"
              >
                ${isPicked ? (lang === 'en' ? 'Added' : 'যুক্ত') : (lang === 'en' ? '+ Add' : '+ যোগ')}
              </button>
            </div>
          </div>
        `;
      })
      .join('');

    selectorPanel.innerHTML = `
      <!-- Shelf Dock Header: Day Badge, Hotel, Presets, Auto-Optimize -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-white shadow-2xs"
            style="background:${activeDayColor};"
          >
            🗓️ ${lang === 'en' ? `Day ${activeDayNum} Route Planner` : `দিন ${activeDayNum}-এর রুট প্ল্যান`}
          </span>
          <span class="text-xs font-semibold text-slate-500 hidden sm:inline">
            ${
              lang === 'en'
                ? 'Tap spots from the shelf below to automatically map your road route:'
                : 'রোড রুট ও সময় দেখতে নিচের শেলফ থেকে স্থান সিলেক্ট করুন:'
            }
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <!-- Starting Hotel Dropdown -->
          <div class="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/70 transition px-2.5 py-1.5 rounded-xl border border-slate-200">
            <span class="text-[10px] font-black uppercase text-slate-500">
              🏨 ${lang === 'en' ? 'Start:' : 'বেস:'}
            </span>
            <select
              aria-label="Select Starting Hotel"
              onchange="selectItineraryHotel(this.value, false)"
              class="bg-transparent text-xs font-extrabold text-ocean-950 focus:outline-none cursor-pointer max-w-[150px] sm:max-w-none"
            >
              ${hotelOptionsHTML}
            </select>
          </div>

          <!-- 1-Click Route Presets Dropdown -->
          <div class="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-xl">
            <span class="text-[10px] font-black uppercase text-amber-900">
              ✨ ${lang === 'en' ? 'Preset:' : 'প্রিসেট:'}
            </span>
            <select
              aria-label="1-Click Route Presets"
              onchange="if(this.value){ applyRoutePreset(${activeDayNum}, this.value); this.selectedIndex=0; }"
              class="bg-transparent text-xs font-extrabold text-amber-950 focus:outline-none cursor-pointer"
            >
              <option value="">${lang === 'en' ? '⚡ 1-Click Presets...' : '⚡ ১-ক্লিক প্রিসেট...'}</option>
              <option value="marine-drive">🌊 ${lang === 'en' ? 'South Marine Drive' : 'মেরিন ড্রাইভ সাফারি'}</option>
              <option value="beach-town">🏖️ ${lang === 'en' ? 'Town Beaches & Walk' : 'প্রধান সৈকত ও শহর'}</option>
              <option value="islands">🏝️ ${lang === 'en' ? 'Island Hopping' : 'মহেশখালী-সোনাদিয়া'}</option>
              <option value="heritage">🛕 ${lang === 'en' ? 'Ramu Heritage' : 'রামু ঐতিহ্য ও বিহার'}</option>
            </select>
          </div>

          <!-- Auto-Optimize Button -->
          <button
            type="button"
            onclick="optimizeDayRouteOrder(${activeDayNum})"
            class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition cursor-pointer shadow-2xs"
            title="${lang === 'en' ? 'Sort spots logically by travel distance' : 'দূরত্ব অনুযায়ী স্পট সাজান'}"
          >
            <span>⚡</span>
            <span>${lang === 'en' ? 'Auto-Sort' : 'অটো-সর্ট'}</span>
          </button>

          <!-- Reset Day Button -->
          <button
            type="button"
            onclick="clearDayRouteSpots(${activeDayNum})"
            class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 transition cursor-pointer"
            title="${lang === 'en' ? 'Clear all spots for this day' : 'সব স্পট সরান'}"
          >
            <span>↺</span>
            <span>${lang === 'en' ? 'Reset' : 'রিসেট'}</span>
          </button>
        </div>
      </div>

      <!-- Corridor Filter Pills Bar + Horizontal Shelf Navigation -->
      <div class="flex items-center justify-between gap-2 mb-2.5">
        <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1">
          ${corridorPillsHTML}
        </div>

        <div class="hidden sm:flex items-center gap-1 shrink-0 ml-2">
          <button
            type="button"
            onclick="scrollSpotShelf(-1)"
            class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
            title="${lang === 'en' ? 'Scroll Left' : 'বামে স্ক্রোল'}"
          >
            ‹
          </button>
          <button
            type="button"
            onclick="scrollSpotShelf(1)"
            class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
            title="${lang === 'en' ? 'Scroll Right' : 'ডানে স্ক্রোল'}"
          >
            ›
          </button>
        </div>
      </div>

      <!-- Horizontal Carousel Shelf Track -->
      <div
        id="map-spot-shelf-track"
        class="flex items-stretch gap-3 overflow-x-auto pb-1.5 pt-0.5 scroll-smooth snap-x snap-mandatory"
        style="scrollbar-width: thin;"
      >
        ${spotCardsHTML}
      </div>
    `;
  }

  // 3. DRAW ROUTE LINES & NUMBERED PINS ON LEAFLET MAP + RENDER GENERATED TIMELINE
  if (!FeaturesState.markerLayerGroup || !FeaturesState.mapInstance) return;
  FeaturesState.markerLayerGroup.clearLayers();

  const bounds = [];
  const activeRoute = buildDayRouteData(activeDayObj, lang);

  // Always add Starting Base Hotel Marker
  const hotelMarker = L.marker([activeRoute.hotel.lat, activeRoute.hotel.lng], {
    icon: createNumberedRoutePin('🏨', '#072138', true),
    zIndexOffset: 1000
  });
  hotelMarker._customLocationId = activeRoute.hotel.id;
  hotelMarker.bindPopup(`
    <div class="font-sans">
      <div class="relative h-24 bg-slate-200">
        <img src="${activeRoute.hotel.image}" alt="${activeRoute.hotel.name}" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"></div>
        <span class="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase">
          ${lang === 'en' ? 'START / BASE HOTEL' : 'যাত্রা শুরু / বেস হোটেল'}
        </span>
      </div>
      <div class="p-3">
        <h4 class="font-extrabold text-slate-900 text-sm">${activeRoute.hotel.name}</h4>
        <p class="text-xs text-slate-600 mt-0.5">${activeRoute.hotel.zone}</p>
      </div>
    </div>
  `);
  FeaturesState.markerLayerGroup.addLayer(hotelMarker);
  bounds.push([activeRoute.hotel.lat, activeRoute.hotel.lng]);

  if (isAllDaysMode) {
    const activeDaysList = FeaturesState.daysPlan.slice(0, FeaturesState.totalDays);
    activeDaysList.forEach((dObj, dIdx) => {
      const dRoute = buildDayRouteData(dObj, lang);
      const color = DAY_ROUTE_COLORS[dIdx % DAY_ROUTE_COLORS.length];

      if (dRoute.polylinePoints.length > 1) {
        L.polyline(dRoute.polylinePoints, {
          color,
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 6'
        }).addTo(FeaturesState.markerLayerGroup);
      }

      dRoute.stops.forEach(st => {
        const m = L.marker([st.lat, st.lng], {
          icon: createNumberedRoutePin(`D${dObj.dayNumber}`, color, false)
        });
        m._customLocationId = st.spotId;
        m.bindPopup(`
          <div class="font-sans p-3">
            <span class="inline-block px-2 py-0.5 rounded text-white text-[10px] font-extrabold uppercase" style="background:${color};">
              ${lang === 'en' ? `Day ${dObj.dayNumber} • Stop #${st.stopNumber}` : `দিন ${dObj.dayNumber} • স্টপ #${st.stopNumber}`}
            </span>
            <h4 class="font-extrabold text-slate-900 text-sm mt-1">${st.name}</h4>
            <p class="text-xs text-slate-600 mt-1">${st.legKm} km • ~${st.legMinutes} mins (${st.vehicle})</p>
          </div>
        `);
        FeaturesState.markerLayerGroup.addLayer(m);
        bounds.push([st.lat, st.lng]);
      });
    });
  } else {
    if (activeRoute.polylinePoints.length > 1) {
      L.polyline(activeRoute.polylinePoints, {
        color: activeDayColor,
        weight: 10,
        opacity: 0.22,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(FeaturesState.markerLayerGroup);

      L.polyline(activeRoute.polylinePoints, {
        color: activeDayColor,
        weight: 4,
        opacity: 0.95,
        dashArray: '10, 8',
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(FeaturesState.markerLayerGroup);
    }

    const hasIslandStop = activeRoute.stops.some(s => s.requiresBoat);
    if (hasIslandStop) {
      const jettyMarker = L.marker([KASTURI_GHAT_JETTY.lat, KASTURI_GHAT_JETTY.lng], {
        icon: createNumberedRoutePin('🚤', '#d97706', false)
      });
      jettyMarker.bindPopup(`
        <div class="font-sans p-3">
          <span class="px-2 py-0.5 rounded bg-amber-500 text-white text-[10px] font-bold uppercase">
            ${lang === 'en' ? 'Boat Transfer Jetty' : 'স্পিডবোট পারাপার ঘাট'}
          </span>
          <h4 class="font-extrabold text-slate-900 text-sm mt-1">${KASTURI_GHAT_JETTY.name[lang]}</h4>
          <p class="text-xs text-slate-600 mt-1">
            ${
              lang === 'en'
                ? 'Board 35-min speedboat or wooden trawler here for Moheshkhali / Sonadia Island.'
                : 'এখান থেকে স্পিডবোট বা ট্রলারে মহেশখালী ও সোনাদিয়া দ্বীপে পারাপার করা হয়।'
            }
          </p>
        </div>
      `);
      FeaturesState.markerLayerGroup.addLayer(jettyMarker);
      bounds.push([KASTURI_GHAT_JETTY.lat, KASTURI_GHAT_JETTY.lng]);
    }

    activeRoute.stops.forEach(st => {
      const stopMarker = L.marker([st.lat, st.lng], {
        icon: createNumberedRoutePin(`${st.stopNumber}`, activeDayColor, false)
      });
      stopMarker._customLocationId = st.spotId;

      stopMarker.bindPopup(`
        <div class="font-sans">
          <div class="relative h-28 bg-slate-200">
            <img src="${st.image}" alt="${st.name}" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent"></div>
            <span class="absolute bottom-2 left-3 px-2 py-0.5 rounded text-white text-[10px] font-extrabold uppercase" style="background:${activeDayColor};">
              ${lang === 'en' ? `Day ${activeDayNum} • Stop #${st.stopNumber}` : `দিন ${activeDayNum} • স্টপ #${st.stopNumber}`}
            </span>
          </div>
          <div class="p-3.5">
            <h4 class="font-extrabold text-slate-900 text-sm">${st.name}</h4>
            <p class="text-xs font-semibold text-teal-700 mt-1">
              🚗 ${st.legKm} km • ~${st.legMinutes} mins
            </p>
            <p class="text-[11px] text-slate-600 mt-0.5">${st.vehicle}</p>
          </div>
        </div>
      `);

      FeaturesState.markerLayerGroup.addLayer(stopMarker);
      bounds.push([st.lat, st.lng]);
    });
  }

  if (bounds.length > 1) {
    FeaturesState.mapInstance.fitBounds(bounds, { padding: [45, 45], maxZoom: 13 });
  } else if (bounds.length === 1) {
    FeaturesState.mapInstance.setView(bounds[0], 13);
  }

  // Update Floating Status Overlay on Leaflet Map
  const floatingStatusEl = document.getElementById('map-floating-status-text');
  if (floatingStatusEl) {
    if (isAllDaysMode) {
      floatingStatusEl.textContent =
        lang === 'en'
          ? `All Days Overview (${FeaturesState.totalDays} Days)`
          : `সব দিনের রুট ওভারভিউ (${FeaturesState.totalDays} দিন)`;
    } else if (activeRoute.stops.length > 0) {
      floatingStatusEl.textContent =
        lang === 'en'
          ? `Day ${activeDayNum}: ${activeRoute.stops.length} Stops • ${activeRoute.totalKm} km • ~${formatDurationMinutes(activeRoute.totalMinutes, lang)}`
          : `দিন ${activeDayNum}: ${activeRoute.stops.length}টি স্পট • ${activeRoute.totalKm} কিমি • ~${formatDurationMinutes(activeRoute.totalMinutes, lang)}`;
    } else {
      floatingStatusEl.textContent =
        lang === 'en'
          ? `Day ${activeDayNum}: Tap spots in the shelf to create route`
          : `দিন ${activeDayNum}: রুট তৈরি করতে উপরের স্পট যোগ করুন`;
    }
  }

  // 4. RENDER RIGHT SIDEBAR: GENERATED ROUTE PLAN TIMELINE
  if (!routeTimelineEl) return;

  if (isAllDaysMode) {
    const activeDaysList = FeaturesState.daysPlan.slice(0, FeaturesState.totalDays);
    const allDaysCards = activeDaysList
      .map((dObj, idx) => {
        const dRoute = buildDayRouteData(dObj, lang);
        const color = DAY_ROUTE_COLORS[idx % DAY_ROUTE_COLORS.length];
        const chainText =
          dRoute.stops.length > 0
            ? `${dRoute.hotel.name} → ` + dRoute.stops.map(s => s.name).join(' → ')
            : lang === 'en'
            ? 'No locations selected yet'
            : 'এখনো কোনো লোকেশন সিলেক্ট করা হয়নি';

        return `
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-sky-300 transition">
            <div class="flex items-center justify-between gap-2 mb-1.5">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold text-white" style="background:${color};">
                ${lang === 'en' ? `Day ${dObj.dayNumber}` : `দিন ${dObj.dayNumber}`}
              </span>
              <span class="text-xs font-extrabold text-slate-700">
                ${dRoute.totalKm} km • ~${formatDurationMinutes(dRoute.totalMinutes, lang)}
              </span>
            </div>
            <p class="text-xs font-semibold text-slate-800 leading-relaxed">${chainText}</p>
            <button
              type="button"
              onclick="setMapFilter('day-${dObj.dayNumber}')"
              class="mt-2 text-[11px] font-extrabold text-sky-700 hover:underline cursor-pointer"
            >
              ${lang === 'en' ? `Customize Day ${dObj.dayNumber} Route →` : `দিন ${dObj.dayNumber}-এর রুট সাজান →`}
            </button>
          </div>
        `;
      })
      .join('');

    routeTimelineEl.innerHTML = `
      <div class="bg-ocean-950 text-white rounded-2xl p-4">
        <span class="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
          ${lang === 'en' ? 'COMPLETE MULTI-DAY ROUTE OVERVIEW' : 'সম্পূর্ণ ভ্রমণ রুট ওভারভিউ'}
        </span>
        <h4 class="text-base font-extrabold mt-0.5">
          ${lang === 'en' ? `${FeaturesState.totalDays}-Day Cox’s Bazar Route Plan` : `${FeaturesState.totalDays} দিনের কক্সবাজার রুট প্ল্যান`}
        </h4>
      </div>
      <div class="space-y-2.5">${allDaysCards}</div>
    `;
    return;
  }

  const stopsTimelineHTML =
    activeRoute.stops.length === 0
      ? `
        <div class="p-5 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center">
          <div class="w-10 h-10 mx-auto rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-lg mb-2">🗺️</div>
          <h4 class="font-extrabold text-sm text-slate-800">
            ${lang === 'en' ? `Day ${activeDayNum} has no locations yet` : `দিন ${activeDayNum}-এ কোনো স্থান যুক্ত করা হয়নি`}
          </h4>
          <p class="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            ${
              lang === 'en'
                ? 'Tap any card in the shelf above, or pick a 1-click route below:'
                : 'উপরের শেলফ থেকে স্থান বেছে নিন অথবা নিচের রেডি রুট ক্লিক করুন:'
            }
          </p>
          <div class="flex flex-wrap items-center justify-center gap-2 mt-3.5">
            <button
              type="button"
              onclick="applyRoutePreset(${activeDayNum}, 'marine-drive')"
              class="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 shadow-2xs hover:bg-amber-50 cursor-pointer"
            >
              🌊 ${lang === 'en' ? 'Marine Drive Safari' : 'মেরিন ড্রাইভ সাফারি'}
            </button>
            <button
              type="button"
              onclick="applyRoutePreset(${activeDayNum}, 'beach-town')"
              class="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 shadow-2xs hover:bg-amber-50 cursor-pointer"
            >
              🏖️ ${lang === 'en' ? 'Town Beaches' : 'প্রধান সৈকত ও শহর'}
            </button>
            <button
              type="button"
              onclick="applyRoutePreset(${activeDayNum}, 'islands')"
              class="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 text-xs font-bold text-slate-800 shadow-2xs hover:bg-amber-50 cursor-pointer"
            >
              🏝️ ${lang === 'en' ? 'Island Hopping' : 'দ্বীপ ভ্রমণ'}
            </button>
          </div>
        </div>
      `
      : activeRoute.stops
          .map(
            (st, idx) => `
          <!-- Leg Connector Pill -->
          <div class="pl-4 py-1 flex items-center gap-2 text-[11px] font-bold text-teal-900">
            <div class="w-0.5 h-6 rounded-full" style="background:${activeDayColor};"></div>
            <div class="bg-teal-50/80 border border-teal-200/80 px-2.5 py-1 rounded-xl flex flex-wrap items-center gap-1.5 shadow-2xs">
              <span>↓ <strong>${st.legKm} km</strong></span>
              <span class="text-slate-400">•</span>
              <span>~${st.legMinutes} ${lang === 'en' ? 'mins' : 'মিনিট'}</span>
              <span class="text-slate-400">•</span>
              <span class="text-slate-700">${st.vehicle}</span>
            </div>
          </div>

          <!-- Stop Card -->
          <div class="p-3 rounded-2xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200/90 transition flex items-center justify-between gap-2.5">
            <div
              onclick="focusMapLocation('${st.spotId}')"
              class="flex items-center gap-2.5 min-w-0 flex-1 cursor-pointer"
            >
              <span
                class="w-7 h-7 rounded-full text-white font-black text-xs flex items-center justify-center shrink-0 shadow-2xs"
                style="background:${activeDayColor};"
              >
                ${st.stopNumber}
              </span>
              <img src="${st.image}" alt="${st.name}" class="w-11 h-11 rounded-xl object-cover shrink-0 bg-slate-200" />
              <div class="min-w-0 flex-1">
                <span class="block text-[10px] font-black uppercase tracking-wider text-slate-400 truncate">
                  ${st.corridorLabel}
                </span>
                <h5 class="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug truncate">
                  ${st.name}
                </h5>
              </div>
            </div>

            <!-- Reorder & Remove Controls -->
            <div class="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onclick="moveMapRouteSpot(${activeDayNum}, ${idx}, -1)"
                ${idx === 0 ? 'disabled' : ''}
                title="${lang === 'en' ? 'Move Up' : 'উপরে নিন'}"
                class="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-sky-50 text-xs font-black disabled:opacity-25 cursor-pointer"
              >
                ↑
              </button>
              <button
                type="button"
                onclick="moveMapRouteSpot(${activeDayNum}, ${idx}, 1)"
                ${idx === activeRoute.stops.length - 1 ? 'disabled' : ''}
                title="${lang === 'en' ? 'Move Down' : 'নিচে নিন'}"
                class="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-sky-50 text-xs font-black disabled:opacity-25 cursor-pointer"
              >
                ↓
              </button>
              <button
                type="button"
                onclick="toggleMapRouteSpot(${activeDayNum}, '${st.spotId}')"
                title="${lang === 'en' ? 'Remove Stop' : 'সরিয়ে ফেলুন'}"
                class="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 text-xs font-black cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        `
          )
          .join('');

  routeTimelineEl.innerHTML = `
    <!-- Route Summary Header Card -->
    <div class="bg-gradient-to-r from-ocean-950 via-ocean-900 to-teal-900 text-white rounded-2xl p-4 shadow-sm">
      <div class="flex items-center justify-between gap-2">
        <span
          class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-950"
          style="background:${activeDayColor};"
        >
          ${lang === 'en' ? `DAY ${activeDayNum} ROUTE PLAN` : `দিন ${activeDayNum}-এর রুট প্ল্যান`}
        </span>
        <span class="text-xs font-bold text-teal-200">
          ${activeRoute.stops.length} ${lang === 'en' ? 'Stops Selected' : 'টি স্পট'}
        </span>
      </div>

      <div class="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/15 text-center sm:text-left">
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-sky-200/80 font-bold">
            ${lang === 'en' ? 'Distance' : 'দূরত্ব'}
          </span>
          <span class="text-base sm:text-lg font-black text-amber-300">${activeRoute.totalKm} km</span>
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-sky-200/80 font-bold">
            ${lang === 'en' ? 'Transit' : 'যাতায়াত'}
          </span>
          <span class="text-base sm:text-lg font-black text-teal-300">
            ~${formatDurationMinutes(activeRoute.totalMinutes, lang)}
          </span>
        </div>
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-sky-200/80 font-bold">
            ${lang === 'en' ? 'Est. Fare' : 'ভাড়া'}
          </span>
          <span class="text-xs sm:text-sm font-black text-emerald-300 leading-tight block mt-0.5">
            ${activeRoute.fareEstimateRange}
          </span>
        </div>
      </div>
    </div>

    <!-- Starting Base Hotel Card -->
    <div
      onclick="focusMapLocation('${activeRoute.hotel.id}')"
      class="p-3 rounded-2xl bg-amber-50/90 border border-amber-300/80 flex items-center justify-between gap-2.5 cursor-pointer hover:bg-amber-100/70 transition shadow-2xs"
    >
      <div class="flex items-center gap-2.5 min-w-0">
        <span class="w-8 h-8 rounded-full bg-ocean-950 text-amber-300 font-extrabold text-sm flex items-center justify-center shrink-0 border-2 border-amber-400">
          🏨
        </span>
        <div class="min-w-0 flex-1">
          <span class="block text-[10px] font-black uppercase tracking-wider text-amber-800">
            ${lang === 'en' ? 'START POINT • BASE HOTEL' : 'যাত্রা শুরু • বেস হোটেল'}
          </span>
          <h5 class="font-black text-slate-900 text-xs sm:text-sm leading-snug truncate">
            ${activeRoute.hotel.name}
          </h5>
          <p class="text-[11px] text-slate-500 truncate">${activeRoute.hotel.zone}</p>
        </div>
      </div>
      <span class="text-[11px] font-extrabold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-lg shrink-0">
        📍 ${lang === 'en' ? 'Map' : 'ম্যাপ'}
      </span>
    </div>

    <!-- Step-by-Step Stops & Legs -->
    <div class="space-y-1">
      ${stopsTimelineHTML}
    </div>

    <!-- Sync Callout Button to Visual Itinerary Pass -->
    <div class="pt-2">
      <a
        href="#visual-itinerary-poster"
        class="w-full py-2.5 px-4 rounded-xl bg-ocean-950 hover:bg-sky-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 transition shadow-xs"
      >
        <span>✓ ${
          lang === 'en'
            ? `Synced with Day ${activeDayNum} Pass — View & Download Pass`
            : `দিন ${activeDayNum} পাসে যুক্ত হয়েছে — ভিজ্যুয়াল পাস দেখুন`
        }</span>
        <span>↓</span>
      </a>
    </div>
  `;
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

function setDayCategoryTab(tabKey) {
  FeaturesState.activeCategoryTab = tabKey;
  renderItineraryStudio();
}

function editDayFromPass(dayNum, catKey) {
  FeaturesState.activeDayTab = dayNum;
  FeaturesState.activeMapFilter = `day-${dayNum}`;
  if (catKey) {
    FeaturesState.activeCategoryTab = catKey;
  }
  renderItineraryStudio();
  renderMapMarkersAndFilters();
  document.getElementById('itinerary-studio-builder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setItineraryTotalDays(daysCount) {
  const count = Math.max(1, Math.min(7, parseInt(daysCount, 10) || 5));
  FeaturesState.totalDays = count;

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
    lang === 'en' ? `Trip set to ${count} Days (${count - 1} Nights)!` : `ভ্রমণ ${count} দিনে সেট করা হয়েছে!`
  );
  if (typeof renderItineraryStudio === 'function') {
    renderItineraryStudio();
  }
  if (typeof renderMapMarkersAndFilters === 'function' && FeaturesState.mapInstance) {
    renderMapMarkersAndFilters();
  }
  if (typeof composeSteppedItinerary === 'function') {
    composeSteppedItinerary(count, FeaturesState.tripVibe || 'relaxing');
  }
}

function setItineraryActiveDayTab(dayNum) {
  FeaturesState.activeDayTab = dayNum;
  FeaturesState.activeMapFilter = `day-${dayNum}`;
  renderItineraryStudio();
  renderMapMarkersAndFilters();
}

function selectItineraryHotel(hotelId, fromWebsiteCard) {
  FeaturesState.selectedHotelId = hotelId;
  renderItineraryStudio();
  renderMapMarkersAndFilters();
  if (typeof renderHotels === 'function') {
    renderHotels();
  }

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const hotel = (typeof HOTELS_DATA !== 'undefined' ? HOTELS_DATA : []).find(h => h.id === hotelId);
  const hotelName = hotel ? hotel.name[lang] : '';

  if (fromWebsiteCard) {
    showUserToast(
      lang === 'en'
        ? `${hotelName} selected as your starting hotel!`
        : `${hotelName} আপনার বেস হোটেল হিসেবে যুক্ত হয়েছে!`,
      lang === 'en' ? 'View Route Map →' : 'রুট ম্যাপ দেখুন →',
      '#map-section'
    );
  }
}

function addSpotFromWebsiteCard(spotId) {
  const normId = normalizeSpotId(spotId);
  const dayObj =
    FeaturesState.daysPlan.find(d => d.dayNumber === FeaturesState.activeDayTab) || FeaturesState.daysPlan[0];
  if (!dayObj) return;

  dayObj.spots = dayObj.spots.map(normalizeSpotId);
  if (!dayObj.spots.includes(normId)) {
    dayObj.spots.push(normId);
  }

  renderItineraryStudio();
  renderMapMarkersAndFilters();
  if (typeof renderDestinations === 'function') {
    renderDestinations();
  }

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const spot = getUnifiedWebsiteSpots().find(s => normalizeSpotId(s.id) === normId);
  const spotName = spot ? spot.name[lang] : '';

  showUserToast(
    lang === 'en'
      ? `Added "${spotName}" to Day ${dayObj.dayNumber} route & itinerary!`
      : `"${spotName}" দিন ${dayObj.dayNumber}-এর রুট ও প্ল্যানে যুক্ত হয়েছে!`,
    lang === 'en' ? 'View Route Map →' : 'রুট ম্যাপ দেখুন →',
    '#map-section'
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

  const targetId = listKey === 'spots' ? normalizeSpotId(itemId) : itemId;
  if (listKey === 'spots') {
    dayObj.spots = dayObj.spots.map(normalizeSpotId);
  }

  const idx = dayObj[listKey].indexOf(targetId);
  if (idx >= 0) {
    dayObj[listKey].splice(idx, 1);
  } else {
    dayObj[listKey].push(targetId);
  }

  renderItineraryStudio();
  if (listKey === 'spots') {
    renderMapMarkersAndFilters();
  }
}

function addCustomDayItem(dayNum) {
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj) return;

  const labelInput = document.getElementById(`custom-item-label-${dayNum}`);
  const costInput = document.getElementById(`custom-item-cost-${dayNum}`);
  const label = labelInput ? labelInput.value.trim() : '';
  const costBDT = costInput ? Math.max(0, parseInt(costInput.value, 10) || 0) : 0;

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  if (!label) {
    showUserToast(
      lang === 'en'
        ? 'Please type a spot, activity, or note name first!'
        : 'অনুগ্রহ করে প্রথমে যেকোনো স্থান বা অ্যাক্টিভিটির নাম লিখুন!'
    );
    if (labelInput) labelInput.focus();
    return;
  }

  if (!Array.isArray(dayObj.customItems)) {
    dayObj.customItems = [];
  }

  dayObj.customItems.push({
    id: `cust-${Date.now()}`,
    label,
    costBDT
  });

  renderItineraryStudio();
  showUserToast(
    lang === 'en' ? `Added "${label}" to Day ${dayNum}!` : `"${label}" দিন ${dayNum}-এ যুক্ত হয়েছে!`
  );
}

function removeCustomDayItem(dayNum, customId) {
  const dayObj = FeaturesState.daysPlan.find(d => d.dayNumber === dayNum);
  if (!dayObj || !Array.isArray(dayObj.customItems)) return;
  dayObj.customItems = dayObj.customItems.filter(item => item.id !== customId);
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
    FeaturesState.activeMapFilter = 'day-2';
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
    FeaturesState.activeMapFilter = 'day-1';
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
    FeaturesState.activeMapFilter = 'day-1';
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
      customItems: [],
      customNote: { en: '', bn: '' }
    }));
    FeaturesState.activeDayTab = 1;
    FeaturesState.activeMapFilter = 'day-1';
    showUserToast(
      lang === 'en' ? 'Reset! Now tap items to build your custom plan.' : 'রিসেট সম্পন্ন! এখন আপনার পছন্দমতো সাজান।'
    );
  }

  renderItineraryStudio();
  renderMapMarkersAndFilters();
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

    const presetActCost = d.activities.reduce((sum, id) => {
      const item = ITIN_ACTIVITIES_CATALOG.find(a => a.id === id);
      return sum + (item ? item.costBDT : 0);
    }, 0);

    const customCost = (d.customItems || []).reduce((sum, c) => sum + (Number(c.costBDT) || 0), 0);
    const actCost = presetActCost + customCost;

    totalTransportBDT += transCost;
    totalDiningBDT += restCost;
    totalActivitiesBDT += actCost;

    return {
      dayNumber: d.dayNumber,
      transCost,
      restCost,
      actCost,
      customCost,
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
 * 7. RENDER SIMPLE, DYNAMIC SINGLE-SCREEN TRIP BUILDER & LIVE PASS
 * -------------------------------------------------------------------------- */
function renderItineraryStudio() {
  const studioRoot = document.getElementById('itinerary-studio-builder');
  if (!studioRoot) return;

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const activeCat = FeaturesState.activeCategoryTab || 'spots';
  const budget = calculateItineraryBudget();

  // Sync Navbar & Section Titles
  document.querySelectorAll('[data-nav="map"]').forEach(el => {
    el.textContent = lang === 'en' ? 'Route Planner' : 'রুট প্ল্যানার';
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
    lang === 'en' ? 'SMART DAY-WISE ROUTE GENERATOR' : 'দিনভিত্তিক স্মার্ট রুট প্ল্যানার (OpenStreetMap)'
  );
  setTxt(
    'map-title',
    lang === 'en'
      ? 'Select Daily Locations & Generate Your Cox’s Bazar Route Plan'
      : 'দিন অনুযায়ী দর্শনীয় স্থান সিলেক্ট করে কক্সবাজার ভ্রমণের রুট প্ল্যান তৈরি করুন'
  );
  setTxt(
    'map-subtitle',
    lang === 'en'
      ? 'Pick a day, tap the places you want to visit, and the system automatically generates an optimized step-by-step travel route inside Cox’s Bazar with distances, travel times, and local vehicles.'
      : 'যেকোনো দিন সিলেক্ট করে যেসব স্থান ঘুরতে চান সেগুলোতে ক্লিক করুন—সিস্টেম স্বয়ংক্রিয়ভাবে আপনার হোটেল থেকে প্রতিটি স্পটের দূরত্ব, সময় ও যানবাহনসহ সম্পূর্ণ রুট ম্যাপ তৈরি করবে।'
  );

  setTxt(
    'itin-eyebrow',
    lang === 'en' ? 'INSTANT INTERACTIVE TRIP BUILDER' : 'সহজ ও ডায়নামিক কক্সবাজার ভ্রমণ প্ল্যানার'
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
      ? 'Pick your days and hotel on the left, tap what you want to do each day, and watch your live trip summary & downloadable Visual Pass update in real time!'
      : 'বাম পাশে আপনার দিন ও হোটেল সিলেক্ট করে প্রতিদিনের পছন্দের স্থানগুলোতে ক্লিক করুন—ডান পাশে সাথে সাথে আপনার সম্পূর্ণ খরচ ও ডাউনলোডযোগ্য পাস তৈরি হয়ে যাবে!'
  );

  const hotelsList = typeof HOTELS_DATA !== 'undefined' ? HOTELS_DATA : [];
  const allSpots = getUnifiedWebsiteSpots();
  const currentDayObj =
    FeaturesState.daysPlan.find(d => d.dayNumber === FeaturesState.activeDayTab) || FeaturesState.daysPlan[0];
  const currentDayNormSpots = currentDayObj.spots.map(normalizeSpotId);

  // 1. Day Selector Tabs (Clean Pills with Item Count Badge)
  const dayTabsHTML = Array.from({ length: FeaturesState.totalDays }, (_, i) => {
    const dNum = i + 1;
    const dObj = FeaturesState.daysPlan[i];
    const isActive = FeaturesState.activeDayTab === dNum;
    const customCount = dObj && Array.isArray(dObj.customItems) ? dObj.customItems.length : 0;
    const totalPicked = dObj
      ? dObj.spots.length + dObj.activities.length + dObj.restaurants.length + dObj.transports.length + customCount
      : 0;
    return `
      <button
        type="button"
        onclick="setItineraryActiveDayTab(${dNum})"
        class="px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 border cursor-pointer whitespace-nowrap ${
          isActive
            ? 'bg-ocean-950 text-amber-300 border-amber-400 shadow-md scale-[1.03]'
            : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50'
        }"
      >
        <span>🗓️ ${lang === 'en' ? `Day ${dNum}` : `দিন ${dNum}`}</span>
        <span class="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
          isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
        }">${totalPicked}</span>
      </button>
    `;
  }).join('');

  // 2. Active Day Selected Chips Strip (Shows everything chosen for Current Day at a glance with 1-click remove)
  const selectedDayChips = [];
  currentDayNormSpots.forEach(sId => {
    const sp = allSpots.find(s => normalizeSpotId(s.id) === sId);
    if (sp) {
      selectedDayChips.push(`
        <button
          type="button"
          onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'spots', '${sId}')"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sky-100 hover:bg-rose-100 text-sky-900 hover:text-rose-800 text-xs font-bold transition cursor-pointer"
          title="${lang === 'en' ? 'Click to remove' : 'বাদ দিতে ক্লিক করুন'}"
        >
          <span>📍 ${sp.name[lang]}</span>
          <span class="text-slate-400 hover:text-rose-600 font-extrabold">×</span>
        </button>
      `);
    }
  });
  currentDayObj.activities.forEach(aId => {
    const act = ITIN_ACTIVITIES_CATALOG.find(a => a.id === aId);
    if (act) {
      selectedDayChips.push(`
        <button
          type="button"
          onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'activities', '${aId}')"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-teal-100 hover:bg-rose-100 text-teal-900 hover:text-rose-800 text-xs font-bold transition cursor-pointer"
          title="${lang === 'en' ? 'Click to remove' : 'বাদ দিতে ক্লিক করুন'}"
        >
          <span>${act.icon} ${act.name[lang]}</span>
          <span class="text-slate-400 hover:text-rose-600 font-extrabold">×</span>
        </button>
      `);
    }
  });
  currentDayObj.restaurants.forEach(rId => {
    const rest = ITIN_RESTAURANTS_CATALOG.find(r => r.id === rId);
    if (rest) {
      selectedDayChips.push(`
        <button
          type="button"
          onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'restaurants', '${rId}')"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-100 hover:bg-rose-100 text-amber-950 hover:text-rose-800 text-xs font-bold transition cursor-pointer"
          title="${lang === 'en' ? 'Click to remove' : 'বাদ দিতে ক্লিক করুন'}"
        >
          <span>${rest.icon} ${rest.name[lang]}</span>
          <span class="text-slate-400 hover:text-rose-600 font-extrabold">×</span>
        </button>
      `);
    }
  });
  currentDayObj.transports.forEach(tId => {
    const tr = ITIN_TRANSPORT_ADDONS.find(t => t.id === tId);
    if (tr) {
      selectedDayChips.push(`
        <button
          type="button"
          onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'transports', '${tId}')"
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-200 hover:bg-rose-100 text-slate-800 hover:text-rose-800 text-xs font-bold transition cursor-pointer"
          title="${lang === 'en' ? 'Click to remove' : 'বাদ দিতে ক্লিক করুন'}"
        >
          <span>${tr.icon} ${tr.name[lang]}</span>
          <span class="text-slate-400 hover:text-rose-600 font-extrabold">×</span>
        </button>
      `);
    }
  });
  (currentDayObj.customItems || []).forEach(cItem => {
    selectedDayChips.push(`
      <button
        type="button"
        onclick="removeCustomDayItem(${currentDayObj.dayNumber}, '${cItem.id}')"
        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-100 hover:bg-rose-100 text-purple-900 hover:text-rose-800 text-xs font-bold transition cursor-pointer"
        title="${lang === 'en' ? 'Click to remove' : 'বাদ দিতে ক্লিক করুন'}"
      >
        <span>✨ ${cItem.label}${cItem.costBDT > 0 ? ` (${formatSinglePrice(cItem.costBDT)})` : ''}</span>
        <span class="text-slate-400 hover:text-rose-600 font-extrabold">×</span>
      </button>
    `);
  });

  // 3. Category Grid Content (Shows ONLY the active category tab so there's zero clutter)
  let categoryGridHTML = '';
  if (activeCat === 'spots') {
    categoryGridHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${allSpots
          .map(spot => {
            const normId = normalizeSpotId(spot.id);
            const active = currentDayNormSpots.includes(normId);
            return `
              <button
                type="button"
                onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'spots', '${normId}')"
                class="p-2.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                  active
                    ? 'bg-sky-950 text-white border-sky-500 shadow-sm'
                    : 'bg-slate-50/80 text-slate-800 border-slate-200/90 hover:bg-white hover:border-sky-300'
                }"
              >
                <img src="${spot.image}" alt="${spot.name[lang]}" class="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-200" />
                <div class="min-w-0 flex-1">
                  <div class="font-extrabold text-xs sm:text-sm leading-snug truncate">${spot.name[lang]}</div>
                  <div class="text-[11px] ${active ? 'text-sky-200' : 'text-slate-500'} truncate">${spot.area[lang]}</div>
                </div>
                <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                  active ? 'bg-emerald-400 text-slate-950' : 'bg-white border border-slate-200 text-slate-600'
                }">
                  ${active ? '✓' : '+'}
                </span>
              </button>
            `;
          })
          .join('')}
      </div>
    `;
  } else if (activeCat === 'activities') {
    categoryGridHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${ITIN_ACTIVITIES_CATALOG.map(act => {
          const active = currentDayObj.activities.includes(act.id);
          const isBike = act.id === 'act-marine-drive-bike';
          return `
            <button
              type="button"
              onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'activities', '${act.id}')"
              class="p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                active
                  ? 'bg-teal-950 text-white border-amber-400 shadow-sm'
                  : isBike
                  ? 'bg-amber-50/90 text-slate-900 border-amber-300 hover:bg-amber-100/70'
                  : 'bg-slate-50/80 text-slate-800 border-slate-200/90 hover:bg-white hover:border-teal-300'
              }"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="text-2xl shrink-0">${act.icon}</span>
                <div class="min-w-0">
                  <div class="font-extrabold text-xs sm:text-sm leading-snug">${act.name[lang]}</div>
                  <div class="text-[11px] font-bold ${active ? 'text-amber-300' : 'text-teal-700'}">
                    ${formatSinglePrice(act.costBDT)}
                  </div>
                </div>
              </div>
              <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                active ? 'bg-emerald-400 text-slate-950' : 'bg-white border border-slate-200 text-slate-600'
              }">
                ${active ? '✓' : '+'}
              </span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  } else if (activeCat === 'restaurants') {
    categoryGridHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${ITIN_RESTAURANTS_CATALOG.map(rest => {
          const active = currentDayObj.restaurants.includes(rest.id);
          return `
            <button
              type="button"
              onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'restaurants', '${rest.id}')"
              class="p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                active
                  ? 'bg-amber-950 text-white border-amber-400 shadow-sm'
                  : 'bg-slate-50/80 text-slate-800 border-slate-200/90 hover:bg-white hover:border-amber-300'
              }"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="text-2xl shrink-0">${rest.icon}</span>
                <div class="min-w-0">
                  <div class="font-extrabold text-xs sm:text-sm leading-snug truncate">${rest.name[lang]}</div>
                  <div class="text-[11px] ${active ? 'text-amber-200' : 'text-slate-500'} truncate">${rest.specialty[lang]}</div>
                  <div class="text-[11px] font-extrabold ${active ? 'text-emerald-300' : 'text-amber-700'}">
                    ~${formatSinglePrice(rest.avgCostBDT)}
                  </div>
                </div>
              </div>
              <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                active ? 'bg-emerald-400 text-slate-950' : 'bg-white border border-slate-200 text-slate-600'
              }">
                ${active ? '✓' : '+'}
              </span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  } else {
    categoryGridHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${ITIN_TRANSPORT_ADDONS.map(tr => {
          const active = currentDayObj.transports.includes(tr.id);
          return `
            <button
              type="button"
              onclick="toggleDaySelection(${currentDayObj.dayNumber}, 'transports', '${tr.id}')"
              class="p-3 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                active
                  ? 'bg-ocean-950 text-white border-sky-400 shadow-sm'
                  : 'bg-slate-50/80 text-slate-800 border-slate-200/90 hover:bg-white hover:border-sky-300'
              }"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="text-2xl shrink-0">${tr.icon}</span>
                <div class="min-w-0">
                  <div class="font-extrabold text-xs sm:text-sm leading-snug">${tr.name[lang]}</div>
                  <div class="text-[11px] ${active ? 'text-sky-200' : 'text-slate-500'}">${tr.duration[lang]}</div>
                  <div class="text-[11px] font-extrabold ${active ? 'text-amber-300' : 'text-sky-700'}">
                    ${formatSinglePrice(tr.costBDT)}
                  </div>
                </div>
              </div>
              <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                active ? 'bg-emerald-400 text-slate-950' : 'bg-white border border-slate-200 text-slate-600'
              }">
                ${active ? '✓' : '+'}
              </span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  // 4. Right Column: Live Day-by-Day Mini Summary Cards
  const activeDaysSlice = FeaturesState.daysPlan.slice(0, FeaturesState.totalDays);
  const liveDaysMiniHTML = activeDaysSlice
    .map((dObj, idx) => {
      const isCurrent = dObj.dayNumber === FeaturesState.activeDayTab;
      const dCost = budget.dayCosts[idx] || { dayTotal: 0 };
      const dRoute = buildDayRouteData(dObj, lang);
      const hasBike =
        dObj.activities.includes('act-marine-drive-bike') || dObj.transports.includes('trans-bike-rental');
      const customCount = (dObj.customItems || []).length;
      const stopNames =
        dRoute.stops.length > 0
          ? dRoute.stops.map(s => s.name).join(' → ')
          : lang === 'en'
          ? 'Tap to pick spots'
          : 'স্পট যোগ করুন';

      return `
        <div
          onclick="setItineraryActiveDayTab(${dObj.dayNumber})"
          class="p-3 rounded-2xl border-2 transition-all cursor-pointer ${
            isCurrent
              ? 'bg-sky-50/90 border-sky-500 shadow-xs'
              : 'bg-slate-50/70 border-slate-200/80 hover:border-sky-300 hover:bg-white'
          }"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded-lg text-[11px] font-extrabold ${
                isCurrent ? 'bg-ocean-950 text-amber-300' : 'bg-slate-200 text-slate-700'
              }">
                ${lang === 'en' ? `Day ${dObj.dayNumber}` : `দিন ${dObj.dayNumber}`}
              </span>
              ${
                hasBike
                  ? `<span class="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-300/80 text-slate-950">🏍️ Bike</span>`
                  : ''
              }
            </div>
            <span class="text-xs font-extrabold text-teal-800">${formatSinglePrice(dCost.dayTotal)}</span>
          </div>
          <p class="text-xs font-bold text-slate-800 mt-1.5 leading-snug truncate">${stopNames}</p>
          <div class="flex items-center justify-between text-[10px] text-slate-500 mt-1">
            <span>📍 ${dObj.spots.length} • 🏍️ ${dObj.activities.length + customCount} • 🍽️ ${dObj.restaurants.length}</span>
            <span>${dRoute.totalKm > 0 ? `📏 ${dRoute.totalKm} km` : ''}</span>
          </div>
        </div>
      `;
    })
    .join('');

  studioRoot.innerHTML = `
    <div class="space-y-6 mb-10">
      <!-- ====================================================================
           3-SECOND VISUAL HOW-IT-WORKS BAR (SUPER EASY FOR ANY USER)
           ==================================================================== -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 bg-gradient-to-r from-sky-50 via-teal-50/70 to-amber-50/70 p-3.5 rounded-3xl border border-sky-200/80">
        <div class="flex items-center gap-3 bg-white/90 px-4 py-2.5 rounded-2xl border border-white shadow-2xs">
          <span class="w-7 h-7 rounded-full bg-ocean-950 text-amber-300 font-extrabold text-xs flex items-center justify-center shrink-0">1</span>
          <div class="text-xs">
            <span class="font-extrabold text-slate-900 block">${lang === 'en' ? 'Pick Days & Base Hotel' : 'দিন ও হোটেল বেছে নিন'}</span>
            <span class="text-slate-500">${lang === 'en' ? 'Choose trip length or a 1-click template' : 'কত দিন থাকবেন ও কোন হোটেলে থাকবেন'}</span>
          </div>
        </div>
        <div class="flex items-center gap-3 bg-white/90 px-4 py-2.5 rounded-2xl border border-white shadow-2xs">
          <span class="w-7 h-7 rounded-full bg-sky-700 text-white font-extrabold text-xs flex items-center justify-center shrink-0">2</span>
          <div class="text-xs">
            <span class="font-extrabold text-slate-900 block">${lang === 'en' ? 'Tap Places, Food & Rides' : 'প্রতিদিনের স্পট ও খাবার ট্যাপ করুন'}</span>
            <span class="text-slate-500">${lang === 'en' ? 'Or type & add your own custom activity' : 'অথবা নিজের পছন্দমতো যেকোনো কিছু যোগ করুন'}</span>
          </div>
        </div>
        <div class="flex items-center gap-3 bg-white/90 px-4 py-2.5 rounded-2xl border border-white shadow-2xs">
          <span class="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center shrink-0">3</span>
          <div class="text-xs">
            <span class="font-extrabold text-slate-900 block">${lang === 'en' ? 'Download Your Visual Pass' : 'ভিজ্যুয়াল পাস ডাউনলোড করুন'}</span>
            <span class="text-slate-500">${lang === 'en' ? 'Save as crisp Image (.PNG) or PDF' : '১ ক্লিকে ছবি (.PNG) বা পিডিএফ সেভ করুন'}</span>
          </div>
        </div>
      </div>

      <!-- ====================================================================
           TOP QUICK-SETUP BAR (DAYS + PRESETS + TRAVELER NAME IN 1 CLEAN CARD)
           ==================================================================== -->
      <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <!-- Left: Choose Trip Days -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-extrabold uppercase tracking-wider text-slate-500 mr-1">
            🗓️ ${lang === 'en' ? 'Trip Length:' : 'ভ্রমণের দিন:'}
          </span>
          ${[2, 3, 4, 5, 6]
            .map(
              d => `
              <button
                type="button"
                onclick="setItineraryTotalDays(${d})"
                class="px-3.5 py-2 rounded-xl font-extrabold text-xs sm:text-sm border transition-all cursor-pointer whitespace-nowrap ${
                  FeaturesState.totalDays === d
                    ? 'bg-ocean-950 text-amber-300 border-ocean-950 shadow-sm scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50 hover:border-sky-300'
                }"
              >
                ${d} ${lang === 'en' ? 'Days' : 'দিন'}
              </button>
            `
            )
            .join('')}
        </div>

        <!-- Middle: 1-Click Ready Templates -->
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-xs font-bold text-slate-400 mr-1">${lang === 'en' ? 'Auto-Fill:' : 'রেডি প্ল্যান:'}</span>
          <button
            type="button"
            onclick="applyItineraryPreset('5day_biker')"
            class="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-400 hover:bg-amber-300 text-slate-950 transition cursor-pointer whitespace-nowrap"
          >
            🏍️ ${lang === 'en' ? '5-Day Bike & Island' : '৫ দিন বাইক ও দ্বীপ'}
          </button>
          <button
            type="button"
            onclick="applyItineraryPreset('3day_family')"
            class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 transition cursor-pointer whitespace-nowrap"
          >
            👨‍👩‍👧 ${lang === 'en' ? '3-Day Family' : '৩ দিন ফ্যামিলি'}
          </button>
          <button
            type="button"
            onclick="applyItineraryPreset('2day_quick')"
            class="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-sky-100 text-slate-700 transition cursor-pointer whitespace-nowrap"
          >
            ⚡ ${lang === 'en' ? '2-Day Weekend' : '২ দিন শর্ট ট্রিপ'}
          </button>
          <button
            type="button"
            onclick="applyItineraryPreset('clear_custom')"
            class="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition cursor-pointer whitespace-nowrap"
          >
            ↺ ${lang === 'en' ? 'Reset' : 'রিসেট'}
          </button>
        </div>

        <!-- Right: Traveler / Group Name Input -->
        <div class="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-200/90">
          <span class="text-xs font-bold text-slate-500 whitespace-nowrap">👤 ${lang === 'en' ? 'Pass Name:' : 'নাম:'}</span>
          <input
            type="text"
            value="${FeaturesState.travelerName.replace(/"/g, '&quot;')}"
            oninput="updateTripMetaField('travelerName', this.value)"
            placeholder="${lang === 'en' ? 'Your Name' : 'আপনার নাম'}"
            class="bg-transparent text-xs sm:text-sm font-extrabold text-slate-900 focus:outline-none w-36 sm:w-44"
          />
        </div>
      </div>

      <!-- ====================================================================
           MAIN SPLIT WORKSPACE: LEFT BUILDER (7 COLS) + RIGHT LIVE SUMMARY (5 COLS)
           ==================================================================== -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- LEFT COLUMN: HOTEL + DAY-BY-DAY PICKER -->
        <div class="lg:col-span-7 space-y-5">
          <!-- CARD 1: PICK YOUR BASE HOTEL (COMPACT HORIZONTAL CARDS) -->
          <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs">
            <div class="flex items-center justify-between gap-2 mb-3">
              <h4 class="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-ocean-950 text-amber-300 text-xs flex items-center justify-center">1</span>
                <span>🏨 ${lang === 'en' ? 'Choose Your Base Hotel' : 'আপনার হোটেল নির্বাচন করুন'}</span>
              </h4>
              <span class="text-xs font-bold text-teal-700">
                ${budget.nights} ${lang === 'en' ? 'Nights' : 'রাত'} = ${formatSinglePrice(budget.totalHotelBDT)}
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              ${hotelsList
                .map(hotel => {
                  const isSelected = hotel.id === FeaturesState.selectedHotelId;
                  const avgNight = Math.round((hotel.minBDT + hotel.maxBDT) / 2);
                  return `
                    <button
                      type="button"
                      onclick="selectItineraryHotel('${hotel.id}', false)"
                      class="p-2.5 rounded-2xl border-2 text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-ocean-950 text-white border-amber-400 shadow-md'
                          : 'bg-slate-50/80 text-slate-800 border-slate-200 hover:bg-white hover:border-sky-300'
                      }"
                    >
                      <img src="${hotel.image}" alt="${hotel.name[lang]}" class="w-11 h-11 rounded-xl object-cover shrink-0 bg-slate-200" />
                      <div class="min-w-0 flex-1">
                        <div class="font-extrabold text-xs leading-snug truncate">${hotel.name[lang]}</div>
                        <div class="text-[11px] font-bold ${isSelected ? 'text-amber-300' : 'text-teal-700'}">
                          ~${formatSinglePrice(avgNight)}/${lang === 'en' ? 'night' : 'রাত'}
                        </div>
                      </div>
                      ${
                        isSelected
                          ? `<span class="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold flex items-center justify-center shrink-0">✓</span>`
                          : ''
                      }
                    </button>
                  `;
                })
                .join('')}
            </div>
          </div>

          <!-- CARD 2: CUSTOMIZE EACH DAY IN ONE PLACE -->
          <div class="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
            <!-- Day Selector Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <h4 class="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-ocean-950 text-amber-300 text-xs flex items-center justify-center">2</span>
                <span>🗓️ ${lang === 'en' ? `Customize Day ${currentDayObj.dayNumber} Plan` : `দিন ${currentDayObj.dayNumber}-এর প্ল্যান সাজান`}</span>
              </h4>
              <div class="flex flex-wrap items-center gap-1.5">
                ${dayTabsHTML}
              </div>
            </div>

            <!-- Selected Chips Summary for Current Day -->
            <div class="bg-slate-50 rounded-2xl p-3 border border-slate-200/70">
              <div class="flex items-center justify-between gap-2 mb-1.5">
                <span class="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  ✅ ${lang === 'en' ? `Picked for Day ${currentDayObj.dayNumber} (Click × to remove):` : `দিন ${currentDayObj.dayNumber}-এ যা যা থাকছে (বাদ দিতে × ক্লিক করুন):`}
                </span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${
                  selectedDayChips.length > 0
                    ? selectedDayChips.join('')
                    : `<span class="text-xs text-slate-400 italic">${
                        lang === 'en'
                          ? 'No items picked yet — tap any item below to add!'
                          : 'নিচের অপশনগুলো থেকে ক্লিক করে যুক্ত করুন!'
                      }</span>`
                }
              </div>
            </div>

            <!-- 4 Clean Category Sub-Tabs (Zero Scrolling Clutter!) -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <button
                type="button"
                onclick="setDayCategoryTab('spots')"
                class="py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                  activeCat === 'spots'
                    ? 'bg-sky-700 text-white border-sky-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
                }"
              >
                <span>📍 ${lang === 'en' ? 'Spots' : 'স্পট'}</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeCat === 'spots' ? 'bg-white text-sky-900' : 'bg-slate-200 text-slate-700'
                }">${currentDayObj.spots.length}</span>
              </button>

              <button
                type="button"
                onclick="setDayCategoryTab('activities')"
                class="py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                  activeCat === 'activities'
                    ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
                }"
              >
                <span>🏍️ ${lang === 'en' ? 'Activities' : 'অ্যাক্টিভিটি'}</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeCat === 'activities' ? 'bg-white text-teal-900' : 'bg-slate-200 text-slate-700'
                }">${currentDayObj.activities.length}</span>
              </button>

              <button
                type="button"
                onclick="setDayCategoryTab('restaurants')"
                class="py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                  activeCat === 'restaurants'
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                }"
              >
                <span>🍽️ ${lang === 'en' ? 'Food' : 'রেস্তোরাঁ'}</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeCat === 'restaurants' ? 'bg-white text-amber-900' : 'bg-slate-200 text-slate-700'
                }">${currentDayObj.restaurants.length}</span>
              </button>

              <button
                type="button"
                onclick="setDayCategoryTab('transports')"
                class="py-2.5 px-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                  activeCat === 'transports'
                    ? 'bg-ocean-950 text-white border-ocean-950 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }"
              >
                <span>🚕 ${lang === 'en' ? 'Travel' : 'যাতায়াত'}</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeCat === 'transports' ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                }">${currentDayObj.transports.length}</span>
              </button>
            </div>

            <!-- Active Category Options Grid -->
            <div>
              ${categoryGridHTML}
            </div>

            <!-- Add Your Own Custom Activity / Place Bar (So anyone can add anything!) -->
            <div class="bg-sky-50/70 rounded-2xl p-3 border border-sky-200/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <span class="text-xs font-extrabold text-sky-900 whitespace-nowrap">
                ✨ ${lang === 'en' ? 'Add Your Own:' : 'নিজের আইটেম যোগ করুন:'}
              </span>
              <input
                id="custom-item-label-${currentDayObj.dayNumber}"
                type="text"
                placeholder="${lang === 'en' ? 'e.g. Burmese Market Shopping, Beach BBQ...' : 'যেমন: বার্মিজ মার্কেট শপিং, বিচ বারবিকিউ...'}"
                class="flex-1 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
              />
              <input
                id="custom-item-cost-${currentDayObj.dayNumber}"
                type="number"
                min="0"
                step="50"
                placeholder="${lang === 'en' ? 'Cost ৳ (optional)' : 'খরচ ৳ (ঐচ্ছিক)'}"
                class="w-full sm:w-28 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onclick="addCustomDayItem(${currentDayObj.dayNumber})"
                class="px-3.5 py-1.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-extrabold text-xs transition whitespace-nowrap cursor-pointer"
              >
                + ${lang === 'en' ? 'Add' : 'যোগ করুন'}
              </button>
            </div>

            <!-- Quick Day Footer: Personal Note + Next Day Button -->
            <div class="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
              <input
                type="text"
                value="${(currentDayObj.customNote[lang] || '').replace(/"/g, '&quot;')}"
                oninput="updateDayCustomField(${currentDayObj.dayNumber}, 'note', this.value)"
                placeholder="📝 ${lang === 'en' ? `Optional note for Day ${currentDayObj.dayNumber}...` : `দিন ${currentDayObj.dayNumber}-এর ছোট নোট (ঐচ্ছিক)...`}"
                class="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-sky-500"
              />
              ${
                currentDayObj.dayNumber < FeaturesState.totalDays
                  ? `<button
                      type="button"
                      onclick="setItineraryActiveDayTab(${currentDayObj.dayNumber + 1})"
                      class="px-4 py-2 rounded-xl bg-ocean-950 hover:bg-sky-800 text-amber-300 font-extrabold text-xs transition whitespace-nowrap cursor-pointer"
                    >
                      ${lang === 'en' ? `Plan Day ${currentDayObj.dayNumber + 1} →` : `পরবর্তী দিন (${currentDayObj.dayNumber + 1}) →`}
                    </button>`
                  : `<a
                      href="#visual-itinerary-poster"
                      class="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs text-center transition whitespace-nowrap"
                    >
                      🎉 ${lang === 'en' ? 'View Full Pass ↓' : 'সম্পূর্ণ পাস দেখুন ↓'}
                    </a>`
              }
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: STICKY LIVE TRIP SUMMARY & INSTANT DOWNLOAD PANEL -->
        <div class="lg:col-span-5 lg:sticky lg:top-24 bg-white rounded-3xl p-5 border-2 border-slate-200/90 shadow-lg space-y-4">
          <!-- Live Total Budget Header -->
          <div class="bg-gradient-to-br from-ocean-950 via-ocean-900 to-teal-900 text-white rounded-2xl p-4 shadow-sm">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                ⚡ ${lang === 'en' ? 'LIVE TRIP SUMMARY' : 'লাইভ ভ্রমণ সামারি'}
              </span>
              <span class="px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-bold text-sky-200">
                ${FeaturesState.totalDays} ${lang === 'en' ? 'Days' : 'দিন'} / ${budget.nights} ${lang === 'en' ? 'Nights' : 'রাত'}
              </span>
            </div>
            <div class="mt-2 flex items-baseline justify-between gap-2">
              <span class="text-xs text-sky-200">${lang === 'en' ? 'Est. Total Budget:' : 'মোট আনুমানিক খরচ:'}</span>
              <span class="text-2xl font-extrabold text-amber-300">${formatSinglePrice(budget.grandTotalBDT)}</span>
            </div>

            <!-- 4 Mini Breakdown Pills -->
            <div class="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-white/15 text-center">
              <div class="bg-white/10 rounded-xl p-1.5">
                <span class="block text-[9px] text-sky-200 uppercase">🏨 ${lang === 'en' ? 'Hotel' : 'হোটেল'}</span>
                <span class="block text-[11px] font-extrabold text-white mt-0.5">${formatSinglePrice(budget.totalHotelBDT)}</span>
              </div>
              <div class="bg-white/10 rounded-xl p-1.5">
                <span class="block text-[9px] text-sky-200 uppercase">🏍️ ${lang === 'en' ? 'Travel' : 'যাতায়াত'}</span>
                <span class="block text-[11px] font-extrabold text-teal-300 mt-0.5">${formatSinglePrice(budget.totalTransportBDT)}</span>
              </div>
              <div class="bg-white/10 rounded-xl p-1.5">
                <span class="block text-[9px] text-sky-200 uppercase">🍽️ ${lang === 'en' ? 'Food' : 'খাবার'}</span>
                <span class="block text-[11px] font-extrabold text-amber-300 mt-0.5">${formatSinglePrice(budget.totalDiningBDT)}</span>
              </div>
              <div class="bg-white/10 rounded-xl p-1.5">
                <span class="block text-[9px] text-sky-200 uppercase">🪂 ${lang === 'en' ? 'Fun' : 'অ্যাক্টিভিটি'}</span>
                <span class="block text-[11px] font-extrabold text-white mt-0.5">${formatSinglePrice(budget.totalActivitiesBDT)}</span>
              </div>
            </div>
          </div>

          <!-- Day-by-Day Interactive Mini Timeline -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                📋 ${lang === 'en' ? 'Your Daily Plan (Click any day to edit):' : 'আপনার প্রতিদিনের প্ল্যান (ক্লিক করে পরিবর্তন করুন):'}
              </span>
            </div>
            <div class="space-y-2 max-h-72 overflow-y-auto pr-1">
              ${liveDaysMiniHTML}
            </div>
          </div>

          <!-- Instant 1-Click Download Buttons -->
          <div class="pt-2 border-t border-slate-100 space-y-2">
            <div class="grid grid-cols-2 gap-2">
              <button
                type="button"
                onclick="downloadVisualItineraryPNG()"
                class="py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📥</span>
                <span>${lang === 'en' ? 'Download Image (.PNG)' : 'ছবি ডাউনলোড (.PNG)'}</span>
              </button>
              <button
                type="button"
                onclick="downloadVisualItineraryPDF()"
                class="py-3 px-3 rounded-2xl bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📄</span>
                <span>${lang === 'en' ? 'Download PDF (.PDF)' : 'পিডিএফ ডাউনলোড (.PDF)'}</span>
              </button>
            </div>
            <a
              href="#visual-itinerary-poster"
              class="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 font-bold text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>👁️ ${lang === 'en' ? 'Preview Full Visual Itinerary Pass Below ↓' : 'নিচে সম্পূর্ণ ভিজ্যুয়াল পাস দেখুন ↓'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  renderVisualItineraryPass();
}

/* --------------------------------------------------------------------------
 * 8. CLEAN, MODERN & EASY-TO-READ VISUAL ITINERARY PASS (PNG / PDF READY)
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

      const chosenSpots = day.spots
        .map(id => allSpots.find(s => normalizeSpotId(s.id) === normalizeSpotId(id)))
        .filter(Boolean);
      const chosenActivities = day.activities.map(id => ITIN_ACTIVITIES_CATALOG.find(a => a.id === id)).filter(Boolean);
      const customItems = Array.isArray(day.customItems) ? day.customItems : [];
      const chosenRestaurants = day.restaurants
        .map(id => ITIN_RESTAURANTS_CATALOG.find(r => r.id === id))
        .filter(Boolean);
      const chosenTransports = day.transports.map(id => ITIN_TRANSPORT_ADDONS.find(t => t.id === id)).filter(Boolean);

      const hasMarineBike =
        day.activities.includes('act-marine-drive-bike') || day.transports.includes('trans-bike-rental');

      const smartHeadline = getSmartDayHeadline(day, lang);
      const dayRoute = buildDayRouteData(day, lang);
      const routeChainText =
        dayRoute.stops.length > 0
          ? `🏨 ${dayRoute.hotel.name} → ` + dayRoute.stops.map(s => `${s.stopNumber}. ${s.name}`).join(' → ')
          : '';

      return `
        <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <!-- Compact Day Header Bar -->
          <div class="bg-gradient-to-r from-ocean-950 via-ocean-900 to-sky-900 px-5 py-3 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-center flex flex-col items-center justify-center shrink-0">
                <span class="text-[8px] uppercase tracking-wider block leading-none">DAY</span>
                <span class="text-xs block leading-tight">0${day.dayNumber}</span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-display text-sm sm:text-base font-extrabold text-white leading-snug">
                    ${smartHeadline}
                  </h4>
                  ${
                    hasMarineBike
                      ? `<span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950">
                          🏍️ Bike Ride
                        </span>`
                      : ''
                  }
                </div>
                ${
                  day.customNote[lang]
                    ? `<p class="text-[11px] text-sky-200/95 mt-0.5">“${day.customNote[lang]}”</p>`
                    : ''
                }
              </div>
            </div>

            <!-- Day Cost Pill + Edit Button -->
            <div class="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onclick="editDayFromPass(${day.dayNumber})"
                data-html2canvas-ignore="true"
                class="px-2.5 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold text-amber-300 border border-white/20 transition cursor-pointer"
              >
                ✏️ ${lang === 'en' ? 'Edit' : 'পরিবর্তন'}
              </button>
              <div class="bg-white/10 border border-white/15 rounded-xl px-3 py-1 text-right">
                <span class="text-xs font-extrabold text-amber-300 block">
                  ${formatSinglePrice(dayCostObj.dayTotal)}
                </span>
              </div>
            </div>
          </div>

          ${
            routeChainText
              ? `
              <!-- Generated Day Route Plan Strip -->
              <div class="bg-sky-50/90 border-b border-sky-200/70 px-5 py-1.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div class="text-xs font-bold text-slate-800">
                  <span class="inline-block px-1.5 py-0.5 rounded bg-sky-700 text-white text-[10px] font-extrabold uppercase mr-1.5">
                    🛣️ ${lang === 'en' ? 'ROUTE' : 'রুট'}
                  </span>
                  <span>${routeChainText}</span>
                </div>
                <div class="text-[11px] font-extrabold text-teal-800 shrink-0">
                  📏 ${dayRoute.totalKm} km • ⏱ ~${formatDurationMinutes(dayRoute.totalMinutes, lang)}
                </div>
              </div>
            `
              : ''
          }

          <!-- Clean, Scannable 4-Category Summary Row -->
          <div class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <!-- 1. Places -->
            <div class="p-2.5 rounded-xl bg-sky-50/50 border border-sky-100">
              <div class="text-[10px] font-extrabold uppercase text-sky-800 mb-1.5 flex justify-between">
                <span>📍 ${lang === 'en' ? 'Places' : 'স্পট'}</span>
                <span>${chosenSpots.length}</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${
                  chosenSpots.length
                    ? chosenSpots
                        .map(
                          s => `
                          <span class="inline-flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-sky-200/80 font-bold text-slate-800">
                            <img src="${s.image}" alt="${s.name[lang]}" crossorigin="anonymous" class="w-5 h-5 rounded object-cover shrink-0" />
                            <span>${s.name[lang]}</span>
                          </span>
                        `
                        )
                        .join('')
                    : `<span class="text-slate-400 italic">${lang === 'en' ? 'Free leisure' : 'অবসর'}</span>`
                }
              </div>
            </div>

            <!-- 2. Activities & Custom -->
            <div class="p-2.5 rounded-xl bg-teal-50/50 border border-teal-100">
              <div class="text-[10px] font-extrabold uppercase text-teal-800 mb-1.5 flex justify-between">
                <span>🏍️ ${lang === 'en' ? 'Activities' : 'অ্যাক্টিভিটি'}</span>
                <span>${formatSinglePrice(dayCostObj.actCost)}</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${
                  chosenActivities.length || customItems.length
                    ? [
                        ...chosenActivities.map(
                          a => `
                          <span class="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-teal-200/80 font-bold text-slate-800">
                            <span>${a.icon} ${a.name[lang]}</span>
                          </span>
                        `
                        ),
                        ...customItems.map(
                          c => `
                          <span class="inline-flex items-center gap-1 bg-purple-50 px-2 py-1 rounded-lg border border-purple-200 font-bold text-purple-950">
                            <span>✨ ${c.label}</span>
                          </span>
                        `
                        )
                      ].join('')
                    : `<span class="text-slate-400 italic">${lang === 'en' ? 'Beach walk' : 'সৈকতে ভ্রমণ'}</span>`
                }
              </div>
            </div>

            <!-- 3. Food -->
            <div class="p-2.5 rounded-xl bg-amber-50/50 border border-amber-100">
              <div class="text-[10px] font-extrabold uppercase text-amber-900 mb-1.5 flex justify-between">
                <span>🍽️ ${lang === 'en' ? 'Dining' : 'খাবার'}</span>
                <span>${formatSinglePrice(dayCostObj.restCost)}</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${
                  chosenRestaurants.length
                    ? chosenRestaurants
                        .map(
                          r => `
                          <span class="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-amber-200/80 font-bold text-slate-800">
                            <span>${r.icon} ${r.name[lang]}</span>
                          </span>
                        `
                        )
                        .join('')
                    : `<span class="text-slate-400 italic">${lang === 'en' ? 'Local dining' : 'স্থানীয় খাবার'}</span>`
                }
              </div>
            </div>

            <!-- 4. Local Travel -->
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div class="text-[10px] font-extrabold uppercase text-slate-700 mb-1.5 flex justify-between">
                <span>🚕 ${lang === 'en' ? 'Transport' : 'যাতায়াত'}</span>
                <span>${formatSinglePrice(dayCostObj.transCost)}</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${
                  chosenTransports.length
                    ? chosenTransports
                        .map(
                          t => `
                          <span class="inline-flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-slate-200 font-bold text-slate-800">
                            <span>${t.icon} ${t.name[lang]}</span>
                          </span>
                        `
                        )
                        .join('')
                    : `<span class="text-slate-400 italic">${lang === 'en' ? 'Walk / Local' : 'হাঁটা'}</span>`
                }
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  container.innerHTML = `
    <!-- ====================================================================
         SLEEK VISUAL ITINERARY PASS (CAPTURED ON PNG / PDF DOWNLOAD)
         ==================================================================== -->
    <div
      id="visual-itinerary-poster"
      class="bg-sand-50 rounded-3xl border-2 border-slate-200/90 shadow-xl overflow-hidden"
    >
      <!-- 1. COMPACT BOARDING-PASS HEADER (ALL KEY INFO IN ONE CLEAN BANNER) -->
      <div class="bg-gradient-to-br from-ocean-950 via-ocean-900 to-teal-900 p-6 sm:p-8 text-white">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <!-- Left: Logo + Trip Title + Traveler Name -->
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg border-2 border-amber-300 flex items-center justify-center shrink-0">
              <img
                src="assets/images/logo-transparent.png"
                alt="Visit Cox Logo"
                crossorigin="anonymous"
                class="w-full h-full object-contain"
              />
            </div>
            <div>
              <span class="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                ✓ ${lang === 'en' ? 'COX’S BAZAR VISUAL TRIP PASS' : 'কক্সবাজার ভ্রমণ পাস'}
              </span>
              <h3 class="font-display text-xl sm:text-2xl font-extrabold text-white leading-snug">
                ${FeaturesState.tripTitle}
              </h3>
              <p class="text-sky-200 text-xs mt-0.5">
                👤 <strong class="text-amber-300">${FeaturesState.travelerName}</strong>
                • 🗓️ <strong>${FeaturesState.totalDays} ${lang === 'en' ? 'Days' : 'দিন'} (${budget.nights} ${lang === 'en' ? 'Nights' : 'রাত'})</strong>
                ${
                  budget.selectedHotel
                    ? `• 🏨 <strong>${budget.selectedHotel.name[lang]}</strong>`
                    : ''
                }
              </p>
            </div>
          </div>

          <!-- Right: Total Budget + Download Buttons (Ignored during PNG/PDF capture) -->
          <div class="flex flex-wrap items-center justify-between lg:justify-end gap-4">
            <div class="bg-white/10 border border-amber-300/40 rounded-2xl px-4 py-2.5 text-left lg:text-right">
              <span class="block text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                ${lang === 'en' ? 'EST. TOTAL TRIP COST' : 'সর্বমোট আনুমানিক খরচ'}
              </span>
              <span class="text-xl sm:text-2xl font-extrabold text-white">
                ${formatSinglePrice(budget.grandTotalBDT)}
              </span>
            </div>

            <div data-html2canvas-ignore="true" class="flex flex-wrap items-center gap-2">
              <button
                type="button"
                id="btn-download-png"
                onclick="downloadVisualItineraryPNG()"
                class="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>📥</span>
                <span>${lang === 'en' ? 'Save Image (.PNG)' : 'ছবি (.PNG)'}</span>
              </button>
              <button
                type="button"
                id="btn-download-pdf"
                onclick="downloadVisualItineraryPDF()"
                class="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>📄</span>
                <span>${lang === 'en' ? 'Save PDF' : 'পিডিএফ (.PDF)'}</span>
              </button>
              <button
                type="button"
                onclick="printVisualItinerary()"
                class="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition cursor-pointer"
              >
                🖨️
              </button>
            </div>
          </div>
        </div>

        <!-- Compact 4-Pill Cost Breakdown Strip -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-white/15 text-xs">
          <div class="bg-white/10 rounded-xl px-3 py-2 flex items-center justify-between">
            <span class="text-sky-200">🏨 ${lang === 'en' ? `Hotel (${budget.nights}N)` : `হোটেল (${budget.nights} রাত)`}</span>
            <strong class="text-white">${formatSinglePrice(budget.totalHotelBDT)}</strong>
          </div>
          <div class="bg-white/10 rounded-xl px-3 py-2 flex items-center justify-between">
            <span class="text-sky-200">🏍️ ${lang === 'en' ? 'Local Travel' : 'যাতায়াত'}</span>
            <strong class="text-teal-300">${formatSinglePrice(budget.totalTransportBDT)}</strong>
          </div>
          <div class="bg-white/10 rounded-xl px-3 py-2 flex items-center justify-between">
            <span class="text-sky-200">🍽️ ${lang === 'en' ? 'Dining' : 'খাবার'}</span>
            <strong class="text-amber-300">${formatSinglePrice(budget.totalDiningBDT)}</strong>
          </div>
          <div class="bg-white/10 rounded-xl px-3 py-2 flex items-center justify-between">
            <span class="text-sky-200">🪂 ${lang === 'en' ? 'Activities' : 'অ্যাক্টিভিটি'}</span>
            <strong class="text-white">${formatSinglePrice(budget.totalActivitiesBDT)}</strong>
          </div>
        </div>
      </div>

      <!-- 2. DAY-BY-DAY VISUAL ITINERARY CARDS -->
      <div class="p-4 sm:p-6 space-y-4">
        ${daysCardsHTML}
      </div>

      <!-- 3. COMPACT FOOTER -->
      <div class="bg-white border-t border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div class="flex items-center gap-2 font-bold text-ocean-950">
          <img src="assets/images/logo-transparent.png" alt="Visit Cox" crossorigin="anonymous" class="w-6 h-6 object-contain" />
          <span>Visit Cox’s Bazar • Smart Trip & Route Pass</span>
        </div>
        <div>
          Tourist Police: +880 1320-158995 • Emergency: 999
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
 * 11. STEPPED ITINERARY COMPOSER (MINIMALIST AWARD-WINNING ENGINE)
 * -------------------------------------------------------------------------- */
const STEPPED_ITINERARY_PLANS = {
  relaxing: [
    {
      day: 1,
      titleEn: "The Oceanfront Horizon & Golden Sunset",
      titleBn: "সমুদ্র উপকূল ও সূর্যাস্ত যাত্রা",
      morningEn: "Arrive in Cox's Bazar. Check into your beachfront sanctuary. Leisurely morning walk along Kolatoli Beach to absorb the fresh Bay of Bengal sea breeze.",
      morningBn: "কক্সবাজারে পৌঁছান। হোটেলে চেক-ইন করে কলাতলী বিচে সমুদ্রের ঠান্ডা হাওয়ায় সকালের আরামদায়ক হাঁটা।",
      afternoonEn: "Sample authentic coastal delicacies at Poushee Restaurant (fresh bhartas & steamed rice). Relax by the resort pool or private balcony.",
      afternoonBn: "পৌষী রেস্তোরাঁয় ঐতিহ্যবাহী নানান ভর্তা ও ভাত দিয়ে দুপুরের খাবার। বিকেলে কিছুটা বিশ্রাম।",
      eveningEn: "Head to Sugandha Beach for the iconic Cox's Bazar sunset. Savor live grilled Rupchanda and hot local tea by the shoreline.",
      eveningBn: "সুগন্ধা বিচে সূর্যাস্তের মনোরম দৃশ্য উপভোগ। লাইভ রূপচাঁদা ফ্রাই এবং চা পানের অভিজ্ঞতা।",
      corridor: "Kolatoli & Sugandha Beachfront",
      vehicle: "Easy-bike Tomtom (৳30–৳50)",
      tip: {
        en: "Sugandha Beach gets lively before dusk; secure an oceanfront chair around 5:00 PM for the sunset.",
        bn: "সূর্যাস্তের সুন্দর দৃশ্য দেখতে বিকেল ৫টার মধ্যে সুগন্ধা বিচে সমুদ্রমুখী চেয়ার নিন।"
      }
    },
    {
      day: 2,
      titleEn: "Marine Drive Scenic Drive & Inani Coral Serenity",
      titleBn: "মেরিন ড্রাইভ ও ইনানী কোরাল শান্তি",
      morningEn: "Take an open-top morning drive along the world's longest Marine Drive (80km) flanked by coastal hills and crashing ocean waves.",
      morningBn: "মেরিন ড্রাইভ দিয়ে সকালের মুক্ত হাওয়ায় ড্রাইভ—একপাশে সবুজ পাহাড়, অন্যপাশে নীল সমুদ্র।",
      afternoonEn: "Explore the ancient dead coral boulders of Inani Beach. Lounge under umbrellas away from urban crowds.",
      afternoonBn: "ইনানী সৈকতে প্রবাল পাথরে বসে বিশ্রাম ও নির্মল প্রকৃতি উপভোগ।",
      eveningEn: "Sunset stop at Shamlapur Fishing Village to see traditional wooden Sampan boats returning with their fresh daily catch.",
      eveningBn: "শামলাপুর সৈকতে সাম্পান নৌকার ফিরে আসা ও সোনালী সূর্যাস্ত দর্শন।",
      corridor: "Marine Drive to Inani (32 km)",
      vehicle: "Chander Gari Jeep or Reserved CNG (৳1,200–৳1,800)",
      tip: {
        en: "Inani coral rocks are best seen at low tide. Inquire about tidal timings at your hotel front desk.",
        bn: "ভাটার সময় ইনানীর প্রবাল পাথরগুলো সুন্দর দৃশ্যমান হয়। সকালের জোয়ার-ভাটার সময় জেনে নিন।"
      }
    },
    {
      day: 3,
      titleEn: "Himchari Hilltop Panoramas & Rakhine Artifacts",
      titleBn: "হিমছড়ি পাহাড় চূড়া ও রাখাইন ঐতিহ্য",
      morningEn: "Ascend the scenic hilltop staircase of Himchari National Park for panoramic bird's-eye vistas of the unbroken shoreline.",
      morningBn: "হিমছড়ি জাতীয় উদ্যানের পাহাড়ের চূড়ায় উঠে পাখির চোখে ১২০ কিমি সমুদ্রের রূপ অবলোকন।",
      afternoonEn: "Visit the peaceful Rakhine Buddhist handicraft shops in town to discover hand-woven shawls, natural pearls, and Burmese sweets.",
      afternoonBn: "শহরের রাখাইন পল্লীতে হাতে বোনা চাদর, মুক্তা ও বার্মিজ পণ্যের সংগ্রহ দেখা।",
      eveningEn: "Final relaxed beachfront dinner at Mermaid Cafe with candle-lit coastal ambiance.",
      eveningBn: "মারমেইড ক্যাফেতে উপকূলীয় মৃদু আলোয় সুস্বাদু ডিনারের মাধ্যমে সফরের সমাপ্তি।",
      corridor: "Himchari & Main Town (12 km)",
      vehicle: "Reserved Tomtom or CNG (৳400–৳600)",
      tip: {
        en: "Himchari hilltop has ~200 stairs; visit before noon or late afternoon to avoid direct midday sun.",
        bn: "হিমছড়ির সিঁড়ি বেয়ে ওঠার জন্য সকালের রোদ বা বিকেলের স্নিগ্ধ সময় সবচেয়ে উপযুক্ত।"
      }
    },
    {
      day: 4,
      titleEn: "Sonadia Offshore Nature Island",
      titleBn: "সোনাদিয়া দ্বীপের অনাবিষ্কৃত প্রকৃতি",
      morningEn: "Early boat expedition to Sonadia Island. Walk across desolate sandbars populated by thousands of scurrying red fiddler crabs.",
      morningBn: "সোনাদিয়া দ্বীপে সকালের নৌকা ভ্রমণ। লাল কাঁকড়ার বিচরণ ও খাঁটি দ্বীপ প্রকৃতির অভিজ্ঞতা।",
      afternoonEn: "Secluded beach picnic and exploration of mangrove saltwater channels and winter migratory birds.",
      afternoonBn: "ম্যানগ্রোভ চ্যানেল ও পরিযায়ী পাখির কলকাকলি উপভোগ।",
      eveningEn: "Return to the main town harbor at sunset. Quiet dinner by the bay.",
      eveningBn: "সূর্যাস্তে ঘাটে ফিরে আসা ও স্থানীয় স্নিগ্ধ ডিনার।",
      corridor: "Moheshkhali Channel to Sonadia",
      vehicle: "Speedboat & Wooden Trawler (৳1,500–৳2,200)",
      tip: {
        en: "Wear lightweight sandals suitable for shallow water disembarkation on tidal sandbanks.",
        bn: "নৌকা থেকে নামার সুবিধার্থে সহজে শুকায় এমন স্যান্ডেল বা জুতো পরুন।"
      }
    },
    {
      day: 5,
      titleEn: "Rejuvenation, Spa & Coastal Farewell",
      titleBn: "প্রশান্তি ও বিদায় বেলা",
      morningEn: "Wake up to sunrise yoga or peaceful beachfront reflection. Savor an extended breakfast.",
      morningBn: "সকালে সূর্যোদয় দেখা এবং সৈকতে শান্ত মনে হাঁটা।",
      afternoonEn: "Pick up local souvenirs: dry fish from Najirartek or organic handmade soaps.",
      afternoonBn: "স্মারক হিসেবে স্থানীয় খাঁটি শুঁটকি বা বার্মিজ হ্যান্ডিক্রাফট কেনাকাটা।",
      eveningEn: "Depart Cox's Bazar via air or scenic train through the coastal rail bridge.",
      eveningBn: "কক্সবাজার আন্তর্জাতিক বিমানবন্দর বা আইকনিক ঝিনুক স্টেশন থেকে বিদায়।",
      corridor: "Town to Airport / Railway Station",
      vehicle: "Reserved AC Car / CNG (৳300–৳500)",
      tip: {
        en: "The iconic Oyster Railway Station is an architectural landmark; arrive 40 mins early to explore.",
        bn: "আইকনিক ঝিনুক আকৃতির রেলওয়ে স্টেশন ঘুরে দেখতে ট্রেনের সময়ের ৪০ মিনিট আগে পৌঁছান।"
      }
    }
  ],
  adventure: [
    {
      day: 1,
      titleEn: "Wave Riding & Open-Air Jeep Safari",
      titleBn: "সার্ফিং ও খোলা জিপ সাফারি",
      morningEn: "Kick off Day 1 with an intro surfing session at Kolatoli beach with certified local surf instructors.",
      morningBn: "কলাতলী বিচে অভিজ্ঞ কোচের তত্ত্বাবধানে সকালের রোমাঞ্চকর সার্ফিং শুরু।",
      afternoonEn: "Hop on an open-top 4x4 Chander Gari for a wind-in-your-hair sprint along Marine Drive towards Himchari.",
      afternoonBn: "খোলা ছাদের চান্দের গাড়িতে মেরিন ড্রাইভ ধরে পাহাড়ি বাতাসে স্পিড রাইড।",
      eveningEn: "Parasailing flight over the turquoise waters at Laboni or Kolatoli Point. Live seafood BBQ.",
      eveningBn: "বিকেলে আকাশে প্যারাসেইলিং ও রাতে বিচসাইড বারবিকিউ।",
      corridor: "Kolatoli to Himchari",
      vehicle: "Open Chander Gari 4x4 (৳1,800–৳2,500)",
      tip: {
        en: "Morning high tides offer the best wave formation for beginners learning to surf.",
        bn: "সকালে জোয়ারের সময় সার্ফিং শেখার জন্য উপযুক্ত ঢেউ তৈরি হয়।"
      }
    },
    {
      day: 2,
      titleEn: "Himchari Jungle Trekking & Inani Coral Coast",
      titleBn: "হিমছড়ি ট্র্যাকিং ও ইনানী কোরাল অভিযান",
      morningEn: "Trek through the lush secondary rainforest paths of Himchari National Park.",
      morningBn: "হিমছড়ি জাতীয় উদ্যানের ট্রেইলে বন্য প্রকৃতি ও সবুজ পাহাড়ে ট্র্যাকিং।",
      afternoonEn: "Ride high-speed beach quad bikes (ATV) across the compact sands of Inani.",
      afternoonBn: "ইনানীর বিস্তৃত সৈকতে এটিভি মোটরবাইক চালানোর অভিজ্ঞতা।",
      eveningEn: "Campfire by the beach in Pechar Dwip with acoustic guitar and bonfire under the starlight.",
      eveningBn: "পেঁচার দ্বীপে ক্যাম্পফায়ার ও সমুদ্রের গর্জনে রাতের আয়োজন।",
      corridor: "Marine Drive (28 km)",
      vehicle: "4x4 Jeep Safari (৳1,500–৳2,000)",
      tip: {
        en: "Wear trainers with solid grip for the Himchari jungle trails; rocks can be damp from hill streams.",
        bn: "পাহাড়ি ট্রেইলে চলার জন্য ভালো গ্রিপযুক্ত স্নিকার্স বা ট্র্যাকিং জুতো ব্যবহার করুন।"
      }
    },
    {
      day: 3,
      titleEn: "Moheshkhali Channel Speedboat Sprint",
      titleBn: "মহেশখালী স্পিডবোট থ্রিল ও পাহাড়",
      morningEn: "Board a twin-engine speedboat across the choppy Moheshkhali river channel from 6th Jetty.",
      morningBn: "৬ নম্বর ঘাট থেকে দ্রুতগতির স্পিডবোটে বঙ্গোপসাগরের মোহনা পারাপার।",
      afternoonEn: "Climb the 69 stairs of Mainak Hill to Adinath Temple. Panoramic views across the Bay.",
      afternoonBn: "মৈনাক পাহাড়ের উঁচুতে আদিনাথ মন্দির ও বদ্বীপের বিস্তীর্ণ দৃশ্য।",
      eveningEn: "Speedboat return to town at high tide. Night exploration of beach night markets.",
      eveningBn: "বিকেলে স্পিডবোটে ফিরে আসা ও রাতের সৈকত বাজারে ঘুরে বেড়ানো।",
      corridor: "Channel Crossing & Mainak Hill",
      vehicle: "High-speed Boat (৳120 shared / ৳1,500 reserved)",
      tip: {
        en: "Always ensure your life jacket is securely buckled before the boat throttles into open water.",
        bn: "স্পিডবোট ছাড়ার পূর্বেই লাইফ জ্যাকেটের বাকল সঠিকভাবে আটকে নিন।"
      }
    },
    {
      day: 4,
      titleEn: "Sonadia Deep Channel Kayaking & Sand Dunes",
      titleBn: "সোনাদিয়া কায়াকিং ও বালিয়াড়ি",
      morningEn: "Paddle through the saltwater mangrove estuaries of Sonadia in sit-on-top sea kayaks.",
      morningBn: "সোনাদিয়ার ম্যানগ্রোভ খালে শান্ত কায়াকিং অভিযান।",
      afternoonEn: "Dune hiking across golden sand hills and spot migrating raptors and sea eagles.",
      afternoonBn: "বালিয়াড়িতে হাইকিং ও পাখির ছবি তোলার দারুণ সুযোগ।",
      eveningEn: "Return for hot grilled Loitta fish fry and traditional spicy coastal curries.",
      eveningBn: "সন্ধ্যায় মুচমুচে লইট্টা ফ্রাই ও মশলাদার সামুদ্রিক মাছের ডিনার।",
      corridor: "Sonadia Estuary (14 km)",
      vehicle: "Trawler & Kayak Rental (৳1,200–৳1,800)",
      tip: {
        en: "Keep your smartphone and wallet inside a waterproof dry pouch during kayaking.",
        bn: "কায়াকিং করার সময় ফোন ও মূল্যবান জিনিসপত্র ওয়াটারপ্রুফ পাউচে সুরক্ষিত রাখুন।"
      }
    },
    {
      day: 5,
      titleEn: "Beach Riding & High-Speed Farewell",
      titleBn: "ঘোড়ায় চড়া ও রোমাঞ্চকর সমাপ্তি",
      morningEn: "Early morning horse ride galloping along the wet sands of Laboni beach.",
      morningBn: "লাবণী বিচে সকালের সমুদ্রের তীরে ঘোড়দৌড়।",
      afternoonEn: "Final swim in certified safe flag zones under the watch of Sea Beach Lifeguards.",
      afternoonBn: "লাইফগার্ড নির্দেশিত নিরাপদ জোনে সমুদ্রস্নান।",
      eveningEn: "Departure with adrenaline-charged memories.",
      eveningBn: "রোমাঞ্চকর স্মৃতি নিয়ে কক্সবাজার থেকে প্রস্থান।",
      corridor: "Laboni to Transit Hub",
      vehicle: "Local Transit (৳100–৳200)",
      tip: {
        en: "Only bathe within designated green flag swim zones; obey lifeguard safety sirens at all times.",
        bn: "লাইফগার্ড নির্দেশিত নিরাপদ সীমানার মধ্যেই অবস্থান করুন এবং সতর্কবার্তা মেনে চলুন।"
      }
    }
  ],
  local: [
    {
      day: 1,
      titleEn: "Rakhine Heritage, Handlooms & Sacred Pagodas",
      titleBn: "রাখাইন ঐতিহ্য, তাঁতশিল্প ও প্যাগোডা",
      morningEn: "Visit the centuries-old Aggameda Khyang Buddhist Monastery in Cox's Bazar town.",
      morningBn: "কক্সবাজার শহরের ঐতিহাসিক আগ্যামেধা ক্যাং বৌদ্ধ বিহার পরিদর্শন।",
      afternoonEn: "Walk into authentic Rakhine weaver households in Buddhist Temple Road. Watch wooden handlooms create vibrant textiles.",
      afternoonBn: "বৌদ্ধ মন্দির সড়কে ঐতিহ্যবাহী রাখাইন তাঁতিদের তৈরি পোশাক ও হস্তশিল্প দর্শন।",
      eveningEn: "Dine at Poushee or Jhawbon for a massive spread of 30+ authentic Bangladeshi bhartas.",
      eveningBn: "পৌষী বা ঝাউবনে ৩০+ পদের দেশীয় ভর্তা ও পাহাড়ি খাবারের স্বাদ নেওয়া।",
      corridor: "Town Historic Quarters",
      vehicle: "Walking & Local Tomtom (৳30–৳60)",
      tip: {
        en: "Kindly remove footwear respectfully outside monastery prayer halls and temples.",
        bn: "বৌদ্ধ বিহার ও প্রার্থনাকক্ষে প্রবেশের পূর্বে জুতো খুলে শ্রদ্ধাশীল আচরণ বজায় রাখুন।"
      }
    },
    {
      day: 2,
      titleEn: "Ramu 100-Ft Reclining Buddha & Bronze Foundries",
      titleBn: "রামু ১০০ ফুট বুদ্ধ ও প্রাচীন কারুশিল্প",
      morningEn: "Drive 16 km inland to Ramu to see the colossal 100-foot Reclining Gautama Buddha statue at Vimukti Bidarshan Bhabna Kendra.",
      morningBn: "রামুতে অবস্থিত ১০০ ফুট দীর্ঘ ধ্যানমগ্ন বুদ্ধ মূর্তি ও বিহার দর্শন।",
      afternoonEn: "Explore ancient wooden monasteries (Lanka Khyang) and traditional brass & bronze casting workshops.",
      afternoonBn: "লঙ্কা ক্যাং ও স্থানীয় ব্রোঞ্জের কারিগরদের প্রাচীন শিল্পকর্ম দেখা।",
      eveningEn: "Return to town. Sample fresh green coconut water and crispy sweet roasted nuts.",
      eveningBn: "শহরে ফিরে ডাবের পানি ও সুস্বাদু বাদামের স্বাদ নেওয়া।",
      corridor: "Cox's Bazar to Ramu (16 km)",
      vehicle: "CNG Auto-Rickshaw (৳400–৳600 roundtrip)",
      tip: {
        en: "Book your CNG on a round-trip basis so your driver waits while you explore the different monasteries.",
        bn: "রামুর দর্শনীয় স্থানগুলো ঘুরে দেখার সুবিধার্থে সিএনজিটি যাওয়া-আসার চুক্তিতে রিজার্ভ করুন।"
      }
    },
    {
      day: 3,
      titleEn: "Maheshkhali Hillside Pilgrimage & Golden Pagodas",
      titleBn: "মহেশখালী তীর্থযাত্রা ও স্বর্ণ মন্দির",
      morningEn: "Cross the channel to Maheshkhali Island. Visit the ancient Adinath Shiva Temple and the Buddhist Golden Temple.",
      morningBn: "মহেশখালী গিয়ে ঐতিহাসিক আদিনাথ মন্দির ও স্বর্ণ প্যাগোডা পরিদর্শন।",
      afternoonEn: "Taste local sweet betel leaves (Paan) and fresh island bananas grown on Mainak Hill.",
      afternoonBn: "মহেশখালীর বিখ্যাত মিষ্টি পান ও স্থানীয় ফলের স্বাদ উপভোগ।",
      eveningEn: "Watch traditional fishing crews mend their handmade nets along the salt marsh docks.",
      eveningBn: "লবণ চাষ ও জেলেদের জাল বোনার দৃশ্য দেখা।",
      corridor: "Maheshkhali Island",
      vehicle: "Speedboat & Island Tomtom (৳300–৳500)",
      tip: {
        en: "Sample the renowned Maheshkhali sweet betel leaf from vendors near the temple steps.",
        bn: "মন্দির প্রাঙ্গণের দোকানগুলো থেকে মহেশখালীর বিখ্যাত মিষ্টি পানের স্বাদ নিতে পারেন।"
      }
    },
    {
      day: 4,
      titleEn: "Nazirartek Artisanal Fish Settlement & Salt Fields",
      titleBn: "নাজিরারটেক শুঁটকি মহাল ও লবণ মাঠ",
      morningEn: "Visit Nazirartek, Asia's largest natural sun-drying fish village. Witness centuries of marine processing heritage.",
      morningBn: "এশিয়া মহাদেশের বৃহত্তম শুঁটকি পল্লী নাজিরারটেক দর্শন।",
      afternoonEn: "Explore the nearby white salt pans where seawater evaporates under the blazing coastal sun.",
      afternoonBn: "উপকূলীয় সাদা লবণ মাঠের প্রাকৃতিক উৎপাদন দেখা।",
      eveningEn: "Authentic dinner of spicy Loitta Shutki bhuna and hot steaming rice.",
      eveningBn: "স্থানীয় হোটেল থেকে খাঁটি লইট্টা শুঁটকি ভুনা দিয়ে রাতের ভোজন।",
      corridor: "Northern Coast (6 km)",
      vehicle: "Tomtom (৳60–৳100)",
      tip: {
        en: "Morning hours (8:30–11:00 AM) offer the best natural daylight and active processing scenes.",
        bn: "সকাল সাড়ে ৮টা থেকে ১১টার রোদে শুঁটকি প্রক্রিয়াকরণ ও ছবি তোলার সেরা দৃশ্য পাওয়া যায়।"
      }
    },
    {
      day: 5,
      titleEn: "Local Markets & Archival Farewell",
      titleBn: "স্থানীয় বাজার ও প্রস্থান",
      morningEn: "Early morning visit to Fish Market at Fishery Ghat to see deep-sea trawlers unloading the morning harvest.",
      morningBn: "ফিশারি ঘাটে গভীর সমুদ্রের ট্রলার থেকে তাজা মাছ নামানোর কর্মচাঞ্চল্য দেখা।",
      afternoonEn: "Final market shopping for genuine dried fish, Burmese pickles, and handmade woven bags.",
      afternoonBn: "আসল শুঁটকি ও বার্মিজ হস্তশিল্প কেনাকাটা।",
      eveningEn: "Depart with rich cultural memories of southern Bangladesh.",
      eveningBn: "অবিস্মরণীয় অভিজ্ঞতা নিয়ে বিদায়।",
      corridor: "Fishery Ghat & Town",
      vehicle: "Local Transit (৳100–৳200)",
      tip: {
        en: "Fishery Ghat operates at peak vigor between 6:30 and 8:00 AM when boats dock.",
        bn: "ফিশারি ঘাটে ট্রলার ভিড়ার প্রাণবন্ত রূপ দেখতে সকাল ৭টার আগেই উপস্থিত হওয়া শ্রেয়।"
      }
    }
  ]
};

function composeSteppedItinerary(days, vibe) {
  FeaturesState.totalDays = days || FeaturesState.totalDays || 3;
  FeaturesState.tripVibe = vibe || FeaturesState.tripVibe || 'relaxing';
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';

  // 1. Update Duration Buttons
  [2, 3, 5].forEach(d => {
    const btn = document.getElementById(`btn-duration-${d}`);
    if (btn) {
      if (d === FeaturesState.totalDays) {
        btn.className = "px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-charcoal bg-charcoal text-white transition cursor-pointer";
      } else {
        btn.className = "px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-stone-300 hover:border-charcoal bg-white text-charcoal transition cursor-pointer";
      }
    }
  });

  // 2. Update Vibe Buttons
  ['relaxing', 'adventure', 'local'].forEach(v => {
    const btn = document.getElementById(`btn-vibe-${v}`);
    if (btn) {
      if (v === FeaturesState.tripVibe) {
        btn.className = "px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-charcoal bg-charcoal text-white transition cursor-pointer";
      } else {
        btn.className = "px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-stone-300 hover:border-charcoal bg-white text-charcoal transition cursor-pointer";
      }
    }
  });

  // 3. Render Output
  const output = document.getElementById('itinerary-stepped-output');
  if (!output) return;

  const planList = (STEPPED_ITINERARY_PLANS[FeaturesState.tripVibe] || STEPPED_ITINERARY_PLANS.relaxing).slice(0, FeaturesState.totalDays);

  const vibeLabels = {
    relaxing: { en: 'Relaxing & Scenic', bn: 'প্রশান্তিদায়ক ও নৈসর্গিক' },
    adventure: { en: 'Adventure & Coastal Waves', bn: 'অ্যাডভেঞ্চার ও রোমাঞ্চ' },
    local: { en: 'Local Culture & Food Heritage', bn: 'ঐতিহ্য ও স্থানীয় খাবার' }
  };
  const activeVibeLabel = vibeLabels[FeaturesState.tripVibe] ? vibeLabels[FeaturesState.tripVibe][lang] : FeaturesState.tripVibe;

  const daysHTML = planList.map((item) => {
    const title = lang === 'en' ? item.titleEn : item.titleBn;
    const morning = lang === 'en' ? item.morningEn : item.morningBn;
    const afternoon = lang === 'en' ? item.afternoonEn : item.afternoonBn;
    const evening = lang === 'en' ? item.eveningEn : item.eveningBn;
    const tipText = item.tip ? (lang === 'en' ? item.tip.en : item.tip.bn) : '';

    return `
      <div class="itinerary-day-card bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
        
        <!-- Day Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-200/80">
          <div class="flex items-center gap-3">
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider bg-charcoal text-white">
              ${lang === 'en' ? `DAY 0${item.day}` : `দিন ০${item.day}`}
            </span>
            <h3 class="font-serif text-2xl sm:text-3xl text-charcoal font-normal tracking-tight">
              ${title}
            </h3>
          </div>
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-mono">
            <span>📍</span>
            <span>${item.corridor}</span>
          </span>
        </div>

        <!-- 3 Neat Time Windows -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
          
          <!-- Morning -->
          <div class="p-5 rounded-2xl bg-[#FAF9F6] border border-stone-200/80 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-terracotta-600">
                <span>🌅</span>
                <span>${lang === 'en' ? '07:30 – 11:30' : 'সকাল ০৭:৩০ – ১১:৩০'}</span>
              </span>
              <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white text-stone-500 border border-stone-200">
                ${lang === 'en' ? 'Morning' : 'সকাল'}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
              ${morning}
            </p>
          </div>

          <!-- Afternoon -->
          <div class="p-5 rounded-2xl bg-[#FAF9F6] border border-stone-200/80 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-sage-700">
                <span>☀️</span>
                <span>${lang === 'en' ? '12:30 – 16:00' : 'দুপুর ১২:৩০ – ১৬:০০'}</span>
              </span>
              <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white text-stone-500 border border-stone-200">
                ${lang === 'en' ? 'Afternoon' : 'দুপুর'}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
              ${afternoon}
            </p>
          </div>

          <!-- Evening -->
          <div class="p-5 rounded-2xl bg-[#FAF9F6] border border-stone-200/80 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold text-charcoal">
                <span>🌙</span>
                <span>${lang === 'en' ? '16:30 – 21:00' : 'সন্ধ্যা ১৬:৩০ – ২১:০০'}</span>
              </span>
              <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white text-stone-500 border border-stone-200">
                ${lang === 'en' ? 'Sunset & Night' : 'সন্ধ্যা ও রাত'}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
              ${evening}
            </p>
          </div>

        </div>

        <!-- Transit & Tip Logistics Bar -->
        <div class="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-stone-600">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-charcoal">🚗 ${lang === 'en' ? 'TRANSIT:' : 'যাতায়াত:'}</span>
            <span>${item.vehicle}</span>
          </div>
          ${tipText ? `
            <div class="flex items-center gap-1.5 text-stone-600 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200/70">
              <span>💡</span>
              <span>${tipText}</span>
            </div>
          ` : ''}
        </div>

      </div>
    `;
  }).join('');

  output.innerHTML = `
    <div class="space-y-6">
      
      <!-- Top Summary & Action Toolbar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2" data-no-export="true">
        <div>
          <span class="block text-xs font-mono uppercase tracking-widest text-stone-400">
            ${lang === 'en' ? `COMPILED ${FeaturesState.totalDays}-DAY PLAN` : `${FeaturesState.totalDays} দিনের সংকলিত রুট প্ল্যান`}
          </span>
          <span class="font-serif text-xl sm:text-2xl text-charcoal font-normal">
            ${activeVibeLabel}
          </span>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onclick="copyItineraryText()"
            class="px-3.5 py-2 rounded-full border border-stone-300 hover:border-charcoal text-xs font-mono uppercase tracking-wider text-charcoal transition bg-white cursor-pointer"
            title="Copy Itinerary to Clipboard"
          >
            ${lang === 'en' ? '📋 Copy Plan' : '📋 কপি করুন'}
          </button>
          <button
            type="button"
            onclick="printItinerary()"
            class="px-3.5 py-2 rounded-full border border-stone-300 hover:border-charcoal text-xs font-mono uppercase tracking-wider text-charcoal transition bg-white cursor-pointer"
            title="Print Itinerary"
          >
            ${lang === 'en' ? '🖨️ Print' : '🖨️ প্রিন্ট'}
          </button>
          <button
            type="button"
            onclick="downloadItineraryPNG()"
            class="px-3.5 py-2 rounded-full border border-stone-300 hover:border-charcoal text-xs font-mono uppercase tracking-wider text-charcoal transition bg-white cursor-pointer"
          >
            ${lang === 'en' ? '🖼️ Save PNG' : '🖼️ পিএনজি'}
          </button>
          <button
            type="button"
            onclick="downloadItineraryPDF()"
            class="px-4 py-2 rounded-full bg-charcoal hover:bg-black text-xs font-mono uppercase tracking-wider text-white transition cursor-pointer"
          >
            ${lang === 'en' ? '📄 Download PDF' : '📄 পিডিএফ'}
          </button>
        </div>
      </div>

      <!-- Days Stack -->
      <div class="space-y-6">
        ${daysHTML}
      </div>

    </div>
  `;
}

/* --------------------------------------------------------------------------
 * EXPORT ACTIONS: PDF, PNG, PRINT & CLIPBOARD
 * -------------------------------------------------------------------------- */
async function downloadItineraryPNG() {
  const targetEl = document.getElementById('itinerary-stepped-output');
  if (!targetEl) return;
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';

  if (typeof html2canvas === 'undefined') {
    window.print();
    return;
  }

  showUserToast(lang === 'en' ? 'Generating PNG image...' : 'ইমেজ প্রস্তুত হচ্ছে...');
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    const canvas = await html2canvas(targetEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FAF9F6',
      logging: false,
      ignoreElements: (element) => element.hasAttribute('data-no-export')
    });
    const link = document.createElement('a');
    link.download = `Visit-Cox-Itinerary-${FeaturesState.totalDays}-Days-${FeaturesState.tripVibe || 'plan'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    showUserToast(lang === 'en' ? 'Downloaded Itinerary PNG!' : 'ইমেজ ডাউনলোড সম্পন্ন হয়েছে!');
  } catch (err) {
    console.error('PNG Export Error:', err);
    window.print();
  }
}

async function downloadItineraryPDF() {
  const targetEl = document.getElementById('itinerary-stepped-output');
  if (!targetEl) return;
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';

  if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
    window.print();
    return;
  }

  showUserToast(lang === 'en' ? 'Generating PDF itinerary...' : 'পিডিএফ তৈরি হচ্ছে...');
  try {
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }
    const canvas = await html2canvas(targetEl, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FAF9F6',
      logging: false,
      ignoreElements: (element) => element.hasAttribute('data-no-export')
    });
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const { jsPDF } = window.jspdf;
    const pdfWidthMm = 210; // A4 width
    const pdfHeightMm = Math.round((canvas.height * pdfWidthMm) / canvas.width);

    const pdf = new jsPDF({
      orientation: pdfHeightMm > pdfWidthMm ? 'portrait' : 'landscape',
      unit: 'mm',
      format: [pdfWidthMm, Math.max(297, pdfHeightMm + 10)]
    });

    pdf.addImage(imgData, 'JPEG', 0, 5, pdfWidthMm, pdfHeightMm);
    pdf.save(`Visit-Cox-Itinerary-${FeaturesState.totalDays}-Days-${FeaturesState.tripVibe || 'plan'}.pdf`);
    showUserToast(lang === 'en' ? 'Downloaded Itinerary PDF!' : 'পিডিএফ ডাউনলোড সম্পন্ন হয়েছে!');
  } catch (err) {
    console.error('PDF Export Error:', err);
    window.print();
  }
}

function printItinerary() {
  window.print();
}

function copyItineraryText() {
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const planList = (STEPPED_ITINERARY_PLANS[FeaturesState.tripVibe] || STEPPED_ITINERARY_PLANS.relaxing).slice(0, FeaturesState.totalDays);
  
  let text = `VISIT COX'S BAZAR — ${FeaturesState.totalDays}-DAY ${FeaturesState.tripVibe.toUpperCase()} ITINERARY\n`;
  text += `====================================================\n\n`;

  planList.forEach(item => {
    const title = lang === 'en' ? item.titleEn : item.titleBn;
    const morning = lang === 'en' ? item.morningEn : item.morningBn;
    const afternoon = lang === 'en' ? item.afternoonEn : item.afternoonBn;
    const evening = lang === 'en' ? item.eveningEn : item.eveningBn;
    const tip = item.tip ? (lang === 'en' ? item.tip.en : item.tip.bn) : '';

    text += `[ DAY 0${item.day} — ${title} ]\n`;
    text += `Corridor: ${item.corridor}\n`;
    text += `• Morning (07:30 - 11:30): ${morning}\n`;
    text += `• Afternoon (12:30 - 16:00): ${afternoon}\n`;
    text += `• Evening (16:30 - 21:00): ${evening}\n`;
    text += `• Transit: ${item.vehicle}\n`;
    if (tip) text += `• Insider Tip: ${tip}\n`;
    text += `\n`;
  });

  text += `Plan generated on Visit Cox (coxsbazar.xyz)\n`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showUserToast(lang === 'en' ? 'Itinerary copied to clipboard!' : 'রুট প্ল্যান কপি হয়েছে!');
    }).catch(() => {
      showUserToast(lang === 'en' ? 'Copied to clipboard' : 'কপি হয়েছে');
    });
  } else {
    showUserToast(lang === 'en' ? 'Clipboard not supported' : 'ক্লিপবোর্ড সমর্থিত নয়');
  }
}

/* --------------------------------------------------------------------------
 * 12. HOOK INTO GLOBAL RENDER & INITIALIZATION
 * -------------------------------------------------------------------------- */
function renderInteractiveFeatures() {
  if (typeof renderItineraryStudio === 'function') {
    renderItineraryStudio();
  }
  if (document.getElementById('coxs-bazar-map') && typeof L !== 'undefined') {
    if (!FeaturesState.mapInstance) {
      initTouristMap();
    }
    renderMapMarkersAndFilters();
  }
  composeSteppedItinerary(FeaturesState.totalDays || 3, FeaturesState.tripVibe || 'relaxing');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderInteractiveFeatures();
  });
} else {
  renderInteractiveFeatures();
}
