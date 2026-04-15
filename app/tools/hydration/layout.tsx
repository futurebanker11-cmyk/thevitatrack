import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hydration Calculator for Seniors",
  description: "Calculate your daily water intake needs based on age, weight, activity, and medications.",
  alternates: { canonical: "https://thevitatrack.com/tools/hydration" },
  openGraph: {
    title: "Hydration Calculator for Seniors",
    description: "Calculate your daily water intake needs based on age, weight, activity, and medications.",
    url: "https://thevitatrack.com/tools/hydration",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
