import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Living Tips for Seniors | VitaTrack',
  description: 'Practical daily routines and safety tips for healthy senior living. Morning routines, medication management, home safety.',
  alternates: { canonical: 'https://thevitatrack.com/daily-living' },
};

export default function DailyLivingPage() {
  return (
    <CategoryPage
      category="daily-living"
      title="Daily Living Tips"
      subtitle="Practical routines, safety tips, and daily habits that make a real difference in quality of life after 60."
      icon="🏠"
      color="#7C3AED"
      bgGradient="linear-gradient(135deg, #4C1D95 0%, #7C3AED 60%, #A78BFA 100%)"
    />
  );
}
