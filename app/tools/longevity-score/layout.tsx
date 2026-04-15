import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Biological Age Quiz for Seniors",
  description: "Estimate your biological vs chronological age.",
  alternates: { canonical: "https://thevitatrack.com/tools/longevity-score" },
  openGraph: {
    title: "Biological Age Quiz for Seniors",
    description: "Estimate your biological vs chronological age.",
    url: "https://thevitatrack.com/tools/longevity-score",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Biological Age Quiz for Seniors" description="Estimate your biological vs chronological age." slug="longevity-score" />
      {children}
    </>
  );
}
