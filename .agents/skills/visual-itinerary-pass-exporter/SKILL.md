---
name: visual-itinerary-pass-exporter
description: >-
  Technical procedures and styling best practices for exporting client-side
  itinerary passes via html2canvas and jsPDF with zero font clipping and crisp 2x resolution.
---

# Visual Itinerary Pass Exporter Skill 🖨️🎫

Use this skill when configuring, troubleshooting, or upgrading the PDF and PNG export functionality in `js/features.js` and `itinerary.html`.

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

## 2. jsPDF Multi-Page Pass Generation

```javascript
const { jsPDF } = window.jspdf;
const pdf = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4'
});

const imgData = canvas.toDataURL('image/png');
const imgWidth = 210; // A4 width in mm
const pageHeight = 297; // A4 height in mm
const imgHeight = (canvas.height * imgWidth) / canvas.width;

pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
pdf.save(`Visit-Cox-Itinerary-Pass-${Date.now()}.pdf`);
```

---

## 3. Font Preservation Rules for Bengali (Hind Siliguri)
* Never use `font-weight: 800` or `900` on Bengali glyphs if the font file only supports up to `700`.
* Add explicit `line-height: 1.6` to avoid conjunct character matra clipping on canvas exports.
