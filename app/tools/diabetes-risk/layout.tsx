import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Diabetes Risk Quiz for Seniors",
  description: "Assess your type 2 diabetes risk. Quick screening quiz with personalized prevention recommendations.",
  alternates: { canonical: "https://thevitatrack.com/tools/diabetes-risk" },
  openGraph: {
    title: "Diabetes Risk Quiz for Seniors",
    description: "Assess your type 2 diabetes risk. Quick screening quiz with personalized prevention recommendations.",
    url: "https://thevitatrack.com/tools/diabetes-risk",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
