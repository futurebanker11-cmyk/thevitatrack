import AdUnit from './AdUnit';

export default function ArticleLayout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main style={{ maxWidth: '820px', margin: '0 auto', padding: '36px 20px 60px' }}>
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
