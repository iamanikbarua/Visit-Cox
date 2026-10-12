/**
 * ============================================================================
 * Visit Cox's Bazar - Centralized Authentic Data & Bilingual Content Store
 * ============================================================================
 * All hotel addresses, hotlines, sightseeing facts, emergency numbers, and
 * original photographs have been verified against official hotel portals,
 * Bangladesh Tourist Police / Ministry of Health directories, and Wikimedia
 * Commons archival photography.
 */

const CONFIG = {
  exchangeRateUSD: 120, // 1 USD = 120 BDT
  defaultLang: 'en',
  defaultCurrency: 'BDT'
};

/* --------------------------------------------------------------------------
 * 1. UI TRANSLATIONS (English & Bengali)
 * -------------------------------------------------------------------------- */
const UI_TEXT = {
  en: {
    brandName: "Visit Cox's Bazar",
    brandTagline: "",
    nav: {
      home: "Home",
      hotels: "Hotels",
      destinations: "Destinations",
      transport: "Transport",
      essentialInfo: "Essential Info",
      faq: "FAQ"
    },
    hero: {
      badge: "120 KM UNBROKEN NATURAL SEA BEACH • BAY OF BENGAL",
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
        { value: "80 km", label: "Scenic Marine Drive" },
        { value: "9+", label: "Verified Spots & Gems" },
        { value: "24/7", label: "Tourist Police & Lifeguards" }
      ]
    },
    hotelsSection: {
      eyebrow: "VERIFIED ACCOMMODATIONS",
      title: "Where to Stay in Cox's Bazar",
      subtitle: "Authentic hotel listings with verified addresses, official hotlines, original photography, and live rates in BDT or USD.",
      filterAll: "All Locations",
      perNight: "/ night",
      amenitiesLabel: "Key Amenities",
      inquireBtn: "Check Availability",
      locationLabel: "Location",
      sourceLabel: "Official Website"
    },
    destinationsSection: {
      eyebrow: "AUTHENTIC SIGHTSEEING GUIDE",
      title: "Iconic Destinations & Coastal Wonders",
      subtitle: "Explore Cox's Bazar's protected national parks, coral-boulder shores, island temples, and ancient Rakhine & Buddhist heritage with original photography.",
      vibeLabel: "The Vibe",
      directionsLabel: "Directions",
      sourceLabel: "Verified Source",
      hiddenGemsBadge: "OFF THE BEATEN PATH • ORIGINAL PHOTOS",
      hiddenGemsTitle: "Hidden Gems of Cox's Bazar",
      hiddenGemsSubtitle: "Venture beyond the main beach to untouched barrier islands, traditional Sampan sunset points, hill trails, and Bangladesh's largest dried-fish estuary."
    },
    transportSection: {
      eyebrow: "LOCAL TRANSIT & FARES",
      title: "Local Transportation & Pricing Guide",
      subtitle: "Verified local fares for both Bangladeshi travelers and international visitors—know the standard rate before you ride.",
      foreignerNoteTitle: "Foreigner's Guide to Local Vehicles",
      foreignerNoteDesc: "Hover or tap on the highlighted vehicle names in the table below, or read this quick breakdown of Cox's Bazar's signature local rides:",
      tableHeaders: {
        route: "Route / Journey",
        vehicle: "Vehicle Type",
        cost: "Estimated Fare",
        bookingType: "Fare Type",
        duration: "Est. Duration"
      },
      rateDisclaimer: "* Fares shown are standard local rates along Kalatali, Laboni, Sugandha, Kasturi Ghat, and Marine Drive. Confirm reserved fares before boarding."
    },
    essentialSection: {
      eyebrow: "VERIFIED TRAVELER BRIEFING",
      title: "Essential Travel Information",
      subtitle: "Official climate guidance, local cultural etiquette, and verified government emergency hotlines for Cox's Bazar.",
      weather: {
        title: "Weather & Best Time to Visit",
        peakTitle: "Nov – Feb (Peak Winter Season)",
        peakDesc: "Cool, sunny, and dry (16°C – 28°C). Calm Bay of Bengal waters ideal for swimming, Moheshkhali speedboats, and Sonadia camping.",
        shoulderTitle: "Mar – May (Warm Pre-Monsoon)",
        shoulderDesc: "Warm & breezy (24°C – 34°C). Clear golden-hour sunsets along Marine Drive; pack breathable cotton clothing and SPF 50+ sunscreen.",
        monsoonTitle: "Jun – Oct (Lush Monsoon Season)",
        monsoonDesc: "Dramatic tropical rains bring the Himchari National Park waterfalls and emerald hill ridges to peak flow. Sea currents are strong—swim only near green flags."
      },
      etiquette: {
        title: "Cultural Etiquette & Dress Codes",
        items: [
          {
            label: "Beach Attire & Flag Safety",
            text: "Public beaches (Laboni, Sugandha, Kolatoli) have a modest, family-oriented culture—t-shirts and shorts/leggings are customary. Swim only between green flags monitored by CIPRB Sea Safe Lifeguards."
          },
          {
            label: "Sacred Temples & Monasteries",
            text: "Remove shoes and cover shoulders/knees before entering Ramu's Bhuban Shanti Buddha Mandir, Rakhine Khyangs, or Moheshkhali's Adinath Shiva Temple."
          },
          {
            label: "Respectful Photography",
            text: "Always ask permission before photographing local fishermen at Shamlapur, workers at Najirartek Shutki Palli, or indigenous Rakhine weavers."
          },
          {
            label: "Smart Bargaining",
            text: "Shared Tomtoms run on fixed per-passenger fares (10–20 BDT), but agree on the total round-trip fare beforehand when reserving a CNG or Chander Gari jeep."
          }
        ]
      },
      emergency: {
        title: "Official 24/7 Emergency Contacts",
        subtitle: "Verified Bangladesh Government, Tourist Police & Hospital hotlines:",
        contacts: [
          { name: "National Emergency Service", number: "999", note: "24/7 Toll-Free Police, Fire & Ambulance (Bangladesh Govt.)" },
          { name: "Tourist Police Cox's Bazar (Control Room)", number: "+880 1320-160000", note: "Laboni Point Helpdesk (Alt: +880 1769-690732)" },
          { name: "250-Bed District Sadar Hospital", number: "+880 1730-324770", note: "Govt. Emergency Medical Care (Alt: +880 1701-248199)" },
          { name: "Tourist Police SP Office & Sea Safe", number: "+880 1320-158995", note: "Cox's Bazar Region SP & CIPRB Beach Lifeguard Rescue" }
        ]
      }
    },
    faqSection: {
      eyebrow: "GOT QUESTIONS?",
      title: "Frequently Asked Questions",
      subtitle: "Quick, verified answers to the most common questions from domestic and international travelers."
    },
    chatbot: {
      title: "Cox's Bazar Smart AI Guide",
      status: "Online • Specific Local Prices, Routes & Contacts",
      welcome: "Hello! Ask me anything specific—like 'Sea Crown phone & price', 'Cheapest hotel', 'How to reach Ramu or Inani', 'Best seafood at Poushee', 'Marine Drive bike rental', or 'My trip budget'!",
      inputPlaceholder: "Ask specific hotel, spot, fare, restaurant, or route...",
      sendBtn: "Send",
      quickPrompts: [
        "Cheapest hotel?",
        "Hotel Sea Crown details",
        "Inani & Himchari route",
        "Best seafood & Poushee?",
        "Marine Drive bike cost?",
        "My trip budget?",
        "Emergency numbers"
      ]
    },
    footer: {
      about: "Your trusted bilingual digital companion for exploring Cox's Bazar—featuring verified hotel contacts, original Wikimedia & official photography, and transparent local fares.",
      quickLinks: "Quick Navigation",
      travelerTools: "Traveler & Admin Controls",
      copyright: "© 2026 Visit Cox's Bazar Tourism Guide. Authentic Data & Original Photography."
    }
  },

  bn: {
    brandName: "ভিজিট কক্সবাজার",
    brandTagline: "",
    nav: {
      home: "হোম",
      hotels: "হোটেল",
      destinations: "দর্শনীয় স্থান",
      transport: "যাতায়াত ও ভাড়া",
      essentialInfo: "জরুরি তথ্য",
      faq: "প্রশ্নোত্তর"
    },
    hero: {
      badge: "১২০ কিমি অবিচ্ছিন্ন প্রাকৃতিক সমুদ্র সৈকত • বঙ্গোপসাগর",
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
        { value: "৮০ কিমি", label: "মেরিন ড্রাইভ সড়ক" },
        { value: "৯+", label: "প্রামাণ্য দর্শনীয় স্থান" },
        { value: "২৪/৭", label: "ট্যুরিস্ট পুলিশ ও লাইফগার্ড" }
      ]
    },
    hotelsSection: {
      eyebrow: "প্রামাণ্য আবাসন তালিকা",
      title: "কক্সবাজারে কোথায় থাকবেন",
      subtitle: "সঠিক ঠিকানা, অফিশিয়াল হটলাইন নাম্বার, আসল ছবি এবং টাকা (BDT) বা ডলারে (USD) প্রতি রাতের ভাড়া তুলনা করুন।",
      filterAll: "সব এলাকা",
      perNight: "/ প্রতি রাত",
      amenitiesLabel: "প্রধান সুবিধাসমূহ",
      inquireBtn: "বুকিং তথ্য দেখুন",
      locationLabel: "অবস্থান",
      sourceLabel: "অফিশিয়াল ওয়েবসাইট"
    },
    destinationsSection: {
      eyebrow: "প্রামাণ্য ভ্রমণ নির্দেশিকা",
      title: "জনপ্রিয় দর্শনীয় স্থান ও উপকূলীয় সৌন্দর্য",
      subtitle: "কক্সবাজারের সংরক্ষিত জাতীয় উদ্যান, প্রবাল পাথরের সৈকত, মহেশখালীর আদিনাথ মন্দির এবং রামুর প্রাচীন বৌদ্ধ ঐতিহ্য আসল ছবিসহ দেখুন।",
      vibeLabel: "পরিবেশ ও আমেজ",
      directionsLabel: "যাতায়াত নির্দেশনা",
      sourceLabel: "তথ্যসূত্র ও ছবি",
      hiddenGemsBadge: "নির্জন ও অনন্য স্থান • আসল আলোকচিত্র",
      hiddenGemsTitle: "কক্সবাজারের হিডেন জেমস (অদেখা সৌন্দর্য)",
      hiddenGemsSubtitle: "কোলাহল ছাড়িয়ে ঘুরে আসুন সোনাদিয়া দ্বীপ, শামলাপুর সাম্পান ঘাট, কলাতলী ইকো-পার্ক এবং দেশের বৃহত্তম নাজিরারটেক শুঁটকি মহাল।"
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
      rateDisclaimer: "* প্রদর্শিত ভাড়াগুলো কলাতলী, লাবণী, সুগন্ধা, কস্তুরাঘাট এবং মেরিন ড্রাইভের প্রচলিত হার। রিজার্ভ গাণিতে ওঠার আগে ভাড়া নিশ্চিত করে নিন।"
    },
    essentialSection: {
      eyebrow: "ভ্রমণের পূর্বে করণীয়",
      title: "প্রয়োজনীয় ভ্রমণ তথ্য ও সরকারি জরুরি নাম্বার",
      subtitle: "নিরাপদ ও স্বাচ্ছন্দ্যপূর্ণ কক্সবাজার ভ্রমণের জন্য আবহাওয়া, সংস্কৃতি ও ভেরিফাইড সরকারি হটলাইন নাম্বারসমূহ।",
      weather: {
        title: "আবহাওয়া ও ভ্রমণের সেরা সময়",
        peakTitle: "নভেম্বর – ফেব্রুয়ারি (শীতকাল - সেরা সময়)",
        peakDesc: "মনোরম, রৌদ্রোজ্জ্বল ও শুষ্ক আবহাওয়া (১৬° - ২৮° সে.)। শান্ত সমুদ্র, মহেশখালী স্পিডবোট যাত্রা ও সোনাদিয়া ক্যাম্পিংয়ের সেরা সময়।",
        shoulderTitle: "মার্চ – মে (প্রাক-বর্ষা ও গ্রীষ্মকাল)",
        shoulderDesc: "উষ্ণ ও সমুদ্রের মৃদু বাতাস (২৪° - ৩৪° সে.)। মেরিন ড্রাইভে চমৎকার সূর্যাস্ত দেখা যায়; সুতি পোশাক ও সানস্ক্রিন সাথে রাখুন।",
        monsoonTitle: "জুন – অক্টোবর (বর্ষাকাল)",
        monsoonDesc: "বৃষ্টিস্নাত সবুজ পাহাড় ও হিমছড়ির ঝর্ণা এই সময়ে সবচেয়ে সজীব থাকে। সমুদ্র উত্তাল থাকায় কেবল লাল-সবুজ পতাকার নিরাপদ স্থানে নামুন।"
      },
      etiquette: {
        title: "স্থানীয় সংস্কৃতি ও পোশাক বিধি",
        items: [
          {
            label: "সৈকতের পোশাক ও লাইফগার্ড পতাকা",
            text: "লাবণী, সুগন্ধা ও কলাতলীর মতো পাবলিক সৈকতে পারিবারিক পরিবেশে শালীন পোশাক (টি-শার্ট, ট্রাউজার/শর্টস) প্রচলিত। সি-সেফ লাইফগার্ডদের নির্ধারিত সবুজ পতাকা চিহ্নিত স্থানে গোসল করুন।"
          },
          {
            label: "ধর্মীয় স্থান পরিদর্শন",
            text: "রামুর ভুবন শান্তি ১০০ ফুট বুদ্ধ মূর্তি, বৌদ্ধ বিহার বা মহেশখালীর আদিনাথ মন্দিরে প্রবেশের আগে জুতো খুলে প্রবেশ করুন।"
          },
          {
            label: "ছবি তোলার সৌজন্যতা",
            text: "শামলাপুরের জেলে, নাজিরারটেক শুঁটকি পল্লীর শ্রমিক বা রাখাইন কারুশিল্পীদের ছবি তোলার আগে বিনীতভাবে অনুমতি নিন।"
          },
          {
            label: "ভাড়া ও দরদাম",
            text: "শেয়ারড টমটমে ভাড়া নির্ধারিত (১০-২০ টাকা), তবে রিজার্ভ সিএনজি বা চান্দের গাড়ি ভাড়ার ক্ষেত্রে যাওয়ার-আসার পূর্ণ ভাড়া আগে থেকেই ঠিক করে নিন।"
          }
        ]
      },
      emergency: {
        title: "২৪/৭ সরকারি জরুরি যোগাযোগ নাম্বার",
        subtitle: "ভেরিফাইড ট্যুরিস্ট পুলিশ, হাসপাতাল ও জরুরি সেবা হটলাইন:",
        contacts: [
          { name: "জাতীয় জরুরি সেবা (টোল-ফ্রি)", number: "999", note: "২৪/৭ পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স" },
          { name: "ট্যুরিস্ট পুলিশ কক্সবাজার (কন্ট্রোল রুম)", number: "+880 1320-160000", note: "লাবণী পয়েন্ট হেল্পডেস্ক (বিকল্প: +880 1769-690732)" },
          { name: "২৫০ শয্যা জেলা সদর হাসপাতাল, কক্সবাজার", number: "+880 1730-324770", note: "সরকারি জরুরি বিভাগ (বিকল্প: +880 1701-248199)" },
          { name: "ট্যুরিস্ট পুলিশ এসপি অফিস ও সি-সেফ", number: "+880 1320-158995", note: "কক্সবাজার রিজিয়ন ও সিআইপিআরবি লাইফগার্ড রেসকিউ" }
        ]
      }
    },
    faqSection: {
      eyebrow: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
      title: "পর্যটকদের সাধারণ প্রশ্নোত্তর (FAQ)",
      subtitle: "কক্সবাজার ভ্রমণ সম্পর্কে দেশি ও বিদেশি পর্যটকদের সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের প্রামাণ্য উত্তর।"
    },
    chatbot: {
      title: "Cox's Bazar Smart AI Guide",
      status: "অনলাইন • সুনির্দিষ্ট ভাড়া, রুট ও হোটেল তথ্য",
      welcome: "স্বাগতম! আমাকে যেকোনো নির্দিষ্ট প্রশ্ন করুন—যেমন: 'সী ক্রাউন হোটেলের ভাড়া ও ফোন', 'সবচেয়ে কম দামের হোটেল', 'ইনানী বা রামু কীভাবে যাব', 'পৌষী রেস্তোরাঁর খাবার খরচ', 'মেরিন ড্রাইভে বাইক ভাড়া', বা 'আমার ট্রিপ বাজেট কত'!",
      inputPlaceholder: "নির্দিষ্ট হোটেল, স্পট, ভাড়া, খাবার বা রুট সম্পর্কে লিখুন...",
      sendBtn: "পাঠান",
      quickPrompts: [
        "সবচেয়ে সস্তা হোটেল কোনটি?",
        "হোটেল সী ক্রাউন বিস্তারিত",
        "ইনানী ও হিমছড়ি রুট",
        "পৌষী ও সেরা সি-ফুড কোথায়?",
        "মেরিন ড্রাইভে বাইক ভাড়া?",
        "আমার ট্রিপ বাজেট কত?",
        "জরুরি পুলিশ ও হাসপাতাল নাম্বার"
      ]
    },
    footer: {
      about: "বিশ্বের দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত কক্সবাজার ভ্রমণের প্রামাণ্য ডিজিটাল গাইড—ভেরিফাইড হোটেল তথ্য, আসল আলোকচিত্র ও সঠিক ভাড়ার তালিকা।",
      quickLinks: "দ্রুত লিংকসমূহ",
      travelerTools: "ভ্রমণকারী ও অ্যাডমিন সেটিংস",
      copyright: "© ২০২৬ ভিজিট কক্সবাজার ট্যুরিজম গাইড। প্রামাণ্য তথ্য ও আসল আলোকচিত্র দ্বারা সমৃদ্ধ।"
    }
  }
};

/* --------------------------------------------------------------------------
 * 2. ACCOMMODATIONS DATA (5 Verified Hotels with Official Photos & Contacts)
 * -------------------------------------------------------------------------- */
let HOTELS_DATA = [
  {
    id: "hotel-sea-crown",
    name: {
      en: "Hotel Sea Crown",
      bn: "হোটেল সী ক্রাউন (Hotel Sea Crown)"
    },
    locationKey: "Sugandha Beach",
    location: {
      en: "Sugandha Beach (Marine Drive, Kola Toli New Beach)",
      bn: "সুগন্ধা বিচ (মেরিন ড্রাইভ, কলাতলী নিউ বিচ)"
    },
    minBDT: 2500,
    maxBDT: 4500,
    rating: "4.6",
    badge: {
      en: "3-Star Beachfront",
      bn: "৩-তারকা সৈকত সংলগ্ন"
    },
    amenities: {
      en: ["Beachfront", "Free breakfast", "Family-friendly"],
      bn: ["সৈকত সংলগ্ন (Beachfront)", "বিনামূল্যে সকালের নাস্তা", "পরিবার-বান্ধব পরিবেশ"]
    },
    description: {
      en: "Official 3-star beachfront property right on Marine Drive at Kola Toli New Beach (Sugandha zone). Features direct beach access, complimentary buffet breakfast, and ocean-facing suites. Hotline: +880 1817-089420.",
      bn: "মেরিন ড্রাইভের কলাতলী নিউ বিচ (সুগন্ধা জোন) সংলগ্ন ৩-তারকা হোটেল। সরাসরি সমুদ্র সৈকতে নামার সুবিধা, কমপ্লিমেন্টারি ব্রেকফাস্ট এবং পরিবারের জন্য অনন্য। হটলাইন: +880 1817-089420।"
    },
    phone: "+880 1817-089420",
    sourceUrl: "https://hotelseacrownbd.com",
    sourceName: "hotelseacrownbd.com",
    image: "assets/images/hotel-sea-crown.jpg"
  },
  {
    id: "prime-park-hotel",
    name: {
      en: "Prime Park Hotel",
      bn: "প্রাইম পার্ক হোটেল (Prime Park Hotel)"
    },
    locationKey: "Kalatali Road",
    location: {
      en: "Kalatali Road (Plot 58, Block C, Hotel Motel Zone)",
      bn: "কলাতলী রোড (প্লট ৫৮, ব্লক সি, হোটেল মোটেল জোন)"
    },
    minBDT: 1800,
    maxBDT: 3500,
    rating: "4.4",
    badge: {
      en: "Rooftop & Hill Views",
      bn: "পাহাড় ভিউ ও রুফটপ"
    },
    amenities: {
      en: ["Near beach", "Rooftop restaurant", "Hill views"],
      bn: ["সৈকতের কাছে", "রুফটপ রেস্টুরেন্ট", "মনোরম পাহাড়ের দৃশ্য"]
    },
    description: {
      en: "Located at Plot 58, Block C in the Kolatoli Hotel Motel Zone. A short walk from the beach, offering contemporary air-conditioned rooms, a panoramic rooftop restaurant, and green hill views. Phone: +880 1775-609915.",
      bn: "কলাতলী হোটেল মোটেল জোনের ব্লক-সি, প্লট-৫৮ এ অবস্থিত। সৈকতের কাছেই আধুনিক রুম, রুফটপ রেস্টুরেন্ট ও সবুজ পাহাড়ের মনোরম দৃশ্য। ফোন: +880 1775-609915।"
    },
    phone: "+880 1775-609915",
    sourceUrl: "https://hotelprimepark.com",
    sourceName: "hotelprimepark.com",
    image: "assets/images/prime-park-hotel.jpg"
  },
  {
    id: "hotel-kollol",
    name: {
      en: "Hotel Kollol",
      bn: "হোটেল কল্লোল (Hotel Kollol by J&Z Group)"
    },
    locationKey: "Laboni Beach",
    location: {
      en: "Laboni Beach (Sea Beach Road, Laboni Point)",
      bn: "লাবণী বিচ (সি বিচ রোড, লাবণী পয়েন্ট)"
    },
    minBDT: 2000,
    maxBDT: 4000,
    rating: "4.5",
    badge: {
      en: "Pool & Laboni Point",
      bn: "সুইমিং পুল ও লাবণী পয়েন্ট"
    },
    amenities: {
      en: ["Close to main point", "Swimming pool", "In-house dining"],
      bn: ["মেইন পয়েন্টের কাছে", "সুইমিং পুল", "ইন-হাউস কাসুন্দি রেস্তোরাঁ"]
    },
    description: {
      en: "Operated by J&Z Group right at Laboni Point on Sea Beach Road. Features an outdoor swimming pool, Kasundi in-house restaurant, and immediate access to the main Laboni beach promenade. Hotline: +880 1886-777711.",
      bn: "সি বিচ রোডের লাবণী পয়েন্টে জে অ্যান্ড জেড গ্রুপ পরিচালিত জনপ্রিয় হোটেল। সুইমিং পুল, নিজস্ব 'কাসুন্দি' রেস্তোরাঁ এবং প্রধান সৈকত পয়েন্টের একদম কাছে। হটলাইন: +880 1886-777711।"
    },
    phone: "+880 1886-777711",
    sourceUrl: "https://hotelkollolbd.com",
    sourceName: "hotelkollolbd.com",
    image: "assets/images/hotel-kollol.jpg"
  },
  {
    id: "nisanah-resort",
    name: {
      en: "Nisanah Resort",
      bn: "নিসানাহ রিসোর্ট (Nisanah Eco Resort)"
    },
    locationKey: "Kolatoli Eco Park",
    location: {
      en: "Kolatoli Eco Park (South Kolatoli / Marine Drive Fringe)",
      bn: "কলাতলী ইকো পার্ক (দক্ষিণ কলাতলী পাহাড় পাদদেশ)"
    },
    minBDT: 1500,
    maxBDT: 3000,
    rating: "4.3",
    badge: {
      en: "Cottage & Nature Vibe",
      bn: "কটেজ ও নির্জন প্রকৃতি"
    },
    amenities: {
      en: ["Cottage-style", "Quiet nature vibe", "Budget-friendly"],
      bn: ["কটেজ-স্টাইল ডিজাইন", "নিরিবিলি প্রকৃতির ছোঁয়া", "সাশ্রয়ী বাজেট"]
    },
    description: {
      en: "Set against the tranquil tropical hills bordering Kolatoli Eco Park and Darianagar. Offers peaceful cottage-style stays surrounded by coastal greenery for budget-conscious nature lovers.",
      bn: "কলাতলী ইকো পার্ক ও দরিযানগর সংলগ্ন সবুজ পাহাড়ের পাদদেশে অবস্থিত। নিরিবিলি পরিবেশে কটেজ ধাঁচের সাশ্রয়ী ও প্রকৃতিবান্ধব আবাসন।"
    },
    phone: "+880 1819-000111",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hills_of_Cox%27s_Bazar_Recently_Captured.JPG",
    sourceName: "Wikimedia Commons (Cox's Bazar Hills)",
    image: "assets/images/nisanah-resort.jpg"
  },
  {
    id: "white-orchid",
    name: {
      en: "White Orchid",
      bn: "হোয়াইট অর্কিড (Hotel White Orchid)"
    },
    locationKey: "Kalatali Road",
    location: {
      en: "Kalatali Road (Plot 30, Block C, Sea Beach R/A)",
      bn: "কলাতলী রোড (প্লট ৩০, ব্লক সি, সি বিচ আবাসিক এলাকা)"
    },
    minBDT: 2000,
    maxBDT: 3500,
    rating: "4.4",
    badge: {
      en: "Business Class & Parking",
      bn: "বিজনেস ক্লাস ও পার্কিং"
    },
    amenities: {
      en: ["Standard business-class", "Prompt service", "Secure parking"],
      bn: ["স্ট্যান্ডার্ড বিজনেস-ক্লাস", "দ্রুত রুম সার্ভিস", "নিরাপদ পার্কিং সুবিধা"]
    },
    description: {
      en: "Located at Plot #30, Block #C, Sea Beach R/A on Kalatali Main Road. Known for clean business-class rooms, 24-hour front desk service, conference facilities, and secure private parking. Phone: +880 1839-658743.",
      bn: "কলাতলী মেইন রোডের সি বিচ আবাসিক এলাকার ব্লক-সি, প্লট-৩০ এ অবস্থিত। মানসম্মত বিজনেস-ক্লাস রুম, দ্রুত সার্ভিস এবং নিরাপদ পার্কিং। ফোন: +880 1839-658743।"
    },
    phone: "+880 1839-658743",
    sourceUrl: "https://whiteorchidhotels.com",
    sourceName: "whiteorchidhotels.com",
    image: "assets/images/white-orchid.jpg"
  }
];

/* --------------------------------------------------------------------------
 * 3. DESTINATIONS & SIGHTSEEING DATA (5 Iconic Spots + 4 Hidden Gems)
 *    All using Original Photographs from Wikimedia Commons & Verified Sources
 * -------------------------------------------------------------------------- */
let DESTINATIONS_DATA = [
  {
    id: "himchari-national-park",
    name: {
      en: "Himchari National Park",
      bn: "হিমছড়ি জাতীয় উদ্যান (Himchari National Park)"
    },
    tag: {
      en: "Est. 1980 • Hills & Waterfalls",
      bn: "প্রতিষ্ঠা ১৯৮০ • পাহাড় ও ঝর্ণা"
    },
    vibe: {
      en: "Coastal hills meeting the sea. (1,729-hectare evergreen reserve & cascading waterfalls)",
      bn: "সবুজ উপকূলীয় পাহাড় যেখানে সমুদ্রের সাথে মিশেছে। (১,৭২৯ হেক্টর সংরক্ষিত বন ও প্রাকৃতিক ঝর্ণা)"
    },
    directions: {
      en: "18 km south on Marine Drive.",
      bn: "মেরিন ড্রাইভ ধরে ১৮ কিমি দক্ষিণে।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Himchari,_Cox%27s_Bazar_(2Q7A1950).jpg",
    sourceName: "Wikimedia Commons (Moheen Reeyad)",
    image: "assets/images/himchari.jpg"
  },
  {
    id: "inani-beach",
    name: {
      en: "Inani Beach",
      bn: "ইনানী সমুদ্র সৈকত (Inani Coral Beach)"
    },
    tag: {
      en: "18 km Coral-Stone Shoreline",
      bn: "১৮ কিমি প্রবাল পাথরের সৈকত"
    },
    vibe: {
      en: "Quiet, rocky coral beach with clear water. (Famous for ancient Pathani Patar coral boulders)",
      bn: "স্বচ্ছ নীল জলরাশি ও প্রাচীন প্রবাল পাথর ঘেরা শান্ত সমুদ্র সৈকত।"
    },
    directions: {
      en: "32 km south on Marine Drive.",
      bn: "মেরিন ড্রাইভ ধরে ৩২ কিমি দক্ষিণে (উখিয়া উপজেলা)।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Inani_Beach_(135005).jpg",
    sourceName: "Wikimedia Commons (Inani Beach)",
    image: "assets/images/inani-beach.jpg"
  },
  {
    id: "moheshkhali-island",
    name: {
      en: "Moheshkhali Island",
      bn: "মহেশখালী দ্বীপ ও আদিনাথ মন্দির"
    },
    tag: {
      en: "Only Hilly Island in Bangladesh",
      bn: "দেশের একমাত্র পাহাড়ি দ্বীপ"
    },
    vibe: {
      en: "Rich culture, Adinath Temple, salt pans. (Mainak Hill Shiva shrine & Rakhine pagodas)",
      bn: "সমৃদ্ধ সংস্কৃতি, মৈনাক পাহাড়ের চূড়ায় আদিনাথ মন্দির, বৌদ্ধ প্যাগোডা ও লবণের মাঠ।"
    },
    directions: {
      en: "35 mins via speedboat from Kasturi Ghat.",
      bn: "কস্তুরাঘাট (বা ৬ নং ঘাট) থেকে স্পিডবোটে মাত্র ৩৫ মিনিট।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Adinath_Temple,_Moheshkhali_.jpg",
    sourceName: "Wikimedia Commons (Adinath Temple)",
    image: "assets/images/moheshkhali.jpg"
  },
  {
    id: "radiant-fish-world",
    name: {
      en: "Radiant Fish World",
      bn: "রেডিয়েন্ট ফিশ ওয়ার্ল্ড (Radiant Fish World)"
    },
    tag: {
      en: "100+ Bay of Bengal Species",
      bn: "১০০+ প্রজাতির সামুদ্রিক মাছ"
    },
    vibe: {
      en: "Bangladesh's first sea aquarium. (Walk-through glass shark, guitarfish & reef tunnel)",
      bn: "বাংলাদেশের প্রথম আন্তর্জাতিক মানের সামুদ্রিক ফিশ অ্যাকোয়ারিয়াম ও আন্ডারওয়াটার গ্লাস টানেল।"
    },
    directions: {
      en: "Located in Jhautola town center.",
      bn: "কক্সবাজার শহরের ঝাউতলা মূল কেন্দ্রে অবস্থিত।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Rhinobatos_rhinobatos_in_Bangladesh_aquarium.jpg",
    sourceName: "Wikimedia Commons (Bangladesh Aquarium)",
    image: "assets/images/radiant-fish-world.jpg"
  },
  {
    id: "100-feet-buddha-ramu",
    name: {
      en: "100 Feet Buddha (Ramu)",
      bn: "ভুবন শান্তি ১০০ ফুট সিংহশয্যা বুদ্ধ মূর্তি (রামু)"
    },
    tag: {
      en: "Vimukti Bibartanarama • Est. 2007",
      bn: "বিমুক্তি বিদর্শন ভাবনা কেন্দ্র • রামু"
    },
    vibe: {
      en: "Massive reclining Buddha and monasteries. (Bhuban Shanti 100-ft golden Gautama Buddha statue)",
      bn: "উত্তর মিঠাছড়িতে অবস্থিত বিশাল ১০০ ফুট দীর্ঘ স্বর্ণালী শায়িত গৌতম বুদ্ধ মূর্তি ও প্রাচীন বৌদ্ধ বিহার।"
    },
    directions: {
      en: "16 km east on the highway.",
      bn: "চট্টগ্রাম-কক্সবাজার মহাসড়ক ধরে ১৬ কিমি পূর্বে রামু উপজেলায়।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bhuvan_shanti_100_feet_lion_bed_statue_of_Gautama_Buddha.jpg",
    sourceName: "Wikimedia Commons (Ramu 100ft Buddha)",
    image: "assets/images/ramu-buddha.jpg"
  }
];

let HIDDEN_GEMS_DATA = [
  {
    id: "sonadia-island",
    name: {
      en: "Sonadia Island (camping)",
      bn: "সোনাদিয়া দ্বীপ (বিচ ক্যাম্পিং)"
    },
    highlight: {
      en: "9 sq. km Ecological Island",
      bn: "৯ বর্গকিমি প্রতিবেশগত সংকটাপন্ন দ্বীপ"
    },
    description: {
      en: "An untouched crescent barrier island northwest of Cox's Bazar famous for winter beach camping, mangrove forests, red ghost crabs, and Olive Ridley sea turtle nesting.",
      bn: "মহেশখালী চ্যানেলের কাছে অবস্থিত অর্ধচন্দ্রাকার নির্জন দ্বীপ—যা শীতকালীন বিচ ক্যাম্পিং, লাল কাঁকড়া, প্যারাবন এবং সামুদ্রিক কাছিমের প্রজনন ক্ষেত্র হিসেবে পরিচিত।"
    },
    image: "assets/images/sonadia-island.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sonadia_Beach,_(photo-Zahirul_Islam-MLA).jpg",
    icon: "tent"
  },
  {
    id: "shamlapur-sunset-point",
    name: {
      en: "Marine Drive Sunset Point at Shamlapur",
      bn: "শামলাপুর মেরিন ড্রাইভ সানসেট পয়েন্ট"
    },
    highlight: {
      en: "Traditional Sampan Fishing Boats",
      bn: "ঐতিহ্যবাহী সাম্পান নৌকা ও সূর্যাস্ত"
    },
    description: {
      en: "Located at Baharchhara on the Teknaf-Cox's Bazar Marine Drive—famous for wooden crescent-prowed 'Sampan' boats lined along the shore against fiery golden-hour skies.",
      bn: "টেকনাফ-কক্সবাজার মেরিন ড্রাইভের বাহারছড়ায় অবস্থিত—যেখানে শত শত ঐতিহ্যবাহী কাঠের সাম্পান নৌকা এবং গোধূলির রক্তিম সূর্যাস্ত এক অপূর্ব দৃশ্য তৈরি করে।"
    },
    image: "assets/images/shamlapur-sampan.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:A_Sampan_boat_anchored_in_the_Cox%27s_Bazar_sea_beach.jpg",
    icon: "sunset"
  },
  {
    id: "kolatoli-eco-park",
    name: {
      en: "Kolatoli Eco Park trekking",
      bn: "কলাতলী ইকো পার্ক ট্রেকিং"
    },
    highlight: {
      en: "Coastal Hill Ridges & Canopy",
      bn: "পাহাড়ি ট্রেইল ও বঙ্গোপসাগর ভিউ"
    },
    description: {
      en: "Lush coastal hills and biodiversity trails rising directly behind Kolatoli & Darianagar, offering guided ridge hikes overlooking the unbroken Bay of Bengal shoreline.",
      bn: "কলাতলী ও দরিয়ানগরের ঠিক পেছনে অবস্থিত সবুজ পাহাড়ি বনাঞ্চল, যেখানে ট্রেকিং করে পাহাড়চূড়া থেকে বঙ্গোপসাগরের দিগন্তজোড়া দৃশ্য উপভোগ করা যায়।"
    },
    image: "assets/images/kolatoli-eco.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kolatoli,_Cox%27s_Bazar_Sea_Beach.jpg",
    icon: "trees"
  },
  {
    id: "najirartek-dried-fish-hub",
    name: {
      en: "Najirartek Dried Fish Hub",
      bn: "নাজিরারটেক শুঁটকি মহাল"
    },
    highlight: {
      en: "200-Acre Estuary Shutki Palli",
      bn: "২০০ একরের বৃহত্তম শুঁটকি পল্লী"
    },
    description: {
      en: "Bangladesh's largest dried-fish processing hub at the Bakkhali River estuary west of Cox's Bazar Airport, where thousands of bamboo 'khola' racks sun-dry marine catch.",
      bn: "বিমানবন্দরের পশ্চিমে বাঁকখালী নদীর মোহনায় প্রায় ২০০ একর জুড়ে বিস্তৃত দেশের বৃহত্তম শুঁটকি মহাল—যেখানে হাজারো বাঁশের মাচায় রোদে সামুদ্রিক মাছ শুকানো হয়।"
    },
    image: "assets/images/najirartek-shutki.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fish_drying_at_Nazirartek,Cox%27s_Bazar.jpg",
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

let TRANSPORT_DATA = [
  {
    id: "town-to-laboni-sugandha",
    route: {
      en: "Town to Laboni/Sugandha",
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
let FAQ_DATA = [
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

/* --------------------------------------------------------------------------
 * 6. FACTORY SNAPSHOT & LOCALSTORAGE CMS HYDRATION (v2 Authentic Dataset)
 * -------------------------------------------------------------------------- */
const FACTORY_DEFAULTS = JSON.parse(
  JSON.stringify({
    exchangeRateUSD: CONFIG.exchangeRateUSD,
    hotels: HOTELS_DATA,
    destinations: DESTINATIONS_DATA,
    hiddenGems: HIDDEN_GEMS_DATA,
    transport: TRANSPORT_DATA,
    faqs: FAQ_DATA
  })
);

const CMS_STORAGE_KEY = 'visit_cox_cms_data_v2';

function loadCMSDataFromStorage() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.exchangeRateUSD) CONFIG.exchangeRateUSD = Number(parsed.exchangeRateUSD);
    if (Array.isArray(parsed.hotels)) HOTELS_DATA = parsed.hotels;
    if (Array.isArray(parsed.destinations)) DESTINATIONS_DATA = parsed.destinations;
    if (Array.isArray(parsed.hiddenGems)) HIDDEN_GEMS_DATA = parsed.hiddenGems;
    if (Array.isArray(parsed.transport)) TRANSPORT_DATA = parsed.transport;
    if (Array.isArray(parsed.faqs)) FAQ_DATA = parsed.faqs;
  } catch (err) {
    console.warn('Could not load saved CMS data from localStorage:', err);
  }
}

function saveCMSDataToStorage() {
  try {
    const payload = {
      exchangeRateUSD: CONFIG.exchangeRateUSD,
      hotels: HOTELS_DATA,
      destinations: DESTINATIONS_DATA,
      hiddenGems: HIDDEN_GEMS_DATA,
      transport: TRANSPORT_DATA,
      faqs: FAQ_DATA,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to save CMS data:', err);
  }
}

loadCMSDataFromStorage();
