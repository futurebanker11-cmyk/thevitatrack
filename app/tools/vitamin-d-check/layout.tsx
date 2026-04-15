import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Vitamin D Deficiency Risk Quiz",
  description: "Are you at risk for vitamin D deficiency? Quick screening with dosage recommendations.",
  alternates: { canonical: "https://thevitatrack.com/tools/vitamin-d-check" },
  openGraph: {
    title: "Vitamin D Deficiency Risk Quiz",
    description: "Are you at risk for vitamin D deficiency? Quick screening with dosage recommendations.",
    url: "https://thevitatrack.com/tools/vitamin-d-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
