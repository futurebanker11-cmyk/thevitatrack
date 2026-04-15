import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Prostate Health Quiz",
  description: "Prostate symptom assessment for men over 50.",
  alternates: { canonical: "https://thevitatrack.com/tools/prostate-check" },
  openGraph: {
    title: "Prostate Health Quiz",
    description: "Prostate symptom assessment for men over 50.",
    url: "https://thevitatrack.com/tools/prostate-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Prostate Health Quiz" description="Prostate symptom assessment for men over 50." slug="prostate-check" />
      {children}
    </>
  );
}
