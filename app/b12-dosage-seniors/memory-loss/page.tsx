import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B12 for Memory Loss in Seniors: Can It Help? (2026 Guide)',
  description: 'B12 deficiency mimics dementia. This guide explains how B12 affects brain health, what dose is needed for cognitive support, and when memory loss is reversible vs. permanent.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/memory-loss' },
  openGraph: {
    title: 'B12 for Memory Loss in Seniors: Can It Help?',
    description: 'B12 deficiency is a reversible cause of memory loss in seniors. Here is how to dose it correctly and what to expect.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/memory-loss',
    type: 'article',
  },
};

const faqs = [
  { q: 'Can B12 deficiency cause memory loss in seniors?', a: 'Yes. B12 deficiency is one of the few reversible causes of cognitive decline and dementia-like symptoms in older adults. It impairs myelin production (the insulation around nerve fibres), disrupts neurotransmitter synthesis, and raises homocysteine — a compound directly toxic to brain cells. Symptoms can include memory loss, confusion, word-finding difficulty, and personality changes that closely mimic early dementia.' },
  { q: 'How much B12 should seniors take for memory support?', a: 'If memory issues are present, 1,000 mcg of sublingual methylcobalamin daily is the recommended starting dose — but first get a blood test to confirm deficiency. Supplementing high-dose B12 only reverses memory decline if the underlying cause is B12 deficiency. It does not improve memory in people with adequate B12 levels.' },
  { q: 'How long does it take for B12 to improve memory?', a: 'Most seniors with B12-related cognitive decline notice improvement within 4–12 weeks of correcting deficiency with high-dose supplementation. Full recovery depends on how long the deficiency lasted. Deficiencies caught within 1–2 years are often fully reversible. Those present for 3+ years may show only partial improvement, especially if neurological damage is established.' },
  { q: 'What is the link between B12 and dementia?', a: 'Low B12 is associated with elevated homocysteine, a metabolic byproduct that is directly neurotoxic. High homocysteine doubles the rate of brain atrophy (shrinkage) in older adults. A landmark Oxford University study (2010) found that B vitamin supplementation, including B12, slowed brain atrophy by 53% in adults with mild cognitive impairment over 2 years.' },
  { q: 'Should I take B12 if I already have a dementia diagnosis?', a: 'If B12 deficiency has not been tested, it should be — regardless of existing diagnoses. B12 deficiency can co-exist with Alzheimer\'s and other dementias, and correcting it may reduce the rate of decline even if it does not reverse established damage. This is a low-risk, potentially high-reward intervention that many specialists overlook.' },
  { q: 'Does high-dose B12 prevent dementia in seniors?', a: 'There is no strong evidence that B12 prevents dementia in people who already have adequate B12 levels. The benefit is specific to those who are deficient. However, given the high prevalence of undetected B12 deficiency in seniors, routine supplementation and testing makes sense as a precautionary measure — especially for those over 70 or on medications that deplete B12.' },
];

export default function MemoryLossPage() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="B12 for Memory Loss in Seniors" description="B12 deficiency mimics dementia and is fully reversible when caught early. Guide to dosing for cognitive support, expected recovery timeline, and brain health research." url="https://thevitatrack.com/b12-dosage-seniors/memory-loss" />
      <ChildBreadcrumbJsonLd slug="memory-loss" label="B12 for Memory Loss" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>Memory Loss</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            🧠 Brain Health Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            B12 for Memory Loss in Seniors: When It Helps and When It Does Not
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            B12 deficiency is one of the very few reversible causes of dementia-like symptoms in older adults. The memory loss, confusion, and brain fog it causes is sometimes years in the making — and sometimes fully recoverable with the right treatment.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#FEF2F2', border: '2px solid #EF4444', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#7F1D1D', display: 'block', marginBottom: '8px' }}>⚠ Get Tested Before Assuming It Is Dementia</strong>
          <p style={{ color: '#991B1B', lineHeight: 1.7, margin: 0 }}>
            Every person with new or worsening memory problems should have their B12 level checked <em>before</em> a dementia diagnosis is confirmed. B12 deficiency produces symptoms virtually identical to early Alzheimer&apos;s — and unlike Alzheimer&apos;s, <strong>it is reversible if caught in time.</strong>
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>How B12 Deficiency Damages the Brain</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Vitamin B12 plays two critical roles in brain health. First, it is essential for making myelin — the fatty sheath that insulates nerve fibres and allows electrical signals to travel quickly and accurately. Without enough B12, myelin production falters. Existing myelin degrades. The result is slowed nerve conduction that manifests as cognitive sluggishness, memory lapses, and confusion.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Second, B12 is a key cofactor in the methylation cycle, which processes homocysteine — a metabolic byproduct that accumulates when B12 and folate are insufficient. Elevated homocysteine is directly toxic to neurons and blood vessels in the brain. Studies show that high homocysteine doubles the rate of brain atrophy in older adults and is a stronger predictor of cognitive decline than many better-known risk factors.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          The good news: both of these mechanisms are reversible when B12 deficiency is corrected. The question is how much damage accumulated before treatment began.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Cognitive Symptoms of B12 Deficiency vs. Alzheimer&apos;s</h2>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#14442A', color: '#fff' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left' }}>Symptom</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>B12 Deficiency</th>
                <th style={{ padding: '10px 14px', textAlign: 'center' }}>Alzheimer&apos;s</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Memory lapses (names, words)', 'Yes', 'Yes'],
                ['Brain fog / slow thinking', 'Yes — often prominent', 'Yes'],
                ['Tingling in hands/feet', 'Yes — common early sign', 'Rare'],
                ['Balance problems', 'Yes', 'Late-stage only'],
                ['Mood changes, depression', 'Yes', 'Yes'],
                ['Reversible with treatment', 'Yes — if caught early', 'No'],
                ['Progressive without treatment', 'Yes', 'Yes'],
              ].map(([symptom, b12, alz], i) => (
                <tr key={symptom} style={{ background: i % 2 === 0 ? '#fff' : '#F7F6F3' }}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1' }}>{symptom}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', textAlign: 'center', color: '#1E6B3E' }}>{b12}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', textAlign: 'center', color: '#555550' }}>{alz}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Dosage for Memory and Cognitive Support</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Preventive / routine maintenance (no symptoms)', dose: '500 mcg/day', form: 'Methylcobalamin tablet or sublingual' },
            { label: 'Memory concerns or brain fog (symptoms present)', dose: '1,000 mcg/day', form: 'Sublingual methylcobalamin — get tested first' },
            { label: 'Confirmed deficiency with cognitive symptoms', dose: '1,000–2,000 mcg/day', form: 'Sublingual methylcobalamin — doctor-supervised' },
          ].map(({ label, dose, form }) => (
            <div key={label} style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.875rem', color: '#717170', flex: 1, minWidth: '200px' }}>{label}</span>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ color: '#1E6B3E', display: 'block', fontSize: '1.05rem' }}>{dose}</strong>
                <span style={{ fontSize: '0.85rem', color: '#555550' }}>{form}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>What the Research Shows</h2>
        <div style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '10px', padding: '18px 20px', marginBottom: '24px' }}>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Oxford University (2010) — B vitamins including B12 slowed brain atrophy by 53% over 2 years in adults with mild cognitive impairment and elevated homocysteine',
              'Neurology (2008) — Older adults with low B12 had 6× faster brain volume loss over 5 years than those with adequate levels',
              'NEJM (2013) — High-dose oral B12 as effective as injections for correcting deficiency in elderly adults',
              'Alzheimer\'s Association — B12 deficiency should be ruled out in any patient with new cognitive symptoms before dementia workup proceeds',
            ].map(item => <li key={item} style={{ lineHeight: 1.7, marginBottom: '6px', color: '#2C2C2A', fontSize: '0.9rem' }}>{item}</li>)}
          </ul>
        </div>

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Get Your Personalized Recommendation</h2>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: Sublingual B12 for Brain Health</strong>
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
            <Link href="/conditions/memory-loss-dementia" className="interlink">Memory Loss and Dementia in Seniors</Link>
          </div>
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
