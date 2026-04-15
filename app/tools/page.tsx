import Link from 'next/link';
import Header from '@/components/Header';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Senior Health Tools — 21 Calculators & Quizzes | VitaTrack',
  alternates: { canonical: 'https://thevitatrack.com/tools' },
};

export default function ToolsPage() {
  return (
    <>
      <Header />
      <style>{`
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--hdr:#14442A;--hero:#1E6B3E;--green:#1A5632;--bg:#F7F6F3;--white:#fff;--border:#E8E6E1;--text:#2C2C2A;--text2:#555550;--muted:#717170;--radius:14px;--shadow:0 2px 12px rgba(0,0,0,.06)}
html{scroll-behavior:smooth}
body{font-family:'Source Sans 3',-apple-system,sans-serif;font-size:18px;line-height:1.6;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased}

/* HEADER */
.hdr{background:var(--hdr);position:sticky;top:0;z-index:1000}
.hdr-inner{max-width:1100px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between}
.hdr-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff}
.hdr-logo svg{width:32px;height:32px}.hdr-logo span{font-size:22px;font-weight:700}
.hdr-nav{display:flex;gap:6px}.hdr-nav a{color:rgba(255,255,255,.85);text-decoration:none;font-size:15px;font-weight:500;padding:8px 16px;border-radius:8px;transition:background .15s}
.hdr-nav a:hover,.hdr-nav a.active{background:rgba(255,255,255,.12);color:#fff}
.hdr-toggle{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:8px;min-height:44px;min-width:44px}
.hdr-toggle svg{width:26px;height:26px}

/* HERO */
.hero{background:linear-gradient(135deg,#14442A 0%,#1E6B3E 60%,#22874a 100%);color:#fff;padding:64px 20px 56px;text-align:center;position:relative;overflow:hidden}
.hero::before{content:'';position:absolute;top:-40%;right:-15%;width:500px;height:500px;background:radial-gradient(circle,rgba(74,222,128,.1) 0%,transparent 70%);pointer-events:none}
.hero-label{display:inline-block;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:100px;padding:6px 20px;font-size:13px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;margin-bottom:20px}
.hero h1{font-size:clamp(30px,5.5vw,48px);font-weight:700;line-height:1.12;max-width:650px;margin:0 auto 16px}
.hero p{font-size:19px;max-width:560px;margin:0 auto;opacity:.88;line-height:1.55}
.hero-counters{display:flex;justify-content:center;gap:48px;margin-top:32px}
.hero-count{text-align:center}
.hero-count strong{display:block;font-size:36px;font-weight:700;line-height:1}
.hero-count span{font-size:14px;opacity:.7;margin-top:2px;display:block}

/* MAIN */
.main{max-width:1060px;margin:0 auto;padding:0 20px}

/* CATEGORY SECTION */
.cat-section{margin:48px 0 0}
.cat-header{display:flex;align-items:center;gap:14px;margin-bottom:20px}
.cat-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.cat-icon svg{width:24px;height:24px}
.cat-icon.heart{background:#FEE2E2}.cat-icon.heart svg{stroke:#DC2626}
.cat-icon.brain{background:#EDE9FE}.cat-icon.brain svg{stroke:#7C3AED}
.cat-icon.body{background:#DBEAFE}.cat-icon.body svg{stroke:#2563EB}
.cat-icon.nutrition{background:#FEF3C7}.cat-icon.nutrition svg{stroke:#D97706}
.cat-icon.safety{background:#D1FAE5}.cat-icon.safety svg{stroke:#059669}
.cat-icon.meta{background:#FFF7ED}.cat-icon.meta svg{stroke:#EA580C}
.cat-title{font-size:24px;font-weight:700;color:var(--text)}
.cat-sub{font-size:15px;color:var(--muted);margin-top:2px}

/* TOOL CARDS */
.tools-row{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px}

.tc{background:var(--white);border:1px solid var(--border);border-radius:var(--radius);padding:24px 24px 20px;text-decoration:none;color:var(--text);transition:transform .2s,box-shadow .2s;display:block;position:relative}
.tc:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.08)}

.tc-top{display:flex;align-items:flex-start;gap:14px;margin-bottom:12px}
.tc-emoji{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;line-height:1}
.tc-emoji.calc{background:#EFF6FF}
.tc-emoji.quiz{background:#F0FDF4}
.tc-emoji.star{background:#FEF3C7}
.tc-type{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;border-radius:100px;padding:3px 10px;position:absolute;top:16px;right:16px}
.tc-type.calc{background:#DBEAFE;color:#1D4ED8}
.tc-type.quiz{background:#D1FAE5;color:#15803D}
.tc-type.star{background:#FEF3C7;color:#92400E}

.tc-name{font-size:18px;font-weight:700;line-height:1.3;margin-bottom:6px;padding-right:70px}
.tc-desc{font-size:15px;color:var(--text2);line-height:1.5;margin-bottom:14px}
.tc-foot{display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border)}
.tc-time{font-size:13px;color:var(--muted);display:flex;align-items:center;gap:5px}
.tc-time svg{width:14px;height:14px;stroke:var(--muted);fill:none}
.tc-go{font-size:14px;font-weight:700;color:var(--green);display:flex;align-items:center;gap:4px}
.tc-go svg{width:16px;height:16px;stroke:var(--green);fill:none;transition:transform .2s}
.tc:hover .tc-go svg{transform:translateX(3px)}

/* FEATURED CARD (larger) */
.tc.featured{border:2px solid var(--green);background:linear-gradient(135deg,#f0fdf4 0%,#fff 100%)}
.tc.featured .tc-name{font-size:20px}

/* CTA BANNER */
.cta{margin:56px 0 48px;background:var(--green);border-radius:18px;padding:44px 32px;text-align:center;color:#fff}
.cta h3{font-size:26px;font-weight:700;margin-bottom:10px}
.cta p{font-size:17px;opacity:.85;max-width:480px;margin:0 auto 22px}
.cta-btn{display:inline-block;background:#fff;color:var(--green);font-weight:700;font-size:16px;padding:14px 36px;border-radius:100px;text-decoration:none;transition:transform .2s,box-shadow .2s}
.cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.2)}

/* FOOTER */
.ftr{background:var(--white);padding:36px 20px;border-top:1px solid var(--border);text-align:center}
.ftr p{font-size:14px;color:var(--muted);margin:4px 0}.ftr a{color:var(--green);text-decoration:none;font-weight:600}

@media(max-width:768px){
  .hdr-nav{display:none}.hdr-toggle{display:flex;align-items:center;justify-content:center}
  .hero{padding:48px 16px 40px}.hero h1{font-size:28px}
  .hero-counters{gap:24px}.hero-count strong{font-size:28px}
  .tools-row{grid-template-columns:1fr}
  .main{padding:0 16px}
  .cat-section{margin:32px 0 0}
  .cta{padding:32px 20px;margin:36px 0 32px}
}
      `}</style>


<section className="hero">
<div className="hero-label">100% Free &bull; No Signup Required</div>
<h1>21 Health Tools Built for Seniors</h1>
<p>Evidence-based calculators and quizzes designed specifically for adults over 60. Instant personalized results with action plans.</p>
<div className="hero-counters">
<div className="hero-count"><strong>21</strong><span>Free tools</span></div>
<div className="hero-count"><strong>8</strong><span>Calculators</span></div>
<div className="hero-count"><strong>13</strong><span>Health quizzes</span></div>
</div>
</section>

<div className="main">

<div className="cat-section">
<div className="cat-header">
<div className="cat-icon meta"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
<div><div className="cat-title">Start Here</div><div className="cat-sub">The master assessment that covers everything</div></div>
</div>
<div className="tools-row">
<a href="/tools/longevity-score/" className="tc featured">
<div className="tc-type star">Meta Tool</div>
<div className="tc-top"><div className="tc-emoji star">&#x1F9EC;</div></div>
<div className="tc-name">Biological Age Quiz</div>
<div className="tc-desc">The complete assessment. Calculates your biological age across 12 health domains &mdash; heart, brain, sleep, nutrition, mobility, and more. Your full health snapshot in one quiz.</div>
<div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>8 min</div><div className="tc-go">Take the quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div>
</a>
</div>
</div>

<div className="cat-section">
<div className="cat-header">
<div className="cat-icon heart"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></div>
<div><div className="cat-title">Heart &amp; Blood Pressure</div><div className="cat-sub">The #1 killer of seniors &mdash; check your numbers</div></div>
</div>
<div className="tools-row">
<a href="/tools/bp-checker/" className="tc"><div className="tc-type calc">Calculator</div><div className="tc-top"><div className="tc-emoji calc">&#x1FA7A;</div></div><div className="tc-name">Blood Pressure Checker</div><div className="tc-desc">Enter your BP reading, get age-specific guidance. Covers normal to crisis with medication and lifestyle recommendations.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>2 min</div><div className="tc-go">Check now <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/heart-age/" className="tc"><div className="tc-type calc">Calculator</div><div className="tc-top"><div className="tc-emoji calc">&#x2764;&#xFE0F;</div></div><div className="tc-name">Heart Age Calculator</div><div className="tc-desc">Discover your heart's biological age based on BP, cholesterol, activity, smoking, and family history.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Calculate <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
</div>
</div>

<div className="cat-section">
<div className="cat-header">
<div className="cat-icon brain"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 017 7c0 3-2 5-4 6.5V18a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2.5C7 14 5 12 5 9a7 7 0 017-7z"/><path d="M9 22h6"/></svg></div>
<div><div className="cat-title">Brain, Memory &amp; Sleep</div><div className="cat-sub">Cognitive health and sleep quality assessments</div></div>
</div>
<div className="tools-row">
<a href="/tools/memory-check/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1F9E0;</div></div><div className="tc-name">Memory Check Quiz</div><div className="tc-desc">Screen for cognitive changes with 15 evidence-based questions. Distinguishes normal aging from warning signs.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>4 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/sleep-score/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1F634;</div></div><div className="tc-name">Sleep Quality Score</div><div className="tc-desc">Rate your sleep across 10 dimensions: duration, nocturia, apnea risk, medication effects, and daytime function.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/mood-check/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1F60A;</div></div><div className="tc-name">Mood &amp; Depression Check</div><div className="tc-desc">GDS-based screening for seniors. Distinguishes normal sadness from clinical depression. Covers isolation, grief, motivation.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
</div>
</div>

<div className="cat-section">
<div className="cat-header">
<div className="cat-icon body"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg></div>
<div><div className="cat-title">Health Screening Quizzes</div><div className="cat-sub">Assess your risk for the conditions that matter most after 60</div></div>
</div>
<div className="tools-row">
<a href="/tools/diabetes-risk/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1FA78;</div></div><div className="tc-name">Diabetes Risk Assessment</div><div className="tc-desc">CDC-based criteria covering family history, weight, activity, blood pressure, and ethnic risk factors.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/prostate-check/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1F6B9;</div></div><div className="tc-name">Prostate Health Check</div><div className="tc-desc">IPSS-based symptom scoring for BPH. Tracks frequency, urgency, nocturia, weak stream, and quality of life.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/kidney-check/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1FAC0;</div></div><div className="tc-name">Kidney Health Check</div><div className="tc-desc">Assess risk factors including diabetes, BP, NSAID use, family history, and hydration habits.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/eye-check/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1F441;</div></div><div className="tc-name">Eye Health Quiz</div><div className="tc-desc">Screen for AMD, glaucoma, cataract, and diabetic retinopathy risk. Includes screening schedule guidance.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/digestion-check/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1F4A7;</div></div><div className="tc-name">Digestion Health Quiz</div><div className="tc-desc">Evaluate gut health: bloating, acid reflux, constipation, PPI use, and microbiome diversity.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/vitamin-d-check/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x2600;&#xFE0F;</div></div><div className="tc-name">Vitamin D Deficiency Quiz</div><div className="tc-desc">Estimate your vitamin D status from sun exposure, diet, skin tone, weight, and medications.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>2 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
</div>
</div>

<div className="cat-section">
<div className="cat-header">
<div className="cat-icon safety"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
<div><div className="cat-title">Safety &amp; Mobility</div><div className="cat-sub">Prevent falls and preserve muscle strength</div></div>
</div>
<div className="tools-row">
<a href="/tools/fall-risk/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1F6A8;</div></div><div className="tc-name">Fall Risk Assessment</div><div className="tc-desc">CDC STEADI-based screening. Covers balance, medications, home hazards, vision, and strength. Get a prevention plan.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>4 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/muscle-loss-risk/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1F4AA;</div></div><div className="tc-name">Muscle Loss Risk Quiz</div><div className="tc-desc">Screen for sarcopenia risk. Assesses grip strength, walking speed, protein intake, and GLP-1 effects on muscle.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/bone-check/" className="tc"><div className="tc-type quiz">Quiz</div><div className="tc-top"><div className="tc-emoji quiz">&#x1F9B4;</div></div><div className="tc-name">Bone Health Quiz</div><div className="tc-desc">Assess osteoporosis risk: family history, steroid use, calcium/D intake, exercise, smoking, and height loss.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Take quiz <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
</div>
</div>

<div className="cat-section">
<div className="cat-header">
<div className="cat-icon nutrition"><svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg></div>
<div><div className="cat-title">Nutrition &amp; Body Calculators</div><div className="cat-sub">Know your numbers for calories, protein, hydration, and weight</div></div>
</div>
<div className="tools-row">
<a href="/tools/glp1-calculator/" className="tc"><div className="tc-type calc">Calculator</div><div className="tc-top"><div className="tc-emoji calc">&#x1F48A;</div></div><div className="tc-name">GLP-1 Weight Loss Calculator</div><div className="tc-desc">Estimate your weight loss on Ozempic, Wegovy, or Mounjaro. Projected milestones, protein targets, muscle preservation.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>2 min</div><div className="tc-go">Calculate <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/bmi-senior/" className="tc"><div className="tc-type calc">Calculator</div><div className="tc-top"><div className="tc-emoji calc">&#x2696;&#xFE0F;</div></div><div className="tc-name">Senior BMI Calculator</div><div className="tc-desc">Age-adjusted BMI with senior-specific healthy ranges. Includes waist circumference and sarcopenic obesity screening.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>2 min</div><div className="tc-go">Calculate <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/protein-calculator/" className="tc"><div className="tc-type calc">Calculator</div><div className="tc-top"><div className="tc-emoji calc">&#x1F356;</div></div><div className="tc-name">Protein Calculator</div><div className="tc-desc">Daily protein needs based on weight, age, activity, and goals. Per-meal targets and high-protein food suggestions.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>2 min</div><div className="tc-go">Calculate <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/calorie-calculator/" className="tc"><div className="tc-type calc">Calculator</div><div className="tc-top"><div className="tc-emoji calc">&#x1F525;</div></div><div className="tc-name">Calorie Calculator</div><div className="tc-desc">Mifflin-St Jeor adjusted for seniors. TDEE, weight loss deficit, and minimum safe intake levels.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>2 min</div><div className="tc-go">Calculate <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/hydration/" className="tc"><div className="tc-type calc">Calculator</div><div className="tc-top"><div className="tc-emoji calc">&#x1F4A7;</div></div><div className="tc-name">Hydration Calculator</div><div className="tc-desc">Personalized water intake based on weight, medications, climate, and kidney function. Dehydration warning signs.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>2 min</div><div className="tc-go">Calculate <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
<a href="/tools/supplement-budget/" className="tc"><div className="tc-type calc">Calculator</div><div className="tc-top"><div className="tc-emoji calc">&#x1F4B0;</div></div><div className="tc-name">Supplement Budget Planner</div><div className="tc-desc">Build your supplement stack at $30, $60, or $100/month. Prioritizes highest-impact supplements for your budget.</div><div className="tc-foot"><div className="tc-time"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>3 min</div><div className="tc-go">Plan budget <svg viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></div></div></a>
</div>
</div>

<div className="cta">
<h3>Want the Complete Protocols?</h3>
<p>Our premium guides give you the full supplement protocols, drug interactions, diet plans, and tracking sheets for every condition.</p>
<a href="/guides" className="cta-btn">Browse Premium Guides &rarr;</a>
</div>

</div>


      

    </>
  );
}
