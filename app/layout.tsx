import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VitaTrack — Evidence-Based Health Support for Adults 60+",
  description: "Free health tools, supplement protocols, and premium guides for seniors. Evidence-based, senior-specific.",
  metadataBase: new URL("https://thevitatrack.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,800&display=swap" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3496395300151813"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
