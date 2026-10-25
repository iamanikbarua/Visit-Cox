// One test per bug in CrtiQue_Oct15.md section 3. Each loads the shipped files; each failed on the 2026-10-15 tree.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { load, memoryStorage } = require('./helpers');

const root = path.join(__dirname, '..');
const shipped = [
  ...fs.readdirSync(path.join(root, 'js')).filter((f) => f.endsWith('.js')).map((f) => 'js/' + f),
  ...fs.readdirSync(root).filter((f) => f.endsWith('.html')),
];
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const filesContaining = (needle) => shipped.filter((f) => read(f).includes(needle));

// Planner with the fake DOM; `search` is the itinerary.html query string.
function planner(search = '') {
  const ev = load(['data.js', 'planner.js'], { dom: true, search });
  ev('PlannerApp.init()');
  return ev;
}

test('#1/#2 no fake Tourist Police or lifeguard numbers in shipped files', () => {
  const fakes = ['01819-012345', '8801819012345', '01320-169999', '01320-160000', '01320-158995', '01320-160160'];
  const hits = fakes.flatMap((n) => filesContaining(n).map((f) => `${n} in ${f}`));
  assert.deepStrictEqual(hits, []);
});

test('#1 EMERGENCY_CONTACTS holds 999 and every entry has source and asOf', () => {
  const ev = load(['data.js']);
  const list = ev('typeof EMERGENCY_CONTACTS === "undefined" ? null : EMERGENCY_CONTACTS');
  assert.ok(Array.isArray(list) && list.length > 0, 'EMERGENCY_CONTACTS missing from data.js');
  assert.ok(list.some((c) => c.number === '999'), 'no 999 entry');
  for (const c of list) {
    assert.ok(c.id && c.name && c.name.en && c.name.bn, `name en/bn missing on ${c.id}`);
    assert.ok(c.source && c.asOf, `source/asOf missing on ${c.id}`);
    assert.match(c.tel, /^\+?\d+$/, `bad tel on ${c.id}`);
  }
});

test('#3 no placeholder WhatsApp link; SITE_CONTACT.whatsapp is null or a real 880 number', () => {
  assert.deepStrictEqual(filesContaining('wa.me/8801819012345'), []);
  const ev = load(['data.js']);
  const wa = ev('typeof SITE_CONTACT === "undefined" ? undefined : SITE_CONTACT.whatsapp');
  assert.ok(wa === null || /^880\d{10}$/.test(wa), `SITE_CONTACT.whatsapp = ${wa}`);
});

test('#4 hero live search does not throw on "himchari" or "cng"', () => {
  for (const q of ['himchari', 'cng', 'zzz-no-match']) {
    const ev = load(['data.js', 'app.js'], { dom: true });
    ev(`document.getElementById('hero-search-input').value = ${JSON.stringify(q)}`);
    assert.doesNotThrow(() => ev('handleLiveHeroSearchInput()'), q);
  }
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev(`document.getElementById('hero-search-input').value = 'himchari'`);
  ev('handleLiveHeroSearchInput()');
  assert.match(ev(`document.getElementById('hero-live-search-results').innerHTML`), /himchari/i);
});

test('#6 every quick-pick card total equals the planner total for its link', () => {
  const ev = load(['data.js', 'planner.js', 'quickpick.js'], { dom: true });
  const cards = new Map(); // href query -> shown total
  ev('QuickTripPick.init()');
  const slider = ev(`document.getElementById('qp-budget-slider')`);
  for (const vibe of ['all', 'relaxing', 'adventure', 'family', 'romantic', 'foodie']) {
    ev(`QuickTripPick.setVibe(${JSON.stringify(vibe)})`);
    for (let b = 3000; b <= 100000; b += 1000) {
      (slider.listeners.input || []).forEach((f) => f({ target: { value: String(b) } }));
      const html = ev(`document.getElementById('qp-recommendations-list').innerHTML`);
      for (const m of html.matchAll(/href="itinerary\.html\?([^"]+)"[\s\S]*?৳([\d,]+)/g)) {
        cards.set(m[1].replace(/&(amp;)?budget=\d+/, ''), Number(m[2].replace(/,/g, '')));
      }
    }
  }
  assert.ok(cards.size >= 4, `only ${cards.size} quick-pick cards found`);
  const wrong = [];
  for (const [q, shown] of cards) {
    const planned = planner('?' + q)('PlannerApp.getState().calculatedBudget.totalBDT');
    if (planned !== shown) wrong.push(`${q}: card ${shown} vs planner ${planned}`);
  }
  assert.deepStrictEqual(wrong, []);
});

test('#7 bad URL params give finite, clamped values', () => {
  for (const q of ['?days=abc', '?days=400&pax=-3', '?days=0&pax=0', '?pax=999&tier=<x>&vibe=<img>']) {
    const s = planner(q)('PlannerApp.getState()');
    assert.ok(Number.isInteger(s.days) && s.days >= 1 && s.days <= 14, `${q}: days=${s.days}`);
    assert.ok(Number.isInteger(s.adults) && s.adults >= 1 && s.adults <= 20, `${q}: adults=${s.adults}`);
    assert.ok(Number.isFinite(s.calculatedBudget.totalBDT) && s.calculatedBudget.totalBDT > 0, `${q}: total=${s.calculatedBudget.totalBDT}`);
  }
});

test('#8 one adult with ten kids needs more than one room', () => {
  const ev = planner();
  ev('PlannerApp.stepAdults(-20); for (let i = 0; i < 10; i++) PlannerApp.stepKids(1)');
  const s = ev('PlannerApp.getState()');
  assert.deepStrictEqual([s.adults, s.kids], [1, 10]);
  assert.ok(s.calculatedBudget.rooms > 1, `rooms=${s.calculatedBudget.rooms}`);
});

test('#9 twenty travellers need more than one vehicle', () => {
  const ev = planner();
  ev('PlannerApp.stepAdults(20)');
  const b = ev('PlannerApp.getState().calculatedBudget');
  // Contract for the fix: calculatedBudget.vehicles = ceil(pax / capacity).
  assert.ok(b.vehicles > 1, `vehicles=${b.vehicles} (${b.vehicle})`);
});

test('#10 day 10 is labelled "DAY 10", not "DAY 010"', () => {
  const ev = planner();
  ev('PlannerApp.setDays(10)');
  const html = [...ev('document.elements').values()].map((e) => e.innerHTML).join('\n');
  assert.ok(!/DAY 0\d\d/.test(html), 'three-digit day label rendered');
  assert.match(html, /DAY 10\b/);
});

test('#15 an unknown stored language falls back to English', () => {
  const s = memoryStorage();
  s.setItem('visit_cox_lang', 'fr');
  const ev = load(['data.js', 'app.js'], { dom: true, storage: s });
  assert.strictEqual(ev('AppState.lang'), 'en');
  assert.doesNotThrow(() => ev('renderHotels()'));
});

test('#15 a browser that blocks storage does not crash app.js at load', () => {
  const blocked = { getItem() { throw new Error('SecurityError'); }, setItem() { throw new Error('SecurityError'); }, removeItem() {}, clear() {} };
  assert.doesNotThrow(() => load(['data.js', 'app.js'], { dom: true, storage: blocked }));
});

test('data: prices are non-negative and min <= max', () => {
  const ev = load(['data.js']);
  const bad = [];
  const walk = (o, where) => {
    if (Array.isArray(o)) return o.forEach((x, i) => walk(x, `${where}[${i}]`));
    if (!o || typeof o !== 'object') return;
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === 'number' && /BDT$/.test(k) && v < 0) bad.push(`${where}.${k}=${v}`);
      walk(v, `${where}.${o.id || k}`);
    }
    if (o.minBDT > o.maxBDT) bad.push(`${where}: minBDT ${o.minBDT} > maxBDT ${o.maxBDT}`);
    if (o.priceBDT > o.priceMaxBDT) bad.push(`${where}: priceBDT ${o.priceBDT} > priceMaxBDT ${o.priceMaxBDT}`);
  };
  for (const n of ['HOTELS_DATA', 'DESTINATIONS_DATA', 'HIDDEN_GEMS_DATA', 'ACTIVITIES_DATA', 'TRANSPORT_DATA']) walk(ev(n), n);
  assert.deepStrictEqual(bad, []);
});

test('data: every hotel and spot has en and bn names', () => {
  const ev = load(['data.js']);
  const missing = ['HOTELS_DATA', 'DESTINATIONS_DATA', 'HIDDEN_GEMS_DATA']
    .flatMap((n) => ev(n).filter((x) => !(x.name && x.name.en && x.name.bn)).map((x) => `${n}:${x.id}`));
  assert.deepStrictEqual(missing, []);
});

test('data: every sourceUrl is https', () => {
  const ev = load(['data.js']);
  const urls = [];
  const walk = (o) => o && typeof o === 'object' && Object.entries(o).forEach(([k, v]) => (k === 'sourceUrl' ? urls.push(v) : walk(v)));
  for (const n of ['HOTELS_DATA', 'DESTINATIONS_DATA', 'HIDDEN_GEMS_DATA', 'ACTIVITIES_DATA', 'TRANSPORT_DATA']) walk(ev(n));
  assert.ok(urls.length > 0);
  assert.deepStrictEqual(urls.filter((u) => !/^https:\/\/[^/\s]+\.[a-z]{2,}/i.test(u)), []);
});

test('admin.js is gone and no page loads it', () => {
  assert.ok(!fs.existsSync(path.join(root, 'js/admin.js')), 'js/admin.js still exists');
  assert.deepStrictEqual(filesContaining('src="js/admin.js'), []);
});

test('chatbot spot answers render their formatting, not literal tags', async () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev('setTimeout = (f) => f()');
  const html = await ev(`fetchTravelAssistantReply('How do I get to Himchari?')`);
  assert.match(html, /<strong>Why Visit:<\/strong>/);
  assert.doesNotMatch(html, /&lt;strong&gt;|&lt;br/);
});

test("Saint Martin's advice: ships from Cox's Bazar only, sourced, and the chatbot uses it in both languages", async () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev('setTimeout = (f) => f()');
  const faq = ev(`FAQ_DATA.find((f) => f.id === 'faq-8')`);
  assert.ok(faq.source && faq.sourceUrl && faq.asOf, 'faq-8 needs source, sourceUrl, asOf');
  assert.match(faq.answer.en, /only from Cox's Bazar/);
  assert.match(faq.answer.bn, /শুধু কক্সবাজারের/);
  for (const [lang, q] of [['en', 'St. Martin ship'], ['bn', 'সেন্ট মার্টিন যাব কীভাবে']]) {
    ev(`AppState.lang = '${lang}'`);
    const html = await ev(`fetchTravelAssistantReply(${JSON.stringify(q)})`);
    assert.ok(html.includes(ev('escapeHTML')(faq.answer[lang])), `${lang} chatbot answer is not the FAQ text`);
  }
});

test('chatbot routing (CrtiQue_Oct21 H1/H2/H8): emergency words reach the emergency numbers, and only surfing questions get the surfing card', async () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev('setTimeout = (f) => f()');
  const ask = async (q) => {
    ev(`AppState.lang = '${/[ঀ-৿]/.test(q) ? 'bn' : 'en'}'`);
    return ev(`fetchTravelAssistantReply(${JSON.stringify(q)})`);
  };
  for (const q of ['emergency', '999', 'tourist police', 'hospital', 'ambulance', 'lifeguard', 'জরুরি নম্বর', 'পুলিশ', 'জরুরি পুলিশ ও হাসপাতাল নাম্বার',
    // CrtiQue_Oct24 N1: these fell through to the greeting
    'help', 'I need help', 'drowning', 'fire', 'rip current', 'I lost my child', 'stolen', 'ডাক্তার', 'অ্যাম্বুলেন্স', 'এম্বুলেন্স', 'লাইফগার্ড', 'ডুবে যাচ্ছে', 'আগুন', 'চুরি']) {
    assert.match(await ask(q), /🚨/, `"${q}" did not get the emergency numbers`);
  }
  // the greeting (fallback) offers the emergency chip in both languages
  assert.match(await ask('hello'), /Emergency numbers/);
  assert.match(await ask('নমস্কার'), /জরুরি নম্বর/);
  const src = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
  const chips = [...src.matchAll(/buildChatFollowUpChips\(\[([^\]]*)\]/g)].flatMap((m) => [...m[1].matchAll(/'([^']+)'/g)].map((c) => c[1]));
  const prompts = ev('[...UI_TEXT.en.chatbot.quickPrompts, ...UI_TEXT.bn.chatbot.quickPrompts]');
  assert.ok(chips.length > 20);
  for (const q of [...chips, ...prompts, 'hello', 'bus from dhaka', 'hotel list']) {
    if (/surf|সার্ফ/i.test(q)) continue;
    if (/activit|অ্যাক্টিভিটি/i.test(q)) continue; // the activity list names surfing; checked below
    assert.doesNotMatch(await ask(q), /Surfing|সার্ফিং/, `"${q}" got the surfing card`);
  }
  assert.match(await ask('praasad'), /Praasad Paradise/);
});

// CrtiQue_Oct21 round 2 (2026-10-22).
test('chat: the "Top 10 activities list" chip lists every activity, not the greeting (en and bn)', async () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev('setTimeout = (f) => f()');
  const names = ev('ACTIVITIES_DATA.map((a) => a.name)');
  for (const [lang, q] of [['en', 'Top 10 activities list'], ['bn', '১০টি অ্যাক্টিভিটি তালিকা']]) {
    ev(`AppState.lang = '${lang}'`);
    const html = await ev(`fetchTravelAssistantReply(${JSON.stringify(q)})`);
    assert.doesNotMatch(html, /👋/, `${lang}: got the greeting`);
    for (const n of names) assert.ok(html.includes(ev('escapeHTML')(n[lang])), `${lang}: ${n.en} missing`);
  }
  ev(`AppState.lang = 'en'`);
  assert.match(await ev(`fetchTravelAssistantReply('surfing activity')`), /Estimated Price/);
});

test('H6: chat jeep and CNG fares are the fare-table fares; the blog quotes no jeep price', async () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev('setTimeout = (f) => f()');
  const range = (id) => ev(`(() => { const f = fareById('${id}'); return formatPriceRange(f.minBDT, f.maxBDT); })()`);
  const him = await ev(`fetchTravelAssistantReply('How do I get to Himchari?')`);
  assert.ok(him.includes(range('town-to-himchari')) && him.includes(range('town-to-himchari-jeep')), 'Himchari fares');
  assert.ok(him.includes(ev(`formatPriceRange(PRICE_BOOK.activities.himchari_hill.costPerPerson, PRICE_BOOK.activities.himchari_hill.costPerPerson)`)), 'Himchari entry');
  assert.ok((await ev(`fetchTravelAssistantReply('Shamlapur sunset point')`)).includes(range('town-to-shamlapur-jeep')), 'Shamlapur jeep');
  assert.doesNotMatch(read('js/blog.js'), /1,500 to 2,000|১,৫০০ থেকে ২,০০০/);
});

test('H7/H13/H15: buffer pill makes the pills add up; 1 day has no hotel night; days=1e3 clamps to 14', () => {
  const ev = planner('?days=3');
  const b = ev('PlannerApp.getState().calculatedBudget');
  const pill = (id) => Number(ev(`document.getElementById('${id}').textContent`).replace(/[^\d]/g, ''));
  const sum = ['item-cost-hotel', 'item-cost-food', 'item-cost-transit', 'item-cost-activities', 'item-cost-buffer'].reduce((t, id) => t + pill(id), 0);
  assert.strictEqual(sum, b.totalBDT);
  assert.ok(pill('item-cost-buffer') > 0);
  assert.strictEqual(planner('?days=1')('PlannerApp.getState().calculatedBudget.totalHotel'), 0);
  assert.ok(planner('?days=2')('PlannerApp.getState().calculatedBudget.totalHotel') > 0);
  assert.strictEqual(planner('?days=1e3')('PlannerApp.getState().days'), 14);
  assert.doesNotMatch(read('itinerary.html'), /৳১৮,৫০০|18,500/, 'static fallback total');
});

test('H4: place photo credits name author and licence, point at Commons, and exist for files on disk', () => {
  const ev = load(['data.js']);
  const credits = ev('PHOTO_CREDITS');
  const ids = new Set(ev('[...DESTINATIONS_DATA, ...HIDDEN_GEMS_DATA].map((d) => d.id)'));
  for (const [img, c] of Object.entries(credits)) {
    assert.ok(fs.existsSync(path.join(root, img)), img);
    assert.ok(c.author && c.license && c.shows.en && c.shows.bn, img);
    assert.match(c.url, /^https:\/\/commons\.wikimedia\.org\/wiki\/File:/, img);
    assert.match(ev('LICENSE_URLS')[c.license] || '', /^https:\/\/creativecommons\.org\//, `${img}: no licence link`);
    for (const id of c.ofIds) assert.ok(ids.has(id), `${img}: unknown id ${id}`);
  }
  assert.strictEqual(ev('[...DESTINATIONS_DATA, ...HIDDEN_GEMS_DATA].filter((d) => d.sourceUrl || d.sourceName).length'), 0, 'old per-entry credits are back');
});

test('page copy promises no PDF export (the planner exports PNG only)', () => {
  for (const f of ['index.html', 'itinerary.html', 'privacy.html', 'js/page-text.js']) assert.doesNotMatch(read(f), /PDF/, f);
});

test('hotel cards say Details, not Reserve (nothing is reserved)', () => {
  const src = read('js/app.js');
  assert.doesNotMatch(src, /Reserve ➔|বুকিং ➔/);
  assert.match(src, /Details ➔/);
});

test('every <img> has width and height (no layout shift)', () => {
  const missing = shipped.flatMap((f) => [...read(f).matchAll(/<img\b[^>]*>/g)].filter((m) => !/\bwidth=/.test(m[0]) || !/\bheight=/.test(m[0])).map(() => f));
  assert.deepStrictEqual(missing, []);
});

test('modals are dialogs: role, aria-modal, a label that exists, and dialog.js loaded on their pages', () => {
  for (const [page, id, label] of [['index.html', 'hotel-facilities-modal', 'modal-hotel-name'], ['hotels.html', 'hotel-facilities-modal', 'modal-hotel-name'], ['itinerary.html', 'driver-anti-scam-modal', 'driver-card-title']]) {
    const html = read(page);
    const tag = html.match(new RegExp(`<div[^>]*id="${id}"[^>]*>`))[0];
    assert.match(tag, /role="dialog"/, `${page} ${id}`);
    assert.match(tag, /aria-modal="true"/, `${page} ${id}`);
    assert.match(tag, new RegExp(`aria-labelledby="${label}"`), `${page} ${id}`);
    assert.match(html, new RegExp(`id="${label}"`), `${page}: label element`);
    assert.match(html, /src="js\/dialog\.js/, `${page}: dialog.js`);
  }
  assert.match(read('blog.html'), /src="js\/dialog\.js/);
  assert.match(read('js/blog.js'), /setAttribute\('role', 'dialog'\)[\s\S]*aria-labelledby', 'blog-reader-title'[\s\S]*/);
  assert.match(read('js/blog.js'), /id="blog-reader-title"/);
});

test('chat Himchari distance is the spot data text, not a second figure', async () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev('setTimeout = (f) => f()');
  const way = ev(`DESTINATIONS_DATA.find((d) => d.id === 'himchari-national-park').directions`);
  for (const lang of ['en', 'bn']) {
    ev(`AppState.lang = '${lang}'`);
    const html = await ev(`fetchTravelAssistantReply(${JSON.stringify(lang === 'en' ? 'Himchari' : 'হিমছড়ি')})`);
    assert.ok(html.includes(ev('escapeHTML')(way[lang])), lang);
  }
  assert.doesNotMatch(read('js/app.js'), /Himchari[^.<]{0,40}18 km|হিমছড়ি[^।<]{0,40}১৮ কিমি/);
});

test('Himchari has one distance: no unsourced "18 km" next to it (CrtiQue_Oct24 N6)', () => {
  for (const f of ['js/data.js', 'js/blog.js', 'js/page-text.js', 'js/app.js', 'transport.html']) {
    const src = fs.readFileSync(path.join(root, f), 'utf8');
    assert.doesNotMatch(src, /(Himchari|হিমছড়ি)[^\n]{0,60}(18 km|১৮ কিমি)/, f);
  }
});

test('Moheshkhali fare and the USD rate come from data.js, not literals (CrtiQue_Oct24 N9/N11)', async () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev('setTimeout = (f) => f()');
  ev(`Object.assign(fareById('town-to-moheshkhali'), { minBDT: 77, maxBDT: 111 })`); // change the data; the chat must follow
  const range = ev(`formatPriceRange(77, 111)`);
  assert.ok((await ev(`fetchTravelAssistantReply('Moheshkhali speedboat')`)).includes(range), 'chat Moheshkhali card');
  assert.ok((await ev(`fetchTravelAssistantReply('saint martin')`)).includes(range), 'chat Saint Martin alternative');
  assert.doesNotMatch(read('js/app.js'), /formatPriceRange\(80, 100\)/);
  assert.match(read('js/planner.js'), /exchangeRate: CONFIG\.exchangeRateUSD/);
});

test('planner budget tier names no unlisted hotel brand (CrtiQue_Oct24 N2)', () => {
  const ev = load(['data.js', 'planner.js']);
  const hotels = ev('PLANNER_CATALOG.hotels.filter(h => h.tier === "backpacker").map(h => [h.name, h.bn.name])');
  assert.ok(hotels.length >= 2);
  for (const [en, bn] of hotels) {
    assert.match(en, /^Budget guest house/);
    assert.match(bn, /^বাজেট গেস্ট হাউস/);
  }
});

test('a 1-day trip pass names no hotel and day 1 has no check-in (CrtiQue_Oct24 N8)', () => {
  const ev = planner('?days=1');
  assert.strictEqual(ev(`document.getElementById('pass-hotel').textContent`), 'Day trip, no hotel');
  assert.strictEqual(ev(`document.getElementById('phone-pass-hotel').textContent`), 'Day trip, no hotel');
  const html = ev(`[...document.elements.values()].map(e => e.innerHTML + e.textContent).join(' ')`);
  assert.match(html, /Arrival in Cox/);
  assert.doesNotMatch(html, /check-in/i);
  const three = planner('?days=3');
  assert.notStrictEqual(three(`document.getElementById('pass-hotel').textContent`), 'Day trip, no hotel');
  assert.match(three(`[...document.elements.values()].map(e => e.innerHTML).join(' ')`), /Check-in/);
});

test('home hero hotel count equals HOTELS_DATA and has Bangla digits; cards say Estimated, not From (CrtiQue_Oct24 N13/N14)', () => {
  const ev = load(['data.js', 'page-text.js']);
  const n = String(ev('HOTELS_DATA.length'));
  assert.match(read('index.html'), new RegExp(`>${n}</span>\\s*<span[^>]*>Hotels Listed<`));
  assert.ok(ev(`PAGE_TEXT_BN[${JSON.stringify(n)}]`), `no Bangla for "${n}"`);
  assert.doesNotMatch(read('js/app.js'), /'শুরু' : 'From'/);
});

test('chat chips reach the answer they name (CrtiQue_Oct24 N5)', async () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev('setTimeout = (f) => f()');
  const ask = async (q) => {
    ev(`AppState.lang = '${/[ঀ-৿]/.test(q) ? 'bn' : 'en'}'`);
    return ev(`fetchTravelAssistantReply(${JSON.stringify(q)})`);
  };
  const expect = {
    'Hotels near Laboni Beach': /Listed hotels in this area[\s\S]*Kollol/,
    'লাবণী বিচের হোটেল': /এই এলাকার তালিকাভুক্ত হোটেল/,
    'Sugandha live fish fry?': /Best Places to Eat/,
    'Inani & Himchari route': /Inani Coral Beach[\s\S]*Himchari National Park/,
    'Laboni Beach info': /Laboni, Sugandha/,
  };
  for (const [q, re] of Object.entries(expect)) assert.match(await ask(q), re, q);
});

test('hotel cards credit a Commons photo and say what it shows (CrtiQue_Oct24 N3)', () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  const credited = ev(`HOTELS_DATA.filter(h => PHOTO_CREDITS[h.image]).map(h => h.id)`);
  assert.ok(credited.length > 0);
  ev(`AppState.lang = 'en'; renderHotels()`);
  const html = ev(`[...document.elements.values()].map(e => e.innerHTML).join(' ')`);
  for (const id of credited) {
    const c = ev(`PHOTO_CREDITS[HOTELS_DATA.find(h => h.id === '${id}').image]`);
    assert.ok(html.includes(ev(`escapeHTML(${JSON.stringify(`Photo shows ${c.shows.en}.`)})`)) && html.includes(c.author), id);
  }
});

test('planner leads with USD in USD mode; per-person USD x group = total USD (CrtiQue_Oct24 N7, N10)', () => {
  const ev = load(['data.js', 'app.js', 'planner.js'], { dom: true, search: '?days=14&adults=2' });
  ev("AppState.currency = 'USD'; PlannerApp.init()");
  const text = (id) => ev(`document.getElementById('${id}').textContent`);
  assert.match(text('budget-display-total'), /^~\$\d+ USD$/);
  assert.match(text('budget-display-usd'), /^\(৳[\d,]+ BDT\)$/);
  assert.match(text('pass-budget'), /^~\$/);
  ev("AppState.currency = 'BDT'; PlannerApp.refresh()");
  assert.match(text('budget-display-total'), /^৳[\d,]+ BDT$/);
  for (const q of ['?days=14&adults=2', '?days=3&adults=11']) {
    const e = load(['data.js', 'planner.js'], { dom: true });
    const b = e(`PlannerApp.estimate(${JSON.stringify(q.slice(1))}).budget`);
    const guests = Number(/adults=(\d+)/.exec(q)[1]);
    assert.strictEqual(b.perPersonUSD * guests, b.totalUSD, q);
  }
});

test('every activity is marked approx with an asOf date, and the page says so (CrtiQue_Oct24 N12)', () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  const bad = ev(`ACTIVITIES_DATA.filter(a => a.approx !== true || !/^\\d{4}-\\d{2}-\\d{2}$/.test(a.asOf)).map(a => a.id)`);
  assert.strictEqual(bad.length, 0, String(bad));
  ev(`AppState.lang = 'en'; renderActivities()`);
  const html = ev(`[...document.elements.values()].map(e => e.innerHTML).join(' ')`);
  assert.ok(html.includes('estimate, as of Oct 2026'));
});
