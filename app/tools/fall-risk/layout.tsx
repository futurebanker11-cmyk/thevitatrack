import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Fall Risk Assessment for Seniors",
  description: "Identify your fall risk factors.",
  alternates: { canonical: "https://thevitatrack.com/tools/fall-risk" },
  openGraph: {
    title: "Fall Risk Assessment for Seniors",
    description: "Identify your fall risk factors.",
    url: "https://thevitatrack.com/tools/fall-risk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Fall Risk Assessment for Seniors" description="Identify your fall risk factors." slug="fall-risk" />
      {children}
    </>
  );
}
