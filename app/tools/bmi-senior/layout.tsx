import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "BMI Calculator for Seniors Over 60",
  description: "Free age-adjusted BMI calculator with senior-specific healthy ranges.",
  alternates: { canonical: "https://thevitatrack.com/tools/bmi-senior" },
  openGraph: {
    title: "BMI Calculator for Seniors Over 60",
    description: "Free age-adjusted BMI calculator with senior-specific healthy ranges.",
    url: "https://thevitatrack.com/tools/bmi-senior",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="BMI Calculator for Seniors Over 60" description="Free age-adjusted BMI calculator with senior-specific healthy ranges." slug="bmi-senior" />
      {children}
    </>
  );
}
