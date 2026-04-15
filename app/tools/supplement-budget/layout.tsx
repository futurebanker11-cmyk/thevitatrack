import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Supplement Budget Planner",
  description: "Build a supplement stack within your budget.",
  alternates: { canonical: "https://thevitatrack.com/tools/supplement-budget" },
  openGraph: {
    title: "Supplement Budget Planner",
    description: "Build a supplement stack within your budget.",
    url: "https://thevitatrack.com/tools/supplement-budget",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Supplement Budget Planner" description="Build a supplement stack within your budget." slug="supplement-budget" />
      {children}
    </>
  );
}
