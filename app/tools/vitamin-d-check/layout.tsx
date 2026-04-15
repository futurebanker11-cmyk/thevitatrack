import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Vitamin D Deficiency Risk Quiz",
  description: "Check your vitamin D deficiency risk.",
  alternates: { canonical: "https://thevitatrack.com/tools/vitamin-d-check" },
  openGraph: {
    title: "Vitamin D Deficiency Risk Quiz",
    description: "Check your vitamin D deficiency risk.",
    url: "https://thevitatrack.com/tools/vitamin-d-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Vitamin D Deficiency Risk Quiz" description="Check your vitamin D deficiency risk." slug="vitamin-d-check" />
      {children}
    </>
  );
}
