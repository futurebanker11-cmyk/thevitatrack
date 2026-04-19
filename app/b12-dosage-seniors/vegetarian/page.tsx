import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { ChildPageJsonLd, ChildBreadcrumbJsonLd, ChildFaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B12 Dosage for Vegetarian Seniors (2026): Complete Guide',
  description: 'Vegetarian and vegan seniors are at highest risk for B12 deficiency. This guide covers the minimum 500–1,000 mcg daily dose, best plant-based B12 sources, fortified foods, and what blood tests to request.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors/vegetarian' },
  openGraph: {
    title: 'B12 Dosage for Vegetarian Seniors (2026)',
    description: 'Plant-based diets contain virtually no B12. Here is exactly how much to supplement as a vegetarian or vegan senior.',
    url: 'https://thevitatrack.com/b12-dosage-seniors/vegetarian',
    type: 'article',
  },
};

const faqs = [
  { q: 'How much B12 should a vegetarian senior take daily?', a: 'Vegetarian seniors should take at least 500 mcg of B12 daily. Vegans (no dairy or eggs) should take 500–1,000 mcg. The recommended dietary allowance of 2.4 mcg assumes you are eating meat regularly and have good absorption. Vegetarians who rely on dairy and eggs get some B12, but often not enough given age-related absorption decline. Vegans get almost none from food.' },
  { q: 'Do eggs and dairy provide enough B12 for vegetarian seniors?', a: 'Rarely. An egg contains about 0.6 mcg of B12, and a cup of milk provides about 1.2 mcg. Even a well-rounded lacto-ovo vegetarian diet typically delivers only 3–5 mcg per day from food — which sounds adequate on paper, but after age 60, stomach acid decline means only a fraction of that is actually absorbed. Supplements are essential.' },
  { q: 'Is nutritional yeast a reliable B12 source for vegans?', a: 'Only if it is fortified with B12 — always check the label. Nutritional yeast does not naturally contain meaningful B12. The fortified versions can provide 1–2 mcg per tablespoon, but this still falls short of what seniors need given reduced absorption. Think of fortified nutritional yeast as a dietary contributor, not a primary supplement.' },
  { q: 'Can vegans get B12 from tempeh or fermented foods?', a: 'No — this is a persistent myth. Tempeh, miso, nori (seaweed), and spirulina contain B12 analogs (corrinoids) that block rather than activate B12 receptors in the body. They are not true B12 and can even worsen deficiency by competing with active B12. Vegans must supplement with cyanocobalamin or methylcobalamin.' },
  { q: 'What form of B12 is best for vegans?', a: 'Both cyanocobalamin and methylcobalamin are vegan (neither is derived from animal products, despite B12 being found primarily in animal foods — the supplement forms are produced by bacterial fermentation). For seniors, sublingual methylcobalamin at 500–1,000 mcg is the most bioavailable form.' },
  { q: 'How often should vegetarian seniors test their B12?', a: 'Annually. Vegetarian and vegan seniors are in the highest-risk category for B12 deficiency and should not wait for symptoms before testing. Request both serum B12 and methylmalonic acid (MMA) — the MMA test detects functional deficiency before serum B12 shows a problem.' },
];

export default function VegetarianPage() {
  return (
    <>
      <Header />
      <ChildPageJsonLd headline="B12 Dosage for Vegetarian Seniors" description="Vegetarian and vegan seniors are at highest risk for B12 deficiency. Minimum 500–1,000 mcg daily supplement, plant-based food sources, and testing schedule." url="https://thevitatrack.com/b12-dosage-seniors/vegetarian" />
      <ChildBreadcrumbJsonLd slug="vegetarian" label="B12 Dosage for Vegetarian Seniors" />
      <ChildFaqJsonLd questions={faqs} />

      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '36px 24px 32px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '12px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <Link href="/b12-dosage-seniors" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>B12 Dosage for Seniors</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff' }}>Vegetarian</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            🌿 Diet-Specific Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            B12 Dosage for Vegetarian Seniors: Why Diet Alone Is Not Enough After 60
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px' }}>
            Plant-based diets are healthy in countless ways. But B12 is the one nutrient that nature put almost exclusively in animal foods. Combined with age-related absorption decline, vegetarian and vegan seniors face a near-certain deficiency without deliberate supplementation.
          </p>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>
        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        <div style={{ background: '#F0FAF3', border: '2px solid #1E6B3E', borderRadius: '12px', padding: '18px 22px', margin: '24px 0' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '8px' }}>Bottom Line for Plant-Based Seniors</strong>
          <p style={{ color: '#2C2C2A', lineHeight: 1.7, margin: 0 }}>
            Vegetarian seniors (dairy/eggs): <strong>500 mcg/day minimum.</strong> Vegan seniors (no animal products): <strong>500–1,000 mcg/day.</strong> Sublingual methylcobalamin is the most reliable form. Test B12 levels annually — do not wait for symptoms.
          </p>
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Why B12 Is the One Nutrient Vegetarians Cannot Get from Plants</h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Vitamin B12 is produced exclusively by bacteria and archaea — microscopic organisms that live in soil and in the digestive systems of animals. Animals accumulate B12 in their tissues by eating food or soil that contains these bacteria, or from bacteria living in their own digestive tracts. Plants do not synthesize B12 and do not accumulate meaningful amounts from soil unless it is heavily contaminated with animal waste.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          This is not a design flaw — our ancestors ate some soil-contaminated plant foods and drank untreated water that contained enough B12-producing bacteria to supplement their needs. Modern food hygiene, food washing, and clean water remove essentially all of that incidental B12. The result: anyone eating a plant-based diet in the developed world must supplement.
        </p>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>B12 Content in Vegetarian-Friendly Foods</h2>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: '#14442A', color: '#fff' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Food</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Serving</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>B12 (mcg)</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Note</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Plain yogurt', '1 cup', '1.1', 'Lacto-vegetarian only'],
                ['Swiss cheese', '1 oz', '0.9', 'Lacto-vegetarian only'],
                ['Egg (whole)', '1 large', '0.6', 'Ovo-vegetarian only'],
                ['Cow\'s milk', '1 cup', '1.2', 'Lacto-vegetarian only'],
                ['Fortified plant milk', '1 cup', '1.0–3.0', 'Check label — varies by brand'],
                ['Fortified nutritional yeast', '2 tbsp', '1.5–2.4', 'Must say fortified on label'],
                ['Fortified breakfast cereal', '1 serving', '0.6–6.0', 'Varies widely by brand'],
                ['Tempeh / nori / spirulina', 'Any amount', '0', 'Contain B12 analogs — NOT active B12'],
              ].map(([food, serving, b12, note], i) => (
                <tr key={food} style={{ background: i % 2 === 0 ? '#fff' : '#F7F6F3' }}>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1' }}>{food}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', color: '#717170' }}>{serving}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', fontWeight: 700, color: b12 === '0' ? '#DC2626' : '#1E6B3E' }}>{b12}</td>
                  <td style={{ padding: '10px 14px', borderBottom: '1px solid #E8E6E1', color: '#555550', fontSize: '0.85rem' }}>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '24px' }}>
          Even a well-constructed vegetarian diet typically provides only 3–5 mcg of B12 per day — and that is before accounting for the fact that seniors absorb far less than younger adults due to stomach acid decline. The gap between dietary intake and actual need is significant, and only deliberate supplementation closes it.
        </p>

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#14442A', margin: '32px 0 12px' }}>Personalized Recommendation</h2>
        <B12DosageFinder />

        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '28px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px' }}>Recommended: B12 for Plant-Based Seniors</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            Both cyanocobalamin and methylcobalamin are vegan — produced by bacterial fermentation, not animal sources. Sublingual methylcobalamin at 500–1,000 mcg is the preferred form for seniors with any absorption concern.
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
            <Link href="/b12-dosage-seniors/sublingual" className="interlink">Sublingual B12 for Seniors</Link>
          </div>
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
