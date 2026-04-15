import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Memory & Brain Health Quiz",
  description: "Quick cognitive health screening for seniors.",
  alternates: { canonical: "https://thevitatrack.com/tools/memory-check" },
  openGraph: {
    title: "Memory & Brain Health Quiz",
    description: "Quick cognitive health screening for seniors.",
    url: "https://thevitatrack.com/tools/memory-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Memory & Brain Health Quiz" description="Quick cognitive health screening for seniors." slug="memory-check" />
      {children}
    </>
  );
}
