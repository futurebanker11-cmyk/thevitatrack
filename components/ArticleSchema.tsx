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
