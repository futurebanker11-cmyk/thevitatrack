import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "GLP-1 Weight Loss Calculator",
  description: "Projected weight loss on Ozempic, Wegovy, Mounjaro.",
  alternates: { canonical: "https://thevitatrack.com/tools/glp1-calculator" },
  openGraph: {
    title: "GLP-1 Weight Loss Calculator",
    description: "Projected weight loss on Ozempic, Wegovy, Mounjaro.",
    url: "https://thevitatrack.com/tools/glp1-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="GLP-1 Weight Loss Calculator" description="Projected weight loss on Ozempic, Wegovy, Mounjaro." slug="glp1-calculator" />
      {children}
    </>
  );
}
