/**
 * JSON-LD structured data for article pages.
 * All data is from our own database (trusted, not user-generated),
 * and JSON.stringify handles escaping for safe injection.
 */

interface ArticleSchemaProps {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
}

export function ArticleJsonLd({ title, excerpt, slug, category }: ArticleSchemaProps) {
  const url = `https://thevitatrack.com/${category}/${slug}`;
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": title,
    "description": excerpt,
    "url": url,
    "publisher": {
      "@type": "Organization",
      "name": "VitaTrack",
      "url": "https://thevitatrack.com"
    },
    "datePublished": "2025-03-25",
    "dateModified": "2026-04-16",
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "audience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": 60
    },
    "lastReviewed": "2026-04-16"
  });

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export function BreadcrumbJsonLd({ category, title }: { category: string; title: string }) {
  const categoryLabel = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thevitatrack.com" },
      { "@type": "ListItem", "position": 2, "name": categoryLabel, "item": `https://thevitatrack.com/${category}` },
      { "@type": "ListItem", "position": 3, "name": title }
    ]
  });

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export function ChildPageJsonLd({ headline, description, url }: { headline: string; description: string; url: string }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": headline,
    "description": description,
    "url": url,
    "datePublished": "2026-04-18",
    "dateModified": "2026-04-18",
    "author": { "@type": "Organization", "name": "VitaTrack", "url": "https://thevitatrack.com" },
    "isPartOf": { "@type": "WebPage", "@id": "https://thevitatrack.com/b12-dosage-seniors" }
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export function ChildBreadcrumbJsonLd({ slug, label }: { slug: string; label: string }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thevitatrack.com" },
      { "@type": "ListItem", "position": 2, "name": "B12 Dosage for Seniors", "item": "https://thevitatrack.com/b12-dosage-seniors" },
      { "@type": "ListItem", "position": 3, "name": label, "item": `https://thevitatrack.com/b12-dosage-seniors/${slug}` }
    ]
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export function ChildFaqJsonLd({ questions }: { questions: { q: string; a: string }[] }) {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export function B12ArticleJsonLd() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": "B12 Dosage for Seniors (2026 Guide): How Much Per Day by Age",
    "description": "Evidence-based B12 dosage guide for adults over 60, including personalized recommendations by age, diet, and medications.",
    "url": "https://thevitatrack.com/b12-dosage-seniors",
    "datePublished": "2026-04-18",
    "dateModified": "2026-04-18",
    "author": { "@type": "Organization", "name": "VitaTrack", "url": "https://thevitatrack.com" },
    "medicalAudience": { "@type": "MedicalAudience", "audienceType": "Patient" }
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export function B12BreadcrumbJsonLd() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thevitatrack.com" },
      { "@type": "ListItem", "position": 2, "name": "B12 Dosage for Seniors", "item": "https://thevitatrack.com/b12-dosage-seniors" }
    ]
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export function B12FaqJsonLd() {
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How much B12 should a 70-year-old take daily?", "acceptedAnswer": { "@type": "Answer", "text": "Most adults over 70 benefit from 100\u2013500 mcg of B12 daily. The RDA is only 2.4 mcg, but absorption decreases sharply with age due to reduced stomach acid, making higher supplemental doses necessary. Sublingual or high-dose tablets bypass the absorption problem." } },
      { "@type": "Question", "name": "What is the best form of B12 for seniors?", "acceptedAnswer": { "@type": "Answer", "text": "Methylcobalamin sublingual (dissolves under the tongue) is the most bioavailable form for seniors because it bypasses stomach acid. Cyanocobalamin tablets work well for routine supplementation in those with mild deficiency risk." } },
      { "@type": "Question", "name": "Can you take too much B12?", "acceptedAnswer": { "@type": "Answer", "text": "B12 is water-soluble and considered safe even at high doses because excess is excreted in urine. No tolerable upper intake level has been set by health authorities." } },
      { "@type": "Question", "name": "Does metformin deplete B12?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Metformin reduces B12 absorption by up to 30% over time. The American Diabetes Association recommends regular B12 monitoring for anyone on long-term metformin." } },
      { "@type": "Question", "name": "What are the signs of B12 deficiency in the elderly?", "acceptedAnswer": { "@type": "Answer", "text": "Early signs include fatigue, weakness, and brain fog. As deficiency progresses, symptoms include tingling in the hands and feet, balance problems, and memory loss." } },
      { "@type": "Question", "name": "When is the best time to take B12?", "acceptedAnswer": { "@type": "Answer", "text": "Most people take B12 with breakfast. Sublingual methylcobalamin works best on an empty stomach." } },
      { "@type": "Question", "name": "How often should seniors get their B12 levels tested?", "acceptedAnswer": { "@type": "Answer", "text": "Seniors without risk factors should test every 2\u20133 years. Those on metformin, PPIs, or a vegan diet should test annually." } },
      { "@type": "Question", "name": "Does B12 improve memory in seniors?", "acceptedAnswer": { "@type": "Answer", "text": "B12 deficiency is a reversible cause of memory problems. Correcting a deficiency can significantly improve mental clarity and reduce brain fog." } }
    ]
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}

export function ToolJsonLd({ name, description, slug }: { name: string; description: string; slug: string }) {
  const url = `https://thevitatrack.com/tools/${slug}`;
  const data = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "audience": {
      "@type": "PeopleAudience",
      "suggestedMinAge": 60
    },
    "publisher": {
      "@type": "Organization",
      "name": "VitaTrack",
      "url": "https://thevitatrack.com"
    }
  });

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: data }} />;
}
