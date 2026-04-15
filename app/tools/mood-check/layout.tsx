import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mood & Depression Quiz for Seniors",
  description: "Screen for common mood concerns. Quick, confidential assessment with next-step guidance.",
  alternates: { canonical: "https://thevitatrack.com/tools/mood-check" },
  openGraph: {
    title: "Mood & Depression Quiz for Seniors",
    description: "Screen for common mood concerns. Quick, confidential assessment with next-step guidance.",
    url: "https://thevitatrack.com/tools/mood-check",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
