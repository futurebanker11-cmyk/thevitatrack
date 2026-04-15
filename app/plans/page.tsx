import { getArticlesByCategory } from '@/lib/articles';
import Header from '@/components/Header';
import AdUnit from '@/components/AdUnit';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '7-Day Health Plans | VitaTrack',
  description: 'Structured 7-day health plans to improve specific areas of senior health.',
  alternates: { canonical: 'https://thevitatrack.com/plans' },
};

export default function HealthPlansPage() {
  const articles = getArticlesByCategory('plans');
  return (
    <>
      <Header />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ color: '#14442A', fontSize: '2rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'Fraunces, serif' }}>
          7-Day Health Plans
        </h1>
        <p style={{ color: '#555550', marginBottom: '32px', fontSize: '1.05rem' }}>Structured 7-day health plans to improve specific areas of senior health.</p>

        <AdUnit slot="8981383031" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', margin: '32px 0' }}>
          {articles.map(a => (
            <Link key={a.slug} href={'/plans/' + a.slug} className="article-card">
              <h2>{a.title}</h2>
              {a.excerpt && <p>{a.excerpt.substring(0, 100)}...</p>}
            </Link>
          ))}
        </div>

        <AdUnit slot="3333737430" />
      </main>
    </>
  );
}
