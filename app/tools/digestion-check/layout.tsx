import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Digestion & Gut Health Quiz",
  description: "Check your digestive health. Identify common gut issues and get improvement tips for seniors.",
  alternates: { canonical: "https://thevitatrack.com/tools/digestion-check" },
  openGraph: {
    title: "Digestion & Gut Health Quiz",
    description: "Check your digestive health. Identify common gut issues and get improvement tips for seniors.",
    url: "https://thevitatrack.com/tools/digestion-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
