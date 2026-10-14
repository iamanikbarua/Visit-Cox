/**
 * Visit Cox's Bazar - content and bilingual strings.
 * Prices, fares and hotel phones are approximate and mostly unsourced: an item
 * counts as checked only when it carries `source` and `asOf`. Items marked
 * `approx: true` have not been confirmed with the business.
 */

// Rendered by app.js, planner.js and page footers. Confirm by phone before relying on them.
const EMERGENCY_CONTACTS = [
  { id: 'national', name: { en: 'National Emergency (police, fire, ambulance)', bn: 'জাতীয় জরুরি সেবা (পুলিশ, ফায়ার, অ্যাম্বুলেন্স)' }, number: '999', tel: '999', source: 'https://999.gov.bd', asOf: '2026-10-15' },
  { id: 'tourist-police', name: { en: 'Tourist Police helpline (24/7)', bn: 'ট্যুরিস্ট পুলিশ হেল্পলাইন (২৪/৭)' }, number: '01320-222222', tel: '+8801320222222', source: 'https://bangladeshmonitor.com.bd/en/bangladesh-tourist-police-launches-247-helpline-for-travellers', asOf: '2026-10-15', needsOwnerConfirm: true },
];
const SITE_CONTACT = { whatsapp: null }; // null = no real number yet; UI must hide WhatsApp CTAs

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
      activities: "Activities",
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
        { value: "26+", label: "Top-Rated Renowned Hotels" },
        { value: "14", label: "Iconic Sightseeing Spots" },
        { value: "10", label: "Hidden Food & Cultural Gems" },
        { value: "10", label: "Thrilling Coastal Activities" }
      ]
    },
    hotelsSection: {
      eyebrow: "ACCOMMODATIONS",
      title: "Where to Stay in Cox's Bazar",
      subtitle: "Hotel listings with addresses, hotel phone numbers and approximate nightly rates in BDT or USD. Confirm rates with the hotel before booking.",
      filterAll: "All Locations",
      perNight: "/ night",
      amenitiesLabel: "Key Amenities",
      inquireBtn: "Check Availability",
      locationLabel: "Location",
      sourceLabel: "Hotel website",
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
      sourceLabel: "Source",
      hiddenGemsBadge: "LOCAL FOOD & AUTHENTIC CULTURE",
      hiddenGemsTitle: "10 Hidden Gems: Local Food & Cultural Heritage",
      hiddenGemsSubtitle: "Taste legendary Loitta fry, 30+ bhartas at Poushee, live seafood grilling at Sugandha, and visit Rakhine handloom weavers and traditional salt pans."
    },
    activitiesSection: {
      eyebrow: "THINGS TO DO & COASTAL THRILLS",
      title: "Top 10 Activities in Cox's Bazar",
      subtitle: "From riding the surf and beach parasailing to open-top Marine Drive jeep safaris and night bonfires—approximate rates, locations, and safety briefings.",
      filterAll: "All Activities",
      filterWater: "Water Sports",
      filterBeach: "Beach & Riding",
      filterSafari: "Jeep & Tours",
      filterNight: "Camping & Night",
      addToTrip: "+ Add to My Trip",
      estCost: "Estimated Price",
      locationLabel: "Location",
      durationLabel: "Duration"
    },
    transportSection: {
      eyebrow: "LOCAL TRANSIT & FARES",
      title: "Local Transportation & Pricing Guide",
      subtitle: "Approximate local fares for Bangladeshi and international visitors—know the usual rate before you ride.",
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
      eyebrow: "TRAVELER BRIEFING",
      title: "Essential Travel Information",
      subtitle: "Climate guidance, local etiquette, and emergency numbers for Cox's Bazar.",
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
        title: "24/7 Emergency Contacts",
        subtitle: "Save these before you travel. Numbers from published sources, last checked 2026-10-15:",
        contacts: [
          { name: "National Emergency Service", number: "999", note: "24/7 toll-free police, fire and ambulance" },
          { name: "Tourist Police helpline", number: "01320-222222", note: "24/7 national helpline (reported Sep 2023, Bangladesh Monitor)" }
        ]
      }
    },
    faqSection: {
      eyebrow: "GOT QUESTIONS?",
      title: "Frequently Asked Questions",
      subtitle: "Quick answers to the most common questions from domestic and international travelers."
    },
    chatbot: {
      title: "Cox's Bazar Quick Guide",
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
      about: "A bilingual guide to Cox's Bazar: hotel contacts, Wikimedia photography, and approximate local fares.",
      quickLinks: "Quick Navigation",
      travelerTools: "Traveler Controls",
      copyright: "© 2026 Visit Cox's Bazar Tourism Guide."
    }
  },

  bn: {
    brandName: "ভিজিট কক্সবাজার",
    brandTagline: "",
    nav: {
      home: "হোম",
      hotels: "হোটেল",
      destinations: "দর্শনীয় স্থান",
      activities: "অ্যাক্টিভিটি",
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
        { value: "২৬+", label: "শীর্ষস্থানীয় হোটেল (৫★–২★)" },
        { value: "১৪টি", label: "জনপ্রিয় দর্শনীয় স্থান" },
        { value: "১০টি", label: "খাবার ও সংস্কৃতির হিডেন জেম" },
        { value: "১০টি", label: "রোমাঞ্চকর অ্যাক্টিভিটি" }
      ]
    },
    hotelsSection: {
      eyebrow: "আবাসন তালিকা",
      title: "কক্সবাজারে কোথায় থাকবেন",
      subtitle: "ঠিকানা, হোটেলের ফোন নাম্বার এবং টাকা (BDT) বা ডলারে (USD) প্রতি রাতের আনুমানিক ভাড়া। বুকিংয়ের আগে হোটেলের সাথে ভাড়া নিশ্চিত করুন।",
      filterAll: "সব এলাকা",
      perNight: "/ প্রতি রাত",
      amenitiesLabel: "প্রধান সুবিধাসমূহ",
      inquireBtn: "বুকিং তথ্য দেখুন",
      locationLabel: "অবস্থান",
      sourceLabel: "হোটেলের ওয়েবসাইট",
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
      eyebrow: "ভ্রমণ নির্দেশিকা",
      title: "জনপ্রিয় দর্শনীয় স্থান ও উপকূলীয় সৌন্দর্য",
      subtitle: "কক্সবাজারের সংরক্ষিত জাতীয় উদ্যান, প্রবাল পাথরের সৈকত, মহেশখালীর আদিনাথ মন্দির এবং রামুর প্রাচীন বৌদ্ধ ঐতিহ্য আসল ছবিসহ দেখুন।",
      vibeLabel: "পরিবেশ ও আমেজ",
      directionsLabel: "যাতায়াত নির্দেশনা",
      sourceLabel: "তথ্যসূত্র ও ছবি",
      hiddenGemsBadge: "ঐতিহ্যবাহী খাবার ও স্থানীয় সংস্কৃতি",
      hiddenGemsTitle: "১০টি হিডেন জেম: স্থানীয় সি-ফুড ও সংস্কৃতি",
      hiddenGemsSubtitle: "পৌষীর বিখ্যাত ৩০+ পদের ভর্তা ও রূপচাঁদা ফ্রাই, সুগন্ধার লাইভ সি-ফুড গ্রিল, রাখাইন তাঁত পল্লী এবং ঐতিহ্যবাহী মিষ্টি পান ও লবণের মাঠ।"
    },
    activitiesSection: {
      eyebrow: "রোমাঞ্চ ও সৈকত অ্যাক্টিভিটি",
      title: "কক্সবাজারের সেরা ১০টি অ্যাক্টিভিটি ও অভিজ্ঞতা",
      subtitle: "সার্ফিং, প্যারাসেইলিং, খোলা চান্দের গাড়িতে সাফারি থেকে শুরু করে সৈকত ক্যাম্পিং ও বারবিকিউ—সঠিক লোকেশন ও ভাড়ার তালিকা।",
      filterAll: "সব অ্যাক্টিভিটি",
      filterWater: "ওয়াটার স্পোর্টস",
      filterBeach: "সৈকত ও রাইডিং",
      filterSafari: "জিপ ও ট্যুর",
      filterNight: "ক্যাম্পিং ও রাতযাপন",
      addToTrip: "+ ট্রিপ প্ল্যানে নিন",
      estCost: "আনুমানিক খরচ",
      locationLabel: "স্থান",
      durationLabel: "সময়কাল"
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
      title: "প্রয়োজনীয় ভ্রমণ তথ্য ও জরুরি নাম্বার",
      subtitle: "নিরাপদ ও স্বাচ্ছন্দ্যপূর্ণ কক্সবাজার ভ্রমণের জন্য আবহাওয়া, সংস্কৃতি ও জরুরি নাম্বারসমূহ।",
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
        title: "২৪/৭ জরুরি যোগাযোগ নাম্বার",
        subtitle: "ভ্রমণের আগে নাম্বারগুলো সেভ করে রাখুন। প্রকাশিত সূত্র থেকে নেওয়া, সর্বশেষ যাচাই ২০২৬-১০-১৫:",
        contacts: [
          { name: "জাতীয় জরুরি সেবা (টোল-ফ্রি)", number: "999", note: "২৪/৭ পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স" },
          { name: "ট্যুরিস্ট পুলিশ হেল্পলাইন", number: "01320-222222", note: "২৪/৭ জাতীয় হেল্পলাইন (সেপ্টেম্বর ২০২৩, বাংলাদেশ মনিটর)" }
        ]
      }
    },
    faqSection: {
      eyebrow: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
      title: "পর্যটকদের সাধারণ প্রশ্নোত্তর (FAQ)",
      subtitle: "কক্সবাজার ভ্রমণ সম্পর্কে দেশি ও বিদেশি পর্যটকদের সবচেয়ে বেশি জিজ্ঞাসিত প্রশ্নের সংক্ষিপ্ত উত্তর।"
    },
    chatbot: {
      title: "Cox's Bazar Quick Guide",
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
        "জরুরি পুলিশ নাম্বার"
      ]
    },
    footer: {
      about: "বিশ্বের দীর্ঘতম সমুদ্র সৈকতগুলোর একটি, কক্সবাজার ভ্রমণের দ্বিভাষিক গাইড—হোটেল তথ্য, উইকিমিডিয়া আলোকচিত্র ও আনুমানিক ভাড়ার তালিকা।",
      quickLinks: "দ্রুত লিংকসমূহ",
      travelerTools: "ভ্রমণকারী সেটিংস",
      copyright: "© ২০২৬ ভিজিট কক্সবাজার ট্যুরিজম গাইড।"
    }
  }
};

/* --------------------------------------------------------------------------
 * 2. ACCOMMODATIONS DATA (prices approximate; see approx/asOf on each hotel)
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
      en: "Best Western Plus Heritage",
      bn: "বেস্ট ওয়েস্টার্ন প্লাস হেরিটেজ"
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
      en: "3-star beachfront property right on Marine Drive at Kola Toli New Beach (Sugandha zone). Features direct beach access, complimentary buffet breakfast, and ocean-facing suites. Hotline: +880 1817-089420.",
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
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
    id: "seagull-hotel",
    name: {
      en: "Seagull Hotel",
      bn: "সীগাল হোটেল (Seagull Hotel & Resort)"
    },
    stars: 4,
    starLabel: {
      en: "4-Star Premium",
      bn: "৪-তারকা প্রিমিয়াম"
    },
    locationKey: "sugandha",
    spotName: {
      en: "Sugandha Point",
      bn: "সুগন্ধা পয়েন্ট"
    },
    location: {
      en: "Plot 3-4, Hotel Motel Zone, Sugandha Beach Road, Cox's Bazar",
      bn: "প্লট ৩-৪, হোটেল মোটেল জোন, সুগন্ধা বিচ রোড, কক্সবাজার"
    },
    minBDT: 5500,
    maxBDT: 13500,
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
    rating: "4.6",
    badge: {
      en: "4-Star Iconic Beach Resort",
      bn: "৪-তারকা আইকনিক বিচ রিসোর্ট"
    },
    amenities: {
      en: ["Large Outdoor Pool", "Parijat Dining", "Near Sugandha Beach", "Health Club & Spa", "Conference Halls"],
      bn: ["বিশাল আউটডোর পুল", "পারিজাত রেস্তোরাঁ", "সুগন্ধা সৈকতের কাছে", "হেলথ ক্লাব ও স্পা", "কনফারেন্স হল"]
    },
    facilities: {
      en: [
        "Sprawling outdoor swimming pool with children's splash pool & sun loungers",
        "Parijat Multi-Cuisine Restaurant & Rangoli Indian Specialty Dining",
        "2-minute direct walk to Sugandha Sea Beach and evening market",
        "Health club, sauna, steam room & massage therapies",
        "Expansive corporate banquet and conference halls",
        "Complimentary buffet breakfast, airport transfers & high-speed Wi-Fi"
      ],
      bn: [
        "শিশুদের স্প্ল্যাশ পুল ও সান লাউঞ্জারসহ সুবিশাল আউটডোর সুইমিং পুল",
        "পারিজাত মাল্টি-কুইজিন ও রঙ্গোলি ইন্ডিয়ান স্পেশালিটি রেস্তোরাঁ",
        "সুগন্ধা সমুদ্র সৈকত ও ইভনিং মার্কেট থেকে মাত্র ২ মিনিটের হাঁটা পথ",
        "হেলথ ক্লাব, সনা, স্টিম বাথ ও থেরাপিউটিক ম্যাসাজ",
        "বিশাল কর্পোরেট ব্যাংকুয়েট ও আন্তর্জাতিক কনফারেন্স হল",
        "কমপ্লিমেন্টারি বুফে ব্রেকফাস্ট, ফ্রি এয়ারপোর্ট শাটল ও হাই-স্পিড ওয়াই-ফাই"
      ]
    },
    description: {
      en: "A landmark 4-star beach resort located near Sugandha Point. Features a magnificent outdoor swimming pool, Parijat multi-cuisine dining, a wellness health club, and easy access to the beach. Hotline: +880 1766-666530.",
      bn: "সুগন্ধা পয়েন্টের কাছে অবস্থিত ঐতিহ্যবাহী ৪-তারকা বিচ রিসোর্ট। বিশাল সুইমিং পুল, পারিজাত ডাইনিং, হেলথ ক্লাব ও সৈকতের একদম কাছে অবস্থিত। হটলাইন: +880 1766-666530।"
    },
    phone: "+880 1766-666530",
    sourceUrl: "https://seagullhotelbd.com",
    sourceName: "seagullhotelbd.com",
    image: "assets/images/hotel-sea-crown.jpg"
  },
  {
    id: "mermaid-eco-resort",
    name: {
      en: "Mermaid Eco Resort",
      bn: "মারমেইড ইকো রিসোর্ট (Mermaid Eco Resort Pechar Dwip)"
    },
    stars: 4,
    starLabel: {
      en: "4-Star Eco Sanctuary",
      bn: "৪-তারকা ইকো স্যাঙ্কচুয়ারি"
    },
    locationKey: "pecharthal",
    spotName: {
      en: "Pechar Dwip / Reju Khal",
      bn: "পেঁচারদ্বীপ / রেজু খাল"
    },
    location: {
      en: "Pechar Dwip, Marine Drive (near Reju Khal Bridge), Ramu / Cox's Bazar",
      bn: "পেঁচারদ্বীপ, মেরিন ড্রাইভ (রেজু খাল সেতুর কাছে), রামু / কক্সবাজার"
    },
    minBDT: 6000,
    maxBDT: 14000,
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
    rating: "4.7",
    badge: {
      en: "4-Star Tidal Canal Eco Resort",
      bn: "৪-তারকা টাইডাল ক্যানাল ইকো রিসোর্ট"
    },
    amenities: {
      en: ["Overwater Eco Cottages", "Organic Garden Dining", "Canal Kayaking", "Open-Air Spa", "Beach Trail Access"],
      bn: ["ওভারওয়াটার ইকো কটেজ", "অর্গানিক গার্ডেন ডাইনিং", "ক্যানাল কায়াকিং", "ওপেন-এয়ার স্পা", "সৈকত ট্রেইল অ্যাক্সেস"]
    },
    facilities: {
      en: [
        "Artisan timber and bamboo overwater cottages set along a serene saltwater tidal canal",
        "Organic farm-to-table open-air restaurant serving fresh coastal catches and homegrown produce",
        "Complimentary canal boat rides, stand-up paddleboarding, and ocean kayaks",
        "Open-air Ayurvedic wellness pavilion and yoga deck",
        "Private path leading to the secluded sands of Pechar Dwip beach",
        "Nightly driftwood bonfires and candlelit outdoor dining"
      ],
      bn: [
        "শান্ত লবণাক্ত খালের পাড়ে প্রাকৃতিক কাঠ ও বাঁশের তৈরি ওভারওয়াটার নান্দনিক কটেজ",
        "তাজা সি-ফুড ও নিজস্ব খামারের শাকসবজি সমৃদ্ধ ফার্ম-টু-টেবিল উন্মুক্ত রেস্তোরাঁ",
        "শান্ত খালে নৌকা ভ্রমণ, প্যাডেল বোর্ডিং ও কায়াকিং সুবিধা",
        "প্রাকৃতিক আয়ুর্বেদিক ওয়েলনেস প্যাভিলিয়ন ও ইয়োগা ডেক",
        "পেঁচারদ্বীপের নির্জন সমুদ্র সৈকতে যাওয়ার নিজস্ব সুন্দর মেঠোপথ",
        "প্রতি সন্ধ্যায় সৈকতমুখী বনফায়ার ও মনোরম ক্যান্ডেললাইট ডিনার"
      ]
    },
    description: {
      en: "An enchanting eco-sanctuary along the Reju Khal tidal canal near Marine Drive. Features overwater bamboo cottages, farm-to-table organic dining, canal kayaking, and tranquil nature vibes. Hotline: +880 1841-416464.",
      bn: "মেরিন ড্রাইভের কাছে রেজু খালের মোহনায় অবস্থিত রূপময় পরিবেশবান্ধব ইকো রিসোর্ট। খালের ওপর কাঠের ভিলা, অর্গানিক খাবার, কায়াকিং ও শান্ত সবুজ প্রকৃতি। হটলাইন: +880 1841-416464।"
    },
    phone: "+880 1841-416464",
    sourceUrl: "https://mermaidecoresort.com",
    sourceName: "mermaidecoresort.com",
    image: "assets/images/shamlapur-sampan.jpg"
  },
  {
    id: "praasad-paradise",
    name: {
      en: "Praasad Paradise Hotel & Resort",
      bn: "প্রাসাদ প্যারাডাইস হোটেল অ্যান্ড রিসোর্ট (Praasad Paradise)"
    },
    stars: 4,
    starLabel: {
      en: "4-Star Premium",
      bn: "৪-তারকা প্রিমিয়াম"
    },
    locationKey: "kolatoli",
    spotName: {
      en: "New Beach Road",
      bn: "নিউ বিচ রোড"
    },
    location: {
      en: "Plot 9, New Beach Road, Kolatoli, Cox's Bazar",
      bn: "প্লট ৯, নিউ বিচ রোড, কলাতলী, কক্সবাজার"
    },
    minBDT: 4500,
    maxBDT: 10500,
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
    rating: "4.5",
    badge: {
      en: "4-Star Private Beach Walkway",
      bn: "৪-তারকা নিজস্ব সৈকত সংযোগ"
    },
    amenities: {
      en: ["Outdoor Swimming Pool", "Private Beach Walkway", "Lush Lawn Courtyard", "Multi-Cuisine Dining", "Free Breakfast"],
      bn: ["আউটডোর সুইমিং পুল", "নিজস্ব সৈকত সংযোগ পথ", "সবুজ বাগান আঙিনা", "মাল্টি-কুইজিন ডাইনিং", "ফ্রি ব্রেকফাস্ট"]
    },
    facilities: {
      en: [
        "Dedicated private paved walkway leading directly onto the Kolatoli sandy beach",
        "Outdoor swimming pool with children's pool and poolside loungers",
        "Spacious green lawn courtyard with seating and sea breeze",
        "Multi-cuisine restaurant serving traditional Bengali & Chinese specialties",
        "Executive conference rooms and corporate banquet facilities",
        "Complimentary buffet breakfast, high-speed Wi-Fi & airport transfer"
      ],
      bn: [
        "হোটেল প্রাঙ্গণ থেকে সরাসরি সৈকতের বালুচরে যাওয়ার নিজস্ব বাঁধানো পথ",
        "বাচ্চাদের পুল ও সান লাউঞ্জারসহ আউটডোর সুইমিং পুল",
        "সমুদ্রের বাতাস উপভোগের জন্য সুপ্রশস্ত সবুজ লন ও বসার জায়গা",
        "ঐতিহ্যবাহী বাংলা ও চাইনিজ খাবার সমৃদ্ধ মাল্টি-কুইজিন রেস্টুরেন্ট",
        "এক্সিকিউটিভ কনফারেন্স রুম ও ব্যাংকুয়েট সুবিধা",
        "কমপ্লিমেন্টারি বুফে ব্রেকফাস্ট, ওয়াই-ফাই ও এয়ারপোর্ট শাটল"
      ]
    },
    description: {
      en: "Located on New Beach Road in Kolatoli. Features a dedicated private walkway directly to the beach, an outdoor swimming pool, lush green courtyards, and delicious family dining. Hotline: +880 1711-536968.",
      bn: "কলাতলী নিউ বিচ রোডে অবস্থিত জনপ্রিয় ৪-তারকা রিসোর্ট। সরাসরি সৈকতে নামার নিজস্ব রাস্তা, সুইমিং পুল, সবুজ বাগান ও পারিবারিক আতিথেয়তা। হটলাইন: +880 1711-536968।"
    },
    phone: "+880 1711-536968",
    sourceUrl: "https://praasadparadise.com",
    sourceName: "praasadparadise.com",
    image: "assets/images/hotel-kollol.jpg"
  },
  {
    id: "hotel-shaibal",
    name: {
      en: "Hotel Shaibal (BPC Parjatan)",
      bn: "হোটেল শৈবাল (বাংলাদেশ পর্যটন কর্পোরেশন)"
    },
    stars: 3,
    starLabel: {
      en: "3-Star Heritage Parjatan",
      bn: "৩-তারকা হেরিটেজ পর্যটন"
    },
    locationKey: "laboni",
    spotName: {
      en: "Laboni Point",
      bn: "লাবণী পয়েন্ট"
    },
    location: {
      en: "Parjatan Holiday Complex, Motel Road, Laboni Point, Cox's Bazar",
      bn: "পর্যটন হলিডে কমপ্লেক্স, মোটেল রোড, লাবণী পয়েন্ট, কক্সবাজার"
    },
    minBDT: 1800,
    maxBDT: 3600,
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
    rating: "4.3",
    badge: {
      en: "3-Star Government Parjatan Motel",
      bn: "৩-তারকা সরকারি পর্যটন মোটেল"
    },
    amenities: {
      en: ["9-Hole Golf Course Access", "20-Acre Open Estate", "Sagarika Dining", "Natural Lake", "Free Secure Parking"],
      bn: ["৯-হোল গলফ কোর্স সুবিধা", "২০ একর উন্মুক্ত সবুজ এলাকা", "সাগরিকা রেস্তোরাঁ", "প্রাকৃতিক লেক", "নিরাপদ পার্কিং"]
    },
    facilities: {
      en: [
        "Sprawling 20-acre historic green estate operated by Bangladesh Parjatan Corporation",
        "Direct access to Cox's Bazar's historic 9-hole golf course and tranquil freshwater lake",
        "Famous in-house 'Sagarika' restaurant serving authentic Bengali food & fresh sea fish",
        "A peaceful 3-minute stroll to the historic Laboni Beach promenade",
        "Massive secure open-air parking space for private buses and cars"
      ],
      bn: [
        "বাংলাদেশ পর্যটন কর্পোরেশন পরিচালিত ঐতিহাসিক ২০ একরের বিশাল সবুজ প্রাকৃতিক প্রাঙ্গণ",
        "কক্সবাজারের একমাত্র ৯-হোল গলফ কোর্স ও শান্ত মিঠাপানির লেকের সরাসরি সংলগ্ন",
        "জনপ্রিয় 'সাগরিকা' রেস্তোরাঁ (খাঁটি বাংলা খাবার ও তাজা সামুদ্রিক মাছের স্বাদ)",
        "ঐতিহাসিক লাবণী বিচ প্রমেনেড থেকে মাত্র ৩ মিনিটের হাঁটা দূরত্ব",
        "প্রাইভেট কার ও ট্যুর বাসের জন্য অত্যন্ত সুপ্রশস্ত ও নিরাপদ পার্কিং"
      ]
    },
    description: {
      en: "Government-run iconic holiday motel managed by Bangladesh Parjatan Corporation on Motel Road near Laboni Point. Features a 20-acre lush estate, 9-hole golf course, freshwater lake, and Sagarika restaurant. Phone: +880 1730-080808.",
      bn: "লাবণী পয়েন্ট মোটেল রোডে অবস্থিত বাংলাদেশ পর্যটন কর্পোরেশনের ঐতিহ্যবাহী হোটেল। ২০ একরের সবুজ প্রাঙ্গণ, গলফ কোর্স ও সাগরিকা রেস্তোরাঁ। ফোন: +880 1730-080808।"
    },
    phone: "+880 1730-080808",
    sourceUrl: "https://parjatan.gov.bd",
    sourceName: "parjatan.gov.bd",
    image: "assets/images/hotel-sea-crown.jpg"
  },
  {
    id: "windy-terrace-boutique",
    name: {
      en: "Windy Terrace Boutique Hotel",
      bn: "উইন্ডি টেরেস বুটিক হোটেল (Windy Terrace)"
    },
    stars: 3,
    starLabel: {
      en: "3-Star Boutique",
      bn: "৩-তারকা বুটিক হোটেল"
    },
    locationKey: "kolatoli",
    spotName: {
      en: "Kolatoli Beach Road",
      bn: "কলাতলী বিচ রোড"
    },
    location: {
      en: "Plot 40, Block C, Kolatoli Beach Road, Cox's Bazar",
      bn: "প্লট ৪০, ব্লক সি, কলাতলী বিচ রোড, কক্সবাজার"
    },
    minBDT: 2800,
    maxBDT: 5500,
    approx: true, // unsourced range, not a quoted rate
    asOf: "2026-10-15", // date this range was last reviewed, not confirmed with the hotel
    rating: "4.5",
    badge: {
      en: "3-Star Boutique Comfort",
      bn: "৩-তারকা বুটিক কমফোর্ট"
    },
    amenities: {
      en: ["Rooftop BBQ Terrace", "Boutique Styling", "Coffee Corner", "3-Min to Beach", "Free Buffet Breakfast"],
      bn: ["রুফটপ বারবিকিউ টেরেস", "নান্দনিক বুটিক ডিজাইন", "কফি কর্নার", "সৈকত থেকে ৩ মিনিট", "ফ্রি বুফে ব্রেকফাস্ট"]
    },
    facilities: {
      en: [
        "Open-air rooftop terrace restaurant famous for evening seafood barbecues and sea breeze",
        "Contemporary boutique-designed air-conditioned deluxe and family rooms",
        "Cozy ground-floor coffee lounge with bakery snacks and teas",
        "Walking distance of just 3 minutes to Kolatoli Beach sand",
        "Complimentary hot breakfast buffet, generator backup & Wi-Fi"
      ],
      bn: [
        "উন্মুক্ত রুফটপ টেরেস রেস্তোরাঁ—সন্ধ্যায় সি-ফুড বারবিকিউ ও সমুদ্রের বাতাসের জন্য বিখ্যাত",
        "আধুনিক নান্দনিক বুটিক ডিজাইনের ডিলাক্স ও ফ্যামিলি এসি রুম",
        "নিচতলায় মনোরম কফি লাউঞ্জ ও বেকারি কর্নার",
        "কলাতলী সমুদ্র সৈকতের বালুচর থেকে মাত্র ৩ মিনিটের হাঁটা দূরত্ব",
        "কমপ্লিমেন্টারি বুফে ব্রেকফাস্ট, সার্বক্ষণিক জেনারেটর ব্যাকআপ ও ওয়াই-ফাই"
      ]
    },
    description: {
      en: "A chic 3-star boutique property located on Kolatoli Beach Road. Renowned for its atmospheric rooftop barbecue nights, tasteful interiors, and warm coastal hospitality. Phone: +880 1755-668822.",
      bn: "কলাতলী বিচ রোডে অবস্থিত রুচিশীল ৩-তারকা বুটিক হোটেল। সান্ধ্যকালীন রুফটপ বারবিকিউ, মনোরম পরিবেশ ও সৈকতের কাছে সুবিধাজনক অবস্থান। ফোন: +880 1755-668822।"
    },
    phone: "+880 1755-668822",
    sourceUrl: "https://windyterrace.com",
    sourceName: "windyterrace.com",
    image: "assets/images/prime-park-hotel.jpg"
  }
];

/* --------------------------------------------------------------------------
 * 3. DESTINATIONS & SIGHTSEEING DATA (5 Iconic Spots + 4 Hidden Gems)
 *    Photographs from Wikimedia Commons
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
  },
  {
    id: "laboni-beach",
    name: {
      en: "Laboni Beach & Promenade",
      bn: "লাবণী সমুদ্র সৈকত ও প্রমোদভ্রমণ (Laboni Beach)"
    },
    tag: {
      en: "Oldest Beach Hub • Lifeguard Monitored",
      bn: "কক্সবাজারের প্রাচীনতম প্রধান সৈকত"
    },
    vibe: {
      en: "Classic golden sands, colorful umbrellas, beachside markets, and prime sunset swimming hub monitored by CIPRB Sea Safe lifeguards.",
      bn: "সোনালী বালুকাবেলা, রঙিন বিচ ছাতা, ঝিনুকের হস্তশিল্পের দোকান এবং লাইফগার্ড নিয়ন্ত্রিত সাঁতার কাটার সবচেয়ে জনপ্রিয় সৈকত।"
    },
    directions: {
      en: "Directly in town center at the end of Sea Beach Road.",
      bn: "কক্সবাজার শহরের কেন্দ্রস্থলে, সি বিচ রোডের মাথায়।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Laboni_beach.jpg",
    sourceName: "Wikimedia Commons (Laboni Beach)",
    image: "assets/images/hero-coxs-bazar.jpg"
  },
  {
    id: "sugandha-beach",
    name: {
      en: "Sugandha Beach & Night Market",
      bn: "সুগন্ধা বিচ ও রাতের মার্কেট (Sugandha Beach)"
    },
    tag: {
      en: "Heart of Evening Vibe & Live Seafood",
      bn: "সন্ধ্যার প্রাণবন্ত আড্ডা ও লাইভ সি-ফুড"
    },
    vibe: {
      en: "Bustling seaside walkway packed with live seafood fry stalls, dry fish outlets, beach quad bikes, and energetic crowds.",
      bn: "প্রাণবন্ত সৈকত প্রাঙ্গণ, সুস্বাদু লাইভ সামুদ্রিক মাছের ফ্রাই, বিচ কোয়াড বাইকিং এবং পর্যটকদের জমজমাট সান্ধ্যকালীন আড্ডা।"
    },
    directions: {
      en: "1 km south of Laboni, 5-min walk from Kolatoli junction.",
      bn: "লাবণী থেকে ১ কিমি দক্ষিণে, কলাতলী মোড় থেকে ৫ মিনিটের পথ।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sugandha_Beach,_Cox%27s_Bazar.jpg",
    sourceName: "Wikimedia Commons (Sugandha Beach)",
    image: "assets/images/hero-coxs-bazar.jpg"
  },
  {
    id: "kolatoli-sunset-point",
    name: {
      en: "Kolatoli Beach & Sunset Point",
      bn: "কলাতলী বিচ ও সানসেট পয়েন্ট (Kolatoli Beach)"
    },
    tag: {
      en: "Marine Drive Gateway • Dynamic Surf",
      bn: "মেরিন ড্রাইভের প্রবেশদ্বার • উন্মুক্ত সৈকত"
    },
    vibe: {
      en: "Main gateway where premier hotels meet the sea. Dynamic open shoreline, roaring surf waves, and stunning golden-hour horizon views.",
      bn: "কক্সবাজারের মূল প্রবেশদ্বার সৈকত যেখানে নামীদামী রিসোর্টগুলোর অবস্থান; সাগরের বিশাল ঢেউ ও সূর্যাস্তের অসাধারণ রূপ।"
    },
    directions: {
      en: "Kolatoli Circle (Dolphin Mor), start of Marine Drive.",
      bn: "কলাতলী গোলচত্বর (ডলফিন মোড়) ও মেরিন ড্রাইভের শুরুর মুখে।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kolatoli,_Cox%27s_Bazar_Sea_Beach.jpg",
    sourceName: "Wikimedia Commons (Kolatoli Beach)",
    image: "assets/images/hero-coxs-bazar.jpg"
  },
  {
    id: "daria-nagar-caves",
    name: {
      en: "Daria Nagar Caves & Ecopark",
      bn: "দরিয়ানগর প্রাকৃতিক গুহা ও ইকো পার্ক (Daria Nagar)"
    },
    tag: {
      en: "Natural Sea Caves • Marine Drive",
      bn: "প্রাকৃতিক সামুদ্রিক গুহা ও পাহাড়ি ঝিরি"
    },
    vibe: {
      en: "Ancient naturally carved sea caves and scenic hills opening onto the Bay of Bengal. Also a prime spot for ocean parasailing flights.",
      bn: "পাহাড় ও সমুদ্রের মিলনস্থলে প্রাচীন প্রাকৃতিক গুহা ও ঝিরিপথ; রোমাঞ্চকর প্যারাসেইলিং ও ক্যাম্পিংয়ের জন্য আদর্শ।"
    },
    directions: {
      en: "8 km south on Marine Drive (between Kolatoli and Himchari).",
      bn: "কলাতলী থেকে মেরিন ড্রাইভ ধরে ৮ কিমি দক্ষিণে (হিমছড়ির ঠিক আগে)।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Marine_Drive_Cox%27s_Bazar.jpg",
    sourceName: "Wikimedia Commons (Marine Drive)",
    image: "assets/images/kolatoli-eco.jpg"
  },
  {
    id: "reju-khal-estuary",
    name: {
      en: "Reju Khal Estuary & Mangrove Point",
      bn: "রেজু খাল মোহনা ও মেরিন ড্রাইভ ব্রিজ (Reju Khal)"
    },
    tag: {
      en: "Freshwater Estuary Meets the Sea",
      bn: "স্বচ্ছ নদী ও সাগরের মোহনা • কায়াকিং পয়েন্ট"
    },
    vibe: {
      en: "Mesmerizing confluence where the freshwater Reju river empties into the Bay of Bengal. Iconic concrete bridge, kayaking, and serene water vistas.",
      bn: "যেখানে রেজু নদীর মিষ্টি পানি সাগরে এসে মিলেছে। মনোরম ব্রিজ, কায়াকিংয়ের সুযোগ এবং শান্ত প্রাকৃতিক জলরাশি।"
    },
    directions: {
      en: "24 km south on Marine Drive, just north of Inani Beach.",
      bn: "মেরিন ড্রাইভ ধরে ২৪ কিমি দক্ষিণে (ইনানী সৈকতের কাছাকাছি)।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Inani_Beach_(135005).jpg",
    sourceName: "Wikimedia Commons (Reju Khal)",
    image: "assets/images/inani-beach.jpg"
  },
  {
    id: "kutubdia-island",
    name: {
      en: "Kutubdia Island & Historic Lighthouse",
      bn: "কুতুবদিয়া দ্বীপ ও প্রাচীন বাতিঘর (Kutubdia Island)"
    },
    tag: {
      en: "216 sq km Offshore Island • Wind Turbines",
      bn: "২১৬ বর্গকিমি উপকূলীয় দ্বীপ • বায়ু বিদ্যুৎ প্রকল্প"
    },
    vibe: {
      en: "A historic, tranquil offshore island famed for its British-era lighthouse ruins, Bangladesh's first wind turbine power park, and Qutub Aulia shrine.",
      bn: "ব্রিটিশ আমলের বাতিঘরের ধ্বংসাবশেষ, দেশের প্রথম বায়ু বিদ্যুৎ কেন্দ্র ও কুতুব আউলিয়ার মাজারের জন্য খ্যাত নির্জন দ্বীপ।"
    },
    directions: {
      en: "North of Cox's Bazar; cross Pekua Mognama Ghat via trawler or speed boat.",
      bn: "কক্সবাজার শহর থেকে উত্তরে পেকুয়া মগনামা ঘাট হয়ে ট্রলার বা স্পিডবোটে।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Adinath_Temple,_Moheshkhali_.jpg",
    sourceName: "Wikimedia Commons (Kutubdia)",
    image: "assets/images/moheshkhali.jpg"
  },
  {
    id: "teknaf-wildlife-sanctuary",
    name: {
      en: "Teknaf Wildlife Sanctuary & Kudum Cave",
      bn: "টেকনাফ বন্যপ্রাণী অভয়ারণ্য ও কুদুম গুহা (Teknaf Reserve)"
    },
    tag: {
      en: "11,615 Hectares • Asian Elephant Corridor",
      bn: "১১,৬১৫ হেক্টর চিরসবুজ বন • বুনো হাতির করিডোর"
    },
    vibe: {
      en: "Dense tropical semi-evergreen forest sanctuary hosting wild Asian elephants, hoolock gibbons, and the mystical bat-inhabited Kudum Cave.",
      bn: "সংরক্ষিত চিরসবুজ বনাঞ্চল, পাহাড়ি ট্রেইল, বুনো হাতির অভয়াশ্রম এবং বাদুড়ময় রহস্যময় কুদুম গুহা।"
    },
    directions: {
      en: "80 km south at the southern terminus of Marine Drive in Teknaf.",
      bn: "মেরিন ড্রাইভের শেষ প্রান্তে টেকনাফ উপজেলায় (কলাতলী থেকে প্রায় ৮০ কিমি)।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Himchari,_Cox%27s_Bazar_(2Q7A1950).jpg",
    sourceName: "Wikimedia Commons (Teknaf)",
    image: "assets/images/himchari.jpg"
  },
  {
    id: "dulhazra-safari-park",
    name: {
      en: "Bangabandhu Safari Park (Dulhazra)",
      bn: "ডুলাহাজরা সাফারি পার্ক ও বন্যপ্রাণী সংরক্ষণাগার (Dulhazra)"
    },
    tag: {
      en: "900-Hectare Open Range Wildlife Park",
      bn: "৯০০ হেক্টরের উন্মুক্ত বন্যপ্রাণী সাফারি পার্ক"
    },
    vibe: {
      en: "First safari park in Bangladesh where Bengal tigers, lions, elephants, spotted deer, and exotic hornbills roam in spacious natural enclosures.",
      bn: "দেশের প্রথম সাফারি পার্ক যেখানে প্রাকৃতিক পরিবেশে রয়েল বেঙ্গল টাইগার, সিংহ, মায়াহরিণ ও বহু প্রজাতির পাখি বাস করে।"
    },
    directions: {
      en: "45 km north of Cox's Bazar on the Chittagong-Cox's Bazar National Highway (Chakaria).",
      bn: "চট্টগ্রাম-কক্সবাজার জাতীয় মহাসড়ক ধরে চকরিয়া উপজেলায় (কক্সবাজার থেকে ৪৫ কিমি)।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Himchari,_Cox%27s_Bazar_(2Q7A1950).jpg",
    sourceName: "Wikimedia Commons (Dulhazra)",
    image: "assets/images/kolatoli-eco.jpg"
  },
  {
    id: "aggamedha-buddhist-vihara",
    name: {
      en: "Aggamedha Buddhist Vihara & Ramu Pagodas",
      bn: "আগ্যামেধা কিয়াং ও রামুর প্রাচীন বৌদ্ধ প্যাগোডা"
    },
    tag: {
      en: "16th-Century Heritage • Rakhine Architecture",
      bn: "১৬শ শতাব্দীর ঐতিহাসিক রাখাইন কাষ্ঠশিল্প ও বিহার"
    },
    vibe: {
      en: "Sacred monastery featuring distinctive Burmese timber-carved prayer halls, bronze Buddha icons, and palm-leaf manuscript archives.",
      bn: "কাঠের শৈল্পিক কারুকাজসমৃদ্ধ বার্মিজ স্থাপত্যের বৌদ্ধ প্যাগোডা, প্রাচীন ব্রোঞ্জের বুদ্ধমূর্তি ও শতবর্ষী পাণ্ডুলিপি।"
    },
    directions: {
      en: "Near main entrance to Cox's Bazar town & Ramu township.",
      bn: "কক্সবাজার শহরের প্রবেশমুখে ও রামু উপজেলার প্রাচীন বৌদ্ধ পল্লীতে।"
    },
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Bhuvan_shanti_100_feet_lion_bed_statue_of_Gautama_Buddha.jpg",
    sourceName: "Wikimedia Commons (Aggamedha)",
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
  },
  {
    id: "poushee-restaurant",
    name: {
      en: "Poushee Restaurant (30+ Bhartas & Fish Fry)",
      bn: "পৌঁষি রেস্তোরাঁ (৩০+ পদের ভর্তা ও তাজা মাছ)"
    },
    highlight: {
      en: "Legendary Coastal Dining & Bhartas",
      bn: "কক্সবাজারের কিংবদন্তি ঐতিহ্যবাহী খাবার"
    },
    description: {
      en: "Cox's Bazar's most revered traditional dining hub in Jhautola, celebrated for over 30 varieties of freshly ground bhartas (Loitta shutki, Chingri, Begun, Kolar Mocha), crispy Loitta fry, Churi fry, and fresh Rupchanda curry served with aromatic steamed rice.",
      bn: "কক্সবাজারের সবচেয়ে জনপ্রিয় ঐতিহ্যবাহী রেস্তোরাঁ—যেখানে পাবেন লইট্যা শুঁটকি, চিংড়ি, বেগুনসহ ৩০টিরও বেশি পদের সুস্বাদু ভর্তা, মচমচে লইট্যা ফ্রাই এবং রূপচাঁদার ভুনা।"
    },
    image: "assets/images/hero-coxs-bazar.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cox%27s_Bazar_Sea_Beach.jpg",
    icon: "utensils"
  },
  {
    id: "jhaubon-restaurant",
    name: {
      en: "Jhaubon Restaurant (Seafood & Duck Bhuna)",
      bn: "ঝাউবন রেস্তোরাঁ (সি-ফুড ও হাঁসের মাংস)"
    },
    highlight: {
      en: "Fresh Sea Fish Fry & Coastal Curries",
      bn: "তাজা সামুদ্রিক মাছের ঝোল ও স্পাইসি ডাক ভুনা"
    },
    description: {
      en: "Historic eatery popular among foodies for its unpretentious, homestyle cooking: spicy sea crab curry, fresh Coral fish curry, coastal duck bhuna, and crispy deep-fried small fish with hot lentils and rice.",
      bn: "ভোজনরসিকদের দীর্ঘদিনের প্রিয় ঠিকানা—স্পাইসি কাঁকড়া কারি, তাজা কোরাল মাছের ঝোল, ঝাল হাঁসের মাংস ভুনা ও গরম ডাল-ভাত।"
    },
    image: "assets/images/hero-coxs-bazar.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cox%27s_Bazar_Sea_Beach.jpg",
    icon: "utensils"
  },
  {
    id: "sugandha-live-fish-fry",
    name: {
      en: "Sugandha Live Charcoal Fish Fry Market",
      bn: "সুগন্ধা লাইভ সি-ফুড ও চারকোল ফ্রাই মার্কেট"
    },
    highlight: {
      en: "Pick Live Catch & BBQ on Glowing Embers",
      bn: "সরাসরি তাজা মাছ বেছে নিয়ে চারকোল বারবিকিউ"
    },
    description: {
      en: "Every evening, Sugandha beach lights up with open-air fish stalls displaying fresh red snapper, tiger prawns, pomfret, squids, and lobsters. Pick your fish, marinated in secret local coastal spices, and grilled right on glowing charcoal.",
      bn: "প্রতি সন্ধ্যায় সুগন্ধা সৈকতে বসে তাজা সামুদ্রিক মাছের মেলা। লাল পোয়া, টাইগার চিংড়ি, রূপচাঁদা বা স্কুইড নিজের পছন্দমতো বেছে নিলে বিশেষ মশলায় কয়লার আগুনে তাৎক্ষণিক ফ্রাই বা বারবিকিউ করে দেওয়া হয়।"
    },
    image: "assets/images/hero-coxs-bazar.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sugandha_Beach,_Cox%27s_Bazar.jpg",
    icon: "flame"
  },
  {
    id: "kasturi-restaurant",
    name: {
      en: "Kasturi Restaurant & Crab Curry Haven",
      bn: "কস্তুরী রেস্তোরাঁ ও সামুদ্রিক কাঁকড়া স্পেশাল"
    },
    highlight: {
      en: "Coastal Crab Masala & Shutki Delicacies",
      bn: "স্পাইসি কাঁকড়া মাসালা ও ঐতিহ্যবাহী শুঁটকি"
    },
    description: {
      en: "Famed among travelers for its signature mud crab and blue crab curries cooked in rich, aromatic coastal spices, along with tender calamari roast and spicy shutki dishes served at affordable prices.",
      bn: "কক্সবাজারের সুপরিচিত সি-ফুড স্পট—বিশেষ করে মালাই ও ঝাল মশলায় রান্না করা সামুদ্রিক কাঁকড়া, অক্টোপাস/স্কুইড রোস্ট এবং ঐতিহ্যবাহী শুঁটকি চাটনি।"
    },
    image: "assets/images/hero-coxs-bazar.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cox%27s_Bazar_Sea_Beach.jpg",
    icon: "utensils"
  },
  {
    id: "rakhine-handloom-village",
    name: {
      en: "Rakhine Handloom Weaving Village (Ramu & Moheshkhali)",
      bn: "রাখাইন ঐতিহ্যবাহী তাঁতপল্লী (রামু ও মহেশখালী)"
    },
    highlight: {
      en: "Indigenous Ancestral Wooden Looms",
      bn: "শতবর্ষী কাঠের তাঁতে বোনা সিল্ক ও সুতি পোশাক"
    },
    description: {
      en: "Visit the serene indigenous Rakhine homesteads where master weavers craft vibrant geometric silk lungis, shawls, bedcovers, and bags on ancestral handlooms. Experience living cultural heritage and buy directly from artisans.",
      bn: "শান্ত রাখাইন পল্লীতে ঘুরে দেখা যায় ঐতিহ্যবাহী কাঠের তাঁতযন্ত্র। সেখানে কারিগররা পরম যত্নে তৈরি করেন রঙিন রাখাইন থামি, লুঙ্গি ও চাদর; সরাসরি শিল্পীদের কাছ থেকে পণ্য কেনার দারুণ অভিজ্ঞতা।"
    },
    image: "assets/images/ramu-buddha.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Adinath_Temple,_Moheshkhali_.jpg",
    icon: "sparkles"
  },
  {
    id: "moheshkhali-betel-salt",
    name: {
      en: "Moheshkhali Sweet Betel Leaf & Salt Pans",
      bn: "মহেশখালীর ঐতিহ্যবাহী মিষ্টি পান ও লবণের মাঠ"
    },
    highlight: {
      en: "Artisan Coastal Agriculture & Salt Evaporation",
      bn: "বিখ্যাত সুস্বাদু মিষ্টি পান ও সমুদ্রজল থেকে লবণ উৎপাদন"
    },
    description: {
      en: "Moheshkhali is nationally renowned for its sweet-aroma 'Paan' (betel leaf) cultivated in lush shaded bamboo 'Boroj', and extensive white salt evaporation fields that glisten like snow under the coastal winter sun.",
      bn: "মহেশখালীর মিষ্টি সুবাসযুক্ত পানের বরজ এবং উপকূলীয় লবণের মাঠ এক অনন্য সাংস্কৃতিক দৃশ্য। শীতের রোদে সাদা লবণের মাঠ বরফের প্রান্তরের মতো জ্বলজ্বল করে।"
    },
    image: "assets/images/moheshkhali.jpg",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Adinath_Temple,_Moheshkhali_.jpg",
    icon: "sun"
  }
];

/* --------------------------------------------------------------------------
 * 3B. ACTIVITIES & COASTAL ADVENTURES (approximate prices)
 * -------------------------------------------------------------------------- */
let ACTIVITIES_DATA = [
  {
    id: "surfing-lesson",
    name: {
      en: "Surfing & Ocean Wave Riding",
      bn: "সার্ফিং ও ওয়েভ রাইডিং (Surfing Lesson)"
    },
    category: "water",
    priceBDT: 1500,
    priceMaxBDT: 2500,
    priceNote: {
      en: "per session (instructor + surfboard included)",
      bn: "প্রতি সেশন (ইন্সট্রাক্টর ও সার্ফবোর্ড সহ)"
    },
    location: {
      en: "Laboni Beach & Kolatoli Point (Cox's Bazar Surf Club)",
      bn: "লাবণী বিচ ও কলাতলী পয়েন্ট (কক্সবাজার সার্ফ ক্লাব)"
    },
    duration: {
      en: "1.5 – 2 Hours",
      bn: "১.৫ – ২ ঘণ্টা"
    },
    difficulty: {
      en: "Beginner to Intermediate",
      bn: "নতুন থেকে মধ্যম"
    },
    badge: {
      en: "Top Ocean Sport",
      bn: "সেরা রোমাঞ্চকর খেলা"
    },
    description: {
      en: "Learn to catch and ride the Bay of Bengal swells under the guidance of certified local surf lifesavers. Includes international-standard soft-top boards, rashguards, safety leashes, and ocean reading instructions.",
      bn: "দক্ষ স্থানীয় সার্ফারদের নির্দেশনায় বঙ্গোপসাগরের ঢেউয়ের ওপর ভেসে চলার রোমাঞ্চ উপভোগ করুন। সার্ফবোর্ড, সেফটি গিয়ার ও প্রাথমিক প্রশিক্ষণ অন্তর্ভুক্ত।"
    },
    included: {
      en: ["Certified Surf Instructor", "Surfboard & Safety Leash", "Rashguard Vest", "Basic Safety Briefing"],
      bn: ["প্রশিক্ষিত সার্ফ ট্রেইনার", "সার্ফবোর্ড ও সেফটি রশি", "র‌্যাশগার্ড টি-শার্ট", "নিরাপত্তা ব্রিফিং"]
    },
    image: "assets/images/hero-coxs-bazar.jpg",
    icon: "waves"
  },
  {
    id: "beach-horse-riding",
    name: {
      en: "Beach Shoreline Horse Riding",
      bn: "সমুদ্র সৈকতে ঘোড়ায় চড়া (Horse Riding)"
    },
    category: "beach",
    priceBDT: 200,
    priceMaxBDT: 500,
    priceNote: {
      en: "per ride (15-30 min) / ৳600 per hour",
      bn: "প্রতি রাইড (১৫-৩০ মিনিট) / ঘণ্টায় ৬০০ টাকা"
    },
    location: {
      en: "Sugandha Beach & Laboni Beach",
      bn: "সুগন্ধা ও লাবণী সমুদ্র সৈকত"
    },
    duration: {
      en: "15 – 30 Mins",
      bn: "১৫ – ৩০ মিনিট"
    },
    difficulty: {
      en: "Easy & Family-Friendly",
      bn: "সহজ ও পরিবারবান্ধব"
    },
    badge: {
      en: "Iconic Experience",
      bn: "জনপ্রিয় অভিজ্ঞতা"
    },
    description: {
      en: "Trotting across the gentle surf line on decorated horses accompanied by local handlers. An iconic Cox's Bazar tradition offering unbeatable photo moments against crashing waves and golden sunsets.",
      bn: "সমুদ্রের ফেনিল ঢেউয়ের ধারে ঘোড়ার পিঠে চড়ে মনোরম ভ্রমণ। গোধূলির সূর্যাস্তে ছবি তোলা ও পরিবারের সাথে উপভোগ করার অন্যতম ক্লাসিক অভিজ্ঞতা।"
    },
    included: {
      en: ["Trained Coastal Horse", "Experienced Handler Assistance", "Shoreline Trot Route", "Photo Opportunity"],
      bn: ["প্রশিক্ষিত সৈকত ঘোড়া", "অভিজ্ঞ হ্যান্ডলার সহায়তা", "সৈকত ভ্রমণ", "ছবি তোলার সুযোগ"]
    },
    image: "assets/images/hero-coxs-bazar.jpg",
    icon: "sparkles"
  },
  {
    id: "parasailing-sky-gliding",
    name: {
      en: "Ocean Parasailing & Sky Gliding",
      bn: "প্যারাসেইলিং ও ওশান স্কাই গ্লাইডিং"
    },
    category: "water",
    priceBDT: 2000,
    priceMaxBDT: 3500,
    priceNote: {
      en: "per flight (Normal or Ocean Dip)",
      bn: "প্রতি ফ্লাইট (নরমাল বা ওয়াটার ডিপ সহ)"
    },
    location: {
      en: "Daria Nagar Beach & Kolatoli Point",
      bn: "দরিয়ানগর বিচ ও কলাতলী পয়েন্ট"
    },
    duration: {
      en: "10 – 15 Mins",
      bn: "১০ – ১৫ মিনিট"
    },
    difficulty: {
      en: "Thrilling Adventure",
      bn: "রোমাঞ্চকর আকাশ ভ্রমণ"
    },
    badge: {
      en: "300ft Aerial View",
      bn: "৩০০ ফুট উঁচুতে ওড়া"
    },
    description: {
      en: "Fly 300+ feet in the sky harnessed to a colorful parachute towed by a 200-horsepower speedboat. Experience breathtaking bird’s-eye views of the infinite blue ocean and lush green coastal mountains.",
      bn: "শক্তিশালী স্পিডবোটের সাথে প্যারাস্যুটে বাঁধা অবস্থায় ৩০০ ফুট আকাশে ওড়ার শ্বাসরুদ্ধকর অভিজ্ঞতা। আকাশ থেকে দেখুন দিগন্তজোড়া নীল সাগর ও সবুজ পাহাড়।"
    },
    included: {
      en: ["Tandem/Solo Parachute Flight", "Coast Guard Standard Lifejacket", "Speedboat Towing System", "Optional Water-Dip Thrill"],
      bn: ["প্যারাস্যুট ফ্লাইট", "আন্তর্জাতিক মানের লাইফজ্যাকেট", "হাই-স্পিড বোট সিস্টেম", "ঐচ্ছিক ওয়াটার ডিপ"]
    },
    image: "assets/images/kolatoli-eco.jpg",
    icon: "wind"
  },
  {
    id: "chander-gari-safari",
    name: {
      en: "Chander Gari Marine Drive Jeep Safari",
      bn: "চান্দের গাড়িতে মেরিন ড্রাইভ ওপেন-এয়ার সাফারি"
    },
    category: "safari",
    priceBDT: 3000,
    priceMaxBDT: 5500,
    priceNote: {
      en: "per full reserved jeep (10-14 passengers)",
      bn: "পুরো জিপ রিজার্ভ (১০-১৪ জন যাত্রী)"
    },
    location: {
      en: "Kolatoli to Himchari, Inani & Shamlapur (Marine Drive)",
      bn: "কলাতলী থেকে হিমছড়ি, ইনানী ও শামলাপুর (মেরিন ড্রাইভ)"
    },
    duration: {
      en: "4 – 6 Hours",
      bn: "৪ – ৬ ঘণ্টা"
    },
    difficulty: {
      en: "All Ages / Group Favorite",
      bn: "সব বয়সের / গ্রুপের জন্য সেরা"
    },
    badge: {
      en: "Must-Do Group Trip",
      bn: "গ্রুপ ভ্রমণের সেরা আকর্ষণ"
    },
    description: {
      en: "Hop into an open-roof modified 4x4 'Chander Gari' (Moon Car) and cruise down the world's longest 80 km Marine Drive highway, wedged between towering emerald hills on one side and roaring waves on the other.",
      bn: "খোলা ছাদের চান্দের গাড়িতে দলবেঁধে গান গাইতে গাইতে মেরিন ড্রাইভ ধরে ছুটে চলা—একপাশে পাহাড়ের সবুজ দেয়াল আর অন্যপাশে গর্জনশীল সাগর। কক্সবাজারের সবচেয়ে সেরা স্মৃতি।"
    },
    included: {
      en: ["Dedicated 4x4 Utility Jeep", "Experienced Marine Drive Driver", "Stops at Himchari & Inani", "Flexible Sunset Photo Stops"],
      bn: ["রিজার্ভ ৪x৪ চান্দের গাড়ি", "অভিজ্ঞ ড্রাইভার", "হিমছড়ি ও ইনানী যাত্রাবিরতি", "মনোরম স্থানে ফটো স্টপ"]
    },
    image: "assets/images/himchari.jpg",
    icon: "compass"
  },
  {
    id: "beach-atv-quad-biking",
    name: {
      en: "Beach ATV Quad Biking",
      bn: "সৈকতে এটিভি কোয়াড বাইকিং (ATV Quad Bike)"
    },
    category: "beach",
    priceBDT: 300,
    priceMaxBDT: 500,
    priceNote: {
      en: "per ride / round (10-15 min)",
      bn: "প্রতি রাইড / রাউন্ড (১০-১৫ মিনিট)"
    },
    location: {
      en: "Laboni Beach, Sugandha & Kolatoli Shore",
      bn: "লাবণী, সুগন্ধা ও কলাতলী সৈকত"
    },
    duration: {
      en: "10 – 15 Mins",
      bn: "১০ – ১৫ মিনিট"
    },
    difficulty: {
      en: "Exciting & Easy",
      bn: "উত্তেজনাপূর্ণ ও সহজ"
    },
    badge: {
      en: "High-Traction Thrill",
      bn: "বালুকাবেলায় স্পিড"
    },
    description: {
      en: "Power across the wide low-tide shoreline on 4-wheel all-terrain quad bikes. Simple throttle-and-brake controls make it accessible for beginners while providing an invigorating rush of sea spray.",
      bn: "শক্তিশালী ফোর-হুইল এটিভি কোয়াড বাইকে চেপে সৈকতের ভেজা বালিতে ঝড় তোলার দারুণ আনন্দ। সহজ কন্ট্রোল এবং সম্পূর্ণ নিরাপদ হেলমেটযুক্ত রাইডিং।"
    },
    included: {
      en: ["Automatic 4x4 ATV Quad Bike", "Safety Helmet", "Beach Marshall Guidance", "Shoreline Circuit"],
      bn: ["স্বয়ংক্রিয় এটিভি বাইক", "সেফটি হেলমেট", "ট্র্যাক মার্শাল গাইড", "সৈকত সার্কিট রাইড"]
    },
    image: "assets/images/hero-coxs-bazar.jpg",
    icon: "zap"
  },
  {
    id: "jet-ski-speed-riding",
    name: {
      en: "Jet Ski High-Speed Ocean Riding",
      bn: "জেট স্কি হাই-স্পিড রাইডিং (Jet Ski)"
    },
    category: "water",
    priceBDT: 600,
    priceMaxBDT: 1200,
    priceNote: {
      en: "per ride (with pilot or guided solo)",
      bn: "প্রতি রাইড (পাইলটসহ বা সুপারভাইজড)"
    },
    location: {
      en: "Laboni Point & Inani Sea Beach",
      bn: "লাবণী পয়েন্ট ও ইনানী সৈকত"
    },
    duration: {
      en: "10 – 15 Mins",
      bn: "১০ – ১৫ মিনিট"
    },
    difficulty: {
      en: "High Adrenaline",
      bn: "তীব্র গতির রোমাঞ্চ"
    },
    badge: {
      en: "Wave Slicer",
      bn: "ঢেউ ভাঙা গতি"
    },
    description: {
      en: "Slice through open ocean waves at high speeds on powerful personal watercraft. Ride tandem with an expert pilot or take the handlebars under strict coast guard perimeter safety.",
      bn: "শক্তিশালী জেট স্কিতে সাগরের উত্তাল ঢেউ কেটে বিদ্যুৎ গতিতে ছুটে চলা। অভিজ্ঞ পাইলটের তত্ত্বাবধানে জীবনের অন্যতম সেরা অ্যাডভেঞ্চার।"
    },
    included: {
      en: ["High-Powered Watercraft", "CE-Certified Life Jacket", "Professional Pilot Escort", "Emergency Rescue Patrol"],
      bn: ["হাই-পাওয়ার জেট স্কি", "লাইফজ্যাকেট", "পেশাদার পাইলট সহায়তা", "জরুরি রেসকিউ সুরক্ষা"]
    },
    image: "assets/images/inani-beach.jpg",
    icon: "waves"
  },
  {
    id: "mangrove-estuary-kayaking",
    name: {
      en: "Reju Khal Mangrove & Estuary Kayaking",
      bn: "রেজু খাল ও মোহনায় ম্যানগ্রোভ কায়াকিং"
    },
    category: "water",
    priceBDT: 300,
    priceMaxBDT: 500,
    priceNote: {
      en: "per person (single or tandem kayak)",
      bn: "জনপ্রতি (সিঙ্গেল বা ডাবল কায়াক)"
    },
    location: {
      en: "Reju Khal Bridge (Marine Drive, Ukhiya)",
      bn: "রেজু খাল ব্রিজ (মেরিন ড্রাইভ, উখিয়া)"
    },
    duration: {
      en: "45 – 60 Mins",
      bn: "৪৫ – ৬০ মিনিট"
    },
    difficulty: {
      en: "Peaceful & Eco-Friendly",
      bn: "শান্ত ও প্রকৃতিবান্ধব"
    },
    badge: {
      en: "Eco Tourism Gem",
      bn: "ইকো ট্যুরিজম"
    },
    description: {
      en: "Paddle peacefully along the winding freshwater Reju river and mangrove wetlands where calm green waters meet coastal hills. Spot kingfishers, herons, and enjoy a meditative break away from crowded beach hubs.",
      bn: "সবুজ পাহাড়ের কোল ঘেঁষে বয়ে চলা রেজু খালের শান্ত জলে কায়াক চালিয়ে ঘুরে বেড়ানোর অপূর্ব অনুভূতি। চারপাশের নিস্তব্ধ প্রকৃতি, মাছরাঙার ওড়াউড়ি ও বিশুদ্ধ বাতাস।"
    },
    included: {
      en: ["Sit-on-top Single/Double Kayak", "Double-bladed Paddle", "Life Jacket", "Dry Bag for Mobile"],
      bn: ["সিঙ্গেল/ডাবল কায়াক", "প্যাডেল", "লাইফজ্যাকেট", "মোবাইলের ওয়াটারপ্রুফ ব্যাগ"]
    },
    image: "assets/images/inani-beach.jpg",
    icon: "compass"
  },
  {
    id: "speedboat-thrill-cruise",
    name: {
      en: "Speedboat Thrill Cruise to Moheshkhali",
      bn: "মহেশখালী চ্যানেলে স্পিডবোট রোমাঞ্চ ক্রুজ"
    },
    category: "water",
    priceBDT: 90,
    priceMaxBDT: 2500,
    priceNote: {
      en: "৳90 shared per person / ৳2,500 private reserve",
      bn: "জনপ্রতি ৯০ টাকা (শেয়ারড) / ২,৫০০ টাকা (রিজার্ভ)"
    },
    location: {
      en: "Kasturi Ghat (6 No. Ghat) to Moheshkhali Jetty",
      bn: "কস্তুরাঘাট (৬ নং ঘাট) থেকে মহেশখালী জেটি"
    },
    duration: {
      en: "30 – 40 Mins",
      bn: "৩০ – ৪০ মিনিট"
    },
    difficulty: {
      en: "Fast Marine Transit",
      bn: "দ্রুতগতির নৌযাত্রা"
    },
    badge: {
      en: "Island Gateway",
      bn: "দ্বীপযাত্রার বাহন"
    },
    description: {
      en: "An electrifying high-speed water crossing across the Bakkhali river channel into the Bay of Bengal waters towards the hilly island of Moheshkhali. Life vests provided for all passengers.",
      bn: "বাঁকখালী নদী ও বঙ্গোপসাগরের মোহনা চিরে তীব্র গতিতে ছুটে চলা স্পিডবোট। স্বল্প সময়ে মহেশখালী দ্বীপে পৌঁছানোর পাশাপাশি এক অবিস্মরণীয় রোমাঞ্চ।"
    },
    included: {
      en: ["Fast Twin-Engine Speedboat", "Life Jacket for Every Passenger", "River Estuary Panoramas", "Direct Island Pier Drop"],
      bn: ["দ্রুতগতির স্পিডবোট", "যাত্রীদের লাইফজ্যাকেট", "মোহনার মনোরম দৃশ্য", "দ্বীপে সরাসরি পৌঁছানো"]
    },
    image: "assets/images/moheshkhali.jpg",
    icon: "anchor"
  },
  {
    id: "beach-camping-bonfire-bbq",
    name: {
      en: "Night Beach Camping & Bonfire BBQ",
      bn: "নাইট বিচ ক্যাম্পিং ও লাইভ বারবিকিউ (Camping & BBQ)"
    },
    category: "night",
    priceBDT: 1500,
    priceMaxBDT: 2500,
    priceNote: {
      en: "per person (tent, mat, live BBQ dinner & breakfast)",
      bn: "জনপ্রতি (তাঁবু, বিছানা, লাইভ বারবিকিউ ডিনার ও নাস্তা)"
    },
    location: {
      en: "Sonadia Island & Shamlapur Eco Coast",
      bn: "সোনাদিয়া দ্বীপ ও শামলাপুর নির্জন সৈকত"
    },
    duration: {
      en: "Overnight (5:00 PM – 9:00 AM)",
      bn: "রাত্রিযাপন (বিকেল ৫টা – সকাল ৯টা)"
    },
    difficulty: {
      en: "Outdoor Adventure",
      bn: "আউটডোর অ্যাডভেঞ্চার"
    },
    badge: {
      en: "Starlit Nights",
      bn: "তারার নিচে রাতযাপন"
    },
    description: {
      en: "Sleep under a blanket of stars with the gentle rhythmic crash of ocean waves. Gather around a crackling beach bonfire with live grilled sea fish or chicken, acoustic music, and sunrise tea.",
      bn: "নির্জন সৈকতে তাঁবু খাটিয়ে খোলা আকাশের নিচে রাত কাটানো। রাতের সাগরের গর্জন, জ্বলন্ত ক্যাম্পফায়ার, তাজা মাছের বারবিকিউ এবং ভোরের রক্তিম সূর্যোদয়।"
    },
    included: {
      en: ["Weatherproof Dome Tent & Bedding", "Live Charcoal Fish/Chicken BBQ", "Beach Bonfire Setup", "Morning Coastal Breakfast"],
      bn: ["ওয়াটারপ্রুফ তাঁবু ও ম্যাট্রেস", "লাইভ চারকোল বারবিকিউ ডিনার", "ক্যাম্পফায়ার ও আলো", "সকালের নাস্তা"]
    },
    image: "assets/images/sonadia-island.jpg",
    icon: "tent"
  },
  {
    id: "marine-drive-cycling-tour",
    name: {
      en: "Coastal Cycling on Marine Drive",
      bn: "মেরিন ড্রাইভে কোস্টাল সাইক্লিং ট্যুর"
    },
    category: "beach",
    priceBDT: 250,
    priceMaxBDT: 500,
    priceNote: {
      en: "per half-day bicycle rental",
      bn: "হাফ-ডে বাইসাইকেল ভাড়া"
    },
    location: {
      en: "Kolatoli to Himchari National Park (18 km stretch)",
      bn: "কলাতলী থেকে হিমছড়ি জাতীয় উদ্যান (১৮ কিমি)"
    },
    duration: {
      en: "2 – 4 Hours",
      bn: "২ – ৪ ঘণ্টা"
    },
    difficulty: {
      en: "Moderate Fitness",
      bn: "মাঝারি শারীরিক কসরত"
    },
    badge: {
      en: "Eco Road Trip",
      bn: "পরিবেশবান্ধব ভ্রমণ"
    },
    description: {
      en: "Rent geared mountain bikes or classic city bicycles to pedal smoothly along the paved coastal highway. Breathe the salt air, stop at roadside green coconut stalls, and enjoy complete travel freedom at your own pace.",
      bn: "গিয়ার সাইকেল নিয়ে মেরিন ড্রাইভের মসৃণ পিচঢালা পথে স্বপ্নের মতো ভ্রমণ। সাগরের তাজা বাতাস, ডাবের পানি পানের বিরতি এবং সম্পূর্ণ নিজের গতিতে প্রাকৃতিক সৌন্দর্য উপভোগ।"
    },
    included: {
      en: ["Multi-speed Mountain Bike", "Bicycle Lock & Helmet", "Route Map & Safety Advice", "Support Hotline"],
      bn: ["মাল্টি-স্পিড মাউন্টেন বাইক", "লক ও সাইক্লিং হেলমেট", "রুট ম্যাপ ও পরামর্শ", "জরুরি হেল্পলাইন"]
    },
    image: "assets/images/himchari.jpg",
    icon: "compass"
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
