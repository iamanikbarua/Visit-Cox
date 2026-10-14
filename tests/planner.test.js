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
