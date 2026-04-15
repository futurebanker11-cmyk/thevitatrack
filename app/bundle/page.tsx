import Link from 'next/link';
import Header from '@/components/Header';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Complete Senior Health Vault — All 19 VitaTrack Guides | VitaTrack',
  alternates: { canonical: 'https://thevitatrack.com/bundle' },
};

export default function BundlePage() {
  return (
    <>
      <Header />
      <style>{`
:root{
  --green:#1A5632;--green-mid:#1E6B3E;--green-light:#dcfce7;--green-accent:#22c55e;
  --cream:#FDFAF5;--warm:#f8f4ed;--text:#1a1a1a;--text2:#444440;--muted:#6b7280;
  --border:#e5e1d8;--red:#dc2626;--gold:#d97706;--blue:#2563eb;
  --serif:'Fraunces',Georgia,serif;--sans:'Source Sans 3',system-ui,sans-serif;
  --max:860px;--shadow:0 4px 24px rgba(0,0,0,.08);
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:var(--sans);font-size:18px;line-height:1.65;color:var(--text);background:var(--cream);-webkit-font-smoothing:antialiased}

/* -- HEADER -- */
.hdr{background:var(--green);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.hdr-logo{color:#fff;font-family:var(--serif);font-size:20px;font-weight:700;text-decoration:none;display:flex;align-items:center;gap:8px}
.hdr-logo svg{width:28px;height:28px}
.hdr-cta{background:#fff;color:var(--green);font-weight:700;font-size:15px;padding:10px 24px;border-radius:100px;text-decoration:none;transition:transform .2s,box-shadow .2s}
.hdr-cta:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,.15)}

/* -- HERO -- */
.hero{background:linear-gradient(160deg,#0f3320 0%,#1a5632 45%,#1e6b3e 100%);color:#fff;padding:60px 24px 64px;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-30%;right:-10%;width:700px;height:700px;background:radial-gradient(circle,rgba(74,222,128,.08) 0%,transparent 65%);pointer-events:none}
.hero-inner{max-width:960px;margin:0 auto;display:grid;grid-template-columns:260px 1fr;gap:52px;align-items:center;position:relative;z-index:1}
.hero-img-col{display:flex;justify-content:center}
.hero-img-wrap{position:relative;display:inline-block}
.hero-cover{width:260px;border-radius:12px;box-shadow:0 32px 80px rgba(0,0,0,.5);display:block}
.hero-img-badge{position:absolute;bottom:-14px;left:50%;transform:translateX(-50%);background:#22c55e;color:#fff;font-size:13px;font-weight:800;padding:7px 18px;border-radius:100px;white-space:nowrap;box-shadow:0 4px 16px rgba(34,197,94,.4)}
.hero-text-col{padding-right:8px}
.hero-eyebrow{display:inline-block;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);color:#86efac;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:5px 16px;border-radius:100px;margin-bottom:18px}
.hero h1{font-family:var(--serif);font-size:clamp(26px,4vw,44px);font-weight:900;line-height:1.1;margin-bottom:14px}
.hero h1 em{font-style:italic;color:#86efac}
.hero-sub{font-size:17px;opacity:.88;line-height:1.55;margin-bottom:18px}
.hero-checks{list-style:none;padding:0;margin:0 0 22px}
.hero-checks li{font-size:15px;padding:5px 0;opacity:.9;display:flex;align-items:flex-start;gap:8px;color:#fff}
.hero-price-block{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:16px;padding:18px 22px;margin-bottom:22px;display:inline-block;min-width:220px}
.hero-price-row{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.hero-was{font-size:15px;text-decoration:line-through;opacity:.5}
.hero-save{background:#22c55e;color:#fff;font-size:11px;font-weight:800;padding:3px 10px;border-radius:100px;text-transform:uppercase;letter-spacing:.5px}
.hero-now{font-family:var(--serif);font-size:52px;font-weight:900;color:#86efac;line-height:1;margin-bottom:2px}
.hero-per{font-size:13px;opacity:.6}
.hero-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:#fff;color:var(--green);font-family:var(--serif);font-weight:800;font-size:18px;padding:18px 36px;border-radius:100px;text-decoration:none;transition:transform .2s,box-shadow .2s;margin-bottom:14px;box-shadow:0 4px 24px rgba(0,0,0,.2)}
.hero-btn:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(0,0,0,.3)}
.hero-guarantee{font-size:13px;opacity:.6;text-align:center}

/* -- TRUST BAR -- */
.trust{background:#fff;border-bottom:1px solid var(--border);padding:18px 24px}
.trust-inner{max-width:var(--max);margin:0 auto;display:flex;justify-content:center;gap:40px;flex-wrap:wrap}
.trust-item{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:var(--text)}
.trust-item b{font-family:var(--serif);font-size:22px;color:var(--green)}

/* -- SECTION WRAPPER -- */
.wrap{max-width:var(--max);margin:0 auto;padding:0 24px}
.section{padding:64px 0}
.section-title{font-family:var(--serif);font-size:clamp(26px,4vw,38px);font-weight:800;line-height:1.15;margin-bottom:12px;text-align:center}
.section-sub{font-size:18px;color:var(--text2);text-align:center;max-width:580px;margin:0 auto 40px;line-height:1.5}

/* -- VALUE BAR -- */
.value-bar{background:var(--green);color:#fff;padding:28px 24px;text-align:center}
.value-bar p{font-size:20px;font-weight:600;max-width:700px;margin:0 auto;line-height:1.5}
.value-bar b{font-family:var(--serif);font-size:26px;color:#86efac}

/* -- WHO THIS IS FOR -- */
.for-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.for-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:24px;display:flex;gap:14px;align-items:flex-start}
.for-icon{font-size:28px;flex-shrink:0;line-height:1}
.for-card h4{font-weight:700;font-size:17px;margin-bottom:4px}
.for-card p{font-size:15px;color:var(--text2);line-height:1.4}

/* -- GUIDES GRID -- */
.guides-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.guide-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:18px;display:flex;gap:12px;align-items:flex-start;transition:transform .2s,box-shadow .2s}
.guide-card:hover{transform:translateY(-2px);box-shadow:var(--shadow)}
.guide-num{font-family:var(--serif);font-size:13px;font-weight:700;color:var(--muted);background:var(--warm);border-radius:6px;padding:2px 8px;flex-shrink:0;margin-top:2px}
.guide-body h4{font-size:15px;font-weight:700;margin-bottom:3px;line-height:1.25}
.guide-body p{font-size:13px;color:var(--muted);line-height:1.35}
.guide-price{font-family:var(--serif);font-size:15px;font-weight:700;color:var(--green);margin-top:4px}

/* -- COMPARISON TABLE -- */
.compare{background:#fff;border:1px solid var(--border);border-radius:20px;overflow:hidden;box-shadow:var(--shadow)}
.compare-header{display:grid;grid-template-columns:1fr 1fr 1fr;background:var(--warm);border-bottom:1px solid var(--border)}
.compare-header div{padding:16px 20px;font-weight:700;font-size:15px;text-align:center}
.compare-header .ch-bundle{background:var(--green);color:#fff;font-family:var(--serif);font-size:17px}
.compare-row{display:grid;grid-template-columns:1fr 1fr 1fr;border-bottom:1px solid var(--border)}
.compare-row:last-child{border-bottom:none}
.compare-row div{padding:14px 20px;font-size:15px;text-align:center;display:flex;align-items:center;justify-content:center}
.compare-row .cr-label{justify-content:flex-start;font-weight:600;color:var(--text)}
.compare-row .cr-bundle{background:rgba(26,86,50,.04);font-weight:700;color:var(--green)}
.check{color:var(--green);font-size:20px}
.cross{color:#dc2626;font-size:18px;opacity:.5}

/* -- SAMPLE CONTENT -- */
.sample-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.sample-card{background:#fff;border:1px solid var(--border);border-radius:16px;overflow:hidden}
.sample-hdr{padding:14px 20px;font-weight:700;font-size:15px;color:#fff;display:flex;align-items:center;gap:8px}
.sample-body{padding:16px 20px}
.sample-body ul{list-style:none;padding:0}
.sample-body li{font-size:14px;color:var(--text2);padding:6px 0;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:8px;line-height:1.4}
.sample-body li:last-child{border-bottom:none}


/* -- TESTIMONIALS -- */
.test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.test-card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:24px}
.test-stars{color:#f59e0b;font-size:16px;margin-bottom:10px;letter-spacing:2px}
.test-text{font-size:15px;color:var(--text2);line-height:1.55;margin-bottom:14px;font-style:italic}
.test-name{font-size:14px;font-weight:700;color:var(--text)}
.test-sub{font-size:12px;color:var(--muted)}

/* -- FAQ -- */
.faq-list{display:flex;flex-direction:column;gap:12px}
.faq-item{background:#fff;border:1px solid var(--border);border-radius:14px;overflow:hidden}
.faq-q{font-weight:700;font-size:17px;padding:20px 24px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;line-height:1.3}
.faq-q::after{content:'+';font-size:24px;color:var(--green);font-weight:400;flex-shrink:0;transition:transform .2s}
.faq-item.open .faq-q::after{transform:rotate(45deg)}
.faq-a{display:none;padding:0 24px 20px;font-size:16px;color:var(--text2);line-height:1.6;border-top:1px solid var(--border);padding-top:16px}
.faq-item.open .faq-a{display:block}

/* -- FINAL CTA -- */
.final-cta{background:linear-gradient(160deg,#0f3320 0%,#1a5632 100%);color:#fff;padding:80px 24px;text-align:center;position:relative;overflow:hidden}
.final-cta::before{content:'';position:absolute;top:-50%;right:-10%;width:600px;height:600px;background:radial-gradient(circle,rgba(74,222,128,.1) 0%,transparent 65%);pointer-events:none}
.final-cta h2{font-family:var(--serif);font-size:clamp(28px,5vw,46px);font-weight:900;margin-bottom:16px}
.final-cta h2 em{font-style:italic;color:#86efac}
.final-cta p{font-size:19px;opacity:.85;max-width:540px;margin:0 auto 36px;line-height:1.5}
.final-price{display:inline-flex;align-items:baseline;gap:12px;margin-bottom:28px}
.fp-was{font-size:20px;text-decoration:line-through;opacity:.45}
.fp-now{font-family:var(--serif);font-size:64px;font-weight:900;color:#86efac;line-height:1}
.final-btn{display:inline-flex;align-items:center;gap:10px;background:#fff;color:var(--green);font-family:var(--serif);font-weight:800;font-size:22px;padding:22px 52px;border-radius:100px;text-decoration:none;transition:transform .2s,box-shadow .2s;box-shadow:0 4px 24px rgba(0,0,0,.2)}
.final-btn:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(0,0,0,.3)}
.final-note{font-size:14px;opacity:.6;margin-top:16px}

/* -- FOOTER -- */
.ftr{background:#fff;border-top:1px solid var(--border);padding:32px 24px;text-align:center}
.ftr p{font-size:13px;color:var(--muted);max-width:600px;margin:0 auto 8px;line-height:1.5}
.ftr a{color:var(--green);text-decoration:none;font-weight:600}

/* -- RESPONSIVE -- */
@media(max-width:768px){
  .hero{padding:40px 20px 48px}
  .hero-inner{grid-template-columns:1fr;gap:32px;text-align:center}
  .hero-img-col{justify-content:center}
  .hero-cover{max-width:200px}
  .hero-checks{text-align:left;max-width:340px;margin-left:auto;margin-right:auto}
  .hero-price-block{min-width:0;width:100%}
  .hero-now{font-size:44px}
  .hero-btn{font-size:16px;padding:16px 28px}
  .trust-inner{gap:20px}
  .for-grid{grid-template-columns:1fr}
  .guides-grid{grid-template-columns:1fr 1fr}
  .compare-header div,.compare-row div{padding:10px 12px;font-size:13px}
  .sample-grid{grid-template-columns:1fr}
  .test-grid{grid-template-columns:1fr}
  .section{padding:48px 0}
  .hdr-cta{font-size:13px;padding:8px 16px}
  .fp-now{font-size:48px}
  .final-btn{font-size:19px;padding:18px 36px}
}
@media(max-width:480px){
  .guides-grid{grid-template-columns:1fr}
  .hero-btn{font-size:17px;padding:17px 32px}
  .compare{font-size:13px}
}
@media print{body{background:#fff}}
      `}</style>


<section className="hero">
  <div className="hero-inner">

    
    <div className="hero-img-col">
      <div className="hero-img-wrap">
        <img src="/assets/cover/bundle.png" alt="The Complete Senior Health Vault &mdash; All 19 VitaTrack Senior Health Guides" className="hero-cover" />
        <div className="hero-img-badge">19 Guides Inside</div>
      </div>
    </div>

    
    <div className="hero-text-col">
      <div className="hero-eyebrow">Complete Collection &mdash; 2026</div>
      <h1>Every Senior Health Guide <em>In One Vault</em></h1>
      <p className="hero-sub">19 evidence-based guides covering every major health challenge after 60 &mdash; blood sugar, heart, sleep, bones, brain, gut, eyes, falls, and more.</p>
      <ul className="hero-checks">
        <li>&#x2713; 110,000+ words of evidence-based content</li>
        <li>&#x2713; 30-day action protocols in every guide</li>
        <li>&#x2713; Drug interaction warnings throughout</li>
        <li>&#x2713; Opens in any browser &mdash; no app needed</li>
      </ul>
      <div className="hero-price-block">
        <div className="hero-price-row">
          <span className="hero-was">$232 individually</span>
          <span className="hero-save">Save 80%</span>
        </div>
        <div className="hero-now">$47</div>
        <div className="hero-per">less than $2.50 per guide</div>
      </div>
      <a href="https://payhip.com/order?link=5LPT1" className="hero-btn">&#x1F6D2; Get Instant Access &mdash; $47</a>
      <p className="hero-guarantee">&#x1F512; Instant download &nbsp;&bull;&nbsp; No subscription &nbsp;&bull;&nbsp; Yours forever</p>
    </div>

  </div>
</section>

<div className="trust">
  <div className="trust-inner">
    <div className="trust-item"><b>19</b> Complete Guides</div>
    <div className="trust-item"><b>110K+</b> Words of Content</div>
    <div className="trust-item"><b>400K+</b> Seniors Helped</div>
    <div className="trust-item">&#x2705; Evidence-Based</div>
    <div className="trust-item">&#x2705; Instant Download</div>
  </div>
</div>

<div className="value-bar">
  <p>Buying all 19 guides individually costs <b>$230+</b> &mdash; the Complete Senior Health Vault gives you everything for just <b>$47</b>. That&rsquo;s less than $2.50 per guide.</p>
</div>

<div className="section" style={{"background":"var(--warm)"}}>
  <div className="wrap">
    <div className="section-title">Who This Is For</div>
    <div className="section-sub">The Complete Senior Health Vault was built specifically for one person</div>
    <div className="for-grid">
      <div className="for-card">
        <div className="for-icon">&#x1F9D3;</div>
        <div>
          <h4>Seniors 60+ managing multiple conditions</h4>
          <p>Blood pressure, blood sugar, bone density, and sleep all connected &mdash; these guides show you how to address everything together.</p>
        </div>
      </div>
      <div className="for-card">
        <div className="for-icon">&#x1F4CA;</div>
        <div>
          <h4>Anyone confused by lab results and medications</h4>
          <p>T-scores, GFR, A1C, PSA, Beers Criteria &mdash; decoded in plain language with what to ask your doctor.</p>
        </div>
      </div>
      <div className="for-card">
        <div className="for-icon">&#x1F46A;</div>
        <div>
          <h4>Adult children helping aging parents</h4>
          <p>A complete reference library covering every health concern your parent faces &mdash; at your fingertips when you need it.</p>
        </div>
      </div>
      <div className="for-card">
        <div className="for-icon">&#x1F3AF;</div>
        <div>
          <h4>Proactive seniors who don&rsquo;t want surprises</h4>
          <p>Don&rsquo;t wait for a fracture, a fall, or a diagnosis. These guides are your prevention playbook for the next decade.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="section">
  <div className="wrap">
    <div className="section-title">All 19 Guides Included</div>
    <div className="section-sub">Every guide includes a 30-day action protocol, supplement tables, drug interaction warnings, and FAQ chapter</div>
    <div className="guides-grid">

      <div className="guide-card">
        <span className="guide-num">01</span>
        <div className="guide-body">
          <h4>The Blood Sugar Rulebook</h4>
          <p>Berberine, CGM, post-meal glucose strategies &amp; 30-day reset</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">02</span>
        <div className="guide-body">
          <h4>Bones That Don&rsquo;t Break</h4>
          <p>DEXA scores, calcium/D3/K2 protocol &amp; fracture prevention</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">03</span>
        <div className="guide-body">
          <h4>Before You Forget</h4>
          <p>MIND diet, dementia prevention &amp; the 8 modifiable risk factors</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">04</span>
        <div className="guide-body">
          <h4>Fix Your Gut After 60</h4>
          <p>Probiotics, acid reflux, PPI truth &amp; microbiome restoration</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">05</span>
        <div className="guide-body">
          <h4>Save Your Sight</h4>
          <p>AMD, AREDS2 protocol, glaucoma &amp; cataract guidance</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">06</span>
        <div className="guide-body">
          <h4>What to Eat on Ozempic</h4>
          <p>4 weeks of high-protein, low-nausea GLP-1 meal plans</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">07</span>
        <div className="guide-body">
          <h4>The Ozempic Companion Playbook</h4>
          <p>Complete GLP-1 survival guide &mdash; side effects, muscle loss, long-term</p>
          <div className="guide-price">$14 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">08</span>
        <div className="guide-body">
          <h4>The Heart After 60 Playbook</h4>
          <p>Blood pressure, DASH-Mediterranean plan &amp; cardiovascular protocol</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">09</span>
        <div className="guide-body">
          <h4>Never Fall Again</h4>
          <p>Room-by-room home safety checklists &amp; fall prevention program</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">10</span>
        <div className="guide-body">
          <h4>Protect Your Kidneys at 60+</h4>
          <p>GFR tracking, lab results decoded &amp; 4-pillar protection strategy</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">11</span>
        <div className="guide-body">
          <h4>The Liver Rescue Plan</h4>
          <p>Fatty liver reversal, medication risks &amp; liver protection protocol</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">12</span>
        <div className="guide-body">
          <h4>Doctor Visit Cheat Sheet</h4>
          <p>Question lists, med logs, Medicare navigation &amp; advocacy strategies</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">13</span>
        <div className="guide-body">
          <h4>The Joy Protocol</h4>
          <p>Natural mood support, serotonin nutrition &amp; 30-day mood reset</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">14</span>
        <div className="guide-body">
          <h4>The Prostate Fix Playbook</h4>
          <p>BPH management, PSA guide &amp; nocturia protocol</p>
          <div className="guide-price">$14 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">15</span>
        <div className="guide-body">
          <h4>Move It or Lose It</h4>
          <p>Strength, balance &amp; exercise programs for seniors 60+</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">16</span>
        <div className="guide-body">
          <h4>Eat Well After 60</h4>
          <p>4 weeks of Mediterranean, DASH &amp; MIND diet meal plans</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">17</span>
        <div className="guide-body">
          <h4>Turn Back the Clock</h4>
          <p>Collagen, retinol &amp; the anti-aging supplement stack for skin</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card">
        <span className="guide-num">18</span>
        <div className="guide-body">
          <h4>Sleep Through the Night Again</h4>
          <p>Melatonin, magnesium, sleep apnea &amp; CBT-I protocol</p>
          <div className="guide-price">$12 individually</div>
        </div>
      </div>

      <div className="guide-card" style={{"borderColor":"var(--green)","boxShadow":"0 0 0 2px rgba(26,86,50,.15)"}}>
        <span className="guide-num" style={{"background":"var(--green-light)","color":"var(--green)"}}>19</span>
        <div className="guide-body">
          <h4>The Senior Supplement Stack &#x2B50;</h4>
          <p>Every supplement, dose &amp; drug interaction in one master reference</p>
          <div className="guide-price" style={{"color":"var(--green)"}}>$17 individually &mdash; flagship guide</div>
        </div>
      </div>

    </div>

    
    <div style={{"textAlign":"center","marginTop":"40px","padding":"36px","background":"var(--green)","borderRadius":"20px","color":"#fff"}}>
      <p style={{"fontFamily":"var(--serif)","fontSize":"24px","fontWeight":"800","marginBottom":"8px"}}>All 19 guides. One payment. Yours forever.</p>
      <p style={{"fontSize":"16px","opacity":".8","marginBottom":"20px"}}>Individual total: <span style={{"textDecoration":"line-through","opacity":".7"}}>$232</span> &nbsp;&rarr;&nbsp; Bundle price: <span style={{"fontFamily":"var(--serif)","fontSize":"22px","fontWeight":"800","color":"#86efac"}}>$47</span></p>
      <a href="https://payhip.com/order?link=5LPT1" style={{"display":"inline-flex","alignItems":"center","gap":"8px","background":"#fff","color":"var(--green)","fontFamily":"var(--serif)","fontWeight":"800","fontSize":"18px","padding":"16px 40px","borderRadius":"100px","textDecoration":"none","transition":"transform .2s"}}>&#x1F6D2; Get All 19 &mdash; $47</a>
    </div>
  </div>
</div>

<div className="section" style={{"background":"var(--warm)"}}>
  <div className="wrap">
    <div className="section-title">Vault vs Individual vs Free</div>
    <div className="section-sub">See exactly what you get at each level</div>
    <div className="compare">
      <div className="compare-header">
        <div>Free on VitaTrack</div>
        <div>Individual Guides</div>
        <div className="ch-bundle">&#x1F3C6; Complete Vault &mdash; $47</div>
      </div>
      <div className="compare-row">
        <div className="cr-label">21 free health tools &amp; quizzes</div>
        <div><span className="check">&#x2713;</span></div>
        <div className="cr-bundle"><span className="check">&#x2713;</span></div>
      </div>
      <div className="compare-row">
        <div className="cr-label">12 supplement category pages</div>
        <div><span className="check">&#x2713;</span></div>
        <div className="cr-bundle"><span className="check">&#x2713;</span></div>
      </div>
      <div className="compare-row">
        <div className="cr-label">Deep-dive guide (one topic)</div>
        <div><span className="cross">&#x2013;</span></div>
        <div className="cr-bundle"><span className="check">&#x2713; All 19</span></div>
      </div>
      <div className="compare-row">
        <div className="cr-label">30-day action protocols</div>
        <div><span className="cross">&#x2013;</span></div>
        <div className="cr-bundle"><span className="check">&#x2713;</span></div>
      </div>
      <div className="compare-row">
        <div className="cr-label">Drug interaction warnings</div>
        <div><span className="cross">&#x2013;</span></div>
        <div className="cr-bundle"><span className="check">&#x2713;</span></div>
      </div>
      <div className="compare-row">
        <div className="cr-label">Complete meal plans &amp; trackers</div>
        <div><span className="cross">&#x2013;</span></div>
        <div className="cr-bundle"><span className="check">&#x2713;</span></div>
      </div>
      <div className="compare-row">
        <div className="cr-label">Doctor visit question lists</div>
        <div><span className="cross">&#x2013;</span></div>
        <div className="cr-bundle"><span className="check">&#x2713;</span></div>
      </div>
      <div className="compare-row">
        <div className="cr-label">Total cost</div>
        <div style={{"color":"var(--green)","fontWeight":"700"}}>Free</div>
        <div className="cr-bundle" style={{"fontFamily":"var(--serif)","fontSize":"20px"}}>$47<br /><span style={{"fontSize":"12px","fontWeight":"400","color":"var(--muted)"}}>vs $232 individually</span></div>
      </div>
    </div>
  </div>
</div>

<div className="section">
  <div className="wrap">
    <div className="section-title">A Taste of What&rsquo;s Inside</div>
    <div className="section-sub">Every guide is packed with specific, actionable facts &mdash; not generic advice</div>
    <div className="sample-grid">
      <div className="sample-card">
        <div className="sample-hdr" style={{"background":"linear-gradient(135deg,#dc2626,#991b1b)"}}>&#x1F9B4; Bones That Don&rsquo;t Break</div>
        <div className="sample-body"><ul>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> The calcium mistake most seniors make that provides almost zero bone benefit</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> Why vitamin D without K2 may calcify your arteries instead of your bones</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> The LIFTMOR trial: resistance training increased spine BMD by 3.2% in seniors</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> 7 common medications quietly destroying bone density right now</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> How to read your T-score and FRAX risk number from your DEXA scan</li>
        </ul></div>
      </div>
      <div className="sample-card">
        <div className="sample-hdr" style={{"background":"linear-gradient(135deg,#1e40af,#1e3a8a)"}}>&#x1F634; Sleep Through the Night Again</div>
        <div className="sample-body"><ul>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> Why the 5&ndash;10mg melatonin doses at pharmacies are 5&ndash;20x too high for seniors</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> CBT-I outperforms sleeping pills in every head-to-head clinical trial</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> Benadryl linked in multiple studies to significantly increased dementia risk</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> The glymphatic system: how your brain cleans itself only during deep sleep</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> Tart cherry juice: 84 extra minutes of sleep per night in clinical trials</li>
        </ul></div>
      </div>
      <div className="sample-card">
        <div className="sample-hdr" style={{"background":"linear-gradient(135deg,#d97706,#92400e)"}}>&#x1F48A; What to Eat on Ozempic</div>
        <div className="sample-body"><ul>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> Up to 40% of GLP-1 weight loss can be muscle &mdash; here is how to prevent it</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> The leucine threshold: why protein timing matters as much as total amount</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> The foods that guarantee nausea &mdash; and the ones that prevent it</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> Complete electrolyte strategy for the dangerous dehydration most users miss</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> The STEP 4 trial: what happens to weight when GLP-1 medication stops</li>
        </ul></div>
      </div>
      <div className="sample-card">
        <div className="sample-hdr" style={{"background":"linear-gradient(135deg,#14442A,#1E6B3E)"}}>&#x1F4CB; The Senior Supplement Stack</div>
        <div className="sample-body"><ul>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> The 6-point label reading system that instantly identifies quality vs junk</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> Three budget tiers: $30, $60, and $100/month complete stacks</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> Why magnesium glycinate works when magnesium oxide does almost nothing</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> &ldquo;Proprietary blend&rdquo; on a label means underdosed, ineffective ingredients</li>
          <li><span style={{"color":"var(--green)","fontWeight":"700","flexShrink":"0"}}>&#x2713;</span> Which combinations are synergistic &mdash; and which are dangerous together</li>
        </ul></div>
      </div>
    </div>
  </div>
</div>

<div className="section" style={{"background":"var(--warm)"}}>
  <div className="wrap">
    <div className="section-title">Common Questions</div>
    <div className="section-sub" style={{"marginBottom":"28px"}}>Everything you need to know before buying</div>
    <div className="faq-list">

      <div className="faq-item">
        <div className="faq-q">What format are the guides in?</div>
        <div className="faq-a">Each guide is an HTML file that opens instantly in any browser &mdash; Chrome, Safari, Firefox &mdash; on your phone, tablet, computer, or TV browser. No app download, no special software, no account required. Files are delivered immediately after purchase via email.</div>
      </div>

      <div className="faq-item">
        <div className="faq-q">How do I access the guides after buying?</div>
        <div className="faq-a">Immediately after purchase, Payhip sends you an email with download links for all 19 guides. Click each link, download the file, and open it in your browser. You can save them to your device and read them any time &mdash; no internet connection needed once downloaded.</div>
      </div>

      <div className="faq-item">
        <div className="faq-q">Can I read these on my iPad or large-screen TV?</div>
        <div className="faq-a">Yes &mdash; all 19 guides are fully optimized for mobile and tablet. The text is large, the layouts are clean, and they work beautifully on iPads, Android tablets, and any device with a web browser. Many seniors in our community read them on their TV browser connected to a laptop via HDMI.</div>
      </div>

      <div className="faq-item">
        <div className="faq-q">Is this a subscription? Will I be charged again?</div>
        <div className="faq-a">Absolutely not. This is a one-time payment of $47. You own all 19 guides permanently. There is no subscription, no auto-renewal, no hidden charges. One payment, lifetime access.</div>
      </div>

      <div className="faq-item">
        <div className="faq-q">Is this medical advice?</div>
        <div className="faq-a">No. VitaTrack guides are educational health information &mdash; not medical advice. Every guide encourages readers to discuss supplement and medication decisions with their physician. The guides are designed to help you have better, more informed conversations with your doctor, not to replace those conversations.</div>
      </div>

    </div>
  </div>
</div>

<section className="final-cta">
  <div style={{"position":"relative","zIndex":"1"}}>
    <h2>Ready to Take Control of<br /><em>Your Health After 60?</em></h2>
    <p>All 19 guides. Every protocol. Every meal plan. Every supplement table. One payment. Yours forever.</p>
    <div className="final-price">
      <span className="fp-was">$232</span>
      <span className="fp-now">$47</span>
    </div>
    <br />
    <a href="https://payhip.com/order?link=5LPT1" className="final-btn">&#x1F6D2; Get Instant Access &mdash; $47</a>
    <p className="final-note">Instant download &bull; No subscription &bull; Open in any browser &bull; Yours forever</p>
  </div>
</section>


      

    </>
  );
}
