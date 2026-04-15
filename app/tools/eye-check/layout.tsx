import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Eye Health Quiz for Seniors",
  description: "Quick eye health risk assessment. Check for age-related vision concerns and when to see an eye doctor.",
  alternates: { canonical: "https://thevitatrack.com/tools/eye-check" },
  openGraph: {
    title: "Eye Health Quiz for Seniors",
    description: "Quick eye health risk assessment. Check for age-related vision concerns and when to see an eye doctor.",
    url: "https://thevitatrack.com/tools/eye-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
