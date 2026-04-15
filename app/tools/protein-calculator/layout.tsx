import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Protein Calculator for Seniors",
  description: "How much protein you need after 60. Personalized calculation based on weight and activity.",
  alternates: { canonical: "https://thevitatrack.com/tools/protein-calculator" },
  openGraph: {
    title: "Protein Calculator for Seniors",
    description: "How much protein you need after 60. Personalized calculation based on weight and activity.",
    url: "https://thevitatrack.com/tools/protein-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
