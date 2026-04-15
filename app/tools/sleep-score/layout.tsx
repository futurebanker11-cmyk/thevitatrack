import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sleep Quality Quiz for Seniors",
  description: "Rate your sleep quality and get improvement tips. Covers insomnia, nocturia, sleep hygiene.",
  alternates: { canonical: "https://thevitatrack.com/tools/sleep-score" },
  openGraph: {
    title: "Sleep Quality Quiz for Seniors",
    description: "Rate your sleep quality and get improvement tips. Covers insomnia, nocturia, sleep hygiene.",
    url: "https://thevitatrack.com/tools/sleep-score",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
