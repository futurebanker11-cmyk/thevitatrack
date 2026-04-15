import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "BMI Calculator for Seniors Over 60",
  description: "Free age-adjusted BMI calculator. Healthy BMI after 65 is 23-30, not 18.5-25. Instant personalized results.",
  alternates: { canonical: "https://thevitatrack.com/tools/bmi-senior" },
  openGraph: {
    title: "BMI Calculator for Seniors Over 60",
    description: "Free age-adjusted BMI calculator. Healthy BMI after 65 is 23-30, not 18.5-25. Instant personalized results.",
    url: "https://thevitatrack.com/tools/bmi-senior",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
