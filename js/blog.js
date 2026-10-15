/**
 * Visit Cox's Bazar - travel blog (blog.js)
 * Renders the built-in posts below on blog.html and the #blog-section preview on index.html,
 * with category filter, search, reader modal, like (this visit only) and share.
 * There is no publisher: to add or change a post, edit DEFAULT_BLOG_POSTS in git.
 */

const BLOG_CATEGORIES = [
  { id: 'ALL', icon: '🌊', en: 'All Stories', bn: 'সব ব্লগ পোস্ট' },
  { id: 'Adventure & Routes', icon: '🏍️', en: 'Adventure & Routes', bn: 'অ্যাডভেঞ্চার ও রুট' },
  { id: 'Food & Seafood', icon: '🍛', en: 'Food & Seafood', bn: 'খাবার ও সি-ফুড' },
  { id: 'Island Hopping', icon: '🏝️', en: 'Island Hopping', bn: 'দ্বীপ ভ্রমণ' },
  { id: 'Local Tips & Safety', icon: '💡', en: 'Local Tips & Safety', bn: 'টিপস ও নিরাপত্তা' },
  { id: 'Hotel & Stay Guide', icon: '🏨', en: 'Hotel & Stay Guide', bn: 'হোটেল ও আবাসন' }
];

const DEFAULT_BLOG_POSTS = [
  {
    id: 'blog-marine-drive-bike-guide',
    title: {
      en: 'Complete Marine Drive Bike & Chander Gari Guide: Kolatoli to Shamlapur (80 km)',
      bn: 'মেরিন ড্রাইভে বাইক ও চান্দের গাড়ি ভ্রমণ গাইড: কলাতলী থেকে শামলাপুর (৮০ কিমি)'
    },
    category: 'Adventure & Routes',
    author: 'Anik Barua',
    date: 'October 2026',
    readTime: '4 min read',
    image: 'assets/images/inani-beach.jpg',
    likes: 42,
    tags: ['Marine Drive', 'Bike Rental', 'Inani Beach', 'Himchari', 'Shamlapur'],
    summary: {
      en: 'Everything you need to know about renting a bike (1,500 BDT/day) or reserving an open-top Chander Gari jeep along the 80 km ocean-and-hill highway.',
      bn: '৮০ কিমি দীর্ঘ মেরিন ড্রাইভ সড়কে বাইক ভাড়া (১৫০০ টাকা/দিন) বা খোলা ছাদের চান্দের গাড়িতে ভ্রমণের সম্পূর্ণ রুট ও টিপস।'
    },
    content: {
      en: `Riding along the 80-kilometer Cox's Bazar–Teknaf Marine Drive with emerald coastal hills on your left and the unbroken Bay of Bengal waves on your right is the single best experience in Cox's Bazar.

1. Bike / Scooter Rental vs. Chander Gari Jeep:
• Solo or Couple Riders: You can rent a scooter or motorcycle near Kolatoli Circle (Dolphin Mor) or Sugandha Point for around 1,500 BDT for the full day (including fuel). Make sure to carry your original NID/Passport and a valid driving license.
• Families & Groups (6–12 People): Reserve an iconic open-top Chander Gari ('Moon Car' 4x4 Jeep) for 1,500 to 2,000 BDT round-trip covering Himchari and Inani Beach.

2. Best Stop-by-Stop Route Plan:
• Stop 1 — Darianagar & Parasailing Point (10 km): Catch morning ocean winds and try beach parasailing (1,500 BDT).
• Stop 2 — Himchari National Park (18 km): Climb the hilltop stairs for a panoramic view of the curved coastline and see the natural coastal waterfall.
• Stop 3 — Inani Coral Beach (32 km): Walk among the ancient black coral boulders during low tide and enjoy calm, clear waters.
• Stop 4 — Mermaid Beach Cafe (Pechardwip): Great spot for fresh grilled seafood platters and coconut water by the waves.
• Stop 5 — Shamlapur Baharchhara Sunset Point (45 km): Watch traditional wooden crescent-shaped Sampan fishing boats lined up against the golden-hour sunset.

3. Important Safety Tip:
Always aim to start your return ride toward Cox's Bazar town right after sunset (around 5:30 PM) for better visibility and safe driving.`,
      bn: `বাম পাশে সবুজ পাহাড় আর ডান পাশে দিগন্তজোড়া বঙ্গোপসাগর রেখে ৮০ কিলোমিটার দীর্ঘ কক্সবাজার-টেকনাফ মেরিন ড্রাইভে ভ্রমণ যেকোনো পর্যটকের জন্য এক অনন্য অভিজ্ঞতা।

১. বাইক ভাড়া বনাম চান্দের গাড়ি:
• একক বা কাপল ভ্রমণকারীদের জন্য: কলাতলী মোড় (ডলফিন সার্কেল) বা সুগন্ধা পয়েন্ট থেকে সারাদিনের জন্য জ্বালানিসহ প্রায় ১,৫০০ টাকায় বাইক বা স্কুটার ভাড়া পাওয়া যায়। সাথে অবশ্যই মূল এনআইডি এবং ড্রাইভিং লাইসেন্স রাখবেন।
• পরিবার ও গ্রুপের জন্য: ১০-১২ জনের গ্রুপের জন্য ১,৫০০ থেকে ২,০০০ টাকায় খোলা ছাদের চান্দের গাড়ি রিজার্ভ করে হিমছড়ি ও ইনানী ঘুরে আসা সবচেয়ে সাশ্রয়ী ও আনন্দদায়ক।

২. সেরা স্টপওভার রুট:
• প্রথম স্টপ — দরিয়ানগর প্যারাসেইলিং পয়েন্ট (১০ কিমি)
• দ্বিতীয় স্টপ — হিমছড়ি জাতীয় উদ্যান ও পাহাড় চূড়া (১৮ কিমি)
• তৃতীয় স্টপ — ইনানী প্রবাল পাথরের সৈকত (৩২ কিমি)
• চতুর্থ স্টপ — শামলাপুর বাহারছড়া সাম্পান ঘাট ও সূর্যাস্ত (৪৫ কিমি)

৩. জরুরি পরামর্শ:
নিরাপত্তা ও ভালো দৃশ্যমানতার জন্য সূর্যাস্তের পরপরই শহরের উদ্দেশ্যে রওনা দিন।`
    }
  },
  {
    id: 'blog-best-seafood-poushee-guide',
    title: {
      en: "Where Locals Eat in Cox's Bazar: Poushee, Jhaubon & Sugandha Live Fish Fry",
      bn: 'কক্সবাজারের সেরা খাবার ও সি-ফুড গাইড: পৌষী, ঝাউবন ও সুগন্ধা লাইভ ফিশ ফ্রাই'
    },
    category: 'Food & Seafood',
    author: 'Anik Barua',
    date: 'October 2026',
    readTime: '3 min read',
    image: 'assets/images/hotel-sea-crown.jpg',
    likes: 35,
    tags: ['Poushee Restaurant', 'Seafood', 'Sugandha Beach', 'Loitta Fry', 'Food Guide'],
    summary: {
      en: 'From 25+ local bhartas and crispy Loitta fry at Poushee (~450 BDT) to evening live grilled crab and red snapper by the waves at Sugandha Point.',
      bn: 'ঝাউতলার পৌষী রেস্তোরাঁর ২৫+ পদের ভর্তা ও লইট্টা ফ্রাই (~৪৫০ টাকা) থেকে শুরু করে সুগন্ধা সৈকতের গরম গরম কাঁকড়া ও রূপচাঁদা বারবিকিউ।'
    },
    content: {
      en: `No trip to Cox's Bazar is complete without tasting authentic coastal Bengali seafood and Chittagong-style Mezbani cuisine. Here is a breakdown of the best places to eat for every budget:

1. Poushee Restaurant & Jhaubon Restaurant (Jhautola / Sugandha):
• What to Order: Their legendary platter of 20–25 local Bhartas (mashed shutki, shrimp, eggplant, mustard, and green chili), crispy Loitta (Bombay duck) fish fry, Rupchanda fish curry, and Mezbani beef.
• Average Cost: ~450 to 550 BDT per person.
• Tip: Reach by 1:00 PM for lunch to skip the peak tourist queue!

2. Sugandha Point Evening Live Fish Fry Stalls:
• What to Order: Right after sunset, dozens of open-air stalls display fresh catch on ice—pick your own Red Snapper (Koral), Rupchanda, Jumbo Prawn, Squid, or Crab, and they will masala-fry or BBQ it live in front of you.
• Average Cost: ~500 to 700 BDT depending on fish weight. Always confirm the per-piece price before they put it on the grill.

3. Mermaid Beach Cafe & Salt Bistro:
• For ocean-view artisan coffee, continental pasta, or a candlelight wood-fired seafood platter along Marine Drive, Mermaid Beach Cafe (~1,400 BDT) and Salt Bistro (~850 BDT) offer a relaxed international ambiance.`,
      bn: `কক্সবাজার ভ্রমণে এসে সামুদ্রিক মাছের তাজা ফ্রাই, রূপচাঁদা শুঁটকি ভর্তা এবং ঐতিহ্যবাহী মেজবানি গোশত না খেলে ভ্রমণই অসম্পূর্ণ থেকে যায়!

১. পৌষী ও ঝাউবন রেস্তোরাঁ:
• কী খাবেন: ২০-২৫ পদের ঐতিহ্যবাহী ভর্তা (চিংড়ি, লইট্টা শুঁটকি, ছুরি শুঁটকি, বেগুন, ডাল), মচমচে লইট্টা ফ্রাই, রূপচাঁদা মাছ ও মেজবানি গোশত।
• গড় খরচ: জনপ্রতি প্রায় ৪৫০ - ৫৫০ টাকা।

২. সুগন্ধা সৈকতের লাইভ ফিশ ফ্রাই মার্কেট:
• সন্ধ্যার পর সুগন্ধা পয়েন্টে সারিবদ্ধ দোকানে তাজা কোরাল, রূপচাঁদা, টুনা, অক্টোপাস ও কাঁকড়া নিজের পছন্দমতো বেছে নিলে সাথে সাথে মশলা মাখিয়ে ভেজে দেওয়া হয় (খরচ ~৫০০-৭০০ টাকা)। ভাজার আগে অবশ্যই দাম জেনে নিন।`
    }
  },
  {
    id: 'blog-moheshkhali-sonadia-island',
    title: {
      en: 'Moheshkhali & Sonadia Island Hopping: Speedboat Fares, Kasturi Ghat & Best Season',
      bn: 'মহেশখালী ও সোনাদিয়া দ্বীপ ভ্রমণ: কস্তুরাঘাট স্পিডবোট ভাড়া ও আদিনাথ মন্দির গাইড'
    },
    category: 'Island Hopping',
    author: 'Anik Barua',
    date: 'October 2026',
    readTime: '4 min read',
    image: 'assets/images/moheshkhali.jpg',
    likes: 29,
    tags: ['Moheshkhali', 'Sonadia Island', 'Speedboat', 'Kasturi Ghat', 'Adinath Temple'],
    summary: {
      en: 'How to take the 80–100 BDT speedboat from Kasturi Ghat to Bangladesh’s only hilly island, visit Mainak Hill’s Adinath Temple, and camp on Sonadia Island.',
      bn: 'শহরের কস্তুরাঘাট থেকে মাত্র ৮০-১০০ টাকায় স্পিডবোটে মহেশখালী দ্বীপ, মৈনাক পাহাড়ের আদিনাথ মন্দির এবং নির্জন সোনাদিয়া দ্বীপ ভ্রমণের বিস্তারিত।'
    },
    content: {
      en: `Want to escape the main beach crowd and explore untouched islands, mangrove channels, and hilltop temples? Moheshkhali and Sonadia Island are just across the Bakkhali river estuary.

1. Getting to Kasturi Ghat (6 No. Jetty):
• Take a shared Tomtom (Easybike) from Laboni, Sugandha, or Kolatoli to Kasturi Ghat (or 6 No. Ghat) in Cox's Bazar town (fare: 20–30 BDT, ~15 mins).

2. Speedboat Crossing to Moheshkhali Island:
• Fare: roughly 80 to 100 BDT per passenger each way (estimate, Oct 2026; confirm at the ghat).
• Duration: about 30 minutes to Gorakghata (about 1 hour by engine boat or sampan). Ask for a life jacket before you board, and refuse extra tolls at the ghat (Tourist Police, Oct 2026).
• What to See on the Island: Hire a local island Tomtom (~150–200 BDT reserved) to visit the historic Adinath Shiva Temple atop Mainak Hill, the Rakhine Buddhist Pagodas, betel-leaf hills, and coastal salt pans.

3. Sonadia Ecological Island:
• Famous for red ghost crabs, pine forests, and winter beach camping. Best visited between November and February when the sea channel is calm and dry.`,
      bn: `মূল সৈকতের কোলাহল ছেড়ে নির্জন দ্বীপ, প্যারাবন ও পাহাড়ি মন্দির দেখতে চাইলে মহেশখালী ও সোনাদিয়া দ্বীপ সেরা গন্তব্য।

১. কীভাবে যাবেন (কস্তুরাঘাট / ৬ নং ঘাট):
• কলাতলী বা লাবণী থেকে টমটমে করে শহরের কস্তুরাঘাট বা ৬ নং ঘাটে যান (ভাড়া ২০-৩০ টাকা)।
• সেখান থেকে স্পিডবোটে প্রায় ৩০ মিনিটে (ইঞ্জিনচালিত নৌকা বা সাম্পানে প্রায় ১ ঘণ্টা) মহেশখালীর গোরকঘাটায় পৌঁছানো যায় (ট্যুরিস্ট পুলিশ, অক্টোবর ২০২৬), ভাড়া জনপ্রতি মোটামুটি ৮০-১০০ টাকা (আনুমানিক, অক্টোবর ২০২৬; ঘাটে জেনে নিন)। ওঠার আগে লাইফজ্যাকেট চেয়ে নিন, ঘাটে বাড়তি টোল দেবেন না।

২. কী কী দেখবেন:
• মৈনাক পাহাড়ের চূড়ায় ঐতিহাসিক আদিনাথ মন্দির, রাখাইন বৌদ্ধ প্যাগোডা, লবণের মাঠ ও পানের বরজ। আর শীতকালে সোনাদিয়া দ্বীপে লাল কাঁকড়া ও বিচ ক্যাম্পিং উপভোগ করতে পারেন।`
    }
  },
  {
    id: 'blog-first-timer-safety-budget-tips',
    title: {
      en: "First-Timer's Safety & Budget Cheat Sheet: Tomtom Fares, Green Flags & Best Hotels",
      bn: 'প্রথমবার কক্সবাজার ভ্রমণের টিপস: টমটম ভাড়া, লাইফগার্ড পতাকা ও সেরা হোটেল'
    },
    category: 'Local Tips & Safety',
    author: 'Anik Barua',
    date: 'October 2026',
    readTime: '3 min read',
    image: 'assets/images/himchari.jpg',
    likes: 51,
    tags: ['Safety Tips', 'Tomtom Fares', 'Hotels', 'Tourist Police', 'Budget'],
    summary: {
      en: 'Avoid overpaying and stay safe: typical Tomtom fares (estimates, Oct 2026), green vs. red lifeguard flags, hotel zone comparison, and 24/7 emergency numbers.',
      bn: 'নিরাপদ ও সাশ্রয়ী ভ্রমণের জন্য জেনে নিন টমটমের সাধারণ ভাড়া (আনুমানিক, অক্টোবর ২০২৬), সৈকতের লাল-সবুজ পতাকার নিয়ম এবং জরুরি ট্যুরিস্ট পুলিশ নাম্বার।'
    },
    content: {
      en: `Planning your first trip to Cox's Bazar? Keep these local tips in mind to save money and travel safely:

1. Know Which Beach Zone Fits Your Style:
• Sugandha Beach: Best for beachfront stays (like Hotel Sea Crown), evening seafood stalls, and water sports.
• Laboni Beach: Closest to town, Burmese handicraft markets, and family hotels with pools (like Hotel Kollol).
• Kalatali & Eco Park: Best for budget-friendly hill-view hotels (Prime Park Hotel, White Orchid) and quick access to Marine Drive.

2. Avoid Overpaying for Local Rides (fares below are estimates, Oct 2026):
• Shared Tomtoms between Kalatali, Sugandha, and Laboni usually cost 10 to 20 BDT per person.
• For reserved CNGs (to Himchari: 300–400 BDT; to Ramu: 400–500 BDT) or Chander Gari jeeps (to Inani: 1,500–2,000 BDT), always agree on the round-trip fare and waiting time before boarding.

3. Beach Swimming Safety & Emergency Contacts:
• Swim ONLY between Green Flags watched by CIPRB Sea Safe Lifeguards. Never enter the water near Red Flags or after sunset.
• Save National Emergency (999) and the Tourist Police helplines (01320-222222, 01887-878787; Tourist Police, Oct 2026) on your phone.`,
      bn: `প্রথমবার কক্সবাজার ভ্রমণে গেলে নিচের টিপসগুলো আপনার খরচ বাঁচাবে এবং ভ্রমণকে নিরাপদ রাখবে:

১. কোন জোনে হোটেল নেবেন?
• সুগন্ধা পয়েন্ট: সরাসরি সৈকত সংলগ্ন হোটেল (যেমন: হোটেল সী ক্রাউন) ও ফিশ ফ্রাই মার্কেটের জন্য সেরা।
• লাবণী পয়েন্ট: বার্মিজ মার্কেট ও সুইমিং পুলসহ ফ্যামিলি হোটেলের (যেমন: হোটেল কল্লোল) জন্য আদর্শ।
• কলাতলী ও ইকো পার্ক: সাশ্রয়ী বাজেটে ভালো হোটেল (প্রাইম পার্ক, হোয়াইট অর্কিড) ও মেরিন ড্রাইভের প্রবেশমুখ।

২. সৈকতের নিরাপত্তা ও জরুরি নাম্বার:
• সমুদ্রে গোসলের সময় শুধুমাত্র সি-সেফ লাইফগার্ডদের সবুজ পতাকা চিহ্নিত স্থানে নামুন। লাল পতাকা থাকলে কখনোই পানিতে নামবেন না।
• যেকোনো প্রয়োজনে জাতীয় জরুরি সেবা ৯৯৯ বা ট্যুরিস্ট পুলিশ হেল্পলাইনে (01320-222222, 01887-878787; ট্যুরিস্ট পুলিশ, অক্টোবর ২০২৬) কল করুন।`
    }
  }
];

const BlogState = {
  posts: [],
  activeCategory: 'ALL',
  searchQuery: '',
  readingPostId: null
};

function loadBlogPosts() {
  BlogState.posts = JSON.parse(JSON.stringify(DEFAULT_BLOG_POSTS));
}

function getBlogLang() {
  return typeof AppState !== 'undefined' && AppState.lang ? AppState.lang : 'en';
}

function getLocalizedField(fieldObj, lang) {
  if (!fieldObj) return '';
  if (typeof fieldObj === 'string') return fieldObj;
  return fieldObj[lang] || fieldObj.en || fieldObj.bn || '';
}

/* --------------------------------------------------------------------------
 * 2. FILTER, SEARCH & RENDER BLOG CARDS (WORKS ON BOTH index.html & blog.html)
 * -------------------------------------------------------------------------- */
function setBlogCategory(catId) {
  BlogState.activeCategory = catId;
  renderBlogSection();
}

function handleBlogSearchInput(val) {
  BlogState.searchQuery = (val || '').trim();
  renderBlogSection();
}

function getFilteredBlogPosts() {
  const lang = getBlogLang();
  const q = BlogState.searchQuery.toLowerCase();

  return BlogState.posts.filter(post => {
    const matchesCat = BlogState.activeCategory === 'ALL' || post.category === BlogState.activeCategory;
    if (!matchesCat) return false;
    if (!q) return true;

    const titleEn = getLocalizedField(post.title, 'en').toLowerCase();
    const titleBn = getLocalizedField(post.title, 'bn').toLowerCase();
    const sumEn = getLocalizedField(post.summary, 'en').toLowerCase();
    const sumBn = getLocalizedField(post.summary, 'bn').toLowerCase();
    const bodyEn = getLocalizedField(post.content, 'en').toLowerCase();
    const bodyBn = getLocalizedField(post.content, 'bn').toLowerCase();
    const tagsStr = (post.tags || []).join(' ').toLowerCase();
    const authorStr = (post.author || '').toLowerCase();

    return (
      titleEn.includes(q) ||
      titleBn.includes(q) ||
      sumEn.includes(q) ||
      sumBn.includes(q) ||
      bodyEn.includes(q) ||
      bodyBn.includes(q) ||
      tagsStr.includes(q) ||
      authorStr.includes(q)
    );
  });
}

function renderBlogSection() {
  const lang = getBlogLang();

  // Sync navbar links if present
  document.querySelectorAll('[data-nav="blog"]').forEach(el => {
    el.textContent = lang === 'en' ? 'Blog' : 'ব্লগ';
  });

  // Render category filter pills
  const filterContainer = document.getElementById('blog-category-filters');
  if (filterContainer) {
    filterContainer.innerHTML = BLOG_CATEGORIES.map(cat => {
      const isActive = BlogState.activeCategory === cat.id;
      const count =
        cat.id === 'ALL'
          ? BlogState.posts.length
          : BlogState.posts.filter(p => p.category === cat.id).length;
      return `
        <button
          type="button"
          onclick="setBlogCategory('${cat.id}')"
          class="px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 border cursor-pointer whitespace-nowrap ${
            isActive
              ? 'bg-ocean-950 text-amber-300 border-ocean-950 shadow-sm scale-[1.02]'
              : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300 hover:bg-sky-50'
          }"
        >
          <span>${cat.icon} ${cat[lang]}</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] ${
            isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
          }">${count}</span>
        </button>
      `;
    }).join('');
  }

  // Update static section headings if present
  const setTxt = (id, txt) => {
    const el = document.getElementById(id);
    if (el) el.textContent = txt;
  };
  setTxt(
    'blog-section-eyebrow',
    lang === 'en' ? '📰 TRAVEL BLOG & COMMUNITY STORIES' : '📰 কক্সবাজার ভ্রমণ ব্লগ ও অভিজ্ঞতা শেয়ারিং'
  );
  setTxt(
    'blog-section-title',
    lang === 'en'
      ? 'Cox’s Bazar Travel Blog & Local Guides'
      : 'কক্সবাজার ভ্রমণ গাইড, টিপস ও কমিউনিটি ব্লগ'
  );
  setTxt(
    'blog-section-subtitle',
    lang === 'en'
      ? 'Read insider tips on Marine Drive routes, authentic seafood spots, and island hopping across Cox’s Bazar.'
      : 'কক্সবাজারের ভ্রমণ অভিজ্ঞতা, সামুদ্রিক খাবার, মেরিন ড্রাইভ রুট ও দ্বীপ ভ্রমণের বিস্তারিত গাইড পড়ুন।'
  );
  setTxt('blog-open-page-text', lang === 'en' ? 'Open Full Blog Page' : 'সম্পূর্ণ ব্লগ পেজ দেখুন');

  const gridEl = document.getElementById('blog-posts-grid');
  if (!gridEl) return;

  const isStandalonePage = Boolean(document.body && document.body.getAttribute('data-page') === 'blog');
  const filtered = getFilteredBlogPosts();
  const postsToShow = isStandalonePage ? filtered : filtered.slice(0, 6);

  if (postsToShow.length === 0) {
    gridEl.innerHTML = `
      <div class="col-span-full bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-2xs">
        <div class="text-3xl mb-2">📝</div>
        <h4 class="text-lg font-extrabold text-slate-900">
          ${lang === 'en' ? 'No blog posts match your filter' : 'এই ক্যাটাগরিতে কোনো ব্লগ পোস্ট পাওয়া যায়নি'}
        </h4>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          ${lang === 'en' ? 'Try clearing your search or selecting All Posts.' : 'সব ক্যাটাগরি দেখুন অথবা সার্চ পরিবর্তন করুন।'}
        </p>
        <div class="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onclick="BlogState.activeCategory='ALL'; BlogState.searchQuery=''; renderBlogSection();"
            class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            ${lang === 'en' ? 'Show All Posts' : 'সব পোস্ট দেখুন'}
          </button>
        </div>
      </div>
    `;
    return;
  }

  gridEl.innerHTML = postsToShow
    .map(post => {
      const title = getLocalizedField(post.title, lang);
      const summary = getLocalizedField(post.summary, lang);
      const catMeta = BLOG_CATEGORIES.find(c => c.id === post.category) || BLOG_CATEGORIES[0];
      const tagsHTML = (post.tags || [])
        .slice(0, 3)
        .map(
          t =>
            `<span class="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">#${t}</span>`
        )
        .join('');

      return `
        <article
          class="coastal-card group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
        >
          <div>
            <!-- Cover Image -->
            <div
              onclick="openBlogReaderModal('${post.id}')"
              class="relative h-52 overflow-hidden bg-slate-200 cursor-pointer"
            >
              <img
                src="${post.image || 'assets/images/inani-beach.jpg'}"
                alt="${title.replace(/"/g, '&quot;')}"
                loading="lazy"
                decoding="async"
                class="card-img w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

              <span class="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-400 text-slate-950 shadow">
                ${catMeta.icon} ${catMeta[lang]}
              </span>

              <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-sky-100 font-semibold">
                <span>✍️ ${post.author || 'Traveler'} • ${post.date || 'Oct 2026'}</span>
                <span>⏱ ${post.readTime || '3 min read'}</span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-5 sm:p-6">
              <h3
                onclick="openBlogReaderModal('${post.id}')"
                class="font-display text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-sky-700 transition leading-snug cursor-pointer line-clamp-2"
              >
                ${title}
              </h3>
              <p class="text-slate-600 text-xs sm:text-sm mt-2.5 leading-relaxed line-clamp-3">
                ${summary}
              </p>
              <div class="flex flex-wrap gap-1.5 mt-3.5">
                ${tagsHTML}
              </div>
            </div>
          </div>

          <!-- Card Footer -->
          <div class="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onclick="likeBlogPost('${post.id}')"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-extrabold transition cursor-pointer"
            >
              <span>❤️</span>
              <span>${post.likes || 0}</span>
            </button>

            <div class="flex items-center gap-2">
              <button
                type="button"
                onclick="shareBlogPost('${post.id}')"
                title="${lang === 'en' ? 'Share Post' : 'শেয়ার করুন'}"
                class="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 text-xs font-bold transition cursor-pointer"
              >
                🔗 ${lang === 'en' ? 'Share' : 'শেয়ার'}
              </button>
              <button
                type="button"
                onclick="openBlogReaderModal('${post.id}')"
                class="px-4 py-1.5 rounded-xl bg-ocean-950 hover:bg-sky-700 text-amber-300 hover:text-white text-xs font-extrabold transition cursor-pointer"
              >
                ${lang === 'en' ? 'Read Full Story →' : 'সম্পূর্ণ পড়ুন →'}
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

/* --------------------------------------------------------------------------
 * 3. FULL ARTICLE READER MODAL, LIKE & SHARE
 * -------------------------------------------------------------------------- */
function openBlogReaderModal(postId) {
  const post = BlogState.posts.find(p => p.id === postId);
  if (!post) return;
  BlogState.readingPostId = postId;

  const modal = document.getElementById('blog-reader-modal');
  const contentBox = document.getElementById('blog-reader-content');
  if (!modal || !contentBox) return;

  const lang = getBlogLang();
  const title = getLocalizedField(post.title, lang);
  const bodyText = getLocalizedField(post.content, lang);
  const catMeta = BLOG_CATEGORIES.find(c => c.id === post.category) || BLOG_CATEGORIES[0];

  const paragraphsHTML = String(bodyText)
    .split(/\n\n+/)
    .map(block => {
      const lines = block
        .trim()
        .split('\n')
        .map(line => line.replace(/</g, '&lt;').replace(/>/g, '&gt;'))
        .join('<br/>');
      return `<p class="text-slate-700 text-sm sm:text-base leading-relaxed mb-4">${lines}</p>`;
    })
    .join('');

  const tagsHTML = (post.tags || [])
    .map(
      t =>
        `<span class="px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold">#${t}</span>`
    )
    .join('');

  contentBox.innerHTML = `
    <div class="relative h-64 sm:h-80 bg-slate-900 overflow-hidden">
      <img
        src="${post.image || 'assets/images/inani-beach.jpg'}"
        alt="${title.replace(/"/g, '&quot;')}"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover opacity-90"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

      <button
        type="button"
        onclick="closeBlogReaderModal()"
        class="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-rose-600 text-white font-extrabold flex items-center justify-center border border-white/20 transition cursor-pointer"
      >
        ✕
      </button>

      <div class="absolute bottom-5 left-6 right-6 text-white">
        <span class="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-950 mb-2.5">
          ${catMeta.icon} ${catMeta[lang]}
        </span>
        <h2 class="font-display text-xl sm:text-3xl font-extrabold leading-snug text-white">
          ${title}
        </h2>
        <div class="flex flex-wrap items-center gap-3 text-xs text-sky-200 mt-2">
          <span>✍️ <strong>${post.author || 'Traveler'}</strong></span>
          <span>• 📅 ${post.date || 'October 2026'}</span>
          <span>• ⏱ ${post.readTime || '3 min read'}</span>
        </div>
      </div>
    </div>

    <div class="p-6 sm:p-8">
      <div class="prose max-w-none">
        ${paragraphsHTML}
      </div>

      <div class="flex flex-wrap gap-2 mt-6 pt-5 border-t border-slate-200">
        ${tagsHTML}
      </div>

      <div class="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <button
            type="button"
            onclick="likeBlogPost('${post.id}', true)"
            class="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs flex items-center gap-1.5 border border-rose-200 transition cursor-pointer"
          >
            <span>❤️ ${lang === 'en' ? 'Helpful' : 'পছন্দ হয়েছে'} (${post.likes || 0})</span>
          </button>
          <button
            type="button"
            onclick="shareBlogPost('${post.id}')"
            class="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-extrabold text-xs flex items-center gap-1.5 border border-sky-200 transition cursor-pointer"
          >
            <span>🔗 ${lang === 'en' ? 'Share / Copy Link' : 'শেয়ার লিংক কপি করুন'}</span>
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            onclick="closeBlogReaderModal()"
            class="px-5 py-2 rounded-xl bg-ocean-950 hover:bg-sky-800 text-amber-300 font-extrabold text-xs transition cursor-pointer"
          >
            ${lang === 'en' ? 'Close' : 'বন্ধ করুন'}
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeBlogReaderModal() {
  const modal = document.getElementById('blog-reader-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function likeBlogPost(postId, fromModal) {
  const post = BlogState.posts.find(p => p.id === postId);
  if (!post) return;
  post.likes = (Number(post.likes) || 0) + 1;
  renderBlogSection();
  if (fromModal) {
    openBlogReaderModal(postId);
  }
}

function shareBlogPost(postId) {
  const post = BlogState.posts.find(p => p.id === postId);
  if (!post) return;
  const lang = getBlogLang();
  const title = getLocalizedField(post.title, lang);
  const shareUrl = `${window.location.origin}${window.location.pathname.replace(/index\.html$/, '')}blog.html#${post.id}`;

  if (navigator.share) {
    navigator
      .share({
        title,
        text: getLocalizedField(post.summary, lang),
        url: shareUrl
      })
      .catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(`${title} — ${shareUrl}`);
    showBlogToast(
      lang === 'en'
        ? 'Blog link copied to clipboard! Ready to share.'
        : 'ব্লগ পোস্টের লিংক কপি হয়েছে! এখন শেয়ার করতে পারেন।'
    );
  }
}

function showBlogToast(message) {
  if (typeof showUserToast === 'function') {
    showUserToast(message);
    return;
  }
  let toast = document.getElementById('blog-toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'blog-toast-notification';
    toast.className =
      'fixed bottom-6 left-1/2 -translate-x-1/2 z-[95] bg-ocean-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/50 text-xs sm:text-sm font-bold transition-all duration-300';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  clearTimeout(window.__blogToastTimer);
  window.__blogToastTimer = setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 3400);
}

/* --------------------------------------------------------------------------
 * 4. ENSURE THE READER MODAL EXISTS IN DOM & INITIALIZE
 * -------------------------------------------------------------------------- */
function ensureBlogModalsInDOM() {
  if (!document.getElementById('blog-reader-modal')) {
    const readerModal = document.createElement('div');
    readerModal.id = 'blog-reader-modal';
    readerModal.className =
      'hidden fixed inset-0 z-[85] bg-slate-950/80 backdrop-blur-sm items-center justify-center p-3 sm:p-6';
    readerModal.innerHTML = `
      <div
        id="blog-reader-content"
        class="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
      ></div>
    `;
    readerModal.addEventListener('click', e => {
      if (e.target === readerModal) closeBlogReaderModal();
    });
    document.body.appendChild(readerModal);
  }
}

function initBlogModule() {
  loadBlogPosts();
  ensureBlogModalsInDOM();
  renderBlogSection();

  // If URL hash matches a specific blog post ID, open that article automatically
  const hashId = (window.location.hash || '').replace(/^#/, '');
  if (hashId && hashId.startsWith('blog-') && hashId !== 'blog-section') {
    const matched = BlogState.posts.find(p => p.id === hashId);
    if (matched) {
      setTimeout(() => openBlogReaderModal(matched.id), 250);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogModule);
} else {
  initBlogModule();
}
