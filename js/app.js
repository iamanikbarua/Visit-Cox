/**
 * ============================================================================
 * Visit Cox's Bazar - Main Application Controller (app.js)
 * ============================================================================
 * Handles:
 *  1. Dual Language Switching (English 'en' <-> Bengali 'bn')
 *  2. Real-time Currency Conversion (BDT ৳ <-> USD $)
 *  3. Sticky Navbar, Smooth Scroll & Mobile Drawer Navigation
 *  4. Dynamic Rendering of Hotels, Sightseeing, Hidden Gems, Transport & Info
 *  5. Hero Quick Search & Live Category/Location Filtering
 *  6. Interactive FAQ Accordion
 *  7. Floating Chatbot ("Cox's Bazar Travel Assistant"), keyword-matched answers from data.js
 */

// Storage can throw (blocked/private mode) or hold stale values: read through a whitelist.
function readPref(key, allowed, fallback) {
  try {
    const v = localStorage.getItem(key);
    return allowed.includes(v) ? v : fallback;
  } catch (e) {
    return fallback;
  }
}

function savePref(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    /* storage unavailable: the choice lasts for this page view only */
  }
}

function escapeHTML(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const AppState = {
  lang: readPref('visit_cox_lang', ['en', 'bn'], CONFIG.defaultLang),
  currency: readPref('visit_cox_currency', ['BDT', 'USD'], CONFIG.defaultCurrency),
  hotelFilter: 'ALL',            // Legacy spot filter alias
  hotelStarFilter: 'ALL',        // 'ALL' | 5 | 4 | 3 | 2
  hotelPriceFilter: 'ALL',       // 'ALL' | 'budget' | 'mid' | 'luxury'
  hotelSpotFilter: 'ALL',        // 'ALL' | 'kolatoli' | 'inani' | 'pecharthal' | 'sugandha' | 'laboni'
  hotelFacilityFilter: 'ALL',    // 'ALL' | 'pool' | 'beachfront' | 'breakfast' | 'spa' | 'gym'
  hotelSortBy: 'recommended',    // 'recommended' | 'price-asc' | 'price-desc' | 'stars-desc'
  searchQuery: '',
  searchCategory: 'all',
  activityFilter: 'all',
  activeFaqId: 'faq-1',
  isChatOpen: false,
  isMobileMenuOpen: false
};

/* --------------------------------------------------------------------------
 * CURRENCY CONVERSION & FORMATTING HELPERS
 * -------------------------------------------------------------------------- */
function convertValueToUSD(bdtAmount) {
  const raw = bdtAmount / CONFIG.exchangeRateUSD;
  if (raw < 1) {
    return raw.toFixed(2);
  }
  return Math.round(raw).toLocaleString('en-US');
}

// Place photo credit from PHOTO_CREDITS (js/data.js): author, licence, and which place a reused photo shows.
function photoCreditHTML(item, cls) {
  const c = typeof PHOTO_CREDITS !== 'undefined' && PHOTO_CREDITS[item.image];
  if (!c) return '<span></span>';
  const en = AppState.lang === 'en';
  const note = c.ofIds.includes(item.id) ? '' : (en ? `Photo shows ${c.shows.en}. ` : `ছবিতে: ${c.shows.bn}। `);
  const link = (href, text) => `<a href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer" class="underline">${escapeHTML(text)}</a>`;
  return `<span class="${cls}">${escapeHTML(`${note}${en ? 'Photo' : 'ছবি'}: `)}${link(c.url, c.author)}, ${link(LICENSE_URLS[c.license], c.license)} (Wikimedia Commons)</span>`;
}

function formatNumber(num, lang) {
  if (lang === 'bn') {
    return num.toLocaleString('bn-BD');
  }
  return num.toLocaleString('en-US');
}

/**
 * Formats a min-max BDT range into either BDT or USD string
 * Example BDT: "2,500 - 4,500 BDT" | Example USD: "$21 - $38 USD"
 */
function formatPriceRange(minBDT, maxBDT) {
  const isSingle = minBDT === maxBDT;

  if (AppState.currency === 'USD') {
    const minUSD = convertValueToUSD(minBDT);
    const maxUSD = convertValueToUSD(maxBDT);
    return isSingle ? `$${minUSD} USD` : `$${minUSD} - $${maxUSD} USD`;
  }

  // BDT Mode
  const minFormatted = formatNumber(minBDT, AppState.lang);
  const maxFormatted = formatNumber(maxBDT, AppState.lang);
  const suffix = AppState.lang === 'bn' ? 'টাকা (BDT)' : 'BDT';
  return isSingle
    ? `${minFormatted} ${suffix}`
    : `${minFormatted} - ${maxFormatted} ${suffix}`;
}

/* --------------------------------------------------------------------------
 * LANGUAGE & CURRENCY TOGGLE HANDLERS
 * -------------------------------------------------------------------------- */
function toggleLanguage(targetLang) {
  AppState.lang = targetLang === 'en' || targetLang === 'bn' ? targetLang : AppState.lang === 'en' ? 'bn' : 'en';
  savePref('visit_cox_lang', AppState.lang);
  document.documentElement.lang = AppState.lang;
  renderAll();
}

function toggleCurrency(targetCurr) {
  AppState.currency = targetCurr === 'BDT' || targetCurr === 'USD' ? targetCurr : AppState.currency === 'BDT' ? 'USD' : 'BDT';
  savePref('visit_cox_currency', AppState.currency);
  renderAll();
}

/* --------------------------------------------------------------------------
 * RENDER UI TEXT & CONTROLS
 * -------------------------------------------------------------------------- */
function updateToggleButtons() {
  const isEN = AppState.lang === 'en';
  const isBDT = AppState.currency === 'BDT';

  // Desktop & Mobile Language Toggle Pills. Headers and drawers are cream: charcoal/stone-600 keep >= 4.5:1.
  document.querySelectorAll('[data-lang-btn="en"]').forEach(el => {
    el.className = isEN
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-charcoal text-white transition whitespace-nowrap cursor-pointer'
      : 'px-2.5 py-1 rounded-full text-xs font-semibold text-stone-600 hover:text-charcoal transition whitespace-nowrap cursor-pointer';
  });
  document.querySelectorAll('[data-lang-btn="bn"]').forEach(el => {
    el.className = !isEN
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-charcoal text-white transition whitespace-nowrap cursor-pointer'
      : 'px-2.5 py-1 rounded-full text-xs font-semibold text-stone-600 hover:text-charcoal transition whitespace-nowrap cursor-pointer';
  });

  // Desktop & Mobile Currency Toggle Pills (with whitespace-nowrap)
  document.querySelectorAll('[data-curr-btn="BDT"]').forEach(el => {
    el.className = isBDT
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-charcoal text-white transition whitespace-nowrap cursor-pointer'
      : 'px-2.5 py-1 rounded-full text-xs font-semibold text-stone-600 hover:text-charcoal transition whitespace-nowrap cursor-pointer';
  });
  document.querySelectorAll('[data-curr-btn="USD"]').forEach(el => {
    el.className = !isBDT
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-charcoal text-white transition whitespace-nowrap cursor-pointer'
      : 'px-2.5 py-1 rounded-full text-xs font-semibold text-stone-600 hover:text-charcoal transition whitespace-nowrap cursor-pointer';
  });
}

let heroActiveSlideIndex = 0;
let heroAutoSlideTimer = null;

const HERO_SCENES_META = [
  {
    en: { pill: '🌊 Laboni & Sugandha Beach', badge: '120 KM UNBROKEN NATURAL SEA BEACH • BAY OF BENGAL' },
    bn: { pill: '🌊 লাবণী ও সুগন্ধা সৈকত', badge: '১২০ কিমি অবিচ্ছিন্ন প্রাকৃতিক সমুদ্র সৈকত • বঙ্গোপসাগর' }
  },
  {
    en: { pill: '🪨 Inani Coral Beach', badge: 'INANI BEACH • ANCIENT CORAL BOULDERS & CRYSTAL WATERS' },
    bn: { pill: '🪨 ইনানী প্রবাল সৈকত', badge: 'ইনানী সমুদ্র সৈকত • প্রাচীন প্রবাল পাথর ও নীল জলরাশি' }
  },
  {
    en: { pill: '⛰️ Himchari Hills', badge: 'HIMCHARI NATIONAL PARK • COASTAL HILLS & WATERFALLS' },
    bn: { pill: '⛰️ হিমছড়ি পাহাড় ও ঝর্ণা', badge: 'হিমছড়ি জাতীয় উদ্যান • সবুজ পাহাড় ও প্রাকৃতিক ঝর্ণা' }
  },
  {
    en: { pill: '⛵ Marine Drive Sampans', badge: '80 KM MARINE DRIVE • TRADITIONAL SAMPAN BOATS AT SUNSET' },
    bn: { pill: '⛵ মেরিন ড্রাইভ ও সাম্পান', badge: '৮০ কিমি মেরিন ড্রাইভ • সূর্যাস্তে ঐতিহ্যবাহী সাম্পান নৌকা' }
  },
  {
    en: { pill: '🏝️ Moheshkhali Island', badge: 'MOHESHKHALI ISLAND • ADINATH TEMPLE & CHANNEL SPEEDBOATS' },
    bn: { pill: '🏝️ মহেশখালী দ্বীপ', badge: 'মহেশখালী দ্বীপ • মৈনাক পাহাড়ের আদিনাথ মন্দির ও স্পিডবোট' }
  }
];

function renderStaticText() {
  const t = UI_TEXT[AppState.lang];

  // Brand & Nav (Single-line brand name; tagline removed)
  setText('brand-name', t.brandName);
  document.querySelectorAll('[data-nav="home"]').forEach(el => (el.textContent = t.nav.home));
  document.querySelectorAll('[data-nav="hotels"]').forEach(el => (el.textContent = t.nav.hotels));
  document.querySelectorAll('[data-nav="destinations"]').forEach(el => (el.textContent = t.nav.destinations));
  document.querySelectorAll('[data-nav="activities"]').forEach(el => (el.textContent = t.nav.activities || (AppState.lang === 'bn' ? 'অ্যাক্টিভিটি' : 'Activities')));
  document.querySelectorAll('[data-nav="transport"]').forEach(el => (el.textContent = t.nav.transport));
  document.querySelectorAll('[data-nav="essentialInfo"]').forEach(el => (el.textContent = t.nav.essentialInfo));
  document.querySelectorAll('[data-nav="faq"]').forEach(el => (el.textContent = t.nav.faq));

  // Hero Section
  const currentHeroMeta = HERO_SCENES_META[heroActiveSlideIndex] || HERO_SCENES_META[0];
  setText('hero-badge', currentHeroMeta[AppState.lang].badge);
  setText('hero-title', t.hero.title);
  setText('hero-subtitle', t.hero.subtitle);
  setText('hero-cta-hotels', t.hero.ctaHotels);
  setText('hero-cta-spots', t.hero.ctaSpots);

  // Update Hero Scene Switcher Pill Labels
  document.querySelectorAll('[data-hero-pill]').forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-hero-pill'), 10);
    if (HERO_SCENES_META[idx]) {
      btn.textContent = HERO_SCENES_META[idx][AppState.lang].pill;
    }
  });

  const searchInput = document.getElementById('hero-search-input');
  if (searchInput) searchInput.placeholder = t.hero.searchPlaceholder;

  setText('search-opt-all', t.hero.searchCategoryAll);
  setText('search-opt-hotels', t.hero.searchCategoryHotels);
  setText('search-opt-spots', t.hero.searchCategorySpots);
  setText('search-opt-transport', t.hero.searchCategoryTransport);
  setText('hero-search-btn-text', t.hero.searchBtn);


  // Section Headers & Hotel Filter Hub
  setText('hotels-eyebrow', t.hotelsSection.eyebrow);
  setText('hotels-title', t.hotelsSection.title);
  setText('hotels-subtitle', t.hotelsSection.subtitle);
  setText('hotel-filter-hub-title', AppState.lang === 'bn' ? 'হোটেল ফিল্টার ও তুলনা' : 'Filter & Compare Accommodations');
  setText('hotel-filter-hub-subtitle', AppState.lang === 'bn' ? 'স্টার রেটিং (৫★, ৪★, ৩★), ভাড়া রেঞ্জ ও বিচ স্পট অনুযায়ী ফিল্টার করুন' : 'Filter hotels by star rating (5★, 4★, 3★), price range, and beach spot');
  setText('hotel-sort-label', t.hotelsSection.sortByLabel + ':');
  setText('hotel-star-filter-label', '⭐ ' + t.hotelsSection.filterStarLabel + ':');
  setText('hotel-price-filter-label', '💵 ' + t.hotelsSection.filterPriceLabel + ':');
  setText('hotel-spot-filter-label', '📍 ' + t.hotelsSection.filterSpotLabel + ':');
  setText('hotel-facility-filter-label', '✨ ' + t.hotelsSection.filterFacilityLabel + ':');
  setText('hotel-reset-filters-text', t.hotelsSection.resetFilters);

  const sortSelect = document.getElementById('hotel-sort-select');
  if (sortSelect) {
    const optRec = sortSelect.querySelector('option[value="recommended"]');
    const optLow = sortSelect.querySelector('option[value="price-asc"]');
    const optHigh = sortSelect.querySelector('option[value="price-desc"]');
    const optStars = sortSelect.querySelector('option[value="stars-desc"]');
    if (optRec) optRec.textContent = t.hotelsSection.sortRecommended;
    if (optLow) optLow.textContent = t.hotelsSection.sortPriceLow;
    if (optHigh) optHigh.textContent = t.hotelsSection.sortPriceHigh;
    if (optStars) optStars.textContent = t.hotelsSection.sortStarsHigh;
  }

  setText('destinations-eyebrow', t.destinationsSection.eyebrow);
  setText('destinations-title', t.destinationsSection.title);
  setText('destinations-subtitle', t.destinationsSection.subtitle);
  setText('hidden-gems-badge', t.destinationsSection.hiddenGemsBadge);
  setText('hidden-gems-title', t.destinationsSection.hiddenGemsTitle);
  setText('hidden-gems-subtitle', t.destinationsSection.hiddenGemsSubtitle);
  const gemsCounterEl = document.getElementById('gems-slider-counter');
  if (gemsCounterEl) {
    gemsCounterEl.textContent =
      AppState.lang === 'en'
        ? `${HIDDEN_GEMS_DATA.length} Hidden Gems • Swipe or Click ← →`
        : `${formatNumber(HIDDEN_GEMS_DATA.length, 'bn')}টি হিডেন জেম • স্লাইড বা তীর ক্লিক করুন ← →`;
  }
  if (typeof updateHiddenGemsAutoSlideUI === 'function') {
    updateHiddenGemsAutoSlideUI();
  }

  // Activities Section
  if (t.activitiesSection) {
    setText('activities-eyebrow', t.activitiesSection.eyebrow);
    setText('activities-title', t.activitiesSection.title);
    setText('activities-subtitle', t.activitiesSection.subtitle);
    if (typeof updateActivityAutoSlideUI === 'function') {
      updateActivityAutoSlideUI();
    }
  }

  setText('transport-eyebrow', t.transportSection.eyebrow);
  setText('transport-title', t.transportSection.title);
  setText('transport-subtitle', t.transportSection.subtitle);
  setText('foreigner-note-title', t.transportSection.foreignerNoteTitle);
  setText('foreigner-note-desc', t.transportSection.foreignerNoteDesc);
  setText('th-route', t.transportSection.tableHeaders.route);
  setText('th-vehicle', t.transportSection.tableHeaders.vehicle);
  setText('th-cost', t.transportSection.tableHeaders.cost);
  setText('th-booking', t.transportSection.tableHeaders.bookingType);
  setText('th-duration', t.transportSection.tableHeaders.duration);
  setText('transport-disclaimer', t.transportSection.rateDisclaimer);

  setText('essential-eyebrow', t.essentialSection.eyebrow);
  setText('essential-title', t.essentialSection.title);
  setText('essential-subtitle', t.essentialSection.subtitle);

  setText('faq-eyebrow', t.faqSection.eyebrow);
  setText('faq-title', t.faqSection.title);
  setText('faq-subtitle', t.faqSection.subtitle);

  // Chatbot Static Labels
  setText('chatbot-title', t.chatbot.title);
  setText('chatbot-status', t.chatbot.status);
  const chatInput = document.getElementById('chatbot-input');
  if (chatInput) chatInput.placeholder = t.chatbot.inputPlaceholder;

  // Footer
  setText('footer-about', t.footer.about);
  setText('footer-quicklinks-title', t.footer.quickLinks);
  setText('footer-tools-title', t.footer.travelerTools);
  setText('footer-copyright', t.footer.copyright);
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* --------------------------------------------------------------------------
 * SECTION 2: ACCOMMODATIONS RENDERER (SLIDING CAROUSEL)
 * -------------------------------------------------------------------------- */
let hotelAutoSlideTimer = null;
let hotelSliderActiveIndex = 0;
let hotelAutoSlideEnabled = true;
let hotelSliderHoverPaused = false;
let hotelScrollListenerAttached = false;

function getFilteredHotels() {
  const q = AppState.searchQuery.trim().toLowerCase();
  const searchAppliesToHotels = !q || AppState.searchCategory === 'all' || AppState.searchCategory === 'hotels';

  let list = HOTELS_DATA.filter(hotel => {
    // 1. Star Rating Filter
    if (AppState.hotelStarFilter !== 'ALL' && hotel.stars !== Number(AppState.hotelStarFilter)) {
      return false;
    }

    // 2. Price Range Filter
    if (AppState.hotelPriceFilter !== 'ALL') {
      if (AppState.hotelPriceFilter === 'budget') {
        // Less than 3,000 BDT
        if (hotel.minBDT >= 3000) return false;
      } else if (AppState.hotelPriceFilter === 'mid') {
        // 3,000 to 7,000 BDT
        if (hotel.minBDT > 7000 || hotel.maxBDT < 3000) return false;
      } else if (AppState.hotelPriceFilter === 'luxury') {
        // 7,000+ BDT
        if (hotel.minBDT < 7000 && hotel.maxBDT < 9000) return false;
      }
    }

    // 3. Spot / Location Filter
    const activeSpot = AppState.hotelSpotFilter !== 'ALL' ? AppState.hotelSpotFilter : AppState.hotelFilter;
    if (activeSpot !== 'ALL' && hotel.locationKey !== activeSpot) {
      return false;
    }

    // 4. Quick Facility Filter
    if (AppState.hotelFacilityFilter !== 'ALL') {
      const allFacilityText = [
        ...(hotel.facilities?.en || []),
        ...(hotel.facilities?.bn || []),
        ...(hotel.amenities?.en || []),
        ...(hotel.amenities?.bn || [])
      ].join(' ').toLowerCase();

      if (AppState.hotelFacilityFilter === 'pool') {
        if (!allFacilityText.includes('pool') && !allFacilityText.includes('পুল')) return false;
      } else if (AppState.hotelFacilityFilter === 'beachfront') {
        if (!allFacilityText.includes('beach') && !allFacilityText.includes('সৈকত') && !allFacilityText.includes('beachfront')) return false;
      } else if (AppState.hotelFacilityFilter === 'breakfast') {
        if (!allFacilityText.includes('breakfast') && !allFacilityText.includes('নাস্তা') && !allFacilityText.includes('buffet') && !allFacilityText.includes('বুফে')) return false;
      } else if (AppState.hotelFacilityFilter === 'spa') {
        if (!allFacilityText.includes('spa') && !allFacilityText.includes('jacuzzi') && !allFacilityText.includes('স্পা') && !allFacilityText.includes('জ্যাকুজি') && !allFacilityText.includes('sauna')) return false;
      } else if (AppState.hotelFacilityFilter === 'gym') {
        if (!allFacilityText.includes('gym') && !allFacilityText.includes('fitness') && !allFacilityText.includes('ফিটনেস') && !allFacilityText.includes('জিম')) return false;
      }
    }

    // 5. Search Query
    if (q && searchAppliesToHotels) {
      const searchFields = [
        hotel.name.en,
        hotel.name.bn,
        hotel.location.en,
        hotel.location.bn,
        hotel.spotName?.en || '',
        hotel.spotName?.bn || '',
        ...(hotel.amenities?.en || []),
        ...(hotel.amenities?.bn || []),
        ...(hotel.facilities?.en || []),
        ...(hotel.facilities?.bn || [])
      ].join(' ').toLowerCase();

      if (!searchFields.includes(q)) return false;
    }

    return true;
  });

  // Sorting
  if (AppState.hotelSortBy === 'price-asc') {
    list.sort((a, b) => a.minBDT - b.minBDT);
  } else if (AppState.hotelSortBy === 'price-desc') {
    list.sort((a, b) => b.minBDT - a.minBDT);
  } else if (AppState.hotelSortBy === 'stars-desc') {
    list.sort((a, b) => (b.stars || 0) - (a.stars || 0) || b.minBDT - a.minBDT);
  }

  return list;
}

function renderHotels() {
  const t = UI_TEXT[AppState.lang].hotelsSection;
  const gridContainer = document.getElementById('hotels-grid');
  const dotsContainer = document.getElementById('hotel-slider-dots');
  const counterEl = document.getElementById('hotel-slider-counter');
  if (!gridContainer) return;

  const isBn = AppState.lang === 'bn';

  // 1. Render Star Filters
  const starContainer = document.getElementById('hotel-star-filters');
  if (starContainer) {
    const starOptions = [
      { val: 'ALL', labelEn: 'All Stars', labelBn: 'সব রেটিং' },
      { val: 5, labelEn: '5★ Luxury ⭐⭐⭐⭐⭐', labelBn: '৫★ লাক্সারি (৫টি)' },
      { val: 4, labelEn: '4★ Premium ⭐⭐⭐⭐', labelBn: '৪★ প্রিমিয়াম (২টি)' },
      { val: 3, labelEn: '3★ Standard ⭐⭐⭐', labelBn: '৩★ স্ট্যান্ডার্ড (৪টি)' },
      { val: 2, labelEn: '2★ Eco ⭐⭐', labelBn: '২★ ইকো (১টি)' }
    ];
    starContainer.innerHTML = starOptions.map(opt => {
      const isActive = String(AppState.hotelStarFilter) === String(opt.val);
      const label = isBn ? opt.labelBn : opt.labelEn;
      return `
        <button
          type="button"
          onclick="setHotelStarFilter(${opt.val === 'ALL' ? "'ALL'" : opt.val})"
          class="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            isActive
              ? 'bg-amber-400 text-slate-950 shadow-xs ring-2 ring-amber-400/40'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
          }"
        >
          ${label}
        </button>
      `;
    }).join('');
  }

  // 2. Render Price Filters
  const priceContainer = document.getElementById('hotel-price-filters');
  if (priceContainer) {
    const priceOptions = [
      { val: 'ALL', labelEn: 'All Prices', labelBn: 'সব ভাড়া' },
      { val: 'budget', labelEn: 'Budget (< ৳3,000 / < $25)', labelBn: 'বাজেট (< ৩,০০০)' },
      { val: 'mid', labelEn: 'Mid-Range (৳3k-৳7k / $25-$60)', labelBn: 'মিড-রেঞ্জ (৩-৭ হাজার)' },
      { val: 'luxury', labelEn: 'Luxury (৳7k+ / > $60)', labelBn: 'লাক্সারি (৭ হাজার+)' }
    ];
    priceContainer.innerHTML = priceOptions.map(opt => {
      const isActive = AppState.hotelPriceFilter === opt.val;
      const label = isBn ? opt.labelBn : opt.labelEn;
      return `
        <button
          type="button"
          onclick="setHotelPriceFilter('${opt.val}')"
          class="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            isActive
              ? 'bg-sky-700 text-white shadow-xs ring-2 ring-sky-600/40'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
          }"
        >
          ${label}
        </button>
      `;
    }).join('');
  }

  // 3. Render Spot Filters
  const spotContainer = document.getElementById('hotel-spot-filters') || document.getElementById('hotel-location-filters');
  if (spotContainer) {
    const spotOptions = [
      { key: 'ALL', nameEn: 'All Spots', nameBn: 'সব স্পট' },
      { key: 'kolatoli', nameEn: 'Kolatoli Beach & Road', nameBn: 'কলাতলী বিচ ও রোড' },
      { key: 'inani', nameEn: 'Inani Beach (Coral)', nameBn: 'ইনানী প্রবাল সৈকত' },
      { key: 'pecharthal', nameEn: 'Pecharthal (Marine Dr.)', nameBn: 'পেঁচারদ্বীপ (মেরিন ড্রাইভ)' },
      { key: 'sugandha', nameEn: 'Sugandha Beach', nameBn: 'সুগন্ধা সৈকত' },
      { key: 'laboni', nameEn: 'Laboni Beach', nameBn: 'লাবণী সৈকত' }
    ];
    const currentSpot = AppState.hotelSpotFilter !== 'ALL' ? AppState.hotelSpotFilter : AppState.hotelFilter;
    spotContainer.innerHTML = spotOptions.map(opt => {
      const isActive = currentSpot === opt.key;
      const label = isBn ? opt.nameBn : opt.nameEn;
      return `
        <button
          type="button"
          onclick="setHotelSpotFilter('${opt.key}')"
          class="px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            isActive
              ? 'bg-teal-700 text-white shadow-xs ring-2 ring-teal-600/40'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
          }"
        >
          ${label}
        </button>
      `;
    }).join('');
  }

  // 4. Render Facility Highlights Filters
  const facContainer = document.getElementById('hotel-facility-filters');
  if (facContainer) {
    const facOptions = [
      { key: 'ALL', icon: '✨', labelEn: 'All Amenities', labelBn: 'সব সুবিধা' },
      { key: 'pool', icon: '🏊', labelEn: 'Swimming Pool', labelBn: 'সুইমিং পুল' },
      { key: 'beachfront', icon: '🌊', labelEn: 'Beachfront Access', labelBn: 'সৈকত সংলগ্ন' },
      { key: 'breakfast', icon: '🍳', labelEn: 'Free Breakfast', labelBn: 'বুফে ব্রেকফাস্ট' },
      { key: 'spa', icon: '💆', labelEn: 'Spa & Sauna', labelBn: 'স্পা ও সনা' },
      { key: 'gym', icon: '🏋️', labelEn: 'Fitness Gym', labelBn: 'ফিটনেস জিম' }
    ];
    facContainer.innerHTML = facOptions.map(opt => {
      const isActive = AppState.hotelFacilityFilter === opt.key;
      const label = isBn ? opt.labelBn : opt.labelEn;
      return `
        <button
          type="button"
          onclick="setHotelFacilityFilter('${opt.key}')"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            isActive
              ? 'bg-ocean-950 text-white shadow-xs ring-2 ring-ocean-900/40'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
          }"
        >
          <span>${opt.icon}</span>
          <span>${label}</span>
        </button>
      `;
    }).join('');
  }

  // 5. Active Filters bar & Reset Button
  const resetBtn = document.getElementById('hotel-reset-filters-btn');
  const activeBar = document.getElementById('hotel-active-filters-bar');
  const activeChips = document.getElementById('hotel-active-chips');
  const sortSelect = document.getElementById('hotel-sort-select');

  if (sortSelect) sortSelect.value = AppState.hotelSortBy;

  const hasActiveFilters =
    AppState.hotelStarFilter !== 'ALL' ||
    AppState.hotelPriceFilter !== 'ALL' ||
    AppState.hotelSpotFilter !== 'ALL' ||
    AppState.hotelFilter !== 'ALL' ||
    AppState.hotelFacilityFilter !== 'ALL' ||
    AppState.hotelSortBy !== 'recommended';

  if (resetBtn) {
    if (hasActiveFilters) {
      resetBtn.classList.remove('hidden');
      resetBtn.classList.add('inline-flex');
    } else {
      resetBtn.classList.add('hidden');
      resetBtn.classList.remove('inline-flex');
    }
  }

  if (activeBar && activeChips) {
    if (hasActiveFilters) {
      activeBar.classList.remove('hidden');
      let chipsHtml = '';
      if (AppState.hotelStarFilter !== 'ALL') {
        chipsHtml += `<button type="button" onclick="setHotelStarFilter('ALL')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold border border-amber-300">⭐ ${AppState.hotelStarFilter}★ ✕</button>`;
      }
      if (AppState.hotelPriceFilter !== 'ALL') {
        const pLabel = AppState.hotelPriceFilter === 'budget' ? 'Budget' : AppState.hotelPriceFilter === 'mid' ? 'Mid-Range' : 'Luxury';
        chipsHtml += `<button type="button" onclick="setHotelPriceFilter('ALL')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-950 font-extrabold border border-sky-300">💵 ${pLabel} ✕</button>`;
      }
      const activeSpotKey = AppState.hotelSpotFilter !== 'ALL' ? AppState.hotelSpotFilter : AppState.hotelFilter;
      if (activeSpotKey !== 'ALL') {
        chipsHtml += `<button type="button" onclick="setHotelSpotFilter('ALL')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100 hover:bg-teal-200 text-teal-950 font-extrabold border border-teal-300">📍 ${activeSpotKey} ✕</button>`;
      }
      if (AppState.hotelFacilityFilter !== 'ALL') {
        chipsHtml += `<button type="button" onclick="setHotelFacilityFilter('ALL')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-900 font-extrabold">✨ ${AppState.hotelFacilityFilter} ✕</button>`;
      }
      if (AppState.hotelSortBy !== 'recommended') {
        chipsHtml += `<button type="button" onclick="setHotelSortBy('recommended')" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 hover:bg-indigo-200 text-indigo-950 font-extrabold border border-indigo-300">🔃 ${AppState.hotelSortBy} ✕</button>`;
      }
      activeChips.innerHTML = chipsHtml;
    } else {
      activeBar.classList.add('hidden');
      activeChips.innerHTML = '';
    }
  }

  // Get filtered and sorted hotels
  const filteredHotels = getFilteredHotels();
  updateHotelAutoSlideUI();

  if (filteredHotels.length === 0) {
    gridContainer.innerHTML = `
      <div class="w-full bg-white rounded-3xl p-10 text-center border border-slate-200">
        <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center text-2xl font-bold">
          🏨
        </div>
        <h4 class="text-lg font-bold text-slate-800">${
          isBn ? 'কোনো হোটেল পাওয়া যায়নি' : 'No Hotels Match Your Criteria'
        }</h4>
        <p class="text-slate-600 font-medium text-sm mt-1 max-w-md mx-auto">${
          isBn
            ? 'আপনার নির্বাচিত ফিল্টার বা অনুসন্ধানের সাথে কোনো হোটেল মেলেনি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।'
            : 'No accommodations match your active star rating, price, or spot filters. Try resetting to view all options.'
        }</p>
        <button onclick="resetAllHotelFilters()" class="mt-4 px-6 py-2.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-sm font-bold shadow transition cursor-pointer">
          ${isBn ? 'সব হোটেল দেখুন (ফিল্টার রিসেট)' : 'Reset Filters & Show All Hotels'}
        </button>
      </div>
    `;
    if (dotsContainer) dotsContainer.innerHTML = '';
    if (counterEl) {
      counterEl.textContent = isBn ? '০টি হোটেল পাওয়া গেছে' : '0 Hotels Found';
    }
    return;
  }

  if (counterEl) {
    const starTxt = AppState.hotelStarFilter !== 'ALL' ? ` [${AppState.hotelStarFilter}★]` : '';
    counterEl.textContent = isBn
      ? `${formatNumber(filteredHotels.length, 'bn')}টি হোটেল${starTxt} • মোট ${formatNumber(HOTELS_DATA.length, 'bn')}টির মধ্যে • বামে-ডানে স্লাইড করুন ← →`
      : `Showing ${filteredHotels.length} of ${HOTELS_DATA.length} Hotels${starTxt} • Swipe or Click Arrows ← →`;
  }

  gridContainer.innerHTML = filteredHotels
    .map((hotel, idx) => {
      const priceText = formatPriceRange(hotel.minBDT, hotel.maxBDT);
      const amenitiesList = hotel.amenities[AppState.lang]
        .slice(0, 4)
        .map(
          item => `
          <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-800 border border-sky-100">
            <svg class="w-3 h-3 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
            ${escapeHTML(item)}
          </span>
        `
        )
        .join('');

      const starStars = '★'.repeat(hotel.stars || 3);
      const starLabel = hotel.starLabel ? hotel.starLabel[AppState.lang] : `${escapeHTML(hotel.stars)}-Star`;
      const spotName = hotel.spotName ? hotel.spotName[AppState.lang] : hotel.location[AppState.lang];

      return `
        <article
          data-hotel-slide-index="${idx}"
          class="stay-card group flex flex-col justify-between cursor-pointer"
          onclick="openHotelFacilitiesModal('${escapeHTML(hotel.id)}')"
        >
          <div>
            <div class="relative overflow-hidden bg-stone-100">
              <img
                src="${escapeHTML(hotel.image)}"
                width="600" height="400"
                alt="${escapeHTML(hotel.name[AppState.lang])}"
                loading="lazy"
                decoding="async"
                class="stay-img"
              />
              <div class="absolute top-3 left-3">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/95 text-charcoal backdrop-blur-sm border border-stone-200/80 shadow-xs">
                  ${escapeHTML(hotel.stars)}★ ${hotel.starLabel ? escapeHTML(hotel.starLabel[AppState.lang]) : ''}
                </span>
              </div>
              <div class="absolute bottom-3 left-3 text-[11px] font-mono text-white bg-black/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                ${escapeHTML(spotName)}
              </div>
            </div>

            <div class="p-5">
              <h3 class="font-serif text-xl sm:text-2xl text-charcoal font-normal group-hover:text-terracotta-600 transition leading-snug">
                ${escapeHTML(hotel.name[AppState.lang])}
              </h3>
              <p class="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed font-normal">
                ${escapeHTML(hotel.description[AppState.lang])}
              </p>
            </div>
          </div>

          <div class="p-5 pt-0">
            <div class="pt-3 border-t border-stone-200/80 flex items-center justify-between">
              <div>
                <span class="block text-[10px] font-mono uppercase tracking-wider text-stone-400">
                  ${isBn ? 'আনুমানিক' : 'Estimated'}
                </span>
                <span class="font-serif text-base font-semibold text-charcoal">
                  ${priceText}
                </span>
              </div>
              <button
                type="button"
                onclick="event.stopPropagation(); openHotelFacilitiesModal('${escapeHTML(hotel.id)}')"
                class="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-stone-300 hover:border-charcoal hover:bg-charcoal hover:text-white transition cursor-pointer"
              >
                ${isBn ? 'বিস্তারিত ➔' : 'Details ➔'}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  renderHotelSliderDots(filteredHotels.length);
  initHotelSliderEvents();
  startHotelAutoSlide();
}

function renderHotelSliderDots(totalSlides) {
  const dotsContainer = document.getElementById('hotel-slider-dots');
  if (!dotsContainer) return;

  if (totalSlides <= 1) {
    dotsContainer.innerHTML = '';
    return;
  }

  dotsContainer.innerHTML = Array.from({ length: totalSlides })
    .map((_, idx) => {
      const isActive = idx === hotelSliderActiveIndex;
      return `
        <button
          type="button"
          onclick="slideToHotelIndex(${idx})"
          aria-label="Go to hotel slide ${idx + 1}"
          class="h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            isActive ? 'w-8 bg-sky-700 shadow-xs' : 'w-2.5 bg-slate-300 hover:bg-sky-400'
          }"
        ></button>
      `;
    })
    .join('');
}

function slideHotels(direction) {
  const track = document.getElementById('hotels-grid');
  if (!track) return;
  const slides = track.querySelectorAll('article[data-hotel-slide-index]');
  if (!slides.length) return;

  const firstCard = slides[0];
  const gap = 24; // gap-6 = 24px
  const stepWidth = firstCard.offsetWidth + gap;
  const maxScrollLeft = track.scrollWidth - track.clientWidth;

  if (direction > 0) {
    // If near the right edge, loop back to the beginning smoothly
    if (track.scrollLeft >= maxScrollLeft - 20) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      hotelSliderActiveIndex = 0;
    } else {
      track.scrollBy({ left: stepWidth, behavior: 'smooth' });
      hotelSliderActiveIndex = Math.min(slides.length - 1, hotelSliderActiveIndex + 1);
    }
  } else {
    // If at the start, jump to the end smoothly
    if (track.scrollLeft <= 20) {
      track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      hotelSliderActiveIndex = slides.length - 1;
    } else {
      track.scrollBy({ left: -stepWidth, behavior: 'smooth' });
      hotelSliderActiveIndex = Math.max(0, hotelSliderActiveIndex - 1);
    }
  }

  renderHotelSliderDots(slides.length);
}

function slideToHotelIndex(index) {
  const track = document.getElementById('hotels-grid');
  if (!track) return;
  const slides = track.querySelectorAll('article[data-hotel-slide-index]');
  if (!slides[index]) return;

  const targetLeft = slides[index].offsetLeft - track.offsetLeft;
  track.scrollTo({ left: targetLeft, behavior: 'smooth' });
  hotelSliderActiveIndex = index;
  renderHotelSliderDots(slides.length);
}

function initHotelSliderEvents() {
  const track = document.getElementById('hotels-grid');
  if (!track || hotelScrollListenerAttached) return;
  hotelScrollListenerAttached = true;

  track.addEventListener(
    'scroll',
    () => {
      const slides = track.querySelectorAll('article[data-hotel-slide-index]');
      if (!slides.length) return;
      const firstCard = slides[0];
      const stepWidth = firstCard.offsetWidth + 24;
      const currentIdx = Math.min(
        slides.length - 1,
        Math.max(0, Math.round(track.scrollLeft / stepWidth))
      );
      if (currentIdx !== hotelSliderActiveIndex) {
        hotelSliderActiveIndex = currentIdx;
        renderHotelSliderDots(slides.length);
      }
    },
    { passive: true }
  );
}

function startHotelAutoSlide() {
  if (hotelAutoSlideTimer) {
    clearInterval(hotelAutoSlideTimer);
  }
  hotelAutoSlideTimer = setInterval(() => {
    if (!hotelAutoSlideEnabled || hotelSliderHoverPaused) return;
    slideHotels(1);
  }, 4200);
}



function updateHotelAutoSlideUI() {
  const iconEl = document.getElementById('hotel-autoplay-icon');
  const labelEl = document.getElementById('hotel-autoplay-label');
  if (iconEl) {
    iconEl.textContent = hotelAutoSlideEnabled ? '⏸' : '▶';
  }
  if (labelEl) {
    if (AppState.lang === 'bn') {
      labelEl.textContent = hotelAutoSlideEnabled ? 'অটো-স্লাইড চালু' : 'অটো-স্লাইড বন্ধ';
    } else {
      labelEl.textContent = hotelAutoSlideEnabled ? 'Auto-Slide On' : 'Auto-Slide Paused';
    }
  }
}

function setHotelStarFilter(starVal) {
  AppState.hotelStarFilter = starVal === AppState.hotelStarFilter ? 'ALL' : starVal;
  hotelSliderActiveIndex = 0;
  renderHotels();
  const track = document.getElementById('hotels-grid');
  if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
}

function setHotelPriceFilter(priceVal) {
  AppState.hotelPriceFilter = priceVal === AppState.hotelPriceFilter ? 'ALL' : priceVal;
  hotelSliderActiveIndex = 0;
  renderHotels();
  const track = document.getElementById('hotels-grid');
  if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
}

function setHotelSpotFilter(spotVal) {
  AppState.hotelSpotFilter = spotVal === AppState.hotelSpotFilter ? 'ALL' : spotVal;
  AppState.hotelFilter = AppState.hotelSpotFilter;
  hotelSliderActiveIndex = 0;
  renderHotels();
  const track = document.getElementById('hotels-grid');
  if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
}


function setHotelFacilityFilter(facVal) {
  AppState.hotelFacilityFilter = facVal === AppState.hotelFacilityFilter ? 'ALL' : facVal;
  hotelSliderActiveIndex = 0;
  renderHotels();
  const track = document.getElementById('hotels-grid');
  if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
}

function setHotelSortBy(sortVal) {
  AppState.hotelSortBy = sortVal;
  hotelSliderActiveIndex = 0;
  renderHotels();
  const track = document.getElementById('hotels-grid');
  if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
}

function resetAllHotelFilters() {
  AppState.hotelStarFilter = 'ALL';
  AppState.hotelPriceFilter = 'ALL';
  AppState.hotelSpotFilter = 'ALL';
  AppState.hotelFilter = 'ALL';
  AppState.hotelFacilityFilter = 'ALL';
  AppState.hotelSortBy = 'recommended';
  hotelSliderActiveIndex = 0;
  renderHotels();
  const track = document.getElementById('hotels-grid');
  if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
}

function openHotelFacilitiesModal(hotelId) {
  const hotel = HOTELS_DATA.find(h => h.id === hotelId);
  if (!hotel) return;

  const modal = document.getElementById('hotel-facilities-modal');
  const nameEl = document.getElementById('modal-hotel-name');
  const starsBadge = document.getElementById('modal-hotel-stars-badge');
  const spotBadge = document.getElementById('modal-hotel-spot-badge');
  const ratingBadge = document.getElementById('modal-hotel-rating-badge');
  const locationText = document.getElementById('modal-hotel-location-text');
  const bodyEl = document.getElementById('modal-hotel-body');
  const footerEl = document.getElementById('modal-hotel-footer');
  if (!modal || !bodyEl) return;

  const isBn = AppState.lang === 'bn';
  const priceFormatted = formatPriceRange(hotel.minBDT, hotel.maxBDT);
  const starStars = '★'.repeat(hotel.stars || 3);
  const starLabel = hotel.starLabel ? hotel.starLabel[AppState.lang] : `${hotel.stars}-Star`;
  const spotName = hotel.spotName ? hotel.spotName[AppState.lang] : hotel.location[AppState.lang];

  if (nameEl) nameEl.textContent = hotel.name[AppState.lang];
  if (starsBadge) starsBadge.textContent = `${starStars} ${starLabel}`;
  if (spotBadge) spotBadge.textContent = `📍 ${spotName}`;
  if (ratingBadge) ratingBadge.textContent = isBn ? 'তালিকাভুক্ত' : 'Listed'; // hotel.rating has no source
  if (locationText) locationText.textContent = hotel.location[AppState.lang];

  // Facilities list
  const facilitiesList =
    hotel.facilities && hotel.facilities[AppState.lang] && hotel.facilities[AppState.lang].length
      ? hotel.facilities[AppState.lang]
      : hotel.amenities[AppState.lang] || [];

  const facilitiesHtml = facilitiesList
    .map(
      fac => `
      <div class="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200/80 transition">
        <span class="w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
          ✓
        </span>
        <span class="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
          ${escapeHTML(fac)}
        </span>
      </div>
    `
    )
    .join('');

  const keyAmenitiesHtml = (hotel.amenities[AppState.lang] || [])
    .map(
      a => `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200">
        <span class="text-teal-600">★</span> ${escapeHTML(a)}
      </span>
    `
    )
    .join('');

  bodyEl.innerHTML = `
    <!-- Rates & Overview Card -->
    <div class="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-sky-50 via-teal-50/60 to-amber-50/40 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
      <div>
        <span class="text-[11px] font-extrabold uppercase tracking-wider text-sky-900">${isBn ? 'আনুমানিক রেট / প্রতি রাত' : 'Estimated Nightly Rate'}</span>
        <div class="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5 tracking-tight">${priceFormatted}</div>
        <p class="text-[11px] text-slate-500 mt-1">${isBn ? '* মৌসুমি চাহিদা ও রুম ক্যাটাগরি অনুযায়ী ভাড়া কম-বেশি হতে পারে' : '* Rates vary by room category, sea-facing view, and high/low seasons'}</p>
      </div>
      <div class="flex items-center gap-2">
        <a href="itinerary.html" class="px-4 py-2.5 rounded-xl text-xs font-extrabold transition shadow-xs bg-amber-400 hover:bg-amber-300 text-slate-950">
          ${isBn ? 'ট্রিপ প্ল্যান করুন' : 'Plan a Trip'}
        </a>
      </div>
    </div>

    <!-- Description -->
    <div>
      <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
        ${isBn ? 'হোটেল পরিচিতি' : 'Property Overview'}
      </h4>
      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
        ${escapeHTML(hotel.description[AppState.lang])}
      </p>
    </div>

    <!-- Key Amenities Badges -->
    <div>
      <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
        ${isBn ? 'মূল সুবিধাসমূহ' : 'Key Amenities'}
      </h4>
      <div class="flex flex-wrap gap-1.5">
        ${keyAmenitiesHtml}
      </div>
    </div>

    <!-- Detailed Facilities List -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-extrabold uppercase tracking-wider text-teal-800">
          ✨ ${isBn ? 'পূর্ণাঙ্গ সুযোগ-সুবিধা ও গেস্ট সার্ভিস' : 'Facilities & Guest Services'}
        </h4>
        <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
          ${facilitiesList.length} ${isBn ? 'টি সুবিধা' : 'Listed Features'}
        </span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        ${facilitiesHtml}
      </div>
    </div>
  `;

  if (footerEl) {
    footerEl.innerHTML = `
      <div class="flex flex-wrap items-center gap-2">
        ${
          hotel.phone
            ? `<a href="tel:${escapeHTML(hotel.phone.replace(/\s+/g, ''))}" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs">
                <span>☎</span>
                <span>${isBn ? 'হটলাইনে কল' : 'Call'} ${escapeHTML(hotel.phone)}</span>
              </a>`
            : ''
        }
        ${
          hotel.sourceUrl
            ? `<a href="${escapeHTML(hotel.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition">
                <span>🌐 ${isBn ? 'ওয়েবসাইট' : 'Website'}</span>
                <span>↗</span>
              </a>`
            : ''
        }
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          onclick="closeHotelFacilitiesModal()"
          class="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold transition cursor-pointer"
        >
          ${isBn ? 'বন্ধ করুন' : 'Close'}
        </button>
      </div>
    `;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
  window.VCDialog?.opened(modal, closeHotelFacilitiesModal);
}

function closeHotelFacilitiesModal() {
  const modal = document.getElementById('hotel-facilities-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
    window.VCDialog?.closed(modal);
  }
}

/* --------------------------------------------------------------------------
 * SECTION 3: DESTINATIONS & HIDDEN GEMS RENDERER (SLIDING CAROUSEL)
 * -------------------------------------------------------------------------- */
let destinationAutoSlideTimer = null;
let destinationSliderActiveIndex = 0;
let destinationAutoSlideEnabled = true;
let destinationSliderHoverPaused = false;
let destinationScrollListenerAttached = false;

function renderDestinations() {
  const t = UI_TEXT[AppState.lang].destinationsSection;
  const spotsGrid = document.getElementById('destinations-grid');
  const gemsGrid = document.getElementById('hidden-gems-grid');
  const dotsContainer = document.getElementById('destination-slider-dots');
  const counterEl = document.getElementById('destination-slider-counter');
  if (!spotsGrid || !gemsGrid) return;

  const q = AppState.searchQuery.trim().toLowerCase();
  const filteredSpots = DESTINATIONS_DATA.filter(spot => {
    if (!q || (AppState.searchCategory !== 'all' && AppState.searchCategory !== 'spots')) {
      return true;
    }
    const text = `${spot.name.en} ${spot.name.bn} ${spot.vibe.en} ${spot.vibe.bn} ${spot.directions.en} ${spot.directions.bn}`.toLowerCase();
    return text.includes(q);
  });

  updateDestinationAutoSlideUI();

  if (filteredSpots.length === 0) {
    spotsGrid.innerHTML = `
      <div class="w-full bg-slate-50 rounded-3xl p-10 text-center border border-slate-200">
        <p class="text-slate-600 font-medium">${
          AppState.lang === 'en'
            ? 'No destinations match your current search filter.'
            : 'আপনার অনুসন্ধানের সাথে কোনো দর্শনীয় স্থান মেলেনি।'
        }</p>
        <button onclick="resetSearchAndFilters()" class="mt-4 px-5 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 transition">
          ${AppState.lang === 'en' ? 'Show All Destinations' : 'সব দর্শনীয় স্থান দেখুন'}
        </button>
      </div>
    `;
    if (dotsContainer) dotsContainer.innerHTML = '';
    if (counterEl) {
      counterEl.textContent = AppState.lang === 'en' ? '0 Destinations Found' : '০টি স্থান পাওয়া গেছে';
    }
  } else {
    if (counterEl) {
      counterEl.textContent =
        AppState.lang === 'en'
          ? `Showing ${filteredSpots.length} Iconic Destinations • Swipe or Click Arrows ← →`
          : `${formatNumber(filteredSpots.length, 'bn')}টি জনপ্রিয় দর্শনীয় স্থান • বামে-ডানে স্লাইড করুন ← →`;
    }

    spotsGrid.innerHTML = filteredSpots
      .map(
        (spot, idx) => `
      <article
        data-destination-slide-index="${idx}"
        class="coastal-card group shrink-0 snap-start w-[88%] sm:w-[350px] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col"
      >
        <div class="relative h-60 overflow-hidden bg-slate-200">
          <img
            src="${escapeHTML(spot.image)}"
            width="600" height="400"
            alt="${escapeHTML(spot.name[AppState.lang])}"
            loading="lazy"
            decoding="async"
            class="card-img w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow">
            ${escapeHTML(spot.tag[AppState.lang])}
          </span>
          <div class="absolute top-4 right-4">
          </div>
          <h3 class="absolute bottom-4 left-5 right-5 text-xl font-bold text-white drop-shadow-sm">
            ${escapeHTML(spot.name[AppState.lang])}
          </h3>
        </div>

        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-4">
            <!-- Vibe -->
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <div>
                <span class="block text-xs font-bold uppercase tracking-wider text-teal-700">${t.vibeLabel}</span>
                <p class="text-slate-700 text-sm font-medium mt-0.5">${escapeHTML(spot.vibe[AppState.lang])}</p>
              </div>
            </div>

            <!-- Directions -->
            <div class="flex items-start gap-3 pt-3 border-t border-slate-100">
              <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                </svg>
              </div>
              <div>
                <span class="block text-xs font-bold uppercase tracking-wider text-sky-700">${t.directionsLabel}</span>
                <p class="text-slate-600 text-sm mt-0.5">${escapeHTML(spot.directions[AppState.lang])}</p>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs text-slate-400">
            ${photoCreditHTML(spot, 'text-sky-600 hover:underline font-semibold')}
            <a
              href="itinerary.html"
              class="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition shadow-2xs shrink-0"
            >
              ${AppState.lang === 'en' ? 'Plan a Trip' : 'ট্রিপ প্ল্যান করুন'}
            </a>
          </div>
        </div>
      </article>
    `
      )
      .join('');

    renderDestinationSliderDots(filteredSpots.length);
    initDestinationSliderEvents();
    startDestinationAutoSlide();
  }

  // Render Hidden Gems with Original Cox's Bazar Photos & Interactive Sliding Carousel
  const gemsCounterEl = document.getElementById('gems-slider-counter');
  if (gemsCounterEl) {
    gemsCounterEl.textContent =
      AppState.lang === 'en'
        ? `${HIDDEN_GEMS_DATA.length} Hidden Gems • Swipe or Click ← →`
        : `${formatNumber(HIDDEN_GEMS_DATA.length, 'bn')}টি হিডেন জেম • স্লাইড বা তীর ক্লিক করুন ← →`;
  }

  gemsGrid.innerHTML = HIDDEN_GEMS_DATA.map((gem, idx) => {
    return `
      <article
        data-gem-slide-index="${idx}"
        class="shrink-0 snap-start w-[88%] sm:w-[320px] md:w-[340px] lg:w-[360px] bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-amber-300/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-lg"
      >
        <div>
          ${
            gem.image
              ? `<div class="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src="${escapeHTML(gem.image)}"
                    width="600" height="400"
                    alt="${escapeHTML(gem.name[AppState.lang])}"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>
                  <span class="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 shadow-xs">
                    #${idx + 1} • ${escapeHTML(gem.highlight[AppState.lang])}
                  </span>
                </div>`
              : ''
          }
          <div class="p-5">
            <h4 class="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">${escapeHTML(gem.name[AppState.lang])}</h4>
            <p class="text-sky-100/90 text-xs sm:text-sm mt-2 leading-relaxed">${escapeHTML(gem.description[AppState.lang])}</p>
          </div>
        </div>
        <div class="px-5 pb-5 pt-2 border-t border-white/10 flex items-center justify-between gap-2">
          ${photoCreditHTML(gem, 'text-[11px] text-teal-300 hover:text-amber-300 hover:underline font-semibold transition-colors')}
          <div class="flex items-center gap-1.5">
          </div>
        </div>
      </article>
    `;
  }).join('');

  renderHiddenGemsSliderDots(HIDDEN_GEMS_DATA.length);
  initHiddenGemsSliderEvents();
  startHiddenGemsAutoSlide();
  updateHiddenGemsAutoSlideUI();
}

function renderDestinationSliderDots(totalSlides) {
  const dotsContainer = document.getElementById('destination-slider-dots');
  if (!dotsContainer) return;

  if (totalSlides <= 1) {
    dotsContainer.innerHTML = '';
    return;
  }

  dotsContainer.innerHTML = Array.from({ length: totalSlides })
    .map((_, idx) => {
      const isActive = idx === destinationSliderActiveIndex;
      return `
        <button
          type="button"
          onclick="slideToDestinationIndex(${idx})"
          aria-label="Go to destination slide ${idx + 1}"
          class="h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            isActive ? 'w-8 bg-sky-700 shadow-xs' : 'w-2.5 bg-slate-300 hover:bg-sky-400'
          }"
        ></button>
      `;
    })
    .join('');
}

function slideDestinations(direction) {
  const track = document.getElementById('destinations-grid');
  if (!track) return;
  const slides = track.querySelectorAll('article[data-destination-slide-index]');
  if (!slides.length) return;

  const firstCard = slides[0];
  const gap = 24; // gap-6 = 24px
  const stepWidth = firstCard.offsetWidth + gap;
  const maxScrollLeft = track.scrollWidth - track.clientWidth;

  if (direction > 0) {
    if (track.scrollLeft >= maxScrollLeft - 20) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      destinationSliderActiveIndex = 0;
    } else {
      track.scrollBy({ left: stepWidth, behavior: 'smooth' });
      destinationSliderActiveIndex = Math.min(slides.length - 1, destinationSliderActiveIndex + 1);
    }
  } else {
    if (track.scrollLeft <= 20) {
      track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      destinationSliderActiveIndex = slides.length - 1;
    } else {
      track.scrollBy({ left: -stepWidth, behavior: 'smooth' });
      destinationSliderActiveIndex = Math.max(0, destinationSliderActiveIndex - 1);
    }
  }

  renderDestinationSliderDots(slides.length);
}

function slideToDestinationIndex(index) {
  const track = document.getElementById('destinations-grid');
  if (!track) return;
  const slides = track.querySelectorAll('article[data-destination-slide-index]');
  if (!slides[index]) return;

  const targetLeft = slides[index].offsetLeft - track.offsetLeft;
  track.scrollTo({ left: targetLeft, behavior: 'smooth' });
  destinationSliderActiveIndex = index;
  renderDestinationSliderDots(slides.length);
}

function initDestinationSliderEvents() {
  const track = document.getElementById('destinations-grid');
  if (!track || destinationScrollListenerAttached) return;
  destinationScrollListenerAttached = true;

  track.addEventListener(
    'scroll',
    () => {
      const slides = track.querySelectorAll('article[data-destination-slide-index]');
      if (!slides.length) return;
      const firstCard = slides[0];
      const stepWidth = firstCard.offsetWidth + 24;
      const currentIdx = Math.min(
        slides.length - 1,
        Math.max(0, Math.round(track.scrollLeft / stepWidth))
      );
      if (currentIdx !== destinationSliderActiveIndex) {
        destinationSliderActiveIndex = currentIdx;
        renderDestinationSliderDots(slides.length);
      }
    },
    { passive: true }
  );
}

function startDestinationAutoSlide() {
  if (destinationAutoSlideTimer) {
    clearInterval(destinationAutoSlideTimer);
  }
  destinationAutoSlideTimer = setInterval(() => {
    if (!destinationAutoSlideEnabled || destinationSliderHoverPaused) return;
    slideDestinations(1);
  }, 4600);
}



function updateDestinationAutoSlideUI() {
  const iconEl = document.getElementById('destination-autoplay-icon');
  const labelEl = document.getElementById('destination-autoplay-label');
  if (iconEl) {
    iconEl.textContent = destinationAutoSlideEnabled ? '⏸' : '▶';
  }
  if (labelEl) {
    if (AppState.lang === 'bn') {
      labelEl.textContent = destinationAutoSlideEnabled ? 'অটো-স্লাইড চালু' : 'অটো-স্লাইড বন্ধ';
    } else {
      labelEl.textContent = destinationAutoSlideEnabled ? 'Auto-Slide On' : 'Auto-Slide Paused';
    }
  }
}

/* --------------------------------------------------------------------------
 * SECTION 3B: HIDDEN GEMS SLIDING CAROUSEL CONTROLLER
 * -------------------------------------------------------------------------- */
let hiddenGemsSliderActiveIndex = 0;
let hiddenGemsAutoSlideTimer = null;
let hiddenGemsAutoSlideEnabled = true;
let hiddenGemsSliderHoverPaused = false;
let hiddenGemsScrollListenerAttached = false;

function renderHiddenGemsSliderDots(totalSlides) {
  const dotsContainer = document.getElementById('hidden-gems-slider-dots');
  if (!dotsContainer) return;

  if (totalSlides <= 1) {
    dotsContainer.innerHTML = '';
    return;
  }

  dotsContainer.innerHTML = Array.from({ length: totalSlides })
    .map((_, idx) => {
      const isActive = idx === hiddenGemsSliderActiveIndex;
      return `
        <button
          type="button"
          onclick="slideToGemIndex(${idx})"
          aria-label="Go to hidden gem ${idx + 1}"
          class="h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            isActive ? 'w-8 bg-amber-400 shadow-xs' : 'w-2.5 bg-white/30 hover:bg-white/60'
          }"
        ></button>
      `;
    })
    .join('');
}

function slideHiddenGems(direction) {
  const track = document.getElementById('hidden-gems-grid');
  if (!track) return;
  const slides = track.querySelectorAll('[data-gem-slide-index]');
  if (!slides.length) return;

  const firstCard = slides[0];
  const gap = 24; // gap-6 = 24px
  const stepWidth = firstCard.offsetWidth + gap;
  const maxScrollLeft = track.scrollWidth - track.clientWidth;

  if (direction > 0) {
    if (track.scrollLeft >= maxScrollLeft - 20) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      hiddenGemsSliderActiveIndex = 0;
    } else {
      track.scrollBy({ left: stepWidth, behavior: 'smooth' });
      hiddenGemsSliderActiveIndex = Math.min(slides.length - 1, hiddenGemsSliderActiveIndex + 1);
    }
  } else {
    if (track.scrollLeft <= 20) {
      track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      hiddenGemsSliderActiveIndex = slides.length - 1;
    } else {
      track.scrollBy({ left: -stepWidth, behavior: 'smooth' });
      hiddenGemsSliderActiveIndex = Math.max(0, hiddenGemsSliderActiveIndex - 1);
    }
  }

  renderHiddenGemsSliderDots(slides.length);
}

function slideToGemIndex(index) {
  const track = document.getElementById('hidden-gems-grid');
  if (!track) return;
  const slides = track.querySelectorAll('[data-gem-slide-index]');
  if (!slides[index]) return;

  const targetLeft = slides[index].offsetLeft - track.offsetLeft;
  track.scrollTo({ left: targetLeft, behavior: 'smooth' });
  hiddenGemsSliderActiveIndex = index;
  renderHiddenGemsSliderDots(slides.length);
}

function initHiddenGemsSliderEvents() {
  const track = document.getElementById('hidden-gems-grid');
  if (!track || hiddenGemsScrollListenerAttached) return;
  hiddenGemsScrollListenerAttached = true;

  track.addEventListener(
    'scroll',
    () => {
      const slides = track.querySelectorAll('[data-gem-slide-index]');
      if (!slides.length) return;
      const firstCard = slides[0];
      const stepWidth = firstCard.offsetWidth + 24;
      const currentIdx = Math.min(
        slides.length - 1,
        Math.max(0, Math.round(track.scrollLeft / stepWidth))
      );
      if (currentIdx !== hiddenGemsSliderActiveIndex) {
        hiddenGemsSliderActiveIndex = currentIdx;
        renderHiddenGemsSliderDots(slides.length);
      }
    },
    { passive: true }
  );
}

function startHiddenGemsAutoSlide() {
  if (hiddenGemsAutoSlideTimer) {
    clearInterval(hiddenGemsAutoSlideTimer);
  }
  hiddenGemsAutoSlideTimer = setInterval(() => {
    if (!hiddenGemsAutoSlideEnabled || hiddenGemsSliderHoverPaused) return;
    slideHiddenGems(1);
  }, 4400);
}



function updateHiddenGemsAutoSlideUI() {
  const iconEl = document.getElementById('gems-autoplay-icon');
  const labelEl = document.getElementById('gems-autoplay-label');
  if (iconEl) {
    iconEl.textContent = hiddenGemsAutoSlideEnabled ? '⏸' : '▶';
  }
  if (labelEl) {
    if (AppState.lang === 'bn') {
      labelEl.textContent = hiddenGemsAutoSlideEnabled ? 'অটো-স্লাইড চালু' : 'অটো-স্লাইড বন্ধ';
    } else {
      labelEl.textContent = hiddenGemsAutoSlideEnabled ? 'Auto-Slide On' : 'Auto-Slide Paused';
    }
  }
}

/* --------------------------------------------------------------------------
 * SECTION 3C: ACTIVITIES & COASTAL ADVENTURES RENDERER (SLIDING CAROUSEL)
 * -------------------------------------------------------------------------- */
let activitySliderActiveIndex = 0;
let activityAutoSlideTimer = null;
let activityAutoSlideEnabled = true;
let activitySliderHoverPaused = false;
let activityScrollListenerAttached = false;

function renderActivities() {
  const container = document.getElementById('activities-grid');
  const filtersContainer = document.getElementById('activity-category-filters');
  const dotsContainer = document.getElementById('activity-slider-dots');
  const counterEl = document.getElementById('activities-slider-counter');
  if (!container) return;

  const t = UI_TEXT[AppState.lang].activitiesSection || {
    filterAll: 'All Activities',
    filterWater: 'Water Sports',
    filterBeach: 'Beach & Riding',
    filterSafari: 'Jeep & Tours',
    filterNight: 'Camping & Night',
    addToTrip: '+ Add to My Trip',
    estCost: 'Estimated Price',
    locationLabel: 'Location',
    durationLabel: 'Duration'
  };

  // Render Category Filter Buttons
  if (filtersContainer) {
    const categories = [
      { key: 'all', label: t.filterAll },
      { key: 'water', label: t.filterWater },
      { key: 'beach', label: t.filterBeach },
      { key: 'safari', label: t.filterSafari },
      { key: 'night', label: t.filterNight }
    ];

    filtersContainer.innerHTML = categories
      .map(cat => {
        const isActive = (AppState.activityFilter || 'all') === cat.key;
        return `
          <button
            type="button"
            onclick="setActivityFilter('${escapeHTML(cat.key)}')"
            class="px-3.5 py-1.5 rounded-full text-xs font-bold transition shadow-2xs cursor-pointer ${
              isActive
                ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                : 'bg-white hover:bg-amber-50 text-slate-700 border border-slate-200'
            }"
          >
            ${escapeHTML(cat.label)}
          </button>
        `;
      })
      .join('');
  }

  const q = AppState.searchQuery.trim().toLowerCase();
  const activities = (typeof ACTIVITIES_DATA !== 'undefined' ? ACTIVITIES_DATA : []).filter(act => {
    // Category match
    if (AppState.activityFilter && AppState.activityFilter !== 'all') {
      if (act.category !== AppState.activityFilter) return false;
    }
    // Search query match
    if (q && (AppState.searchCategory === 'all' || AppState.searchCategory === 'spots')) {
      const text = `${act.name.en} ${act.name.bn} ${act.location.en} ${act.location.bn} ${act.description.en} ${act.description.bn}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });

  updateActivityAutoSlideUI();

  if (activities.length === 0) {
    container.innerHTML = `
      <div class="w-full bg-white rounded-3xl p-10 text-center border border-slate-200">
        <p class="text-slate-600 font-medium">${
          AppState.lang === 'en'
            ? 'No activities match the selected filter.'
            : 'নির্বাচিত ফিল্টারে কোনো অ্যাক্টিভিটি পাওয়া যায়নি।'
        }</p>
        <button onclick="setActivityFilter('all')" class="mt-4 px-5 py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition">
          ${AppState.lang === 'en' ? 'Show All Activities' : 'সব অ্যাক্টিভিটি দেখুন'}
        </button>
      </div>
    `;
    if (dotsContainer) dotsContainer.innerHTML = '';
    if (counterEl) {
      counterEl.textContent = AppState.lang === 'en' ? '0 Activities Found' : '০টি অ্যাক্টিভিটি পাওয়া গেছে';
    }
    return;
  }

  if (counterEl) {
    counterEl.textContent =
      AppState.lang === 'en'
        ? `Showing ${activities.length} Thrilling Activities • Swipe or Click Arrows ← →`
        : `${formatNumber(activities.length, 'bn')}টি রোমাঞ্চকর অ্যাক্টিভিটি • স্লাইড করুন ← →`;
  }

  container.innerHTML = activities
    .map((act, idx) => {
      const priceText = formatPriceRange(act.priceBDT, act.priceMaxBDT);
      const badgeText = act.badge ? act.badge[AppState.lang] : '';
      const nameText = act.name[AppState.lang];
      const locText = act.location[AppState.lang];
      const durText = act.duration[AppState.lang];
      const diffText = act.difficulty[AppState.lang];
      const descText = act.description[AppState.lang];
      const noteText = act.priceNote ? act.priceNote[AppState.lang] : '';
      const includedList = act.included ? act.included[AppState.lang] : [];

      return `
        <article
          data-activity-slide-index="${idx}"
          class="coastal-card group shrink-0 snap-start w-[88%] sm:w-[350px] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
        >
          <div class="relative h-56 overflow-hidden bg-slate-900">
            <img
              src="${escapeHTML(act.image)}"
              width="600" height="400"
              alt="${escapeHTML(nameText)}"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent"></div>
            ${
              badgeText
                ? `
              <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 shadow-md">
                ★ ${badgeText}
              </span>
            `
                : ''
            }
            <span class="absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/20">
              ${escapeHTML(diffText)}
            </span>
            <div class="absolute bottom-3 left-5 right-5">
              <h3 class="text-xl font-extrabold text-white leading-tight drop-shadow-sm">
                ${escapeHTML(nameText)}
              </h3>
            </div>
          </div>

          <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <!-- Price Card Pill -->
              <div class="p-3 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-between">
                <div>
                  <span class="block text-[10px] font-extrabold uppercase tracking-wider text-amber-800">${t.estCost}</span>
                  <span class="text-base sm:text-lg font-black text-amber-950">${priceText}</span>
                </div>
                <span class="text-[11px] text-amber-800/80 font-medium text-right max-w-[150px] leading-tight">
                  ${escapeHTML(noteText)}
                </span>
              </div>

              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ${escapeHTML(descText)}
              </p>

              <!-- Key Info: Location & Duration -->
              <div class="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div class="space-y-0.5">
                  <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">${t.locationLabel}</span>
                  <span class="font-bold text-slate-800 leading-tight block">${escapeHTML(locText)}</span>
                </div>
                <div class="space-y-0.5">
                  <span class="block text-[10px] font-bold uppercase tracking-wider text-slate-400">${t.durationLabel}</span>
                  <span class="font-bold text-slate-800 leading-tight block">${escapeHTML(durText)}</span>
                </div>
              </div>

              <!-- Included Features Chips -->
              ${
                includedList.length > 0
                  ? `
                <div class="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                  ${includedList
                    .map(
                      item => `
                    <span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                      ✓ ${escapeHTML(item)}
                    </span>
                  `
                    )
                    .join('')}
                </div>
              `
                  : ''
              }
            </div>

            <!-- Bottom Action Buttons -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <a
                href="itinerary.html"
                class="flex-1 py-2.5 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition shadow-2xs text-center"
              >
                ${AppState.lang === 'en' ? 'Plan a Trip' : 'ট্রিপ প্ল্যান করুন'}
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  renderActivitySliderDots(activities.length);
  initActivitySliderEvents();
  startActivityAutoSlide();
}

function renderActivitySliderDots(totalSlides) {
  const dotsContainer = document.getElementById('activity-slider-dots');
  if (!dotsContainer) return;

  if (totalSlides <= 1) {
    dotsContainer.innerHTML = '';
    return;
  }

  dotsContainer.innerHTML = Array.from({ length: totalSlides })
    .map((_, idx) => {
      const isActive = idx === activitySliderActiveIndex;
      return `
        <button
          type="button"
          onclick="slideToActivityIndex(${idx})"
          aria-label="Go to activity slide ${idx + 1}"
          class="h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
            isActive ? 'w-8 bg-amber-500 shadow-xs' : 'w-2.5 bg-slate-300 hover:bg-amber-400'
          }"
        ></button>
      `;
    })
    .join('');
}

function slideActivities(direction) {
  const track = document.getElementById('activities-grid');
  if (!track) return;
  const slides = track.querySelectorAll('article[data-activity-slide-index]');
  if (!slides.length) return;

  const firstCard = slides[0];
  const gap = 24; // gap-6 = 24px
  const stepWidth = firstCard.offsetWidth + gap;
  const maxScrollLeft = track.scrollWidth - track.clientWidth;

  if (direction > 0) {
    if (track.scrollLeft >= maxScrollLeft - 20) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      activitySliderActiveIndex = 0;
    } else {
      track.scrollBy({ left: stepWidth, behavior: 'smooth' });
      activitySliderActiveIndex = Math.min(slides.length - 1, activitySliderActiveIndex + 1);
    }
  } else {
    if (track.scrollLeft <= 20) {
      track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      activitySliderActiveIndex = slides.length - 1;
    } else {
      track.scrollBy({ left: -stepWidth, behavior: 'smooth' });
      activitySliderActiveIndex = Math.max(0, activitySliderActiveIndex - 1);
    }
  }

  renderActivitySliderDots(slides.length);
}

function slideToActivityIndex(index) {
  const track = document.getElementById('activities-grid');
  if (!track) return;
  const slides = track.querySelectorAll('article[data-activity-slide-index]');
  if (!slides[index]) return;

  const targetLeft = slides[index].offsetLeft - track.offsetLeft;
  track.scrollTo({ left: targetLeft, behavior: 'smooth' });
  activitySliderActiveIndex = index;
  renderActivitySliderDots(slides.length);
}

function initActivitySliderEvents() {
  const track = document.getElementById('activities-grid');
  if (!track || activityScrollListenerAttached) return;
  activityScrollListenerAttached = true;

  track.addEventListener(
    'scroll',
    () => {
      const slides = track.querySelectorAll('article[data-activity-slide-index]');
      if (!slides.length) return;
      const firstCard = slides[0];
      const stepWidth = firstCard.offsetWidth + 24;
      const currentIdx = Math.min(
        slides.length - 1,
        Math.max(0, Math.round(track.scrollLeft / stepWidth))
      );
      if (currentIdx !== activitySliderActiveIndex) {
        activitySliderActiveIndex = currentIdx;
        renderActivitySliderDots(slides.length);
      }
    },
    { passive: true }
  );
}

function startActivityAutoSlide() {
  if (activityAutoSlideTimer) {
    clearInterval(activityAutoSlideTimer);
  }
  activityAutoSlideTimer = setInterval(() => {
    if (!activityAutoSlideEnabled || activitySliderHoverPaused) return;
    slideActivities(1);
  }, 4500);
}



function updateActivityAutoSlideUI() {
  const iconEl = document.getElementById('activities-autoplay-icon');
  const labelEl = document.getElementById('activities-autoplay-label');
  if (iconEl) {
    iconEl.textContent = activityAutoSlideEnabled ? '⏸' : '▶';
  }
  if (labelEl) {
    if (AppState.lang === 'bn') {
      labelEl.textContent = activityAutoSlideEnabled ? 'অটো-স্লাইড চালু' : 'অটো-স্লাইড বন্ধ';
    } else {
      labelEl.textContent = activityAutoSlideEnabled ? 'Auto-Slide On' : 'Auto-Slide Paused';
    }
  }
}

function setActivityFilter(cat) {
  AppState.activityFilter = cat;
  activitySliderActiveIndex = 0;
  renderActivities();
  const track = document.getElementById('activities-grid');
  if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
}

/* --------------------------------------------------------------------------
 * SECTION 4: TRANSPORTATION & PRICING TABLE + FOREIGNER GLOSSARY
 * -------------------------------------------------------------------------- */
function renderTransport() {
  const glossaryContainer = document.getElementById('vehicle-glossary-cards');
  const tbody = document.getElementById('transport-table-body');
  if (!tbody) return;

  // Render Foreigner Glossary Cards
  if (glossaryContainer) {
    glossaryContainer.innerHTML = Object.keys(VEHICLE_GLOSSARY)
      .map(key => {
        const item = VEHICLE_GLOSSARY[key];
        return `
          <div class="bg-white rounded-2xl p-4 border border-sky-100 shadow-sm flex flex-col justify-between">
            <div class="flex items-center gap-2.5 mb-2">
              <span class="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <h4 class="font-bold text-slate-900 text-sm">${escapeHTML(item.title[AppState.lang])}</h4>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">${escapeHTML(item.desc[AppState.lang])}</p>
          </div>
        `;
      })
      .join('');
  }

  // Filter routes if user searched transport
  const q = AppState.searchQuery.trim().toLowerCase();
  const filteredRoutes = TRANSPORT_DATA.filter(item => {
    if (!q || (AppState.searchCategory !== 'all' && AppState.searchCategory !== 'transport')) {
      return true;
    }
    const text = `${item.route.en} ${item.route.bn} ${item.vehicle.en} ${item.vehicle.bn}`.toLowerCase();
    return text.includes(q);
  });

  tbody.innerHTML = filteredRoutes
    .map(item => {
      const priceStr = formatPriceRange(item.minBDT, item.maxBDT);
      const glossary = VEHICLE_GLOSSARY[item.vehicleKey];
      const tooltipText = glossary ? glossary.desc[AppState.lang] : '';

      return `
        <tr class="hover:bg-stone-100/60 transition">
          <!-- Route -->
          <td class="font-serif text-base text-charcoal font-normal py-4 px-6">
            <div class="flex items-center justify-between gap-3">
              <span>${escapeHTML(item.route[AppState.lang])}</span>
            </div>
          </td>

          <!-- Vehicle -->
          <td class="py-4 px-6">
            <span class="font-mono text-xs text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
              ${escapeHTML(item.vehicle[AppState.lang])}
            </span>
          </td>

          <!-- Tariff -->
          <td class="font-mono font-bold text-charcoal text-sm py-4 px-6 whitespace-nowrap">
            ${priceStr}
          </td>

          <!-- Mode Note -->
          <td class="text-xs font-mono text-stone-500 py-4 px-6">
            ${escapeHTML(item.modeNote[AppState.lang])}
          </td>

          <!-- Duration -->
          <td class="text-xs font-mono text-stone-500 py-4 px-6 whitespace-nowrap">
            ${escapeHTML(item.duration[AppState.lang])}
          </td>
        </tr>
      `;
    })
    .join('');
}

/* --------------------------------------------------------------------------
 * SECTION 5: ESSENTIAL TRAVEL INFO RENDERER
 * -------------------------------------------------------------------------- */
// Emergency numbers come only from EMERGENCY_CONTACTS (data.js, each with source + asOf).
// Pages hold an empty [data-emergency-contacts] list with 999 as the no-JS fallback.
function emergencyContactsHTML(lang) {
  const list = typeof EMERGENCY_CONTACTS !== 'undefined' && Array.isArray(EMERGENCY_CONTACTS) ? EMERGENCY_CONTACTS : [];
  if (!list.length) return '<li>999</li>';
  const checked = lang === 'bn' ? 'যাচাই' : 'checked';
  return list
    .map(c => {
      // source is a text label (or, for older entries, a URL); only an http(s) URL becomes a link.
      const url = c.sourceUrl || (/^https?:\/\//.test(c.source || '') ? c.source : '');
      const note = `${checked} ${escapeHTML(c.asOf || '')}${c.source && c.source !== url ? ` · ${escapeHTML(c.source)}` : ''}`;
      const cite = url
        ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener" class="block text-[10px] opacity-70 hover:underline">${note}</a>`
        : c.source ? `<span class="block text-[10px] opacity-70">${note}</span>` : '';
      return `
      <li>
        <span>${escapeHTML((c.name && (c.name[lang] || c.name.en)) || '')}:</span>
        <a href="tel:${escapeHTML(c.tel || c.number)}" class="font-mono font-semibold underline underline-offset-2">${escapeHTML(c.number)}</a>
        ${cite}
      </li>`;
    })
    .join('');
}

function renderEmergencyContacts() {
  const html = emergencyContactsHTML(AppState.lang);
  document.querySelectorAll('[data-emergency-contacts]').forEach(el => {
    el.innerHTML = html;
  });
}

/* --------------------------------------------------------------------------
 * SECTION 6A: INTERACTIVE FAQ ACCORDION RENDERER
 * -------------------------------------------------------------------------- */
function renderFAQs() {
  const container = document.getElementById('faq-accordion-container');
  if (!container) return;

  container.innerHTML = FAQ_DATA.map(item => {
    const isOpen = AppState.activeFaqId === item.id;
    let answerText = escapeHTML(item.answer[AppState.lang]);
    if (item.id === 'faq-2' && AppState.currency === 'USD') {
      const fare = fareById('town-to-moheshkhali');
      const converted = formatPriceRange(fare.minBDT, fare.maxBDT);
      answerText += ` (${converted})`;
    }

    return `
      <div class="faq-row ${isOpen ? 'active' : ''}">
        <button
          type="button"
          onclick="toggleFaqItem('${escapeHTML(item.id)}')"
          class="faq-trigger"
          aria-expanded="${isOpen}"
        >
          <span class="font-serif text-xl sm:text-2xl text-charcoal font-normal pr-4">${escapeHTML(item.question[AppState.lang])}</span>
          <div class="flex items-center gap-3 shrink-0">
            <span class="faq-plus-icon">+</span>
          </div>
        </button>
        <div class="faq-content">
          <p class="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl font-normal pb-4">
            ${answerText}
          </p>
        </div>
      </div>
    `;
  }).join('');
}

function toggleFaqItem(faqId) {
  AppState.activeFaqId = AppState.activeFaqId === faqId ? null : faqId;
  renderFAQs();
}

/* --------------------------------------------------------------------------
 * DYNAMIC HERO SLIDESHOW & LIVE QUICK SEARCH CONTROLLER
 * -------------------------------------------------------------------------- */
function setHeroSlide(index, isManual) {
  const slides = document.querySelectorAll('#hero-bg-slider .hero-slide');
  if (!slides.length) return;

  heroActiveSlideIndex = ((index % slides.length) + slides.length) % slides.length;

  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === heroActiveSlideIndex);
  });

  document.querySelectorAll('[data-hero-pill]').forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-hero-pill'), 10);
    const isActive = idx === heroActiveSlideIndex;
    btn.className = isActive
      ? 'px-3 py-1.5 rounded-full text-xs font-extrabold transition-all bg-amber-400 text-slate-950 shadow-md scale-105 cursor-pointer'
      : 'px-3 py-1.5 rounded-full text-xs font-bold transition-all bg-white/15 hover:bg-white/25 text-white border border-white/25 backdrop-blur-md cursor-pointer';
  });

  const meta = HERO_SCENES_META[heroActiveSlideIndex];
  if (meta && meta[AppState.lang]) {
    setText('hero-badge', meta[AppState.lang].badge);
  }

  if (isManual) {
    startHeroAutoSlider();
  }
}

function startHeroAutoSlider() {
  if (heroAutoSlideTimer) {
    clearInterval(heroAutoSlideTimer);
  }
  heroAutoSlideTimer = setInterval(() => {
    setHeroSlide(heroActiveSlideIndex + 1, false);
  }, 4800);
}

// The hero search lives on index.html; results link to the dedicated page for each item type.
function heroSearchPageFor(category, q) {
  if (category === 'hotels' || category === 'spots' || category === 'transport') {
    return { hotels: 'hotels.html', spots: 'spots.html', transport: 'transport.html' }[category];
  }
  if (/tomtom|chander|cng|speedboat|bus|rickshaw/.test(q)) return 'transport.html';
  if (/surf|parasail|horse|safari|camp|kayak|quad|atv/.test(q)) return 'activities.html';
  if (/inani|himchari|moheshkhali|ramu|sonadia|marine drive|pagoda|beach/.test(q)) return 'spots.html';
  return 'hotels.html';
}

function handleLiveHeroSearchInput() {
  const input = document.getElementById('hero-search-input');
  const dropdown = document.getElementById('hero-live-search-results');
  if (!input || !dropdown) return;

  const q = input.value.trim().toLowerCase();
  if (!q) {
    dropdown.classList.add('hidden');
    return;
  }

  const lang = AppState.lang;
  const has = (obj, ...keys) => keys.some(k => obj && typeof obj[k] === 'string' && obj[k].toLowerCase().includes(q));
  const pick = (list, test, n) => (Array.isArray(list) ? list.filter(test).slice(0, n) : []);

  const matchedHotels = pick(HOTELS_DATA, h => has(h.name, 'en', 'bn') || has(h.location, 'en'), 3);
  const allSpots = [...DESTINATIONS_DATA, ...(typeof HIDDEN_GEMS_DATA !== 'undefined' ? HIDDEN_GEMS_DATA : [])];
  const matchedSpots = pick(allSpots, s => has(s.name, 'en', 'bn') || has(s.vibe, 'en'), 3);
  const matchedActivities = pick(typeof ACTIVITIES_DATA !== 'undefined' ? ACTIVITIES_DATA : [], a => has(a.name, 'en', 'bn') || has(a.location, 'en'), 3);
  const matchedTransport = pick(TRANSPORT_DATA, tr => has(tr.route, 'en', 'bn') || has(tr.vehicle, 'en', 'bn'), 2);

  const row = (href, img, color, label, title, right) => `
      <a href="${href}" class="w-full p-2.5 rounded-xl hover:bg-stone-50 flex items-center justify-between gap-3 transition text-left">
        <div class="flex items-center gap-2.5 min-w-0">
          ${img ? `<img src="${escapeHTML(img)}" width="40" height="40" alt="" loading="lazy" decoding="async" class="w-10 h-10 rounded-lg object-cover shrink-0 bg-slate-200" />` : ''}
          <div class="min-w-0">
            <span class="block text-[10px] font-extrabold uppercase tracking-wider ${color}">${label}</span>
            <span class="block text-xs sm:text-sm font-bold text-slate-900 truncate">${escapeHTML(title)}</span>
          </div>
        </div>
        <span class="text-xs font-extrabold text-slate-800 shrink-0">${escapeHTML(right)}</span>
      </a>`;
  const isEn = lang === 'en';
  const itemsHTML = [
    ...matchedHotels.map(h => row('hotels.html', h.image, 'text-sky-700', isEn ? '🏨 Hotel' : '🏨 হোটেল', h.name[lang], formatPriceRange(h.minBDT, h.maxBDT))),
    ...matchedSpots.map(s => row('spots.html', s.image, 'text-teal-700', isEn ? '📍 Sightseeing Spot' : '📍 দর্শনীয় স্থান', s.name[lang], isEn ? 'Explore →' : 'দেখুন →')),
    ...matchedActivities.map(a => row('activities.html', a.image, 'text-amber-700', isEn ? '🏄 Coastal Activity' : '🏄 অ্যাক্টিভিটি', a.name[lang], formatPriceRange(a.priceBDT, a.priceMaxBDT))),
    ...matchedTransport.map(tr => row('transport.html', '', 'text-amber-700', isEn ? '🚕 Local Transport' : '🚕 স্থানীয় যাতায়াত', `${escapeHTML(tr.route[lang])} (${escapeHTML(tr.vehicle[lang])})`, formatPriceRange(tr.minBDT, tr.maxBDT)))
  ];

  if (!itemsHTML.length) {
    const typed = escapeHTML(input.value);
    dropdown.innerHTML = `
      <div class="p-3 text-center text-xs text-slate-500">
        ${isEn ? `No direct matches for "${typed}". Press Enter to search all sections.` : `"${typed}" এর জন্য সরাসরি কিছু পাওয়া যায়নি।`}
      </div>
    `;
  } else {
    dropdown.innerHTML = `<div class="space-y-1">${itemsHTML.join('')}</div>`;
  }
  dropdown.classList.remove('hidden');
}

function handleHeroSearch(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('hero-search-input');
  const categorySelect = document.getElementById('hero-search-category');
  const q = input ? input.value.trim().toLowerCase() : '';
  const category = categorySelect ? categorySelect.value : 'all';
  if (!q && category === 'all') return;
  window.location.href = heroSearchPageFor(category, q);
}

function resetSearchAndFilters() {
  AppState.searchQuery = '';
  AppState.searchCategory = 'all';
  AppState.hotelFilter = 'ALL';
  AppState.hotelStarFilter = 'ALL';
  AppState.hotelPriceFilter = 'ALL';
  AppState.hotelSpotFilter = 'ALL';
  AppState.hotelFacilityFilter = 'ALL';
  AppState.hotelSortBy = 'recommended';
  AppState.activityFilter = 'all';
  hotelSliderActiveIndex = 0;
  destinationSliderActiveIndex = 0;
  activitySliderActiveIndex = 0;
  hiddenGemsSliderActiveIndex = 0;
  const input = document.getElementById('hero-search-input');
  const select = document.getElementById('hero-search-category');
  if (input) input.value = '';
  if (select) select.value = 'all';
  document.getElementById('hero-live-search-results')?.classList.add('hidden');
  renderAll();
}

/* --------------------------------------------------------------------------
 * SECTION 6B: FLOATING CHATBOT ("Cox's Bazar Travel Assistant")
 * -------------------------------------------------------------------------- */
function toggleChatbot(forceState) {
  AppState.isChatOpen = typeof forceState === 'boolean' ? forceState : !AppState.isChatOpen;
  const panel = document.getElementById('chatbot-panel');
  const badge = document.getElementById('chatbot-unread-badge');

  if (!panel) return;

  if (AppState.isChatOpen) {
    panel.classList.remove('hidden-chat');
    panel.classList.add('visible-chat');
    if (badge) badge.classList.add('hidden');
    setTimeout(() => {
      document.getElementById('chatbot-input')?.focus();
    }, 200);
  } else {
    panel.classList.remove('visible-chat');
    panel.classList.add('hidden-chat');
  }
}

function renderChatQuickPrompts() {
  const container = document.getElementById('chatbot-quick-prompts');
  if (!container) return;
  const prompts = UI_TEXT[AppState.lang].chatbot.quickPrompts;

  container.innerHTML = prompts
    .map(
      prompt => `
      <button
        type="button"
        onclick="handleUserChatSubmission('${prompt.replace(/'/g, "\\'")}')"
        class="text-xs bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition cursor-pointer">
        ${prompt}
      </button>
    `
    )
    .join('');
}

function appendChatMessage(sender, htmlText) {
  const messagesBox = document.getElementById('chatbot-messages');
  if (!messagesBox) return;

  const wrapper = document.createElement('div');
  if (sender === 'user') {
    wrapper.className = 'flex justify-end';
    wrapper.innerHTML = `
      <div class="max-w-[82%] bg-sky-700 text-white px-4 py-2.5 rounded-2xl rounded-br-xs text-sm shadow-sm">
        ${escapeHTML(htmlText)}
      </div>
    `;
  } else {
    wrapper.className = 'flex items-start gap-2.5';
    wrapper.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-sky-600 to-teal-500 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
        CB
      </div>
      <div class="max-w-[88%] bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-2xl rounded-tl-xs text-xs sm:text-sm leading-relaxed shadow-xs space-y-2">
        ${htmlText}
      </div>
    `;
  }

  messagesBox.appendChild(wrapper);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

function buildChatFollowUpChips(chips) {
  if (!Array.isArray(chips) || !chips.length) return '';
  return `
    <div class="pt-2 mt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
      ${chips
        .map(
          c => `
          <button
            type="button"
            onclick="handleUserChatSubmission('${c.replace(/'/g, "\\'")}')"
            class="px-2.5 py-1 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-[11px] font-bold transition cursor-pointer"
          >
            💬 ${c}
          </button>
        `
        )
        .join('')}
    </div>
  `;
}

function buildSingleHotelChatCard(hotel, lang) {
  const priceStr = formatPriceRange(hotel.minBDT, hotel.maxBDT);
  const amenitiesStr = (hotel.amenities[lang] || []).join(' • ');
  return `
    <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-1.5">
      <div class="flex items-center gap-2.5">
        <img src="${escapeHTML(hotel.image)}" width="48" height="48" alt="${escapeHTML(hotel.name[lang])}" loading="lazy" decoding="async" class="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-200" />
        <div class="min-w-0 flex-1">
          <div class="flex items-center justify-between gap-1">
            <strong class="text-slate-900 text-xs sm:text-sm truncate">${escapeHTML(hotel.name[lang])}</strong>
            <span class="px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 text-[10px] font-medium shrink-0">${lang === 'bn' ? 'তালিকাভুক্ত' : 'Listed'}</span>
          </div>
          <div class="text-xs font-extrabold text-teal-700">${priceStr} <span class="font-normal text-slate-500">/${lang === 'en' ? 'night' : 'রাত'}</span></div>
        </div>
      </div>
      <div class="text-[11px] text-slate-600">
        📍 <strong>${lang === 'en' ? 'Location:' : 'অবস্থান:'}</strong> ${escapeHTML(hotel.location[lang])}
      </div>
      <div class="text-[11px] text-slate-600">
        ✨ <strong>${lang === 'en' ? 'Amenities:' : 'সুবিধা:'}</strong> ${escapeHTML(amenitiesStr)}
      </div>
      <div class="flex flex-wrap items-center justify-between gap-1.5 pt-1">
        ${
          hotel.phone
            ? `<a href="tel:${escapeHTML(hotel.phone.replace(/\s+/g, ''))}" class="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition">
                📞 ${escapeHTML(hotel.phone)}
              </a>`
            : ''
        }
        <a href="itinerary.html" class="px-2.5 py-1 rounded-lg bg-ocean-950 hover:bg-sky-800 text-amber-300 text-[11px] font-bold transition">
          🏨 ${lang === 'en' ? 'Plan a Trip' : 'ট্রিপ প্ল্যান করুন'}
        </a>
      </div>
    </div>
  `;
}

/**
 * ============================================================================
 * INTELLIGENT MULTI-INTENT & SPECIFIC ENTITY TRAVEL ASSISTANT ENGINE
 * ============================================================================
 */
async function fetchTravelAssistantReply(userText) {
  const raw = userText.trim();
  const q = raw.toLowerCase();
  const lang = AppState.lang;
  const fmtSingle = bdt => formatPriceRange(bdt, bdt);
  // Fares come from TRANSPORT_DATA / PRICE_BOOK.fares, so the chat quotes what the fare table says (CrtiQue_Oct21 H6).
  const fare = id => { const f = fareById(id); return formatPriceRange(f.minBDT, f.maxBDT); };
  const himchariEntry = fmtSingle(PRICE_BOOK.activities.himchari_hill.costPerPerson);
  // Distance and directions come from the spot data (Tourist Police figure), not a second number here.
  const himchariWay = DESTINATIONS_DATA.find(d => d.id === 'himchari-national-park').directions;
  const mohFare = fareById('town-to-moheshkhali');

  // Short natural thinking delay
  await new Promise(resolve => setTimeout(resolve, 320));

  // Emergency first: later matchers catch substrings of these words ("পুলিশ" contains "পুল", pool).
  if (
    q.includes('police') ||
    q.includes('emergency') ||
    q.includes('hospital') ||
    q.includes('doctor') ||
    q.includes('ambulance') ||
    q.includes('999') ||
    q.includes('lifeguard') ||
    q.includes('পুলিশ') ||
    q.includes('হাসপাতাল') ||
    q.includes('জরুরি') ||
    q.includes('সাহায্য') ||
    /^help\b|\bneed help\b|\bsos\b|\bdrown|\bfire\b|rip current|\blost\b|\bstolen\b|\btheft\b|\binjur/.test(q) ||
    ['ডাক্তার', 'অ্যাম্বুলেন্স', 'এম্বুলেন্স', 'লাইফগার্ড', 'ডুবে যা', 'আগুন', 'চুরি', 'হারিয়ে'].some(w => q.includes(w))
  ) {
    return `
      <div>🚨 <strong>${lang === 'en' ? 'Emergency numbers:' : 'জরুরি নম্বর:'}</strong></div>
      <ul class="space-y-1.5 text-xs">${emergencyContactsHTML(lang)}</ul>
    `;
  }

  // --------------------------------------------------------------------------
  // 1. CHECK FOR SPECIFIC HOTEL BY NAME FIRST (Never dump generic list if user asks about 1 hotel!)
  // --------------------------------------------------------------------------
  const hotelAliasMap = [
    { id: 'sayeman-beach-resort', keys: ['sayeman', 'সায়মন', 'সায়মন বিচ'] },
    { id: 'sea-pearl-beach-resort', keys: ['sea pearl', 'royal tulip', 'সী পার্ল', 'রয়্যাল টিউলিপ', 'সি পার্ল'] },
    { id: 'mermaid-beach-resort', keys: ['mermaid beach', 'মারমেইড বিচ'] },
    { id: 'ocean-paradise-hotel', keys: ['ocean paradise', 'ওশান প্যারাডাইস', 'ওশন প্যারাডাইস'] },
    { id: 'hotel-the-cox-today', keys: ['cox today', 'কক্স টুডে', 'the cox today'] },
    { id: 'best-western-bay-watch', keys: ['best western', 'bay watch', 'বেস্ট ওয়েস্টার্ন', 'বে ওয়াচ'] },
    { id: 'long-beach-hotel', keys: ['long beach', 'লং বিচ'] },
    { id: 'seagull-hotel', keys: ['seagull', 'সীগাল', 'সিগাল'] },
    { id: 'mermaid-eco-resort', keys: ['mermaid eco', 'মারমেইড ইকো'] },
    { id: 'praasad-paradise', keys: ['praasad', 'প্রসাদ'] },
    { id: 'hotel-sea-crown', keys: ['sea crown', 'seacrown', 'সী ক্রাউন', 'সি ক্রাউন'] },
    { id: 'hotel-kollol', keys: ['kollol', 'কল্লোল', 'kasundi', 'কাসুন্দি'] },
    { id: 'prime-park-hotel', keys: ['prime park', 'primepark', 'প্রাইম পার্ক'] },
    { id: 'white-orchid', keys: ['white orchid', 'whiteorchid', 'হোয়াইট অর্কিড'] },
    { id: 'hotel-shaibal', keys: ['shaibal', 'শৈবাল', 'parjatan', 'পর্যটন'] },
    { id: 'windy-terrace-boutique', keys: ['windy terrace', 'উইন্ডি টেরেস'] }
  ];

  const matchedSpecificHotels = [];
  hotelAliasMap.forEach(entry => {
    if (entry.keys.some(k => q.includes(k))) {
      const found = HOTELS_DATA.find(h => h.id === entry.id);
      if (found) matchedSpecificHotels.push(found);
    }
  });

  if (matchedSpecificHotels.length > 0) {
    const cards = matchedSpecificHotels.map(h => buildSingleHotelChatCard(h, lang)).join('');
    const h0 = matchedSpecificHotels[0];
    const leadText =
      lang === 'en'
        ? `Here are the listed details for <strong>${escapeHTML(h0.name.en)}</strong>:`
        : `<strong>${escapeHTML(h0.name.bn)}</strong>-এর সুনির্দিষ্ট তথ্য নিচে দেওয়া হলো:`;

    return `
      <div>${leadText}</div>
      <div class="space-y-2">${cards}</div>
      ${buildChatFollowUpChips(
        lang === 'en'
          ? ['Cheapest hotel?', 'Hotels near Laboni Beach', 'My trip budget?']
          : ['সবচেয়ে সস্তা হোটেল কোনটি?', 'লাবণী বিচের হোটেল', 'আমার ট্রিপ বাজেট কত?']
      )}
    `;
  }

  // --------------------------------------------------------------------------
  // 2. SPECIFIC HOTEL COMPARISON / FILTER INTENTS (Cheapest, Pool, Beachfront, Area)
  // --------------------------------------------------------------------------
  const isAskingHotel =
    q.includes('hotel') ||
    q.includes('resort') ||
    q.includes('stay') ||
    q.includes('room') ||
    q.includes('accommodation') ||
    q.includes('হোটেল') ||
    q.includes('রিসোর্ট') ||
    q.includes('থাকার') ||
    q.includes('রুম');

  const isAskingCheap =
    q.includes('cheap') ||
    q.includes('budget') ||
    q.includes('low price') ||
    q.includes('lowest') ||
    q.includes('affordable') ||
    q.includes('সস্তা') ||
    q.includes('কম দামে') ||
    q.includes('সাশ্রয়ী');

  const sortedCheap = [...HOTELS_DATA].sort((a, b) => a.minBDT - b.minBDT).slice(0, 2);
  if (isAskingCheap && (isAskingHotel || !(q.includes('food') || q.includes('trip'))) && sortedCheap.length) {
    const cheapest = sortedCheap[0];
    return lang === 'en'
      ? `
        <div>💡 <strong>Most Budget-Friendly Listed Hotels:</strong></div>
        <div>The lowest listed rate is at <strong>${escapeHTML(cheapest.name.en)}</strong>, from <strong>${formatPriceRange(cheapest.minBDT, cheapest.maxBDT)}/night</strong>:</div>
        <div class="space-y-2">${sortedCheap.map(h => buildSingleHotelChatCard(h, lang)).join('')}</div>
        ${buildChatFollowUpChips(['Beachfront hotel?', 'Hotel with swimming pool?', 'My trip budget?'])}
      `
      : `
        <div>💡 <strong>কম ভাড়ার হোটেল (তালিকা থেকে):</strong></div>
        <div>সবচেয়ে কম তালিকাভুক্ত ভাড়া <strong>${escapeHTML(cheapest.name.bn)}</strong>-এ (প্রতি রাত <strong>${formatPriceRange(cheapest.minBDT, cheapest.maxBDT)}</strong> থেকে):</div>
        <div class="space-y-2">${sortedCheap.map(h => buildSingleHotelChatCard(h, lang)).join('')}</div>
        ${buildChatFollowUpChips(['সৈকত সংলগ্ন হোটেল?', 'সুইমিং পুলসহ হোটেল?', 'আমার ট্রিপ বাজেট কত?'])}
      `;
  }

  const poolHotels = HOTELS_DATA.filter(h => JSON.stringify(h.amenities || '').toLowerCase().includes('pool')).slice(0, 2);
  if ((q.includes('pool') || q.includes('পুল') || q.includes('সুইমিং')) && poolHotels.length) {
    return `
        <div>🏊 <strong>${lang === 'en' ? 'Listed hotels with a swimming pool:' : 'সুইমিং পুলসহ তালিকাভুক্ত হোটেল:'}</strong></div>
        <div class="space-y-2">${poolHotels.map(h => buildSingleHotelChatCard(h, lang)).join('')}</div>
        ${buildChatFollowUpChips(lang === 'en' ? ['Cheapest hotel?', 'Laboni Beach info'] : ['সবচেয়ে সস্তা হোটেল কোনটি?'])}
      `;
  }

  if (
    isAskingHotel &&
    (q.includes('beachfront') ||
      q.includes('sea view') ||
      q.includes('ocean') ||
      q.includes('best') ||
      q.includes('family') ||
      q.includes('সৈকত') ||
      q.includes('সেরা') ||
      q.includes('ফ্যামিলি'))
  ) {
    const picks = HOTELS_DATA.filter(h => /beach|sea|সৈকত/i.test(JSON.stringify(h.amenities || ''))).slice(0, 2);
    const shown = picks.length ? picks : HOTELS_DATA.slice(0, 2);
    return `
        <div>🌊 <strong>${lang === 'en' ? 'Hotels near the beach (from our list):' : 'সৈকতের কাছের হোটেল (তালিকা থেকে):'}</strong></div>
        <div class="space-y-2">${shown.map(h => buildSingleHotelChatCard(h, lang)).join('')}</div>
        ${buildChatFollowUpChips(lang === 'en' ? ['Cheapest hotel?', 'Best seafood nearby?', 'My trip budget?'] : ['সবচেয়ে সস্তা হোটেল কোনটি?', 'সেরা সি-ফুড রেস্তোরাঁ?'])}
      `;
  }

  // --------------------------------------------------------------------------
  // 3. SPECIFIC TOURIST SPOTS, HIDDEN GEMS & BEACHES
  // --------------------------------------------------------------------------
  const spotKnowledge = [
    {
      id: 'spot-inani',
      keys: ['inani', 'ইনানী', 'ইনানি', 'coral boulder', 'pathani patar'],
      title: { en: '🪨 Inani Coral Beach (32 km South)', bn: '🪨 ইনানী প্রবাল সৈকত (৩২ কিমি দক্ষিণে)' },
      body: {
        en: `• <strong>Why Visit:</strong> Famous 18 km shoreline with ancient black coral boulders, calm tidal pools & crystal-clear water.<br/>• <strong>How to Go:</strong> 32 km south of town via scenic Marine Drive (~1 hour).<br/>• <strong>Transport & Fare:</strong> Reserved <strong>Chander Gari (Open Jeep)</strong> costs <strong>${fare('town-to-inani')}</strong> for a group, or rent a <strong>Bike/Scooter</strong> for <strong>${fmtSingle(1500)}/day</strong>.<br/>• <strong>Best Time:</strong> Morning during low tide (when coral rocks are exposed) or sunset.`,
        bn: `• <strong>কেন যাবেন:</strong> প্রাচীন প্রবাল পাথর, স্বচ্ছ নীল জলরাশি ও শান্ত ঢেউয়ের জন্য বিখ্যাত ১৮ কিমি দীর্ঘ সৈকত।<br/>• <strong>দূরত্ব ও সময়:</strong> মেরিন ড্রাইভ ধরে শহর থেকে ৩২ কিমি দক্ষিণে (প্রায় ১ ঘণ্টা)।<br/>• <strong>যাতায়াত ভাড়া:</strong> গ্রুপের জন্য রিজার্ভ <strong>চান্দের গাড়ি</strong> ভাড়া <strong>${fare('town-to-inani')}</strong> অথবা সারাদিনের জন্য <strong>বাইক ভাড়া ${fmtSingle(1500)}</strong>।`
      },
      chips: {
        en: ['Himchari waterfall info', 'Shamlapur sunset point', 'Marine Drive bike cost?'],
        bn: ['হিমছড়ি ঝর্ণার তথ্য', 'শামলাপুর সানসেট পয়েন্ট', 'মেরিন ড্রাইভে বাইক ভাড়া?']
      }
    },
    {
      id: 'spot-himchari',
      keys: ['himchari', 'himchori', 'হিমছড়ি', 'হিমছড়ি', 'waterfall', 'ঝর্ণা'],
      title: { en: '⛰️ Himchari National Park & Waterfalls', bn: '⛰️ হিমছড়ি জাতীয় উদ্যান ও ঝর্ণা' },
      body: {
        en: `• <strong>Why Visit:</strong> 1,729-hectare evergreen reserve (Est. 1980) where green hills meet the Bay of Bengal, featuring coastal waterfalls and hilltop ocean viewpoints.<br/>• <strong>How to Go:</strong> ${escapeHTML(himchariWay.en)}<br/>• <strong>Transport & Fare:</strong> Reserved <strong>CNG Auto-Rickshaw</strong> costs <strong>${fare('town-to-himchari')}</strong>, or a reserved <strong>Chander Gari</strong> round trip for a group costs <strong>${fare('town-to-himchari-jeep')}</strong>.<br/>• <strong>Entry:</strong> ~${himchariEntry} per person.`,
        bn: `• <strong>কেন যাবেন:</strong> ১,৭২৯ হেক্টর সংরক্ষিত চিরহরিৎ বন, প্রাকৃতিক ঝর্ণা এবং পাহাড়ের চূড়া থেকে বঙ্গোপসাগরের প্যানোরামিক ভিউ।<br/>• <strong>দূরত্ব ও সময়:</strong> ${escapeHTML(himchariWay.bn)}<br/>• <strong>যাতায়াত ভাড়া:</strong> রিজার্ভ <strong>সিএনজি ভাড়া ${fare('town-to-himchari')}</strong>, গ্রুপের জন্য রিজার্ভ চান্দের গাড়িতে আসা-যাওয়া <strong>${fare('town-to-himchari-jeep')}</strong>। প্রবেশ ফি জনপ্রতি ~${himchariEntry}।`
      },
      chips: {
        en: ['How to reach Inani?', 'Marine Drive bike cost?', 'Best time to visit?'],
        bn: ['ইনানী সৈকতে কীভাবে যাব?', 'মেরিন ড্রাইভে বাইক ভাড়া?', 'ভ্রমণের সেরা সময়?']
      }
    },
    {
      id: 'spot-moheshkhali',
      keys: ['moheshkhali', 'maheshkhali', 'মহেশখালী', 'adinath', 'আদিনাথ', 'kasturi ghat', 'কস্তুরাঘাট', '6 no ghat', '৬ নং ঘাট'],
      title: { en: '🏝️ Moheshkhali Island & Adinath Temple', bn: '🏝️ মহেশখালী দ্বীপ ও আদিনাথ মন্দির' },
      body: {
        en: `• <strong>Why Visit:</strong> Bangladesh's only hilly island—home to the historic <strong>Adinath Shiva Temple</strong> atop Mainak Hill, Rakhine Buddhist pagodas, and coastal salt pans.<br/>• <strong>How to Go:</strong> Take a Tomtom to <strong>Kasturi Ghat (6 No. Jetty)</strong> in Cox's Bazar town, then board a <strong>speedboat (about 30 minutes)</strong> across the Bakkhali channel.<br/>• <strong>Exact Fare:</strong> Speedboat is <strong>${formatPriceRange(mohFare.minBDT, mohFare.maxBDT)} per passenger</strong> each way (life jackets provided). On the island, local Tomtoms/rickshaws to Adinath Hill cost ~${formatPriceRange(100, 150)}.`,
        bn: `• <strong>কেন যাবেন:</strong> বাংলাদেশের একমাত্র পাহাড়ি দ্বীপ—মৈনাক পাহাড়ের চূড়ায় ঐতিহাসিক <strong>আদিনাথ মন্দির</strong>, বৌদ্ধ প্যাগোডা ও লবণের মাঠ।<br/>• <strong>কীভাবে যাবেন:</strong> শহরের <strong>কস্তুরাঘাট (৬ নং ঘাট)</strong> থেকে স্পিডবোটে প্রায় ৩০ মিনিটে মহেশখালী যাওয়া যায়।<br/>• <strong>ভাড়া:</strong> স্পিডবোট ভাড়া জনপ্রতি <strong>${formatPriceRange(mohFare.minBDT, mohFare.maxBDT)}</strong>।`
      },
      chips: {
        en: ['Sonadia Island camping', 'Ramu 100ft Buddha', 'Add to my itinerary'],
        bn: ['সোনাদিয়া দ্বীপ ক্যাম্পিং', 'রামু ১০০ ফুট বুদ্ধ মূর্তি', 'আমার ট্রিপ বাজেট কত?']
      }
    },
    {
      id: 'spot-ramu-buddha',
      keys: ['ramu', 'রামু', 'buddha', 'বুদ্ধ', 'monastery', 'বিহার', '100 feet', '১০০ ফুট'],
      title: { en: '🛕 100 Feet Reclining Golden Buddha at Ramu', bn: '🛕 রামুর ভুবন শান্তি ১০০ ফুট স্বর্ণালী বুদ্ধ মূর্তি' },
      body: {
        en: `• <strong>Why Visit:</strong> Home to the awe-inspiring 100-foot reclining Gautama Buddha statue (<em>Vimukti Bibartanarama</em>, Est. 2007) and ancient wooden Rakhine Buddhist monasteries.<br/>• <strong>How to Go:</strong> 16 km east of Cox's Bazar town along the Chittagong-Cox's Bazar highway (~40 mins).<br/>• <strong>Transport & Fare:</strong> Reserved <strong>CNG Auto-Rickshaw</strong> costs <strong>${formatPriceRange(400, 500)}</strong>.<br/>• <strong>Etiquette Tip:</strong> Remove shoes and cover shoulders & knees before entering temple halls.`,
        bn: `• <strong>কেন যাবেন:</strong> উত্তর মিঠাছড়িতে অবস্থিত ১০০ ফুট দীর্ঘ শায়িত গৌতম বুদ্ধ মূর্তি এবং প্রাচীন বৌদ্ধ বিহার।<br/>• <strong>দূরত্ব ও সময়:</strong> শহর থেকে ১৬ কিমি পূর্বে (প্রায় ৪০ মিনিট)।<br/>• <strong>যাতায়াত ভাড়া:</strong> রিজার্ভ <strong>সিএনজি ভাড়া ${formatPriceRange(400, 500)}</strong>।<br/>• <strong>সৌজন্যতা:</strong> মন্দিরে প্রবেশের আগে জুতো খুলুন এবং শালীন পোশাক পরিধান করুন।`
      },
      chips: {
        en: ['Moheshkhali Island info', 'Radiant Fish World', 'Cultural dress code?'],
        bn: ['মহেশখালী দ্বীপ ভ্রমণ', 'রেডিয়েন্ট ফিশ ওয়ার্ল্ড', 'পোশাক ও সংস্কৃতি বিধি?']
      }
    },
    {
      id: 'spot-radiant-fish-world',
      keys: ['radiant', 'aquarium', 'fish world', 'রেডিয়েন্ট', 'অ্যাকোয়ারিয়াম', 'ফিশ ওয়ার্ল্ড', 'shark'],
      title: { en: '🐠 Radiant Fish World Aquarium (Jhautola)', bn: '🐠 রেডিয়েন্ট ফিশ ওয়ার্ল্ড অ্যাকোয়ারিয়াম (ঝাউতলা)' },
      body: {
        en: `• <strong>Why Visit:</strong> Bangladesh's first marine aquarium featuring 100+ Bay of Bengal species, sharks, rays, and a walk-through underwater glass tunnel.<br/>• <strong>Location:</strong> Right in <strong>Jhautola town center</strong> (5 mins from Laboni/Sugandha by Tomtom for <strong>${formatPriceRange(15, 20)}</strong>).<br/>• <strong>Entry Ticket:</strong> ~<strong>${fmtSingle(300)}</strong> per person. Great for families and evening visits (right next to Poushee Restaurant!).`,
        bn: `• <strong>কেন যাবেন:</strong> বাংলাদেশের প্রথম সামুদ্রিক অ্যাকোয়ারিয়াম—যেখানে ১০০+ প্রজাতির মাছ, হাঙর এবং আন্ডারওয়াটার গ্লাস টানেল রয়েছে।<br/>• <strong>অবস্থান ও ভাড়া:</strong> শহরের ঝাউতলায় অবস্থিত (টমটম ভাড়া মাত্র <strong>${formatPriceRange(15, 20)}</strong>)। প্রবেশ টিকিট জনপ্রতি প্রায় <strong>${fmtSingle(300)}</strong>।`
      },
      chips: {
        en: ['Poushee Restaurant cost?', 'Laboni & Sugandha Beach', '3-Day Family Plan'],
        bn: ['পৌষী রেস্তোরাঁর খাবার খরচ?', 'লাবণী ও সুগন্ধা সৈকত', '৩ দিনের ফ্যামিলি প্ল্যান']
      }
    },
    {
      id: 'spot-sonadia',
      keys: ['sonadia', 'সোনাদিয়া', 'camping', 'ক্যাম্পিং', 'turtle', 'red crab', 'লাল কাঁকড়া'],
      title: { en: '⛺ Sonadia Ecological Island (9 sq. km)', bn: '⛺ সোনাদিয়া দ্বীপ (বিচ ক্যাম্পিং ও লাল কাঁকড়া)' },
      body: {
        en: `• <strong>Why Visit:</strong> Untouched crescent barrier island northwest of Cox's Bazar—famous for winter beach camping, mangrove forests, red ghost crabs, and Olive Ridley sea turtle nesting.<br/>• <strong>How to Go:</strong> Board a boat/speedboat from <strong>Kasturi Ghat (6 No. Ghat)</strong> via Moheshkhali channel.<br/>• <strong>Est. Activity Cost:</strong> ~<strong>${fmtSingle(900)}</strong> for eco-boat transfer & island excursion. Best visited Nov–Feb.`,
        bn: `• <strong>কেন যাবেন:</strong> নির্জন অর্ধচন্দ্রাকার দ্বীপ—শীতকালীন বিচ ক্যাম্পিং, লাল কাঁকড়া, প্যারাবন এবং সামুদ্রিক কাছিমের জন্য বিখ্যাত।<br/>• <strong>কীভাবে যাবেন:</strong> শহরের কস্তুরাঘাট থেকে ট্রলার বা স্পিডবোটে যাওয়া যায় (বোট ও ইকো ট্রিপ খরচ ~<strong>${fmtSingle(900)}</strong>)।`
      },
      chips: {
        en: ['Moheshkhali speedboat?', 'Best season to visit?', 'Shamlapur sunset point'],
        bn: ['মহেশখালী স্পিডবোট ভাড়া?', 'ভ্রমণের সেরা সময়?', 'শামলাপুর সানসেট পয়েন্ট']
      }
    },
    {
      id: 'spot-shamlapur-sunset',
      keys: ['shamlapur', 'শামলাপুর', 'sampan', 'সাম্পান', 'baharchhara', 'বাহারছড়া', 'sunset point', 'সূর্যাস্ত'],
      title: { en: '🌅 Shamlapur Marine Drive Sunset & Sampan Boats', bn: '🌅 শামলাপুর বাহারছড়া সাম্পান ঘাট ও সূর্যাস্ত' },
      body: {
        en: `• <strong>Why Visit:</strong> Located 45 km south at Baharchhara on Marine Drive—famous for traditional crescent-prowed wooden <strong>Sampan fishing boats</strong> lined up against golden-hour skies.<br/>• <strong>How to Go:</strong> Ride a rented <strong>Bike (${fmtSingle(1500)}/day)</strong> or a full-day <strong>Chander Gari (${fare('town-to-shamlapur-jeep')})</strong> past Inani Beach.<br/>• <strong>Safety Tip:</strong> Enjoy the 5:00 PM sunset and start your return ride toward Cox's Bazar town before dark.`,
        bn: `• <strong>কেন যাবেন:</strong> মেরিন ড্রাইভের ৪৫ কিমি দক্ষিণে বাহারছড়ায় অবস্থিত—ঐতিহ্যবাহী কাঠের সাম্পান নৌকা ও গোধূলির সূর্যাস্তের ছবির জন্য অনন্য।<br/>• <strong>কীভাবে যাবেন:</strong> ইনানী পেরিয়ে বাইকে বা চান্দের গাড়িতে সহজেই যাওয়া যায়।`
      },
      chips: {
        en: ['Marine Drive bike cost?', 'Inani Beach details', 'Is Marine Drive safe at night?'],
        bn: ['মেরিন ড্রাইভে বাইক ভাড়া?', 'ইনানী সৈকত বিস্তারিত', 'রাতে মেরিন ড্রাইভ কি নিরাপদ?']
      }
    },
    {
      id: 'spot-kolatoli-eco-park',
      keys: ['eco park', 'ইকো পার্ক', 'darianagar', 'দরিয়ানগর', 'trekking', 'ট্রেকিং'],
      title: { en: '🌿 Kolatoli Eco Park & Darianagar Hill Trails', bn: '🌿 কলাতলী ইকো পার্ক ও দরিয়ানগর পাহাড়ি ট্রেইল' },
      body: {
        en: `• <strong>Why Visit:</strong> Coastal hill ridges and caves rising directly behind South Kolatoli & Darianagar (5 km from town), offering panoramic views over the Bay of Bengal and nearby beach parasailing.`,
        bn: `• <strong>কেন যাবেন:</strong> দক্ষিণ কলাতলী ও দরিয়ানগরের পাহাড়ি ট্রেইল থেকে বঙ্গোপসাগরের অপূর্ব দৃশ্য এবং প্যারাসেইলিং জোন।`
      },
      chips: {
        en: ['Parasailing cost?', 'Himchari National Park'],
        bn: ['প্যারাসেইলিং খরচ কত?', 'হিমছড়ি জাতীয় উদ্যান']
      }
    },
    {
      id: 'spot-najirartek-shutki',
      keys: ['najirartek', 'nazirartek', 'নাজিরারটেক', 'shutki', 'শুঁটকি', 'dried fish'],
      title: { en: '🐟 Najirartek Dried Fish Hub (200-Acre Shutki Palli)', bn: '🐟 নাজিরারটেক শুঁটকি মহাল (দেশের বৃহত্তম শুঁটকি পল্লী)' },
      body: {
        en: `• <strong>Why Visit:</strong> Bangladesh's largest sun-dried marine fish (<em>Shutki</em>) processing estuary west of Cox's Bazar Airport, where thousands of bamboo racks dry Rupchanda, Loitta, and Chhuri fish.<br/>• <strong>How to Go:</strong> 20 mins by Tomtom/CNG from town. Best visited between 8:00 AM and 11:00 AM; you can also buy fresh wholesale dried fish here.`,
        bn: `• <strong>কেন যাবেন:</strong> বিমানবন্দরের পশ্চিমে বাঁকখালী নদীর মোহনায় ২০০ একর জুড়ে দেশের বৃহত্তম শুঁটকি মহাল।<br/>• <strong>টিপস:</strong> সকাল ৮টা–১১টার মধ্যে ঘুরে দেখার সেরা সময়; এখান থেকে পাইকারি দামে ভালো মানের লইট্টা ও রূপচাঁদা শুঁটকি কেনা যায়।`
      },
      chips: {
        en: ['Burmese Market shopping', 'Best seafood restaurants?', 'Moheshkhali Island'],
        bn: ['বার্মিজ মার্কেটে কেনাকাটা', 'সেরা সি-ফুড রেস্তোরাঁ?', 'মহেশখালী দ্বীপ']
      }
    },
    {
      id: 'spot-laboni-sugandha',
      keys: ['laboni', 'sugandha', 'লাবণী', 'সুগন্ধা', 'kolatoli beach', 'কলাতলী সৈকত'],
      title: { en: '🏖️ Laboni, Sugandha & Kolatoli Main Beaches', bn: '🏖️ লাবণী, সুগন্ধা ও কলাতলী প্রধান সমুদ্র সৈকত' },
      body: {
        en: `• <strong>Laboni Point:</strong> Closest to town, iconic beach monument, Burmese handicraft markets, and <strong>Hotel Kollol</strong>.<br/>• <strong>Sugandha Point:</strong> Famous for evening live fish-fry stalls, water sports (Jet Ski/ATV), and <strong>Hotel Sea Crown</strong>.<br/>• <strong>Kolatoli Point:</strong> Main bus arrival hub (Dolphin Mor) with <strong>Prime Park Hotel</strong> & <strong>White Orchid</strong>.<br/>• <strong>Transit:</strong> Shared <strong>Tomtoms</strong> connect all three points in 5–10 mins for just <strong>${formatPriceRange(10, 20)}</strong>!`,
        bn: `• <strong>লাবণী পয়েন্ট:</strong> শহরের সবচেয়ে কাছে, বার্মিজ মার্কেট ও <strong>হোটেল কল্লোল</strong> সংলগ্ন।<br/>• <strong>সুগন্ধা পয়েন্ট:</strong> সন্ধ্যার লাইভ ফিশ ফ্রাই মার্কেট, জেট স্কি ও <strong>হোটেল সী ক্রাউন</strong> সংলগ্ন।<br/>• <strong>কলাতলী পয়েন্ট:</strong> বাস নামার প্রধান স্থান (ডলফিন মোড়)।<br/>• <strong>যাতায়াত:</strong> মাত্র <strong>${formatPriceRange(10, 20)}</strong> টমটম ভাড়ায় এক পয়েন্ট থেকে অন্য পয়েন্টে যাওয়া যায়!`
      },
      chips: {
        en: ['Hotel Sea Crown details', 'Sugandha live fish fry?', 'Swimming safety rules?'],
        bn: ['হোটেল সী ক্রাউন বিস্তারিত', 'সুগন্ধা ফিশ ফ্রাই মার্কেট?', 'সৈকতে গোসলের নিয়ম?']
      }
    }
  ];

  const matchedSpots = spotKnowledge.filter(sp => sp.keys.some(k => q.includes(k)));
  // sp.body is HTML written in this file (no user input), so it is inserted as-is; titles stay escaped.
  if (matchedSpots.length > 0) {
    const blocks = matchedSpots
      .map(
        sp => `
        <div class="p-3 rounded-xl bg-sky-50/70 border border-sky-200/80 space-y-1.5">
          <div class="font-extrabold text-ocean-950 text-xs sm:text-sm">${escapeHTML(sp.title[lang])}</div>
          <div class="text-xs text-slate-700 leading-relaxed">${sp.body[lang]}</div>
          <div class="pt-1 flex flex-wrap gap-1.5">
            <a href="itinerary.html" class="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold transition">
              ${lang === 'en' ? 'Plan a Trip' : 'ট্রিপ প্ল্যান করুন'}
            </a>
          </div>
        </div>
      `
      )
      .join('');

    return `
      <div class="space-y-2.5">${blocks}</div>
      ${buildChatFollowUpChips(matchedSpots[0].chips[lang])}
    `;
  }

  // Saint Martin / Teknaf / Patuartek specific query
  if (q.includes('martin') || q.includes('মার্টিন') || q.includes('টেকনাফ') || q.includes('teknaf') || q.includes('patuartek') || q.includes('পাটুয়ারটেক')) {
    const stMartin = escapeHTML(FAQ_DATA.find(f => f.id === 'faq-8').answer[lang]); // one source: the sourced FAQ in data.js
    return lang === 'en'
      ? `
        <div>🚢 <strong>Teknaf, Patuartek & Saint Martin's Island Info:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • <strong>Marine Drive to Teknaf:</strong> The scenic Marine Drive runs a full <strong>80 km</strong> from Kolatoli through Himchari, Inani (32 km), Patuartek, and Shamlapur (45 km) down to Teknaf.<br/>
          • <strong>Saint Martin's Island:</strong> ${stMartin}<br/>
          • <strong>Best Alternative Island Trips Year-Round:</strong> Visit <strong>Moheshkhali Island</strong> (about 30 min by speedboat from Kasturi Ghat, ${formatPriceRange(mohFare.minBDT, mohFare.maxBDT)}) or <strong>Sonadia Island</strong>!
        </div>
        ${buildChatFollowUpChips(['Moheshkhali Island info', 'Sonadia Island camping', '5-Day Bike & Island Plan'])}
      `
      : `
        <div>🚢 <strong>টেকনাফ, পাটুয়ারটেক ও সেন্টমার্টিন তথ্য:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • <strong>মেরিন ড্রাইভ (৮০ কিমি):</strong> কলাতলী থেকে হিমছড়ি, ইনানী (৩২ কিমি), পাটুয়ারটেক ও শামলাপুর (৪৫ কিমি) হয়ে টেকনাফ পর্যন্ত ৮০ কিমি দীর্ঘ।<br/>
          • <strong>সেন্টমার্টিন দ্বীপ:</strong> ${stMartin}<br/>
          • <strong>দ্বীপ ভ্রমণ বিকল্প:</strong> কস্তুরাঘাট থেকে প্রায় ৩০ মিনিটে <strong>মহেশখালী দ্বীপ</strong> (${formatPriceRange(mohFare.minBDT, mohFare.maxBDT)}) এবং <strong>সোনাদিয়া দ্বীপ</strong> সহজেই ভ্রমণ করতে পারেন।
        </div>
        ${buildChatFollowUpChips(['মহেশখালী দ্বীপ ভ্রমণ', 'সোনাদিয়া দ্বীপ ক্যাম্পিং', 'মেরিন ড্রাইভে বাইক ভাড়া?'])}
      `;
  }

  // --------------------------------------------------------------------------
  // 4. SPECIFIC FOOD, SEAFOOD & RESTAURANT QUERIES (Poushee, Jhaubon, Mermaid, etc.)
  // --------------------------------------------------------------------------
  if (
    q.includes('food') ||
    q.includes('eat') ||
    q.includes('restaurant') ||
    q.includes('dining') ||
    q.includes('seafood') ||
    q.includes('poushee') ||
    q.includes('jhaubon') ||
    q.includes('mermaid') ||
    q.includes('salt bistro') ||
    q.includes('handi') ||
    q.includes('fish fry') ||
    q.includes('rupchanda') ||
    q.includes('loitta') ||
    q.includes('crab') ||
    q.includes('mezbani') ||
    q.includes('খাবার') ||
    q.includes('রেস্তোরাঁ') ||
    q.includes('রেস্টুরেন্ট') ||
    q.includes('পৌষী') ||
    q.includes('ঝাউবন') ||
    q.includes('মারমেইড') ||
    q.includes('সি-ফুড') ||
    q.includes('মাছ') ||
    q.includes('কাঁকড়া') ||
    q.includes('ভর্তা')
  ) {
    if (q.includes('poushee') || q.includes('পৌষী') || q.includes('mezbani') || q.includes('ভর্তা')) {
      return lang === 'en'
        ? `
          <div>🍛 <strong>Poushee Restaurant (Jhautola Main Road):</strong></div>
          <div class="text-xs text-slate-700 space-y-1">
            • <strong>Famous For:</strong> Traditional Chittagong Mezbani beef, crispy Loitta fish fry, Rupchanda curry, and <strong>25+ types of local Bharta</strong> (mashed specialties).<br/>
            • <strong>Avg. Meal Cost:</strong> ~<strong>${fmtSingle(450)} per person</strong>.<br/>
            • <strong>How to Go:</strong> 5 mins by shared Tomtom (${formatPriceRange(15, 20)}) from Laboni or Sugandha Beach.
          </div>
          ${buildChatFollowUpChips(['Mermaid Beach Cafe?', 'Sugandha live fish fry?', 'Radiant Fish World nearby'])}
        `
        : `
          <div>🍛 <strong>পৌষী রেস্তোরাঁ (ঝাউতলা মেইন রোড):</strong></div>
          <div class="text-xs text-slate-700 space-y-1">
            • <strong>বিখ্যাত খাবার:</strong> ঐতিহ্যবাহী মেজবানি গোশত, লইট্টা ফ্রাই, রূপচাঁদা মাছ ও ২৫+ পদের সুস্বাদু ভর্তা।<br/>
            • <strong>গড় খরচ:</strong> জনপ্রতি প্রায় <strong>${fmtSingle(450)}</strong>। (লাবণী/সুগন্ধা থেকে টমটম ভাড়া ${formatPriceRange(15, 20)})।
          </div>
          ${buildChatFollowUpChips(['মারমেইড বিচ ক্যাফে?', 'সুগন্ধা লাইভ ফিশ ফ্রাই?', 'রেডিয়েন্ট ফিশ ওয়ার্ল্ড'])}
        `;
    }

    if (q.includes('mermaid') || q.includes('মারমেইড')) {
      return lang === 'en'
        ? `
          <div>🦞 <strong>Mermaid Beach Cafe (Marine Drive / Pechardwip):</strong></div>
          <div class="text-xs text-slate-700 space-y-1">
            • <strong>Vibe:</strong> Iconic beachfront eco-cafe with bamboo cabanas, wood-fired seafood platters, grilled lobster/snapper, and candlelight ocean dining.<br/>
            • <strong>Avg. Cost:</strong> ~<strong>${fmtSingle(1400)} per person</strong>. Ideal stop during a Marine Drive afternoon ride!
          </div>
          ${buildChatFollowUpChips(['Poushee Restaurant cost?', 'Marine Drive bike cost?', 'Inani Beach route'])}
        `
        : `
          <div>🦞 <strong>মারমেইড বিচ ক্যাফে (মেরিন ড্রাইভ):</strong></div>
          <div class="text-xs text-slate-700 space-y-1">
            • <strong>বিশেষত্ব:</strong> সমুদ্রের পাড়ে ক্যান্ডেললাইট ডিনার, সি-ফুড প্ল্যাটার ও মনোরম পরিবেশ।<br/>
            • <strong>গড় খরচ:</strong> জনপ্রতি প্রায় <strong>${fmtSingle(1400)}</strong>।
          </div>
          ${buildChatFollowUpChips(['পৌষী রেস্তোরাঁর খরচ?', 'মেরিন ড্রাইভে বাইক ভাড়া?'])}
        `;
    }

    return lang === 'en'
      ? `
        <div>🍽️ <strong>Best Places to Eat in Cox's Bazar (With Avg. Per-Person Cost):</strong></div>
        <div class="text-xs text-slate-700 space-y-1.5">
          • 🍛 <strong>Poushee Restaurant (Jhautola):</strong> Famous 25+ Bhartas, Loitta fry & Mezbani beef — <strong>~${fmtSingle(450)}</strong><br/>
          • 🐟 <strong>Jhaubon Restaurant (Sugandha Point):</strong> Fresh grilled Rupchanda & seafood thali — <strong>~${fmtSingle(550)}</strong><br/>
          • 🦀 <strong>Sugandha Beach Live Fish Fry Stalls:</strong> Open-air fried crab, squid, tuna & red snapper by the waves — <strong>~${fmtSingle(600)}</strong><br/>
          • 🍲 <strong>Handi Restaurant (Kalatali):</strong> Hyderabadi dum biryani & tandoori platters — <strong>~${fmtSingle(650)}</strong><br/>
          • ☕ <strong>Salt Bistro & Ocean Cafe:</strong> Artisan coffee, pasta & continental brunch — <strong>~${fmtSingle(850)}</strong><br/>
          • 🦞 <strong>Mermaid Beach Cafe (Marine Drive):</strong> Beachfront seafood platter & candlelight vibe — <strong>~${fmtSingle(1400)}</strong>
        </div>
        ${buildChatFollowUpChips(['Poushee details', 'Mermaid Beach Cafe', 'My trip budget?'])}
      `
      : `
        <div>🍽️ <strong>কক্সবাজারের সেরা রেস্তোরাঁ ও জনপ্রতি গড় খাবার খরচ:</strong></div>
        <div class="text-xs text-slate-700 space-y-1.5">
          • 🍛 <strong>পৌষী রেস্তোরাঁ (ঝাউতলা):</strong> ২৫+ পদের ভর্তা, লইট্টা ফ্রাই ও মেজবানি গোশত — <strong>~${fmtSingle(450)}</strong><br/>
          • 🐟 <strong>ঝাউবন রেস্তোরাঁ (সুগন্ধা পয়েন্ট):</strong> রূপচাঁদা গ্রিল ও সি-ফুড থালি — <strong>~${fmtSingle(550)}</strong><br/>
          • 🦀 <strong>সুগন্ধা সৈকত লাইভ ফিশ ফ্রাই:</strong> গরম গরম কাঁকড়া, অক্টোপাস ও কোরাল ফ্রাই — <strong>~${fmtSingle(600)}</strong><br/>
          • 🍲 <strong>হান্ডি রেস্তোরাঁ (কলাতলী):</strong> হায়দ্রাবাদি বিরিয়ানি ও তান্দুরি — <strong>~${fmtSingle(650)}</strong><br/>
          • 🦞 <strong>মারমেইড বিচ ক্যাফে (মেরিন ড্রাইভ):</strong> সি-ফুড প্ল্যাটার ও বিচ ডিনার — <strong>~${fmtSingle(1400)}</strong>
        </div>
        ${buildChatFollowUpChips(['পৌষী রেস্তোরাঁ', 'মারমেইড বিচ ক্যাফে', 'আমার ট্রিপ বাজেট কত?'])}
      `;
  }

  // --------------------------------------------------------------------------
  // 4B. MATCH SPECIFIC ACTIVITY BY NAME OR CATEGORY (Surfing, Horse Riding, Kayaking, etc.)
  // --------------------------------------------------------------------------
  const activities = typeof ACTIVITIES_DATA !== 'undefined' ? ACTIVITIES_DATA : [];
  const matchedActivity = activities.find(act => {
    const en = act.name.en.toLowerCase();
    const bn = act.name.bn.toLowerCase();
    const actId = act.id.replace(/-/g, ' ');
    const actKeys = [en, bn, actId];
    if (act.id === 'surfing-lesson') actKeys.push('surfing', 'surf', 'সার্ফিং', 'সার্ফ');
    if (act.id === 'beach-horse-riding') actKeys.push('horse', 'horse ride', 'ঘোড়া', 'ঘোড়ায় চড়া');
    if (act.id === 'parasailing-sky-gliding') actKeys.push('parasail', 'parasailing', 'প্যারাসেইলিং', 'প্যারাসেলিং');
    if (act.id === 'chander-gari-safari') actKeys.push('chander gari safari', 'jeep safari', 'চান্দের গাড়ি সাফারি', 'জিপ সাফারি');
    if (act.id === 'beach-atv-quad-biking') actKeys.push('atv', 'quad bike', 'কোয়াড বাইক');
    if (act.id === 'jet-ski-speed-riding') actKeys.push('jet ski', 'jetski', 'জেট স্কি');
    if (act.id === 'mangrove-estuary-kayaking') actKeys.push('kayak', 'kayaking', 'reju khal kayak', 'কায়াক', 'কায়াকিং');
    if (act.id === 'speedboat-thrill-cruise') actKeys.push('speedboat cruise', 'স্পিডবোট ক্রুজ');
    if (act.id === 'beach-camping-bonfire-bbq') actKeys.push('camping', 'bonfire', 'bbq', 'ক্যাম্পিং', 'বারবিকিউ', 'ক্যাম্পফায়ার');
    if (act.id === 'marine-drive-cycling-tour') actKeys.push('cycling', 'bicycle', 'সাইকেল', 'সাইক্লিং');
    return actKeys.some(k => q.includes(k));
  });

  if (matchedActivity) {
    const act = matchedActivity;
    const priceText = formatPriceRange(act.priceBDT, act.priceMaxBDT);
    return lang === 'en'
      ? `
        <div>🏄 <strong>${escapeHTML(act.name.en)}</strong></div>
        <div class="text-xs text-slate-700 space-y-1 mt-1">
          • <strong>Estimated Price:</strong> <strong>${priceText}</strong> (${escapeHTML(act.priceNote.en)})<br/>
          • <strong>Location:</strong> ${escapeHTML(act.location.en)}<br/>
          • <strong>Duration:</strong> ${escapeHTML(act.duration.en)} • <strong>Level:</strong> ${escapeHTML(act.difficulty.en)}<br/>
          • <strong>Overview:</strong> ${escapeHTML(act.description.en)}<br/>
          • <strong>Included:</strong> ${escapeHTML(act.included.en.join(', '))}
        </div>
        <div class="pt-2 flex gap-2">
          <a href="itinerary.html" class="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition">
            Plan a Trip
          </a>
        </div>
        ${buildChatFollowUpChips(['Top 10 activities list', 'Best seafood restaurants', 'My trip budget?'])}
      `
      : `
        <div>🏄 <strong>${escapeHTML(act.name.bn)}</strong></div>
        <div class="text-xs text-slate-700 space-y-1 mt-1">
          • <strong>আনুমানিক খরচ:</strong> <strong>${priceText}</strong> (${escapeHTML(act.priceNote.bn)})<br/>
          • <strong>স্থান:</strong> ${escapeHTML(act.location.bn)}<br/>
          • <strong>সময়কাল:</strong> ${escapeHTML(act.duration.bn)} • <strong>ধরন:</strong> ${escapeHTML(act.difficulty.bn)}<br/>
          • <strong>বিবরণ:</strong> ${escapeHTML(act.description.bn)}<br/>
          • <strong>যা যা থাকছে:</strong> ${escapeHTML(act.included.bn.join(', '))}
        </div>
        <div class="pt-2 flex gap-2">
          <a href="itinerary.html" class="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition">
            ট্রিপ প্ল্যান করুন
          </a>
        </div>
        ${buildChatFollowUpChips(['১০টি অ্যাক্টিভিটি তালিকা', 'সেরা সি-ফুড রেস্তোরাঁ', 'আমার ট্রিপ বাজেট কত?'])}
      `;
  }

  // 4C. ACTIVITY LIST, after the single-activity match so "surfing activity" still gets surfing.
  if (activities.length && (q.includes('activit') || q.includes('things to do') || q.includes('অ্যাক্টিভিটি'))) {
    const rows = activities.map(a => `• <strong>${escapeHTML(a.name[lang])}</strong>: ${formatPriceRange(a.priceBDT, a.priceMaxBDT)}`).join('<br/>');
    return `
      <div>🏄 <strong>${lang === 'en' ? `${activities.length} activities (estimated prices)` : `${formatNumber(activities.length, 'bn')}টি অ্যাক্টিভিটি (আনুমানিক খরচ)`}:</strong></div>
      <div class="text-xs text-slate-700 space-y-1 mt-1">${rows}</div>
      <div class="pt-2 flex gap-2">
        <a href="activities.html" class="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition">
          ${lang === 'en' ? 'All activities' : 'সব অ্যাক্টিভিটি'}
        </a>
      </div>
      ${lang === 'en'
        ? buildChatFollowUpChips(['Parasailing', 'Best seafood restaurants', 'My trip budget?'])
        : buildChatFollowUpChips(['প্যারাসেইলিং', 'সেরা সি-ফুড রেস্তোরাঁ', 'আমার ট্রিপ বাজেট কত?'])}
    `;
  }

  // --------------------------------------------------------------------------
  // 5. SPECIFIC ACTIVITIES: MARINE DRIVE BIKE, PARASAILING, JET SKI, SHOPPING
  // --------------------------------------------------------------------------
  if (q.includes('bike') || q.includes('scooter') || q.includes('motorcycle') || q.includes('বাইক') || q.includes('স্কুটার') || q.includes('মোটরসাইকেল')) {
    return lang === 'en'
      ? `
        <div>🏍️ <strong>Riding by Bike on Marine Drive (80 km Ocean Highway):</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • <strong>Rental Cost:</strong> ~<strong>${fmtSingle(1500)}/day</strong> (includes fuel for the Kolatoli → Himchari → Inani → Shamlapur route).<br/>
          • <strong>Best Route:</strong> Start from Kolatoli/Sugandha at 8:30 AM → stop at <strong>Himchari</strong> → <strong>Inani Coral Beach</strong> (32 km) → lunch at <strong>Mermaid Cafe</strong> → sunset at <strong>Shamlapur Sampan Beach</strong> (45 km).<br/>
          • <strong>Requirements & Safety:</strong> Carry your original NID/Passport & driving license, wear a helmet, and finish your return ride before sunset.
        </div>
        <div class="pt-1">
          <a href="itinerary.html" class="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition">
            🏍️ Open the trip planner
          </a>
        </div>
        ${buildChatFollowUpChips(['Inani & Himchari route', 'Is Marine Drive safe at night?', 'Chander Gari jeep cost?'])}
      `
      : `
        <div>🏍️ <strong>মেরিন ড্রাইভ রোডে বাইক / স্কুটার রাইডিং (৮০ কিমি):</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • <strong>ভাড়া ও খরচ:</strong> সারাদিনের বাইক ভাড়া জ্বালানিসহ প্রায় <strong>${fmtSingle(1500)}</strong>।<br/>
          • <strong>সেরা রুট:</strong> কলাতলী → হিমছড়ি → ইনানী প্রবাল সৈকত (৩২ কিমি) → শামলাপুর সাম্পান ঘাট (৪৫ কিমি)।<br/>
          • <strong>নিরাপত্তা টিপস:</strong> মূল এনআইডি ও ড্রাইভিং লাইসেন্স সাথে রাখুন এবং সূর্যাস্তের আগে শহরে ফিরে আসুন।
        </div>
        <div class="pt-1">
          <a href="itinerary.html" class="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition">
            🏍️ ট্রিপ প্ল্যানার খুলুন
          </a>
        </div>
        ${buildChatFollowUpChips(['ইনানী ও হিমছড়ি রুট', 'চান্দের গাড়ি ভাড়া কত?'])}
      `;
  }

  if (q.includes('parasail') || q.includes('jet ski') || q.includes('jetski') || q.includes('atv') || q.includes('water sport') || q.includes('প্যারাসেইলিং') || q.includes('জেট স্কি')) {
    return lang === 'en'
      ? `
        <div>🪂 <strong>Parasailing, Jet Ski & Beach ATV Guide:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • <strong>Parasailing:</strong> Conducted at <strong>Darianagar / Himchari Marine Drive point</strong> (~10–15 km south of Kolatoli). Cost is ~<strong>${fmtSingle(1500)}–${fmtSingle(2500)}</strong> depending on flight height.<br/>
          • <strong>Jet Ski & Beach Quad Bike (ATV):</strong> Available at <strong>Sugandha Point, Kolatoli & Inani Beach</strong> (~${fmtSingle(500)}–${fmtSingle(1500)}).<br/>
          • <strong>Safety Tip:</strong> Always wear the life vest and confirm the exact ride duration before paying.
        </div>
        ${buildChatFollowUpChips(['Sugandha Beach details', 'Marine Drive bike cost?', 'My trip budget?'])}
      `
      : `
        <div>🪂 <strong>প্যারাসেইলিং, জেট স্কি ও বিচ বাইক:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • <strong>প্যারাসেইলিং:</strong> মেরিন ড্রাইভের দরিয়ানগর ও হিমছড়ি পয়েন্টে প্যারাসেইলিং করা যায় (খরচ ~<strong>${fmtSingle(1500)}–${fmtSingle(2500)}</strong>)।<br/>
          • <strong>জেট স্কি ও বিচ বাইক:</strong> সুগন্ধা, কলাতলী ও ইনানী সৈকতে পাওয়া যায়।
        </div>
        ${buildChatFollowUpChips(['সুগন্ধা সৈকত বিস্তারিত', 'মেরিন ড্রাইভে বাইক ভাড়া?'])}
      `;
  }

  if (q.includes('shop') || q.includes('burmese') || q.includes('pickle') || q.includes('achar') || q.includes('pearl') || q.includes('বার্মিজ') || q.includes('কেনাকাটা') || q.includes('আচার')) {
    return lang === 'en'
      ? `
        <div>🛍️ <strong>Burmese Market & Local Shopping Guide:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • <strong>Where to Shop:</strong> Laboni Point Beach Market, Tekpara Burmese Market (in town), and Adinath Temple jetty stalls.<br/>
          • <strong>Best Buys:</strong> Tangy Burmese pickles (<em>Achar</em>), Rakhine handwoven textiles & lungis, natural sea pearls, shell handicrafts, and sun-dried fish (<em>Shutki</em>).<br/>
          • <strong>Budget Tip:</strong> Bargaining politely by 20–30% is normal for handicrafts and pearls (est. shopping budget ~<strong>${fmtSingle(500)}</strong>).
        </div>
        ${buildChatFollowUpChips(['Najirartek Shutki Hub', 'Laboni Beach info', 'Best seafood restaurants?'])}
      `
      : `
        <div>🛍️ <strong>বার্মিজ মার্কেট ও কেনাকাটা গাইড:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • <strong>কোথায় কিনবেন:</strong> লাবণী পয়েন্ট মার্কেট এবং শহরের টেকপাড়া বার্মিজ মার্কেট।<br/>
          • <strong>কী কিনবেন:</strong> বার্মিজ আচার, রাখাইন তাঁতের কাপড়, সামুদ্রিক মুক্তার গহনা, ঝিনুকের তৈরি শোপিস ও শুঁটকি।
        </div>
        ${buildChatFollowUpChips(['নাজিরারটেক শুঁটকি মহাল', 'লাবণী ও সুগন্ধা সৈকত'])}
      `;
  }

  // --------------------------------------------------------------------------
  // 6. HOW TO REACH COX'S BAZAR (TRAIN / FLIGHT / BUS FROM DHAKA OR CHITTAGONG)
  //    AND LOCAL TRANSPORT VEHICLES (TOMTOM, CHANDER GARI, CNG, SPEEDBOAT)
  // --------------------------------------------------------------------------
  if (
    q.includes('dhaka') ||
    q.includes('chittagong') ||
    q.includes('chattogram') ||
    q.includes('train') ||
    q.includes('railway') ||
    q.includes('flight') ||
    q.includes('airport') ||
    q.includes('bus') ||
    q.includes('ঢাকা') ||
    q.includes('চট্টগ্রাম') ||
    q.includes('ট্রেন') ||
    q.includes('বিমান') ||
    q.includes('বাস')
  ) {
    return lang === 'en'
      ? `
        <div>🚆✈️🚌 <strong>How to Reach Cox's Bazar (Train, Flight & Bus):</strong></div>
        <div class="text-xs text-slate-700 space-y-1.5">
          • 🚆 <strong>By Train (Iconic Oyster Railway Station):</strong> Direct trains <em>Cox's Bazar Express</em> & <em>Parjotak Express</em> run from Dhaka (Kamalapur/Airport) & Chattogram (~8.5 hrs from Dhaka; Shovon Chair ~${fmtSingle(695)}, AC Snigdha ~${fmtSingle(1325)}). From the station, a Tomtom/CNG to Kolatoli/Laboni takes 15 mins.<br/>
          • ✈️ <strong>By Flight (Cox's Bazar Airport - CXB):</strong> 1-hour flight from Dhaka via Biman, US-Bangla, Novoair, or Air Astra. The airport is just 10 mins from Laboni Beach!<br/>
          • 🚌 <strong>By Bus (Dolphin Mor / Kolatoli):</strong> AC Sleeper/Business & Non-AC buses from Dhaka (8–10 hrs, ${formatPriceRange(1200, 2500)}) or Chattogram (3.5–4 hrs) drop you right at <strong>Dolphin Mor</strong>.
        </div>
        ${buildChatFollowUpChips(['Local Tomtom & CNG fares', 'Hotels near Kalatali', 'My trip budget?'])}
      `
      : `
        <div>🚆✈️🚌 <strong>ঢাকা বা চট্টগ্রাম থেকে কক্সবাজার আসার উপায়:</strong></div>
        <div class="text-xs text-slate-700 space-y-1.5">
          • 🚆 <strong>ট্রেনে (আইকনিক ঝিনুক রেলস্টেশন):</strong> ঢাকা থেকে সরাসরি <em>কক্সবাজার এক্সপ্রেস</em> ও <em>পর্যটক এক্সপ্রেস</em> ট্রেনে (~৮.৫ ঘণ্টা; শোভন চেয়ার ~${fmtSingle(695)}, স্নিগ্ধা এসি ~${fmtSingle(1325)}) আসা যায়।<br/>
          • ✈️ <strong>বিমানে (কক্সবাজার এয়ারপোর্ট):</strong> ঢাকা থেকে মাত্র ১ ঘণ্টায় ফ্লাইটে আসা যায় (এয়ারপোর্ট থেকে লাবণী বিচ মাত্র ১০ মিনিট)।<br/>
          • 🚌 <strong>বাসে (ডলফিন মোড়, কলাতলী):</strong> এসি/নন-এসি বাসে সরাসরি কলাতলীর ডলফিন মোড়ে নামা যায়।
        </div>
        ${buildChatFollowUpChips(['স্থানীয় টমটম ও সিএনজি ভাড়া', 'কলাতলীর হোটেল ভাড়া'])}
      `;
  }

  if (
    q.includes('tomtom') ||
    q.includes('easybike') ||
    q.includes('chander') ||
    q.includes('cng') ||
    q.includes('speedboat') ||
    q.includes('vehicle') ||
    q.includes('transport') ||
    q.includes('fare') ||
    q.includes('টমটম') ||
    q.includes('ইজিবাইক') ||
    q.includes('চান্দের') ||
    q.includes('সিএনজি') ||
    q.includes('স্পিডবোট') ||
    q.includes('যাতায়াত')
  ) {
    const rows = TRANSPORT_DATA.map(
      tr =>
        `• <strong>${escapeHTML(tr.route[lang])}</strong> (${escapeHTML(tr.vehicle[lang])}): <strong class="text-teal-700">${formatPriceRange(tr.minBDT, tr.maxBDT)}</strong> — ${escapeHTML(tr.modeNote[lang])}, ${escapeHTML(tr.duration[lang])}`
    ).join('<br/>');

    return lang === 'en'
      ? `
        <div>🚕 <strong>Estimated Local Transport Fares & Vehicles (${AppState.currency}):</strong></div>
        <div class="text-xs text-slate-700 leading-relaxed">${rows}</div>
        <div class="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950">
          💡 <strong>Quick Guide:</strong> <em>Tomtoms</em> are cheap shared electric 3-wheelers for beach hops; <em>Chander Gari</em> is an open-top 10–14 seat 4x4 jeep for Marine Drive; <em>Speedboats</em> depart from Kasturi Ghat.
        </div>
        ${buildChatFollowUpChips(['Marine Drive bike cost?', 'How to reach Inani?', 'How to reach Ramu?'])}
      `
      : `
        <div>🚕 <strong>কক্সবাজারের স্থানীয় যাতায়াত ভাড়া (${AppState.currency}):</strong></div>
        <div class="text-xs text-slate-700 leading-relaxed">${rows}</div>
        <div class="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-950">
          💡 <strong>টিপস:</strong> স্বল্প দূরত্বে শেয়ারড <em>টমটম</em>, মেরিন ড্রাইভে গ্রুপের জন্য <em>চান্দের গাড়ি</em> এবং মহেশখালীর জন্য কস্তুরাঘাটের <em>স্পিডবোট</em> ব্যবহার করুন।
        </div>
        ${buildChatFollowUpChips(['মেরিন ড্রাইভে বাইক ভাড়া?', 'ইনানী কীভাবে যাব?', 'রামু কীভাবে যাব?'])}
      `;
  }

  // --------------------------------------------------------------------------
  // 7. LIVE PERSONAL TRIP BUDGET, ROUTE & ITINERARY PLANNER ASSISTANT
  // --------------------------------------------------------------------------
  if (
    q.includes('budget') ||
    q.includes('total cost') ||
    q.includes('how much') ||
    q.includes('my trip') ||
    q.includes('itinerary') ||
    q.includes('day plan') ||
    q.includes('2 day') ||
    q.includes('3 day') ||
    q.includes('5 day') ||
    q.includes('route') ||
    q.includes('বাজেট') ||
    q.includes('খরচ কত') ||
    q.includes('ট্রিপ প্ল্যান') ||
    q.includes('রুট')
  ) {
    return lang === 'en'
      ? `<div>📊 The <a href="itinerary.html" class="underline font-bold">trip planner</a> builds a day-by-day plan and an estimated budget for your group.</div>`
      : `<div>📊 <a href="itinerary.html" class="underline font-bold">ট্রিপ প্ল্যানার</a> আপনার দলের জন্য দিনভিত্তিক পরিকল্পনা ও আনুমানিক বাজেট তৈরি করে।</div>`;
  }

  // --------------------------------------------------------------------------
  // 8. EMERGENCY, POLICE, HOSPITAL, SAFETY, WEATHER & CURRENCY EXCHANGE
  // --------------------------------------------------------------------------

  if (q.includes('safe') || q.includes('swim') || q.includes('flag') || q.includes('night') || q.includes('dress') || q.includes('etiquette') || q.includes('নিরাপদ') || q.includes('সাঁতার') || q.includes('পতাকা') || q.includes('পোশাক')) {
    return lang === 'en'
      ? `
        <div>🛡️ <strong>Beach Safety, Night Travel & Cultural Tips:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • 🏊 <strong>Swimming Flags:</strong> Swim ONLY between <strong>Green Flags</strong> monitored by CIPRB Sea Safe Lifeguards. Never enter the water when <strong>Red Flags</strong> are raised or after dark.<br/>
          • 🌅 <strong>Marine Drive at Night:</strong> Complete your Marine Drive (Inani/Shamlapur) trip before sunset for better visibility and safety.<br/>
          • 👕 <strong>Dress Code:</strong> Modest family-friendly beachwear (t-shirts & shorts/trousers) is standard; cover shoulders/knees and remove shoes at Ramu & Adinath temples.
        </div>
        ${buildChatFollowUpChips(['Emergency numbers', 'Best time to visit?', 'Inani & Himchari route'])}
      `
      : `
        <div>🛡️ <strong>সৈকতের নিরাপত্তা ও ভ্রমণ নির্দেশিকা:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • 🏊 <strong>সাঁতার ও পতাকা:</strong> শুধুমাত্র সি-সেফ লাইফগার্ডদের <strong>সবুজ পতাকা</strong> চিহ্নিত স্থানে গোসল করুন। লাল পতাকা থাকলে বা সন্ধ্যার পর সমুদ্রে নামবেন না।<br/>
          • 🌅 <strong>মেরিন ড্রাইভ:</strong> নিরাপত্তার জন্য সূর্যাস্তের আগেই মেরিন ড্রাইভ ভ্রমণ শেষ করুন।
        </div>
        ${buildChatFollowUpChips(['জরুরি পুলিশ ও হাসপাতাল নাম্বার', 'ভ্রমণের সেরা সময়?'])}
      `;
  }

  if (q.includes('best time') || q.includes('weather') || q.includes('season') || q.includes('rain') || q.includes('monsoon') || q.includes('winter') || q.includes('সেরা সময়') || q.includes('আবহাওয়া') || q.includes('শীতকাল') || q.includes('বর্ষা')) {
    const w = UI_TEXT[lang].essentialSection.weather;
    return `
      <div>☀️ <strong>${escapeHTML(w.title)}:</strong></div>
      <div class="text-xs text-slate-700 space-y-1.5">
        <div>• <strong>${escapeHTML(w.peakTitle)}:</strong> ${escapeHTML(w.peakDesc)}</div>
        <div>• <strong>${escapeHTML(w.shoulderTitle)}:</strong> ${escapeHTML(w.shoulderDesc)}</div>
        <div>• <strong>${escapeHTML(w.monsoonTitle)}:</strong> ${escapeHTML(w.monsoonDesc)}</div>
      </div>
      ${buildChatFollowUpChips(
        lang === 'en'
          ? ['Cheapest hotel?', 'Inani & Himchari route', 'Sonadia Island camping']
          : ['সবচেয়ে সস্তা হোটেল কোনটি?', 'ইনানী ও হিমছড়ি রুট']
      )}
    `;
  }

  if (q.includes('currency') || q.includes('exchange') || q.includes('dollar') || q.includes('usd') || q.includes('atm') || q.includes('money') || q.includes('ডলার') || q.includes('মানি এক্সচেঞ্জ')) {
    return lang === 'en'
      ? `
        <div>💱 <strong>Currency Exchange, USD & ATM Guide:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • <strong>Exchange Rate on Portal:</strong> 1 USD ≈ ${CONFIG.exchangeRateUSD} BDT.<br/>
          • <strong>Where to Exchange:</strong> Authorized money changers and banks (City Bank, BRAC Bank, DBBL, Islami Bank) with 24/7 Visa/Mastercard ATMs are located along <strong>Kalatali Main Road, Laboni Point, and Cox's Bazar Town</strong>.<br/>
          • <strong>Tip:</strong> Carry cash BDT for local Tomtoms, speedboats, and beach stalls.
        </div>
        <div class="pt-1">
          <button type="button" onclick="toggleCurrency()" class="px-2.5 py-1 rounded-lg bg-teal-600 text-white text-[11px] font-bold cursor-pointer">
            💱 Switch Website Currency (Currently: ${AppState.currency})
          </button>
        </div>
      `
      : `
        <div>💱 <strong>মুদ্রা বিনিময় (Currency Exchange) ও এটিএম তথ্য:</strong></div>
        <div class="text-xs text-slate-700 space-y-1">
          • কলাতলী রোড, লাবণী পয়েন্ট ও মূল শহরে অনুমোদিত মানি এক্সচেঞ্জার এবং ২৪/৭ এটিএম বুথ (ডাচ-বাংলা, সিটি ব্যাংক, ব্র্যাক ব্যাংক) রয়েছে।<br/>
          • স্থানীয় টমটম, স্পিডবোট ও ছোট দোকানে খরচের জন্য সাথে নগদ টাকা (BDT) রাখুন।
        </div>
      `;
  }

  // --------------------------------------------------------------------------
  // 9. GENERAL HOTEL OVERVIEW (Only when user asks generally for "all hotels" / "hotel list")
  // --------------------------------------------------------------------------
  if (isAskingHotel || q.includes('price') || q.includes('ভাড়া')) {
    const lines = HOTELS_DATA.map(
      h =>
        `• <strong>${escapeHTML(h.name[lang])}</strong> (${escapeHTML(h.locationKey)}): <strong class="text-teal-700">${formatPriceRange(h.minBDT, h.maxBDT)}</strong>/night${h.phone ? ` — 📞 <a href="tel:${escapeHTML(h.phone.replace(/\s+/g, ''))}" class="underline text-sky-700">${escapeHTML(h.phone)}</a>` : ''}`
    ).join('<br/>');

    return lang === 'en'
      ? `
        <div>🏨 <strong>Hotels in Cox's Bazar (${AppState.currency}):</strong></div>
        <div class="text-xs text-slate-700 leading-relaxed">${lines}</div>
        <div class="text-[11px] text-slate-500">Tap any hotel below to see its full address, amenities & booking link:</div>
        ${buildChatFollowUpChips(['Hotel Sea Crown details', 'Prime Park Hotel details', 'Hotel Kollol details', 'Cheapest hotel?'])}
      `
      : `
        <div>🏨 <strong>কক্সবাজারের হোটেলের আনুমানিক ভাড়া ও ফোন (${AppState.currency}):</strong></div>
        <div class="text-xs text-slate-700 leading-relaxed">${lines}</div>
        ${buildChatFollowUpChips(['হোটেল সী ক্রাউন বিস্তারিত', 'প্রাইম পার্ক হোটেল', 'সবচেয়ে সস্তা হোটেল কোনটি?'])}
      `;
  }

  // --------------------------------------------------------------------------
  // 10. CONVERSATIONAL GREETING OR SMART CONTEXTUAL GUIDE
  // --------------------------------------------------------------------------
  return lang === 'en'
    ? `
      <div>👋 <strong>I'm a keyword-based Cox's Bazar guide.</strong> Ask about a topic, or tap one below:</div>
      <div class="text-xs text-slate-600 space-y-1">
        • 🏨 <strong>Specific Hotels:</strong> <em>"Sea Crown details"</em>, <em>"Cheapest hotel"</em>, <em>"Hotel with pool"</em><br/>
        • 📍 <strong>Exact Routes & Spots:</strong> <em>"Inani & Himchari route"</em>, <em>"Moheshkhali speedboat"</em>, <em>"Ramu Buddha"</em>, <em>"Sonadia camping"</em><br/>
        • 🍽️ <strong>Food & Adventure:</strong> <em>"Best seafood & Poushee?"</em>, <em>"Marine Drive bike cost?"</em>, <em>"Parasailing"</em><br/>
        • 📊 <strong>Trip Planner:</strong> <em>"My trip budget?"</em>, <em>"How to come from Dhaka by train?"</em>
      </div>
      ${buildChatFollowUpChips([
        'Emergency numbers',
        'Cheapest hotel?',
        'Inani & Himchari route',
        'Best seafood & Poushee?',
        'Marine Drive bike cost?',
        'My trip budget?'
      ])}
    `
    : `
      <div>👋 <strong>আমি কি-ওয়ার্ড ভিত্তিক কক্সবাজার গাইড।</strong> একটি বিষয় লিখুন অথবা নিচের বাটনে ক্লিক করুন:</div>
      <div class="text-xs text-slate-600 space-y-1">
        • 🏨 <strong>নির্দিষ্ট হোটেল:</strong> <em>"সী ক্রাউন বিস্তারিত"</em>, <em>"সবচেয়ে সস্তা হোটেল"</em>, <em>"সুইমিং পুলসহ হোটেল"</em><br/>
        • 📍 <strong>স্পট ও রুট:</strong> <em>"ইনানী ও হিমছড়ি রুট"</em>, <em>"মহেশখালী স্পিডবোট"</em>, <em>"রামু বৌদ্ধ বিহার"</em><br/>
        • 🍽️ <strong>খাবার ও অ্যাডভেঞ্চার:</strong> <em>"পৌষী ও সেরা সি-ফুড কোথায়?"</em>, <em>"মেরিন ড্রাইভে বাইক ভাড়া?"</em>
      </div>
      ${buildChatFollowUpChips([
        'জরুরি নম্বর',
        'সবচেয়ে সস্তা হোটেল কোনটি?',
        'ইনানী ও হিমছড়ি রুট',
        'পৌষী ও সেরা সি-ফুড কোথায়?',
        'মেরিন ড্রাইভে বাইক ভাড়া?',
        'আমার ট্রিপ বাজেট কত?'
      ])}
    `;
}

async function handleUserChatSubmission(prefilledText) {
  const input = document.getElementById('chatbot-input');
  const messageText = (prefilledText !== undefined ? prefilledText : input?.value || '').trim();
  if (!messageText) return;

  if (input && prefilledText === undefined) {
    input.value = '';
  }

  appendChatMessage('user', messageText);

  // Show typing indicator
  const messagesBox = document.getElementById('chatbot-messages');
  const typingEl = document.createElement('div');
  typingEl.id = 'chat-typing-indicator';
  typingEl.className = 'flex items-center gap-2 text-xs text-slate-400 pl-10';
  typingEl.innerHTML = `
    <span class="typing-dot w-2 h-2 rounded-full bg-sky-500 inline-block"></span>
    <span class="typing-dot w-2 h-2 rounded-full bg-sky-500 inline-block"></span>
    <span class="typing-dot w-2 h-2 rounded-full bg-sky-500 inline-block"></span>
  `;
  messagesBox?.appendChild(typingEl);
  if (messagesBox) messagesBox.scrollTop = messagesBox.scrollHeight;

  const reply = await fetchTravelAssistantReply(messageText);
  typingEl.remove();
  appendChatMessage('bot', reply);
}

/* --------------------------------------------------------------------------
 * MOBILE MENU, SCROLL PROGRESS BAR & ACTIVE SECTION SCROLLSPY
 * -------------------------------------------------------------------------- */
function toggleMobileMenu(forceState) {
  if (typeof forceState === 'boolean') {
    AppState.isMobileMenuOpen = forceState;
  } else {
    AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;
  }
  const menu = document.getElementById('mobile-nav-drawer');
  if (menu) {
    menu.classList.toggle('hidden', !AppState.isMobileMenuOpen);
  }
}

function initScrollListeners() {
  const navbar = document.getElementById('main-navbar');
  const progressBar = document.getElementById('scroll-progress-bar');
  const sectionIds = [
    'home',
    'hotels',
    'destinations',
    'activities-section',
    'transport',
    'faq'
  ];

  const handleScrollUpdate = () => {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }

    // Update top scroll progress bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
      progressBar.style.width = `${pct}%`;
    }

    // Update active navbar link based on current scroll position
    let activeSection = 'home';
    const scrollPos = window.scrollY + 180;
    for (const secId of sectionIds) {
      const el = document.getElementById(secId);
      if (el && el.offsetTop <= scrollPos) {
        activeSection = secId;
      }
    }

    document.querySelectorAll('[data-section-link]').forEach(link => {
      const linkSec = link.getAttribute('data-section-link');
      link.classList.toggle('nav-link-active', linkSec === activeSection);
    });
  };

  window.addEventListener('scroll', handleScrollUpdate, { passive: true });
  handleScrollUpdate();

  // Close mobile drawer when clicking a nav link
  document.querySelectorAll('#mobile-nav-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      AppState.isMobileMenuOpen = false;
      document.getElementById('mobile-nav-drawer')?.classList.add('hidden');
    });
  });
}

/* --------------------------------------------------------------------------
 * DRAGGABLE HORIZONTAL SCROLL & SCROLL REVEAL MICRO-INTERACTIONS
 * -------------------------------------------------------------------------- */
function initHorizontalDragScroll(el) {
  if (!el) return;
  let isDown = false;
  let startX;
  let scrollLeft;

  el.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });
  el.addEventListener('mouseleave', () => { isDown = false; });
  el.addEventListener('mouseup', () => { isDown = false; });
  el.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  });
}

function initScrollReveal() {
  if (typeof IntersectionObserver === 'undefined') return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('section, .bento-card, .stay-card, .timeline-item').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

/* --------------------------------------------------------------------------
 * MASTER RENDER & INITIALIZATION
 * -------------------------------------------------------------------------- */
/* Transport page fare calculator: legs per destination and party size; fares come from
 * TRANSPORT_DATA / PRICE_BOOK.fares in data.js through fareById(). */
const FARE_CALC_ROUTES = {
  sugandha: { any: ['town-to-laboni-sugandha'] },
  himchari: { group: ['town-to-himchari-jeep'], any: ['town-to-himchari'] },
  inani: { group: ['town-to-inani'], any: ['town-to-inani-car'] },
  moheshkhali: { any: ['kolatoli-to-6-ghat', 'town-to-moheshkhali'] },
  ramu: { any: ['town-to-ramu'] },
  shamlapur: { any: ['town-to-shamlapur-jeep'] }
};

function runFareCalculation() {
  const destEl = document.getElementById('calc-destination');
  const partyEl = document.getElementById('calc-party');
  const fareEl = document.getElementById('calc-fare-text');
  if (!destEl || !partyEl || !fareEl || typeof fareById !== 'function') return;
  const lang = AppState.lang;
  const route = FARE_CALC_ROUTES[destEl.value] || FARE_CALC_ROUTES.shamlapur;
  const legs = (partyEl.value === 'group' && route.group ? route.group : route.any).map(fareById).filter(Boolean);
  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  set('calc-vehicle-badge', legs.map(f => f.vehicle[lang]).join(' + '));
  fareEl.innerHTML = `${escapeHTML(legs.map(f => formatPriceRange(f.minBDT, f.maxBDT)).join(' + '))}
    <span class="vc-approx block text-xs font-mono font-normal text-stone-500 mt-1">${escapeHTML(PRICE_BOOK.asOfLabel[lang])}</span>`;
  set('calc-meta-text', legs.map(f => `${f.route[lang]}: ${f.duration[lang]} • ${f.modeNote[lang]}`).join(' | '));
  set('calc-tip-text', UI_TEXT[lang].transportSection.calcTip);
}

function renderAll() {
  updateToggleButtons();
  renderStaticText();
  renderHotels();
  renderDestinations();
  renderActivities();
  renderTransport();
  renderEmergencyContacts();
  renderFAQs();
  renderChatQuickPrompts();
  if (typeof renderBlogSection === 'function') {
    renderBlogSection();
  }
  if (typeof PlannerApp !== 'undefined') PlannerApp.refresh();
  if (typeof QuickTripPick !== 'undefined') QuickTripPick.refresh();
  runFareCalculation();
  // Bilingual "prices are estimates" lines: show only the span for the current language.
  document.querySelectorAll('.vc-approx [lang]').forEach(el => { el.hidden = el.lang !== AppState.lang; });

  const hotelsTrack = document.getElementById('hotels-grid');
  if (hotelsTrack) initHorizontalDragScroll(hotelsTrack);
  initScrollReveal();
  if (typeof renderPageText === 'function') renderPageText(AppState.lang);
  document.documentElement.lang = AppState.lang; // also on first load, when the saved language is bn
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initScrollListeners();
  startHeroAutoSlider();

  // Hook up Hero search form & live search input
  const searchForm = document.getElementById('hero-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', handleHeroSearch);
  }
  const searchInput = document.getElementById('hero-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleLiveHeroSearchInput);
  }

  // Hide live search dropdown when clicking outside
  document.addEventListener('click', e => {
    const dropdown = document.getElementById('hero-live-search-results');
    if (dropdown && !dropdown.contains(e.target) && e.target !== searchInput) {
      dropdown.classList.add('hidden');
    }
  });

  // Hook up Chatbot form
  const chatForm = document.getElementById('chatbot-form');
  if (chatForm) {
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      handleUserChatSubmission();
    });
  }
});
