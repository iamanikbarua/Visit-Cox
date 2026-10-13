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
      sourceLabel: "Official Website",
      filterStarLabel: "Star Rating",
      filterPriceLabel: "Price Range",
      filterSpotLabel: "Spot / Zone",
      filterFacilityLabel: "Facilities",
      sortByLabel: "Sort By",
      allStars: "All Stars",
      allPrices: "All Prices",
      allSpots: "All Spots",
      allFacilities: "All Amenities",
      budgetPrice: "Budget (< ৳3,000 / < $25)",
      midPrice: "Mid-Range (৳3,000–৳7,000 / $25–$60)",
      luxuryPrice: "Luxury (৳7,000+ / > $60)",
      sortRecommended: "Recommended",
      sortPriceLow: "Price: Low to High",
      sortPriceHigh: "Price: High to Low",
      sortStarsHigh: "Stars: 5★ to 2★",
      resetFilters: "Reset Filters",
      viewFacilities: "✨ View Facilities",
      hotelFacilitiesTitle: "Hotel Facilities & Amenities Breakdown",
      closeModal: "Close"
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
      sourceLabel: "অফিশিয়াল ওয়েবসাইট",
      filterStarLabel: "স্টার রেটিং",
      filterPriceLabel: "ভাড়া রেঞ্জ",
      filterSpotLabel: "স্পট / বিচ এলাকা",
      filterFacilityLabel: "সুবিধাসমূহ",
      sortByLabel: "সাজান",
      allStars: "সব রেটিং",
      allPrices: "সব ভাড়া",
      allSpots: "সব স্পট",
      allFacilities: "সব সুবিধা",
      budgetPrice: "বাজেট (< ৩,০০০ টাকা / < $২৫)",
      midPrice: "মিড-রেঞ্জ (৩,০০০–৭,০০০ টাকা / $২৫–$৬০)",
      luxuryPrice: "লাক্সারি (৭,০০০+ টাকা / > $৬০)",
      sortRecommended: "প্রস্তাবিত",
      sortPriceLow: "ভাড়া: কম থেকে বেশি",
      sortPriceHigh: "ভাড়া: বেশি থেকে কম",
      sortStarsHigh: "স্টার: ৫★ থেকে ২★",
      resetFilters: "ফিল্টার মুছুন",
      viewFacilities: "✨ সুবিধাসমূহ দেখুন",
      hotelFacilitiesTitle: "হোটেলের পূর্ণাঙ্গ সুবিধাসমূহ",
      closeModal: "বন্ধ করুন"
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
    id: "sayeman-beach-resort",
    name: {
      en: "Sayeman Beach Resort",
      bn: "সায়মন বিচ রিসোর্ট (Sayeman Beach Resort)"
    },
    stars: 5,
    starLabel: {
      en: "5-Star Luxury",
      bn: "৫-তারকা লাক্সারি"
    },
    locationKey: "kolatoli",
    spotName: {
      en: "Marine Drive / Kolatoli",
      bn: "মেরিন ড্রাইভ / কলাতলী"
    },
    location: {
      en: "Marine Drive Road, Kolatoli Beach, Cox's Bazar",
      bn: "মেরিন ড্রাইভ রোড, কলাতলী বিচ, কক্সবাজার"
    },
    minBDT: 9500,
    maxBDT: 24000,
    rating: "4.8",
    badge: {
      en: "5-Star Iconic Beachfront",
      bn: "৫-তারকা প্রিমিয়ার বিচফ্রন্ট"
    },
    amenities: {
      en: ["Infinity Ocean Pool", "Private Beachfront", "Tarboosh Fine Dining", "Samaya Luxury Spa", "Free Airport Shuttle"],
      bn: ["ইনফিনিটি ওশান পুল", "প্রাইভেট বিচফ্রন্ট", "তারবুশ ফাইন ডাইনিং", "সামায়া লাক্সারি স্পা", "ফ্রি এয়ারপোর্ট পিক-ড্রপ"]
    },
    facilities: {
      en: [
        "Infinity ocean-view outdoor swimming pool with sunken lounge",
        "Tarboosh Middle Eastern Restaurant & Casablanca Fine Dining",
        "Private beach cabanas with lifeguard surveillance",
        "Samaya Luxury Wellness Spa, Jacuzzi & Steam Sauna",
        "24/7 Fully-equipped Fitness Gymnasium",
        "Complimentary Grand Buffet Breakfast",
        "Free VIP Airport Pickup & Drop Shuttle",
        "24/7 Concierge, 24-hr In-Room Dining & High-Speed Wi-Fi"
      ],
      bn: [
        "সরাসরি সমুদ্রের দৃশ্যসহ ইনফিনিটি সুইমিং পুল ও সানকেন লাউঞ্জ",
        "তারবুশ মিডল-ইস্টার্ন রেস্তোরাঁ ও কাসাব্লাঙ্কা ফাইন ডাইনিং",
        "লাইফগার্ড নজরদারিসহ নিজস্ব প্রাইভেট বিচ কাবানা",
        "সামায়া লাক্সারি ওয়েলনেস স্পা, জ্যাকুজি ও স্টিম সনা",
        "২৪/৭ আধুনিক সরঞ্জামসমৃদ্ধ ফিটনেস জিমনেসিয়াম",
        "কমপ্লিমেন্টারি গ্র্যান্ড বুফে ব্রেকফাস্ট",
        "ফ্রি ভিআইপি এয়ারপোর্ট পিক ও ড্রপ শাটল সার্ভিস",
        "২৪/৭ কনসিয়ার্জ, ২৪-ঘণ্টা রুম ডাইনিং ও হাই-স্পিড ওয়াই-ফাই"
      ]
    },
    description: {
      en: "Cox's Bazar's premier 5-star oceanfront resort right on Kolatoli Marine Drive. Boasts breathtaking Bay of Bengal sunset panoramas, an iconic infinity pool, Tarboosh fine dining, Samaya Spa, and direct private beach access. Hotline: +880 1755-691917.",
      bn: "কলাতলী মেরিন ড্রাইভের সম্মুখভাগে অবস্থিত কক্সবাজারের প্রিমিয়ার ৫-তারকা রিসোর্ট। সমুদ্রের মনোরম সূর্যাস্ত, আইকনিক ইনফিনিটি পুল, তারবুশ ফাইন ডাইনিং, সামায়া স্পা ও সরাসরি সৈকতে নামার সুবিধা। হটলাইন: +880 1755-691917।"
    },
    phone: "+880 1755-691917",
    sourceUrl: "https://sayemanresort.com",
    sourceName: "sayemanresort.com",
    image: "assets/images/hero-coxs-bazar.jpg"
  },
  {
    id: "sea-pearl-beach-resort",
    name: {
      en: "Sea Pearl Beach Resort & Spa",
      bn: "সী পার্ল বিচ রিসোর্ট অ্যান্ড স্পা (Royal Tulip Sea Pearl)"
    },
    stars: 5,
    starLabel: {
      en: "5-Star Luxury",
      bn: "৫-তারকা লাক্সারি"
    },
    locationKey: "inani",
    spotName: {
      en: "Inani Beach",
      bn: "ইনানী সমুদ্র সৈকত"
    },
    location: {
      en: "Inani Beach, Marine Drive, Jaliapalong, Ukhiya",
      bn: "ইনানী সৈকত, মেরিন ড্রাইভ, জালিয়াপালং, উখিয়া"
    },
    minBDT: 11000,
    maxBDT: 32000,
    rating: "4.8",
    badge: {
      en: "5-Star Ultra Luxury Inani",
      bn: "৫-তারকা আল্ট্রা লাক্সারি ইনানী"
    },
    amenities: {
      en: ["2 Giant Pools", "Private Coral Beach", "Water Park & Sports", "5 Multi-Cuisine Dining", "Helipad & Grand Spa"],
      bn: ["২টি বিশাল সুইমিং পুল", "প্রাইভেট প্রবাল সৈকত", "ওয়াটার পার্ক ও স্পোর্টস", "৫টি মাল্টি-কুইজিন রেস্টুরেন্ট", "হ্যালিপ্যাড ও লাক্সারি স্পা"]
    },
    facilities: {
      en: [
        "Private uninterrupted Inani Coral Beach frontage (15+ acres)",
        "2 Giant outdoor swimming pools & dedicated Water Park",
        "5 Multi-cuisine restaurants, cafes, and rooftop seafood grill",
        "Samaya World Luxury Ayurveda & Thai Wellness Spa",
        "Private Helipad, tennis court, badminton & water sports center",
        "Parasailing, jet-ski and ATV beach ride assistance",
        "Complimentary international buffet breakfast & airport transfer",
        "State-of-the-art convention halls & grand ballroom"
      ],
      bn: [
        "১৫ একর আয়তনের নিজস্ব ইনানী প্রবাল সৈকত ফ্রন্টেজ",
        "২টি সুবিশাল সুইমিং পুল ও শিশুদের ওয়াটার পার্ক",
        "৫টি আন্তর্জাতিক মানের রেস্তোরাঁ ও রুফটপ সি-ফুড গ্রিল",
        "সামায়া ওয়ার্ল্ড লাক্সারি আয়ুর্বেদ ও থাই স্পা সেন্টার",
        "নিজস্ব হ্যালিপ্যাড, টেনিস কোর্ট, ব্যাডমিন্টন ও ওয়াটার স্পোর্টস",
        "প্যারাসেইলিং, জেট-স্কি ও এটিভি রাইড সুবিধা",
        "কমপ্লিমেন্টারি ইন্টারন্যাশনাল বুফে ব্রেকফাস্ট ও এয়ারপোর্ট শাটল",
        "আন্তর্জাতিক মানের কনভেনশন সেন্টার ও গ্র্যান্ড বলরুম"
      ]
    },
    description: {
      en: "Nestled on pristine Inani Beach along scenic Marine Drive, Sea Pearl is Bangladesh's largest 5-star luxury resort. Features a 15-acre oceanfront estate, giant water park, 5 restaurants, private helipad, and ancient coral shores. Hotline: +880 1844-016001.",
      bn: "মেরিন ড্রাইভের মনোমুগ্ধকর ইনানী বিচে অবস্থিত দেশের বৃহত্তম ৫-তারকা লাক্সারি বিচ রিসোর্ট। ১৫ একরের সবুজ প্রাঙ্গণ, ওয়াটার পার্ক, ৫টি রেস্টুরেন্ট, নিজস্ব হ্যালিপ্যাড এবং প্রবাল পাথরের শান্ত সৈকত। হটলাইন: +880 1844-016001।"
    },
    phone: "+880 1844-016001",
    sourceUrl: "https://seapearlcoxsbazar.com",
    sourceName: "seapearlcoxsbazar.com",
    image: "assets/images/inani-beach.jpg"
  },
  {
    id: "mermaid-beach-resort",
    name: {
      en: "Mermaid Beach Resort",
      bn: "মারমেইড বিচ রিসোর্ট (Mermaid Beach Resort)"
    },
    stars: 5,
    starLabel: {
      en: "5-Star Luxury",
      bn: "৫-তারকা লাক্সারি"
    },
    locationKey: "pecharthal",
    spotName: {
      en: "Pecharthal / Marine Drive",
      bn: "পেঁচারদ্বীপ / মেরিন ড্রাইভ"
    },
    location: {
      en: "Pecharthal, Marine Drive (Near Himchari)",
      bn: "পেঁচারদ্বীপ, মেরিন ড্রাইভ (হিমছড়ির কাছে)"
    },
    minBDT: 10500,
    maxBDT: 28000,
    rating: "4.7",
    badge: {
      en: "5-Star Eco-Chic Beach Resort",
      bn: "৫-তারকা ইকো-লাক্সারি রিসোর্ট"
    },
    amenities: {
      en: ["Exclusive Private Beach", "Private Plunge Pools", "Mermaid Beach Cafe", "Canal Boat Rides & Kayak", "Sunset Bonfire Deck"],
      bn: ["এক্সক্লুসিভ প্রাইভেট বিচ", "প্রাইভেট প্লাঞ্জ পুল", "মারমেইড বিচ ক্যাফে", "খাল নৌকা ভ্রমণ ও কায়াকিং", "সানসেট বনফায়ার ডেক"]
    },
    facilities: {
      en: [
        "Exclusive private secluded ocean beach with zero outside vendors",
        "Luxury natural-wood & bamboo villas with open-air bathrooms",
        "Private plunge pools in signature beach suites",
        "Legendary Mermaid Beach Café with wood-fired Italian pizzas & fresh catch",
        "Quiet canal boat rides, stand-up paddleboarding & ocean kayaks",
        "Open-air organic Ayurvedic spa & sunset yoga pavilion",
        "Nightly beach bonfires with acoustic music & candlelit seafood dinners"
      ],
      bn: [
        "বহিরাগত কোলাহলমুক্ত সম্পূর্ণ নির্জন প্রাইভেট সমুদ্র সৈকত",
        "প্রাকৃতিক কাঠ ও বাঁশের তৈরি নান্দনিক ভিলা ও ওপেন-এয়ার বাথরুম",
        "সিগনেচার স্যুটসমূহে নিজস্ব প্রাইভেট প্লাঞ্জ পুল",
        "বিখ্যাত মারমেইড বিচ ক্যাফে (উড-ফায়ার্ড পিৎজা ও তাজা সি-ফুড)",
        "শান্ত খালে নৌকা ভ্রমণ, প্যাডেল বোর্ডিং ও কায়াকিং সুবিধা",
        "প্রাকৃতিক আয়ুর্বেদিক স্পা ও সূর্যাস্ত যোগব্যায়াম প্যাভিলিয়ন",
        "প্রতি সন্ধ্যায় সমুদ্রের পাড়ে বনফায়ার ও ক্যান্ডেললাইট ডিনার"
      ]
    },
    description: {
      en: "A world-renowned 5-star eco-chic sanctuary on Pecharthal beach along Marine Drive. Offers private pool villas crafted from organic timber, private beaches, wood-fired pizza at Mermaid Cafe, canal kayaking, and sunset bonfire dinners. Hotline: +880 1841-416468.",
      bn: "মেরিন ড্রাইভের পেঁচারদ্বীপে অবস্থিত বিশ্বখ্যাত ৫-তারকা ইকো-লাক্সারি রিসোর্ট। প্রাকৃতিক কাঠের নান্দনিক ভিলা, প্রাইভেট বিচ, মারমেইড ক্যাফে, কায়াকিং ও সন্ধ্যায় বিচ বনফায়ারের অনন্য অভিজ্ঞতা। হটলাইন: +880 1841-416468।"
    },
    phone: "+880 1841-416468",
    sourceUrl: "https://mermaidbeachresort.net",
    sourceName: "mermaidbeachresort.net",
    image: "assets/images/shamlapur-sampan.jpg"
  },
  {
    id: "ocean-paradise-hotel",
    name: {
      en: "Ocean Paradise Hotel & Resort",
      bn: "ওশান প্যারাডাইস হোটেল অ্যান্ড রিসোর্ট (Ocean Paradise Hotel)"
    },
    stars: 5,
    starLabel: {
      en: "5-Star Luxury",
      bn: "৫-তারকা লাক্সারি"
    },
    locationKey: "kolatoli",
    spotName: {
      en: "Kolatoli Road",
      bn: "কলাতলী রোড"
    },
    location: {
      en: "290/291 Kolatoli Main Road, Hotel Motel Zone",
      bn: "২৯০/২৯১ কলাতলী মেইন রোড, হোটেল মোটেল জোন"
    },
    minBDT: 7500,
    maxBDT: 18000,
    rating: "4.7",
    badge: {
      en: "5-Star Suites & Sky Pool",
      bn: "৫-তারকা স্যুট ও রুফটপ পুল"
    },
    amenities: {
      en: ["Rooftop Sky Pool", "Grand Buffet & BBQ", "Sky Bar & Lounge", "Wellness Spa & Jacuzzi", "Kids Fun Arcade"],
      bn: ["রুফটপ স্কাই পুল", "গ্র্যান্ড বুফে ও বারবিকিউ", "স্কাই বার ও লাউঞ্জ", "ওয়েলনেস স্পা ও জ্যাকুজি", "বাচ্চাদের গেম জোন"]
    },
    facilities: {
      en: [
        "Panoramic rooftop infinity pool with Bay of Bengal views & kids pool",
        "Multi-cuisine Kolatoli Grand Buffet, Sizzler Restaurant & Sky Lounge",
        "Paradise Health Club with modern gym, Jacuzzi, and steam bath",
        "Paradise Wellness Spa offering traditional therapeutic massages",
        "Children's amusement arcade & virtual game arena",
        "Complimentary buffet breakfast & luxury airport pickup/drop",
        "Corporate conference rooms & pillar-less grand banquet hall"
      ],
      bn: [
        "সমুদ্রের মনোরম দৃশ্যসহ রুফটপ ইনফিনিটি পুল ও আলাদা কিডস পুল",
        "মাল্টি-কুইজিন গ্র্যান্ড বুফে, সিজলার রেস্তোরাঁ ও ওপেন-এয়ার স্কাই লাউঞ্জ",
        "প্যারাডাইস হেলথ ক্লাব, আধুনিক জিম, জ্যাকুজি ও স্টিম বাথ",
        "অভিজ্ঞ থেরাপিস্ট দ্বারা পরিচালিত প্যারাডাইস ওয়েলনেস স্পা",
        "শিশুদের বিনোদনের জন্য ইনডোর গেম জোন ও আর্কেড",
        "কমপ্লিমেন্টারি বুফে ব্রেকফাস্ট ও বিলাসবহুল এয়ারপোর্ট শাটল",
        "কর্পোরেট কনফারেন্স রুম ও বিশাল ব্যাংকুয়েট হল"
      ]
    },
    description: {
      en: "Premier 5-star resort hotel located on Kolatoli Main Road. Features a panoramic rooftop swimming pool, Grand Buffet dining, luxury health spa, game arcade, and lavish suites overlooking the Bay. Hotline: +880 1938-846761.",
      bn: "কলাতলী প্রধান সড়কে অবস্থিত ঐতিহ্যবাহী ৫-তারকা হোটেল ও রিসোর্ট। দৃষ্টিনন্দন রুফটপ সুইমিং পুল, গ্র্যান্ড বুফে রেস্তোরাঁ, হেলথ স্পা, শিশুদের আর্কেড এবং আন্তর্জাতিক মানের লাক্সারি স্যুট। হটলাইন: +880 1938-846761।"
    },
    phone: "+880 1938-846761",
    sourceUrl: "https://oceanparadisehotel.com",
    sourceName: "oceanparadisehotel.com",
    image: "assets/images/prime-park-hotel.jpg"
  },
  {
    id: "hotel-the-cox-today",
    name: {
      en: "Hotel The Cox Today",
      bn: "হোটেল দ্য কক্স টুডে (Hotel The Cox Today)"
    },
    stars: 5,
    starLabel: {
      en: "5-Star Luxury",
      bn: "৫-তারকা লাক্সারি"
    },
    locationKey: "kolatoli",
    spotName: {
      en: "Kolatoli Beach Road",
      bn: "কলাতলী বিচ রোড"
    },
    location: {
      en: "Plot 7, Road 2, Hotel Motel Zone, Kolatoli",
      bn: "প্লট ৭, রোড ২, হোটেল মোটেল জোন, কলাতলী"
    },
    minBDT: 7000,
    maxBDT: 17000,
    rating: "4.6",
    badge: {
      en: "5-Star Ocean View Luxury",
      bn: "৫-তারকা সি-ভিউ লাক্সারি"
    },
    amenities: {
      en: ["Edge Swimming Pool", "Edge Lounge & Cafe", "Seafood Buffet", "Steam & Sauna Spa", "Modern Gym & Fitness"],
      bn: ["এজ সুইমিং পুল", "এজ লাউঞ্জ ও ক্যাফে", "সি-ফুড বুফে ডাইনিং", "স্টিম ও সনা স্পা", "আধুনিক জিম ও ফিটনেস"]
    },
    facilities: {
      en: [
        "Edge outdoor swimming pool with sun loungers",
        "Edge Lounge, 24/7 Coffee Shop, and seafood buffet restaurant",
        "Spa with steam bath, sauna, and massage suites",
        "24/7 Fully equipped modern fitness center",
        "Complimentary buffet breakfast & airport shuttle",
        "24-hour room service, concierge, and business desk"
      ],
      bn: [
        "সান লাউঞ্জারসহ 'এজ' আউটডোর সুইমিং পুল",
        "এজ লাউঞ্জ, ২৪/৭ কফি শপ ও সামুদ্রিক মাছের বিশেষ বুফে রেস্তোরাঁ",
        "স্টিম বাথ, সনা ও থেরাপিউটিক ম্যাসাজ স্যুটসহ স্পা",
        "২৪/৭ আধুনিক ফিটনেস ও কার্ডিও জিম সেন্টার",
        "কমপ্লিমেন্টারি বুফে প্রাতরাশ ও ফ্রি বিমানবন্দর শাটল",
        "২৪ ঘণ্টা রুম সার্ভিস, কনসিয়ার্জ ও বিজনেস সেন্টার"
      ]
    },
    description: {
      en: "Iconic 5-star property situated in the heart of the Kolatoli Hotel Motel Zone. Offers high-end rooms, an outdoor pool with loungers, seafood buffet restaurants, a complete wellness spa, and business facilities. Hotline: +880 1755-598449.",
      bn: "কলাতলী হোটেল মোটেল জোনের কেন্দ্রে অবস্থিত সুপরিচিত ৫-তারকা হোটেল। আধুনিক লাক্সারি রুম, সুইমিং পুল, সি-ফুড বুফে ডাইনিং, পূর্ণাঙ্গ ওয়েলনেস স্পা ও কনফারেন্স সুবিধা। হটলাইন: +880 1755-598449।"
    },
    phone: "+880 1755-598449",
    sourceUrl: "https://hotelthecoxtoday.com",
    sourceName: "hotelthecoxtoday.com",
    image: "assets/images/hotel-sea-crown.jpg"
  },
  {
    id: "best-western-bay-watch",
    name: {
      en: "Best Western Plus Heritage (Bay Watch)",
      bn: "বেস্ট ওয়েস্টার্ন প্লাস হেরিটেজ (বে ওয়াচ - Bay Watch)"
    },
    stars: 4,
    starLabel: {
      en: "4-Star Premium",
      bn: "৪-তারকা প্রিমিয়াম"
    },
    locationKey: "kolatoli",
    spotName: {
      en: "Kolatoli Beach",
      bn: "কলাতলী বিচ"
    },
    location: {
      en: "Plot 173-174, Kolatoli Circle, Marine Drive Entry",
      bn: "প্লট ১৭৩-১৭৪, কলাতলী সার্কেল, মেরিন ড্রাইভ সংযোগ"
    },
    minBDT: 5500,
    maxBDT: 13000,
    rating: "4.6",
    badge: {
      en: "4-Star International Hotel",
      bn: "৪-তারকা আন্তর্জাতিক হোটেল"
    },
    amenities: {
      en: ["Rooftop Sunset Pool", "Ocean View Balcony", "Barista Coffee Shop", "Fitness Center", "Airport Transfers"],
      bn: ["রুফটপ সানসেট পুল", "সি-ভিউ ব্যালকনি", "বারিস্তা কফি শপ", "ফিটনেস সেন্টার", "ফ্রি এয়ারপোর্ট পিক-ড্রপ"]
    },
    facilities: {
      en: [
        "Rooftop swimming pool with 360-degree sunset ocean panorama",
        "Private sea-facing balconies in all premier rooms",
        "In-house Barista specialty coffee bar & international dining",
        "State-of-the-art cardiovascular fitness center",
        "Walking distance to Kolatoli Beach & Marine Drive starting point",
        "Complimentary buffet breakfast, high-speed Wi-Fi & airport transfer",
        "24-hour round-the-clock room service and travel desk"
      ],
      bn: [
        "৩৬০ ডিগ্রি সূর্যাস্তের দৃশ্যসহ রুফটপ সুইমিং পুল",
        "সকল প্রিমিয়ার রুমে ব্যক্তিগত সি-ভিউ ব্যালকনি",
        "নিজস্ব বারিস্তা স্পেশালিটি কফি বার ও আন্তর্জাতিক ডাইনিং",
        "কার্ডিও ও স্ট্রেংথ সরঞ্জামসমৃদ্ধ আধুনিক ফিটনেস সেন্টার",
        "কলাতলী সমুদ্র সৈকত ও মেরিন ড্রাইভের একদম কাছে",
        "কমপ্লিমেন্টারি বুফে ব্রেকফাস্ট, দ্রুতগতির ওয়াই-ফাই ও এয়ারপোর্ট শাটল",
        "২৪ ঘণ্টা সার্বক্ষণিক রুম সার্ভিস ও ট্যুর সাপোর্ট ডেস্ক"
      ]
    },
    description: {
      en: "Renowned international 4-star hotel at Kolatoli Circle. Offers world-class hospitality, rooftop sunset swimming pool, private sea-facing balconies, Barista coffee shop, and direct access to Kolatoli Beach. Hotline: +880 1777-744004.",
      bn: "কলাতলী সার্কেলের সন্নিকটে অবস্থিত বিশ্বমানের ৪-তারকা আন্তর্জাতিক হোটেল। রুফটপ সুইমিং পুল, সি-ভিউ ব্যালকনি, বারিস্তা কফি শপ এবং আন্তর্জাতিক মানের আরামদায়ক আতিথেয়তা। হটলাইন: +880 1777-744004।"
    },
    phone: "+880 1777-744004",
    sourceUrl: "https://bwpheritagehotel.com",
    sourceName: "bwpheritagehotel.com",
    image: "assets/images/hotel-kollol.jpg"
  },
  {
    id: "long-beach-hotel",
    name: {
      en: "Long Beach Hotel",
      bn: "লং বিচ হোটেল (Long Beach Hotel)"
    },
    stars: 4,
    starLabel: {
      en: "4-Star Premium",
      bn: "৪-তারকা প্রিমিয়াম"
    },
    locationKey: "kolatoli",
    spotName: {
      en: "Kolatoli Road",
      bn: "কলাতলী রোড"
    },
    location: {
      en: "14 Kalatali Hotel-Motel Zone, Cox's Bazar",
      bn: "১৪ কলাতলী হোটেল-মোটেল জোন, কক্সবাজার"
    },
    minBDT: 5000,
    maxBDT: 12000,
    rating: "4.5",
    badge: {
      en: "4-Star Heated Pool & Spa",
      bn: "৪-তারকা ইনডোর পুল ও স্পা"
    },
    amenities: {
      en: ["Indoor Heated Pool", "Cozy Sizzle BBQ", "Health Club & Jacuzzi", "Billiards Lounge", "Free Buffet Breakfast"],
      bn: ["ইনডোর হিটেড সুইমিং পুল", "কোজি সিজল বারবিকিউ", "হেলথ ক্লাব ও জ্যাকুজি", "বিলিয়ার্ডস লাউঞ্জ", "ফ্রি বুফে ব্রেকফাস্ট"]
    },
    facilities: {
      en: [
        "All-weather indoor heated swimming pool with jacuzzi",
        "Cozy Sizzle Restaurant, Terrace BBQ & Coffee Corner",
        "Comprehensive health club, sauna, steam room & gymnasium",
        "Billiards & snooker recreation lounge",
        "Complimentary buffet breakfast & airport shuttle",
        "Executive meeting rooms & grand event hall"
      ],
      bn: [
        "সকল ঋতুতে ব্যবহারোপযোগী ইনডোর হিটেড সুইমিং পুল ও জ্যাকুজি",
        "কোজি সিজল রেস্তোরাঁ, টেরেস বারবিকিউ ও ক্যাফে কর্নার",
        "সম্পূর্ণ হেলথ ক্লাব, সনা, স্টিম বাথ ও আধুনিক জিমনেসিয়াম",
        "বিলিয়ার্ডস ও স্নুকার ইনডোর গেমস লাউঞ্জ",
        "কমপ্লিমেন্টারি বুফে ব্রেকফাস্ট ও ফ্রি বিমানবন্দর শাটল",
        "এক্সিকিউটিভ কনফারেন্স রুম ও বিশাল ব্যাংকুয়েট হল"
      ]
    },
    description: {
      en: "A premier 4-star hotel in Kolatoli featuring Cox's Bazar's finest indoor heated swimming pool, jacuzzi, Cozy Sizzle restaurant, snooker lounge, and spacious family suites. Phone: +880 1755-660051.",
      bn: "কলাতলীতে অবস্থিত প্রিমিয়াম ৪-তারকা হোটেল। ইনডোর হিটেড সুইমিং পুল, জ্যাকুজি, কোজি সিজল রেস্টুরেন্ট, স্নুকার লাউঞ্জ ও সুপ্রশস্ত ফ্যামিলি স্যুট। ফোন: +880 1755-660051।"
    },
    phone: "+880 1755-660051",
    sourceUrl: "https://longbeachhotelbd.com",
    sourceName: "longbeachhotelbd.com",
    image: "assets/images/prime-park-hotel.jpg"
  },
  {
    id: "hotel-sea-crown",
    name: {
      en: "Hotel Sea Crown",
      bn: "হোটেল সী ক্রাউন (Hotel Sea Crown)"
    },
    stars: 3,
    starLabel: {
      en: "3-Star Standard",
      bn: "৩-তারকা স্ট্যান্ডার্ড"
    },
    locationKey: "sugandha",
    spotName: {
      en: "Sugandha Beach",
      bn: "সুগন্ধা বিচ"
    },
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
      en: ["Direct Beach Access", "Sea View Restaurant", "Free Breakfast", "Family Rooms", "24/7 Desk"],
      bn: ["সরাসরি সৈকতে নামার সুবিধা", "সি-ভিউ রেস্তোরাঁ", "বিনামূল্যে সকালের নাস্তা", "পারিবারিক রুম", "২৪/৭ ফ্রন্ট ডেস্ক"]
    },
    facilities: {
      en: [
        "Direct unhindered stairs leading directly onto the sea beach sand",
        "Ocean-facing Sea Crown open-air dining restaurant",
        "Complimentary buffet breakfast for registered guests",
        "Family suites with private sea-facing windows",
        "24-hour front desk, security, and room service"
      ],
      bn: [
        "হোটেল প্রাঙ্গণ থেকে সরাসরি সৈকতের বালুচরে নামার সিঁড়ি",
        "সমুদ্রের ঢেউ দেখতে দেখতে খাওয়ার উন্মুক্ত রেস্তোরাঁ",
        "অতিথিদের জন্য প্রশংসিত কমপ্লিমেন্টারি ব্রেকফাস্ট",
        "সি-ভিউ সমৃদ্ধ পারিবারিক এসি ও নন-এসি রুম",
        "২৪ ঘণ্টা ফ্রন্ট ডেস্ক সহায়তা ও সার্বক্ষণিক রুম সার্ভিস"
      ]
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
    id: "hotel-kollol",
    name: {
      en: "Hotel Kollol",
      bn: "হোটেল কল্লোল (Hotel Kollol by J&Z Group)"
    },
    stars: 3,
    starLabel: {
      en: "3-Star Standard",
      bn: "৩-তারকা স্ট্যান্ডার্ড"
    },
    locationKey: "laboni",
    spotName: {
      en: "Laboni Beach",
      bn: "লাবণী বিচ"
    },
    location: {
      en: "Laboni Beach (Sea Beach Road, Laboni Point)",
      bn: "লাবণী বিচ (সি বিচ রোড, লাবণী পয়েন্ট)"
    },
    minBDT: 2000,
    maxBDT: 4000,
    rating: "4.5",
    badge: {
      en: "3-Star Pool & Laboni Point",
      bn: "৩-তারকা সুইমিং পুল ও লাবণী পয়েন্ট"
    },
    amenities: {
      en: ["Outdoor Swimming Pool", "Kasundi Restaurant", "Near Main Laboni Point", "AC Rooms", "Free Wi-Fi"],
      bn: ["আউটডোর সুইমিং পুল", "কাসুন্দি রেস্তোরাঁ", "লাবণী পয়েন্টের একদম কাছে", "এসি রুম", "ফ্রি ওয়াই-ফাই"]
    },
    facilities: {
      en: [
        "Outdoor swimming pool for adults and children",
        "Famous in-house 'Kasundi' multi-cuisine Bengali & seafood restaurant",
        "Located 1-minute walk from the historic Laboni Beach market & promenade",
        "Spacious family AC rooms with modern amenities",
        "24-hour power backup & secure parking"
      ],
      bn: [
        "বড় ও শিশুদের জন্য আউটডোর সুইমিং পুল",
        "জনপ্রিয় ইন-হাউস 'কাসুন্দি' বাংলা ও সি-ফুড রেস্তোরাঁ",
        "ঐতিহাসিক লাবণী বিচ মার্কেট ও প্রধান পয়েন্ট থেকে মাত্র ১ মিনিট",
        "আধুনিক সুবিধাসম্পন্ন ফ্যামিলি এয়ার-কন্ডিশন্ড রুম",
        "২৪ ঘণ্টা ব্যাকআপ বিদ্যুৎ ও নিরাপদ গাড়ি পার্কিং"
      ]
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
    id: "prime-park-hotel",
    name: {
      en: "Prime Park Hotel",
      bn: "প্রাইম পার্ক হোটেল (Prime Park Hotel)"
    },
    stars: 3,
    starLabel: {
      en: "3-Star Standard",
      bn: "৩-তারকা স্ট্যান্ডার্ড"
    },
    locationKey: "kolatoli",
    spotName: {
      en: "Kolatoli Road",
      bn: "কলাতলী রোড"
    },
    location: {
      en: "Kalatali Road (Plot 58, Block C, Hotel Motel Zone)",
      bn: "কলাতলী রোড (প্লট ৫৮, ব্লক সি, হোটেল মোটেল জোন)"
    },
    minBDT: 1800,
    maxBDT: 3500,
    rating: "4.4",
    badge: {
      en: "3-Star Rooftop & Hill Views",
      bn: "৩-তারকা পাহাড় ভিউ ও রুফটপ"
    },
    amenities: {
      en: ["Rooftop Restaurant", "Near Beach", "Hill & Sea Views", "AC Rooms", "Free Wi-Fi"],
      bn: ["রুফটপ রেস্টুরেন্ট", "সৈকতের কাছে", "পাহাড় ও সমুদ্রের দৃশ্য", "এসি রুম", "ফ্রি ওয়াই-ফাই"]
    },
    facilities: {
      en: [
        "Rooftop multi-cuisine restaurant with panoramic views of green hills",
        "Clean air-conditioned standard, deluxe and family rooms",
        "5-minute stroll to Kolatoli Beach",
        "High-speed Wi-Fi & elevator service",
        "24-hour front desk & travel guidance"
      ],
      bn: [
        "সবুজ পাহাড়ের মনোরম দৃশ্যসহ রুফটপ রেস্টুরেন্ট",
        "পরিচ্ছন্ন এয়ার-কন্ডিশন্ড স্ট্যান্ডার্ড ও ফ্যামিলি রুম",
        "কলাতলী সমুদ্র সৈকত থেকে মাত্র ৫ মিনিটের হাঁটা দূরত্ব",
        "দ্রুতগতির ওয়াই-ফাই ও আধুনিক লিফট সুবিধা",
        "২৪ ঘণ্টা ফ্রন্ট ডেস্ক ও ট্যুর গাইডেন্স সহায়তা"
      ]
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
    id: "white-orchid",
    name: {
      en: "White Orchid",
      bn: "হোয়াইট অর্কিড (Hotel White Orchid)"
    },
    stars: 3,
    starLabel: {
      en: "3-Star Standard",
      bn: "৩-তারকা স্ট্যান্ডার্ড"
    },
    locationKey: "kolatoli",
    spotName: {
      en: "Kolatoli Road",
      bn: "কলাতলী রোড"
    },
    location: {
      en: "Kalatali Road (Plot 30, Block C, Sea Beach R/A)",
      bn: "কলাতলী রোড (প্লট ৩০, ব্লক সি, সি বিচ আবাসিক এলাকা)"
    },
    minBDT: 2000,
    maxBDT: 3500,
    rating: "4.4",
    badge: {
      en: "3-Star Business Class",
      bn: "৩-তারকা বিজনেস ক্লাস"
    },
    amenities: {
      en: ["Business-Class Rooms", "Prompt Service", "Secure Parking", "Conference Room", "Free Wi-Fi"],
      bn: ["বিজনেস-ক্লাস রুম", "দ্রুত সার্ভিস", "নিরাপদ পার্কিং সুবিধা", "কনফারেন্স রুম", "ফ্রি ওয়াই-ফাই"]
    },
    facilities: {
      en: [
        "Spacious business-class air-conditioned rooms",
        "Conference facilities for business meetings & gatherings",
        "Dedicated covered secure car parking",
        "In-house dining & 24/7 room service",
        "Generator power backup and luggage storage"
      ],
      bn: [
        "সুপ্রশস্ত বিজনেস-ক্লাস এয়ার-কন্ডিশন্ড রুম",
        "ব্যবসায়িক মিটিং ও সম্মেলনের জন্য কনফারেন্স সুবিধা",
        "নির্ধারিত নিরাপদ কভার্ড কার পার্কিং",
        "ইন-হাউস ক্যাটারিং ও ২৪/৭ রুম সার্ভিস",
        "জেনারেটর ব্যাকআপ ও লাগেজ সংরক্ষণের সুবিধা"
      ]
    },
    description: {
      en: "Located at Plot #30, Block #C, Sea Beach R/A on Kalatali Main Road. Known for clean business-class rooms, 24-hour front desk service, conference facilities, and secure private parking. Phone: +880 1839-658743.",
      bn: "কলাতলী মেইন রোডের সি বিচ আবাসিক এলাকার ব্লক-সি, প্লট-৩০ এ অবস্থিত। মানসম্মত বিজনেস-ক্লাস রুম, দ্রুত সার্ভিস এবং নিরাপদ পার্কিং। ফোন: +880 1839-658743।"
    },
    phone: "+880 1839-658743",
    sourceUrl: "https://whiteorchidhotels.com",
    sourceName: "whiteorchidhotels.com",
    image: "assets/images/white-orchid.jpg"
  },
  {
    id: "nisanah-resort",
    name: {
      en: "Nisanah Resort",
      bn: "নিসানাহ রিসোর্ট (Nisanah Eco Resort)"
    },
    stars: 2,
    starLabel: {
      en: "2-Star Eco Cottage",
      bn: "২-তারকা ইকো কটেজ"
    },
    locationKey: "ecopark",
    spotName: {
      en: "Kolatoli Eco Park",
      bn: "কলাতলী ইকো পার্ক"
    },
    location: {
      en: "Kolatoli Eco Park (South Kolatoli / Marine Drive Fringe)",
      bn: "কলাতলী ইকো পার্ক (দক্ষিণ কলাতলী পাহাড় পাদদেশ)"
    },
    minBDT: 1500,
    maxBDT: 3000,
    rating: "4.3",
    badge: {
      en: "2-Star Cottage & Nature Vibe",
      bn: "২-তারকা কটেজ ও নির্জন প্রকৃতি"
    },
    amenities: {
      en: ["Cottage-Style", "Quiet Nature Vibe", "Budget-Friendly", "Garden Lawn", "Eco Trails"],
      bn: ["কটেজ-স্টাইল ডিজাইন", "নিরিবিলি প্রকৃতির ছোঁয়া", "সাশ্রয়ী বাজেট", "সবুজ বাগান লন", "প্রাকৃতিক ট্রেইল"]
    },
    facilities: {
      en: [
        "Eco-friendly bamboo & timber cottages surrounded by nature",
        "Peaceful escape away from the crowded central hotel zone",
        "Lush green garden courtyard for relaxing and reading",
        "Authentic home-cooked local Bengali breakfast & meals upon request",
        "Proximity to Kolatoli Eco Park trails & Himchari hills"
      ],
      bn: [
        "প্রকৃতির মাঝে বাঁশ ও কাঠের তৈরি পরিবেশবান্ধব কটেজ",
        "মূল শহরের যানজট ও ভিড়মুক্ত সম্পূর্ণ নিরিবিলি পরিবেশ",
        "বিশ্রামের জন্য সুন্দর সবুজ বাগান ও আঙিনা",
        "অনুরোধ সাপেক্ষে ঘরোয়া বাংলা খাবার ও নাস্তা",
        "কলাতলী ইকো পার্ক ও হিমছড়ি পাহাড়ের কাছে"
      ]
    },
    description: {
      en: "Set against the tranquil tropical hills bordering Kolatoli Eco Park and Darianagar. Offers peaceful cottage-style stays surrounded by coastal greenery for budget-conscious nature lovers.",
      bn: "কলাতলী ইকো পার্ক ও দরিযানগর সংলগ্ন সবুজ পাহাড়ের পাদদেশে অবস্থিত। নিরিবিলি পরিবেশে কটেজ ধাঁচের সাশ্রয়ী ও প্রকৃতিবান্ধব আবাসন।"
    },
    phone: "+880 1819-000111",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Hills_of_Cox%27s_Bazar_Recently_Captured.JPG",
    sourceName: "Wikimedia Commons (Cox's Bazar Hills)",
    image: "assets/images/nisanah-resort.jpg"
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

const CMS_STORAGE_KEY = 'visit_cox_cms_data_v3';

function loadCMSDataFromStorage() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed.exchangeRateUSD) CONFIG.exchangeRateUSD = Number(parsed.exchangeRateUSD);
    if (Array.isArray(parsed.hotels) && parsed.hotels.length >= 10) {
      HOTELS_DATA = parsed.hotels;
    } else if (Array.isArray(parsed.hotels)) {
      // Merge stored custom hotels with default hotels
      const existingIds = new Set(parsed.hotels.map(h => h.id));
      HOTELS_DATA = [...parsed.hotels];
      FACTORY_DEFAULTS.hotels.forEach(h => {
        if (!existingIds.has(h.id)) {
          HOTELS_DATA.push(h);
        }
      });
    }
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
