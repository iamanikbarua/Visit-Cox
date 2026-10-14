/**
 * Visit Cox — "Quick Trip Pick" Hero Widget Engine (suggest.bike inspired)
 * Powers the real-time budget slider, vibe chips, and instant trip ranking on index.html
 */

const QuickTripPick = (function () {
  const tripDatabase = [
    {
      id: "classic-escape",
      vibe: "relaxing",
      minBudget: 15000,
      maxBudget: 28000,
      duration: "3 Days / 2 Nights",
      title: "Classic Coastal Escape",
      tagline: "Hotel Sea Crown Seafront AC • Inani Coral Walk • Poushee Feast",
      totalBDT: 19500,
      perPersonBDT: 9750,
      pax: 2,
      badge: "Most Popular",
      linkParams: "days=3&vibe=relaxing&tier=comfort"
    },
    {
      id: "weekend-thrill",
      vibe: "adventure",
      minBudget: 12000,
      maxBudget: 22000,
      duration: "2 Days / 1 Night",
      title: "Weekend Waves & Thrills",
      tagline: "Prime Park Hotel • Tandem Parasailing • Sugandha Night BBQ",
      totalBDT: 15200,
      perPersonBDT: 7600,
      pax: 2,
      badge: "High Adrenaline",
      linkParams: "days=2&vibe=adventure&tier=comfort"
    },
    {
      id: "family-holiday",
      vibe: "family",
      minBudget: 22000,
      maxBudget: 45000,
      duration: "3 Days / 2 Nights",
      title: "Stress-Free Family Safari",
      tagline: "Sea Pearl Family Suite • Radiant Fish World • Safe Waves",
      totalBDT: 28500,
      perPersonBDT: 7125,
      pax: 4,
      badge: "Family Friendly",
      linkParams: "days=3&vibe=family&tier=comfort"
    },
    {
      id: "romantic-haven",
      vibe: "romantic",
      minBudget: 28000,
      maxBudget: 70000,
      duration: "3 Days / 2 Nights",
      title: "Oceanview Romance & Sunset",
      tagline: "Sayeman Beachfront Infinity Pool • Mermaid Twilight Dinner",
      totalBDT: 34000,
      perPersonBDT: 17000,
      pax: 2,
      badge: "5-Star Luxury",
      linkParams: "days=3&vibe=romantic&tier=luxury"
    },
    {
      id: "seafood-safari",
      vibe: "foodie",
      minBudget: 10000,
      maxBudget: 25000,
      duration: "2 Days / 1 Night",
      title: "10-Item Bhorta & Live Catch Tour",
      tagline: "Poushee Feast • Fresh Charcoal Rupchanda • Dry Fish Market",
      totalBDT: 13500,
      perPersonBDT: 6750,
      pax: 2,
      badge: "Foodie Choice",
      linkParams: "days=2&vibe=foodie&tier=comfort"
    },
    {
      id: "backpacker-odyssey",
      vibe: "relaxing",
      minBudget: 6000,
      maxBudget: 14000,
      duration: "3 Days / 2 Nights",
      title: "Smart Saver Coastal Trek",
      tagline: "Clean AC Guest House • Local Rice & Bhorta • Marine Drive Bus",
      totalBDT: 8500,
      perPersonBDT: 4250,
      pax: 2,
      badge: "Budget Saver",
      linkParams: "days=3&vibe=relaxing&tier=backpacker"
    }
  ];

  let currentBudget = 22000;
  let currentVibe = "all";

  function render() {
    // 1. Update budget display
    const budgetValEl = document.getElementById("qp-budget-val");
    if (budgetValEl) {
      budgetValEl.textContent = `৳${currentBudget.toLocaleString('en-IN')}`;
    }

    const perPersonEl = document.getElementById("qp-per-person-val");
    if (perPersonEl) {
      const pp = Math.round(currentBudget / 2);
      perPersonEl.textContent = `≈ ৳${pp.toLocaleString('en-IN')}/person for 2 guests`;
    }

    // 2. Filter & rank recommendations
    let matches = tripDatabase.filter(trip => {
      const matchesVibe = currentVibe === "all" || trip.vibe === currentVibe;
      const budgetDiff = Math.abs(trip.totalBDT - currentBudget);
      return matchesVibe && budgetDiff <= 15000;
    });

    if (matches.length === 0) {
      matches = tripDatabase.slice(0, 2);
    }

    // Sort by proximity to chosen budget
    matches.sort((a, b) => Math.abs(a.totalBDT - currentBudget) - Math.abs(b.totalBDT - currentBudget));
    const topMatches = matches.slice(0, 2);

    // 3. Render HTML
    const listContainer = document.getElementById("qp-recommendations-list");
    if (listContainer) {
      listContainer.innerHTML = topMatches.map((trip, idx) => `
        <a 
          href="itinerary.html?${trip.linkParams}&budget=${currentBudget}" 
          class="group block p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 hover:border-charcoal transition"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-charcoal text-white text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                ${idx + 1}
              </span>
              <div>
                <h4 class="text-xs sm:text-sm font-bold text-charcoal group-hover:text-terracotta-600 transition">
                  ${trip.title}
                </h4>
                <p class="text-[11px] text-stone-500 font-mono mt-0.5">
                  ${trip.tagline}
                </p>
              </div>
            </div>
            <div class="text-right shrink-0">
              <span class="text-xs font-bold text-charcoal font-mono block">
                ৳${trip.totalBDT.toLocaleString('en-IN')}
              </span>
              <span class="text-[10px] text-stone-400 font-mono block">
                ~৳${trip.perPersonBDT.toLocaleString('en-IN')}/pax
              </span>
            </div>
          </div>
        </a>
      `).join('');
    }
  }

  return {
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
