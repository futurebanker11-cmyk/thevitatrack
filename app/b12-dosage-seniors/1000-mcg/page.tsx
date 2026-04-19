import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Is 1000 mcg B12 Too Much for Seniors? Safety Guide (2026)',
  description: '1,000 mcg B12 is a standard therapeutic dose for seniors — not an overdose. This guide explains why it is safe, who actually needs it, and how B12 safety compares to other vitamins.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/1000-mcg' },
  openGraph: {
    title: 'Is 1000 mcg B12 Too Much for Seniors?',
    description: '1,000 mcg B12 is safe for seniors. Here is exactly who needs it and why the high dose makes sense.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/1000-mcg',
    type: 'article',
  },
};

const faqs = [
  { q: 'Is 1000 mcg of B12 too much for a senior?', a: 'No. 1,000 mcg is a commonly recommended therapeutic dose for seniors and is completely safe. Vitamin B12 is water-soluble, meaning the body excretes any amount it does not need through urine. No tolerable upper intake level has been established by the National Academy of Medicine — the only vitamin B for which this is true. Hundreds of published clinical trials have used 1,000–2,000 mcg doses without adverse effects.' },
  { q: 'Why do seniors need 1000 mcg when the RDA is only 2.4 mcg?', a: 'The RDA is based on how much B12 a healthy young adult needs to absorb to meet daily requirements. By age 60–70, stomach acid production declines by 30–50%, and only about 1–2% of a high oral dose is absorbed passively (without needing stomach acid). At 1,000 mcg, that 1% passive absorption still delivers 10 mcg — four times the RDA. The high dose compensates for low absorption efficiency, not excessive need.' },
  { q: 'Can you overdose on 1000 mcg B12?', a: 'No documented B12 toxicity from oral supplements exists at any dose in healthy adults. Unlike fat-soluble vitamins (A, D, E, K) which accumulate in tissue, B12 is water-soluble and exits the body in urine within hours if not needed. Some observational studies noted a possible association between very high supplemental doses and certain outcomes in smokers, but causality was not established and doses were far higher than 1,000 mcg.' },
  { q: 'What symptoms go away when you take 1000 mcg B12?', a: 'For seniors with deficiency, 1,000 mcg daily typically improves fatigue and energy levels within 2–4 weeks. Tingling in hands and feet may improve within 1–3 months as myelin repairs. Memory fog and concentration may improve within 1–2 months. Balance problems are the slowest to resolve — 3–6 months — and may not fully reverse if deficiency was severe for several years.' },
  { q: 'Should I take 1000 mcg B12 every day or just a few times per week?', a: 'Daily is better for maintaining steady blood levels. B12 has a complex relationship with the body\'s stores — it is excreted quickly when blood levels are high, but stored in the liver for months to years at lower doses. Daily supplementation at 1,000 mcg provides consistent passive absorption even on days when stomach acid is low.' },
];

export default function ThousandMcgPage() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="Is 1000 mcg B12 Too Much for Seniors?" description="1,000 mcg B12 is a safe, standard therapeutic dose for seniors. This guide covers the science behind high-dose B12, who needs it, and why the dose is not as extreme as it sounds." url="https://thevitatrack.com/b12-dosage-seniors/1000-mcg" />
      <ChildBreadcrumbJsonLd slug="1000-mcg" label="Is 1000 mcg B12 Too Much?" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>1000 mcg</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            🔬 Dosage Science
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            Is 1000 mcg B12 Too Much for Seniors? What the Evidence Shows
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            Most B12 supplements come in 500–2,500 mcg doses. When the RDA is only 2.4 mcg, those numbers look alarming. Here is why they are not — and why the math actually makes sense for older adults.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#F0FAF3', border: '2px solid #1E6B3E', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '8px' }}>Short Answer</strong>
          <p style={{ color: '#2C2C2A', lineHeight: 1.7, margin: 0 }}>
            <strong>1,000 mcg B12 is not too much for seniors.</strong> It is a standard therapeutic dose that compensates for the absorption decline that happens with age. B12 is water-soluble — you excrete what you do not use. No toxicity has ever been documented from oral B12 at any dose.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Why the Dose Sounds High but Isn&apos;t</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          The number 1,000 mcg looks extreme next to the 2.4 mcg RDA. But these two numbers are measuring different things. The RDA measures how much B12 a healthy 25-year-old needs to <em>absorb</em> each day. 1,000 mcg measures how much you need to <em>swallow</em> to achieve adequate absorption when your gut is not working at full capacity.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Here is the math: B12 is absorbed via two pathways. The primary pathway (intrinsic factor-dependent) absorbs up to 1.5 mcg per meal efficiently — but it requires stomach acid and intrinsic factor, both of which decline with age. The secondary pathway (passive diffusion) absorbs approximately 1% of any dose regardless of stomach acid levels.
        </p>
        <div style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '10px', padding: '18px 20px', marginBottom: '24px' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '10px' }}>The absorption math:</strong>
          <div style={{ display: 'grid', gap: '8px' }}>
            {[
              ['25 mcg dose', '~2.5 mcg absorbed (1% passive)', 'Only just meets the RDA'],
              ['100 mcg dose', '~1–1.5 mcg absorbed passively', 'Barely adequate for 70+'],
              ['500 mcg dose', '~5 mcg absorbed passively', 'Good maintenance for most seniors'],
              ['1,000 mcg dose', '~10 mcg absorbed passively', 'Reliable correction/maintenance, even with poor gut function'],
              ['2,000 mcg dose', '~20 mcg absorbed passively', 'Used for active deficiency correction'],
            ].map(([dose, absorbed, verdict]) => (
              <div key={dose} style={{ padding: '10px 14px', background: '#F7F6F3', borderRadius: '8px', display: 'grid', gridTemplateColumns: '120px 1fr', gap: '10px', alignItems: 'center' }}>
                <strong style={{ color: '#14442A', fontSize: '0.9rem' }}>{dose}</strong>
                <div>
                  <span style={{ color: '#1E6B3E', fontWeight: 600, display: 'block', fontSize: '0.875rem' }}>{absorbed}</span>
                  <span style={{ color: '#717170', fontSize: '0.8rem' }}>{verdict}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>The Safety Profile of High-Dose B12</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Vitamin B12 is one of the safest substances you can take. Unlike fat-soluble vitamins (A, D, E, K) that accumulate in the liver and fatty tissues, water-soluble vitamins are excreted in urine when present in excess. B12 has no known mechanism for toxicity.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Tolerable Upper Limit set by NAM', value: 'None established', color: '#1E6B3E' },
            { label: 'Highest dose studied in trials', value: '2,000 mcg/day', color: '#1A5632' },
            { label: 'Adverse effects at 1,000 mcg', value: 'None documented', color: '#1E6B3E' },
            { label: 'Water-soluble?', value: 'Yes — excreted safely', color: '#1A5632' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '10px', padding: '14px' }}>
              <span style={{ fontSize: '0.8rem', color: '#717170', display: 'block', marginBottom: '4px' }}>{label}</span>
              <strong style={{ color, fontSize: '1rem' }}>{value}</strong>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Who Actually Needs 1,000 mcg?</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '14px' }}>
          Not every senior needs 1,000 mcg. Here is the breakdown:
        </p>
        {[
          { group: 'Age 60–69, omnivore, no B12-depleting medications', rec: '100–500 mcg/day is likely sufficient' },
          { group: 'Age 70–79, any diet', rec: '500 mcg/day is the typical starting point; increase if symptoms present' },
          { group: 'Age 80+, any diet', rec: '500–1,000 mcg/day as standard maintenance' },
          { group: 'Any age on metformin or PPI', rec: '500–1,000 mcg/day to overcome drug-related absorption block' },
          { group: 'Vegans of any age over 60', rec: '500–1,000 mcg/day — diet provides essentially zero B12' },
          { group: 'Confirmed deficiency (blood test)', rec: '1,000–2,000 mcg/day under medical guidance for 3–6 months, then reassess' },
        ].map(({ group, rec }) => (
          <div key={group} style={{ display: 'flex', gap: '12px', marginBottom: '12px', background: '#fff', border: '1px solid #E8E6E1', borderRadius: '8px', padding: '14px' }}>
            <span style={{ color: '#1E6B3E', flexShrink: 0 }}>✓</span>
            <div>
              <strong style={{ color: '#14442A', display: 'block', fontSize: '0.9rem' }}>{group}</strong>
              <span style={{ color: '#555550', fontSize: '0.875rem' }}>{rec}</span>
            </div>
          </div>
        ))}

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Get Your Personalized Recommendation</h2>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: 1,000 mcg Sublingual B12</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            For seniors who need the full therapeutic dose, sublingual methylcobalamin at 1,000 mcg delivers maximum bioavailability with zero absorption barriers.
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
            <Link href="/b12-dosage-seniors/methylcobalamin" className="interlink">Methylcobalamin vs Cyanocobalamin for Seniors</Link>
          </div>
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
