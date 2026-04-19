import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Methylcobalamin vs Cyanocobalamin for Seniors (2026): Which Is Better?',
  description: 'Should seniors take methylcobalamin or cyanocobalamin? This guide compares both forms — bioavailability, cost, MTHFR considerations, and which is the right choice for adults over 60.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/methylcobalamin' },
  openGraph: {
    title: 'Methylcobalamin vs Cyanocobalamin for Seniors',
    description: 'A practical comparison of both B12 forms for adults over 60 — what the science actually shows.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/methylcobalamin',
    type: 'article',
  },
};

const faqs = [
  { q: 'Is methylcobalamin better than cyanocobalamin for seniors?', a: 'For most seniors, both work well at the right dose. Methylcobalamin has a slight advantage because it is the active form that does not require hepatic conversion, and it is the preferred form for sublingual delivery. Cyanocobalamin is more stable (longer shelf life), less expensive, and has decades of clinical trial data behind it. Either works for routine supplementation at 500–1,000 mcg.' },
  { q: 'What is the difference between methylcobalamin and cyanocobalamin?', a: 'Both are forms of vitamin B12. Cyanocobalamin is the synthetic form used in most supplements and injections — it contains a cyanide molecule (in negligible, harmless amounts) and must be converted by the liver into the active forms. Methylcobalamin is already in active form and is found naturally in the body and in animal foods. It does not require conversion.' },
  { q: 'Who should specifically choose methylcobalamin over cyanocobalamin?', a: 'Seniors with MTHFR gene variants (which impair B vitamin methylation) benefit most from methylcobalamin. Those with liver disease, kidney disease, or poor conversion capacity also benefit. Anyone using sublingual delivery should choose methylcobalamin because it is the more bioavailable form at the mucosal surface. And for neurological deficiency — tingling, memory loss, balance issues — methylcobalamin is typically preferred.' },
  { q: 'Is cyanocobalamin safe for seniors?', a: 'Yes. The trace cyanide in cyanocobalamin is genuinely negligible — the amount is thousands of times lower than the safe exposure limit set by health agencies, and the body clears it rapidly. People with tobacco amblyopia (a rare eye condition in smokers) or Leber\'s disease should avoid cyanocobalamin, but for the vast majority of seniors it is completely safe.' },
  { q: 'Why is methylcobalamin more expensive?', a: 'Methylcobalamin is less stable than cyanocobalamin — it degrades faster when exposed to light, heat, and air. This makes manufacturing and storage more complex and costly. Cyanocobalamin is highly stable and can be stored at room temperature for years. For most seniors on a budget, cyanocobalamin at 1,000 mcg is an entirely appropriate and effective choice.' },
  { q: 'Can I switch from cyanocobalamin to methylcobalamin?', a: 'Yes, you can switch at any time. If you have been taking cyanocobalamin and your B12 levels are normal, switching to methylcobalamin maintains those levels with equal or better efficacy. If switching to correct a deficiency, use the same dose (500–1,000 mcg) in sublingual form for best results.' },
];

export default function MethylcobalaminPage() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="Methylcobalamin vs Cyanocobalamin for Seniors" description="Practical comparison of methylcobalamin and cyanocobalamin B12 for adults over 60 — bioavailability, MTHFR considerations, cost, and dosage recommendations." url="https://thevitatrack.com/b12-dosage-seniors/methylcobalamin" />
      <ChildBreadcrumbJsonLd slug="methylcobalamin" label="Methylcobalamin vs Cyanocobalamin" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>Methylcobalamin</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            🔬 Form Comparison Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            Methylcobalamin vs Cyanocobalamin for Seniors: Which Form Should You Take?
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            Both are B12. Both work. The debate between methylcobalamin and cyanocobalamin is real but often overhyped. Here is what actually matters for seniors and what you should spend your money on.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#F0FAF3', border: '2px solid #1E6B3E', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '8px' }}>Short Answer</strong>
          <p style={{ color: '#2C2C2A', lineHeight: 1.7, margin: 0 }}>
            For most seniors: <strong>either works.</strong> Prefer methylcobalamin if you are using sublingual form, have neurological symptoms, or have been told you have an MTHFR variant. Cyanocobalamin is fine for standard oral supplementation and costs significantly less.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Side-by-Side Comparison</h2>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#14442A', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>Feature</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Methylcobalamin</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Cyanocobalamin</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Active form (no conversion needed)', '✓ Yes', '✗ No — liver converts it'],
                ['Used in most clinical trials', '✗ Less common', '✓ Yes — decades of data'],
                ['Best for sublingual delivery', '✓ Yes', '✗ Less ideal'],
                ['Shelf life', 'Shorter — light sensitive', 'Longer — very stable'],
                ['Cost', 'Higher (~2–3×)', 'Lower'],
                ['Safe for smokers and Leber\'s disease', '✓ Yes', '✗ Should be avoided'],
                ['MTHFR gene variant benefit', '✓ Yes', 'Uncertain'],
                ['Neurological deficiency treatment', '✓ Preferred', 'Used in practice'],
              ].map(([feature, methyl, cyano], i) => (
                <tr key={feature} style={{ background: i % 2 === 0 ? '#fff' : '#F7F6F3' }}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', fontWeight: 500 }}>{feature}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', textAlign: 'center', color: methyl.startsWith('✓') ? '#1E6B3E' : methyl.startsWith('✗') ? '#DC2626' : '#555550', fontWeight: methyl.startsWith('✓') ? 600 : 400 }}>{methyl}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', textAlign: 'center', color: cyano.startsWith('✓') ? '#1E6B3E' : cyano.startsWith('✗') ? '#DC2626' : '#555550', fontWeight: cyano.startsWith('✓') ? 600 : 400 }}>{cyano}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>The MTHFR Factor</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          MTHFR is a gene that codes for an enzyme involved in B vitamin methylation. About 40–60% of the population carries at least one MTHFR variant, which can reduce the efficiency of converting cyanocobalamin to its active forms.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          If you know you have an MTHFR variant (identifiable through genetic testing like 23andMe), choosing methylcobalamin makes sense — it sidesteps the conversion step entirely. However, most people with MTHFR variants still convert cyanocobalamin adequately; the difference is meaningful mainly at high deficiency risk.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '24px' }}>
          For the average senior without known MTHFR status, the practical recommendation is simple: if you are correcting a neurological deficiency or using sublingual delivery, choose methylcobalamin. For routine maintenance, either form at 500–1,000 mcg will work.
        </p>

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Get Your Personalized Recommendation</h2>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: Methylcobalamin Sublingual B12</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            For seniors who want the active form with maximum sublingual bioavailability — methylcobalamin at 1,000 mcg is the gold standard.
          </p>
          <a href="https://amzn.to/4sEIoLH" target="_blank" rel="nofollow noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FF9900', color: '#000', textDecoration: 'none', padding: '11px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem' }}>
            🛒 View on Amazon
          </a>
          <p style={{ fontSize: '0.75rem', color: '#A16207', marginTop: '8px', marginBottom: 0 }}>Affiliate link — we may earn a small commission at no extra cost to you.</p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 14px', textAlign: 'center' }}>Frequently Asked Questions</h2>
        <div>
          {faqs.map(({ q, a }) => (
            <div key={q} className="faq-item" style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '12px', marginBottom: '10px', overflow: 'hidden' }}>
              <button className="faq-q" style={{ padding: '14px 20px', fontSize: '0.95rem', fontWeight: 600, color: '#2C2C2A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1.4 }}>
                {q}<span className="faq-icon" style={{ fontSize: '1.2rem', color: '#717170', flexShrink: 0 }}>+</span>
              </button>
              <div className="faq-a" style={{ padding: '0 20px 14px', fontSize: '0.9rem', color: '#555550', lineHeight: 1.7 }}>{a}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F0FAF3', border: '1px solid #B2DFC0', borderRadius: '10px', padding: '16px 20px', margin: '28px 0' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '8px' }}>Related pages</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Link href="/b12-dosage-seniors" className="interlink">← Back to: B12 Dosage for Seniors (Full Guide)</Link>
            <Link href="/b12-dosage-seniors/sublingual" className="interlink">Sublingual B12 for Seniors: Why It Works Better</Link>
            <Link href="/b12-dosage-seniors/1000-mcg" className="interlink">Is 1000 mcg B12 Too Much for Seniors?</Link>
          </div>
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
