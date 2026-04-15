import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Heart Age Calculator for Seniors",
  description: "Estimate your heart age based on lifestyle.",
  alternates: { canonical: "https://thevitatrack.com/tools/heart-age" },
  openGraph: {
    title: "Heart Age Calculator for Seniors",
    description: "Estimate your heart age based on lifestyle.",
    url: "https://thevitatrack.com/tools/heart-age",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Heart Age Calculator for Seniors" description="Estimate your heart age based on lifestyle." slug="heart-age" />
      {children}
    </>
  );
}
