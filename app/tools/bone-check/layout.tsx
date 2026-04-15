import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Bone Health & Osteoporosis Risk Quiz",
  description: "Quick bone health assessment for seniors over 60.",
  alternates: { canonical: "https://thevitatrack.com/tools/bone-check" },
  openGraph: {
    title: "Bone Health & Osteoporosis Risk Quiz",
    description: "Quick bone health assessment for seniors over 60.",
    url: "https://thevitatrack.com/tools/bone-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Bone Health & Osteoporosis Risk Quiz" description="Quick bone health assessment for seniors over 60." slug="bone-check" />
      {children}
    </>
  );
}
