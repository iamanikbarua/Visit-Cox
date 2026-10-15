// Analytics consent: Google Analytics loads only after the visitor taps "Accept analytics".
// The choice lives in localStorage; window.VisitCoxConsent.reset() clears it and shows the banner again.
(function () {
  const GA_ID = 'G-KNP95TZB0K';
  const KEY = 'visit_cox_consent_v1';
  // Banner strings live here (not UI_TEXT in data.js) so pages without data.js, like 404.html, still get them.
  const TEXT = {
    en: {
      label: 'Analytics consent',
      body: 'May we use Google Analytics cookies to count page views? Nothing from Google Analytics loads unless you accept.',
      accept: 'Accept analytics',
      decline: 'Decline',
      privacy: 'Privacy',
    },
    bn: {
      label: 'অ্যানালিটিক্স সম্মতি',
      body: 'পেজ ভিউ গোনার জন্য আমরা কি Google Analytics কুকি ব্যবহার করতে পারি? আপনি সম্মতি না দিলে Google Analytics-এর কিছুই লোড হবে না।',
      accept: 'অ্যানালিটিক্স গ্রহণ করুন',
      decline: 'প্রত্যাখ্যান করুন',
      privacy: 'গোপনীয়তা',
    },
  };

  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, value) {
    try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, value); } catch (e) { /* storage blocked: choice lasts this page view */ }
  }

  let loaded = false;
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  let banner = null;
  function lang() {
    // app.js saves visit_cox_lang before it sets <html lang>; <html lang> is the fallback when storage is blocked.
    const l = read('visit_cox_lang') || document.documentElement.lang;
    return l === 'bn' ? 'bn' : 'en';
  }
  function fill() {
    if (!banner) return;
    const t = TEXT[lang()];
    banner.setAttribute('aria-label', t.label);
    banner.querySelector('.vc-consent-text').textContent = t.body;
    banner.querySelector('[data-consent="granted"]').textContent = t.accept;
    banner.querySelector('[data-consent="denied"]').textContent = t.decline;
    banner.querySelector('.vc-consent-link').textContent = t.privacy;
  }
  function choose(value) {
    write(KEY, value);
    if (banner) { banner.remove(); banner = null; }
    if (value === 'granted') loadAnalytics();
  }
  function showBanner() {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'vc-consent';
    banner.setAttribute('role', 'region');
    banner.innerHTML =
      '<p class="vc-consent-text"></p>' +
      '<div class="vc-consent-actions">' +
      '<button type="button" class="vc-consent-btn" data-consent="granted"></button>' +
      '<button type="button" class="vc-consent-btn" data-consent="denied"></button>' +
      '<a class="vc-consent-link" href="privacy.html"></a>' +
      '</div>';
    banner.querySelectorAll('[data-consent]').forEach((b) => b.addEventListener('click', () => choose(b.dataset.consent)));
    fill();
    document.body.appendChild(banner);
  }

  function init() {
    const choice = read(KEY);
    if (choice === 'granted') loadAnalytics();
    else if (choice !== 'denied') showBanner();
    // app.js sets <html lang> when the visitor toggles language; follow it.
    if (typeof MutationObserver === 'function') {
      new MutationObserver(fill).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    }
  }

  window.VisitCoxConsent = {
    // Clears the choice and shows the banner. Already-loaded analytics stays until the page reloads.
    reset() { write(KEY, null); showBanner(); },
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
