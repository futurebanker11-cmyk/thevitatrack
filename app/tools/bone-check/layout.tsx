import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Bone Health & Osteoporosis Risk Quiz",
  description: "Quick bone health assessment for seniors. Check your osteoporosis risk factors and get prevention tips.",
  alternates: { canonical: "https://thevitatrack.com/tools/bone-check" },
  openGraph: {
    title: "Bone Health & Osteoporosis Risk Quiz",
    description: "Quick bone health assessment for seniors. Check your osteoporosis risk factors and get prevention tips.",
    url: "https://thevitatrack.com/tools/bone-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
