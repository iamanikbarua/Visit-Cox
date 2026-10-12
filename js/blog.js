/**
 * ============================================================================
 * Visit Cox's Bazar - Interactive Travel Blog & Community Publishing System (blog.js)
 * ============================================================================
 * Powers both:
 *   1. The dedicated standalone Blog Page (blog.html)
 *   2. The integrated Blog Preview & Publisher Section on index.html (#blog-section)
 *
 * Features:
 *   - Write & Publish new blog posts with Title, Category, Author, Read Time, Tags & Story
 *   - Choose Cover Image from 9 Cox's Bazar Photo Presets, Upload from Device, or Paste Image URL
 *   - Edit / Update or Delete any blog post with instant localStorage persistence
 *   - Category Filtering, Live Keyword Search, Helpful Like/Clap Counter, and Full Article Reader Modal
 */

const BLOG_STORAGE_KEY = 'visit_cox_blog_posts_v1';

const BLOG_CATEGORIES = [
  { id: 'ALL', icon: '🌊', en: 'All Stories', bn: 'সব ব্লগ পোস্ট' },
  { id: 'Adventure & Routes', icon: '🏍️', en: 'Adventure & Routes', bn: 'অ্যাডভেঞ্চার ও রুট' },
  { id: 'Food & Seafood', icon: '🍛', en: 'Food & Seafood', bn: 'খাবার ও সি-ফুড' },
  { id: 'Island Hopping', icon: '🏝️', en: 'Island Hopping', bn: 'দ্বীপ ভ্রমণ' },
  { id: 'Local Tips & Safety', icon: '💡', en: 'Local Tips & Safety', bn: 'টিপস ও নিরাপত্তা' },
  { id: 'Hotel & Stay Guide', icon: '🏨', en: 'Hotel & Stay Guide', bn: 'হোটেল ও আবাসন' }
];

const BLOG_PHOTO_PRESETS = [
  { label: 'Inani Coral Beach', url: 'assets/images/inani-beach.jpg' },
  { label: 'Himchari Hills & Sea', url: 'assets/images/himchari.jpg' },
  { label: 'Moheshkhali Island', url: 'assets/images/moheshkhali.jpg' },
  { label: 'Ramu 100ft Buddha', url: 'assets/images/ramu-buddha.jpg' },
  { label: 'Shamlapur Sampan Sunset', url: 'assets/images/shamlapur-sampan.jpg' },
  { label: 'Sonadia Island Camping', url: 'assets/images/sonadia-island.jpg' },
  { label: 'Hotel Sea Crown Beachfront', url: 'assets/images/hotel-sea-crown.jpg' },
  { label: 'Kolatoli Eco Park Hills', url: 'assets/images/kolatoli-eco.jpg' },
  { label: 'Najirartek Dried Fish Hub', url: 'assets/images/najirartek-shutki.jpg' }
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
• Fare: 80 to 100 BDT per passenger each way.
• Duration: ~30–35 minutes across scenic mangrove channels and the Moheshkhali channel. Life jackets are provided on board.
• What to See on the Island: Hire a local island Tomtom (~150–200 BDT reserved) to visit the historic Adinath Shiva Temple atop Mainak Hill, the Rakhine Buddhist Pagodas, betel-leaf hills, and coastal salt pans.

3. Sonadia Ecological Island:
• Famous for red ghost crabs, pine forests, and winter beach camping. Best visited between November and February when the sea channel is calm and dry.`,
      bn: `মূল সৈকতের কোলাহল ছেড়ে নির্জন দ্বীপ, প্যারাবন ও পাহাড়ি মন্দির দেখতে চাইলে মহেশখালী ও সোনাদিয়া দ্বীপ সেরা গন্তব্য।

১. কীভাবে যাবেন (কস্তুরাঘাট / ৬ নং ঘাট):
• কলাতলী বা লাবণী থেকে টমটমে করে শহরের কস্তুরাঘাট বা ৬ নং ঘাটে যান (ভাড়া ২০-৩০ টাকা)।
• সেখান থেকে জনপ্রতি মাত্র ৮০-১০০ টাকা ভাড়ায় স্পিডবোটে ৩৫ মিনিটে মহেশখালী দ্বীপে পৌঁছানো যায়।

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
      en: 'Avoid overpaying and stay safe: standard Tomtom fares (10–20 BDT), green vs. red lifeguard flags, hotel zone comparison, and 24/7 emergency numbers.',
      bn: 'নিরাপদ ও সাশ্রয়ী ভ্রমণের জন্য জেনে নিন টমটমের নির্ধারিত ভাড়া (১০-২০ টাকা), সৈকতের লাল-সবুজ পতাকার নিয়ম এবং জরুরি ট্যুরিস্ট পুলিশ নাম্বার।'
    },
    content: {
      en: `Planning your first trip to Cox's Bazar? Keep these verified local tips in mind to save money and travel safely:

1. Know Which Beach Zone Fits Your Style:
• Sugandha Beach: Best for beachfront stays (like Hotel Sea Crown), evening seafood stalls, and water sports.
• Laboni Beach: Closest to town, Burmese handicraft markets, and family hotels with pools (like Hotel Kollol).
• Kalatali & Eco Park: Best for budget-friendly hill-view hotels (Prime Park Hotel, White Orchid, Nisanah Resort) and quick access to Marine Drive.

2. Never Overpay for Local Rides:
• Shared Tomtoms between Kalatali, Sugandha, and Laboni cost only 10 to 20 BDT per person!
• For reserved CNGs (to Himchari: 300–400 BDT; to Ramu: 400–500 BDT) or Chander Gari jeeps (to Inani: 1,500–2,000 BDT), always agree on the round-trip fare and waiting time before boarding.

3. Beach Swimming Safety & Emergency Contacts:
• Swim ONLY between Green Flags watched by CIPRB Sea Safe Lifeguards. Never enter the water near Red Flags or after sunset.
• Keep Tourist Police Cox's Bazar (+880 1320-160000 / +880 1320-158995) and National Emergency (999) saved on your phone.`,
      bn: `প্রথমবার কক্সবাজার ভ্রমণে গেলে নিচের প্রামাণ্য টিপসগুলো আপনার খরচ বাঁচাবে এবং ভ্রমণকে নিরাপদ রাখবে:

১. কোন জোনে হোটেল নেবেন?
• সুগন্ধা পয়েন্ট: সরাসরি সৈকত সংলগ্ন হোটেল (যেমন: হোটেল সী ক্রাউন) ও ফিশ ফ্রাই মার্কেটের জন্য সেরা।
• লাবণী পয়েন্ট: বার্মিজ মার্কেট ও সুইমিং পুলসহ ফ্যামিলি হোটেলের (যেমন: হোটেল কল্লোল) জন্য আদর্শ।
• কলাতলী ও ইকো পার্ক: সাশ্রয়ী বাজেটে ভালো হোটেল (প্রাইম পার্ক, হোয়াইট অর্কিড, নিসানাহ রিসোর্ট) ও মেরিন ড্রাইভের প্রবেশমুখ।

২. সৈকতের নিরাপত্তা ও জরুরি নাম্বার:
• সমুদ্রে গোসলের সময় শুধুমাত্র সি-সেফ লাইফগার্ডদের সবুজ পতাকা চিহ্নিত স্থানে নামুন। লাল পতাকা থাকলে কখনোই পানিতে নামবেন না।
• যেকোনো প্রয়োজনে ট্যুরিস্ট পুলিশ (+880 1320-160000) বা জাতীয় জরুরি সেবা ৯৯৯-এ কল করুন।`
    }
  }
];

const BlogState = {
  posts: [],
  activeCategory: 'ALL',
  searchQuery: '',
  editingPostId: null,
  readingPostId: null,
  selectedImagePreset: 'assets/images/inani-beach.jpg',
  uploadedImageDataUrl: ''
};

/* --------------------------------------------------------------------------
 * 1. LOAD & SAVE BLOG POSTS TO LOCALSTORAGE
 * -------------------------------------------------------------------------- */
function loadBlogPosts() {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        BlogState.posts = parsed;
        return;
      }
    }
  } catch (err) {
    console.warn('Could not load saved blog posts:', err);
  }
  BlogState.posts = JSON.parse(JSON.stringify(DEFAULT_BLOG_POSTS));
}

function saveBlogPosts() {
  try {
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(BlogState.posts));
  } catch (err) {
    console.error('Failed to save blog posts to localStorage:', err);
  }
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
      ? 'Read insider tips on Marine Drive routes, authentic seafood spots, and island hopping — or write and publish your own blog post to share information with fellow travelers!'
      : 'কক্সবাজারের ভ্রমণ অভিজ্ঞতা, খাবার ও রুট গাইড পড়ুন অথবা নিজের ভ্রমণ কাহিনী ও ছবি পোস্ট করে সবার সাথে শেয়ার করুন!'
  );
  setTxt('blog-write-btn-text', lang === 'en' ? 'Write & Publish Blog Post' : 'নতুন ব্লগ পোস্ট লিখুন');
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
          ${lang === 'en' ? 'Try clearing your search or publish a new blog post!' : 'সব ক্যাটাগরি দেখুন অথবা নতুন একটি ব্লগ পোস্ট লিখুন!'}
        </p>
        <div class="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onclick="BlogState.activeCategory='ALL'; BlogState.searchQuery=''; renderBlogSection();"
            class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
          >
            ${lang === 'en' ? 'Show All Posts' : 'সব পোস্ট দেখুন'}
          </button>
          <button
            type="button"
            onclick="openBlogEditorModal(null)"
            class="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-extrabold transition cursor-pointer"
          >
            ✍️ ${lang === 'en' ? 'Write New Post' : 'নতুন পোস্ট লিখুন'}
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
                class="card-img w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

              <span class="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-400 text-slate-950 shadow">
                ${catMeta.icon} ${catMeta[lang]}
              </span>

              <!-- Quick Edit / Delete Controls on Card -->
              <div class="absolute top-3.5 right-3.5 flex items-center gap-1.5">
                <button
                  type="button"
                  onclick="event.stopPropagation(); openBlogEditorModal('${post.id}')"
                  title="${lang === 'en' ? 'Edit Post' : 'সম্পাদনা করুন'}"
                  class="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-sky-600 text-white text-[11px] font-bold backdrop-blur-sm transition cursor-pointer"
                >
                  ✎ ${lang === 'en' ? 'Edit' : 'এডিট'}
                </button>
                <button
                  type="button"
                  onclick="event.stopPropagation(); deleteBlogPost('${post.id}')"
                  title="${lang === 'en' ? 'Delete Post' : 'মুছে ফেলুন'}"
                  class="px-2 py-1 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white text-[11px] font-bold backdrop-blur-sm transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

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
            onclick="closeBlogReaderModal(); openBlogEditorModal('${post.id}');"
            class="px-4 py-2 rounded-xl bg-slate-100 hover:bg-sky-100 text-slate-800 font-bold text-xs transition cursor-pointer"
          >
            ✎ ${lang === 'en' ? 'Edit Post' : 'এডিট করুন'}
          </button>
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
  saveBlogPosts();
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

/* --------------------------------------------------------------------------
 * 4. WRITE / EDIT / DELETE BLOG POST MODAL
 * -------------------------------------------------------------------------- */
function openBlogEditorModal(postId) {
  BlogState.editingPostId = postId || null;
  const modal = document.getElementById('blog-editor-modal');
  if (!modal) return;

  const lang = getBlogLang();
  const existing = postId ? BlogState.posts.find(p => p.id === postId) : null;

  const modalTitle = document.getElementById('blog-editor-modal-title');
  if (modalTitle) {
    modalTitle.textContent = existing
      ? lang === 'en'
        ? '✎ Edit Blog Post'
        : '✎ ব্লগ পোস্ট সম্পাদনা করুন'
      : lang === 'en'
      ? '✍️ Write & Publish a Cox’s Bazar Blog Post'
      : '✍️ নতুন কক্সবাজার ব্লগ পোস্ট লিখুন ও প্রকাশ করুন';
  }

  const titleInput = document.getElementById('blog-form-title');
  const authorInput = document.getElementById('blog-form-author');
  const categorySelect = document.getElementById('blog-form-category');
  const readTimeInput = document.getElementById('blog-form-readtime');
  const imageInput = document.getElementById('blog-form-image');
  const tagsInput = document.getElementById('blog-form-tags');
  const summaryInput = document.getElementById('blog-form-summary');
  const contentInput = document.getElementById('blog-form-content');

  if (titleInput) titleInput.value = existing ? getLocalizedField(existing.title, lang) : '';
  if (authorInput) authorInput.value = existing ? existing.author || 'Anik Barua' : 'Anik Barua';
  if (categorySelect) categorySelect.value = existing ? existing.category : 'Adventure & Routes';
  if (readTimeInput) readTimeInput.value = existing ? existing.readTime || '3 min read' : '3 min read';
  if (imageInput) imageInput.value = existing ? existing.image || 'assets/images/inani-beach.jpg' : 'assets/images/inani-beach.jpg';
  if (tagsInput) tagsInput.value = existing && Array.isArray(existing.tags) ? existing.tags.join(', ') : 'Coxs Bazar, Travel Guide, Local Tips';
  if (summaryInput) summaryInput.value = existing ? getLocalizedField(existing.summary, lang) : '';
  if (contentInput) contentInput.value = existing ? getLocalizedField(existing.content, lang) : '';

  renderBlogImagePresets(imageInput ? imageInput.value : 'assets/images/inani-beach.jpg');

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  setTimeout(() => titleInput?.focus(), 100);
}

function closeBlogEditorModal() {
  const modal = document.getElementById('blog-editor-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function renderBlogImagePresets(activeUrl) {
  const container = document.getElementById('blog-image-presets');
  if (!container) return;

  container.innerHTML = BLOG_PHOTO_PRESETS.map(preset => {
    const isSelected = preset.url === activeUrl;
    return `
      <button
        type="button"
        onclick="selectBlogPresetImage('${preset.url}')"
        class="p-1.5 rounded-xl border-2 flex items-center gap-2 text-left transition cursor-pointer ${
          isSelected
            ? 'bg-sky-950 text-white border-amber-400 shadow-xs'
            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-300'
        }"
      >
        <img src="${preset.url}" alt="${preset.label}" class="w-8 h-8 rounded-lg object-cover shrink-0 bg-slate-200" />
        <span class="text-[11px] font-bold truncate">${preset.label}</span>
      </button>
    `;
  }).join('');
}

function selectBlogPresetImage(url) {
  const imageInput = document.getElementById('blog-form-image');
  if (imageInput) imageInput.value = url;
  renderBlogImagePresets(url);
}

function handleBlogImageFileUpload(event) {
  const file = event.target?.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target?.result;
    if (typeof dataUrl === 'string') {
      const imageInput = document.getElementById('blog-form-image');
      if (imageInput) imageInput.value = dataUrl;
      renderBlogImagePresets('');
      showBlogToast('Cover photo uploaded from your device!');
    }
  };
  reader.readAsDataURL(file);
}

function handleSaveBlogPostSubmit(event) {
  if (event) event.preventDefault();
  const lang = getBlogLang();

  const titleVal = (document.getElementById('blog-form-title')?.value || '').trim();
  const authorVal = (document.getElementById('blog-form-author')?.value || 'Anik Barua').trim();
  const categoryVal = document.getElementById('blog-form-category')?.value || 'Adventure & Routes';
  const readTimeVal = (document.getElementById('blog-form-readtime')?.value || '3 min read').trim();
  const imageVal = (document.getElementById('blog-form-image')?.value || 'assets/images/inani-beach.jpg').trim();
  const tagsRaw = (document.getElementById('blog-form-tags')?.value || '').trim();
  const summaryVal = (document.getElementById('blog-form-summary')?.value || '').trim();
  const contentVal = (document.getElementById('blog-form-content')?.value || '').trim();

  if (!titleVal || !contentVal) {
    showBlogToast(
      lang === 'en'
        ? 'Please enter both a Blog Title and your Story Content!'
        : 'অনুগ্রহ করে ব্লগের শিরোনাম এবং মূল লেখা দিন!'
    );
    return;
  }

  const autoSummary =
    summaryVal ||
    contentVal
      .replace(/\s+/g, ' ')
      .slice(0, 160)
      .trim() + (contentVal.length > 160 ? '...' : '');

  const tagsList = tagsRaw
    ? tagsRaw
        .split(',')
        .map(t => t.trim().replace(/^#/, ''))
        .filter(Boolean)
    : ['Coxs Bazar', 'Travel Guide'];

  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  if (BlogState.editingPostId) {
    const idx = BlogState.posts.findIndex(p => p.id === BlogState.editingPostId);
    if (idx >= 0) {
      const existing = BlogState.posts[idx];
      BlogState.posts[idx] = {
        ...existing,
        title: { en: titleVal, bn: titleVal },
        author: authorVal,
        category: categoryVal,
        readTime: readTimeVal,
        image: imageVal,
        tags: tagsList,
        summary: { en: autoSummary, bn: autoSummary },
        content: { en: contentVal, bn: contentVal }
      };
    }
    showBlogToast(lang === 'en' ? 'Blog post updated!' : 'ব্লগ পোস্ট আপডেট হয়েছে!');
  } else {
    const newPost = {
      id: `blog-${Date.now()}`,
      title: { en: titleVal, bn: titleVal },
      author: authorVal,
      date: formattedDate,
      readTime: readTimeVal,
      category: categoryVal,
      image: imageVal,
      likes: 1,
      tags: tagsList,
      summary: { en: autoSummary, bn: autoSummary },
      content: { en: contentVal, bn: contentVal }
    };
    BlogState.posts.unshift(newPost);
    BlogState.activeCategory = 'ALL';
    showBlogToast(
      lang === 'en'
        ? '🎉 Your blog post is now published and live!'
        : '🎉 আপনার নতুন ব্লগ পোস্ট সফলভাবে প্রকাশিত হয়েছে!'
    );
  }

  saveBlogPosts();
  closeBlogEditorModal();
  renderBlogSection();
}

function deleteBlogPost(postId) {
  const lang = getBlogLang();
  const confirmMsg =
    lang === 'en'
      ? 'Are you sure you want to delete this blog post?'
      : 'আপনি কি নিশ্চিতভাবে এই ব্লগ পোস্টটি মুছে ফেলতে চান?';
  if (!confirm(confirmMsg)) return;

  BlogState.posts = BlogState.posts.filter(p => p.id !== postId);
  saveBlogPosts();
  renderBlogSection();
  showBlogToast(lang === 'en' ? 'Blog post deleted.' : 'ব্লগ পোস্ট মুছে ফেলা হয়েছে।');
}

function resetDefaultBlogs() {
  BlogState.posts = JSON.parse(JSON.stringify(DEFAULT_BLOG_POSTS));
  saveBlogPosts();
  renderBlogSection();
  showBlogToast('Restored default Cox’s Bazar blog posts!');
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
 * 5. ENSURE READER & EDITOR MODALS EXIST IN DOM & INITIALIZE
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

  if (!document.getElementById('blog-editor-modal')) {
    const editorModal = document.createElement('div');
    editorModal.id = 'blog-editor-modal';
    editorModal.className =
      'hidden fixed inset-0 z-[88] bg-slate-950/80 backdrop-blur-sm items-center justify-center p-3 sm:p-6';
    editorModal.innerHTML = `
      <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-ocean-950 via-ocean-900 to-teal-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block">
              COX’S BAZAR COMMUNITY & INSIDER BLOG
            </span>
            <h3 id="blog-editor-modal-title" class="text-lg font-extrabold">
              ✍️ Write & Publish a Cox’s Bazar Blog Post
            </h3>
          </div>
          <button
            type="button"
            onclick="closeBlogEditorModal()"
            class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- Modal Form Body -->
        <form onsubmit="handleSaveBlogPostSubmit(event)" class="p-6 overflow-y-auto flex-1 space-y-4">
          <div>
            <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1">
              Blog Post Title *
            </label>
            <input
              id="blog-form-title"
              type="text"
              required
              placeholder="e.g., My 3-Day Marine Drive Bike & Inani Coral Beach Guide"
              class="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                Category
              </label>
              <select
                id="blog-form-category"
                class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Adventure & Routes">🏍️ Adventure & Routes</option>
                <option value="Food & Seafood">🍛 Food & Seafood</option>
                <option value="Island Hopping">🏝️ Island Hopping</option>
                <option value="Local Tips & Safety">💡 Local Tips & Safety</option>
                <option value="Hotel & Stay Guide">🏨 Hotel & Stay Guide</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                Author Name
              </label>
              <input
                id="blog-form-author"
                type="text"
                value="Anik Barua"
                placeholder="Your Name"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1">
                Read Time
              </label>
              <input
                id="blog-form-readtime"
                type="text"
                value="3 min read"
                placeholder="e.g. 4 min read"
                class="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <!-- Cover Photo Picker (Presets + Upload from Device + Custom URL) -->
          <div class="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600">
                🖼️ Choose Cover Photo (Pick Preset, Upload, or Paste URL)
              </label>
              <label class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-extrabold cursor-pointer transition">
                <span>📤 Upload Photo</span>
                <input type="file" accept="image/*" onchange="handleBlogImageFileUpload(event)" class="hidden" />
              </label>
            </div>

            <div id="blog-image-presets" class="grid grid-cols-2 sm:grid-cols-3 gap-1.5"></div>

            <input
              id="blog-form-image"
              type="text"
              value="assets/images/inani-beach.jpg"
              placeholder="Or paste an image URL..."
              class="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1">
              Short Summary / Intro (Optional — Auto-generated if left blank)
            </label>
            <input
              id="blog-form-summary"
              type="text"
              placeholder="Brief 1-2 sentence teaser shown on the blog card..."
              class="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1">
              Full Blog Story / Information *
            </label>
            <textarea
              id="blog-form-content"
              rows="7"
              required
              placeholder="Write your full Cox's Bazar travel guide, experience, hotel review, or local tips here..."
              class="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1">
              Tags (Comma separated)
            </label>
            <input
              id="blog-form-tags"
              type="text"
              value="Coxs Bazar, Travel Guide, Local Tips"
              placeholder="e.g. Marine Drive, Inani, Seafood, Budget"
              class="w-full px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div class="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onclick="closeBlogEditorModal()"
              class="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md transition cursor-pointer"
            >
              🚀 Publish Blog Post
            </button>
          </div>
        </form>
      </div>
    `;
    editorModal.addEventListener('click', e => {
      if (e.target === editorModal) closeBlogEditorModal();
    });
    document.body.appendChild(editorModal);
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
  } else if (window.location.hash === '#write-blog') {
    setTimeout(() => openBlogEditorModal(null), 250);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlogModule);
} else {
  initBlogModule();
}
