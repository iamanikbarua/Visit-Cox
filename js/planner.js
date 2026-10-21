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

// Planner and itinerary-page strings. Static elements carry data-pt="key"; {name} is filled by pt().
const PLANNER_TEXT = {
  en: {
    crumb_home: "Home", crumb_page: "Trip Planner",
    hero_kicker: "Trip planner (2, 3 & 5 days)",
    hero_title: "Plan your trip.",
    hero_lead: "Build a day-by-day plan with an estimated budget for stay, food, transport and activities. Prices are approximate; check them locally. Save the plan as an image or print it.",
    wiz_title: "Plan my trip in three questions",
    wiz_sub: "Days and group • Travel vibe • Stay style",
    step1: "Duration & group", step2: "Travel vibe", step3: "Stay & plan",
    q_days: "1. Trip duration",
    d2: "2 Days", d2_sub: "Weekend", d3: "3 Days", d3_sub: "Classic", d5: "5 Days", d5_sub: "Coast & island",
    q_who: "2. Who are you traveling with?",
    who_solo: "Solo", who_couple: "Couple", who_family: "Family", who_friends: "Friends (6)",
    next_persona: "Next: choose your travel vibe",
    persona_title: "Choose your travel vibe",
    arc_wave_hunter: "The Wave Hunter", arc_wave_hunter_desc: "Parasailing, jet ski & the Marine Drive.", arc_wave_hunter_tag: "Adventure",
    arc_quiet_coral: "Quiet Coral", arc_quiet_coral_desc: "Quiet Inani beach, low-tide walk & cafes.", arc_quiet_coral_tag: "Calm",
    arc_foodie_hunter: "Seafood Foodie", arc_foodie_hunter_desc: "Seafood, shutki bhorta & night BBQ.", arc_foodie_hunter_tag: "Seafood",
    arc_family_leader: "Family Leader", arc_family_leader_desc: "Shallow beaches, aquarium & an easy pace.", arc_family_leader_tag: "Family",
    arc_ocean_romance: "Ocean Romance", arc_ocean_romance_desc: "Sea-view room, sunsets & a beach dinner.", arc_ocean_romance_tag: "Couples",
    back_step1: "← Back to duration & group", next_budget: "Next: stay style",
    stay_title: "Select your stay style",
    stay_comfort: "3-4★ Beachfront comfort", stay_comfort_sub: "Hotel Sea Crown / Prime Park (sea-view AC)",
    stay_luxury: "5★ Beach resort", stay_luxury_sub: "Sayeman Beach Resort / Royal Tulip",
    stay_budget: "Economy AC", stay_budget_sub: "Guest house near Dolphin Mor",
    from_night: "from ৳{n}/night",
    trip_name_label: "Trip name (optional)",
    trip_name_hint: "Printed on your phone wallpaper and itinerary pass.",
    trip_default: "My Coastal Journey",
    reveal: "Show my itinerary & budget ➔",
    back_persona: "← Back to travel vibe",
    wiz_note: "Prices are estimates",
    planner_kicker: "Route & budget planner",
    planner_title: "Adjust your plan",
    planner_lead: "Choose your trip details. The planner suggests a hotel, food and transport, and adds up an estimated budget.",
    season_label: "Season multiplier", season_std: "Standard season (1.0x)",
    p_days: "1. Trip duration", custom_days: "Custom days:",
    days_label: "{n} Days ({kind})", kind_weekend: "Weekend", kind_classic: "Classic", kind_extended: "Extended",
    p_group: "2. Travellers & group", adults_label: "Adults (12+)", kids_label: "Kids (under 12)",
    travelers: "{a} Adults", travelers_kids: "{a} Adults, {k} Kids",
    rooms_label: "Rooms needed:", room_1: "1 Room", rooms_n: "{n} Rooms", vehicle_label: "Vehicle:",
    veh_cng: "Reserved CNG", veh_chander_gari: "Chander Gari (open jeep)",
    p_tier: "3. Budget tier", quality_label: "Food & stay:",
    tier_backpacker: "Economy", tier_comfort: "Comfort", tier_luxury: "5★ Luxury",
    tierdesc_backpacker: "Budget guest house + local rice stalls",
    tierdesc_comfort: "AC hotel + seafood restaurants",
    tierdesc_luxury: "5★ resort + resort dining",
    p_hub: "4. Preferred stay area",
    hub_any: "Any area", hub_kolatoli: "🌊 Kolatoli / Sugandha (busy beachfront, food stalls)",
    hub_inani: "🪸 Marine Drive / Inani (quiet beach, resorts)", hub_laboni: "🌅 Laboni Point (old beach & Burmese market)",
    hub_note: "Staying near the places you visit cuts transport costs.",
    p_hotel: "5. Hotel category",
    ht_auto: "Match my budget tier", ht_34star: "3-4★ sea-view hotel (Sea Crown, Prime Park)",
    ht_5star: "5★ beach resort (Sayeman, Royal Tulip)", ht_eco: "Eco cottage (Mermaid Eco Resort)",
    ht_budget: "Economy guest house (Kolatoli Dolphin Mor)",
    hotel_note: "The nightly rate feeds into the estimated budget.",
    p_name: "6. Trip name (printed on the pass)", p_name_hint: "Printed on your downloadable itinerary pass.",
    p_vibe: "7. Choose your trip vibe",
    vibe_relaxing: "Relaxing", vibe_relaxing_sub: "Beach time & breeze",
    vibe_adventure: "Adventure", vibe_adventure_sub: "Parasailing & jet ski",
    vibe_romantic: "Romantic", vibe_romantic_sub: "Couples & sunsets",
    vibe_family: "Family", vibe_family_sub: "Easy beaches & aquarium",
    vibe_foodie: "Seafood Tour", vibe_foodie_sub: "BBQ & bhorta",
    vibe_culture: "Culture", vibe_culture_sub: "Moheshkhali & pagodas",
    persona_lead: "We pick activities, a route and a beach area to match.",
    stay_popular: "Popular",
    edit_choices: "✏️ Edit choices",
    acts_kicker: "Optional activities",
    acts_title: "Customise your activities",
    acts_lead: "Tick an activity to add it to your plan and to the estimated budget.",
    act_marine_drive: "Marine Drive (80 km) open ride",
    act_inani_coral: "Inani coral beach walk",
    act_parasailing: "Beach parasailing",
    act_jetski: "Jet ski (10 min ride)",
    act_moheshkhali: "Moheshkhali speedboat & Adinath Temple",
    act_fish_world: "Radiant Fish World aquarium",
    act_himchari_hill: "Himchari National Park viewpoint (waterfall in monsoon only)",
    act_night_bbq: "Sugandha fresh-fish BBQ dinner",
    p_acts: "8. Optional activities (changes the budget)", acts_note: "Updates the total",
    budget_kicker: "Estimated budget",
    approx: "estimate, as of Oct 2026",
    per_person: "Per person:", duration_label: "Duration:", party_label: "Party:",
    days_nights: "{d} Days / {n} Nights", days_short: "{d} Days",
    guest_1: "1 Guest", guests_n: "{n} Guests",
    cost_stay: "🏨 Stay", cost_food: "🍽️ Dining", cost_transit: "🛺 Transport", cost_act: "🎟️ Activities",
    btn_pass: "Itinerary pass", btn_phone: "📱 Wallpaper", whatsapp: "💬 WhatsApp",
    busy_pass: "Making pass...", busy_phone: "Making wallpaper...",
    export_no_lib: "The image export library did not load (offline or blocked).",
    export_failed: "The image export failed.",
    export_print: "Print this page (or save it as PDF) instead?",
    rec_hotel: "Suggested stay", tier_badge: "{t} tier", est_rate: "Est. rate:", per_night: "৳{n} / night",
    swap_hotel: "🔄 Swap hotel",
    rec_dining: "Suggested food", dining_badge: "Local food", est_meals: "Est. meals:", per_person_day: "৳{n} / person / day",
    swap_dining: "🔄 Swap food",
    day_of: "Day {d} of {n}",
    fare_title: "Usual fares for these routes",
    fare_lead: "Know the usual fare before you bargain, and agree it before you get in.",
    driver_card: "🛺 Driver card",
    fare_tip: "{mode} • {dur}",
    pass_brand: "Visit Cox • Itinerary pass",
    pass_budget: "Est. total budget", pass_base: "Base area", pass_hotel: "Stay", pass_transit: "Transport", pass_vibe: "Vibe",
    base_inani: "Inani / Marine Drive", base_laboni: "Laboni Point", base_kolatoli: "Kolatoli",
    estimates: "Prices are estimates, as of Oct 2026",
    phone_brand: "Visit Cox • Trip pass",
    phone_stay: "Stay",
    day_tag: "DAY {d}",
    wa_title: "*🌊 Visit Cox — Trip inquiry*",
    wa_hello: "Hello! I planned this trip on the Visit Cox planner and would like to check hotel availability and rates.",
    wa_summary: "📋 *Trip summary:*", wa_name: "Trip name", wa_duration: "Duration", wa_travelers: "Travellers",
    wa_style: "Style", wa_hotel: "Hotel", wa_budget: "Estimated budget", wa_acts: "🎯 *Activities:*",
    wa_close: "Please confirm room availability, rates and transport. Thank you!"
  },
  bn: {
    crumb_home: "হোম", crumb_page: "ট্রিপ প্ল্যানার",
    hero_kicker: "ট্রিপ প্ল্যানার (২, ৩ ও ৫ দিন)",
    hero_title: "আপনার ভ্রমণ সাজান।",
    hero_lead: "থাকা, খাওয়া, যাতায়াত ও অ্যাক্টিভিটির আনুমানিক খরচসহ দিনভিত্তিক পরিকল্পনা তৈরি করুন। দাম আনুমানিক; স্থানীয়ভাবে যাচাই করে নিন। পরিকল্পনাটি ছবি হিসেবে সেভ বা প্রিন্ট করতে পারবেন।",
    wiz_title: "তিনটি প্রশ্নে ভ্রমণ সাজান",
    wiz_sub: "দিন ও দল • ভ্রমণের ধরন • থাকার ধরন",
    step1: "মেয়াদ ও দল", step2: "ভ্রমণের ধরন", step3: "থাকা ও পরিকল্পনা",
    q_days: "১. ভ্রমণের মেয়াদ",
    d2: "২ দিন", d2_sub: "সাপ্তাহিক ছুটি", d3: "৩ দিন", d3_sub: "সাধারণ", d5: "৫ দিন", d5_sub: "সৈকত ও দ্বীপ",
    q_who: "২. কার সাথে যাচ্ছেন?",
    who_solo: "একা", who_couple: "দম্পতি", who_family: "পরিবার", who_friends: "বন্ধুরা (৬ জন)",
    next_persona: "পরের ধাপ: ভ্রমণের ধরন",
    persona_title: "আপনার ভ্রমণের ধরন বেছে নিন",
    arc_wave_hunter: "ঢেউপ্রেমী", arc_wave_hunter_desc: "প্যারাসেইলিং, জেট স্কি ও মেরিন ড্রাইভ।", arc_wave_hunter_tag: "রোমাঞ্চ",
    arc_quiet_coral: "নিরিবিলি প্রবাল", arc_quiet_coral_desc: "শান্ত ইনানী সৈকত, ভাটায় হাঁটা ও ক্যাফে।", arc_quiet_coral_tag: "শান্ত",
    arc_foodie_hunter: "ভর্তা-প্রেমী", arc_foodie_hunter_desc: "সামুদ্রিক মাছ, শুঁটকি ভর্তা ও রাতের বারবিকিউ।", arc_foodie_hunter_tag: "সামুদ্রিক খাবার",
    arc_family_leader: "পরিবার নিয়ে", arc_family_leader_desc: "অগভীর সৈকত, অ্যাকুয়ারিয়াম ও ধীরেসুস্থে ঘোরা।", arc_family_leader_tag: "পরিবার",
    arc_ocean_romance: "সমুদ্র ও রোমান্স", arc_ocean_romance_desc: "সমুদ্রমুখী রুম, সূর্যাস্ত ও সৈকতে রাতের খাবার।", arc_ocean_romance_tag: "দম্পতি",
    back_step1: "← মেয়াদ ও দলে ফিরুন", next_budget: "পরের ধাপ: থাকার ধরন",
    stay_title: "থাকার ধরন বেছে নিন",
    stay_comfort: "৩-৪★ সৈকতের পাশে আরামদায়ক", stay_comfort_sub: "হোটেল সি ক্রাউন / প্রাইম পার্ক (সমুদ্রমুখী এসি)",
    stay_luxury: "৫★ বিচ রিসোর্ট", stay_luxury_sub: "সায়মন বিচ রিসোর্ট / রয়্যাল টিউলিপ",
    stay_budget: "সাশ্রয়ী এসি", stay_budget_sub: "ডলফিন মোড়ের কাছে গেস্ট হাউস",
    from_night: "প্রতি রাত ৳{n} থেকে",
    trip_name_label: "ভ্রমণের নাম (ঐচ্ছিক)",
    trip_name_hint: "ফোন ওয়ালপেপার ও ভ্রমণ পাসে ছাপা হবে।",
    trip_default: "আমার সৈকত ভ্রমণ",
    reveal: "আমার ভ্রমণসূচি ও বাজেট দেখুন ➔",
    back_persona: "← ভ্রমণের ধরনে ফিরুন",
    wiz_note: "দাম আনুমানিক",
    planner_kicker: "রুট ও বাজেট প্ল্যানার",
    planner_title: "পরিকল্পনা ঠিক করুন",
    planner_lead: "ভ্রমণের তথ্য বেছে নিন। প্ল্যানার হোটেল, খাবার ও যাতায়াতের পরামর্শ দেয় এবং আনুমানিক বাজেট হিসাব করে।",
    season_label: "মৌসুম গুণক", season_std: "সাধারণ মৌসুম (১.০x)",
    p_days: "১. ভ্রমণের মেয়াদ", custom_days: "নিজের মতো দিন:",
    days_label: "{n} দিন ({kind})", kind_weekend: "সাপ্তাহিক ছুটি", kind_classic: "সাধারণ", kind_extended: "দীর্ঘ",
    p_group: "২. ভ্রমণকারী ও দল", adults_label: "প্রাপ্তবয়স্ক (১২+)", kids_label: "শিশু (১২-এর কম)",
    travelers: "{a} জন প্রাপ্তবয়স্ক", travelers_kids: "{a} জন প্রাপ্তবয়স্ক, {k} শিশু",
    rooms_label: "রুম লাগবে:", room_1: "১টি রুম", rooms_n: "{n}টি রুম", vehicle_label: "গাড়ি:",
    veh_cng: "রিজার্ভ সিএনজি", veh_chander_gari: "চান্দের গাড়ি (খোলা জিপ)",
    p_tier: "৩. বাজেটের স্তর", quality_label: "খাবার ও থাকা:",
    tier_backpacker: "সাশ্রয়ী", tier_comfort: "আরামদায়ক", tier_luxury: "৫★ বিলাসবহুল",
    tierdesc_backpacker: "সাশ্রয়ী গেস্ট হাউস + স্থানীয় ভাতের হোটেল",
    tierdesc_comfort: "এসি হোটেল + সামুদ্রিক খাবারের রেস্তোরাঁ",
    tierdesc_luxury: "৫★ রিসোর্ট + রিসোর্টের রেস্তোরাঁ",
    p_hub: "৪. কোন এলাকায় থাকতে চান",
    hub_any: "যেকোনো এলাকা", hub_kolatoli: "🌊 কলাতলী / সুগন্ধা (ব্যস্ত সৈকত, খাবারের দোকান)",
    hub_inani: "🪸 মেরিন ড্রাইভ / ইনানী (নিরিবিলি সৈকত, রিসোর্ট)", hub_laboni: "🌅 লাবণী পয়েন্ট (পুরোনো সৈকত ও বার্মিজ মার্কেট)",
    hub_note: "যেখানে ঘুরবেন তার কাছে থাকলে যাতায়াত খরচ কমে।",
    p_hotel: "৫. হোটেলের ধরন",
    ht_auto: "বাজেট স্তর অনুযায়ী", ht_34star: "৩-৪★ সমুদ্রমুখী হোটেল (সি ক্রাউন, প্রাইম পার্ক)",
    ht_5star: "৫★ বিচ রিসোর্ট (সায়মন, রয়্যাল টিউলিপ)", ht_eco: "ইকো কটেজ (মারমেইড ইকো রিসোর্ট)",
    ht_budget: "সাশ্রয়ী গেস্ট হাউস (কলাতলী ডলফিন মোড়)",
    hotel_note: "প্রতি রাতের ভাড়া আনুমানিক বাজেটে যোগ হয়।",
    p_name: "৬. ভ্রমণের নাম (পাসে ছাপা হবে)", p_name_hint: "ডাউনলোড করা ভ্রমণ পাসে ছাপা হবে।",
    p_vibe: "৭. ভ্রমণের মেজাজ বেছে নিন",
    vibe_relaxing: "বিশ্রাম", vibe_relaxing_sub: "সৈকতে সময় ও হাওয়া",
    vibe_adventure: "রোমাঞ্চ", vibe_adventure_sub: "প্যারাসেইলিং ও জেট স্কি",
    vibe_romantic: "রোমান্টিক", vibe_romantic_sub: "দম্পতি ও সূর্যাস্ত",
    vibe_family: "পরিবার", vibe_family_sub: "সহজ সৈকত ও অ্যাকুয়ারিয়াম",
    vibe_foodie: "সামুদ্রিক খাবার", vibe_foodie_sub: "বারবিকিউ ও ভর্তা",
    vibe_culture: "সংস্কৃতি", vibe_culture_sub: "মহেশখালী ও প্যাগোডা",
    persona_lead: "মিল রেখে অ্যাক্টিভিটি, রুট ও সৈকত এলাকা বেছে দেওয়া হবে।",
    stay_popular: "জনপ্রিয়",
    edit_choices: "✏️ পছন্দ বদলান",
    acts_kicker: "ঐচ্ছিক অ্যাক্টিভিটি",
    acts_title: "অ্যাক্টিভিটি বেছে নিন",
    acts_lead: "কোনো অ্যাক্টিভিটিতে টিক দিলে তা পরিকল্পনা ও আনুমানিক বাজেটে যোগ হবে।",
    act_marine_drive: "মেরিন ড্রাইভ (৮০ কিমি) ভ্রমণ",
    act_inani_coral: "ইনানী প্রবাল সৈকতে হাঁটা",
    act_parasailing: "সৈকতে প্যারাসেইলিং",
    act_jetski: "জেট স্কি (১০ মিনিট)",
    act_moheshkhali: "মহেশখালী স্পিডবোট ও আদিনাথ মন্দির",
    act_fish_world: "রেডিয়েন্ট ফিশ ওয়ার্ল্ড অ্যাকুয়ারিয়াম",
    act_himchari_hill: "হিমছড়ি জাতীয় উদ্যান ভিউপয়েন্ট (ঝরনা শুধু বর্ষায়)",
    act_night_bbq: "সুগন্ধা সৈকতে তাজা মাছের বারবিকিউ",
    p_acts: "৮. ঐচ্ছিক অ্যাক্টিভিটি (বাজেট বদলায়)", acts_note: "মোট খরচ বদলায়",
    budget_kicker: "আনুমানিক বাজেট",
    approx: "আনুমানিক, অক্টোবর ২০২৬ অনুযায়ী",
    per_person: "জনপ্রতি:", duration_label: "মেয়াদ:", party_label: "দল:",
    days_nights: "{d} দিন / {n} রাত", days_short: "{d} দিন",
    guest_1: "১ জন অতিথি", guests_n: "{n} জন অতিথি",
    cost_stay: "🏨 থাকা", cost_food: "🍽️ খাবার", cost_transit: "🛺 যাতায়াত", cost_act: "🎟️ অ্যাক্টিভিটি",
    btn_pass: "ভ্রমণ পাস", btn_phone: "📱 ওয়ালপেপার", whatsapp: "💬 হোয়াটসঅ্যাপ",
    busy_pass: "পাস তৈরি হচ্ছে...", busy_phone: "ওয়ালপেপার তৈরি হচ্ছে...",
    export_no_lib: "ছবি তৈরির লাইব্রেরি লোড হয়নি (অফলাইন বা ব্লক করা)।",
    export_failed: "ছবি তৈরি করা যায়নি।",
    export_print: "এর বদলে পেজটি প্রিন্ট করবেন (বা PDF হিসেবে সেভ করবেন)?",
    rec_hotel: "প্রস্তাবিত থাকার জায়গা", tier_badge: "{t} স্তর", est_rate: "আনুমানিক ভাড়া:", per_night: "প্রতি রাত ৳{n}",
    swap_hotel: "🔄 অন্য হোটেল",
    rec_dining: "প্রস্তাবিত খাবার", dining_badge: "স্থানীয় খাবার", est_meals: "আনুমানিক খাবার খরচ:", per_person_day: "জনপ্রতি দিনে ৳{n}",
    swap_dining: "🔄 অন্য খাবার",
    day_of: "{n} দিনের মধ্যে {d}তম দিন",
    fare_title: "এই রুটগুলোর সাধারণ ভাড়া",
    fare_lead: "দরদাম করার আগে সাধারণ ভাড়া জেনে নিন, আর ওঠার আগেই ভাড়া ঠিক করুন।",
    driver_card: "🛺 চালক কার্ড",
    fare_tip: "{mode} • {dur}",
    pass_brand: "Visit Cox • ভ্রমণ পাস",
    pass_budget: "আনুমানিক মোট বাজেট", pass_base: "যে এলাকায় থাকবেন", pass_hotel: "থাকা", pass_transit: "যাতায়াত", pass_vibe: "মেজাজ",
    base_inani: "ইনানী / মেরিন ড্রাইভ", base_laboni: "লাবণী পয়েন্ট", base_kolatoli: "কলাতলী",
    estimates: "দাম আনুমানিক, অক্টোবর ২০২৬ অনুযায়ী",
    phone_brand: "Visit Cox • ভ্রমণ পাস",
    phone_stay: "থাকা",
    day_tag: "দিন {d}",
    wa_title: "*🌊 Visit Cox — ভ্রমণ সংক্রান্ত জিজ্ঞাসা*",
    wa_hello: "আসসালামু আলাইকুম! আমি Visit Cox প্ল্যানারে এই ভ্রমণটি সাজিয়েছি। হোটেলের রুম খালি আছে কি না এবং ভাড়া জানতে চাই।",
    wa_summary: "📋 *ভ্রমণের সারাংশ:*", wa_name: "ভ্রমণের নাম", wa_duration: "মেয়াদ", wa_travelers: "ভ্রমণকারী",
    wa_style: "ধরন", wa_hotel: "হোটেল", wa_budget: "আনুমানিক বাজেট", wa_acts: "🎯 *অ্যাক্টিভিটি:*",
    wa_close: "অনুগ্রহ করে রুম, ভাড়া ও যাতায়াতের ব্যবস্থা নিশ্চিত করুন। ধন্যবাদ!"
  }
};

function plannerLang() {
  return typeof AppState !== 'undefined' && AppState.lang === 'bn' ? 'bn' : 'en';
}

// Bangla digits via the bn-BD locale; English keeps en-IN grouping (1,00,000).
function plannerNum(n) {
  return Number(n).toLocaleString(plannerLang() === 'bn' ? 'bn-BD' : 'en-IN');
}

// pt('days_nights', {d: 3, n: 2}): numbers are formatted for the current language.
function pt(key, vars) {
  const lang = plannerLang();
  const s = PLANNER_TEXT[lang][key] != null ? PLANNER_TEXT[lang][key] : PLANNER_TEXT.en[key];
  return String(s).replace(/\{(\w+)\}/g, (m, k) => (vars && k in vars ? (typeof vars[k] === 'number' ? plannerNum(vars[k]) : vars[k]) : m));
}

// Catalog and schedule copy: obj.bn[key] in বাংলা mode, else the English field.
function pl(obj, key) {
  return (plannerLang() === 'bn' && obj.bn && obj.bn[key]) || obj[key];
}

// "04:30 PM" -> "বিকেল ৪:৩০" in বাংলা mode; English is shown as written.
function slotTime(t) {
  const m = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(t);
  if (plannerLang() !== 'bn' || !m) return t;
  const h = Number(m[1]) % 12 + (m[3] === 'PM' ? 12 : 0);
  const part = h < 12 ? 'সকাল' : h < 15 ? 'দুপুর' : h < 18 ? 'বিকেল' : h < 19 ? 'সন্ধ্যা' : 'রাত';
  return `${part} ${plannerNum(h % 12 || 12)}:${m[2].replace(/\d/g, plannerNum)}`;
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
      location: "Marine Drive, Kolatoli Beach",
      why: "Premier beachfront 5-star with infinity pool overlooking the Bay of Bengal and private lounge.",
      bn: {"name": "সায়মন বিচ রিসোর্ট", "location": "মেরিন ড্রাইভ, কলাতলী সৈকত", "why": "বঙ্গোপসাগরমুখী ইনফিনিটি পুল ও প্রাইভেট লাউঞ্জসহ সৈকতঘেঁষা প্রথম সারির ৫-তারকা রিসোর্ট।"},
      amenities: ["Ocean View Balcony", "Infinity Pool", "Buffet Breakfast", "Private Beach Access"]
    },
    {
      id: "royal_tulip",
      name: "Royal Tulip Sea Pearl Beach Resort",
      tier: "luxury",
      hub: "inani",
      stars: 5,
      location: "Jaliapalong, Inani Beach",
      why: "Massive ultra-luxury beachfront escape with private water park, 5 specialty restaurants, and secluded coral sands.",
      bn: {"name": "রয়্যাল টিউলিপ সি পার্ল বিচ রিসোর্ট", "location": "জালিয়াপালং, ইনানী সৈকত", "why": "নিজস্ব ওয়াটার পার্ক, ৫টি বিশেষ রেস্তোরাঁ ও নিরিবিলি প্রবাল-বালুর সৈকতসহ বিশাল অতি-বিলাসবহুল সৈকত রিসোর্ট।"},
      amenities: ["Water Park", "Private Beach", "Spa & Wellness", "Kids Zone"]
    },
    {
      id: "mermaid_beach",
      name: "Mermaid Beach Resort",
      tier: "luxury",
      hub: "inani",
      stars: 5,
      location: "Pechardwip, Marine Drive",
      why: "Iconic organic boutique beach villas nestled directly where lush hills meet pristine waves.",
      bn: {"name": "মারমেইড বিচ রিসোর্ট", "location": "পেঁচারদ্বীপ, মেরিন ড্রাইভ", "why": "সবুজ পাহাড় যেখানে নির্মল ঢেউয়ের সঙ্গে মিশেছে, ঠিক সেখানে পরিচিত অর্গানিক বুটিক বিচ ভিলা।"},
      amenities: ["Private Beach Villas", "Artisanal Organic Dining", "Kayaking", "Sunset Lounge"]
    },
    {
      id: "sea_crown",
      name: "Hotel Sea Crown",
      tier: "comfort",
      hub: "kolatoli",
      stars: 3,
      location: "Kolatoli Beach Front",
      why: "Best-value true seafront hotel. Step right out onto the sands without crossing roads.",
      bn: {"name": "হোটেল সি ক্রাউন", "location": "কলাতলী সৈকতের সামনে", "why": "দামের তুলনায় সেরা, একেবারে সমুদ্রের সামনের হোটেল। রাস্তা পার না হয়েই সরাসরি বালুতে নামা যায়।"},
      amenities: ["Direct Beachfront", "Sea View AC Rooms", "Beachside Cafe", "24/7 Security"]
    },
    {
      id: "prime_park",
      name: "Hotel Prime Park",
      tier: "comfort",
      hub: "kolatoli",
      stars: 3,
      location: "Kolatoli Central",
      why: "Highly rated modern comfort hotel with spotless AC deluxe suites and excellent service.",
      bn: {"name": "হোটেল প্রাইম পার্ক", "location": "কলাতলী কেন্দ্র", "why": "ঝকঝকে এসি ডিলাক্স স্যুট ও চমৎকার সেবাসহ উচ্চ রেটিংয়ের আধুনিক আরামদায়ক হোটেল।"},
      amenities: ["AC Deluxe Suites", "Rooftop Restaurant", "Free High-Speed WiFi"]
    },
    {
      id: "ocean_paradise",
      name: "The Ocean Paradise Hotel & Resort",
      tier: "comfort",
      hub: "kolatoli",
      stars: 4,
      location: "Main Road, Kolatoli",
      why: "Renowned 4-star hospitality with swimming pool, multiple banquet halls, and panoramic views.",
      bn: {"name": "দ্য ওশান প্যারাডাইস হোটেল অ্যান্ড রিসোর্ট", "location": "মেইন রোড, কলাতলী", "why": "সুইমিং পুল, একাধিক ব্যাংকুয়েট হল ও প্যানোরামিক দৃশ্যসহ পরিচিত ৪-তারকা হোটেল।"},
      amenities: ["Swimming Pool", "Rooftop BBQ", "Gym & Spa"]
    },
    {
      id: "mermaid_eco",
      name: "Mermaid Eco Resort",
      tier: "comfort",
      hub: "inani",
      stars: 3,
      location: "Pechardwip, Marine Drive",
      why: "Tranquil bamboo bungalows surrounded by canals, lotus ponds, and organic gardens.",
      bn: {"name": "মারমেইড ইকো রিসোর্ট", "location": "পেঁচারদ্বীপ, মেরিন ড্রাইভ", "why": "খাল, পদ্মপুকুর ও অর্গানিক বাগানে ঘেরা শান্ত বাঁশের বাংলো।"},
      amenities: ["Eco Bamboo Cottages", "Canal Boat Rides", "Organic Farm Food"]
    },
    {
      id: "kolatoli_guesthouse",
      name: "Hotel Coastal Peace / Blue Ocean",
      tier: "backpacker",
      hub: "kolatoli",
      stars: 2,
      location: "Kolatoli Dolphin Mor 2nd Line",
      why: "Clean, reliable budget AC guest house within 4 minutes walking distance to the sea.",
      bn: {"name": "হোটেল কোস্টাল পিস / ব্লু ওশান", "location": "কলাতলী ডলফিন মোড়, দ্বিতীয় লাইন", "why": "সমুদ্র থেকে হেঁটে ৪ মিনিটের মধ্যে পরিচ্ছন্ন, নির্ভরযোগ্য সাশ্রয়ী এসি গেস্ট হাউস।"},
      amenities: ["Clean Attached Bath", "AC Available", "24hr Power Backup"]
    },
    {
      id: "laboni_guest",
      name: "Hotel Laboni Vista",
      tier: "backpacker",
      hub: "laboni",
      stars: 2,
      location: "Old Laboni Point Road",
      why: "Affordable base right next to the historic beach and Rakhine weaving shops.",
      bn: {"name": "হোটেল লাবণী ভিস্তা", "location": "পুরোনো লাবণী পয়েন্ট রোড", "why": "ঐতিহাসিক সৈকত ও রাখাইন তাঁতের দোকানের ঠিক পাশে সাশ্রয়ী থাকার জায়গা।"},
      amenities: ["Attached Bath", "Walking Distance to Beach & Markets"]
    }
  ],

  dining: [
    {
      id: "poushee_feast",
      name: "Poushee Restaurant & Jhaubon",
      tier: "comfort",
      cuisine: "Authentic Bengali & Seafood",
      location: "Hotel Motel Zone & Kolatoli",
      why: "Legendary 12-item shutki and vegetable bhorta platter, fresh crispy Loitta fry, and Coral fish curry.",
      bn: {"name": "পৌষী রেস্তোরাঁ ও ঝাউবন", "cuisine": "খাঁটি বাঙালি ও সামুদ্রিক খাবার", "location": "হোটেল-মোটেল জোন ও কলাতলী", "why": "বিখ্যাত ১২ পদের শুঁটকি ও সবজি ভর্তার প্ল্যাটার, তাজা মচমচে লইট্টা ফ্রাই ও কোরাল মাছের তরকারি।"},
      highlights: ["Loitta Fry", "Chitol Macher Muitha", "12 Bhorta Platter"]
    },
    {
      id: "sugandha_bbq",
      name: "Sugandha Live Fish Night BBQ",
      tier: "comfort",
      cuisine: "Live Charcoal Grilled Fish",
      location: "Sugandha Beach Point",
      why: "Pick your own live fresh catch (Rupchanda, Koral, Crab, Tiger Prawn) grilled on open charcoal embers.",
      bn: {"name": "সুগন্ধা লাইভ ফিশ নাইট বারবিকিউ", "cuisine": "কয়লায় গ্রিল করা জ্যান্ত মাছ", "location": "সুগন্ধা বিচ পয়েন্ট", "why": "নিজের পছন্দের তাজা মাছ (রূপচাঁদা, কোরাল, কাঁকড়া, বাগদা চিংড়ি) বেছে নিন; খোলা কয়লার আগুনে গ্রিল করা হয়।"},
      highlights: ["Charcoal Rupchanda", "Spicy Crab Fry", "Garlic Butter Squid"]
    },
    {
      id: "mermaid_cafe",
      name: "Mermaid Beach Cafe & Tarboosh",
      tier: "luxury",
      cuisine: "Gourmet Oceanfront & Artisanal Italian",
      location: "Marine Drive & Pechardwip",
      why: "Romantic sea-breeze dining with wood-fired sourdough pizza, grilled whole lobster, and fresh tender coconuts.",
      bn: {"name": "মারমেইড বিচ ক্যাফে ও তারবুশ", "cuisine": "সমুদ্রমুখী গুরমে ও হাতে তৈরি ইতালীয় খাবার", "location": "মেরিন ড্রাইভ ও পেঁচারদ্বীপ", "why": "সমুদ্রের হাওয়ায় রোমান্টিক খাবার: কাঠের চুলায় সাওয়ারডো পিৎজা, আস্ত গ্রিলড লবস্টার ও তাজা কচি ডাব।"},
      highlights: ["Wood-fired Seafood Pizza", "Grilled Sea Lobster", "Sunset Cocktails"]
    },
    {
      id: "local_bhorta_dhaba",
      name: "Niribili & Central Rice Stalls",
      tier: "backpacker",
      cuisine: "Everyday Traditional Bengali",
      location: "Dolphin Mor & Main Road",
      why: "Delicious steaming hot rice with dal, shutki bhorta, and local fish curry at rock-bottom local prices.",
      bn: {"name": "নিরিবিলি ও সেন্ট্রাল ভাতের দোকান", "cuisine": "প্রতিদিনের ঐতিহ্যবাহী বাঙালি খাবার", "location": "ডলফিন মোড় ও মেইন রোড", "why": "স্থানীয় সবচেয়ে কম দামে গরম ভাতের সঙ্গে ডাল, শুঁটকি ভর্তা ও স্থানীয় মাছের তরকারি।"},
      highlights: ["Shutki Bhorta", "Machher Jhol", "Dal & Rice"]
    }
  ],

  activities: [
    {
      id: "marine_drive",
      name: "Scenic Marine Drive 80km Open Safari",
      duration: "Half Day",
      vibe: ["relaxing", "adventure", "romantic"],
      desc: "Long coastal road with the sea on one side and green hills on the other."
    },
    {
      id: "inani_coral",
      name: "Inani Coral Beach & Sea Glass Walk",
      duration: "2-3 Hours",
      vibe: ["relaxing", "romantic", "family"],
      desc: "Walk among ancient golden-black coral stones exposed at low tide, free from coastal noise."
    },
    {
      id: "parasailing",
      name: "Beachfront Ocean Parasailing",
      duration: "1 Hour",
      vibe: ["adventure"],
      desc: "Tandem flight above the beach. Check the harness and ask about safety gear before paying."
    },
    {
      id: "jetski",
      name: "Jet Ski Wave Bashing (10 Min Ride)",
      duration: "15 min",
      vibe: ["adventure"],
      desc: "Power through sea swells at high speed with an experienced safety instructor."
    },
    {
      id: "moheshkhali",
      name: "Moheshkhali Island Speedboat & Adinath Temple",
      duration: "Half Day",
      vibe: ["culture", "adventure", "family"],
      desc: "Thrilling speedboat sea-crossing from 6-No. Ghat, exploring the ancient hilltop Hindu shrine and Buddhist pagodas."
    },
    {
      id: "fish_world",
      name: "Radiant Fish World Marine Aquarium",
      duration: "2 Hours",
      vibe: ["family", "culture"],
      desc: "Marine aquarium with a walk-through tunnel."
    },
    {
      id: "himchari_hill",
      name: "Himchari National Park Viewpoint (waterfall in monsoon only)",
      duration: "2 Hours",
      vibe: ["relaxing", "family", "adventure"],
      desc: "Climb the hilltop stairs for an aerial panorama of the infinite coastline and visit seasonal cascades."
    },
    {
      id: "night_bbq",
      name: "Sugandha Live Fish BBQ Dinner Feast",
      duration: "Evening",
      vibe: ["foodie", "relaxing", "romantic"],
      desc: "Tasting freshly caught red snapper, pomfret, and giant prawns grilled under beach lights."
    }
  ]
};

// Prices live in PRICE_BOOK (js/data.js); the catalog keeps names and copy only.
["hotels", "dining", "activities"].forEach(g => PLANNER_CATALOG[g].forEach(x => Object.assign(x, PRICE_BOOK[g][x.id])));
PLANNER_CATALOG.vehicles = PRICE_BOOK.vehicles;


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
  const hotelName = state.selectedHotel ? pl(state.selectedHotel, "name") : "-";
  const totalBDT = state.calculatedBudget?.totalBDT || 0;
  const travelerName = state.travelerName || pt("trip_default");
  const travelers = children > 0 ? pt("travelers_kids", { a: adults, k: children }) : pt("travelers", { a: adults });

  let message = `${pt("wa_title")}\n\n`;
  message += `${pt("wa_hello")}\n\n`;
  message += `${pt("wa_summary")}\n`;
  message += `• *${pt("wa_name")}:* ${travelerName}\n`;
  message += `• *${pt("wa_duration")}:* ${pt("days_nights", { d: days, n: nights })}\n`;
  message += `• *${pt("wa_travelers")}:* ${travelers}\n`;
  message += `• *${pt("wa_style")}:* ${pt("vibe_" + vibe)} (${pt("tier_badge", { t: pt("tier_" + budgetTier) })})\n`;
  message += `• *${pt("wa_hotel")}:* ${hotelName}\n`;
  message += `• *${pt("wa_budget")}:* ৳${plannerNum(totalBDT)} (${pt("approx")})\n\n`;

  if (state.selectedActivities && state.selectedActivities.length > 0) {
    message += `${pt("wa_acts")}\n`;
    state.selectedActivities.forEach(act => {
      const a = PLANNER_CATALOG.activities.find(x => x.id === act);
      message += `• ${a ? pt("act_" + a.id) : act}\n`;
    });
    message += `\n`;
  }

  message += pt("wa_close");

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
      travelerName: "", // empty = pt("trip_default") in the current language
      selectedActivities: ["marine_drive", "inani_coral", "himchari_hill"],
      hotelIndex: 0,
      diningIndex: 0,
      exchangeRate: 120,
      seasonMultiplier: 1.0
    };
  }
  const state = defaultState();
  let initialised = false;

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
    const name = PLANNER_TEXT.en["veh_" + best.v.key];
    const vehicle = best.count > 1 ? `${best.count} × ${name}` : name;
    const totalTransit = best.count * best.v.dailyBDT * days + PRICE_BOOK.transfers.totalBDT;
    return { vehicle, vehicleKey: best.v.key, vehicles: best.count, totalTransit };
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
      vehicleKey: transitInfo.vehicleKey,
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

  // Fixed day-by-day schedule (same for every season)
  function generateSchedule() {
    const days = state.days;
    const schedule = [];

    const dayBlueprints = [
      {
        dayNum: 1,
        title: "Coastal Arrival & Sugandha Sunset Fish BBQ",
        bn: {"title": "কক্সবাজারে পৌঁছানো, সুগন্ধায় সূর্যাস্ত ও মাছের বারবিকিউ", "theme": "পৌঁছানো, সমুদ্রমুখী হোটেলে চেক-ইন ও সন্ধ্যার খাবারের দোকান"},
        theme: "Arrival, Oceanfront Check-in & Evening Food Stalls",
        items: [
          { 
            time: "09:00 AM", 
            act: "Arrival in Cox's Bazar & Smooth Hotel Check-in", bn: {"act": "কক্সবাজারে পৌঁছানো ও হোটেলে চেক-ইন", "tip": "ডাবের পানি খেয়ে বিশ্রাম নিন, ব্যাগ গুছিয়ে নিন।", "badge": "🌅 পৌঁছানো"}, 
            tip: "Relax and unpack with refreshing green coconut.",
            badge: "🌅 Fresh Arrival"
          },
          { 
            time: "01:00 PM", 
            act: "Seafood Lunch Feast at Poushee / Local Dhaba", bn: {"act": "পৌষী / স্থানীয় খাবারের হোটেলে সামুদ্রিক খাবারে দুপুরের খাবার", "tip": "বিখ্যাত মচমচে লইট্টা ফ্রাই ও ১০ রকমের শুঁটকি ভর্তা চেখে দেখুন।", "badge": "🍤 খাঁটি স্বাদ"}, 
            tip: "Try legendary crispy Loitta fry and 10 types of shutki bhorta.",
            badge: "🍤 Authentic Taste"
          },
          { 
            time: "04:30 PM", 
            act: "Sugandha Beach Golden Hour Walk & Sunset", bn: {"act": "সুগন্ধা সৈকতে বিকেলের হাঁটা ও সূর্যাস্ত", "tip": "বিচ চেয়ার ভাড়া নিয়ে সূর্যাস্ত দেখুন (আগে ঘণ্টাপ্রতি ভাড়া ঠিক করে নিন)।", "badge": "🌅 সূর্যাস্ত"}, 
            tip: "Rent a beach chair and watch the sunset (agree the hourly rate first).",
            badge: "🌅 Sunset"
          },
          { 
            time: "07:30 PM", 
            act: "Sugandha Live Fish BBQ Dinner", bn: {"act": "সুগন্ধায় তাজা মাছের বারবিকিউ ডিনার", "tip": "জ্যান্ত রূপচাঁদা বা কোরাল মাছ বেছে নিন; খোলা কয়লার আগুনে গ্রিল করা হয়।", "badge": "🎣 সন্ধ্যার তাজা মাছ"}, 
            tip: "Pick live Rupchanda or Coral fish grilled over open charcoal embers.",
            badge: "🎣 Fresh Evening Catch"
          }
        ]
      },
      {
        dayNum: 2,
        title: "Scenic Marine Drive, Himchari & Inani Coral Safari",
        bn: {"title": "মেরিন ড্রাইভ, হিমছড়ি ও ইনানী প্রবাল সৈকত ভ্রমণ", "theme": "৮০ কিমি উপকূলীয় সড়ক, পাহাড় ও সমুদ্রের মিলন, প্রবাল পাথর"},
        theme: "The 80km Coastal Highway, Hills Meet Sea & Coral Reefs",
        items: [
          { 
            time: "08:30 AM", 
            act: "Open Chander Gari / CNG Ride down Scenic Marine Drive", bn: {"act": "খোলা চাঁদের গাড়ি / সিএনজিতে মেরিন ড্রাইভ ভ্রমণ", "tip": "উপকূলীয় সড়ক: এক পাশে সমুদ্র, অন্য পাশে পাহাড়।", "badge": "🚗 ৮০ কিমি উপকূলীয় সড়ক"}, 
            tip: "Coastal road with the sea on one side and hills on the other.",
            badge: "🚗 80km Coastal Highway"
          },
          { 
            time: "10:00 AM", 
            act: "Himchari National Park Viewpoint (waterfall in monsoon only)", bn: {"act": "হিমছড়ি জাতীয় উদ্যান ভিউপয়েন্ট (ঝরনা শুধু বর্ষায়)", "tip": "পাহাড়ের সিঁড়ি বেয়ে উঠে ওপর থেকে লম্বা উপকূলরেখা দেখুন।", "badge": "🌿 পাহাড় ও সমুদ্র"}, 
            tip: "Climb the hill stairs for an infinite aerial vista of the coastline.",
            badge: "🌿 Hill meets Sea"
          },
          { 
            time: "01:00 PM", 
            act: "Inani Coral Beach Exploration & Beachfront Lunch", bn: {"act": "ইনানী প্রবাল সৈকত ঘোরা ও সৈকতের পাশে দুপুরের খাবার", "tip": "ভাটার সময় প্রাচীন সোনালি-কালো প্রবাল পাথরের মাঝে হাঁটুন। ছবি তোলার দারুণ জায়গা!", "badge": "🪨 ভাটায় সবচেয়ে ভালো"}, 
            tip: "Walk among ancient golden-black coral stones at low tide. Great photo spot!",
            badge: "🪨 Best at low tide"
          },
          { 
            time: "04:00 PM", 
            act: "Darianagar Sea Waves & Beachfront Parasailing", bn: {"act": "দরিয়ানগরের ঢেউ ও সৈকতে প্যারাসেইলিং", "tip": "রোমাঞ্চপ্রেমীদের জন্য বঙ্গোপসাগরের ৩০০ ফুট ওপরে টেন্ডেম ফ্লাইট।", "badge": "🪂 রোমাঞ্চ"}, 
            tip: "Tandem flights 300 feet above the Bay of Bengal for adrenaline seekers.",
            badge: "🪂 High Adrenaline"
          },
          { 
            time: "06:30 PM", 
            act: "Twilight Refreshments at Mermaid Beach Cafe", bn: {"act": "মারমেইড বিচ ক্যাফেতে গোধূলির নাশতা", "tip": "তাজা কচি ডাব, কাঠের চুলায় সি-ফুড পিৎজা ও শান্ত সমুদ্রের হাওয়া।", "badge": "☕ গোধূলির ক্যাফে"}, 
            tip: "Fresh tender coconuts, wood-fired seafood pizza, and quiet ocean breeze.",
            badge: "☕ Twilight Cafe"
          }
        ]
      },
      {
        dayNum: 3,
        title: "Offshore Island Cruise or Heritage Pagodas",
        bn: {"title": "দ্বীপে নৌভ্রমণ বা ঐতিহ্যবাহী প্যাগোডা", "theme": "মহেশখালী স্পিডবোট ভ্রমণ ও রাখাইন মার্কেট"},
        theme: "Moheshkhali Speedboat Expedition & Rakhine Markets",
        items: [
          { 
            time: "08:30 AM", 
            act: "Tomtom to 6 No. Ghat & speedboat crossing", bn: {"act": "টমটমে ৬ নম্বর ঘাট, তারপর স্পিডবোটে পারাপার", "tip": "স্পিডবোটে অল্প সময়ের পারাপার; লাইফ জ্যাকেট পরুন।", "badge": "🚤 সকালের শান্ত সমুদ্র"}, 
            tip: "Short speedboat crossing; wear a life jacket.",
            badge: "🚤 Calm Morning Sea"
          },
          { 
            time: "10:00 AM", 
            act: "Adinath Ancient Hilltop Temple & Golden Pagoda", bn: {"act": "পাহাড়চূড়ার প্রাচীন আদিনাথ মন্দির ও স্বর্ণ প্যাগোডা", "tip": "শত শত বছরের পুরোনো ঐতিহাসিক মন্দির, চারপাশে ম্যানগ্রোভ খালের দৃশ্য।", "badge": "🏛️ প্রাচীন ঐতিহ্য"}, 
            tip: "Centuries-old historic shrine with panoramic mangrove channel views.",
            badge: "🏛️ Ancient Heritage"
          },
          { 
            time: "01:30 PM", 
            act: "Return to Town & Traditional Bengali Lunch", bn: {"act": "শহরে ফেরা ও বাঙালি দুপুরের খাবার", "tip": "তাজা রূপচাঁদা মাছের তরকারি আর গরম ভাত খান।", "badge": "🍤 উপকূলের ভোজ"}, 
            tip: "Savor fresh pomfret curry and steaming hot rice.",
            badge: "🍤 Coastal Feast"
          },
          { 
            time: "04:30 PM", 
            act: "Barmis (Burmese) Market Souvenir Shopping", bn: {"act": "বার্মিজ মার্কেটে স্মারক কেনাকাটা", "tip": "রাখাইন তাঁতের কাপড়, শুঁটকি, মুক্তা ও হাতে বানানো আচার।", "badge": "🛍️ স্থানীয় তাঁত"}, 
            tip: "Handloom Rakhine fabrics, dry fish (shutki), pearls, and handmade pickles.",
            badge: "🛍️ Local Handloom"
          }
        ]
      },
      {
        dayNum: 4,
        title: "Patuartek Secret Coral Point & Rubber Garden Safari",
        bn: {"title": "পাটুয়ারটেকের নিরিবিলি প্রবাল পয়েন্ট ও রাবার বাগান ভ্রমণ", "theme": "অচেনা সুন্দর জায়গা ও সাংস্কৃতিক অঞ্চল"},
        theme: "Hidden Gems & Cultural Hinterland",
        items: [
          { time: "09:00 AM", act: "Southern Marine Drive Drive to Patuartek Beach", bn: {"act": "মেরিন ড্রাইভ ধরে দক্ষিণে পাটুয়ারটেক সৈকতে", "tip": "অক্ষত পাথুরে তীর, ফিরোজা রঙের ঢেউ।", "badge": "🌊 নিরিবিলি সৈকত"}, tip: "Untouched rocky shoreline with dramatic turquoise waves.", badge: "🌊 Secret Beach" },
          { time: "01:00 PM", act: "Fresh Coconut & Coastal Lunch at Inani", bn: {"act": "ইনানীতে ডাব ও উপকূলীয় দুপুরের খাবার", "tip": "দোল খাওয়া সুপারি ও ঝাউ গাছের ছায়ায় বিশ্রাম নিন।", "badge": "🥥 গাছের ছায়া"}, tip: "Relax under swaying betel nut and casuarina palm groves.", badge: "🥥 Palm Groves" },
          { time: "03:30 PM", act: "Ramu 100-Foot Reclining Buddha & Ancient Pagodas", bn: {"act": "রামুর ১০০ ফুট শায়িত বুদ্ধমূর্তি ও প্রাচীন প্যাগোডা", "tip": "এই অঞ্চলের শান্ত বৌদ্ধ ঐতিহ্য দেখুন।", "badge": "🏛️ স্বর্ণ বিহার"}, tip: "Discover the peaceful Buddhist heritage of the region.", badge: "🏛️ Golden Vihara" }
        ]
      },
      {
        dayNum: 5,
        title: "Radiant Fish World Aquarium & Farewell Sunset",
        bn: {"title": "রেডিয়েন্ট ফিশ ওয়ার্ল্ড অ্যাকুয়ারিয়াম ও বিদায়ী সূর্যাস্ত", "theme": "সামুদ্রিক প্রাণীর জগৎ ও ধীরেসুস্থে বিদায়"},
        theme: "Marine Life Wonder & Relaxed Departure",
        items: [
          { time: "09:30 AM", act: "Radiant Fish World Marine Tunnel Aquarium", bn: {"act": "রেডিয়েন্ট ফিশ ওয়ার্ল্ড টানেল অ্যাকুয়ারিয়াম", "tip": "হেঁটে পার হওয়া যায় এমন অ্যাকুয়ারিয়াম টানেল; বাচ্চাদের জন্য ভালো।", "badge": "🐠 সামুদ্রিক প্রাণী"}, tip: "Walk-through aquarium tunnel; good for kids.", badge: "🐠 Marine Life" },
          { time: "12:30 PM", act: "Farewell Feast at Jhaubon Restaurant", bn: {"act": "ঝাউবন রেস্তোরাঁয় বিদায়ী ভোজ", "tip": "শেষবারের মতো কক্সবাজারের খাঁটি সামুদ্রিক খাবার।", "badge": "🍤 বিদায়ী দুপুরের খাবার"}, tip: "Last savoring of authentic Cox's Bazar seafood delicacies.", badge: "🍤 Farewell Lunch" },
          { time: "03:30 PM", act: "Final Sunset Stroll at Laboni Beach", bn: {"act": "লাবণী সৈকতে শেষ সূর্যাস্তের হাঁটা", "tip": "ফেরার আগে ঝিনুকের কারুপণ্য কিনুন ও দলের সঙ্গে স্মরণীয় ছবি তুলুন।", "badge": "🌅 বিদায়ী সূর্যাস্ত"}, tip: "Pick up shell crafts and take memorable group portraits before departure.", badge: "🌅 Farewell Sunset" }
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
          bn: { title: `দিন ${plannerNum(i + 1)}: নিজের মতো উপকূল ঘোরা ও অবসর`, theme: "সৈকতে অবসর, স্থানীয় কারুপণ্য ও তাজা উপকূলীয় খাবার" },
          items: [
            { time: "09:00 AM", act: "Morning Beach Jog & Sunrise Swim", bn: {"act": "সকালে সৈকতে জগিং ও সূর্যোদয়ের সময় সাঁতার", "tip": "ডলফিন / সুগন্ধা পয়েন্টে সকালের শান্ত ঢেউ।", "badge": "🌊 সকালের ঢেউ"}, tip: "Gentle morning waves at Dolphin / Sugandha point.", badge: "🌊 Morning Waves" },
            { time: "01:00 PM", act: "Local Flavor Tasting & Seafood Lunch", bn: {"act": "স্থানীয় স্বাদ ও সামুদ্রিক খাবারে দুপুরের খাবার", "tip": "মেইন রোডের কাছে খাবারের গলিগুলো ঘুরে দেখুন।", "badge": "🍤 স্থানীয় স্বাদ"}, tip: "Explore hidden food alleys near Main Road.", badge: "🍤 Local Flavors" },
            { time: "05:00 PM", act: "Sunset Photography & Souvenir Shopping", bn: {"act": "সূর্যাস্তের ছবি তোলা ও স্মারক কেনাকাটা", "tip": "সূর্যাস্তের রং ক্যামেরায় ধরে রাখুন।", "badge": "🌅 সূর্যাস্তের আলো"}, tip: "Capture breathtaking sunset hues.", badge: "🌅 Sunset Glow" }
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

    // The removed parameter form used param-*-label; the wizard shows the same text in its feedback chips.
    const daysText = pt("days_label", { n: state.days, kind: pt(state.days === 2 ? "kind_weekend" : state.days === 3 ? "kind_classic" : "kind_extended") });
    const travelersText = state.kids > 0 ? pt("travelers_kids", { a: state.adults, k: state.kids }) : pt("travelers", { a: state.adults });
    ["param-days-label", "wizard-duration-feedback"].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = daysText; });
    ["param-travelers-label", "wizard-group-feedback"].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = travelersText; });

    const customDaysVal = document.getElementById("planner-custom-days-val");
    if (customDaysVal) customDaysVal.textContent = plannerNum(state.days);

    const adultsVal = document.getElementById("planner-adults-val");
    if (adultsVal) adultsVal.textContent = plannerNum(state.adults);

    const kidsVal = document.getElementById("planner-kids-val");
    if (kidsVal) kidsVal.textContent = plannerNum(state.kids);

    const roomsCount = document.getElementById("planner-rooms-count");
    if (roomsCount) roomsCount.textContent = budget.rooms === 1 ? pt("room_1") : pt("rooms_n", { n: budget.rooms });

    const vehicleTag = document.getElementById("planner-vehicle-tag");
    if (vehicleTag) vehicleTag.textContent = vehicleText(budget);

    const tierLabel = document.getElementById("param-budget-tier-label");
    if (tierLabel) tierLabel.textContent = pt("tier_" + state.budgetTier);
    const tierDesc = document.getElementById("planner-tier-desc");
    if (tierDesc) tierDesc.textContent = pt("tierdesc_" + state.budgetTier);

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
    if (totalDisp) totalDisp.textContent = `৳${plannerNum(budget.totalBDT)} BDT`;

    const usdDisp = document.getElementById("budget-display-usd");
    if (usdDisp) usdDisp.textContent = `(~$${plannerNum(budget.totalUSD)} USD)`;

    const ppDisp = document.getElementById("budget-display-per-person");
    if (ppDisp) ppDisp.textContent = `৳${plannerNum(budget.perPersonBDT)}`;

    const durationTag = document.getElementById("budget-display-duration-tag");
    if (durationTag) durationTag.textContent = pt("days_nights", { d: state.days, n: Math.max(1, state.days - 1) });

    const partyTag = document.getElementById("budget-display-party-tag");
    if (partyTag) partyTag.textContent = guestsText();

    const costHotel = document.getElementById("item-cost-hotel");
    if (costHotel) costHotel.textContent = `৳${plannerNum(budget.totalHotel)}`;

    const costFood = document.getElementById("item-cost-food");
    if (costFood) costFood.textContent = `৳${plannerNum(budget.totalFood)}`;

    const costTransit = document.getElementById("item-cost-transit");
    if (costTransit) costTransit.textContent = `৳${plannerNum(budget.totalTransit)}`;

    const costAct = document.getElementById("item-cost-activities");
    if (costAct) costAct.textContent = `৳${plannerNum(budget.totalActivities)}`;

    if (hotel) {
      const hName = document.getElementById("rec-hotel-name");
      if (hName) hName.textContent = pl(hotel, "name");

      const hLoc = document.getElementById("rec-hotel-location");
      if (hLoc) hLoc.textContent = `${pl(hotel, "location")} • ${'★'.repeat(hotel.stars)}`;

      const hWhy = document.getElementById("rec-hotel-why");
      if (hWhy) hWhy.textContent = pl(hotel, "why");

      const hPrice = document.getElementById("rec-hotel-price");
      if (hPrice) hPrice.textContent = pt("per_night", { n: hotel.rateBDT });

      const hTier = document.getElementById("rec-hotel-tier-badge");
      if (hTier) hTier.textContent = pt("tier_badge", { t: pt("tier_" + hotel.tier) });
    }

    if (dining) {
      const dName = document.getElementById("rec-dining-name");
      if (dName) dName.textContent = pl(dining, "name");

      const dSpots = document.getElementById("rec-dining-spots");
      if (dSpots) dSpots.textContent = `${pl(dining, "location")} • ${pl(dining, "cuisine")}`;

      const dWhy = document.getElementById("rec-dining-why");
      if (dWhy) dWhy.textContent = pl(dining, "why");

      const dPrice = document.getElementById("rec-dining-price");
      if (dPrice) dPrice.textContent = pt("per_person_day", { n: dining.costPerPerson });
    }

    applyStaticText();
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
              <h4 class="font-serif text-xl sm:text-2xl text-charcoal font-semibold">${plannerEsc(pl(day, "title"))}</h4>
              <p class="text-xs font-mono text-terracotta-600 font-medium">${plannerEsc(pl(day, "theme"))}</p>
            </div>
          </div>
          <span class="text-[11px] font-mono text-stone-400 bg-stone-50 px-3 py-1 rounded-full border border-stone-200 self-start sm:self-center">
            ${plannerEsc(pt("day_of", { d: day.dayNum, n: state.days }))}
          </span>
        </div>

        <div class="space-y-4">
          ${day.items.map(item => `
            <div class="flex items-start gap-4 p-3 rounded-2xl hover:bg-stone-50 transition border border-transparent hover:border-stone-200">
              <span class="text-xs font-mono font-bold text-charcoal bg-stone-100 px-2.5 py-1 rounded-lg shrink-0 mt-0.5">
                ${plannerEsc(slotTime(item.time))}
              </span>
              <div class="space-y-1 flex-1">
                <div class="flex flex-wrap items-center justify-between gap-1">
                  <p class="text-xs sm:text-sm font-semibold text-charcoal">${plannerEsc(pl(item, "act"))}</p>
                  ${item.badge ? `<span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">${plannerEsc(pl(item, "badge"))}</span>` : ''}
                </div>
                <p class="text-[11px] text-stone-500 font-mono">${plannerEsc(pl(item, "tip"))}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // Fare card and driver card read TRANSPORT_DATA / PRICE_BOOK.fares (js/data.js) via fareById.
  const fareCard = () => PRICE_BOOK.fareCard.map(fareById).filter(Boolean);
  const bnNum = n => Number(n).toLocaleString("bn-BD");
  const fareRange = (f, toNum) => (f.minBDT === f.maxBDT ? `৳${toNum(f.minBDT)}` : `৳${toNum(f.minBDT)} – ৳${toNum(f.maxBDT)}`);

  function renderTransitTips() {
    const container = document.getElementById("planner-transit-fare-rules");
    if (!container) return;
    const lang = plannerLang();

    container.innerHTML = fareCard().map((fare, i) => `
      <div class="bg-white/80 rounded-2xl p-3 border border-amber-200 space-y-1">
        <div class="flex items-center justify-between">
          <span class="text-[10px] uppercase font-bold text-amber-900 block">${plannerEsc(fare.route[lang])}</span>
          <button type="button" data-fare-index="${i}" class="text-[10px] font-bold text-terracotta-600 hover:underline">
            ${plannerEsc(pt("driver_card"))}
          </button>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-stone-500 text-xs">${plannerEsc(fare.vehicle[lang])}:</span>
          <span class="font-bold text-charcoal text-xs">${plannerEsc(fareRange(fare, plannerNum))}</span>
        </div>
        <p class="text-[10px] text-amber-700 leading-tight pt-1">${plannerEsc(pt("fare_tip", { mode: fare.modeNote[lang], dur: fare.duration[lang] }))}</p>
      </div>
    `).join('');
    if (!container.dataset.wired) {
      container.dataset.wired = "1";
      container.addEventListener("click", e => {
        const btn = e.target.closest && e.target.closest("[data-fare-index]");
        const fare = btn && fareCard()[Number(btn.dataset.fareIndex)];
        // The driver card stays in Bangla: it is shown to the driver.
        if (fare) openDriverCard(fare.route.bn, `${fareRange(fare, bnNum)} টাকা (${fare.modeNote.bn})`, fare.vehicle.bn);
      });
    }
  }

  function renderVisualPassCard(budget, hotel, schedule) {
    renderEmergencyLines("pass-emergency");
    const titleEl = document.getElementById("pass-title");
    if (titleEl) titleEl.textContent = state.travelerName || pt("trip_default");

    const datesEl = document.getElementById("pass-dates");
    if (datesEl) datesEl.textContent = `${pt("days_nights", { d: state.days, n: Math.max(1, state.days - 1) })} • ${guestsText()} • ${pt("tier_badge", { t: pt("tier_" + state.budgetTier) })}`;

    const budgetEl = document.getElementById("pass-budget");
    if (budgetEl) budgetEl.textContent = `৳${plannerNum(budget.totalBDT)} BDT`;

    const budgetUsdEl = document.getElementById("pass-budget-usd");
    if (budgetUsdEl) budgetUsdEl.textContent = `(~$${plannerNum(budget.totalUSD)} USD)`;

    const baseEl = document.getElementById("pass-base");
    if (baseEl) baseEl.textContent = pt(state.baseHub === 'inani' ? 'base_inani' : state.baseHub === 'laboni' ? 'base_laboni' : 'base_kolatoli');

    const hotelEl = document.getElementById("pass-hotel");
    if (hotelEl) hotelEl.textContent = hotel ? pl(hotel, 'name') : '-';

    const transitEl = document.getElementById("pass-transit");
    if (transitEl) transitEl.textContent = vehicleText(budget);

    const vibeEl = document.getElementById("pass-vibe");
    if (vibeEl) vibeEl.textContent = pt("vibe_" + state.vibe);

    const timelineEl = document.getElementById("pass-condensed-timeline");
    if (timelineEl) {
      timelineEl.innerHTML = schedule.map(day => `
        <div class="bg-stone-900/90 rounded-2xl p-3 border border-stone-800 flex items-center justify-between text-xs">
          <div class="flex items-center gap-3">
            <span class="font-mono text-terracotta-400 font-bold">${plannerEsc(pt("day_tag", { d: dayLabel(day.dayNum) }))}</span>
            <span class="text-stone-200 font-medium">${plannerEsc(pl(day, "title"))}</span>
          </div>
          <span class="text-[10px] font-mono text-stone-400 hidden sm:inline-block">${plannerEsc(pl(day, "theme"))}</span>
        </div>
      `).join('');
    }
  }

  const dayLabel = n => (n < 10 ? plannerNum(0) : "") + plannerNum(n);
  const guestsText = () => (state.adults + state.kids === 1 ? pt("guest_1") : pt("guests_n", { n: state.adults + state.kids }));
  const vehicleText = b => (b.vehicles > 1 ? `${plannerNum(b.vehicles)} × ` : "") + pt("veh_" + b.vehicleKey);

  // Fixed page text: elements with data-pt="key" (and data-pt-placeholder) follow the language;
  // [data-tier-from] shows the cheapest nightly rate of that tier from PRICE_BOOK.
  function applyStaticText() {
    document.querySelectorAll("[data-pt]").forEach(el => { el.textContent = pt(el.dataset.pt); });
    document.querySelectorAll("[data-pt-placeholder]").forEach(el => { el.placeholder = pt(el.dataset.ptPlaceholder); });
    document.querySelectorAll("[data-tier-from]").forEach(el => {
      const rates = PLANNER_CATALOG.hotels.filter(h => h.tier === el.dataset.tierFrom).map(h => h.rateBDT);
      el.textContent = pt("from_night", { n: Math.min(...rates) });
    });
  }

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
    if (pTitle) pTitle.textContent = state.travelerName || pt("trip_default");

    const pMeta = document.getElementById("phone-pass-meta");
    if (pMeta) pMeta.textContent = `${pt("days_short", { d: state.days })} • ${guestsText()} • ৳${plannerNum(budget.totalBDT)}`;

    const pHotel = document.getElementById("phone-pass-hotel");
    if (pHotel) pHotel.textContent = hotel ? pl(hotel, "name") : "-";

    const pTimeline = document.getElementById("phone-pass-timeline");
    if (pTimeline) {
      pTimeline.innerHTML = schedule.slice(0, 3).map(day => `
        <div class="bg-stone-800/80 rounded-xl p-2.5 border border-stone-700/60 text-left">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono font-bold text-terracotta-400 uppercase">${plannerEsc(pt("day_tag", { d: dayLabel(day.dayNum) }))}</span>
            <span class="text-[9px] font-mono text-stone-400">${plannerEsc(pl(day, "theme").slice(0, 26))}...</span>
          </div>
          <p class="text-xs font-semibold text-white mt-0.5 truncate">${plannerEsc(pl(day, "title"))}</p>
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
          <span>${plannerEsc(pt("act_" + act.id))}</span>
          ${act.costPerPerson > 0 ? `<span class="text-[10px] font-mono text-stone-400 font-normal">(+৳${plannerNum(act.costPerPerson)})</span>` : ''}
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
    if (typeof confirm === 'function' && confirm(reason + " " + pt("export_print"))) window.print();
  }

  function exportCard(cardId, btnId, busyText, background, fileName, width) {
    const card = document.getElementById(cardId);
    if (!card) return;
    if (typeof html2canvas === 'undefined') {
      offerPrint(pt("export_no_lib"));
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
      windowWidth: width,
      // html2canvas cuts descenders on tight line-heights and overflow:hidden text; loosen them in the clone only.
      onclone: doc => {
        // The cards live in an offscreen container; put it back in flow inside the clone.
        const holder = doc.getElementById(cardId) && doc.getElementById(cardId).parentElement;
        if (holder) { holder.style.position = "static"; holder.style.left = "auto"; holder.style.top = "auto"; }
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
      offerPrint(pt("export_failed"));
    });
  }

  function safeName(fallback) {
    // Keep any script's letters and marks (a Bangla name was all underscores).
    return (state.travelerName || fallback).replace(/[^\p{L}\p{M}\p{N}_-]/gu, "_");
  }

  function downloadVisualPass() {
    exportCard("visual-pass-export-card", "btn-download-pass", pt("busy_pass"), "#111827",
      `${safeName("Visit-Cox-Itinerary")}-${state.days}-Days-Pass.png`, 1200);
  }

  function downloadPhonePass() {
    exportCard("phone-lockscreen-pass-card", "btn-download-phone-pass", pt("busy_phone"), "#0B2135",
      `${safeName("Visit-Cox")}-Phone-LockScreen-9-16.png`, 600);
  }

  // URL PARAMETER PARSER (CONNECTS INDEX.HTML QUICK-PICK TO ITINERARY.HTML)
  function parseURLParams() {
    if (typeof window === 'undefined' || !window.location.search) return;
    applyParams(state, new URLSearchParams(window.location.search));
  }

  return {
    init: function () {
      initialised = true;
      parseURLParams();
      renderActivityCheckboxes();
      renderAll();
      setWizardStep(1);
    },
    // Called by app.js renderAll() after a language or currency toggle.
    refresh: function () {
      if (!initialised) return;
      renderActivityCheckboxes();
      renderAll();
    },
    setWizardStep: setWizardStep,
    selectArchetype: selectArchetype,
    openDriverCard: openDriverCard,
    closeDriverCard: closeDriverCard,
    setDays: function (d) {
      state.days = clampDays(d, state.days);
      renderAll();
    },
    setPax: function (adults, kids) {
      state.adults = clampAdults(adults, state.adults);
      state.kids = clampKids(kids, state.kids);
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
      if (titleEl) titleEl.textContent = name || pt("trip_default");
      const pTitle = document.getElementById("phone-pass-title");
      if (pTitle) pTitle.textContent = name || pt("trip_default");
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
