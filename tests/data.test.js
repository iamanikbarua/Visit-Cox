const test = require('node:test');
const assert = require('node:assert');
const { load } = require('./helpers');

test('data.js loads and every UI string exists in both languages', () => {
  const ev = load(['data.js']);
  const keys = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? keys(v, p + k + '.') : [p + k]));
  const en = new Set(keys(ev('UI_TEXT.en')));
  const bn = new Set(keys(ev('UI_TEXT.bn')));
  const missingBn = [...en].filter((k) => !bn.has(k));
  const missingEn = [...bn].filter((k) => !en.has(k));
  assert.deepStrictEqual({ missingBn, missingEn }, { missingBn: [], missingEn: [] });
});

test('a corrupt CMS value in localStorage does not crash data.js', () => {
  const { memoryStorage } = require('./helpers');
  const s = memoryStorage();
  s.setItem('visit_cox_cms_data_v4', '{not json');
  const ev = load(['data.js'], { storage: s });
  assert.ok(ev('HOTELS_DATA.length') > 0);
});
