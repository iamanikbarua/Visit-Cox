// Loads the shipped js/ files into one sandbox, the way the browser does (plain scripts sharing globals).
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Any DOM call returns a harmless stub, so scripts that touch the page at load time still run.
function stub() {
  const fn = function () { return stub(); };
  return new Proxy(fn, {
    get: (t, k) => (k === Symbol.toPrimitive ? () => '' : k === 'length' ? 0 : k === Symbol.iterator ? [][Symbol.iterator] : stub()),
    apply: () => stub(),
    construct: () => stub(),
  });
}

function memoryStorage() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    clear: () => m.clear(),
  };
}

// load(['data.js', 'planner.js']) -> evaluate('EXPR') reads any top-level const/let/function.
function load(files, { storage = memoryStorage() } = {}) {
  const ctx = {
    console, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    localStorage: storage, sessionStorage: memoryStorage(),
    document: stub(), navigator: { language: 'en', userAgent: 'node' }, location: { search: '', hash: '', href: 'http://localhost/', pathname: '/' },
    URLSearchParams, URL, Intl, encodeURIComponent, decodeURIComponent,
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const f of files) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', f), 'utf8'), ctx, { filename: f });
  }
  return (expr) => vm.runInContext(expr, ctx);
}

module.exports = { load, memoryStorage };
