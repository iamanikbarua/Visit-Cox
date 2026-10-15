// Analytics consent (js/consent.js): Google Analytics loads only after an explicit "granted" choice.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { load, memoryStorage } = require('./helpers.js');

// A document that records what consent.js appends to <head> and <body>.
function recordingDocument() {
  const added = [];
  const el = (tag) => ({ tagName: tag, dataset: {}, setAttribute() {}, querySelector: () => ({}), querySelectorAll: () => [], remove() {}, addEventListener() {} });
  return { readyState: 'complete', documentElement: { lang: 'en' }, createElement: el, head: { appendChild: (n) => added.push(n) }, body: { appendChild: (n) => added.push(n) }, added };
}

function run(choice, storage = memoryStorage()) {
  if (choice) storage.setItem('visit_cox_consent_v1', choice);
  const document = recordingDocument();
  const ev = load(['consent.js'], { storage, document });
  const gtag = document.added.filter((n) => String(n.src || '').includes('googletagmanager'));
  const banner = document.added.filter((n) => n.className === 'vc-consent');
  return { ev, gtag, banner, storage };
}

test('no stored choice: banner shown, Google Analytics not loaded', () => {
  const { gtag, banner } = run(null);
  assert.strictEqual(gtag.length, 0);
  assert.strictEqual(banner.length, 1);
});

test("'granted': gtag script injected once, no banner", () => {
  const { ev, gtag, banner } = run('granted');
  assert.strictEqual(gtag.length, 1);
  assert.match(gtag[0].src, /id=G-KNP95TZB0K$/);
  assert.strictEqual(banner.length, 0);
  assert.strictEqual(ev('dataLayer.length'), 2); // js + config
});

test("'denied': nothing from Google, no banner", () => {
  const { gtag, banner } = run('denied');
  assert.strictEqual(gtag.length, 0);
  assert.strictEqual(banner.length, 0);
});

test('a throwing localStorage does not crash and loads nothing', () => {
  const boom = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); }, removeItem() { throw new Error('blocked'); } };
  const { ev, gtag, banner } = run(null, boom);
  assert.strictEqual(gtag.length, 0);
  assert.strictEqual(banner.length, 1);
  ev('VisitCoxConsent.reset()'); // must not throw
});

test('reset() clears the stored choice', () => {
  const { ev, storage } = run('denied');
  ev('VisitCoxConsent.reset()');
  assert.strictEqual(storage.getItem('visit_cox_consent_v1'), null);
});

test('no html page loads gtag.js inline; every page loads consent.js', () => {
  const root = path.join(__dirname, '..');
  const pages = fs.readdirSync(root).filter((f) => f.endsWith('.html'));
  assert.ok(pages.includes('privacy.html') && pages.includes('404.html'));
  for (const f of pages) {
    const html = fs.readFileSync(path.join(root, f), 'utf8');
    assert.ok(!html.includes('googletagmanager.com/gtag/js'), `${f} still loads gtag.js inline`);
    assert.ok(html.includes('js/consent.js'), `${f} does not load consent.js`);
    assert.ok(html.includes('href="privacy.html"') && html.includes('VisitCoxConsent.reset()'), `${f} lacks Privacy / Cookie settings links`);
  }
});
