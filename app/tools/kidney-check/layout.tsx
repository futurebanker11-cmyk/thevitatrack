import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Kidney Health Risk Quiz",
  description: "Quick kidney health screening for seniors.",
  alternates: { canonical: "https://thevitatrack.com/tools/kidney-check" },
  openGraph: {
    title: "Kidney Health Risk Quiz",
    description: "Quick kidney health screening for seniors.",
    url: "https://thevitatrack.com/tools/kidney-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Kidney Health Risk Quiz" description="Quick kidney health screening for seniors." slug="kidney-check" />
      {children}
    </>
  );
}
