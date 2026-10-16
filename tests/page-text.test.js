// Bangla for the fixed HTML text (js/page-text.js): every English string on the pages has a translation,
// and renderPageText swaps text nodes in বাংলা mode and restores them in English.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { load } = require('./helpers');

const root = path.join(__dirname, '..');
// privacy.html carries its own Bangla section; itinerary.html uses planner.js data-pt keys.
const SKIP_PAGES = new Set(['privacy.html', 'itinerary.html']);
// Brand marks, toggle labels and coordinates stay English in both modes.
const KEEP = new Set(['Visit Cox', 'Visit Cox.', '৳ BDT', '$ USD', 'EN', '21.4272° N, 91.9701° E — BAY OF BENGAL']);

function englishStrings(html) {
  const body = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|svg|noscript)\b[\s\S]*?<\/\1>/gi, '');
  return body
    .split(/<[^>]+>/)
    .map((s) => s.replace(/&amp;/g, '&').replace(/&copy;/g, '©').replace(/\s+/g, ' ').trim())
    .filter((s) => /[A-Za-z]{2}/.test(s));
}

test('every fixed English string on the pages has Bangla in PAGE_TEXT_BN', () => {
  const bn = load(['page-text.js'])('PAGE_TEXT_BN');
  const missing = [];
  for (const f of fs.readdirSync(root).filter((f) => f.endsWith('.html') && !SKIP_PAGES.has(f))) {
    for (const s of englishStrings(fs.readFileSync(path.join(root, f), 'utf8'))) {
      if (!KEEP.has(s) && !(s in bn)) missing.push(`${f}: ${s}`);
    }
  }
  assert.deepStrictEqual([...new Set(missing)], []);
});

// Minimal DOM: a body whose text nodes the TreeWalker visits in order; `inLang` marks a node inside [lang].
function fakePage(texts) {
  const nodes = texts.map(([value, inLang]) => ({ nodeValue: value, parentElement: { closest: () => (inLang ? {} : null) } }));
  const ctx = {
    NodeFilter: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 },
    document: {
      title: 'Privacy | Visit Cox',
      body: {},
      createTreeWalker: (_root, _what, filter) => {
        const list = nodes.filter((n) => filter.acceptNode(n) === 1);
        let i = -1;
        return { nextNode: () => list[++i] || null };
      },
    },
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'js', 'page-text.js'), 'utf8'), ctx);
  return { nodes, ctx, render: (lang) => vm.runInContext(`renderPageText(${JSON.stringify(lang)})`, ctx) };
}

test('renderPageText swaps to Bangla, keeps surrounding spaces, and restores English', () => {
  const page = fakePage([['\n   Reset   Filters\n  '], ['Hotel Sea Crown'], ['Search', true]]);
  page.render('bn');
  assert.strictEqual(page.nodes[0].nodeValue, '\n   ফিল্টার মুছুন\n  ');
  assert.strictEqual(page.nodes[1].nodeValue, 'Hotel Sea Crown'); // no entry: left alone
  assert.strictEqual(page.nodes[2].nodeValue, 'Search'); // inside [lang]: already bilingual, skipped
  assert.strictEqual(page.ctx.document.title, 'গোপনীয়তা | ভিজিট কক্সবাজার');
  page.render('bn'); // a second render (e.g. a currency toggle) must not double-translate
  assert.strictEqual(page.nodes[0].nodeValue, '\n   ফিল্টার মুছুন\n  ');
  page.render('en');
  assert.strictEqual(page.nodes[0].nodeValue, '\n   Reset   Filters\n  ');
  assert.strictEqual(page.ctx.document.title, 'Privacy | Visit Cox');
});

test('quick pick cards follow বাংলা mode: Bangla titles and digits, hotel names stay English', () => {
  const ev = load(['data.js', 'planner.js', 'quickpick.js'], { dom: true });
  ev('globalThis.AppState = { lang: "bn", currency: "BDT" }');
  ev('QuickTripPick.init()');
  const html = ev(`document.getElementById('qp-recommendations-list').innerHTML`);
  assert.match(html, /দিন • [০-৯]+ জন/);
  assert.match(html, /ক্লাসিক উপকূল ভ্রমণ|সাশ্রয়ী উপকূল ভ্রমণ|সপ্তাহান্তে ঢেউ ও রোমাঞ্চ|সাগরমুখী রোমান্স ও সূর্যাস্ত|ঝামেলাহীন পারিবারিক ভ্রমণ|ভর্তা ও তাজা মাছের সফর/);
  assert.doesNotMatch(html, / days •| guests|\/pax/); // "days=" in the planner links is fine
  assert.match(ev(`document.getElementById('qp-per-person-val').textContent`), /জনপ্রতি ৳[০-৯]/);
});
