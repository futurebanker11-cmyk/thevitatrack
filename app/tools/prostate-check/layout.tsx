import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Prostate Health Quiz for Men Over 50",
  description: "Prostate symptom assessment. BPH screening with personalized guidance.",
  alternates: { canonical: "https://thevitatrack.com/tools/prostate-check" },
  openGraph: {
    title: "Prostate Health Quiz for Men Over 50",
    description: "Prostate symptom assessment. BPH screening with personalized guidance.",
    url: "https://thevitatrack.com/tools/prostate-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
