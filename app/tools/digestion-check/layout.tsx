import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Digestion & Gut Health Quiz",
  description: "Check your digestive health for seniors.",
  alternates: { canonical: "https://thevitatrack.com/tools/digestion-check" },
  openGraph: {
    title: "Digestion & Gut Health Quiz",
    description: "Check your digestive health for seniors.",
    url: "https://thevitatrack.com/tools/digestion-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Digestion & Gut Health Quiz" description="Check your digestive health for seniors." slug="digestion-check" />
      {children}
    </>
  );
}
