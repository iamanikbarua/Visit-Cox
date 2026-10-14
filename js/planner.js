/**
 * Visit Cox — "Make My Planner" & 60-Second Trip Matchmaker engine.
 * Budget formula, schedule, WhatsApp hand-off and the two pass exporters (PNG).
 * PlannerApp.estimate(params) is the one budget formula; quickpick.js uses it too.
 */

// Escape catalog/URL text before it goes into innerHTML.
function plannerEsc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ============================================================================
// 1. MASTER CATALOG & DATA SCHEMAS
// ============================================================================
const PLANNER_CATALOG = {
  // ARCHETYPES FOR 60-SECOND MATCHMAKER
  archetypes: [
    {
      id: "wave_hunter",
      title: "The Wave Hunter",
      subtitle: "Adrenaline & Thrills",
      icon: "🏄",
      vibe: "adventure",
      defaultActivities: ["marine_drive", "parasailing", "jetski"],
      desc: "For adrenaline seekers who want speedboats, wave-bashing, and soaring 300ft above the sea."
    },
    {
      id: "quiet_coral",
      title: "The Quiet Coral Seeker",
      subtitle: "Peace & Sunset Breeze",
      icon: "🧘",
      vibe: "relaxing",
      preferredHub: "inani",
      defaultActivities: ["marine_drive", "inani_coral", "himchari_hill"],
      desc: "Escape crowded town beaches. Walk on ancient coral at low tide and chill in eco-cafes."
    },
    {
      id: "foodie_hunter",
      title: "The 12-Bhorta & BBQ Foodie",
      subtitle: "Authentic Coastal Feasts",
      icon: "🍤",
      vibe: "foodie",
      defaultActivities: ["night_bbq", "marine_drive", "inani_coral"],
      desc: "Legendary Loitta fry, 10 types of shutki bhorta, and live evening beach seafood charcoal BBQ."
    },
    {
      id: "family_leader",
      title: "The Stress-Free Family Leader",
      subtitle: "Safe Waves & Zero Rush",
      icon: "👨‍👩‍👧‍👦",
      vibe: "family",
      defaultActivities: ["fish_world", "himchari_hill", "inani_coral"],
      desc: "Safe shallow beaches, Radiant Fish World aquarium, clean AC suites, and trusted private transport."
    },
    {
      id: "ocean_romance",
      title: "Oceanview Romance",
      subtitle: "Couples & Sunsets",
      icon: "💖",
      vibe: "romantic",
      hotelType: "5star",
      defaultActivities: ["marine_drive", "inani_coral", "night_bbq"],
      desc: "Private ocean-view balconies, candlelight seaside dinners, and quiet sunset walks."
    }
  ],

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

  activities: [
    {
      id: "marine_drive",
      name: "Scenic Marine Drive 80km Open Safari",
      costPerPerson: 400,
      duration: "Half Day",
      vibe: ["relaxing", "adventure", "romantic"],
      desc: "World's longest marine drive with endless ocean surf on one side and green jungle hills on the other."
    },
    {
      id: "inani_coral",
      name: "Inani Coral Beach & Sea Glass Walk",
      costPerPerson: 0,
      duration: "2-3 Hours",
      vibe: ["relaxing", "romantic", "family"],
      desc: "Walk among ancient golden-black coral stones exposed at low tide, free from coastal noise."
    },
    {
      id: "parasailing",
      name: "Beachfront Ocean Parasailing",
      costPerPerson: 1500,
      duration: "1 Hour",
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
      name: "Himchari National Park Viewpoint (waterfall in monsoon only)",
      costPerPerson: 50,
      duration: "2 Hours",
      vibe: ["relaxing", "family", "adventure"],
      desc: "Climb the hilltop stairs for an aerial panorama of the infinite coastline and visit seasonal cascades."
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

  // Daily hire for sightseeing. The planner's only fare table for this; capacities from VEHICLE_GLOSSARY text (CNG 3-4, chander gari 10-14, lower bound used).
  // shortcut: daily rates are planner estimates without source/asOf; move to data.js TRANSPORT_DATA with a source when the data role adds daily-hire fares.
  vehicles: [
    { key: "cng", name: "Reserved CNG", capacity: 3, dailyBDT: 1000 },
    { key: "chander_gari", name: "Chander Gari (open jeep)", capacity: 10, dailyBDT: 2200 }
  ],

  transitFares: [
    {
      routeBN: "কলাতলী / শহর ➔ ইনানী বিচ (মেরিন ড্রাইভ)",
      route: "Town Central ➔ Inani Beach",
      vehicle: "CNG Reserve",
      fairFareBDT: "৳৫০০ – ৳৬০০",
      scamAlert: "Scammers ask ৳১,০০০+. Stand firm on ৳৫০০-৳৬০০."
    },
    {
      routeBN: "কলাতলী / শহর ➔ হিমছড়ি জাতীয় উদ্যান",
      route: "Town Central ➔ Himchari",
      vehicle: "CNG Reserve",
      fairFareBDT: "৳৩০০ – ৳৩৫০",
      scamAlert: "Shared Tomtom is only ৳৪০-৳৫০ per seat."
    },
    {
      routeBN: "কলাতলী ➔ ৬নং ঘাট (মহেশখালী স্পিডবোট ঘাট)",
      route: "Kolatoli ➔ 6-No. Ghat (Moheshkhali)",
      vehicle: "Tomtom Reserve",
      fairFareBDT: "৳৮০ – ৳১০০",
      scamAlert: "Shared Tomtom is ৳২০ per person."
    },
    {
      routeBN: "৬নং ঘাট ➔ মহেশখালী দ্বীপ",
      route: "6-No. Ghat ➔ Moheshkhali",
      vehicle: "Speedboat (Per Seat)",
      fairFareBDT: "৳১০০ – ৳১২০",
      scamAlert: "Govt fixed rate with life jacket included."
    }
  ]
};

// ============================================================================
// 2. WHATSAPP CONCIERGE LEADGEN CONSTRUCTOR
// ============================================================================
// Returns null when SITE_CONTACT.whatsapp is not set, so the caller hides the button.
function buildWhatsAppPlannerPayload(state) {
  const number = typeof SITE_CONTACT !== 'undefined' && SITE_CONTACT && SITE_CONTACT.whatsapp
    ? String(SITE_CONTACT.whatsapp).replace(/\D/g, '') : '';
  if (!number) return null;
  const days = state.days || 3;
  const nights = Math.max(1, days - 1);
  const adults = state.adults || 2;
  const children = state.kids || 0;
  const vibe = state.vibe || "relaxing";
  const budgetTier = state.budgetTier || "comfort";
  const hotelName = state.selectedHotel?.name || "Recommended Hotel";
  const totalBDT = state.calculatedBudget?.totalBDT || "18500";
  const travelerName = state.travelerName || "My Coastal Journey";

  let message = `*🌊 Visit Cox — 60-Second Trip Inquiry*\n\n`;
  message += `Hello! I planned this trip on the Visit Cox planner and would like to check hotel availability and rates.\n\n`;
  message += `📋 *Trip Summary:*\n`;
  message += `• *Trip Name:* ${travelerName}\n`;
  message += `• *Duration:* ${days} Days / ${nights} Nights\n`;
  message += `• *Travelers:* ${adults} Adults${children > 0 ? `, ${children} Children` : ""}\n`;
  message += `• *Style:* ${vibe.toUpperCase()} (${budgetTier.toUpperCase()} Tier)\n`;
  message += `• *Selected Hotel:* ${hotelName}\n`;
  message += `• *Estimated Budget:* ৳${Number(totalBDT).toLocaleString('en-IN')} BDT\n\n`;
  
  if (state.selectedActivities && state.selectedActivities.length > 0) {
    message += `🎯 *Requested Activities:*\n`;
    state.selectedActivities.forEach(act => {
      const a = PLANNER_CATALOG.activities.find(x => x.id === act);
      message += `• ${a ? a.name : act}\n`;
    });
    message += `\n`;
  }

  message += `Please confirm room availability, rates and transport. Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// ============================================================================
// 3. REACTIVE PLANNER APP ENGINE
// ============================================================================
const PlannerApp = (function () {
  function defaultState() {
    return {
      wizardStep: 1, // 1: Who & Days, 2: Archetype & Thrills, 3: Stay & Budget
      days: 3,
      adults: 2,
      kids: 0,
      selectedArchetype: "quiet_coral",
      vibe: "relaxing",
      budgetTier: "comfort",
      baseHub: "any",
      hotelType: "auto",
      travelerName: "My Coastal Journey",
      selectedActivities: ["marine_drive", "inani_coral", "himchari_hill"],
      hotelIndex: 0,
      diningIndex: 0,
      exchangeRate: 120,
      seasonMultiplier: 1.0
    };
  }
  const state = defaultState();

  const TIERS = ["backpacker", "comfort", "luxury"];
  const VIBES = ["relaxing", "adventure", "romantic", "family", "foodie", "culture"];
  // Same clamps for the steppers and for URL params; non-numbers fall back to the current value.
  function clampInt(v, min, max, fallback) {
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : fallback;
  }
  const clampDays = (v, fb) => clampInt(v, 1, 14, fb);
  const clampAdults = (v, fb) => clampInt(v, 1, 20, fb);
  const clampKids = (v, fb) => clampInt(v, 0, 10, fb);

  function applyArchetype(s, arcId) {
    const arc = PLANNER_CATALOG.archetypes.find(a => a.id === arcId);
    if (!arc) return;
    s.selectedArchetype = arcId;
    s.vibe = arc.vibe;
    if (arc.preferredHub) s.baseHub = arc.preferredHub;
    if (arc.hotelType) s.hotelType = arc.hotelType;
    if (arc.defaultActivities) s.selectedActivities = [...arc.defaultActivities];
  }

  // params: URLSearchParams. Unknown or malformed values are ignored.
  function applyParams(s, params) {
    if (params.has("arc")) applyArchetype(s, params.get("arc"));
    if (params.has("days")) s.days = clampDays(params.get("days"), s.days);
    const adults = params.has("adults") ? params.get("adults") : params.get("pax");
    if (adults !== null) s.adults = clampAdults(adults, s.adults);
    if (params.has("kids")) s.kids = clampKids(params.get("kids"), s.kids);
    if (TIERS.includes(params.get("tier"))) s.budgetTier = params.get("tier");
    if (VIBES.includes(params.get("vibe"))) s.vibe = params.get("vibe");
  }

  // Kids count as half a bed.
  function calculateRooms(adults, kids) {
    return Math.max(1, Math.ceil((adults + kids * 0.5) / 2));
  }

  // Cheapest fleet of one vehicle type that seats everyone: ceil(pax / capacity) vehicles.
  function calculateTransit(days, totalPax) {
    const pax = Math.max(1, totalPax);
    const best = PLANNER_CATALOG.vehicles
      .map(v => ({ v, count: Math.ceil(pax / v.capacity) }))
      .reduce((a, b) => (b.count * b.v.dailyBDT < a.count * a.v.dailyBDT ? b : a));
    const vehicle = best.count > 1 ? `${best.count} × ${best.v.name}` : best.v.name;
    const totalTransit = best.count * best.v.dailyBDT * days + 600;
    return { vehicle, vehicles: best.count, totalTransit };
  }

  function computeBudget(s) {
    const nights = Math.max(1, s.days - 1);
    const rooms = calculateRooms(s.adults, s.kids);
    const totalGuests = s.adults + s.kids;
    const effectiveMealGuests = s.adults + (s.kids * 0.6);

    const hotel = getActiveHotel(s);
    const hotelNightly = (hotel ? hotel.rateBDT : 3500) * s.seasonMultiplier;
    const totalHotel = hotelNightly * nights * rooms;

    const dining = getActiveDining(s);
    const dailyMealRate = dining ? dining.costPerPerson : 800;
    const totalFood = dailyMealRate * s.days * effectiveMealGuests;

    const transitInfo = calculateTransit(s.days, totalGuests);
    const totalTransit = transitInfo.totalTransit;

    let totalActivities = 0;
    PLANNER_CATALOG.activities.forEach(act => {
      if (s.selectedActivities.includes(act.id)) {
        totalActivities += (act.costPerPerson * s.adults) + (act.costPerPerson * s.kids * 0.8);
      }
    });

    const subtotal = totalHotel + totalFood + totalTransit + totalActivities;
    const buffer = Math.round(subtotal * 0.10);
    const totalBDT = Math.round((subtotal + buffer) / 50) * 50;
    const totalUSD = Math.round(totalBDT / s.exchangeRate);

    const perPersonBDT = Math.round(totalBDT / Math.max(1, totalGuests));
    const perPersonUSD = Math.round(perPersonBDT / s.exchangeRate);

    return {
      totalBDT,
      totalUSD,
      perPersonBDT,
      perPersonUSD,
      totalHotel: Math.round(totalHotel),
      totalFood: Math.round(totalFood),
      totalTransit: Math.round(totalTransit),
      totalActivities: Math.round(totalActivities),
      buffer,
      rooms,
      vehicle: transitInfo.vehicle,
      vehicles: transitInfo.vehicles
    };
  }

  function getFilteredHotels(s) {
    let list = PLANNER_CATALOG.hotels;

    if (s.hotelType === "5star") {
      list = list.filter(h => h.stars >= 5);
    } else if (s.hotelType === "34star") {
      list = list.filter(h => h.stars >= 3 && h.stars <= 4);
    } else if (s.hotelType === "eco") {
      list = list.filter(h => h.id.includes("mermaid") || h.name.toLowerCase().includes("eco"));
    } else if (s.hotelType === "budget") {
      list = list.filter(h => h.tier === "backpacker");
    } else {
      list = list.filter(h => h.tier === s.budgetTier);
    }

    if (s.baseHub !== "any") {
      const hubList = list.filter(h => h.hub === s.baseHub);
      if (hubList.length > 0) list = hubList;
    }

    return list.length > 0 ? list : PLANNER_CATALOG.hotels;
  }

  function getActiveHotel(s) {
    const list = getFilteredHotels(s);
    return list[s.hotelIndex % list.length];
  }

  function getFilteredDining(s) {
    let list = PLANNER_CATALOG.dining.filter(d => d.tier === s.budgetTier);
    return list.length > 0 ? list : PLANNER_CATALOG.dining;
  }

  function getActiveDining(s) {
    const list = getFilteredDining(s);
    return list[s.diningIndex % list.length];
  }

  // Pure: what the planner shows for itinerary.html?<query>. Used by quickpick.js.
  function estimate(query) {
    const s = defaultState();
    applyParams(s, new URLSearchParams(query));
    return { budget: computeBudget(s), hotel: getActiveHotel(s), days: s.days, adults: s.adults, kids: s.kids };
  }

  // TIDE & SUNSET INTELLIGENT TIMING SCHEDULE
  function generateSchedule() {
    const days = state.days;
    const schedule = [];

    const dayBlueprints = [
      {
        dayNum: 1,
        title: "Coastal Arrival & Sugandha Sunset Fish BBQ",
        theme: "Arrival, Oceanfront Check-in & Evening Food Stalls",
        items: [
          { 
            time: "09:00 AM", 
            act: "Arrival in Cox's Bazar & Smooth Hotel Check-in", 
            tip: "Relax and unpack with refreshing green coconut.",
            badge: "🌅 Fresh Arrival"
          },
          { 
            time: "01:00 PM", 
            act: "Seafood Lunch Feast at Poushee / Local Dhaba", 
            tip: "Try legendary crispy Loitta fry and 10 types of shutki bhorta.",
            badge: "🍤 Authentic Taste"
          },
          { 
            time: "04:30 PM", 
            act: "Sugandha Beach Golden Hour Walk & Sunset", 
            tip: "Rent beach sunbed chairs (৳৫০/hr) and enjoy the crimson sunset.",
            badge: "🌅 Sunset"
          },
          { 
            time: "07:30 PM", 
            act: "Sugandha Live Fish BBQ Dinner", 
            tip: "Pick live Rupchanda or Coral fish grilled over open charcoal embers.",
            badge: "🎣 Fresh Evening Catch"
          }
        ]
      },
      {
        dayNum: 2,
        title: "Scenic Marine Drive, Himchari & Inani Coral Safari",
        theme: "The 80km Coastal Highway, Hills Meet Sea & Coral Reefs",
        items: [
          { 
            time: "08:30 AM", 
            act: "Open Chander Gari / CNG Ride down Scenic Marine Drive", 
            tip: "The world's longest marine drive highway. Endless ocean surf on right, jungle on left.",
            badge: "🚗 80km Coastal Highway"
          },
          { 
            time: "10:00 AM", 
            act: "Himchari National Park Viewpoint (waterfall in monsoon only)", 
            tip: "Climb the hill stairs for an infinite aerial vista of the coastline.",
            badge: "🌿 Hill meets Sea"
          },
          { 
            time: "01:00 PM", 
            act: "Inani Coral Beach Exploration & Beachfront Lunch", 
            tip: "Walk among ancient golden-black coral stones at low tide. Great photo spot!",
            badge: "🪨 Best at low tide"
          },
          { 
            time: "04:00 PM", 
            act: "Darianagar Sea Waves & Beachfront Parasailing", 
            tip: "Tandem flights 300 feet above the Bay of Bengal for adrenaline seekers.",
            badge: "🪂 High Adrenaline"
          },
          { 
            time: "06:30 PM", 
            act: "Twilight Refreshments at Mermaid Beach Cafe", 
            tip: "Fresh tender coconuts, wood-fired seafood pizza, and quiet ocean breeze.",
            badge: "☕ Twilight Cafe"
          }
        ]
      },
      {
        dayNum: 3,
        title: "Offshore Island Cruise or Heritage Pagodas",
        theme: "Moheshkhali Speedboat Expedition & Rakhine Markets",
        items: [
          { 
            time: "08:30 AM", 
            act: "Tomtom to 6-No. Ghat & Speedboat Crossing (৳১০০-১২০)", 
            tip: "Exciting 15-minute speed crossing with safety life-jackets.",
            badge: "🚤 Calm Morning Sea"
          },
          { 
            time: "10:00 AM", 
            act: "Adinath Ancient Hilltop Temple & Golden Pagoda", 
            tip: "Centuries-old historic shrine with panoramic mangrove channel views.",
            badge: "🏛️ Ancient Heritage"
          },
          { 
            time: "01:30 PM", 
            act: "Return to Town & Traditional Bengali Lunch", 
            tip: "Savor fresh pomfret curry and steaming hot rice.",
            badge: "🍤 Coastal Feast"
          },
          { 
            time: "04:30 PM", 
            act: "Barmis (Burmese) Market Souvenir Shopping", 
            tip: "Handloom Rakhine fabrics, dry fish (shutki), pearls, and handmade pickles.",
            badge: "🛍️ Local Handloom"
          }
        ]
      },
      {
        dayNum: 4,
        title: "Patuartek Secret Coral Point & Rubber Garden Safari",
        theme: "Hidden Gems & Cultural Hinterland",
        items: [
          { time: "09:00 AM", act: "Southern Marine Drive Drive to Patuartek Beach", tip: "Untouched rocky shoreline with dramatic turquoise waves.", badge: "🌊 Secret Beach" },
          { time: "01:00 PM", act: "Fresh Coconut & Coastal Lunch at Inani", tip: "Relax under swaying betel nut and casuarina palm groves.", badge: "🥥 Palm Groves" },
          { time: "03:30 PM", act: "Ramu 100-Foot Reclining Buddha & Ancient Pagodas", tip: "Discover the peaceful Buddhist heritage of the region.", badge: "🏛️ Golden Vihara" }
        ]
      },
      {
        dayNum: 5,
        title: "Radiant Fish World Aquarium & Farewell Sunset",
        theme: "Marine Life Wonder & Relaxed Departure",
        items: [
          { time: "09:30 AM", act: "Radiant Fish World Marine Tunnel Aquarium", tip: "Explore 100+ species of aquatic creatures in international glass tunnels.", badge: "🐠 Marine Life" },
          { time: "12:30 PM", act: "Farewell Feast at Jhaubon Restaurant", tip: "Last savoring of authentic Cox's Bazar seafood delicacies.", badge: "🍤 Farewell Lunch" },
          { time: "03:30 PM", act: "Final Sunset Stroll at Laboni Beach", tip: "Pick up shell crafts and take memorable group portraits before departure.", badge: "🌅 Farewell Sunset" }
        ]
      }
    ];

    for (let i = 0; i < days; i++) {
      if (dayBlueprints[i]) {
        schedule.push(dayBlueprints[i]);
      } else {
        schedule.push({
          dayNum: i + 1,
          title: `Day ${i + 1}: Custom Coastal Exploration & Leisure`,
          theme: "Relaxed Beach Time, Local Crafts & Fresh Coastal Feasts",
          items: [
            { time: "09:00 AM", act: "Morning Beach Jog & Sunrise Swim", tip: "Gentle morning waves at Dolphin / Sugandha point.", badge: "🌊 Morning Waves" },
            { time: "01:00 PM", act: "Local Flavor Tasting & Seafood Lunch", tip: "Explore hidden food alleys near Main Road.", badge: "🍤 Local Flavors" },
            { time: "05:00 PM", act: "Sunset Photography & Souvenir Shopping", tip: "Capture breathtaking sunset hues.", badge: "🌅 Sunset Glow" }
          ]
        });
      }
    }

    return schedule;
  }

  function renderAll() {
    const budget = computeBudget(state);
    const hotel = getActiveHotel(state);
    const dining = getActiveDining(state);
    const schedule = generateSchedule();

    state.calculatedBudget = budget;
    state.selectedHotel = hotel;

    const daysLabel = document.getElementById("param-days-label");
    if (daysLabel) daysLabel.textContent = `${state.days} Days (${state.days === 2 ? 'Weekend' : state.days === 3 ? 'Classic' : 'Extended'})`;

    const travelersLabel = document.getElementById("param-travelers-label");
    if (travelersLabel) travelersLabel.textContent = `${state.adults} Adults${state.kids > 0 ? `, ${state.kids} Kids` : ''}`;

    const customDaysVal = document.getElementById("planner-custom-days-val");
    if (customDaysVal) customDaysVal.textContent = state.days;

    const adultsVal = document.getElementById("planner-adults-val");
    if (adultsVal) adultsVal.textContent = state.adults;

    const kidsVal = document.getElementById("planner-kids-val");
    if (kidsVal) kidsVal.textContent = state.kids;

    const roomsCount = document.getElementById("planner-rooms-count");
    if (roomsCount) roomsCount.textContent = `${budget.rooms} ${budget.rooms === 1 ? 'Room' : 'Rooms'}`;

    const vehicleTag = document.getElementById("planner-vehicle-tag");
    if (vehicleTag) vehicleTag.textContent = budget.vehicle;

    document.querySelectorAll(".planner-duration-btn").forEach(btn => {
      const d = parseInt(btn.dataset.days);
      if (d === state.days) {
        btn.className = "planner-duration-btn py-2 px-3 rounded-xl text-xs font-semibold border border-charcoal bg-charcoal text-white transition text-center";
      } else {
        btn.className = "planner-duration-btn py-2 px-3 rounded-xl text-xs font-semibold border border-stone-200 hover:border-charcoal transition text-center";
      }
    });

    document.querySelectorAll(".planner-budget-btn").forEach(btn => {
      const t = btn.dataset.tier;
      if (t === state.budgetTier) {
        btn.className = "planner-budget-btn p-2 rounded-xl border border-charcoal bg-charcoal text-white text-center transition";
      } else {
        btn.className = "planner-budget-btn p-2 rounded-xl border border-stone-200 hover:border-charcoal text-center transition";
      }
    });

    document.querySelectorAll(".planner-vibe-btn").forEach(btn => {
      const v = btn.dataset.vibe;
      if (v === state.vibe) {
        btn.className = "planner-vibe-btn p-3 rounded-2xl border border-charcoal bg-charcoal text-white text-left transition";
      } else {
        btn.className = "planner-vibe-btn p-3 rounded-2xl border border-stone-200 hover:border-charcoal text-left transition";
      }
    });

    const totalDisp = document.getElementById("budget-display-total");
    if (totalDisp) totalDisp.textContent = `৳${budget.totalBDT.toLocaleString('en-IN')} BDT`;

    const usdDisp = document.getElementById("budget-display-usd");
    if (usdDisp) usdDisp.textContent = `(~$${budget.totalUSD} USD)`;

    const ppDisp = document.getElementById("budget-display-per-person");
    if (ppDisp) ppDisp.textContent = `৳${budget.perPersonBDT.toLocaleString('en-IN')}`;

    const durationTag = document.getElementById("budget-display-duration-tag");
    if (durationTag) durationTag.textContent = `${state.days} Days / ${Math.max(1, state.days - 1)} Nights`;

    const partyTag = document.getElementById("budget-display-party-tag");
    if (partyTag) partyTag.textContent = `${state.adults + state.kids} ${state.adults + state.kids === 1 ? "Guest" : "Guests"}`;

    const costHotel = document.getElementById("item-cost-hotel");
    if (costHotel) costHotel.textContent = `৳${budget.totalHotel.toLocaleString('en-IN')}`;

    const costFood = document.getElementById("item-cost-food");
    if (costFood) costFood.textContent = `৳${budget.totalFood.toLocaleString('en-IN')}`;

    const costTransit = document.getElementById("item-cost-transit");
    if (costTransit) costTransit.textContent = `৳${budget.totalTransit.toLocaleString('en-IN')}`;

    const costAct = document.getElementById("item-cost-activities");
    if (costAct) costAct.textContent = `৳${budget.totalActivities.toLocaleString('en-IN')}`;

    if (hotel) {
      const hName = document.getElementById("rec-hotel-name");
      if (hName) hName.textContent = hotel.name;

      const hLoc = document.getElementById("rec-hotel-location");
      if (hLoc) hLoc.textContent = `${hotel.location} • ${'★'.repeat(hotel.stars)}`;

      const hWhy = document.getElementById("rec-hotel-why");
      if (hWhy) hWhy.textContent = hotel.why;

      const hPrice = document.getElementById("rec-hotel-price");
      if (hPrice) hPrice.textContent = `৳${hotel.rateBDT.toLocaleString('en-IN')} / night`;

      const hTier = document.getElementById("rec-hotel-tier-badge");
      if (hTier) hTier.textContent = `${hotel.tier.toUpperCase()} TIER`;
    }

    if (dining) {
      const dName = document.getElementById("rec-dining-name");
      if (dName) dName.textContent = dining.name;

      const dSpots = document.getElementById("rec-dining-spots");
      if (dSpots) dSpots.textContent = `${dining.location} • ${dining.cuisine}`;

      const dWhy = document.getElementById("rec-dining-why");
      if (dWhy) dWhy.textContent = dining.why;

      const dPrice = document.getElementById("rec-dining-price");
      if (dPrice) dPrice.textContent = `৳${dining.costPerPerson.toLocaleString('en-IN')} / person / day`;
    }

    renderEmergencyLines("footer-emergency");
    renderEmergencyLines("driver-card-emergency", "bn");
    renderDailyTimeline(schedule);
    renderTransitTips();
    renderVisualPassCard(budget, hotel, schedule);
    renderPhoneLockScreenCard(budget, hotel, schedule);
    updateWhatsAppLink();
  }

  function renderDailyTimeline(schedule) {
    const container = document.getElementById("planner-daily-schedule");
    if (!container) return;

    container.innerHTML = schedule.map(day => `
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-2">
          <div class="flex items-center gap-3">
            <span class="w-9 h-9 rounded-2xl bg-charcoal text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              ${dayLabel(day.dayNum)}
            </span>
            <div>
              <h4 class="font-serif text-xl sm:text-2xl text-charcoal font-semibold">${plannerEsc(day.title)}</h4>
              <p class="text-xs font-mono text-terracotta-600 font-medium">${plannerEsc(day.theme)}</p>
            </div>
          </div>
          <span class="text-[11px] font-mono text-stone-400 bg-stone-50 px-3 py-1 rounded-full border border-stone-200 self-start sm:self-center">
            Day ${day.dayNum} of ${state.days}
          </span>
        </div>

        <div class="space-y-4">
          ${day.items.map(item => `
            <div class="flex items-start gap-4 p-3 rounded-2xl hover:bg-stone-50 transition border border-transparent hover:border-stone-200">
              <span class="text-xs font-mono font-bold text-charcoal bg-stone-100 px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                ${plannerEsc(item.time)}
              </span>
              <div class="space-y-1 flex-1">
                <div class="flex flex-wrap items-center justify-between gap-1">
                  <p class="text-xs sm:text-sm font-semibold text-charcoal">${plannerEsc(item.act)}</p>
                  ${item.badge ? `<span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">${plannerEsc(item.badge)}</span>` : ''}
                </div>
                <p class="text-[11px] text-stone-500 font-mono">${plannerEsc(item.tip)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  function renderTransitTips() {
    const container = document.getElementById("planner-transit-fare-rules");
    if (!container || !PLANNER_CATALOG.transitFares) return;

    container.innerHTML = PLANNER_CATALOG.transitFares.map((fare, i) => `
      <div class="bg-white/80 rounded-2xl p-3 border border-amber-200 space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] uppercase font-bold text-amber-900 block">${plannerEsc(fare.route)}</span>
          <button type="button" data-fare-index="${i}" class="text-[10px] font-bold text-terracotta-600 hover:underline">
            🛺 চালক কার্ড
          </button>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-stone-500 text-xs">${plannerEsc(fare.vehicle)}:</span>
          <span class="font-bold text-charcoal text-xs">${plannerEsc(fare.fairFareBDT)}</span>
        </div>
        <p class="text-[10px] text-amber-700 leading-tight pt-1">${plannerEsc(fare.scamAlert)}</p>
      </div>
    `).join('');
    if (!container.dataset.wired) {
      container.dataset.wired = "1";
      container.addEventListener("click", e => {
        const btn = e.target.closest && e.target.closest("[data-fare-index]");
        const fare = btn && PLANNER_CATALOG.transitFares[Number(btn.dataset.fareIndex)];
        if (fare) openDriverCard(fare.routeBN, fare.fairFareBDT, fare.vehicle);
      });
    }
  }

  function renderVisualPassCard(budget, hotel, schedule) {
    renderEmergencyLines("pass-emergency");
    const titleEl = document.getElementById("pass-title");
    if (titleEl) titleEl.textContent = state.travelerName || "My Coastal Journey";

    const datesEl = document.getElementById("pass-dates");
    if (datesEl) datesEl.textContent = `${state.days} Days / ${Math.max(1, state.days - 1)} Nights • ${state.adults + state.kids} Guests • ${state.budgetTier.toUpperCase()} Tier`;

    const budgetEl = document.getElementById("pass-budget");
    if (budgetEl) budgetEl.textContent = `৳${budget.totalBDT.toLocaleString('en-IN')} BDT`;

    const budgetUsdEl = document.getElementById("pass-budget-usd");
    if (budgetUsdEl) budgetUsdEl.textContent = `(~$${budget.totalUSD} USD)`;

    const baseEl = document.getElementById("pass-base");
    if (baseEl) baseEl.textContent = state.baseHub === 'inani' ? 'Inani Corridor' : state.baseHub === 'laboni' ? 'Laboni Point' : 'Kolatoli Hub';

    const hotelEl = document.getElementById("pass-hotel");
    if (hotelEl) hotelEl.textContent = hotel ? hotel.name : 'Ocean View';

    const transitEl = document.getElementById("pass-transit");
    if (transitEl) transitEl.textContent = budget.vehicle;

    const vibeEl = document.getElementById("pass-vibe");
    if (vibeEl) vibeEl.textContent = state.vibe.toUpperCase();

    const timelineEl = document.getElementById("pass-condensed-timeline");
    if (timelineEl) {
      timelineEl.innerHTML = schedule.map(day => `
        <div class="bg-stone-900/90 rounded-2xl p-3 border border-stone-800 flex items-center justify-between text-xs">
          <div class="flex items-center gap-3">
            <span class="font-mono text-terracotta-400 font-bold">DAY ${dayLabel(day.dayNum)}</span>
            <span class="text-stone-200 font-medium">${plannerEsc(day.title)}</span>
          </div>
          <span class="text-[10px] font-mono text-stone-400 hidden sm:inline-block">${plannerEsc(day.theme)}</span>
        </div>
      `).join('');
    }
  }

  const dayLabel = n => String(n).padStart(2, "0");

  // Emergency lines come only from EMERGENCY_CONTACTS in data.js. Entries still awaiting
  // owner confirmation are left off, because the passes are saved as images and outlive fixes.
  function renderEmergencyLines(id, forceLang) {
    const el = document.getElementById(id);
    if (!el) return;
    const list = typeof EMERGENCY_CONTACTS !== 'undefined' && Array.isArray(EMERGENCY_CONTACTS) ? EMERGENCY_CONTACTS : [];
    const lang = forceLang || (typeof AppState !== 'undefined' && AppState.lang === 'bn' ? 'bn' : 'en');
    el.innerHTML = list.filter(c => !c.needsOwnerConfirm).map(c => `
      <div class="flex items-center justify-between gap-3">
        <span>🚨 ${plannerEsc((c.name && (c.name[lang] || c.name.en)) || '')}</span>
        <a href="${/^tel:\+?\d+$/.test(c.tel) ? c.tel : '#'}" class="text-white font-bold">${plannerEsc(c.number)}</a>
      </div>`).join('');
  }

  // RENDER 9:16 PHONE LOCK-SCREEN STORY PASS
  function renderPhoneLockScreenCard(budget, hotel, schedule) {
    renderEmergencyLines("phone-pass-emergency");
    const pTitle = document.getElementById("phone-pass-title");
    if (pTitle) pTitle.textContent = state.travelerName || "My Coastal Journey";

    const pMeta = document.getElementById("phone-pass-meta");
    if (pMeta) pMeta.textContent = `${state.days} Days • ${state.adults + state.kids} Guests • ৳${budget.totalBDT.toLocaleString('en-IN')}`;

    const pHotel = document.getElementById("phone-pass-hotel");
    if (pHotel) pHotel.textContent = hotel ? hotel.name : "Seafront AC";

    const pTimeline = document.getElementById("phone-pass-timeline");
    if (pTimeline) {
      pTimeline.innerHTML = schedule.slice(0, 3).map(day => `
        <div class="bg-stone-800/80 rounded-xl p-2.5 border border-stone-700/60 text-left">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono font-bold text-terracotta-400 uppercase">Day ${dayLabel(day.dayNum)}</span>
            <span class="text-[9px] font-mono text-stone-400">${plannerEsc(day.theme.slice(0, 26))}...</span>
          </div>
          <p class="text-xs font-semibold text-white mt-0.5 truncate">${plannerEsc(day.title)}</p>
        </div>
      `).join('');
    }
  }

  function renderActivityCheckboxes() {
    const container = document.getElementById("planner-activities-checklist");
    if (!container || !PLANNER_CATALOG.activities) return;

    container.innerHTML = PLANNER_CATALOG.activities.map(act => {
      const isChecked = state.selectedActivities.includes(act.id);
      return `
        <label class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border ${isChecked ? 'border-charcoal bg-stone-100 text-charcoal' : 'border-stone-200 text-stone-600'} cursor-pointer hover:border-charcoal transition select-none">
          <input 
            type="checkbox" 
            value="${plannerEsc(act.id)}" 
            ${isChecked ? 'checked' : ''} 
            onchange="PlannerApp.toggleActivity(this.value)" 
            class="rounded text-charcoal focus:ring-0 cursor-pointer"
          />
          <span>${plannerEsc(act.name)}</span>
          ${act.costPerPerson > 0 ? `<span class="text-[10px] font-mono text-stone-400 font-normal">(+৳${act.costPerPerson})</span>` : ''}
        </label>
      `;
    }).join('');
  }

  function updateWhatsAppLink() {
    const btn = document.getElementById("btn-whatsapp-booking");
    if (!btn) return;
    const href = buildWhatsAppPlannerPayload(state);
    btn.hidden = !href;
    btn.classList.toggle("hidden", !href);
    if (href) btn.href = href;
  }

  // 60-SECOND WIZARD CONTROLS & ARCHETYPE SELECTION
  function selectArchetype(arcId) {
    applyArchetype(state, arcId);
    document.querySelectorAll(".archetype-card-btn").forEach(btn => {
      if (btn.dataset.arc === arcId) {
        btn.classList.add("border-charcoal", "bg-stone-50", "shadow-sm");
        btn.classList.remove("border-stone-200");
      } else {
        btn.classList.remove("border-charcoal", "bg-stone-50", "shadow-sm");
        btn.classList.add("border-stone-200");
      }
    });
    renderActivityCheckboxes();
    renderAll();
  }

  function setWizardStep(step) {
    state.wizardStep = Math.max(1, Math.min(3, step));
    for (let s = 1; s <= 3; s++) {
      const stepEl = document.getElementById(`wizard-step-pane-${s}`);
      const navEl = document.getElementById(`wizard-nav-${s}`);
      if (stepEl) {
        if (s === state.wizardStep) {
          stepEl.classList.remove("hidden");
        } else {
          stepEl.classList.add("hidden");
        }
      }
      if (navEl) {
        if (s === state.wizardStep) {
          navEl.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-charcoal text-white";
        } else {
          navEl.className = "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-500 hover:text-charcoal";
        }
      }
    }
  }

  // DRIVER ANTI-SCAM MODAL FLASH-CARD
  function openDriverCard(routeBN, fareBDT, vehicle) {
    const modal = document.getElementById("driver-anti-scam-modal");
    if (!modal) return;
    document.getElementById("driver-card-route").textContent = routeBN;
    document.getElementById("driver-card-fare").textContent = fareBDT;
    document.getElementById("driver-card-vehicle").textContent = vehicle;
    modal.classList.remove("hidden");
  }

  function closeDriverCard() {
    const modal = document.getElementById("driver-anti-scam-modal");
    if (modal) modal.classList.add("hidden");
  }

  // IMAGE EXPORTERS
  function offerPrint(reason) {
    if (typeof confirm === 'function' && confirm(reason + " Print this page (or save it as PDF) instead?")) window.print();
  }

  function exportCard(cardId, btnId, busyText, background, fileName) {
    const card = document.getElementById(cardId);
    if (!card) return;
    if (typeof html2canvas === 'undefined') {
      offerPrint("The image export library did not load (offline or blocked).");
      return;
    }
    const exportBtn = document.getElementById(btnId);
    const originalText = exportBtn ? exportBtn.innerHTML : "";
    if (exportBtn) exportBtn.textContent = busyText;
    const restore = () => { if (exportBtn) exportBtn.innerHTML = originalText; };

    html2canvas(card, {
      scale: 2,
      useCORS: true,
      backgroundColor: background,
      logging: false,
      // html2canvas cuts descenders on tight line-heights and overflow:hidden text; loosen them in the clone only.
      onclone: doc => {
        const style = doc.createElement("style");
        // It also cannot blur, so the glow blobs would print as solid circles.
        style.textContent = `#${cardId} h2, #${cardId} h3, #${cardId} p, #${cardId} span { line-height: 1.45 !important; padding-bottom: 2px; }
          #${cardId} .truncate { padding-bottom: 0.35em !important; line-height: 1.5 !important; }
          #${cardId} .blur-3xl { display: none !important; }`;
        doc.head.appendChild(style);
      }
    }).then(canvas => {
      const link = document.createElement("a");
      link.download = fileName;
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      restore();
    }).catch(err => {
      console.error("Pass export error:", err);
      restore();
      offerPrint("The image export failed.");
    });
  }

  function safeName(fallback) {
    return (state.travelerName || fallback).replace(/[^a-zA-Z0-9_-]/g, "_");
  }

  function downloadVisualPass() {
    exportCard("visual-pass-export-card", "btn-download-pass", "Generating pass...", "#111827",
      `${safeName("Visit-Cox-Itinerary")}-${state.days}-Days-Pass.png`);
  }

  function downloadPhonePass() {
    exportCard("phone-lockscreen-pass-card", "btn-download-phone-pass", "Generating wallpaper...", "#0B2135",
      `${safeName("Visit-Cox")}-Phone-LockScreen-9-16.png`);
  }

  // URL PARAMETER PARSER (CONNECTS INDEX.HTML QUICK-PICK TO ITINERARY.HTML)
  function parseURLParams() {
    if (typeof window === 'undefined' || !window.location.search) return;
    applyParams(state, new URLSearchParams(window.location.search));
  }

  return {
    init: function () {
      parseURLParams();
      renderActivityCheckboxes();
      renderAll();
      setWizardStep(1);
    },
    setWizardStep: setWizardStep,
    selectArchetype: selectArchetype,
    openDriverCard: openDriverCard,
    closeDriverCard: closeDriverCard,
    setDays: function (d) {
      state.days = clampDays(d, state.days);
      renderAll();
    },
    stepDays: function (delta) {
      state.days = clampDays(state.days + delta, state.days);
      renderAll();
    },
    stepAdults: function (delta) {
      state.adults = clampAdults(state.adults + delta, state.adults);
      renderAll();
    },
    stepKids: function (delta) {
      state.kids = clampKids(state.kids + delta, state.kids);
      renderAll();
    },
    setBudgetTier: function (tier) {
      state.budgetTier = tier;
      state.hotelIndex = 0;
      state.diningIndex = 0;
      renderAll();
    },
    setVibe: function (vibe) {
      state.vibe = vibe;
      renderAll();
    },
    setBaseHub: function (hub) {
      state.baseHub = hub;
      state.hotelIndex = 0;
      renderAll();
    },
    setHotelType: function (type) {
      state.hotelType = type;
      state.hotelIndex = 0;
      renderAll();
    },
    setTravelerName: function (name) {
      state.travelerName = name;
      updateWhatsAppLink();
      const titleEl = document.getElementById("pass-title");
      if (titleEl) titleEl.textContent = name || "My Coastal Journey";
    },
    toggleActivity: function (actId) {
      const idx = state.selectedActivities.indexOf(actId);
      if (idx > -1) {
        state.selectedActivities.splice(idx, 1);
      } else {
        state.selectedActivities.push(actId);
      }
      renderActivityCheckboxes();
      renderAll();
    },
    cycleAlternativeHotel: function () {
      state.hotelIndex++;
      renderAll();
    },
    cycleAlternativeDining: function () {
      state.diningIndex++;
      renderAll();
    },
    downloadVisualPass: downloadVisualPass,
    downloadPhonePass: downloadPhonePass,
    estimate: estimate,
    getState: function () {
      return Object.assign({}, state);
    }
  };
})();

if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("make-my-planner-app") || document.getElementById("sixty-sec-wizard-card")) {
      PlannerApp.init();
    }
  });
}
