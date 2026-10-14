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
