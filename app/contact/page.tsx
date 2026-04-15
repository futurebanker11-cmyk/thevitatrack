import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with VitaTrack. Report corrections, suggest topics, or ask questions about our health content for seniors.',
  alternates: { canonical: 'https://thevitatrack.com/contact' },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <style>{`
        .contact-hero{background:linear-gradient(135deg,#14442A 0%,#1E6B3E 60%,#22874a 100%);color:#fff;padding:48px 20px 40px;text-align:center}
        .contact-hero h1{font-size:clamp(26px,5vw,38px);font-weight:700;font-family:'Fraunces',serif;margin:0 0 10px}
        .contact-hero p{font-size:17px;opacity:.88;max-width:480px;margin:0 auto;line-height:1.5}
        .contact-main{max-width:640px;margin:0 auto;padding:40px 20px 60px}
        .contact-main p{font-size:1.05rem;line-height:1.75;color:#2C2C2A;margin-bottom:16px}
        .contact-main a{color:#1E6B3E;font-weight:600}
        .contact-card{background:#fff;border:1px solid #E8E6E1;border-radius:14px;padding:28px;margin:24px 0}
        .contact-card h2{font-size:1.2rem;font-weight:700;color:#14442A;margin:0 0 16px}
        .contact-item{display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid #F3F2EF}
        .contact-item:last-child{border-bottom:none}
        .contact-icon{width:40px;height:40px;border-radius:10px;background:#F0FAF3;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
        .contact-info h3{font-size:0.95rem;font-weight:700;color:#14442A;margin:0 0 2px}
        .contact-info p{font-size:0.9rem;color:#717170;margin:0}
        .contact-types{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:24px 0}
        .contact-type{background:#F7F6F3;border-radius:12px;padding:16px;text-align:center}
        .contact-type strong{display:block;color:#14442A;margin-bottom:4px;font-size:0.95rem}
        .contact-type span{font-size:0.82rem;color:#717170}
        @media(max-width:500px){.contact-types{grid-template-columns:1fr}}
      `}</style>

      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We read every message and respond within 48 hours.</p>
      </section>

      <main className="contact-main">
        <div className="contact-card">
          <h2>Get in Touch</h2>
          <div className="contact-item">
            <div className="contact-icon">📧</div>
            <div className="contact-info">
              <h3>Email</h3>
              <p><a href="mailto:info@thevitatrack.com">info@thevitatrack.com</a></p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📘</div>
            <div className="contact-info">
              <h3>Facebook</h3>
              <p><a href="https://www.facebook.com/profile.php?id=61550903702285" target="_blank" rel="noopener">VitaTrack on Facebook</a></p>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">📺</div>
            <div className="contact-info">
              <h3>YouTube</h3>
              <p><a href="https://www.youtube.com/@healthyhabitat1304" target="_blank" rel="noopener">Healthy Habitat on YouTube</a></p>
            </div>
          </div>
        </div>

        <div className="contact-types">
          <div className="contact-type"><strong>Content Corrections</strong><span>Found an error? Let us know and we will fix it.</span></div>
          <div className="contact-type"><strong>Topic Suggestions</strong><span>Want us to cover a health topic?</span></div>
          <div className="contact-type"><strong>Partnership</strong><span>Brand or product collaboration inquiries.</span></div>
          <div className="contact-type"><strong>General Questions</strong><span>Anything else about VitaTrack.</span></div>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#717170', marginTop: '32px' }}>
          Please note: VitaTrack cannot provide personal medical advice. For health concerns, always consult your doctor or healthcare provider.
        </p>
      </main>
    </>
  );
}
