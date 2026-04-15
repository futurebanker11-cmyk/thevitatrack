import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Kidney Health Risk Quiz",
  description: "Quick kidney health screening. Check early warning signs and risk factors for kidney disease.",
  alternates: { canonical: "https://thevitatrack.com/tools/kidney-check" },
  openGraph: {
    title: "Kidney Health Risk Quiz",
    description: "Quick kidney health screening. Check early warning signs and risk factors for kidney disease.",
    url: "https://thevitatrack.com/tools/kidney-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
