import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "GLP-1 Weight Loss Calculator",
  description: "Projected weight loss on Ozempic, Wegovy, or Mounjaro. Age-adjusted calculator for seniors.",
  alternates: { canonical: "https://thevitatrack.com/tools/glp1-calculator" },
  openGraph: {
    title: "GLP-1 Weight Loss Calculator",
    description: "Projected weight loss on Ozempic, Wegovy, or Mounjaro. Age-adjusted calculator for seniors.",
    url: "https://thevitatrack.com/tools/glp1-calculator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
