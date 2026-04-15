import { getArticlesByCategory } from '@/lib/articles';
import Header from '@/components/Header';
import AdUnit from '@/components/AdUnit';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Conditions | VitaTrack',
  description: 'Evidence-based guides for seniors on managing common health conditions.',
  alternates: { canonical: 'https://thevitatrack.com/conditions' },
};

export default function HealthConditionsPage() {
  const articles = getArticlesByCategory('conditions');
  return (
    <>
      <Header />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ color: '#14442A', fontSize: '2rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'Fraunces, serif' }}>
          Health Conditions
        </h1>
        <p style={{ color: '#555550', marginBottom: '32px', fontSize: '1.05rem' }}>Evidence-based guides for seniors on managing common health conditions.</p>

        <AdUnit slot="8981383031" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', margin: '32px 0' }}>
          {articles.map(a => (
            <Link key={a.slug} href={'/conditions/' + a.slug}
              style={{ display: 'block', padding: '20px', background: '#fff', borderRadius: '12px', border: '1px solid #E8E6E1', textDecoration: 'none' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#14442A', marginBottom: '8px', lineHeight: 1.4 }}>{a.title}</h2>
              {a.excerpt && <p style={{ fontSize: '0.85rem', color: '#717170', lineHeight: 1.5 }}>{a.excerpt.substring(0, 100)}...</p>}
            </Link>
          ))}
        </div>

        <AdUnit slot="3333737430" />
      </main>
    </>
  );
}
