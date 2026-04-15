import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Muscle Loss Risk Quiz",
  description: "Sarcopenia risk screening for seniors.",
  alternates: { canonical: "https://thevitatrack.com/tools/muscle-loss-risk" },
  openGraph: {
    title: "Muscle Loss Risk Quiz",
    description: "Sarcopenia risk screening for seniors.",
    url: "https://thevitatrack.com/tools/muscle-loss-risk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Muscle Loss Risk Quiz" description="Sarcopenia risk screening for seniors." slug="muscle-loss-risk" />
      {children}
    </>
  );
}
