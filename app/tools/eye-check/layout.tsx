import type { Metadata } from 'next';
import { ToolJsonLd } from '@/components/ArticleSchema';

export const metadata: Metadata = {
  title: "Eye Health Quiz for Seniors",
  description: "Quick eye health risk assessment for seniors.",
  alternates: { canonical: "https://thevitatrack.com/tools/eye-check" },
  openGraph: {
    title: "Eye Health Quiz for Seniors",
    description: "Quick eye health risk assessment for seniors.",
    url: "https://thevitatrack.com/tools/eye-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolJsonLd name="Eye Health Quiz for Seniors" description="Quick eye health risk assessment for seniors." slug="eye-check" />
      {children}
    </>
  );
}
