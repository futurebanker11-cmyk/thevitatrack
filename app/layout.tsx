import type { Metadata } from "next";
import Footer from "@/components/Footer";
import "./globals.css";

// Static, trusted JSON-LD string (not user-generated content)
const orgSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VitaTrack",
  "url": "https://thevitatrack.com",
  "description": "Evidence-based health support for adults over 60",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61550903702285",
    "https://www.youtube.com/@healthyhabitat1304"
  ]
});

export const metadata: Metadata = {
  title: {
    default: "VitaTrack — Evidence-Based Health Support for Adults 60+",
    template: "%s | VitaTrack",
  },
  description: "Free health tools, evidence-based supplement recommendations, and in-depth health guides designed specifically for adults over 60.",
  metadataBase: new URL("https://thevitatrack.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "VitaTrack",
    title: "VitaTrack — Evidence-Based Health Support for Adults 60+",
    description: "Free health tools, supplement protocols, and premium guides for seniors. 21 calculators, 12 supplement guides, 200+ health articles.",
    url: "https://thevitatrack.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "VitaTrack — Health Support for Adults 60+",
    description: "Free health tools, supplement protocols, and premium guides for seniors.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,800&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,800&display=swap" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3496395300151813"
          crossOrigin="anonymous"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgSchema }} />
      </head>
      <body>{children}<Footer /></body>
    </html>
  );
}
