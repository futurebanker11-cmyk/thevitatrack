import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Calorie Calculator for Seniors Over 60",
  description: "Calculate daily calorie needs adjusted for age, activity level, and health goals after 60.",
  alternates: { canonical: "https://thevitatrack.com/tools/calorie-calculator" },
  openGraph: {
    title: "Calorie Calculator for Seniors Over 60",
    description: "Calculate daily calorie needs adjusted for age, activity level, and health goals after 60.",
    url: "https://thevitatrack.com/tools/calorie-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
