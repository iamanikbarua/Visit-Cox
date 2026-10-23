---
name: visual-itinerary-pass-exporter
description: >-
  Technical procedures and styling best practices for exporting client-side
  itinerary passes as PNG via html2canvas with zero font clipping and crisp 2x resolution.
---

# Visual Itinerary Pass Exporter Skill 🖨️🎫

Use this skill when configuring, troubleshooting, or upgrading the PNG pass export in `js/planner.js` (the `html2canvas(card, ...)` call) and `itinerary.html`. There is no PDF export: `js/features.js` and jsPDF were deleted, and when html2canvas is blocked the planner offers print instead.

---

## 1. html2canvas Configuration Best Practices

To prevent blurry text, cut-off Bengali fonts, or missing background colors:

```javascript
const canvas = await html2canvas(element, {
  scale: 2, // Crisp 2x retina resolution
  useCORS: true, // Allow external photographs and icons
  allowTaint: true,
  backgroundColor: '#FAF9F6', // Alabaster background matching theme
  logging: false,
  windowWidth: 1200, // Fixed baseline width for consistent layout
  onclone: (clonedDoc) => {
    // Ensure all web fonts are rendered and text clipping is avoided
    const clonedEl = clonedDoc.getElementById('itinerary-dossier-preview');
    if (clonedEl) {
      clonedEl.style.transform = 'none';
      clonedEl.style.maxWidth = '800px';
      clonedEl.style.margin = '0 auto';
    }
  }
});
```

---

## 2. No PDF export

The planner exports PNG only (horizontal pass and 9:16 phone pass). Do not add jsPDF back or promise PDF in copy without the owner's approval (a new dependency).

---

## 3. Font Preservation Rules for Bengali (Hind Siliguri)
* Never use `font-weight: 800` or `900` on Bengali glyphs if the font file only supports up to `700`.
* Add explicit `line-height: 1.6` to avoid conjunct character matra clipping on canvas exports.
