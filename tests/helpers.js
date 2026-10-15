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

// A fake element that keeps value/textContent/innerHTML/classList/style; anything else is a stub.
function element(id) {
  const classes = new Set();
  const real = {
    id, value: '', textContent: '', innerHTML: '', style: {}, dataset: {}, children: [],
    classList: { add: (...c) => c.forEach((x) => classes.add(x)), remove: (...c) => c.forEach((x) => classes.delete(x)), toggle: (c, on) => ((on ?? !classes.has(c)) ? classes.add(c) : classes.delete(c)), contains: (c) => classes.has(c) },
    listeners: {}, addEventListener(t, f) { (this.listeners[t] ||= []).push(f); },
  };
  return new Proxy(real, { get: (t, k) => (k in t ? t[k] : stub()), set: (t, k, v) => ((t[k] = v), true) });
}

// document.getElementById(id) returns the same fake element per id; other document calls are stubs.
function fakeDocument() {
  const els = new Map();
  const doc = {
    getElementById: (id) => (els.has(id) || els.set(id, element(id)), els.get(id)),
    querySelectorAll: () => [],
    elements: els,
  };
  return new Proxy(doc, { get: (t, k) => (k in t ? t[k] : stub()) });
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
// Options: storage, search ('?days=3'), dom (true = fakeDocument with real element objects), document (your own fake).
function load(files, { storage = memoryStorage(), search = '', dom = false, document = dom ? fakeDocument() : stub() } = {}) {
  const ctx = {
    console, setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    localStorage: storage, sessionStorage: memoryStorage(),
    document, navigator: { language: 'en', userAgent: 'node' },
    location: { search, hash: '', href: 'http://localhost/' + search, pathname: '/' },
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
