import AdUnit from './AdUnit';
import Link from 'next/link';

export default function ArticleLayout({ title, category, children }: { title: string; category?: string; children: React.ReactNode }) {
  return (
    <main style={{ maxWidth: '820px', margin: '0 auto', padding: '36px 20px 60px' }}>
      {/* Breadcrumb */}
      {category && (
        <nav aria-label="Breadcrumb" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
          <Link href="/" style={{ color: '#717170', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: '#B0B0A8', margin: '0 8px' }}>/</span>
          <Link href={`/${category}`} style={{ color: '#1E6B3E', textDecoration: 'none', fontWeight: 500, textTransform: 'capitalize' }}>
            {category.replace('-', ' ')}
          </Link>
        </nav>
      )}

      <h1 style={{ fontSize: '1.9rem', fontWeight: 700, color: '#14442A', marginBottom: '20px', lineHeight: 1.3, fontFamily: 'Fraunces, serif' }}>
        {title}
      </h1>

      {/* Top Ad */}
      <AdUnit slot="8981383031" format="auto" />

      {/* Article content */}
      <div className="article-content">{children}</div>

      {/* Mid in-article Ad */}
      <AdUnit slot="1775331881" format="fluid" layout="in-article" />

      {/* Bottom Ad */}
      <AdUnit slot="3333737430" format="auto" />
    </main>
  );
}
