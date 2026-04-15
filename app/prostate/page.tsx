import Link from 'next/link';
import Header from '@/components/Header';
import BundleCTA from '@/components/BundleCTA';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '7 Best Prostate Supplements for Men Over 60 (2025) | VitaTrack',
  alternates: { canonical: 'https://thevitatrack.com/prostate' },
};

export default function ProstatePage() {
  return (
    <>
      <Header />
      <style>{`
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--hdr:#14442A;--hero:#1E6B3E;--green:#1A5632;--green-hover:#134225;--bg:#F7F6F3;--white:#FFF;--border:#E8E6E1;--text:#2C2C2A;--text2:#555550;--muted:#717170;--badge:#E8F5E9;--shadow:0 4px 12px rgba(0,0,0,.08);--r:12px;--warn-bg:#FFF8E1;--warn-border:#FFE082;--warn-text:#6D4C00;--feat-bg:#FFFDF5;--feat-border:#E8D48B}
html{scroll-behavior:smooth}
body{font-family:'Source Sans 3',-apple-system,BlinkMacSystemFont,sans-serif;font-size:18px;line-height:1.6;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased}

/* HEADER */
.hdr{background:var(--hdr);position:sticky;top:0;z-index:1000;border-bottom:1px solid rgba(255,255,255,.1)}
.hdr-inner{max-width:1100px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between}
.hdr-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff}
.hdr-logo svg{width:32px;height:32px;flex-shrink:0}
.hdr-logo span{font-size:22px;font-weight:700}
.hdr-nav{display:flex;gap:6px}
.hdr-nav a{color:rgba(255,255,255,.85);text-decoration:none;font-size:15px;font-weight:500;padding:8px 16px;border-radius:8px;transition:background .15s}
.hdr-nav a:hover{background:rgba(255,255,255,.1);color:#fff}
.hdr-toggle{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:8px;min-height:44px;min-width:44px;align-items:center;justify-content:center}
.hdr-toggle svg{width:26px;height:26px}
.mob{display:none;position:fixed;inset:0;background:var(--hdr);z-index:9999;flex-direction:column;overflow-y:auto}
.mob.open{display:flex}
.mob-top{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;border-bottom:1px solid rgba(255,255,255,.1)}
.mob-logo{display:flex;align-items:center;gap:8px;color:#fff;text-decoration:none}
.mob-logo svg{width:28px;height:28px}.mob-logo span{font-size:20px;font-weight:700}
.mob-x{background:rgba(255,255,255,.1);border:none;color:#fff;width:44px;height:44px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:22px}
.mob-links{display:flex;flex-direction:column;padding:8px 0}
.mob-links a{color:#fff;text-decoration:none;font-size:18px;font-weight:500;padding:16px 28px;border-bottom:1px solid rgba(255,255,255,.1);transition:background .15s}
.mob-links a:first-child{border-top:1px solid rgba(255,255,255,.1)}
.mob-links a:hover{background:rgba(255,255,255,.08)}
@media(max-width:768px){.hdr-nav{display:none}.hdr-toggle{display:flex}}

/* HERO */
.page-hero{background:var(--hero);color:#fff;padding:36px 24px 32px}
.page-hero-inner{max-width:800px;margin:0 auto}
.breadcrumb{font-size:15px;color:rgba(255,255,255,.7);margin-bottom:12px}
.breadcrumb a{color:rgba(255,255,255,.85);text-decoration:none}
.page-hero h1{font-size:30px;font-weight:700;line-height:1.2;margin-bottom:10px}
.page-hero p{font-size:18px;color:rgba(255,255,255,.9);max-width:600px}

/* MAIN — flex layout with sidebar on desktop */
.main-wrap{max-width:1100px;margin:0 auto;padding:0 20px;display:flex;gap:28px;align-items:flex-start}
.main{flex:1;max-width:800px;min-width:0}

/* SIDEBAR — sticky on desktop, hidden on mobile */
.sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;display:none}
.sidebar-inner{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:18px}
.sidebar h4{font-size:15px;font-weight:700;color:var(--text);margin-bottom:14px}
.sb-links{display:flex;flex-direction:column;gap:6px}
.sb-link{display:flex;align-items:center;gap:9px;padding:9px 10px;border-radius:8px;text-decoration:none;background:#F8FAF8;transition:background .15s}
.sb-link:hover{background:#E8F5E9}
.sb-link.feat{background:#FFF8E8;border:1px solid #E8D48B}
.sb-link.feat:hover{background:#FFF0C8}
.sb-num{font-size:12px;width:22px;height:22px;background:var(--green);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:700}
.sb-link.feat .sb-num{background:#B8860B}
.sb-name{font-size:14px;font-weight:600;color:var(--green);line-height:1.3}
.sb-link.feat .sb-name{color:#7A5F00}
.sb-divider{border:none;border-top:1px solid var(--border);margin:10px 0}
.sb-cta{display:block;text-align:center;background:var(--green);color:#fff;text-decoration:none;padding:10px;border-radius:8px;font-size:14px;font-weight:700;margin-top:12px;transition:background .15s}
.sb-cta:hover{background:var(--green-hover)}

@media(min-width:1000px){.sidebar{display:block}}
@media(max-width:999px){.main-wrap{max-width:800px}}

/* INTRO */
.intro{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:28px 0;border-left:4px solid var(--green)}
.intro h3{font-size:19px;font-weight:700;margin-bottom:8px;color:var(--green)}
.intro p{font-size:16px;color:var(--text2);line-height:1.6}

/* QUICK PICK */
.qp{background:#F0FAF3;border:2px solid var(--green);border-radius:var(--r);padding:22px 24px;margin:0 0 28px}
.qp h3{font-size:19px;font-weight:700;color:var(--green);margin-bottom:10px}
.qp p{font-size:16px;color:var(--text);line-height:1.6;margin-bottom:6px}
.qp a{color:var(--green);font-weight:600}

/* PRODUCT CARD — scannable */
.p-card{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px 22px;margin-bottom:18px;position:relative}
.p-card.featured{border:2px solid var(--feat-border);background:var(--feat-bg)}
.p-num{position:absolute;top:-11px;left:22px;width:30px;height:30px;background:var(--green);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700}
.p-card.featured .p-num{background:#B8860B}
.feat-tag{display:inline-block;background:#B8860B;color:#fff;font-size:13px;font-weight:700;padding:4px 12px;border-radius:20px;margin-bottom:10px}

/* Top row: image + name */
.p-top{display:flex;gap:18px;align-items:flex-start;margin-bottom:14px}
.p-img{width:90px;flex-shrink:0;background:#F8FAF8;border-radius:10px;padding:12px;text-align:center}
.p-card.featured .p-img{background:#FFF8E8}
.p-img svg{width:60px;height:auto}
.p-info{flex:1}
.p-name{font-size:21px;font-weight:700;color:var(--green);margin:4px 0 4px;line-height:1.2}
.p-sub{font-size:15px;color:var(--text2);margin-bottom:10px}
.p-pills{display:flex;gap:6px;flex-wrap:wrap}
.p-pill{font-size:13px;background:var(--badge);color:var(--green);padding:4px 10px;border-radius:20px;font-weight:600}
.p-card.featured .p-pill{background:#FFF0C8;color:#7A5F00}

/* Checkmarks */
.p-checks{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.p-chk{display:flex;align-items:flex-start;gap:9px}
.p-chk .tick{color:var(--green);font-size:18px;flex-shrink:0;line-height:1.3}
.p-chk span{font-size:16px;color:var(--text);line-height:1.45}

/* Badges row */
.p-badges{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.p-badge{font-size:13px;background:var(--badge);color:var(--green);padding:5px 12px;border-radius:20px;font-weight:600}

/* Warning */
.p-warn{background:var(--warn-bg);border:1px solid var(--warn-border);border-radius:10px;padding:12px 14px;margin-bottom:14px;display:flex;gap:8px;align-items:flex-start}
.p-warn svg{width:20px;height:20px;flex-shrink:0;color:#F59E0B;margin-top:2px}
.p-warn p{font-size:14px;color:var(--warn-text);line-height:1.5}

/* Shopping tip */
.p-tip{font-size:14px;color:var(--muted);margin-bottom:10px;line-height:1.5}
.p-tip strong{color:var(--text2)}

/* Button */
.p-btn{display:flex;align-items:center;justify-content:center;gap:8px;background:var(--green);color:#fff;text-decoration:none;padding:15px 24px;border-radius:10px;font-size:18px;font-weight:700;min-height:54px;transition:background .15s;width:100%}
.p-btn:hover{background:var(--green-hover)}
.p-btn svg{width:18px;height:18px;flex-shrink:0}
.p-card.featured .p-btn{background:#B8860B;font-size:19px;min-height:58px}
.p-card.featured .p-btn:hover{background:#956E08}

/* Price */
.p-price{font-size:14px;color:var(--muted);text-align:center;margin-top:8px}

/* FAQ */
.faq{margin:36px 0}
.faq h2{font-size:24px;font-weight:700;margin-bottom:20px;text-align:center}
.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px;overflow:hidden}
.faq-q{padding:16px 22px;font-size:18px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;font-family:inherit;line-height:1.4}
.faq-q:hover{background:#FAFAF8}
.faq-icon{font-size:22px;color:var(--muted);flex-shrink:0;transition:transform .2s}
.faq-q.active .faq-icon{transform:rotate(45deg)}
.faq-a{padding:0 22px 16px;font-size:16px;color:var(--text2);line-height:1.65;display:none}
.faq-a.show{display:block}

/* Related */
.related{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:32px 0}
.related h3{font-size:20px;font-weight:700;margin-bottom:16px}
.r-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.r-link{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--green);font-weight:600;font-size:16px;transition:border-color .15s}
.r-link:hover{border-color:#c5c3be;box-shadow:var(--shadow)}

/* YouTube */
.yt{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:0 0 32px}
.yt h3{font-size:20px;font-weight:700;margin-bottom:16px}
.yt-link{display:flex;align-items:center;gap:10px;padding:12px 0;border-bottom:1px solid #f0eeea;text-decoration:none;color:var(--green);font-size:17px;font-weight:500}
.yt-link:last-child{border-bottom:none}
.yt-link:hover{color:var(--green-hover)}
.yt-link svg{width:28px;height:28px;flex-shrink:0}

/* Disclaimer */
.disc{background:#F5F4F1;border-radius:var(--r);padding:24px;margin:0 0 40px}
.disc h4{font-size:16px;font-weight:700;margin-bottom:8px}
.disc p{font-size:14px;color:var(--muted);line-height:1.7}
.disc p+p{margin-top:8px}

/* Footer */
.ftr{border-top:1px solid var(--border);background:linear-gradient(180deg,#FAFDFB,#F7F6F3);padding:36px 20px 20px;text-align:center}
.ftr-inner{max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}
.ftr-brand{display:flex;flex-direction:column;align-items:center;gap:12px}
.ftr-logo{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--text)}
.ftr-logo svg{width:22px;height:22px}.ftr-logo span{font-size:22px;font-weight:700}
.ftr-logo:hover span{color:var(--green)}
.ftr-social{display:flex;gap:10px;list-style:none}
.ftr-social a{display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:#fff;border:1px solid var(--border);color:var(--green)}
.ftr-social svg{width:18px;height:18px}
.ftr-news{background:#FFF8EE;border:1px solid #F0E6D8;border-radius:14px;padding:18px 22px;width:100%;max-width:480px}
.ftr-news h4{font-size:20px;font-weight:700;margin-bottom:10px}
.ftr-form{display:flex;gap:8px;max-width:420px;margin:0 auto}
.ftr-form input{flex:1;padding:12px 14px;border-radius:10px;border:1.5px solid var(--border);background:#fff;font:inherit;font-size:16px;min-width:0}
.ftr-form button{padding:12px 20px;border-radius:10px;border:none;background:var(--green);color:#fff;font-weight:700;font-size:15px;cursor:pointer;min-height:48px;white-space:nowrap}
.ftr-form button:hover{background:var(--green-hover)}
.ftr-priv{margin-top:8px;font-size:14px;color:var(--muted)}.ftr-priv a{color:var(--green);text-decoration:underline}
.ftr-links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 20px;list-style:none}
.ftr-links a{display:inline-block;padding:8px 4px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px;min-height:44px;border-bottom:2px solid transparent}
.ftr-links a:hover{color:var(--green);border-color:var(--badge)}
.ftr-btm{max-width:700px;margin:0 auto;padding:14px 20px 8px;text-align:center;border-top:1px dashed #E0DDD8}
.ftr-btm p{margin:0 0 4px;color:var(--muted);font-size:14px}
.ftr-btm a{color:var(--green);font-weight:700;text-decoration:none;font-size:15px}

/* Responsive */
@media(max-width:700px){
  .page-hero{padding:28px 20px 24px}.page-hero h1{font-size:25px}
  .p-card{padding:20px 18px}.p-name{font-size:19px}
  .p-img{width:80px;padding:10px}.p-img svg{width:52px}
  .r-grid{grid-template-columns:1fr}
  .ftr-form{flex-direction:column}.ftr-form button{width:100%}
  .faq-q{font-size:17px;padding:14px 18px}.faq-a{padding:0 18px 14px}
}
      `}</style>


<section className="page-hero"><div className="page-hero-inner">
<div className="breadcrumb"><a href="/">← All conditions</a></div>
<h1>7 Best Prostate Supplements for Men Over 60</h1>
<p>Doctor-reviewed supplements for enlarged prostate (BPH), nighttime bathroom trips, weak urine flow, and overall prostate support.</p>
</div></section>

<div className="main-wrap">
<div className="main">

<div className="intro"><h3>A note about these recommendations</h3><p>Every supplement below is selected based on clinical research, standardized dosing, and third-party testing. No brand has paid for placement. Always talk to your doctor before starting any supplement, especially if you take prescription medication.</p></div>

<div className="qp">
<h3>⚡ Quick recommendation</h3>
<p><strong>If you try one thing:</strong> <a href="#prostadine">Our #1 Pick — Prostadine</a> is an all-in-one liquid formula that combines 9 proven prostate ingredients.</p>
<p><strong>If you prefer individual supplements:</strong> Start with <a href="#saw-palmetto">#2 Saw Palmetto</a> + <a href="#zinc">#6 Zinc</a> together.</p>
<p><strong>For nighttime bathroom trips:</strong> Add <a href="#pygeum">#3 Pygeum</a> — most effective for reducing nocturia.</p>
</div>

<div className="p-card featured" id="prostadine">
  <div className="p-num">1</div>
  <span className="feat-tag">⭐ Our #1 Pick</span>
  <div className="p-top">
    <div className="p-img">
      <svg viewBox="0 0 120 140" fill="none">
        <rect x="20" y="25" width="55" height="100" rx="8" fill="#B8860B"/>
        <rect x="20" y="25" width="55" height="28" rx="8" fill="#956E08"/>
        <rect x="30" y="10" width="35" height="18" rx="4" fill="#7A5F00"/>
        <rect x="28" y="60" width="39" height="52" rx="4" fill="white" opacity=".95"/>
        <text x="47" y="78" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#7A5F00">PROSTA</text>
        <text x="47" y="88" textAnchor="middle" fontFamily="sans-serif" fontSize="7" fontWeight="700" fill="#7A5F00">DINE</text>
        <text x="47" y="100" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fill="#956E08">9-in-1</text>
        <circle cx="93" cy="85" r="12" fill="#B8860B" opacity=".3"/>
        <circle cx="93" cy="85" r="8" fill="#D4A843" opacity=".6"/>
        <path d="M89 85 L93 80 L97 85" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
    <div className="p-info">
      <h2 className="p-name" style={{"color":"#7A5F00"}}>Prostadine — 9-in-1 Prostate Support</h2>
      <div className="p-sub">All-in-one liquid drops with 9 clinically studied prostate ingredients</div>
      <div className="p-pills">
        <span className="p-pill">Liquid drops</span>
        <span className="p-pill">9 ingredients</span>
        <span className="p-pill">Results: 4-8 weeks</span>
      </div>
    </div>
  </div>
  <div className="p-checks">
    <div className="p-chk"><span className="tick" style={{"color":"#B8860B"}}>✓</span><span>Combines Saw Palmetto, Nori Yaki, Kelp, and 6 more proven ingredients in one bottle</span></div>
    <div className="p-chk"><span className="tick" style={{"color":"#B8860B"}}>✓</span><span>Liquid drops absorb faster than capsules — easier for seniors to take daily</span></div>
    <div className="p-chk"><span className="tick" style={{"color":"#B8860B"}}>✓</span><span>Supports healthy prostate size, strong urine flow, and fewer nighttime trips</span></div>
    <div className="p-chk"><span className="tick" style={{"color":"#B8860B"}}>✓</span><span>180-day money-back guarantee — try it completely risk-free</span></div>
    <div className="p-chk"><span className="tick" style={{"color":"#B8860B"}}>✓</span><span>No need to buy 5 separate supplements — everything in one formula</span></div>
  </div>
  <div className="p-badges">
    <span className="p-badge" style={{"background":"#FFF0C8","color":"#7A5F00"}}>All-natural ingredients</span>
    <span className="p-badge" style={{"background":"#FFF0C8","color":"#7A5F00"}}>FDA-registered facility</span>
    <span className="p-badge" style={{"background":"#FFF0C8","color":"#7A5F00"}}>180-day guarantee</span>
  </div>
  <a href="https://myprostadine24.com/text.php#aff=healthyhabitat90" className="p-btn" target="_blank" rel="noopener noreferrer">Check Latest Price &amp; Availability <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10"/><path d="M7 7h10v10"/></svg></a>
  <div className="p-price">Special discount available — check site for current pricing</div>
</div>

<div className="p-card" id="saw-palmetto">
  <div className="p-num">2</div>
  <div className="p-top">
    <div className="p-img"><svg viewBox="0 0 120 140" fill="none"><rect x="25" y="35" width="70" height="90" rx="8" fill="#1A5632"/><rect x="25" y="35" width="70" height="30" rx="8" fill="#22703F"/><rect x="38" y="18" width="44" height="20" rx="4" fill="#14442A"/><rect x="33" y="72" width="54" height="40" rx="4" fill="white" opacity=".95"/><path d="M52 82C52 76 56 72 62 72C62 78 58 82 52 82Z" fill="#4ADE80"/><text x="60" y="99" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#1A5632">SAW</text><text x="60" y="107" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#1A5632">PALMETTO</text><ellipse cx="105" cy="100" rx="10" ry="7" fill="#D4A843" opacity=".7"/></svg></div>
    <div className="p-info">
      <h2 className="p-name">Saw Palmetto Extract</h2>
      <div className="p-sub">The most studied single-ingredient prostate supplement</div>
      <div className="p-pills"><span className="p-pill">320mg daily</span><span className="p-pill">Morning with food</span><span className="p-pill">8-12 weeks</span></div>
    </div>
  </div>
  <div className="p-checks">
    <div className="p-chk"><span className="tick">✓</span><span>Reduces nighttime bathroom trips by up to 50% in clinical studies</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Improves urine flow and bladder emptying</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Blocks DHT — the hormone that enlarges your prostate</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>First supplement urologists recommend before prescription medication</span></div>
  </div>
  <div className="p-badges"><span className="p-badge">Standardized 85-95%</span><span className="p-badge">Third-party tested</span></div>
  <div className="p-tip"><strong>Look for on Amazon:</strong> 320mg softgels, 85-95% fatty acids, 1,000+ reviews</div>
  <a href="https://amzn.to/47eJPYg" className="p-btn" target="_blank" rel="noopener noreferrer nofollow">Check Price on Amazon <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10"/><path d="M7 7h10v10"/></svg></a>
  <div className="p-price">Typically $15–25 for a 2-month supply</div>
</div>

<div className="p-card" id="pygeum">
  <div className="p-num">3</div>
  <div className="p-top">
    <div className="p-img"><svg viewBox="0 0 120 140" fill="none"><rect x="25" y="35" width="70" height="90" rx="8" fill="#1A5632"/><rect x="25" y="35" width="70" height="30" rx="8" fill="#22703F"/><rect x="38" y="18" width="44" height="20" rx="4" fill="#14442A"/><rect x="33" y="72" width="54" height="40" rx="4" fill="white" opacity=".95"/><circle cx="60" cy="82" r="6" fill="#8B6914"/><text x="60" y="99" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#1A5632">PYGEUM</text><text x="60" y="107" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#1A5632">BARK</text></svg></div>
    <div className="p-info">
      <h2 className="p-name">Pygeum Bark Extract</h2>
      <div className="p-sub">Best for reducing nighttime bathroom trips</div>
      <div className="p-pills"><span className="p-pill">100mg daily</span><span className="p-pill">Morning</span><span className="p-pill">6-8 weeks</span></div>
    </div>
  </div>
  <div className="p-checks">
    <div className="p-chk"><span className="tick">✓</span><span>18 clinical trials with 1,500+ men confirm it reduces nighttime urination</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Prescribed by doctors in France and Italy for over 40 years</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Reduces prostate inflammation and growth factors</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Works well combined with Saw Palmetto for enhanced relief</span></div>
  </div>
  <div className="p-badges"><span className="p-badge">Standardized 14% triterpenes</span><span className="p-badge">Third-party tested</span></div>
  <div className="p-tip"><strong>Look for on Amazon:</strong> 100mg capsules, from Prunus africana bark, standardized</div>
  <a href="https://amzn.to/40N7g7p" className="p-btn" target="_blank" rel="noopener noreferrer nofollow">Check Price on Amazon <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10"/><path d="M7 7h10v10"/></svg></a>
  <div className="p-price">Typically $12–18 for a 2-month supply</div>
</div>

<div className="p-card" id="nettle">
  <div className="p-num">4</div>
  <div className="p-top">
    <div className="p-img"><svg viewBox="0 0 120 140" fill="none"><rect x="25" y="35" width="70" height="90" rx="8" fill="#1A5632"/><rect x="25" y="35" width="70" height="30" rx="8" fill="#22703F"/><rect x="38" y="18" width="44" height="20" rx="4" fill="#14442A"/><rect x="33" y="72" width="54" height="40" rx="4" fill="white" opacity=".95"/><path d="M55 78L60 72L65 78L60 88Z" fill="#4ADE80"/><text x="60" y="99" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#1A5632">NETTLE</text><text x="60" y="107" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#1A5632">ROOT</text></svg></div>
    <div className="p-info">
      <h2 className="p-name">Stinging Nettle Root Extract</h2>
      <div className="p-sub">European-proven, best combined with Saw Palmetto</div>
      <div className="p-pills"><span className="p-pill">300-400mg daily</span><span className="p-pill">Empty stomach</span><span className="p-pill">4-8 weeks</span></div>
    </div>
  </div>
  <div className="p-checks">
    <div className="p-chk"><span className="tick">✓</span><span>Prescribed by German and Austrian doctors for 30+ years</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Reduces prostate swelling and improves urine flow</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Works through different mechanism than Saw Palmetto — great together</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Must be ROOT extract (not leaf) — check the label carefully</span></div>
  </div>
  <div className="p-badges"><span className="p-badge">Root extract only</span><span className="p-badge">Third-party tested</span></div>
  <div className="p-warn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><p><strong>Warning:</strong> May interact with blood thinners, blood pressure meds, and diabetes drugs. Ask your doctor first.</p></div>
  <div className="p-tip"><strong>Look for on Amazon:</strong> Must say "root extract" not leaf. 300-400mg, standardized</div>
  <a href="https://amzn.to/4c2nyiX" className="p-btn" target="_blank" rel="noopener noreferrer nofollow">Check Price on Amazon <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10"/><path d="M7 7h10v10"/></svg></a>
  <div className="p-price">Typically $12–20 for a 2-month supply</div>
</div>

<div className="p-card" id="beta-sitosterol">
  <div className="p-num">5</div>
  <div className="p-top">
    <div className="p-img"><svg viewBox="0 0 120 140" fill="none"><rect x="25" y="35" width="70" height="90" rx="8" fill="#1A5632"/><rect x="25" y="35" width="70" height="30" rx="8" fill="#22703F"/><rect x="38" y="18" width="44" height="20" rx="4" fill="#14442A"/><rect x="33" y="72" width="54" height="40" rx="4" fill="white" opacity=".95"/><circle cx="55" cy="82" r="4" fill="#4ADE80"/><circle cx="65" cy="82" r="4" fill="#34C76A"/><circle cx="60" cy="78" r="4" fill="#2DB85A"/><text x="60" y="99" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fontWeight="700" fill="#1A5632">BETA-</text><text x="60" y="107" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fontWeight="700" fill="#1A5632">SITOSTEROL</text></svg></div>
    <div className="p-info">
      <h2 className="p-name">Beta-Sitosterol Complex</h2>
      <div className="p-sub">Published in The Lancet — strong clinical evidence</div>
      <div className="p-pills"><span className="p-pill">130mg 2x daily</span><span className="p-pill">AM &amp; PM</span><span className="p-pill">4-8 weeks</span></div>
    </div>
  </div>
  <div className="p-checks">
    <div className="p-chk"><span className="tick">✓</span><span>Improved urinary symptoms by 50% in landmark Lancet study</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Nearly doubled peak urine flow rates vs placebo</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Best option when Saw Palmetto alone isn't enough relief</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Plant-based sterol — naturally found in fruits and nuts</span></div>
  </div>
  <div className="p-badges"><span className="p-badge">Clinically studied dose</span><span className="p-badge">Third-party tested</span></div>
  <div className="p-tip"><strong>Look for on Amazon:</strong> 130mg capsules, take 2x daily, plant sterol complex</div>
  <a href="https://amzn.to/4bLsibw" className="p-btn" target="_blank" rel="noopener noreferrer nofollow">Check Price on Amazon <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10"/><path d="M7 7h10v10"/></svg></a>
  <div className="p-price">Typically $15–22 for a 2-month supply</div>
</div>

<div className="p-card" id="zinc">
  <div className="p-num">6</div>
  <div className="p-top">
    <div className="p-img"><svg viewBox="0 0 120 140" fill="none"><rect x="25" y="35" width="70" height="90" rx="8" fill="#1A5632"/><rect x="25" y="35" width="70" height="30" rx="8" fill="#22703F"/><rect x="38" y="18" width="44" height="20" rx="4" fill="#14442A"/><rect x="33" y="72" width="54" height="40" rx="4" fill="white" opacity=".95"/><text x="60" y="84" textAnchor="middle" fontFamily="sans-serif" fontSize="14" fontWeight="900" fill="#1A5632">Zn</text><text x="60" y="99" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#1A5632">ZINC</text><text x="60" y="107" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fontWeight="700" fill="#1A5632">PICOLINATE</text></svg></div>
    <div className="p-info">
      <h2 className="p-name">Zinc Picolinate</h2>
      <div className="p-sub">Your prostate has 10x more zinc than any other organ</div>
      <div className="p-pills"><span className="p-pill">30-50mg daily</span><span className="p-pill">With food</span><span className="p-pill">Ongoing</span></div>
    </div>
  </div>
  <div className="p-checks">
    <div className="p-chk"><span className="tick">✓</span><span>Foundational — supports every other prostate supplement on this list</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Men with prostate issues consistently have low zinc levels</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Picolinate form absorbs far better than cheap zinc oxide</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Helps regulate prostate cell growth and block excess DHT</span></div>
  </div>
  <div className="p-badges"><span className="p-badge">Picolinate (best form)</span><span className="p-badge">Third-party tested</span></div>
  <div className="p-tip"><strong>Look for on Amazon:</strong> "Zinc Picolinate" (not oxide/gluconate), 30-50mg</div>
  <a href="https://amzn.to/484T2CB" className="p-btn" target="_blank" rel="noopener noreferrer nofollow">Check Price on Amazon <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10"/><path d="M7 7h10v10"/></svg></a>
  <div className="p-price">Typically $10–15 for a 3-month supply</div>
</div>

<div className="p-card" id="lycopene">
  <div className="p-num">7</div>
  <div className="p-top">
    <div className="p-img"><svg viewBox="0 0 120 140" fill="none"><rect x="25" y="35" width="70" height="90" rx="8" fill="#1A5632"/><rect x="25" y="35" width="70" height="30" rx="8" fill="#22703F"/><rect x="38" y="18" width="44" height="20" rx="4" fill="#14442A"/><rect x="33" y="72" width="54" height="40" rx="4" fill="white" opacity=".95"/><circle cx="60" cy="82" r="7" fill="#E53E3E"/><path d="M57 78C59 75 61 75 63 78" stroke="#38A169" strokeWidth="1.5" fill="none"/><text x="60" y="99" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fontWeight="700" fill="#1A5632">LYCOPENE</text><text x="60" y="107" textAnchor="middle" fontFamily="sans-serif" fontSize="5" fontWeight="700" fill="#1A5632">30mg</text></svg></div>
    <div className="p-info">
      <h2 className="p-name">Lycopene</h2>
      <div className="p-sub">Tomato antioxidant — your prostate absorbs it more than any organ</div>
      <div className="p-pills"><span className="p-pill">30mg daily</span><span className="p-pill">With fatty meal</span><span className="p-pill">Ongoing</span></div>
    </div>
  </div>
  <div className="p-checks">
    <div className="p-chk"><span className="tick">✓</span><span>Harvard study: 47,000 men — highest lycopene = lowest prostate risk</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Your prostate absorbs more lycopene than any other organ</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Powerful antioxidant — protects prostate cells from damage</span></div>
    <div className="p-chk"><span className="tick">✓</span><span>Must take with fat for absorption (eat with a meal)</span></div>
  </div>
  <div className="p-badges"><span className="p-badge">From tomato extract</span><span className="p-badge">Third-party tested</span></div>
  <div className="p-tip"><strong>Look for on Amazon:</strong> 30mg from tomato extract, softgels (better absorbed)</div>
  <a href="https://amzn.to/4t54vu6" className="p-btn" target="_blank" rel="noopener noreferrer nofollow">Check Price on Amazon <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10"/><path d="M7 7h10v10"/></svg></a>
  <div className="p-price">Typically $12–18 for a 2-month supply</div>
</div>

<div className="faq">
<h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What is the best supplement for an enlarged prostate?<span className="faq-icon">+</span></button><div className="faq-a">Prostadine is our top recommendation because it combines 9 proven prostate ingredients in one liquid formula. If you prefer a single-ingredient supplement, Saw Palmetto (320mg, standardized 85-95%) is the most studied option — most men see results in 8-12 weeks.</div></div>
<div className="faq-item"><button className="faq-q">Can supplements actually help with nighttime bathroom trips?<span className="faq-icon">+</span></button><div className="faq-a">Yes. Saw Palmetto studies show up to 50% reduction in nighttime urination. Pygeum bark is especially effective for nocturia — clinical trials show significant improvement in 6-8 weeks. These work by reducing prostate inflammation, not by sedating you.</div></div>
<div className="faq-item"><button className="faq-q">How long do prostate supplements take to work?<span className="faq-icon">+</span></button><div className="faq-a">Most take 4-12 weeks. Pygeum: 6-8 weeks. Nettle Root: 4-8 weeks. Saw Palmetto and Beta-Sitosterol: 8-12 weeks. Consistency is key — take daily, same time. If no improvement after 12 weeks, talk to your doctor.</div></div>
<div className="faq-item"><button className="faq-q">Are these safe with prescription prostate medications?<span className="faq-icon">+</span></button><div className="faq-a">Most are well-tolerated, but Stinging Nettle Root may interact with blood thinners, BP meds, and diabetes drugs. Always consult your doctor, especially if you take Flomax (tamsulosin) or Proscar (finasteride).</div></div>
<div className="faq-item"><button className="faq-q">Should I take multiple supplements together?<span className="faq-icon">+</span></button><div className="faq-a">Yes — Saw Palmetto + Nettle Root + Zinc work through different mechanisms and complement each other. Or try Prostadine which combines 9 ingredients in one formula. Start with one, add others gradually.</div></div>
</div>

<div className="related"><h3>Related Supplements</h3>
<div className="r-grid">
<a href="/kidney" className="r-link"><span>💧</span> Kidney health</a>
<a href="/heart/" className="r-link"><span>❤️</span> Heart health</a>
<a href="/sleep/" className="r-link"><span>🌙</span> Sleep</a>
<a href="/blood-pressure" className="r-link"><span>💓</span> Blood pressure</a>
</div></div>

<div className="disc"><h4>Medical &amp; Affiliate Disclosure</h4>
<p>This page is for educational purposes only and is not medical advice. Always consult your doctor before starting any supplement. Individual results may vary.</p>
<p>VitaTrack may earn a commission from purchases through links on this page. This does not affect our recommendations — every product is selected based on quality and research. No brand has paid for placement.</p>
</div>

</div>

<aside className="sidebar">
<div className="sidebar-inner">
<h4>Quick navigation</h4>
<div className="sb-links">
<a href="#prostadine" className="sb-link feat"><span className="sb-num">1</span><span className="sb-name">Prostadine</span></a>
<a href="#saw-palmetto" className="sb-link"><span className="sb-num">2</span><span className="sb-name">Saw Palmetto</span></a>
<a href="#pygeum" className="sb-link"><span className="sb-num">3</span><span className="sb-name">Pygeum Bark</span></a>
<a href="#nettle" className="sb-link"><span className="sb-num">4</span><span className="sb-name">Nettle Root</span></a>
<a href="#beta-sitosterol" className="sb-link"><span className="sb-num">5</span><span className="sb-name">Beta-Sitosterol</span></a>
<a href="#zinc" className="sb-link"><span className="sb-num">6</span><span className="sb-name">Zinc</span></a>
<a href="#lycopene" className="sb-link"><span className="sb-num">7</span><span className="sb-name">Lycopene</span></a>
</div>
<hr className="sb-divider" />
<a href="#prostadine" className="sb-cta">Check #1 Pick →</a>
</div>
</aside>
</div>


      <BundleCTA variant="compact" />

      <section style={{maxWidth:"840px",margin:"48px auto 60px",padding:"0 20px"}}>
        <div style={{borderTop:"2px solid #E8E6E1",paddingTop:"32px"}}>
          <h2 style={{color:"#14442A",fontSize:"1.4rem",fontWeight:700,marginBottom:"20px",fontFamily:"Fraunces, serif"}}>Related Health Guides</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:"4px"}}>
          <a href="/conditions/benign-prostatic-hyperplasia-bph" className="interlink">BPH</a>
          <a href="/conditions/urinary-incontinence" className="interlink">Urinary Incontinence</a>
          <a href="/symptoms/urgency-to-urinate" className="interlink">Urinary Urgency</a>
          </div>
        </div>
      </section>
    </>
  );
}
