import Link from 'next/link';
import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Health Products for Seniors | VitaTrack',
  description: 'Curated health products for adults over 60. Blood sugar monitors, dental care, health devices, and travel essentials.',
  alternates: { canonical: 'https://thevitatrack.com/shop' },
};

const categories = [
  { slug: 'blood-sugar-heart', name: 'Blood Sugar & Heart', desc: 'Monitors, supplements, and essentials for blood sugar and heart health', icon: '❤️' },
  { slug: 'dental', name: 'Dental & Oral Health', desc: 'Electric toothbrushes, water flossers, and senior-friendly dental products', icon: '🦷' },
  { slug: 'health-devices', name: 'Health Monitoring Devices', desc: 'Blood pressure monitors, pulse oximeters, and home health equipment', icon: '📊' },
  { slug: 'travel', name: 'Travel Essentials', desc: 'Pill organizers, compression socks, and must-haves for senior travelers', icon: '✈️' },
];

export default function ShopPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ color: '#14442A', fontSize: '2rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'Fraunces, serif' }}>
          Shop Health Products
        </h1>
        <p style={{ color: '#555550', marginBottom: '32px', fontSize: '1.05rem' }}>
          Curated product recommendations for adults over 60. Every product is selected based on quality, reviews, and senior-friendliness.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {categories.map(c => (
            <Link key={c.slug} href={'/shop/' + c.slug} className="article-card" style={{ textAlign: 'center', padding: '28px 20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{c.icon}</div>
              <h2>{c.name}</h2>
              <p>{c.desc}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
