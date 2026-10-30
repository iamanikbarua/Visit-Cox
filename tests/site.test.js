// Site shell (js/app.js): escaping, stored preferences, emergency numbers, hero search echo.
const test = require('node:test');
const assert = require('node:assert');
const { load, memoryStorage } = require('./helpers.js');

test('escapeHTML neutralises markup and quotes', () => {
  const ev = load(['data.js', 'app.js']);
  assert.strictEqual(ev(`escapeHTML('<img src=x onerror="a(\\'1\\')">&')`), '&lt;img src=x onerror=&quot;a(&#39;1&#39;)&quot;&gt;&amp;');
  assert.strictEqual(ev('escapeHTML(null)'), '');
});

test('stale or hostile stored lang/currency fall back to defaults', () => {
  const s = memoryStorage();
  s.setItem('visit_cox_lang', 'fr');
  s.setItem('visit_cox_currency', '<b>');
  const ev = load(['data.js', 'app.js'], { storage: s });
  assert.strictEqual(ev('AppState.lang'), 'en');
  assert.strictEqual(ev('AppState.currency'), 'BDT');
});

test('a storage that throws does not break app.js', () => {
  const boom = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  const ev = load(['data.js', 'app.js'], { storage: boom });
  assert.strictEqual(ev('AppState.lang'), 'en');
  ev("savePref('visit_cox_lang', 'bn')"); // must not throw
});

test('emergency list renders only EMERGENCY_CONTACTS numbers', () => {
  const ev = load(['data.js', 'app.js']);
  const html = ev("emergencyContactsHTML('en')");
  for (const c of ev('EMERGENCY_CONTACTS')) assert.ok(html.includes(c.number), c.number);
  assert.match(html, /999/);
  assert.doesNotMatch(html, /01819|160160|169999|158995|lifeguard/i);
});

test('hero search echoes typed text escaped', () => {
  const ev = load(['data.js', 'app.js'], { dom: true });
  ev(`document.getElementById('hero-search-input').value = '<img src=x onerror=alert(1)>qqq'`);
  ev('handleLiveHeroSearchInput()');
  const html = ev(`document.getElementById('hero-live-search-results').innerHTML`);
  assert.ok(html.includes('&lt;img'), html);
  assert.ok(!html.includes('<img src=x'), html);
});

test('index.html FAQPage JSON-LD matches FAQ_DATA (en) exactly', () => {
  const html = require('node:fs').readFileSync(require('node:path').join(__dirname, '..', 'index.html'), 'utf8');
  const block = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1])).find((j) => j['@type'] === 'FAQPage');
  const faq = JSON.parse(load(['data.js'])('JSON.stringify(FAQ_DATA)')); // plain arrays: vm-realm arrays fail deepStrictEqual
  assert.deepStrictEqual(block.mainEntity.map((q) => [q.name, q.acceptedAnswer.text]), faq.map((f) => [f.question.en, f.answer.en]));
});

test('emergency citations: text sources are escaped text, only URLs become links', () => {
  const html = load(['data.js', 'app.js'])("emergencyContactsHTML('en')");
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).filter((h) => !h.startsWith('tel:'));
  assert.ok(hrefs.length > 0 && hrefs.every((h) => /^https?:\/\//.test(h)), hrefs.join(', '));
  assert.match(html, /Tourist Police, Cox&#39;s Bazar Region/);
});

test('every page with a menu button has the drawer toggleMobileMenu opens', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const root = path.join(__dirname, '..');
  const id = fs.readFileSync(path.join(root, 'js', 'app.js'), 'utf8').match(/function toggleMobileMenu[\s\S]*?getElementById\('([^']+)'\)/)[1];
  const pages = fs.readdirSync(root).filter((f) => f.endsWith('.html') && fs.readFileSync(path.join(root, f), 'utf8').includes('toggleMobileMenu('));
  assert.ok(pages.length >= 9, pages.join());
  assert.deepStrictEqual(pages.filter((f) => !fs.readFileSync(path.join(root, f), 'utf8').includes(`id="${id}"`)), []);
});
