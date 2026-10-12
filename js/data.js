/**
 * ============================================================================
 * Visit Cox's Bazar - Centralized Data & Bilingual Content Store (CMS Ready)
 * ============================================================================
 * This modular file holds all structured data for Hotels, Destinations,
 * Hidden Gems, Transportation Routes, Essential Travel Info, FAQs, and
 * UI translations (English 'en' & Bengali 'bn').
 *
 * Replace or hydrate these objects via REST API / GraphQL endpoints when
 * connecting to a backend or Headless CMS.
 */

const CONFIG = {
  exchangeRateUSD: 120, // 1 USD = 120 BDT (Update dynamically via currency API if desired)
  defaultLang: 'en',
  defaultCurrency: 'BDT'
};

/* --------------------------------------------------------------------------
 * 1. UI TRANSLATIONS (English & Bengali)
 * -------------------------------------------------------------------------- */
const UI_TEXT = {
  en: {
    brandName: "Visit Cox's Bazar",
    brandTagline: "Bangladesh Coastal Guide",
    nav: {
      home: "Home",
      hotels: "Hotels",
      destinations: "Destinations",
      transport: "Transport",
      essentialInfo: "Essential Info",
      faq: "FAQ"
    },
    hero: {
      badge: "120 KM UNBROKEN SANDY SHORELINE",
      title: "Experience the Longest Sea Beach in the World",
      subtitle: "Your ultimate guide to hotels, sightseeing, and local travel in Cox's Bazar.",
      ctaHotels: "Find Hotels",
      ctaSpots: "Explore Spots",
      searchPlaceholder: "Search hotels, beaches, islands, or transport (e.g., Inani, Sea Crown, Tomtom)...",
      searchCategoryAll: "All Categories",
      searchCategoryHotels: "Hotels & Resorts",
      searchCategorySpots: "Sightseeing & Gems",
      searchCategoryTransport: "Local Transport",
      searchBtn: "Search Guide",
      stats: [
        { value: "120 km", label: "Unbroken Natural Beach" },
        { value: "5+", label: "Handpicked Stays" },
        { value: "9+", label: "Iconic Spots & Gems" },
        { value: "24/7", label: "Tourist Police Support" }
      ]
    },
    hotelsSection: {
      eyebrow: "CURATED ACCOMMODATIONS",
      title: "Where to Stay in Cox's Bazar",
      subtitle: "From beachfront family hotels to serene eco-park cottages—compare verified nightly rates in BDT or USD.",
      filterAll: "All Locations",
      perNight: "/ night",
      amenitiesLabel: "Key Amenities",
      inquireBtn: "Check Availability",
      locationLabel: "Location"
    },
    destinationsSection: {
      eyebrow: "SIGHTSEEING & EXPLORATION",
      title: "Iconic Destinations & Coastal Wonders",
      subtitle: "Discover dramatic coastal cliffs, coral boulders, island temples, and ancient Buddhist heritage around Cox's Bazar.",
      vibeLabel: "The Vibe",
      directionsLabel: "Directions",
      hiddenGemsBadge: "OFF THE BEATEN PATH",
      hiddenGemsTitle: "Hidden Gems of Cox's Bazar",
      hiddenGemsSubtitle: "Escape the crowds and experience untouched islands, golden sunset points, eco trails, and authentic local trade hubs."
    },
    transportSection: {
      eyebrow: "GETTING AROUND EASILY",
      title: "Local Transportation & Pricing Guide",
      subtitle: "Transparent local fares for both Bangladeshi travelers and international visitors—know before you ride.",
      foreignerNoteTitle: "Foreigner's Guide to Local Vehicles",
      foreignerNoteDesc: "Hover or tap on the highlighted vehicle names in the table below, or read this quick breakdown of Cox's Bazar's signature local rides:",
      tableHeaders: {
        route: "Route / Journey",
        vehicle: "Vehicle Type",
        cost: "Estimated Fare",
        bookingType: "Fare Type",
        duration: "Est. Duration"
      },
      rateDisclaimer: "* Fares shown are standard local rates. Always confirm the fare with the driver before boarding reserved vehicles."
    },
    essentialSection: {
      eyebrow: "KNOW BEFORE YOU GO",
      title: "Essential Travel Information",
      subtitle: "Everything local and international tourists need for a safe, respectful, and unforgettable coastal trip.",
      weather: {
        title: "Weather & Best Time to Visit",
        peakTitle: "Nov – Feb (Peak Winter Season)",
        peakDesc: "Cool, sunny, and dry (18°C – 28°C). Calm waves, ideal for swimming, island hopping, and camping.",
        shoulderTitle: "Mar – May (Warm Tropical Summer)",
        shoulderDesc: "Warm & breezy (25°C – 34°C). Great sunsets and fewer crowds; carry sunscreen and light cotton wear.",
        monsoonTitle: "Jun – Oct (Lush Monsoon)",
        monsoonDesc: "Frequent coastal rains and dramatic skies. Himchari waterfalls and green hills are at their most vibrant."
      },
      etiquette: {
        title: "Cultural Etiquette & Dress Codes",
        items: [
          {
            label: "Beach Attire",
            text: "Cox's Bazar has a family-oriented local culture. Modest swimwear (t-shirts, shorts, or full-body swimwear) is customary on public beaches like Laboni and Sugandha."
          },
          {
            label: "Religious Sites",
            text: "Cover shoulders and knees and remove footwear before entering Ramu Buddhist monasteries, mosques, or Moheshkhali's Adinath Temple."
          },
          {
            label: "Photography & Locals",
            text: "Always ask permission before photographing local fishermen, Rakhine artisans, or village residents."
          },
          {
            label: "Smart Bargaining",
            text: "Fixed fares apply for shared Tomtoms, but polite bargaining is expected when hiring reserved CNGs, Chander Gari jeeps, or buying dried fish & Burmese market souvenirs."
          }
        ]
      },
      emergency: {
        title: "24/7 Emergency Contacts",
        subtitle: "Keep these official numbers handy during your stay in Cox's Bazar:",
        contacts: [
          { name: "National Emergency Hotline", number: "999", note: "Police, Ambulance & Fire (Toll-Free)" },
          { name: "Tourist Police Cox's Bazar", number: "+880 1320-160000", note: "24/7 Beach Patrol & Foreigner Helpdesk" },
          { name: "Cox's Bazar District Sadar Hospital", number: "+880 1730-324777", numberDisplay: "+880 1730-324777", note: "250-Bed General & Emergency Care" },
          { name: "Beach Lifeguard Control Room", number: "+880 1819-000111", note: "Sea Safe Lifeguard Rescue Post (Laboni/Sugandha)" }
        ]
      }
    },
    faqSection: {
      eyebrow: "GOT QUESTIONS?",
      title: "Frequently Asked Questions",
      subtitle: "Quick answers to the most common questions from first-time visitors and international travelers."
    },
    chatbot: {
      title: "Cox's Bazar Travel Assistant",
      status: "Online • Instant Local Guide",
      welcome: "Hello! I can help you with hotel prices, transport routes, and tourist spots in Cox's Bazar. What do you need help with today?",
      inputPlaceholder: "Ask about hotels, Tomtoms, Inani, fares...",
      sendBtn: "Send",
      quickPrompts: [
        "Hotel prices",
        "How to reach Inani?",
        "What is Tomtom & Chander Gari?",
        "Best time to visit?"
      ]
    },
    footer: {
      about: "Your trusted bilingual digital companion for exploring Cox's Bazar—the world's longest natural sea beach in Bangladesh.",
      quickLinks: "Quick Navigation",
      travelerTools: "Traveler Preferences",
      copyright: "© 2026 Visit Cox's Bazar Tourism Guide. Built for Local & Global Explorers."
    }
  },

  bn: {
    brandName: "ভিজিট কক্সবাজার",
    brandTagline: "বাংলাদেশ উপকূলীয় ভ্রমণ গাইড",
    nav: {
      home: "হোম",
      hotels: "হোটেল",
      destinations: "দর্শনীয় স্থান",
      transport: "যাতায়াত ও ভাড়া",
      essentialInfo: "জরুরি তথ্য",
      faq: "প্রশ্নোত্তর"
    },
    hero: {
      badge: "১২০ কিমি দীর্ঘ অবিচ্ছিন্ন বালুকাময় সমুদ্র সৈকত",
      title: "উপভোগ করুন বিশ্বের দীর্ঘতম সমুদ্র সৈকত",
      subtitle: "কক্সবাজারের হোটেল, দর্শনীয় স্থান এবং স্থানীয় যাতায়াতের সম্পূর্ণ গাইড।",
      ctaHotels: "হোটেল খুঁজুন",
      ctaSpots: "দর্শনীয় স্থান দেখুন",
      searchPlaceholder: "হোটেল, সৈকত, দ্বীপ বা যানবাহন খুঁজুন (যেমন: ইনানী, সী ক্রাউন, টমটম)...",
      searchCategoryAll: "সব ক্যাটাগরি",
      searchCategoryHotels: "হোটেল ও রিসোর্ট",
      searchCategorySpots: "দর্শনীয় স্থান",
      searchCategoryTransport: "স্থানীয় যাতায়াত",
      searchBtn: "অনুসন্ধান করুন",
      stats: [
        { value: "১২০ কিমি", label: "অবিচ্ছিন্ন প্রাকৃতিক সৈকত" },
        { value: "৫+", label: "সেরা হোটেল ও রিসোর্ট" },
        { value: "৯+", label: "দর্শনীয় স্থান ও হিডেন জেমস" },
        { value: "২৪/৭", label: "ট্যুরিস্ট পুলিশ সহায়তা" }
      ]
    },
    hotelsSection: {
      eyebrow: "সেরা আবাসন ব্যবস্থা",
      title: "কক্সবাজারে কোথায় থাকবেন",
      subtitle: "সৈকত সংলগ্ন ফ্যামিলি হোটেল থেকে শুরু করে নির্জন ইকো-পার্ক কটেজ—টাকা (BDT) অথবা ডলারে (USD) ভাড়া তুলনা করুন।",
      filterAll: "সব এলাকা",
      perNight: "/ প্রতি রাত",
      amenitiesLabel: "প্রধান সুবিধাসমূহ",
      inquireBtn: "বুকিং তথ্য দেখুন",
      locationLabel: "অবস্থান"
    },
    destinationsSection: {
      eyebrow: "ভ্রমণ ও দর্শনীয় স্থান",
      title: "জনপ্রিয় দর্শনীয় স্থান ও উপকূলীয় সৌন্দর্য",
      subtitle: "কক্সবাজারের পাহাড়ঘেরা মেরিন ড্রাইভ, প্রবাল পাথরের সৈকত, দ্বীপের মন্দির এবং রামুর প্রাচীন বৌদ্ধ ঐতিহ্য ঘুরে দেখুন।",
      vibeLabel: "পরিবেশ ও আমেজ",
      directionsLabel: "যাতায়াত নির্দেশনা",
      hiddenGemsBadge: "নির্জন ও অনন্য স্থান",
      hiddenGemsTitle: "কক্সবাজারের হিডেন জেমস (অদেখা সৌন্দর্য)",
      hiddenGemsSubtitle: "কোলাহল ছাড়িয়ে ঘুরে আসুন নির্জন দ্বীপ, শামলাপুর সূর্যাস্ত পয়েন্ট, ইকো-পার্ক ট্রেকিং এবং নাজিরারটেক শুঁটকি পল্লী।"
    },
    transportSection: {
      eyebrow: "সহজ যাতায়াত নির্দেশিকা",
      title: "স্থানীয় যাতায়াত ও ভাড়ার তালিকা",
      subtitle: "দেশি ও বিদেশি পর্যটকদের জন্য কক্সবাজারের স্থানীয় যানবাহনের নির্ধারিত ও আনুমানিক ভাড়ার তালিকা।",
      foreignerNoteTitle: "স্থানীয় যানবাহন পরিচিতি (টমটম ও চান্দের গাড়ি)",
      foreignerNoteDesc: "টেবিলের যানবাহনের নামের ওপর কার্সর রাখুন অথবা নিচের সংক্ষিপ্ত পরিচিতি থেকে কক্সবাজারের ঐতিহ্যবাহী যানবাহন সম্পর্কে জানুন:",
      tableHeaders: {
        route: "রুট / গন্তব্য",
        vehicle: "যানবাহনের ধরন",
        cost: "আনুমানিক ভাড়া",
        bookingType: "ভাড়ার ধরন",
        duration: "সম্ভাব্য সময়"
      },
      rateDisclaimer: "* প্রদর্শিত ভাড়াগুলো প্রচলিত স্থানীয় হার। রিজার্ভ গাণিতে ওঠার আগে চালকের সাথে ভাড়া নিশ্চিত করে নিন।"
    },
    essentialSection: {
      eyebrow: "ভ্রমণের পূর্বে করণীয়",
      title: "প্রয়োজনীয় ভ্রমণ তথ্য ও নির্দেশিকা",
      subtitle: "নিরাপদ, আনন্দময় এবং স্বাচ্ছন্দ্যপূর্ণ কক্সবাজার ভ্রমণের জন্য গুরুত্বপূর্ণ আবহাওয়া, সংস্কৃতি ও জরুরি নাম্বারসমূহ।",
      weather: {
        title: "আবহাওয়া ও ভ্রমণের সেরা সময়",
        peakTitle: "নভেম্বর – ফেব্রুয়ারি (শীতকাল - সেরা সময়)",
        peakDesc: "মনোরম ও শুষ্ক আবহাওয়া (১৮° - ২৮° সে.)। শান্ত সমুদ্র, সাঁতার কাটা, দ্বীপ ভ্রমণ ও ক্যাম্পিংয়ের জন্য সবচেয়ে উপযুক্ত।",
        shoulderTitle: "মার্চ – মে (গ্রীষ্মকাল)",
        shoulderDesc: "উষ্ণ ও রৌদ্রোজ্জ্বল (২৫° - ৩৪° সে.)। ভিড় কম থাকে এবং সূর্যাস্ত দারুণ দেখায়; সুতি পোশাক ও সানস্ক্রিন সাথে রাখুন।",
        monsoonTitle: "জুন – অক্টোবর (বর্ষাকাল)",
        monsoonDesc: "বৃষ্টিস্নাত সবুজ পাহাড় ও হিমছড়ির ঝর্ণা এই সময়ে সবচেয়ে সজীব রূপ ধারণ করে।"
      },
      etiquette: {
        title: "স্থানীয় সংস্কৃতি ও পোশাক বিধি",
        items: [
          {
            label: "সৈকতের পোশাক",
            text: "কক্সবাজারে পারিবারিক পরিবেশ বজায় থাকে। লাবণী ও সুগন্ধার মতো পাবলিক সৈকতে শালীন ও আরামদায়ক পোশাক (টি-শার্ট, ট্রাউজার/শর্টস) পরিধান করা শ্রেয়।"
          },
          {
            label: "ধর্মীয় স্থান পরিদর্শন",
            text: "রামুর বৌদ্ধ বিহার, মসজিদ বা মহেশখালীর আদিনাথ মন্দিরে প্রবেশের আগে জুতো খুলে প্রবেশ করুন এবং শালীন পোশাক বজায় রাখুন।"
          },
          {
            label: "ছবি তোলার সৌজন্যতা",
            text: "স্থানীয় জেলে, রাখাইন সম্প্রদায় বা গ্রামবাসীর ছবি তোলার আগে বিনীতভাবে অনুমতি নিন।"
          },
          {
            label: "দরদাম করার পরামর্শ",
            text: "শেয়ারড টমটমে ভাড়া নির্ধারিত থাকে, তবে রিজার্ভ সিএনজি, চান্দের গাড়ি বা বার্মিজ মার্কেটে কেনাকাটার সময় দরদাম করে নেওয়া ভালো।"
          }
        ]
      },
      emergency: {
        title: "২৪/৭ জরুরি যোগাযোগ নাম্বার",
        subtitle: "কক্সবাজার ভ্রমণকালে যেকোনো প্রয়োজনে নিচের সরকারি নাম্বারগুলোতে যোগাযোগ করুন:",
        contacts: [
          { name: "জাতীয় জরুরি সেবা", number: "999", note: "পুলিশ, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস (টোল-ফ্রি)" },
          { name: "ট্যুরিস্ট পুলিশ কক্সবাজার", number: "+880 1320-160000", note: "২৪/৭ সৈকত টহল ও পর্যটক সহায়তা কেন্দ্র" },
          { name: "কক্সবাজার জেলা সদর হাসপাতাল", numberDisplay: "+880 1730-324777", number: "+880 1730-324777", note: "২৫০ শয্যা বিশিষ্ট জেনারেল ও জরুরি চিকিৎসা" },
          { name: "সি-সেফ লাইফগার্ড কন্ট্রোল রুম", number: "+880 1819-000111", note: "সৈকত উদ্ধারকর্মী দল (লাবণী/সুগন্ধা পয়েন্ট)" }
        ]
      }
    },
    faqSection: {
      eyebrow: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
      title: "পর্যটকদের সাধারণ প্রশ্নোত্তর (FAQ)",
      subtitle: "কক্সবাজার ভ্রমণ সম্পর্কে দেশি ও বিদেশি পর্যটকদের সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের উত্তর।"
    },
    chatbot: {
      title: "Cox's Bazar Travel Assistant",
      status: "অনলাইন • তাৎক্ষণিক ভ্রমণ সহায়তা",
      welcome: "Hello! I can help you with hotel prices, transport routes, and tourist spots in Cox's Bazar. What do you need help with today?",
      inputPlaceholder: "হোটেল ভাড়া, ইনানী, টমটম বা দর্শনীয় স্থান সম্পর্কে লিখুন...",
      sendBtn: "পাঠান",
      quickPrompts: [
        "হোটেলের ভাড়া কত?",
        "ইনানী সৈকতে কীভাবে যাব?",
        "টমটম ও চান্দের গাড়ি কী?",
        "ভ্রমণের সেরা সময় কোনটি?"
      ]
    },
    footer: {
      about: "বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত কক্সবাজার ভ্রমণের জন্য আপনার বিশ্বস্ত দ্বিভাষিক ডিজিটাল গাইড।",
      quickLinks: "দ্রুত লিংকসমূহ",
      travelerTools: "ভ্রমণকারী সেটিংস",
      copyright: "© ২০২৬ ভিজিট কক্সবাজার ট্যুরিজম গাইড। দেশি ও বিদেশি পর্যটকদের জন্য নির্মিত।"
    }
  }
};

/* --------------------------------------------------------------------------
 * 2. ACCOMMODATIONS DATA (Exact 5 Hotels from Specification)
 * -------------------------------------------------------------------------- */
const HOTELS_DATA = [
  {
    id: "hotel-sea-crown",
    name: {
      en: "Hotel Sea Crown",
      bn: "হোটেল সী ক্রাউন (Hotel Sea Crown)"
    },
    locationKey: "Sugandha Beach",
    location: {
      en: "Sugandha Beach",
      bn: "সুগন্ধা বিচ"
    },
    minBDT: 2500,
    maxBDT: 4500,
    rating: "4.6",
    badge: {
      en: "Beachfront Favorite",
      bn: "সৈকত সংলগ্ন"
    },
    amenities: {
      en: ["Beachfront", "Free breakfast", "Family-friendly"],
      bn: ["সৈকত সংলগ্ন (Beachfront)", "বিনামূল্যে সকালের নাস্তা", "পরিবার-বান্ধব পরিবেশ"]
    },
    description: {
      en: "Step directly onto the golden sands of Sugandha Beach. Ideal for families seeking direct ocean views and complimentary morning breakfast.",
      bn: "সুগন্ধা সৈকতের একদম তীরে অবস্থিত। সমুদ্রের দৃশ্য, কমপ্লিমেন্টারি ব্রেকফাস্ট এবং পরিবারের সাথে থাকার জন্য অনন্য।"
    },
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "prime-park-hotel",
    name: {
      en: "Prime Park Hotel",
      bn: "প্রাইম পার্ক হোটেল (Prime Park Hotel)"
    },
    locationKey: "Kalatali Road",
    location: {
      en: "Kalatali Road",
      bn: "কলাতলী রোড"
    },
    minBDT: 1800,
    maxBDT: 3500,
    rating: "4.4",
    badge: {
      en: "Hill & Sea Vibe",
      bn: "পাহাড় ভিউ ও রুফটপ"
    },
    amenities: {
      en: ["Near beach", "Rooftop restaurant", "Hill views"],
      bn: ["সৈকতের কাছে", "রুফটপ রেস্টুরেন্ট", "মনোরম পাহাড়ের দৃশ্য"]
    },
    description: {
      en: "Conveniently situated along Kalatali Road within walking distance to the beach, featuring a panoramic rooftop restaurant overlooking lush coastal hills.",
      bn: "কলাতলী রোডে সৈকতের কাছেই অবস্থিত। এর রুফটপ রেস্টুরেন্ট থেকে সবুজ পাহাড় ও আশেপাশের চমৎকার দৃশ্য উপভোগ করা যায়।"
    },
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "hotel-kollol",
    name: {
      en: "Hotel Kollol",
      bn: "হোটেল কল্লোল (Hotel Kollol)"
    },
    locationKey: "Laboni Beach",
    location: {
      en: "Laboni Beach",
      bn: "লাবণী বিচ"
    },
    minBDT: 2000,
    maxBDT: 4000,
    rating: "4.5",
    badge: {
      en: "Pool & Prime Access",
      bn: "সুইমিং পুল সুবিধা"
    },
    amenities: {
      en: ["Close to main point", "Swimming pool", "In-house dining"],
      bn: ["মেইন পয়েন্টের কাছে", "সুইমিং পুল", "ইন-হাউস ডাইনিং রেস্টুরেন্ট"]
    },
    description: {
      en: "Located right near the iconic Laboni Beach main point, complete with a refreshing swimming pool and multi-cuisine in-house dining.",
      bn: "লাবণী বিচের মূল পয়েন্টের খুব কাছেই অবস্থিত। এতে রয়েছে চমৎকার সুইমিং পুল এবং নিজস্ব ডাইনিং রেস্টুরেন্ট।"
    },
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "nisanah-resort",
    name: {
      en: "Nisanah Resort",
      bn: "নিসানাহ রিসোর্ট (Nisanah Resort)"
    },
    locationKey: "Kolatoli Eco Park",
    location: {
      en: "Kolatoli Eco Park",
      bn: "কলাতলী ইকো পার্ক"
    },
    minBDT: 1500,
    maxBDT: 3000,
    rating: "4.3",
    badge: {
      en: "Best Budget Eco Stay",
      bn: "বাজেট ইকো রিসোর্ট"
    },
    amenities: {
      en: ["Cottage-style", "Quiet nature vibe", "Budget-friendly"],
      bn: ["কটেজ-স্টাইল ডিজাইন", "নিরিবিলি প্রকৃতির ছোঁয়া", "সাশ্রয়ী বাজেট"]
    },
    description: {
      en: "Tucked beside Kolatoli Eco Park, offering charming cottage-style rooms surrounded by greenery for travelers who love peace on a budget.",
      bn: "কলাতলী ইকো পার্কের পাশে শান্ত প্রকৃতির মাঝে কটেজ ধাঁচের সাশ্রয়ী ও মনোরম আবাসন।"
    },
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "white-orchid",
    name: {
      en: "White Orchid",
      bn: "হোয়াইট অর্কিড (White Orchid)"
    },
    locationKey: "Kalatali Road",
    location: {
      en: "Kalatali Road",
      bn: "কলাতলী রোড"
    },
    minBDT: 2000,
    maxBDT: 3500,
    rating: "4.4",
    badge: {
      en: "Business & Comfort",
      bn: "বিজনেস ক্লাস সেবা"
    },
    amenities: {
      en: ["Standard business-class", "Prompt service", "Secure parking"],
      bn: ["স্ট্যান্ডার্ড বিজনেস-ক্লাস", "দ্রুত রুম সার্ভিস", "নিরাপদ পার্কিং সুবিধা"]
    },
    description: {
      en: "Reliable business-class comfort on Kalatali Road featuring attentive room service, modern interiors, and gated private parking.",
      bn: "কলাতলী রোডে আধুনিক সুবিধা, দ্রুত সার্ভিস এবং নিজস্ব নিরাপদ পার্কিংসহ বিজনেস-ক্লাস হোটেল।"
    },
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80"
  }
];

/* --------------------------------------------------------------------------
 * 3. DESTINATIONS & SIGHTSEEING DATA (Exact 5 Main Spots + 4 Hidden Gems)
 * -------------------------------------------------------------------------- */
const DESTINATIONS_DATA = [
  {
    id: "himchari-national-park",
    name: {
      en: "Himchari National Park",
      bn: "হিমছড়ি জাতীয় উদ্যান (Himchari)"
    },
    tag: {
      en: "Hills & Waterfalls",
      bn: "পাহাড় ও ঝর্ণা"
    },
    vibe: {
      en: "Coastal hills meeting the sea.",
      bn: "সবুজ উপকূলীয় পাহাড় যেখানে সমুদ্রের সাথে মিশেছে।"
    },
    directions: {
      en: "18 km south on Marine Drive.",
      bn: "মেরিন ড্রাইভ ধরে ১৮ কিমি দক্ষিণে।"
    },
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "inani-beach",
    name: {
      en: "Inani Beach",
      bn: "ইনানী সমুদ্র সৈকত (Inani Beach)"
    },
    tag: {
      en: "Coral Boulder Beach",
      bn: "প্রবাল পাথরের সৈকত"
    },
    vibe: {
      en: "Quiet, rocky coral beach with clear water.",
      bn: "স্বচ্ছ নীল জলরাশি ও প্রবাল পাথর ঘেরা শান্ত সমুদ্র সৈকত।"
    },
    directions: {
      en: "32 km south on Marine Drive.",
      bn: "মেরিন ড্রাইভ ধরে ৩২ কিমি দক্ষিণে।"
    },
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "moheshkhali-island",
    name: {
      en: "Moheshkhali Island",
      bn: "মহেশখালী দ্বীপ (Moheshkhali Island)"
    },
    tag: {
      en: "Island & Heritage",
      bn: "দ্বীপ ও ঐতিহ্য"
    },
    vibe: {
      en: "Rich culture, Adinath Temple, salt pans.",
      bn: "সমৃদ্ধ সংস্কৃতি, পাহাড়চূড়ায় আদিনাথ মন্দির এবং লবণের মাঠ।"
    },
    directions: {
      en: "35 mins via speedboat from Kasturi Ghat.",
      bn: "কস্তুরাঘাট থেকে স্পিডবোটে মাত্র ৩৫ মিনিট।"
    },
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "radiant-fish-world",
    name: {
      en: "Radiant Fish World",
      bn: "রেডিয়েন্ট ফিশ ওয়ার্ল্ড (Radiant Fish World)"
    },
    tag: {
      en: "Marine Aquarium",
      bn: "সামুদ্রিক অ্যাকোয়ারিয়াম"
    },
    vibe: {
      en: "Bangladesh's first sea aquarium.",
      bn: "বাংলাদেশের প্রথম আন্তর্জাতিক মানের সামুদ্রিক ফিশ অ্যাকোয়ারিয়াম।"
    },
    directions: {
      en: "Located in Jhautola town center.",
      bn: "কক্সবাজার শহরের ঝাউতলা মূল কেন্দ্রে অবস্থিত।"
    },
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "100-feet-buddha-ramu",
    name: {
      en: "100 Feet Buddha (Ramu)",
      bn: "১০০ ফুট সিংহশয্যা বুদ্ধ মূর্তি (রামু)"
    },
    tag: {
      en: "Cultural Monument",
      bn: "বৌদ্ধ ঐতিহ্য ও নিদর্শন"
    },
    vibe: {
      en: "Massive reclining Buddha and monasteries.",
      bn: "বিশাল ১০০ ফুট শায়িত গৌতম বুদ্ধ মূর্তি ও প্রাচীন বৌদ্ধ বিহার।"
    },
    directions: {
      en: "16 km east on the highway.",
      bn: "মহাসড়ক ধরে ১৬ কিমি পূর্বে রামু উপজেলায়।"
    },
    image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=900&q=80"
  }
];

const HIDDEN_GEMS_DATA = [
  {
    id: "sonadia-island",
    name: {
      en: "Sonadia Island",
      bn: "সোনাদিয়া দ্বীপ"
    },
    highlight: {
      en: "Beach Camping & Sea Turtles",
      bn: "বিচ ক্যাম্পিং ও নির্জন প্রকৃতি"
    },
    description: {
      en: "An untouched crescent island famous for starry-night beach camping, red crabs, migratory birds, and olive ridley turtle nesting grounds.",
      bn: "রাতের তারার নিচে বিচ ক্যাম্পিং, লাল কাঁকড়া, অতিথি পাখি এবং নির্জন প্যারাবনের জন্য বিখ্যাত এক অকৃত্রিম দ্বীপ।"
    },
    icon: "tent"
  },
  {
    id: "shamlapur-sunset-point",
    name: {
      en: "Marine Drive Sunset Point at Shamlapur",
      bn: "শামলাপুর মেরিন ড্রাইভ সানসেট পয়েন্ট"
    },
    highlight: {
      en: "Traditional Moon Boats & Golden Hour",
      bn: "সাম্পান নৌকা ও রক্তিম সূর্যাস্ত"
    },
    description: {
      en: "Located further down Marine Drive in Baharchhara—watch iconic crescent-shaped wooden fishing boats ('Sampans') silhouetted against fiery sunsets.",
      bn: "মেরিন ড্রাইভের বাহারছড়ায় অবস্থিত এই সৈকতে ঐতিহ্যবাহী বাঁকানো সাম্পান নৌকা ও অপরূপ সূর্যাস্তের দৃশ্য মুগ্ধ করার মতো।"
    },
    icon: "sunset"
  },
  {
    id: "kolatoli-eco-park",
    name: {
      en: "Kolatoli Eco Park Trekking",
      bn: "কলাতলী ইকো পার্ক ট্রেকিং"
    },
    highlight: {
      en: "Forest Canopy & Hill Trails",
      bn: "পাহাড়ি ট্রেইল ও অরণ্য ভ্রমণ"
    },
    description: {
      en: "A lush biodiversity trail right behind Kalatali where hikers can trek through tropical hill ridges with sweeping views of the Bay of Bengal.",
      bn: "কলাতলীর পেছনেই সবুজ পাহাড়ি বনাঞ্চলে হাইকিং ও ট্রেকিংয়ের দারুণ সুযোগ, যেখান থেকে বঙ্গোপসাগরের দিগন্তজোড়া দৃশ্য দেখা যায়।"
    },
    icon: "trees"
  },
  {
    id: "najirartek-dried-fish-hub",
    name: {
      en: "Najirartek Dried Fish Hub",
      bn: "নাজিরারটেক শুঁটকি মহাল"
    },
    highlight: {
      en: "Largest Coastal Fish Processing Hub",
      bn: "দেশের বৃহত্তম শুঁটকি প্রক্রিয়াজাতকরণ কেন্দ্র"
    },
    description: {
      en: "Located at the estuary near the airport—witness thousands of bamboo racks sun-drying marine catch and buy authentic chemical-free dried fish.",
      bn: "বাঁকখালী নদীর মোহনায় শত শত বাঁশের মাচায় সামুদ্রিক মাছ শুকানোর বিশাল কর্মযজ্ঞ এবং খাঁটি শুঁটকি কেনার সেরা স্থান।"
    },
    icon: "fish"
  }
];

/* --------------------------------------------------------------------------
 * 4. TRANSPORTATION & PRICING DATA (Exact 6 Routes + Foreigner Glossary)
 * -------------------------------------------------------------------------- */
const VEHICLE_GLOSSARY = {
  tomtom: {
    title: {
      en: "Tomtom (Easybike)",
      bn: "টমটম (ইজিবাইক)"
    },
    desc: {
      en: "Local battery-powered 3-wheeler electric Tuk-Tuk holding 6–8 passengers. Cheap hop-on/hop-off shared rides along town and beach roads.",
      bn: "ব্যাটারিচালিত পরিবেশবান্ধব অটোরিকশা যা ৬-৮ জন যাত্রী বহন করে। শহর ও সৈকতের স্বল্প দূরত্বে শেয়ারড যাতায়াতের সবচেয়ে সস্তা মাধ্যম।"
    }
  },
  chander_gari: {
    title: {
      en: "Chander Gari ('Moon Car' Open Jeep)",
      bn: "চান্দের গাড়ি (খোলা ছাদের জিপ)"
    },
    desc: {
      en: "Iconic open-top modified 4x4 utility jeep seating 10–14 people. Perfect for groups cruising down the scenic Marine Drive to Himchari & Inani.",
      bn: "কক্সবাজার ও পার্বত্য অঞ্চলের জনপ্রিয় খোলা ছাদের জিপ গাড়ি (১০-১৪ আসন)। দলবেঁধে মেরিন ড্রাইভ ও ইনানী ভ্রমণের জন্য সবচেয়ে রোমাঞ্চকর বাহন।"
    }
  },
  cng: {
    title: {
      en: "CNG Auto-Rickshaw",
      bn: "সিএনজি অটোরিকশা (CNG)"
    },
    desc: {
      en: "Green natural-gas powered 3-wheeler cab seating up to 3–4 passengers. Faster than Tomtoms and ideal for reserved trips to Himchari or Ramu.",
      bn: "৩-৪ জন যাত্রীর জন্য দ্রুতগতির থ্রি-হুইলার। হিমছড়ি বা রামুতে রিজার্ভ যাতায়াতের জন্য আরামদায়ক।"
    }
  },
  speedboat: {
    title: {
      en: "Speedboat (Kasturi Ghat / 6 No. Ghat)",
      bn: "স্পিডবোট (কস্তুরাঘাট / ৬ নং ঘাট)"
    },
    desc: {
      en: "Fast fiber-hull motorboat crossing the Bakkhali river channel to Moheshkhali Island. Life jackets are provided on board.",
      bn: "বাঁকখালী মোহনা পেরিয়ে দ্রুততম সময়ে মহেশখালী দ্বীপে যাওয়ার ফাইবার মোটরবোট।"
    }
  }
};

const TRANSPORT_DATA = [
  {
    id: "town-to-laboni-sugandha",
    route: {
      en: "Town to Laboni / Sugandha",
      bn: "শহর থেকে লাবণী / সুগন্ধা সৈকত"
    },
    vehicle: {
      en: "Tomtom (Easybike)",
      bn: "টমটম (ইজিবাইক)"
    },
    vehicleKey: "tomtom",
    minBDT: 15,
    maxBDT: 20,
    modeNote: {
      en: "Shared",
      bn: "শেয়ারড (জনপ্রতি)"
    },
    duration: {
      en: "10 mins",
      bn: "১০ মিনিট"
    }
  },
  {
    id: "kalatali-to-sugandha",
    route: {
      en: "Kalatali to Sugandha",
      bn: "কলাতলী থেকে সুগন্ধা"
    },
    vehicle: {
      en: "Tomtom",
      bn: "টমটম"
    },
    vehicleKey: "tomtom",
    minBDT: 10,
    maxBDT: 10,
    modeNote: {
      en: "Shared",
      bn: "শেয়ারড (জনপ্রতি)"
    },
    duration: {
      en: "5 mins",
      bn: "৫ মিনিট"
    }
  },
  {
    id: "town-to-himchari",
    route: {
      en: "Town to Himchari",
      bn: "শহর থেকে হিমছড়ি"
    },
    vehicle: {
      en: "CNG Auto-Rickshaw",
      bn: "সিএনজি অটোরিকশা"
    },
    vehicleKey: "cng",
    minBDT: 300,
    maxBDT: 400,
    modeNote: {
      en: "Reserved",
      bn: "রিজার্ভড"
    },
    duration: {
      en: "30 mins",
      bn: "৩০ মিনিট"
    }
  },
  {
    id: "town-to-inani",
    route: {
      en: "Town to Inani Beach",
      bn: "শহর থেকে ইনানী সৈকত"
    },
    vehicle: {
      en: "Chander Gari (Jeep)",
      bn: "চান্দের গাড়ি (জিপ)"
    },
    vehicleKey: "chander_gari",
    minBDT: 1500,
    maxBDT: 2000,
    modeNote: {
      en: "Reserved for group",
      bn: "রিজার্ভড (গ্রুপের জন্য)"
    },
    duration: {
      en: "1 hour",
      bn: "১ ঘণ্টা"
    }
  },
  {
    id: "town-to-moheshkhali",
    route: {
      en: "Town to Moheshkhali",
      bn: "শহর থেকে মহেশখালী দ্বীপ"
    },
    vehicle: {
      en: "Speedboat",
      bn: "স্পিডবোট"
    },
    vehicleKey: "speedboat",
    minBDT: 80,
    maxBDT: 100,
    modeNote: {
      en: "Per passenger",
      bn: "জনপ্রতি"
    },
    duration: {
      en: "35 mins",
      bn: "৩৫ মিনিট"
    }
  },
  {
    id: "town-to-ramu",
    route: {
      en: "Town to Ramu",
      bn: "শহর থেকে রামু বৌদ্ধ বিহার"
    },
    vehicle: {
      en: "CNG",
      bn: "সিএনজি"
    },
    vehicleKey: "cng",
    minBDT: 400,
    maxBDT: 500,
    modeNote: {
      en: "Reserved",
      bn: "রিজার্ভড"
    },
    duration: {
      en: "40 mins",
      bn: "৪০ মিনিট"
    }
  }
];

/* --------------------------------------------------------------------------
 * 5. FAQ / Q&A DATA (Exact 5 Sample Q&As from Specification)
 * -------------------------------------------------------------------------- */
const FAQ_DATA = [
  {
    id: "faq-1",
    question: {
      en: "What is the best time to visit Cox's Bazar?",
      bn: "কক্সবাজার ভ্রমণের সেরা সময় কোনটি?"
    },
    answer: {
      en: "The best time is during the winter months from November to February when the weather is cool and dry.",
      bn: "কক্সবাজার ভ্রমণের সেরা সময় হলো শীতকাল—নভেম্বর থেকে ফেব্রুয়ারি মাস পর্যন্ত, যখন আবহাওয়া ঠান্ডা, মনোরম ও শুষ্ক থাকে।"
    }
  },
  {
    id: "faq-2",
    question: {
      en: "How do I get to Moheshkhali Island?",
      bn: "আমি কীভাবে মহেশখালী দ্বীপে যেতে পারি?"
    },
    answer: {
      en: "You can take a 35-minute speedboat ride from Kasturi Ghat in the main town for about 80-100 BDT per person.",
      bn: "মূল শহরের কস্তুরাঘাট (বা ৬ নং ঘাট) থেকে জনপ্রতি প্রায় ৮০-১০০ টাকা ভাড়ায় ৩৫ মিনিটের স্পিডবোট যাত্রায় মহেশখালী দ্বীপে যেতে পারেন।"
    }
  },
  {
    id: "faq-3",
    question: {
      en: "Is Marine Drive safe at night?",
      bn: "রাতে মেরিন ড্রাইভে ভ্রমণ করা কি নিরাপদ?"
    },
    answer: {
      en: "While Marine Drive is beautiful during the day, it is highly recommended to complete your travel before sunset for safety and better visibility.",
      bn: "দিনের বেলায় মেরিন ড্রাইভ অত্যন্ত সুন্দর হলেও নিরাপত্তা এবং ভালো দৃশ্যমানতার জন্য সূর্যাস্তের আগেই আপনার ভ্রমণ সম্পন্ন করার জোর পরামর্শ দেওয়া হয়।"
    }
  },
  {
    id: "faq-4",
    question: {
      en: "What are Easybikes or Tomtoms?",
      bn: "ইজিবাইক বা টমটম কী?"
    },
    answer: {
      en: "They are local, battery-operated rickshaws used for short distances within the town and beach areas.",
      bn: "এগুলো হলো স্থানীয় ব্যাটারিচালিত অটোরিকশা যা শহর এবং সমুদ্র সৈকত এলাকার ভেতরে স্বল্প দূরত্বে যাতায়াতের জন্য ব্যবহৃত হয়।"
    }
  },
  {
    id: "faq-5",
    question: {
      en: "Can foreigners exchange currency easily?",
      bn: "বিদেশি পর্যটকরা কি সহজেই মুদ্রা বিনিময় (Currency Exchange) করতে পারেন?"
    },
    answer: {
      en: "Yes, there are authorized money changers and banks in the main town area, though carrying some local currency (BDT) beforehand is advised.",
      bn: "হ্যাঁ, মূল শহর ও কলাতলী এলাকায় অনুমোদিত মানি এক্সচেঞ্জার এবং ব্যাংক রয়েছে, তবে সুবিধার জন্য আগে থেকেই কিছু স্থানীয় মুদ্রা (বাংলাদেশি টাকা - BDT) সাথে রাখা ভালো।"
    }
  }
];
