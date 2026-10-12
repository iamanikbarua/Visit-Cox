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
 * Module 2: Custom Itinerary Builder
 *   - Trip Length: 2 Days, 3 Days, 5 Days
 *   - Travel Style: Family & Relaxing, Adventure, Budget
 *   - Dynamic DOM updates rendering a vertical timeline with Morning,
 *     Afternoon, and Evening cards + live BDT/USD cost estimates.
 */

const FeaturesState = {
  mapInstance: null,
  markerLayerGroup: null,
  activeMapFilter: 'all', // 'all' | 'hotels' | 'spots' | 'hubs'
  selectedDays: '2',      // '2' | '3' | '5'
  selectedStyle: 'family' // 'family' | 'adventure' | 'budget'
};

/* --------------------------------------------------------------------------
 * 1. MAP LOCATIONS DATASET (Categorized Coordinates & Bilingual Details)
 * -------------------------------------------------------------------------- */
const COXS_BAZAR_CENTER = { lat: 21.4272, lng: 91.9702, zoom: 11 };

const MAP_LOCATIONS = [
  // HOTELS
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
      en: 'Hotel • Sugandha Beach',
      bn: 'হোটেল • সুগন্ধা বিচ'
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
      en: 'Hotel • Kalatali Road',
      bn: 'হোটেল • কলাতলী রোড'
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
 * 2. LEAFLET INTERACTIVE MAP INITIALIZATION & FILTERING
 * -------------------------------------------------------------------------- */
function createCategoryMarkerIcon(category) {
  const styles = {
    hotels: {
      bg: '#0284c7', // Ocean Blue
      svg: `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>`
    },
    spots: {
      bg: '#0d9488', // Tropical Teal-Green
      svg: `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`
    },
    hubs: {
      bg: '#d97706', // Warm Amber
      svg: `<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>`
    }
  }[category] || { bg: '#0284c7', svg: '' };

  return L.divIcon({
    className: 'custom-leaflet-div-icon',
    html: `<div class="custom-map-pin" style="background-color: ${styles.bg};">${styles.svg}</div>`,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20]
  });
}

function initTouristMap() {
  const mapEl = document.getElementById('coxs-bazar-map');
  if (!mapEl || typeof L === 'undefined') return;

  if (!FeaturesState.mapInstance) {
    FeaturesState.mapInstance = L.map('coxs-bazar-map', {
      scrollWheelZoom: false
    }).setView([COXS_BAZAR_CENTER.lat, COXS_BAZAR_CENTER.lng], COXS_BAZAR_CENTER.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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

function setMapFilter(category) {
  FeaturesState.activeMapFilter = category;
  renderMapMarkersAndFilters();
}

function focusMapLocation(locationId) {
  const loc = MAP_LOCATIONS.find(l => l.id === locationId);
  if (!loc || !FeaturesState.mapInstance) return;

  if (FeaturesState.activeMapFilter !== 'all' && FeaturesState.activeMapFilter !== loc.category) {
    FeaturesState.activeMapFilter = 'all';
    renderMapMarkersAndFilters();
  }

  FeaturesState.mapInstance.flyTo([loc.lat, loc.lng], 14, { duration: 0.9 });

  // Open matching marker popup
  FeaturesState.markerLayerGroup.eachLayer(layer => {
    if (layer._customLocationId === locationId) {
      layer.openPopup();
    }
  });
}

function renderMapMarkersAndFilters() {
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const filterBar = document.getElementById('map-category-filters');
  const legendList = document.getElementById('map-locations-quicklist');

  const filterLabels = {
    en: [
      { key: 'all', label: 'All Pins (7)', dot: 'bg-sky-400' },
      { key: 'hotels', label: 'Hotels (2)', dot: 'bg-sky-600' },
      { key: 'spots', label: 'Tourist Spots (3)', dot: 'bg-teal-600' },
      { key: 'hubs', label: 'Transport Hubs (2)', dot: 'bg-amber-600' }
    ],
    bn: [
      { key: 'all', label: 'সব লোকেশন (৭)', dot: 'bg-sky-400' },
      { key: 'hotels', label: 'হোটেল (২)', dot: 'bg-sky-600' },
      { key: 'spots', label: 'দর্শনীয় স্থান (৩)', dot: 'bg-teal-600' },
      { key: 'hubs', label: 'যাতায়াত ঘাট ও মোড় (২)', dot: 'bg-amber-600' }
    ]
  }[lang];

  if (filterBar) {
    filterBar.innerHTML = filterLabels
      .map(f => {
        const active = FeaturesState.activeMapFilter === f.key;
        return `
          <button
            type="button"
            onclick="setMapFilter('${f.key}')"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              active
                ? 'bg-ocean-950 text-white shadow-md scale-105'
                : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
            }">
            <span class="w-2.5 h-2.5 rounded-full ${f.dot}"></span>
            <span>${f.label}</span>
          </button>
        `;
      })
      .join('');
  }

  const visibleLocations = MAP_LOCATIONS.filter(
    loc => FeaturesState.activeMapFilter === 'all' || loc.category === FeaturesState.activeMapFilter
  );

  // Update Quick-Jump Sidebar Cards
  if (legendList) {
    legendList.innerHTML = visibleLocations
      .map(loc => {
        const badgeColor =
          loc.category === 'hotels'
            ? 'bg-sky-100 text-sky-800'
            : loc.category === 'spots'
            ? 'bg-teal-100 text-teal-800'
            : 'bg-amber-100 text-amber-800';

        return `
          <button
            type="button"
            onclick="focusMapLocation('${loc.id}')"
            class="w-full text-left p-3.5 rounded-2xl bg-white hover:bg-sky-50/80 border border-slate-200/90 hover:border-sky-300 transition flex items-start gap-3 shadow-2xs group">
            <img src="${loc.image}" alt="${loc.name[lang]}" class="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-200" />
            <div class="min-w-0 flex-1">
              <span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${badgeColor}">
                ${loc.categoryLabel[lang]}
              </span>
              <h4 class="font-bold text-slate-900 text-sm mt-1 group-hover:text-sky-700 transition truncate">
                ${loc.name[lang]}
              </h4>
              <p class="text-xs text-slate-500 line-clamp-2 mt-0.5">${loc.description[lang]}</p>
            </div>
          </button>
        `;
      })
      .join('');
  }

  // Update Leaflet Markers
  if (!FeaturesState.markerLayerGroup || !FeaturesState.mapInstance) return;
  FeaturesState.markerLayerGroup.clearLayers();

  const bounds = [];
  visibleLocations.forEach(loc => {
    const marker = L.marker([loc.lat, loc.lng], {
      icon: createCategoryMarkerIcon(loc.category)
    });
    marker._customLocationId = loc.id;

    const popupHTML = `
      <div class="font-sans">
        <div class="relative h-28 bg-slate-200">
          <img src="${loc.image}" alt="${loc.name[lang]}" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          <span class="absolute bottom-2 left-3 px-2 py-0.5 rounded bg-teal-500 text-white text-[10px] font-bold uppercase">
            ${loc.categoryLabel[lang]}
          </span>
        </div>
        <div class="p-3.5">
          <h4 class="font-extrabold text-slate-900 text-sm">${loc.name[lang]}</h4>
          <p class="text-xs text-slate-600 mt-1 leading-relaxed">${loc.description[lang]}</p>
          <a href="${loc.targetSection}" class="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:underline">
            <span>${lang === 'en' ? 'View in Guide' : 'বিস্তারিত দেখুন'}</span>
            <span>→</span>
          </a>
        </div>
      </div>
    `;

    marker.bindPopup(popupHTML);
    FeaturesState.markerLayerGroup.addLayer(marker);
    bounds.push([loc.lat, loc.lng]);
  });

  if (bounds.length > 1) {
    FeaturesState.mapInstance.fitBounds(bounds, { padding: [45, 45], maxZoom: 13 });
  } else if (bounds.length === 1) {
    FeaturesState.mapInstance.setView(bounds[0], 14);
  }
}

/* --------------------------------------------------------------------------
 * 3. CUSTOM ITINERARY BUILDER DATASET (All Combinations: 2, 3, 5 Days)
 * -------------------------------------------------------------------------- */
const ITINERARY_DATABASE = {
  // ======================= 2 DAYS ITINERARIES =======================
  '2_family': {
    title: {
      en: '2-Day Family & Relaxing Coastal Getaway',
      bn: '২ দিনের পারিবারিক ও আরামদায়ক সমুদ্র ভ্রমণ'
    },
    summary: {
      en: 'Day 1: Laboni & Sugandha Beach • Day 2: Inani Beach via Chander Gari',
      bn: '১ম দিন: লাবণী ও সুগন্ধা সৈকত • ২য় দিন: চান্দের গাণিতে ইনানী সমুদ্র সৈকত'
    },
    estBudgetBDT: [4500, 8000],
    days: [
      {
        dayNumber: 1,
        headline: {
          en: 'Day 1: Laboni Beach, Sugandha Promenade & Radiant Fish World',
          bn: '১ম দিন: লাবণী সৈকত, সুগন্ধা পয়েন্ট ও রেডিয়েন্ট ফিশ ওয়ার্ল্ড'
        },
        morning: {
          en: 'Check in at Hotel Sea Crown (Sugandha) or Hotel Kollol (Laboni). Enjoy a gentle family walk and safe morning dip at Laboni Beach under Sea Safe green flags.',
          bn: 'হোটেল সী ক্রাউন বা হোটেল কল্লোলে চেক-ইন। সকালে লাবণী সৈকতের শান্ত পানিতে পরিবারের সাথে নিরাপদ সমুদ্র স্নান।'
        },
        afternoon: {
          en: 'Fresh rupchanda & coral fish lunch at Laboni Point, followed by a 10-minute Tomtom ride (15-20 BDT) to Radiant Fish World aquarium in Jhautola.',
          bn: 'দুপুরে সামুদ্রিক রূপচাঁদা ও কোরাল মাছের লাঞ্চ এবং টমটমে (১৫-২০ টাকা) ঝাউতলার রেডিয়েন্ট ফিশ ওয়ার্ল্ড অ্যাকোয়ারিয়াম পরিদর্শন।'
        },
        evening: {
          en: 'Watch the golden sunset from Sugandha Beach beachfront chairs and browse Burmese Market handicrafts & pickles.',
          bn: 'সুগন্ধা সৈকতে বসে সূর্যাস্ত উপভোগ এবং বার্মিজ মার্কেটে আচার ও হস্তশিল্প কেনাকাটা।'
        }
      },
      {
        dayNumber: 2,
        headline: {
          en: 'Day 2: Inani Beach via Chander Gari Along Marine Drive',
          bn: '২য় দিন: চান্দের গাণিতে মেরিন ড্রাইভ হয়ে ইনানী সমুদ্র সৈকত'
        },
        morning: {
          en: 'Hire a reserved Chander Gari open-top jeep from Dolphin Mor (1,500–2,000 BDT for the group) and cruise 32 km south along the scenic Marine Drive to Inani Beach.',
          bn: 'ডলফিন মোড় থেকে গ্রুপের জন্য রিজার্ভ চান্দের গাড়ি (১,৫০০-২,০০০ টাকা) নিয়ে মেরিন ড্রাইভ ধরে ৩২ কিমি দক্ষিণে ইনানী সৈকতে যাত্রা।'
        },
        afternoon: {
          en: 'Explore Inani’s clear coral-boulder tidal pools and stop at Himchari National Park viewpoint on the return drive for hillside photos.',
          bn: 'ইনানীর প্রবাল পাথর ও স্বচ্ছ পানিতে সময় কাটানো এবং ফেরার পথে হিমছড়ি ভিউপয়েন্টে বিরতি।'
        },
        evening: {
          en: 'Farewell rooftop seafood barbecue dinner at Prime Park Hotel or beachfront dining before departure.',
          bn: 'সন্ধ্যায় রুফটপ রেস্টুরেন্টে সি-ফুড বারবিকিউ ডিনার এবং ভ্রমণের সমাপ্তি।'
        }
      }
    ]
  },

  '2_adventure': {
    title: {
      en: '2-Day High-Energy Coastal & Island Adventure',
      bn: '২ দিনের পাহাড় ও দ্বীপ অ্যাডভেঞ্চার প্ল্যান'
    },
    summary: {
      en: 'Day 1: Himchari Cliffs & Inani Coral Shore • Day 2: Moheshkhali Speedboat & Ramu',
      bn: '১ম দিন: হিমছড়ি ট্রেকিং ও ইনানী • ২য় দিন: মহেশখালী স্পিডবোট ও রামু'
    },
    estBudgetBDT: [3500, 6500],
    days: [
      {
        dayNumber: 1,
        headline: {
          en: 'Day 1: Himchari Ridge Trek, Parasailing & Shamlapur Sunset',
          bn: '১ম দিন: হিমছড়ি পাহাড় চূড়া, প্যারাসেইলিং ও শামলাপুর সূর্যাস্ত'
        },
        morning: {
          en: 'Take a reserved CNG (300–400 BDT) to Himchari National Park. Climb the 200+ hill steps to the Broken Hill ridge overlooking the Bay of Bengal.',
          bn: 'সিএনজি রিজার্ভ (৩০০-৪০০ টাকা) নিয়ে হিমছড়ি জাতীয় উদ্যানে পাহাড় ট্র্যাকিং ও ঝর্ণা দর্শন।'
        },
        afternoon: {
          en: 'Continue down Marine Drive to Darianagar for coastal parasailing and explore the coral rocks of Inani Beach.',
          bn: 'দরিয়ানগরে প্যারাসেইলিং এবং ইনানী সৈকতের প্রবাল পাথরের তীরে অভিযান।'
        },
        evening: {
          en: 'Catch the fiery sunset beside traditional wooden Sampan fishing boats at Shamlapur before returning before dark.',
          bn: 'সূর্যাস্তের আগে শামলাপুর সৈকতে ঐতিহ্যবাহী সাম্পান নৌকার সাথে গোধূলি উপভোগ।'
        }
      },
      {
        dayNumber: 2,
        headline: {
          en: 'Day 2: Moheshkhali Speedboat Crossing & 100-Ft Buddha at Ramu',
          bn: '২য় দিন: স্পিডবোটে মহেশখালী দ্বীপ ও রামুর ১০০ ফুট বুদ্ধ মূর্তি'
        },
        morning: {
          en: 'Board a high-speed motorboat from Kasturi Ghat (80–100 BDT/person, 35 mins) across the channel to Moheshkhali Island and hike up Mainak Hill to Adinath Temple.',
          bn: 'কস্তুরাঘাট থেকে স্পিডবোটে (৮০-১০০ টাকা, ৩৫ মিনিট) মহেশখালী দ্বীপে যাত্রা এবং মৈনাক পাহাড়ের আদিনাথ মন্দির দর্শন।'
        },
        afternoon: {
          en: 'Return to town and hire a CNG (400–500 BDT) 16 km east to Ramu to see the colossal 100-Foot Reclining Gautama Buddha statue.',
          bn: 'দুপুরে শহরে ফিরে সিএনজিতে (৪০০-৫০০ টাকা) ১৬ কিমি পূর্বে রামুর ১০০ ফুট সিংহশয্যা বুদ্ধ মূর্তি পরিদর্শন।'
        },
        evening: {
          en: 'Evening stroll at Kolatoli & Najirartek estuary before catching the night coach or train.',
          bn: 'সন্ধ্যায় কলাতলী সৈকতে ভ্রমণ শেষে ফিরতি যাত্রা।'
        }
      }
    ]
  },

  '2_budget': {
    title: {
      en: '2-Day Smart Backpacker & Budget Explorer Plan',
      bn: '২ দিনের সাশ্রয়ী বাজেট ভ্রমণ প্ল্যান'
    },
    summary: {
      en: 'Day 1: Shared Tomtoms, Laboni & Kolatoli • Day 2: Moheshkhali Island & Marine Drive',
      bn: '১ম দিন: শেয়ারড টমটমে লাবণী ও কলাতলী • ২য় দিন: মহেশখালী ও মেরিন ড্রাইভ'
    },
    estBudgetBDT: [2200, 3800],
    days: [
      {
        dayNumber: 1,
        headline: {
          en: 'Day 1: Kolatoli Eco Cottages, Shared Tomtom Hop & Beach Sunset',
          bn: '১ম দিন: কলাতলী ইকো কটেজ, শেয়ারড টমটম ও সৈকতে সূর্যাস্ত'
        },
        morning: {
          en: 'Check in at budget-friendly Nisanah Resort (1,500 BDT/night). Hop on a shared Tomtom (10 BDT) from Kalatali to Sugandha & Laboni Beach.',
          bn: 'সাশ্রয়ী নিসানাহ রিসোর্টে চেক-ইন (১,৫০০ টাকা)। মাত্র ১০ টাকা শেয়ারড টমটমে সুগন্ধা ও লাবণী সৈকত ভ্রমণ।'
        },
        afternoon: {
          en: 'Enjoy affordable local Bengali *panta-bhat* & fried loitta fish lunch at Jhautola, then trek the free Kolatoli Eco Park hill trail.',
          bn: 'ঝাউতলায় সাশ্রয়ী মূল্যে সামুদ্রিক মাছের ভর্তা-ভাত এবং বিকেলে কলাতলী ইকো পার্কে হাঁটাহাঁটি।'
        },
        evening: {
          en: 'Relax on Sugandha Beach with roasted corn and coconut water while watching the evening tide.',
          bn: 'সন্ধ্যায় সুগন্ধা সৈকতে ডাবের পানি ও সমুদ্রের গর্জন উপভোগ।'
        }
      },
      {
        dayNumber: 2,
        headline: {
          en: 'Day 2: Public Speedboat to Moheshkhali & Shared Chander Gari to Inani',
          bn: '২য় দিন: মহেশখালী দ্বীপ ও শেয়ারড চান্দের গাণিতে ইনানী'
        },
        morning: {
          en: 'Take a 15 BDT Tomtom to Kasturi Ghat and board the 80–100 BDT public speedboat to Moheshkhali Island (Adinath Temple & salt fields).',
          bn: 'কস্তুরাঘাট থেকে জনপ্রতি ৮০-১০০ টাকায় স্পিডবোটে মহেশখালী দ্বীপ ও লবণের মাঠ ভ্রমণ।'
        },
        afternoon: {
          en: 'Share a group Chander Gari from Dolphin Mor down Marine Drive to Himchari & Inani Beach.',
          bn: 'ডলফিন মোড় থেকে শেয়ারড চান্দের গাণিতে মেরিন ড্রাইভ হয়ে হিমছড়ি ও ইনানী সৈকত দর্শন।'
        },
        evening: {
          en: 'Buy chemical-free dried fish at Najirartek Shutki Hub before heading home.',
          bn: 'নাজিরারটেক শুঁটকি মহাল থেকে খাঁটি শুঁটকি সংগ্রহ ও ফিরতি যাত্রা।'
        }
      }
    ]
  },

  // ======================= 3 DAYS ITINERARIES =======================
  '3_adventure': {
    title: {
      en: '3-Day Ultimate Coastal, Island & Camping Adventure',
      bn: '৩ দিনের হিমছড়ি ট্রেকিং, মহেশখালী ও সোনাদিয়া ক্যাম্পিং অ্যাডভেঞ্চার'
    },
    summary: {
      en: 'Day 1: Himchari hike • Day 2: Moheshkhali Island • Day 3: Sonadia Island camping',
      bn: '১ম দিন: হিমছড়ি হাইকিং • ২য় দিন: মহেশখালী দ্বীপ • ৩য় দিন: সোনাদিয়া দ্বীপে ক্যাম্পিং'
    },
    estBudgetBDT: [5500, 9500],
    days: [
      {
        dayNumber: 1,
        headline: {
          en: 'Day 1: Himchari National Park Hike & Inani Coral Boulders',
          bn: '১ম দিন: হিমছড়ি জাতীয় উদ্যানে পাহাড় হাইকিং ও ইনানী সৈকত'
        },
        morning: {
          en: 'Depart early via reserved CNG (300–400 BDT) to Himchari National Park. Hike the evergreen forest ridge trail and explore the Himchari waterfalls.',
          bn: 'সকালে রিজার্ভ সিএনজিতে (৩০০-৪০০ টাকা) হিমছড়ি জাতীয় উদ্যানে যাত্রা এবং পাহাড়ি ট্রেইল ও ঝর্ণায় হাইকিং।'
        },
        afternoon: {
          en: 'Continue south on Marine Drive to Kolatoli Eco Park canopy trail and boulder-hop along Inani Coral Beach.',
          bn: 'মেরিন ড্রাইভ ধরে কলাতলী ইকো পার্ক ট্রেকিং এবং বিকেলে ইনানী প্রবাল সৈকতে ভ্রমণ।'
        },
        evening: {
          en: 'Watch the golden sunset over crescent Sampan boats at Shamlapur Sunset Point, returning to town before dusk.',
          bn: 'শামলাপুর সানসেট পয়েন্টে সাম্পান নৌকার পটভূমিতে সূর্যাস্ত দেখে সন্ধ্যার আগে শহরে ফেরা।'
        }
      },
      {
        dayNumber: 2,
        headline: {
          en: 'Day 2: Moheshkhali Island Speedboat Expedition & Ramu Monasteries',
          bn: '২য় দিন: স্পিডবোটে মহেশখালী দ্বীপ অভিযান ও রামু বৌদ্ধ বিহার'
        },
        morning: {
          en: 'Take a 35-minute speedboat from Kasturi Ghat (80–100 BDT/passenger) to Moheshkhali Island. Climb Mainak Hill to Adinath Temple and tour mangrove mudflats.',
          bn: 'কস্তুরাঘাট থেকে ৩৫ মিনিটের স্পিডবোটে (৮০-১০০ টাকা) মহেশখালী দ্বীপ যাত্রা, মৈনাক পাহাড়ে আদিনাথ মন্দির ও প্যারাবন পরিদর্শন।'
        },
        afternoon: {
          en: 'Explore Moheshkhali salt pans and Rakhine Buddhist pagodas, then take a reserved CNG (400–500 BDT) to the 100-Foot Reclining Buddha in Ramu.',
          bn: 'মহেশখালীর লবণের মাঠ দেখে শহরে ফিরে সিএনজিতে (৪০০-৫০০ টাকা) রামুর ১০০ ফুট সিংহশয্যা বুদ্ধ মূর্তি দর্শন।'
        },
        evening: {
          en: 'Prep tents, dry rations, and gear at Kolatoli for Day 3 island camping.',
          bn: 'পরদিনের সোনাদিয়া ক্যাম্পিংয়ের প্রস্তুতি এবং সৈকতে নৈশভোজ।'
        }
      },
      {
        dayNumber: 3,
        headline: {
          en: 'Day 3: Sonadia Island Beach Camping & Estuary Exploration',
          bn: '৩য় দিন: সোনাদিয়া দ্বীপে বিচ ক্যাম্পিং ও নির্জন প্রকৃতি দর্শন'
        },
        morning: {
          en: 'Cross the Maheshkhali channel by boat to untouched Sonadia Island (9 sq. km ecological barrier island). Walk along red ghost crab shores and casuarina dunes.',
          bn: 'নৌযোগে নির্জন সোনাদিয়া দ্বীপে যাত্রা। ঝাউবন, লাল কাঁকড়ার সৈকত এবং সামুদ্রিক কাছিমের সংরক্ষিত তীর ঘুরে দেখা।'
        },
        afternoon: {
          en: 'Pitch beach camp under the casuarina trees, swim in unspoiled waters, and visit Najirartek Dried Fish Hub on the return estuary crossing.',
          bn: 'ঝাউবনের পাশে বিচ ক্যাম্পিং, স্বচ্ছ পানিতে গোসল এবং ফেরার পথে নাজিরারটেক শুঁটকি মহাল পরিদর্শন।'
        },
        evening: {
          en: 'Starry-sky campfire experience by the bay (with local guide coordination) or evening return to Cox’s Bazar town.',
          bn: 'তারায় ভরা আকাশের নিচে ক্যাম্পফায়ার অভিজ্ঞতা অথবা সন্ধ্যায় কক্সবাজার শহরে প্রত্যাবর্তন।'
        }
      }
    ]
  },

  '3_family': {
    title: {
      en: '3-Day Complete Family Comfort & Sightseeing Holiday',
      bn: '৩ দিনের সম্পূর্ণ পারিবারিক অবকাশ ও দর্শনীয় স্থান ভ্রমণ'
    },
    summary: {
      en: 'Day 1: Laboni & Aquarium • Day 2: Marine Drive, Himchari & Inani • Day 3: Moheshkhali & Ramu',
      bn: '১ম দিন: লাবণী ও অ্যাকোয়ারিয়াম • ২য় দিন: মেরিন ড্রাইভ ও ইনানী • ৩য় দিন: মহেশখালী ও রামু'
    },
    estBudgetBDT: [7500, 13500],
    days: [
      {
        dayNumber: 1,
        headline: {
          en: 'Day 1: Beachfront Check-in, Radiant Fish World & Laboni Sunset',
          bn: '১ম দিন: সৈকত সংলগ্ন হোটেলে চেক-ইন, অ্যাকোয়ারিয়াম ও লাবণী সূর্যাস্ত'
        },
        morning: {
          en: 'Arrive and check in at Hotel Sea Crown or Hotel Kollol. Enjoy complimentary breakfast and relax by the beach or hotel swimming pool.',
          bn: 'হোটেল সী ক্রাউন বা কল্লোলে চেক-ইন। সকালের নাস্তা শেষে সুইমিং পুল বা সুগন্ধা সৈকতে বিশ্রাম।'
        },
        afternoon: {
          en: 'Take the family to Radiant Fish World in Jhautola to walk through the underwater shark & ray glass tunnel.',
          bn: 'পরিবারসহ ঝাউতলার রেডিয়েন্ট ফিশ ওয়ার্ল্ডের আন্ডারওয়াটার গ্লাস টানেল পরিদর্শন।'
        },
        evening: {
          en: 'Sunset beach walk at Laboni Point followed by fresh seafood dinner at Kasundi Restaurant.',
          bn: 'লাবণী পয়েন্টে সূর্যাস্ত উপভোগ এবং কাসুন্দি রেস্তোরাঁয় সি-ফুড ডিনার।'
        }
      },
      {
        dayNumber: 2,
        headline: {
          en: 'Day 2: Scenic Marine Drive Cruise to Himchari & Inani Beach',
          bn: '২য় দিন: চান্দের গাণিতে মেরিন ড্রাইভ, হিমছড়ি ও ইনানী সৈকত'
        },
        morning: {
          en: 'Reserve a family Chander Gari jeep (1,500–2,000 BDT) and drive 18 km south to Himchari National Park waterfalls.',
          bn: 'পরিবারের জন্য চান্দের গাড়ি রিজার্ভ (১,৫০০-২,০০০ টাকা) করে হিমছড়ি ঝর্ণা ও পাহাড় দর্শন।'
        },
        afternoon: {
          en: 'Continue to Inani Beach (32 km mark) for calm family wading among the coral stones and coconut water refreshments.',
          bn: 'ইনানী সৈকতের প্রবাল পাথর ঘেরা শান্ত তীরে সময় কাটানো ও ডাবের পানি পান।'
        },
        evening: {
          en: 'Return before sunset for rooftop hill-view dining at Prime Park Hotel.',
          bn: 'সূর্যাস্তের আগে শহরে ফিরে প্রাইম পার্ক হোটেলের রুফটপ রেস্টুরেন্টে ডিনার।'
        }
      },
      {
        dayNumber: 3,
        headline: {
          en: 'Day 3: 100-Feet Buddha in Ramu & Burmese Market Souvenirs',
          bn: '৩য় দিন: রামুর ১০০ ফুট বুদ্ধ মূর্তি ও বার্মিজ মার্কেটে কেনাকাটা'
        },
        morning: {
          en: 'Hire a reserved CNG (400–500 BDT, 40 mins) to Ramu to visit the tranquil Bhuban Shanti 100-Foot Reclining Buddha and monasteries.',
          bn: 'রিজার্ভ সিএনজিতে (৪০০-৫০০ টাকা) রামুর ভুবন শান্তি ১০০ ফুট সিংহশয্যা বুদ্ধ মূর্তি ও বৌদ্ধ বিহার ভ্রমণ।'
        },
        afternoon: {
          en: 'Optional speedboat excursion to Moheshkhali Island from Kasturi Ghat or relax at Kolatoli Beach.',
          bn: 'কস্তুরাঘাট থেকে মহেশখালী দ্বীপ ভ্রমণ অথবা কলাতলী সৈকতে বিশ্রাম।'
        },
        evening: {
          en: 'Shop for Rakhine handwoven textiles, Burmese pickles, and shell crafts before departure.',
          bn: 'বার্মিজ মার্কেটে রাখাইন তাঁতের কাপড় ও আচার কেনাকাটা শেষে প্রস্থান।'
        }
      }
    ]
  },

  '3_budget': {
    title: {
      en: '3-Day Best-Value Budget Coastal & Heritage Loop',
      bn: '৩ দিনের সাশ্রয়ী বাজেট কক্সবাজার ও ঐতিহ্য ভ্রমণ'
    },
    summary: {
      en: 'Day 1: Town Beaches & Eco Park • Day 2: Shared Marine Drive • Day 3: Moheshkhali & Ramu',
      bn: '১ম দিন: সৈকত ও ইকো পার্ক • ২য় দিন: মেরিন ড্রাইভ • ৩য় দিন: মহেশখালী ও রামু'
    },
    estBudgetBDT: [3500, 5800],
    days: [
      {
        dayNumber: 1,
        headline: {
          en: 'Day 1: Sugandha, Laboni & Kolatoli Eco Park via 10-BDT Tomtoms',
          bn: '১ম দিন: ১০ টাকার টমটমে সুগন্ধা, লাবণী ও কলাতলী ইকো পার্ক'
        },
        morning: {
          en: 'Check in at Nisanah Resort (1,500 BDT) or White Orchid. Use 10–15 BDT shared Tomtoms to hop between Kalatali, Sugandha, and Laboni beaches.',
          bn: 'নিসানাহ রিসোর্টে চেক-ইন। ১০-১৫ টাকা শেয়ারড টমটমে কলাতলী, সুগন্ধা ও লাবণী সৈকত ভ্রমণ।'
        },
        afternoon: {
          en: 'Trek the scenic hillside paths of Kolatoli Eco Park and visit Najirartek Dried Fish Hub.',
          bn: 'বিকেলে কলাতলী ইকো পার্কে ট্রেকিং এবং নাজিরারটেক শুঁটকি পল্লী পরিদর্শন।'
        },
        evening: {
          en: 'Street-side grilled fish &crab fry at Sugandha Point.',
          bn: 'সন্ধ্যায় সুগন্ধা পয়েন্টে তাজা ফিশ ফ্রাই উপভোগ।'
        }
      },
      {
        dayNumber: 2,
        headline: {
          en: 'Day 2: Group Chander Gari to Himchari, Inani & Shamlapur',
          bn: '২য় দিন: গ্রুপ চান্দের গাণিতে হিমছড়ি, ইনানী ও শামলাপুর'
        },
        morning: {
          en: 'Split a Chander Gari jeep (1,500 BDT divided among 10 passengers = ~150 BDT each) from Dolphin Mor down Marine Drive.',
          bn: 'ডলফিন মোড় থেকে ১০ জন মিলে শেয়ারে চান্দের গাড়ি (জনপ্রতি ~১৫০ টাকা) নিয়ে মেরিন ড্রাইভ যাত্রা।'
        },
        afternoon: {
          en: 'Stop at Himchari National Park and spend the afternoon on the free public coral shores of Inani Beach.',
          bn: 'হিমছড়ি ঝর্ণা এবং ইনানী প্রবাল সৈকতে দুপুর ও বিকেল কাটানো।'
        },
        evening: {
          en: 'Catch sunset at Shamlapur Sampan beach and return to Kalatali.',
          bn: 'শামলাপুরে সাম্পান ঘাটে সূর্যাস্ত দেখে কলাতলীতে ফেরা।'
        }
      },
      {
        dayNumber: 3,
        headline: {
          en: 'Day 3: 80-BDT Moheshkhali Speedboat & Ramu Heritage',
          bn: '৩য় দিন: ৮০ টাকায় মহেশখালী স্পিডবোট ও রামু ভ্রমণ'
        },
        morning: {
          en: 'Ride the 80–100 BDT passenger speedboat from Kasturi Ghat to Moheshkhali Island and walk the jetty bridge to Adinath Temple.',
          bn: 'কস্তুরাঘাট থেকে ৮০-১০০ টাকায় স্পিডবোটে মহেশখালী দ্বীপ ও আদিনাথ মন্দির দর্শন।'
        },
        afternoon: {
          en: 'Take a local bus or shared CNG east to Ramu to see the 100-Foot Reclining Buddha free of charge.',
          bn: 'বিকেলে রামুর ১০০ ফুট সিংহশয্যা বুদ্ধ মূর্তি পরিদর্শন।'
        },
        evening: {
          en: 'Evening departure from Cox’s Bazar Iconic Railway Station or bus terminal.',
          bn: 'সন্ধ্যায় কক্সবাজার আইকনিক রেলস্টেশন বা বাস টার্মিনাল থেকে প্রস্থান।'
        }
      }
    ]
  },

  // ======================= 5 DAYS ITINERARIES =======================
  '5_family': {
    title: {
      en: '5-Day Grand Coastal & Island Family Vacation',
      bn: '৫ দিনের গ্র্যান্ড পারিবারিক কক্সবাজার ও দ্বীপ ভ্রমণ'
    },
    summary: {
      en: 'Covers Laboni, Aquarium, Himchari, Inani, Moheshkhali, Ramu & Shamlapur at a relaxed family pace',
      bn: 'পরিবারের সবাইকে নিয়ে ধীরস্থিরভাবে সৈকত, অ্যাকোয়ারিয়াম, হিমছড়ি, ইনানী, মহেশখালী ও রামু ভ্রমণ'
    },
    estBudgetBDT: [14000, 25000],
    days: [
      {
        dayNumber: 1,
        headline: { en: 'Day 1: Arrival, Sugandha Beachfront & Sunset Promenade', bn: '১ম দিন: আগমন, সুগন্ধা সৈকত ও সূর্যাস্ত উপভোগ' },
        morning: { en: 'Check in at Hotel Sea Crown or Hotel Kollol. Unwind after travel with ocean-view breakfast.', bn: 'হোটেল সী ক্রাউন বা কল্লোলে চেক-ইন এবং সমুদ্রের দৃশ্যসহ সকালের নাস্তা।' },
        afternoon: { en: 'Relax by the hotel pool and enjoy a traditional Bangladeshi seafood lunch.', bn: 'হোটেলের সুইমিং পুলে বিশ্রাম এবং দুপুরে সামুদ্রিক মাছের লাঞ্চ।' },
        evening: { en: 'Leisurely family stroll along Laboni & Sugandha beaches at sunset.', bn: 'সন্ধ্যায় লাবণী ও সুগন্ধা সৈকতে পরিবারের সাথে ভ্রমণ।' }
      },
      {
        dayNumber: 2,
        headline: { en: 'Day 2: Marine Drive Excursion to Himchari & Inani Coral Beach', bn: '২য় দিন: মেরিন ড্রাইভ ধরে হিমছড়ি ও ইনানী সৈকত অভিযান' },
        morning: { en: 'Hire a reserved Chander Gari (1,500–2,000 BDT) along Marine Drive to Himchari National Park.', bn: 'রিজার্ভ চান্দের গাণিতে মেরিন ড্রাইভ হয়ে হিমছড়ি জাতীয় উদ্যান ভ্রমণ।' },
        afternoon: { en: 'Spend the afternoon at Inani Beach exploring calm coral-stone tidal pools.', bn: 'ইনানী সৈকতের প্রবাল পাথর ও শান্ত পানিতে দুপুর কাটানো।' },
        evening: { en: 'Stop at Shamlapur Sunset Point before returning to town for dinner.', bn: 'শামলাপুর সানসেট পয়েন্টে গোধূলি দেখে শহরে ফেরা।' }
      },
      {
        dayNumber: 3,
        headline: { en: 'Day 3: Moheshkhali Island Speedboat & Adinath Temple', bn: '৩য় দিন: স্পিডবোটে মহেশখালী দ্বীপ ও আদিনাথ মন্দির' },
        morning: { en: 'Take a 35-min speedboat from Kasturi Ghat (80–100 BDT/person) to Moheshkhali Island.', bn: 'কস্তুরাঘাট থেকে স্পিডবোটে (৮০-১০০ টাকা) মহেশখালী দ্বীপে যাত্রা।' },
        afternoon: { en: 'Visit Adinath Temple on Mainak Hill, Rakhine Buddhist pagodas, and coastal salt pans.', bn: 'মৈনাক পাহাড়ে আদিনাথ মন্দির, বৌদ্ধ প্যাগোডা ও লবণের মাঠ পরিদর্শন।' },
        evening: { en: 'Visit Radiant Fish World aquarium in Jhautola town center.', bn: 'সন্ধ্যায় ঝাউতলার রেডিয়েন্ট ফিশ ওয়ার্ল্ড অ্যাকোয়ারিয়াম ভ্রমণ।' }
      },
      {
        dayNumber: 4,
        headline: { en: 'Day 4: 100-Feet Buddha in Ramu & Kolatoli Eco Park', bn: '৪র্থ দিন: রামুর ১০০ ফুট বুদ্ধ মূর্তি ও কলাতলী ইকো পার্ক' },
        morning: { en: 'Reserved CNG trip (400–500 BDT) 16 km east to Ramu’s 100-Foot Reclining Buddha & historic monasteries.', bn: 'রিজার্ভ সিএনজিতে (৪০০-৫০০ টাকা) রামুর ১০০ ফুট বুদ্ধ মূর্তি ও প্রাচীন বিহার দর্শন।' },
        afternoon: { en: 'Gentle nature walk at Kolatoli Eco Park and rooftop lunch at Prime Park Hotel.', bn: 'কলাতলী ইকো পার্কে প্রকৃতি দর্শন এবং প্রাইম পার্ক হোটেলে রুফটপ লাঞ্চ।' },
        evening: { en: 'Souvenir shopping at Burmese Market & Rakhine stalls.', bn: 'বার্মিজ মার্কেটে কেনাকাটা।' }
      },
      {
        dayNumber: 5,
        headline: { en: 'Day 5: Najirartek Dried Fish Hub & Farewell Beach Morning', bn: '৫ম দিন: নাজিরারটেক শুঁটকি মহাল ও বিদায় বেলা' },
        morning: { en: 'Morning visit to Najirartek Dried Fish Hub to buy authentic chemical-free dried fish.', bn: 'সকালে নাজিরারটেক শুঁটকি মহাল থেকে খাঁটি শুঁটকি কেনাকাটা।' },
        afternoon: { en: 'Final dip at Laboni Beach and check-out preparation.', bn: 'লাবণী সৈকতে শেষ মুহূর্তের ভ্রমণ ও হোটেল চেক-আউট।' },
        evening: { en: 'Smooth transfer via Tomtom/CNG to Airport, Iconic Railway Station, or Dolphin Mor.', bn: 'বিমানবন্দর, রেলস্টেশন বা ডলফিন মোড় থেকে প্রস্থান।' }
      }
    ]
  },

  '5_adventure': {
    title: {
      en: '5-Day Ultimate Explorer: Hills, Islands, Camping & Marine Drive',
      bn: '৫ দিনের আল্টিমেট অ্যাডভেঞ্চার: পাহাড়, দ্বীপ, ক্যাম্পিং ও মেরিন ড্রাইভ'
    },
    summary: {
      en: 'Full 80-km Marine Drive, Himchari ridges, Inani, Moheshkhali, Ramu & overnight Sonadia Island camp',
      bn: 'হিমছড়ি ট্রেকিং, ইনানী, মহেশখালী, রামু এবং সোনাদিয়া দ্বীপে ক্যাম্পিংয়ের পূর্ণাঙ্গ অভিযান'
    },
    estBudgetBDT: [9500, 16500],
    days: [
      {
        dayNumber: 1,
        headline: { en: 'Day 1: Kolatoli Eco Park Trekking & Darianagar Parasailing', bn: '১ম দিন: কলাতলী ইকো পার্ক ট্রেকিং ও প্যারাসেইলিং' },
        morning: { en: 'Base camp check-in at Kalatali Road. Trek the coastal hill ridges of Kolatoli Eco Park.', bn: 'কলাতলী রোডে চেক-ইন এবং কলাতলী ইকো পার্কের পাহাড়ি ট্রেইলে ট্রেকিং।' },
        afternoon: { en: 'Soar above the Bay of Bengal with parasailing at Darianagar beach.', bn: 'দরিয়ানগর সৈকতে প্যারাসেইলিং ও সমুদ্র অভিযান।' },
        evening: { en: 'Night beach walk from Sugandha to Laboni Point.', bn: 'সুগন্ধা থেকে লাবণী পয়েন্ট পর্যন্ত সান্ধ্যকালীন সৈকত পদযাত্রা।' }
      },
      {
        dayNumber: 2,
        headline: { en: 'Day 2: Full Marine Drive Jeep Safari: Himchari, Inani & Shamlapur', bn: '২য় দিন: মেরিন ড্রাইভ জিপ সাফারি: হিমছড়ি, ইনানী ও শামলাপুর' },
        morning: { en: 'Open-top Chander Gari expedition to Himchari National Park waterfalls and cliff ridges.', bn: 'চান্দের গাণিতে হিমছড়ি জাতীয় উদ্যানের পাহাড় ও ঝর্ণায় অভিযান।' },
        afternoon: { en: 'Explore Inani Coral Beach boulders and continue down Marine Drive to Shamlapur.', bn: 'ইনানী প্রবাল সৈকত ও মেরিন ড্রাইভ ধরে শামলাপুর যাত্রা।' },
        evening: { en: 'Photograph the iconic wooden Sampan fishing boats at Shamlapur Sunset Point.', bn: 'শামলাপুরে ঐতিহ্যবাহী সাম্পান নৌকার সাথে সূর্যাস্তের আলোকচিত্র গ্রহণ।' }
      },
      {
        dayNumber: 3,
        headline: { en: 'Day 3: Moheshkhali Island Speedboat & Mainak Hill Hike', bn: '৩য় দিন: স্পিডবোটে মহেশখালী দ্বীপ ও মৈনাক পাহাড় হাইকিং' },
        morning: { en: 'Speedboat from Kasturi Ghat (80–100 BDT) across the Bakkhali channel to Moheshkhali Island.', bn: 'কস্তুরাঘাট থেকে স্পিডবোটে বাঁকখালী চ্যানেল পেরিয়ে মহেশখালী দ্বীপে যাত্রা।' },
        afternoon: { en: 'Hike Mainak Hill to Adinath Temple and cycle/walk past salt pans & betel leaf farms.', bn: 'মৈনাক পাহাড়ের আদিনাথ মন্দির এবং লবণের মাঠ ও পান বরজ পরিদর্শন।' },
        evening: { en: 'Explore Radiant Fish World shark tunnel in Jhautola.', bn: 'সন্ধ্যায় ঝাউতলার রেডিয়েন্ট ফিশ ওয়ার্ল্ড পরিদর্শন।' }
      },
      {
        dayNumber: 4,
        headline: { en: 'Day 4: Sonadia Island Wilderness & Beach Camping', bn: '৪র্থ দিন: সোনাদিয়া দ্বীপে বন্যপ্রাণী দর্শন ও বিচ ক্যাম্পিং' },
        morning: { en: 'Boat expedition to isolated Sonadia Island. Trek through coastal mangroves and sand dunes.', bn: 'নৌযোগে নির্জন সোনাদিয়া দ্বীপে যাত্রা এবং প্যারাবন ও বালিয়াড়ি ট্র্যাকিং।' },
        afternoon: { en: 'Spot red ghost crabs and migratory shorebirds along the untouched crescent beach.', bn: 'লাল কাঁকড়া ও অতিথি পাখিদের বিচরণ ক্ষেত্র পরিদর্শন।' },
        evening: { en: 'Beachside tent camping under the stars with freshly grilled marine catch.', bn: 'রাতের তারার নিচে বিচ ক্যাম্পিং ও বারবিকিউ।' }
      },
      {
        dayNumber: 5,
        headline: { en: 'Day 5: Najirartek Estuary & 100-Feet Reclining Buddha at Ramu', bn: '৫ম দিন: নাজিরারটেক মোহনা ও রামুর ১০০ ফুট বুদ্ধ মূর্তি' },
        morning: { en: 'Return via the Bakkhali estuary stopping at the 200-acre Najirartek Dried Fish Hub.', bn: 'ফেরার পথে ২০০ একরের নাজিরারটেক শুঁটকি মহাল পরিদর্শন।' },
        afternoon: { en: 'CNG ride (400–500 BDT) 16 km east to Ramu’s 100-Foot Reclining Gautama Buddha statue.', bn: 'সিএনজিতে রামুর ১০০ ফুট সিংহশয্যা বুদ্ধ মূর্তি ও বৌদ্ধ বিহার ভ্রমণ।' },
        evening: { en: 'Final sunset at Laboni Point and evening departure.', bn: 'লাবণী পয়েন্টে শেষ সূর্যাস্ত দেখে প্রস্থান।' }
      }
    ]
  },

  '5_budget': {
    title: {
      en: '5-Day Backpacker’s Complete Cox’s Bazar on a Shoestring',
      bn: '৫ দিনের সাশ্রয়ী ব্যাকপ্যাকার্স সম্পূর্ণ কক্সবাজার প্ল্যান'
    },
    summary: {
      en: 'All 9+ major beaches, islands, temples & hidden gems using shared local Tomtoms & boats',
      bn: 'শেয়ারড টমটম, লোকাল বোট ও কটেজে থেকে স্বল্প খরচে পুরো কক্সবাজার ভ্রমণ'
    },
    estBudgetBDT: [6000, 9500],
    days: [
      {
        dayNumber: 1,
        headline: { en: 'Day 1: Cottage Check-in & 10-BDT Beach Hopping', bn: '১ম দিন: ইকো কটেজে চেক-ইন ও ১০ টাকার টমটমে সৈকত ভ্রমণ' },
        morning: { en: 'Check in at Nisanah Resort (1,500 BDT/night) near Kolatoli Eco Park.', bn: 'কলাতলী ইকো পার্কের কাছে নিসানাহ রিসোর্টে সাশ্রয়ী চেক-ইন।' },
        afternoon: { en: 'Use 10–15 BDT shared Tomtoms to explore Kalatali, Sugandha, and Laboni beaches.', bn: '১০-১৫ টাকার শেয়ারড টমটমে কলাতলী, সুগন্ধা ও লাবণী সৈকত ভ্রমণ।' },
        evening: { en: 'Sunset watching and budget local seafood dinner at Jhautola.', bn: 'সৈকতে সূর্যাস্ত ও ঝাউতলায় সাশ্রয়ী সামুদ্রিক খাবারের ডিনার।' }
      },
      {
        dayNumber: 2,
        headline: { en: 'Day 2: Kolatoli Eco Park Trek & Himchari Cliffs', bn: '২য় দিন: কলাতলী ইকো পার্ক ট্রেকিং ও হিমছড়ি পাহাড়' },
        morning: { en: 'Morning hike through the free forest trails of Kolatoli Eco Park.', bn: 'সকালে কলাতলী ইকো পার্কের পাহাড়ি ট্রেইলে হাঁটাহাঁটি।' },
        afternoon: { en: 'Shared local ride along Marine Drive to Himchari National Park & Waterfall.', bn: 'মেরিন ড্রাইভ ধরে হিমছড়ি জাতীয় উদ্যান ও ঝর্ণা পরিদর্শন।' },
        evening: { en: 'Evening tea and Burmese Market window shopping in town.', bn: 'সন্ধ্যায় বার্মিজ মার্কেট ঘুরে দেখা।' }
      },
      {
        dayNumber: 3,
        headline: { en: 'Day 3: Inani Coral Beach & Shamlapur Sampan Sunset', bn: '৩য় দিন: ইনানী প্রবাল সৈকত ও শামলাপুর সাম্পান ঘাট' },
        morning: { en: 'Board a shared group Chander Gari from Dolphin Mor to Inani Beach.', bn: 'ডলফিন মোড় থেকে শেয়ারড চান্দের গাণিতে ইনানী সৈকতে যাত্রা।' },
        afternoon: { en: 'Walk the 18-km coral-stone coastline of Inani and relax under casuarina trees.', bn: 'ইনানীর প্রবাল পাথরের তীরে ও ঝাউবনে দুপুর কাটানো।' },
        evening: { en: 'Visit Shamlapur Sunset Point to see traditional wooden Sampan boats before dusk.', bn: 'শামলাপুরে ঐতিহ্যবাহী সাম্পান নৌকা ও সূর্যাস্ত দর্শন।' }
      },
      {
        dayNumber: 4,
        headline: { en: 'Day 4: Moheshkhali Island & Sonadia Estuary', bn: '৪র্থ দিন: মহেশখালী দ্বীপ ও সোনাদিয়া মোহনা' },
        morning: { en: 'Take the 80–100 BDT passenger speedboat from Kasturi Ghat to Moheshkhali Island.', bn: 'কস্তুরাঘাট থেকে ৮০-১০০ টাকায় স্পিডবোটে মহেশখালী দ্বীপ যাত্রা।' },
        afternoon: { en: 'Walk the jetty bridge, climb Mainak Hill to Adinath Temple, and see local salt pans.', bn: 'মহেশখালী জেটি ব্রিজ, আদিনাথ মন্দির ও লবণের মাঠ পরিদর্শন।' },
        evening: { en: 'Return to Kasturi Ghat and visit Najirartek Dried Fish Hub at the river mouth.', bn: 'বিকেলে নাজিরারটেক শুঁটকি মহাল পরিদর্শন।' }
      },
      {
        dayNumber: 5,
        headline: { en: 'Day 5: 100-Feet Buddha in Ramu & Departure', bn: '৫ম দিন: রামুর ১০০ ফুট বুদ্ধ মূর্তি ও প্রস্থান' },
        morning: { en: 'Shared CNG/local bus 16 km east to Ramu’s 100-Foot Reclining Buddha & wooden Khyangs.', bn: 'রামুর ১০০ ফুট সিংহশয্যা বুদ্ধ মূর্তি ও প্রাচীন কাঠের বৌদ্ধ বিহার দর্শন।' },
        afternoon: { en: 'Pick up dried fish and local snacks in town.', bn: 'শহর থেকে শুঁটকি ও আচার সংগ্রহ।' },
        evening: { en: 'Depart via Cox’s Bazar Iconic Railway Station or Dolphin Mor bus stand.', bn: 'কক্সবাজার রেলস্টেশন বা বাস টার্মিনাল থেকে ফিরতি যাত্রা।' }
      }
    ]
  }
};

/* --------------------------------------------------------------------------
 * 4. ITINERARY BUILDER UI & RENDERING LOGIC
 * -------------------------------------------------------------------------- */
function selectItineraryDays(days) {
  FeaturesState.selectedDays = String(days);
  renderItineraryControls();
}

function selectItineraryStyle(style) {
  FeaturesState.selectedStyle = style;
  renderItineraryControls();
}

function handleGenerateItinerary(e) {
  if (e) e.preventDefault();
  renderItineraryTimeline(true);
}

function renderItineraryControls() {
  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';

  // Update Trip Length Buttons
  document.querySelectorAll('[data-itin-days]').forEach(btn => {
    const val = btn.getAttribute('data-itin-days');
    const isActive = FeaturesState.selectedDays === val;
    btn.className = `flex-1 py-3 px-4 rounded-2xl text-sm font-bold border transition-all ${
      isActive
        ? 'bg-sky-700 text-white border-sky-700 shadow-md shadow-sky-900/15'
        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-sky-50'
    }`;
  });

  // Update Travel Style Buttons
  document.querySelectorAll('[data-itin-style]').forEach(btn => {
    const val = btn.getAttribute('data-itin-style');
    const isActive = FeaturesState.selectedStyle === val;
    btn.className = `flex-1 py-3 px-4 rounded-2xl text-sm font-bold border transition-all ${
      isActive
        ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-900/15'
        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-teal-50'
    }`;
  });

  // Translate static labels if needed
  const labels = {
    en: {
      eyebrow: 'SMART TRIP PLANNER',
      title: 'Custom Cox’s Bazar Itinerary Builder',
      subtitle: 'Select your trip length and travel style to generate a tailored day-by-day Morning, Afternoon, and Evening plan.',
      lengthLabel: '1. Select Trip Length',
      styleLabel: '2. Choose Travel Style',
      days2: '2 Days',
      days3: '3 Days',
      days5: '5 Days',
      styleFamily: 'Family & Relaxing',
      styleAdventure: 'Adventure',
      styleBudget: 'Budget',
      generateBtn: 'Generate My Itinerary'
    },
    bn: {
      eyebrow: 'স্মার্ট ট্রিপ প্ল্যানার',
      title: 'কাস্টম কক্সবাজার ভ্রমণ প্ল্যানার (Itinerary Builder)',
      subtitle: 'আপনার ভ্রমণের দিন সংখ্যা এবং ধরন নির্বাচন করে সকাল, দুপুর ও সন্ধ্যার পূর্ণাঙ্গ ভ্রমণ রুটিন তৈরি করুন।',
      lengthLabel: '১. ভ্রমণের মেয়াদ নির্বাচন করুন',
      styleLabel: '২. ভ্রমণের ধরন বেছে নিন',
      days2: '২ দিন',
      days3: '৩ দিন',
      days5: '৫ দিন',
      styleFamily: 'পরিবার ও আরামদায়ক',
      styleAdventure: 'অ্যাডভেঞ্চার',
      styleBudget: 'সাশ্রয়ী বাজেট',
      generateBtn: 'আমার ভ্রমণ প্ল্যান তৈরি করুন'
    }
  }[lang];

  const setTxt = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };

  setTxt('itin-eyebrow', labels.eyebrow);
  setTxt('itin-title', labels.title);
  setTxt('itin-subtitle', labels.subtitle);
  setTxt('itin-length-label', labels.lengthLabel);
  setTxt('itin-style-label', labels.styleLabel);
  setTxt('itin-btn-2d', labels.days2);
  setTxt('itin-btn-3d', labels.days3);
  setTxt('itin-btn-5d', labels.days5);
  setTxt('itin-btn-family', labels.styleFamily);
  setTxt('itin-btn-adventure', labels.styleAdventure);
  setTxt('itin-btn-budget', labels.styleBudget);
  setTxt('itin-generate-btn-text', labels.generateBtn);

  // Also translate Map section header & Navbar links
  document.querySelectorAll('[data-nav="map"]').forEach(el => {
    el.textContent = lang === 'en' ? 'Interactive Map' : 'ম্যাপ';
  });
  document.querySelectorAll('[data-nav="itinerary"]').forEach(el => {
    el.textContent = lang === 'en' ? 'Itinerary' : 'ভ্রমণ প্ল্যান';
  });

  setTxt(
    'map-eyebrow',
    lang === 'en' ? 'INTERACTIVE OPENSTREETMAP GUIDE' : 'ইন্টারঅ্যাক্টিভ ট্যুরিস্ট ম্যাপ (OpenStreetMap)'
  );
  setTxt(
    'map-title',
    lang === 'en' ? 'Explore Cox’s Bazar on the Map' : 'ম্যাপে কক্সবাজারের হোটেল, সৈকত ও ঘাট দেখুন'
  );
  setTxt(
    'map-subtitle',
    lang === 'en'
      ? 'Click any marker or card to view verified hotels, sightseeing spots, and transport hubs across Cox’s Bazar.'
      : 'যেকোনো পিন বা কার্ডে ক্লিক করে হোটেল, দর্শনীয় স্থান এবং যাতায়াত ঘাটের অবস্থান ও তথ্য দেখুন।'
  );
}

function renderItineraryTimeline(animateScroll) {
  const container = document.getElementById('itinerary-output-container');
  if (!container) return;

  const lang = typeof AppState !== 'undefined' ? AppState.lang : 'en';
  const key = `${FeaturesState.selectedDays}_${FeaturesState.selectedStyle}`;
  const plan = ITINERARY_DATABASE[key] || ITINERARY_DATABASE['2_family'];

  const budgetStr =
    typeof formatPriceRange === 'function'
      ? formatPriceRange(plan.estBudgetBDT[0], plan.estBudgetBDT[1])
      : `${plan.estBudgetBDT[0]} - ${plan.estBudgetBDT[1]} BDT`;

  const slotLabels = {
    en: { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening', budget: 'Est. Per-Person Budget' },
    bn: { morning: 'সকাল (Morning)', afternoon: 'দুপুর ও বিকেল (Afternoon)', evening: 'সন্ধ্যা ও রাত (Evening)', budget: 'আনুমানিক জনপ্রতি খরচ' }
  }[lang];

  const daysHTML = plan.days
    .map(
      (d, idx) => `
      <div
        class="itinerary-day-card relative pl-8 sm:pl-12 pb-10 last:pb-0"
        style="animation-delay: ${idx * 90}ms;"
      >
        <!-- Vertical Timeline Line -->
        <div class="absolute left-3.5 sm:left-5 top-3 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 via-teal-500 to-slate-200 last:hidden"></div>

        <!-- Day Badge Node -->
        <div class="absolute left-0 sm:left-1.5 top-1 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-ocean-950 text-amber-300 font-extrabold text-xs sm:text-sm flex items-center justify-center shadow-md ring-4 ring-sand-50">
          ${d.dayNumber}
        </div>

        <!-- Day Card -->
        <div class="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition">
          <div class="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
            <h4 class="text-lg sm:text-xl font-extrabold text-slate-900">
              ${d.headline[lang]}
            </h4>
            <span class="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
              ${lang === 'en' ? `Day ${d.dayNumber} of ${plan.days.length}` : `দিন ${d.dayNumber} / ${plan.days.length}`}
            </span>
          </div>

          <!-- Morning / Afternoon / Evening 3-Column Timeline Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Morning -->
            <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70">
              <div class="flex items-center gap-2 text-amber-800 font-extrabold text-xs uppercase tracking-wider mb-2">
                <span>☀</span>
                <span>${slotLabels.morning}</span>
              </div>
              <p class="text-slate-700 text-xs sm:text-sm leading-relaxed">${d.morning[lang]}</p>
            </div>

            <!-- Afternoon -->
            <div class="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/70">
              <div class="flex items-center gap-2 text-sky-800 font-extrabold text-xs uppercase tracking-wider mb-2">
                <span>🌊</span>
                <span>${slotLabels.afternoon}</span>
              </div>
              <p class="text-slate-700 text-xs sm:text-sm leading-relaxed">${d.afternoon[lang]}</p>
            </div>

            <!-- Evening -->
            <div class="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/70">
              <div class="flex items-center gap-2 text-indigo-900 font-extrabold text-xs uppercase tracking-wider mb-2">
                <span>🌙</span>
                <span>${slotLabels.evening}</span>
              </div>
              <p class="text-slate-700 text-xs sm:text-sm leading-relaxed">${d.evening[lang]}</p>
            </div>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <!-- Plan Summary Banner -->
    <div class="mb-8 rounded-3xl bg-gradient-to-r from-ocean-950 via-sky-900 to-teal-900 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <span class="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-widest bg-teal-400/20 text-teal-200 border border-teal-300/30 mb-2">
          ✓ ${lang === 'en' ? 'TAILORED ITINERARY READY' : 'আপনার কাস্টম ভ্রমণ রুটিন প্রস্তুত'}
        </span>
        <h3 class="font-display text-2xl sm:text-3xl font-extrabold text-white">${plan.title[lang]}</h3>
        <p class="text-sky-200 text-sm mt-1.5 font-medium">${plan.summary[lang]}</p>
      </div>
      <div class="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-4 text-left md:text-right shrink-0">
        <span class="block text-xs text-sky-200 uppercase font-bold tracking-wider">${slotLabels.budget}</span>
        <span class="text-xl sm:text-2xl font-extrabold text-amber-300 mt-0.5 block">${budgetStr}</span>
      </div>
    </div>

    <!-- Vertical Day-by-Day Timeline -->
    <div class="mt-4">
      ${daysHTML}
    </div>
  `;

  if (animateScroll) {
    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* --------------------------------------------------------------------------
 * 5. HOOK INTO GLOBAL RENDER & INITIALIZATION
 * -------------------------------------------------------------------------- */
function renderInteractiveFeatures() {
  renderItineraryControls();
  renderItineraryTimeline(false);
  if (!FeaturesState.mapInstance) {
    initTouristMap();
  }
  renderMapMarkersAndFilters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initTouristMap();
    renderInteractiveFeatures();
  });
} else {
  initTouristMap();
  renderInteractiveFeatures();
}
