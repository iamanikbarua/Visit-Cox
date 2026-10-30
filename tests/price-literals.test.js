// One source of truth: prices live in js/data.js. Pages and scripts read them (data-price, priceById, fareById, priceDigits).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const { load } = require('./helpers');

const root = path.join(__dirname, '..');
const files = [
  ...fs.readdirSync(root).filter((f) => f.endsWith('.html')),
  ...fs.readdirSync(path.join(root, 'js')).filter((f) => f.endsWith('.js') && f !== 'data.js').map((f) => 'js/' + f),
];
// JSON-LD is blanked out: it must be static for crawlers, and site.test.js pins the FAQ block to FAQ_DATA.
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, (m) => m.replace(/[^\n]/g, ''));
const D = '[0-9০-৯]';
const LITERALS = [
  [new RegExp(`৳\\s*${D}`), '৳ followed by a number'],
  [new RegExp(`${D}[0-9০-৯,]*\\s*(BDT|টাকা)`), 'a number followed by BDT/টাকা'],
  [/(fmtSingle|formatPriceRange)\(\s*\d/, 'a price formatter called with a number'],
];

test('no price literal outside js/data.js', () => {
  const hits = [];
  for (const f of files) {
    read(f).split('\n').forEach((line, i) => {
      for (const [re, what] of LITERALS) if (re.test(line)) hits.push(`${f}:${i + 1}: ${what}: ${line.trim().slice(0, 100)}`);
    });
  }
  assert.deepStrictEqual(hits, []);
});

test('every price id used by pages and scripts exists in js/data.js', () => {
  const evaluate = load(['data.js']);
  const ids = new Set();
  for (const f of files) {
    const src = read(f);
    for (const m of src.matchAll(/data-price="([\w-]+)"/g)) ids.add(m[1]);
    for (const m of src.matchAll(/\b(?:priceById|priceDigits|fare|fareById)\('([^']+)'/g)) ids.add(m[1]);
  }
  assert.ok(ids.size > 20, `found only ${ids.size} ids`);
  const missing = [...ids].filter((id) => { try { evaluate(`priceById(${JSON.stringify(id)})`); return false; } catch { return true; } });
  assert.deepStrictEqual(missing, []);
  assert.throws(() => evaluate(`priceById('no-such-price')`), /unknown id/);
  assert.strictEqual(evaluate(`priceDigits('town-to-moheshkhali', 'bn')`), '৮০–১০০');
});
