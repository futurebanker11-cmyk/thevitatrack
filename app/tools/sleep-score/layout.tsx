import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Sleep Quality Quiz for Seniors",
  description: "Rate your sleep quality and get tips.",
  alternates: { canonical: "https://thevitatrack.com/tools/sleep-score" },
  openGraph: {
    title: "Sleep Quality Quiz for Seniors",
    description: "Rate your sleep quality and get tips.",
    url: "https://thevitatrack.com/tools/sleep-score",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Sleep Quality Quiz for Seniors" description="Rate your sleep quality and get tips." slug="sleep-score" />
      {children}
    </>
  );
}
