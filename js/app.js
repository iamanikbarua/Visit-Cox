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
 *  7. Floating Chatbot ("Cox's Bazar Travel Assistant") with AI Backend Hook
 */

const AppState = {
  lang: CONFIG.defaultLang,       // 'en' | 'bn'
  currency: CONFIG.defaultCurrency, // 'BDT' | 'USD'
  hotelFilter: 'ALL',
  searchQuery: '',
  searchCategory: 'all',
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
  AppState.lang = targetLang || (AppState.lang === 'en' ? 'bn' : 'en');
  document.documentElement.lang = AppState.lang;
  renderAll();
}

function toggleCurrency(targetCurr) {
  AppState.currency = targetCurr || (AppState.currency === 'BDT' ? 'USD' : 'BDT');
  renderAll();
}

/* --------------------------------------------------------------------------
 * RENDER UI TEXT & CONTROLS
 * -------------------------------------------------------------------------- */
function updateToggleButtons() {
  const isEN = AppState.lang === 'en';
  const isBDT = AppState.currency === 'BDT';

  // Desktop & Mobile Language Toggle Pills
  document.querySelectorAll('[data-lang-btn="en"]').forEach(el => {
    el.className = isEN
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-sky-500 text-white shadow-sm transition-all'
      : 'px-2.5 py-1 rounded-full text-xs font-semibold text-sky-100 hover:text-white transition-all';
  });
  document.querySelectorAll('[data-lang-btn="bn"]').forEach(el => {
    el.className = !isEN
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-sky-500 text-white shadow-sm transition-all'
      : 'px-2.5 py-1 rounded-full text-xs font-semibold text-sky-100 hover:text-white transition-all';
  });

  // Desktop & Mobile Currency Toggle Pills
  document.querySelectorAll('[data-curr-btn="BDT"]').forEach(el => {
    el.className = isBDT
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-teal-500 text-white shadow-sm transition-all'
      : 'px-2.5 py-1 rounded-full text-xs font-semibold text-sky-100 hover:text-white transition-all';
  });
  document.querySelectorAll('[data-curr-btn="USD"]').forEach(el => {
    el.className = !isBDT
      ? 'px-2.5 py-1 rounded-full text-xs font-bold bg-teal-500 text-white shadow-sm transition-all'
      : 'px-2.5 py-1 rounded-full text-xs font-semibold text-sky-100 hover:text-white transition-all';
  });
}

function renderStaticText() {
  const t = UI_TEXT[AppState.lang];

  // Brand & Nav
  setText('brand-name', t.brandName);
  setText('brand-tagline', t.brandTagline);
  document.querySelectorAll('[data-nav="home"]').forEach(el => (el.textContent = t.nav.home));
  document.querySelectorAll('[data-nav="hotels"]').forEach(el => (el.textContent = t.nav.hotels));
  document.querySelectorAll('[data-nav="destinations"]').forEach(el => (el.textContent = t.nav.destinations));
  document.querySelectorAll('[data-nav="transport"]').forEach(el => (el.textContent = t.nav.transport));
  document.querySelectorAll('[data-nav="essentialInfo"]').forEach(el => (el.textContent = t.nav.essentialInfo));
  document.querySelectorAll('[data-nav="faq"]').forEach(el => (el.textContent = t.nav.faq));

  // Hero Section
  setText('hero-badge', t.hero.badge);
  setText('hero-title', t.hero.title);
  setText('hero-subtitle', t.hero.subtitle);
  setText('hero-cta-hotels', t.hero.ctaHotels);
  setText('hero-cta-spots', t.hero.ctaSpots);

  const searchInput = document.getElementById('hero-search-input');
  if (searchInput) searchInput.placeholder = t.hero.searchPlaceholder;

  setText('search-opt-all', t.hero.searchCategoryAll);
  setText('search-opt-hotels', t.hero.searchCategoryHotels);
  setText('search-opt-spots', t.hero.searchCategorySpots);
  setText('search-opt-transport', t.hero.searchCategoryTransport);
  setText('hero-search-btn-text', t.hero.searchBtn);

  // Hero Stats
  const statsContainer = document.getElementById('hero-stats-grid');
  if (statsContainer) {
    statsContainer.innerHTML = t.hero.stats
      .map(
        stat => `
        <div class="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
          <div class="text-2xl md:text-3xl font-extrabold text-amber-300 tracking-tight">${stat.value}</div>
          <div class="text-xs md:text-sm text-sky-100 mt-1 font-medium">${stat.label}</div>
        </div>
      `
      )
      .join('');
  }

  // Section Headers
  setText('hotels-eyebrow', t.hotelsSection.eyebrow);
  setText('hotels-title', t.hotelsSection.title);
  setText('hotels-subtitle', t.hotelsSection.subtitle);

  setText('destinations-eyebrow', t.destinationsSection.eyebrow);
  setText('destinations-title', t.destinationsSection.title);
  setText('destinations-subtitle', t.destinationsSection.subtitle);
  setText('hidden-gems-badge', t.destinationsSection.hiddenGemsBadge);
  setText('hidden-gems-title', t.destinationsSection.hiddenGemsTitle);
  setText('hidden-gems-subtitle', t.destinationsSection.hiddenGemsSubtitle);

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

function renderHotels() {
  const t = UI_TEXT[AppState.lang].hotelsSection;
  const filterContainer = document.getElementById('hotel-location-filters');
  const gridContainer = document.getElementById('hotels-grid');
  const dotsContainer = document.getElementById('hotel-slider-dots');
  const counterEl = document.getElementById('hotel-slider-counter');
  if (!gridContainer) return;

  // Build unique location filters
  const uniqueLocations = ['ALL', ...new Set(HOTELS_DATA.map(h => h.locationKey))];

  if (filterContainer) {
    filterContainer.innerHTML = uniqueLocations
      .map(locKey => {
        const isActive = AppState.hotelFilter === locKey;
        let label = t.filterAll;
        if (locKey !== 'ALL') {
          const sample = HOTELS_DATA.find(h => h.locationKey === locKey);
          label = sample ? sample.location[AppState.lang] : locKey;
        }
        return `
          <button
            onclick="setHotelFilter('${locKey}')"
            class="px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isActive
                ? 'bg-sky-700 text-white shadow-md shadow-sky-900/20'
                : 'bg-white text-slate-700 hover:bg-sky-50 border border-slate-200'
            }">
            ${label}
          </button>
        `;
      })
      .join('');
  }

  // Filter hotels by location & search query
  const q = AppState.searchQuery.trim().toLowerCase();
  const filteredHotels = HOTELS_DATA.filter(hotel => {
    const matchesLocation = AppState.hotelFilter === 'ALL' || hotel.locationKey === AppState.hotelFilter;
    if (!q || (AppState.searchCategory !== 'all' && AppState.searchCategory !== 'hotels')) {
      return matchesLocation;
    }
    const haystack = `${hotel.name.en} ${hotel.name.bn} ${hotel.location.en} ${hotel.location.bn} ${hotel.amenities.en.join(' ')} ${hotel.amenities.bn.join(' ')}`.toLowerCase();
    return matchesLocation && haystack.includes(q);
  });

  updateHotelAutoSlideUI();

  if (filteredHotels.length === 0) {
    gridContainer.innerHTML = `
      <div class="w-full bg-white rounded-3xl p-10 text-center border border-slate-200">
        <p class="text-slate-600 font-medium">${
          AppState.lang === 'en'
            ? 'No hotels match your current search filter. Try resetting filters.'
            : 'আপনার অনুসন্ধানের সাথে কোনো হোটেল মেলেনি। ফিল্টার রিসেট করে আবার চেষ্টা করুন।'
        }</p>
        <button onclick="resetSearchAndFilters()" class="mt-4 px-5 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 transition">
          ${AppState.lang === 'en' ? 'Show All Hotels' : 'সব হোটেল দেখুন'}
        </button>
      </div>
    `;
    if (dotsContainer) dotsContainer.innerHTML = '';
    if (counterEl) {
      counterEl.textContent = AppState.lang === 'en' ? '0 Hotels Found' : '০টি হোটেল পাওয়া গেছে';
    }
    return;
  }

  if (counterEl) {
    counterEl.textContent =
      AppState.lang === 'en'
        ? `Showing ${filteredHotels.length} Verified Hotels • Swipe or Click Arrows ← →`
        : `${formatNumber(filteredHotels.length, 'bn')}টি ভেরিফাইড হোটেল • বামে-ডানে স্লাইড করুন ← →`;
  }

  gridContainer.innerHTML = filteredHotels
    .map((hotel, idx) => {
      const priceText = formatPriceRange(hotel.minBDT, hotel.maxBDT);
      const amenitiesList = hotel.amenities[AppState.lang]
        .map(
          item => `
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-800 border border-sky-100">
            <svg class="w-3.5 h-3.5 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
            </svg>
            ${item}
          </span>
        `
        )
        .join('');

      return `
        <article
          data-hotel-slide-index="${idx}"
          class="coastal-card shrink-0 snap-start w-[88%] sm:w-[350px] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between"
        >
          <div>
            <!-- Hotel Image & Floating Badges -->
            <div class="relative h-56 overflow-hidden bg-slate-200">
              <img
                src="${hotel.image}"
                alt="${hotel.name[AppState.lang]}"
                loading="lazy"
                class="card-img w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20"></div>

              <!-- Top Badge -->
              <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-600/95 text-white backdrop-blur-sm shadow">
                ${hotel.badge[AppState.lang]}
              </span>

              <!-- Star Rating -->
              <div class="absolute top-4 right-4 flex items-center gap-1 bg-slate-900/80 backdrop-blur-sm text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>${hotel.rating}</span>
              </div>

              <!-- Location Pill & Admin Controls on Image Bottom -->
              <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white gap-2">
                <span class="inline-flex items-center gap-1.5 text-xs font-semibold bg-black/45 backdrop-blur-sm px-3 py-1 rounded-full">
                  <svg class="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  ${hotel.location[AppState.lang]}
                </span>
                ${typeof getInlineAdminControls === 'function' ? getInlineAdminControls('hotels', hotel.id) : ''}
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-6">
              <div class="flex items-start justify-between gap-2">
                <h3 class="text-xl font-bold text-slate-900 leading-snug">${hotel.name[AppState.lang]}</h3>
              </div>
              <p class="text-slate-600 text-sm mt-2 leading-relaxed">${hotel.description[AppState.lang]}</p>

              <!-- Amenities -->
              <div class="mt-4">
                <p class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">${t.amenitiesLabel}</p>
                <div class="flex flex-wrap gap-2">
                  ${amenitiesList}
                </div>
              </div>

              <!-- Verified Contact & Source Row -->
              <div class="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                ${
                  hotel.phone
                    ? `<a href="tel:${hotel.phone.replace(/\s+/g, '')}" class="inline-flex items-center gap-1 font-semibold text-teal-700 hover:text-teal-800">
                        ☎ ${hotel.phone}
                      </a>`
                    : ''
                }
                ${
                  hotel.sourceUrl
                    ? `<a href="${hotel.sourceUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 font-semibold text-sky-600 hover:underline">
                        <span>✓ ${hotel.sourceName || 'Official Source'}</span>
                        <span>↗</span>
                      </a>`
                    : ''
                }
              </div>
            </div>
          </div>

          <!-- Card Footer with Dynamic Price & CTA -->
          <div class="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="block text-xs text-slate-500 font-medium">${
                AppState.lang === 'en' ? 'Estimated Rate' : 'আনুমানিক ভাড়া'
              }</span>
              <span class="text-lg font-extrabold text-sky-800">${priceText}</span>
              <span class="text-xs text-slate-500 font-medium">${t.perNight}</span>
            </div>
            <div class="flex items-center gap-2">
              <button
                type="button"
                onclick="if(typeof selectItineraryHotel==='function') selectItineraryHotel('${hotel.id}', true)"
                class="px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition shadow-xs ${
                  typeof FeaturesState !== 'undefined' && FeaturesState.selectedHotelId === hotel.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }">
                ${
                  typeof FeaturesState !== 'undefined' && FeaturesState.selectedHotelId === hotel.id
                    ? AppState.lang === 'en'
                      ? '✓ In My Trip'
                      : '✓ প্ল্যানে আছে'
                    : AppState.lang === 'en'
                    ? '+ Pick for Trip'
                    : '+ প্ল্যানে নিন'
                }
              </button>
              <button
                type="button"
                onclick="openHotelInquiry('${hotel.id}')"
                class="px-3.5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold tracking-wide transition shadow-sm shrink-0">
                ${t.inquireBtn}
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

function toggleHotelAutoSlide() {
  hotelAutoSlideEnabled = !hotelAutoSlideEnabled;
  updateHotelAutoSlideUI();
}

function pauseHotelAutoSlide(isPaused) {
  hotelSliderHoverPaused = Boolean(isPaused);
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

function setHotelFilter(locationKey) {
  AppState.hotelFilter = locationKey;
  hotelSliderActiveIndex = 0;
  renderHotels();
  const track = document.getElementById('hotels-grid');
  if (track) track.scrollTo({ left: 0, behavior: 'smooth' });
}

function openHotelInquiry(hotelId) {
  const hotel = HOTELS_DATA.find(h => h.id === hotelId);
  if (!hotel) return;
  const price = formatPriceRange(hotel.minBDT, hotel.maxBDT);

  // Open Chatbot with pre-filled context about the selected hotel
  if (!AppState.isChatOpen) {
    toggleChatbot(true);
  }
  const promptText =
    AppState.lang === 'en'
      ? `Tell me more about ${hotel.name.en} at ${hotel.location.en} (${price}/night).`
      : `${hotel.name.bn} (${hotel.location.bn}, ভাড়া: ${price}) সম্পর্কে বিস্তারিত জানান।`;

  handleUserChatSubmission(promptText);
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
            src="${spot.image}"
            alt="${spot.name[AppState.lang]}"
            loading="lazy"
            class="card-img w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
          <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow">
            ${spot.tag[AppState.lang]}
          </span>
          <div class="absolute top-4 right-4">
            ${typeof getInlineAdminControls === 'function' ? getInlineAdminControls('destinations', spot.id) : ''}
          </div>
          <h3 class="absolute bottom-4 left-5 right-5 text-xl font-bold text-white drop-shadow-sm">
            ${spot.name[AppState.lang]}
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
                <p class="text-slate-700 text-sm font-medium mt-0.5">${spot.vibe[AppState.lang]}</p>
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
                <p class="text-slate-600 text-sm mt-0.5">${spot.directions[AppState.lang]}</p>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs text-slate-400">
            ${
              spot.sourceUrl
                ? `<a href="${spot.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-sky-600 hover:underline font-semibold">
                    ✓ ${spot.sourceName || 'Wikimedia Commons'} ↗
                  </a>`
                : '<span></span>'
            }
            <button
              type="button"
              onclick="if(typeof addSpotFromWebsiteCard==='function') addSpotFromWebsiteCard('${spot.id}')"
              class="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition shadow-2xs shrink-0"
            >
              ${AppState.lang === 'en' ? '+ Add to My Trip' : '+ ট্রিপ প্ল্যানে নিন'}
            </button>
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

  // Render Hidden Gems with Original Cox's Bazar Photos
  gemsGrid.innerHTML = HIDDEN_GEMS_DATA.map((gem, idx) => {
    return `
      <div class="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl overflow-hidden hover:bg-white/15 transition-all flex flex-col justify-between">
        <div>
          ${
            gem.image
              ? `<div class="relative h-40 overflow-hidden bg-slate-900">
                  <img src="${gem.image}" alt="${gem.name[AppState.lang]}" loading="lazy" class="w-full h-full object-cover opacity-95 hover:scale-105 transition duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <span class="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950">
                    #${idx + 1} • ${gem.highlight[AppState.lang]}
                  </span>
                </div>`
              : ''
          }
          <div class="p-5">
            <h4 class="text-lg font-bold text-white">${gem.name[AppState.lang]}</h4>
            <p class="text-sky-100/90 text-xs sm:text-sm mt-2 leading-relaxed">${gem.description[AppState.lang]}</p>
          </div>
        </div>
        <div class="px-5 pb-4 flex items-center justify-between gap-2">
          ${
            gem.sourceUrl
              ? `<a href="${gem.sourceUrl}" target="_blank" rel="noopener noreferrer" class="text-[11px] text-teal-300 hover:underline font-semibold">
                  ✓ Original Photo Source ↗
                </a>`
              : '<span></span>'
          }
          ${typeof getInlineAdminControls === 'function' ? getInlineAdminControls('hiddenGems', gem.id) : ''}
        </div>
      </div>
    `;
  }).join('');
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

function toggleDestinationAutoSlide() {
  destinationAutoSlideEnabled = !destinationAutoSlideEnabled;
  updateDestinationAutoSlideUI();
}

function pauseDestinationAutoSlide(isPaused) {
  destinationSliderHoverPaused = Boolean(isPaused);
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
              <h4 class="font-bold text-slate-900 text-sm">${item.title[AppState.lang]}</h4>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed">${item.desc[AppState.lang]}</p>
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
        <tr class="hover:bg-sky-50/70 transition-colors">
          <!-- Route -->
          <td class="px-5 py-4 font-semibold text-slate-900 text-sm">
            <div class="flex items-center justify-between gap-2.5">
              <div class="flex items-center gap-2.5">
                <span class="w-2 h-2 rounded-full bg-sky-600 shrink-0"></span>
                <span>${item.route[AppState.lang]}</span>
              </div>
              ${typeof getInlineAdminControls === 'function' ? getInlineAdminControls('transport', item.id) : ''}
            </div>
          </td>

          <!-- Vehicle with Interactive Foreigner Tooltip -->
          <td class="px-5 py-4 text-sm">
            <span tabindex="0" class="term-tooltip font-semibold text-sky-800 bg-sky-50 px-3 py-1 rounded-lg border border-sky-200/70">
              ${item.vehicle[AppState.lang]}
              <svg class="w-3.5 h-3.5 text-sky-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="tooltip-box">${tooltipText}</span>
            </span>
          </td>

          <!-- Dynamic Cost (BDT / USD) -->
          <td class="px-5 py-4 font-extrabold text-teal-700 text-sm whitespace-nowrap">
            ${priceStr}
          </td>

          <!-- Booking Mode (Shared / Reserved) -->
          <td class="px-5 py-4 text-sm">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              item.modeNote.en.includes('Shared')
                ? 'bg-emerald-100 text-emerald-800'
                : item.modeNote.en.includes('Per passenger')
                ? 'bg-amber-100 text-amber-800'
                : 'bg-indigo-100 text-indigo-800'
            }">
              ${item.modeNote[AppState.lang]}
            </span>
          </td>

          <!-- Duration -->
          <td class="px-5 py-4 text-sm text-slate-600 font-medium whitespace-nowrap">
            <span class="inline-flex items-center gap-1.5">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              ${item.duration[AppState.lang]}
            </span>
          </td>
        </tr>
      `;
    })
    .join('');
}

/* --------------------------------------------------------------------------
 * SECTION 5: ESSENTIAL TRAVEL INFO RENDERER
 * -------------------------------------------------------------------------- */
function renderEssentialInfo() {
  const info = UI_TEXT[AppState.lang].essentialSection;
  const container = document.getElementById('essential-info-grid');
  if (!container) return;

  const etiquetteHTML = info.etiquette.items
    .map(
      item => `
      <li class="flex items-start gap-3">
        <span class="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">✓</span>
        <div>
          <span class="font-bold text-slate-900 text-sm">${item.label}:</span>
          <span class="text-slate-600 text-sm ml-1">${item.text}</span>
        </div>
      </li>
    `
    )
    .join('');

  const emergencyHTML = info.emergency.contacts
    .map(
      c => `
      <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
        <div>
          <h4 class="font-bold text-slate-900 text-sm">${c.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5">${c.note}</p>
        </div>
        <a
          href="tel:${c.number.replace(/\s+/g, '')}"
          class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shrink-0 shadow-sm">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <span>${c.number}</span>
        </a>
      </div>
    `
    )
    .join('');

  container.innerHTML = `
    <!-- Card 1: Weather & Best Time to Visit -->
    <div class="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">${info.weather.title}</h3>

        <div class="space-y-4">
          <div class="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
            <span class="inline-block text-xs font-extrabold uppercase tracking-wider text-sky-800 bg-sky-200/70 px-2.5 py-0.5 rounded-md mb-1">
              ★ ${info.weather.peakTitle}
            </span>
            <p class="text-sm text-slate-700 leading-relaxed">${info.weather.peakDesc}</p>
          </div>

          <div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
            <span class="block text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
              ${info.weather.shoulderTitle}
            </span>
            <p class="text-sm text-slate-600 leading-relaxed">${info.weather.shoulderDesc}</p>
          </div>

          <div class="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
            <span class="block text-xs font-bold uppercase tracking-wider text-teal-900 mb-1">
              ${info.weather.monsoonTitle}
            </span>
            <p class="text-sm text-slate-600 leading-relaxed">${info.weather.monsoonDesc}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Card 2: Cultural Etiquette & Dress Codes -->
    <div class="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div class="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-4">${info.etiquette.title}</h3>
        <ul class="space-y-4">
          ${etiquetteHTML}
        </ul>
      </div>
    </div>

    <!-- Card 3: Emergency Contacts (Tourist Police, Hospitals) -->
    <div class="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm flex flex-col justify-between">
      <div>
        <div class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-5">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-1">${info.emergency.title}</h3>
        <p class="text-xs text-slate-500 mb-4">${info.emergency.subtitle}</p>
        <div class="space-y-3">
          ${emergencyHTML}
        </div>
      </div>
    </div>
  `;
}

/* --------------------------------------------------------------------------
 * SECTION 6A: INTERACTIVE FAQ ACCORDION RENDERER
 * -------------------------------------------------------------------------- */
function renderFAQs() {
  const container = document.getElementById('faq-accordion-container');
  if (!container) return;

  container.innerHTML = FAQ_DATA.map(item => {
    const isOpen = AppState.activeFaqId === item.id;
    // Dynamically show converted fare in FAQ #2 if USD is active
    let answerText = item.answer[AppState.lang];
    if (item.id === 'faq-2' && AppState.currency === 'USD') {
      const converted = formatPriceRange(80, 100);
      answerText += ` (${converted})`;
    }

    return `
      <div class="faq-item ${isOpen ? 'active' : ''} bg-white rounded-2xl border ${
      isOpen ? 'border-sky-500 shadow-md shadow-sky-900/5' : 'border-slate-200/90'
    } transition-all overflow-hidden">
        <button
          type="button"
          onclick="toggleFaqItem('${item.id}')"
          aria-expanded="${isOpen}"
          class="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/80 transition">
          <span class="font-bold text-slate-900 text-base md:text-lg">${item.question[AppState.lang]}</span>
          <div class="flex items-center gap-3 shrink-0">
            ${typeof getInlineAdminControls === 'function' ? getInlineAdminControls('faqs', item.id) : ''}
            <span class="faq-icon w-8 h-8 rounded-full ${
              isOpen ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
            } flex items-center justify-center shrink-0 transition-transform duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
              </svg>
            </span>
          </div>
        </button>
        <div class="faq-answer px-6">
          <div class="pb-5 pt-1 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100">
            ${answerText}
          </div>
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
 * HERO QUICK SEARCH HANDLER
 * -------------------------------------------------------------------------- */
function handleHeroSearch(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('hero-search-input');
  const categorySelect = document.getElementById('hero-search-category');

  AppState.searchQuery = input ? input.value : '';
  AppState.searchCategory = categorySelect ? categorySelect.value : 'all';

  renderHotels();
  renderDestinations();
  renderTransport();

  // Scroll smoothly to target section based on category or query
  if (AppState.searchCategory === 'hotels') {
    document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' });
  } else if (AppState.searchCategory === 'spots') {
    document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
  } else if (AppState.searchCategory === 'transport') {
    document.getElementById('transport')?.scrollIntoView({ behavior: 'smooth' });
  } else if (AppState.searchQuery.trim()) {
    const q = AppState.searchQuery.toLowerCase();
    if (q.includes('tomtom') || q.includes('chander') || q.includes('cng') || q.includes('speedboat')) {
      document.getElementById('transport')?.scrollIntoView({ behavior: 'smooth' });
    } else if (q.includes('inani') || q.includes('himchari') || q.includes('moheshkhali') || q.includes('ramu') || q.includes('sonadia') || q.includes('radiant')) {
      document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('hotels')?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function resetSearchAndFilters() {
  AppState.searchQuery = '';
  AppState.searchCategory = 'all';
  AppState.hotelFilter = 'ALL';
  const input = document.getElementById('hero-search-input');
  const select = document.getElementById('hero-search-category');
  if (input) input.value = '';
  if (select) select.value = 'all';
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
        class="text-xs bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 px-3 py-1.5 rounded-full font-medium transition">
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
        ${htmlText}
      </div>
    `;
  } else {
    wrapper.className = 'flex items-start gap-2.5';
    wrapper.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-sky-600 to-teal-500 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
        CB
      </div>
      <div class="max-w-[84%] bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-2xl rounded-tl-xs text-sm leading-relaxed shadow-xs">
        ${htmlText}
      </div>
    `;
  }

  messagesBox.appendChild(wrapper);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

/**
 * ============================================================================
 * AI BACKEND INTEGRATION HOOK
 * ============================================================================
 * Currently provides instant local responses using the verified Cox's Bazar
 * dataset. To connect your custom LLM / AI Backend API later, simply replace
 * the body of `fetchTravelAssistantReply(userText)` with a `fetch('/api/chat')` call!
 */
async function fetchTravelAssistantReply(userText) {
  const q = userText.toLowerCase();

  // Simulate natural assistant thinking delay (450ms)
  await new Promise(resolve => setTimeout(resolve, 450));

  /*
   * // EXAMPLE BACKEND INTEGRATION:
   * const res = await fetch('https://your-api.com/chat', {
   *   method: 'POST',
   *   headers: { 'Content-Type': 'application/json' },
   *   body: JSON.stringify({ message: userText, lang: AppState.lang, currency: AppState.currency })
   * });
   * const data = await res.json();
   * return data.reply;
   */

  // Smart Contextual Matcher from our exact dataset
  if (q.includes('hotel') || q.includes('stay') || q.includes('price') || q.includes('হোটেল') || q.includes('ভাড়া') || q.includes('sea crown') || q.includes('kollol') || q.includes('nisanah') || q.includes('orchid') || q.includes('prime park')) {
    const lines = HOTELS_DATA.map(
      h => `• <strong>${h.name[AppState.lang]}</strong> (${h.location[AppState.lang]}): ${formatPriceRange(h.minBDT, h.maxBDT)}/night`
    ).join('<br/>');
    return AppState.lang === 'en'
      ? `Here are the top hotels in Cox's Bazar (${AppState.currency}):<br/><br/>${lines}`
      : `কক্সবাজারের প্রধান হোটেলগুলোর প্রতি রাতের ভাড়া (${AppState.currency}):<br/><br/>${lines}`;
  }

  if (q.includes('inani') || q.includes('ইনানী') || q.includes('chander') || q.includes('চান্দের')) {
    const inaniFare = formatPriceRange(1500, 2000);
    return AppState.lang === 'en'
      ? `<strong>Inani Beach</strong> is 32 km south on the scenic Marine Drive (about 1 hour). You can hire a reserved <strong>Chander Gari (open-top group jeep)</strong> for <strong>${inaniFare}</strong>.`
      : `<strong>ইনানী সৈকত</strong> মেরিন ড্রাইভ ধরে ৩২ কিমি দক্ষিণে (সময় লাগে প্রায় ১ ঘণ্টা)। গ্রুপের জন্য রিজার্ভ <strong>চান্দের গাড়ি (খোলা জিপ)</strong> ভাড়া <strong>${inaniFare}</strong>।`;
  }

  if (q.includes('tomtom') || q.includes('easybike') || q.includes('টমটম') || q.includes('ইজিবাইক')) {
    const laboniFare = formatPriceRange(15, 20);
    const kalataliFare = formatPriceRange(10, 10);
    return AppState.lang === 'en'
      ? `<strong>Tomtoms (Easybikes)</strong> are battery-powered 3-wheelers for short hops:<br/>• Town to Laboni/Sugandha: <strong>${laboniFare}</strong> (Shared, 10 mins)<br/>• Kalatali to Sugandha: <strong>${kalataliFare}</strong> (Shared, 5 mins)`
      : `<strong>টমটম (ইজিবাইক)</strong> হলো ব্যাটারিচালিত অটোরিকশা:<br/>• শহর থেকে লাবণী/সুগন্ধা: <strong>${laboniFare}</strong> (শেয়ারড, ১০ মিনিট)<br/>• কলাতলী থেকে সুগন্ধা: <strong>${kalataliFare}</strong> (শেয়ারড, ৫ মিনিট)`;
  }

  if (q.includes('moheshkhali') || q.includes('মহেশখালী') || q.includes('speedboat')) {
    const boatFare = formatPriceRange(80, 100);
    return AppState.lang === 'en'
      ? `To visit <strong>Moheshkhali Island</strong> (Adinath Temple & salt pans), head to <strong>Kasturi Ghat</strong> in town and take a 35-minute speedboat ride for <strong>${boatFare}</strong> per passenger.`
      : `<strong>মহেশখালী দ্বীপে</strong> যেতে শহরের <strong>কস্তুরাঘাট</strong> থেকে জনপ্রতি <strong>${boatFare}</strong> ভাড়ায় ৩৫ মিনিটের স্পিডবোটে যেতে পারেন।`;
  }

  if (q.includes('best time') || q.includes('weather') || q.includes('সেরা সময়') || q.includes('আবহাওয়া')) {
    return AppState.lang === 'en'
      ? `The best time to visit Cox's Bazar is during the winter months from <strong>November to February</strong> when the weather is cool, sunny, and dry.`
      : `কক্সবাজার ভ্রমণের সেরা সময় হলো শীতকাল—<strong>নভেম্বর থেকে ফেব্রুয়ারি</strong> মাস, যখন আবহাওয়া ঠান্ডা ও শুষ্ক থাকে।`;
  }

  return AppState.lang === 'en'
    ? `I can help you with:<br/>• <strong>Hotels:</strong> Sea Crown, Prime Park, Kollol, Nisanah Resort, White Orchid<br/>• <strong>Spots:</strong> Inani, Himchari, Moheshkhali, Ramu, Sonadia<br/>• <strong>Transport:</strong> Tomtom, CNG, Chander Gari, or Speedboat fares.<br/>Just ask about any spot or hotel!`
    : `আমি আপনাকে সাহায্য করতে পারি:<br/>• <strong>হোটেল ভাড়া:</strong> সী ক্রাউন, প্রাইম পার্ক, কল্লোল, নিসানাহ, হোয়াইট অর্কিড<br/>• <strong>দর্শনীয় স্থান:</strong> ইনানী, হিমছড়ি, মহেশখালী, রামু, সোনাদিয়া<br/>• <strong>যাতায়াত ভাড়া:</strong> টমটম, সিএনজি, চান্দের গাড়ি ও স্পিডবোট।`;
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
 * MOBILE MENU & STICKY NAVBAR CONTROLLER
 * -------------------------------------------------------------------------- */
function toggleMobileMenu() {
  AppState.isMobileMenuOpen = !AppState.isMobileMenuOpen;
  const menu = document.getElementById('mobile-nav-drawer');
  if (menu) {
    menu.classList.toggle('hidden', !AppState.isMobileMenuOpen);
  }
}

function initScrollListeners() {
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 30) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // Close mobile drawer when clicking a nav link
  document.querySelectorAll('#mobile-nav-drawer a').forEach(link => {
    link.addEventListener('click', () => {
      AppState.isMobileMenuOpen = false;
      document.getElementById('mobile-nav-drawer')?.classList.add('hidden');
    });
  });
}

/* --------------------------------------------------------------------------
 * MASTER RENDER & INITIALIZATION
 * -------------------------------------------------------------------------- */
function renderAll() {
  updateToggleButtons();
  renderStaticText();
  renderHotels();
  renderDestinations();
  renderTransport();
  renderEssentialInfo();
  renderFAQs();
  renderChatQuickPrompts();
  if (typeof renderInteractiveFeatures === 'function') {
    renderInteractiveFeatures();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initScrollListeners();

  // Hook up Hero search form
  const searchForm = document.getElementById('hero-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', handleHeroSearch);
  }

  // Hook up Chatbot form
  const chatForm = document.getElementById('chatbot-form');
  if (chatForm) {
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      handleUserChatSubmission();
    });
  }
});
