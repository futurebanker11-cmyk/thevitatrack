import { getArticlesByCategory } from '@/lib/articles';
import Header from '@/components/Header';
import AdUnit from '@/components/AdUnit';
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
        .cat-hero {
          background: ${bgGradient};
          color: #fff;
          padding: 56px 20px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cat-hero::before {
          content: '';
          position: absolute;
          top: -30%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .cat-hero-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(255,255,255,0.15);
          font-size: 28px;
          margin-bottom: 16px;
        }
        .cat-hero h1 {
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 700;
          line-height: 1.15;
          margin: 0 0 12px;
          font-family: 'Fraunces', serif;
        }
        .cat-hero p {
          font-size: 18px;
          opacity: 0.88;
          max-width: 520px;
          margin: 0 auto 20px;
          line-height: 1.55;
        }
        .cat-hero-count {
          display: inline-block;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 100px;
          padding: 6px 20px;
          font-size: 14px;
          font-weight: 600;
        }
        .cat-main {
          max-width: 1060px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .cat-search {
          max-width: 480px;
          margin: -24px auto 0;
          position: relative;
          z-index: 10;
        }
        .cat-search input {
          width: 100%;
          padding: 14px 20px 14px 48px;
          border: 2px solid #E8E6E1;
          border-radius: 14px;
          font-size: 16px;
          font-family: inherit;
          background: #fff;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          outline: none;
          transition: border-color 200ms;
        }
        .cat-search input:focus {
          border-color: ${color};
        }
        .cat-search svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          stroke: #717170;
          fill: none;
        }
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 14px;
          margin: 32px 0;
        }
        .cat-card {
          display: block;
          background: #fff;
          border: 1px solid #E8E6E1;
          border-radius: 14px;
          padding: 20px 22px;
          text-decoration: none;
          color: #2C2C2A;
          transition: transform 200ms, box-shadow 200ms, border-color 200ms;
          cursor: pointer;
          position: relative;
        }
        .cat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          border-color: #c5c3be;
        }
        .cat-card:active { transform: translateY(0); }
        .cat-card h2 {
          font-size: 1rem;
          font-weight: 700;
          color: #14442A;
          margin: 0 0 8px;
          line-height: 1.4;
        }
        .cat-card p {
          font-size: 0.85rem;
          color: #717170;
          line-height: 1.55;
          margin: 0;
        }
        .cat-card-arrow {
          position: absolute;
          top: 20px;
          right: 18px;
          font-size: 14px;
          color: ${color};
          font-weight: 700;
          opacity: 0;
          transition: opacity 200ms, transform 200ms;
        }
        .cat-card:hover .cat-card-arrow {
          opacity: 1;
          transform: translateX(3px);
        }
        .cat-section-title {
          font-size: 15px;
          font-weight: 700;
          color: #717170;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin: 40px 0 16px;
          padding-bottom: 10px;
          border-bottom: 2px solid #E8E6E1;
        }
        @media (max-width: 768px) {
          .cat-hero { padding: 40px 16px 36px; }
          .cat-hero h1 { font-size: 26px; }
          .cat-grid { grid-template-columns: 1fr; }
          .cat-main { padding: 0 16px; }
        }
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
              <h2>{a.title}</h2>
              {a.excerpt && <p>{a.excerpt.substring(0, 120)}...</p>}
              <span className="cat-card-arrow">→</span>
            </Link>
          ))}
        </div>

        <AdUnit slot="3333737430" />
      </div>
    </>
  );
}
