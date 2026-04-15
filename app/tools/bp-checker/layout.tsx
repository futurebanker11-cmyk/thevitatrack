import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blood Pressure Checker by Age",
  description: "Check if your blood pressure reading is normal for your age. Age-adjusted BP ranges for seniors over 60.",
  alternates: { canonical: "https://thevitatrack.com/tools/bp-checker" },
  openGraph: {
    title: "Blood Pressure Checker by Age",
    description: "Check if your blood pressure reading is normal for your age. Age-adjusted BP ranges for seniors over 60.",
    url: "https://thevitatrack.com/tools/bp-checker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
