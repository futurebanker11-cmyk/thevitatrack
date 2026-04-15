import Header from '@/components/Header';
import AdUnit from '@/components/AdUnit';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Health Tools & Calculators for Seniors | VitaTrack',
  description: 'Free health calculators, quizzes, and risk assessments designed for adults over 60. BMI, blood pressure, heart age, memory check, and more.',
  alternates: { canonical: 'https://thevitatrack.com/tools' },
};

const tools = [
  { slug: 'bmi-senior', name: 'BMI Calculator', desc: 'Age-adjusted BMI with senior-specific healthy ranges' },
  { slug: 'heart-age', name: 'Heart Age Calculator', desc: 'Estimate your heart age based on lifestyle factors' },
  { slug: 'bp-checker', name: 'Blood Pressure Checker', desc: 'Check if your BP reading is normal for your age' },
  { slug: 'calorie-calculator', name: 'Calorie Calculator', desc: 'Daily calorie needs adjusted for seniors over 60' },
  { slug: 'protein-calculator', name: 'Protein Calculator', desc: 'How much protein you really need after 60' },
  { slug: 'hydration', name: 'Hydration Calculator', desc: 'Daily water intake based on age, weight, and activity' },
  { slug: 'diabetes-risk', name: 'Diabetes Risk Quiz', desc: 'Assess your type 2 diabetes risk factors' },
  { slug: 'kidney-check', name: 'Kidney Health Quiz', desc: 'Check early warning signs of kidney problems' },
  { slug: 'memory-check', name: 'Memory & Brain Quiz', desc: 'Quick assessment of cognitive health concerns' },
  { slug: 'bone-check', name: 'Bone Health Quiz', desc: 'Osteoporosis risk assessment for seniors' },
  { slug: 'fall-risk', name: 'Fall Risk Assessment', desc: 'Identify fall risk factors and prevention steps' },
  { slug: 'sleep-score', name: 'Sleep Quality Quiz', desc: 'Rate your sleep quality and get improvement tips' },
  { slug: 'mood-check', name: 'Mood & Depression Quiz', desc: 'Screen for common mood concerns in seniors' },
  { slug: 'eye-check', name: 'Eye Health Quiz', desc: 'Check for age-related vision risk factors' },
  { slug: 'digestion-check', name: 'Digestion & Gut Quiz', desc: 'Assess digestive health and common issues' },
  { slug: 'muscle-loss-risk', name: 'Muscle Loss Risk Quiz', desc: 'Sarcopenia risk screening for seniors' },
  { slug: 'vitamin-d-check', name: 'Vitamin D Check', desc: 'Are you at risk for vitamin D deficiency?' },
  { slug: 'prostate-check', name: 'Prostate Health Quiz', desc: 'Prostate symptom assessment for men over 50' },
  { slug: 'longevity-score', name: 'Biological Age Quiz', desc: 'Estimate your biological age vs chronological age' },
  { slug: 'glp1-calculator', name: 'GLP-1 Weight Loss Calculator', desc: 'Projected weight loss on Ozempic, Wegovy, Mounjaro' },
  { slug: 'supplement-budget', name: 'Supplement Budget Planner', desc: 'Build a supplement stack within your budget' },
];

export default function HealthToolsPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ color: '#14442A', fontSize: '2rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'Fraunces, serif' }}>
          Free Health Tools
        </h1>
        <p style={{ color: '#555550', marginBottom: '32px', fontSize: '1.05rem' }}>
          21 free calculators, quizzes, and risk assessments designed for adults over 60.
        </p>

        <AdUnit slot="8981383031" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', margin: '32px 0' }}>
          {tools.map(t => (
            <Link key={t.slug} href={'/tools/' + t.slug} className="article-card">
              <h2>{t.name}</h2>
              <p>{t.desc}</p>
            </Link>
          ))}
        </div>

        <AdUnit slot="3333737430" />
      </main>
    </>
  );
}
