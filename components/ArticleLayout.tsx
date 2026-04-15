import AdUnit from './AdUnit';
import Link from 'next/link';

export default function ArticleLayout({ title, category, children }: { title: string; category?: string; children: React.ReactNode }) {
  return (
    <main>
      {/* Top Ad */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '16px 20px 0' }}>
        {category && (
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.9rem' }}>
            <Link href="/" style={{ color: '#717170', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#B0B0A8', margin: '0 8px' }}>/</span>
            <Link href={`/${category}`} style={{ color: '#1E6B3E', textDecoration: 'none', fontWeight: 500, textTransform: 'capitalize' }}>
              {category.replace('-', ' ')}
            </Link>
          </nav>
        )}
        <AdUnit slot="8981383031" format="auto" />
      </div>

      {/* Article content (has its own styling) */}
      {children}

      {/* Bottom Ads */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <AdUnit slot="1775331881" format="fluid" layout="in-article" />
        <AdUnit slot="3333737430" format="auto" />
      </div>
    </main>
  );
}
