import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B12 Dosage for Seniors on Omeprazole/PPIs (2026): What to Take',
  description: 'PPIs like omeprazole and pantoprazole block stomach acid needed to absorb B12. Learn the right B12 dose, best form, and testing plan for seniors on long-term PPI therapy.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/ppi-users' },
  openGraph: {
    title: 'B12 Dosage for Seniors on Omeprazole/PPIs',
    description: 'Long-term PPI use silently depletes B12. Get the right sublingual dose and testing schedule.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/ppi-users',
    type: 'article',
  },
};

const faqs = [
  { q: 'How much B12 should seniors take if they are on omeprazole?', a: 'Seniors on PPIs like omeprazole should take 1,000 mcg of sublingual methylcobalamin daily. Standard tablets rely on stomach acid to dissolve and release B12 from food, but sublingual B12 absorbs directly through the mouth lining — bypassing the stomach entirely. The longer you have been on a PPI, the more likely it is that your B12 stores are already depleted.' },
  { q: 'Do PPIs deplete B12 immediately?', a: 'No — B12 depletion from PPIs is gradual because the body stores 2–5 mg in the liver, enough to last 3–5 years. Short-term PPI use (under 1 year) rarely causes deficiency. The risk climbs significantly after 2 years of continuous use, especially in adults over 65 who already have reduced stomach acid production.' },
  { q: 'Which PPIs cause the most B12 depletion?', a: 'All PPIs suppress stomach acid by the same mechanism, so all carry B12 depletion risk. Omeprazole (Prilosec), pantoprazole (Protonix), esomeprazole (Nexium), lansoprazole (Prevacid), and rabeprazole (Aciphex) all reduce the stomach acid needed to free B12 from food proteins. Dose and duration matter more than which specific PPI you take.' },
  { q: 'Should I stop my PPI to protect my B12 levels?', a: 'Do not stop a prescribed PPI without consulting your doctor — uncontrolled acid reflux can cause serious esophageal damage. The correct approach is to supplement with sublingual B12 and monitor levels annually, not to discontinue a medication your doctor prescribed.' },
  { q: 'How long does it take for B12 levels to recover after starting supplements on a PPI?', a: 'If taking sublingual methylcobalamin or high-dose oral B12, most people see blood levels rise within 4–8 weeks. Nerve-related symptoms (tingling, memory issues) may take 3–6 months to improve as myelin repairs. Severe deficiency with neurological damage may not fully reverse.' },
  { q: 'Can I get enough B12 from food if I take a PPI?', a: 'Unlikely. PPIs reduce stomach acid by up to 99%, severely impairing the release of B12 from meat, dairy, and eggs. Crystalline B12 in supplements does not need stomach acid to work, which is why supplements — especially sublingual form — are the reliable solution for anyone on long-term PPIs.' },
];

export default function PPIUsersPage() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="B12 Dosage for Seniors on Omeprazole/PPIs" description="PPIs block the stomach acid needed to absorb B12 from food. Learn the right sublingual B12 dose and testing plan for seniors on long-term PPI therapy." url="https://thevitatrack.com/b12-dosage-seniors/ppi-users" />
      <ChildBreadcrumbJsonLd slug="ppi-users" label="B12 Dosage on PPIs" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>PPI Users</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            💊 Drug Interaction Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            B12 Dosage for Seniors on Omeprazole: The PPI-B12 Problem Explained
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            Proton pump inhibitors are among the most prescribed drugs in the world. But suppressing stomach acid also shuts down B12 absorption from food. If you have been on omeprazole, pantoprazole, or any PPI for more than a year, read this before your next refill.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#FFF8E1', border: '2px solid #F59E0B', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>⚠ PPIs and B12: What the Data Shows</strong>
          <p style={{ color: '#92400E', lineHeight: 1.7, margin: 0 }}>
            A 2013 study in <em>JAMA</em> of 25,956 patients found that those taking PPIs for 2+ years had a <strong>65% increased risk of B12 deficiency</strong> compared to non-users. H2 blockers were associated with a 25% increased risk. Yet B12 testing is almost never routinely ordered for PPI patients.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Which PPIs Are We Talking About?</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          All proton pump inhibitors work the same way — they block the proton pumps in stomach lining cells that produce hydrochloric acid. Less acid means B12 stays locked inside food proteins and cannot be freed for absorption.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '24px' }}>
          {[
            ['Omeprazole', 'Prilosec, Zegerid'],
            ['Pantoprazole', 'Protonix'],
            ['Esomeprazole', 'Nexium'],
            ['Lansoprazole', 'Prevacid'],
            ['Rabeprazole', 'Aciphex'],
            ['Dexlansoprazole', 'Dexilant'],
          ].map(([drug, brand]) => (
            <div key={drug} style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '8px', padding: '12px 14px', textAlign: 'center' }}>
              <strong style={{ color: '#14442A', display: 'block' }}>{drug}</strong>
              <span style={{ fontSize: '0.85rem', color: '#717170' }}>{brand}</span>
            </div>
          ))}
        </div>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          H2 blockers — famotidine (Pepcid), ranitidine (Zantac), cimetidine (Tagamet) — also reduce stomach acid and carry B12 depletion risk, though to a lesser degree than PPIs. If you take either category, the guidance below applies.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Recommended B12 Dose for PPI Users</h2>
        <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
          {[
            { label: 'PPI less than 1 year, age 60–69', dose: '500 mcg/day', form: 'Methylcobalamin tablet' },
            { label: 'PPI 1–3 years, any age over 60', dose: '1,000 mcg/day', form: 'Sublingual methylcobalamin (preferred)' },
            { label: 'PPI 3+ years OR confirmed deficiency', dose: '1,000–2,000 mcg/day', form: 'Sublingual methylcobalamin — discuss with doctor' },
          ].map(({ label, dose, form }) => (
            <div key={label} style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.875rem', color: '#717170', flex: 1, minWidth: '200px' }}>{label}</span>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ color: '#1E6B3E', display: 'block', fontSize: '1.1rem' }}>{dose}</strong>
                <span style={{ fontSize: '0.85rem', color: '#555550' }}>{form}</span>
              </div>
            </div>
          ))}
        </div>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '24px' }}>
          <strong>Why sublingual specifically?</strong> Sublingual methylcobalamin dissolves under the tongue and enters the bloodstream through the mucous membrane — completely bypassing the stomach. It works regardless of how much acid your stomach produces. Standard tablets that you swallow still face the same absorption challenge as food-based B12.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>The Two-Problem Pile-Up in Seniors</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Adults over 60 face a double jeopardy. First, stomach acid production naturally declines with age — a condition called atrophic gastritis affects up to 30% of people over 60. Second, when a PPI is added on top of that, acid suppression becomes even more profound. The result is an almost complete inability to absorb B12 from food.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          This is why seniors on long-term PPIs are at significantly higher B12 deficiency risk than younger adults taking the same drugs. If you are over 70 and have been on a PPI for 2+ years without regular B12 testing, the chances are meaningful that your levels are already suboptimal — even if you have not noticed symptoms yet.
        </p>

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>How Often Should PPI Users Test B12?</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          There is no universal standard, but most evidence-based practitioners recommend:
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
          <li style={{ lineHeight: 1.7, marginBottom: '8px', color: '#2C2C2A' }}>Baseline B12 test before starting or within 6 months of starting long-term PPI therapy</li>
          <li style={{ lineHeight: 1.7, marginBottom: '8px', color: '#2C2C2A' }}>Annual serum B12 + methylmalonic acid (MMA) after 1 year of continuous PPI use</li>
          <li style={{ lineHeight: 1.7, marginBottom: '8px', color: '#2C2C2A' }}>Test more frequently (every 6 months) if you are also over age 75, vegan, or on metformin</li>
        </ul>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Personalized B12 Recommendation</h2>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: Sublingual B12 for PPI Users</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            Sublingual methylcobalamin at 1,000 mcg dissolves under the tongue, bypassing stomach acid completely — the only form that reliably works when PPIs are suppressing acid production.
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
