import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Calorie Calculator for Seniors",
  description: "Daily calorie needs adjusted for seniors over 60.",
  alternates: { canonical: "https://thevitatrack.com/tools/calorie-calculator" },
  openGraph: {
    title: "Calorie Calculator for Seniors",
    description: "Daily calorie needs adjusted for seniors over 60.",
    url: "https://thevitatrack.com/tools/calorie-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Calorie Calculator for Seniors" description="Daily calorie needs adjusted for seniors over 60." slug="calorie-calculator" />
      {children}
    </>
  );
}
