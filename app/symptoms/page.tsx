import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Symptom Guides for Seniors | VitaTrack',
  description: 'Clear symptom guides for seniors. Understand what your symptoms mean, when to see a doctor, and what to do at home.',
  alternates: { canonical: 'https://thevitatrack.com/symptoms' },
};

export default function SymptomsPage() {
  return (
    <CategoryPage
      category="symptoms"
      title="Symptom Guides"
      subtitle="Understand what your symptoms mean, when to see a doctor, and safe first steps you can take at home."
      icon="🔍"
      color="#0B6B5C"
      bgGradient="linear-gradient(135deg, #064E3B 0%, #0B6B5C 60%, #10B981 100%)"
    />
  );
}
