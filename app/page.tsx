'use client';
import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {

  return (
    <>
      <style>{`
        /* header styles now in shared Header component */
        .hero{background:linear-gradient(160deg,#0f3320 0%,#1a5632 40%,#1E6B3E 100%);color:#fff;padding:76px 20px 68px;text-align:center}
        .hero-ey{font-size:14px;letter-spacing:1.5px;text-transform:uppercase;opacity:.5;margin-bottom:16px;font-weight:600}
        .hero h1{font-family:'Fraunces',Georgia,serif;font-size:clamp(32px,6vw,54px);font-weight:800;line-height:1.1;max-width:700px;margin:0 auto 20px}
        .hero h1 em{font-style:italic;color:#86efac}
        .hero-sub{font-size:20px;max-width:560px;margin:0 auto 32px;opacity:.85;line-height:1.55}
        .hero-btns{display:flex;justify-content:center;gap:14px;flex-wrap:wrap}
        .btn-p{display:inline-flex;align-items:center;background:#fff;color:#1A5632;font-weight:700;font-size:17px;padding:16px 32px;border-radius:100px;text-decoration:none;min-height:52px}
        .btn-s{display:inline-flex;align-items:center;background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.3);color:#fff;font-weight:600;font-size:17px;padding:16px 32px;border-radius:100px;text-decoration:none;min-height:52px}
        .tbar{background:#fff;border-bottom:1px solid #E8E6E1;padding:18px 20px}
        .tbar-inner{max-width:900px;margin:0 auto;display:flex;justify-content:center;gap:36px;flex-wrap:wrap}
        .tb{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:#2C2C2A}
        .tb svg{width:20px;height:20px;stroke:#1A5632;fill:none;flex-shrink:0}
        .tb b{font-family:'Fraunces',serif;font-size:20px;color:#1A5632}
        .main{max-width:1060px;margin:0 auto;padding:0 20px}
        .sh{text-align:center;margin:56px 0 24px}
        .sh h2{font-family:'Fraunces',Georgia,serif;font-size:28px;font-weight:800;margin-bottom:6px}
        .sh p{font-size:17px;color:#555550;max-width:500px;margin:0 auto}
        .sh-link{display:inline-block;margin-top:10px;font-size:15px;font-weight:700;color:#1A5632;text-decoration:none}
        .guides-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
        .gc{background:#fff;border:1px solid #E8E6E1;border-radius:14px;overflow:hidden;text-decoration:none;color:#2C2C2A;transition:transform .2s,box-shadow .2s}
        .gc:hover{transform:translateY(-3px);box-shadow:0 4px 16px rgba(0,0,0,.07)}
        .gc-cover{height:170px;display:flex;align-items:center;justify-content:center;background:#FDFAF5}
        .bw{perspective:600px;display:inline-block}
        .bk{width:105px;height:145px;position:relative;transform-style:preserve-3d;transform:rotateY(-16deg);transition:transform .4s}
        .gc:hover .bk{transform:rotateY(-26deg)}
        .bk-f{position:absolute;inset:0;border-radius:0 2px 2px 0;overflow:hidden;z-index:2}
        .bk-sp{position:absolute;top:0;left:0;width:14px;height:100%;transform:rotateY(90deg) translateX(-7px) translateZ(7px);border-radius:2px 0 0 2px}
        .bk-pg{position:absolute;top:2px;right:0;width:12px;height:calc(100% - 4px);background:linear-gradient(90deg,#f5f0e8,#fff,#f5f0e8);transform:translateX(5px) translateZ(-1px);border-radius:0 1px 1px 0;border:1px solid #e0ddd5}
        .bk-sh{position:absolute;bottom:-5px;left:12%;width:76%;height:8px;background:rgba(0,0,0,.12);filter:blur(5px);border-radius:50%}
        .gc-body{padding:14px 16px}
        .gc-title{font-size:15px;font-weight:700;line-height:1.25;margin-bottom:4px}
        .gc-price{font-family:'Fraunces',serif;font-size:18px;font-weight:800;color:#1A5632}
        .bundle{background:#1A5632;border-radius:20px;padding:36px;display:flex;gap:32px;align-items:center;margin:20px 0 0;color:#fff}
        .bundle-info{flex:1}
        .bundle-info h3{font-family:'Fraunces',serif;font-size:24px;font-weight:800;margin-bottom:8px}
        .bundle-info p{font-size:15px;opacity:.85;margin-bottom:14px;line-height:1.5}
        .bpr{display:flex;align-items:baseline;gap:10px;margin-bottom:16px}
        .bpr-was{font-size:16px;text-decoration:line-through;opacity:.6}
        .bpr-now{font-family:'Fraunces',serif;font-size:40px;font-weight:800}
        .bpr-save{background:rgba(255,255,255,.2);font-size:12px;font-weight:700;padding:4px 10px;border-radius:100px}
        .btn-w{display:inline-flex;align-items:center;gap:6px;background:#fff;color:#1A5632;font-weight:700;font-size:16px;padding:14px 32px;border-radius:100px;text-decoration:none;min-height:48px}
        .bundle-books{display:flex;flex-shrink:0}
        .bundle-books .bw{margin-left:-16px}.bundle-books .bw:first-child{margin-left:0}
        .fq{background:linear-gradient(135deg,#f0fdf4 0%,#fff 100%);border:2px solid #1A5632;border-radius:20px;padding:36px;display:flex;gap:32px;align-items:center}
        .fq-icon{width:72px;height:72px;border-radius:18px;background:#1A5632;display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0}
        .fq-badge{display:inline-block;background:#fef3c7;color:#92400e;font-size:12px;font-weight:700;padding:4px 12px;border-radius:100px;margin-bottom:8px}
        .fq-title{font-family:'Fraunces',serif;font-size:22px;font-weight:800;margin-bottom:6px}
        .fq-desc{font-size:16px;color:#555550;line-height:1.5;margin-bottom:14px}
        .fq-btn{display:inline-flex;align-items:center;gap:6px;background:#1A5632;color:#fff;font-weight:700;font-size:16px;padding:14px 28px;border-radius:100px;text-decoration:none;min-height:48px}
        .sup-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
        .sc{background:#fff;border:1px solid #E8E6E1;border-radius:14px;padding:16px 18px;text-decoration:none;color:#2C2C2A;display:flex;align-items:center;gap:14px;transition:transform .2s,box-shadow .2s;min-height:68px}
        .sc:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.07)}
        .sc-ico{font-size:22px;width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .sc-ico.r{background:#fef2f2}.sc-ico.b{background:#eff6ff}.sc-ico.p{background:#f5f3ff}.sc-ico.g{background:#f0fdf4}.sc-ico.a{background:#fffbeb}.sc-ico.k{background:#fdf2f8}.sc-ico.t{background:#f0fdfa}
        .sc-body{flex:1;min-width:0}
        .sc-title{font-size:16px;font-weight:700;line-height:1.2}
        .sc-sub{font-size:13px;color:#717170;margin-top:1px}
        .sc-arr{color:#717170;font-size:16px}
        .tool-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
        .tl{background:#fff;border:1px solid #E8E6E1;border-radius:14px;padding:18px;text-decoration:none;color:#2C2C2A;display:flex;align-items:flex-start;gap:12px;transition:transform .2s;min-height:76px}
        .tl:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.07)}
        .tl-ico{font-size:20px;width:38px;height:38px;border-radius:10px;background:#E8F5E9;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .tl-body{flex:1}
        .tl-title{font-size:16px;font-weight:700;margin-bottom:2px}
        .tl-desc{font-size:14px;color:#555550;line-height:1.4}
        .tl-tag{display:inline-block;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;padding:2px 7px;border-radius:100px;margin-left:6px;vertical-align:middle}
        .tl-tag.c{background:#dbeafe;color:#1d4ed8}.tl-tag.q{background:#d1fae5;color:#15803d}
        .how{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin:48px 0 8px}
        .stp{text-align:center;padding:20px 12px}
        .stp-n{width:40px;height:40px;border-radius:50%;background:#E8F5E9;color:#1A5632;font-family:'Fraunces',serif;font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center;margin:0 auto 10px}
        .stp-t{font-size:16px;font-weight:700;margin-bottom:4px}
        .stp-d{font-size:14px;color:#555550;line-height:1.4}
        .ftr{background:#fff;border-top:1px solid #E8E6E1;padding:40px 20px 24px;margin-top:56px}
        .ftr-inner{max-width:1060px;margin:0 auto}
        .ftr-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:28px;margin-bottom:28px}
        .ftr-brand p{font-size:14px;color:#717170;line-height:1.5;margin-top:8px}
        .ftr-brand a{display:flex;align-items:center;gap:8px;text-decoration:none;color:#2C2C2A;font-size:20px;font-weight:700}
        .ftr-col h4{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#717170;margin-bottom:10px}
        .ftr-col a{display:block;font-size:15px;color:#555550;text-decoration:none;padding:3px 0;line-height:1.7}
        .ftr-col a:hover{color:#1A5632}
        .ftr-btm{border-top:1px solid #E8E6E1;padding-top:20px;text-align:center}
        .ftr-btm p{font-size:13px;color:#717170;margin:3px 0;line-height:1.5}
        @media(max-width:900px){.guides-grid{grid-template-columns:repeat(2,1fr)}.bundle{flex-direction:column;text-align:center}.bundle-books{justify-content:center}.ftr-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:768px){body{font-size:20px}.hero{padding:56px 16px 48px}.hero-btns{flex-direction:column;align-items:center}.guides-grid{grid-template-columns:1fr 1fr}.fq{flex-direction:column;padding:24px;text-align:center}.fq-icon{margin:0 auto}.sup-grid{grid-template-columns:1fr}.tool-grid{grid-template-columns:1fr}.how{grid-template-columns:1fr 1fr}.ftr-grid{grid-template-columns:1fr 1fr}.main{padding:0 16px}}
        @media(max-width:400px){.guides-grid{grid-template-columns:1fr}.how{grid-template-columns:1fr}}
      `}</style>

      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="hero-ey">Trusted by 400,000+ seniors</div>
        <h1>Take Control of Your Health <em>After 60</em></h1>
        <p className="hero-sub">Free health tools, evidence-based supplement recommendations, and in-depth health guides designed specifically for adults over 60.</p>
        <div className="hero-btns">
          <Link href="/tools/longevity-score" className="btn-p">Take a Free Health Quiz</Link>
          <Link href="/guides" className="btn-s">Browse Health Guides</Link>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="tbar"><div className="tbar-inner">
        <div className="tb"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg><b>21</b> Free tools</div>
        <div className="tb"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg><b>19</b> Premium guides</div>
        <div className="tb"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Evidence-based</div>
        <div className="tb"><svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>Doctor-reviewed</div>
      </div></div>

      <div className="main">

        {/* PREMIUM GUIDES */}
        <div className="sh"><h2>Premium Health Guides</h2><p>Complete supplement protocols, drug interactions, diet plans, and tracking sheets in one guide</p><Link href="/guides" className="sh-link">Browse all 19 guides &rarr;</Link></div>
        <div className="guides-grid">
          <a href="https://payhip.com/b/i8u4X" target="_blank" rel="noopener" className="gc"><div className="gc-cover"><div className="bw"><div className="bk"><div className="bk-f"><img src="/assets/covers/heart-bp-protocol.png" alt="Heart After 60" style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy" /></div><div className="bk-sp" style={{background:'#7f1d1d'}}></div><div className="bk-pg"></div><div className="bk-sh"></div></div></div></div><div className="gc-body"><div className="gc-title">The Heart After 60 Playbook</div><span className="gc-price">$12</span></div></a>
          <a href="https://payhip.com/b/RHlTO" target="_blank" rel="noopener" className="gc"><div className="gc-cover"><div className="bw"><div className="bk"><div className="bk-f"><img src="/assets/covers/prostate-protocol.png" alt="Prostate Fix" style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy" /></div><div className="bk-sp" style={{background:'#1e3a5f'}}></div><div className="bk-pg"></div><div className="bk-sh"></div></div></div></div><div className="gc-body"><div className="gc-title">The Prostate Fix Playbook</div><span className="gc-price">$12</span></div></a>
          <a href="https://payhip.com/b/1h6uW" target="_blank" rel="noopener" className="gc"><div className="gc-cover"><div className="bw"><div className="bk"><div className="bk-f"><img src="/assets/covers/glp1-survival-guide.png" alt="Ozempic Guide" style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy" /></div><div className="bk-sp" style={{background:'#78350f'}}></div><div className="bk-pg"></div><div className="bk-sh"></div></div></div></div><div className="gc-body"><div className="gc-title">The Ozempic Companion</div><span className="gc-price">$14</span></div></a>
          <a href="https://payhip.com/b/ckaY7" target="_blank" rel="noopener" className="gc"><div className="gc-cover"><div className="bw"><div className="bk"><div className="bk-f"><img src="/assets/covers/supplement-blueprint.png" alt="Supplement Stack" style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy" /></div><div className="bk-sp" style={{background:'#0f3320'}}></div><div className="bk-pg"></div><div className="bk-sh"></div></div></div></div><div className="gc-body"><div className="gc-title">The Senior Supplement Stack</div><span className="gc-price">$17</span></div></a>
        </div>

        {/* BUNDLE */}
        <div className="bundle">
          <div className="bundle-books">
            <div className="bw"><div className="bk"><div className="bk-f"><img src="/assets/covers/heart-bp-protocol.png" alt="Heart After 60" style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy" /></div><div className="bk-sp" style={{background:'#7f1d1d'}}></div><div className="bk-pg"></div><div className="bk-sh"></div></div></div>
            <div className="bw"><div className="bk"><div className="bk-f"><img src="/assets/covers/brain-memory-shield.png" alt="Brain Shield" style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy" /></div><div className="bk-sp" style={{background:'#4c1d95'}}></div><div className="bk-pg"></div><div className="bk-sh"></div></div></div>
            <div className="bw"><div className="bk"><div className="bk-f"><img src="/assets/covers/supplement-blueprint.png" alt="Supplement Stack" style={{width:'100%',height:'100%',objectFit:'cover'}} loading="lazy" /></div><div className="bk-sp" style={{background:'#0f3320'}}></div><div className="bk-pg"></div><div className="bk-sh"></div></div></div>
          </div>
          <div className="bundle-info">
            <h3>The Complete Senior Health Vault</h3>
            <p>All 19 guides. Every supplement protocol. Every diet plan. Every tracking sheet. Lifetime access including future updates.</p>
            <div className="bpr"><span className="bpr-was">$190</span><span className="bpr-now">$47</span><span className="bpr-save">Save 75%</span></div>
            <a href="https://thevitatrack.com/bundle/" target="_blank" rel="noopener" className="btn-w">Get All 19 Guides &rarr;</a>
          </div>
        </div>

        {/* FEATURED QUIZ */}
        <div className="sh"><h2>Start Here</h2><p>Not sure where to begin? Take our most popular assessment.</p></div>
        <div className="fq">
          <div className="fq-icon">🧬</div>
          <div className="fq-body">
            <div className="fq-badge">Most Popular — 8 minutes</div>
            <div className="fq-title">What&apos;s Your Biological Age?</div>
            <div className="fq-desc">Evaluates 12 health domains — heart, brain, sleep, nutrition, mobility, and more — to calculate your biological age.</div>
            <Link href="/tools/longevity-score" className="fq-btn">Take the Free Quiz &rarr;</Link>
          </div>
        </div>

        {/* SUPPLEMENTS */}
        <div className="sh" id="supplements"><h2>Recommended Supplements</h2><p>Evidence-based supplement recommendations by health concern</p></div>
        <div className="sup-grid">
          <Link href="/heart" className="sc"><div className="sc-ico r">❤️</div><div className="sc-body"><div className="sc-title">Heart health</div><div className="sc-sub">Cholesterol, circulation, cardiovascular</div></div><span className="sc-arr">→</span></Link>
          <Link href="/brain" className="sc"><div className="sc-ico p">🧠</div><div className="sc-body"><div className="sc-title">Brain &amp; memory</div><div className="sc-sub">Focus, cognitive decline, brain fog</div></div><span className="sc-arr">→</span></Link>
          <Link href="/sleep" className="sc"><div className="sc-ico p">🌙</div><div className="sc-body"><div className="sc-title">Sleep</div><div className="sc-sub">Insomnia, nocturia, sleep quality</div></div><span className="sc-arr">→</span></Link>
          <Link href="/digestion" className="sc"><div className="sc-ico g">🌿</div><div className="sc-body"><div className="sc-title">Digestion &amp; gut</div><div className="sc-sub">Bloating, reflux, constipation</div></div><span className="sc-arr">→</span></Link>
          <Link href="/liver" className="sc"><div className="sc-ico g">🧪</div><div className="sc-body"><div className="sc-title">Liver</div><div className="sc-sub">Fatty liver, detox, liver function</div></div><span className="sc-arr">→</span></Link>
          <Link href="/longevity" className="sc"><div className="sc-ico t">🧬</div><div className="sc-body"><div className="sc-title">Longevity</div><div className="sc-sub">Anti-aging, healthspan, Blue Zones</div></div><span className="sc-arr">→</span></Link>
          <Link href="/skin-hair" className="sc"><div className="sc-ico k">✨</div><div className="sc-body"><div className="sc-title">Skin &amp; hair</div><div className="sc-sub">Wrinkles, thinning hair, collagen</div></div><span className="sc-arr">→</span></Link>
          <Link href="/blood-pressure" className="sc"><div className="sc-ico r">🩺</div><div className="sc-body"><div className="sc-title">Blood pressure</div><div className="sc-sub">Hypertension, natural BP support</div></div><span className="sc-arr">→</span></Link>
          <Link href="/joints" className="sc"><div className="sc-ico a">🦴</div><div className="sc-body"><div className="sc-title">Joints &amp; bones</div><div className="sc-sub">Arthritis, bone density, joint pain</div></div><span className="sc-arr">→</span></Link>
          <Link href="/prostate" className="sc"><div className="sc-ico r">🛡️</div><div className="sc-body"><div className="sc-title">Prostate health</div><div className="sc-sub">BPH, nighttime urination, weak flow</div></div><span className="sc-arr">→</span></Link>
          <Link href="/kidney" className="sc"><div className="sc-ico b">💧</div><div className="sc-body"><div className="sc-title">Kidney health</div><div className="sc-sub">GFR, creatinine, kidney function</div></div><span className="sc-arr">→</span></Link>
          <Link href="/eyes" className="sc"><div className="sc-ico t">👁️</div><div className="sc-body"><div className="sc-title">Eyes &amp; vision</div><div className="sc-sub">AMD, cataracts, dry eyes</div></div><span className="sc-arr">→</span></Link>
        </div>

        {/* FREE TOOLS */}
        <div className="sh"><h2>Free Health Tools</h2><p>Instant personalized results. No signup required.</p><Link href="/tools" className="sh-link">See all 21 tools &rarr;</Link></div>
        <div className="tool-grid">
          <Link href="/tools/bp-checker" className="tl"><div className="tl-ico">🩺</div><div className="tl-body"><div className="tl-title">Blood Pressure Checker<span className="tl-tag c">Calculator</span></div><div className="tl-desc">Enter your reading, get age-specific guidance</div></div></Link>
          <Link href="/tools/heart-age" className="tl"><div className="tl-ico">❤️</div><div className="tl-body"><div className="tl-title">Heart Age Calculator<span className="tl-tag c">Calculator</span></div><div className="tl-desc">Discover your heart&apos;s biological age</div></div></Link>
          <Link href="/tools/memory-check" className="tl"><div className="tl-ico">🧠</div><div className="tl-body"><div className="tl-title">Memory Check Quiz<span className="tl-tag q">Quiz</span></div><div className="tl-desc">Screen for cognitive changes vs normal aging</div></div></Link>
          <Link href="/tools/diabetes-risk" className="tl"><div className="tl-ico">🩸</div><div className="tl-body"><div className="tl-title">Diabetes Risk Assessment<span className="tl-tag q">Quiz</span></div><div className="tl-desc">CDC-based Type 2 diabetes screening</div></div></Link>
          <Link href="/tools/glp1-calculator" className="tl"><div className="tl-ico">💊</div><div className="tl-body"><div className="tl-title">GLP-1 Weight Loss Calculator<span className="tl-tag c">Calculator</span></div><div className="tl-desc">Projected weight loss on Ozempic/Wegovy</div></div></Link>
          <Link href="/tools/sleep-score" className="tl"><div className="tl-ico">😴</div><div className="tl-body"><div className="tl-title">Sleep Quality Score<span className="tl-tag q">Quiz</span></div><div className="tl-desc">Rate your sleep across 10 dimensions</div></div></Link>
        </div>

        {/* HOW IT WORKS */}
        <div className="sh" style={{marginTop:'52px'}}><h2>How VitaTrack Works</h2></div>
        <div className="how">
          <div className="stp"><div className="stp-n">1</div><div className="stp-t">Take a free quiz</div><div className="stp-d">21 tools give you instant, personalized health insights</div></div>
          <div className="stp"><div className="stp-n">2</div><div className="stp-t">See recommendations</div><div className="stp-d">Evidence-based supplements ranked by research</div></div>
          <div className="stp"><div className="stp-n">3</div><div className="stp-t">Get the full protocol</div><div className="stp-d">Premium guides with dosing, interactions, and plans</div></div>
          <div className="stp"><div className="stp-n">4</div><div className="stp-t">Talk to your doctor</div><div className="stp-d">Share your findings before starting anything new</div></div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="ftr"><div className="ftr-inner">
        <div className="ftr-grid">
          <div className="ftr-brand">
            <Link href="/"><svg viewBox="0 0 36 36" fill="none" width="28" height="28"><circle cx="18" cy="18" r="16" fill="#1A5632"/><path d="M18 28 L12.5 21.5 C10 18.5 10 15.5 12.5 13.5 C14.5 12 16.5 13 18 15.5 C19.5 13 21.5 12 23.5 13.5 C26 15.5 26 18.5 23.5 21.5Z" fill="#4ADE80" opacity=".85"/></svg>VitaTrack</Link>
            <p>Evidence-based health support for adults 60+. Free tools, supplement recommendations, and premium health guides.</p>
          </div>
          <div className="ftr-col"><h4>Supplements</h4>
            <Link href="/heart">Heart</Link><Link href="/brain">Brain &amp; Memory</Link><Link href="/sleep">Sleep</Link><Link href="/digestion">Digestion</Link><Link href="/liver">Liver</Link><Link href="/longevity">Longevity</Link>
          </div>
          <div className="ftr-col"><h4>More</h4>
            <Link href="/skin-hair">Skin &amp; Hair</Link><Link href="/conditions">Health Conditions</Link><Link href="/symptoms">Symptoms Guide</Link><Link href="/recipes">Recipes</Link><Link href="/daily-living">Daily Living</Link><Link href="/plans">7-Day Plans</Link>
          </div>
          <div className="ftr-col"><h4>Articles</h4>
            <Link href="/conditions">Health Conditions</Link><Link href="/symptoms">Symptoms Guide</Link><Link href="/daily-living">Daily Living</Link><Link href="/recipes">Recipes</Link><Link href="/tools">Health Tools</Link><Link href="/guides">Premium Guides</Link>
          </div>
        </div>
        <div className="ftr-btm">
          <p>VitaTrack provides educational health information for adults 60+. This is not medical advice. Always consult your healthcare provider before starting supplements or changing medication.</p>
          <p>&copy; 2026 VitaTrack. All rights reserved.</p>
        </div>
      </div></footer>
    </>
  );
}
