import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Blood Pressure Checker by Age",
  description: "Check if your blood pressure is normal for your age.",
  alternates: { canonical: "https://thevitatrack.com/tools/bp-checker" },
  openGraph: {
    title: "Blood Pressure Checker by Age",
    description: "Check if your blood pressure is normal for your age.",
    url: "https://thevitatrack.com/tools/bp-checker",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Blood Pressure Checker by Age" description="Check if your blood pressure is normal for your age." slug="bp-checker" />
      {children}
    </>
  );
}
