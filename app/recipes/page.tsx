import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Senior-Friendly Recipes | VitaTrack',
  description: 'Nutritious, easy-to-make recipes designed for seniors. Low-sodium, diabetic-friendly, kidney-safe options.',
  alternates: { canonical: 'https://thevitatrack.com/recipes' },
};

export default function RecipesPage() {
  return (
    <CategoryPage
      category="recipes"
      title="Senior-Friendly Recipes"
      subtitle="Nutritious, easy-to-make meals and drinks designed for adults over 60. Low-sodium, diabetic-friendly options."
      icon="🥗"
      color="#D97706"
      bgGradient="linear-gradient(135deg, #92400E 0%, #D97706 60%, #F59E0B 100%)"
    />
  );
}
