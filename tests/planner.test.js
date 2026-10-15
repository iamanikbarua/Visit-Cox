// Planner engine and quick pick, loaded from the shipped files.
const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers');

function planner(search = '') {
  const ev = load(['data.js', 'planner.js'], { dom: true, search });
  ev('PlannerApp.init()');
  return ev;
}

test('quick-pick cards (planner.js loaded first, as index.html must) match the planner for their link', () => {
  const ev = load(['data.js', 'planner.js', 'quickpick.js'], { dom: true });
  ev('QuickTripPick.init()');
  const slider = ev(`document.getElementById('qp-budget-slider')`);
  const cards = new Map();
  for (const vibe of ['all', 'relaxing', 'adventure', 'family', 'romantic', 'foodie']) {
    ev(`QuickTripPick.setVibe(${JSON.stringify(vibe)})`);
    for (let b = 3000; b <= 100000; b += 5000) {
      slider.listeners.input.forEach((f) => f({ target: { value: String(b) } }));
      const html = ev(`document.getElementById('qp-recommendations-list').innerHTML`);
      for (const m of html.matchAll(/href="itinerary\.html\?([^"]+)"[\s\S]*?<p[^>]*>\s*([^<]*?)\s*<\/p>[\s\S]*?৳([\d,]+)/g)) {
        cards.set(m[1], { line: m[2], total: Number(m[3].replace(/,/g, '')) });
      }
    }
  }
  assert.strictEqual(cards.size, 6);
  for (const [q, card] of cards) {
    const s = planner('?' + q)('PlannerApp.getState()');
    assert.strictEqual(card.total, s.calculatedBudget.totalBDT, q);
    assert.ok(card.line.startsWith(s.selectedHotel.name.replace(/&/g, '&amp;')), `${q}: ${card.line} vs ${s.selectedHotel.name}`);
    assert.ok(card.line.endsWith(`${s.days} days • ${s.adults + s.kids} guests`), `${q}: ${card.line}`);
  }
});

test('URL params: clamps, whitelist, pax alias, kids', () => {
  const s = planner('?days=400&pax=-3&kids=99&tier=gold&vibe=<img>')('PlannerApp.getState()');
  assert.deepStrictEqual([s.days, s.adults, s.kids, s.budgetTier, s.vibe], [14, 1, 10, 'comfort', 'relaxing']);
  const d = planner('?days=abc')('PlannerApp.getState()');
  assert.strictEqual(d.days, 3);
});

test('rooms count kids as half; vehicles = ceil(pax / capacity) of the cheaper type', () => {
  const ev = planner();
  const at = (a, k) => ev(`PlannerApp.estimate('adults=${a}&kids=${k}').budget`);
  assert.strictEqual(at(2, 4).rooms, 2);
  assert.strictEqual(at(1, 0).rooms, 1);
  assert.strictEqual(at(3, 0).vehicles, 1);
  assert.strictEqual(at(20, 0).vehicles, 2);
  assert.match(at(20, 0).vehicle, /^2 × Chander/);
});

test('WhatsApp button stays hidden while SITE_CONTACT.whatsapp is null', () => {
  const ev = planner();
  ev('if (typeof SITE_CONTACT !== "undefined") SITE_CONTACT.whatsapp = null');
  ev('PlannerApp.setDays(4)');
  assert.strictEqual(ev(`document.getElementById('btn-whatsapp-booking').hidden`), true);
  assert.strictEqual(ev('buildWhatsAppPlannerPayload(PlannerApp.getState())'), null);
});

test('WhatsApp message has no domain claim or "verified" when a number exists', () => {
  const ev = planner();
  const url = ev('SITE_CONTACT.whatsapp = "8801700000000"; buildWhatsAppPlannerPayload(PlannerApp.getState())');
  assert.match(url, /^https:\/\/wa\.me\/8801700000000\?text=/);
  const text = decodeURIComponent(url.split('text=')[1]);
  assert.ok(!/visitcox\.com|verified/i.test(text), text);
});

test('emergency lines on the passes come from EMERGENCY_CONTACTS only', () => {
  const ev = planner();
  const list = ev('typeof EMERGENCY_CONTACTS === "undefined" ? [] : EMERGENCY_CONTACTS').filter((c) => !c.needsOwnerConfirm);
  for (const id of ['pass-emergency', 'phone-pass-emergency']) {
    const html = ev(`document.getElementById('${id}').innerHTML`);
    const numbers = [...html.matchAll(/>([^<]+)<\/a>/g)].map((m) => m[1]);
    assert.deepStrictEqual(numbers, Array.from(list, (c) => c.number), id);
  }
});

test('fare buttons use data attributes, not inline onclick strings', () => {
  const ev = planner();
  const html = ev(`document.getElementById('planner-transit-fare-rules').innerHTML`);
  assert.ok(!html.includes('onclick'), 'inline onclick still present');
  assert.match(html, /data-fare-index="0"/);
});

test('PRICE_BOOK move kept the totals (snapshot taken before the move)', () => {
  const ev = planner();
  const snap = {
    '': 17950,
    'days=3&tier=comfort&arc=quiet_coral': 20800,
    'days=2&tier=comfort&arc=wave_hunter': 16600,
    'days=3&adults=2&kids=2&tier=comfort&arc=family_leader': 32700,
    'days=3&tier=luxury&arc=ocean_romance': 48600,
    'days=3&tier=backpacker&arc=quiet_coral': 11200,
    'days=7&adults=20&kids=3&tier=luxury': 1339350,
  };
  for (const [q, total] of Object.entries(snap)) {
    assert.strictEqual(ev(`PlannerApp.estimate(${JSON.stringify(q)}).budget.totalBDT`), total, q);
  }
});

test('every PRICE_BOOK entry has asOf, approx and non-negative prices; every planner item is priced', () => {
  const ev = planner();
  const pb = ev('PRICE_BOOK');
  const entries = [...Object.values(pb.hotels), ...Object.values(pb.dining), ...Object.values(pb.activities), ...pb.vehicles, pb.transfers, ...pb.fares];
  for (const e of entries) {
    assert.match(e.asOf, /^\d{4}-\d{2}-\d{2}$/);
    assert.strictEqual(e.approx, true);
    for (const k of ['rateBDT', 'costPerPerson', 'dailyBDT', 'totalBDT', 'minBDT', 'maxBDT']) {
      if (k in e) assert.ok(Number.isFinite(e[k]) && e[k] >= 0, `${k}=${e[k]}`);
    }
    if ('minBDT' in e) assert.ok(e.minBDT <= e.maxBDT, e.id);
  }
  for (const g of ['hotels', 'dining', 'activities']) {
    for (const x of ev(`PLANNER_CATALOG.${g}`)) assert.ok(x.id in pb[g], `${g}.${x.id} missing from PRICE_BOOK`);
  }
  for (const id of pb.fareCard) assert.ok(ev(`fareById(${JSON.stringify(id)})`), id);
});

test('PLANNER_TEXT has the same keys in en and bn, and covers every data-pt in itinerary.html', () => {
  const ev = planner();
  const t = ev('PLANNER_TEXT');
  assert.deepStrictEqual(Object.keys(t.bn).sort(), Object.keys(t.en).sort());
  const html = require('node:fs').readFileSync(require('node:path').join(__dirname, '..', 'itinerary.html'), 'utf8');
  for (const m of html.matchAll(/data-pt(?:-placeholder)?="([^"]+)"/g)) assert.ok(m[1] in t.en, m[1]);
});

test('planner renders Bangla digits and labels when AppState.lang is bn', () => {
  const ev = planner();
  ev('var AppState = { lang: "bn" }; PlannerApp.refresh()');
  const total = ev(`document.getElementById('budget-display-total').textContent`);
  assert.match(total, /^৳[০-৯,]+ BDT$/);
  assert.strictEqual(ev(`document.getElementById('budget-display-duration-tag').textContent`), '৩ দিন / ২ রাত');
  assert.match(ev(`document.getElementById('planner-transit-fare-rules').innerHTML`), /চালক কার্ড/);
});

test('transport calculator shows fares from TRANSPORT_DATA / PRICE_BOOK', () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  const set = (id, v) => ev(`document.getElementById('${id}').value = ${JSON.stringify(v)}`);
  set('calc-destination', 'ramu'); set('calc-party', 'solo');
  ev('runFareCalculation()');
  const ramu = ev(`TRANSPORT_DATA.find(f => f.id === 'town-to-ramu')`);
  assert.ok(ev(`document.getElementById('calc-fare-text').innerHTML`).includes(ev(`formatPriceRange(${ramu.minBDT}, ${ramu.maxBDT})`)));
});
