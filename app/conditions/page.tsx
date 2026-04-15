import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Conditions — Senior Guides | VitaTrack',
  description: 'Evidence-based guides for seniors on managing common health conditions. Diabetes, heart disease, arthritis, kidney health, and more.',
  alternates: { canonical: 'https://thevitatrack.com/conditions' },
};

export default function ConditionsPage() {
  return (
    <CategoryPage
      category="conditions"
      title="Health Conditions"
      subtitle="Evidence-based guides on managing common health conditions after 60. Written in plain language with action steps."
      icon="🩺"
      color="#1A5632"
      bgGradient="linear-gradient(135deg, #14442A 0%, #1E6B3E 60%, #22874a 100%)"
    />
  );
}
