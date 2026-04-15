import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '7-Day Health Plans for Seniors | VitaTrack',
  description: 'Structured 7-day health plans to improve specific areas of senior health. Brain boost, kidney reset, prostate comfort.',
  alternates: { canonical: 'https://thevitatrack.com/plans' },
};

export default function PlansPage() {
  return (
    <CategoryPage
      category="plans"
      title="7-Day Health Plans"
      subtitle="Structured week-long plans with daily action steps to improve specific areas of your health."
      icon="📋"
      color="#2563EB"
      bgGradient="linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #60A5FA 100%)"
    />
  );
}
