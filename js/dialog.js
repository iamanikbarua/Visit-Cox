/**
 * Visit Cox — shared modal behaviour for the hotel, blog-reader and driver-card dialogs.
 * opened(el, close): focus moves into el, Tab and Shift+Tab stay inside, Escape calls close().
 * closed(el): focus returns to the element that had it when the dialog opened.
 */
window.VCDialog = (() => {
  let current = null; // { el, opener, close }
  const focusables = el => [...el.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter(x => x.getClientRects().length);

  document.addEventListener('keydown', e => {
    if (!current) return;
    if (e.key === 'Escape') { e.preventDefault(); current.close(); return; }
    if (e.key !== 'Tab') return;
    const f = focusables(current.el);
    if (!f.length) { e.preventDefault(); return; }
    const first = f[0], last = f[f.length - 1];
    if (!current.el.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
    else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  return {
    opened(el, close) {
      current = { el, opener: document.activeElement, close };
      (focusables(el)[0] || el).focus();
    },
    closed(el) {
      if (!current || current.el !== el) return;
      const { opener } = current;
      current = null;
      if (opener && opener !== document.body && document.contains(opener)) opener.focus();
    }
  };
})();
