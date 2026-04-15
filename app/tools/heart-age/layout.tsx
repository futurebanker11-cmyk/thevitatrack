import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Heart Age Calculator for Seniors",
  description: "Estimate your heart age based on lifestyle factors. Compare to your actual age and get improvement tips.",
  alternates: { canonical: "https://thevitatrack.com/tools/heart-age" },
  openGraph: {
    title: "Heart Age Calculator for Seniors",
    description: "Estimate your heart age based on lifestyle factors. Compare to your actual age and get improvement tips.",
    url: "https://thevitatrack.com/tools/heart-age",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
