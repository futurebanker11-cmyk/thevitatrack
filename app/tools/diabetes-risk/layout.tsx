import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Diabetes Risk Quiz for Seniors",
  description: "Assess your type 2 diabetes risk factors.",
  alternates: { canonical: "https://thevitatrack.com/tools/diabetes-risk" },
  openGraph: {
    title: "Diabetes Risk Quiz for Seniors",
    description: "Assess your type 2 diabetes risk factors.",
    url: "https://thevitatrack.com/tools/diabetes-risk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Diabetes Risk Quiz for Seniors" description="Assess your type 2 diabetes risk factors." slug="diabetes-risk" />
      {children}
    </>
  );
}
