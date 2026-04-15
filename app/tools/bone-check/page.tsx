'use client';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function BoneCheckPage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.textContent = `function sel(el){
  el.closest('.q-options').querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected')});
  el.classList.add('selected');
  el.querySelector('input').checked=true;
}

function scoreRisk(){
  var cats=[
    {q:'q1',label:'Age & sex risk'},
    {q:'q2',label:'Fracture history'},
    {q:'q3',label:'Family history'},
    {q:'q4',label:'Corticosteroid use'},
    {q:'q5',label:'Height loss'},
    {q:'q6',label:'Body weight'},
    {q:'q7',label:'Weight-bearing exercise'},
    {q:'q8',label:'Calcium & Vitamin D intake'},
    {q:'q9',label:'Smoking & alcohol'},
    {q:'q10',label:'DEXA screening status'}
  ];

  var total=0,scores=[];
  for(var i=0;i<cats.length;i++){
    var checked=document.querySelector('input[name="'+cats[i].q+'"]:checked');
    if(!checked){alert('Please answer all 10 questions (question '+(i+1)+' is missing)');return;}
    var val=parseInt(checked.value);
    total+=val;
    scores.push({label:cats[i].label,val:val,max:3});
  }

  var riskPct=Math.round((total/30)*100);

  var cls,emoji,label,sub;
  if(riskPct<=15){cls='low';emoji='✅';label='Low Osteoporosis Risk';sub='Your bone health risk factors are minimal. Continue calcium, D3, and weight-bearing exercise.';}
  else if(riskPct<=35){cls='low';emoji='🦴';label='Low-to-Moderate Risk';sub='Some risk factors present. Make sure you\\'re getting DEXA screening and taking calcium + D3.';}
  else if(riskPct<=55){cls='moderate';emoji='⚠️';label='Moderate Osteoporosis Risk';sub='Several significant risk factors. Schedule a DEXA scan if you haven\\'t had one, and review the plan below.';}
  else if(riskPct<=75){cls='high';emoji='🟠';label='High Osteoporosis Risk';sub='Multiple strong risk factors. Discuss bone density testing and treatment options with your doctor.';}
  else{cls='high';emoji='🔴';label='Very High Risk';sub='Your risk profile is significant. See your doctor for DEXA scan and osteoporosis treatment as soon as possible.';}

  document.getElementById('risk-result').className='risk-result '+cls;
  document.getElementById('r-emoji').textContent=emoji;
  document.getElementById('r-score').textContent=riskPct;
  document.getElementById('r-label').textContent=label;
  document.getElementById('r-sub').textContent=sub;

  var bd=document.getElementById('bd-list');bd.innerHTML='';
  scores.forEach(function(s){
    var riskBar=Math.round((s.val/s.max)*100);
    var barCls=riskBar<=33?'high':riskBar<=66?'mid':'low';
    var d=document.createElement('div');d.className='bd-item';
    d.innerHTML='<span class="bd-cat">'+s.label+'</span><div class="bd-bar-wrap"><div class="bd-bar '+barCls+'" style="width:0%"></div></div><span class="bd-score">'+s.val+'/3</span>';
    bd.appendChild(d);
    setTimeout(function(){d.querySelector('.bd-bar').style.width=riskBar+'%';},100);
  });

  var ap=document.getElementById('ap-list');ap.innerHTML='';
  var plan=[];
  var apEl=document.getElementById('action-plan');

  if(riskPct>55){
    apEl.className='action-plan urgent';
    document.getElementById('ap-title').textContent='Important — protect your bones now';
    plan.push({ic:'🩺',t:'<strong>Schedule a DEXA bone density scan.</strong> Multiple risk factors mean you need to know your actual bone density. Ask your doctor for a DEXA scan — it takes 15 minutes, is painless, and is covered by Medicare for women 65+ and men 70+. Early treatment prevents fractures.'});
  }else if(riskPct>30){
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your bone protection plan';
    plan.push({ic:'📋',t:'<strong>You have modifiable risk factors.</strong> Focus on the red and yellow items above. Even without medication, calcium, Vitamin D, and exercise can measurably improve bone density within 1-2 years.'});
  }else{
    apEl.className='action-plan';
    document.getElementById('ap-title').textContent='Your bone health maintenance plan';
    plan.push({ic:'✅',t:'<strong>Your bone health risk is low — excellent!</strong> Maintain with the habits below and get DEXA screening at recommended intervals.'});
  }

  if(scores[1].val>=2) plan.push({ic:'🦴',t:'<strong>A prior fracture from minor impact is a red flag for osteoporosis.</strong> This means your bones may already be significantly weakened. A DEXA scan is essential, and your doctor should discuss prescription medications (bisphosphonates or denosumab) that can reduce future fracture risk by 50-70%.'});
  if(scores[4].val>=2) plan.push({ic:'📏',t:'<strong>Height loss indicates vertebral compression fractures.</strong> Losing 1.5+ inches means your spine vertebrae are likely collapsing under normal body weight — a hallmark of spinal osteoporosis. A spine X-ray or DEXA scan with vertebral fracture assessment (VFA) is recommended.'});
  if(scores[3].val>=2) plan.push({ic:'💊',t:'<strong>Corticosteroid use is the #1 medication cause of osteoporosis.</strong> Even moderate doses of prednisone for 3+ months cause significant bone loss. If you take or have taken steroids, you need DEXA monitoring and may need bone-protective medication. Discuss with your prescribing doctor.'});
  if(scores[5].val>=2) plan.push({ic:'⚖️',t:'<strong>Low body weight increases fracture risk.</strong> Very thin seniors have less bone mass and less padding to absorb falls. Ensure adequate calorie and protein intake to maintain healthy weight. <a href="/tools/calorie-calculator/" style="color:var(--green);font-weight:700">Calorie Calculator →</a> | <a href="/tools/bmi-senior/" style="color:var(--green);font-weight:700">BMI Calculator →</a>'});
  if(scores[6].val>=2) plan.push({ic:'🏋️',t:'<strong>Weight-bearing exercise builds bone density at any age.</strong> Walking (30 min daily), stair climbing, dancing, and resistance training all stress bones in ways that stimulate formation. Tai chi reduces falls by 40%. Start with whatever you can do safely. <a href="/tools/muscle-loss-risk/" style="color:var(--green);font-weight:700">Muscle Loss Quiz →</a>'});
  if(scores[7].val>=2) plan.push({ic:'🥛',t:'<strong>Calcium + Vitamin D are non-negotiable for bones.</strong> Target: 1200mg calcium daily (food + supplement), 2000-4000 IU Vitamin D3 + 100-200mcg K2. Calcium citrate is best absorbed by seniors. Take D3 with a fatty meal for absorption. Get D levels tested — optimal is 40-60 ng/mL.'});
  if(scores[8].val>=2) plan.push({ic:'🚬',t:'<strong>Smoking and heavy alcohol directly destroy bone.</strong> Smoking reduces bone-building cell activity. Alcohol (3+ drinks/day) interferes with calcium absorption and hormone balance. Quitting smoking shows bone density improvement within 1-2 years.'});
  if(scores[9].val>=2) plan.push({ic:'📋',t:'<strong>Get a DEXA scan.</strong> You either haven\\'t been screened or have already been diagnosed. If never screened: schedule one now. If diagnosed with osteopenia or osteoporosis: make sure you\\'re on a treatment plan and getting follow-up scans every 2 years.'});

  plan.push({ic:'🌿',t:'<strong>Bone-supporting supplements:</strong> Calcium Citrate (1200mg), Vitamin D3+K2 (2000-4000 IU + 100-200mcg), Magnesium (400mg), Collagen peptides (10g). <a href="/joints/" style="color:var(--green);font-weight:700">See our joint &amp; bone supplement guide →</a>'});
  plan.push({ic:'🛡️',t:'<strong>Fracture prevention = bone strength + fall prevention.</strong> Even with osteoporosis, preventing falls prevents fractures. <a href="/tools/fall-risk/" style="color:var(--green);font-weight:700">Take the Fall Risk Assessment →</a>'});

  plan.forEach(function(p){
    var d=document.createElement('div');d.className='ap-item';
    d.innerHTML='<span class="ic">'+p.ic+'</span><span>'+p.t+'</span>';
    ap.appendChild(d);
  });

  document.getElementById('results').classList.add('show');
  setTimeout(function(){document.getElementById('risk-result').scrollIntoView({behavior:'smooth',block:'center'});},100);
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

<div className="intro-note"><p><strong>By the time you feel it, it's too late.</strong> Osteoporosis has no symptoms until a bone breaks. A DEXA scan is the only way to know your bone density. But this quiz identifies whether your risk factors warrant screening — and what you can do NOW to strengthen your bones, regardless of your current density.</p></div>

<div className="calc-card" id="calculator">
<h2 className="calc-title">Assess Your Bone Health Risk</h2>
<div className="calc-sub">Based on FRAX fracture risk factors used by doctors worldwide</div>

<div className="quiz-q"><div className="q-num">Question 1 of 10</div><h3>👤 What is your sex and age?</h3><div className="q-options" id="q1">
<label className="q-opt"><input type="radio" name="q1" value="0" /><span className="q-radio"></span><span className="q-text">Male, under 70</span></label>
<label className="q-opt"><input type="radio" name="q1" value="1" /><span className="q-radio"></span><span className="q-text">Male, 70+ OR Female, under 65</span></label>
<label className="q-opt"><input type="radio" name="q1" value="2" /><span className="q-radio"></span><span className="q-text">Female, 65-74</span></label>
<label className="q-opt"><input type="radio" name="q1" value="3" /><span className="q-radio"></span><span className="q-text">Female, 75+</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 2 of 10</div><h3>🦴 Have you ever broken a bone after age 50?</h3><div className="q-options" id="q2">
<label className="q-opt"><input type="radio" name="q2" value="0" /><span className="q-radio"></span><span className="q-text">No fractures after age 50</span></label>
<label className="q-opt"><input type="radio" name="q2" value="1" /><span className="q-radio"></span><span className="q-text">One fracture from a significant fall or accident</span></label>
<label className="q-opt"><input type="radio" name="q2" value="2" /><span className="q-radio"></span><span className="q-text">One fracture from a minor fall or bump</span></label>
<label className="q-opt"><input type="radio" name="q2" value="3" /><span className="q-radio"></span><span className="q-text">Multiple fractures, or a hip/spine fracture</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 3 of 10</div><h3>👨‍👩‍👦 Did a parent break a hip?</h3><div className="q-options" id="q3">
<label className="q-opt"><input type="radio" name="q3" value="0" /><span className="q-radio"></span><span className="q-text">No parental hip fracture</span></label>
<label className="q-opt"><input type="radio" name="q3" value="1" /><span className="q-radio"></span><span className="q-text">Not sure / don't know</span></label>
<label className="q-opt"><input type="radio" name="q3" value="2" /><span className="q-radio"></span><span className="q-text">One parent had a hip fracture</span></label>
<label className="q-opt"><input type="radio" name="q3" value="3" /><span className="q-radio"></span><span className="q-text">Both parents had fractures or osteoporosis</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 4 of 10</div><h3>💊 Have you taken corticosteroids (prednisone) for 3+ months?</h3><div className="q-options" id="q4">
<label className="q-opt"><input type="radio" name="q4" value="0" /><span className="q-radio"></span><span className="q-text">Never</span></label>
<label className="q-opt"><input type="radio" name="q4" value="1" /><span className="q-radio"></span><span className="q-text">Short courses only (under 3 months total)</span></label>
<label className="q-opt"><input type="radio" name="q4" value="2" /><span className="q-radio"></span><span className="q-text">Yes, 3-12 months total</span></label>
<label className="q-opt"><input type="radio" name="q4" value="3" /><span className="q-radio"></span><span className="q-text">Yes, long-term use (1+ years)</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 5 of 10</div><h3>📏 Have you lost 1.5+ inches in height?</h3><div className="q-options" id="q5">
<label className="q-opt"><input type="radio" name="q5" value="0" /><span className="q-radio"></span><span className="q-text">No — same height or minimal change</span></label>
<label className="q-opt"><input type="radio" name="q5" value="1" /><span className="q-radio"></span><span className="q-text">About 1 inch shorter</span></label>
<label className="q-opt"><input type="radio" name="q5" value="2" /><span className="q-radio"></span><span className="q-text">1.5-2 inches shorter</span></label>
<label className="q-opt"><input type="radio" name="q5" value="3" /><span className="q-radio"></span><span className="q-text">2+ inches shorter or noticeable stooping</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 6 of 10</div><h3>⚖️ What is your body weight?</h3><div className="q-options" id="q6">
<label className="q-opt"><input type="radio" name="q6" value="0" /><span className="q-radio"></span><span className="q-text">Normal or overweight (130+ lbs / 59+ kg)</span></label>
<label className="q-opt"><input type="radio" name="q6" value="1" /><span className="q-radio"></span><span className="q-text">Slightly underweight (115-130 lbs / 52-59 kg)</span></label>
<label className="q-opt"><input type="radio" name="q6" value="2" /><span className="q-radio"></span><span className="q-text">Underweight (under 115 lbs / 52 kg)</span></label>
<label className="q-opt"><input type="radio" name="q6" value="3" /><span className="q-radio"></span><span className="q-text">Very thin with recent unintentional weight loss</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 7 of 10</div><h3>🏋️ Do you do weight-bearing or resistance exercise?</h3><div className="q-options" id="q7">
<label className="q-opt"><input type="radio" name="q7" value="0" /><span className="q-radio"></span><span className="q-text">Yes — walking + strength training 3+ times/week</span></label>
<label className="q-opt"><input type="radio" name="q7" value="1" /><span className="q-radio"></span><span className="q-text">Some — walk regularly but no strength training</span></label>
<label className="q-opt"><input type="radio" name="q7" value="2" /><span className="q-radio"></span><span className="q-text">Little — mostly sedentary with occasional walks</span></label>
<label className="q-opt"><input type="radio" name="q7" value="3" /><span className="q-radio"></span><span className="q-text">None — no exercise at all</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 8 of 10</div><h3>🥛 Do you get enough calcium and Vitamin D?</h3><div className="q-options" id="q8">
<label className="q-opt"><input type="radio" name="q8" value="0" /><span className="q-radio"></span><span className="q-text">Yes — dairy/fortified foods + D3 supplement daily</span></label>
<label className="q-opt"><input type="radio" name="q8" value="1" /><span className="q-radio"></span><span className="q-text">Some — occasional dairy, no supplement</span></label>
<label className="q-opt"><input type="radio" name="q8" value="2" /><span className="q-radio"></span><span className="q-text">Low — rarely eat dairy or calcium-rich foods</span></label>
<label className="q-opt"><input type="radio" name="q8" value="3" /><span className="q-radio"></span><span className="q-text">Very low — no dairy, no supplement, rarely go outdoors</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 9 of 10</div><h3>🚬 Do you smoke or drink heavily?</h3><div className="q-options" id="q9">
<label className="q-opt"><input type="radio" name="q9" value="0" /><span className="q-radio"></span><span className="q-text">Never smoked, moderate or no alcohol</span></label>
<label className="q-opt"><input type="radio" name="q9" value="1" /><span className="q-radio"></span><span className="q-text">Former smoker, moderate alcohol</span></label>
<label className="q-opt"><input type="radio" name="q9" value="2" /><span className="q-radio"></span><span className="q-text">Current smoker OR heavy alcohol (3+ drinks daily)</span></label>
<label className="q-opt"><input type="radio" name="q9" value="3" /><span className="q-radio"></span><span className="q-text">Current smoker AND heavy alcohol</span></label>
</div></div>

<div className="quiz-q"><div className="q-num">Question 10 of 10</div><h3>📋 Have you ever had a DEXA bone density scan?</h3><div className="q-options" id="q10">
<label className="q-opt"><input type="radio" name="q10" value="0" /><span className="q-radio"></span><span className="q-text">Yes — results were normal</span></label>
<label className="q-opt"><input type="radio" name="q10" value="1" /><span className="q-radio"></span><span className="q-text">Yes — showed osteopenia (mild bone loss)</span></label>
<label className="q-opt"><input type="radio" name="q10" value="2" /><span className="q-radio"></span><span className="q-text">Never had one</span></label>
<label className="q-opt"><input type="radio" name="q10" value="3" /><span className="q-radio"></span><span className="q-text">Yes — diagnosed with osteoporosis</span></label>
</div></div>

<button className="calc-btn">🦴 Get My Bone Health Score →</button>

<div className="results" id="results">
<div className="risk-result" id="risk-result">
<div className="risk-emoji" id="r-emoji">🦴</div>
<div><span className="risk-score" id="r-score">40</span><span className="risk-of"> / 100</span></div>
<div className="risk-label" id="r-label">Moderate Risk</div>
<div className="risk-sub" id="r-sub">Several osteoporosis risk factors present</div>
</div>
<div className="breakdown"><h3>Your bone health breakdown</h3><div id="bd-list"></div></div>
<div className="action-plan" id="action-plan"><h3 id="ap-title">Your bone protection plan</h3><div id="ap-list"></div></div>
</div>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="6355219695" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="content-section">
<h2>Understanding bone health after 60</h2>
<p>Bones are living tissue that constantly breaks down and rebuilds. After age 30, breakdown begins to outpace rebuilding. For women, menopause accelerates this dramatically — bone loss can reach 2-3% per year in the first 5-7 years post-menopause. By age 70, many seniors have lost 30-40% of their peak bone mass. The result: bones that shatter from forces that younger bones would easily withstand.</p>

<h3>The fracture that changes everything</h3>
<p>A hip fracture is often the beginning of a devastating cascade. Within one year of a hip fracture: 20% of seniors die, 50% never regain their previous level of function, and 25% require long-term nursing home care. Vertebral compression fractures cause chronic pain, height loss, and stooped posture. Wrist fractures signal that bone density is already compromised. Every fracture after 50 should trigger a conversation about osteoporosis screening.</p>
<p style={{"fontSize":"14px","color":"var(--muted)"}}><em>Sources: FRAX Fracture Risk Assessment Tool, University of Sheffield. US Preventive Services Task Force Osteoporosis Screening Recommendations, 2023. National Osteoporosis Foundation guidelines.</em></p>

<h3>The DEXA scan — the only way to know</h3>
<p>A DEXA (Dual-Energy X-ray Absorptiometry) scan measures bone mineral density at the hip and spine. It takes 10-15 minutes, is painless, and uses very low radiation. Results are reported as a T-score: above -1 is normal, -1 to -2.5 is osteopenia (mild loss), below -2.5 is osteoporosis. Medicare covers DEXA scans for women 65+, men 70+, and younger adults with risk factors — every 2 years.</p>

<h3>Fall prevention + bone protection = fracture prevention</h3>
<p>Fractures require two things: weak bones AND a fall. Addressing both is far more effective than addressing either alone. If your bone density is low, preventing falls becomes critical. If you're prone to falls, strengthening bones becomes urgent. These two tools work together.</p>
<p><strong>Related:</strong> <a href="/tools/fall-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Fall Risk Assessment →</a> | <a href="/tools/muscle-loss-risk/" style={{"color":"var(--green)","fontWeight":"700"}}>Muscle Loss Quiz →</a></p>

<h3>Supplements that support bone health</h3>
<p>Calcium Citrate (600mg 2x daily with meals — citrate form best absorbed in seniors), Vitamin D3+K2 (D3 2000-4000 IU helps absorb calcium, K2 100-200mcg directs it to bones not arteries), Magnesium Glycinate (400mg — required for calcium utilization), Collagen peptides (10g daily — supports bone matrix structure), and Vitamin C (supports collagen formation). Weight-bearing exercise is equally essential.</p>
<p><strong>See our guide:</strong> <a href="/joints/" style={{"color":"var(--green)","fontWeight":"700"}}>Joint &amp; bone supplements for seniors →</a></p>
</div>

<div className="ad-slot"><ins className="adsbygoogle" style={{"display":"block"}} data-ad-client="ca-pub-3496395300151813" data-ad-slot="3333737430" data-ad-format="auto" data-full-width-responsive="true"></ins></div>

<div className="faq"><h2>Frequently Asked Questions</h2>
<div className="faq-item"><button className="faq-q">How common is osteoporosis?<span className="faq-icon">+</span></button><div className="faq-a">Affects 50% of women and 25% of men over 50. Hip fractures affect 1 in 3 women and 1 in 5 men over their lifetime. 1 in 5 seniors who break a hip die within one year.</div></div>
<div className="faq-item"><button className="faq-q">What are the signs of osteoporosis?<span className="faq-icon">+</span></button><div className="faq-a">Usually NO symptoms until a fracture. Warning signs: height loss (1.5+ inches), stooped posture, a fracture from minor impact, back pain from compression fractures. A DEXA scan is the only way to diagnose before a fracture.</div></div>
<div className="faq-item"><button className="faq-q">Can osteoporosis be reversed?<span className="faq-icon">+</span></button><div className="faq-a">Partially — weight-bearing exercise, calcium (1200mg), Vitamin D3+K2, and prescription medications can slow, stop, and sometimes modestly reverse bone loss. Starting treatment at any age shows improvement within 1-2 years.</div></div>
<div className="faq-item"><button className="faq-q">What supplements help bones?<span className="faq-icon">+</span></button><div className="faq-a">Calcium Citrate (1200mg total), Vitamin D3+K2 (2000-4000 IU + 100-200mcg), Magnesium (400mg), Collagen peptides (10g), and Vitamin C. D3 helps absorb calcium; K2 directs it to bones, not arteries.</div></div>
<div className="faq-item"><button className="faq-q">When should I get a DEXA scan?<span className="faq-icon">+</span></button><div className="faq-a">Women at 65, men at 70, or younger with risk factors (early menopause, steroid use, family history, low weight, smoking). Medicare covers it every 2 years. Painless, 10-15 minutes, low radiation.</div></div>
<div className="faq-item"><button className="faq-q">Does exercise help bones after 60?<span className="faq-icon">+</span></button><div className="faq-a">Yes — walking, dancing, stair climbing, and resistance training stimulate bone formation. Seniors who exercise have 1-3% higher bone density than sedentary peers, translating to significantly fewer fractures.</div></div>
</div>

<div className="related"><h3>Related health resources</h3><div className="r-grid">
<a href="/joints/" className="r-link"><span>🦴</span> Joint & bone supplements</a>
<a href="/tools/fall-risk/" className="r-link"><span>🛡️</span> Fall Risk Quiz</a>
<a href="/tools/muscle-loss-risk/" className="r-link"><span>💪</span> Muscle Loss Quiz</a>
<a href="/longevity/" className="r-link"><span>🧬</span> Longevity supplements</a>
</div></div>

<div className="disc"><h4>Medical Disclaimer</h4>
<p>This quiz identifies osteoporosis risk factors — it is NOT a bone density measurement. Only a DEXA scan can diagnose osteoporosis or osteopenia. If your score suggests elevated risk, discuss DEXA screening with your doctor. Never start or stop osteoporosis medications without medical guidance.</p></div>

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
