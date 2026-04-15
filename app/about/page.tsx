import Header from '@/components/Header';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About VitaTrack — Evidence-Based Health Support for Seniors',
  description: 'VitaTrack provides evidence-based health tools, supplement guides, and medical information for adults over 60. Learn about our editorial process and commitment to accuracy.',
  alternates: { canonical: 'https://thevitatrack.com/about' },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <style>{`
        .about-hero{background:linear-gradient(135deg,#14442A 0%,#1E6B3E 60%,#22874a 100%);color:#fff;padding:48px 20px 40px;text-align:center}
        .about-hero h1{font-size:clamp(26px,5vw,38px);font-weight:700;font-family:'Fraunces',serif;margin:0 0 10px}
        .about-hero p{font-size:17px;opacity:.88;max-width:520px;margin:0 auto;line-height:1.5}
        .about-main{max-width:760px;margin:0 auto;padding:40px 20px 60px}
        .about-main h2{font-size:1.4rem;font-weight:700;color:#14442A;margin:36px 0 12px;font-family:'Fraunces',serif}
        .about-main h3{font-size:1.1rem;font-weight:700;color:#1E6B3E;margin:24px 0 8px}
        .about-main p{font-size:1.05rem;line-height:1.75;color:#2C2C2A;margin-bottom:16px}
        .about-main ul{padding-left:24px;margin-bottom:16px}
        .about-main li{margin-bottom:8px;line-height:1.65;color:#2C2C2A}
        .about-main a{color:#1E6B3E;text-decoration:underline;text-underline-offset:2px}
        .about-card{background:#F0FAF3;border:1px solid #BBF7D0;border-radius:14px;padding:24px;margin:24px 0}
        .about-card h3{margin-top:0;color:#065F46}
        .about-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;margin:16px 0}
        .about-stat{background:#fff;border:1px solid #E8E6E1;border-radius:12px;padding:16px;text-align:center}
        .about-stat strong{display:block;font-size:1.8rem;color:#1A5632;font-weight:800}
        .about-stat span{font-size:0.85rem;color:#717170}
      `}</style>

      <section className="about-hero">
        <h1>About VitaTrack</h1>
        <p>Evidence-based health information designed specifically for adults over 60.</p>
      </section>

      <main className="about-main">
        <div className="about-grid">
          <div className="about-stat"><strong>200+</strong><span>Health articles</span></div>
          <div className="about-stat"><strong>21</strong><span>Free health tools</span></div>
          <div className="about-stat"><strong>12</strong><span>Supplement guides</span></div>
          <div className="about-stat"><strong>19</strong><span>Premium protocols</span></div>
        </div>

        <h2>Our Mission</h2>
        <p>VitaTrack exists because health information for seniors is often buried in medical jargon, scattered across dozens of websites, or written for a general audience that doesn't account for the unique needs of adults over 60.</p>
        <p>We translate peer-reviewed medical research into clear, actionable guidance. Every supplement recommendation includes dosage, drug interactions, and evidence level. Every symptom guide includes red flags that require urgent care. Every tool is calibrated for senior-specific ranges.</p>

        <h2>Our Editorial Process</h2>
        <div className="about-card">
          <h3>How We Create Content</h3>
          <p>Every article, tool, and guide on VitaTrack follows a rigorous editorial process:</p>
          <ul>
            <li><strong>Research-based:</strong> Content is derived from peer-reviewed medical journals, clinical guidelines (NIH, WHO, AHA, AGS), and established medical references.</li>
            <li><strong>Senior-specific:</strong> All dosages, ranges, and recommendations are adjusted for adults over 60. Standard medical ranges often don't apply to older adults — we account for age-related changes.</li>
            <li><strong>Drug interaction awareness:</strong> Supplement guides always note interactions with common medications (statins, blood thinners, BP medications, diabetes drugs).</li>
            <li><strong>Regular updates:</strong> Content is reviewed and updated when new research or guideline changes are published.</li>
            <li><strong>Plain language:</strong> We write at a reading level accessible to everyone, avoiding unnecessary medical terminology.</li>
          </ul>
        </div>

        <h2>What We Cover</h2>
        <p><strong>Health Conditions:</strong> In-depth guides on conditions common in seniors — diabetes, heart disease, kidney health, arthritis, dementia, and more. Each guide covers symptoms, causes, treatments, lifestyle changes, and when to see a doctor.</p>
        <p><strong>Supplement Guides:</strong> Evidence-based supplement recommendations organized by health concern. We cover dosage, form (which type to buy), timing, drug interactions, and what to look for on Amazon.</p>
        <p><strong>Health Tools:</strong> 21 free calculators and quizzes — BMI with senior-adjusted ranges, heart age, blood pressure checker, diabetes risk, memory check, and more. All tools use age-adjusted thresholds, not standard adult ranges.</p>
        <p><strong>Daily Living:</strong> Practical tips for morning routines, medication management, home safety, fall prevention, and daily habits that improve quality of life.</p>
        <p><strong>Recipes:</strong> Nutritious, easy-to-make meals designed for seniors — low-sodium, diabetic-friendly, kidney-safe options.</p>

        <h2>Medical Disclaimer</h2>
        <p>VitaTrack provides educational health information only. Our content is <strong>not a substitute for professional medical advice, diagnosis, or treatment</strong>. Always consult your doctor or qualified healthcare provider before:</p>
        <ul>
          <li>Starting any new supplement</li>
          <li>Changing your medication</li>
          <li>Making significant changes to your diet or exercise routine</li>
          <li>Interpreting any health tool results</li>
        </ul>
        <p>Individual results may vary. What works for one person may not work for another, especially given the complexity of health conditions and medications common in older adults.</p>

        <h2>Affiliate Disclosure</h2>
        <p>VitaTrack may earn a commission from purchases made through links on this site (Amazon Associates and other affiliate programs). This does not affect our recommendations — every product is selected based on evidence, quality, and suitability for seniors. We never recommend a product solely because it offers a higher commission.</p>

        <h2>Contact Us</h2>
        <p>Have a question, correction, or suggestion? We welcome your feedback.</p>
        <p><Link href="/contact">Contact us here</Link> — we respond within 48 hours.</p>
      </main>
    </>
  );
}
