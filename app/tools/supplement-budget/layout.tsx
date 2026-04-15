import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Supplement Budget Planner",
  description: "Build a supplement stack within your budget. Prioritized by health condition and evidence level.",
  alternates: { canonical: "https://thevitatrack.com/tools/supplement-budget" },
  openGraph: {
    title: "Supplement Budget Planner",
    description: "Build a supplement stack within your budget. Prioritized by health condition and evidence level.",
    url: "https://thevitatrack.com/tools/supplement-budget",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
