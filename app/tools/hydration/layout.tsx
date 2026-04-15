import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Hydration Calculator for Seniors",
  description: "Calculate daily water intake needs.",
  alternates: { canonical: "https://thevitatrack.com/tools/hydration" },
  openGraph: {
    title: "Hydration Calculator for Seniors",
    description: "Calculate daily water intake needs.",
    url: "https://thevitatrack.com/tools/hydration",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Hydration Calculator for Seniors" description="Calculate daily water intake needs." slug="hydration" />
      {children}
    </>
  );
}
