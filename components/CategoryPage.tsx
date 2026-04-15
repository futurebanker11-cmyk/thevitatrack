import { getArticlesByCategory } from '@/lib/articles';
import Header from '@/components/Header';
import AdUnit from '@/components/AdUnit';
import BundleCTA from '@/components/BundleCTA';
import Link from 'next/link';

interface CategoryPageProps {
  category: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgGradient: string;
}

export default function CategoryPage({ category, title, subtitle, icon, color, bgGradient }: CategoryPageProps) {
  const articles = getArticlesByCategory(category);
  const count = articles.length;

  return (
    <>
      <Header />
      <style>{`
        .cat-hero{background:${bgGradient};color:#fff;padding:48px 20px 40px;text-align:center;position:relative;overflow:hidden}
        .cat-hero::before{content:'';position:absolute;top:-30%;right:-10%;width:400px;height:400px;background:radial-gradient(circle,rgba(255,255,255,.08) 0%,transparent 70%);pointer-events:none}
        .cat-hero-icon{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:14px;background:rgba(255,255,255,.15);font-size:24px;margin-bottom:14px}
        .cat-hero h1{font-size:clamp(26px,5vw,38px);font-weight:700;line-height:1.15;margin:0 0 10px;font-family:'Fraunces',serif}
        .cat-hero p{font-size:17px;opacity:.88;max-width:500px;margin:0 auto 16px;line-height:1.5}
        .cat-hero-count{display:inline-block;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);border-radius:100px;padding:5px 18px;font-size:13px;font-weight:600}
        .cat-main{max-width:1060px;margin:0 auto;padding:0 20px}
        .cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px;margin:28px 0}
        .cat-card{display:flex;gap:14px;align-items:flex-start;background:#fff;border:1px solid #E8E6E1;border-radius:12px;padding:16px 18px;text-decoration:none;color:#2C2C2A;cursor:pointer;transition:transform 200ms,box-shadow 200ms,border-color 200ms}
        .cat-card:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.07);border-color:#c5c3be}
        .cat-card:active{transform:translateY(0)}
        .cat-card-accent{width:4px;min-height:40px;border-radius:4px;background:${color};flex-shrink:0;margin-top:2px;opacity:.7}
        .cat-card:hover .cat-card-accent{opacity:1}
        .cat-card-body{flex:1;min-width:0}
        .cat-card h2{font-size:.95rem;font-weight:700;color:#14442A;margin:0 0 5px;line-height:1.35}
        .cat-card p{font-size:.82rem;color:#717170;line-height:1.5;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .cat-card-go{color:${color};font-size:16px;font-weight:700;flex-shrink:0;opacity:0;transition:opacity 200ms,transform 200ms;margin-top:4px}
        .cat-card:hover .cat-card-go{opacity:1;transform:translateX(2px)}
        @media(max-width:768px){.cat-hero{padding:36px 16px 32px}.cat-hero h1{font-size:24px}.cat-grid{grid-template-columns:1fr;gap:10px}.cat-main{padding:0 16px}.cat-card{padding:14px 16px}}
      `}</style>

      <section className="cat-hero">
        <div className="cat-hero-icon">{icon}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <span className="cat-hero-count">{count} guides available</span>
      </section>

      <div className="cat-main">
        <AdUnit slot="8981383031" />

        <div className="cat-grid">
          {articles.map(a => (
            <Link key={a.slug} href={'/' + category + '/' + a.slug} className="cat-card">
              <div className="cat-card-accent" />
              <div className="cat-card-body">
                <h2>{a.title}</h2>
                {a.excerpt && <p>{a.excerpt.substring(0, 120)}</p>}
              </div>
              <span className="cat-card-go">→</span>
            </Link>
          ))}
        </div>

        <BundleCTA variant="default" />
        <AdUnit slot="3333737430" />
      </div>
    </>
  );
}
