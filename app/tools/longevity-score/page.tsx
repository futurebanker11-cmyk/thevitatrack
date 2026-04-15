'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function LongevityScorePage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});
document.write(new Date().getFullYear())
function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function calcBioAge(){
  var age=parseInt(document.getElementById('actualAge').value);
  if(!age||age<50||age>100){alert('Please enter your age (50-100)');return;}

  var cats=[
    {q:'q1',label:'Heart & circulation',ic:'❤️',tools:'<a href="/tools/heart-age/">Heart Age Calculator →</a> <a href="/tools/bp-checker/">BP Checker →</a>'},
    {q:'q2',label:'Bones & joints',ic:'🦴',tools:'<a href="/tools/bone-check/">Bone Health Quiz →</a> <a href="/tools/vitamin-d-check/">Vitamin D Check →</a>'},
    {q:'q3',label:'Muscle & mobility',ic:'💪',tools:'<a href="/tools/muscle-loss-risk/">Muscle Loss Quiz →</a> <a href="/tools/fall-risk/">Fall Risk →</a>'},
    {q:'q4',label:'Brain & memory',ic:'🧠',tools:'<a href="/tools/memory-check/">Memory Check →</a>'},
    {q:'q5',label:'Sleep quality',ic:'😴',tools:'<a href="/tools/sleep-score/">Sleep Score Quiz →</a>'},
    {q:'q6',label:'Metabolic health',ic:'⚡',tools:'<a href="/tools/diabetes-risk/">Diabetes Risk →</a> <a href="/tools/bmi-senior/">BMI Calculator →</a>'},
    {q:'q7',label:'Mood & mental health',ic:'🌤️',tools:'<a href="/tools/mood-check/">Mood Check →</a>'},
    {q:'q8',label:'Nutrition & supplements',ic:'🥗',tools:'<a href="/tools/protein-calculator/">Protein Calculator →</a> <a href="/tools/supplement-budget/">Supplement Budget →</a>'},
    {q:'q9',label:'Vision & hearing',ic:'👁️',tools:'<a href="/tools/eye-check/">Eye Health Quiz →</a>'},
    {q:'q10',label:'Organ health',ic:'🫀',tools:'<a href="/tools/kidney-check/">Kidney →</a> <a href="/tools/digestion-check/">Digestion →</a> <a href="/tools/prostate-check/">Prostate →</a>'}
  ];

  var total=0,scores=[];
  for(var i=0;i<cats.length;i++){
    var checked=document.querySelector('input[name="'+cats[i].q+'"]:checked');
    if(!checked){alert('Please answer all 10 questions (domain '+(i+1)+' is missing)');return;}
    var val=parseInt(checked.value);
    total+=val;
    scores.push({label:cats[i].label,ic:cats[i].ic,tools:cats[i].tools,val:val,max:3});
  }

  // Calculate biological age offset: each point adds 0.8 years
  // Perfect health (0) = -8 years. Worst (30) = +16 years
  // Midpoint (15) = +4 years (slight penalty because most seniors have SOME issues)
  var offset=Math.round((total*0.8)-8);
  offset=Math.max(-10,Math.min(offset,18));
  var bioAge=age+offset;
  bioAge=Math.max(45,Math.min(bioAge,105));

  // Needle: -90deg=best, 0=mid, +90=worst. Map offset -10..+18 to -90..+90
  var needleDeg=-90+((offset+10)/28)*180;
  needleDeg=Math.max(-90,Math.min(needleDeg,90));

  document.getElementById('needle').style.transform='rotate('+needleDeg+'deg)';
  document.getElementById('bio-num').textContent=bioAge;
  document.getElementById('bio-num2').textContent=bioAge;
  document.getElementById('act-num').textContent=age;

  var diffEl=document.getElementById('age-diff');
  var diff=age-bioAge;
  if(diff>0){diffEl.textContent=diff+' years younger';diffEl.className='age-diff younger';}
  else if(diff<0){diffEl.textContent=Math.abs(diff)+' years older';diffEl.className='age-diff older';}
  else{diffEl.textContent='Same as actual age';diffEl.className='age-diff same';}

  // Breakdown bars (inverted — high score = high aging impact)
  var bd=document.getElementById('bd-list');bd.innerHTML='';
  scores.forEach(function(s){
    var riskBar=Math.round((s.val/s.max)*100);
    var barCls=riskBar<=33?'high':riskBar<=66?'mid':'low';
    var status=s.val===0?'Excellent':s.val===1?'Good':s.val===2?'Needs work':'Priority';
    var d=document.createElement('div');d.className='bd-item';
    d.innerHTML='<span class="bd-cat">'+s.ic+' '+s.label+'</span><div class="bd-bar-wrap"><div class="bd-bar '+barCls+'" style="width:0%"></div></div><span class="bd-score">'+status+'</span>';
    bd.appendChild(d);
    setTimeout(function(){d.querySelector('.bd-bar').style.width=riskBar+'%';},100);
  });

  // Action plan
  var ap=document.getElementById('ap-list');ap.innerHTML='';
  var plan=[];
  var apEl=document.getElementById('action-plan');

  if(offset<=-4){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Outstanding — you\\'re aging slower than average';
    plan.push({ic:'🏆',t:'<strong>Your biological age is '+Math.abs(diff)+' years younger than your actual age.</strong> Your health habits are paying off. Keep doing what you\\'re doing and focus on maintaining the domains below. Even small improvements in your weakest areas can extend your healthspan further.'});
  }else if(offset<=2){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your longevity action plan';
    plan.push({ic:'📋',t:'<strong>Your biological age is close to your actual age.</strong> You have a solid foundation, but targeted improvements in the domains flagged below could shave 3-5 years off your biological age within 6-12 months.'});
  }else{
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='Priority areas to reverse accelerated aging';
    plan.push({ic:'⚠️',t:'<strong>Your body is aging faster than your calendar age.</strong> The good news: the domains flagged below are mostly modifiable. Research shows targeted interventions can reverse 3-8 years of biological aging. Start with the highest-impact changes below.'});
  }

  // Sort scores by value descending to show worst domains first
  var sorted=scores.slice().sort(function(a,b){return b.val-a.val;});

  sorted.forEach(function(s){
    if(s.val>=2){
      var yearImpact=s.val===3?'+3-5 yrs':'+1-3 yrs';
      plan.push({ic:s.ic,t:'<strong>'+s.label+' ('+yearImpact+' aging impact)</strong> — This domain is aging you significantly. Take the detailed assessment: <span style="display:block;margin-top:6px">'+s.tools+'</span>'});
    }
  });

  sorted.forEach(function(s){
    if(s.val===1){
      plan.push({ic:s.ic,t:'<strong>'+s.label+' — room for improvement.</strong> Not critical, but optimizing this could shave another year. Deeper assessment: <span style="display:block;margin-top:6px">'+s.tools+'</span>'});
    }
  });

  if(offset>0){
    plan.push({ic:'🧬',t:'<strong>Start with the top 2-3 red domains.</strong> You don\\'t need to fix everything at once. Research shows fixing your weakest domains first yields the biggest biological age reduction. Each domain you move from "Priority" to "Good" can take 2-3 years off your biological age.'});
  }

  plan.push({ic:'🌿',t:'<strong>Foundation supplements for longevity:</strong> Vitamin D3+K2 (2000-4000 IU), Omega-3 (fish oil), Magnesium, Collagen peptides, and protein (1.0-1.2g/kg). <a href="/longevity/" style="color:var(--green);font-weight:700">See our longevity supplement guide →</a> | <a href="/tools/supplement-budget/" style="color:var(--green);font-weight:700">Supplement Budget Planner →</a>'});

  plan.forEach(function(p){
    var d=document.createElement('div');d.className='ap-item';
    d.innerHTML='<span class="ic">'+p.ic+'</span><span>'+p.t+'</span>';
    ap.appendChild(d);
  });

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('age-dial').scrollIntoView({behavior:'smooth',block:'center'});},100);
}`;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <>
      <Header />
      <style>{`
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--hdr:#14442A;--hero:#1E6B3E;--green:#1A5632;--gh:#134225;--bg:#F7F6F3;--white:#FFF;--border:#E8E6E1;--text:#2C2C2A;--t2:#555550;--muted:#717170;--badge:#E8F5E9;--r:12px}
html{scroll-behavior:smooth}body{font-family:'Source Sans 3',-apple-system,sans-serif;font-size:18px;line-height:1.6;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased}
.hdr{background:var(--hdr);position:sticky;top:0;z-index:1000}.hdr-inner{max-width:1100px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between}.hdr-logo{display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff}.hdr-logo svg{width:32px;height:32px}.hdr-logo span{font-size:22px;font-weight:700}.hdr-nav{display:flex;gap:6px}.hdr-nav a{color:rgba(255,255,255,.85);text-decoration:none;font-size:15px;font-weight:500;padding:8px 16px;border-radius:8px}.hdr-nav a:hover{background:rgba(255,255,255,.1)}.hdr-toggle{display:none;background:none;border:none;color:#fff;cursor:pointer;padding:8px;min-height:44px;min-width:44px}.hdr-toggle svg{width:26px;height:26px}
.mob{display:none;position:fixed;inset:0;background:var(--hdr);z-index:9999;flex-direction:column}.mob.open{display:flex}.mob-top{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;border-bottom:1px solid rgba(255,255,255,.1)}.mob-logo{display:flex;align-items:center;gap:8px;color:#fff;text-decoration:none}.mob-logo svg{width:28px;height:28px}.mob-logo span{font-size:20px;font-weight:700}.mob-x{background:rgba(255,255,255,.1);border:none;color:#fff;width:44px;height:44px;border-radius:50%;cursor:pointer;font-size:22px;display:flex;align-items:center;justify-content:center}.mob-links a{color:#fff;text-decoration:none;font-size:18px;font-weight:500;padding:16px 28px;display:block;border-bottom:1px solid rgba(255,255,255,.1)}
@media(max-width:768px){.hdr-nav{display:none}.hdr-toggle{display:flex}}
.page-hero{background:linear-gradient(135deg,#1E6B3E,#14442A);color:#fff;padding:40px 24px 36px}.page-hero-inner{max-width:800px;margin:0 auto}.breadcrumb{font-size:15px;color:rgba(255,255,255,.7);margin-bottom:12px}.breadcrumb a{color:rgba(255,255,255,.85);text-decoration:none}.page-hero h1{font-size:32px;font-weight:700;line-height:1.2;margin-bottom:10px}.page-hero p{font-size:18px;color:rgba(255,255,255,.9);max-width:640px}.hero-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.hero-badge{font-size:13px;background:rgba(255,255,255,.15);color:#fff;padding:5px 14px;border-radius:20px;font-weight:600}
.main-wrap{max-width:1100px;margin:0 auto;padding:0 20px;display:flex;gap:28px;align-items:flex-start}.main{flex:1;max-width:800px;min-width:0}
.ad-slot{text-align:center;margin:24px 0;min-height:90px;border-radius:8px}
.intro-note{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px 24px;margin:28px 0 0;border-left:4px solid var(--green)}.intro-note p{font-size:16px;color:var(--t2);line-height:1.6;margin:0}.intro-note strong{color:var(--green)}
.calc-card{background:var(--white);border:2px solid var(--green);border-radius:16px;padding:32px 28px;margin:20px 0 28px;position:relative;overflow:hidden}
.calc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#1A5632,#4ADE80,#1A5632)}
.calc-title{font-size:22px;font-weight:700;color:var(--green);margin-bottom:4px}.calc-sub{font-size:15px;color:var(--t2);margin-bottom:24px}
/* QUIZ QUESTION */
.quiz-q{background:#F5F3FF;border:1px solid #DDD6FE;border-radius:12px;padding:20px 22px;margin-bottom:14px}
.quiz-q h3{font-size:17px;font-weight:700;color:var(--green);margin-bottom:12px}
.quiz-q .q-num{font-size:13px;font-weight:700;color:#4ADE80;margin-bottom:4px}
.q-options{display:flex;flex-direction:column;gap:6px}
.q-opt{display:flex;align-items:center;gap:10px;padding:12px 16px;border:1.5px solid #E9E5FF;border-radius:10px;cursor:pointer;transition:all .15s;background:var(--white)}
.q-opt:hover{border-color:#4ADE80;background:#FAF5FF}
.q-opt.selected{border-color:var(--green);background:#EDE9FE}
.q-opt input{display:none}
.q-radio{width:20px;height:20px;border-radius:50%;border:2px solid #C4B5FD;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .15s}
.q-opt.selected .q-radio{border-color:var(--green);background:var(--green)}
.q-opt.selected .q-radio::after{content:'';width:8px;height:8px;background:#fff;border-radius:50%}
.q-text{font-size:16px;color:var(--text)}
.calc-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(135deg,#1A5632,#22703F);color:#fff;border:none;padding:18px 32px;border-radius:12px;font:inherit;font-size:20px;font-weight:700;cursor:pointer;width:100%;min-height:60px;box-shadow:0 4px 14px rgba(26,86,50,.3);transition:transform .1s}.calc-btn:hover{transform:translateY(-1px)}
.results{display:none;margin-top:28px}.results.show{display:block;animation:fadeIn .5s}
@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
/* SCORE RESULT */
.sleep-result{border-radius:14px;padding:32px 24px;text-align:center;margin-bottom:24px;border:2px solid var(--border)}
.sleep-result.excellent{background:#F0FAF3;border-color:#A7D8B8}
.sleep-result.good{background:#EFF6FF;border-color:#93C5FD}
.sleep-result.fair{background:#FFFBEB;border-color:#E8D48B}
.sleep-result.poor{background:#FEF2F2;border-color:#F87171}
.score-emoji{font-size:48px;margin-bottom:8px}
.score-num{font-size:64px;font-weight:700;line-height:1}.score-of{font-size:22px;font-weight:600;color:var(--t2)}.score-label{font-size:22px;font-weight:700;margin-top:6px}.score-sub{font-size:16px;color:var(--t2);margin-top:8px}
.sleep-result.excellent .score-num,.sleep-result.excellent .score-label{color:#1A5632}
.sleep-result.good .score-num,.sleep-result.good .score-label{color:#2563EB}
.sleep-result.fair .score-num,.sleep-result.fair .score-label{color:#B8860B}
.sleep-result.poor .score-num,.sleep-result.poor .score-label{color:#C62828}
/* BREAKDOWN */
.breakdown{margin:20px 0}.breakdown h3{font-size:19px;font-weight:700;margin-bottom:14px}
.bd-item{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:10px;margin-bottom:8px;background:var(--white);border:1px solid var(--border)}
.bd-cat{flex:1;font-size:15px;font-weight:600;color:var(--text)}.bd-bar-wrap{flex:2;height:10px;background:#E8E6E1;border-radius:5px;overflow:hidden}
.bd-bar{height:100%;border-radius:5px;transition:width .6s}.bd-bar.high{background:#22C55E}.bd-bar.mid{background:#EAB308}.bd-bar.low{background:#EF4444}
.bd-score{font-size:14px;font-weight:700;min-width:40px;text-align:right}
/* TIPS */
.tips{background:#F5F3FF;border:2px solid #DDD6FE;border-radius:14px;padding:24px;margin:20px 0}
.tips h3{font-size:19px;font-weight:700;color:var(--green);margin-bottom:14px}
.tip-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:10px}
.tip-item .ic{font-size:18px;flex-shrink:0;line-height:1.4}.tip-item span{font-size:15px;color:var(--t2);line-height:1.5}
/* STANDARD SECTIONS */
.content-section{margin:32px 0}.content-section h2{font-size:24px;font-weight:700;margin-bottom:14px}.content-section h3{font-size:20px;font-weight:700;color:var(--green);margin:20px 0 10px}.content-section p{font-size:17px;color:var(--t2);line-height:1.7;margin-bottom:14px}
.faq{margin:36px 0}.faq h2{font-size:24px;font-weight:700;margin-bottom:20px;text-align:center}.faq-item{background:var(--white);border:1px solid var(--border);border-radius:var(--r);margin-bottom:10px}.faq-q{padding:16px 22px;font-size:18px;font-weight:600;color:var(--text);cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:12px;background:none;border:none;width:100%;text-align:left;font-family:inherit;line-height:1.4}.faq-q:hover{background:#FAFAF8}.faq-icon{font-size:22px;color:var(--muted);flex-shrink:0;transition:transform .2s}.faq-q.active .faq-icon{transform:rotate(45deg)}.faq-a{padding:0 22px 16px;font-size:16px;color:var(--t2);line-height:1.65;display:none}.faq-a.show{display:block}
.related{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:24px;margin:32px 0}.related h3{font-size:20px;font-weight:700;margin-bottom:16px}.r-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.r-link{display:flex;align-items:center;gap:10px;padding:14px 16px;border:1px solid var(--border);border-radius:10px;text-decoration:none;color:var(--green);font-weight:600;font-size:16px}.r-link:hover{border-color:#c5c3be}
.disc{background:#F5F4F1;border-radius:var(--r);padding:24px;margin:0 0 40px}.disc h4{font-size:16px;font-weight:700;margin-bottom:8px}.disc p{font-size:14px;color:var(--muted);line-height:1.7}.disc p+p{margin-top:8px}
.sidebar{width:240px;flex-shrink:0;position:sticky;top:70px;display:none}.sidebar-inner{background:var(--white);border:1px solid var(--border);border-radius:var(--r);padding:18px}.sidebar h4{font-size:15px;font-weight:700;margin-bottom:14px}.sb-link{display:block;padding:8px 10px;border-radius:8px;text-decoration:none;background:#F8FAF8;font-size:14px;font-weight:600;color:var(--green);margin-bottom:6px}.sb-link:hover{background:#E8F5E9}.sb-div{border:none;border-top:1px solid var(--border);margin:12px 0}.sb-sub{font-size:13px;color:var(--muted);margin-top:12px}.sb-sub a{color:var(--green);text-decoration:none;display:block;padding:5px 0;font-weight:600}
@media(min-width:1000px){.sidebar{display:block}}@media(max-width:999px){.main-wrap{max-width:800px}}
.ftr{border-top:1px solid var(--border);background:linear-gradient(180deg,#FAFDFB,#F7F6F3);padding:36px 20px 20px;text-align:center}.ftr-inner{max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:20px}.ftr-logo{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:var(--text)}.ftr-logo svg{width:22px;height:22px}.ftr-logo span{font-size:22px;font-weight:700}.ftr-logo:hover span{color:var(--green)}.ftr-links{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 20px;list-style:none}.ftr-links a{display:inline-block;padding:8px 4px;text-decoration:none;color:var(--text);font-weight:600;font-size:15px;min-height:44px}.ftr-links a:hover{color:var(--green)}.ftr-btm{max-width:700px;margin:0 auto;padding:14px 20px 8px;text-align:center;border-top:1px dashed #E0DDD8}.ftr-btm p{margin:0 0 4px;color:var(--muted);font-size:14px}
@media(max-width:700px){.page-hero{padding:28px 20px 24px}.page-hero h1{font-size:26px}.calc-card{padding:24px 18px}.score-num{font-size:48px}.r-grid{grid-template-columns:1fr}.faq-q{font-size:17px;padding:14px 18px}}
      `}</style>
<div className="main-wrap">
<div className="main">

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="8981383031" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="intro-note"><p><strong>Biological age is the best predictor of your healthspan.</strong> It reflects how well your cells, organs, and systems are actually functioning — not just how many birthdays you've had. Research shows seniors can lower their biological age by 3-8 years through targeted lifestyle changes. This quiz maps 10 key health domains to show you exactly where to focus.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Find Your Biological Age</h2>
<div className="calc-sub">10 domains covering every system that determines how fast you're aging</div>

<div className="calc-row"><label className="calc-label" htmlFor="actualAge">Your actual age</label><input type="number" id="actualAge" className="calc-input" min="50" max="100" value="68" placeholder="e.g. 68" /></div>

<div className="quiz-q"><div className="q-num">Domain 1 of 10 — Heart & Circulation</div><h3>❤️ How is your cardiovascular health?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Excellent — normal BP, no meds, active lifestyle</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Good — BP managed with 1 med, moderately active</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Fair — high BP, cholesterol, or heart concerns</span></label>
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Poor — heart disease, multiple meds, limited activity</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Domain 2 of 10 — Bones & Joints</div><h3>🦴 How are your bones and joints?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">Strong — no pain, no fractures, take calcium + D3</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">Mild stiffness — occasional joint discomfort</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">Moderate — chronic joint pain or osteopenia diagnosed</span></label>
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">Significant — osteoporosis, fracture history, or severe arthritis</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Domain 3 of 10 — Muscle & Mobility</div><h3>💪 How is your strength and balance?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">Strong — exercise regularly, good balance, no falls</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Moderate — walk regularly but noticeably weaker</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">Declining — difficulty with stairs, occasional unsteadiness</span></label>
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Weak — use assistive device, fear of falling, very sedentary</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Domain 4 of 10 — Brain & Memory</div><h3>🧠 How sharp is your memory and thinking?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">Sharp — quick recall, learn new things easily</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Good — occasional word-finding pauses, normal for age</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Noticeably slower — frequent forgetfulness, harder to concentrate</span></label>
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Concerning — memory problems affecting daily life</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Domain 5 of 10 — Sleep Quality</div><h3>😴 How well do you sleep?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">Great — fall asleep easily, 7+ hours, wake refreshed</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">Decent — occasional trouble, 6-7 hours, mostly rested</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">Poor — frequent waking, under 6 hours, often tired</span></label>
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">Terrible — insomnia, 3+ bathroom trips, exhausted daily</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Domain 6 of 10 — Metabolic Health</div><h3>⚡ How is your blood sugar and weight?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">Healthy — normal blood sugar, healthy weight</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">Borderline — prediabetes or mildly overweight</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Managed — Type 2 diabetes on medication, or obese</span></label>
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Uncontrolled — poorly managed diabetes or severe obesity</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Domain 7 of 10 — Mood & Mental Health</div><h3>🌤️ How is your emotional wellbeing?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">Positive — good mood, social connections, sense of purpose</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Okay — occasional low days, somewhat socially active</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Struggling — frequent sadness, loneliness, or anxiety</span></label>
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">Depressed — persistent low mood, isolated, loss of interest</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Domain 8 of 10 — Nutrition & Supplements</div><h3>🥗 How well do you eat and supplement?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Excellent — protein at every meal, vegetables, D3+K2, fish oil</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Good — balanced diet but inconsistent supplementation</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Fair — skip meals, low protein, few supplements</span></label>
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">Poor — very limited diet, no supplements, unintentional weight loss</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Domain 9 of 10 — Vision & Hearing</div><h3>👁️ How are your eyes and ears?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">Clear — good vision with correction, normal hearing</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Mild changes — need stronger glasses, slight hearing loss</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Moderate — cataracts, macular changes, or hearing aids needed</span></label>
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Significant — severe vision loss, advanced eye disease, or deaf</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Domain 10 of 10 — Organ Health</div><h3>🫀 How are your kidneys, digestion, and prostate (if applicable)?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">Healthy — no issues, regular checkups, all normal</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">Minor — occasional reflux, slightly enlarged prostate, or mild kidney numbers</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">Moderate — IBS, BPH symptoms, or stage 2-3 CKD</span></label>
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">Significant — chronic GI issues, advanced kidney disease, or urinary problems</span></label>
</div></div>

<button className="calc-btn">🧬 Calculate My Biological Age →</button>

<div className="results" id="results">
<div className="age-dial" id="age-dial">
<div className="dial-wrap"><div className="dial-bg"></div><div className="dial-mask"></div><div className="dial-needle" id="needle"></div><div className="dial-center"></div></div>
<div className="bio-age-num" id="bio-num">65</div>
<div className="bio-age-label">Your estimated biological age</div>
<div className="age-compare">
<div className="age-box"><div className="ab-num" id="act-num">68</div><div className="ab-label">Actual age</div></div>
<div className="age-box"><div className="ab-num" id="bio-num2" style={{"color":"var(--green)"}}>65</div><div className="ab-label">Body age</div></div>
</div>
<div className="age-diff" id="age-diff">3 years younger</div>
</div>
<div className="breakdown"><h3>Your 10 health domain scores</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your longevity action plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>
<div className="content-section">
<h2>What is biological age — and why it matters more than your birthday</h2>
<p>Your chronological age counts the years since birth. Your biological age measures how well your body is actually functioning. Two people born the same year can have dramatically different biological ages depending on their lifestyle, genetics, and health management. A landmark study in the Proceedings of the National Academy of Sciences tracked 1,000 adults and found their biological ages ranged from 28 to 61 — all at the chronological age of 38. The difference only grows wider after 60.</p>

<h3>The 10 systems that determine how fast you age</h3>
<p>Biological aging isn't one process — it's the combined decline of multiple interconnected systems. Your heart and blood vessels determine cardiovascular age. Your bone density and joint health determine skeletal age. Muscle mass and strength determine functional age. Brain function determines cognitive age. Each domain ages at its own rate, influenced by both genetics and choices. The domain aging fastest is your biggest opportunity for improvement.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: Belsky et al., "Quantification of Biological Aging in Young Adults," PNAS, 2015. Levine ME, "Modeling the Rate of Senescence," Journals of Gerontology, 2013. Epigenetic clock research by Horvath & Hannum.</em></p>

<h3>The difference between healthspan and lifespan</h3>
<p>Lifespan is how long you live. Healthspan is how long you live well — independently, with sharp thinking, physical capability, and quality of life. The average American lives to 78 but spends the last 12 years dealing with chronic disease, disability, or cognitive decline. The goal of longevity science is closing that gap. Every year you shave off your biological age is a year added to your healthspan — not just more years, but better years.</p>

<h3>Can you actually reverse aging after 60?</h3>
<p>Yes — within limits. A clinical trial published in Aging Cell showed that an 8-week program of diet, sleep, exercise, and supplementation reduced biological age by an average of 3.23 years. The biggest levers for seniors: strength training (reverses 10-20 years of muscle loss), quality sleep (repairs cellular damage), proper protein intake (prevents sarcopenia), vitamin D optimization (affects bones, muscles, mood, and immunity simultaneously), and social connection (isolation accelerates aging as much as smoking 15 cigarettes daily).</p>

<h3>Dive deeper into each health domain</h3>
<p>This quiz gives you the big picture. For a detailed assessment of any domain that scored poorly, use our specialized tools below. Each one provides a deeper analysis with specific, actionable recommendations.</p>
</div>

<div className="content-section" style={{"background":"var(--card-bg)","borderRadius":"12px","padding":"24px","margin":"24px 0"}}>
<h3 style={{"marginTop":"0"}}>Your complete assessment toolkit</h3>
<div style={{"display":"grid","gridTemplateColumns":"1fr 1fr","gap":"12px"}}>
<a href="/tools/heart-age/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>❤️ Heart Age Calculator</a>
<a href="/tools/bp-checker/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🩺 Blood Pressure Checker</a>
<a href="/tools/bone-check/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🦴 Bone Health Quiz</a>
<a href="/tools/vitamin-d-check/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>☀️ Vitamin D Check</a>
<a href="/tools/muscle-loss-risk/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>💪 Muscle Loss Quiz</a>
<a href="/tools/fall-risk/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🛡️ Fall Risk Assessment</a>
<a href="/tools/memory-check/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🧠 Memory Check</a>
<a href="/tools/sleep-score/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>😴 Sleep Score Quiz</a>
<a href="/tools/diabetes-risk/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🩸 Diabetes Risk Quiz</a>
<a href="/tools/bmi-senior/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>⚖️ BMI for Seniors</a>
<a href="/tools/mood-check/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🌤️ Mood Check</a>
<a href="/tools/protein-calculator/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🥩 Protein Calculator</a>
<a href="/tools/calorie-calculator/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🔥 Calorie Calculator</a>
<a href="/tools/hydration/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>💧 Hydration Calculator</a>
<a href="/tools/eye-check/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>👁️ Eye Health Quiz</a>
<a href="/tools/prostate-check/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🩺 Prostate Check</a>
<a href="/tools/kidney-check/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🫘 Kidney Check</a>
<a href="/tools/digestion-check/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>🫃 Digestion Quiz</a>
<a href="/tools/glp1-calculator/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>💉 GLP-1 Calculator</a>
<a href="/tools/supplement-budget/" style={{"color":"var(--green)","fontWeight":"600","textDecoration":"none","padding":"10px","border":"1px solid var(--border)","borderRadius":"8px","display":"block"}}>💰 Supplement Budget</a>
</div>
<p style={{"marginTop":"16px","textAlign":"center"}}><strong>See our full supplement guides:</strong> <a href="/longevity/" style={{"color":"var(--green)"}}>Longevity</a> · <a href="/heart/" style={{"color":"var(--green)"}}>Heart</a> · <a href="/brain/" style={{"color":"var(--green)"}}>Brain</a> · <a href="/joints/" style={{"color":"var(--green)"}}>Joints</a> · <a href="/sleep/" style={{"color":"var(--green)"}}>Sleep</a> · <a href="/digestion/" style={{"color":"var(--green)"}}>Digestion</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">What is biological age vs chronological age?<span className="faq-icon">+</span></button><div className="faq-a">Chronological age counts years since birth. Biological age measures how your body actually functions. A healthy 70-year-old may have biology of a 62-year-old. The gap determines your healthspan — years of good health, independence, and quality of life.</div></div>
<div className="faq-item"><button className="faq-q">Can you lower biological age after 60?<span className="faq-icon">+</span></button><div className="faq-a">Yes — clinical research shows reductions of 3-8 years through exercise (especially strength training), quality sleep, proper nutrition, vitamin D optimization, stress management, and social connection. It's never too late to start.</div></div>
<div className="faq-item"><button className="faq-q">What accelerates aging the most?<span className="faq-icon">+</span></button><div className="faq-a">Biggest accelerators: physical inactivity (adds 5-8 years), poor sleep (3-5 years), chronic stress and isolation (3-5 years), untreated high BP and diabetes (4-7 years), and smoking (5-10 years). Most are modifiable.</div></div>
<div className="faq-item"><button className="faq-q">How accurate are biological age quizzes?<span className="faq-icon">+</span></button><div className="faq-a">Online quizzes provide lifestyle-based estimates. Clinical testing uses blood biomarkers (DNA methylation, telomere length, inflammatory markers). This quiz identifies the modifiable factors that most strongly predict your aging trajectory.</div></div>
<div className="faq-item"><button className="faq-q">What is healthspan vs lifespan?<span className="faq-icon">+</span></button><div className="faq-a">Lifespan = how long you live. Healthspan = how long you live WELL — independently, with sharp thinking and physical capability. Average Americans have 12 fewer healthy years than total years. Every year off biological age is a year added to healthspan.</div></div>
<div className="faq-item"><button className="faq-q">What supplements support healthy aging?<span className="faq-icon">+</span></button><div className="faq-a">Evidence-based: Vitamin D3+K2 (2000-4000 IU), Omega-3 fish oil (heart/brain), Magnesium (sleep/muscle/bone), Collagen peptides (joints/skin), CoQ10 (cellular energy), and adequate protein (1.0-1.2g per kg body weight).</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/longevity/" className="r-link"><span>🧬</span> Longevity supplements</a>
<a href="/tools/heart-age/" className="r-link"><span>❤️</span> Heart Age Calculator</a>
<a href="/tools/muscle-loss-risk/" className="r-link"><span>💪</span> Muscle Loss Quiz</a>
<a href="/tools/memory-check/" className="r-link"><span>🧠</span> Memory Check</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz provides a lifestyle-based biological age estimate — it is NOT a clinical measurement. True biological age testing requires blood biomarkers (DNA methylation, telomere length). Use this as a guide to identify which health areas deserve attention. Always consult your doctor before making significant changes to your health routine.</p></div>

</div>

<aside className="sidebar"><div className="sidebar-inner">
<h4>On this page</h4>
<a href="#calculator" className="sb-link">Take the Quiz</a>
<a href="#results" className="sb-link">Your Score</a>
<hr className="sb-div" />
<div className="sb-sub"><strong>All health tools</strong>
<a href="/tools/longevity-score/">Biological Age ★</a>
<a href="/tools/heart-age/">Heart Age</a>
<a href="/tools/bp-checker/">BP Checker</a>
<a href="/tools/bone-check/">Bone Health</a>
<a href="/tools/vitamin-d-check/">Vitamin D</a>
<a href="/tools/muscle-loss-risk/">Muscle Loss</a>
<a href="/tools/fall-risk/">Fall Risk</a>
<a href="/tools/memory-check/">Memory Check</a>
<a href="/tools/sleep-score/">Sleep Quiz</a>
<a href="/tools/diabetes-risk/">Diabetes Risk</a>
<a href="/tools/bmi-senior/">BMI for Seniors</a>
<a href="/tools/mood-check/">Mood Check</a>
<a href="/tools/prostate-check/">Prostate Check</a>
<a href="/tools/kidney-check/">Kidney Check</a>
<a href="/tools/eye-check/">Eye Check</a>
<a href="/tools/digestion-check/">Digestion Quiz</a>
<a href="/tools/protein-calculator/">Protein Calc</a>
<a href="/tools/calorie-calculator/">Calorie Calc</a>
<a href="/tools/hydration/">Hydration</a>
<a href="/tools/glp1-calculator/">GLP-1 Calc</a>
<a href="/tools/supplement-budget/">Budget Planner</a>
</div>
<hr className="sb-div" />
<div className="sb-sub"><strong>Supplement guides</strong>
<a href="/longevity/">Longevity</a>
<a href="/heart/">Heart health</a>
<a href="/brain/">Brain &amp; memory</a>
<a href="/joints/">Joints &amp; bones</a>
<a href="/prostate/">Prostate</a>
<a href="/sleep/">Sleep</a>
<a href="/digestion/">Digestion</a>
<a href="/eyes/">Eye health</a>
<a href="/kidney/">Kidney</a>
<a href="/blood-pressure/">Blood pressure</a>
<a href="/skin-hair/">Skin &amp; hair</a>
<a href="/liver/">Liver</a>
</div>
</div></aside>
</div>


    </>
  );
}
