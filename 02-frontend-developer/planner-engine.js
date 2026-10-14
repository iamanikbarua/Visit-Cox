/**
 * 02-FRONTEND-DEVELOPER: Interactive Planner Calculation & Render Engine
 * Handles reactive state updates, recommendation matching, live budget calculations,
 * and high-resolution visual itinerary pass exporting.
 */

const PlannerApp = (function () {
  // 1. REACTIVE STATE
  const state = {
    days: 3,
    adults: 2,
    kids: 0,
    vibe: "relaxing",
    budgetTier: "comfort",
    baseHub: "any",
    hotelType: "auto",
    travelerName: "My Coastal Journey",
    selectedActivities: ["marine_drive", "inani_coral", "himchari_hill"],
    hotelIndex: 0,
    diningIndex: 0,
    currency: "BDT",
    exchangeRate: 120, // 1 USD = 120 BDT
    seasonMultiplier: 1.0 // 1.0 standard, 1.3 peak, 0.7 monsoon
  };

  // 2. HELPER: Number of Rooms
  function calculateRooms(adults) {
    return Math.max(1, Math.ceil(adults / 2));
  }

  // 3. HELPER: Transit Vehicle & Cost
  function calculateTransit(days, totalPax) {
    let vehicle = "Tomtom / CNG";
    let dailyBase = 800; // Average daily short commutes

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

    // Special corridor day (Marine drive to Inani/Himchari adds ~৳1200-1500)
    const totalTransit = (dailyBase * days) + 600;
    return { vehicle, totalTransit };
  }

  // 4. CORE BUDGET CALCULATION ALGORITHM
  function computeBudget() {
    const nights = Math.max(1, state.days - 1);
    const rooms = calculateRooms(state.adults);
    const totalGuests = state.adults + state.kids;
    const effectiveMealGuests = state.adults + (state.kids * 0.6); // kids consume ~60%

    // Get Active Hotel
    const hotel = getActiveHotel();
    const hotelNightly = (hotel ? hotel.rateBDT : 3500) * state.seasonMultiplier;
    const totalHotel = hotelNightly * nights * rooms;

    // Get Active Dining
    const dining = getActiveDining();
    const dailyMealRate = dining ? dining.costPerPerson : 800;
    const totalFood = dailyMealRate * state.days * effectiveMealGuests;

    // Transit
    const transitInfo = calculateTransit(state.days, totalGuests);
    const totalTransit = transitInfo.totalTransit;

    // Activities
    let totalActivities = 0;
    if (typeof PLANNER_CATALOG !== 'undefined' && PLANNER_CATALOG.activities) {
      PLANNER_CATALOG.activities.forEach(act => {
        if (state.selectedActivities.includes(act.id)) {
          totalActivities += (act.costPerPerson * state.adults) + (act.costPerPerson * state.kids * 0.8);
        }
      });
    }

    // Subtotal & 10% Contingency Buffer
    const subtotal = totalHotel + totalFood + totalTransit + totalActivities;
    const buffer = Math.round(subtotal * 0.10);
    const totalBDT = Math.round((subtotal + buffer) / 50) * 50; // round to nearest 50
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

  // 5. RECOMMENDATION MATCHERS
  function getFilteredHotels() {
    if (typeof PLANNER_CATALOG === 'undefined' || !PLANNER_CATALOG.hotels) return [];
    let list = PLANNER_CATALOG.hotels;

    // Filter by Hotel Type if explicitly selected
    if (state.hotelType === "5star") {
      list = list.filter(h => h.stars >= 5);
    } else if (state.hotelType === "34star") {
      list = list.filter(h => h.stars >= 3 && h.stars <= 4);
    } else if (state.hotelType === "eco") {
      list = list.filter(h => h.id.includes("mermaid") || h.name.toLowerCase().includes("eco"));
    } else if (state.hotelType === "budget") {
      list = list.filter(h => h.tier === "backpacker");
    } else {
      // Auto match by budget tier
      list = list.filter(h => h.tier === state.budgetTier);
    }

    // Filter by Base Hub if specified
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
    if (typeof PLANNER_CATALOG === 'undefined' || !PLANNER_CATALOG.dining) return [];
    let list = PLANNER_CATALOG.dining.filter(d => d.tier === state.budgetTier);
    return list.length > 0 ? list : PLANNER_CATALOG.dining;
  }

  function getActiveDining() {
    const list = getFilteredDining();
    return list[state.diningIndex % list.length];
  }

  // 6. DAY-BY-DAY SCHEDULE GENERATOR
  function generateSchedule() {
    const days = state.days;
    const schedule = [];

    // Master Route Template by Day
    const dayBlueprints = [
      {
        dayNum: 1,
        title: "Coastal Arrival & Sugandha Sunset Fish BBQ",
        theme: "Arrival, Oceanfront Check-in & Evening Food Stalls",
        items: [
          { time: "09:00 AM", act: "Arrival in Cox's Bazar & Smooth Hotel Check-in", tip: "Relax and unpack with refreshing green coconut." },
          { time: "01:00 PM", act: "Seafood Lunch Feast at Poushee / Local Dhaba", tip: "Try legendary crispy Loitta fry and 10 types of shutki bhorta." },
          { time: "04:30 PM", act: "Sugandha Beach Golden Hour Walk & Sunset", tip: "Rent beach sunbed chairs (৳৫০/hr) and enjoy the crimson sunset." },
          { time: "07:30 PM", act: "Sugandha Live Fish BBQ Dinner", tip: "Pick live Rupchanda or Coral fish grilled over open charcoal embers." }
        ]
      },
      {
        dayNum: 2,
        title: "Scenic Marine Drive, Himchari & Inani Coral Safari",
        theme: "The 80km Coastal Highway, Hills Meet Sea & Coral Reefs",
        items: [
          { time: "08:30 AM", act: "Open Chander Gari / CNG Ride down Scenic Marine Drive", tip: "The world's longest marine drive highway. Endless ocean surf on right, jungle on left." },
          { time: "10:00 AM", act: "Himchari National Park Viewpoint & Waterfall", tip: "Climb the hill stairs for an infinite aerial vista of the coastline." },
          { time: "01:00 PM", act: "Inani Coral Beach Exploration & Beachfront Lunch", tip: "Walk among ancient golden-black coral stones at low tide. Great photo spot!" },
          { time: "04:00 PM", act: "Darianagar Sea Waves & Beachfront Parasailing", tip: "Tandem flights 300 feet above the Bay of Bengal for adrenaline seekers." },
          { time: "06:30 PM", act: "Twilight Refreshments at Mermaid Beach Cafe", tip: "Fresh tender coconuts, wood-fired seafood pizza, and quiet ocean breeze." }
        ]
      },
      {
        dayNum: 3,
        title: "Offshore Island Cruise or Heritage Pagodas",
        theme: "Moheshkhali Speedboat Expedition & Rakhine Markets",
        items: [
          { time: "08:30 AM", act: "Tomtom to 6-No. Ghat & Speedboat Crossing (৳১০০-১২০)", tip: "Exciting 15-minute speed crossing with safety life-jackets." },
          { time: "10:00 AM", act: "Adinath Ancient Hilltop Temple & Golden Pagoda", tip: "Centuries-old historic shrine with panoramic mangrove channel views." },
          { time: "01:30 PM", act: "Return to Town & Traditional Bengali Lunch", tip: "Savor fresh pomfret curry and steaming hot rice." },
          { time: "04:30 PM", act: "Barmis (Burmese) Market Souvenir Shopping", tip: "Handloom Rakhine fabrics, dry fish (shutki), pearls, and handmade pickles." }
        ]
      },
      {
        dayNum: 4,
        title: "Patuartek Secret Coral Point & Rubber Garden Safari",
        theme: "Hidden Gems & Cultural Hinterland",
        items: [
          { time: "09:00 AM", act: "Southern Marine Drive Drive to Patuartek Beach", tip: "Untouched rocky shoreline with dramatic turquoise waves." },
          { time: "01:00 PM", act: "Fresh Coconut & Coastal Lunch at Inani", tip: "Relax under swaying betel nut and casuarina palm groves." },
          { time: "03:30 PM", act: "Ramu 100-Foot Reclining Buddha & Ancient Pagodas", tip: "Discover the peaceful Buddhist heritage of the region." }
        ]
      },
      {
        dayNum: 5,
        title: "Radiant Fish World Aquarium & Farewell Sunset",
        theme: "Marine Life Wonder & Relaxed Departure",
        items: [
          { time: "09:30 AM", act: "Radiant Fish World Marine Tunnel Aquarium", tip: "Explore 100+ species of aquatic creatures in international glass tunnels." },
          { time: "12:30 PM", act: "Farewell Feast at Jhaubon Restaurant", tip: "Last savoring of authentic Cox's Bazar seafood delicacies." },
          { time: "03:30 PM", act: "Final Sunset Stroll at Laboni Beach", tip: "Pick up shell crafts and take memorable group portraits before departure." }
        ]
      }
    ];

    for (let i = 0; i < days; i++) {
      if (dayBlueprints[i]) {
        schedule.push(dayBlueprints[i]);
      } else {
        // Fallback for custom days > 5
        schedule.push({
          dayNum: i + 1,
          title: `Day ${i + 1}: Custom Coastal Exploration & Leisure`,
          theme: "Relaxed Beach Time, Local Crafts & Fresh Coastal Feasts",
          items: [
            { time: "09:00 AM", act: "Morning Beach Jog & Sunrise Swim", tip: "Gentle morning waves at Dolphin / Sugandha point." },
            { time: "01:00 PM", act: "Local Flavor Tasting & Seafood Lunch", tip: "Explore hidden food alleys near Main Road." },
            { time: "05:00 PM", act: "Sunset Photography & Souvenir Shopping", tip: "Capture breathtaking sunset hues." }
          ]
        });
      }
    }

    return schedule;
  }

  // 7. RENDER FUNCTIONS
  function renderAll() {
    const budget = computeBudget();
    const hotel = getActiveHotel();
    const dining = getActiveDining();
    const schedule = generateSchedule();

    // Store calculated budget in state for leadgen
    state.calculatedBudget = budget;
    state.selectedHotel = hotel;

    // Update Header Labels
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

    // Update Duration Buttons Active State
    document.querySelectorAll(".planner-duration-btn").forEach(btn => {
      const d = parseInt(btn.dataset.days);
      if (d === state.days) {
        btn.className = "planner-duration-btn py-2 px-3 rounded-xl text-xs font-semibold border border-charcoal bg-charcoal text-white transition text-center";
      } else {
        btn.className = "planner-duration-btn py-2 px-3 rounded-xl text-xs font-semibold border border-stone-200 hover:border-charcoal transition text-center";
      }
    });

    // Update Budget Tier Buttons
    document.querySelectorAll(".planner-budget-btn").forEach(btn => {
      const t = btn.dataset.tier;
      if (t === state.budgetTier) {
        btn.className = "planner-budget-btn p-2 rounded-xl border border-charcoal bg-charcoal text-white text-center transition";
      } else {
        btn.className = "planner-budget-btn p-2 rounded-xl border border-stone-200 hover:border-charcoal text-center transition";
      }
    });

    // Update Vibe Buttons
    document.querySelectorAll(".planner-vibe-btn").forEach(btn => {
      const v = btn.dataset.vibe;
      if (v === state.vibe) {
        btn.className = "planner-vibe-btn p-3 rounded-2xl border border-charcoal bg-charcoal text-white text-left transition";
      } else {
        btn.className = "planner-vibe-btn p-3 rounded-2xl border border-stone-200 hover:border-charcoal text-left transition";
      }
    });

    // Update Budget Display Meter
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

    // Itemized Pills
    const costHotel = document.getElementById("item-cost-hotel");
    if (costHotel) costHotel.textContent = `৳${budget.totalHotel.toLocaleString('en-IN')}`;

    const costFood = document.getElementById("item-cost-food");
    if (costFood) costFood.textContent = `৳${budget.totalFood.toLocaleString('en-IN')}`;

    const costTransit = document.getElementById("item-cost-transit");
    if (costTransit) costTransit.textContent = `৳${budget.totalTransit.toLocaleString('en-IN')}`;

    const costAct = document.getElementById("item-cost-activities");
    if (costAct) costAct.textContent = `৳${budget.totalActivities.toLocaleString('en-IN')}`;

    // Update Hotel Card
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

    // Update Dining Card
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

    // Update Daily Timeline Schedule
    renderDailyTimeline(schedule);

    // Update Transit Tips
    renderTransitTips();

    // Update Pass Export Card
    renderVisualPassCard(budget, hotel, schedule);

    // Update WhatsApp Link
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
              <div class="space-y-0.5">
                <p class="text-xs sm:text-sm font-semibold text-charcoal">${item.act}</p>
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
    if (!container || typeof PLANNER_CATALOG === 'undefined' || !PLANNER_CATALOG.transitFares) return;

    container.innerHTML = PLANNER_CATALOG.transitFares.map(fare => `
      <div class="bg-white/80 rounded-2xl p-3 border border-amber-200 space-y-1">
        <span class="text-[10px] uppercase font-bold text-amber-900 block">${fare.route}</span>
        <div class="flex items-center justify-between">
          <span class="text-stone-500">${fare.vehicle}:</span>
          <span class="font-bold text-charcoal">${fare.fairFareBDT}</span>
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

    // Condensed Timeline for Pass
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

  function renderActivityCheckboxes() {
    const container = document.getElementById("planner-activities-checklist");
    if (!container || typeof PLANNER_CATALOG === 'undefined' || !PLANNER_CATALOG.activities) return;

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
    if (typeof buildWhatsAppPlannerPayload === 'function') {
      btn.href = buildWhatsAppPlannerPayload(state);
    } else {
      btn.href = `https://wa.me/8801819012345?text=${encodeURIComponent(`Hi Visit Cox! I generated a ${state.days}-day trip for ${state.adults} adults. Estimated budget ৳${state.calculatedBudget?.totalBDT || 18500} BDT.`)}`;
    }
  }

  // 8. IMAGE EXPORT VIA HTML2CANVAS
  function downloadVisualPass() {
    const card = document.getElementById("visual-pass-export-card");
    if (!card) {
      alert("Pass card not found for export.");
      return;
    }

    if (typeof html2canvas === 'undefined') {
      alert("Loading export library... Please try again in a moment.");
      return;
    }

    const exportBtn = document.getElementById("btn-download-pass");
    const originalText = exportBtn ? exportBtn.innerHTML : "";
    if (exportBtn) exportBtn.innerHTML = "Generating Image...";

    // Use html2canvas with 2x scale and background preservation
    html2canvas(card, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#111827",
      logging: false
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
      alert("Unable to generate pass image. Please try again.");
    });
  }

  // 9. PUBLIC API & EVENT HANDLERS
  return {
    init: function () {
      renderActivityCheckboxes();
      renderAll();
    },
    setDays: function (d) {
      state.days = Math.max(1, Math.min(14, d));
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
      const titleEl = document.getElementById("pass-title");
      if (titleEl) titleEl.textContent = name || "My Coastal Journey";
      updateWhatsAppLink();
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
    getState: function () {
      return Object.assign({}, state);
    }
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PlannerApp };
}
