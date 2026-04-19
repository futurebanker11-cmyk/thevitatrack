import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sublingual B12 for Seniors: Why It Works Better (2026)',
  description: 'Sublingual B12 absorbs directly through the mouth lining, bypassing stomach acid entirely. This guide explains why seniors benefit most, how to use it correctly, and how it compares to tablets and injections.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/sublingual' },
  openGraph: {
    title: 'Sublingual B12 for Seniors: Why It Works Better',
    description: 'Sublingual B12 bypasses stomach acid — the biggest B12 absorption barrier in seniors. Complete guide with dosage and technique.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/sublingual',
    type: 'article',
  },
};

const faqs = [
  { q: 'What does sublingual B12 mean?', a: 'Sublingual means "under the tongue." Sublingual B12 is a small tablet or liquid that you place under your tongue and let dissolve. The B12 absorbs directly through the mucous membrane into the bloodstream — completely bypassing the stomach, digestive enzymes, and the absorption mechanism that requires intrinsic factor and stomach acid.' },
  { q: 'Is sublingual B12 really absorbed better than a swallowed tablet?', a: 'For seniors with reduced stomach acid or those on PPIs and metformin, yes — sublingual absorption is significantly more reliable. Swallowed tablets still need some stomach function to work optimally. Studies comparing sublingual methylcobalamin to intramuscular injections found similar blood level responses, confirming that sublingual delivery achieves near-complete absorption in most people.' },
  { q: 'How do you use sublingual B12 correctly?', a: 'Place the tablet under your tongue (not on top, and not swallowed). Keep your mouth closed and let it dissolve completely — this takes 30–90 seconds depending on the formulation. Do not eat or drink for 5–10 minutes before or after to keep the mucous membrane moist and clear. Morning, on an empty stomach, is the ideal time.' },
  { q: 'What is the best sublingual B12 dose for seniors?', a: '500–1,000 mcg is the standard sublingual dose for seniors. At 1,000 mcg, even if only 50% of the sublingual dose absorbs (a conservative estimate), you are still delivering 500 mcg — far exceeding the daily requirement. Most seniors should start at 1,000 mcg and retest blood levels after 3 months.' },
  { q: 'Is sublingual methylcobalamin or cyanocobalamin better?', a: 'Methylcobalamin is the preferred form for sublingual use because it is the active, neurologically active form of B12 that does not require conversion in the liver. Cyanocobalamin must be converted to methylcobalamin and adenosylcobalamin before the body can use it — a step that may be impaired in some seniors with liver conditions or MTHFR gene variants.' },
];

export default function SublingualPage() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="Sublingual B12 for Seniors: Why It Works Better" description="Sublingual B12 dissolves under the tongue and absorbs directly into the bloodstream, bypassing stomach acid entirely. Guide to dosage, technique, and comparisons for seniors." url="https://thevitatrack.com/b12-dosage-seniors/sublingual" />
      <ChildBreadcrumbJsonLd slug="sublingual" label="Sublingual B12 for Seniors" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>Sublingual</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            💊 Supplement Form Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            Sublingual B12 for Seniors: The Form That Bypasses Every Absorption Barrier
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            The biggest challenge with B12 for seniors is not the dose — it is getting the B12 past a stomach that no longer works the way it did at 40. Sublingual absorption sidesteps the problem entirely.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#F0FAF3', border: '2px solid #1E6B3E', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '8px' }}>Why Sublingual Works for Seniors</strong>
          <p style={{ color: '#2C2C2A', lineHeight: 1.7, margin: 0 }}>
            Normal B12 absorption requires stomach acid and intrinsic factor — both of which decline with age and are blocked by common medications. Sublingual B12 dissolves under the tongue and enters the bloodstream directly through the mucous membrane, making stomach function completely irrelevant.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>How to Use Sublingual B12 Correctly</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '14px' }}>
          Most people use sublingual B12 incorrectly — placing it on top of the tongue where it mixes with saliva and gets swallowed. This defeats the purpose. Here is the right technique:
        </p>
        {[
          ['1', 'Take it on an empty stomach in the morning', 'Food and coffee can coat the mucous membrane and reduce absorption. Wait at least 10 minutes after waking if you drink water or coffee immediately.'],
          ['2', 'Place under the tongue — not on top, not between cheek and gum', 'The area under the tongue has a dense network of capillaries directly under a thin membrane. This is the highest-absorption site in the oral cavity.'],
          ['3', 'Hold for 30–90 seconds without swallowing', 'The tablet should dissolve completely. Resist the urge to swallow — let the liquid pool under your tongue until it is fully absorbed.'],
          ['4', 'Do not eat or drink for 5 minutes after', 'Rinsing the mouth immediately after washes away any remaining B12 before it can absorb.'],
        ].map(([num, step, detail]) => (
          <div key={num} style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
            <div style={{ width: '32px', height: '32px', background: '#1E6B3E', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: '0.9rem' }}>{num}</div>
            <div>
              <strong style={{ color: '#14442A', display: 'block' }}>{step}</strong>
              <p style={{ color: '#555550', lineHeight: 1.65, marginTop: '4px', marginBottom: 0, fontSize: '0.9rem' }}>{detail}</p>
            </div>
          </div>
        ))}

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Sublingual vs. Swallowed Tablet vs. Injection</h2>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#14442A', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>Form</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>Needs Stomach Acid?</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>Absorption Rate</th>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>Best For</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Sublingual methylcobalamin', 'No', 'High (bypasses gut)', 'Age 70+, PPI/metformin users, vegans'],
                ['High-dose oral tablet (1,000 mcg)', 'Partial', 'Moderate (1% passive)', 'Age 60–69, most seniors'],
                ['Intramuscular injection', 'No', 'Near 100%', 'Severe deficiency, pernicious anemia'],
                ['Multivitamin (25 mcg)', 'Yes', 'Low to none in 60+', 'Not recommended as sole source'],
              ].map(([form, acid, rate, best], i) => (
                <tr key={form} style={{ background: i % 2 === 0 ? '#fff' : '#F7F6F3' }}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', fontWeight: 500 }}>{form}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', color: acid === 'No' ? '#1E6B3E' : '#D97706', fontWeight: 600 }}>{acid}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1' }}>{rate}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', color: '#555550', fontSize: '0.85rem' }}>{best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Get Your Personalized Recommendation</h2>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: Sublingual Methylcobalamin B12</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            Look for 1,000 mcg methylcobalamin in sublingual tablet form. Dissolves quickly, cherry or berry flavor is common, and it works even with severe gastric atrophy.
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
            <Link href="/b12-dosage-seniors/methylcobalamin" className="interlink">Methylcobalamin vs Cyanocobalamin for Seniors</Link>
            <Link href="/b12-dosage-seniors/ppi-users" className="interlink">B12 for Seniors on Omeprazole/PPIs</Link>
          </div>
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
