import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Memory & Brain Health Quiz",
  description: "Quick cognitive health screening for seniors. Assess memory concerns and get action steps.",
  alternates: { canonical: "https://thevitatrack.com/tools/memory-check" },
  openGraph: {
    title: "Memory & Brain Health Quiz",
    description: "Quick cognitive health screening for seniors. Assess memory concerns and get action steps.",
    url: "https://thevitatrack.com/tools/memory-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
