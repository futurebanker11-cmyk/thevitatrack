import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Muscle Loss Risk Quiz (Sarcopenia)",
  description: "Assess your risk for age-related muscle loss. Get protein and exercise recommendations.",
  alternates: { canonical: "https://thevitatrack.com/tools/muscle-loss-risk" },
  openGraph: {
    title: "Muscle Loss Risk Quiz (Sarcopenia)",
    description: "Assess your risk for age-related muscle loss. Get protein and exercise recommendations.",
    url: "https://thevitatrack.com/tools/muscle-loss-risk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
