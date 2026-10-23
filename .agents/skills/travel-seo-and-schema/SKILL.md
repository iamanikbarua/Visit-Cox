---
name: travel-seo-and-schema
description: >-
  Implementation guide for Schema.org JSON-LD structured data (TouristDestination,
  Hotel, FAQPage, Trip), bilingual meta tags, and Core Web Vitals optimization.
---

# Travel SEO & Structured Data Skill 🔍🌐

Use this skill whenever optimizing search engine rankings, writing rich snippets, or configuring bilingual meta tags for Visit Cox.

---

## 1. Schema.org JSON-LD Examples

### A. TouristDestination & TouristAttraction
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Cox's Bazar",
  "description": "A long natural sandy sea beach in southeastern Bangladesh.",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "21.4272",
    "longitude": "91.9702"
  },
  "touristType": ["Beach Tourism", "Eco Tourism", "Adventure Tourism"],
  "includesAttraction": [
    { "@type": "TouristAttraction", "name": "Inani Coral Beach" },
    { "@type": "TouristAttraction", "name": "Himchari National Park" },
    { "@type": "TouristAttraction", "name": "Marine Drive Road" },
    { "@type": "TouristAttraction", "name": "Moheshkhali Island" }
  ]
}
</script>
```

### B. FAQPage Schema (For Rich Google FAQ Accordions)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "কক্সবাজার ৩ দিন ঘুরতে কত টাকা বাজেট লাগে?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "সাধারণ বাজেটে জনপ্রতি প্রায় ৪,০০০ থেকে ৬,০০০ টাকা এবং কাপলদের জন্য প্রায় ৮,০০০ থেকে ১২,০০০ টাকা খরচ হয়।"
      }
    }
  ]
}
</script>
```

---

## 2. Bilingual Keyword Strategy
* **High-Intent English Keywords:** `cox's bazar hotel booking`, `cox's bazar 3 days tour plan`, `marine drive bike rental cost`, `inani beach distance from kolatoli`.
* **High-Intent Bengali Keywords:** `কক্সবাজার ভ্রমণ গাইড`, `কক্সবাজার ৩ দিনের ট্যুর প্ল্যান ও বাজেট`, `কক্সবাজার সেরা হোটেল`, `কলাতলী থেকে ইনানী বিচ ভাড়া`.
