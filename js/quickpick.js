/**
 * Visit Cox — "Quick Trip Pick" hero widget on index.html: budget slider, vibe chips, trip ranking.
 * Needs js/planner.js (PlannerApp.estimate); loads it on demand if the page did not include it.
 */

const QuickTripPick = (function () {
  // Each card is a planner link. Total, hotel and party size come from PlannerApp.estimate(linkParams),
  // the same formula itinerary.html runs for that link (planner.js must be loaded first).
  const tripDatabase = [
    { id: "classic-escape", vibe: "relaxing", title: "Classic Coastal Escape", titleBn: "ক্লাসিক উপকূল ভ্রমণ", badge: "Most Popular",
      linkParams: "days=3&tier=comfort&arc=quiet_coral" },
    { id: "weekend-thrill", vibe: "adventure", title: "Weekend Waves & Thrills", titleBn: "সপ্তাহান্তে ঢেউ ও রোমাঞ্চ", badge: "High Adrenaline",
      linkParams: "days=2&tier=comfort&arc=wave_hunter" },
    { id: "family-holiday", vibe: "family", title: "Stress-Free Family Safari", titleBn: "ঝামেলাহীন পারিবারিক ভ্রমণ", badge: "Family Friendly",
      linkParams: "days=3&adults=2&kids=2&tier=comfort&arc=family_leader" },
    { id: "romantic-haven", vibe: "romantic", title: "Oceanview Romance & Sunset", titleBn: "সাগরমুখী রোমান্স ও সূর্যাস্ত", badge: "5-Star",
      linkParams: "days=3&tier=luxury&arc=ocean_romance" },
    { id: "seafood-safari", vibe: "foodie", title: "Bhorta & Live Catch Tour", titleBn: "ভর্তা ও তাজা মাছের সফর", badge: "Foodie Choice",
      linkParams: "days=2&tier=comfort&arc=foodie_hunter" },
    { id: "backpacker-odyssey", vibe: "relaxing", title: "Smart Saver Coastal Trek", titleBn: "সাশ্রয়ী উপকূল ভ্রমণ", badge: "Budget Saver",
      linkParams: "days=3&tier=backpacker&arc=quiet_coral" }
  ];

  let currentBudget = 22000;
  let currentVibe = "all";
  let priced = null;
  let plannerRequested = false;

  // index.html may not include planner.js; fetch it once rather than show numbers from a second formula.
  function ensurePlanner() {
    if (typeof PlannerApp !== "undefined" || plannerRequested) return;
    plannerRequested = true;
    const s = document.createElement("script");
    s.src = "js/planner.js";
    s.onload = render;
    document.head.appendChild(s);
  }

  function pricedTrips() {
    if (!priced && typeof PlannerApp !== "undefined") {
      priced = tripDatabase.map(t => Object.assign({}, t, PlannerApp.estimate(t.linkParams)));
    }
    return priced;
  }

  function render() {
    // Text follows the site language; plannerLang/plannerNum come from planner.js (loaded first, or on demand).
    const bn = typeof plannerLang === 'function' && plannerLang() === 'bn';
    const num = n => (typeof plannerNum === 'function' ? plannerNum(n) : Number(n).toLocaleString('en-IN'));
    // 1. Update budget display
    const budgetValEl = document.getElementById("qp-budget-val");
    if (budgetValEl) {
      budgetValEl.textContent = `৳${num(currentBudget)}`;
    }

    const perPersonEl = document.getElementById("qp-per-person-val");
    if (perPersonEl) {
      const pp = Math.round(currentBudget / 2);
      perPersonEl.textContent = bn ? `≈ ২ জনের জন্য জনপ্রতি ৳${num(pp)}` : `≈ ৳${num(pp)}/person for 2 guests`;
    }

    const listContainer = document.getElementById("qp-recommendations-list");
    const trips = pricedTrips();
    if (!trips) {
      ensurePlanner();
      return;
    }

    // 2. Filter & rank recommendations by distance from the chosen budget
    const gap = trip => Math.abs(trip.budget.totalBDT - currentBudget);
    let matches = trips.filter(trip => (currentVibe === "all" || trip.vibe === currentVibe) && gap(trip) <= 15000);
    if (matches.length === 0) matches = trips.slice(0, 2);
    const topMatches = matches.sort((a, b) => gap(a) - gap(b)).slice(0, 2);

    // 3. Render HTML (catalog text escaped with the planner's helper)
    if (listContainer) {
      listContainer.innerHTML = topMatches.map((trip, idx) => {
        const guests = trip.adults + trip.kids;
        return `
        <a 
          href="itinerary.html?${trip.linkParams}" 
          class="group block p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 hover:border-charcoal transition"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-charcoal text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                ${idx + 1}
              </span>
              <div>
                <h4 class="text-xs sm:text-sm font-bold text-charcoal group-hover:text-terracotta-600 transition">
                  ${plannerEsc(bn ? trip.titleBn : trip.title)}
                </h4>
                <p class="text-[11px] text-stone-500 font-mono mt-0.5">
                  ${plannerEsc(trip.hotel ? pl(trip.hotel, 'name') : '')} • ${bn ? `${num(trip.days)} দিন • ${num(guests)} জন` : `${trip.days} days • ${guests} guests`}
                </p>
              </div>
            </div>
            <div class="text-right shrink-0">
              <span class="text-xs font-bold text-charcoal font-mono block">
                ৳${num(trip.budget.totalBDT)}
              </span>
              <span class="text-[10px] text-stone-400 font-mono block">
                ~৳${num(trip.budget.perPersonBDT)}${bn ? '/জন' : '/pax'}
              </span>
            </div>
          </div>
        </a>
      `;
      }).join('');
    }
  }

  return {
    // app.js renderAll() calls this after a language or currency toggle.
    refresh: render,
    init: function () {
      const slider = document.getElementById("qp-budget-slider");
      if (slider) {
        slider.addEventListener("input", function (e) {
          currentBudget = parseInt(e.target.value, 10);
          render();
        });
      }
      render();
    },
    setVibe: function (vibe, btnEl) {
      currentVibe = vibe;
      document.querySelectorAll(".qp-vibe-chip").forEach(btn => {
        btn.classList.remove("bg-charcoal", "text-white", "border-charcoal");
        btn.classList.add("bg-white", "text-stone-600", "border-stone-200");
      });
      if (btnEl) {
        btnEl.classList.remove("bg-white", "text-stone-600", "border-stone-200");
        btnEl.classList.add("bg-charcoal", "text-white", "border-charcoal");
      }
      render();
    }
  };
})();

// Auto-run if element exists on page
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("qp-budget-slider")) {
      QuickTripPick.init();
    }
  });
}
