import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fall Risk Assessment for Seniors",
  description: "Identify your fall risk factors and get personalized prevention steps. Takes 2 minutes.",
  alternates: { canonical: "https://thevitatrack.com/tools/fall-risk" },
  openGraph: {
    title: "Fall Risk Assessment for Seniors",
    description: "Identify your fall risk factors and get personalized prevention steps. Takes 2 minutes.",
    url: "https://thevitatrack.com/tools/fall-risk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
