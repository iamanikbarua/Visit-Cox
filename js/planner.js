/**
 * Visit Cox — "Make My Planner" & 60-Second Trip Matchmaker Master Engine
 * Combines Catalog Schemas, WhatsApp Leadgen, Reactive Budget Speedometer,
 * Driver Anti-Scam Flash-Card, Tide/Sunset Timing, and Dual-Format Pass Exporters.
 * Verified by 6-Agent Collaboration Team.
 */

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
      name: "Himchari National Park Viewpoint & Waterfall",
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
function buildWhatsAppPlannerPayload(state) {
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
  message += `Hello Concierge! I just matched my trip on *visitcox.com* and want to lock in verified hotel rates.\n\n`;
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
      message += `• ${act}\n`;
    });
    message += `\n`;
  }

  message += `Please confirm room availability and verified transit booking. Thank you!`;

  return `https://wa.me/8801819012345?text=${encodeURIComponent(message)}`;
}

// ============================================================================
// 3. REACTIVE PLANNER APP ENGINE
// ============================================================================
const PlannerApp = (function () {
  const state = {
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

  function calculateRooms(adults) {
    return Math.max(1, Math.ceil(adults / 2));
  }

  function calculateTransit(days, totalPax) {
    let vehicle = "Tomtom / CNG";
    let dailyBase = 800;

    if (totalPax <= 3) {
      vehicle = "CNG / Auto";
      dailyBase = 900;
    } else if (totalPax <= 5) {
      vehicle = "Reserved CNG";
      dailyBase = 1100;
    } else {
      vehicle = "Chander Gari (Open 4x4 Jeep)";
      dailyBase = 2200;
    }

    const totalTransit = (dailyBase * days) + 600;
    return { vehicle, totalTransit };
  }

  function computeBudget() {
    const nights = Math.max(1, state.days - 1);
    const rooms = calculateRooms(state.adults);
    const totalGuests = state.adults + state.kids;
    const effectiveMealGuests = state.adults + (state.kids * 0.6);

    const hotel = getActiveHotel();
    const hotelNightly = (hotel ? hotel.rateBDT : 3500) * state.seasonMultiplier;
    const totalHotel = hotelNightly * nights * rooms;

    const dining = getActiveDining();
    const dailyMealRate = dining ? dining.costPerPerson : 800;
    const totalFood = dailyMealRate * state.days * effectiveMealGuests;

    const transitInfo = calculateTransit(state.days, totalGuests);
    const totalTransit = transitInfo.totalTransit;

    let totalActivities = 0;
    if (PLANNER_CATALOG.activities) {
      PLANNER_CATALOG.activities.forEach(act => {
        if (state.selectedActivities.includes(act.id)) {
          totalActivities += (act.costPerPerson * state.adults) + (act.costPerPerson * state.kids * 0.8);
        }
      });
    }

    const subtotal = totalHotel + totalFood + totalTransit + totalActivities;
    const buffer = Math.round(subtotal * 0.10);
    const totalBDT = Math.round((subtotal + buffer) / 50) * 50;
    const totalUSD = Math.round(totalBDT / state.exchangeRate);

    const perPersonBDT = Math.round(totalBDT / Math.max(1, totalGuests));
    const perPersonUSD = Math.round(perPersonBDT / state.exchangeRate);

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
      vehicle: transitInfo.vehicle
    };
  }

  function getFilteredHotels() {
    let list = PLANNER_CATALOG.hotels;

    if (state.hotelType === "5star") {
      list = list.filter(h => h.stars >= 5);
    } else if (state.hotelType === "34star") {
      list = list.filter(h => h.stars >= 3 && h.stars <= 4);
    } else if (state.hotelType === "eco") {
      list = list.filter(h => h.id.includes("mermaid") || h.name.toLowerCase().includes("eco"));
    } else if (state.hotelType === "budget") {
      list = list.filter(h => h.tier === "backpacker");
    } else {
      list = list.filter(h => h.tier === state.budgetTier);
    }

    if (state.baseHub !== "any") {
      const hubList = list.filter(h => h.hub === state.baseHub);
      if (hubList.length > 0) list = hubList;
    }

    return list.length > 0 ? list : PLANNER_CATALOG.hotels;
  }

  function getActiveHotel() {
    const list = getFilteredHotels();
    return list[state.hotelIndex % list.length];
  }

  function getFilteredDining() {
    let list = PLANNER_CATALOG.dining.filter(d => d.tier === state.budgetTier);
    return list.length > 0 ? list : PLANNER_CATALOG.dining;
  }

  function getActiveDining() {
    const list = getFilteredDining();
    return list[state.diningIndex % list.length];
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
            badge: "🌅 Sunset Golden Hour (5:15 PM)"
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
            act: "Himchari National Park Viewpoint & Waterfall", 
            tip: "Climb the hill stairs for an infinite aerial vista of the coastline.",
            badge: "🌿 Hill meets Sea"
          },
          { 
            time: "01:00 PM", 
            act: "Inani Coral Beach Exploration & Beachfront Lunch", 
            tip: "Walk among ancient golden-black coral stones at low tide. Great photo spot!",
            badge: "🌊 Low Tide Window (Coral Exposed)"
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
    const budget = computeBudget();
    const hotel = getActiveHotel();
    const dining = getActiveDining();
    const schedule = generateSchedule();

    state.calculatedBudget = budget;
    state.selectedHotel = hotel;

    const daysLabel = document.getElementById("param-days-label");
    if (daysLabel) daysLabel.textContent = `${state.days} Days (${state.days === 2 ? 'Weekend' : state.days === 3 ? 'Classic' : 'Extended'})`;

    const travelersLabel = document.getElementById("param-travelers-label");
    if (travelersLabel) travelersLabel.textContent = `${state.adults} Adults${state.kids > 0 ? `, ${state.kids} Kids` : ''}`;

    const wizardDurationFeedback = document.getElementById("wizard-duration-feedback");
    if (wizardDurationFeedback) {
      wizardDurationFeedback.textContent = `${state.days} Days (${state.days === 2 ? 'Weekend Trip' : state.days === 3 ? 'Classic' : 'Extended'})`;
    }

    const wizardGroupFeedback = document.getElementById("wizard-group-feedback");
    if (wizardGroupFeedback) {
      wizardGroupFeedback.textContent = `${state.adults} Adults${state.kids > 0 ? `, ${state.kids} Kids` : ''}`;
    }

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

    // Wizard Duration Buttons (01 Duration)
    document.querySelectorAll(".wizard-duration-btn").forEach(btn => {
      const d = parseInt(btn.dataset.days);
      if (d === state.days) {
        btn.className = "wizard-duration-btn p-3 rounded-2xl border-2 border-charcoal bg-charcoal text-white text-center transition cursor-pointer shadow-sm";
      } else {
        btn.className = "wizard-duration-btn p-3 rounded-2xl border border-stone-200 hover:border-charcoal bg-stone-50 text-stone-700 text-center transition cursor-pointer";
      }
    });

    // Wizard Pax Buttons (01 Group)
    document.querySelectorAll(".wizard-pax-btn").forEach(btn => {
      const p = btn.dataset.pax;
      const isMatch = (p === 'solo' && state.adults === 1 && state.kids === 0) ||
                      (p === 'couple' && state.adults === 2 && state.kids === 0) ||
                      (p === 'family' && state.adults === 2 && state.kids === 2) ||
                      (p === 'friends' && state.adults >= 4);
      if (isMatch) {
        btn.className = "wizard-pax-btn p-3 rounded-2xl border-2 border-charcoal bg-charcoal text-white text-xs font-semibold transition cursor-pointer shadow-sm";
      } else {
        btn.className = "wizard-pax-btn p-3 rounded-2xl border border-stone-200 hover:border-charcoal bg-stone-50 text-stone-700 text-xs font-semibold transition cursor-pointer";
      }
    });

    // Wizard Tier Buttons (03 Stay)
    document.querySelectorAll(".wizard-tier-btn").forEach(btn => {
      const t = btn.dataset.tier;
      if (t === state.budgetTier) {
        btn.className = "wizard-tier-btn w-full p-4 rounded-2xl border-2 border-charcoal bg-stone-100 text-left transition flex items-center justify-between cursor-pointer shadow-sm";
      } else {
        btn.className = "wizard-tier-btn w-full p-4 rounded-2xl border border-stone-200 hover:border-charcoal bg-white text-left transition flex items-center justify-between cursor-pointer";
      }
    });

    // Archetype Card Buttons (02 Vibe)
    document.querySelectorAll(".archetype-card-btn").forEach(btn => {
      if (btn.dataset.arc === state.selectedArchetype) {
        btn.className = "archetype-card-btn p-5 rounded-2xl border-2 border-charcoal bg-stone-50 text-left transition flex flex-col justify-between cursor-pointer group shadow-sm";
      } else {
        btn.className = "archetype-card-btn p-5 rounded-2xl border border-stone-200 hover:border-charcoal text-left transition flex flex-col justify-between cursor-pointer group";
      }
    });

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
    if (partyTag) partyTag.textContent = `${state.adults + state.kids} Guests`;

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
              0${day.dayNum}
            </span>
            <div>
              <h4 class="font-serif text-xl sm:text-2xl text-charcoal font-semibold">${day.title}</h4>
              <p class="text-xs font-mono text-terracotta-600 font-medium">${day.theme}</p>
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
                ${item.time}
              </span>
              <div class="space-y-1 flex-1">
                <div class="flex flex-wrap items-center justify-between gap-1">
                  <p class="text-xs sm:text-sm font-semibold text-charcoal">${item.act}</p>
                  ${item.badge ? `<span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">${item.badge}</span>` : ''}
                </div>
                <p class="text-[11px] text-stone-500 font-mono">${item.tip}</p>
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

    container.innerHTML = PLANNER_CATALOG.transitFares.map(fare => `
      <div class="bg-white/80 rounded-2xl p-3 border border-amber-200 space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] uppercase font-bold text-amber-900 block">${fare.route}</span>
          <button type="button" onclick="PlannerApp.openDriverCard('${fare.routeBN}', '${fare.fairFareBDT}', '${fare.vehicle}')" class="text-[10px] font-bold text-terracotta-600 hover:underline">
            🛺 চালক কার্ড
          </button>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-stone-500 text-xs">${fare.vehicle}:</span>
          <span class="font-bold text-charcoal text-xs">${fare.fairFareBDT}</span>
        </div>
        <p class="text-[10px] text-amber-700 leading-tight pt-1">${fare.scamAlert}</p>
      </div>
    `).join('');
  }

  function renderVisualPassCard(budget, hotel, schedule) {
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
            <span class="font-mono text-terracotta-400 font-bold">DAY 0${day.dayNum}</span>
            <span class="text-stone-200 font-medium">${day.title}</span>
          </div>
          <span class="text-[10px] font-mono text-stone-400 hidden sm:inline-block">${day.theme}</span>
        </div>
      `).join('');
    }
  }

  // RENDER 9:16 PHONE LOCK-SCREEN STORY PASS
  function renderPhoneLockScreenCard(budget, hotel, schedule) {
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
            <span class="text-[10px] font-mono font-bold text-terracotta-400 uppercase">Day 0${day.dayNum}</span>
            <span class="text-[9px] font-mono text-stone-400">${day.theme.slice(0, 26)}...</span>
          </div>
          <p class="text-xs font-semibold text-white mt-0.5 truncate">${day.title}</p>
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
            value="${act.id}" 
            ${isChecked ? 'checked' : ''} 
            onchange="PlannerApp.toggleActivity('${act.id}')" 
            class="rounded text-charcoal focus:ring-0 cursor-pointer"
          />
          <span>${act.name}</span>
          ${act.costPerPerson > 0 ? `<span class="text-[10px] font-mono text-stone-400 font-normal">(+৳${act.costPerPerson})</span>` : ''}
        </label>
      `;
    }).join('');
  }

  function updateWhatsAppLink() {
    const btn = document.getElementById("btn-whatsapp-booking");
    if (!btn) return;
    btn.href = buildWhatsAppPlannerPayload(state);
  }

  // 60-SECOND WIZARD CONTROLS & ARCHETYPE SELECTION
  function selectArchetype(arcId) {
    state.selectedArchetype = arcId;
    const arc = PLANNER_CATALOG.archetypes.find(a => a.id === arcId);
    if (arc) {
      state.vibe = arc.vibe;
      if (arc.preferredHub) state.baseHub = arc.preferredHub;
      if (arc.hotelType) state.hotelType = arc.hotelType;
      if (arc.defaultActivities) state.selectedActivities = [...arc.defaultActivities];
    }
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
  function downloadVisualPass() {
    const card = document.getElementById("visual-pass-export-card");
    if (!card) return;
    if (typeof html2canvas === 'undefined') {
      alert("Loading image export library... Please wait a second.");
      return;
    }
    const exportBtn = document.getElementById("btn-download-pass");
    const originalText = exportBtn ? exportBtn.innerHTML : "";
    if (exportBtn) exportBtn.innerHTML = "Generating Boarding Pass...";

    html2canvas(card, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#111827",
      logging: false,
      windowWidth: 1200,
      onclone: (clonedDoc) => {
        const el = clonedDoc.getElementById("visual-pass-export-card");
        if (el && el.parentElement) {
          el.parentElement.style.position = "static";
          el.parentElement.style.left = "auto";
          el.parentElement.style.top = "auto";
        }
      }
    }).then(canvas => {
      const imageURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeName = (state.travelerName || "Visit-Cox-Itinerary").replace(/[^a-zA-Z0-9_-]/g, "_");
      link.download = `${safeName}-${state.days}-Days-Pass.png`;
      link.href = imageURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (exportBtn) exportBtn.innerHTML = originalText;
    }).catch(err => {
      console.error("Pass export error:", err);
      if (exportBtn) exportBtn.innerHTML = originalText;
    });
  }

  function downloadPhonePass() {
    const card = document.getElementById("phone-lockscreen-pass-card");
    if (!card) return;
    if (typeof html2canvas === 'undefined') {
      alert("Loading image export library...");
      return;
    }
    const exportBtn = document.getElementById("btn-download-phone-pass");
    const originalText = exportBtn ? exportBtn.innerHTML : "";
    if (exportBtn) exportBtn.innerHTML = "Generating Phone Wallpaper...";

    html2canvas(card, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#0B2135",
      logging: false,
      windowWidth: 600,
      onclone: (clonedDoc) => {
        const el = clonedDoc.getElementById("phone-lockscreen-pass-card");
        if (el && el.parentElement) {
          el.parentElement.style.position = "static";
          el.parentElement.style.left = "auto";
          el.parentElement.style.top = "auto";
        }
      }
    }).then(canvas => {
      const imageURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeName = (state.travelerName || "Visit-Cox").replace(/[^a-zA-Z0-9_-]/g, "_");
      link.download = `${safeName}-Phone-LockScreen-9-16.png`;
      link.href = imageURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (exportBtn) exportBtn.innerHTML = originalText;
    }).catch(err => {
      console.error("Phone pass export error:", err);
      if (exportBtn) exportBtn.innerHTML = originalText;
    });
  }

  // URL PARAMETER PARSER (CONNECTS INDEX.HTML QUICK-PICK TO ITINERARY.HTML)
  function parseURLParams() {
    if (typeof window === 'undefined' || !window.location.search) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("days")) state.days = parseInt(params.get("days"), 10);
    if (params.get("vibe")) state.vibe = params.get("vibe");
    if (params.get("tier")) state.budgetTier = params.get("tier");
    if (params.get("pax")) state.adults = parseInt(params.get("pax"), 10);
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
      state.days = Math.max(1, Math.min(14, d));
      renderAll();
    },
    setPax: function (adults, kids) {
      state.adults = Math.max(1, adults);
      state.kids = Math.max(0, kids);
      renderAll();
    },
    stepDays: function (delta) {
      state.days = Math.max(1, Math.min(14, state.days + delta));
      renderAll();
    },
    stepAdults: function (delta) {
      state.adults = Math.max(1, Math.min(20, state.adults + delta));
      renderAll();
    },
    stepKids: function (delta) {
      state.kids = Math.max(0, Math.min(10, state.kids + delta));
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
