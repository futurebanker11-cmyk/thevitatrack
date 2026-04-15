import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Biological Age Quiz for Seniors",
  description: "Estimate your biological age vs chronological age. Based on lifestyle, diet, exercise, and health markers.",
  alternates: { canonical: "https://thevitatrack.com/tools/longevity-score" },
  openGraph: {
    title: "Biological Age Quiz for Seniors",
    description: "Estimate your biological age vs chronological age. Based on lifestyle, diet, exercise, and health markers.",
    url: "https://thevitatrack.com/tools/longevity-score",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
