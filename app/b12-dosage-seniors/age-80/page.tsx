import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B12 Dosage for 80 Year Olds: High-Dose Guide (2026)',
  description: 'Adults over 80 have the highest B12 deficiency risk of any age group. This guide covers the 500–1,000 mcg range, when injections are needed, neurological red flags, and how to talk to your doctor.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/age-80' },
  openGraph: {
    title: 'B12 Dosage for 80 Year Olds: High-Dose Guide',
    description: 'The 80+ age group has the highest B12 deficiency rates. Here is the right dose, form, and testing plan.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/age-80',
    type: 'article',
  },
};

const faqs = [
  { q: 'How much B12 should an 80-year-old take?', a: 'Most adults over 80 benefit from 500–1,000 mcg of B12 daily, with sublingual methylcobalamin being the preferred form. At this age, stomach acid production and intrinsic factor output have typically declined significantly, making passive absorption from high-dose supplements the most reliable route. If neurological symptoms are present, discuss 1,000–2,000 mcg with your doctor.' },
  { q: 'At age 80, is a B12 injection better than supplements?', a: 'Not necessarily. Research published in the NEJM showed that high-dose oral B12 (1,000–2,000 mcg daily) was as effective as monthly intramuscular injections for correcting deficiency in older adults. Injections are typically reserved for those who cannot absorb B12 even from high-dose oral or sublingual supplements — a condition called pernicious anemia — or for very rapid correction of severe neurological deficiency.' },
  { q: 'What percentage of 80-year-olds are B12 deficient?', a: 'Studies using the more sensitive methylmalonic acid test find that up to 40% of adults over 80 have at least marginal B12 deficiency. This is the highest rate of any age group. Many are never tested, and deficiency is often masked by multivitamin use that contains low, ineffective B12 doses.' },
  { q: 'Can B12 deficiency at 80 cause dementia-like symptoms?', a: 'Yes. B12 deficiency can produce symptoms virtually identical to dementia: memory loss, confusion, disorientation, and personality changes. Critically, B12 deficiency is one of the very few reversible causes of dementia-like symptoms in older adults. Always rule it out with a blood test before accepting a dementia diagnosis.' },
  { q: 'My 80-year-old parent has trouble swallowing pills. What B12 options are available?', a: 'Sublingual tablets are ideal — they dissolve under the tongue without needing to swallow anything. Liquid methylcobalamin drops are another option that can be placed under the tongue or mixed into a small amount of liquid. Monthly B12 injections administered by a nurse or doctor are also available for those who cannot manage oral supplements.' },
];

export default function Age80Page() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="B12 Dosage for 80 Year Olds" description="Adults over 80 have the highest B12 deficiency risk. This guide covers 500–1,000 mcg sublingual dosing, injection considerations, and neurological warning signs." url="https://thevitatrack.com/b12-dosage-seniors/age-80" />
      <ChildBreadcrumbJsonLd slug="age-80" label="B12 Dosage at Age 80+" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>Age 80+</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            💊 Age-Specific Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            B12 Dosage for 80 Year Olds: Why This Age Group Needs the Most
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            Adults over 80 have the highest B12 deficiency rates of any age group. Multiple absorption barriers — weakened stomach, multiple medications, reduced dietary intake — stack up over decades. This is the age where getting B12 right matters most.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#FEF2F2', border: '2px solid #EF4444', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#7F1D1D', display: 'block', marginBottom: '6px' }}>⚠ Important for Caregivers and Family Members</strong>
          <p style={{ color: '#991B1B', lineHeight: 1.7, margin: 0 }}>
            Up to <strong>40% of adults over 80 have clinically meaningful B12 deficiency</strong> when tested properly. Symptoms — fatigue, memory changes, balance problems, and tingling — are routinely misattributed to dementia, arthritis, or aging. A blood test costs less than a co-pay and can reverse years of unnecessary decline if deficiency is found.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Recommended B12 Dose at Age 80+</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'General maintenance, 80+ with no deficiency symptoms', dose: '500–1,000 mcg/day', form: 'Sublingual methylcobalamin', color: '#1E6B3E' },
            { label: 'Balance problems, tingling, or memory concerns', dose: '1,000 mcg/day', form: 'Sublingual methylcobalamin — get tested first', color: '#D97706' },
            { label: 'Confirmed deficiency (blood test)', dose: '1,000–2,000 mcg/day', form: 'Sublingual or injection — doctor-supervised', color: '#DC2626' },
          ].map(({ label, dose, form, color }) => (
            <div key={label} style={{ background: '#fff', border: `2px solid ${color}`, borderRadius: '10px', padding: '16px' }}>
              <span style={{ fontSize: '0.85rem', color: '#717170', display: 'block', marginBottom: '4px' }}>{label}</span>
              <strong style={{ color, fontSize: '1.1rem', display: 'block' }}>{dose}</strong>
              <span style={{ fontSize: '0.875rem', color: '#555550' }}>{form}</span>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Why Absorption Is Severely Impaired at 80+</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          By your 80s, the stomach lining has undergone decades of wear. Atrophic gastritis — a condition where acid-producing cells have shrunk or disappeared — affects an estimated 30–40% of adults over 80. Without stomach acid, B12 from food is almost entirely unabsorbable.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          On top of that, intrinsic factor — the protein that carries B12 across the intestinal wall — is produced by the same cells that make stomach acid. Atrophic gastritis reduces both simultaneously. Combine this with polypharmacy (the average 80-year-old takes 5+ prescription medications, many of which affect B12), and deficiency is almost inevitable without deliberate supplementation.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          <strong>The only reliable solution is bypassing the gut.</strong> Sublingual methylcobalamin dissolves under the tongue and absorbs directly into the bloodstream through the mucous membrane — no stomach acid, no intrinsic factor, no intestinal processing required. Monthly B12 injections work through the same principle (direct delivery to blood).
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Neurological Red Flags: When to Act Fast</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '14px' }}>
          Neurological B12 deficiency is serious at any age, but at 80+ the nerves are less resilient and recovery is slower. Seek evaluation promptly for any of these:
        </p>
        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px' }}>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Sudden worsening of memory or confusion',
              'New difficulty walking or frequent falls',
              'Burning, tingling, or electric-shock sensations in hands or feet',
              'Weakness in legs that is new or rapidly worsening',
              'Loss of bladder or bowel control (can indicate spinal cord involvement)',
            ].map(s => <li key={s} style={{ lineHeight: 1.7, marginBottom: '6px', color: '#991B1B' }}>{s}</li>)}
          </ul>
          <p style={{ color: '#7F1D1D', fontSize: '0.9rem', margin: '10px 0 0', fontWeight: 500 }}>
            These warrant an urgent blood test and same-week GP appointment, not a wait-and-see approach.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>B12 Injections vs. Oral Supplements at 80+</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Many people over 80 are prescribed monthly B12 injections. A landmark 2013 NEJM study found that 1,000–2,000 mcg daily oral B12 achieved identical blood level corrections compared to monthly intramuscular injections — even in patients with severe absorption problems. This surprised many physicians.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          However, injections remain preferable in specific situations:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
          <li style={{ lineHeight: 1.7, marginBottom: '8px', color: '#2C2C2A' }}>Pernicious anemia (complete absence of intrinsic factor)</li>
          <li style={{ lineHeight: 1.7, marginBottom: '8px', color: '#2C2C2A' }}>Severe active neurological deficiency needing rapid correction</li>
          <li style={{ lineHeight: 1.7, marginBottom: '8px', color: '#2C2C2A' }}>Patients who cannot reliably take daily oral supplements (compliance issues, swallowing problems)</li>
          <li style={{ lineHeight: 1.7, color: '#2C2C2A' }}>Those who have not responded to 3+ months of high-dose oral supplementation</li>
        </ul>

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Get Your Personalized Recommendation</h2>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: Sublingual B12 for 80+</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            Sublingual methylcobalamin at 1,000 mcg is the most practical and effective option for adults over 80 — no swallowing required, maximum absorption, and proven to work even with severe atrophic gastritis.
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
            <Link href="/b12-dosage-seniors/age-70" className="interlink">B12 Dosage for 70 Year Olds</Link>
            <Link href="/b12-dosage-seniors/memory-loss" className="interlink">B12 for Memory Loss in Seniors</Link>
          </div>
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
