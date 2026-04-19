import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B12 Dosage for Seniors on Metformin: How Much to Take',
  description: 'Metformin depletes B12 in up to 30% of users. Learn the exact B12 dose for seniors on metformin, when to test, and which form absorbs best despite the drug.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/metformin' },
  openGraph: {
    title: 'B12 Dosage for Seniors on Metformin',
    description: 'Metformin blocks B12 absorption. Get the right dose if you are over 60 and diabetic.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/metformin',
    type: 'article',
  },
};

const faqs = [
  { q: 'How much B12 should I take if I am on metformin?', a: 'Most guidelines recommend 500–1,000 mcg of B12 daily for seniors taking metformin. The American Diabetes Association advises annual B12 blood testing for all long-term metformin users. Sublingual methylcobalamin at 1,000 mcg is ideal because it bypasses the gut absorption pathway that metformin disrupts.' },
  { q: 'How long does metformin take to deplete B12?', a: 'Metformin-related B12 depletion is gradual. Studies show measurable reductions within 6–12 months and significant deficiency risk after 3–5 years of continuous use. The effect compounds with age because stomach acid production also declines independently after 50.' },
  { q: 'Can I get enough B12 from diet if I take metformin?', a: 'No — dietary B12 requires stomach acid and intrinsic factor to absorb, and metformin interferes with this pathway. Even a diet rich in meat and dairy will not reliably maintain adequate B12 levels. Crystalline B12 in supplements bypasses this mechanism and absorbs passively.' },
  { q: 'Will taking B12 reduce the effectiveness of metformin?', a: 'No. B12 supplementation does not interfere with metformin\'s blood sugar-lowering effects. They work through completely different mechanisms. B12 simply replaces what metformin depletes.' },
  { q: 'What B12 level is considered deficient for someone on metformin?', a: 'Most labs flag below 200 pg/mL as deficient and 200–300 pg/mL as borderline. However, seniors on metformin should aim for levels above 400 pg/mL. The methylmalonic acid (MMA) test is more sensitive and can detect functional deficiency even when serum B12 appears normal.' },
];

export default function MetforminPage() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="B12 Dosage for Seniors on Metformin" description="Metformin depletes B12 in up to 30% of long-term users. Learn the exact B12 dose, best form, and testing schedule for seniors taking metformin." url="https://thevitatrack.com/b12-dosage-seniors/metformin" />
      <ChildBreadcrumbJsonLd slug="metformin" label="B12 Dosage on Metformin" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>Metformin</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            💊 Drug Interaction Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            B12 Dosage for Seniors on Metformin: The Critical Gap Most Doctors Miss
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            Metformin is the world&apos;s most prescribed diabetes drug. It is also a proven B12 depleter — yet fewer than 1 in 5 doctors routinely test B12 levels in their metformin patients. Here is exactly what to do.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#FFF8E1', border: '2px solid #F59E0B', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>⚠ The Metformin-B12 Problem</strong>
          <p style={{ color: '#92400E', lineHeight: 1.7, margin: 0 }}>
            Metformin blocks the calcium-dependent mechanism that absorbs B12 in the intestines. After 3–5 years on metformin, <strong>up to 30% of users develop measurable B12 deficiency</strong> — and many more have suboptimal levels that impair nerve and brain function without triggering a lab flag. The 2022 ADA guidelines now explicitly recommend annual B12 monitoring for all long-term metformin users.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Recommended B12 Dose If You Take Metformin</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Standard maintenance doses designed for healthy adults do not apply when metformin is in the picture. The drug actively blocks the absorption pathway, so you need a dose high enough to overcome that blockade.
        </p>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'On metformin less than 2 years, no symptoms', dose: '500 mcg/day', form: 'Cyanocobalamin or methylcobalamin tablet' },
            { label: 'On metformin 2+ years, OR over age 70', dose: '1,000 mcg/day', form: 'Sublingual methylcobalamin (preferred)' },
            { label: 'Known deficiency (serum B12 < 200 pg/mL)', dose: '1,000–2,000 mcg/day', form: 'Sublingual methylcobalamin — discuss with doctor' },
          ].map(({ label, dose, form }) => (
            <div key={label} style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <span style={{ fontSize: '0.85rem', color: '#717170' }}>{label}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ color: '#1E6B3E', display: 'block', fontSize: '1.1rem' }}>{dose}</strong>
                <span style={{ fontSize: '0.85rem', color: '#555550' }}>{form}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>How Metformin Depletes B12: The Mechanism</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Vitamin B12 absorption from food is a multi-step process. In the stomach, acid releases B12 from food proteins. The free B12 then binds to intrinsic factor (a protein made in the stomach lining) and travels to the last section of the small intestine (ileum) where it is absorbed via calcium-dependent receptors.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Metformin directly interferes with those calcium-dependent receptors. It blocks the uptake mechanism in the ileum — preventing B12 from crossing from the gut into the bloodstream. High-dose oral B12 and sublingual B12 both bypass this mechanism because a small percentage (about 1%) of any B12 dose is absorbed passively, without needing intrinsic factor or calcium-dependent receptors.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          This is why <strong>1,000 mcg supplements work</strong> even when metformin is present — at that dose, the 1% passive absorption still delivers 10 mcg, which is 4× the daily requirement.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Warning Signs That Metformin Has Depleted Your B12</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '14px' }}>
          Many seniors on metformin attribute B12 depletion symptoms to their diabetes or simply &quot;aging.&quot; Watch for these in yourself or a family member on long-term metformin:
        </p>
        {[
          ['Tingling or numbness in feet and legs', 'Often blamed on diabetic neuropathy, but B12 deficiency causes identical symptoms and is reversible'],
          ['Worsening fatigue despite controlled blood sugar', 'B12 is essential for red blood cell production — depletion causes macrocytic anemia with profound fatigue'],
          ['Memory fog, difficulty concentrating', 'B12 is required for myelin sheath maintenance; depletion degrades nerve signaling in the brain'],
          ['Balance problems or unsteady gait', 'The spinal cord is particularly vulnerable to B12 deficiency — the condition subacute combined degeneration begins with gait changes'],
          ['Mood changes, depression, irritability', 'B12 is involved in neurotransmitter synthesis including serotonin and dopamine'],
        ].map(([symptom, note]) => (
          <div key={symptom} style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
            <span style={{ color: '#F59E0B', fontSize: '1.2rem', flexShrink: 0 }}>⚠</span>
            <div>
              <strong style={{ color: '#14442A', display: 'block' }}>{symptom}</strong>
              <p style={{ color: '#555550', lineHeight: 1.65, marginTop: '4px', marginBottom: 0, fontSize: '0.9rem' }}>{note}</p>
            </div>
          </div>
        ))}

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Testing: What to Ask Your Doctor</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          The standard serum B12 test often misses early depletion because it measures total B12 (including inactive forms). Ask your doctor for these two tests:
        </p>
        <div style={{ background: '#F0FAF3', borderRadius: '10px', padding: '18px 20px', marginBottom: '16px', border: '1px solid #B2DFC0' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '10px' }}>Request both tests at your annual diabetic review:</strong>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            <li style={{ lineHeight: 1.7, marginBottom: '6px', color: '#2C2C2A' }}><strong>Serum B12</strong> — below 300 pg/mL warrants action; below 200 pg/mL is deficient</li>
            <li style={{ lineHeight: 1.7, color: '#2C2C2A' }}><strong>Methylmalonic acid (MMA)</strong> — above 0.4 µmol/L confirms functional deficiency even if serum B12 looks borderline</li>
          </ul>
        </div>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '24px' }}>
          If your doctor is unfamiliar with the metformin-B12 connection, you can reference the 2022 American Diabetes Association Standards of Care (Section 5) which explicitly states: &quot;Periodic measurement of vitamin B12 levels should be considered in metformin-treated patients, especially in those with peripheral neuropathy or anemia.&quot;
        </p>

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Get Your Personalized B12 Recommendation</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '0' }}>
          Use the tool below — select &quot;Taking metformin&quot; in the medications section to get the right dose for your specific situation.
        </p>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: Sublingual B12 for Metformin Users</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            Sublingual methylcobalamin at 1,000 mcg bypasses the intestinal absorption pathway that metformin blocks — making it the most reliable choice.
          </p>
          <a href="https://amzn.to/4sEloLH" target="_blank" rel="nofollow noopener noreferrer"
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
            <Link href="/conditions/diabetes-type-2" className="interlink">Managing Type 2 Diabetes as a Senior</Link>
            <Link href="/symptoms/numbness-tingling" className="interlink">Numbness and Tingling: Causes and Treatment</Link>
          </div>
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
