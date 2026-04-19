import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B12 Dosage for 70 Year Olds: Exact Guide (2026)',
  description: 'What is the right B12 dose for someone in their 70s? This guide covers the 100–500 mcg range, best form, deficiency rates in the 70–79 age band, and what blood tests to ask for.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/age-70' },
  openGraph: {
    title: 'B12 Dosage for 70 Year Olds (2026)',
    description: 'Adults in their 70s need far more B12 than the label suggests. Here is the exact dose and form for your age.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/age-70',
    type: 'article',
  },
};

const faqs = [
  { q: 'How much B12 does a 70-year-old need per day?', a: 'Adults in their 70s typically need 100–500 mcg of B12 daily from supplements. The government RDA of 2.4 mcg was designed for healthy young adults with normal stomach acid. By your 70s, reduced stomach acid, slower gut motility, and thinning stomach lining all impair B12 absorption significantly. Most doctors who specialize in geriatric care recommend at least 100 mcg daily as a maintenance dose.' },
  { q: 'What percentage of 70-year-olds are B12 deficient?', a: 'Studies estimate that 10–15% of adults aged 65–74 have low or borderline-low B12 levels. When the more sensitive methylmalonic acid (MMA) test is used — which catches functional deficiency even before serum B12 drops — the number is closer to 20–25%. Many are functionally deficient without knowing it.' },
  { q: 'Is 500 mcg of B12 too much for a 70-year-old?', a: 'No. 500 mcg is a standard, well-tolerated daily dose for adults in their 70s. B12 is water-soluble, and excess is excreted in urine. At this age, higher doses are often needed to compensate for declining absorption. No adverse effects from 500 mcg have been documented in healthy adults.' },
  { q: 'Should I take B12 separately or in a B-complex at age 70?', a: 'For most 70-year-olds, a standalone B12 supplement at 100–500 mcg plus a moderate-dose B-complex (not a mega-dose formula) is the most targeted approach. B-complex vitamins support each other, but the doses in many multivitamins are too low to address the specific absorption challenges of the 70+ age group.' },
  { q: 'What form of B12 works best in your 70s?', a: 'Sublingual methylcobalamin or a high-dose cyanocobalamin tablet both work well in your 70s. Sublingual form is particularly helpful if you take PPIs, metformin, or have been told your stomach acid is low. It dissolves under the tongue and absorbs without needing any digestive processes.' },
];

export default function Age70Page() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="B12 Dosage for 70 Year Olds" description="Adults in their 70s need 100–500 mcg of B12 daily from supplements. This guide covers dosage, best forms, deficiency rates in the 70–79 age band, and testing." url="https://thevitatrack.com/b12-dosage-seniors/age-70" />
      <ChildBreadcrumbJsonLd slug="age-70" label="B12 Dosage at Age 70" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>Age 70</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            💊 Age-Specific Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            B12 Dosage for 70 Year Olds: What Changes at This Age and What to Take
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            Your 70s are when B12 absorption starts to slip meaningfully — not because of one thing, but because several age-related changes stack on top of each other. Here is what shifts at 70 and what to do about it.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#F0FAF3', border: '2px solid #1E6B3E', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '8px' }}>Quick Answer for 70-Year-Olds</strong>
          <p style={{ color: '#2C2C2A', lineHeight: 1.7, margin: 0 }}>
            Take <strong>100–500 mcg of B12 daily</strong>, preferably methylcobalamin in tablet or sublingual form. Test your levels at least every 2 years — request both serum B12 and methylmalonic acid (MMA) for the most accurate picture.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>What Happens to B12 Absorption in Your 70s</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          B12 from food requires a precise chain of events to be absorbed: stomach acid releases B12 from food proteins, then a stomach protein called intrinsic factor binds to it, and the combination is absorbed in the last part of the small intestine. Any break in this chain causes B12 to pass through unabsorbed.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          In your 70s, multiple links in that chain weaken simultaneously:
        </p>
        {[
          ['Stomach acid declines', 'Gastric acid production typically drops 30–40% by the mid-70s compared to young adulthood. This is often silent — no symptoms, no diagnosis — but it means less B12 released from food.'],
          ['Intrinsic factor production falls', 'The stomach cells that produce intrinsic factor shrink and become less active with age, further reducing B12 uptake even when acid is present.'],
          ['Gut transit slows', 'Slower intestinal movement gives bacteria more time to consume B12 before it reaches the absorption site in the ileum.'],
          ['Medications compound the problem', 'The 70s are when polypharmacy peaks. PPIs, metformin, H2 blockers, and other drugs that deplete B12 are most commonly prescribed in this decade.'],
        ].map(([cause, explanation]) => (
          <div key={cause} style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <span style={{ color: '#1E6B3E', fontSize: '1.1rem', flexShrink: 0, marginTop: '3px' }}>→</span>
            <div>
              <strong style={{ color: '#14442A' }}>{cause}</strong>
              <p style={{ color: '#555550', lineHeight: 1.65, marginTop: '4px', marginBottom: 0, fontSize: '0.9rem' }}>{explanation}</p>
            </div>
          </div>
        ))}

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Dosage Guidance for the 70–79 Age Band</h2>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: '#14442A', color: '#fff' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Situation</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Daily Dose</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Form</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['No medications affecting B12, omnivore diet', '100–250 mcg', 'Cyanocobalamin tablet'],
                ['Vegetarian or vegan', '500 mcg', 'Methylcobalamin tablet'],
                ['On PPI or metformin', '500–1,000 mcg', 'Sublingual methylcobalamin'],
                ['Both medications + plant-based diet', '1,000 mcg', 'Sublingual methylcobalamin'],
                ['Confirmed deficiency (blood test)', '1,000–2,000 mcg', 'Sublingual — discuss with doctor'],
              ].map(([sit, dose, form], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#F7F6F3' }}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', fontSize: '0.9rem' }}>{sit}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', color: '#1E6B3E', fontWeight: 700 }}>{dose}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', color: '#555550', fontSize: '0.9rem' }}>{form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Symptoms That Are Often B12 — Not Just Aging</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          In your 70s, these symptoms deserve a B12 blood test before they are attributed to normal aging:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '24px' }}>
          {[
            'Fatigue that does not improve with rest',
            'Tingling or numbness in hands or feet',
            'Memory lapses or word-finding difficulty',
            'Unsteady balance when walking',
            'Mood changes without clear cause',
            'Pale or slightly yellow skin',
          ].map(s => (
            <div key={s} style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '8px', padding: '12px 14px', display: 'flex', gap: '8px' }}>
              <span style={{ color: '#1E6B3E', flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: '0.9rem', color: '#2C2C2A' }}>{s}</span>
            </div>
          ))}
        </div>

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Get Your Personalized Recommendation</h2>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: B12 for Adults in Their 70s</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            Methylcobalamin at 500–1,000 mcg is the sweet spot for most 70-year-olds. Sublingual form ensures reliable absorption even if stomach acid has declined.
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
            <Link href="/b12-dosage-seniors/age-80" className="interlink">B12 Dosage for 80 Year Olds</Link>
            <Link href="/b12-dosage-seniors/sublingual" className="interlink">Sublingual B12 for Seniors: Why It Works Better</Link>
          </div>
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
