import type { Metadata } from 'next';
import Header from '@/components/Header';
import B12DosageFinder from '@/components/B12DosageFinder';
import { ReviewBadge, MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import BundleCTA from '@/components/BundleCTA';
import AdUnit from '@/components/AdUnit';
import { B12ArticleJsonLd, B12BreadcrumbJsonLd, B12FaqJsonLd } from '@/components/ArticleSchema';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'B12 Dosage for Seniors (2026 Guide): How Much Per Day by Age',
  description: 'How much B12 do seniors need? A doctor-reviewed guide covering exact dosages by age 60–80+, best forms (sublingual vs tablet), warning signs of deficiency, and drug interactions.',
  alternates: { canonical: 'https://thevitatrack.com/b12-dosage-seniors' },
  openGraph: {
    title: 'B12 Dosage for Seniors (2026): How Much Per Day by Age',
    description: 'Evidence-based B12 dosage guide for adults 60+. Personalized calculator, drug interactions, sublingual vs tablet, deficiency symptoms.',
    url: 'https://thevitatrack.com/b12-dosage-seniors',
    type: 'article',
  },
};

export default function B12DosagePage() {
  return (
    <>
      <Header />
      <B12ArticleJsonLd />
      <B12BreadcrumbJsonLd />
      <B12FaqJsonLd />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #14442A 0%, #1E6B3E 100%)', color: '#fff', padding: '40px 24px 36px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ marginBottom: '14px', fontSize: '0.875rem' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>B12 Dosage for Seniors</span>
          </nav>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '14px' }}>
            <span>💊</span> Supplement Guide
          </div>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '14px', fontFamily: 'Fraunces, serif' }}>
            B12 Dosage for Seniors (2026 Guide): How Much Per Day by Age
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6, maxWidth: '680px', marginBottom: '18px' }}>
            Vitamin B12 deficiency affects 1 in 5 adults over 60 — and most don&apos;t know it. Learn the right dose for your age, the best form to take, and which medications silently drain your levels.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }}>
            <span>✓ Evidence-based</span>
            <span>✓ Updated April 2026</span>
            <span>✓ Sources: NIH, ADA, NEJM</span>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '820px', margin: '0 auto', padding: '0 20px 60px' }}>

        <ReviewBadge />
        <AdUnit slot="8981383031" format="auto" />

        {/* Quick answer box */}
        <div style={{ background: '#F0FAF3', border: '2px solid #1E6B3E', borderRadius: '12px', padding: '20px 22px', margin: '28px 0' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '8px', fontSize: '1.05rem' }}>Quick Answer</strong>
          <p style={{ color: '#2C2C2A', lineHeight: 1.7, margin: 0 }}>
            The RDA for B12 is 2.4 mcg, but most seniors need <strong>100–1,000 mcg daily</strong> from supplements — because absorption drops sharply with age. People over 80, those on metformin or PPIs, and vegans often need the highest doses. Use the personalized finder below to get your number.
          </p>
        </div>

        {/* Interactive finder */}
        <B12DosageFinder />

        {/* Section 1 */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          Why Seniors Need More B12 Than the Label Says
        </h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          The official recommended daily amount (RDA) for vitamin B12 is just 2.4 mcg — easily met by eating a piece of chicken or a cup of yogurt. But that number was set for healthy young adults with normal stomach acid production.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          After age 50, up to <strong>30% of people develop atrophic gastritis</strong> — a condition where stomach acid production declines. B12 from food requires stomach acid and a protein called intrinsic factor to be absorbed. Without adequate acid, you can eat all the meat and dairy in the world and still become deficient.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          This is why the <strong>National Academy of Medicine recommends that adults over 50 get most of their B12 from supplements or fortified foods</strong> — not just from diet. Crystalline B12 in supplements does not require stomach acid for absorption.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          By age 70–80, the absorption gap widens further. A 2013 study in the <em>New England Journal of Medicine</em> found that high-dose oral B12 (1,000–2,000 mcg daily) was as effective as monthly B12 injections for correcting deficiency in older adults — something many doctors still do not know.
        </p>

        {/* Section 2: Dosage table */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          B12 Dosage Chart for Seniors by Age Group
        </h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '20px' }}>
          These are general evidence-based starting points. Always adjust based on blood test results.
        </p>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', borderRadius: '10px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#14442A', color: '#fff' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Age Group</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Suggested Daily Dose</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Best Form</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['60–69 (no risk factors)', '25–100 mcg', 'Cyanocobalamin tablet'],
                ['60–69 (vegan or on PPI/metformin)', '500 mcg', 'Methylcobalamin tablet'],
                ['70–79', '100–500 mcg', 'Methylcobalamin or cyanocobalamin'],
                ['80+ (general)', '500–1,000 mcg', 'Methylcobalamin sublingual'],
                ['80+ (with symptoms)', '1,000–2,000 mcg', 'Sublingual or injection (doctor-supervised)'],
              ].map(([age, dose, form], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#F7F6F3' }}>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #E8E6E1', fontWeight: 500 }}>{age}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #E8E6E1', color: '#1E6B3E', fontWeight: 700 }}>{dose}</td>
                  <td style={{ padding: '12px 16px', borderBottom: '1px solid #E8E6E1', color: '#555550' }}>{form}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 3: Forms */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          Sublingual vs. Tablet vs. Injection: Which Form Is Best?
        </h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          B12 supplements come in several forms. For seniors, the delivery method matters as much as the dose because absorption varies dramatically.
        </p>
        {[
          { title: 'Sublingual (Dissolves Under the Tongue)', verdict: 'Best for 70+', color: '#1E6B3E', text: 'Sublingual B12 bypasses the digestive system entirely, absorbing directly through the mucous membranes into the bloodstream. Ideal for anyone with stomach acid problems, atrophic gastritis, or who takes PPIs. Most sublingual tablets are methylcobalamin at 500–1,000 mcg.' },
          { title: 'Standard Tablet (Oral)', verdict: 'Good for 60–69', color: '#1A5632', text: 'High-dose cyanocobalamin tablets (500–2,000 mcg) work well because even when stomach acid is low, approximately 1% of any oral B12 dose is absorbed passively — without needing intrinsic factor. At 1,000 mcg, that is still 10 mcg absorbed, well above the RDA.' },
          { title: 'B12 Injection', verdict: 'For severe deficiency', color: '#717170', text: 'Intramuscular B12 injections (typically 1,000 mcg monthly) are prescribed for pernicious anemia or severe neurological deficiency. Research from the NEJM (2013) found no clinical difference between high-dose oral and monthly injections — so injections are rarely necessary unless oral supplements are not tolerated.' },
          { title: 'Multivitamins', verdict: 'Not enough for seniors', color: '#9CA3AF', text: 'Most multivitamins contain only 6–25 mcg of B12 — fine for younger adults but insufficient for anyone over 60 with reduced absorption. If you rely only on a multivitamin, check your B12 levels annually.' },
        ].map(({ title, verdict, color, text }) => (
          <div key={title} style={{ background: '#fff', border: '1px solid #E8E6E1', borderLeft: `4px solid ${color}`, borderRadius: '10px', padding: '18px 20px', marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <strong style={{ color: '#14442A', fontSize: '1rem' }}>{title}</strong>
              <span style={{ fontSize: '0.8rem', background: color, color: '#fff', padding: '3px 10px', borderRadius: '20px', fontWeight: 700, whiteSpace: 'nowrap' }}>{verdict}</span>
            </div>
            <p style={{ color: '#555550', lineHeight: 1.65, fontSize: '0.95rem', margin: 0 }}>{text}</p>
          </div>
        ))}

        <AdUnit slot="1775331881" format="fluid" layout="in-article" />

        {/* Section 4: Medications */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          Medications That Deplete B12 in Seniors
        </h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Several commonly prescribed medications for seniors directly interfere with B12 absorption. This is a major reason why blood levels can drop even when diet seems adequate.
        </p>
        <div style={{ background: '#FFF8E1', border: '1px solid #F59E0B', borderRadius: '12px', padding: '20px 22px', marginBottom: '24px' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '12px' }}>⚠ High-Risk Medications</strong>
          {[
            ['Metformin (Glucophage)', 'The most widely prescribed diabetes drug. Reduces B12 absorption by up to 30% over 4+ years. The American Diabetes Association now recommends routine B12 monitoring for all long-term metformin users.'],
            ['PPIs — Omeprazole, Pantoprazole, Esomeprazole', 'Proton pump inhibitors suppress stomach acid, blocking B12 absorption from food. Risk increases significantly after 2+ years of use.'],
            ['H2 Blockers — Famotidine, Ranitidine, Cimetidine', 'Lower stomach acid and impair B12 release from food proteins. Less potent than PPIs but significant with long-term use.'],
            ['Cholestyramine (Questran)', 'A bile acid sequestrant used for high cholesterol that can bind B12 and prevent its absorption.'],
          ].map(([drug, explanation]) => (
            <div key={drug} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #FDE68A' }}>
              <strong style={{ color: '#92400E', display: 'block', marginBottom: '4px' }}>{drug}</strong>
              <p style={{ color: '#78350F', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{explanation}</p>
            </div>
          ))}
          <p style={{ color: '#78350F', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>
            If you take any of these medications, discuss B12 monitoring with your doctor and consider supplementing 500–1,000 mcg daily.
          </p>
        </div>

        {/* Section 5: Deficiency symptoms */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          Recognizing B12 Deficiency: Symptoms Seniors Often Miss
        </h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          B12 deficiency develops slowly over years and is often misattributed to normal aging. Neurological damage, if untreated, can be permanent — making early recognition critical.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '24px' }}>
          {[
            { stage: 'Early (6–12 months)', color: '#1E6B3E', symptoms: ['Persistent fatigue and weakness', 'Brain fog, difficulty concentrating', 'Mild mood changes', 'Pale or yellowish skin'] },
            { stage: 'Moderate (1–3 years)', color: '#D97706', symptoms: ['Tingling or numbness in hands/feet', 'Balance problems, unsteady walk', 'Sore inflamed tongue', 'Heart palpitations'] },
            { stage: 'Advanced (3+ years)', color: '#DC2626', symptoms: ['Memory loss, confusion', 'Muscle weakness', 'Vision changes', 'Permanent nerve damage if untreated'] },
          ].map(({ stage, color, symptoms }) => (
            <div key={stage} style={{ background: '#fff', border: `2px solid ${color}`, borderRadius: '10px', padding: '16px' }}>
              <strong style={{ color, display: 'block', marginBottom: '10px', fontSize: '0.95rem' }}>{stage}</strong>
              <ul style={{ paddingLeft: '18px', margin: 0 }}>
                {symptoms.map(s => <li key={s} style={{ color: '#2C2C2A', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '4px' }}>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Many of these symptoms are blamed on &quot;getting older.&quot; Fatigue is dismissed. Tingling is attributed to arthritis. Memory changes are chalked up to dementia. A simple blood test can rule out B12 deficiency — and if it is the cause, it is one of the most treatable conditions in seniors.
        </p>

        {/* Section 6: Testing */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          How to Test Your B12 Levels (and What the Numbers Mean)
        </h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          The standard serum B12 test has a major flaw: it measures total B12 in blood, including inactive forms. You can have &quot;normal&quot; blood levels but still be functionally deficient at the cellular level.
        </p>
        <div style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'grid', gap: '12px' }}>
            {[
              { test: 'Serum B12', range: '<200 pg/mL = deficient | 200–300 pg/mL = borderline', note: 'Ask for this at your next check-up' },
              { test: 'Methylmalonic Acid (MMA)', range: '>0.4 µmol/L = functional deficiency', note: 'More sensitive — detects deficiency earlier' },
              { test: 'Homocysteine', range: '>15 µmol/L = elevated (also linked to heart disease)', note: 'Elevated in B12 and folate deficiency' },
            ].map(({ test, range, note }) => (
              <div key={test} style={{ padding: '14px', background: '#F7F6F3', borderRadius: '8px' }}>
                <strong style={{ color: '#14442A', display: 'block', marginBottom: '4px' }}>{test}</strong>
                <span style={{ fontSize: '0.875rem', color: '#1E6B3E', display: 'block', marginBottom: '4px' }}>{range}</span>
                <span style={{ fontSize: '0.85rem', color: '#717170' }}>{note}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          If your serum B12 is below 300 pg/mL, request an MMA test to confirm whether you are functionally deficient. Many integrative medicine physicians consider optimal B12 for seniors to be above 400–600 pg/mL — higher than the conventional normal range.
        </p>

        {/* Section 7: Methylcobalamin vs cyanocobalamin */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          Methylcobalamin vs Cyanocobalamin: Does It Actually Matter?
        </h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          <strong>Cyanocobalamin</strong> is the most studied, most stable form. It has been used in clinical trials for decades and is highly effective at correcting deficiency. It is less expensive and more widely available. The body converts it to active forms as needed.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          <strong>Methylcobalamin</strong> is a naturally occurring active form. It does not require conversion by the liver, which may benefit people with MTHFR gene variants or liver issues. As a sublingual tablet, it has superior absorption in people with severe gastric atrophy.
        </p>
        <div style={{ background: '#F0FAF3', borderRadius: '10px', padding: '16px 20px', marginBottom: '24px', border: '1px solid #B2DFC0' }}>
          <strong style={{ color: '#14442A' }}>Bottom line:</strong>
          <p style={{ color: '#2C2C2A', lineHeight: 1.65, marginTop: '6px', marginBottom: 0 }}>
            Both work for most people. If you are over 75, have absorption issues, or are correcting an active deficiency, <strong>sublingual methylcobalamin gives you the best chance of restoring levels quickly</strong>. For healthy 60-year-olds, standard cyanocobalamin at 500–1,000 mcg is perfectly sufficient.
          </p>
        </div>

        {/* Section 8: Diet sources */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          Best Food Sources of B12 for Seniors
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ background: '#14442A', color: '#fff' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Food</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>Serving</th>
                <th style={{ padding: '10px 16px', textAlign: 'left' }}>B12 (mcg)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Beef liver', '3 oz cooked', '70.7'],
                ['Clams', '3 oz cooked', '17.0'],
                ['Sardines (canned)', '3 oz', '6.3'],
                ['Tuna (light, canned)', '3 oz', '2.5'],
                ['Salmon', '3 oz cooked', '2.4'],
                ['Beef (ground)', '3 oz cooked', '2.1'],
                ['Plain Greek yogurt', '6 oz', '1.3'],
                ['Fortified nutritional yeast', '2 tbsp', '2.4'],
                ['Fortified plant milk', '1 cup', '1.2'],
              ].map(([food, serving, b12], i) => (
                <tr key={food} style={{ background: i % 2 === 0 ? '#fff' : '#F7F6F3' }}>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid #E8E6E1' }}>{food}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid #E8E6E1', color: '#717170' }}>{serving}</td>
                  <td style={{ padding: '10px 16px', borderBottom: '1px solid #E8E6E1', fontWeight: 700, color: '#1E6B3E' }}>{b12}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 9: Brain health */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          B12 and Brain Health: What the Research Shows
        </h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          The brain is disproportionately affected by B12 deficiency because the vitamin is essential for myelin synthesis — the protective sheath around nerve fibers. Without enough B12, myelin degrades, causing tingling sensations, balance problems, and cognitive decline.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          A landmark study published in <em>Neurology</em> (2008) found that older adults with low B12 levels had <strong>faster rates of brain volume loss</strong> over 5 years compared to those with adequate levels. Brain shrinkage is strongly associated with dementia risk.
        </p>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          <strong>Correcting a B12 deficiency can reverse cognitive decline when caught early.</strong> Once neurological damage is established after years of severe deficiency, some effects may be permanent — which underscores the importance of testing early rather than waiting for symptoms.
        </p>
        <div style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '10px', padding: '18px 20px', marginBottom: '24px' }}>
          <strong style={{ color: '#14442A', display: 'block', marginBottom: '8px' }}>Key research summary</strong>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Oxford University (2010): B vitamin supplements including B12 slowed brain atrophy by 53% in mild cognitive impairment',
              'NEJM (2013): 1,000–2,000 mcg daily oral B12 as effective as monthly injections for deficiency correction',
              'Neurology (2008): Low B12 associated with 6× faster brain shrinkage in adults over 61',
              'ADA Guidelines (2022): Recommend annual B12 monitoring for metformin users',
            ].map(item => <li key={item} style={{ lineHeight: 1.7, marginBottom: '6px', color: '#2C2C2A', fontSize: '0.95rem' }}>{item}</li>)}
          </ul>
        </div>

        {/* Section 10: Safety */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          Is B12 Safe? Side Effects and What to Watch For
        </h2>
        <p style={{ lineHeight: 1.75, color: '#2C2C2A', marginBottom: '16px' }}>
          Vitamin B12 is one of the safest supplements available. Because it is water-soluble, your kidneys excrete any excess. No tolerable upper intake level has been established by the National Academy of Medicine, and no adverse effects have been documented from high oral doses.
        </p>
        <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>
          {[
            'Rare allergic reactions to cobalt (a component of B12) are possible — stop use if rash or breathing difficulty develops',
            'Very high doses (above 2,000 mcg daily) have been associated in some observational studies with slightly elevated lung cancer risk in male smokers — though causality was not established',
            'If you have kidney disease, discuss high-dose B12 with your doctor before starting',
            'Some people experience mild acne with very high-dose supplementation',
          ].map(item => <li key={item} style={{ lineHeight: 1.7, marginBottom: '10px', color: '#2C2C2A' }}>{item}</li>)}
        </ul>

        {/* Amazon product box */}
        <div style={{ background: '#FFFBF0', border: '2px solid #F59E0B', borderRadius: '14px', padding: '22px', margin: '32px 0' }}>
          <strong style={{ color: '#78350F', display: 'block', marginBottom: '6px', fontSize: '1.05rem' }}>VitaTrack Recommended: Sublingual Methylcobalamin B12</strong>
          <p style={{ color: '#92400E', lineHeight: 1.65, marginBottom: '14px', fontSize: '0.95rem' }}>
            For adults 70+ or anyone with absorption concerns, sublingual methylcobalamin is the gold standard. Look for 1,000 mcg doses that dissolve under the tongue.
          </p>
          <a href="https://amzn.to/4sEloLH" target="_blank" rel="nofollow noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FF9900', color: '#000', textDecoration: 'none', padding: '12px 22px', borderRadius: '8px', fontWeight: 700, fontSize: '1rem' }}>
            <span>🛒</span> View on Amazon
          </a>
          <p style={{ fontSize: '0.75rem', color: '#A16207', marginTop: '8px', marginBottom: 0 }}>
            Affiliate link — we may earn a small commission at no extra cost to you.
          </p>
        </div>

        {/* Section 11: How to take B12 */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          How to Take B12 Correctly for Maximum Absorption
        </h2>
        {[
          { tip: 'Take tablets in the morning', reason: 'B vitamins support energy metabolism — morning dosing aligns with your body\'s energy demands and avoids any potential sleep disruption.' },
          { tip: 'Sublingual: hold under tongue for 30–60 seconds', reason: 'Do not swallow immediately. Let the tablet dissolve fully under your tongue to maximize direct absorption through the mucous membrane.' },
          { tip: 'Separate from coffee by 30 minutes', reason: 'Coffee increases gut motility and can reduce absorption of water-soluble vitamins when taken simultaneously.' },
          { tip: 'Do not take with vitamin C megadoses', reason: 'Very high vitamin C (above 500 mg) taken at the same time can degrade B12 before it is absorbed. Space them 2 hours apart.' },
          { tip: 'Consistency over sporadic high doses', reason: 'Daily supplementation maintains steady blood levels better than taking a week\'s worth at once.' },
        ].map(({ tip, reason }) => (
          <div key={tip} style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
            <span style={{ color: '#1E6B3E', fontSize: '1.3rem', flexShrink: 0, marginTop: '2px' }}>✓</span>
            <div>
              <strong style={{ color: '#14442A', display: 'block' }}>{tip}</strong>
              <p style={{ color: '#555550', lineHeight: 1.65, marginTop: '4px', marginBottom: 0, fontSize: '0.95rem' }}>{reason}</p>
            </div>
          </div>
        ))}

        {/* Child guides hub */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          Detailed B12 Guides by Topic
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { href: '/b12-dosage-seniors/metformin', label: 'B12 on Metformin', desc: 'Exact dose if you take diabetes medication' },
            { href: '/b12-dosage-seniors/ppi-users', label: 'B12 on Omeprazole/PPIs', desc: 'Acid-blocker users — sublingual explained' },
            { href: '/b12-dosage-seniors/age-70', label: 'B12 at Age 70', desc: 'Age-specific dosage for the 70–79 band' },
            { href: '/b12-dosage-seniors/age-80', label: 'B12 at Age 80+', desc: 'Higher-dose guidance for 80+ adults' },
            { href: '/b12-dosage-seniors/vegetarian', label: 'B12 for Vegetarian Seniors', desc: 'Plant-based diet — what food cannot provide' },
            { href: '/b12-dosage-seniors/1000-mcg', label: 'Is 1000 mcg Too Much?', desc: 'Safety science explained simply' },
            { href: '/b12-dosage-seniors/sublingual', label: 'Sublingual B12 Guide', desc: 'How it works and how to use it correctly' },
            { href: '/b12-dosage-seniors/methylcobalamin', label: 'Methylcobalamin vs Cyanocobalamin', desc: 'Which form is actually better?' },
            { href: '/b12-dosage-seniors/memory-loss', label: 'B12 for Memory Loss', desc: 'When cognitive decline is reversible' },
            { href: '/b12-dosage-seniors/tingling-feet', label: 'B12 for Neuropathy', desc: 'Tingling feet, dosage, and nerve repair' },
          ].map(({ href, label, desc }) => (
            <Link key={href} href={href} style={{ display: 'block', padding: '14px 16px', background: '#fff', border: '1px solid #E8E6E1', borderRadius: '10px', textDecoration: 'none', transition: 'box-shadow 150ms, border-color 150ms' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLElement).style.borderColor = '#1E6B3E'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = '#E8E6E1'; }}>
              <strong style={{ color: '#14442A', display: 'block', marginBottom: '4px', fontSize: '0.95rem' }}>{label} →</strong>
              <span style={{ fontSize: '0.825rem', color: '#717170' }}>{desc}</span>
            </Link>
          ))}
        </div>

        {/* Related articles */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 14px' }}>
          Related: B12 and Your Health Conditions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {[
            { href: '/conditions/diabetes-type-2', label: 'Diabetes & Metformin B12 Depletion' },
            { href: '/conditions/memory-loss-dementia', label: 'Memory Loss & Cognitive Decline' },
            { href: '/symptoms/numbness-tingling', label: 'Numbness & Tingling in Hands/Feet' },
            { href: '/conditions/peripheral-neuropathy', label: 'Peripheral Neuropathy' },
            { href: '/symptoms/weakness-new-generalized', label: 'Unexplained Fatigue & Weakness' },
            { href: '/brain', label: 'Brain Health Supplement Guide' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="interlink" style={{ padding: '12px 14px', borderRadius: '8px', background: '#fff', border: '1px solid #E8E6E1' }}>
              {label} →
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#14442A', margin: '36px 0 16px', textAlign: 'center' }}>
          Frequently Asked Questions
        </h2>
        <div>
          {[
            { q: 'How much B12 should a 70-year-old take daily?', a: 'Most adults over 70 benefit from 100–500 mcg of B12 daily. The RDA is only 2.4 mcg, but absorption decreases sharply with age due to reduced stomach acid. Higher supplemental doses are necessary to maintain adequate blood levels. Sublingual or high-dose tablets bypass the absorption problem and are just as effective as injections.' },
            { q: 'What is the best form of B12 for seniors?', a: 'Methylcobalamin sublingual (dissolves under the tongue) is the most bioavailable form for seniors because it bypasses the digestive system and stomach acid completely. Cyanocobalamin tablets at high doses (500–2,000 mcg) also work well for those with mild-to-moderate absorption issues.' },
            { q: 'Can you take too much B12?', a: 'B12 is water-soluble and considered safe even at high doses — excess is excreted in urine. No tolerable upper intake level has been established. However, supplementing far beyond your need (above 2,000 mcg daily without deficiency) is unnecessary.' },
            { q: 'Does metformin deplete B12?', a: 'Yes. Metformin reduces B12 absorption by up to 30% over time. The American Diabetes Association recommends regular B12 monitoring for anyone on long-term metformin. If you have been on metformin for more than 2 years, ask your doctor for a B12 blood test and consider supplementing 500–1,000 mcg daily.' },
            { q: 'What are the signs of B12 deficiency in the elderly?', a: 'Early signs include fatigue, weakness, and brain fog. As deficiency progresses, symptoms include tingling or numbness in the hands and feet, balance problems, memory loss, and in severe cases irreversible nerve damage. Many seniors are deficient for years before noticeable symptoms appear — which is why routine testing is important.' },
            { q: 'When is the best time to take B12?', a: 'Morning with breakfast works well for most people. Sublingual methylcobalamin is best on an empty stomach — hold it under the tongue for 30–60 seconds before swallowing. If you take a B-complex supplement, morning dosing supports energy metabolism throughout the day.' },
            { q: 'How often should seniors get their B12 levels tested?', a: 'Seniors without risk factors should test every 2–3 years. Those on metformin, PPIs, or a vegan diet should test annually. Ask for serum B12 plus methylmalonic acid (MMA) — MMA detects functional deficiency earlier, even when serum B12 looks normal.' },
            { q: 'Does B12 improve memory in seniors?', a: 'B12 deficiency is a reversible cause of memory problems and cognitive decline. Correcting a deficiency can significantly improve mental clarity and reduce brain fog within weeks to months. B12 supplementation does not improve memory in people who already have adequate levels — the benefit is specific to those who are deficient.' },
          ].map(({ q, a }) => (
            <div key={q} className="faq-item" style={{ background: '#fff', border: '1px solid #E8E6E1', borderRadius: '12px', marginBottom: '10px', overflow: 'hidden' }}>
              <button className="faq-q" style={{ padding: '16px 22px', fontSize: '1rem', fontWeight: 600, color: '#2C2C2A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1.4 }}>
                {q}
                <span className="faq-icon" style={{ fontSize: '1.3rem', color: '#717170', flexShrink: 0 }}>+</span>
              </button>
              <div className="faq-a" style={{ padding: '0 22px 16px', fontSize: '0.95rem', color: '#555550', lineHeight: 1.7 }}>
                {a}
              </div>
            </div>
          ))}
        </div>

        <MedicalDisclaimer />
        <BundleCTA variant="inline" />
        <AdUnit slot="3333737430" format="auto" />
      </main>
    </>
  );
}
