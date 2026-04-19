import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B12 for Neuropathy in Seniors: Dosage and Recovery Guide (2026)',
  description: 'Tingling, numbness, and burning in the feet can signal B12 deficiency neuropathy — a reversible condition. This guide covers the 1,000 mcg dose, nerve repair timeline, and when to see a doctor.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/tingling-feet' },
  openGraph: {
    title: 'B12 for Neuropathy in Seniors: Dosage and Recovery Guide',
    description: 'Tingling feet from B12 deficiency is reversible with the right dose. Here is how much to take and what to expect.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/tingling-feet',
    type: 'article',
  },
};

const faqs = [
  { q: 'Can B12 deficiency cause tingling feet in seniors?', a: 'Yes — B12 deficiency neuropathy is one of the most common and most overlooked causes of tingling, numbness, and burning in the feet and hands in older adults. B12 is essential for myelin, the insulating sheath around peripheral nerves. When B12 is low, myelin degrades, causing abnormal electrical signals that are felt as tingling, numbness, pins-and-needles, or burning pain.' },
  { q: 'How much B12 should I take for tingling in the feet?', a: 'For B12-related neuropathy, 1,000 mcg of sublingual methylcobalamin daily is the recommended starting dose. This high dose ensures adequate absorption even if stomach acid is low, and delivers the active form of B12 directly to nerve tissue. Start supplementing while waiting for blood test results if symptoms are significant — B12 is safe and the window for nerve repair is time-sensitive.' },
  { q: 'How long does it take for B12 to help tingling in the feet?', a: 'Most people notice some improvement in tingling within 4–8 weeks of correcting B12 deficiency. Significant nerve recovery typically takes 3–6 months. How completely the tingling resolves depends on how long the deficiency lasted. Deficiencies caught within 1–2 years often fully resolve. Those lasting 3+ years may leave residual symptoms even after B12 is normalized.' },
  { q: 'How do I know if my tingling feet are from B12 or something else?', a: 'B12 neuropathy typically starts in the feet and spreads upward symmetrically to the hands. It produces a distinctive tingling, numbness, or burning that is worse at rest and at night. Other causes — diabetes, alcohol, nerve compression — can look similar. The only way to distinguish them is blood testing. Request serum B12 and methylmalonic acid (MMA) — if MMA is elevated, B12 deficiency is the likely cause regardless of what serum B12 shows.' },
  { q: 'Is B12 neuropathy the same as diabetic neuropathy?', a: 'They produce nearly identical symptoms. In diabetic seniors, both may co-exist — diabetes damages nerves through high blood sugar, while metformin (the primary diabetes drug) simultaneously depletes B12. Studies show that up to 30% of diabetics on metformin have B12 deficiency-related neuropathy that is being attributed entirely to diabetes. Correcting B12 in these patients often improves nerve symptoms significantly.' },
  { q: 'When should I see a doctor about tingling feet and B12?', a: 'See your doctor promptly if tingling is spreading, has been present for more than 3 months, is accompanied by muscle weakness, balance problems, or falls, or is affecting daily activities. Also seek evaluation if you have been on metformin for 2+ years or if blood tests show B12 below 300 pg/mL. B12 neuropathy can progress to permanent nerve damage if not treated — do not wait.' },
];

export default function TinglingFeetPage() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="B12 for Neuropathy in Seniors: Dosage and Recovery Guide" description="Tingling and numbness from B12 deficiency neuropathy is reversible. Guide to 1,000 mcg dosing, nerve repair timeline, and distinguishing B12 neuropathy from other causes." url="https://thevitatrack.com/b12-dosage-seniors/tingling-feet" />
      <ChildBreadcrumbJsonLd slug="tingling-feet" label="B12 for Neuropathy" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>Tingling Feet</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            ⚡ Neuropathy Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            B12 for Neuropathy in Seniors: Dosage, Recovery Timeline, and What to Expect
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            Tingling, burning, or numbness in your feet that starts in the toes and spreads upward is a classic sign of B12 deficiency neuropathy. Unlike most neuropathy causes, this one is reversible — if treated quickly enough.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#FFF8E1', border: '2px solid #F59E0B', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '8px' }}>⚠ Time Matters for Nerve Repair</strong>
          <p style={{ color: '#92400E', lineHeight: 1.7, margin: 0 }}>
            Peripheral nerves can repair themselves — but only if the deficiency is corrected while repair capacity remains. Deficiency lasting less than 2 years is often fully reversible. Deficiency lasting 3+ years may cause permanent damage. If you have tingling or numbness and have not had B12 tested, do not delay.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>How B12 Deficiency Damages Peripheral Nerves</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Peripheral neuropathy means damage to the nerves outside the brain and spinal cord — the nerves that carry signals to your hands, feet, and legs. B12 is critical to the production of myelin, the fatty sheath that surrounds and protects these nerves like electrical insulation around a wire.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          When B12 is deficient, myelin production slows and existing myelin begins to degrade. The signals that normally travel rapidly and cleanly along nerve fibres become erratic — misfiring, slowing, or failing. At the sensory level, this feels like tingling, pins and needles, numbness, or burning, typically starting in the toes and soles and spreading up the feet and into the lower legs. Later, hands and fingers are affected.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          The condition has a formal name: <strong>subacute combined degeneration</strong> of the spinal cord. In its early stages, it affects only peripheral nerves and is reversible. In its advanced stages, it involves the spinal cord and can be permanent.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Dosage for B12 Neuropathy in Seniors</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'Tingling present, B12 not yet tested', dose: '1,000 mcg/day', form: 'Sublingual methylcobalamin — safe to start while awaiting results', color: '#D97706' },
            { label: 'Confirmed B12 deficiency with neuropathy', dose: '1,000–2,000 mcg/day', form: 'Sublingual or injection — ideally doctor-supervised', color: '#DC2626' },
            { label: 'Neuropathy improving, maintenance phase', dose: '500–1,000 mcg/day', form: 'Continue sublingual methylcobalamin indefinitely', color: '#1E6B3E' },
          ].map(({ label, dose, form, color }) => (
            <div key={label} style={{ background: '#fff', border: `2px solid ${color}`, borderRadius: '10px', padding: '16px' }}>
              <span style={{ fontSize: '0.875rem', color: '#717170', display: 'block', marginBottom: '4px' }}>{label}</span>
              <strong style={{ color, fontSize: '1.05rem', display: 'block' }}>{dose}</strong>
              <span style={{ fontSize: '0.875rem', color: '#555550' }}>{form}</span>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Recovery Timeline: What to Expect</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '14px' }}>
          Nerve recovery is slow. Unlike blood or immune cells that regenerate in days to weeks, peripheral nerve fibres regrow at roughly 1mm per day under optimal conditions. Here is a realistic timeline:
        </p>
        {[
          { period: 'Weeks 1–4', change: 'Blood B12 levels normalize', feeling: 'Energy improves; nerve symptoms may temporarily worsen as nerves begin to reactivate' },
          { period: 'Weeks 4–12', change: 'Myelin production resumes', feeling: 'Tingling and numbness begin to decrease from top down — upper areas improve before feet' },
          { period: 'Months 3–6', change: 'Nerve fibre regeneration progressing', feeling: 'Most patients with early-stage deficiency notice significant improvement; some residual tingling normal' },
          { period: 'Months 6–18', change: 'Full repair (if deficiency was caught early)', feeling: 'Complete resolution in many cases; partial improvement if deficiency was long-standing' },
        ].map(({ period, change, feeling }) => (
          <div key={period} style={{ display: 'flex', gap: '14px', marginBottom: '14px', padding: '14px', background: '#fff', border: '1px solid #E8E6E1', borderRadius: '8px' }}>
            <div style={{ background: '#1E6B3E', color: '#fff', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0, alignSelf: 'flex-start', whiteSpace: 'nowrap' }}>{period}</div>
            <div>
              <strong style={{ color: '#14442A', display: 'block', fontSize: '0.875rem' }}>{change}</strong>
              <p style={{ color: '#555550', lineHeight: 1.6, marginTop: '4px', marginBottom: 0, fontSize: '0.875rem' }}>{feeling}</p>
            </div>
          </div>
        ))}

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>B12 vs. Diabetic Neuropathy: How to Tell the Difference</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          These two conditions feel nearly identical. Both produce bilateral (both feet) tingling, numbness, and burning that is worse at night. Both progress from toes upward. In diabetic seniors on metformin — which depletes B12 — both may be present simultaneously.
        </p>
        <div style={{ background: '#F0FAF3', border: '1px solid #B2DFC0', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '8px' }}>Clinical clue:</strong>
          <p style={{ color: '#2C2C2A', lineHeight: 1.7, margin: 0 }}>
            If a diabetic senior on metformin has neuropathy that is <em>not fully explained</em> by their blood sugar control, or if neuropathy is worsening despite good glucose management — check B12 and MMA. A significant percentage of &quot;diabetic neuropathy&quot; in metformin users is partly or fully B12 deficiency neuropathy, which responds to B12 supplementation in ways that purely diabetic neuropathy does not.
          </p>
        </div>

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Get Your Personalized Recommendation</h2>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: Sublingual B12 for Neuropathy</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            Sublingual methylcobalamin at 1,000 mcg is the most direct delivery method for nerve-active B12. Consistent daily use is essential — nerve repair takes months, not days.
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
            <Link href="/b12-dosage-seniors/metformin" className="interlink">B12 Dosage for Seniors on Metformin</Link>
            <Link href="/conditions/peripheral-neuropathy" className="interlink">Peripheral Neuropathy in Seniors</Link>
          </div>
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
