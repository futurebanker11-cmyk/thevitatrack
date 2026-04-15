import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'VitaTrack terms of use. Guidelines for using our health information, tools, and services.',
  alternates: { canonical: 'https://thevitatrack.com/terms-of-use' },
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 20px 60px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#14442A', marginBottom: '8px', fontFamily: 'Fraunces, serif' }}>Terms of Use</h1>
        <p style={{ color: '#717170', marginBottom: '32px' }}>Last updated: April 2026</p>

        <div className="article-content">
          <h2>Acceptance of Terms</h2>
          <p>By accessing and using thevitatrack.com (&quot;VitaTrack,&quot; &quot;the Site&quot;), you agree to these Terms of Use. If you do not agree, please do not use the Site.</p>

          <h2>Medical Disclaimer</h2>
          <p><strong>VitaTrack provides educational health information only.</strong> Our content, tools, calculators, quizzes, supplement recommendations, and guides are for informational purposes and are NOT a substitute for professional medical advice, diagnosis, or treatment.</p>
          <ul>
            <li>Always consult your doctor or qualified healthcare provider before starting any supplement, medication, diet, or exercise program.</li>
            <li>Never disregard professional medical advice or delay seeking treatment because of something you read on this site.</li>
            <li>Health tool results (BMI calculator, risk quizzes, etc.) are screening tools only and do not constitute a medical diagnosis.</li>
            <li>Supplement dosages and recommendations are general guidelines — your doctor should adjust them based on your specific health conditions and medications.</li>
          </ul>
          <p>If you are experiencing a medical emergency, call your local emergency number immediately.</p>

          <h2>Use of Content</h2>
          <p>All content on VitaTrack — including articles, tools, images, guides, and design — is owned by VitaTrack or its content creators. You may:</p>
          <ul>
            <li>Read and use our free content for personal, non-commercial purposes</li>
            <li>Share links to our pages</li>
            <li>Print articles for personal use</li>
          </ul>
          <p>You may not:</p>
          <ul>
            <li>Reproduce, republish, or redistribute our content without permission</li>
            <li>Use our content for commercial purposes without a license</li>
            <li>Scrape or bulk-download our content</li>
            <li>Remove attribution or copyright notices</li>
          </ul>

          <h2>Premium Guides</h2>
          <p>Premium health guides purchased through VitaTrack are for personal use only. You may not redistribute, resell, or share purchased guides. All sales are handled through our payment processor (Payhip). Refund policy: 30-day money-back guarantee on all guide purchases.</p>

          <h2>Health Tools</h2>
          <p>Our free health tools (calculators, quizzes, risk assessments) are designed for educational purposes. Results are based on published medical research and age-adjusted ranges for seniors. However:</p>
          <ul>
            <li>Tool results are estimates, not diagnoses</li>
            <li>Results should be discussed with your healthcare provider</li>
            <li>We cannot guarantee accuracy for every individual case</li>
            <li>Do not make health decisions based solely on tool results</li>
          </ul>

          <h2>Affiliate Links & Product Recommendations</h2>
          <p>VitaTrack participates in affiliate programs including Amazon Associates. When you click affiliate links and make purchases, we may earn a commission at no additional cost to you. Product recommendations are based on research, reviews, and suitability for seniors — not commission rates.</p>

          <h2>User Conduct</h2>
          <p>When using VitaTrack, you agree not to:</p>
          <ul>
            <li>Use the site for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any part of the site</li>
            <li>Interfere with the site&#39;s operation or other users&#39; access</li>
            <li>Submit false information through any forms</li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>VitaTrack and its creators shall not be liable for any damages arising from the use of this site, including but not limited to health outcomes resulting from following information found on this site. Use all health information at your own risk and in consultation with your healthcare provider.</p>

          <h2>Changes to Terms</h2>
          <p>We may update these Terms of Use at any time. Continued use of the Site after changes constitutes acceptance of the updated terms.</p>

          <h2>Contact</h2>
          <p>Questions about these terms? Email us at <a href="mailto:info@thevitatrack.com">info@thevitatrack.com</a>.</p>
        </div>
      </main>
    </>
  );
}
