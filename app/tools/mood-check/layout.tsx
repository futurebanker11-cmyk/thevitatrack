import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Mood & Depression Quiz for Seniors",
  description: "Screen for common mood concerns in seniors.",
  alternates: { canonical: "https://thevitatrack.com/tools/mood-check" },
  openGraph: {
    title: "Mood & Depression Quiz for Seniors",
    description: "Screen for common mood concerns in seniors.",
    url: "https://thevitatrack.com/tools/mood-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Mood & Depression Quiz for Seniors" description="Screen for common mood concerns in seniors." slug="mood-check" />
      {children}
    </>
  );
}
